#!/bin/bash

for filename in /var/www/static/js/*.js;
do
    if [[ $filename == /var/www/static/js/main.* ]] 
    then
        path=$filename
    fi
done;

echo $path

sed -i "s|{{REZOOMEX_API_GATEWAY_ENDPOINT}}|$REZOOMEX_API_GATEWAY_ENDPOINT|g" $path
nginx -g 'daemon off;'