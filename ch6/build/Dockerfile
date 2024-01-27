FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ch6 .
EXPOSE 3000
CMD [ "node", "app.js", "http"]