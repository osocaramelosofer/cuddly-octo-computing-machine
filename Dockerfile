
FROM node:18-alpine3.17 as builder

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@8.6.12
RUN pnpm install

COPY . .
RUN pnpm tsc

FROM node:18-alpine3.17 as production

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build ./build
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@8.6.12
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["node", "build/index.js"]

