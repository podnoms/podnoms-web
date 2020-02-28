#!/bin/bash
#angular cert
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
#.net cert
openssl pkcs12 -export \
    -out podnoms.local.pfx \
    -inkey podnoms.local.key \
    -in podnoms.local.crt
#trust (Arch)
# trust anchor server.crt

#trust (Ubuntu)
# certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n PodNomsDev -i server.crt
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n PodNomsDev -i server.crt
certutil -A -n "${certname}" -t "TCu,Cu,Tu" -i ${certfile} -d sql:${certdir}
