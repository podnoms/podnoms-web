FROM fergalmoran/angular-cli

COPY . /app/
WORKDIR /app/
USER root

RUN chown user /app/ -R

USER user
# RUN yarn install

EXPOSE 4200/tcp

ENTRYPOINT ["/app/server.sh"]
CMD ["default"]
