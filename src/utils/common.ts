export function debounce(func, wait, immediate) {
    let timeout, result;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
}

export function throttle(func, wait) {
    let context, args, timeout, result, previous: number = 0,
        later = () => {
            previous = new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
        };
    return function () {
        let now: number = new Date().getTime(),
            remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

export function localtime(type) {
    let now: any;
    let y: any;
    let m: any;
    let d: any;
    let month: any;
    let day: any;
    now = new Date();
    y = now.getFullYear();
    m = now.getMonth() + 1;
    d = now.getDate();
    month = m < 10 ? '0' + m.toString() : m;
    day = d < 10 ? '0' + d.toString() : d;
    if (type == 'd') {
        return `${y}${month}${day}`;
    }
    if (type == 'ch') {
        return `${y}年${month}月${day}日`;
    }
    if (type == 'fd') {
        return `${y}-${month}-${day}`
    }
    if (type == 'yadd') {
        return `${y + 1}-${month}-${day}`
    }
    if (type == 'y') {
        return `${y}`;
    }
    if (type == 'm') {
        return `${y}${month}`;
    }
    if (type == 'fm') {
        return `${y}-${month}`;
    }
    if (type == 'ym') {
        return `${y + 1}-${month}`
    }
    if (type == 'q') {
        if (m < 4) {
            return `${y}1`
        } else if (m < 7) {
            return `${y}2`
        } else if (m < 10) {
            return `${y}3`
        } else {
            return `${y}4`
        }
    }
}

export function ytd() {
    let lastDate: any = new Date();
    lastDate.setTime(lastDate.getTime() - 24 * 60 * 60 * 1000);
    let M = lastDate.getMonth() + 1;
    let lastM: string | number = M < 10 ? '0' + M : M;
    let D = lastDate.getDate();
    let lastD: number | string = D < 10 ? '0' + D : D;
    let Y = lastDate.getFullYear();
    return `${Y}${lastM}${lastD}`
}

export function front(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + tMonth + tDate;
}
function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}