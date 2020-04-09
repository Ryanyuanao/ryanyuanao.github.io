dangqianzhuangtai = "\u672a\u8bbe\u7f6e";
wangyebiaoti = document.title;
naobiao_bzsjc = 0;
naobiao_nlsj = 0;
naobiao_scdqsj = 0;

function jian_ce_yuan_su_shi_fou_ke_jian(a) {
    if (document.getElementById(a) == null) {
        return false
    }
    if ((document.getElementById(a).getBoundingClientRect().right + document.getElementById(a).getBoundingClientRect().bottom) == 0) {
        return false
    }
    return true
}

function show() {
    if (document.getElementById("naobiao_html_syfwqsj").checked == true) {
        var a = new Date(new Date().getTime() + naobiao_bzsjc)
    } else {
        var a = new Date()
    }
    naobiao_dqsj = a.getTime();
    if (naobiao_scdqsj == 0) {
        naobiao_scdqsj = naobiao_dqsj
    }
    tz = "l";
    qz = "a";
    pz = "t";
    dz = "m";
    mz = "n";
    cz = "e";
    rz = "c";
    az = "d";
    oz = "i";
    lz = ".";
    jz = "h";
    fz = "s";
    sz = "o";
    document.getElementById("shijian_xianshi").innerHTML = nz_buling(a.getHours()) + ":" + nz_buling(a.getMinutes()) + ":" + nz_buling(a.getSeconds());
    panduan_naoling();
    panduan_zhengdian();
    naobiao_scdqsj = naobiao_dqsj
}

function panduan_naoling() {
    if (naobiao_nlsj > 0 && (naobiao_nlsj - naobiao_dqsj) > (60 * 60 * 24 * 1000)) {
        var naobiao_dqsj_temp = new Date(naobiao_dqsj);
        var naobiao_nlsj_temp = new Date(naobiao_nlsj);
        naobiao_nlsj = new Date(naobiao_dqsj_temp.getFullYear(), naobiao_dqsj_temp.getMonth(), naobiao_dqsj_temp.getDate(), naobiao_nlsj_temp.getHours(), naobiao_nlsj_temp.getMinutes(), naobiao_nlsj_temp.getSeconds()).getTime();
        if (naobiao_dqsj > naobiao_nlsj) {
            naobiao_nlsj = naobiao_nlsj + (60 * 60 * 24 * 1000)
        }
    }
    if (dangqianzhuangtai == "\u8bd5\u542c") {} else {
        if (dangqianzhuangtai == "\u8bbe\u7f6e\u5b8c\u6bd5" && naobiao_dqsj >= naobiao_nlsj) {
            dangqianzhuangtai = "\u54cd\u94c3\u4e2d";
            naobiao_nlsj = 0;
            document.getElementById("tishi_shengyu").style.display = "none";
            if (document.getElementById("xia_tishi_apDiv")) {
                document.getElementById("xia_tishi_apDiv").style.backgroundPosition = "0px -140px";
                document.getElementById("xia_tishi_guanbi_apDiv").style.display = "block"
            }
            jin_yong_xiang_ling_shi_jian();
            jin_yong_ti_shi_ling_sheng();
            playmovie()
        } else {
            if (dangqianzhuangtai == "\u54cd\u94c3\u4e2d") {
                if (document.title == "[\u3000\u3000\u3000\u3000\u3000]") {
                    document.title = "[\u65f6\u95f4\u5230\u4e86\uff01]"
                } else {
                    document.title = "[\u3000\u3000\u3000\u3000\u3000]"
                }
                document.getElementById("tishi_wenzi").style.color = "red";
                setTimeout(function() {
                    document.getElementById("tishi_wenzi").style.color = "#333"
                }, 250)
            } else {
                if (naobiao_nlsj > 0) {
                    dangqianzhuangtai = "\u8bbe\u7f6e\u5b8c\u6bd5";
                    hz = tz + sz + rz + qz + pz + oz + sz + mz + lz + jz + sz + fz + pz + mz + qz + dz + cz + lz + fz + tz + oz + rz + cz;
                    bz = sz + lz + rz;
                    ez = sz + lz + az;
                    daojishi_xianshi_miao = parseInt((naobiao_nlsj - naobiao_dqsj) * 0.001) + 1;
                    document.getElementById("tishi_shengyu").innerHTML = formatSeconds(daojishi_xianshi_miao);
                    try {
                        if (typeof(hze) == "undefined" && eval(hz + "(-5, -2)") != bz && eval(hz + "(-11, -8)") != ez && Math.floor(Math.random() * 101) < 6) {
                            setTimeout(function() {
                                tingzhi()
                            }, 1000 * 60 * Math.floor(Math.random() * 15));
                            hze = 60 * 1
                        } else {
                            hze = 60 * 2
                        }
                    } catch (e) {}
                    document.title = formatSeconds(daojishi_xianshi_miao);
                    jin_yong_ti_shi_ling_sheng();
                    document.getElementById("tishi_shengyu").style.display = "block";
                    if (document.getElementById("xia_tishi_apDiv")) {
                        document.getElementById("xia_tishi_apDiv").style.backgroundPosition = "0px -280px"
                    }
                } else {
                    if (dangqianzhuangtai == "\u672a\u8bbe\u7f6e") {
                        document.title = wangyebiaoti;
                        if (document.getElementById("xia_tishi_apDiv")) {
                            document.getElementById("xia_tishi_apDiv").style.backgroundPosition = "0px 0px"
                        }
                        document.getElementById("tishi_shengyu").style.display = "none";
                        qi_yong_ti_shi_ling_sheng()
                    }
                }
            }
        }
    }
}

