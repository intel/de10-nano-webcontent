var samples_size;
var samples=[];
var div = document.getElementById("u9762"); 
var spinner = new Spinner().spin()
var function_finished = true; 

spinner.el.id = "spinner";

$("#buttonu8263").on("click", function(){
  $("#led_status").load("cgi-bin/ledoff.sh");
});

$("#buttonu8260").on("click", function(){
  $("#led_status").load("cgi-bin/ledon.sh");
});

$("#buttonu8431").on("click", function(){
  $("#led_status").load("cgi-bin/ledblink.sh");
});

$("#buttonu8266").on("click", function(){
  $("#led_status").load("cgi-bin/povstart.sh");
});

$("#buttonu8269").on("click", function(){
  $("#led_status").load("cgi-bin/povstop.sh");
});

$("#buttonu8022").on("click", function(){
  if(function_finished) {
     function_finished = false;
     processing();
     $('#fft_data').bind("DOMSubtreeModified",function(){
          draw();
          if(document.getElementById("spinner") != null) 
             document.getElementById("spinner").remove();
          function_finished = true;
     });
     $("#fft_data").load("cgi-bin/fft_sine.sh");
  }  
});

$("#buttonu8272").on("click", function(){
  if(function_finished) {
     function_finished = false;
     processing();
     $('#fft_data').bind("DOMSubtreeModified",function(){
          draw();
          if(document.getElementById("spinner") != null) 
             document.getElementById("spinner").remove();
          function_finished = true;
     });
     $("#fft_data").load("cgi-bin/fft_square.sh");
  }  
});

$("#buttonu8275").on("click", function(){
  if(function_finished) {
     function_finished = false;
     processing();
     $('#fft_data').bind("DOMSubtreeModified",function(){
          draw();
          if(document.getElementById("spinner") != null) 
             document.getElementById("spinner").remove();
          function_finished = true;
     });
     $("#fft_data").load("cgi-bin/fft_triangle.sh");
  }  
});

function processing() {
     div.appendChild(spinner.el)

     var canvas = document.getElementById("canvas");
     if(canvas == null) 
     {
       canvas = document.createElement('canvas');
       canvas.id     = "canvas";
       canvas.width  = 522;
       canvas.height = 340;
       canvas.style.zIndex   = 8;
       canvas.style.position = "absolute";
       //canvas.style.border   = "1px solid";
       //div = document.getElementById("u9762"); 
       div.appendChild(canvas)
     }
             
     var ctx=canvas.getContext("2d");
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = "blue";
     ctx.font = "bold 18px sans-serif";
     ctx.fillText("Processing...", canvas.width/2 - 50, canvas.height/2 - 30);

        // 256 Data Source from HPS
        document.getElementById("u8302-4").innerHTML = "&nbsp;";
        document.getElementById("u8303-4").innerHTML = "&nbsp;";
        document.getElementById("u8304-4").innerHTML = "&nbsp;";

        // 256 Data Source From FPGA
        document.getElementById("u8329-4").innerHTML = "&nbsp;";
        document.getElementById("u8327-4").innerHTML = "&nbsp;";
        document.getElementById("u8332-4").innerHTML = "&nbsp;";

        // 4096 Data Source from HPS
        document.getElementById("u8305-4").innerHTML = "&nbsp;";
        document.getElementById("u8306-4").innerHTML = "&nbsp;";
        document.getElementById("u8307-4").innerHTML = "&nbsp;";

        // 4096 Data Source From FPGA
        document.getElementById("u8325-4").innerHTML = "&nbsp;";
        document.getElementById("u8326-4").innerHTML = "&nbsp;";
        document.getElementById("u8330-4").innerHTML = "&nbsp;";

        // 1M Data Source from HPS
        document.getElementById("u8308-4").innerHTML = "&nbsp;";
        document.getElementById("u8309-4").innerHTML = "&nbsp;";
        document.getElementById("u8310-4").innerHTML = "&nbsp;";

        // 1M Data Source From FPGA
        document.getElementById("u8331-4").innerHTML = "&nbsp;";
        document.getElementById("u8334-4").innerHTML = "&nbsp;";
        document.getElementById("u8323-4").innerHTML = "&nbsp;";
     
}

