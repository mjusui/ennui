#!/bin/bash

dir=$(cd $(dirname $0);pwd)
phantomjs=$dir/node_modules/.bin/phantomjs
extern=glosbe
glosbejs=${dir}/${extern}.js
log=$dir/log/lang/${extern}.json

$phantomjs $glosbejs > $log


