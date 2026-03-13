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

"$HUGO_BIN" --minify -d hugo_public
(
  cd docker
  docker compose up -d
)

echo ""
echo "[INFO] 容器状态"
(
  cd docker
  docker compose ps
)

echo ""
echo "[INFO] 内存信息"
if command -v free >/dev/null 2>&1; then
  free -h
else
  vm_stat
fi
