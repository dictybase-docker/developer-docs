---
title: "Concepts"
category: "deployment"
---

## Deployment

Dictybase deployment strategy is inspired by [twelve factor
app](https://12factor.net/) methodology. Our strategy primarily follows these concepts..

- Declarative format for automation, such as [Dockerfile](https://docs.docker.com/engine/reference/builder/).
- Maximum portability across OS, for example both `docker` and `kubernetes`
  could run in all major OS.
- Suitable for deployment on cloud platforms.
- Minimum divergence between development and production platforms.
- Scaling of applications.

## Strategy

For deploying, all dictyBase softwares are packaged using
[Docker](https://docker.io). The packaged (containerized) application are
generally available publicly from the [dictyBase
repository](https://hub.docker.com/r/dictybase/) of Docker Hub. Each repository
in the Docker Hub will be linked to its respective source code in
[GitHub](https://github.com). The GitHub source code and docker hub repository
are linked and the application packages are automatically built from the source
code. The package applications (containerized applcations) are then deployed to
[Kubernetes](https://k8s.io) cluster (manages lifecycle of containerized
applications). For development platform of kubernetes, we use
[Minikube](https://github.com/kubernetes/minikube/#minikube) and for production
we use [Google Container Engine](https://cloud.google.com/kubernetes-engine/).

### Concept

Application deployments are managed by grouping them into **virtual application
stack** where every stack provides a particular service (shares similar functions).
In other words, each stack can also be considered as **multi tiered applications.\***
Every stack is generally consists of the following core applications

- **Backend:** Application that provide storage, for example,
  [postgresql](http://postgresql.org) database application.
- **API server/middleware/microservice:** Application that provides HTTP(and
  grpc) endpoints to access data from the backend based on an specified `API`.
- **Frontend:** A [ReactJS](https://reactjs.org/) based application that runs
  in a web browser and fetches data through `API server`.

So, overall a basic stack is organized as

> **frontend <--> api server <---> backend**.

Now, there are other applications that might be part of some stacks. These are
generally management applications to run one-off tasks(runs to completion).

- **Schema loader:** Application that loads/manage database schema in the
  backend.
- **Data generator:** Generate or pre-process raw data to make it compatible
  for loading. Unless the data is embeddable, it should be a S3(or compatible)
  bucket. For our case we are using [minio](https://docs.minio.io/) for
  production and development.
- **Data loader:** Bootstrap the backend with initial data. Unless the data is
  embeddable, it should be made available from a S3(or compatible) bucket. For
  our case we are using [minio](https://docs.minio.io/) for production and
  development.The generated data is generally loaded in batch.

### Common checklist and steps for installing charts

- Make sure you have added the correct repositories. If not, add them with
  `helm repo add` command.

![](./userinput.png)

> `helm repo list`

- Check for available dictybase charts

![](./userinput.png)

> `helm search -l dicty`

- Update repositories

![](./userinput.png)

> `helm repo update`

- Always add the `--namespace dictybase` parameters for deploying every chart,
  otherwise they might not work as expected.

- At least aware about different configuration parameters and their default
  values(if any) of the chart you are deploying. The `README.md` of every
  accompanying chart is available
  [here](https://github.com/dictybase-docker/kubernetes-charts/). If no
  `README.md` is available, read through the `values.yaml` file, it is generally
  more or less annotated for understanding.

- In addition, use `helm inspect <chart-name>` to check for all configurable options.

- Configuration parameters could be set either from command line `--set something=xxxx` or through a yaml file or a combination of both.
