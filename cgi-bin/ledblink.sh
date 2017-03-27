#!/bin/sh

(
flock -x -n 101 && {

echo timer > /sys/class/leds/fpga_led0/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led1/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led2/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led3/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led4/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led5/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led6/trigger
usleep 20000
echo timer > /sys/class/leds/fpga_led7/trigger

}
) 101>$(dirname ${0})/.led.lock

echo 1
