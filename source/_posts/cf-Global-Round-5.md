---
title: cf-Global Round 5
date: 2019-10-19 13:25:01
tags: ACM
categories: ACM
---
# A:Balanced Rating Changes
## 题目：
Another Codeforces Round has just finished! It has gathered 𝑛 participants, and according to the results, the expected rating change of participant 𝑖 is 𝑎𝑖. These rating changes are perfectly balanced — their sum is equal to 0.

Unfortunately, due to minor technical glitches, the round is declared semi-rated. It means that all rating changes must be divided by two.

There are two conditions though:
<!--more-->

For each participant 𝑖, their modified rating change 𝑏𝑖 must be integer, and as close to 𝑎𝑖/2 as possible. It means that either 𝑏𝑖=⌊𝑎𝑖/2⌋ or 𝑏𝑖=⌈𝑎𝑖/2⌉. In particular, if 𝑎𝑖 is even, 𝑏𝑖=𝑎𝑖2. Here ⌊𝑥⌋ denotes rounding down to the largest integer not greater than 𝑥, and ⌈𝑥⌉ denotes rounding up to the smallest integer not smaller than 𝑥.
The modified rating changes must be perfectly balanced — their sum must be equal to 0.
Can you help with that?

### Input
The first line contains a single integer 𝑛 (2≤𝑛≤13845), denoting the number of participants.

Each of the next 𝑛 lines contains a single integer 𝑎𝑖 (−336≤𝑎𝑖≤1164), denoting the rating change of the 𝑖-th participant.

The sum of all 𝑎𝑖 is equal to 0.

### Output
Output 𝑛 integers 𝑏𝑖, each denoting the modified rating change of the 𝑖-th participant in order of input.

For any 𝑖, it must be true that either 𝑏𝑖=⌊𝑎𝑖/2⌋ or 𝑏𝑖=⌈𝑎𝑖/2⌉. The sum of all 𝑏𝑖 must be equal to 0.

If there are multiple solutions, print any. We can show that a solution exists for any valid input.

### Examples
input
```
3
10
-5
-5
```
output

```
5
-2
-3
```
input

```
7
-7
-29
0
3
24
-29
38
```
output

