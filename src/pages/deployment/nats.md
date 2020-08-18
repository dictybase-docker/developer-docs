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
kubectl delete crd/natsserviceroles.nats.io
kubectl delete crd/natsclusters.nats.io
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