
/*
* 拿到高度和下拉的高度进行判断 然后改变header的样式和火箭是否出现
*
* */

$(function (){
    var headerT=$('#header').offset().top;
    var scrollT;
    $(window).on('scroll',function (){
       scrollT=$(window).scrollTop();
        if(scrollT>=headerT){
            $('#header').css({
                'position':'fixed',
                'top':-40,
                'background':'white'
            })
            $('#leftPic,#rocket').stop().fadeIn('fast');
        }else{
            $('#header').css({
                'position':'absolute',
                'top':headerT,
                'background':'#f0f0f3'
            })
            $('#leftPic,#rocket').hide();
        }
    })
    
    /*
    * 火箭点击回顶部
    * 
    * */
    $('#rocket').click(function (){
      $('body').animate({scrollTop:0})      
    })
    
    /*
    * 
    * 初始化数据
    * 
    * 拿到数据 dataArr=store.get('dataArr')||[];
    * 
    * */
    
    var dataArr=[];
    
    function init(){
        dataArr=store.get('dataArr')||[];
        layout();
    }
    init();
    
    
    /*
    * 
    * 点击发布,执行创建数据和调用布局的方法
    *
    * 判断是否输入内容
    * 创建数据
    *  title:'',  标题
     content:'',  内容
     time:'',     时间
     flag:false,  标记放哪里
     isTime:false 标记是否完成了

     dataArr.push(json); 把创建的数据放入到数组中
    * */
    
    $('#btn').click(function (){
        var value=$('#header input[type=text]').val();
        if($.trim(value)==''){
            alert('请输入内容') ;
            return ;
        }else{
            var json={
                title:'',
                content:'',
                time:'',
                flag:false,
                isTime:true
            }
            dataArr.push(json);
            json.title=value;
            layout();
            $('#task>li:first').hide().slideDown('fast');
        }
        $('#header input[type=text]').prop('value','');
    })
    
    /*
    * 布局
    *
    * 通过键值保存数据 store.set('dataArr',dataArr)
    *  $('#task,#finish_task').empty(); 清空UL 里面的内容,避免数据重复
    *
    *  循环遍历数组添加节点把数据放到节点上
    *
    *  根据标记判断放到哪个UL中
    *
    * */
    function layout(){
         store.set('dataArr',dataArr);
        $('#task,#finish_task').empty();
        for(var i=0;i<dataArr.length;i++){
            var obj= dataArr[i];
            if(obj==undefined||!obj) {
                continue;
            }
            var li='<li data-index="'+i+'">' +
                '<input type="checkbox" '+(obj.flag?'checked':'')+'/>'+
                '<span id="title">'+obj.title+'</span>'+
                '<span id="details">详情</span>'+
                ' <span id="del">删除</span>'+
                '</li>'
            if(!obj.flag){
                $('#task').prepend(li)
            }else{
                $('#finish_task').prepend(li)
            }
        }
    }

    /*
    *
    * 点击删除按钮  因为是动态添加,所以要用代理
    *
    * 获取点击当前li的下标进行删除 删除完更新数据
    *
    * */

    $('body').on('click','#del',function (){
        var parent=$(this).parent();
        var index=parent.data('index');

        delete  dataArr[index];

        parent.slideUp('fast',function (){
          $(this).remove();
        })
        store.set('dataArr',dataArr);
    })

    /*
    *
    * 点击详情
    *
    *
    *
    * */


    /*
    * key作业防止BUG  currIndex用在更新内容
    *改变相关的样式 拿到当前点击li的数据赋值给 弹出来的框
    * */
    var key=false;
    var currIndex;
    $('body').on('click','#details',function (event){

        event.stopPropagation()

        key=true;

        $('body,#header').css({background:'gray',opacity:0.8}).fadeTo(300,1)

        $('#rocket').stop().hide();

        $('#oSpan').hide();
        document.body.style.overflow = 'hidden';


        $('#someContent').css({
            'position':'fixed',
            'top':'50%',
            'left':'50%',
            'transform':'translate(-50%,-50%)'
        }).fadeIn(300);

        var parent=$(this).parent();
        var index=parent.data('index');

        var obj=dataArr[index];

        currIndex=index;

        $('#conTitle').text(obj.title);
        $('#someContent textarea').val(obj.content)
        $('#time').val(obj.time);

    });


    /*
    *
    * 点击复选框切换内容位置
    *
    * 拿到点击对应的数据
    *
    * */

    $('body').on('click','input[type=checkbox]',function (event){
        event.stopPropagation();

        var parent=$(this).parent();
        var index=parent.data('index');

        var obj=dataArr[index];

        obj.flag=$(this).is(':checked')


        dataArr[index]=obj;

        store.set('dataArr',dataArr)

        layout();


    })

    
    /*
    * 点击完成和未完成切换界面
    * 
    * */
    $('#Fin').click(function (event){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#content #task').hide()
        $('#content #finish_task').fadeIn('fast')
    })
    $('#UnFin').click(function (event){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#content #task').fadeIn('fast')
        $('#content #finish_task').hide()
    })

    
    /*
    *
    * 点击body 关闭恢复原样
    *
    * */

    function close(){
        $('body,#header').css({background:'#f0f0f3',opacity:0.8}).fadeTo(300,1)
        $('#someContent').fadeOut(100);
        document.body.style.overflow = 'auto';

        if(scrollT>=headerT){
            $('#rocket').stop().fadeIn();
        }
    }

    $('body').click(function (){
        if(key){
            close()
        }
        key=false;
    })
    /*
    * 关闭点击和body一样
    *
    * */
    $('#close').click(function (){
        close()
    })
    /*
    * 阻止冒泡
    * */
    $('#someContent').click(function (event){
        event.stopPropagation()
    })


    /*
    * 更新按钮
    *  //给输入框添加时间选项
    * */

    $.datetimepicker.setLocale('ch');
    $('#time').datetimepicker();

    $('#someContent button').click(function (event){
        $('#oSpan').stop().hide();
        event.stopPropagation()
        var obj=dataArr[currIndex];

        obj.content=$('#someContent textarea').val();
        obj.time=$('#time').val();
        obj.isTime=true;

        if( obj.time!=''&& obj.content!=''){
            $('#oSpan').stop().fadeIn(300,function (){
                setTimeout(function (){
                    close()
                },1000)
            });
        }else{
            alert('请输入内容')
        }
        obj.isTime=false;

        //更新数据
        dataArr[currIndex]=obj;

        store.set('dataArr',dataArr);
    });

    /*
    * 弄个定时器判断 如果所更新时间小于系统时间就提醒
    *
    * 先判断如果isTime为 true 就跳出
    *
    * 一定要更新数据
    *
    * */

    setInterval(function (){

        store.set('dataArr',dataArr);
        for(var i=0;i<dataArr.length;i++){

             var obj=dataArr[i];

            if(obj==undefined||!obj||obj.isTime){
                continue;
            }

            var NowTime=new Date().getTime();

            var myTime=(new Date(obj.time)).getTime();


            if (NowTime - myTime >= 1&&obj.time!=''&& obj.content!=''){
                $('video').get(0).play();
                obj.isTime = true;
                dataArr[i] = obj;
                store.set('dataArr',dataArr);
            }
        }
    },300)
})