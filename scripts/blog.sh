#!/usr/bin/env bash
set -euo pipefail

HUGO_BIN="${HUGO_BIN:-hugo}"
if ! command -v "$HUGO_BIN" >/dev/null 2>&1; then
  if [ -x "./.tools/hugo/hugo" ]; then
    HUGO_BIN="./.tools/hugo/hugo"
  else
    echo "未找到 hugo，请先安装或准备 ./.tools/hugo/hugo"
    exit 1
  fi
fi

cmd="${1:-}"
shift || true

case "$cmd" in
  new)
    title="${1:-}"
    if [ -z "$title" ]; then
      echo "用法: ./scripts/blog.sh new <title>"
      exit 1
    fi
    "$HUGO_BIN" new "posts/${title}.md"
    ;;
  build)
    "$HUGO_BIN" --minify -d hugo_public
    ;;
  serve)
    "$HUGO_BIN" server -D
    ;;
  clean)
    rm -rf public resources
    echo "已清理 public/ 和 resources/"
    ;;
  start)
    (cd docker && docker compose up -d)
    ;;
  stop)
    (cd docker && docker compose down)
    ;;
  restart)
    (cd docker && docker compose down && docker compose up -d)
    ;;
  status)
    (cd docker && docker compose ps)
    ;;
  logs)
    service="${1:-}"
    if [ -n "$service" ]; then
      (cd docker && docker compose logs -f "$service")
    else
      (cd docker && docker compose logs -f)
    fi
    ;;
  *)
    cat <<'USAGE'
用法: ./scripts/blog.sh <command>

可用命令:
  new <title>     创建新文章
  build           构建博客
  serve           本地预览 (http://localhost:1313)
  clean           清理构建缓存
  start           启动 Docker 服务
  stop            停止 Docker 服务
  restart         重启 Docker 服务
  status          查看容器状态
  logs [service]  查看日志
USAGE
    exit 1
    ;;
esac
