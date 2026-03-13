---
title: 51nod-2281-树的size之和
date: 2019-08-02 23:21:36
tags: ["ACM"]
categories: ["ACM"]
---
题目：
给出一棵n个节点的树，节点编号为1-n（根节点编号为1），每一个节点作为根节点与他所有的子孙节点形成一棵子树，而这棵子树包含节点的数量，称作子树的Size。

例如：

1─2─4─5
└─3

其中节点5的子树只包括节点5，Size = 1。节点4的子树包括节点4，5，Size = 2。节点1的子树包括节点1，2，3，4，5，Size = 5。

求以所有节点为根的子树的Size之和。上面例子中，节点1到5，对应的Size分别为5，3，1，2，1，所有Size的和 = 5 + 3 + 1 + 2 + 1 = 12
<!--more-->

输入
第一行：1个数n（1 < n <= 1000），表示树的节点数量。
后面n-1行：每行2个数x y，表示节点x是节点y的父节点（1 <= x, y <= n）。
输出
输出1个数，表示以所有节点为根的子树的Size之和。
输入样例
5
1 2
1 3
2 4
4 5
输出样例
12

解法:
暴力递归求解就可以，数据量再大的话可以加一下记忆化搜索。
每日划水5555555
代码:

```#include<stdio.h>
#include<queue>
#include<vector>
using namespace std;
vector<int>  s[10010];
bool f[10010];
int t[10010];
using namespace std;
int c(int x)
{
    int sum = 1;
    for(int i = 0; i < s[x].size(); i++)
        sum += c(s[x][i]);
    return sum;
}
int main()
{
    int n;
    scanf("%d", &n);
    int p = n - 1;
    while(p--)
    {
        int a,b;
        scanf("%d%d", &a, &b);
        f[b] = true;
        s[a].push_back(b);
    }
    int sum = 0;
    for(int i = 1; i <= n; i++)
        {
            sum += c(i);
        }
    printf("%d\n", sum);
}
```

