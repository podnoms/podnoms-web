# base image
FROM node:9.6.1 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY .npmrc /usr/src/app/.npmrc
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

# generate build
RUN ng build --prod

# base image
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
ADD nginx/conf.d/*.conf /etc/nginx/conf.d/

# expose port 80
EXPOSE 80
EXPOSE 443

# run nginx
CMD ["nginx", "-g", "daemon off;"]
