#!/bin/sh

# if pov_demo is not currently running, then start it up
ps -eo args | grep -v "grep" | grep -e "pov_demo" > /dev/null 2>&1 || {
        /examples/adxl/bin/pov_demo > /dev/null 2>&1 &
}
echo 1

