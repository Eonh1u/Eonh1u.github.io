#!/usr/bin/env bash
set -euo pipefail

HUGO_BIN="${HUGO_BIN:-hugo}"
if ! command -v "$HUGO_BIN" >/dev/null 2>&1; then
  if [ -x "./.tools/hugo/hugo" ]; then
    HUGO_BIN="./.tools/hugo/hugo"
    echo "[OK] 使用仓库内 hugo: $($HUGO_BIN version)"
  else
    echo "[WARN] 未检测到 hugo，请先手动安装 Hugo extended。"
  fi
else
  echo "[OK] 已检测到 hugo: $($HUGO_BIN version)"
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "[WARN] 未检测到 docker，请先安装 Docker。"
else
  echo "[OK] 已检测到 docker: $(docker --version)"
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "[WARN] 未检测到 docker compose 插件，请先安装。"
else
  echo "[OK] 已检测到 docker compose。"
fi

if [ ! -f /swapfile ]; then
  echo "[INFO] 未发现 /swapfile，可按文档手动创建 1G swap。"
fi

if command -v "$HUGO_BIN" >/dev/null 2>&1 || [ -x "$HUGO_BIN" ]; then
  "$HUGO_BIN" --minify -d hugo_public
  echo "[OK] Hugo 构建完成。"
fi
