FROM node:15

WORKDIR /usr/src/tokenbot

# Install dependencies first so docker can cache them
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

CMD ["npx", "pm2-runtime", "dist/index.js"]
