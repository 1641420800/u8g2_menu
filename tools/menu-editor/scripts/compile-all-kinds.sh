#!/usr/bin/env bash
# 全类型生成产物的编译冒烟：menu_pages.c 用 Emscripten 编到目标码
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/../../.." && pwd)"
U8G2_REL="example/1.menu_demo_create/HARDWARE/U8g2_V2.0.0"
MENU_REL="src"

MSYS_NO_PATHCONV=1 docker run --rm -v "$REPO_ROOT":/work -w "/work/tools/menu-editor/scripts/all-kinds" \
  emscripten/emsdk:latest bash -c "set -eu; emcc -I ../../../../$U8G2_REL -I ../../../../$MENU_REL -O1 -c menu_pages.c -o menu_pages.o && echo COMPILE_OK"
