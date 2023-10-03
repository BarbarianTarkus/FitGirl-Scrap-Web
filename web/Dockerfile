FROM node:18 as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . /app

RUN pnpm install && pnpm run build


FROM node:18
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt update && apt upgrade && apt install dumb-init && redis iputils-ping -y

ENV NODE_ENV=production
ENV REDIS_HOST=redis

WORKDIR /app

COPY --from=build /app/build /app/package.json ./




#CMD [ "node","build/index.js" ]
EXPOSE  3000
CMD [ "dumb-init" "node", "build/index.js" ]
