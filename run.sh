#!/bin/bash
mongod &
node todo/app.js &
firefox "http://localhost:3000/todos"
