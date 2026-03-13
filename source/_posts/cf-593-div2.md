---
title: cf-593-div2
date: 2019-10-19 14:51:00
tags: ACM
categories: ACM
---
# A:Stones
## 题目：
Alice is playing with some stones.

Now there are three numbered heaps of stones. The first of them contains 𝑎 stones, the second of them contains 𝑏 stones and the third of them contains 𝑐 stones.

Each time she can do one of two operations:

take one stone from the first heap and two stones from the second heap (this operation can be done only if the first heap contains at least one stone and the second heap contains at least two stones);
<!--more-->
take one stone from the second heap and two stones from the third heap (this operation can be done only if the second heap contains at least one stone and the third heap contains at least two stones).
She wants to get the maximum number of stones, but she doesn't know what to do. Initially, she has 0 stones. Can you help her?

### Input
The first line contains one integer 𝑡 (1≤𝑡≤100)  — the number of test cases. Next 𝑡 lines describe test cases in the following format:

Line contains three non-negative integers 𝑎, 𝑏 and 𝑐, separated by spaces (0≤𝑎,𝑏,𝑐≤100) — the number of stones in the first, the second and the third heap, respectively.

In hacks it is allowed to use only one test case in the input, so 𝑡=1 should be satisfied.

### Output
Print 𝑡 lines, the answers to the test cases in the same order as in the input. The answer to the test case is the integer  — the maximum possible number of stones that Alice can take after making some operations.

### Example
input

```
3
3 4 5
1 0 5
5 3 2
```
output

```
9
0
6
```
### Note
For the first test case in the first test, Alice can take two stones from the second heap and four stones from the third heap, making the second operation two times. Then she can take one stone from the first heap and two stones from the second heap, making the first operation one time. The summary number of stones, that Alice will take is 9. It is impossible to make some operations to take more than 9 stones, so the answer is 9.
## 题解：
b与c能进行多少操作就取多少，然后剩下的b与a看能够取多少，然后取。
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
int main()
{
    int t;
    scanf("%d", &t);
    while(t--){
        int a,b,c;
        scanf("%d%d%d", &a, &b, &c);
        int ans = 0;
        if(b < c/2){
            ans = b * 3;
        }
        else{
            ans += c/2 * 3;
            b -= c/2;
            if(a < b/2)
                ans += a * 3;
            else
            {
                ans += b/2 *3;
            }
             
        }
        printf("%d\n", ans);
    }
    return 0;
}
```
# B：Alice and the List of Presents
## 题目：
Alice got many presents these days. So she decided to pack them into boxes and send them to her friends.

There are 𝑛 kinds of presents. Presents of one kind are identical (i.e. there is no way to distinguish two gifts of the same kind). Presents of different kinds are different (i.e. that is, two gifts of different kinds are distinguishable). The number of presents of each kind, that Alice has is very big, so we can consider Alice has an infinite number of gifts of each kind.

Also, there are 𝑚 boxes. All of them are for different people, so they are pairwise distinct (consider that the names of 𝑚 friends are written on the boxes). For example, putting the first kind of present into the first box but not into the second box, is different from putting the first kind of present into the second box but not into the first box.

Alice wants to pack presents with the following rules:

She won't pack more than one present of each kind into the same box, so each box should contain presents of different kinds (i.e. each box contains a subset of 𝑛 kinds, empty boxes are allowed);
For each kind at least one present should be packed into some box.
Now Alice wants to know how many different ways to pack the presents exists. Please, help her and calculate this number. Since the answer can be huge, output it by modulo 109+7.

See examples and their notes for clarification.

### Input
The first line contains two integers 𝑛 and 𝑚, separated by spaces (1≤𝑛,𝑚≤109) — the number of kinds of presents and the number of boxes that Alice has.

### Output
Print one integer  — the number of ways to pack the presents with Alice's rules, calculated by modulo 109+7
### Examples
input
```
1 3
```
output
```
7
```
input
```
2 2
```
output
```
9
```
### Note
In the first example, there are seven ways to pack presents:
{1}{}{}
{}{1}{}
{}{}{1}
{1}{1}{}
{}{1}{1}
{1}{}{1}
{1}{1}{1}
In the second example there are nine ways to pack presents:
{}{1,2}
{1}{2}
{1}{1,2}
{2}{1}
{2}{1,2}
{1,2}{}
{1,2}{1}
{1,2}{2}
{1,2}{1,2}
For example, the way {2}{2} is wrong, because presents of the first kind should be used in the least one box.
## 题解：
pow(pow(2,m)-1),n) + 快速幂
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
const long long mod = 1e9+7;
long long mi(long long x, long long z)
{
    long long ans = 1;
    long long now = x;
    while(z)
    {
        if(z & 1)
            ans  = (ans * now) %mod;
        z >>= 1;
        now = (now * now) % mod;
    }
    return ans;
}
int main()
{
    long long  n,m;
    scanf("%lld%lld", &n, &m);
    long long now = (mi(2,m) - 1 + mod) % mod;
    long long ans = (mi(now,n)) % mod;
    printf("%lld\n", ans);
    return 0;
}
```
# C:Labs
## 题目：
In order to do some research, 𝑛2 labs are built on different heights of a mountain. Let's enumerate them with integers from 1 to 𝑛2, such that the lab with the number 1 is at the lowest place, the lab with the number 2 is at the second-lowest place, …, the lab with the number 𝑛2 is at the highest place.

