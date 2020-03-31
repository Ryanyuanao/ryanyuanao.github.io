/*var rect = $(".eye").getBoundingClientRect();
document.write(rect);*/
var limitX = 50, limitY = 50;
var containerW = $('.container').width();
var containerH = $('.container').height();
$( ".container" ).mousemove(function( e ) {
  //var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
  //var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
  var mouseY = Math.min(e.clientY/(containerH*.01), limitY);
  var mouseX = Math.min(e.clientX/(containerW*.01), limitX);
  $('.pupil').css('top', mouseY);
  $('.pupil').css('left', mouseX);
  console.log(e.clientY+'  '+e.clientX);
});


//this is better.....
/*var mouseX = 0, mouseY = 0, limitX = 80-15, limitY = 80-15;
$(".container" ).mousemove(function(e){
   mouseX = Math.min(e.clientX, limitX);
   mouseY = Math.min(e.clientY, limitY);
});
var xp = 0, yp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX - xp) / 1;
    yp += (mouseY - yp) / 1;
    $('.pupil').css({left:xp, top:yp});
    
}, 30);*/