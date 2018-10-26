import { toQueryString } from './serializer';

export {} // to make it a module

declare global { // to access the global type String
  interface String {
    /**
     * 资源位置
     * @param  {any}    obj [description]
     * @return {string}     [description]
     */
    toResourceUrl(obj ? : any): string;
    /**
     * 间隔时间
     * @return {string} [description]
     */
    toShortDate(): string;
    /**
     * 日期格式
     * @param  {[type]} fmt [description]
     * @return {string}     [description]
     */
    format(fmt): string;

  }
}

String.prototype.format = function(fmt) {
  let date: Date = new Date(this);
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

String.prototype.toResourceUrl = function(obj ? : any) {
  return obj && Object.keys(obj).length > 0 ? `${this.toString()}?${toQueryString(obj)}` : this.toString();
}
String.prototype.toShortDate = function() {
  let date = new Date(this);
  let minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30,
    now = new Date().getTime(),
    diffValue = now - date.getTime();
  if (diffValue < 0) { return; }
  let monthC = diffValue / month,
    weekC = diffValue / (7 * day),
    dayC = diffValue / day,
    hourC = diffValue / hour,
    minC = diffValue / minute,
    result = '';
  if (monthC >= 1) {
    //result = date.format('yyyy年M月dd日') //yyyy年MM月dd日
    result = "" + Math.floor(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + Math.floor(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + Math.floor(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + Math.floor(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + Math.floor(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}
