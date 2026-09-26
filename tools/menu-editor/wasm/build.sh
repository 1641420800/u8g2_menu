#!/usr/bin/env bash
# 构建 u8g2-menu-editor 预览 WASM
#
# 优先使用本机 emcc；否则回退到 docker (emscripten/emsdk)。
# 用法: bash build.sh   （任意目录可执行）
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/../../.." && pwd)"
WASM_DIR_REL="tools/menu-editor/wasm"
U8G2_REL="example/1.menu_demo_create/HARDWARE/U8g2_V2.0.0"
MENU_REL="src"
OUT="$HERE/../prebuilt"

FONTS=(
  u8g2_font_5x7_tf u8g2_font_6x10_tf u8g2_font_6x12_tf u8g2_font_7x13_tf
  u8g2_font_8x13_tf u8g2_font_9x15_tf u8g2_font_9x18_tf u8g2_font_10x20_tf
  u8g2_font_wqy12_t_gb2312 u8g2_font_wqy13_t_gb2312
  u8g2_font_wqy14_t_gb2312 u8g2_font_wqy16_t_gb2312
)

# 库源码（排除 layer 模块——存在已知编译问题；排除巨型 u8g2_fonts.c，用 genfonts.c 替代）
MENU_C=(u8g2_menu.c u8g2_menu_effect.c u8g2_menu_event.c u8g2_menu_itemValue.c
        u8g2_menu_keys.c u8g2_menu_message.c u8g2_menu_selector.c
        u8g2_menu_drawStr.c u8g2_menu_drawValueBar.c u8g2_menu_drawChart.c
        u8g2_menu_drawPic.c u8g2_menu_drawBoard.c u8g2_menu_weak.c)

U8G2_C=(u8g2_bitmap.c u8g2_box.c u8g2_buffer.c u8g2_circle.c u8g2_cleardisplay.c
        u8g2_d_memory.c u8g2_font.c u8g2_hvline.c u8g2_intersection.c
        u8g2_line.c u8g2_ll_hvline.c u8g2_setup.c
        u8x8_byte.c u8x8_cad.c u8x8_display.c u8x8_setup.c u8x8_u16toa.c u8x8_u8toa.c
        u8x8_gpio.c u8x8_string.c u8x8_8x8.c
        u8x8_d_ssd1306_128x64_noname.c)

EXPORTS="_em_init,_em_reset_dynamic,_em_set_style,_em_page_begin,_em_page_item,_em_item_text,_em_item_swtext,_em_item_bits,_em_page_end,_em_pages_commit,_em_nav,_em_buf_define,_em_item_chart_add,_em_frame,_em_key,_em_font_h,_em_font_w,_em_font_utf8_w,_em_get_current_page,_em_get_btn_count,_em_get_btn_last,_em_get_ipool,_em_get_fpool,_em_get_upool,_em_get_dpool,_em_scratch,_em_font_count_export,_em_font_name,_em_dbg_current_item,_em_dbg_set_value,_em_dbg_value_type,_em_dbg_draw_item,_em_dbg_page_len"

# 注意保持单行：变量会在 docker bash -c 中原样展开
EMCC_FLAGS="-I ../../../$U8G2_REL -I ../../../$MENU_REL -I . -O2 -sMODULARIZE=1 -sEXPORT_NAME=U8G2MenuPreview -sEXPORTED_FUNCTIONS=$EXPORTS -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,HEAPU8,HEAPF32,HEAPF64,UTF8ToString -sALLOW_MEMORY_GROWTH=1 -sENVIRONMENT=web --no-entry -o ../prebuilt/u8g2-menu-preview.js"

mkdir -p "$OUT"
node "$HERE/extract-fonts.mjs" "$REPO_ROOT/$U8G2_REL/u8g2_fonts.c" "$HERE/genfonts.c" "${FONTS[@]}"

SRCS=""
for f in "${MENU_C[@]}"; do SRCS="$SRCS ../../../$MENU_REL/$f"; done
for f in "${U8G2_C[@]}"; do SRCS="$SRCS ../../../$U8G2_REL/$f"; done
SRCS="$SRCS genfonts.c editor_shim.c"

if command -v emcc >/dev/null 2>&1; then
  echo ">> 使用本机 emcc 构建"
  (cd "$HERE" && emcc $EMCC_FLAGS $SRCS)
else
  echo ">> 使用 docker emscripten/emsdk 构建"
  MSYS_NO_PATHCONV=1 docker run --rm -v "$REPO_ROOT":/work -w "/work/$WASM_DIR_REL" \
    emscripten/emsdk:latest bash -c "set -eu; emcc $EMCC_FLAGS $SRCS"
fi

ls -la "$OUT"
echo ">> 构建完成"
