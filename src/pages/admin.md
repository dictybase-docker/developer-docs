---
title: "GKE Cluster Administration"
---

To add and manipulate Kubernetes
[RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/),
the account that executes the `kubectl` binary must have cluster
administrative permission.

- Extract the active and authenticated gcloud account information.
  It is expected to print an email of the account.

> `$_> gcloud config list account --format "value(core.account)"`

- Create the kubernetes administrative access with this account

> `$_> kubectl create clusterrolebinding dictyadmin \`  
>  `--clusterrole=cluster-admin \`  
>  `--user=[email from the previous command]`

##### Note

The email address is case sensitive, be mindful about that (i.e.
`testuser@gmail.com` and `TestUser@gmail.com` are **not** the same). If you get
a "forbidden" error with any manifest with `RBAC` make sure to use the correct
case for your authenticated gcloud account.
