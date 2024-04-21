FROM node:21-alpine

WORKDIR /root

ADD index.js .
ADD package.json .

RUN npm install --no-audit && \
    npm prune --omit=dev

CMD [ "index.js" ]
