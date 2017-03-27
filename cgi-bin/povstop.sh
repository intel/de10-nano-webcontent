#!/bin/sh

# stop all instances of pov_demo
while true
do
PGRP=$(ps -eo pgrp,args | grep -v "grep" | grep -e "pov_demo" | head -n 1 | cut -d ' '  -f 2)
[ -z ${PGRP} ] && { break; } || { kill -TERM -${PGRP} > /dev/null 2>&1; }
done
echo 1