```
-3
-15
0
2
12
-15
19
```
## 题解：
统计正数与负数的奇数之差，然后在输出时进行处理即可。
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
int a[20010];
int main()
{
    int n;
    scanf("%d", &n);
    int sum1 =0;
    int sum2 =0;
    for(int i = 0; i < n; i++){
        scanf("%d", &a[i]);
        if(a[i] > 0 && a[i] % 2 == 1)
            sum1++;
        if(a[i] < 0 && a[i] % 2 == -1)
            sum2++;
    }
    if(sum1 < sum2){
        sum1 = (sum2 - sum1) / 2;
        for(int i = 0; i < n; i++){
            if(a[i] < 0 && a[i]%2 == -1 && sum1 > 0){
                printf("%d\n",a[i]/2 - 1);
                sum1--;
            }
            else
            {
                printf("%d\n",a[i]/2);
            }
            
        }
    }
    else
    {
        sum1 = (sum1 - sum2) / 2;
        for(int i = 0; i < n; i++){
            if(a[i] > 0 && a[i]%2 == 1 && sum1 > 0){
                printf("%d\n",a[i]/2 + 1);
                sum1--;
            }
            else
            {
                printf("%d\n",a[i]/2);
            }
            
        }
    }
    return 0;
}
```
# B： Balanced Tunnel
## 题目：
Consider a tunnel on a one-way road. During a particular day, 𝑛 cars numbered from 1 to 𝑛 entered and exited the tunnel exactly once. All the cars passed through the tunnel at constant speeds.

A traffic enforcement camera is mounted at the tunnel entrance. Another traffic enforcement camera is mounted at the tunnel exit. Perfectly balanced.

Thanks to the cameras, the order in which the cars entered and exited the tunnel is known. No two cars entered or exited at the same time.

Traffic regulations prohibit overtaking inside the tunnel. If car 𝑖 overtakes any other car 𝑗 inside the tunnel, car 𝑖 must be fined. However, each car can be fined at most once.

Formally, let's say that car 𝑖 definitely overtook car 𝑗 if car 𝑖 entered the tunnel later than car 𝑗 and exited the tunnel earlier than car 𝑗. Then, car 𝑖 must be fined if and only if it definitely overtook at least one other car.

Find the number of cars that must be fined.

### Input
The first line contains a single integer 𝑛 (2≤𝑛≤105), denoting the number of cars.

The second line contains 𝑛 integers 𝑎1,𝑎2,…,𝑎𝑛 (1≤𝑎𝑖≤𝑛), denoting the ids of cars in order of entering the tunnel. All 𝑎𝑖 are pairwise distinct.

The third line contains 𝑛 integers 𝑏1,𝑏2,…,𝑏𝑛 (1≤𝑏𝑖≤𝑛), denoting the ids of cars in order of exiting the tunnel. All 𝑏𝑖 are pairwise distinct.

### Output
Output the number of cars to be fined.
### Examples
input

```
5
3 5 2 1 4
4 3 2 5 1
```
output

```
2
```
input

```
7
5 2 3 6 7 1 4
2 3 6 7 1 4 5
```
output

```
6
```
input

```
2
1 2
1 2
```
output

```
0
```
## 题解：
此代码用的归并排序进行处理，复杂度为nlogn  有复杂度为n的方法，以后补上。进行归并排布时，出现逆序时，将偏大的数字进行记录就可。
## 代码:

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
int p[100010];
int t[100010];
int a[100010];
int used[100010];
int sum=0;
void solve(int l,int r)
{
    //printf("%d %d\n",l,r);
    if(r-l<2)
    {
        if(r-l  ==  1 &&  a[l] > a[r]){
            if(!used[a[l]]){
               // printf("%d %d\n",a[l],a[r]);
                used[a[l]] = 1;
               // printf("2 used %d = true\n",a[l]);
                sum++;
            }
            swap(a[l], a[r]);
        }
        return ;
    }
    int m = (l + r) >> 1;
    solve(l , m);
    solve(m+1 , r);
    int now  = m-l+1;
    int sz = l, sy = m+1;
   /* for(int i = l; i <= r;i++)
        printf("%d ", a[i]);
    printf("\n%d\n",used[6]);
    printf("\n");*/
    for(int i = 0; i < r - l + 1; i++)
    {   
       // printf(" i:%d used %d %d\n",i,a[sz],used[a[sz]]);
        if(sz <= m && sy <= r)
            {
                if(a[sz] > a[sy]){
                    t[i] = a[sy];
                    sy++; 
                    if(!used[a[sz]]){
                        //printf("%d %d\n",a[sz],a[sy-1]);
                        sum++;
                        used[a[sz]] = 1;
                       // printf("used %d %d\n",a[sz],used[a[sz]]);
                       // printf("sy r %d %d\n", sy,r);
                    }
                }
                else
                {
                    t[i] = a[sz];
                    if(sy != m + 1 && !used[a[sz]])
                    {
                        sum++;
                        used[a[sz]] = 1;
                    }
                    sz++; 
                    now--;
                }
            }
        else if(sz == m+1)
        {
            while(sy <= r)
            {
                t[i] = a[sy];
                sy++; i++;
            }
        }
        else
        {
           // printf("sz  %d\n",a[sz]);
          //  printf("used %d %d \n",a[sz],used[a[sz]]);
            while(sz <= m)
            {
                t[i] = a[sz];
               // printf("sz  %d\n",a[sz]);
              //  printf("used %d %d \n",a[sz],used[a[sz]]);
                if(used[a[sz]] == 0){
                    sum++;
                    used[a[sz]] = 1;
                 }
                sz++;
                i++;
            }
        }
    }
    for(int i= l ; i <= r; i++)
        a[i] = t[i-l];
   
}
int main()
{
    int n;
    scanf("%d", &n);
    for(int i = 1; i <= n; i++){
        int now ;
        scanf("%d", &now);
        p[now] = i;
    }
    for(int i = 1; i <= n; i++){
        scanf("%d", &a[i]);
        a[i] = p[a[i]];
    }
    solve(1,n);
    printf("%d\n", sum);
    return 0;
}
```
# C：Balanced Removals (Easier)
## 题目：
This is an easier version of the problem. In this version, 𝑛≤2000.

There are 𝑛 distinct points in three-dimensional space numbered from 1 to 𝑛. The 𝑖-th point has coordinates (𝑥𝑖,𝑦𝑖,𝑧𝑖). The number of points 𝑛 is even.

