---
title: 51nod 奥林匹克年
date: 2019-07-25 23:07:02
tags: ["ACM"]
categories: ["ACM"]
---
**题目：**
奥林匹克竞赛从1989年开始举行，每一个奥林匹克年都会有一个缩写IAO'y， y表示那一年的最后几位数字。 组织者会取一个之前未被用过的缩写来表示该年份，而且要尽可能的短。

例如，前三个奥林匹克年是1989，1990和1991，他们对应的缩写是IAO'9， IAO'0 和IAO'1，而2015的缩写是IAO'15，因为IAO'5已经被1995用过了。

现在给出一个缩写，请判断这个是代表哪一年的。
<!--more-->
多组测试数据。
**输入**
第一行有一个整数n (1≤n≤1000) ，表示要处理n组数据。
接下来n行，每一行有一个缩写。每一个缩写最多包含9位数字。
**输出**
对于每一个缩写，请输出对应的年份。
**样例**
5
IAO'15
IAO'2015
IAO'1
IAO'9
IAO'0

2015
12015
1991
1989
1990
**做法：**
经过思考并且打表找规律后。可以先预处理将位数比较小的数进行存储，用map映射即可，对于位数比较大的，全部预处理肯定不现实，规律如下：对于输入的每个数，数字的变化发生在1(*)3099处，举个例子，如果输入的是六位数，则113098之前的（包括113098），则ans为1113098，即之间在前面补1，如果大于等于113099，则直接输出，不用做任何处理。
**代码**

```#include<stdio.h>
#include<algorithm>
#include<string>
#include<cstring>
#include<set>
#include<map>
#include<iostream>
using namespace std;
map<string, int> m;
set<string> s;
int main()
{
    for(int i = 1989; i <= 100000; i++)
    {
        int p = i;
        string str = "";
        string now = str + char(int('0')+ p%10);
        while(s.find(now) != s.end())
        {
            p/=10;
            str = now;
            now = char(int('0')+ p%10) + str;
        }
        //cout<<now<<" ";
        s.insert(now);
        m[now] = i;
        //printf("%d\n",i);
    }
    int t;
    scanf("%d",&t);
    char c;
    scanf("%c",&c);
    //cout << t <<endl;
    while(t--)
    {
        char a[10];
        scanf("IAO\'%s%c",a,&c);
        //cout << a <<endl;
        if(strlen(a) <= 4)
            printf("%d\n", m[a]);
        else
        {
            int l = strlen(a);
            int rsum = (a[l-1] - '0') + 10*(a[l-2]-'0') + 100*(a[l-3]-'0') + 1000*(a[l-4]-'0');
            int now = 1;
            int p = l - 5;
            while(p--)
            {
                now = now * 10 + 1;
            }
            int lsum = 0;
            //cout << "p "<<p<<endl;
            for(int i = 0; i < l - 4; i++)
                lsum = lsum * 10 + (a[i] - '0');
           // cout << "lsum rsum"<<lsum<<" "<<rsum<<endl;
            if(lsum < now)
                printf("1%s\n",a);
            else if(lsum == now && rsum < 3099)
                printf("1%s\n",a);
            else 
                printf("%s\n",a);
        }
    }
    return 0;
}
```
