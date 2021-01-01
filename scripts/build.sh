#!/bin/bash
npm --no-git-tag-version --tag-version-prefix="" version patch
ng build --prod
docker build -t docker.pkg.github.com/podnoms/podnoms-web/podnoms-web .
az acr login --name podnoms
docker push docker.pkg.github.com/podnoms/podnoms-web/podnoms-web
