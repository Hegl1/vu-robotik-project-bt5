#!/bin/bash

if [ -d "build" ]; then
    rm -rf build
fi

ROOT=`pwd`

mkdir build

cp -r src/backend/* build
cd src/client
npm i
ng build --prod --output-path="$ROOT/build/frontend"

cd $ROOT/build/frontend/assets
cp config.example.json config.json

echo -en "Edit config? [y/N]: "
read editConfig

if [ -n "$editConfig" ] && [ $editConfig == "y" ]; then
    nano config.json
fi

cd $ROOT

zip -r dist/ROS-Client.zip build/*
rm -rf build