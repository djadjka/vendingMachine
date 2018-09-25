FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g supervisor
CMD supervisor app.js 