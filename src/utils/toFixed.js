/*
    js中Number类型的扩展

    js浮点数的toFixed四舍五入,负数与正数执行相同的逻辑。-1.5返回-1,-1.6返回-2
    toFixed(len)

    最大小数位数 ,尾数为0的忽略
    toFixedMax(max)

    浮点相加
    Number.floatAdd(a,b)

    浮点相减
    Number.floatSub(a,b)

    浮点相乘
    Number.floatMul(a,b)

    浮点相除
    Number.floatDiv(a,b)

    let a = 12.264234
    let b = '1.1'
    console.log(Number.floatAdd(a, b))
    console.log(Number.floatMul(a, b))
    console.log(a.toFixed(1))
*/

/* eslint-disable */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function () {
    _extends(Number.prototype, {
        toFixedMax: function toFixedMax(max) {
            var ps = String(this).split('.');
            var len = 0;
            if (ps.length > 1) {
                len = ps[1].length;
            }
            max = Math.min(len, max);
            return this.toFixed(max);
        },
        toFixed: function toFixed(d) {
            var s = this + "";
            if (!d) d = 0;
            d = parseInt(d);
            if (s.indexOf(".") == -1) s += ".";
            s += new Array(d + 1).join("0");
            if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
                var s = "0" + RegExp.$2,
                    pm = RegExp.$1,
                    a = RegExp.$3.length,
                    b = true;
                if (a == d + 2) {
                    a = s.match(/\d/g);
                    if (pm !== '-' && parseInt(a[a.length - 1]) > 4 || pm === "-" && parseInt(a[a.length - 1]) > 5) {
                        for (var i = a.length - 2; i >= 0; i--) {
                            a[i] = parseInt(a[i]) + 1;
                            if (a[i] == 10) {
                                a[i] = 0;
                                b = i != 1;
                            } else break;
                        }
                    }
                    s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
                }if (b) s = s.substr(1);
                return (pm + s).replace(/\.$/, "");
            }return this + "";
        }
    });
    var mul = function mul(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    };
    //运算符
    _extends(Number, {
        //加法
        floatAdd: function floatAdd(a, b) {
            var c, d, e;
            try {
                c = a.toString().split(".")[1].length;
            } catch (f) {
                c = 0;
            }
            try {
                d = b.toString().split(".")[1].length;
            } catch (f) {
                d = 0;
            }
            e = Math.pow(10, Math.max(c, d));
            return (mul(a, e) + mul(b, e)) / e;
        },

        //减法
        floatSub: function floatSub(a, b) {
            var c, d, e;
            try {
                c = a.toString().split(".")[1].length;
            } catch (f) {
                c = 0;
            }
            try {
                d = b.toString().split(".")[1].length;
            } catch (f) {
                d = 0;
            }
            e = Math.pow(10, Math.max(c, d));
            return (mul(a, e) - mul(b, e)) / e;
        },

        //乘法
        floatMul: function floatMul(a, b) {
            return mul(a, b);
        },

        //除法
        floatDiv: function floatDiv(a, b) {
            var c,
                d,
                e = 0,
                f = 0;
            try {
                e = a.toString().split(".")[1].length;
            } catch (g) {}
            try {
                f = b.toString().split(".")[1].length;
            } catch (g) {}
            c = Number(a.toString().replace(".", ""));
            d = Number(b.toString().replace(".", ""));
            return mul(c / d, Math.pow(10, f - e));
        }
    });
})();
