---
title: "GraphQL Servers"
category: "deployment"
---

```toc

```

Two servers needed to be deployed: the normal GraphQL server and an authserver.

## GraphQL Server

### Prerequisites

All [backend services](/deployment/backend) need to be installed.

- [modware-annotation](https://github.com/dictyBase/modware-annotation)
- [modware-auth](https://github.com/dictyBase/modware-auth)
- [modware-content](https://github.com/dictyBase/modware-content)
- [modware-identity](https://github.com/dictyBase/modware-identity)
- [modware-order](https://github.com/dictyBase/modware-order)
- [modware-stock](https://github.com/dictyBase/modware-stock)
- [modware-user](https://github.com/dictyBase/modware-user)
- [pubfn](https://github.com/dictybase-playground/kubeless-gofn/tree/master/publication)
- [Redis](/deployment/redis)

### Installation

- Create custom config file (`gql.yaml`)

```yaml
endpoints:
  publication: https://ericfunc.dictybase.dev/publications
```

- Install chart

```shell
helm install dictybase/graphql-server --namespace dictybase -n graphql-server -f gql.yaml
```

## GraphQL Authserver

### Prerequisites

- [dictybase-configuration](/deployment/dictybase-configuration)

### Installation

```shell
helm install dictybase/graphql-authserver --namespace dictybase -n graphql-authserver
```
