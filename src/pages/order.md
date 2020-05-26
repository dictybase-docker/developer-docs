---
title: "Suggested Order"
---

# Suggested Order

1. Helm
   - create rbac
   - initialize w/ tiller
   - add dictybase helm repo
   - create [admin](admin.md) clusterrolebinding
   - create nats clusterrolebinding
2. [Create custom storage class using SSD](storageclass.md)
3. Install Nats
   - nats-operator
   - nats
4. Install Kubeless
5. Install Redis
6. Install PostgreSQL
   - install dictycontent-schema
   - install dictyuser-schema
7. [Install Ingress](ingress.md)
   - install nginx-controller
   - install cert-manager
   - create issuer and certificate
   - install dictybase-auth-ingress
   - install dictybase-ingress
8. [Install Minio](minio.md)
9. [Install ArangoDB](arangodb.md)
   - install kube-arangodb-crd
   - install kube-arangodb
   - install dictybase/arangodb
   - install dictybase/arango-create-database
10. [Install Argo](argoevents.md)
    - create argo namespace
    - add argo helm repo
    - create issuer and certificate
    - create minio secret
    - create github secret
    - create slack secret
    - create docker secret
    - create github gateway ingress
    - apply argo workflow rbac
    - install argo w/ custom values
    - install argo-events (same namespace)
    - install argo-pipeline
11. Install API services
    - content-api-server
    - user-api-server
    - identity-api-server
    - authserver
    - modware-order
    - modware-stock
    - modware-annotation
12. Install graphql-server
13. Load data
    - load-users
    - content-loader
    - assign-roles-permissions
    - load-identity
14. Install kubeless functions
    - genefn
    - genecachefn
    - uniprotcachefn
    - goidsfn
    - dashfn
    - pubfn
15. Install frontend web apps
    - dicty-stock-center
    - dicty-frontpage
      - add files for download section to minio
    - genomepage
    - dictyaccess
    - publication

---

# Deployments with prereqs

## Argo

- cert-manager
- cluster admin
- minio
- minio secret
- workflow rbac
- custom config (serviceaccount, namespace, ingress, minio) on install

## Argo Events

- argo

## Argo Pipeline

- argo
- argo events
- slack secret
- github secret
- docker secret
- github ingress

## ArangoDB

- nats

## API Services...

## Content API

- postgreSQL
- dictycontent schema

## User API

- postgreSQL
- dictyuser schema

## Identity API

- arangodb

## Order API

- arangodb

## Stock API

- arangodb

## Annotation API

- arangodb

## GraphQL Server

- content
- user
- order
- stock
- annotation
- kubeless
  - pubfn

## Frontend apps...

## DSC

- authserver
- content api
- user api
- identity api
- order api
- stock api
- annotation api
- graphql server

## dicty-frontpage

- authserver
- content api
- user api
- identity api

## genomepage

- authserver
- user api
- identity api
- kubeless
  - genefn
  - genecachefn
  - uniprotcachefn
  - goidsfn

## dictyaccess

- authserver
- user api
- identity api
- kubeless
  - dashfn

## publication

- authserver
- user api
- identity api
- graphql server
