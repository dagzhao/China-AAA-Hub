#!/bin/sh
# 截图入口（包装 shots.mjs，真正的实现在那边 —— 用 CDP 精确控视口 + 截整页）。
#
# 用法:
#   sh shots.sh <base-url> <out-dir> <path> [<path> ...]
#   sh shots.sh http://localhost:5199 _shots/beautify / /zh/ /quiz
#
# 关键：关掉 MSYS 的路径自动转换。否则 Git Bash 会把参数里的 "/" 改写成
# Windows 路径（单个 "/" 会变成 "C:/Program Files/Git"），slug 和 URL 全乱。
exec env MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*' \
  node "$(dirname "$0")/shots.mjs" "$@"
