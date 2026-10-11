#!/bin/sh
# Renders each HTML template to an A4 PDF with headless Chrome. Run from this folder:
#   sh render.sh fee-proposal.html invoice-1-advance.html invoice-2-final.html
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
mkdir -p pdf
for f in "$@"; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$(pwd -W)/pdf/${f%.html}.pdf" "file:///$(pwd -W)/$f"
done
