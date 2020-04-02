function countdown(){
    var daojishi = document.getElementById("daojishi");
    endtime = new Date("10/29/2087 08:35:20");//结束时间
    today = new Date();//当前时间
    delta_T = endtime.getTime() - today.getTime();//时间间隔
    if(delta_T < 0){
        clearInterval(auto);
        daojishi.innerHTML = "倒计时已经结束";
    }
    window.setTimeout(countdown,1000);
    total_days = delta_T/(24*60*60*1000);//总天数
    total_show = Math.floor(total_days);//实际显示的天数
    total_hours = (total_days - total_show)*24;//剩余小时
    hours_show = Math.floor(total_hours);//实际显示的小时数
    total_minutes = (total_hours - hours_show)*60;//剩余的分钟数
    minutes_show = Math.floor(total_minutes);//实际显示的分钟数
    total_seconds = (total_minutes - minutes_show)*60;//剩余的分钟数
    seconds_show = Math.floor(total_seconds);//实际显示的秒数
    daojishi.innerHTML = "我壹佰周岁：" + total_show + "天" + hours_show + "时" + minutes_show + "分" + seconds_show + "秒"+"　";
}
countdown();