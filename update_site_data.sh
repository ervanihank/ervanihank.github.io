#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON_BIN="${PYTHON_BIN:-python3}"

cd "$ROOT_DIR"

echo "[update] Using Python: $PYTHON_BIN"
"$PYTHON_BIN" "$ROOT_DIR/tools/update_site_data.py" "$@"

echo "[update] Done."
echo "[update] Main generated file: data/generated/combined-data.json"
echo "[update] Main website file: site-data.js"
