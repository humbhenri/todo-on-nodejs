#!/bin/bash
# Dependencies in Ubuntu derivatives
sudo apt-get install build-essential 
sudo apt-get install nodejs npm mongodb-server mongodb-clients
npm install express jade less expresso nodemon connect-flash pause bytes qs formidable
npm install mongoose --mongodb:native
sudo mkdir -p /data/db
sudo chown $USER /data/db

