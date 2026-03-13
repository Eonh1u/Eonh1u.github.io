---
title: cf-595-div3
date: 2019-10-23 22:43:53
tags: ACM
categories: ACM
---
# A:Yet Another Dividing into Teams
## 题目：
You are a coach of a group consisting of 𝑛 students. The 𝑖-th student has programming skill 𝑎𝑖. All students have distinct programming skills. You want to divide them into teams in such a way that:

No two students 𝑖 and 𝑗 such that |𝑎𝑖−𝑎𝑗|=1 belong to the same team (i.e. skills of each pair of students in the same team have the difference strictly greater than 1);
the number of teams is the minimum possible.
You have to answer 𝑞 independent queries.
<!--more-->

### Input
The first line of the input contains one integer 𝑞 (1≤𝑞≤100) — the number of queries. Then 𝑞 queries follow.

The first line of the query contains one integer 𝑛 (1≤𝑛≤100) — the number of students in the query. The second line of the query contains 𝑛 integers 𝑎1,𝑎2,…,𝑎𝑛 (1≤𝑎𝑖≤100, all 𝑎𝑖 are distinct), where 𝑎𝑖 is the programming skill of the 𝑖-th student.

### Output
For each query, print the answer on it — the minimum number of teams you can form if no two students 𝑖 and 𝑗 such that |𝑎𝑖−𝑎𝑗|=1 may belong to the same team (i.e. skills of each pair of students in the same team has the difference strictly greater than 1)

### Example
input
```
4
4
2 10 1 20
2
3 6
5
2 3 4 99 100
1
42
```
output

```
2
1
2
1
```
### 题解
暴力即可
### 代码

```
#include<stdio.h>
#include<algorithm>
#include<string>
#include<string.h>
#include<stack>
#include<queue>
#include<set>
#include<map>
using namespace std;
int a[110];
int main()
{
    int t;
    scanf("%d", &t);
    while(t--){
        int n;
        scanf("%d", &n);
        for(int i = 0; i <n; i++)
        scanf("%d", &a[i]);
        int ans = 1;
        sort(a,a +n);
        for(int i = 1; i < n;i++)
            if(a[i] - a[i-1] == 1){
                ans++;
                break;
            }
        printf("%d\n",ans);
    }
    return 0;
}
```
# B  Books Exchange
## 题目
The only difference between easy and hard versions is constraints.

There are 𝑛 kids, each of them is reading a unique book. At the end of any day, the 𝑖-th kid will give his book to the 𝑝𝑖-th kid (in case of 𝑖=𝑝𝑖 the kid will give his book to himself). It is guaranteed that all values of 𝑝𝑖 are distinct integers from 1 to 𝑛 (i.e. 𝑝 is a permutation). The sequence 𝑝 doesn't change from day to day, it is fixed.

For example, if 𝑛=6 and 𝑝=[4,6,1,3,5,2] then at the end of the first day the book of the 1-st kid will belong to the 4-th kid, the 2-nd kid will belong to the 6-th kid and so on. At the end of the second day the book of the 1-st kid will belong to the 3-th kid, the 2-nd kid will belong to the 2-th kid and so on.

Your task is to determine the number of the day the book of the 𝑖-th child is returned back to him for the first time for every 𝑖 from 1 to 𝑛.

Consider the following example: 𝑝=[5,1,2,4,3]. The book of the 1-st kid will be passed to the following kids:

after the 1-st day it will belong to the 5-th kid,
after the 2-nd day it will belong to the 3-rd kid,
after the 3-rd day it will belong to the 2-nd kid,
after the 4-th day it will belong to the 1-st kid.
So after the fourth day, the book of the first kid will return to its owner. The book of the fourth kid will return to him for the first time after exactly one day.

You have to answer 𝑞 independent queries.

### Input
The first line of the input contains one integer 𝑞 (1≤𝑞≤200) — the number of queries. Then 𝑞 queries follow.

The first line of the query contains one integer 𝑛 (1≤𝑛≤200) — the number of kids in the query. The second line of the query contains 𝑛 integers 𝑝1,𝑝2,…,𝑝𝑛 (1≤𝑝𝑖≤𝑛, all 𝑝𝑖 are distinct, i.e. 𝑝 is a permutation), where 𝑝𝑖 is the kid which will get the book of the 𝑖-th kid.

