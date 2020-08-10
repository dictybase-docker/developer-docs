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

# Upgrading helm
It's recommend to upgrade `helm(v2)` to its latest version. As of this writing upgrade helm
to [v2.16.9](https://github.com/helm/helm/releases/tag/v2.16.9). After the upgarde of helm binary,
run 
```shell
helm init --upgrade
```
Then wait for 5-6 seconds and check the helm client and server version. They should match each other.
```shell
helm version
```

# Upgrade nginx-controller
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
helm install ingress-nginx/ingress-nginx -n ingress-nginx --version 2.11.1
```
- Verify the loadbalancer ip
```shell
kubectl get svc  -n default nginx-ingress-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
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

## Add helm repository for ingress-nginx
The Helm _stable_ repository is in the process of being deprecated so it is advised to use the
community-supported [ingress-nginx](https://github.com/kubernetes/ingress-nginx) chart moving forward.
```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/
helm repo update
```
## Install the chart
Chart version [2.11.1](https://github.com/kubernetes/ingress-nginx/releases/tag/ingress-nginx-2.11.1)

```shell
helm install ingress-nginx/ingress-nginx -n ingress-nginx --version 2.11.1
```
