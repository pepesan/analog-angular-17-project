#!/usr/bin/env bash
set -euo pipefail

docker run -p 3002:3000 -d --name analog-app pepesan/analog-app:latest
