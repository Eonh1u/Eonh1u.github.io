---
title: ucas 2小题
date: 2019-10-06 20:22:51
tags: ["ACM"]
categories: ["ACM"]
---
# A：
Given an array of size n, ﬁnd the majority element. The majority element is the element that appears more than b n c times.You may assume that the array is non-empty and the majority 2 element always exist in the array.

INPUT:

Line 1: the length of array.

Line 2: the all elements in array and split by spaces OUTPUT:

Line 1: A single integer that is the majority element.
<!--more-->
解法：map存储出现数量，同时更新ans即可

```
#include<stdio.h>
#include<map>
using namespace std;
map<int, int> m;
int main()
{
    int n;
    scanf("%d", &n);
    int MAX = 0, ans =0;
    while(n--)
    {
        int a;
        scanf("%d", &a);
        m[a]++;
        if(m[a] > MAX){
            MAX = m[a];
            ans = a;
        }
    }
    printf("%d\n", ans);
}
```
# B:
Given a 2d m * n grid map of ’1’s (land) and ’0’s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

INPUT:

Line 1: m and n.

Line 2: ’1’ or ’0’ in grid and split by spaces OUTPUT:

Line 1: number of islands.
解法:dfs水题

```
#include<stdio.h>
#include<algorithm>
using namespace std;
int s[1010][1010];
int n,m;
int yd[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
void dfs(int x, int y)
{
    for(int i = 0; i < 4; i++){
        int xx = x + yd[i][0];
        int yy = y + yd[i][1];
        if(xx >= 0 && xx < n && yy >= 0 && yy < m){
            if(s[xx][yy] == 1){
                s[xx][yy] = 0;
                dfs(xx,yy);
            }
        }
    }
}
int main()
{
    int ans = 0;
    scanf("%d%d", &n, &m);
    for(int i = 0; i < n; i++)
        for(int j = 0; j < m; j++)
            scanf("%d", &s[i][j]);
    for(int i = 0; i < n; i++)
        for(int j = 0; j < m; j++){
            if(s[i][j] == 1){
                ans++;
                s[i][j] = 0;
                dfs(i, j);
            }
        }
    printf("%d\n", ans);
}
```

