---
title: ucas river and Longest Ordered Subsequence
date: 2019-09-08 22:50:47
tags: ["ACM"]
categories: ["ACM"]
---
今天在ucas oj上面尝试做了两道题
# river：二分即可
Description
Two lovely frogs Alice and Bob live by a river. There are several stones in this river. Every morning, they will go to the other side of the river to have fun. They cross the river by jumping from one stone to another. One day, Alice decides to play tricks on Bob. She plans to remove some stones so that there is no “easy jump” for Bob to across the river any more. But she has no idea which stones she should remove. She needs your help.
<!--more-->
The width of the river is an integer L((1≤L≤1,000,000,000). We treat the river as a one-dimensional line segment,with two endpoints A (two frog’s home) and B (the other side of the river). Among the river, there are N stones (0≤N≤50,000). The distance from the i-th stone to side A is Di (0<Di<L). Alice would like to remove M stones in the river (0≤M≤N) so that with the rest of the stones, the minimum distance among all possible jumps for Bob is the largest.

Input
Each instance contains two lines. The first line contains three integers L, N and M. The second line gives the positions of N stones. No two stones share the same position.

30% test cases guarantee that N < 20.
Output
For each instance, output a single line with a single integer which is the maximum of the minimum distance among all possible jumps after removing M stones. In the example, Alice should remove stones with distance 2 and 14. After removing these two stones, the minimum distance of jumps is 4, and there are two jumps with distance 4: from 17 to 21, and from 21 to 25.

Sample Input
25 5 2
2 14 11 21 17
Sample Output
4
**代码:**

```#include<stdio.h>
#include<algorithm>
using namespace std;
int a[50010];
int L,n,k;
bool c(int x)
{
    int now = 0;
    int p = 0;
    for(int i = 0; i <= n; i++)
    {
        if(a[i] - now >= x)
        {
            now = a[i];
        }
        else
        {
            p++;
            if(p > k)
                return false;
        }
    }
    return true;
}
int main()
{
    
    scanf("%d%d%d", &L, &n, &k);
    for(int i = 0; i < n; i++){
        scanf("%d", &a[i]);
    }
    a[n] = L;
    sort(a, a + n + 1);
    int l = 1, r = L;
    for(int i = 0; i < 200; i++)
    {
        //printf("%d %d\n", l, r);
        int m = (l + r)/2;
        if(c(m))
            l = m;
        else
            r = m -1;
    }
    if(c(r))
     printf("%d\n", r);
    else
    {
        printf("%d\n", l);
    }
    return 0;
}
```

#  Longest Ordered Subsequence: nlogn
 Description
A numeric sequence of aiai is ordered if a1<a2<⋯<aNa1<a2<⋯<aN. Let the subsequence of the given numeric sequence (a1,a2,…,aN)(a1,a2,…,aN) be any sequence (ai1,ai2,...,aiK)(ai1,ai2,...,aiK), where 1<=i1<i2<⋯<iK<=N1<=i1<i2<⋯<iK<=N. For example, sequence (1,7,3,5,9,4,8)(1,7,3,5,9,4,8) has ordered subsequences, e. g., (1,7)(1,7), (3,4,8)(3,4,8) and many others. All longest ordered subsequences are of length 44, e. g., (1,3,5,8)(1,3,5,8).

Your program, when given the numeric sequence, must find the length of its longest ordered subsequence.

Input
The first line of input contains the length of sequence N. The second line contains the elements of sequence - N integers in the range from 0 to 10000 each, separated by spaces. 1 <= N <= 1000. But there is one test case with N = 1000000.

Output
Output file must contain a single integer - the length of the longest ordered subsequence of the given sequence.

Sample Input
7
1 7 3 5 9 4 8
Sample Output
4
**代码：**

```#include<stdio.h>
#include<algorithm>
using namespace std;
const int MAX = 1000010;
int a[MAX];
int dp[MAX];
int inf = 99999999;
int n;
void solve()
{
    fill(dp, dp + n, inf);
    for(int i = 0; i < n; i++)
    {
        *lower_bound(dp, dp + n, a[i]) = a[i];
    }
    printf("%d\n", lower_bound(dp, dp + n, inf) - dp);
}
int main()
{
    scanf("%d", &n);
    for(int i = 0; i < n; i++)
        scanf("%d", &a[i]);
    solve();
    return 0;
}
```