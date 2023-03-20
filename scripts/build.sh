#!/bin/bash
npm --no-git-tag-version --tag-version-prefix="" version patch &&
  docker --context default build -t ghcr.io/podnoms/podnoms-web . &&
  docker --context default push ghcr.io/podnoms/podnoms-web
