FROM nginx:latest
RUN rm /etc/nginx/conf.d/*
ADD conf.d/*.conf /etc/nginx/conf.d/
ADD dist/* /usr/share/nginx/html/
