FROM nginx:alpine

COPY nginx/conf.d /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/app/ .

EXPOSE 80
