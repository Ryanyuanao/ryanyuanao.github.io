//对象继承
function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

function addClass(obj, cls) {
    var obj_class = obj.className, //获取 class 内容.
            blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
}

function removeClass(obj, cls) {
    var obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' '), //将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
            removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
}
//事件绑定
function addEvent(obj, event, handler) {
    obj.attachEvent ? obj.attachEvent("on" + event, handler) : obj.addEventListener(event, handler, false);
}
/**
 * 设置隐藏显示导航
 * @param {obj} naver 导航事件对像
 * @param {obj} naver_sub 要展开的子导航对像
 * @param {str} type show|hide 默认是显示还是隐藏
 */
function switch_nav(options) {
    options = extend({
        naver: document.getElementById('naver'),
        naver_sub: document.getElementById('naver-sub'),
        type: 'hide'
    }, options);

    if (options.type === 'show') {
        options.naver_sub.style.display = 'block';
        addClass(self, 'active');
    } else {
        options.naver_sub.style.display = 'none';
        removeClass(self, 'active');
    }
    function change_nav(self) {
        var stat = options.naver_sub.style.display;
        if (stat === 'block') {
            removeClass(self, 'active');
            options.naver_sub.style.display = 'none';
        } else {
            addClass(self, 'active');
            options.naver_sub.style.display = 'block';
        }
    }
    if ("ontouchend" in document) { //touch事件
        options.naver.addEventListener('touchstart', function() {
            change_nav(this);
        });
    } else {
        if (window.navigator.msPointerEnabled) { /*Events for IE only*/
            options.naver.addEventListener('MSPointerOver', function() {
                change_nav(this);
            });
        } else {
            addEvent(options.naver, 'click', function() {
                change_nav(this);
            });
        }
    }
}

switch_nav();