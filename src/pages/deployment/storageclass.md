---
title: "Custom Storage Class"
category: "deployment"
---

By default, GKE uses a `standard (pd-standard)` disk as the default [storage
class](https://kubernetes.io/docs/concepts/storage/storage-classes/). Here we
setup a custom storage class backed by `ssd disk`.

```shell
cat <<EOF | kubectl apply -f -
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: fast
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  zone: us-central1-a
  fsType: ext4
EOF
```

Verify by running

`$_> kubectl get sc`

##### Note

This storage class will be used globally by all of our applications, so if
another name is used (other than `fast`), make sure to configure the application
accordingly.