function draw() {
        var canvas = document.getElementById("canvas");
        if(canvas == null) 
        {
          canvas = document.createElement('canvas');
          canvas.id     = "canvas";
          canvas.width  = 522;
          canvas.height = 340;
          canvas.style.zIndex   = 8;
          canvas.style.position = "absolute";
          //canvas.style.border   = "1px solid";
          //div = document.getElementById("u9762"); 
          div.appendChild(canvas)
        }

        var fft_data = document.getElementById("fft_data");
        var MarginLeft = 0.05*canvas.width;
        var MarginRight = 0.05*canvas.width;
        var MarginTop = 0.1*canvas.height;
        var MarginBottom = 0.3*canvas.height;	

        var axes={};
        ctx=canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        axes.xWidth = canvas.width-(MarginLeft+MarginRight); 
        axes.yHeight = canvas.height-(MarginTop+MarginBottom);	
        axes.x0 = MarginLeft;  // x0 pixels from left to x=0
        axes.y0 = MarginTop; // y0 pixels from top to y=0
        axes.doNegativeX = false;	
        //axes.scale = axes.y0;

        //var w = canvas.width;
        //var h = canvas.height; 	

        // fill samples
        samples = fft_data.innerHTML.split(",");
        for(var i=0; i<samples.length; i++) { 
                samples[i] = parseInt(samples[i], 10); 
        } 

        var time = [];
        time = samples.splice(samples.length-12,12);
        samples_size = samples.length;

        if(time.length < 12) return;

        // 256 Data Source from HPS
        document.getElementById("u8302-4").innerHTML = time[0];
        document.getElementById("u8303-4").innerHTML = time[1];
        document.getElementById("u8304-4").innerHTML = time[0] - time[1];

        // 256 Data Source From FPGA
        document.getElementById("u8329-4").innerHTML = time[6];
        document.getElementById("u8327-4").innerHTML = time[7];
        document.getElementById("u8332-4").innerHTML = time[6] - time[7];

        // 4096 Data Source from HPS
        document.getElementById("u8305-4").innerHTML = time[2];
        document.getElementById("u8306-4").innerHTML = time[3];
        document.getElementById("u8307-4").innerHTML = time[2] - time[3];

        // 4096 Data Source From FPGA
        document.getElementById("u8325-4").innerHTML = time[8];
        document.getElementById("u8326-4").innerHTML = time[9];
        document.getElementById("u8330-4").innerHTML = time[8] - time[9];

        // 1M Data Source from HPS
        document.getElementById("u8308-4").innerHTML = time[4];
        document.getElementById("u8309-4").innerHTML = time[5];
        document.getElementById("u8310-4").innerHTML = time[4] - time[5];

        // 1M Data Source From FPGA
        document.getElementById("u8331-4").innerHTML = time[10];
        document.getElementById("u8334-4").innerHTML = time[11];
        document.getElementById("u8323-4").innerHTML = time[10] - time[11];

        var SamplesToPlot={};
        SamplesToPlot.content = samples;
        //var max_of_array = Math.max.apply(Math, array);
        SamplesToPlot.maxvalue = Math.max.apply(Math, samples);
        SamplesToPlot.minvalue = Math.min.apply(Math, samples);
        //SamplesToPlot.maxvalue = 130000;
        //SamplesToPlot.minvalue = 0;
        //SamplesToPlot.range = SamplesToPlot.maxvalue - SamplesToPlot.minvalue;

        // Calculating the position of the X-Axis on the Y-Axis
        if (SamplesToPlot.maxvalue < 0) {
                SamplesToPlot.maxvalue = 0;
                axes.XaxisPos = axes.y0;  
                SamplesToPlot.range = 0 - SamplesToPlot.minvalue;
        }
        else if (SamplesToPlot.minvalue > 0) {
                SamplesToPlot.minvalue = 0;
                axes.XaxisPos = axes.y0+axes.yHeight;
                SamplesToPlot.range = SamplesToPlot.maxvalue;
        }
        else	{
                SamplesToPlot.range = SamplesToPlot.maxvalue - SamplesToPlot.minvalue;			
                //SamplesToPlot.range = SamplesToPlot.maxvalue - ;			
                axes.XaxisPos = axes.y0 + ((SamplesToPlot.maxvalue/SamplesToPlot.range)*axes.yHeight);		 
        }

        showAxes(ctx,axes);
        //funGraph(ctx,axes,fun1,"rgb(11,153,11)",1); 
        funGraph(ctx,axes,SamplesToPlot,"rgb(66,44,255)",2);
}

