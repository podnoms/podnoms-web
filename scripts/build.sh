#!/bin/bash
npm --no-git-tag-version --tag-version-prefix="" version patch
docker build -t ghcr.io/podnoms/podnoms-web .
docker push ghcr.io/podnoms/podnoms-web
