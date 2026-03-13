# 部署说明

## GitHub Pages（推荐）

1. 在 GitHub 仓库开启 Pages，Source 选择 `gh-pages` 分支。
2. 将默认分支设为 `master`，推送源码到 `master`。
3. GitHub Actions 会自动执行 `.github/workflows/deploy.yml`，把 `hugo_public/` 发布到 `gh-pages`。

## 本地预览

```bash
hugo server -D
```

## 服务器 Docker 部署

```bash
./scripts/deploy.sh
```

部署前请先把 `docker/docker-compose.yml` 中 `APP_SECRET` 改成随机值，例如：

```bash
openssl rand -hex 32
```
