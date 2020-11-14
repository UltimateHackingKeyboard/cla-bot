FROM node:15.2.0-alpine3.12 as builder

# Install build dependencies
RUN apk add --update --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./dist .
COPY ./app.yml .

RUN npm install --only=production

# ============ APP Stage ===============
FROM node:15.2.0-alpine3.12 as app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORTgit checkout m

ENV LOG_FORMAT=bunyan

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

USER node

CMD [ "npm", "start" ]
