# eonh1u 博客系统完整规格文档

## 一、项目概述

- **目标**：简洁现代的技术博客 + 自动部署 + 低资源占用
- **服务器**：2 CPU / 512MB RAM 轻量云服务器
- **架构**：静态博客 + 轻量 Docker 服务
- **域名**：eonh1u.github.io（GitHub Pages）+ 可选自有域名
- **主题风格**：PaperMod — 简约、快速、响应式，支持暗色/亮色切换

---

## 二、仓库结构（单仓库双分支）

### 仓库：`Eonh1u/Eonh1u.github.io`

- **`main` 分支**：源码（Markdown 文章、配置、脚本、主题）
- **`gh-pages` 分支**：自动生成的静态页面（GitHub Pages 从此分支部署）

### 目录结构（main 分支）

```
Eonh1u.github.io/
├── content/                      # 文章与页面
│   ├── posts/                    # 博客文章 Markdown
│   ├── about.md                  # 关于页
│   └── archives.md               # 归档页
├── static/                       # 静态资源（图片等）
│   └── images/
├── layouts/                      # 自定义模板覆盖
│   └── partials/
│       └── comments.html         # Giscus 评论模板
├── themes/PaperMod/              # PaperMod 主题（直接提交，不用 git submodule）
├── hugo.yaml                     # Hugo 主配置
├── docker/                       # Docker 部署配置（服务器用）
│   ├── docker-compose.yml
│   └── nginx/conf.d/default.conf
├── scripts/                      # 管理脚本
│   ├── setup.sh                  # 环境初始化
│   ├── deploy.sh                 # 构建+部署
│   └── blog.sh                   # 博客管理
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署
├── .gitignore
├── DEPLOY.md                     # 部署文档
└── SPEC.md                       # 本文档
```

### 部署输出结构（gh-pages 分支）

```
/                  → Hugo 博客静态文件（PaperMod 主题）
.nojekyll          → 禁用 Jekyll
```

### .gitignore 规则

```
public/
resources/
.hugo_build.lock
node_modules/
.DS_Store
Thumbs.db
.vscode/
.idea/
*.log
```

注意：`themes/PaperMod/` 要删除其 `.git` 目录后直接提交，不排除在 .gitignore 中。

---

## 三、技术栈

| 组件 | 用途 |
|------|------|
| Hugo (extended) | 静态博客框架（无需 Node.js 运行时） |
| hugo-PaperMod | 博客主题 |
| Giscus | 评论系统（基于 GitHub Discussions） |
| Umami | 自托管网站统计（Docker 部署） |
| Nginx (Docker) | 反向代理（服务器部署） |
| Uptime Kuma (Docker) | 服务监控（可选） |
| GitHub Actions | CI/CD 自动部署 |

---

## 四、Hugo 博客配置

### 4.1 初始化

```bash
# 安装 Hugo extended（Debian/Ubuntu）
wget https://github.com/gohugoio/hugo/releases/download/v0.147.0/hugo_extended_0.147.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.147.0_linux-amd64.deb

# 创建站点
hugo new site . --format yaml

# 安装主题（之后删除 .git 目录直接提交）
git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
rm -rf themes/PaperMod/.git
```

### 4.2 主配置 `hugo.yaml`

