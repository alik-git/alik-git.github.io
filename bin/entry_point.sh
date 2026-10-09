#!/bin/bash
set -euo pipefail

# Keep the mounted lockfile intact and let Jekyll receive container signals.
exec bundle exec jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --force_polling "$@"
