FROM node:18-alpine

MAINTAINER Anna_Kochkina

RUN mkdir /app

COPY backend/package.json /app

WORKDIR /app

RUN npm install --production
