FROM mhart/alpine-node:8.6.0
EXPOSE 8080

WORKDIR /var/ui
COPY package.json /var/ui/
RUN yarn

COPY . /var/ui
CMD yarn run prod
