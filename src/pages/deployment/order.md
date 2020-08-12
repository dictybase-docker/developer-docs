---
title: "Suggested Order"
category: "deployment"
---

1. [Set up Helm](/deployment/helm)
2. [Create custom storage class using SSD](/deployment/storageclass)
3. [Install Nats](/deployment/nats)
4. [Install Kubeless(/deployment/kubeless)]
5. [Install Redis](/deployment/redis)
6. [Install PostgreSQL](/deployment/postgres)
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
16. [Install kubeless functions](/deployment/kubeless)
17. [Install frontend web apps](/deployment/frontend)
