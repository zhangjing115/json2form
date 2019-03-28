
var fillForm = function ($form, json) {
    var jsonObj = json;
    if (typeof json === 'string') {
        jsonObj = $.parseJSON(json);
    }

    for (var key in jsonObj) {  //遍历json字符串
        var objtype = jsonObjType(jsonObj[key]); // 获取值类型

         if (objtype === "array") { //如果是数组，一般都是数据库中多对多关系

            var obj1 = jsonObj[key];
            for (var arraykey in obj1) {
                //alert(arraykey + jsonObj[arraykey]);
                var arrayobj = obj1[arraykey];
                for (var smallkey in arrayobj) {
                    setCkb(key, arrayobj[smallkey]);
                    break;
                }
            }
        } else if (objtype === "object") { //如果是对象，啥都不错，大多数情况下，会有 xxxId 这样的字段作为外键表的id

        } else if (objtype === "string") { //如果是字符串
            var str = jsonObj[key];
            var date = new Date(str);
            if (date.getDay()) {  //这种判断日期是本人懒，不想写代码了，大家慎用。
                $("[name=" + key + "]", $form).val(date);
                continue;
            }

            var tagobjs = $("[name=" + key + "]", $form);
            if ($(tagobjs[0]).attr("type") == "radio") {//如果是radio控件 
                $.each(tagobjs, function (keyobj,value) {
                    if ($(value).attr("val") == jsonObj[key]) {
                        value.checked = true;
                    }
                });
                continue;
            }
            
            $("[name=" + key + "]", $form).val(jsonObj[key]);
            
        }else if(objtype==="boolean"){
            $("[name=" + key + "][val=" +jsonObj[key] + "]").attr("checked", "checked");
        } else { //其他的直接赋值
            $("[name=" + key + "]", $form).val(jsonObj[key]);
        }

    }
}

var setCkb = function (name, value) {
    //alert(name + " " + value);
    //$("[name=" + name + "][value=" + value + "]").attr("checked", "checked");  不知为何找不到具体标签;
    $("[name=" + name + "][val=" + value + "]").attr("checked", "checked");
}
var fillckb = function (name, json) {
    var jsonObj = json;
    if (typeof json === 'string') {
        jsonObj = $.parseJSON(json);
    }
    var str = jsonObj[name];
    if (typeof str === "string") {
        var array = str.split(",");
        $.each(array, function (key, value) {
            setCkb(name, value);
        });
    }
}
var jsonObjType = function (obj) {
    if (typeof obj === "object") {
        var teststr = JSON.stringify(obj);
        if (teststr[0] == '{' && teststr[teststr.length - 1] == '}') return "class";
        if (teststr[0] == '[' && teststr[teststr.length - 1] == ']') return "array";
    }
    return typeof obj;
}

/**
 * 获取时间 格式为：format
 * format 参数为时间格式
 * 注：若方法返回的值是一个两位的数字。但是，返回值不总是两位的，如果该值小于 10，则仅返回一位数字。
 */
