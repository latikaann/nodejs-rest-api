FROM node:18.17.0

WORKDIR /nodejs-rest-api

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]