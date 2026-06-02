function Appeal(isGovCommit) {
    govClearErrors("#form1");
    var textid = $("#textid").val().replace(/\*/g, " ").replace(/&/g, " ").replace(/`/g, " ").replace(/#/g, " ").replace(/'/g, " ");
    var linkman = $("#linkman").val();
    var textPhone = $("#textPhone").val();
    var verifyCode = $("#verifyCode").val();
    var firstErr = null;
    if ($.trim(textid) == "") { govSetError("#textid", "请输入意见反馈内容"); firstErr = firstErr || "#textid"; }
    if ($.trim(linkman) == "") { govSetError("#linkman", "请输入联系人"); firstErr = firstErr || "#linkman"; }
    if ($.trim(textPhone) == "") { govSetError("#textPhone", "请输入联系电话"); firstErr = firstErr || "#textPhone"; }
    else if (!/^\d{11}$/.test($.trim(textPhone))) { govSetError("#textPhone", "请输入11位手机号码"); firstErr = firstErr || "#textPhone"; }
    var type = 10;  //由后台决定
    if (isGovCommit == 1) {
    	type = 20;  //由后台决定
    }
    if ($.trim(verifyCode) == "") { govSetError("#verifyCode", "请输入验证码"); firstErr = firstErr || "#verifyCode"; }
    if (firstErr) { $(firstErr).focus(); return false; }

    $.ajax({
        url: "index.php?r=Message/leave",
        type: "POST",
        data: "mobile=" + textPhone + "&content=" + textid + "&username=" + linkman + "&type=" + type + "&verifyCode=" + verifyCode,
        dataType: "json",
        success: function (data) {
            var ret = data.ret;
            if (ret == 0) {
                alert("您的信息已提交，谢谢。");
                document.getElementById("textid").value = "";

                document.getElementById("verifyCode").value = "";
                // $("#verifyCodeImg").attr("src", "/index.php?r=message/captcha");
                $("#verifyCodeImg").attr('src', function (){return this.src+'&'});

                if (type == 20) {
                    location.reload();
                }
            }
            else if (ret == "-1") {
            	alert("提交失败，请重新提交。");
               $("#verifyCodeImg").attr('src', function (){return this.src+'&'});
            }
            else if (ret == "-2") {
                alert("请不要重复提交！");
                $("#verifyCodeImg").attr('src', function (){return this.src+'&'});
            } 
            else if (ret == "-3") {               
                alert("验证码错误！");
                 $("#verifyCodeImg").attr('src', function (){return this.src+'&'});
            }else if(data.msg){
                alert(data.msg);               
             }
        },
        error: function (err) {
            alert("提交失败，请重新提交。");
            $("#verifyCodeImg").attr('src', function (){return this.src+'&'});
        }
    });
}



/* ===== 表单校验视觉提示：红色外框 + 文字（提报 / 登录弹窗共用） ===== */
function govClearErrors(formSel) {
    var $form = $(formSel);
    $form.find(".gov-field").removeClass("is-error");
    $form.find(".gov-field__msg").remove();
}
function govSetError(sel, msg) {
    var $f = $(sel).addClass("is-error");
    var $anchor = $f.closest(".gov-captcha");
    if (!$anchor.length) { $anchor = $f; }
    var $next = $anchor.next(".gov-field__msg");
    if ($next.length) { $next.text(msg); }
    else { $('<p class="gov-field__msg"></p>').text(msg).insertAfter($anchor); }
}
/* 用户开始输入即清除该字段的红框与提示 */
$(function () {
    /* jQuery 1.6.1 无 .on()，用 .delegate() 做事件委托 */
    $(document).delegate(".gov-field", "input", function () {
        $(this).removeClass("is-error");
        var $a = $(this).closest(".gov-captcha");
        if (!$a.length) { $a = $(this); }
        $a.next(".gov-field__msg").remove();
    });
});

function PwdCheck() {


   
    govClearErrors("#login-form");
    var pwd = $("#pwd").val();
    var username = $("#userName").val();
    var code = $("#code").val();
    var firstErr = null;
    if ($.trim(username) == "") { govSetError("#userName", "请输入用户名"); firstErr = firstErr || "#userName"; }
    if ($.trim(pwd) == "") { govSetError("#pwd", "请输入密码"); firstErr = firstErr || "#pwd"; }

   /*
    var nopwd = "0";
    if (document.getElementById("nopwd").checked) {

        nopwd = "1";

    }
    */

    var autologin = "0";
    if (document.getElementById("autologin").checked) {

        autologin = "1";

    }
     //SetPwdAndChk();

    var ispwd = GetCookie(username);

    if (ispwd != null && autologin == "1") {
    }
    else {
        if ($.trim(code) == "") { govSetError("#code", "请输入验证码"); firstErr = firstErr || "#code"; }
    }
    if (firstErr) { $(firstErr).focus(); return false; }

    $.ajax({
        url: "/index.php?r=admin/login",
        type: "Post",


        data: $('#login-form').serialize(), // 要提交的表单,必须使用name属性
        //data: "username=" + username + "&password=" + pwd + "&imgAuthenCode=" + code + "&nopwd=" + nopwd + "&rememberMe=" + autologin + "&t=" + Date.parse(new Date()),
        //contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            var ret = data.ret;

            if (ret == "0") {
                var url = "index.php?r=admin/index";

                window.location.href = url;
                

            }
            else if (ret == "3") {
                alert("验证码有误，请检查！");

                // $("#imgAuthenCode").attr("src", "/index.php?r=admin/captcha");
                $("#code").select().focus();
            }
            else {
                alert("登录失败，可能用户名或密码不正确，请重新输入！");

                // $("#imgAuthenCode").attr("src", "/index.php?r=admin/captcha");
                $("#pwd").focus();
                $("#imgAuthenCode").attr('src', function (){return this.src+'&'})
            }


        },
        error: function (err) {
            alert("可能服务器忙，请稍后再试！");
        }
    });
}
function LoginOut() {



    $.ajax({
        url: "WebService.asmx/LoginOut",
        type: "Post",
        data: "{t:'" + Date.parse(new Date()) + "'}",

        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
         
            var url = "default.aspx";
            window.location.href = url;
        },
        error: function (err) {
           
        }
    });
}


//工商所转办处理 0 添加 1 编辑

function AddZhanban(flag, gid, type) {


    var content = $("#content").val().replace(/\*/g, " ").replace(/&/g, " ").replace(/`/g, " ").replace(/#/g, " ").replace(/'/g, " ");
    var billno = "";
    if (type != "service") {
        billno = $("#billno").val();
        if (billno == "") {
            alert("案例编号不能为空！");
            $("#billno").focus();
            return false;
        }

    }




    var logDate = $("#logDate").val();

    if (logDate == "") {
        alert("登记时间不能为空！");
        $("#logDate").focus();
        return false;
    }
    if (content == "") {
        alert("请输入申述内容！");
        $("#content").focus();
        return false;
    }
    if (content == "") {
        alert("请输入意见反馈内容！");
        $("#content").focus();
        return false;
    }
    var username = $("#username").val();
    if (username == "") {
        alert("申述人姓名不能为空！");
        $("#username").focus();
        return false;
    }
    var tel = $("#tel").val();
    if (tel == "") {
        alert("联系电话不能为空！");
        $("#tel").focus();
        return false;
    }
    if (tel.length != 11) {
        alert("手机号必须是11位数！");
        $("#tel").focus();
        return false;
    }

    var replycontent = $("#replycontent").val();
    if (replycontent == "") {
        alert("反馈内容不能为空！");
        $("#replycontent").focus();
        return false;
    }
    var IsDispose ="0";



    var DisposeDate = $("#DisposeDate").val();
    if (DisposeDate == "") {
        alert("处理时间不能为空！");
        $("#DisposeDate").focus();
        return false;
    }


    $.ajax({
        url: "WebService.asmx/AddWeiQuanInfo",
        type: "Post",
        data: "{billno:'" + billno + "',username:'" + username + "',tel:'" + tel + "',content:'" + content + "',replycontent:'" + replycontent + "',flag:'" + flag + "',gid:'" + gid + "',IsDispose:'" + IsDispose + "',type:'" + type + "',logDate:'" + logDate + "',DisposeDate:'" + DisposeDate + "'}",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            var rel = data.d;
            if (rel == "-2") {
                alert("-2");
            }
            if (rel > 0) {
                $("#divInvoiceType").fadeOut("slow"); ////hide();
                $("#greybackground").remove();
                alert("保存成功！");
            }
            else {
                $("#divInvoiceType").fadeOut("slow"); ////hide();
                $("#greybackground").remove();
                alert("编辑成功！");
            }
        },
        error: function (err) {
            alert("提交失败！");
        }
    });
}