function  getLocaleDateTime(format){
    var date = new Date();
    var getyear = date.getFullYear();//返回一个表示年份的 4 位数字。
    var getmonth = date.getMonth()+1;//返回表示月份的数字，返回值是 0（一月） 到 11（十二月） 之间的一个整数。
    var getday = date.getDate();//返回月份的某一天，返回值是 1 ~ 31 之间的一个整数。
    var gethour = date.getHours();//返回值是 0 （午夜） 到 23 （晚上 11 点）之间的一个整数。
    var getminute = date.getMinutes();//返回值是 0 ~ 59 之间的一个整数。
    var getsecond = date.getSeconds();//返回值是 0 ~ 59 之间的一个整数。
    //不过返回值不总是两位的，如果返回的值小于 10，则仅返回一位数字。故进行加“0”操作。
    var getMonth = changeTime(getmonth);
    var getDay =  changeTime(getday);
    var getMinute =  changeTime(getminute);
    var getSecond =  changeTime(getsecond);
    var gethours;
    if(gethour>12){
        gethours = "下午" + (gethour-12).toString();//changeTime(gethour-12)
    } else {
        gethours = "上午" + gethour.toString();//changeTime(gethour)
    }
    switch (format){
        case "yyyy-MM-dd HH:mm:ss" : return getyear + "-" + getMonth + "-" + getDay + " " + gethour + ":" + getMinute + ":" + getSecond; break;
        case "yyyy-MM-dd HH:m:s" : return getyear + "-" + getMonth + "-" + getDay + " " + gethour + ":" + getminute + ":" + getsecond; break;
        case "yyyy-MM-dd hh:mm:ss" : return getyear + "-" + getMonth + "-" + getDay + " " + gethours + ":" + getMinute + ":" + getSecond; break;
        case "yyyy-MM-dd hh:m:s" : return getyear + "-" + getMonth + "-" + getDay + " " + gethours + ":" + getminute + ":" + getsecond; break;
        case "yyyy-M-d HH:mm:ss" : return getyear + "-" + getmonth + "-" + getday + " " + gethour + ":" + getMinute + ":" + getSecond; break;
        case "yyyy-M-d HH:m:s" : return getyear + "-" + getmonth + "-" + getday + " " + gethour + ":" + getminute + ":" + getsecond; break;
        case "yyyy-M-d hh:mm:ss" : return getyear + "-" + getmonth + "-" + getday + " " + gethours + ":" + getMinute + ":" + getSecond; break;
        case "yyyy-M-d hh:m:s" : return getyear + "-" + getmonth + "-" + getday + " " + gethours + ":" + getminute + ":" + getsecond; break;
        case "yyyy/MM/dd HH:mm:ss" : return getyear + "/" + getMonth + "/" + getDay + " " + gethour + ":" + getMinute + ":" + getSecond; break;
        case "yyyy/MM/dd HH:m:s" : return getyear + "/" + getMonth + "/" + getDay + " " + gethour + ":" + getminute + ":" + getsecond; break;
        case "yyyy/MM/dd hh:mm:ss" : return getyear + "/" + getMonth + "/" + getDay + " " + gethours + ":" + getMinute + ":" + getSecond; break;
        case "yyyy/MM/dd hh:m:s" : return getyear + "/" + getMonth + "/" + getDay + " " + gethours + ":" + getminute + ":" + getsecond; break;
        case "yyyy/M/d HH:mm:ss" : return getyear + "/" + getmonth + "/" + getday + " " + gethour + ":" + getMinute + ":" + getSecond; break;
        case "yyyy/M/d HH:m:s" : return getyear + "/" + getmonth + "/" + getday + " " + gethour + ":" + getminute + ":" + getsecond; break;
        case "yyyy/M/d hh:mm:ss" : return getyear + "/" + getmonth + "/" + getday + " " + gethours + ":" + getMinute + ":" + getSecond; break;
        case "yyyy/M/d hh:m:s" : return getyear + "/" + getmonth + "/" + getday + " " + gethours + ":" + getminute + ":" + getsecond; break;
        case "yyyy/MM/dd": return getyear + "/" + getMonth + "/" + getDay; break;
        case "yyyy/M/d": return getyear + "/" + getmonth + "/" + getday ; break;
        case "yyyy-MM-dd": return getyear + "-" + getMonth + "-" + getDay; break;
        case "yyyy-M-d": return getyear + "-" + getmonth + "-" + getday; break;
    }
}

/**
* 判断是否需要在时间前面加“0”
* @param time：需要处理的时间数字
* @returns {*}
*/
function  changeTime(time) {
   if(time<10){
        time = "0" + time;
   }
      return  time ;
}
// --------------------- 
// 作者：monkeyfly007 
// 来源：CSDN 
// 原文：https://blog.csdn.net/tel13259437538/article/details/80659104 
