#!/usr/bin/env bash
# Uso: ./00_create_and_push_image.sh [version]   (por defecto, la de package.json)
set -euo pipefail
cd "$(dirname "$0")"

IMAGE="pepesan/analog-app"
VERSION="${1:-$(node -p "require('./package.json').version")}"

docker build --progress=plain -t "$IMAGE:$VERSION" -t "$IMAGE:latest" .
# Requiere haber hecho `docker login` previamente
docker push "$IMAGE:$VERSION"
docker push "$IMAGE:latest"
