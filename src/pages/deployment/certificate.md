---
title: "Certificates"
category: "deployment"
---

## Upgrading existing cert manager

Seemingly every minor release of cert-manager brings some breaking changes, so
it is recommended to delete the existing version and perform a fresh install. Follow
these steps to ensure a successful upgrade.

1. [Backup existing cert-manager configuration resources](https://cert-manager.io/docs/tutorials/backup/).
   We won't be using these in this upgrade, but it is still recommended to keep a backup.

```shell
kubectl get -o yaml --all-namespaces \
     issuer,clusterissuer,certificates > cert-manager-backup.yaml
```

2. Delete existing cert-manager (and namespace)

```shell
helm delete cert-manager --purge

kubectl delete namespace cert-manager
```

3. Remove existing CRDs (change `0.8` to your installed version if necessary)

```shell
kubectl delete -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.8/deploy/manifests/00-crds.yaml
```

4. Verify existing CRDs are removed

```shell
kubectl get crd | grep certmanager.k8s.io
```

5. Proceed to the fresh install steps below.

## Fresh install

_Chart version [0.15.2](https://hub.helm.sh/charts/jetstack/cert-manager/v0.15.2)_

```shell
kubectl create namespace cert-manager

helm repo add jetstack https://charts.jetstack.io

helm repo update

helm install jetstack/cert-manager --name cert-manager --namespace cert-manager --version v0.15.2 --set installCRDs=true
```

## Issuer and Certificate for https access

Each developer gets their own subdomain at
[dictybase.dev](https://dictybase.dev). This template will serve as a guide
used for all developers. Here, `eric` will be used as an example.
Two resources have to be created: `issuer` and `certificate`.

---

**Issuer**

```yaml
apiVersion: cert-manager.io/v1alpha2
kind: Issuer
metadata:
  # change the developer name accordingly
  name: dictybase-eric-dev
  namespace: dictybase
spec:
  acme:
    # The ACME server URL, for the first setup it’s preferable to use their staging server
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: YOUR_EMAIL_HERE...
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: dictybase-eric-dev
    # Enable the HTTP-01 challenge provider
    solvers:
      - http01:
          ingress:
            class: nginx
```

![](./userinput.png)

> `$_> kubectl apply -f issuer.yml`

---

**Certificate**

```yaml
apiVersion: cert-manager.io/v1alpha2
kind: Certificate
metadata:
  name: dicty-eric-dev
  namespace: dictybase
spec:
  secretName: dicty-eric-dev-tls
  issuerRef:
    kind: Issuer
    name: dictybase-eric-dev
  dnsNames:
    - eric.dictybase.dev
    - ericapi.dictybase.dev
    - ericauth.dictybase.dev
    - ericfunc.dictybase.dev
    - ericgraphql.dictybase.dev
    - ericstorage.dictybase.dev
    - erictoken.dictybase.dev
```

![](./userinput.png)

> `$_> kubectl apply -f certificate.yaml`
