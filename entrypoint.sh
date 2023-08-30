mkdir -p ./cert/
touch ./cert/private.key
touch ./cert/certificate.crt 

openssl req -x509 -newkey rsa:4096 -keyout ./cert/private.key -out ./cert/certificate.crt -days 365 -nodes -subj "/C=US/ST=California/L=San Francisco/O=YourOrganization/OU=YourDepartment/CN=yourdomain.com/emailAddress=your@email.com" 

echo "const turnConfig = {iceServers: [{ urls: [\"stun:$turn_server_ip\"]},{   urls: \"turn:$turn_server_ip\",username: \"username\", credential: \"password\"}]};" > ./public/js/config.js

node server.js
