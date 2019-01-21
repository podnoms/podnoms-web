#!/usr/bin/env bash
ng build --prod --aot
docker build -t podnoms.azurecr.io/podnoms.web .
docker push podnoms.azurecr.io/podnoms.web
