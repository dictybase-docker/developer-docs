---
title: "Frontend Web Applications"
category: "deployment"
---

```toc

```

## Dicty Stock Center

### Prerequisites

This app requires the following backend software to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)
- [modware-auth](https://github.com/dictyBase/modware-auth)
- [modware-annotation](https://github.com/dictyBase/modware-annotation)
- [modware-content](https://github.com/dictyBase/modware-content)
- [modware-identity](https://github.com/dictyBase/modware-identity)
- [modware-order](https://github.com/dictyBase/modware-order)
- [modware-stock](https://github.com/dictyBase/modware-stock)
- [modware-user](https://github.com/dictyBase/modware-user)

**Note:** in order to create GitHub issues and send emails on order submission, the
appropriate `event-messenger` charts also need to be deployed.

### Installation

```shell
helm install dictybase/dicty-stock-center --namespace dictybase -n dicty-stock-center \
--set image.tag=YOUR_TAG_HERE
```

### Draft.js to Slate.js Conversion

If upgrading from the old DSC (pre-GraphQL), it is necessary to install two Helm charts
to handle the conversion of the rich text editor from Draft.js to Slate.js.

1. First create a YAML file to be used with the conversion chart. Specify your Minio
   access key (`akey`), secret key (`skey`) and bucket to upload to. The `userId` should be
   the ID of the user you wish to attribute the content to.

```yaml
minio:
  akey: ANYTHINGYOUWANT
  skey: ITISASECRET
  bucket: dsc-contents
userId: 1635
```

2. Install the `convert-draftjs-content` chart.

```shell
helm install dictybase/convert-draftjs-content --namespace dictybase -f values.yaml \
--set image.tag=develop-bce5069
```

3. Install the `upload-slatejs-content` chart using the same value file.

```shell
helm install dictybase/upload-slatejs-content --namespace dictybase -f values.yaml \
--set image.tag=develop-bce5069
```

## Genomepage

### Prerequisites

This app requires the following backend software to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)
- [modware-auth](https://github.com/dictyBase/modware-auth)
- [modware-identity](https://github.com/dictyBase/modware-identity)
- [modware-user](https://github.com/dictyBase/modware-user)

### Installation

```shell
helm install dictybase/genomepage --namespace dictybase -n genomepage \
--set image.tag=YOUR_TAG_HERE
```

## Dicty Frontpage

### Prerequisites

This app requires the following backend software to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)
- [modware-content](https://github.com/dictyBase/modware-content)
- [modware-identity](https://github.com/dictyBase/modware-identity)
- [modware-user](https://github.com/dictyBase/modware-user)

### Installation

```shell
helm install dictybase/dicty-frontpage --namespace dictybase -n dicty-frontpage \
--set image.tag=YOUR_TAG_HERE
```

## DictyAccess

### Prerequisites

This app requires the following backend software to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)
- [modware-identity](https://github.com/dictyBase/modware-identity)
- [modware-user](https://github.com/dictyBase/modware-user)
- [dashfn](https://github.com/dictybase-playground/kubeless-gofn/tree/master/dashboard)

### Installation

```shell
helm install dictybase/dictyaccess --namespace dictybase -n dictyaccess \
--set image.tag=YOUR_TAG_HERE
```

## Publication

### Prerequisites

This app requires the following backend software to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [pubfn](https://github.com/dictybase-playground/kubeless-gofn/tree/master/publication)

### Installation

```shell
helm install dictybase/publication --namespace dictybase -n publication \
--set image.tag=YOUR_TAG_HERE
```
