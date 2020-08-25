---
title: "Certificates"
category: "deployment"
---

```toc

```

# Fresh install

_Chart version [0.15.2](https://hub.helm.sh/charts/jetstack/cert-manager/v0.15.2)_

```shell
kubectl create namespace cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install jetstack/cert-manager --name cert-manager --namespace cert-manager --version v0.15.2 --set installCRDs=true
```

# Issuer and Certificate for https access

To generate an `Issuer` resource, create the following helm value file...

```yaml
namespace: dictybase
issuer:
  name: dictybase-eric-dev
  email: YOUR_EMAIL_HERE...
```

Then install the helm chart to create the resource.

```shell
helm install --namespace dictybase --name eric-issuer-certificate -f values.yaml dictybase/issuer
```

The `Certificate` resource will be create indirectly by adding one extra annotation
to the `Ingress` manifest. So, pick up any of the ingress value file, add the following anntoation,

```yaml
ingress:
  annotations:
    cert-manager.io/issuer: <Name of issuer created above>
  tls:
   - secretName: <Name>
     .....
     .....
```

Then install the ingress using the helm chart.

```shell
helm install -n <release-name> dictybase/dictybase-ingress --namespace dictybase -f values.yaml
```

The `Certificate` should be created by `cert-manager`. Check the presence of certificate

```shell
kubectl get certificate -n dictybase
```

## In case of existing ingress

- Add only the `cert-manager.io/issuer` annotation. The `tls` configuration is not needed for an existing secret.
- To use the same certificate for multiple ingress,
  - Use the same secret in the `tls` configuration.
  - Do not need to add the `cert-manager` annotation for more than one ingress.

# Upgrading existing cert manager

In case of breaking changes or bump in multiple versions it's advisable to remove and do a fresh
install of latest cert-manager using helm chart.

## Backup secrets referenced by issue and certificate

### Extract the secret names

```shell
kubectl get issuers --all-namespaces -o jsonpath='{.items[*].spec.ca.secretName}'
kubectl get issuers --all-namespaces -o jsonpath='{.items[*].spec.acme.privateKeySecretRef.name}'
```

### Backup their manifests

```shell
kubectl get secret -n cert-manager -o yaml cert-manager-webhook-ca > cert-manager-webhook-ca.secret
kubectl get secret -n dictybase -o yaml  dictybase-devsidd > dictybase-devsidd.secret
```

The name of the secret in `dictybase` namespace might vary, so change the name accordingly.  
**Note:** The secrets can be used to transfers the issuers to a different cluster.

## Delete existing cert-manager

### Remove chart and namespaces

```shell
helm delete cert-manager --purge
kubectl delete namespace cert-manager
```

### Remove existing CRDs (change `0.8` to your installed version if necessary)

```shell
kubectl delete -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.8/deploy/manifests/00-crds.yaml
```

> Verify existing CRDs are removed

```shell
kubectl get crd | grep certmanager.k8s.io
```

### Next step

Removing `cert-manager` will remove all issuers and certificate from the
cluster while keeping all secrets referenced by issuers and ingresses. So,
the following steps will be...

- Fresh install of `cert-manager`.
- Create a new `Issuer` that references the existing secret.
- Update ingress using `cert-manager` annotation and let the tls reference
  the existing secret. It will indirectly create the `Certficate` resource.
