#!/usr/bin/env bash
npm --no-git-tag-version --tag-version-prefix="" version patch
ng build --prod --aot
docker build -t podnoms.azurecr.io/podnoms.web .
docker push podnoms.azurecr.io/podnoms.web
