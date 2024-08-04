#!/usr/bin/zsh
docker build --progress=plain -t pepesan/analog-app:latest .
docker login
docker push pepesan/analog-app:latest
