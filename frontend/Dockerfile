FROM node:16-alpine3.14

RUN mkdir /home/node/app && \
	chown -R node:node /home/node

WORKDIR /home/node/app


RUN npm i --unsafe-perm -g npm@latest expo-cli@latest

USER node

COPY --chown=node ./package.json .
RUN npm install

COPY --chown=node . .

ENV NODE_ENV=dockerdev
ENV PORT=19006

EXPOSE 19006

CMD npm run web