### Output
For each query, print the answer on it: 𝑛 integers 𝑎1,𝑎2,…,𝑎𝑛, where 𝑎𝑖 is the number of the day the book of the 𝑖-th child is returned back to him for the first time in this query.

### Example
input
```
6
5
1 2 3 4 5
3
2 3 1
6
4 6 2 1 5 3
1
1
4
3 4 1 2
5
5 1 2 4 3
```
output

```
1 1 1 1 1 
3 3 3 
2 3 3 2 1 3 
1 
2 2 2 2 
4 4 4 1 4 

```
## 题解
并查集记录属于哪一个集合即可。
## 代码

```
#include<stdio.h>
#include<algorithm>
#include<string>
#include<string.h>
#include<stack>
#include<queue>
#include<set>
#include<map>
using namespace std;
int a[200010];
int p[200010];
int f[200010];
set<int> s;
int main()
{
    int t;
    scanf("%d", &t);
    while(t--){
        int n;
        scanf("%d", &n);
        for(int i = 1; i <= n; i++){
            scanf("%d", &a[i]);
            f[i] = i;
        }
        for(int i = 1; i <= n; i++)
        {
            if(f[i] != i)
                continue;
            int ans = 1;
            int now = i;
            while(a[now] != i){
                f[now] = i;
                now = a[now];
                ans++;
            }
            p[i] = ans;
        }
        for(int i = 1; i <= n; i++){
            if(f[i] == i)
                printf("%d ", p[i]);
            else{
                printf("%d ",p[f[i]]);
            }
        }
        printf("\n");
    }
    return 0;
}
```
# C Good Numbers 
## 题目:
The only difference between easy and hard versions is the maximum value of 𝑛.

You are given a positive integer number 𝑛. You really love good numbers so you want to find the smallest good number greater than or equal to 𝑛.

The positive integer is called good if it can be represented as a sum of distinct powers of 3 (i.e. no duplicates of powers of 3 are allowed).

For example:

30 is a good number: 30=33+31,
1 is a good number: 1=30,
12 is a good number: 12=32+31,
but 2 is not a good number: you can't represent it as a sum of distinct powers of 3 (2=30+30),
19 is not a good number: you can't represent it as a sum of distinct powers of 3 (for example, the representations 19=32+32+30=32+31+31+31+30 are invalid),
20 is also not a good number: you can't represent it as a sum of distinct powers of 3 (for example, the representation 20=32+32+30+30 is invalid).
Note, that there exist other representations of 19 and 20 as sums of powers of 3 but none of them consists of distinct powers of 3.

For the given positive integer 𝑛 find such smallest 𝑚 (𝑛≤𝑚) that 𝑚 is a good number.

You have to answer 𝑞 independent queries.

### Input
The first line of the input contains one integer 𝑞 (1≤𝑞≤500) — the number of queries. Then 𝑞 queries follow.

The only line of the query contains one integer 𝑛 (1≤𝑛≤1018).

### Output
For each query, print such smallest integer 𝑚 (where 𝑛≤𝑚) that 𝑚 is a good number.

### Example
input
```
8
1
2
6
13
14
3620
10000
1000000000000000000
```
output
```
1
3
9
13
27
6561
19683
1350851717672992089
```
## 题解：
转换为三进制，找到第一个为2的位置，然后在2之前找到第一个为0的位置，然后置为1，后面的全部置为0
## 代码：
```
#include<stdio.h>
#include<algorithm>
#include<string>
#include<string.h>
#include<stack>
#include<queue>
#include<set>
#include<map>
using namespace std;
int a[100];
long long POW(long long x, long long z)
{
    long long ans = 1;
    long long now = x;
    while(z){
        if(z&1)
            ans *= now;
        now = now * now;
        z >>= 1;
    }
    return ans;
}
int main()
{
    int t;
    scanf("%d", &t);
    while(t--){
        long long  n;
        scanf("%lld", &n);
        long long p = n;
        int len = 0;
        while(n){
            a[len] =  n %3;
            n /= 3;
            len++;
        }
        int sta = -1;
        for(int i = 0; i < len; i++)
        {
            if(a[i] == 2)
                sta = i;
        }
        if(sta == -1){
            printf("%lld\n",p);
        }
        else{
            int t = 0,i;
            for(i = sta + 1; i < len; i++){
                if(a[i] == 0){
                    t = i;
                    a[i] = 1;
                    break;
                }
            }
            if(i == len)
            {
                printf("%lld\n", POW(3,i));
            }
            else{
                long long ans = 0;
                for(int j = t; j < len; j++){
                    if(a[j] == 1)
                    {
                        ans += POW(3,j);
                    }
                }
                printf("%lld\n", ans);
            }
        }
    }
    return 0;
}
```
# D Too Many Segments 
## 题目：
The only difference between easy and hard versions is constraints.

