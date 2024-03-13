# # syntax=docker/dockerfile:1

# # Comments are provided throughout this file to help you get started.
# # If you need more help, visit the Dockerfile reference guide at
# # https://docs.docker.com/go/dockerfile-reference/

# # Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# ARG NODE_VERSION=18.18.2
# ARG PNPM_VERSION=8.6.12

# FROM node:${NODE_VERSION}-alpine

# # Use production node environment by default.
# ENV NODE_ENV production

# # Install pnpm.
# RUN --mount=type=cache,target=/root/.npm \
#     npm install -g pnpm@${PNPM_VERSION}

# WORKDIR /usr/src/app

# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# # Leverage a bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them into
# # into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.local/share/pnpm/store \
#     pnpm install --prod --frozen-lockfile
# RUN pnpm tsc

# # Run the application as a non-root user.
# USER node

# # Copy the rest of the source files into the image.
# COPY . .

# # Expose the port that the application listens on.
# EXPOSE 3000

# # Run the application.
# CMD pnpm start


# syntax=docker/dockerfile:1
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

