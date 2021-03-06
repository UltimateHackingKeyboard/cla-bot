FROM node:15.11.0-alpine3.13 as builder

# Install build dependencies
RUN apk add --update --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./dist .
COPY ./app.yml .

RUN npm install --only=production

# ============ APP Stage ===============
FROM node:15.11.0-alpine3.13 as app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

ENV LOG_FORMAT=json

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

USER node

CMD [ "npm", "start" ]
