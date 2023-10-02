FROM node:18

ENV NODE_ENV=production
RUN apt update && apt install redis iputils-ping -y

WORKDIR /app

COPY ./ ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source

#CMD [ "node","build/index.js" ]
EXPOSE  3000
CMD [ "node", "build/index.js" ]
