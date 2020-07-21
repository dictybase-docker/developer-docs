---
title: "Nats"
category: "deployment"
---

[NATS](https://nats.io/) is an open-source, cloud-native messaging system. To install
we need the following:

## Upgrading from an existing version

If currently using the `dictybase/nats-operator` and `dictybase/nats` charts, it is
advised to remove them and proceed with a fresh install.

```shell
helm delete nats-operator --purge
helm delete nats --purge
```

Make sure the CRDs have been removed as well.

```shell
kubectl delete crd/natsserviceroles.nats.io
kubectl delete crd/natsclusters.nats.io
```

## Fresh install

1. Clone the `nats-operator` repository

```shell
git clone https://github.com/nats-io/nats-operator.git && cd nats-operator
```

2. Create config file (`values.yaml`)

```shell
cluster:
  auth:
    enabled: false
  name: nats
  namespace: dictybase
  version: 2.1.7
  size: 1
image:
  tag: 0.7.2
```

3. Install Helm chart (from within this cloned repo)

```shell
helm install helm/nats-operator --namespace dictybase -n nats-operator -f values.yaml
```

This will create a NATS operator with the specified cluster version and image tag.
To upgrade to later versions after this, update the values file and run:

```shell
helm upgrade nats-operator helm/nats-operator -f values.yaml
```

**Note:** You may also need to restart any pods that rely on NATS messaging, such as
the `event-messenger` and `order-api-server` software.
