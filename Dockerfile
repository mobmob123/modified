FROM node:18

ENV turn_server_ip = "" 

WORKDIR /usr/src/app

COPY . .

RUN npm install 

RUN apt-get install -y openssl 

EXPOSE 8000

RUN chmod +x entrypoint.sh 

CMD ["./entrypoint.sh"]

