FROM ubuntu:22.04

RUN apt-get update -y
RUN apt-get install coturn -y 


EXPOSE 3478

CMD turnserver -a -o -v -n --no-dtls --no-tls -u username:password -r testRealm & sleep infinity 

