FROM nginx:alpine

COPY nginx/conf.d /etc/nginx/nginx.conf

COPY dist/app/ /usr/share/nginx/html/

# Have to do this now for some reason???? otherwise all assets 403?
RUN chown -R nginx /usr/share/nginx/html

EXPOSE 80
