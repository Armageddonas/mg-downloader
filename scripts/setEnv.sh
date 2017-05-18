#! /bin/bash
echo "$1"
if [ "$1" == "production" ]
then
cp ./src/environment/production.js ./src/environment/index.js
fi

if [ "$1" == "debug" ]
then
cp ./src/environment/debug.js ./src/environment/index.js
fi