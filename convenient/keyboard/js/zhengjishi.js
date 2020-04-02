function zhengjishi(timespan){
 var date1=new Date(timespan);
 var totalSecs=(new Date()-date1)/1000;
 var days=Math.floor(totalSecs/3600/24);
 var hours=Math.floor((totalSecs-days*24*3600)/3600);
 var mins=Math.floor((totalSecs-days*24*3600-hours*3600)/60);
 var secs=Math.floor((totalSecs-days*24*3600-hours*3600-mins*60));
 document.getElementById("zhengjishi").innerText="　"+"我已出生："+days+"天"+hours+"时"+mins+"分"+secs+"秒"+"　　　　　　　";
}
var clock;
window.onload=function(){
 clock=self.setInterval("zhengjishi('1987/10/29/08:35:20')", 500);  //开始时间点
}