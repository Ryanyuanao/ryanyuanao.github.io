$(document).ready(function() {
    // 初始化表格
    initTable();
});

// 表格初始化
function initTable() {
    $('#eventTable').bootstrapTable({
        method: 'post', // 向服务器请求方式
        contentType: "application/x-www-form-urlencoded", // 如果是post必须定义
        url: 'qqmusic/soso', // 请求url
        cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true, // 隔行变色
        dataType: "json", // 数据类型
        pagination: true, // 是否启用分页
        classes: 'table table-bordered', // Class样式
        silent: true, // 必须设置刷新事件
        toolbar: '#toolbar', // 工具栏ID
        toolbarAlign: 'right', // 工具栏对齐方式
        queryParams: queryParams, // 请求参数，这个关系到后续用到的异步刷新
        columns: [{
            field: 'name',
            title: '歌名',
            align: 'center'
        }, {
            field: 'singer',
            title: '歌手',
            align: 'center'
        }, {
            field: 'album',
            title: '专辑',
            align: 'center'
        },{
            field: 'MP3',
            title: '普通音质',
            align: 'center',
            width: '80px',
            formatter: function(value, row, index) {
                return "<a href='"+value+"'  target='_blank'>直达</a>";
            }
        },{
            field: 'HD',
            title: '高品质',
            align: 'center',
            width: '80px',
            formatter: function(value, row, index) {
                return "<a href='"+value+"'  target='_blank'>直达</a>";
            }
        },{
            field: 'FALC',
            title: 'FALC无损',
            align: 'center',
            width: '80px',
            formatter: function(value, row, index) {
                return "<a href='"+value+"'  target='_blank'>直达</a>";
            }
        }
        ],
    });
}

// 分页查询参数，是以键值对的形式设置的
function queryParams(params) {
    return {
        name: document.getElementById("name").value // 请求时向服务端传递的参数
    }
}

// 搜索按钮触发事件
$(function() {
    $("#eventquery").click(function() {
        $('#eventTable').bootstrapTable(('refresh')); // 很重要的一步，刷新url！
    });
});

$('#name').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        $('#eventquery').click();
    }
});