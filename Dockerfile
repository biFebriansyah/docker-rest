FROM node:latest

RUN mkdir -p /usr/src/nodejs/project

WORKDIR /usr/src/nodejs/

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 9000

CMD [ "node", "app.js" ]