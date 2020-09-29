---
title: "Kubeless"
category: "deployment"
---

```toc

```

[Kubeless](https://kubeless.io/) is a Kubernetes-native serverless framework to
build applications with the [FaaS](https://en.wikipedia.org/wiki/Function_as_a_service)
model.

# Upgrade

Kubeless currently lacks any direct upgrade process, so the existing version
has to be removed first.

- List and then remove existing functions

```shell
kubeless function ls -n dictybase
kubeless function delete <NAME HERE> -n dictybase
```

> Remember to use any of the `kubectl` or `helm` based removal command.

- Remove kubeless instances from the cluster, first the CRDs and then the associated namespace

```shell
kubectl delete crd functions.kubeless.io
kubectl delete crd cronjobtriggers.kubeless.io
kubectl delete crd httptriggers.kubeless.io
kubectl delete ns kubeless
```

- In case of a helm chart installation...

```shell
helm delete kubeless --purge
```

- Remove the existing kubeless client binary.
- Continue with the fresh install process.

# Fresh install

```shell
kubectl create ns kubeless
helm install dictybase/kubeless --version 2.2.0 --name kubeless --namespace kubeless -f dev.yaml
```

- Download and install the latest [kubeless binary](https://github.com/kubeless/kubeless/releases).

If you had removed a previous instance of Kubeless, you will need to reinstall any
previous functions. At this time you will only need to reinstall

- `dashboard` ([docs](https://github.com/dictybase-playground/kubeless-gofn/tree/master/dashboard))
- `publication` ([docs](https://github.com/dictybase-playground/kubeless-gofn/tree/master/publication))

> **Note**

It is also assumed that the following functions have previously been deployed:

- [genefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/gene)
- [genecachefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/geneids)
- [goidsfn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/goids)
- [uniprotcachefn](https://github.com/dictybase-playground/kubeless-gofn/tree/master/uniprot)

These four were only used to add data to the Redis cache. After installation, they do
not need to be actively running for any of our software.

# Extra sauce (syncing with upstream chart)

The chart in the dictybase `helm repository` is packaged from the
upstream [repository](https://github.com/helm/charts). To keep it
updated do the following steps:

- Clone the dictybase helm chart repository

```shell
git clone git@github.com:dictybase-docker/kubernetes-charts.git
```

- Clone the upstream repository and change to the kubeless folder

```shell
git clone https://github.com/helm/charts.git
cd incubator/kubeless
```

- Make any changes necessary
- Package the chart and copy the tarball to the docs folder of `dictybase helm chart` repository

```shell
helm package .
```

- Go back to the `dictybase helm chart` repository and update the package index

```shell
helm repo index docs
```

- Commit and push the changes.
- Synchronize the changes with helm client.

```shell
helm repo update
```