function AddRecord()
{
	var title = $("#ar_title").val();
    if (title == "") {
        alert("标题不能为空！");
        $("#ar_title").focus();
        return false;
    } 
    var content = $("#ar_content").val().replace(/\*/g, " ").replace(/&/g, " ").replace(/`/g, " ").replace(/#/g, " ").replace(/'/g, " ");
    if (content == "") {
        alert("内容不能为空！");
        $("#ar_content").focus();
        return false;
    }
    var type = $("#ar_type").val();
    if (type == "") {
    	type = 1;
    } 
    
    $.ajax({
        url: "index.php?r=admin/addRecord",
        type: "Post",
        data: "title=" + title + "&content=" + content + "&type=" + type,
        dataType: "json",
        success: function (data) {
            var ret = data.ret;
            if (ret == 0) {
            	$("#addRecord").dialog("close");
                alert("保存成功！");
                location.reload();
            } else {
                alert("保存失败，请重试！");
            }
        },
        error: function (err) {
            alert("提交失败！");
        }
    });
}

function detail(gid, type, flag) {
    $.ajax({
        url: "WebService.asmx/GetWeiquanDetail",
        type: "Post",
        data: "{gid:'" + gid + "',type:'" + type + "',flag:'" + flag + "'}",

        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            var rel = data.d;
            $("#InvoiceType").html(rel);
            $("#divInvoiceType").show();
            var docheight = $(document).height();
            //追加一个层，使背景变灰
            $("body").append("<div id='greybackground'></div>");
            $("#greybackground").css({ "opacity": "0.5", "height": docheight });
            return false;
        },
        error: function (err) {
            alert("可能服务器忙，请稍后再试！"+err);
        }
    });
}

function ManageUser(gid, type, flag) {



    $.ajax({




        url: "WebService.asmx/ManageUser",
        type: "Post",
        data: "{gid:'" + gid + "',type:'" + type + "',flag:'" + flag + "'}",

        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            var rel = data.d;
            $("#InvoiceType").html(rel);
            $("#divInvoiceType").show();
            var docheight = $(document).height();
            //追加一个层，使背景变灰
            $("body").append("<div id='greybackground'></div>");
            $("#greybackground").css({ "opacity": "0.5", "height": docheight });
            return false;
        },
        error: function (err) {
            alert("可能服务器忙，请稍后再试！" + err);
        }
    });
}

function alterPassword()
{
	var oldPwd = $("#oldPassword").val();
	var pwd = $("#password1").val();
    var pwdtwo = $("#password2").val();

    if (oldPwd == "") {
        alert("旧密码不能为空");
        $("#oldPassword").focus();
        return false;

    }
    if (pwd == "") {
        alert("密码不能为空");
        $("#password1").focus();
        return false;

    }
    if (pwdtwo == "") {
        alert("确认密码不能为空");
        $("#password2").focus();
        return false;
    }
    if (pwd.length < 6) {
        alert("您输入的密码长度不够(不能小于6位)，请重新输入");
        $("#password1").focus();
        return false;
    }

    if (pwd != pwdtwo) {
        alert("两次输入的密码不一致");
        $("#password1").focus();
        return false;
    }



    $.ajax({
        url: "/index.php?r=admin/alterPassword",
        type: "Post",
        //data: "{account:'" + account + "',pwd:'" + hex_md5(pwd) + "',tel:'" + tel + "',content:'" + content + "',username:'" + username + "',type:'" + type + "'}",
        data: $('#password-form').serialize(), // 要提交的表单,必须使用name属性
        //contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            var ret = data.ret;
            if (ret == "1") {
            	alert("旧密码输入有错误，请重新输入");
            	return false;
            } else if (ret == "-1") {
                alert("该账号已经存在，请选择其他账号！");
                return false;
            } else if (ret == "-2") {
                alert("密码修改失败，请重试！\n错误提示：" + data.msg);
                return false;
            } else if (ret == "0") {
                alert("密码修改成功，请重新登录！");
                window.location.href = '/';
            } else {
            	alert("请重试！");
            }

        },
        error: function (err) {
            alert("提交失败！");
        }
    });
 }


function AddUser() {
    var account, tel;
    account = $("#account").val();

        if (account == "") {
            alert("登录账号不能为空");
            $("#account").focus();
            return false;
        }

        tel = $("#tel").val();
        role = $("#role").val();
   
        var pwd = $("#pwd").val();
        var pwdtwo = $("#pwdtwo").val();

        if (pwd == "") {
            alert("密码不能为空");
            $("#pwd").focus();
            return false;

        }
        if (pwdtwo == "") {
            alert("确认密码不能为空");
            $("#pwdtwo").focus();
            return false;
        }
        if (pwd.length < 6) {
            alert("密码长度不能小于6位");
            $("#pwd").focus();
            return false;
        }

        if (pwd != pwdtwo) {
            alert("两次密码输入不一致，请检查！");
            $("#pwd").focus();
            return false;
        }

        $.ajax({
            url: "/index.php?r=admin/addUser",
            type: "Post",
            data: "account=" + account + "&pwd=" + pwd + "&tel=" + tel + "&role=" + role,
            dataType: "json",
            success: function (data) {
                var ret = data.ret;
                if (ret == 0) {
                    $("#divInvoiceType").fadeOut("slow"); ////hide();
                    $("#greybackground").remove();
                    alert("保存成功！");
                    location.reload();
                } else {
                	alert("账号添加失败，请重试！\n错误提示：" + data.msg);
                    return false;
                }

            },
            error: function (err) {
                alert("提交失败！");
            }
        });
}

//md5加密算法
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_md5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }
function b64_md5(s) { return binl2b64(core_md5(str2binl(s), s.length * chrsz)); }
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function calcMD5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
           hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
                | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
                | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}





