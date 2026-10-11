#!/bin/bash
# Renders the transparent intro PNG sequence (1920x1080, 24 fps). Run from the final/ folder.
d="$(pwd -W)"; export d
mkdir -p video/intro-sequence
one(){ i=$1; t=$(awk "BEGIN{printf \"%.4f\", $i/24}"); n=$(printf "%04d" $i); u="$TEMP/cr_$i"
 "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$u" --default-background-color=00000000 --window-size=1920,1080 --screenshot="$d/video/intro-sequence/intro_$n.png" "file:///$d/animated-logo.html?t=$t&clean=1&transparent=1" >/dev/null 2>&1; rm -rf "$u"; }
export -f one
seq 0 143 | xargs -P 6 -I{} bash -c 'one {}'
echo done
