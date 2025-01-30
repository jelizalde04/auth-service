FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
