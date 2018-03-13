#!/bin/bash
read -n1 -p "Renew web? [y,n]" web
if [[ $web == "Y" || $web == "y" ]]; then
    docker run -it --rm -p 443:443 -p 80:80 --name certbot \
        -v "/etc/letsencrypt:/etc/letsencrypt" \
        -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
        certbot/certbot certonly \
        --agree-tos \
        --renew-by-default \
        -d podnoms.com \
        -d www.podnoms.com \
        -m fergal.moran@gmail.com
fi
echo \n

read -n1 -p "Renew api? [y,n]" api
if [[ $api == "Y" || $api == "y" ]]; then
    docker run -it --rm -p 443:443 -p 80:80 --name certbot \
        -v "/etc/letsencrypt:/etc/letsencrypt" \
        -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
        certbot/certbot certonly \
        --agree-tos \
        --renew-by-default \
        -d api.podnoms.com \
        -m fergal.moran@gmail.com
fi
echo \n

read -n1 -p "Renew realtime? [y,n]" rt
if [[ $rt == "Y" || $rt == "y" ]]; then
    docker run -it --rm -p 443:443 -p 80:80 --name certbot \
        -v "/etc/letsencrypt:/etc/letsencrypt" \
        -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
        certbot/certbot certonly \
        --standalone \
        --agree-tos \
        --renew-by-default \
        -d rt.podnoms.com \
        -m fergal.moran@gmail.com
fi
echo \n

read -n1 -p "Renew jobs? [y,n]" jobs
if [[ $jobs == "Y" || $jobs == "y" ]]; then
    docker run -it --rm -p 443:443 -p 80:80 --name certbot \
        -v "/etc/letsencrypt:/etc/letsencrypt" \
        -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
        certbot/certbot certonly \
        --standalone \
        --agree-tos \
        --renew-by-default \
        -d jobs.podnoms.com \
        -m fergal.moran@gmail.com
fi
echo \n
