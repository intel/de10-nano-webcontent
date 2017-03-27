#!/bin/sh

(
flock -x -n 102 && {


# if the /mnt/ran/fft does not exist then create it and run all fft demos
if [ ! -d "/mnt/ram/fft" ] ; then
  /examples/fft/bin/setup_target_fft_env.sh 
fi

pushd /mnt/ram/fft > /dev/null 2>&1 
rm -f /home/root/triangle.log
rm -f /home/root/triangle_fpga.log

#rerun demo
for num in 256 4096 256x32x128
do         
  size=$num
  if [ $size == 256x32x128 ] ; then
        size=1M
  fi

  ./neon32_${num} --input=input_waveforms/ne10cpx_long_triangle${size}.bin --output=output_waveforms/neon32_${num}_triangle.bin >> /home/root/triangle.log
  cat output_waveforms/neon32_${num}_triangle.bin | ./ne10cpx_long_to_text > output_waveforms/neon32_${num}_triangle.txt
  rm output_waveforms/neon32_${num}_triangle.bin 

  ./fftdma_${num} --input=input_waveforms/ne10cpx_short_triangle${size}.bin --output=output_waveforms/fftdma_${num}_triangle.bin >> /home/root/triangle.log
  #cat output_waveforms/fftdma_${num}_triangle.bin | ./ne10cpx_long_to_text > output_waveforms/fftdma_${num}_triangle.txt
  rm output_waveforms/fftdma_${num}_triangle.bin 

  if [ $size == 256 ] ; then
    ./stream_neon32_256x1x1 --input=input_waveforms/ne10cpx_long_triangle${size}.bin --output=output_waveforms/stream_neon32_${num}_triangle.bin >> /home/root/triangle_fpga.log
    rm output_waveforms/stream_neon32_${num}_triangle.bin 
  
    ./stream_fpga_256x1x1 --input=input_waveforms/ne10cpx_short_triangle${size}.bin --output=output_waveforms/stream_fpga_${num}_triangle.bin >> /home/root/triangle_fpga.log
    rm output_waveforms/stream_fpga_${num}_triangle.bin 
  elif [ $size == 4096 ] ; then
    ./stream_neon32_256x16x1 --input=input_waveforms/ne10cpx_long_triangle${size}.bin --output=output_waveforms/stream_neon32_${num}_triangle.bin >> /home/root/triangle_fpga.log
    rm output_waveforms/stream_neon32_${num}_triangle.bin 
  
    ./stream_fpga_256x16x1 --input=input_waveforms/ne10cpx_short_triangle${size}.bin --output=output_waveforms/stream_fpga_${num}_triangle.bin >> /home/root/triangle_fpga.log
    rm output_waveforms/stream_fpga_${num}_triangle.bin 
  else
    ./stream_neon32_256x32x128 --input=input_waveforms/ne10cpx_long_triangle${size}.bin --output=output_waveforms/stream_neon32_${num}_triangle.bin >> /home/root/triangle_fpga.log
    rm output_waveforms/stream_neon32_${num}_triangle.bin 
  
    ./stream_fpga_256x32x128 --input=input_waveforms/ne10cpx_short_triangle${size}.bin --output=output_waveforms/stream_fpga_${num}_triangle.bin >> /home/root/triangle_fpga.log
    rm output_waveforms/stream_fpga_${num}_triangle.bin 
  fi
done
popd > /dev/null 2>&1

cat /mnt/ram/fft/output_waveforms/neon32_256_triangle.txt | perl -p -e "s/([-\d]+)\s+([-\d]+)/printf(\"%d,\", sqrt(\$1*\$1 + \$2*\$2))/e; s/real//; s/imag//; s/[\r\n]//g; s/\s+//g; s/\d+\$//;" 

printf "%.0f,%.0f,%.0f,%.0f,%.0f,%.0f," `grep "(us)" /home/root/triangle.log      | perl -p -e "s/^.*: //; s/[\r\n]/ /g;"`
printf "%.0f,%.0f,%.0f,%.0f,%.0f,%.0f"  `grep "(us)" /home/root/triangle_fpga.log | perl -p -e "s/^.*: //; s/[\r\n]/ /g;"`


}
) 102>$(dirname ${0})/.fft.lock

echo " DONE"
