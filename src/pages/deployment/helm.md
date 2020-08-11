---
title: "Helm"
category: "deployment"
---

# Upgrade helm
It's recommend to upgrade `helm(v2)` to its latest version. As of this writing upgrade helm
to [v2.16.9](https://github.com/helm/helm/releases/tag/v2.16.9). After the upgarde of helm binary,
run 
```shell
helm init --upgrade
```
Then wait for 5-6 seconds and check the helm client and server version. They should match each other.
```shell
helm version
```