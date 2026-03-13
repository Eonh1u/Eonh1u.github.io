# eonh1u Blog Repo

该仓库已调整为“单仓库双用途”模式：

- 保留原有 Hexo 内容（`source/`、`_config.yml`、`.deploy_git/` 等）
- 新增 Hugo + PaperMod 主线（`content/`、`hugo.yaml`、`themes/PaperMod/`）
- 新增部署配置（`docker/`、`scripts/`、`.github/workflows/deploy.yml`）

## 快速开始

1. 安装 Hugo extended
2. 本地预览：

```bash
hugo server -D
```

3. 构建：

```bash
hugo --minify
```

## 目录说明

- `SPEC.md`：完整规格文档（来自 `blog.md`）
- `DEPLOY.md`：部署说明
- `content/posts/`：迁移后的文章
- `source/_posts/`：保留的原始 Hexo 文章