```yaml
baseURL: "https://eonh1u.github.io/"
title: "eonh1u Blog"
paginate: 10
theme: ["PaperMod"]

enableInlineShortcodes: true
enableRobotsTXT: true
buildDrafts: false
buildFuture: false
buildExpired: false
enableEmoji: true

languages:
  zh-cn:
    languageName: "中文"
    weight: 1
    taxonomies:
      category: categories
      tag: tags

outputs:
  home:
    - HTML
    - RSS
    - JSON        # 搜索功能需要

menu:
  main:
    - name: 首页
      url: /
      weight: 1
    - name: 归档
      url: /archives/
      weight: 5
    - name: 标签
      url: /tags/
      weight: 10
    - name: 分类
      url: /categories/
      weight: 15
    - name: 搜索
      url: /search/
      weight: 20
    - name: 关于
      url: /about/
      weight: 25

params:
  env: production
  description: "eonh1u 的技术博客 — 分享与探索"
  author: "eonh1u"
  defaultTheme: auto              # auto / light / dark
  disableThemeToggle: false
  ShowReadingTime: true
  ShowShareButtons: false
  ShowPostNavLinks: true
  ShowBreadCrumbs: true
  ShowCodeCopyButtons: true
  ShowWordCount: true
  ShowRssButtonInSectionTermList: true
  UseHugoToc: true
  disableSpecial1stPost: false
  disableScrollToTop: false
  hidemeta: false
  hideSummary: false
  showtoc: true
  tocopen: false
  comments: true

  assets:
    disableHLJS: true             # 使用 Hugo 内置高亮，不需要 highlight.js

  homeInfoParams:
    Title: "Hi, I'm eonh1u 👋"
    Content: "Geek | Developer | Explorer"

  socialIcons:
    - name: github
      url: "https://github.com/Eonh1u"

  # Giscus 评论
  giscus:
    repo: "Eonh1u/Eonh1u.github.io"
    repoId: "<从 giscus.app 获取>"
    category: "Announcements"
    categoryId: "<从 giscus.app 获取>"
    mapping: "pathname"
    strict: "0"
    reactionsEnabled: "1"
    emitMetadata: "0"
    inputPosition: "bottom"
    theme: "preferred_color_scheme"
    lang: "zh-CN"
    loading: "lazy"

  # Umami 统计
  umami:
    websiteId: "<从 Umami 后台获取>"
    src: "https://你的umami域名/script.js"

  # 搜索
  fuseOpts:
    isCaseSensitive: false
    shouldSort: true
    location: 0
    distance: 1000
    threshold: 0.4
    minMatchCharLength: 0
    keys: ["title", "permalink", "summary", "content"]

markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
    style: dracula
```

**关键注意**：
- `baseURL` 设为 `https://eonh1u.github.io/`，博客在根路径
- `outputs.home` 中的 `JSON` 是搜索功能必需的
- `markup.highlight.noClasses: false` 让代码高亮通过 CSS 控制，配合 `assets.disableHLJS: true`
- Hugo 是单二进制文件，不需要 Node.js / npm 来运行

### 4.3 必要页面

**归档页** `content/archives.md`：
```markdown
---
title: "归档"
layout: "archives"
url: "/archives/"
summary: "archives"
---
```

**搜索页** `content/search.md`：
```markdown
---
title: "搜索"
layout: "search"
placeholder: "搜索文章..."
---
```

**关于页** `content/about.md`：
```markdown
---
title: "关于"
---

关于 eonh1u ...
```

### 4.4 文章管理

```bash
hugo new posts/文章标题.md
# 编辑 content/posts/文章标题.md
# 图片放在 static/images/ 目录，文章中用 ![](/images/xxx.jpg) 引用
```

Front Matter 示例：
```yaml
---
title: "文章标题"
date: 2026-03-13T10:00:00+08:00
draft: false
tags: ["Docker", "Linux"]
categories: ["技术"]
summary: "文章摘要"
---
```

### 4.5 Giscus 评论模板

创建 `layouts/partials/comments.html`：
```html
{{- if .Site.Params.comments }}
<script src="https://giscus.app/client.js"
    data-repo="{{ .Site.Params.giscus.repo }}"
    data-repo-id="{{ .Site.Params.giscus.repoId }}"
    data-category="{{ .Site.Params.giscus.category }}"
    data-category-id="{{ .Site.Params.giscus.categoryId }}"
    data-mapping="{{ .Site.Params.giscus.mapping }}"
    data-strict="{{ .Site.Params.giscus.strict }}"
    data-reactions-enabled="{{ .Site.Params.giscus.reactionsEnabled }}"
    data-emit-metadata="{{ .Site.Params.giscus.emitMetadata }}"
    data-input-position="{{ .Site.Params.giscus.inputPosition }}"
    data-theme="{{ .Site.Params.giscus.theme }}"
    data-lang="{{ .Site.Params.giscus.lang }}"
    data-loading="{{ .Site.Params.giscus.loading }}"
    crossorigin="anonymous"
    async>
</script>
{{- end }}
```

