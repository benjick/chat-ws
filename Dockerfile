FROM mhart/alpine-node:8.6.0

WORKDIR /var/ui
COPY package.json /var/ui/
RUN yarn

COPY . /var/ui
RUN yarn run prod
