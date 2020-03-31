var CanvasBoard=function(id,pImg){this.canvas="";this.context="";this.eraserEnabled="";this.lineWidth=1;this.penSize=1;this.canvasTop=this.title;this.scrollTop=0;this.scrollLeft=0;this.canvasWidth="";this.canvasHeight="";this.cPushArray=[];this.cStep=-1;this.addShow=true;this.isClick=false;this.postImg=pImg;this.$parent=$("#"+id);this.init=function(){var canvasDiv=$('<div id="drawBox" class="drawBox">'+
'<div style="overflow:hidden;">'+
'<div id="canvasWrapper">'+
'<div id="canvasBox">'+
'<canvas id="canvas" width="1024" height="394"></canvas>'+
'<ul id="actions" class="actions">'+
'<li class="" id="clearBtn"> '+
'<img src="img/del.png" alt=""> '+
'</li> '+
'<li class="" id="cUndoBtn"><img src="img/backPrev.png" alt=""></li> '+
'<li class="" id="cRedoBtn"><img src="img/backNext.png" alt=""></li> '+
'<li class="" id="eraserBtn"><img src="img/eraser.png" alt=""></li> '+
'<li class="active" id="penBtn"><img src="img/brush.png" alt=""></li> '+
'<div class="penSetting"> '+
'<div class="pTit">笔设置</div> '+
'<div class="pSize"> '+
'<p class="clearfix"> '+
'<span class="fl">大小</span>'+
'<span class="fr sizeSpan">'+this.penSize+'</span> '+
'</p> '+
'<input type="range" min="1" max="8" step="1" value="'+this.penSize+'" id="setPensize"> '+
'</div> '+
'<ul class="pColor clearfix"> '+
'<li id="c1" class="" style="background: #EFDCD3;"></li> '+
'<li id="c2" class="" style="background: #F59999;"></li> '+
'<li id="c3" class="" style="background: #E86262;"></li> '+
'<li id="c4" class="" style="background: #AA4446;"></li> '+
'<li id="c5" class="" style="background: #6B4849;"></li> '+
'<li id="c6" class="active" style="background: #34231E;"></li> '+
'<li id="c7" class="" style="background: #435772;"></li> '+
'<li id="c8" class="" style="background: #2DA4A8;"></li> '+
'<li id="c9" class="" style="background: #FEAA3A;"></li> '+
'<li id="c10" class="" style="background: #FD6041;"></li> '+
'<li id="c11" class="" style="background: #CF2257;"></li> '+
'<li id="c12" class="" style="background: #404040;"></li> '+
'<li id="c13" class="" style="background: #92BEE2;"></li> '+
'<li id="c14" class="" style="background: #2286D8;"></li> '+
'</ul> '+
'</div> '+
'<li id="addWidth"><img src="img/addWidth.png" alt=""></li> '+
'<li id="addHeight"><img src="img/addHeight.png" alt=""></li> '+
'<div class="fr"> '+
'<a href="javascript:;" class="back">返回</a> '+
'<a href="javascript:;" class="submitCanvas">提交</a> '+
'</div> '+
'</ul> '+
'</div></div> '+
'<div class="dragBox" id="dragBox"><img src="img/drag.png" alt=""></div> '+
'</div></div>');var that=this;that.$parent.append(canvasDiv);that.canvas=document.getElementById('canvas');that.context=that.canvas.getContext('2d');that.cPushArray=[];that.dragCanvas();$("#canvas").attr("width",$("#canvasWrapper").width());$("#canvas").attr("height",$("#canvasWrapper").height());$("#dragBox").css("top","46.9%");$("#actions").css("top","48.7%");that.autoSetCanvasSize(that.canvas,"1");that.listenToUser(that.canvas);that.eraserEnabled=false;that.lineWidth=that.penSize;that.context.fillStyle='#34231E';that.context.strokeStyle='#34231E';that.cStep=-1;if(that.postImg!=""){that.loadImage();}
$("#penBtn").on("click",function(){that.eraserEnabled=false;$(this).addClass('active').siblings("li").removeClass('active');if(!that.isClick){$(".penSetting").show();that.isClick=true;}else{$(".penSetting").hide();that.isClick=false;}});$("#eraserBtn").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');that.eraserEnabled=true;$(".penSetting").hide();that.isClick=false;});$("#clearBtn").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');that.context.clearRect(0,0,that.canvas.width,that.canvas.height);$(".penSetting").hide();that.isClick=false;that.cPush();});$("#cUndoBtn").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');if(that.cStep>=0){that.cStep--;if(that.cStep==-1){that.context.clearRect(0,0,that.canvas.width,that.canvas.height);}else{that.cGet(that.cStep);}}
$(".penSetting").hide();that.isClick=false;});$("#cRedoBtn").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');if(that.cStep<that.cPushArray.length-1){that.cStep++;that.cGet(that.cStep);}
$(".penSetting").hide();that.isClick=false;});$("#addWidth").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');that.canvasWidth=parseInt(that.canvasWidth)+100;$("#canvas").width(that.canvasWidth);$("#canvas").attr("width",that.canvasWidth);that.autoSetCanvasSize(that.canvas,"3");that.cGet(that.cStep);$("#canvasWrapper").scroll(function(){that.scrollLeft=$("#canvasWrapper").scrollLeft();});$(".penSetting").hide();that.isClick=false;});$("#addHeight").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');that.canvasHeight=parseInt(that.canvasHeight)+100;$("#canvas").height(that.canvasHeight);$("#canvas").attr("height",that.canvasHeight);$(".hScroll").height(that.canvasHeight);$(".wScroll").css("top",that.canvasHeight+"px");that.autoSetCanvasSize(that.canvas,"3");that.cGet(that.cStep);$("#canvasWrapper").scroll(function(){that.scrollTop=$("#canvasWrapper").scrollTop();});$(".penSetting").hide();that.isClick=false;});$(".pColor li").on("click",function(){$(this).addClass('active').siblings("li").removeClass('active');var thisColor=$(this).css("background-color");that.context.fillStyle=thisColor;that.context.strokeStyle=thisColor;});$(".back").on("click",function(){that.context.clearRect(0,0,that.canvas.width,that.canvas.height);$(".wScroll").width(that.canvas.width);$(".hScroll").css("left",that.canvas.width+"px");$(".hScroll").height(that.canvas.height);$(".wScroll").css("top",that.canvas.height+"px");$("#drawBox").remove();});$(".submitCanvas").on("click",function(){var url=that.canvas.toDataURL("image/png");that.context.clearRect(0,0,that.canvas.width,that.canvas.height);$(".wScroll").width(that.canvas.width);$(".hScroll").css("left",that.canvas.width+"px");$(".hScroll").height(that.canvas.height);$(".wScroll").css("top",that.canvas.height+"px");$("#imgBox").attr("src",url);$("#drawBox").remove();});$("#setPensize").on("input",function(){var value=$(this).val();that.penSize=value;$(".sizeSpan").text(value);$(this).css('background-size',value/8*100+'% 100%');});};this.autoSetCanvasSize=function(canvas,index){var that=this;that.setCanvasSize(canvas,index)
window.onresize=function(){that.setCanvasSize(canvas,index)}};this.setCanvasSize=function(canvas,index){var that=this;var pageWidth=document.getElementById("canvas").clientWidth;var pageHeight=document.getElementById("canvas").clientHeight;that.canvasTop=$("#canvasWrapper").offset().top;that.canvasWidth=pageWidth;that.canvasHeight=pageHeight;};this.drawCircle=function(x,y,radius){var that=this;$(".penSetting").hide();that.isClick=false;that.context.beginPath()
that.context.arc(x,y,radius,0,Math.PI*2);that.context.fill();};this.drawLine=function(x1,y1,x2,y2){var that=this;$(".penSetting").hide();that.isClick=false;that.context.beginPath();that.context.moveTo(x1,y1)
that.context.lineWidth=that.penSize;that.context.lineTo(x2,y2);that.context.stroke();that.context.closePath();};this.listenToUser=function(canvas){var that=this;var using=false;var lastPoint={x:undefined,y:undefined}
if(document.body.ontouchstart!==undefined){canvas.ontouchstart=function(obj){var x=obj.touches[0].clientX;var y=obj.touches[0].clientY;using=true;if(that.eraserEnabled){that.context.clearRect(x-5+that.scrollLeft,y-5-that.canvasTop+that.scrollTop,20,20)
$("#canvasWrapper").css("overflow","hidden");}else{lastPoint={"x":x,"y":y}
$("#canvasWrapper").css("overflow","hidden");}}
canvas.ontouchmove=function(obj){var x=obj.touches[0].clientX
var y=obj.touches[0].clientY
if(!using){return}
if(that.eraserEnabled){that.context.clearRect(x-5+that.scrollLeft,y-5-that.canvasTop+that.scrollTop,20,20)}else{var newPoint={"x":x,"y":y}
that.drawLine(lastPoint.x+that.scrollLeft,lastPoint.y-that.canvasTop+that.scrollTop,newPoint.x+that.scrollLeft,newPoint.y-that.canvasTop+that.scrollTop)
lastPoint=newPoint;}}
canvas.ontouchend=function(e){that.cPush();using=false;$("#canvasWrapper").css("overflow","auto");}}else{canvas.onmousedown=function(obj){var x=obj.clientX;var y=obj.clientY;using=true;if(that.eraserEnabled){that.context.clearRect(x-5+that.scrollLeft,y-5-that.canvasTop+that.scrollTop,20,20)
$("#canvasWrapper").css("overflow","hidden");}else{lastPoint={"x":x,"y":y}
$("#canvasWrapper").css("overflow","hidden");}}
canvas.onmousemove=function(obj){var x=obj.clientX
var y=obj.clientY
if(!using){return}
if(that.eraserEnabled){that.context.clearRect(x-5+that.scrollLeft,y-5-that.canvasTop+that.scrollTop,20,20)}else{var newPoint={"x":x,"y":y}
that.drawLine(lastPoint.x+that.scrollLeft,lastPoint.y-that.canvasTop+that.scrollTop,newPoint.x+that.scrollLeft,newPoint.y-that.canvasTop+that.scrollTop)
lastPoint=newPoint;}}
canvas.onmouseup=function(obj){that.cPush();using=false;$("#canvasWrapper").css("overflow","auto");}}};this.dragCanvas=function(){var that=this;var oDiv1=document.getElementById('drawBox');var oDiv2=document.getElementById('canvasWrapper');var oDiv3=document.getElementById('dragBox');var oDiv4=document.getElementById('actions');var oDiv5=document.getElementById('canvas');if(document.body.ontouchstart!==undefined){var startY=0,sY=0,moveY=0,topY=0;$("#dragBox").on({touchstart:function(e){startY=e.originalEvent.targetTouches[0].pageY;sY=$(this).offset().top;topY=startY-sY;},touchmove:function(e){e.preventDefault();moveY=e.originalEvent.targetTouches[0].pageY;var objY=moveY-topY;if(objY>=0&&objY<=oDiv1.offsetHeight){$("#dragBox").css("top",objY-oDiv3.offsetHeight-2+'px');$('#canvasWrapper').height(oDiv1.offsetHeight-objY-12+'px');$("#canvas").height(oDiv1.offsetHeight-objY-12+'px');$("#canvas").attr("height",oDiv1.offsetHeight-objY-12+'px');$("#actions").css("top",objY-oDiv3.offsetHeight+12+'px');$(".hScroll").height(oDiv1.offsetHeight-objY-12+'px');$(".wScroll").css("top",oDiv1.offsetHeight-objY-12+'px');that.autoSetCanvasSize(that.canvas,"2");}},touchend:function(e){that.cGet(that.cStep);}});}else{oDiv3.onmousedown=function(ev){var oEvent=ev||event;document.onmousemove=function(ev){var oEvent=ev||event;if(oEvent.clientY>=0&&oEvent.clientY<=oDiv1.offsetHeight){oDiv3.style.top=oEvent.clientY-oDiv3.offsetHeight-2+'px';oDiv2.style.height=oDiv1.offsetHeight-oEvent.clientY+'px';oDiv5.style.height=oDiv1.offsetHeight-oEvent.clientY+'px';oDiv5.height=oDiv1.offsetHeight-oEvent.clientY;oDiv4.style.top=oEvent.clientY-oDiv3.offsetHeight+12+'px';that.autoSetCanvasSize(that.canvas,"2");}}
document.onmouseup=function(){that.cGet(that.cStep);document.onmousemove=null;document.onmouseup=null;}}}};this.loadImage=function(){var that=this;var image=new Image();image.src=that.postImg;$(image).load(function(){that.context.drawImage(image,0,0);that.cPush();});};this.cPush=function(){var that=this;that.cStep++;if(that.cStep<that.cPushArray.length){that.cPushArray.length=that.cStep;}
that.cPushArray.push(that.canvas.toDataURL());};this.cGet=function(step){var that=this;var canvasPic=new Image();if(that.cPushArray[step]!=""&&that.cPushArray[step]!=undefined){canvasPic.src=that.cPushArray[step];canvasPic.onload=function(){that.context.clearRect(0,0,that.canvas.width,that.canvas.height);that.context.drawImage(canvasPic,0,0);}}};};