To transport water between the labs, pipes are built between every pair of labs. A pipe can transport at most one unit of water at a time from the lab with the number 𝑢 to the lab with the number 𝑣 if 𝑢>𝑣.

Now the labs need to be divided into 𝑛 groups, each group should contain exactly 𝑛 labs. The labs from different groups can transport water to each other. The sum of units of water that can be sent from a group 𝐴 to a group 𝐵 is equal to the number of pairs of labs (𝑢,𝑣) such that the lab with the number 𝑢 is from the group 𝐴, the lab with the number 𝑣 is from the group 𝐵 and 𝑢>𝑣. Let's denote this value as 𝑓(𝐴,𝐵) (i.e. 𝑓(𝐴,𝐵) is the sum of units of water that can be sent from a group 𝐴 to a group 𝐵).

For example, if 𝑛=3 and there are 3 groups 𝑋, 𝑌 and 𝑍: 𝑋={1,5,6},𝑌={2,4,9} and 𝑍={3,7,8}. In this case, the values of 𝑓 are equal to:

𝑓(𝑋,𝑌)=4 because of 5→2, 5→4, 6→2, 6→4,
𝑓(𝑋,𝑍)=2 because of 5→3, 6→3,
𝑓(𝑌,𝑋)=5 because of 2→1, 4→1, 9→1, 9→5, 9→6,
𝑓(𝑌,𝑍)=4 because of 4→3, 9→3, 9→7, 9→8,
𝑓(𝑍,𝑋)=7 because of 3→1, 7→1, 7→5, 7→6, 8→1, 8→5, 8→6,
𝑓(𝑍,𝑌)=5 because of 3→2, 7→2, 7→4, 8→2, 8→4.
Please, divide labs into 𝑛 groups with size 𝑛, such that the value min𝑓(𝐴,𝐵) over all possible pairs of groups 𝐴 and 𝐵 (𝐴≠𝐵) is maximal.

In other words, divide labs into 𝑛 groups with size 𝑛, such that minimum number of the sum of units of water that can be transported from a group 𝐴 to a group 𝐵 for every pair of different groups 𝐴 and 𝐵 (𝐴≠𝐵) as big as possible.

Note, that the example above doesn't demonstrate an optimal division, but it demonstrates how to calculate the values 𝑓 for some division.

If there are many optimal divisions, you can find any.

### Input
The only line contains one number 𝑛 (2≤𝑛≤300).

### Output
Output 𝑛 lines:

In the 𝑖-th line print 𝑛 numbers, the numbers of labs of the 𝑖-th group, in any order you want.

If there are multiple answers, that maximize the minimum number of the sum of units of water that can be transported from one group the another, you can print any.

### Example
input
```
3
```
output
```
2 8 5
9 3 4
7 6 1
```
### Note
In the first test we can divide 9 labs into groups {2,8,5},{9,3,4},{7,6,1}.

From the first group to the second group we can transport 4 units of water (8→3,8→4,5→3,5→4).

From the first group to the third group we can transport 5 units of water (2→1,8→7,8→6,8→1,5→1).

From the second group to the first group we can transport 5 units of water (9→2,9→8,9→5,3→2,4→2).

From the second group to the third group we can transport 5 units of water (9→7,9→6,9→1,3→1,4→1).

From the third group to the first group we can transport 4 units of water (7→2,7→5,6→2,6→5).

From the third group to the second group we can transport 4 units of water (7→3,7→4,6→3,6→4).

The minimal number of the sum of units of water, that can be transported from one group to another is equal to 4. It can be proved, that it is impossible to make a better division.
## 题解：
每次取数组的两边以及中间位置。
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
int main()
{
    int n;
    scanf("%d",&n);
    if(n % 2 == 0){
        int  p = n*n;
        for(int i = 0; i < n; i++){
            for(int j = 1; j <= n/2; j++)
                printf("%d %d ", i * (n/2) + j,p + 1 -(i * (n/2) + j));
            printf("\n");
        }
    }
    else{
        int l = 0,r = 0,s = 0;
        int mid = (1 + n*n)/2;
        int p = n * n;
        for(int i = 0; i < n; i++){
            for(int j = 1; j <= n/2; j++)
                printf("%d %d ", i * (n/2) + j,p + 1 -(i * (n/2) + j));
            if(s == 0)
                {
                    printf("%d\n",mid);
                    s = 1;
                }
            else if(l == r){
                l++;
                printf("%d\n",mid - l);
            }
            else{
                r++;
                printf("%d\n",mid + r);
            }
        }
    }
    return 0;
}
```