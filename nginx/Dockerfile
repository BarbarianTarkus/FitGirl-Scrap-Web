FROM nginx

RUN apt update && apt install redis iputils-ping -y


RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf