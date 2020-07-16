---
title: "Ingress"
category: "deployment"
---

[Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#what-is-ingress)
manages external access to services in kubernetes cluster. To configure ingress access we need to install

- nginx-controller
- [cert-manager](/certificate) for https access
- ingress manifests for opening up services

## Upgrading from an existing version

Upgrade Helm to the highest version of its 2.x.x series, currently it should be [v2.16.9](https://github.com/helm/helm/releases/tag/v2.16.9). Make sure both client and server side get upgraded.

> `$_> helm version`

Check the current version of nginx-ingress installed in the cluster...

> `$_> helm ls nginx-ingress`

**VERY IMPORTANT:** The load balancer IP must remain the same during this process. For example,
do not use the `--force` flag when upgrading the chart because that will recreate the load balancer.

Upgrading from `1.6.8` to a higher version has been tested. It is recommended to upgrade
incrementally based on the app version (for example `1.9.1` chart uses app version `0.25.0`).
This path can be followed:

```shell
helm upgrade nginx-ingress stable/nginx-ingress --version 1.9.1
helm upgrade nginx-ingress stable/nginx-ingress --version 1.23.0
helm upgrade nginx-ingress stable/nginx-ingress --version 1.25.1
```

We can safely upgrade up until `1.25.1`, after which there is a breaking change. See this
[PR](https://github.com/helm/charts/pull/13646) for more information.

To upgrade to the next version, we must manually set the cluster IPs for both of the
`nginx-ingress` services.

```shell
BACKEND_CLUSTER_IP=$(kubectl get svc nginx-ingress-default-backend -o jsonpath="{.spec.clusterIP}")
CONTROLLER_CLUSTER_IP=$(kubectl get svc nginx-ingress-controller -o jsonpath="{.spec.clusterIP}")

helm upgrade nginx-ingress stable/nginx-ingress --set controller.service.clusterIP=${CONTROLLER_CLUSTER_IP} --set defaultBackend.service.clusterIP=${BACKEND_CLUSTER_IP} --version 1.26.0
```

These only need to be set once. The rest of the upgrades can continue as previously listed.

```shell
helm upgrade nginx-ingress stable/nginx-ingress --version 1.27.2
helm upgrade nginx-ingress stable/nginx-ingress --version 1.29.0
helm upgrade nginx-ingress stable/nginx-ingress --version 1.29.6
helm upgrade nginx-ingress stable/nginx-ingress --version 1.31.0
helm upgrade nginx-ingress stable/nginx-ingress --version 1.32.0
```

There is a new problem when upgrading to version 1.34.0 ([relevant issue](https://github.com/helm/charts/issues/21771)).

## Deploy Ingress manifests

These will be deployed alongside the various services. This particular sequence
of deployments should be followed at least for the first time. Here are the
expected manifests to be deployed.

- Minio storage
- Auth backend
- API microservices
- Frontend applications

## Fresh install

_Chart version [1.40.3](https://hub.helm.sh/charts/stable/nginx-ingress/1.40.3)_

Make sure you update (`helm repo update`) and check the name of
the registered default helm repository (`helm repo list`).

```shell
helm install stable/nginx-ingress --name nginx-ingress --version 1.40.3
```
