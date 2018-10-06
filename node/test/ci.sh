#/bin/bash


dir=$(dirname $0)

for js in $(ls $dir/*.js)
do
  echo $js:
  node $js
done