PaperMod 内置对 `layouts/partials/comments.html` 的支持，只要 `params.comments: true`，主题会自动在文章底部加载该 partial。

### 4.6 Umami 统计模板

创建 `layouts/partials/extend_head.html`：
```html
{{- if .Site.Params.umami.websiteId }}
<script defer src="{{ .Site.Params.umami.src }}"
    data-website-id="{{ .Site.Params.umami.websiteId }}">
</script>
{{- end }}
```

PaperMod 提供 `extend_head.html` 钩子，内容会被注入到每个页面的 `<head>` 中。

### 4.7 旧文章迁移

如果有原始 Markdown 源文件：
1. 复制到 `content/posts/` 目录
2. 确保 Front Matter 使用 YAML 格式（`---` 包围）
3. 图片引用路径更新为 `/images/xxx.jpg`

如果只有旧 Hexo 生成的 HTML：
1. 从 HTML 中提取 `<meta>` 标签获取 title、date、tags
2. 从 `<div class="post-body">` 提取正文 HTML
3. 代码块在 `<figure class="highlight">` 中，需从 `<td class="code">` 提取代码（跳过行号列）
4. 用占位符保护代码块，避免 html2text 破坏换行
5. 用 html2text 转换正文为 Markdown
6. 拼接 Front Matter + 正文输出为 .md 文件

---

## 五、Docker 服务器部署架构

### 5.1 服务清单

| 服务 | 镜像 | 端口 | 内存限制 | 用途 |
|------|------|------|---------|------|
| Nginx | nginx:alpine | 80, 443 | 32MB | 反向代理 + 静态文件 |
| Uptime Kuma | louislam/uptime-kuma:1 | 3001 | 128MB | 服务监控 |
| Umami | ghcr.io/umami-software/umami:postgresql-latest | 3000 | 150MB | 网站统计 |
| Umami DB | postgres:15-alpine | - | 64MB | Umami 数据库 |

总计约 ~374MB，适合 512MB 服务器（+ 1GB Swap）。

### 5.2 Nginx 路由

```
/           → Hugo 博客（静态文件）
/status/    → Uptime Kuma（反向代理）
/analytics/ → Umami（反向代理）
```

### 5.3 Nginx 优化

- Gzip 压缩
- 静态资源 30 天缓存
- 安全头（X-Frame-Options, X-Content-Type-Options, X-XSS-Protection）

### 5.4 Swap 优化

```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo "/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab
```

---

## 六、GitHub Actions 自动部署

### 工作流：`.github/workflows/deploy.yml`

触发条件：push 到 `main` 分支

```yaml
name: Deploy Hugo Blog

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: false
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Create .nojekyll
        run: touch public/.nojekyll

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
```

流程：
1. Checkout 源码
2. 安装 Hugo extended
3. `hugo --minify` 构建（输出到 `public/`）
4. 添加 `.nojekyll`
5. 发布 `public/` 到 `gh-pages` 分支

### GitHub Pages 配置

仓库 Settings → Pages → Source 设为 `gh-pages` 分支。

---

## 七、Giscus 评论系统配置步骤

1. 仓库 Settings → Features → 勾选 **Discussions**
2. 安装 Giscus App：https://github.com/apps/giscus → Install → 选择仓库
3. 打开 https://giscus.app/zh-CN → 填入仓库名 → 分类选 Announcements
4. 复制生成的 `data-repo-id` 和 `data-category-id`
5. 填入 `hugo.yaml` 的 `params.giscus.repoId` 和 `params.giscus.categoryId`
6. 确保 `layouts/partials/comments.html` 已创建
7. 重新构建部署

---

## 八、Umami 统计配置步骤

