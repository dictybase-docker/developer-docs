---
title: "Ingress"
category: "deployment"
---

[Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#what-is-ingress)
manages external access to services in a Kubernetes cluster. To configure Ingress access we need to install

- nginx-controller
- [cert-manager](/certificate) for https access
- ingress manifests for opening up services

## Upgrading from an existing version

Upgrade Helm to the highest version of its 2.x.x series, currently it should be [v2.16.9](https://github.com/helm/helm/releases/tag/v2.16.9).
Make sure both the client and server side get upgraded.

```shell
helm version
```

The Helm _stable_ repository is in the process of being deprecated so it is advised to use the
community-supported [ingress-nginx](https://github.com/kubernetes/ingress-nginx) chart moving forward.

In order to do so, first we need to remove the existing version from the cluster.

```shell
helm delete nginx-ingress --purge
```

Now use `nslookup` to find the IP address mapping for your domain.

```shell
nslookup eric.dictybase.dev
```

Make note of the IP address returned, you will need it when installing the new chart.

Add the Helm repository for ingress-nginx.

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/
```

Now either make a YAML file (i.e. values.yaml) with the below config or manually set it in the command line.

```yaml
controller:
  service:
    loadBalancerIP: YOUR_IP_ADDRESS...
```

```shell
helm install ingress-nginx/ingress-nginx -n ingress-nginx -f values.yaml
```

OR

```shell
helm install ingress-nginx/ingress-nginx -n ingress-nginx --set controller.service.loadBalancerIP=YOUR_IP_ADDRESS
```

Verify deployment is successful

```shell
helm ls ingress-nginx
```

You can also verify the load balancer external IP matches the IP you set.

```shell
kubectl get svc ingress-nginx-controller
```

## Deploy Ingress manifests

These will be deployed alongside the various services. This particular sequence
of deployments should be followed at least for the first time. Here are the
expected manifests to be deployed.

- Minio storage
- Auth backend
- API microservices
- Frontend applications

## Fresh install

_Chart version [2.11.1](https://github.com/kubernetes/ingress-nginx/releases/tag/ingress-nginx-2.11.1)_

The Helm _stable_ repository is in the process of being deprecated so fresh installs
are advised to use the community-supported [ingress-nginx](https://github.com/kubernetes/ingress-nginx) chart.

- Add Helm repository for ingress-nginx

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/
```

- Installation

```shell
helm install ingress-nginx/ingress-nginx -n ingress-nginx --version 2.11.1
```
