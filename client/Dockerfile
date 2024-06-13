FROM node:20-alpine

WORKDIR /root/app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD npx prisma db push && npm run start:prod
