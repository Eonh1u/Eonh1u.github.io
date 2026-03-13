---
title: k8s初体验
date: 2018-12-28 17:51:47
tags:
- k8s
- 分布式
categories: ["k8s"]
---
此文将第一次对k8s的感受以及对k8s中的部分的作用进行解释，在解释的过程中不采用特别拗口专业的词汇，试着将其中的部件用实例的方式描述清楚。当然这只是简单的将自己的现在的理解（2018，12，28）用文字表述出来，肯定是有很多错误的，并且对其中各个部件具体的组成不会介绍。已经将会随着学习的深入，将描述变得清晰一点。

### 1.Master与Node
Master与Node在现实中对的你可以理解为一台电脑，一个虚拟机，一台服务器这种例子，我们在进行配置的时候可以根据地址指定某台为Master或者Node。Master与Node可以共存，也就是说可以指定某台为Master的同时并将其当作Node。
Master的作用是：对整个集群进行调度，并提供系统进行操作的接口
Node的作用是：同劳动力一样，就是进行劳动，将Master所分配的任务完成就好。
<!--more-->
### 2.Docker与Pod
Docker是一个容器，可以理解为Docker是我们需要运行某个程序所需要的环境以及资源，Docker是完全沙箱隔离的（陪环境什么的去死吧），比如我们向写一个简单的c语言的hello-world程序，我们便可以在一个docker中进行编写，同时在运行docker的系统中不需要配置任何环境，我们只需要创建一个包含此hello-world的镜像的docker进行运行，便可以，然后运行结束之后，系统与原来的一样，不含任何杂质。
Pod是k8s进行操作的最小单位，意思是k8s进行调度时，便是对pod的分配进行调度。
在一个Pod中可以含有多个Pod，Pod的结构可以由用户自己编写，可以简单的理解为Pod时需要运行的程序，在Pod中的多个Docker便是程序的的组成。在一个Pod中的多个Docker共享Pod中的资源，并且多个Docker之间可以进行localhost访问。
### 3.Service
可以这么简单的理解，现在我们定义了一个可以计算a+b的Pod，并且将Pod运行在了多个Node中（一个Node中对应一个a+b的Pod），其中每个node中的Pod程序都是完全相同的，这就是副本。但是程序相同的Pod具有不同的ip，为了方便执行程序，我们用Service将Pod进行绑定，当我们指明要执行a+b这个Service时，k8s将会自动的找到相应的Node去调用Pod来执行。
### 4.label
可以将label理解为简单的表格，通过此表格我们可以根据不同的值，找到相对应的Pod，Node等结构，同时在label中也记录了结构之间的关系，例如，Pod与Node的对应关系。
### 5.Replication Controller
目前的了解还不是很清楚，可以大概的认为，RC是一个请求执行程序的要求，在其中包含了Pod的组成即任务的要求，还有Pod需要运行的副本的数量等信息。

下面将k8s一次执行的流程进行简单的描述：
1.我们通过kubectl命令通过API Server提交一个创建RC的的请求，在请求的过程中，该请求记录被记录在etcd中
2.提交请求的过程中，Controller Manager通过API Server得到了此请求的信息，发现现在并没有此RC的Pod实例，于是便根据RC中的Pod描述，创建一个Pod对象，并且也将此过程通过API Server记录在etcd中。
3.在Controller Manager创建对象完成后，Scheduler便通过一系列计算选择一个Node节点，并将此Pod放置在此Node中，并且也将此结果通过API Server记录在etcd中。
4.调度结果出来后，被选择的Node节点从API Server中得到自己被选中的信息，便按照Pod的定义，在本地进行执行，并且一直负责，直到该Pod的结束。

从这个简单流程中，我们可以知道，API Server为所有部件的连接桥，负责信息的交流，同时在过程中产生的信息以及关系都会通过API Server记录在etcd中。
