#!/usr/bin/env bash
npm --no-git-tag-version --tag-version-prefix="" version patch
ng build --prod
docker build -t podnoms.azurecr.io/podnoms.web .
az acr login --name podnoms
docker push podnoms.azurecr.io/podnoms.web
