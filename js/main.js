!function($, window, document, undefined) {
    var productImg, targetEl, activeClass, productImgName = "productImg", dataKey = "plugin_" + productImgName, productImgConstruct = function(element, options) {
        this.element = element, this.options = {
            targetSelector: "data-productimg-target",
            activeClass: "product-thumbnails-item-link--active"
        }, this.init(options);
    };
    productImgConstruct.prototype = {
        init: function(options) {
            $.extend(this.options, options), productImg = this, targetEl = "[" + productImg.options.targetSelector + "]", 
            activeClass = productImg.options.activeClass, $(productImg.element).click(function() {
                var targetSrc = $(this).find("img").attr("src"), targetAlt = $(this).find("img").attr("alt");
                productImg.replaceImg(targetSrc, targetAlt), productImg.setActive($(this));
            });
        },
        replaceImg: function(src, alt) {
            $(targetEl).attr("src", src).attr("alt", alt);
        },
        setActive: function($element) {
            $(productImg.element).removeClass(activeClass), $element.addClass(activeClass);
        }
    }, $.fn[productImgName] = function(options) {
        var productImg = this.data(dataKey);
        return productImg instanceof productImgConstruct ? "undefined" != typeof options && productImg.init(options) : (productImg = new productImgConstruct(this, options), 
        this.data(dataKey, productImg)), productImg;
    };
}(jQuery, window, document), !function(e, n, t) {
    function r(e, n) {
        return typeof e === n;
    }
    function o() {
        var e, n, t, o, s, i, a;
        for (var l in C) if (C.hasOwnProperty(l)) {
            if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
            for (o = r(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++) i = e[s], 
            a = i.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), 
            Modernizr[a[0]][a[1]] = o), g.push((o ? "" : "no-") + a.join("-"));
        }
    }
    function s(e) {
        var n = _.className, t = Modernizr._config.classPrefix || "";
        if (S && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(r, "$1" + t + "js$2");
        }
        Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), S ? _.className.baseVal = n : _.className = n);
    }
    function i(e, n) {
        return function() {
            return e.apply(n, arguments);
        };
    }
    function a(e, n, t) {
        var o;
        for (var s in e) if (e[s] in n) return t === !1 ? e[s] : (o = n[e[s]], r(o, "function") ? i(o, t || n) : o);
        return !1;
    }
    function l() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : S ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
    }
    function f(e, n) {
        return !!~("" + e).indexOf(n);
    }
    function u(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
            return n + t.toUpperCase();
        }).replace(/^-/, "");
    }
    function d(e) {
        return e.replace(/([A-Z])/g, function(e, n) {
            return "-" + n.toLowerCase();
        }).replace(/^ms-/, "-ms-");
    }
    function c() {
        var e = n.body;
        return e || (e = l(S ? "svg" : "body"), e.fake = !0), e;
    }
    function p(e, t, r, o) {
        var s, i, a, f, u = "modernizr", d = l("div"), p = c();
        if (parseInt(r, 10)) for (;r--; ) a = l("div"), a.id = o ? o[r] : u + (r + 1), d.appendChild(a);
        return s = l("style"), s.type = "text/css", s.id = "s" + u, (p.fake ? p : d).appendChild(s), 
        p.appendChild(d), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), 
        d.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = _.style.overflow, 
        _.style.overflow = "hidden", _.appendChild(p)), i = t(d, e), p.fake ? (p.parentNode.removeChild(p), 
        _.style.overflow = f, _.offsetHeight) : d.parentNode.removeChild(d), !!i;
    }
    function m(n, r) {
        var o = n.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (;o--; ) if (e.CSS.supports(d(n[o]), r)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in e) {
            for (var s = []; o--; ) s.push("(" + d(n[o]) + ":" + r + ")");
            return s = s.join(" or "), p("@supports (" + s + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null).position;
            });
        }
        return t;
    }
    function h(e, n, o, s) {
        function i() {
            d && (delete z.style, delete z.modElem);
        }
        if (s = r(s, "undefined") ? !1 : s, !r(o, "undefined")) {
            var a = m(e, o);
            if (!r(a, "undefined")) return a;
        }
        for (var d, c, p, h, v, y = [ "modernizr", "tspan" ]; !z.style; ) d = !0, z.modElem = l(y.shift()), 
        z.style = z.modElem.style;
        for (p = e.length, c = 0; p > c; c++) if (h = e[c], v = z.style[h], f(h, "-") && (h = u(h)), 
        z.style[h] !== t) {
            if (s || r(o, "undefined")) return i(), "pfx" == n ? h : !0;
            try {
                z.style[h] = o;
            } catch (g) {}
            if (z.style[h] != v) return i(), "pfx" == n ? h : !0;
        }
        return i(), !1;
    }
    function v(e, n, t, o, s) {
        var i = e.charAt(0).toUpperCase() + e.slice(1), l = (e + " " + b.join(i + " ") + i).split(" ");
        return r(n, "string") || r(n, "undefined") ? h(l, n, o, s) : (l = (e + " " + E.join(i + " ") + i).split(" "), 
        a(l, n, t));
    }
    function y(e, n, r) {
        return v(e, t, t, n, r);
    }
    var g = [], C = [], w = {
        _version: "3.3.1",
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        _q: [],
        on: function(e, n) {
            var t = this;
            setTimeout(function() {
                n(t[e]);
            }, 0);
        },
        addTest: function(e, n, t) {
            C.push({
                name: e,
                fn: n,
                options: t
            });
        },
        addAsyncTest: function(e) {
            C.push({
                name: null,
                fn: e
            });
        }
    }, Modernizr = function() {};
    Modernizr.prototype = w, Modernizr = new Modernizr();
    var _ = n.documentElement, S = "svg" === _.nodeName.toLowerCase(), x = "Moz O ms Webkit", b = w._config.usePrefixes ? x.split(" ") : [];
    w._cssomPrefixes = b;
    var E = w._config.usePrefixes ? x.toLowerCase().split(" ") : [];
    w._domPrefixes = E;
    var P = {
        elem: l("modernizr")
    };
    Modernizr._q.push(function() {
        delete P.elem;
    });
    var z = {
        style: P.elem.style
    };
    Modernizr._q.unshift(function() {
        delete z.style;
    }), w.testAllProps = v, w.testAllProps = y, Modernizr.addTest("csstransforms", function() {
        return -1 === navigator.userAgent.indexOf("Android 2.") && y("transform", "scale(1)", !0);
    }), o(), s(g), delete w.addTest, delete w.addAsyncTest;
    for (var N = 0; N < Modernizr._q.length; N++) Modernizr._q[N]();
    e.Modernizr = Modernizr;
}(window, document), $(document).ready(function() {
    $(".product-thumbnails-item-link").productImg();
});