FROM node:latest

ADD / .

RUN npm install

COPY . .

ENTRYPOINT npm start