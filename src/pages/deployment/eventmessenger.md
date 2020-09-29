---
title: "Event Messenger"
category: "deployment"
---

```toc

```

[event-messenger] is a server to handle events as a subscriber through NATS messaging.
Currently there are two charts that need to be installed to handle DSC orders.

## Prerequisites (for both)

- [dictybase-configuration](/deployment/dictyconfig)
- [modware-order](https://github.com/dictyBase/modware-order)
- [NATS](/deployment/nats)

## event-messenger-email

This chart is used to send emails when a new stock order comes through.

### Installation

```shell
helm install deployments/charts/event-messenger-email -n event-messenger-email --namespace dictybase
```

## event-messenger-issue

This chart is used to create GitHub Issues when a new stock order comes through.

### Installation

```shell
helm install deployments/charts/event-messenger-issue -n event-messenger-issue --namespace dictybase
```
