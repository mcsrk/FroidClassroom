FROM node:12.13.0-alpine AS alpine

RUN mkdir /code
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY . /code/
EXPOSE 3000

CMD["npm","start"]