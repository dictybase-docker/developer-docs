---
title: "Nats"
category: "deployment"
---

```toc
```

[NATS](https://nats.io/) is an open-source, cloud-native messaging system. To install
we need the following:

# Upgrading operator 
> This step is only neccessary in case of installing a backward incompatible operator version.
> Otherwise, simple upgrade the operator using helm. 

- Remove the server and operator first.

```shell
helm delete nats-operator --purge
helm delete nats --purge
```

- Then remove the crds.

```shell
kubectl delete crd natsserviceroles.nats.io
kubectl delete crd natsclusters.nats.io
```

# Fresh install

- Create the following yaml config(`values`) file.

```yaml
clusterScoped: true
cluster:
  create: false
```

- Install the operator

```shell
helm install dictybase/nats-operator --version 0.1.3 -f dev.yaml --name nats-operator --namespace nats-io
```

- Make sure the operator is deployed 

```shell
kubectl get crd | grep nats
```

- Install the server

```shell
helm install dictybase/nats --version 0.0.3 --name nats --namespace dictybase
```

# Extra sauce(syncing the operator chart)
The operator chart in the dictybase `helm repository` is packaged from the
upstream [repository](https://github.com/nats-io/nats-operator). To keep it
updated do the following steps,

- Clone the dictybase helm chart repository

```shell
git clone git@github.com:dictybase-docker/kubernetes-charts.git
```

- Clone the nats-operator repository and change to helm folder

```shell 
git clone https://github.com/nats-io/nats-operator.git
cd helm
```

- Package the chart and copy the tarball to the docs folder of `dictybase helm chart` repository

```shell
helm package nats-operator
```

- Go back to the `dictybase helm chart` repository and update the package index

```shell
helm repo index docs
```

- Commit the push the changes.
- Synchronize the changes with helm client.

```shell
helm repo update
```