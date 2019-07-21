FROM node:12-alpine as builder

# Install build dependencies
RUN apk add --no-cache python make g++

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./dist .
COPY ./app.yml .

RUN npm install --only=production

# ============ APP Stage ===============
FROM node:12-alpine as app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

ENV LOG_FORMAT=bunyan

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

USER node

CMD [ "npm", "start" ]
