FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
ADD nginx/conf.d/*.conf /etc/nginx/conf.d/

# expose port 80
EXPOSE 80
EXPOSE 443

# run nginx
CMD ["nginx", "-g", "daemon off;"]
