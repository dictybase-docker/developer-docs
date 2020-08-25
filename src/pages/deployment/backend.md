---
title: "Backend Services"
category: "deployment"
---

```toc

```

## Services Using PostgreSQL

### Content

```shell
helm install dictybase/content-api-server --namespace dictybase -n content-api-server
```

### User

```shell
helm install dictybase/user-api-server --namespace dictybase -n user-api-server
```

## Services Using ArangoDB

### Identity

Create a YAML values file.

```yaml
database:
  name: auth
  user: larry
  password: david
```

Install the chart.

```shell
helm install dictybase/identity-api-server -f values.yaml --namespace dictybase -n identity-api-server
```

### Auth

```shell
helm install dictybase/auth-api-server --namespace dictybase -n auth-api-server
```

### Annotation

Create a YAML values file.

```yaml
database:
  name: annotation
  user: larry
  password: david
```

Install the chart.

```shell
helm install dictybase/annotation-api-server -f values.yaml --namespace dictybase -n annotation-api-server
```

### Order

Create a YAML values file.

```yaml
database:
  name: order
  user: larry
  password: david
```

Install the chart.

```shell
helm install dictybase/order-api-server -f values.yaml --namespace dictybase -n order-api-server
```

### Stock

Create a YAML values file.

```yaml
database:
  name: stock
  user: larry
  password: david
```

Install the chart.

```shell
helm install dictybase/stock-api-server -f values.yaml --namespace dictybase -n stock-api-server
```
