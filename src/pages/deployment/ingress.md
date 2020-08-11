---
title: "Ingress"
category: "deployment"
---

```toc
```

[Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#what-is-ingress)
manages external access to services in a Kubernetes cluster. To configure Ingress access we need to install
- nginx-controller
- Setup [cert-manager](/deployment/certificate) for https access.
- ingress manifests for opening up services   

> #### It's always recommend to [upgrade helm](/deployment/helm) if possible.

# Upgrade nginx-controller
> ## Quick start
```shell
kubectl get svc  -n default nginx-ingress-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
helm delete nginx-ingress --purge
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/
helm repo update
```
```yaml
  controller:
      service:
        loadBalancerIP: YOUR_IP_ADDRESS...
```
```shell
helm install ingress-nginx/ingress-nginx -n ingress-nginx --version 2.11.1 -f values.yaml
```
> ## Step by step
## Gather external IP
**From cluster loadbalancer**
```shell
kubectl get svc  -n default nginx-ingress-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```
**DNS lookup using any of the mapped domain**
```shell
nslookup eric.dictybase.dev
```
The values should match each other, otherwise use the `ip` from loaderbalancer query. The `ip` will be
used to install the new chart.
## Remove existing chart
```shell
helm delete nginx-ingress --purge
```
## Add helm repository for ingress-nginx
The Helm _stable_ repository is in the process of being deprecated so it is advised to use the
community-supported [ingress-nginx](https://github.com/kubernetes/ingress-nginx) chart moving forward.
```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/
helm repo update
```
## Install the chart
Chart version [2.11.1](https://github.com/kubernetes/ingress-nginx/releases/tag/ingress-nginx-2.11.1)
- Create the following `yaml` value file
```yaml
  controller:
      service:
        loadBalancerIP: YOUR_IP_ADDRESS...
```
```shell
helm install ingress-nginx/ingress-nginx -n ingress-nginx --version 2.11.1 -f values.yaml
```
- Verify the loadbalancer ip
```shell
kubectl get svc  -n default ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

# Deploy Ingress manifests
These will be deployed alongside the various services. This particular sequence
of deployments should be followed at least for the first time. Here are the
expected manifests to be deployed.

- Minio storage
- Auth backend
- API microservices
- Frontend applications

# Fresh install
```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/
helm repo update
helm install ingress-nginx/ingress-nginx -n ingress-nginx --version 2.11.1
```