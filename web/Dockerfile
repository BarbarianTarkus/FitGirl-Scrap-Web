FROM node:20 as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV REDIS_HOST=redis

RUN corepack enable

WORKDIR /app

COPY . /app


RUN pnpm install && pnpm run build

#CMD [ "pnpm","install", "&&", "pnpm","run","build"]

FROM node:20
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV REDIS_HOST=redis
ENV NODE_ENV=production

RUN corepack enable
RUN apt update && apt upgrade && apt install dumb-init redis iputils-ping -y

WORKDIR /app

COPY --from=build /app/build /app/package.json ./


RUN pnpm install --production
#CMD [ "node","build/index.js" ]
EXPOSE  3000
CMD [ "dumb-init","node", "index.js" ]
