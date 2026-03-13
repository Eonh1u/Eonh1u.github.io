---
title: volcano ECS开机逻辑修改记录
date: 2020-10-10 19:39:40
tags:
- k8s
- 分布式
- docker
categories: k8s
---
# 修改ECS开机逻辑问题记录 
## 修改原因
之前的ECS开机在enqueue阶段实现。逻辑为：如果作业是pending状态，并且作业所需的资源大于集群的空闲资源。这个时候就为该任务开启一台ECS节点。
假设作业所需的资源为R1，目前集群的空闲资源为R2，在之前的逻辑中会选择一个资源为R3的ECS节点，使得R3 + R2 >= R1。这样就出现了一个问题，我们的想法是使得作业能在新开启的节点上运行的（目前只考虑单机作业), 即新开启的ECS必须满足R3 >= R1, 这样看来，之前的开机逻辑是存在问题的，在实际中我们也碰到了这种情况。
所以我们需要将ECS开机逻辑进行更改。
<!--more-->
## 开机逻辑设计
将开机逻辑移至enqueue的下一个阶段，allocate。
allocate阶段当初在进行分配node前会获取node列表，获取node列表时会只选择开启的node节点
`allNodes := util.GetReadyNodeList(ssn.Nodes)`
将此部分进行更改为返回所有的节点
`allNodes := util.GetAllNodeList(ssn.Nodes)`


在predicate筛选阶段，因为对于未开启节点，在predicate阶段有几种方式都会将未开启的节点过滤，因此再此只判断node节点资源能够满足task要求，能够满足判断通过node筛选

prioritize阶段对通过predicate筛选节点进行打分，选择最合适的节点。因为之前在此阶段的节点都是已经开启的节点，现在未开启的节点加入进来，需要对打分进行一些修改，目前我们修改打分机制使得优先选择已经开启的节点

对节点打分之后，可以选择出来一个最高分的节点，如果此节点为未开启的节点，我们将此节点放入toStartNode中，toStartNode中的节点都会在判断job的所有task数目（或者满足最少task数目)都满足需求之后，在stmt.commit之前进行开启。
`toStartNode = append(toStartNode, node)`

## 碰到的问题
### 1.在node节点开启之后，马上进行commit，会出现Pod Update plugin resources failed due to requested number of devices unavailable for nvidia.com/gpu. Requested: 1, Available: 0, which is unexpected.错误，
这里初次判断是因为在节点开启之前就进行allocate会产生一些错误，后面通过读代码发现问题不在这里，此问题产生的原因是因为在stmt.commit时，k8s将task提交至node时，获取的node gpu数目不足以满足作业需求，所以才产生了此错误。

在判断节点是否满足需求时，我们已经得到了满足需求的结果，为什么进行提交之后会返回错误那，通过测试(在节点开启之后，sleep5分钟，然后再进行commit)发现作业commit之后能够成功的进行调度，所以感觉是k8s对于gpu资源的获取延迟产生的问题，所以我们需要在allocate部分感知到k8s什么时候能够获取的node上正确的gpu信息。

在allocate部分，通过对代码进行修改使得能够通过session得到scheduler对应的kubeclient，我们通过kubeclient可以得到node信息(暴露私有成员，修改sheduler 部署权限）
`nodeinfo, err := kubeclient.CoreV1().Nodes().Get(node.Name, metav1.GetOptions{})`

通过在程序中进行检测，发现在node节点从关闭状态至开启状态，然后开启之后的过程中，Allocatable的gpu数目会发生1->0->1的变化，k8s原生的资源则不会产生此变化，不会出现值变为0的情况

```
gpuinfo := nodeinfo.Status.Allocatable["nvidia.com/gpu"].DeepCopy()
gpunum, f := gpuinfo.AsInt64(）
```

猜测出现此情况的原因是k8s通过Device Plugins来感知gpu资源，在节点开启之后，不能及时的更新gpu数目，但此处为何会产生这种变化尚不明确，以后可以再加深探索一下。

目前的测试得到在1->0->1之后，进行commit则不会产生此种错误(在Node ready condition状态为true并且gpu num == 1之后进行commit之后也不会出现错误)

目前系统中判断node gpu信息准备完成是根据nodeinfo.Status.Conditions中NodeReady为true，并且gpu数目 > 0 （对于cpu节点，等于0也判断为true)

## 修改具体细节
### 通过session获取kubeclient修改代码
session中有cache信息,schedulerCache实现了cache并且其中含有kubeclient，因此可以通过session来得到client。

因为kubeclient在cache中为私有成员，所以chche接口中添加GetKubeclient()方法
修改pkg/scheduler/cache/cache.go文件
```
//通过defaultBinder得到kubeclient
func (sc *SchedulerCache) GetKubeclient() *kubernetes.Clientset {
	return sc.kubeclient
}
```

修改pkg/scheduler/framework/session.go文件
```
//GetClient Get client from session
func (ssn *Session) GetClient() *kubernetes.Clientset {
	return ssn.cache.GetKubeclient()
}
```
修改完代码之后便可以通过session来得到kubeclient，从而可以访问node，pod等信息。

在测试中发现通过kubeclient获取node信息失败，发现原因是在部署scheduler时限制了client的功能
修改installer/volcano-development.yaml文件,添加对nodes的get操作，便可以获取node信息

```  - apiGroups: [""]
    resources: ["nodes"]
    // verbs: ["list", "watch"]
    verbs: ["list", "watch", "get"]
```