function funGraph (ctx,axes,SamplesToPlot,color,thick) {
        var xx, yy, dx, x0=axes.x0, y0=axes.y0, scale=axes.scale;
        //var iMax = Math.round((ctx.canvas.width)/dx);
        //var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;

        dx = axes.xWidth / (samples_size-1);

        for (var i=0;i<samples_size;i++) {
                xx = x0+dx*i; 
                yy = samples[i];
                if (i==0) ctx.moveTo(xx,axes.y0+(((SamplesToPlot.maxvalue-yy)/SamplesToPlot.range)*axes.yHeight));
                //first sample = -10...range= 140, minvalue=-120.... maxvalue=20    (20--10)/140
                else         ctx.lineTo(xx,axes.y0+(((SamplesToPlot.maxvalue-yy)/SamplesToPlot.range)*axes.yHeight));
        }
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("Number of Samples = ", 20,y0+axes.yHeight+40);
        ctx.fillText(String(samples_size), 20+200,y0+axes.yHeight+40);
        //ctx.fillText("X-axis = SAMPLE#", axes.x0+axes.xWidth+5,y0);	
        ctx.fillText("Sample Maximum Value = ", 20,y0+axes.yHeight+60);
        ctx.fillText(String(SamplesToPlot.maxvalue), 20+200,y0+axes.yHeight+60);	
        //ctx.fillText(String(Math.max.apply(Math, samples)), 20+200,y0+axes.yHeight+60);	
        ctx.fillText("Sample Minimum Value = ", 20,y0+axes.yHeight+80);	
        ctx.fillText(String(SamplesToPlot.minvalue), 20+200,y0+axes.yHeight+80);	
        //ctx.fillText(String(Math.min.apply(Math, samples)), 20+200,y0+axes.yHeight+80);	

}


function showAxes(ctx,axes) {
        var x0=axes.x0, 	w=ctx.canvas.width;
        var y0=axes.XaxisPos, 	h=ctx.canvas.height;

        //var xmin = axes.doNegativeX ? 0 : x0;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(0,0,0)"; 
        ctx.moveTo(x0,y0); ctx.lineTo(x0+axes.xWidth,y0);  // X axis
        ctx.moveTo(x0,axes.y0);    ctx.lineTo(x0,axes.y0+axes.yHeight);  // Y axis
        ctx.strokeStyle = "rgb(40,40,40)"; 
        ctx.moveTo(x0,y0-axes.yHeight/4); ctx.lineTo(x0+axes.xWidth, y0-axes.yHeight/4);  // X axis
        ctx.moveTo(x0,y0-axes.yHeight/2); ctx.lineTo(x0+axes.xWidth, y0-axes.yHeight/2);  // X axis
        ctx.moveTo(x0,y0-3*axes.yHeight/4); ctx.lineTo(x0+axes.xWidth, y0-3*axes.yHeight/4);  // X axis
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "bold 13px sans-serif";
        // Now use green paint
        //ctx.fill();
        // And fill area under curve
        ctx.fillText("Y-axis = Frequency Amplitude", w/2 - 100,20);
        ctx.fillText("X-axis = Sample #", x0,axes.y0+axes.yHeight+20);


}
