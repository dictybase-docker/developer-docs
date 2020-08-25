---
title: "PostgreSQL"
category: "deployment"
---

The PostgreSQL backend is currently used by the following API services:

- user-api-server
- content-api-server

## Installation

- Create `YAML` values file.

```yaml
postgresPassword: somepass...
dictycontentPassword: somepassagain...
dictyuserPassword: somepassagain...
```

- Deploy the chart.

```shell
helm install dictybase/dictycontent-postgres --namespace dictybase -f values.yaml \
-n dictycontent-postgres
```

### Load Schema

Two schemas also needed to be loaded.

```shell
helm install dictybase/dictycontent-schema --namespace dictybase -n dictycontent-schema
helm install dictybase/dictyuser-schema --namespace dictybase -n dictyuser-schema
```
