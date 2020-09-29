---
title: "Dicty Configuration"
category: "deployment"
---

```toc

```

It is necessary to install a chart to store certain secrets and configurations.
This guide is for a fresh installation.

## Set Up Auth Secrets

### Generate Keys

Generating public and private keys is necessary in order to use `auth-api-server`.

```shell
openssl genrsa -out app.rsa 2048
openssl rsa -in app.rsa -pubout -out app.rsa.pub
```

### Create OAuth Config

The JSON-formatted configuration file should contain `client secret keys` for various providers.
The secret key can be obtained by registering a web application with the respective providers.

```json
{
    "google": "secret-key-xxxxxxxxxxx",
    "linkedin": "secret-key-xxxxxxxxxxx",
    "orcid": "secret-key-xxxxxxxxxxx"
    ...........
}
```

## Install Chart

Create YAML values file.

```yaml
arangodb:
  user: elaine
  password: benes
  databases: # databases that are tied to backend applications
    - app: modware-annotation
      name: annotation
    - app: modware-auth
      name: auth
    - app: modware-order
      name: order
    - app: modware-stock
      name: stock
endpoints:
  organism: https://raw.githubusercontent.com/dictyBase/migration-data/master/downloads/organisms-with-citations.dev.json
  publication: https://ericfunc.dictybase.dev/publications
eventMessenger:
  github:
    token: GITHUB_TOKEN...
    owner: dictybase-playground
    repository: learn-gh-action
  email:
    domain: ericmail.dictybase.dev
    sender: noreply@ericmail.dictybase.dev
    senderName: Art Vandelay
    apiKey: MAILGUN_API_KEY...
slack:
  token: SLACK_API_TOKEN...
minio:
  accesskey: MINIO_ACCESS_KEY...
  secretkey: MINIO_SECRET_KEY...
```

Now install the chart using this file (`dicty-config.yaml`).

```shell
helm install dictybase/dictybase-configuration -f dicty-config.yaml \
--set auth.privatekey=$(base64 -w0 app.rsa) --set auth.publickey=$(base64 -w0 app.rsa.pub) \
--set auth.config=$(base64 -w0 app.json) --namespace dictybase
```

**Note:** if using macOS, it is necessary to remove the `-w0` flags from the above command
or change `base64` to `gbase64` if GNU CoreUtils is installed.