You are given 𝑛 segments on the coordinate axis 𝑂𝑋. Segments can intersect, lie inside each other and even coincide. The 𝑖-th segment is [𝑙𝑖;𝑟𝑖] (𝑙𝑖≤𝑟𝑖) and it covers all integer points 𝑗 such that 𝑙𝑖≤𝑗≤𝑟𝑖.

The integer point is called bad if it is covered by strictly more than 𝑘 segments.

Your task is to remove the minimum number of segments so that there are no bad points at all.

### Input
The first line of the input contains two integers 𝑛 and 𝑘 (1≤𝑘≤𝑛≤200) — the number of segments and the maximum number of segments by which each integer point can be covered.

The next 𝑛 lines contain segments. The 𝑖-th line contains two integers 𝑙𝑖 and 𝑟𝑖 (1≤𝑙𝑖≤𝑟𝑖≤200) — the endpoints of the 𝑖-th segment.

### Output
In the first line print one integer 𝑚 (0≤𝑚≤𝑛) — the minimum number of segments you need to remove so that there are no bad points.

In the second line print 𝑚 distinct integers 𝑝1,𝑝2,…,𝑝𝑚 (1≤𝑝𝑖≤𝑛) — indices of segments you remove in any order. If there are multiple answers, you can print any of them.

### Examples
input
```
7 2
11 11
9 11
7 8
8 9
7 8
9 11
7 9
```
output
```
3
1 4 7 
```
input
```
5 1
29 30
30 30
29 29
28 30
30 30
```
output
```
3
1 2 4 

```
input
```
6 1
2 3
3 3
2 3
2 2
2 3
2 3
```
output
```
4
1 3 5 6 
```
## 题解：
贪心按照lr增序进行排序，然后记录最大的出现次数为k次的位置，只通过了easy版本，暴力进行统计的，hard版本可以用线段树或优先队列A，待补题。
## 代码：

```
#include<stdio.h>
#include<algorithm>
#include<string>
#include<string.h>
#include<stack>
#include<queue>
#include<set>
#include<map>
using namespace std;
struct point{
    int l,r;
    int status;
    int sum;
};
point p[200010];
bool cmp(point a, point b){
    if(a.r != b.r)
        return a.r < b.r;
    else{
        return a.l < b.l;
    }
}
set<int> s;
int main()
{
    int n,k;
    scanf("%d%d", &n, &k);
    for(int i = 1; i <= n; i++){
        scanf("%d%d", &p[i].l, &p[i].r);
        p[i].status = i;
    }
    sort(p + 1, p + n + 1, cmp);
    int now  = 0;
    int ans = 0;
    int end = 0;
    for(int i = 1; i <= n; i++){
       // printf("l %d r %d\n", p[i].l, p[i].r);
        if(p[i].l <= now)
        {
            ans++;
            s.insert(p[i].status);
          // printf("insert\n");
        }
        else{
            for(int j = i - 1; j > end; j--){
                if(p[j].r >= p[i].l){
                    p[j].sum++;
                    if(p[j].sum == k){
                        now = p[j].r;
                        end = j;
                        break;
                    }
                }
            }
            p[i].sum++;
            if(p[i].sum == k){
                now = p[i].r;
                end = i;
            }
        }
      //  printf("now %d\n", now);
    }
    set<int>::iterator it;
    printf("%d\n", ans);
    for(it = s.begin(); it != s.end(); it++)
        printf("%d ", *it);
    return 0;
}
```
# E By Elevator or Stairs
## 题目
You are planning to buy an apartment in a 𝑛-floor building. The floors are numbered from 1 to 𝑛 from the bottom to the top. At first for each floor you want to know the minimum total time to reach it from the first (the bottom) floor.

