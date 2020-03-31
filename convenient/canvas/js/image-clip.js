/*!
* image-process v0.0.1
* (c) 2017-2017 dailc
* Released under the MIT License.
* https://github.com/dailc/image-process
*/(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):(global.ImageClip=factory());}(this,(function(){'use strict';function extend(target){var finalTarget=target;for(var _len=arguments.length,rest=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){rest[_key-1]=arguments[_key];}
rest.forEach(function(source){source&&Object.keys(source).forEach(function(key){finalTarget[key]=source[key];});});return finalTarget;}
function selector(element){var target=element;if(typeof target==='string'){target=document.querySelector(target);}
return target;}
function osMixin(hybrid){var hybridJs=hybrid;var detect=function detect(ua){this.os={};var android=ua.match(/(Android);?[\s/]+([\d.]+)?/);if(android){this.os.android=true;this.os.version=android[2];this.os.isBadAndroid=!/Chrome\/\d/.test(window.navigator.appVersion);}
var iphone=ua.match(/(iPhone\sOS)\s([\d_]+)/);if(iphone){this.os.ios=true;this.os.iphone=true;this.os.version=iphone[2].replace(/_/g,'.');}
var ipad=ua.match(/(iPad).*OS\s([\d_]+)/);if(ipad){this.os.ios=true;this.os.ipad=true;this.os.version=ipad[2].replace(/_/g,'.');}
var quick=ua.match(/QuickHybrid/i);if(quick){this.os.quick=true;}
var ejs=ua.match(/EpointEJS/i);if(ejs){this.os.ejs=true;}
var dd=ua.match(/DingTalk/i);if(dd){this.os.dd=true;}
if(!ejs&&!dd&&!quick){this.os.h5=true;}};detect.call(hybridJs,navigator.userAgent);}
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}
return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
var defaultetting={container:'#imgclip',img:null,isSmooth:true,captureRadius:30,minMoveDiff:1,quality:0.92,mime:'image/jpeg',maxCssHeight:0,sizeTipsStyle:0,compressScaleRatio:1,iphoneFixedRatio:2,isUseOriginSize:false,maxWidth:0,forceWidth:0,forceHeight:0};var ImgClip$1=function(){function ImgClip(options){_classCallCheck(this,ImgClip);osMixin(this);this.options=extend({},defaultetting,options);this.container=selector(this.options.container);this.img=this.options.img;this.domChildren=[];this.events={};this.initCanvas();this.initClip();this.initMagnifier();this.initTransferCanvas();this.resetClipRect();}
_createClass(ImgClip,[{key:'getPixelRatio',value:function getPixelRatio(context){var backingStore=context.backingStorePixelRatio||context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||context.backingStorePixelRatio||1;var ratio=(window.devicePixelRatio||1)/backingStore;ratio*=this.options.compressScaleRatio||1;if(this.os.ios&&this.os.iphone){ratio*=this.options.iphoneFixedRatio||1;}
return ratio;}},{key:'clear',value:function clear(){var lenD=this.domChildren&&this.domChildren.length||0;for(var i=0;i<lenD;i+=1){this.container.removeChild(this.domChildren[i]);}
this.domChildren=null;var allEventNames=Object.keys(this.events||{});var lenE=allEventNames&&allEventNames.length||0;for(var _i=0;_i<lenE;_i+=1){this.container.removeEventListener(allEventNames[_i],this.events[allEventNames[_i]]);}
this.events=null;}},{key:'initCanvas',value:function initCanvas(){this.canvasFull=document.createElement('canvas');this.ctxFull=this.canvasFull.getContext('2d');this.canvasFull.className='clip-canvas-full';this.smoothCtx(this.ctxFull);this.RATIO_PIXEL=this.getPixelRatio(this.ctxFull);var wPerH=this.img.width/this.img.height;var oldWidth=this.container.offsetWidth||window.innerWidth;this.oldWidth=oldWidth;this.oldHeight=oldWidth/wPerH;this.resizeCanvas(oldWidth,this.oldHeight);this.container.appendChild(this.canvasFull);this.domChildren.push(this.canvasFull);}},{key:'resizeCanvas',value:function resizeCanvas(width,height){var maxCssHeight=this.options.maxCssHeight;var wPerH=width/height;var legalWidth=this.oldWidth;var legalHeight=legalWidth/wPerH;if(maxCssHeight&&legalHeight>maxCssHeight){legalHeight=maxCssHeight;legalWidth=legalHeight*wPerH;}
this.marginLeft=(this.oldWidth-legalWidth)/2;this.canvasFull.style.width=legalWidth+'px';this.canvasFull.style.height=legalHeight+'px';this.canvasFull.style.marginLeft=this.marginLeft+'px';this.canvasFull.width=legalWidth*this.RATIO_PIXEL;this.canvasFull.height=legalHeight*this.RATIO_PIXEL;if(this.rotateStep&1){this.scale=this.canvasFull.width/this.img.height;}else{this.scale=this.canvasFull.width/this.img.width;}}},{key:'initClip',value:function initClip(){var clipRect=document.createElement('div');clipRect.className='clip-rect';this.clipRect=clipRect;this.container.appendChild(this.clipRect);this.domChildren.push(this.clipRect);var clipTips=document.createElement('span');clipTips.className='clip-tips';this.clipRect.appendChild(clipTips);this.clipTips=clipTips;if(this.options.sizeTipsStyle===-1||this.options.sizeTipsStyle===0){this.clipTips.classList.add('clip-hidden');}
this.clipRectHorns=[];for(var i=0;i<8;i+=1){var spanHorn=document.createElement('span');spanHorn.className='clip-rect-horn ';if(i===0){spanHorn.className+='horn-nw';}else if(i===1){spanHorn.className+='horn-ne';}else if(i===2){spanHorn.className+='horn-sw';}else if(i===3){spanHorn.className+='horn-se';}else if(i===4){spanHorn.className+='horn-n';}else if(i===5){spanHorn.className+='horn-s';}else if(i===6){spanHorn.className+='horn-w';}else if(i===7){spanHorn.className+='horn-e';}
this.clipRect.appendChild(spanHorn);this.clipRectHorns.push(spanHorn);}
this.resizeClip();}},{key:'resizeClip',value:function resizeClip(){this.listenerHornsResize();this.listenerRectMove();this.listenerContainerLeave();}},{key:'listenerHornsResize',value:function listenerHornsResize(){var _this=this;this.clipEventState={};var saveEventState=function saveEventState(e){_this.clipEventState.width=_this.clipRect.offsetWidth;_this.clipEventState.height=_this.clipRect.offsetHeight;_this.clipEventState.left=_this.clipRect.offsetLeft-_this.marginLeft;_this.clipEventState.top=_this.clipRect.offsetTop;_this.clipEventState.mouseX=e.touches?e.touches[0].pageX:e.pageX;_this.clipEventState.mouseY=e.touches?e.touches[0].pageY:e.pageY;_this.clipEventState.evnt=e;};var getCurXY=function getCurXY(mouseX,mouseY){var curY=mouseY-_this.canvasFull.offsetTop-_this.container.offsetTop;var curX=mouseX-_this.canvasFull.offsetLeft-_this.container.offsetLeft;curY=Math.min(curY,_this.canvasFull.offsetHeight);curY=Math.max(0,curY);curX=Math.min(curX,_this.canvasFull.offsetWidth);curX=Math.max(0,curX);_this.curX=curX;_this.curY=curY;return{curX:curX,curY:curY};};this.getCurXY=getCurXY;var moving=function moving(e){if(!_this.canResizing){return;}
e.preventDefault();e.stopPropagation();var clipEventState=_this.clipEventState;var target=clipEventState.evnt.target;var mouseY=e.touches?e.touches[0].pageY:e.pageY;var mouseX=e.touches?e.touches[0].pageX:e.pageX;var curCooidinate=getCurXY(mouseX,mouseY);var curX=curCooidinate.curX;var curY=curCooidinate.curY;var width=void 0;var height=void 0;var left=void 0;var top=void 0;if(target.classList.contains('horn-nw')){width=clipEventState.width-(curX-clipEventState.left);height=clipEventState.height-(curY-clipEventState.top);left=curX;top=curY;}else if(target.classList.contains('horn-ne')){width=curX-clipEventState.left;height=clipEventState.height-(curY-clipEventState.top);left=clipEventState.left;top=curY;}else if(target.classList.contains('horn-sw')){width=clipEventState.width-(curX-clipEventState.left);height=curY-clipEventState.top;left=curX;top=clipEventState.top;}else if(target.classList.contains('horn-se')){width=curX-clipEventState.left;height=curY-clipEventState.top;left=clipEventState.left;top=clipEventState.top;}else if(target.classList.contains('horn-n')){width=clipEventState.width;height=clipEventState.height-(curY-clipEventState.top);left=clipEventState.left;top=curY;}else if(target.classList.contains('horn-s')){width=clipEventState.width;height=curY-clipEventState.top;left=clipEventState.left;top=clipEventState.top;}else if(target.classList.contains('horn-w')){width=clipEventState.width-(curX-clipEventState.left);height=clipEventState.height;left=curX;top=clipEventState.top;}else if(target.classList.contains('horn-e')){width=curX-clipEventState.left;height=clipEventState.height;left=curX-width;top=clipEventState.top;}
_this.clipRect.style.left=left+_this.marginLeft+'px';_this.clipRect.style.top=top+'px';_this.clipRect.style.width=width+'px';_this.clipRect.style.height=height+'px';_this.draw();};this.container.addEventListener('touchmove',moving);this.container.addEventListener('mousemove',moving);this.events.touchmove=moving;this.events.mousemove=moving;var startResize=function startResize(e){_this.canResizing=true;_this.canvasMag.classList.remove('clip-hidden');if(_this.options.sizeTipsStyle===0){_this.clipTips.classList.remove('clip-hidden');}
saveEventState(e);};var endResize=function endResize(){_this.canResizing=false;_this.canvasMag.classList.add('clip-hidden');if(_this.options.sizeTipsStyle===0){_this.clipTips.classList.add('clip-hidden');}};this.endHronsResize=endResize;for(var i=0;i<8;i+=1){this.clipRectHorns[i].addEventListener('mousedown',startResize);this.clipRectHorns[i].addEventListener('touchstart',startResize);this.clipRectHorns[i].addEventListener('mouseup',endResize);this.clipRectHorns[i].addEventListener('touchend',endResize);}}},{key:'listenerRectMove',value:function listenerRectMove(){var _this2=this;var rectDom=this.clipRect;var moving=function moving(e){if(_this2.canResizing||!_this2.canMove){return;}
e.preventDefault();e.stopPropagation();var MIN_DIFF=_this2.options.minMoveDiff;var mouseY=e.touches?e.touches[0].pageY:e.pageY;var mouseX=e.touches?e.touches[0].pageX:e.pageX;var diffX=mouseX-_this2.prevRectMouseX;var diffY=mouseY-_this2.prevRectMouseY;if(!diffX&&!diffY){return;}
if(Math.abs(diffX)>MIN_DIFF||Math.abs(diffY)>MIN_DIFF){_this2.prevRectMouseX=mouseX;_this2.prevRectMouseY=mouseY;}
var top=rectDom.offsetTop+diffY;var left=rectDom.offsetLeft+diffX;if(top<0){top=0;}else if(top>_this2.canvasFull.offsetHeight-rectDom.offsetHeight){top=_this2.canvasFull.offsetHeight-rectDom.offsetHeight;}
if(left<_this2.marginLeft){left=_this2.marginLeft;}else if(left>_this2.canvasFull.offsetWidth-rectDom.offsetWidth+_this2.marginLeft){left=_this2.canvasFull.offsetWidth-rectDom.offsetWidth+_this2.marginLeft;}
_this2.clipRect.style.left=left+'px';_this2.clipRect.style.top=top+'px';_this2.draw();};rectDom.addEventListener('touchmove',moving);rectDom.addEventListener('mousemove',moving);var startMove=function startMove(e){_this2.canMove=true;var mouseY=e.touches?e.touches[0].pageY:e.pageY;var mouseX=e.touches?e.touches[0].pageX:e.pageX;_this2.prevRectMouseX=mouseX;_this2.prevRectMouseY=mouseY;};var endMove=function endMove(){_this2.canMove=false;};this.endRectMove=endMove;rectDom.addEventListener('mousedown',startMove);rectDom.addEventListener('touchstart',startMove);rectDom.addEventListener('mouseup',endMove);rectDom.addEventListener('touchend',endMove);}},{key:'listenerContainerLeave',value:function listenerContainerLeave(){var _this3=this;var leaveContainer=function leaveContainer(){if(_this3.canResizing){_this3.endHronsResize();}
if(_this3.canMove){_this3.endRectMove();}};this.container.addEventListener('mouseleave',leaveContainer);this.container.addEventListener('mouseup',leaveContainer);this.events.mouseleave=leaveContainer;this.events.mouseup=leaveContainer;}},{key:'draw',value:function draw(){this.drawMag();var realImgSize=this.getRealFinalImgSize(this.clipRect.offsetWidth*this.RATIO_PIXEL,this.clipRect.offsetHeight*this.RATIO_PIXEL);var curWidth=realImgSize.width;var curHeight=realImgSize.height;this.clipTips.innerText=curWidth.toFixed(0)+'*'+curHeight.toFixed(0);this.ctxFull.save();if(this.rotateStep&1){this.ctxFull.clearRect(0,0,this.canvasFull.height,this.canvasFull.width);}else{this.ctxFull.clearRect(0,0,this.canvasFull.width,this.canvasFull.height);}
this.drawImage();this.drawMask();this.ctxFull.beginPath();var params=this.getClipRectParams();var srcX=params.srcX;var srcY=params.srcY;var sWidth=params.sWidth;var sHeight=params.sHeight;this.ctxFull.rect(srcX,srcY,sWidth,sHeight);this.ctxFull.clip();this.drawImage();this.ctxFull.restore();}},{key:'getClipRectParams',value:function getClipRectParams(){var offsetTop=this.clipRect.offsetTop;var offsetLeft=this.clipRect.offsetLeft-this.marginLeft;var offsetWidth=this.clipRect.offsetWidth;var offsetHeight=this.clipRect.offsetHeight;var offsetRight=offsetLeft+offsetWidth;var offsetBottom=offsetTop+offsetHeight;var srcX=offsetLeft;var srcY=offsetTop;var sWidth=offsetWidth;var sHeight=offsetHeight;if(this.rotateStep===1){srcX=offsetTop;srcY=this.canvasFull.offsetWidth-offsetRight;sWidth=offsetHeight;sHeight=offsetWidth;}else if(this.rotateStep===2){srcX=this.canvasFull.offsetWidth-offsetRight;srcY=this.canvasFull.offsetHeight-offsetBottom;sWidth=offsetWidth;sHeight=offsetHeight;}else if(this.rotateStep===3){srcX=this.canvasFull.offsetHeight-offsetBottom;srcY=offsetLeft;sWidth=offsetHeight;sHeight=offsetWidth;}
srcX*=this.RATIO_PIXEL;srcY*=this.RATIO_PIXEL;sWidth*=this.RATIO_PIXEL;sHeight*=this.RATIO_PIXEL;return{srcX:srcX,srcY:srcY,sWidth:sWidth,sHeight:sHeight};}},{key:'getRealCoordinate',value:function getRealCoordinate(mouseX,mouseY){var x=mouseX;var y=mouseY;if(this.rotateStep===1){x=mouseY;y=this.canvasFull.offsetWidth-mouseX;}else if(this.rotateStep===2){x=this.canvasFull.offsetWidth-mouseX;y=this.canvasFull.offsetHeight-mouseY;}else if(this.rotateStep===3){x=this.canvasFull.offsetHeight-mouseY;y=mouseX;}
x*=this.RATIO_PIXEL;y*=this.RATIO_PIXEL;return{x:x,y:y};}},{key:'drawImage',value:function drawImage(){if(this.rotateStep&1){this.ctxFull.drawImage(this.img,0,0,this.img.width,this.img.height,0,0,this.canvasFull.height,this.canvasFull.width);}else{this.ctxFull.drawImage(this.img,0,0,this.img.width,this.img.height,0,0,this.canvasFull.width,this.canvasFull.height);}}},{key:'drawMask',value:function drawMask(){this.ctxFull.save();this.ctxFull.fillStyle='rgba(0, 0, 0, 0.3)';if(this.rotateStep&1){this.ctxFull.fillRect(0,0,this.canvasFull.height,this.canvasFull.width);}else{this.ctxFull.fillRect(0,0,this.canvasFull.width,this.canvasFull.height);}
this.ctxFull.restore();}},{key:'drawMag',value:function drawMag(){var captureRadius=this.options.captureRadius;var centerPoint=this.getRealCoordinate(this.curX,this.curY);var sWidth=captureRadius*2;var sHeight=captureRadius*2;var srcX=centerPoint.x-captureRadius;var srcY=centerPoint.y-captureRadius;if(this.rotateStep&1){this.ctxMag.clearRect(0,0,this.canvasMag.height,this.canvasMag.width);}else{this.ctxMag.clearRect(0,0,this.canvasMag.width,this.canvasMag.height);}
var drawX=0;var drawY=0;if(this.os.ios){if(srcY<0){drawY=this.canvasMag.height/2*Math.abs(srcY/captureRadius);srcY=0;}
if(srcX<0){drawX=this.canvasMag.width/2*Math.abs(srcX/captureRadius);srcX=0;}}
if(srcX<0){srcX=0;}
if(srcY<0){srcY=0;}
this.ctxMag.drawImage(this.img,srcX/this.scale,srcY/this.scale,sWidth/this.scale,sHeight/this.scale,drawX,drawY,this.canvasMag.width,this.canvasMag.height);var centerX=this.canvasMag.width/2;var centerY=this.canvasMag.height/2;var radius=5*this.RATIO_PIXEL;this.ctxMag.beginPath();this.ctxMag.moveTo(centerX-radius,centerY);this.ctxMag.lineTo(centerX+radius,centerY);this.ctxMag.moveTo(centerX,centerY-radius);this.ctxMag.lineTo(centerX,centerY+radius);this.ctxMag.strokeStyle='#de3c50';this.ctxMag.lineWidth=3;this.ctxMag.stroke();}},{key:'initMagnifier',value:function initMagnifier(){this.canvasMag=document.createElement('canvas');this.canvasMag.className='magnifier clip-hidden';this.ctxMag=this.canvasMag.getContext('2d');this.smoothCtx(this.ctxMag);this.container.appendChild(this.canvasMag);this.domChildren.push(this.canvasMag);this.canvasMag.width=this.options.captureRadius*2*this.RATIO_PIXEL;this.canvasMag.height=this.options.captureRadius*2*this.RATIO_PIXEL;}},{key:'initTransferCanvas',value:function initTransferCanvas(){this.canvasTransfer=document.createElement('canvas');this.canvasTransfer.style.display='none';this.canvasTransfer.className='transfer-canvas';this.ctxTransfer=this.canvasTransfer.getContext('2d');this.smoothCtx(this.ctxTransfer);this.container.appendChild(this.canvasTransfer);this.domChildren.push(this.canvasTransfer);}},{key:'smoothCtx',value:function smoothCtx(ctx){var isSmooth=this.options.isSmooth;ctx.mozImageSmoothingEnabled=isSmooth;ctx.webkitImageSmoothingEnabled=isSmooth;ctx.msImageSmoothingEnabled=isSmooth;ctx.imageSmoothingEnabled=isSmooth;}},{key:'getRealFinalImgSize',value:function getRealFinalImgSize(curWidth,curHeight){var wPerH=this.canvasFull.width/this.canvasFull.height;var maxWidth=this.options.maxWidth||0;var forceWidth=this.options.forceWidth||0;var forceHeight=this.options.forceHeight||0;var width=curWidth;var height=curHeight;if(this.rotateStep&1){if(this.options.isUseOriginSize||this.canvasFull.width>this.img.height){width=this.img.width*curWidth/this.canvasFull.height;height=this.img.height*curHeight/this.canvasFull.width;}
if(maxWidth&&this.canvasFull.height>maxWidth&&maxWidth<this.img.height){width=maxWidth*curWidth/this.canvasFull.height;height=maxWidth/wPerH*curHeight/this.canvasFull.width;}
if(forceWidth){width=forceWidth*curWidth/this.canvasFull.height;height=(forceHeight||forceWidth/wPerH)*curHeight/this.canvasFull.width;}}else{if(this.options.isUseOriginSize||this.canvasFull.width>this.img.width){width=this.img.width*curWidth/this.canvasFull.width;height=this.img.height*curHeight/this.canvasFull.height;}
if(maxWidth&&this.canvasFull.width>maxWidth&&maxWidth<this.img.width){width=maxWidth*curWidth/this.canvasFull.width;height=maxWidth/wPerH*curHeight/this.canvasFull.height;}
if(forceWidth){width=forceWidth*curWidth/this.canvasFull.width;height=(forceHeight||forceWidth/wPerH)*curHeight/this.canvasFull.height;}}
return{width:width,height:height};}},{key:'clip',value:function clip(){var params=this.getClipRectParams();var srcX=params.srcX;var srcY=params.srcY;var sWidth=params.sWidth;var sHeight=params.sHeight;var realImgSize=this.getRealFinalImgSize(sWidth,sHeight);var curWidth=realImgSize.width;var curHeight=realImgSize.height;this.rotateStep=this.rotateStep||0;var degree=this.rotateStep*90*Math.PI/180;if(this.rotateStep===0){this.canvasTransfer.width=curWidth;this.canvasTransfer.height=curHeight;}else if(this.rotateStep===1){this.canvasTransfer.width=curHeight;this.canvasTransfer.height=curWidth;this.ctxTransfer.rotate(degree);this.ctxTransfer.translate(0,-this.canvasTransfer.width);}else if(this.rotateStep===2){this.canvasTransfer.width=curWidth;this.canvasTransfer.height=curHeight;this.ctxTransfer.rotate(degree);this.ctxTransfer.translate(-this.canvasTransfer.width,-this.canvasTransfer.height);}else if(this.rotateStep===3){this.canvasTransfer.width=curHeight;this.canvasTransfer.height=curWidth;this.ctxTransfer.rotate(degree);this.ctxTransfer.translate(-this.canvasTransfer.height,0);}
if(srcX<0){srcX=0;}
if(srcY<0){srcY=0;}
if(this.rotateStep&1){this.ctxTransfer.drawImage(this.img,srcX/this.scale,srcY/this.scale,sWidth/this.scale,sHeight/this.scale,0,0,this.canvasTransfer.height,this.canvasTransfer.width);}else{this.ctxTransfer.drawImage(this.img,srcX/this.scale,srcY/this.scale,Math.max(1,Math.round(sWidth/this.scale))-10,Math.max(1,Math.round(sHeight/this.scale))-10,0,0,this.canvasTransfer.width,this.canvasTransfer.height);}
this.clipImgData=this.canvasTransfer.toDataURL(this.options.mime,this.options.quality);}},{key:'resetClipRect',value:function resetClipRect(){this.clipRect.style.left=(this.marginLeft||0)+'px';this.clipRect.style.top=0;this.clipRect.style.width=this.canvasFull.width/this.RATIO_PIXEL+'px';this.clipRect.style.height=this.canvasFull.height/this.RATIO_PIXEL+'px';this.draw();}},{key:'getClipImgData',value:function getClipImgData(){return this.clipImgData;}},{key:'rotate',value:function rotate(isClockWise){var MIN_STEP=0;var MAX_STEP=3;var width=this.oldWidth;var height=this.oldHeight;this.rotateStep=this.rotateStep||0;this.rotateStep+=isClockWise?1:-1;if(this.rotateStep>MAX_STEP){this.rotateStep=MIN_STEP;}else if(this.rotateStep<MIN_STEP){this.rotateStep=MAX_STEP;}
var degree=this.rotateStep*90*Math.PI/180;this.canvasMag.width=this.canvasMag.width;this.canvasMag.height=this.canvasMag.height;if(this.rotateStep===0){this.resizeCanvas(width,height);}else if(this.rotateStep===1){this.resizeCanvas(height,width);this.ctxFull.rotate(degree);this.ctxFull.translate(0,-this.canvasFull.width);this.ctxMag.rotate(degree);this.ctxMag.translate(0,-this.canvasMag.width);}else if(this.rotateStep===2){this.resizeCanvas(width,height);this.ctxFull.rotate(degree);this.ctxFull.translate(-this.canvasFull.width,-this.canvasFull.height);this.ctxMag.rotate(degree);this.ctxMag.translate(-this.canvasMag.width,-this.canvasMag.height);}else if(this.rotateStep===3){this.resizeCanvas(height,width);this.ctxFull.rotate(degree);this.ctxFull.translate(-this.canvasFull.height,0);this.ctxMag.rotate(degree);this.ctxMag.translate(-this.canvasMag.height,0);}
this.resetClipRect();}},{key:'destroy',value:function destroy(){this.clear();this.canvasFull=null;this.ctxFull=null;this.canvasTransfer=null;this.ctxTransfer=null;this.canvasMag=null;this.ctxMag=null;this.clipRect=null;}}]);return ImgClip;}();return ImgClip$1;})));