1. 服务器上运行 `docker compose up -d`（docker 目录下）
2. 访问 `http://服务器IP:3000`，默认账号 admin / umami
3. **立即修改密码**
4. Settings → Websites → Add website → 填域名
5. 复制 Website ID（UUID）
6. 填入 `hugo.yaml` 的 `params.umami.websiteId`
7. 确保 `layouts/partials/extend_head.html` 已创建
8. 重新构建部署

docker-compose.yml 中 Umami 的 `APP_SECRET` 需要替换为随机字符串：
```bash
openssl rand -hex 32
```

---

## 九、管理脚本

### scripts/setup.sh
- 检查并安装 Hugo extended
- 检查并安装 Docker + Docker Compose
- 创建 1G Swap（如不存在）
- 构建 Hugo 博客

### scripts/deploy.sh
- 构建 Hugo（`hugo --minify`）
- 启动 Docker 容器
- 输出服务状态和内存使用

### scripts/blog.sh
子命令：
- `new <title>`：创建新文章（`hugo new posts/<title>.md`）
- `build`：构建博客（`hugo --minify`）
- `serve`：本地预览（`hugo server -D`，默认 localhost:1313）
- `clean`：清理缓存（删除 `public/` 和 `resources/`）
- `start / stop / restart`：管理 Docker 服务
- `status`：查看容器状态
- `logs [service]`：查看日志

---

## 十、日常工作流

### 写文章并发布

```bash
hugo new posts/文章标题.md
# 编辑 content/posts/文章标题.md
# 图片放 static/images/ 目录
git add -A && git commit -m "新文章：文章标题" && git push origin main
# GitHub Actions 自动构建部署到 gh-pages
```

### 本地预览

```bash
hugo server -D    # 访问 http://localhost:1313/
```

### 性能目标

- 页面加载 < 1s
- TTFB < 200ms
- Hugo 构建速度远快于 Hexo（通常 < 1 秒构建数百篇文章）

---

## 十一、PaperMod 与 Butterfly 对比

| 特性 | PaperMod (Hugo) | Butterfly (Hexo) |
|------|-----------------|-------------------|
| 框架 | Hugo（Go 单二进制） | Hexo（Node.js） |
| 构建速度 | 极快（< 1s） | 较慢（数十秒） |
| 依赖 | 仅 Hugo 二进制 | Node.js + npm + 多个包 |
| 风格 | 简约现代 | 功能丰富花哨 |
| 暗色模式 | 内置，一键切换 | 内置 |
| 搜索 | 内置 Fuse.js | 需插件 |
| 代码高亮 | Hugo 内置 Chroma | highlight.js / prism |
| 评论 | 手动集成（灵活） | 内置多种评论系统配置 |
| 服务器资源 | 极低（无 Node.js 运行时） | 需 Node.js 环境 |

---

## 十二、踩坑记录

| 问题 | 原因 | 解决 |
|------|------|------|
| Hugo 报 SCSS 错误 | 使用了非 extended 版本 | 必须安装 Hugo **extended** 版本 |
| 搜索功能不工作 | outputs.home 缺少 JSON | 在 `hugo.yaml` 的 `outputs.home` 中加入 `JSON` |
| 评论不显示 | 未创建 comments.html | 创建 `layouts/partials/comments.html` 并配置 Giscus |
| 代码高亮异常 | noClasses 配置不当 | 设置 `markup.highlight.noClasses: false` |
| 从 HTML 迁移文章代码块丢失 | NexT 主题代码在 table 中，html2text 只抓到行号 | 用占位符保护代码块，从 td.code 单独提取 |
| GitHub Pages 404 | 未添加 .nojekyll | 在 gh-pages 根目录添加 .nojekyll 文件 |
| 外网无法访问服务器端口 | 阿里云安全组未放行 | 在控制台防火墙/安全组添加端口规则 |
| baseURL 错误导致链接全部 404 | baseURL 与实际部署地址不一致 | 确保 `baseURL` 与 GitHub Pages 或自有域名完全一致 |
