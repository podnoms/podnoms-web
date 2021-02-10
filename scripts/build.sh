#!/bin/bash
npm --no-git-tag-version --tag-version-prefix="" version patch
docker build -t docker.pkg.github.com/podnoms/podnoms-web/podnoms-web .
docker push docker.pkg.github.com/podnoms/podnoms-web/podnoms-web
