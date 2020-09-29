---
title: "Minio (S3)"
category: "deployment"
---

```toc

```

The official chart documentation is [here](https://hub.kubeapps.com/charts/stable/minio).

## Features used

- Standalone
- SSD persistence storage, make sure you have a defined [custom storageclass](/deployment/minio) for it.
- [Ingress](/deployment/ingress) enabled for web access. The certificate **should have been** generated before the installation.

## Fresh install

Use the following `yaml` configuration file and save it as `dev.yaml`

```yaml
mode: standalone
persistence:
  enabled: true
  storageClass: fast
  # the size is configurable, generally more is better in
  # cloud environment
  size: 20Gi
# It is kind of username and password
# you can use it to login from the web interface and manage files
accessKey: ANYTHINGYOUWANT
secretKey: ITISASECRET
## ingress definition, nginx ingress chart is a prerequisite
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: 500M
  hosts:
    - something.something.org # change this
  tls:
    - secretName: some-secret # change accordingly
      hosts:
        - something.something.org # change this
```

```shell
$_> helm install kubernetes-charts/minio --version 5.0.25 -f dev.yaml --name minio --namespace dictybase
```

> Creating bucket during installation has been skipped, as that
> sometimes leads to a [stuck initcontainer](https://github.com/helm/charts/issues/14014).  
> So, it's better to create the bucket after the chart is installed.

## Upgrade

A simple `helm upgrade` should work, however to err on the side of caution, the buckets need to be
backed up.

- Backup to local disk

```shell
$_> mc cp -r <server>/<bucket> .
```

- Upgrade to latest version

```shell
$_> helm upgrade minio --namespace dictybase kubernetes-charts/minio --version <version> -f dev.yaml
```

- In case of missing data, restore it from disk backup

```shell
$_> mc mb <server>/<bucket>
$_> mc cp -r folder </server>/<bucket>
```