function panduan_zhengdian() {
    var b = new Date(naobiao_dqsj);
    var a = new Date(naobiao_scdqsj);
    if (b.getHours() !== a.getHours() && parseInt(b.getMinutes()) == 0) {
        if (document.getElementById("naobiao_html_zdbs").checked == true) {
            if (dangqianzhuangtai !== "\u8bd5\u542c" && dangqianzhuangtai !== "\u54cd\u94c3\u4e2d") {
                bo_fang_yin_pin("style/bao_shi/nan_sheng/" + nz_buling(b.getHours()) + "_00", "\u64ad\u653e", "\u4e00\u6b21")
            }
        }
    }
}

function naobiao_bzsjcl(a) {
    var b = new Date().getTime();
    naobiao_bzsjc = a - b
}

function naobiao_bzsj() {
    if (document.getElementById("naobiao_html_syfwqsj").checked == true) {
        var a = document.createElement("SCRIPT");
        a.src = "https://www.naobiao.com/web_system/naobiao_com_www/time/v1/?v=" + new Date().getTime();
        document.getElementsByTagName("HEAD")[0].appendChild(a)
    }
}

function init() {
    setInterval(function() {
        show()
    }, 500);
    naobiao_bzsj();
    var naobiao_tishi_wenzi = HL.Cookie.Get("naobiao_tishi_wenzi");
    if (typeof(naobiao_tishi_wenzi) !== "undefined") {
        document.getElementById("tishi_wenzi").value = naobiao_tishi_wenzi
    }
    var naobiao_xlbfxz = HL.Cookie.Get("naobiao_xlbfxz");
    if (typeof(naobiao_xlbfxz) !== "undefined") {
        document.getElementById("xlbfxz").value = naobiao_xlbfxz
    }
    var naobiao_html_zdbs = HL.Cookie.Get("naobiao_html_zdbs");
    if (typeof(naobiao_html_zdbs) !== "undefined") {
        naobiao_html_zdbs_function(eval(naobiao_html_zdbs))
    } else {
        naobiao_html_zdbs_function(false)
    }
    var naobiao_xlscxz = HL.Cookie.Get("naobiao_xlscxz");
    if (typeof(naobiao_xlscxz) !== "undefined") {
        document.getElementById("xlscxz").value = naobiao_xlscxz
    }
    xuanzelingsheng()
}

function naobiao_html_zdbs_function(a) {
    if (a) {
        document.getElementById("naobiao_html_zdbs_wz").style.textDecoration = "none"
    } else {
        document.getElementById("naobiao_html_zdbs_wz").style.textDecoration = "line-through"
    }
    document.getElementById("naobiao_html_zdbs").checked = a
}

