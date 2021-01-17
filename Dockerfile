FROM node:15
WORKDIR /usr/src/tokenbot

# install dependencies first so docker can cache the result
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

EXPOSE 8080
CMD ["node", "dist/index.js"]