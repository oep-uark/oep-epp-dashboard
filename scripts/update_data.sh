#!/bin/bash
# Regenerate the dashboard's JSON data from the source workbooks.
#
# Usage:
#   scripts/update_data.sh <epp_review_workbook.xlsx> [sor_workbook.xlsx]
#
# The EPP State Review workbook is required every run. The Science of
# Reading workbook is optional - pass it only when Josh/the state has sent
# an updated one; omit it to leave science_of_reading.json untouched.
#
# Both source files should already be sitting in data-raw/ before you run
# this - if the state only sent corrected numbers rather than a full new
# workbook, edit those cells directly in the existing xlsx first. Never
# hand-edit the JSON in data/ - it's regenerated, not authored.
set -e

cd "$(dirname "$0")/.."

if [ -z "$1" ]; then
    echo "Usage: scripts/update_data.sh <epp_review_workbook.xlsx> [sor_workbook.xlsx]"
    exit 1
fi

echo "== EPP State Review =="
python3 scripts/extract_data.py "$1" data

if [ -n "$2" ]; then
    echo "== Science of Reading =="
    python3 scripts/extract_sor_data.py "$2" data
fi

echo "Done."
