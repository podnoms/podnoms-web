FROM nginx:1.13.9-alpine

COPY dist/app/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
ADD nginx/conf.d/*.conf /etc/nginx/conf.d/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