Let:

𝑎𝑖 for all 𝑖 from 1 to 𝑛−1 be the time required to go from the 𝑖-th floor to the (𝑖+1)-th one (and from the (𝑖+1)-th to the 𝑖-th as well) using the stairs;
𝑏𝑖 for all 𝑖 from 1 to 𝑛−1 be the time required to go from the 𝑖-th floor to the (𝑖+1)-th one (and from the (𝑖+1)-th to the 𝑖-th as well) using the elevator, also there is a value 𝑐 — time overhead for elevator usage (you need to wait for it, the elevator doors are too slow!).
In one move, you can go from the floor you are staying at 𝑥 to any floor 𝑦 (𝑥≠𝑦) in two different ways:

If you are using the stairs, just sum up the corresponding values of 𝑎𝑖. Formally, it will take ∑𝑖=𝑚𝑖𝑛(𝑥,𝑦)𝑚𝑎𝑥(𝑥,𝑦)−1𝑎𝑖 time units.
If you are using the elevator, just sum up 𝑐 and the corresponding values of 𝑏𝑖. Formally, it will take 𝑐+∑𝑖=𝑚𝑖𝑛(𝑥,𝑦)𝑚𝑎𝑥(𝑥,𝑦)−1𝑏𝑖 time units.
You can perform as many moves as you want (possibly zero).

So your task is for each 𝑖 to determine the minimum total time it takes to reach the 𝑖-th floor from the 1-st (bottom) floor.

### Input
The first line of the input contains two integers 𝑛 and 𝑐 (2≤𝑛≤2⋅105,1≤𝑐≤1000) — the number of floors in the building and the time overhead for the elevator rides.

The second line of the input contains 𝑛−1 integers 𝑎1,𝑎2,…,𝑎𝑛−1 (1≤𝑎𝑖≤1000), where 𝑎𝑖 is the time required to go from the 𝑖-th floor to the (𝑖+1)-th one (and from the (𝑖+1)-th to the 𝑖-th as well) using the stairs.

The third line of the input contains 𝑛−1 integers 𝑏1,𝑏2,…,𝑏𝑛−1 (1≤𝑏𝑖≤1000), where 𝑏𝑖 is the time required to go from the 𝑖-th floor to the (𝑖+1)-th one (and from the (𝑖+1)-th to the 𝑖-th as well) using the elevator.

### Output
Print 𝑛 integers 𝑡1,𝑡2,…,𝑡𝑛, where 𝑡𝑖 is the minimum total time to reach the 𝑖-th floor from the first floor if you can perform as many moves as you want.

### Examples
input
```
10 2
7 6 18 6 16 18 1 17 17
6 9 3 10 9 1 10 1 5
```
output
```
0 7 13 18 24 35 36 37 40 45 
```
input
```
10 1
3 2 3 1 3 3 1 4 1
1 2 3 4 4 1 2 1 3
```
output
```
0 2 4 7 8 11 13 14 16 17 
```
## 题解
dp 状态转移看代码
## 代码：

```
#include<stdio.h>
#include<algorithm>
#include<string>
#include<string.h>
#include<stack>
#include<queue>
#include<set>
#include<map>
using namespace std;
int a[200010];
int b[200010];
int dp[200010][2];
int main()
{
    int n,c;
    scanf("%d%d", &n,&c);
    for(int i = 1; i < n; i++)
        scanf("%d", &a[i]);
    for(int i = 1; i < n; i++)
        scanf("%d", &b[i]);
    dp[0][1] = c;
    for(int i = 1; i < n; i++){
        dp[i][0] = min(dp[i - 1][0] + a[i], dp[i-1][1] + a[i]);
        dp[i][1] = min(dp[i - 1][0] + b[i] + c, dp[i - 1][1] + b[i]);
    }
    for(int i = 0; i < n;i++)
        printf("%d ",min(dp[i][0],dp[i][1]));
    return 0;
}
```