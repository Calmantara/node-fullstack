FROM node:lts
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/app
COPY package*.json ./
# USER node
# install semua deps
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js", "http"]