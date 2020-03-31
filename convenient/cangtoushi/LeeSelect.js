// Lee select http://www.tool.cx

jQuery.fn.LeeSelect=function(){

var temp_select=new String();
var temp_sc=$(this).children("option:selected");
var temp_id=$(this).attr("name");
temp_select+="<div id='"+temp_id+"' class='LeeSelect'><input type='hidden' name='"+temp_id+"' value='"+temp_sc.attr("value")+"' /><span>"+temp_sc.html()+"</span><ul>";
var obj_c=$(this).children();
for(var i=0;i<obj_c.length;i++){
 temp_select+="<li v='"+obj_c.eq(i).attr("value")+"'>"+obj_c.eq(i).html()+"</li>";
}
temp_select+="</ul></div>";
$(this).replaceWith(temp_select);

$("#"+temp_id+" span").click(function(){
 if($(this).next().css("display")=="none"){
  $(this).next().show();
 }else{
  $(this).next().hide();
 }
});

$("#"+temp_id+" ul li").hover(
 function(){
  $(this).addClass("li2");
 },
 function(){
  $(this).removeClass("li2");
 }
);

$("#"+temp_id+" li").click(function(){
 $(this).parent().prevAll("input").attr("value",$(this).attr("v"));
 $(this).parent().prevAll("span").html($(this).html());
 $(this).parent().hide();
});

};

$(document).click(function(evt){
 var evt=evt || window.event; 
 var target=evt.target || window.event.srcElement;
 var isLee=false;
 while(target){
  if(target.className=="LeeSelect")isLee=true;
  target=target.parentNode;
 }
 if(isLee==false)$(".LeeSelect ul").hide();
});