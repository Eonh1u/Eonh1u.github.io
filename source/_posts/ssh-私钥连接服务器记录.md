---
title: ssh 私钥连接服务器记录
date: 2020-10-15 14:29:11
tags:
- 此生最痛苦的配环境
- linux
categories: 此生最痛苦的配环境
---
若执行ssh-add /path/to/xxx.pem是出现这个错误:Could not open a connection to your authentication agent，则先执行如下命令即可：
　　ssh-agent bash
然后执行ssh-add xxx.pem
如果出现ssh “permissions are too open” error，则执行chmod命令修改xx.pem文件权限
chmod 400 ~/.ssh/id_rsa   或者 chmod 600 ~/.ssh/id_rsa
<!--more-->
这样配置之后，有可能每次进来终端，都需要重新运行上述命令才能够连接上服务器
所以在/etc/bash.bashrc 末尾添加


```
if [ -f ~/.agent.env ];then
    . ~/.agent.env >/dev/null
    if ! kill -0  $SSH_AGENT_PID >/dev/null 2>&1; then
            echo " stale agent file found. Spawning new agent...."
            eval `ssh-agent | tee ~/.agent.env `
        if [[ $? -eq 0 ]] ;then
            echo "agent ok!"
        fi
            ssh-add 'xxxx.xx' # your private key
            if [[ $? -eq 0 ]] ; then
            echo "key add ok!"
        fi
    fi
else
    eval ` ssh-agent |tee ~/.agent.env` >/dev/null 2>&1
    if [[ $? -eq 0 ]] ;then
       echo "agent ok!"
    fi
    ssh-add 'xxxx.xx' # your private key
    if [[ $? -eq 0 ]] ; then
       echo "key add ok!"
    fi
fi
```

在有些服务器上修改/etc/bash.bashrc不生效，可以在 /etc/profile.d/路径下添加sh文件，文件内容如上，这样便可以进行ssh无密码登录服务器
