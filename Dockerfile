FROM node:22 AS builder
# RUN npm install -g yarn --force
RUN npm install -g bun
RUN npm install -g @angular/cli

WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .

RUN ng build --configuration=production

FROM nginx:1.27.3-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/dist/app/ /app
CMD nginx -g 'daemon off;'
