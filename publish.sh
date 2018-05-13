#!/bin/bash
eval $(docker-machine env podnoms-vm) && \
    docker-compose stop && docker-compose pull && docker-compose build && docker-compose up -d && \
    eval $(docker-machine env --unset)
