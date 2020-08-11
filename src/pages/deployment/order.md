---
title: "Suggested Order"
category: "deployment"
---

1. Helm
   - create rbac
   - initialize w/ tiller
   - add dictybase helm repo
   - create [admin](/deployment/admin) clusterrolebinding
2. [Create custom storage class using SSD](/deployment/storageclass)
3. [Install Nats](/deployment/nats)
4. [Install Kubeless(/deployment/kubeless)]
5. [Install Redis](/deployment/redis)
6. Install PostgreSQL
   - install dictycontent-schema
   - install dictyuser-schema
7. [Install Ingress](/deployment/ingress)
8. [Install Minio](/deployment/minio)
9. [Install ArangoDB](/deployment/arangodb)
10. Install dictybase-configuration chart
11. Install API services
    - content-api-server
    - user-api-server
    - identity-api-server
    - authserver
    - auth-api-server
    - annotation-api-server
    - order-api-server
    - stock-api-server
12. Install graphql-server
13. Install graphql-authserver
14. Install event-messenger
    - event-messenger-email
    - event-messenger-issue
15. Load data
    - load-users
    - content-loader
    - assign-roles-permissions
    - load-identity
    - modware-import (need to upload the argo workflow first?)
16. Install kubeless functions
    - genefn
    - genecachefn
    - uniprotcachefn
    - goidsfn
    - dashfn
    - pubfn
17. Install frontend web apps
    - dicty-stock-center
      - deploy `convert-draftjs-content`
    - dicty-frontpage
      - add files for download section to minio
    - genomepage
    - dictyaccess
    - publication

---

# Deployments with prereqs

## API Services

### Content API

- postgreSQL
- dictycontent schema

### User API

- postgreSQL
- dictyuser schema

### Identity API

- arangodb

### Order API

- arangodb

### Stock API

- arangodb

### Annotation API

- arangodb

### GraphQL Server

- content
- user
- order
- stock
- annotation
- auth
- kubeless
  - pubfn

## Frontend apps

### DSC

- content api
- user api
- identity api
- order api
- stock api
- annotation api
- auth api
- graphql server
- graphql authserver
- event-messenger

### dicty-frontpage

- authserver
- content api
- user api
- identity api

### genomepage

- authserver
- user api
- identity api
- kubeless
  - genefn
  - genecachefn
  - uniprotcachefn
  - goidsfn

### dictyaccess

- authserver
- user api
- identity api
- kubeless
  - dashfn

### publication

- authserver
- user api
- identity api
- graphql server
