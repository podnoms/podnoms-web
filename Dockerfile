FROM node:16.13.2-buster as builder
# RUN npm install -g yarn --force

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn global add @angular/cli
RUN ng build --configuration=production

FROM nginx:1.21.6

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/dist/app/ /app
RUN chown www-data:www-data /app -R && \
    chmod 755 /app -R
CMD nginx -g 'daemon off;'
