FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20 AS prod
WORKDIR /app
COPY --from=builder /app .
CMD node ./dist/index.js