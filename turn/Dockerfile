FROM ubuntu:22.04

RUN apt-get update -y
RUN apt-get install coturn -y 


EXPOSE 3478/tcp
EXPOSE 3478/udp

CMD turnserver -a -o -v -n --no-dtls --no-tls -u username:password -r testRealm & sleep infinity 

