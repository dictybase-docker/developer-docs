---
title: "ArangoDB"
category: "deployment"
---

## Prerequisites

- Have a `configured (kubectl access)`
  [GKE](https://cloud.google.com/kubernetes-engine/) access.
- [Setup](/admin) cluster admin access.
- [Setup](/storageclass) custom storage class to use `SSD` disk.
- This guide assumes only one ArangoDB server instance for each cluster.

## Fresh Install

### ArangoDB custom resource definition (CRD)

_version: 0.3.11_

Install two charts, a `CRD` and `deployment controller`.

```shell
helm install https://github.com/arangodb/kube-arangodb/releases/download/0.3.11/kube-arangodb-crd.tgz
helm install https://github.com/arangodb/kube-arangodb/releases/download/0.3.11/kube-arangodb.tgz \
--set=DeploymentReplication.Create=false --namespace dictybase
```

In the second step we are disabling deployment replication. For details look
[here](https://github.com/arangodb/kube-arangodb/blob/0.3.11/docs/Manual/Deployment/Kubernetes/Helm.md).

### Install arangodb server (single deployment)

```shell
helm repo update
helm install dictybase/arangodb --namespace dictybase
--set arangodb.dbservers.storageClass=fast \
--set arangodb.single.storage=50Gi
```

Here we are using the custom [storage class](/storageclass) and have also
set up the storage space. ArangoDB version `3.5.4` is also installed by
default. To see what else you can customize, check out the chart
[README](https://github.com/dictybase-docker/kubernetes-charts/tree/master/arangodb).

## Upgrade existing ArangoDB server

### Upgrade server instance

By default the chart will install the ArangoDB version `3.5.4`. To use another,
pick a different version from
[here](https://hub.docker.com/_/arangodb/?tab=tags)

> `$_> helm repo update`  
> `$_> helm upgrade [RELEASE NAME] dictybase/arangodb --set=image.tag=[VERSION] --namespace dictybase`

##### Very important notes

- Storage space of the database can only be increased, decreasing it is not
  possible (apparently PVC cannot be shrinked) The pod must be restarted to
  increase the storage.
  > `kubectl delete pod [POD NAME] -n dictybase`
- Use the helm chart directly to upgrade for patch versions (3.3.11 -> 3.3.23).
  To upgrade the minor versions (3.3.23 -> 3.4.5), you should backup and restore
  the database content in addition to the Helm chart upgrade process.

### Remove deployment (NOT CRD)

To upgrade the operator to the latest version with Helm, you have to
delete the previous deployment and then install the latest. **HOWEVER**:
You _must not delete_ the custom resource definitions (CRDs), or your
ArangoDB deployments will be deleted!

Therefore, you have to use `helm ls` to find the deployments for the
operator (`kube-arangodb`) and use `helm delete` to delete them using the
automatically generated deployment names. Here is an example of a `helm list` output:

```
% helm list
NAME            	REVISION	UPDATED                 	STATUS  	CHART                               	APP VERSION	NAMESPACE
steely-mule     	1       	Sun Mar 31 21:11:07 2019	DEPLOYED	kube-arangodb-crd-0.3.11             	           	default
vetoed-ladybird 	1       	Mon Apr  8 11:36:58 2019	DEPLOYED	kube-arangodb-0.3.11                	           	default
```

So here, you would have to enter

> `$_> helm delete vetoed-ladybird`

Make sure **not to delete `steely-mule`**. See official
[README](https://github.com/arangodb/kube-arangodb/blob/master/README.md) for
more information. If wanting to upgrade to several releases ahead, it is
advised to upgrade incrementally (i.e. `0.3.8` to `0.3.10` to `0.3.11`, etc.).

### Upgrade CRD and install new Deployment

Upgrade the existing CRD (optional).

> `$_> helm upgrade [RELEASE NAME] \`  
>  `https://github.com/arangodb/kube-arangodb/releases/download/[VERSION]/kube-arangodb-crd.tgz`

Next, install the operator for `ArangoDeployment` while making sure to disable deployment replication.

> `$_> helm install \`  
>  `https://github.com/arangodb/kube-arangodb/releases/download/[VERSION]/kube-arangodb.tgz \`  
>  `--set=DeploymentReplication.Create=false --namespace dictybase`

Verify that everything is working as expected, then proceed to the next version.
Repeat as necessary.

### Upgrading to and beyond version 0.3.16

Starting with version `0.3.16`, a few changes were made to the official Helm charts. The upgrade
process remains as above, however it has some differences in naming conventions.

First delete the existing deployment like above.

> `$_> helm delete [RELEASE NAME]`

Upgrade the existing CRD to 0.3.16. Note that the filename now includes the version number.

> `$_> helm upgrade [RELEASE NAME] \`  
>  `https://github.com/arangodb/kube-arangodb/releases/download/0.3.16/kube-arangodb-crd-0.3.16.tgz`

Install the matching operator for `ArangoDeployment`. Note the new format for disabling deployment replication.

> `$_> helm install \`  
>  `https://github.com/arangodb/kube-arangodb/releases/download/[VERSION]/kube-arangodb-[VERSION].tgz \`  
>  `--set operators.features.deploymentReplications=false --namespace dictybase`

Release 0.3.16 is the last of that minor version. From there you can upgrade the same way to `0.4.0` and its
patch versions.

Using database version `3.5.4` with this deployment is fine. See the notes below on how to upgrade
the database version.

## Create new databases(in existing server instance)

```yaml
database:
  names:
    - annotation
    - auth
    - order
    - stock
  user: george
  password: costanza
  grant: rw
```

```shell
helm install dictybase/arango-create-database --namespace dictybase -f config.yaml
```

**Note:** this chart is capable of creating both databases and users in one shot.
If the user `george` in this example does not exist, this chart will create the
user and grant them `rw` permissions for the databases listed. If the user does
exist, this will update their grant privileges to `rw` or whatever you specify.

You can add more database names in the `names` parameters as necessary. Existing
ones will be skipped and new ones will be created.
