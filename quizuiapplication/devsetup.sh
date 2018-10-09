#!/bin/bash

cp src/config/template.js src/config/index.js

export REZOOMEX_API_GATEWAY_ENDPOINT="https://localhost:8081"

sed -i "s|{{REZOOMEX_API_GATEWAY_ENDPOINT}}|$REZOOMEX_API_GATEWAY_ENDPOINT|g" src/config/index.js