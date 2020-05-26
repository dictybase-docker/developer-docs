---
title: "Minio"
---

# S3 compatible object storage - minio

> Chart version [https://hub.helm.sh/charts/stable/minio/2.4.14](2.4.14)

The following features will be enabled(used)

- Standalone
- SSD persistence storage, make sure you have a defined **custom storageclass** for it.
- Default bucket
- Ingress enabled for web access

Yaml configuration file for helm (using `eric` as an example for the dev domain)

```yaml
mode: standalone
persistence:
  enabled: true
  storageClass: fast
  # the size is configurable, generally more is better in
  # cloud environment
  size: 200Gi
defaultBucket:
  enabled: true
  name: dictybase
  policy: none
  purge: false
# It is kind of username and password
# you can use it to login from the web interface and manage files
accessKey: ANYTHINGYOUWANT
secretKey: ITISASECRET
## ingress defintion, nginx ingress chart is a prerequisite
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: 500M
  hosts:
    - ericstorage.dictybase.dev # change this
  tls:
    - secretName: dicty-eric-dev-tls # change accordingly
      hosts:
        - ericstorage.dictybase.dev # change this
```

![](userinput.png)

> `$_> helm install kubernetes-charts/minio --version 2.4.14 -f config.yaml -n minio --namespace dictybase`
