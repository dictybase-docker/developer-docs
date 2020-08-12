---
title: "Kubeless"
category: "deployment"
---

[Kubeless](https://kubeless.io/) is a Kubernetes-native serverless framework to
build applications with the [FaaS](https://en.wikipedia.org/wiki/Function_as_a_service)
model.

## Upgrading from an existing version

At the moment there is no clear upgrade process for Kubeless, so moving to a different
version requires deleting the existing instance and performing a fresh install.

**Please note** that deleting an existing Kubeless deployment will also remove all
existing functions in the cluster.

```shell
kubectl delete -f https://github.com/kubeless/kubeless/releases/download/[VERSION]/kubeless-[VERSION].yaml
```

`kubeless` repo has a full list of [releases](https://github.com/kubeless/kubeless/releases).

Continue with the fresh install process.

## Fresh install

_App version [1.0.7](https://github.com/kubeless/kubeless/releases/tag/v1.0.7)_

```shell
kubectl create ns kubeless
kubectl create -f https://github.com/kubeless/kubeless/releases/download/v1.0.7/kubeless-v1.0.7.yaml
```

If you had removed a previous instance of Kubeless, you will need to reinstall any
previous functions. At this time you will only need to reinstall `dashboard` ([docs](https://github.com/dictybase-playground/kubeless-gofn/tree/master/dashboard))
and `publication` ([docs](https://github.com/dictybase-playground/kubeless-gofn/tree/master/publication))
from [kubeless-gofn](https://github.com/dictybase-playground/kubeless-gofn).