You'd like to remove all 𝑛 points using a sequence of 𝑛2 snaps. In one snap, you can remove any two points 𝑎 and 𝑏 that have not been removed yet and form a perfectly balanced pair. A pair of points 𝑎 and 𝑏 is perfectly balanced if no other point 𝑐 (that has not been removed yet) lies within the axis-aligned minimum bounding box of points 𝑎 and 𝑏.

Formally, point 𝑐 lies within the axis-aligned minimum bounding box of points 𝑎 and 𝑏 if and only if min(𝑥𝑎,𝑥𝑏)≤𝑥𝑐≤max(𝑥𝑎,𝑥𝑏), min(𝑦𝑎,𝑦𝑏)≤𝑦𝑐≤max(𝑦𝑎,𝑦𝑏), and min(𝑧𝑎,𝑧𝑏)≤𝑧𝑐≤max(𝑧𝑎,𝑧𝑏). Note that the bounding box might be degenerate.

Find a way to remove all points in 𝑛2 snaps.

### Input
The first line contains a single integer 𝑛 (2≤𝑛≤2000; 𝑛 is even), denoting the number of points.

Each of the next 𝑛 lines contains three integers 𝑥𝑖, 𝑦𝑖, 𝑧𝑖 (−108≤𝑥𝑖,𝑦𝑖,𝑧𝑖≤108), denoting the coordinates of the 𝑖-th point.

No two points coincide.

### Output
Output 𝑛2 pairs of integers 𝑎𝑖,𝑏𝑖 (1≤𝑎𝑖,𝑏𝑖≤𝑛), denoting the indices of points removed on snap 𝑖. Every integer between 1 and 𝑛, inclusive, must appear in your output exactly once.

We can show that it is always possible to remove all points. If there are many solutions, output any of them.

### Examples
input
```
6
3 1 0
0 3 0
2 2 0
1 0 0
1 3 0
0 1 0
```
output

```
3 6
5 1
2 4
```
input

```
8
0 1 1
1 0 1
1 1 0
1 1 1
2 2 2
3 2 2
2 3 2
2 2 3
```
output

```
4 5
1 6
2 7
3 8
```
## 题解：
按线面体的顺序进行依次删除。即按xyz顺序进行排序，先删除xy相同的，再删除x相同的，然后再依次删除，注意每次删除后都要排序一次。
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
    int x,y,z;
    int index;
};
point p[2010];
point tmp[2010];
bool cmp(point a, point b){
    if(a.x != b.x){
        return a.x < b.x;
    }
    else if(a.y != b.y){
        return a.y < b.y;
    }
    else{
        return a.z < b.z;
    }
}
bool used[2010];
int main()
{
    int n;
    scanf("%d", &n);
    for(int i = 1; i <= n; i++){
        scanf("%d%d%d",&p[i].x, &p[i].y, &p[i].z);
        p[i].index = i;
    }
    sort(p + 1, p + n + 1, cmp);
    for(int i = 2 ; i <= n; i++)
    {
        if(p[i].x == p[i - 1].x && p[i].y == p[i - 1].y){
            printf("%d %d\n",p[i].index, p[i - 1].index);
            used[p[i].index] = used[p[i - 1].index] = true;
            i++;
        }
    }
    int now = 1;
    for(int i = 1; i <= n; i++)
    {
        if(!used[p[i].index])
            tmp[now++] = p[i];
    }
    now--;
    for(int i = 1; i <= now; i++)
        p[i] = tmp[i];
    sort(p + 1, p + 1 + now,cmp);
   // printf("now %d\n",now);
    for(int i = 2 ; i <= now; i++)
    {
        if(p[i].x == p[i - 1].x){
            printf("%d %d\n",p[i].index, p[i - 1].index);
            used[p[i].index] = used[p[i - 1].index] = true;
            i++;
        }
    }
    int o = 1;
    for(int i = 1; i <= now; i++)
    {
        if(!used[p[i].index])
            tmp[o++] = p[i];
    }
    o--;
    sort(tmp + 1, tmp + 1 + o,cmp);
    //printf("o %d\n",o);
    for(int i = 1; i <= o; i++){
        printf("%d %d\n",tmp[i].index,tmp[i + 1].index);
        i++;
    }
    return 0;
 
}
```