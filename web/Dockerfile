FROM node:18
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV REDIS_HOST=redis

RUN apt update && apt install redis iputils-ping -y

WORKDIR /app

COPY ./ ./

RUN pnpm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source

#CMD [ "node","build/index.js" ]
EXPOSE  3000
CMD [ "node", "build/index.js" ]
