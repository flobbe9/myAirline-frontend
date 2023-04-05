FROM node:latest

WORKDIR /app/frontend

COPY . /app/frontend/

RUN npm ci

CMD npm start