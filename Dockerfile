FROM node:18-alpine AS base

RUN apk update && apk upgrade
RUN apk add --no-cache openssl

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --also=dev
RUN npm cache clean --force 

COPY . /app
RUN npx prisma generate

ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:123@postgres/test"
ENV PORT=4000
EXPOSE ${PORT}

CMD npx prisma migrate deploy | npm start