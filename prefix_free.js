(function () {
  function m(a, b) {
    return [].slice.call((b || document).querySelectorAll(a));
  }
  if (window.addEventListener) {
    var e = (window.StyleFix = {
      link: function (a) {
        var b = a.href || a.getAttribute("data-href");
        try {
          if (!b || "stylesheet" !== a.rel || a.hasAttribute("data-noprefix"))
            return;
        } catch (p) {
          return;
        }
        var d = b.replace(/[^\/]+$/, ""),
          f = (/^[a-z]{3,10}:/.exec(d) || [""])[0],
          h = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(d) || [""])[0],
          k = /^([^?]*)\??/.exec(b)[1],
          g = a.parentNode,
          c = new XMLHttpRequest(),
          l;
        c.onreadystatechange = function () {
          4 === c.readyState && l();
        };
        l = function () {
          var b = c.responseText;
          if (
            b &&
            a.parentNode &&
            (!c.status || 400 > c.status || 600 < c.status)
          ) {
            if ((b = e.fix(b, !0, a)) && d)
              var b = b.replace(
                  /url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,
                  function (b, a, c) {
                    return /^([a-z]{3,10}:|#)/i.test(c)
                      ? b
                      : /^\/\//.test(c)
                      ? 'url("' + f + c + '")'
                      : /^\//.test(c)
                      ? 'url("' + h + c + '")'
                      : /^\?/.test(c)
                      ? 'url("' + k + c + '")'
                      : 'url("' + d + c + '")';
                  }
                ),
                n = d.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1"),
                b = b.replace(
                  RegExp("\\b(behavior:\\s*?url\\('?\"?)" + n, "gi"),
                  "$1"
                );
            n = document.createElement("style");
            n.textContent =
              "/*# sourceURL=" +
              a.getAttribute("href") +
              " */\n/*@ sourceURL=" +
              a.getAttribute("href") +
              " */\n" +
              b;
            n.media = a.media;
            n.disabled = a.disabled;
            n.setAttribute("data-href", a.getAttribute("href"));
            a.id && (n.id = a.id);
            g.insertBefore(n, a);
            g.removeChild(a);
            n.media = a.media;
          }
        };
        try {
          c.open("GET", b), c.send(null);
        } catch (p) {
          "undefined" != typeof XDomainRequest &&
            ((c = new XDomainRequest()),
            (c.onerror = c.onprogress = function () {}),
            (c.onload = l),
            c.open("GET", b),
            c.send(null));
        }
        a.setAttribute("data-inprogress", "");
      },
      styleElement: function (a) {
        if (!a.hasAttribute("data-noprefix")) {
          var b = a.disabled;
          a.textContent = e.fix(a.textContent, !0, a);
          a.disabled = b;
        }
      },
      styleAttribute: function (a) {
        var b = a.getAttribute("style"),
          b = e.fix(b, !1, a);
        a.setAttribute("style", b);
      },
      process: function () {
        m('link[rel="stylesheet"]:not([data-inprogress])').forEach(
          StyleFix.link
        );
        m("style").forEach(StyleFix.styleElement);
        m("[style]").forEach(StyleFix.styleAttribute);
      },
      register: function (a, b) {
        (e.fixers = e.fixers || []).splice(
          void 0 === b ? e.fixers.length : b,
          0,
          a
        );
      },
      fix: function (a, b, d) {
        if (e.fixers)
          for (var f = 0; f < e.fixers.length; f++)
            a = e.fixers[f](a, b, d) || a;
        return a;
      },
      camelCase: function (a) {
        return a
          .replace(/-([a-z])/g, function (b, a) {
            return a.toUpperCase();
          })
          .replace("-", "");
      },
      deCamelCase: function (a) {
        return a.replace(/[A-Z]/g, function (b) {
          return "-" + b.toLowerCase();
        });
      },
    });
    (function () {
      setTimeout(function () {
        m('link[rel="stylesheet"]').forEach(StyleFix.link);
      }, 10);
      document.addEventListener("DOMContentLoaded", StyleFix.process, !1);
    })();
  }
})();
(function (m) {
  function e(b, d, f, h, k) {
    b = a[b];
    b.length &&
      ((b = RegExp(d + "(" + b.join("|") + ")" + f, "gi")),
      (k = k.replace(b, h)));
    return k;
  }
  if (window.StyleFix && window.getComputedStyle) {
    var a = (window.PrefixFree = {
      prefixCSS: function (b, d, f) {
        var h = a.prefix;
        -1 < a.functions.indexOf("linear-gradient") &&
          (b = b.replace(
            /(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi,
            function (b, a, d, f) {
              return a + (d || "") + "linear-gradient(" + (90 - f) + "deg";
            }
          ));
        b = e("functions", "(\\s|:|,)", "\\s*\\(", "$1" + h + "$2(", b);
        b = e("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + h + "$2$3", b);
        b = e("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + h + "$2:", b);
        if (a.properties.length) {
          var k = RegExp("\\b(" + a.properties.join("|") + ")(?!:)", "gi");
          b = e(
            "valueProperties",
            "\\b",
            ":(.+?);",
            function (a) {
              return a.replace(k, h + "$1");
            },
            b
          );
        }
        d &&
          ((b = e("selectors", "", "\\b", a.prefixSelector, b)),
          (b = e("atrules", "@", "\\b", "@" + h + "$1", b)));
        b = b.replace(RegExp("-" + h, "g"), "-");
        return (b = b.replace(/-\*-(?=[a-z]+)/gi, a.prefix));
      },
      property: function (b) {
        return (0 <= a.properties.indexOf(b) ? a.prefix : "") + b;
      },
      value: function (b, d) {
        b = e("functions", "(^|\\s|,)", "\\s*\\(", "$1" + a.prefix + "$2(", b);
        b = e("keywords", "(^|\\s)", "(\\s|$)", "$1" + a.prefix + "$2$3", b);
        0 <= a.valueProperties.indexOf(d) &&
          (b = e(
            "properties",
            "(^|\\s|,)",
            "($|\\s|,)",
            "$1" + a.prefix + "$2$3",
            b
          ));
        return b;
      },
      prefixSelector: function (b) {
        return a.selectorMap[b] || b;
      },
      prefixProperty: function (b, d) {
        var f = a.prefix + b;
        return d ? StyleFix.camelCase(f) : f;
      },
    });
    (function () {
      var b = {},
        d = [],
        f = getComputedStyle(document.documentElement, null),
        h = document.createElement("div").style,
        k = function (a) {
          if ("-" === a.charAt(0)) {
            d.push(a);
            a = a.split("-");
            var c = a[1];
            for (b[c] = ++b[c] || 1; 3 < a.length; )
              a.pop(),
                (c = a.join("-")),
                StyleFix.camelCase(c) in h && -1 === d.indexOf(c) && d.push(c);
          }
        };
      if (f && 0 < f.length) for (var g = 0; g < f.length; g++) k(f[g]);
      else for (var c in f) k(StyleFix.deCamelCase(c));
      var g = 0,
        e,
        p;
      for (p in b) (f = b[p]), g < f && ((e = p), (g = f));
      a.prefix = "-" + e + "-";
      a.Prefix = StyleFix.camelCase(a.prefix);
      a.properties = [];
      for (g = 0; g < d.length; g++)
        (c = d[g]),
          0 === c.indexOf(a.prefix) &&
            ((e = c.slice(a.prefix.length)),
            StyleFix.camelCase(e) in h || a.properties.push(e));
      !("Ms" != a.Prefix || "transform" in h || "MsTransform" in h) &&
        "msTransform" in h &&
        a.properties.push("transform", "transform-origin");
      a.properties.sort();
    })();
    (function () {
      function b(a, b) {
        e[b] = "";
        e[b] = a;
        return !!e[b];
      }
      var d = {
        "linear-gradient": { property: "backgroundImage", params: "red, teal" },
        calc: { property: "width", params: "1px + 5%" },
        element: { property: "backgroundImage", params: "#foo" },
        "cross-fade": {
          property: "backgroundImage",
          params: "url(a.png), url(b.png), 50%",
        },
        "image-set": {
          property: "backgroundImage",
          params: "url(a.png) 1x, url(b.png) 2x",
        },
      };
      d["repeating-linear-gradient"] = d["repeating-radial-gradient"] = d[
        "radial-gradient"
      ] = d["linear-gradient"];
      var f = {
        initial: "color",
        grab: "cursor",
        grabbing: "cursor",
        "zoom-in": "cursor",
        "zoom-out": "cursor",
        box: "display",
        flexbox: "display",
        "inline-flexbox": "display",
        flex: "display",
        "inline-flex": "display",
        grid: "display",
        "inline-grid": "display",
        "max-content": "width",
        "min-content": "width",
        "fit-content": "width",
        "fill-available": "width",
        "contain-floats": "width",
      };
      a.functions = [];
      a.keywords = [];
      var e = document.createElement("div").style,
        k;
      for (k in d) {
        var g = d[k],
          c = g.property,
          g = k + "(" + g.params + ")";
        !b(g, c) && b(a.prefix + g, c) && a.functions.push(k);
      }
      for (var l in f)
        (c = f[l]), !b(l, c) && b(a.prefix + l, c) && a.keywords.push(l);
    })();
    (function () {
      function b(a) {
        h.textContent = a + "{}";
        return !!h.sheet.cssRules.length;
      }
      var d = {
          ":any-link": null,
          "::backdrop": null,
          ":fullscreen": null,
          ":full-screen": ":fullscreen",
          "::placeholder": null,
          ":placeholder": "::placeholder",
          "::input-placeholder": "::placeholder",
          ":input-placeholder": "::placeholder",
          ":read-only": null,
          ":read-write": null,
          "::selection": null,
        },
        e = { keyframes: "name", viewport: null, document: 'regexp(".")' };
      a.selectors = [];
      a.selectorMap = {};
      a.atrules = [];
      var h = m.appendChild(document.createElement("style")),
        k;
      for (k in d) {
        var g = d[k] || k,
          c = k.replace(/::?/, function (b) {
            return b + a.prefix;
          });
        !b(g) && b(c) && (a.selectors.push(g), (a.selectorMap[g] = c));
      }
      for (var l in e)
        (d = l + " " + (e[l] || "")),
          !b("@" + d) && b("@" + a.prefix + d) && a.atrules.push(l);
      m.removeChild(h);
    })();
    a.valueProperties = ["transition", "transition-property", "will-change"];
    m.className += " " + a.prefix;
    StyleFix.register(a.prefixCSS);
  }
})(document.documentElement);
