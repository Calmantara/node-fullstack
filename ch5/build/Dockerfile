FROM node:lts
WORKDIR /home/node/app
COPY package*.json ./
USER node
# install semua deps
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "app.js", "http"]