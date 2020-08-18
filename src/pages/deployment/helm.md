---
title: "Helm"
category: "deployment"
---

```toc
```

# Upgrade helm
It's recommend to upgrade `helm(v2)` to its latest version. As of this
writing upgrade helm to
[v2.16.9](https://github.com/helm/helm/releases/tag/v2.16.9). After the
upgarde of helm binary, run
```shell
helm init --upgrade
```
Then wait for 5-6 seconds and check the helm client and server version. They should match each other.
```shell
helm version
```

# Create/Update update chart in the repository

- Clone the dictybase helm chart repository

```shell
git clone git@github.com:dictybase-docker/kubernetes-charts.git
```

- Create appropiate chart folder and add the required files and folders.
- Create package from folder from the root of the cloned repository.

```shell
helm package -d docs <FOLDER NAME>
```

- Update the package index.

```shell
helm repo index docs
```

- Commit the push the changes.
- Synchronize the changes with helm client.

```shell
helm repo update
```
