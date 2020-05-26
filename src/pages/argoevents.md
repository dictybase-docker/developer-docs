---
title: "Argo Events"
---

# Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Steps](#initial-steps)
- [Issuer and Certificate](#issuer-and-certificate)
- [Helm Charts Installation](#helm-charts-installation)
  - [Installing Argo](#installing-argo)
  - [Installing Argo Events](#installing-argo-events)
- [Understanding Argo Events](#understanding-argo-events)
  - [Gateways](#gateways)
  - [Event Sources](#event-sources)
  - [Sensors](#sensors)
- [GitHub Setup](#github-setup)
  - [Ingress](#ingress)
  - [GitHub Webhooks](#github-webhooks)
  - [Kubernetes secret](#kubernetes-secret)
  - [Argo Pipeline](#argo-pipeline)
- [Minio Setup](#minio-setup)
  - [Kubernetes Secret](#kubernetes-secret)
  - [Gateway](#gateway-1)
  - [Event Source](#event-source-1)
  - [Sensor](#sensor-1)
    - [Helpful Links](#helpful-links-1)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

---

Here we will go through the process of setting up Argo Events in a cluster. Our
goals in using these tools are twofold:

1. Connect Argo Events (webhooks) to capture triggers from our source code
   repositories (i.e. commits).

2. Connect Argo Events to capture `POST` and `PUT` requests to a Minio bucket --
   anything that creates a new file or updates existing files.

## Prerequisites

- `Configured (kubectl access)` [GKE](https://cloud.google.com/kubernetes-engine/) access.
- [Cluster admin](admin.md) access.
- [Cert-Manager](certificate.md) installed.
- [Minio](minio.md) installed.
- [GitHub personal access token](https://github.com/settings/tokens) created.

## Initial Steps

- First create a namespace

> `$_> kubectl create namespace argo`

- Add `argoproj` repository

> `$_> helm repo add argo https://argoproj.github.io/argo-helm`

## Issuer and Certificate

You will need to create a new issuer and certificate -- these are required in
order to set up Ingress (needed for GitHub webhooks and displaying Argo UI).

**Issuer**

```yaml
apiVersion: certmanager.k8s.io/v1alpha1
kind: Issuer
metadata:
  name: argo-eric-dev
  namespace: argo
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: YOUR EMAIL HERE....
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: argo-eric-dev
    # Enable the HTTP-01 challenge provider
    http01: {}
```

![](userinput.png)

> `$_> kubectl apply -f issuer.yml`

**Certificate**

```yaml
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: dictyargo-eric-dev
  namespace: argo
spec:
  secretName: argo-eric-dev-tls
  issuerRef:
    kind: Issuer
    name: argo-eric-dev
  dnsNames:
    - ericargo.dictybase.dev
  acme:
    config:
      - http01:
          ingressClass: nginx
        domains:
          - ericargo.dictybase.dev
```

![](userinput.png)

> `$_> kubectl apply -f certificate.yaml`

## Helm Charts Installation

The official Argo Helm charts will do an installation with all of the necessary
custom resource definitions, configmaps and controllers required to run both Argo
and Argo Events.

### Installing Argo

- Create secret for Minio in `argo` namespace

![](userinput.png)

> `$_> kubectl create secret generic minio-access \`  
> `--from-literal=accesskey=YOUR_ACCESSKEY_HERE... \`  
> `--from-literal=secretkey=YOUR_SECRETKEY_HERE... -n argo`

- Create RBAC

```yaml
# Role specifications are taken from here
# https://github.com/argoproj/argo/blob/master/manifests/namespace-install.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: argo-workflow
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: argo-workflow-role
rules:
  - apiGroups:
      - ""
    resources:
      - pods
      - pods/exec
    verbs:
      - create
      - get
      - list
      - watch
      - update
      - patch
      - delete
  - apiGroups:
      - ""
    resources:
      - configmaps
    verbs:
      - get
      - watch
      - list
  - apiGroups:
      - ""
    resources:
      - persistentvolumeclaims
    verbs:
      - create
      - delete
  - apiGroups:
      - ""
    resources:
      - secrets
    verbs:
      - create
      - get
      - watch
      - list
  - apiGroups:
      - argoproj.io
    resources:
      - workflows
      - workflows/finalizers
    verbs:
      - get
      - list
      - watch
      - update
      - patch
      - delete
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: argo-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: argo-workflow-role
subjects:
  - kind: ServiceAccount
    name: argo-workflow
```

![](userinput.png)

> `$_> kubectl apply -f argo-rbac.yaml -n argo`

- Create custom config for `argo` chart with file name of say, `argo-dev.yaml`

```yaml
init:
  serviceAccount: argo-workflow
controller:
  workflowNamespaces:
    - argo
images:
  tag: v2.3.0
ui:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
    hosts:
      - ericargo.dictybase.dev
    tls:
      - secretName: argo-eric-dev-tls # same tls you created earlier
        hosts:
          - ericargo.dictybase.dev
# Influences the creation of the ConfigMap for the workflow-controller itself.
useDefaultArtifactRepo: true
artifactRepository:
  # archiveLogs will archive the main container logs as an artifact
  archiveLogs: false
  s3:
    # Note the `key` attribute is not the actual secret, it's the PATH to
    # the contents in the associated secret, as defined by the `name` attribute.
    accessKeySecret:
      name: minio-access
      key: accesskey
    secretKeySecret:
      name: minio-access
      key: secretkey
    insecure: false
    bucket: argo
    endpoint: ericstorage.dictybase.dev
```

- Install `argo` chart with this config

![](userinput.png)

> `$_> helm install argo/argo --version 0.4.0 -f argo-dev.yaml --namespace argo`

### Installing Argo Events

- Install `argo-events` chart

![](userinput.png)

> `$_> helm install argo/argo-events --version 0.4.2 --namespace argo --set namespace=argo`

**Note:** make sure to set the namespace as defined above, as it is not enough to just install
this in the `argo` namespace.

## Understanding Argo Events

This section is here to provide an overview of how Argo Events work and how the
different pieces are connected.

Three pieces are required for Argo Events and they need to be deployed in this
exact order.

### Gateways

[Gateways](https://argoproj.github.io/argo-events/gateway/) are responsible
for consuming events from event sources and then dispatching them to sensors.
There are [many types](https://argoproj.github.io/argo-events/gateway/#core-gateways)
of gateways. Each gateway has two components, a client and a server, and these
use gRPC to communicate. The server consumes events and streams them to the client,
which transforms the events and dispatches them to sensors.

Each gateway is aware of and connected to both the event source and the sensor.
One gateway can have multiple sensors but only one event source.

Because of this, only one gateway is needed for each use case. Since we have two
use cases (GitHub webhooks and Minio notifications), we will need to create two
gateways (one for each).

### Event Sources

Event sources are config maps that are interpreted by the gateway. The config maps
themselves contain no references to the gateway or sensor -- they are specific
to the types of events to monitor.

Each event source has its own type of configuration. For GitHub webhooks, you
would need to specify the webhook ID, GitHub repository, the hook endpoint/port
and the tokens from the K8s secret. For Minio, you would need to provide the s3
service endpoint, bucket name, events and the keys from the K8s secret.

There should be only one event source for each type of event (i.e. one configmap
for all GitHub webhooks, and a separate configmap for Minio notifications).

### Sensors

[Sensors](https://argoproj.github.io/argo-events/sensor/) define a set of event
dependencies (inputs) and triggers (outputs). Triggers are executed once the
event dependencies are resolved.

For a more detailed description of how sensors work, read [this section](https://argoproj.github.io/argo-events/sensor/#how-it-works)
of the docs.

In the rest of this section, we will go through our more complex use case of
working with multiple GitHub webhooks.

Sensors are aware of both the gateway and event source through the use of event
dependencies. An event dependency is the event the sensor is waiting for.
It is defined as `gateway-name:event-source-name`. For example, if you created
a GitHub `event-source` with the name `dicty-stock-center`, the event dependency
name would be `github-gateway:dicty-stock-center`.

Each sensor can have multiple events defined. First you would need to list their
names under the `spec.dependencies` key like so:

```yaml
dependencies:
  - name: "github-gateway:dicty-stock-center"
  - name: "github-gateway:dicty-frontpage"
```

It should be noted that the default behavior of `dependencies` is an **AND** operation.
If you want to change the behavior so workflows are triggered based on individual
events resolving (like we do with GitHub webhooks), you will need to create a
`circuit` (more on that soon) based on `dependencyGroups`.

It is recommended to set up a `dependencyGroup` for each `dependency` you wish to
monitor. In the following example, we are using only one dependency per group because each
repository needs its own trigger to pass its own unique data to the Argo workflow.

```yaml
dependencyGroups:
  - name: "dictystockcenter"
    dependencies:
      - "github-gateway:dicty-stock-center"
  - name: "dictyfrontpage"
    dependencies:
      - "github-gateway:dicty-frontpage"
```

_Note: the `name` values cannot contain hyphens._

After this, set up the `circuit`, which is an arbitrary boolean logic applied to the
dependency groups. In this example we want the event to be triggered when either
`dictystockcenter` **OR** `dictyfrontpage` happens.

```yaml
circuit: "dictystockcenter || dictyfrontpage"
```

You will then need to create a `template` for each `dependencyGroup` with the
following format:

```yaml
triggers:
  - template:
      when:
        all:
          - "dictyfrontpage"
      name: github-frontpage-workflow-trigger
      group: argoproj.io
      version: v1alpha1
      kind: Workflow
      source:
        url:
          path: "https://raw.githubusercontent.com/dictybase-playground/argo-test/master/config.yaml"
          verifycert: false
    resourceParameters:
      - src:
          event: "github-gateway:dicty-frontpage"
        dest: spec.arguments.parameters.0.value
```

In the above, the trigger is fired `when all` of the `dictyfrontpage` events are
resolved. A more detailed example of the GitHub Sensor is [found later in this document](#sensor).

For the triggers, you have to set up an [Argo Workflow](https://argoproj.github.io/docs/argo/examples/readme.html).
There are [many ways](https://argoproj.github.io/argo-events/trigger/)
to trigger a workflow, but in this guide we will be using the `URL` method (linking
to an Argo Workflow YAML hosted elsewhere).

## GitHub Setup

In order to integrate GitHub webhooks with Argo Events, we will need to enable
Ingress, create a personal access token and set up all of our wanted webhooks.

### Ingress

Ingress is necessary in order to get the service URL that exposes the gateway
server and makes it reachable from GitHub.

- Make ingress yaml file (`ingress-gh.yaml`)

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: github-gateway-svc
  namespace: argo
spec:
  rules:
    - host: ericargo.dictybase.dev
      http:
        paths:
          - backend:
              serviceName: github-gateway-svc
              servicePort: 12000 # need to explicitly define this
            path: /github
  tls:
    - hosts:
        - ericargo.dictybase.dev
      secretName: argo-eric-dev-tls
```

### GitHub Webhooks

There are two ways to create a personal access token -- either through the command
line or on GitHub. This guide will use the command line to create a webhook.

First, create a secret key. This can be anything you want, and it is important
to keep track of this since it will be needed when creating an event source.

A helpful way to generate a secret key is by using the following command in the
terminal:

`ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'`

**Important:** Make note of this secret key -- you will need to put it in a
Kubernetes secret later (for use in the event source).

Create a JSON file (say `payload.json`) with the desired configuration for the
webhook. The URL value should be the webhook endpoint you will use later when
creating an event source. Our standard format is to use `/github/:repo-name`.

```json
{
  "name": "web",
  "active": true,
  "events": ["push"],
  "config": {
    "url": "https://ericargo.dictybase.dev/github/dicty-stock-center",
    "content_type": "json",
    "insecure_ssl": "0",
    "secret": "YOUR_SECRET_HERE"
  }
}
```

Now `POST` this using [curl](https://curl.haxx.se/).

![](userinput.png)

> `$_> curl -X POST -H "Content-Type: application/json" -u YOUR_USERNAME_HERE \`  
> `-d @payload.json https://api.github.com/repos/:owner/:repo/hooks`

After using the `curl` command above, you will be prompted for your account
password. If successful you will receive a response like this:

```json
{
  "type": "Repository",
  "id": 12345678,
  "name": "web",
  "active": true,
  "events": ["push"],
  "config": {
    "content_type": "json",
    "insecure_ssl": "0",
    "url": "https://example.com/webhook"
  },
  "updated_at": "2019-06-03T00:57:16Z",
  "created_at": "2019-06-03T00:57:16Z",
  "url": "https://api.github.com/repos/octocat/Hello-World/hooks/12345678",
  "test_url": "https://api.github.com/repos/octocat/Hello-World/hooks/12345678/test",
  "ping_url": "https://api.github.com/repos/octocat/Hello-World/hooks/12345678/pings",
  "last_response": {
    "code": null,
    "status": "unused",
    "message": null
  }
}
```

**IMPORTANT: copy the `id` value immediately.** This is your webhook ID, and it
is needed when installing the `argo-pipeline` chart.

For ease of use, it is suggested to use the same secret key for all of your webhooks,
that way you can use the same K8s secret throughout your event sensor configmap.

You will need to do this for **every** webhook you want to set up. It is advisable
to have a script automate this process. There is a Golang script to create multiple
webhooks at once [here](https://github.com/dictybase-playground/argo-scripts).

### Kubernetes secret

You need to create a [Kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/)
with both your webhook secret and personal access token. It is preferable to
generate this via the command line. I ran into issues when using a YAML file
where somehow foreign characters were being passed in, thereby creating
verification problems.

![](userinput.png)

> `$_> kubectl create secret generic github-access \`  
> `--from-literal=apiToken=YOUR_TOKEN_HERE \`  
> `--from-literal=webHookSecret=YOUR_SECRET_HERE -n argo`

### Argo Pipeline

There is a Helm chart containing the necessary GitHub gateway, event source and
sensor. See its [values](https://github.com/dictybase-docker/kubernetes-charts/blob/master/argo-pipeline/values.yaml)
file for what to customize when installing.

Here is the list of custom values you will need to provide (at minimum):

- `eventSource.hookURL` - URL base used for webhooks
- `hooks` list - every item contains `repo` and `id` (for webhooks)
- `frontend` list - all frontend repos with webhooks
- `backend` list - all backend repos with webhooks
- `backendNoTests` list - all backend repos without unit tests
- `workflow.slackChannel` - slack channel to send notification
- `workflow.endpoint` - endpoint for argo workflow
- `workflow.frontendTag` - tag for frontend-builder docker image

![](userinput.png)

> `$_> helm install dictybase/argo-pipeline --namespace argo -f values.yaml`

## Minio Setup

This will show how to capture `POST` and `PUT` requests to a Minio bucket.

### Kubernetes Secret

This guide asssumes that your installation of Minio is in the `dictybase` namespace and
that you have already created a `minio-access` secret in the `argo` namespace.

See [above](#installing-argo).

### Gateway

Here we will follow the official Argo Events example that uses `artifact`.

- Create a new yaml file (`artifact-gateway.yaml`).

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Gateway
metadata:
  name: artifact-gateway
  labels:
    gateways.argoproj.io/gateway-controller-instanceid: argo-events
    argo-events-gateway-version: v0.10
spec:
  processorPort: "9330"
  eventProtocol:
    type: "HTTP"
    http:
      port: "9300"
  template:
    metadata:
      name: "artifact-gateway"
      labels:
        gateway-name: "artifact-gateway"
    spec:
      containers:
        - name: "gateway-client"
          image: "argoproj/gateway-client"
          imagePullPolicy: "Always"
          command: ["/bin/gateway-client"]
        - name: "artifact-events"
          image: "argoproj/artifact-gateway"
          imagePullPolicy: "Always"
          command: ["/bin/artifact-gateway"]
      serviceAccountName: "argo-events-sa"
  eventSource: "artifact-event-source"
  eventVersion: "1.0"
  type: "artifact"
  watchers:
    sensors:
      - name: "artifact-sensor"
```

![](userinput.png)

> `$_> kubectl apply -f artifact-gateway.yaml -n argo`

### Event Source

`bucket.name` refers to the bucket you want to listen to events for. The `endpoint`
is the cluster IP for the running Minio instance. In this example, we are connecting
to `minio` service in the `dictybase` namespace on port `9000`. Writing out the port
as `minio.dictybase` causes an error.

`events` is an array of the [bucket notifications](https://docs.min.io/docs/minio-bucket-notification-guide.html)
to subscribe to.

`filter` can listen to specific types of files. Otherwise just pass empty strings.

`accessKey` and `secretKey` need to match the location of the corresponding K8s secret.

- Create a new yaml file (`artifact-event-source.yaml`).

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: artifact-event-source
  labels:
    argo-events-event-source-version: v0.10
data:
  minio-example: |-
    bucket:
      name: input
    endpoint: minio.dictybase:9000
    events:
     - s3:ObjectCreated:Put
     - s3:ObjectCreated:Post
    filter:
      prefix: ""
      suffix: ""
    insecure: true
    accessKey:
      key: accesskey
      name: minio-access
    secretKey:
      key: secretkey
      name: minio-access
```

![](userinput.png)

> `$_> kubectl apply -f artifact-event-source.yaml -n argo`

### Sensor

- Create a new yaml file (`artifact-sensor.yaml`).

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Sensor
metadata:
  name: artifact-sensor
  labels:
    sensors.argoproj.io/sensor-controller-instanceid: argo-events
    argo-events-sensor-version: v0.10
spec:
  template:
    spec:
      containers:
        - name: "sensor"
          image: "argoproj/sensor"
          imagePullPolicy: Always
      serviceAccountName: argo-events-sa
  dependencies:
    - name: "artifact-gateway:minio-example"
  eventProtocol:
    type: "HTTP"
    http:
      port: "9300"
  triggers:
    - template:
        name: github-workflow-trigger
        group: argoproj.io
        version: v1alpha1
        kind: Workflow
        source:
          url:
            path: YAML_FILE_HERE...
            verifycert: false
      resourceParameters:
        - src:
            event: "artifact-gateway:minio-example"
          dest: spec.arguments.parameters.0.value
```

![](userinput.png)

> `$_> kubectl apply -f artifact-sensor.yaml -n argo`

#### Helpful Links

[Minio Event Message Structure](https://docs.aws.amazon.com/AmazonS3/latest/dev/notification-content-structure.html)
