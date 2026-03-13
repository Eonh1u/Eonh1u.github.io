---
title: nccl test 环境
date: 2020-12-30 10:59:43
tags:
- 分布式机器学习
- horovod
- 此生最痛苦的配环境
categories: 此生最痛苦的配环境
---

在之前的服务器上发现安装的nccl，不能正确的运行nccl test测试，在尝试了多种方法之后，发现需要重新编译安装nccl

https://github.com/nvidia/nccl

按照官方github上说明进行编译安装

```
apt install build-essential devscripts debhelper fakeroot -y 
make -j pkg.debian.build
dpkg -i build/pkg/deb/*.deb
```
<!--more-->

我的环境中cuda与nccl都是默认路径，因此在编译nccl-test时无需再说明对应路径


```
make MPI=1 MPI_HOME=/usr/local/
```

执行上述命令之后，将编译完成的build复制至其他节点，然后即可进行测试