FROM node

RUN apk add pnpm



WORKDIR /app

COPY . .

RUN pnpm ci

RUN npm run build

RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

USER node:node

CMD [node, "build/index.js"]