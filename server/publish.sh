#!/bin/bash
unset DOCKER_HOST
unset DOCKER_TLS_VERIFY

docker build --rm -f Dockerfile -t fergalmoran/podnoms.api .