FROM node:15.5.0-buster as builder
# RUN npm install -g yarn --force

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn global add @angular/cli
RUN ng build --prod


FROM nginx:1.17.5
# COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/dist/app/ /usr/share/nginx/html
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
CMD nginx -g 'daemon off;'
