#!/bin/bash
openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout server.key \
    -new \
    -out server.crt \
    -config ./openssl-custom.cnf \
    -sha256 \
    -days 365

#trust (Ubuntu)
sudo apt-get install libnss3-tools
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n PodNomsDev -i server.crt