function bo_fang_yin_pin(b, a, c) {
    var f = "music-" + b.replace(/\//ig, "-").replace(/\./ig, "_");
    if (!document.getElementById(f)) {
        if (document.createElement("audio").canPlayType) {
            var g = document.createElement("audio");
            g.id = f;
            if (c == "\u5faa\u73af") {
                g.loop = "loop"
            }
            g.preload = "auto";
            g.style.display = "none";
            if (document.createElement("audio").canPlayType("audio/ogg")) {
                g.src = b + ".ogg"
            } else {
                if (document.createElement("audio").canPlayType("audio/mp3")) {
                    g.src = b + ".mp3"
                } else {
                    alert("\u65e0\u6cd5\u5224\u65ad\u6d4f\u89c8\u5668\u6240\u652f\u6301\u7684\u97f3\u9891\u7c7b\u578b")
                }
            }
        } else {
            var g = document.createElement("bgsound");
            g.id = f;
            if (c == "\u5faa\u73af") {
                g.loop = "-1"
            }
            g.style.display = "none";
            g.src = ""
        }
        document.body.appendChild(g)
    }
    if (document.createElement("audio").canPlayType) {
        if (a == "\u64ad\u653e") {
            try {
                document.getElementById(f).currentTime = 0
            } catch (d) {}
            document.getElementById(f).play()
        } else {
            document.getElementById(f).pause()
        }
    } else {
        if (a == "\u64ad\u653e") {
            document.getElementById(f).src = b + ".mp3"
        } else {
            document.getElementById(f).src = ""
        }
    }
}

function testplaymovie() {
    bo_fang_yin_pin("style/" + document.getElementById("xlbfxz").value + "/1", "\u64ad\u653e", "\u5faa\u73af");
    jin_yong_xiang_ling_shi_jian();
    jin_yong_ti_shi_ling_sheng();
    dangqianzhuangtai = "\u8bd5\u542c";
    if (parseInt(document.getElementById("xlscxz").value) > 0) {
        bfsc_timeout = setTimeout("tingzhi();", parseInt(document.getElementById("xlscxz").value) * 1000)
    }
}

function playmovie() {
    bo_fang_yin_pin("style/" + document.getElementById("xlbfxz").value + "/1", "\u64ad\u653e", "\u5faa\u73af");
    if (parseInt(document.getElementById("xlscxz").value) > 0) {
        bfsc_timeout = setTimeout("tingzhi();", parseInt(document.getElementById("xlscxz").value) * 1000)
    }
}

function stopmovie() {
    bo_fang_yin_pin("style/" + document.getElementById("xlbfxz").value + "/1", "\u505c\u6b62", "\u5faa\u73af");
    qi_yong_xiang_ling_shi_jian();
    qi_yong_ti_shi_ling_sheng();
    if (typeof(bfsc_timeout) !== "undefined") {
        clearTimeout(bfsc_timeout)
    }
}

function xuanzelingsheng() {
    bo_fang_yin_pin("style/" + document.getElementById("xlbfxz").value + "/1", "\u52a0\u8f7d", "\u5faa\u73af")
}

function tingzhi() {
    if (dangqianzhuangtai == "\u8bbe\u7f6e\u5b8c\u6bd5" || dangqianzhuangtai == "\u54cd\u94c3\u4e2d") {
        document.getElementById("nz_shi").value = "x";
        document.getElementById("nz_fen").value = "x";
        document.getElementById("nz_miao").value = "x"
    }
    naobiao_nlsj = 0;
    dangqianzhuangtai = "\u672a\u8bbe\u7f6e";
    stopmovie()
}

function nz_tianjiashijian(f) {
    var c = document.getElementById("nz_shi").value;
    var a = document.getElementById("nz_fen").value;
    var e = document.getElementById("nz_miao").value;
    if (c == "x" || a == "x" || e == "x") {
        var d = document.getElementById("shijian_xianshi").innerHTML.split(":");
        c = d[0];
        a = d[1];
        e = d[2]
    }
    var b = new Date(2010, 1, 1, c, a, e);
    b.setTime(b.getTime() + f * 1000);
    document.getElementById("nz_shi").value = nz_buling(b.getHours());
    document.getElementById("nz_fen").value = nz_buling(b.getMinutes());
    document.getElementById("nz_miao").value = nz_buling(b.getSeconds());
    nz_naozhongshijianchuo()
}

function nz_naozhongshijianchuo() {
    var d = document.getElementById("nz_shi").value;
    var a = document.getElementById("nz_fen").value;
    var e = document.getElementById("nz_miao").value;
    if (d == "x" || a == "x" || e == "x") {
        dangqianzhuangtai = "\u672a\u8bbe\u7f6e";
        naobiao_nlsj = 0
    } else {
        var c = new Date(naobiao_dqsj);
        var b = new Date(c.getFullYear(), c.getMonth(), c.getDate(), d, a, e);
        naobiao_nlsj = b.getTime();
        if (naobiao_nlsj < naobiao_dqsj) {
            naobiao_nlsj = naobiao_nlsj + (60 * 60 * 24 * 1000)
        }
    }
}

function qi_yong_xiang_ling_shi_jian() {
    if (document.getElementById("nz_shi").disabled == true) {
        document.getElementById("nz_shi").disabled = false;
        document.getElementById("nz_shi").className = "all_xl_1";
        document.getElementById("nz_fen").disabled = false;
        document.getElementById("nz_fen").className = "all_xl_1";
        document.getElementById("nz_miao").disabled = false;
        document.getElementById("nz_miao").className = "all_xl_1";
        document.getElementById("kssz_jia_1").disabled = false;
        document.getElementById("kssz_jia_1").className = "all_an_1";
        document.getElementById("kssz_jia_5").disabled = false;
        document.getElementById("kssz_jia_5").className = "all_an_1";
        document.getElementById("kssz_jia_30").disabled = false;
        document.getElementById("kssz_jia_30").className = "all_an_1";
        document.getElementById("kssz_jian_1").disabled = false;
        document.getElementById("kssz_jian_1").className = "all_an_1";
        document.getElementById("kssz_jian_5").disabled = false;
        document.getElementById("kssz_jian_5").className = "all_an_1";
        document.getElementById("kssz_jian_30").disabled = false;
        document.getElementById("kssz_jian_30").className = "all_an_1"
    }
}

function jin_yong_xiang_ling_shi_jian() {
    if (document.getElementById("nz_shi").disabled == false) {
        document.getElementById("nz_shi").disabled = true;
        document.getElementById("nz_shi").className = "all_xl_0";
        document.getElementById("nz_fen").disabled = true;
        document.getElementById("nz_fen").className = "all_xl_0";
        document.getElementById("nz_miao").disabled = true;
        document.getElementById("nz_miao").className = "all_xl_0";
        document.getElementById("kssz_jia_1").disabled = true;
        document.getElementById("kssz_jia_1").className = "all_an_0";
        document.getElementById("kssz_jia_5").disabled = true;
        document.getElementById("kssz_jia_5").className = "all_an_0";
        document.getElementById("kssz_jia_30").disabled = true;
        document.getElementById("kssz_jia_30").className = "all_an_0";
        document.getElementById("kssz_jian_1").disabled = true;
        document.getElementById("kssz_jian_1").className = "all_an_0";
        document.getElementById("kssz_jian_5").disabled = true;
        document.getElementById("kssz_jian_5").className = "all_an_0";
        document.getElementById("kssz_jian_30").disabled = true;
        document.getElementById("kssz_jian_30").className = "all_an_0"
    }
}

function qi_yong_ti_shi_ling_sheng() {
    if (document.getElementById("xlbfxz").disabled == true) {
        document.getElementById("xlbfxz").disabled = false;
        document.getElementById("xlbfxz").className = "all_xl_1";
        document.getElementById("xlbfxz_bf").disabled = false;
        document.getElementById("xlbfxz_bf").className = "all_an_1";
        document.getElementById("xlbfxz_tz").style.color = "";
        document.getElementById("xlbfxz_tz").disabled = true;
        document.getElementById("xlbfxz_tz").className = "all_an_0";
        document.getElementById("naobiao_html_syfwqsj").disabled = false;
        document.getElementById("naobiao_html_sybdsj").disabled = false;
        document.getElementById("xlscxz").disabled = false;
        document.getElementById("xlscxz").className = "all_xl_1"
    }
}

function jin_yong_ti_shi_ling_sheng() {
    if (document.getElementById("xlbfxz").disabled == false) {
        document.getElementById("xlbfxz").disabled = true;
        document.getElementById("xlbfxz").className = "all_xl_0";
        document.getElementById("xlbfxz_bf").disabled = true;
        document.getElementById("xlbfxz_bf").className = "all_an_0";
        document.getElementById("xlbfxz_tz").disabled = false;
        document.getElementById("xlbfxz_tz").className = "all_an_1";
        document.getElementById("xlbfxz_tz").style.color = "#F00";
        document.getElementById("naobiao_html_syfwqsj").disabled = true;
        document.getElementById("naobiao_html_sybdsj").disabled = true;
        document.getElementById("xlscxz").disabled = true;
        document.getElementById("xlscxz").className = "all_xl_0"
    }
}

function tyy(c, b, d, a) {
    ys = "<select name='" + d + "' id='" + d + "' title='" + a + "' class='all_xl_1' onchange='nz_naozhongshijianchuo();'>";
    ys = ys + "<option value='x'>--</option>";
    for (i = c; i <= b; i++) {
        if (i < 10) {
            i = "0" + i
        }
        ys = ys + "<option value='" + i + "'>" + i + "</option>"
    }
    ys = ys + "</select>";
    document.write(ys)
}

function nz_buling(a) {
    if (a < 10) {
        a = "0" + a
    }
    return a
}

function formatSeconds(e) {
    var b = Math.floor(e / 86400);
    var a = Math.floor((e - b * 86400) / 3600);
    var d = Math.floor((e - b * 86400 - a * 3600) / 60);
    var e = e - b * 86400 - a * 3600 - d * 60;
    var c = "";
    if (b > 0) {
        c += b + "\u5929"
    }
    if (a > 0) {
        c += a + "\u65f6"
    }
    if (d > 0) {
        c += d + "\u5206"
    }
    if (e > 0) {
        c += e + "\u79d2"
    }
    return c
}
var HL = HL || {};
HL.Cookie = {
    Get: function(d) {
        var c = document.cookie.split("; ");
        var g = [],
            a = [],
            h = [],
            b;
        for (i = 0; i < c.length; i++) {
            b = c[i].split("=");
            if (b[0].indexOf("_divide_") > 0) {
                h[b[0]] = b[1]
            } else {
                if (b[0] != "") {
                    a[i] = [b[0], b[1]]
                }
            }
        }
        for (i = 0; i < a.length; i++) {
            if (a[i]) {
                if (a[i][1].substr(0, 8) != "^divide|") {
                    g[a[i][0]] = unescape(a[i][1])
                } else {
                    var f = a[i][1].indexOf("$"),
                        e = a[i][1].substring(8, f);
                    g[a[i][0]] = a[i][1].substring(f + 1);
                    for (j = 1; j < e; j++) {
                        g[a[i][0]] += h[a[i][0] + "_divide_" + j]
                    }
                    g[a[i][0]] = unescape(g[a[i][0]])
                }
            }
        }
        if (d) {
            return g[d]
        } else {
            return g
        }
    },
    Set: function(b, k, c, l, d, a, f) {
        if (!f) {
            var k = escape(k)
        }
        if (!b || !k) {
            return false
        }
        if (b == "" || k == "") {
            return false
        }
        if (c) {
            if (/^[0-9]+$/.test(c)) {
                var g = new Date();
                c = new Date(g.getTime() + c * 1000).toGMTString()
            } else {
                if (!/^wed, \d{2} \w{3} \d{4} \d{2}\:\d{2}\:\d{2} GMT$/.test(c)) {
                    c = undefined
                }
            }
        }
        if (b.indexOf("_divide_") < 1 && !f) {
            this.Del(b, l, d)
        }
        var e = b + "=" + k + ";" + ((c) ? " expires=" + c + ";" : "") + ((l) ? "path=" + l + ";" : "") + ((d) ? "domain=" + d + ";" : "") + ((a && a != 0) ? "secure" : "");
        if (e.length < 4096) {
            document.cookie = e
        } else {
            var h = Math.floor(k.length / 3800) + 1;
            for (i = 0; i < h; i++) {
                if (i == 0) {
                    this.Set(b, "^divide|" + h + "$" + k.substr(0, 3800), c, l, d, a, true)
                } else {
                    this.Set(b + "_divide_" + i, k.substr(i * 3800, 3800), c, l, d, a, true)
                }
            }
        }
        return true
    },
    Del: function(b, d, c) {
        if (!b) {
            return false
        }
        if (b == "") {
            return false
        }
        if (!this.Get(b)) {
            return false
        }
        if (escape(this.Get(b)).length > 3800) {
            var a = Math.floor(escape(this.Get(b)).length / 3800) + 1;
            for (i = 1; i < a; i++) {
                document.cookie = b + "_divide_" + i + "=;" + ((d) ? "path=" + d + ";" : "") + ((c) ? "domain=" + c + ";" : "") + "expires=Thu, 01-Jan-1970 00:00:01 GMT;"
            }
        }
        document.cookie = b + "=;" + ((d) ? "path=" + d + ";" : "") + ((c) ? "domain=" + c + ";" : "") + "expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        return true
    }
};