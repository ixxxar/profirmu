FROM node:alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

EXPOSE 8080

CMD [ "npm", "start" ]