var	menubtn = document.getElementsByClassName('aim-menu')[0];
var menu = document.getElementsByClassName('aim-topbar-nav')[0];
menubtn.onclick = function (){var style = menu.style;style.display = style.display == "block" ? "none" : "block";}
$(function(){$.get("https://v1.hitokoto.cn",null,function(a){$(".intro-siteinfo").html(a.hitokoto+" —— <strong>"+a.from+"</strong>")},"JSON")});
    eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('b a(){0 6=1.2("9").4;0 5=1.2("3");0 3=1.2("3").c;0 8=5.e[3].4;0 7=1.2("f");7.d=8+6}',16,16,'var|document|getElementById|jk|value|jkurl|diz|cljurl|jkv|url|dihejk|function|selectedIndex|src|options|player'.split('|'),0,{}))
   function getkey(button){
    if (event.keyCode == 13)
        {       
        event.returnValue = false;
         document.getElementById('bf').click();
        }
};