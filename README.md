# modified
modified from webtutsplus/videoChat-WebFrontend
author is webtutsplus

one time use webrtc example
one time use 1-1webrtc example

docker build -t webrtc .

docker run -d -e turn_server_ip=yourpublicIP --name rtccontainer  -p Portforwebrtc:8000 webrtc

docker build -t turn_server ./turn

docker run -d --name turncontainer  -p 3478:3478 turn_server
