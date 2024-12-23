#!/bin/bash
npm --no-git-tag-version --tag-version-prefix="" version patch &&
  docker --context default build --push -t ghcr.io/podnoms/podnoms-web .
