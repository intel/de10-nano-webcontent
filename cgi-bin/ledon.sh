#!/bin/sh

(
flock -x -n 101 && {

echo none > /sys/class/leds/fpga_led0/trigger
echo none > /sys/class/leds/fpga_led1/trigger
echo none > /sys/class/leds/fpga_led2/trigger
echo none > /sys/class/leds/fpga_led3/trigger
echo none > /sys/class/leds/fpga_led4/trigger
echo none > /sys/class/leds/fpga_led5/trigger
echo none > /sys/class/leds/fpga_led6/trigger
echo none > /sys/class/leds/fpga_led7/trigger

echo 0 > /sys/class/leds/fpga_led0/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led1/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led2/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led3/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led4/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led5/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led6/brightness
usleep 200000
echo 0 > /sys/class/leds/fpga_led7/brightness

}
) 101>$(dirname ${0})/.led.lock
echo 1
