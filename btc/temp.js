(this.webpackJsonpsetting = this.webpackJsonpsetting || []).push([
    [2],
    {
        1: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return a;
            });
            var a = function (e, t) {
                return e
                    ? window.Dict
                        ? ((e = e
                            .replace(/([^\\])\\n/g, "$1\n")
                            .replace(/\\\\n/, "&#92;n")),
                            /((\.\.\.)|(\u2026))$/.exec(e)
                                ? window.Dict.get(e.replace(/((\.\.\.)|(\u2026))$/, ""), t)
                                .replace(/\n/g, " ")
                                .replace(/&#92;/g, "\\") + "\u2026"
                                : window.Dict.get(e, t)
                                    .replace(/\n/g, " ")
                                    .replace(/&#92;/g, "\\"))
                        : e
                    : "";
            };
        },
        2: function (e, t, n) {
            "use strict";
            n.d(t, "o", function () {
                return O;
            }),
                n.d(t, "h", function () {
                    return k;
                }),
                n.d(t, "c", function () {
                    return N;
                }),
                n.d(t, "k", function () {
                    return C;
                }),
                n.d(t, "r", function () {
                    return L;
                }),
                n.d(t, "d", function () {
                    return S;
                }),
                n.d(t, "t", function () {
                    return M;
                }),
                n.d(t, "q", function () {
                    return z;
                }),
                n.d(t, "b", function () {
                    return D;
                }),
                n.d(t, "s", function () {
                    return T;
                }),
                n.d(t, "u", function () {
                    return P;
                }),
                n.d(t, "l", function () {
                    return K;
                }),
                n.d(t, "n", function () {
                    return A;
                }),
                n.d(t, "f", function () {
                    return B;
                }),
                n.d(t, "e", function () {
                    return F;
                }),
                n.d(t, "g", function () {
                    return R;
                }),
                n.d(t, "p", function () {
                    return _;
                }),
                n.d(t, "j", function () {
                    return W;
                }),
                n.d(t, "v", function () {
                    return q;
                }),
                n.d(t, "x", function () {
                    return V;
                }),
                n.d(t, "i", function () {
                    return I;
                }),
                n.d(t, "m", function () {
                    return Q;
                }),
                n.d(t, "a", function () {
                    return U;
                }),
                n.d(t, "w", function () {
                    return G;
                });
            var a = n(12),
                r = n(5),
                i = n(6),
                c = n(3),
                o = n(15),
                l = n(16),
                s = n(11),
                u = n(18),
                d = n(17),
                m = n(0),
                f = n.n(m),
                p = n(9),
                b = n.n(p),
                h = n(8),
                v = n(1),
                w = n(4),
                g = n(19),
                E = n.n(g);
            function y(e) {
                return (function (t) {
                    Object(u.a)(a, t);
                    var n = Object(d.a)(a);
                    function a(e) {
                        var t;
                        return (
                            Object(o.a)(this, a),
                                ((t = n.call(this, e)).onMouseEnter = t.onMouseEnter.bind(
                                    Object(s.a)(t)
                                )),
                                (t.onMouseLeave = t.onMouseLeave.bind(Object(s.a)(t))),
                                (t.targetRef = f.a.createRef()),
                                t
                        );
                    }
                    return (
                        Object(l.a)(a, [
                            {
                                key: "componentDidMount",
                                value: function () {
                                    this.tooltip = document.querySelector("#ty-tooltip");
                                },
                            },
                            {
                                key: "_adjustPosition",
                                value: function (e) {
                                    var t = this.targetRef.current,
                                        n = t.getBoundingClientRect(),
                                        a = this.tooltip.clientWidth,
                                        r = {
                                            top: n.top + document.body.scrollTop,
                                            left: n.left + document.body.scrollLeft,
                                        };
                                    "bottom" === e
                                        ? ((r.top = n.bottom + 8),
                                            (r.right = n.right + (a - n.width) / 2))
                                        : "top" === e
                                            ? ((r.top = n.top - 36),
                                                (r.right = n.right + (a - n.width) / 2))
                                            : ((r.right = r.left - 8),
                                                (r.top =
                                                    r.top +
                                                    t.clientHeight / 2 -
                                                    this.tooltip.clientHeight / 2)),
                                        a > window.innerWidth - 30
                                            ? (r.left = 8)
                                            : (r.left = r.right - a),
                                        (this.tooltip.style.top = r.top + "px"),
                                        (this.tooltip.style.left = r.left + "px"),
                                    r.right &&
                                    (this.tooltip.style.right =
                                        window.innerWidth - r.right - 4 + "px");
                                },
                            },
                            {
                                key: "onMouseEnter",
                                value: function () {
                                    var e = this.props,
                                        t = e.hintPosition,
                                        n = e.hint;
                                    n &&
                                    ((this.tooltip.style.right = "auto"),
                                        (this.tooltip.innerHTML = n),
                                        this.tooltip.classList.add("shown"),
                                        this._adjustPosition(t));
                                },
                            },
                            {
                                key: "onMouseLeave",
                                value: function () {
                                    this.tooltip.classList.remove("shown");
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    return f.a.createElement(
                                        e,
                                        Object.assign({}, this.props, {
                                            ref: this.targetRef,
                                            onMouseEnter: this.onMouseEnter,
                                            onMouseLeave: this.onMouseLeave,
                                        })
                                    );
                                },
                            },
                        ]),
                            a
                    );
                })(f.a.Component);
            }
            var O = function (e) {
                    var t = e.active,
                        n = e.children,
                        a = Object(c.a)(e, ["active", "children"]),
                        r = f.a.useRef(null);
                    return (
                        f.a.useEffect(function () {
                            if (t && r.current) {
                                var e = r.current,
                                    n = e.querySelector(".search-hit, .blink-area");
                                if (n) {
                                    var a = n.getBoundingClientRect();
                                    a.top + 20 > e.parentElement.scrollTop + window.innerHeight &&
                                    (e.parentElement.scrollTop = a.top - 20);
                                }
                            }
                        }),
                            f.a.createElement(
                                "div",
                                Object.assign(
                                    { ref: r, className: "content" + (t ? "" : " display-none") },
                                    a
                                ),
                                n
                            )
                    );
                },
                j = function (e) {
                    var t = e.text,
                        n = e.link;
                    return n
                        ? f.a.createElement(
                            "a",
                            {
                                href: n,
                                target: "_blank",
                                onClick: function (e) {
                                    window.Setting.openLink(n), e.preventDefault();
                                },
                            },
                            Object(v.a)(t)
                        )
                        : Object(v.a)(t);
                },
                k = function (e) {
                    var t = e.hint,
                        n = e.displayHint,
                        a = e.inlineHint,
                        r = e.hintLink,
                        i = Object(c.a)(e, [
                            "hint",
                            "displayHint",
                            "inlineHint",
                            "hintLink",
                        ]);
                    return n
                        ? f.a.createElement(
                            "div",
                            { className: "panel-content-hint row" },
                            t
                        )
                        : a
                            ? f.a.createElement(
                                "div",
                                { className: "inline-hint" },
                                f.a.createElement(j, {
                                    link: r,
                                    text: t || Object(v.a)("Learn More\u2026", "Front"),
                                })
                            )
                            : f.a.createElement(
                                x,
                                Object.assign({ hint: t ? Object(v.a)(t) : r, hintLink: r }, i)
                            );
                },
                x = y(
                    f.a.forwardRef(function (e, t) {
                        var n = e.hint,
                            a = e.hintLink,
                            r =
                                (e.forwardedRef,
                                    Object(c.a)(e, ["hint", "hintLink", "forwardedRef"]));
                        return a
                            ? f.a.createElement(
                                "span",
                                Object.assign(
                                    { ref: t, className: "label-hint", hint: n },
                                    r
                                ),
                                f.a.createElement(
                                    "a",
                                    {
                                        href: a,
                                        target: "_blank",
                                        onClick: function (e) {
                                            window.Setting.openLink(a), e.preventDefault();
                                        },
                                    },
                                    " ",
                                    f.a.createElement(h.i, null)
                                )
                            )
                            : f.a.createElement(
                                "span",
                                Object.assign(
                                    { ref: t, className: "label-hint", hint: n },
                                    r
                                ),
                                f.a.createElement(h.i, null)
                            );
                    })
                ),
                N = function (e) {
                    var t = e.keyName,
                        n = e.label,
                        a = e.dictGroup,
                        r = e.checked,
                        i = e.reverse,
                        o = e.onChange,
                        l = e.hint,
                        s = e.hintLink,
                        u = e.inlineHint,
                        d = e.isCell,
                        m = e.disabled,
                        p = Object(c.a)(e, [
                            "keyName",
                            "label",
                            "dictGroup",
                            "checked",
                            "reverse",
                            "onChange",
                            "hint",
                            "hintLink",
                            "inlineHint",
                            "isCell",
                            "disabled",
                        ]),
                        b = f.a.useContext(w.a),
                        h =
                            !d && b && (Object(w.c)(b, n, a) || Object(w.c)(b, l))
                                ? " search-hit"
                                : "";
                    return f.a.createElement(
                        "div",
                        Object.assign(
                            {
                                className:
                                    "checkbox" + (d ? "" : " row") + h + (m ? " disabled" : ""),
                            },
                            p
                        ),
                        f.a.createElement(
                            "label",
                            null,
                            f.a.createElement("input", {
                                type: "checkbox",
                                onChange: function (e) {
                                    o(t, i ? !e.target.checked : e.target.checked);
                                },
                                checked: !!r,
                                disabled: m,
                            }),
                            Object(v.a)(n, a)
                        ),
                        "\xa0",
                        l || s
                            ? f.a.createElement(k, { hint: l, inlineHint: u, hintLink: s })
                            : null
                    );
                },
                C = f.a.memo(function (e) {
                    var t = e.title,
                        n = e.dictGroup,
                        a = e.hint,
                        r = e.contentStyle,
                        i = e.hintLink,
                        c = e.breakBeforeHint,
                        o = e.children,
                        l = e.headerStyle,
                        s = e.keyWords,
                        u = e.highlight,
                        d = f.a.useContext(w.a),
                        m =
                            Object(w.c)(d, t, n) ||
                            Object(w.c)(d, a) ||
                            (s && Object(w.d)(d, s));
                    return f.a.createElement(
                        "div",
                        {
                            className:
                                "input-group" +
                                (m ? " search-hit" : "") +
                                (u ? " blink-area" : ""),
                        },
                        f.a.createElement(
                            "h5",
                            { className: "input-group-header", style: l },
                            f.a.createElement(
                                "span",
                                { className: "input-group-header-title" },
                                Object(v.a)(t, n)
                            ),
                            a || i
                                ? f.a.createElement(
                                    "span",
                                    {
                                        className:
                                            "input-group-header-hint" +
                                            (c ? " hint-break-before" : ""),
                                    },
                                    f.a.createElement(j, {
                                        link: i,
                                        text: a || Object(v.a)("Learn More\u2026"),
                                    })
                                )
                                : null
                        ),
                        f.a.createElement(
                            "div",
                            { className: "input-group-content", style: r },
                            o
                        )
                    );
                }),
                L = function (e) {
                    var t = e.keyName,
                        n = e.isCell,
                        a = e.options,
                        r = e.value,
                        i = e.type,
                        o = e.hint,
                        l = e.inlineHint,
                        s = e.optionsDict,
                        u = e.onChange,
                        d = e.disabled,
                        m = Object(c.a)(e, [
                            "keyName",
                            "isCell",
                            "options",
                            "value",
                            "type",
                            "hint",
                            "inlineHint",
                            "optionsDict",
                            "onChange",
                            "disabled",
                        ]),
                        p = f.a.useContext(w.a),
                        b =
                            p &&
                            !n &&
                            (Object(w.d)(p, Object.values(a), s) || Object(w.c)(p, o))
                                ? " search-hit"
                                : "";
                    return f.a.createElement(
                        "div",
                        Object.assign({ className: (n ? "cell" : "row") + b }, m),
                        f.a.createElement(
                            "select",
                            {
                                onChange: function (e) {
                                    var n = e.target.value;
                                    "number" == i
                                        ? (n = e.target.value - 0)
                                        : "boolean" == i && (n = e.target.value + "" == "true"),
                                        u(t, n);
                                },
                                value: r,
                                disabled: d,
                            },
                            (function () {
                                var e = [];
                                for (var t in a)
                                    "_seperator" == t
                                        ? e.push(
                                            f.a.createElement(
                                                "option",
                                                { key: t, disabled: !0 },
                                                "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"
                                            )
                                        )
                                        : "" == a[t] ||
                                        e.push(
                                            f.a.createElement(
                                                "option",
                                                { key: t, value: t },
                                                Object(v.a)(a[t], s)
                                            )
                                        );
                                return e;
                            })()
                        ),
                        o ? f.a.createElement(k, { hint: o, inlineHint: l }) : null
                    );
                },
                S = function (e) {
                    var t = e.forMac,
                        n = e.forWin,
                        a = e.forLinux,
                        r = e.visible,
                        i = e.children;
                    return (function (e) {
                        return (e =
                            e ||
                            (t && window.isMac) ||
                            (n && window.isWin) ||
                            (a && window.isLinux))
                            ? f.a.createElement(f.a.Fragment, null, i)
                            : null;
                    })(r);
                },
                M = function (e) {
                    var t = e.label,
                        n = e.style;
                    return f.a.createElement("span", { style: n }, Object(v.a)(t));
                },
                z = function (e) {
                    var t = e.keyWords,
                        n = e.style,
                        a = e.children,
                        r = e.className,
                        i = f.a.useContext(w.a),
                        c = i && t && Object(w.d)(i, t) ? " search-hit" : "";
                    return f.a.createElement(
                        "div",
                        { className: "row" + c + " " + r, style: n },
                        a
                    );
                },
                D = function (e) {
                    var t = e.label,
                        n = e.style,
                        a = e.type,
                        r = Object(c.a)(e, ["label", "style", "type"]);
                    return (
                        (a = a || "default"),
                            f.a.createElement(
                                "button",
                                Object.assign(
                                    {
                                        "aria-label": Object(v.a)(t),
                                        style: Object(i.a)({}, n),
                                        className: "btn btn-".concat(a),
                                    },
                                    r
                                ),
                                Object(v.a)(t)
                            )
                    );
                },
                T = function (e) {
                    var t = e.label,
                        n = e.style,
                        a = e.options,
                        r = e.onExtra,
                        o = Object(c.a)(e, ["label", "style", "options", "onExtra"]),
                        l = f.a.useRef(null);
                    return f.a.createElement(
                        "div",
                        { className: "btn-split-group" },
                        f.a.createElement(
                            "button",
                            Object.assign(
                                {
                                    "aria-label": Object(v.a)(t),
                                    style: Object(i.a)({}, n),
                                    className: "btn btn-default btn-split-left",
                                },
                                o
                            ),
                            f.a.createElement(
                                "span",
                                { className: "btn-split-main" },
                                Object(v.a)(t)
                            )
                        ),
                        f.a.createElement(
                            "button",
                            {
                                "tab-index": -1,
                                "aria-label": Object(v.a)(t),
                                style: Object(i.a)({}, n),
                                className: "btn btn-default btn-split-right",
                                onClick: function (e) {
                                    e.currentTarget.focus();
                                    var t = l.current.classList;
                                    t.contains("shown") ? t.remove("shown") : t.add("shown");
                                },
                                onBlur: function () {
                                    l.current.classList.remove("shown");
                                },
                            },
                            f.a.createElement("span", { className: "icon icon-down-dir" })
                        ),
                        f.a.createElement(
                            "ul",
                            { className: "dropdown-menu", ref: l },
                            Object.keys(a).map(function (e) {
                                return f.a.createElement(
                                    "li",
                                    {
                                        key: e,
                                        onMouseDown: function () {
                                            r(e - 0), l.current.classList.remove("shown");
                                        },
                                    },
                                    Object(v.a)(a[e])
                                );
                            })
                        )
                    );
                },
                P = function (e) {
                    var t = e.keyName,
                        n = e.value,
                        a = e.suggest,
                        r = e.placeholder,
                        i = e.onChange,
                        o = e.disabled,
                        l = e.presetOptions,
                        s = e.indent,
                        u = Object(c.a)(e, [
                            "keyName",
                            "value",
                            "suggest",
                            "placeholder",
                            "onChange",
                            "disabled",
                            "presetOptions",
                            "indent",
                        ]),
                        d = null;
                    if (l) {
                        var m = {};
                        l.map(function (e) {
                            return (m[e] = e);
                        }),
                            (d = f.a.createElement(
                                f.a.Fragment,
                                null,
                                f.a.createElement(I, { icon: "dot-3" }),
                                f.a.createElement(
                                    "select",
                                    {
                                        onChange: function (e) {
                                            "_none" === e.target.value
                                                ? i(t, "")
                                                : e.target.value && i(t, e.target.value);
                                        },
                                        value: l.indexOf(n) > -1 ? n : n ? "" : "_none",
                                    },
                                    f.a.createElement(
                                        "option",
                                        { value: "" },
                                        Object(v.a)("Custom")
                                    ),
                                    l.map(function (e) {
                                        return f.a.createElement("option", { key: e, value: e }, e);
                                    }),
                                    f.a.createElement(
                                        "option",
                                        { value: "_none" },
                                        Object(v.a)("None")
                                    )
                                )
                            ));
                    }
                    return f.a.createElement(
                        "div",
                        {
                            className: "row text-input ty-text-input ",
                            style: s ? { paddingLeft: s } : void 0,
                        },
                        a
                            ? f.a.createElement(
                                K,
                                Object.assign(
                                    {
                                        value: n,
                                        onChange: function (e) {
                                            return i(t, e);
                                        },
                                        candidates: a,
                                        placeholder: r,
                                    },
                                    u
                                )
                            )
                            : f.a.createElement(
                                "input",
                                Object.assign(
                                    {
                                        type: "text",
                                        value: n,
                                        onChange: function (e) {
                                            return i(t, e.target.value);
                                        },
                                        disabled: o,
                                        placeholder: Object(v.a)(r),
                                    },
                                    u
                                )
                            ),
                        d || null
                    );
                },
                A = function (e) {
                    var t = e.value,
                        n = e.keyName,
                        a = e.onChange,
                        r = Object(c.a)(e, ["value", "keyName", "onChange"]);
                    return f.a.createElement(
                        "input",
                        Object.assign(
                            {
                                type: "number",
                                value: t,
                                onChange: function (e) {
                                    var t = e.target.value - 0;
                                    isNaN(t)
                                        ? a(n, "382")
                                        : t < r.min
                                            ? a(n, "1")
                                            : t > r.max
                                                ? a(n, "999")
                                                : a(n, t);
                                },
                            },
                            r
                        )
                    );
                },
                I = y(
                    f.a.forwardRef(function (e, t) {
                        var n = e.icon,
                            a = (e.label, e.hint),
                            r = (e.hintPosition, e.disabled),
                            i = Object(c.a)(e, [
                                "icon",
                                "label",
                                "hint",
                                "hintPosition",
                                "disabled",
                            ]);
                        return f.a.createElement(
                            "span",
                            Object.assign(
                                {
                                    role: "button",
                                    className:
                                        "icon-button icon icon-" +
                                        n +
                                        (r ? " button-disabled" : ""),
                                    "aria-label": a,
                                    ref: t,
                                },
                                i
                            )
                        );
                    })
                ),
                F = function (e) {
                    var t = e.keyName,
                        n = e.value,
                        a = e.defaultPath,
                        r = e.placeholder,
                        i = e.onChange,
                        c = e.option;
                    return f.a.createElement(
                        "div",
                        { className: "file-input" },
                        f.a.createElement("input", {
                            type: "text",
                            value: n || "",
                            onChange: function (e) {
                                i(t, e.target.value);
                            },
                            placeholder: r,
                        }),
                        f.a.createElement(I, {
                            hint: Object(v.a)("Select"),
                            icon: "folder",
                            style: { marginLeft: "1ch", cursor: "pointer" },
                            onClick: function () {
                                var e = n || a;
                                window.Setting.selectFile(e, [c], function (e) {
                                    e && i(t, e);
                                });
                            },
                            hintPosition: "bottom",
                        })
                    );
                },
                H = y(
                    f.a.forwardRef(function (e, t) {
                        var n = e.value,
                            a = e.onSelect,
                            r =
                                (e.hintPosition,
                                    Object(c.a)(e, ["value", "onSelect", "hintPosition"])),
                            i = (n || "").replace(/[\\\/]\s*$/, "").replace(/.*[\\\/]/, "");
                        return (
                            "/" == n && (i = "/"),
                                f.a.createElement(
                                    "span",
                                    Object.assign(
                                        {
                                            ref: t,
                                            type: "text",
                                            className: "dir-path",
                                            placeholder: Object(v.a)("Select Custom Folder..."),
                                            readOnly: !0,
                                            onClick: function () {
                                                n ? window.Setting.openFolder(n) : a();
                                            },
                                        },
                                        r
                                    ),
                                    i || Object(v.a)("Select Custom Folder...")
                                )
                        );
                    })
                ),
                B = function (e) {
                    var t = e.hidden,
                        n = e.value,
                        a = e.keyName,
                        r = e.onChange,
                        i =
                            (Object(c.a)(e, ["hidden", "value", "keyName", "onChange"]),
                                function () {
                                    window.Setting.selectFolder(n, function (e) {
                                        var t = e || n;
                                        t && r(a, t);
                                    });
                                });
                    return t
                        ? null
                        : f.a.createElement(
                            "div",
                            { className: "row" },
                            f.a.createElement(
                                "div",
                                { className: "select-pin-input-group" },
                                f.a.createElement(H, {
                                    hint: n,
                                    value: n,
                                    onSelect: i,
                                    hintPosition: "bottom",
                                }),
                                f.a.createElement(I, {
                                    icon: "folder",
                                    onClick: i,
                                    hint: Object(v.a)("Select custom folder"),
                                    hintPosition: "bottom",
                                })
                            )
                        );
                },
                R = function (e) {
                    var t = e.value,
                        n = e.customValue,
                        a = e.onChange,
                        i = f.a.useState(n || 14),
                        c = Object(r.a)(i, 2),
                        o = c[0],
                        l = c[1];
                    var s,
                        u = function (e) {
                            "radio" === e.target.type &&
                            a("useCustomFontSize", e.target.value + "" === "true");
                        };
                    return f.a.createElement(
                        "div",
                        { className: "row" },
                        f.a.createElement(
                            "span",
                            {
                                className: "radio",
                                style: { minWidth: "40%", paddingRight: "8px", height: "26px" },
                            },
                            f.a.createElement(
                                "label",
                                { style: { overflow: "visible" } },
                                f.a.createElement("input", {
                                    type: "radio",
                                    name: "useCustomFontSize",
                                    value: !1,
                                    checked: !1 === t,
                                    onChange: u,
                                }),
                                Object(v.a)("Auto ( Recommended )")
                            )
                        ),
                        f.a.createElement(
                            "span",
                            { className: "radio", style: { width: "40%", height: "26px" } },
                            f.a.createElement(
                                "label",
                                { style: { overflow: "visible", whiteSpace: "nowrap" } },
                                f.a.createElement("input", {
                                    type: "radio",
                                    name: "useCustomFontSize",
                                    value: !0,
                                    checked: !0 === t,
                                    onChange: u,
                                }),
                                Object(v.a)("Customized"),
                                ((s = t + "" === "true"),
                                    f.a.createElement(
                                        "span",
                                        {
                                            className: "custom-font-input",
                                            style: { visibility: s ? "visible" : "hidden" },
                                        },
                                        f.a.createElement("input", {
                                            style: { marginLeft: "8px", marginTop: "-4px" },
                                            step: "1",
                                            type: "number",
                                            max: "24",
                                            size: "2",
                                            min: "9",
                                            value: o,
                                            onChange: function (e) {
                                                var t = e.target.value - 0;
                                                isNaN(t) ||
                                                (l(Math.floor(t)),
                                                t <= 24 && t >= 9 && a("customFontSize", t));
                                            },
                                            onBlur: function () {
                                                var e = o;
                                                e > 24 && (e = 24),
                                                e < 9 && (e = 9),
                                                    l(e),
                                                    a("customFontSize", e);
                                            },
                                        }),
                                        " ",
                                        f.a.createElement("span", null, "px")
                                    ))
                            )
                        )
                    );
                },
                _ = function (e) {
                    var t = e.keyName,
                        n = e.value,
                        a = e.type,
                        r = e.options,
                        i = e.onChange;
                    Object(c.a)(e, ["keyName", "value", "type", "options", "onChange"]);
                    return f.a.createElement(
                        "div",
                        {
                            className: "row",
                            onChange: function (e) {
                                var n = e.target.value;
                                "number" == a
                                    ? (n = e.target.value - 0)
                                    : "boolean" == a && (n = e.target.value + "" == "true"),
                                    i(t, n);
                            },
                            value: n,
                        },
                        (function () {
                            var e = [];
                            for (var a in r)
                                e.push(
                                    f.a.createElement(
                                        "span",
                                        { key: a, className: "radio", style: { width: "40%" } },
                                        f.a.createElement(
                                            "label",
                                            null,
                                            f.a.createElement("input", {
                                                type: "radio",
                                                name: t,
                                                value: a,
                                                defaultChecked: n + "" == a,
                                            }),
                                            Object(v.a)(r[a])
                                        )
                                    )
                                );
                            return e;
                        })()
                    );
                },
                W = function (e) {
                    var t,
                        n,
                        a = e.indentSize,
                        r = e.prettyIndent,
                        i = Object(c.a)(e, ["indentSize", "prettyIndent"]);
                    return (
                        (a -= 0),
                            (r = r + "" === "true"),
                            f.a.createElement(
                                C,
                                {
                                    title: "Indent Size on Save",
                                    breakBeforeHint: !0,
                                    hint: "only apply to quotes and lists created from menu bar or hybrid view",
                                    headerStyle: { marginBottom: "0" },
                                },
                                f.a.createElement(q, {
                                    rows: [
                                        [
                                            f.a.createElement(
                                                "div",
                                                null,
                                                f.a.createElement(
                                                    L,
                                                    Object.assign(
                                                        {
                                                            keyName: "indentSize",
                                                            style: { width: "80px", minHeight: "25px" },
                                                            options: {
                                                                0: "Auto",
                                                                2: "2",
                                                                3: "3",
                                                                4: "4",
                                                                5: "5",
                                                                "-1": "Tab",
                                                            },
                                                            isCell: !0,
                                                        },
                                                        i,
                                                        {
                                                            onChange: function (e, t) {
                                                                i.onChange(e, t - 0);
                                                            },
                                                            value: (a || 0) + "",
                                                        }
                                                    )
                                                ),
                                                f.a.createElement(
                                                    N,
                                                    Object.assign(
                                                        {
                                                            keyName: "prettyIndent",
                                                            style: { marginTop: "8px" },
                                                            label: "Pretty indentation",
                                                            isCell: !0,
                                                        },
                                                        i,
                                                        { checked: !!r }
                                                    )
                                                )
                                            ),
                                            f.a.createElement(
                                                "div",
                                                {
                                                    style: {
                                                        marginTop: "4px",
                                                        border: "1px solid",
                                                        padding: "0 8px",
                                                    },
                                                },
                                                f.a.createElement(
                                                    "pre",
                                                    { style: { margin: "0", lineHeight: "1.5" } },
                                                    ((t = a),
                                                        (n = r),
                                                        (t = t || 2) < 0
                                                            ? "> Quote\n- List item\n\t1. sub-bullet\n\t\tline2"
                                                            : (n
                                                                ? [
                                                                    "> Quote\n- List item\n  1. sub-bullet\n     line2",
                                                                    ">  Quote\n-  List item\n   1. sub-bullet\n      line2",
                                                                    ">   Quote\n-   List item\n    1.  sub-bullet\n        line2",
                                                                    ">    Quote\n-    List item\n     1.   sub-bullet\n          line2",
                                                                ]
                                                                : [
                                                                    "> Quote\n- List item\n  1. sub-bullet\n     line2",
                                                                    "> Quote\n- List item\n   1. sub-bullet\n      line2",
                                                                    "> Quote\n- List item\n    1. sub-bullet\n        line2",
                                                                    "> Quote\n- List item\n     1. sub-bullet\n          line2",
                                                                ])[(t || 2) - 2])
                                                )
                                            ),
                                        ],
                                    ],
                                })
                            )
                    );
                },
                q = function (e) {
                    var t = e.className,
                        n = e.rows,
                        a = e.style,
                        r = f.a.useContext(w.a);
                    return f.a.createElement(
                        "table",
                        { className: "label-input-group " + (t || ""), style: a },
                        f.a.createElement(
                            "tbody",
                            null,
                            n.map(function (e, t) {
                                var n = e[2] || e[0],
                                    a =
                                        r && "string" == typeof n && Object(w.c)(r, n)
                                            ? "search-hit"
                                            : "";
                                return 1 == e.length
                                    ? f.a.createElement(
                                        "tr",
                                        { key: t, className: a },
                                        f.a.createElement(
                                            "td",
                                            { colspan: "2" },
                                            "string" == typeof e[0] ? Object(v.a)(e[0]) : e[0]
                                        )
                                    )
                                    : f.a.createElement(
                                        "tr",
                                        { key: t, className: a },
                                        f.a.createElement(
                                            "td",
                                            null,
                                            "string" == typeof e[0] ? Object(v.a)(e[0]) : e[0]
                                        ),
                                        f.a.createElement("td", null, e[1]),
                                        e[2]
                                            ? 0 == e[2].indexOf("https:")
                                                ? f.a.createElement(k, { hintLink: e[2] })
                                                : f.a.createElement(k, { hint: e[2] })
                                            : null
                                    );
                            })
                        )
                    );
                },
                V = function () {
                    return f.a.createElement(
                        "header",
                        { className: "window-header" },
                        f.a.createElement(
                            "div",
                            { className: "window-header-content" },
                            f.a.createElement(
                                "div",
                                { className: "window-header-title" },
                                f.a.createElement(
                                    "button",
                                    {
                                        className: "window-header-back",
                                        onClick: window.Setting.close,
                                    },
                                    f.a.createElement(
                                        "span",
                                        { className: "icon" },
                                        f.a.createElement(h.b, null)
                                    )
                                ),
                                f.a.createElement("h2", null, Object(v.a)("Preferences"))
                            )
                        ),
                        f.a.createElement(
                            "button",
                            { className: "header-close", onClick: window.Setting.close },
                            f.a.createElement(
                                "span",
                                { className: "icon" },
                                f.a.createElement(h.c, null)
                            )
                        )
                    );
                },
                Q = function (e) {
                    return b.a.createPortal(
                        f.a.createElement(
                            "div",
                            { className: "modal-backdrop" },
                            f.a.createElement(
                                "div",
                                {
                                    className: "modal-content " + (e.className || ""),
                                    onKeyDown: e.onKeyDown,
                                },
                                f.a.createElement(
                                    "div",
                                    {
                                        className: "modal-icon",
                                        style: { display: "none", textAlign: "center" },
                                    },
                                    f.a.createElement("img", {
                                        src: "/icon.png",
                                        style: { width: "64px" },
                                    })
                                ),
                                void 0 === e.title
                                    ? null
                                    : f.a.createElement(
                                        "div",
                                        { className: "modal-title" },
                                        f.a.createElement("h3", null, Object(v.a)(e.title))
                                    ),
                                f.a.createElement(
                                    "div",
                                    { className: "modal-body" },
                                    e.children
                                ),
                                f.a.createElement(
                                    "div",
                                    { className: "modal-footer" },
                                    e.footer
                                        ? e.footer
                                        : f.a.createElement(
                                            "div",
                                            null,
                                            f.a.createElement(
                                                "button",
                                                {
                                                    className: "btn btn-primary",
                                                    onClick: e.closeAction,
                                                },
                                                Object(v.a)("OK")
                                            )
                                        )
                                )
                            )
                        ),
                        document.querySelector("#modal")
                    );
                },
                K = function (e) {
                    var t,
                        n = e.candidates,
                        i = e.value,
                        o = e.onChange,
                        l = e.placeholder,
                        s = Object(c.a)(e, [
                            "candidates",
                            "value",
                            "onChange",
                            "placeholder",
                        ]),
                        u = f.a.useState(!1),
                        d = Object(r.a)(u, 2),
                        m = d[0],
                        p = d[1],
                        b = f.a.useState(-1),
                        h = Object(r.a)(b, 2),
                        w = h[0],
                        g = h[1],
                        y = f.a.useState(!0),
                        O = Object(r.a)(y, 2),
                        j = O[0],
                        k = O[1],
                        x = f.a.useRef(null),
                        N = E()().Portal,
                        C = f.a.useRef(null),
                        L = n.filter(function (e) {
                            return !i || 0 == (e.key || e || "").indexOf(i.toLowerCase());
                        }),
                        S = f.a.useCallback(
                            function () {
                                return (
                                    (i = i || ""),
                                        f.a.createElement(
                                            "div",
                                            { ref: C, className: "input-autocomplete" },
                                            L.map(function (e, t) {
                                                var n = e.key || e,
                                                    a = e.label || e;
                                                return f.a.createElement(
                                                    "div",
                                                    {
                                                        className: "input-autocomplete-row ".concat(
                                                            t == w ? "active" : ""
                                                        ),
                                                        key: n,
                                                        onMouseDown: function (e) {
                                                            o(n), e.preventDefault(), e.stopPropagation(), z();
                                                        },
                                                        style: e.key
                                                            ? { borderBottom: "1px solid #aaa" }
                                                            : {},
                                                    },
                                                    a
                                                );
                                            })
                                        )
                                );
                            },
                            [L]
                        ),
                        M = function (e) {
                            g(-1), k(!0), o(e);
                        },
                        z = function () {
                            x.current && (x.current.select(), k(!1));
                        };
                    return (
                        f.a.useEffect(
                            function () {
                                if (m && C.current) {
                                    var e = x.current.getBoundingClientRect(),
                                        t = document.body.scrollTop;
                                    (C.current.style.top = e.bottom + 2 + t + "px"),
                                        (C.current.style.width = e.width + "px"),
                                        (C.current.style.left = e.left + "px");
                                }
                            },
                            [m, C.current]
                        ),
                            f.a.useEffect(
                                function () {
                                    if (!(w < 0) && C.current) {
                                        var e = C.current,
                                            t = e.children[w];
                                        if (t) {
                                            var n = e.scrollTop,
                                                a = t.offsetTop;
                                            (a > n + 180 - 8 || a + 30 < n + 8) && (e.scrollTop = a);
                                        }
                                    }
                                },
                                [w]
                            ),
                            f.a.createElement(
                                f.a.Fragment,
                                null,
                                f.a.createElement(
                                    "input",
                                    Object.assign(
                                        ((t = {
                                            spellcheck: !1,
                                            ref: x,
                                            type: "text",
                                            className: "ty-text-input",
                                            onFocus: function (e) {
                                                e.target.select(), p(!0), k(!0);
                                            },
                                            onBlur: function () {
                                                p(!1);
                                            },
                                            value: i || "",
                                        }),
                                            Object(a.a)(t, "type", "text"),
                                            Object(a.a)(t, "onChange", function (e) {
                                                return M(e.target.value);
                                            }),
                                            Object(a.a)(t, "placeholder", Object(v.a)(l || "")),
                                            Object(a.a)(t, "onKeyDown", function (e) {
                                                "Enter" === e.key
                                                    ? (w >= 0 && M(L[w]), k(!1))
                                                    : "Esc" === e.key
                                                        ? k(!1)
                                                        : "ArrowUp" === e.key
                                                            ? (g(w - 1 < 0 ? L.length - 1 : w - 1), k(!0))
                                                            : "ArrowDown" === e.key &&
                                                            (w + 1 > L.length ? g(0) : g(w + 1), k(!0));
                                            }),
                                            t),
                                        s
                                    )
                                ),
                                L.length && j && m ? f.a.createElement(N, null, S()) : null
                            )
                    );
                },
                U = function () {
                    return f.a.createElement(
                        f.a.Fragment,
                        null,
                        f.a.createElement(
                            "style",
                            null,
                            "\n      .backdrop {\n        position: absolute;\n        top: 122px;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        backdrop-filter: blur(5px);\n        -webkit-backdrop-filter: blur(5px);\n      }\n      \n      .backdrop .lds-spinner {\n        zoom: 0.8;\n        margin-top: 23vh;\n      }\n    "
                        ),
                        f.a.createElement(
                            "div",
                            { className: "backdrop" },
                            f.a.createElement(
                                "div",
                                { className: "lds-spinner" },
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null),
                                f.a.createElement("div", null)
                            )
                        )
                    );
                },
                G = function (e) {
                    var t = e.text,
                        n = e.link,
                        a = e.app,
                        r = "https://support.typora.io/".concat(n);
                    return (
                        a.getValue("useMirrorInCN") &&
                        (r = "https://support.typoraio.cn/".concat(n)),
                            f.a.createElement(
                                "div",
                                { className: "warning-panel" },
                                f.a.createElement(
                                    z,
                                    null,
                                    "\u26a0 ",
                                    f.a.createElement("span", null, Object(v.a)(t)),
                                    " ",
                                    f.a.createElement(
                                        "a",
                                        {
                                            style: { display: "inline-block", marginLeft: 16 },
                                            href: r,
                                        },
                                        Object(v.a)("Learn More\u2026")
                                    )
                                )
                            )
                    );
                };
        },
        23: function (e, t) {
            Object.values =
                Object.values ||
                function (e) {
                    return Object.keys(e).map(function (t) {
                        return e[t];
                    });
                };
        },
        27: function (e, t, n) {
            e.exports = n.p + "static/media/icon.06a6aa23.png";
        },
        31: function (e, t, n) {
            "use strict";
            var a = n(7),
                r = n.n(a),
                i = n(10),
                c = n(6),
                o = n(22),
                l = n(1),
                s = 0,
                u = {};
            (window.onMessageCallback = function (e) {
                var t = u[e.id];
                t && t.call(null, e.data), delete u[e.id];
            }),
                (window._options = Object(c.a)(
                    Object(c.a)({}, window._options),
                    {},
                    { fileSetting: {}, workspaceSetting: {} }
                ));
            var d = function () {
                    var e = /[?&]lang=([^&]+)/.exec(window.location.search);
                    return e
                        ? e[1]
                        : window._options.userLocale || window._options.locale;
                },
                m = function (e) {
                    for (
                        var t = window.require("electron"),
                            n = t.ipcRenderer,
                            a = arguments.length,
                            r = new Array(a > 1 ? a - 1 : 0),
                            i = 1;
                        i < a;
                        i++
                    )
                        r[i - 1] = arguments[i];
                    return n.invoke.apply(null, [e].concat(r));
                },
                f = function (e, t, n) {
                    s++,
                    n && (u[s] = n),
                    window.webkit &&
                    window.webkit.messageHandlers._setting.postMessage({
                        name: e,
                        data: t,
                        id: s + "",
                    });
                };
            (window.Setting = {
                close: function () {
                    window.isNode ? window.close() : window.Setting.invoke("close");
                },
                quit: function () {
                    window.Setting.invoke("quit");
                },
                fileSetting: function () {
                    return window._options.fileSetting;
                },
                workspaceSetting: function () {
                    return window._options.workspaceSetting;
                },
                openLink: function (e) {
                    window.webkit
                        ? f("openLink", e)
                        : window.isNode
                            ? m("shell.openExternal", e)
                            : window.open(e);
                },
                put: function (e, t) {
                    window.webkit
                        ? f("put", { key: e, value: t })
                        : window.isNode && m("setting.put", e, t);
                },
                get: function (e) {
                    window.webkit ? f("get", e) : window.isNode && m("setting.get", e);
                },
                invoke: function (e) {
                    for (
                        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1;
                        a < t;
                        a++
                    )
                        n[a - 1] = arguments[a];
                    if (window.isNode) return m.apply(null, [e].concat(n));
                    window.webkit && f(e, n[0]);
                },
                invokeWithCallback: function (e) {
                    for (
                        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1;
                        a < t;
                        a++
                    )
                        n[a - 1] = arguments[a];
                    return window.isNode
                        ? m.apply(null, [e].concat(n))
                        : window.webkit
                            ? new Promise(function (t) {
                                f(e, n[0] || null, t);
                            })
                            : void 0;
                },
                confirm: (function () {
                    var e = Object(i.a)(
                        r.a.mark(function e(t) {
                            var n, a;
                            return r.a.wrap(function (e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            if (window.isNode) {
                                                e.next = 2;
                                                break;
                                            }
                                            return e.abrupt("return", window.confirm(t));
                                        case 2:
                                            return (
                                                (e.next = 4),
                                                    m("dialog.showMessageBox", {
                                                        title: Object(l.a)("Confirm", "Panel"),
                                                        message: t,
                                                        type: "question",
                                                        defaultId: 0,
                                                        cancelId: 1,
                                                        buttons: [
                                                            Object(l.a)("Continue Activation"),
                                                            Object(l.a)("Cancel"),
                                                        ],
                                                    })
                                            );
                                        case 4:
                                            return (
                                                (n = e.sent),
                                                    (a = n.response),
                                                    e.abrupt("return", 0 == a)
                                            );
                                        case 7:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    );
                    return function (t) {
                        return e.apply(this, arguments);
                    };
                })(),
                showMessageBox: (function () {
                    var e = Object(i.a)(
                        r.a.mark(function e(t) {
                            var n, a;
                            return r.a.wrap(function (e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            if (window.isNode) {
                                                e.next = 2;
                                                break;
                                            }
                                            return e.abrupt("return", window.confirm(t));
                                        case 2:
                                            return (
                                                (e.next = 4),
                                                    m("dialog.showMessageBox", {
                                                        title: Object(l.a)("Confirm", "Panel"),
                                                        message: t,
                                                        type: "question",
                                                        defaultId: 0,
                                                        cancelId: 1,
                                                        buttons: [
                                                            Object(l.a)("Learn More\u2026", "Front"),
                                                            Object(l.a)("Cancel", "Front"),
                                                        ],
                                                    })
                                            );
                                        case 4:
                                            return (
                                                (n = e.sent),
                                                    (a = n.response),
                                                    e.abrupt("return", 0 == a)
                                            );
                                        case 7:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    );
                    return function (t) {
                        return e.apply(this, arguments);
                    };
                })(),
                machineCode: (function () {
                    var e = Object(i.a)(
                        r.a.mark(function e() {
                            return r.a.wrap(function (e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            if (!window.isNode && !window.webkit) {
                                                e.next = 6;
                                                break;
                                            }
                                            return (
                                                (e.next = 3),
                                                    window.Setting.invokeWithCallback("license.machineCode")
                                            );
                                        case 3:
                                            return e.abrupt("return", e.sent);
                                        case 6:
                                            return e.abrupt("return", "SAMPLE_MACHINE_CODE");
                                        case 7:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    );
                    return function () {
                        return e.apply(this, arguments);
                    };
                })(),
                activate: (function () {
                    var e = Object(i.a)(
                        r.a.mark(function e(t, n) {
                            var a;
                            return r.a.wrap(function (e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            if (
                                                ((t = (t || "").trim().replace(/\u200b/g, "")),
                                                    (n = (n || "").trim().replace(/\u200b/g, "")),
                                                !window.isNode && !window.webkit)
                                            ) {
                                                e.next = 19;
                                                break;
                                            }
                                            return (
                                                (e.next = 5),
                                                    window.Setting.invokeWithCallback("addLicense", {
                                                        email: t,
                                                        license: n,
                                                        force: !1,
                                                    })
                                            );
                                        case 5:
                                            if ("confirm" != (a = e.sent)[0]) {
                                                e.next = 16;
                                                break;
                                            }
                                            return (
                                                (e.next = 9), window.Setting.confirm(Object(l.a)(a[1]))
                                            );
                                        case 9:
                                            if (!e.sent) {
                                                e.next = 15;
                                                break;
                                            }
                                            return (
                                                (e.next = 12),
                                                    window.Setting.invokeWithCallback("addLicense", {
                                                        email: t,
                                                        license: n,
                                                        force: !0,
                                                    })
                                            );
                                        case 12:
                                            return e.abrupt("return", e.sent);
                                        case 15:
                                            return e.abrupt("return", [!1, " "]);
                                        case 16:
                                            return e.abrupt("return", a);
                                        case 19:
                                            return (
                                                console.debug("in browser"),
                                                    e.abrupt(
                                                        "return",
                                                        new Promise(function (e) {
                                                            setTimeout(function () {
                                                                e(
                                                                    "2@test.com" == t
                                                                        ? [
                                                                            !0,
                                                                            "Your license has exceeded the max devices numbers.\nThe oldest device was unregistered automatically.",
                                                                        ]
                                                                        : "1@test.com" == t
                                                                            ? [!0, ""]
                                                                            : [!1, "License is invalid"]
                                                                );
                                                            }, 3e3);
                                                        })
                                                    )
                                            );
                                        case 21:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    );
                    return function (t, n) {
                        return e.apply(this, arguments);
                    };
                })(),
                execCommand: function (e) {
                    window.Setting.invoke(
                        window.webkit ? "execCommand" : "execForAll",
                        e.toString()
                    );
                },
            }),
            window.fetch || (window.fetch = o.a),
            window.isUnibody && document.body.classList.add("unibody-window"),
            window.isWin && document.body.classList.add("os-windows"),
                document.addEventListener("contextmenu", function (e) {
                    "INPUT" != e.target.tagName &&
                    (e.preventDefault(), e.stopPropagation());
                }),
                document.addEventListener("click", function (e) {
                    "A" == e.target.tagName &&
                    e.target.href.match(/^http/) &&
                    (window.Setting.openLink(e.target.href),
                        e.preventDefault(),
                        e.stopPropagation());
                }),
                (window.loadDict = (function () {
                    var e = Object(i.a)(
                        r.a.mark(function e(t) {
                            var n;
                            return r.a.wrap(
                                function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (e.prev = 0),
                                                        (n = d()),
                                                        (e.next = 4),
                                                        fetch("../locales/" + n + ".lproj/Welcome.json")
                                                );
                                            case 4:
                                                return (e.next = 6), e.sent.json();
                                            case 6:
                                                (window.Dict.Welcome = e.sent),
                                                    t(),
                                                    Promise.all([
                                                        fetch("../locales/" + n + ".lproj/Front.json"),
                                                        fetch("../locales/" + n + ".lproj/Menu.json"),
                                                        fetch("../locales/" + n + ".lproj/Panel.json"),
                                                    ])
                                                        .then(function (e) {
                                                            return Promise.all(
                                                                e.map(function (e) {
                                                                    return e.json();
                                                                })
                                                            );
                                                        })
                                                        .then(function (e) {
                                                            (window.Dict.Front = e[0]),
                                                                (window.Dict.Menu = e[1]),
                                                                (window.Dict.Panel = e[2]),
                                                                t();
                                                        }),
                                                    (e.next = 14);
                                                break;
                                            case 11:
                                                (e.prev = 11), (e.t0 = e.catch(0)), console.log(e.t0);
                                            case 14:
                                            case "end":
                                                return e.stop();
                                        }
                                },
                                e,
                                null,
                                [[0, 11]]
                            );
                        })
                    );
                    return function (t) {
                        return e.apply(this, arguments);
                    };
                })());
            var p = {
                Front: {},
                Menu: {},
                Panel: {},
                Welcome: {},
                get: function (e, t) {
                    return p[t || "Welcome"][e] || e;
                },
            };
            window.Dict = p;
        },
        4: function (e, t, n) {
            "use strict";
            n.d(t, "c", function () {
                return m;
            }),
                n.d(t, "d", function () {
                    return f;
                }),
                n.d(t, "a", function () {
                    return s;
                }),
                n.d(t, "b", function () {
                    return p;
                });
            var a = n(5),
                r = n(21),
                i = n(0),
                c = n.n(i),
                o = n(1),
                l = n(13),
                s = c.a.createContext(""),
                u = null,
                d = function (e, t) {
                    return (
                        u && (clearTimeout(u), (u = null)),
                            (u = setTimeout(function () {
                                (u = null), t(e);
                            }, 100)),
                            e
                    );
                },
                m = function (e, t, n) {
                    if (!e || !t) return !1;
                    if (t.toLowerCase().indexOf(e.toLowerCase()) > -1) return !0;
                    if (
                        "Base" !== (window.Setting.locale() || "Base") &&
                        Object(o.a)(t, n).toLowerCase().indexOf(e.toLowerCase()) > -1
                    )
                        return !0;
                    return !1;
                },
                f = function (e, t, n) {
                    if (!e) return !1;
                    var a,
                        i = Object(r.a)(t);
                    try {
                        for (i.s(); !(a = i.n()).done; ) {
                            var c = a.value;
                            if (m(e, c, n)) return !0;
                        }
                    } catch (o) {
                        i.e(o);
                    } finally {
                        i.f();
                    }
                    return !1;
                },
                p = function (e) {
                    var t = e.onSearch,
                        n = c.a.useRef(null),
                        r = c.a.useState(
                            (Object(l.a)(
                                window.isMac ? "command+f" : "ctrl+f",
                                function (e, t) {
                                    e.preventDefault(), window.searchOnPreferencePanel();
                                }
                            ),
                                "")
                        ),
                        i = Object(a.a)(r, 2),
                        s = i[0],
                        u = i[1];
                    return (
                        (window.searchOnPreferencePanel = function () {
                            n.current && (n.current.focus(), n.current.select());
                        }),
                            c.a.createElement(
                                "div",
                                {
                                    style: { position: "relative" },
                                    className: s ? " show-clear-icon" : "",
                                },
                                c.a.createElement("input", {
                                    ref: n,
                                    className: "search-input",
                                    type: "search",
                                    placeholder: Object(o.a)("Search for\u2026", "Panel"),
                                    value: s,
                                    onChange: function (e) {
                                        u(d(e.target.value, t));
                                    },
                                }),
                                c.a.createElement("span", {
                                    className: "clear-btn-icon icon icon-cancel-circled",
                                    onMouseDown: function (e) {
                                        u(d("", t)), e.preventDefault(), e.stopPropagation();
                                    },
                                })
                            )
                    );
                };
        },
        56: function (e, t, n) {
            e.exports = n(60);
        },
        57: function (e, t, n) {},
        60: function (e, t, n) {
            "use strict";
            n.r(t);
            var a = n(0),
                r = n.n(a),
                i = n(9),
                c = n.n(i),
                o = (n(23), n(31), n(7)),
                l = n.n(o),
                s = n(10),
                u = n(3),
                d = n(5),
                m = (n(57), n(2)),
                f = n(8),
                p = n(27),
                b = n.n(p),
                h = n(26),
                v = n(1),
                w = function (e) {
                    var t = e.header1,
                        n = e.header2,
                        a = e.message;
                    return r.a.createElement(
                        r.a.Fragment,
                        null,
                        r.a.createElement("img", { className: "logo", src: b.a }),
                        r.a.createElement("h2", { className: "header-title" }, t),
                        r.a.createElement("p", {
                            className: "header-desc",
                            dangerouslySetInnerHTML: { __html: n },
                        }),
                        a
                            ? r.a.createElement("p", {
                                className: "header-msg",
                                dangerouslySetInnerHTML: { __html: a },
                            })
                            : null
                    );
                },
                g = function (e) {
                    var t = e.token,
                        n = e.setToken,
                        a = e.onOfflineActivation,
                        i = r.a.useState("fetching..."),
                        c = Object(d.a)(i, 2),
                        o = c[0],
                        l = c[1],
                        s = r.a.useState(!1),
                        u = Object(d.a)(s, 2),
                        m = u[0],
                        f = u[1];
                    r.a.useEffect(function () {
                        window.Setting.machineCode().then(l);
                    }, []);
                    return r.a.createElement(
                        "div",
                        { className: "license-form" },
                        r.a.createElement(
                            "div",
                            { className: "l-input-row" },
                            r.a.createElement(
                                "label",
                                { htmlFor: "code" },
                                Object(v.a)("Machine Code")
                            ),
                            r.a.createElement("input", {
                                type: "text",
                                id: "code",
                                style: { paddingRight: 70 },
                                value: o || "ADVFDFCEWEDDEDFFDFDE",
                                readOnly: !0,
                                tabIndex: 1,
                                placeholder: Object(v.a)("Machine Code"),
                            }),
                            r.a.createElement(
                                "button",
                                {
                                    className: "input-float-button",
                                    onClick: function () {
                                        m ||
                                        (f(!0),
                                            setTimeout(function () {
                                                f(!1);
                                            }, 1e3)),
                                            navigator.clipboard.writeText(o);
                                    },
                                },
                                m ? Object(v.a)("Copied") : Object(v.a)("Copy")
                            )
                        ),
                        r.a.createElement(
                            "div",
                            { className: "l-input-row" },
                            r.a.createElement(
                                "label",
                                { htmlFor: "token" },
                                Object(v.a)("Activation Token")
                            ),
                            r.a.createElement("textarea", {
                                style: {
                                    lineHeight: 1.2,
                                    fontFamily: "inherit",
                                    padding: 8,
                                    height: 64,
                                    resize: "none",
                                },
                                type: "text",
                                id: "token",
                                value: t || "",
                                tabIndex: 2,
                                placeholder: Object(v.a)("Activation Token"),
                                onChange: function (e) {
                                    var t = e.target.value;
                                    n(t), "+" == t[0] && "#" == t[t.length - 1] && a(t);
                                },
                            })
                        )
                    );
                },
                E = function (e) {
                    var t = e.editable,
                        n = e.email,
                        a = e.email2,
                        i = e.license,
                        c = e.onChangeEmail,
                        o = e.onChangeEmail2,
                        l = e.onChangeLicense,
                        s = e.error,
                        m = e.onActivation,
                        p = e.jumpToOfflinePage,
                        b =
                            (Object(u.a)(e, [
                                "editable",
                                "email",
                                "email2",
                                "license",
                                "onChangeEmail",
                                "onChangeEmail2",
                                "onChangeLicense",
                                "error",
                                "onActivation",
                                "jumpToOfflinePage",
                            ]),
                                r.a.useCallback(
                                    function (e) {
                                        null !== e && t && e.focus();
                                    },
                                    [t]
                                )),
                        h = r.a.useCallback(
                            function (e) {
                                c(e.target.value);
                            },
                            [c]
                        ),
                        w = r.a.useCallback(
                            function (e) {
                                o(e.target.value);
                            },
                            [o]
                        ),
                        g = r.a.useCallback(
                            function (e) {
                                l(e.target.value);
                            },
                            [l]
                        ),
                        E = r.a.useState(s),
                        y = Object(d.a)(E, 2),
                        O = y[0],
                        j = y[1];
                    r.a.useEffect(
                        function () {
                            j(!!s);
                        },
                        [s]
                    );
                    var k = r.a.useRef(null),
                        x = r.a.useRef(null),
                        N = r.a.useState(!0),
                        C = Object(d.a)(N, 2),
                        L = C[0],
                        S = C[1],
                        M = i;
                    return (
                        t ||
                        L ||
                        (M =
                            i.substr(0, 3) +
                            "***-******-******-***" +
                            i.substr(i.length - 3)),
                            r.a.createElement(
                                "div",
                                {
                                    className: "license-form "
                                        .concat(O ? "has-error" : "", " ")
                                        .concat(t ? "editable" : "readonly"),
                                },
                                r.a.createElement(
                                    "div",
                                    { className: "l-input-row" },
                                    r.a.createElement(
                                        "label",
                                        { htmlFor: "email" },
                                        Object(v.a)("Email")
                                    ),
                                    r.a.createElement("input", {
                                        type: "text",
                                        id: "email",
                                        ref: b,
                                        value: (function (e) {
                                            if (t) return e;
                                            try {
                                                return e
                                                    .split("@")
                                                    .map(function (e, t) {
                                                        return 0 == t
                                                            ? e.length < 3
                                                                ? e
                                                                : (function (e) {
                                                                    var t = Math.min(Math.round(e.length / 4), 2),
                                                                        n = e.length - 1;
                                                                    return (
                                                                        e.substr(0, t) +
                                                                        "*".repeat(n - t) +
                                                                        e.substr(n)
                                                                    );
                                                                })(e)
                                                            : e.replace(/(.+)\./, function (e, t) {
                                                                return (
                                                                    t.substr(0, 1) +
                                                                    "*".repeat(t.length - 1) +
                                                                    "."
                                                                );
                                                            });
                                                    })
                                                    .join("@");
                                            } catch (n) {
                                                return e;
                                            }
                                        })(n || ""),
                                        onChange: h,
                                        onInput: function () {
                                            j(!1);
                                        },
                                        readOnly: !t,
                                        tabIndex: 1,
                                        onKeyDown: function (e) {
                                            "Enter" == e.key && (x.current.focus(), x.current.select());
                                        },
                                        placeholder: Object(v.a)("Email Address"),
                                    })
                                ),
                                r.a.createElement(
                                    "div",
                                    { className: "l-input-row", id: "email2-input-row" },
                                    r.a.createElement(
                                        "label",
                                        { htmlFor: "email2" },
                                        Object(v.a)("Re-enter Email")
                                    ),
                                    r.a.createElement("input", {
                                        type: "text",
                                        id: "email2",
                                        ref: x,
                                        value: a || "",
                                        onChange: w,
                                        onPaste: function (e) {
                                            e.preventDefault();
                                        },
                                        onInput: function () {
                                            j(!1);
                                        },
                                        tabIndex: 2,
                                        onKeyDown: function (e) {
                                            "Enter" == e.key && (k.current.focus(), k.current.select());
                                        },
                                        placeholder: Object(v.a)("Re-enter Email"),
                                    })
                                ),
                                r.a.createElement(
                                    "div",
                                    { className: "l-input-row" },
                                    r.a.createElement(
                                        "label",
                                        { htmlFor: "license" },
                                        Object(v.a)("License Code")
                                    ),
                                    r.a.createElement("input", {
                                        ref: k,
                                        type: "text",
                                        id: "license",
                                        value: M || "",
                                        onChange: g,
                                        onInput: function () {
                                            j(!1);
                                        },
                                        readOnly: !t,
                                        tabIndex: 3,
                                        onKeyDown: function (e) {
                                            "Enter" == e.key && m();
                                        },
                                        placeholder: Object(v.a)("License Code"),
                                    }),
                                    t || L
                                        ? null
                                        : r.a.createElement(
                                            "button",
                                            {
                                                className: "input-float-button show-code-button",
                                                onClick: function () {
                                                    S(!0);
                                                },
                                            },
                                            Object(v.a)("Show")
                                        )
                                ),
                                r.a.createElement(
                                    "div",
                                    { className: "l-msg-row" },
                                    s
                                        ? r.a.createElement(
                                            "span",
                                            { className: "l-error-msg" },
                                            r.a.createElement(f.e, {
                                                style: {
                                                    width: 12,
                                                    fill: "currentColor",
                                                    marginRight: 4,
                                                    marginBottom: -1,
                                                },
                                            }),
                                            Object(v.a)(s)
                                        )
                                        : null,
                                    t
                                        ? r.a.createElement(
                                            "a",
                                            {
                                                className: "l-help",
                                                href: "https://store.typora.io/#faq",
                                                tabIndex: 4,
                                            },
                                            ""
                                                .concat(Object(v.a)("Help"), " / ")
                                                .concat(Object(v.a)("Find my License"))
                                        )
                                        : r.a.createElement(
                                            "a",
                                            {
                                                className: "l-help",
                                                href: "https://store.typora.io/#faq",
                                                tabIndex: 3,
                                            },
                                            Object(v.a)("Help")
                                        ),
                                    t
                                        ? r.a.createElement(
                                            "a",
                                            {
                                                className: "l-help",
                                                href: "#",
                                                style: { marginRight: 16 },
                                                onMouseDown: function (e) {
                                                    e.preventDefault(), e.stopPropagation(), p();
                                                },
                                                tabIndex: 3,
                                            },
                                            Object(v.a)("Offline Activation")
                                        )
                                        : null
                                )
                            )
                    );
                },
                y = function (e) {
                    var t = e.dayRemains,
                        n = e.quitOnClose,
                        a = e.needLicense,
                        i = Object(u.a)(e, ["dayRemains", "quitOnClose", "needLicense"]),
                        c = r.a.useState(i.index),
                        o = Object(d.a)(c, 2),
                        f = o[0],
                        p = o[1],
                        b = r.a.useState(i.hasActivated),
                        y = Object(d.a)(b, 2),
                        O = y[0],
                        j = y[1],
                        k = r.a.useState(i.email || ""),
                        x = Object(d.a)(k, 2),
                        N = x[0],
                        C = x[1],
                        L = r.a.useState(i.email || ""),
                        S = Object(d.a)(L, 2),
                        M = S[0],
                        z = S[1],
                        D = r.a.useState(i.license || ""),
                        T = Object(d.a)(D, 2),
                        P = T[0],
                        A = T[1],
                        I = r.a.useState(i.type || ""),
                        F = Object(d.a)(I, 2),
                        H = F[0],
                        B = F[1],
                        R = r.a.useState(""),
                        _ = Object(d.a)(R, 2),
                        W = _[0],
                        q = _[1],
                        V = r.a.useState(!1),
                        Q = Object(d.a)(V, 2),
                        K = Q[0],
                        U = Q[1],
                        G = r.a.useState(""),
                        J = Object(d.a)(G, 2),
                        $ = J[0],
                        Y = J[1];
                    a || (n = !1), n && (window.isLinux || t > 0) && (n = !1);
                    var X = r.a.useRef(0 == f && O);
                    r.a.useEffect(
                        function () {
                            if (((X.current = 0 == f && O), X.current)) {
                                var e = ["#bb0000", "#ffffff"];
                                window.matchMedia &&
                                window.matchMedia("(prefers-color-scheme: dark)").matches &&
                                (e = ["#f78ae0", "blue"]);
                                var t = Date.now() + 3e3;
                                !(function n() {
                                    Object(h.a)({
                                        particleCount: 1,
                                        angle: 60,
                                        spread: 65,
                                        decay: 0.84,
                                        origin: { x: 0 },
                                        colors: e,
                                    }),
                                        Object(h.a)({
                                            particleCount: 1,
                                            angle: 120,
                                            spread: 65,
                                            origin: { x: 1 },
                                            colors: e,
                                        }),
                                    Date.now() < t && X.current && requestAnimationFrame(n);
                                })();
                            }
                        },
                        [O, f, X]
                    );
                    var Z = (function () {
                            var e = Object(s.a)(
                                l.a.mark(function e() {
                                    var t, n, a, r;
                                    return l.a.wrap(function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (!K) {
                                                        e.next = 2;
                                                        break;
                                                    }
                                                    return e.abrupt("return");
                                                case 2:
                                                    if (N == M) {
                                                        e.next = 5;
                                                        break;
                                                    }
                                                    return (
                                                        q("Email address confirmation does not match."),
                                                            e.abrupt("return")
                                                    );
                                                case 5:
                                                    if ("crack@example.com" != N) {
                                                        e.next = 9;
                                                        break;
                                                    }
                                                    return (
                                                        U(!0),
                                                            setTimeout(function () {
                                                                U(!1), q("Please input a valid license code");
                                                            }, 5e3),
                                                            e.abrupt("return")
                                                    );
                                                case 9:
                                                    return (
                                                        console.debug("setLoading true"),
                                                            U(!0),
                                                            (e.next = 13),
                                                            window.Setting.activate(N, P)
                                                    );
                                                case 13:
                                                    (t = e.sent),
                                                        (n = Object(d.a)(t, 2)),
                                                        (a = n[0]),
                                                        (r = n[1]),
                                                        console.debug("setLoading false"),
                                                        U(!1),
                                                        a ? (q(r), j(!0), p(0)) : q(r || "Unknown Error");
                                                case 20:
                                                case "end":
                                                    return e.stop();
                                            }
                                    }, e);
                                })
                            );
                            return function () {
                                return e.apply(this, arguments);
                            };
                        })(),
                        ee = (function () {
                            var e = Object(s.a)(
                                l.a.mark(function e(t) {
                                    var n, a, r, i, c, o, s, u, m, f, b;
                                    return l.a.wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if ("+" == t[0] || "#" == t[t.length - 1]) {
                                                            e.next = 2;
                                                            break;
                                                        }
                                                        return e.abrupt("return");
                                                    case 2:
                                                        (t = t.substr(1, t.length - 2)),
                                                            (e.prev = 3),
                                                        window.webkit &&
                                                        ((n = t.split("|") || ["", ""]),
                                                            (a = Object(d.a)(n, 2)),
                                                            (r = a[0]),
                                                            (i = a[1]),
                                                            ((c = JSON.parse(window.atob(r))).sig = i),
                                                            (t = JSON.stringify(c))),
                                                            (e.next = 11);
                                                        break;
                                                    case 7:
                                                        return (
                                                            (e.prev = 7),
                                                                (e.t0 = e.catch(3)),
                                                                window.alert("Invalid Activation Token"),
                                                                e.abrupt("return")
                                                        );
                                                    case 11:
                                                        return (
                                                            U(!0),
                                                                (e.next = 14),
                                                                window.Setting.invokeWithCallback(
                                                                    "offlineActivation",
                                                                    t
                                                                )
                                                        );
                                                    case 14:
                                                        (o = e.sent),
                                                            (s = Object(d.a)(o, 4)),
                                                            (u = s[0]),
                                                            (m = s[1]),
                                                            (f = s[2]),
                                                            (b = s[3]),
                                                            U(!1),
                                                            u
                                                                ? (q(m), j(!0), p(0), C(f), A(b), B("off"))
                                                                : (window.alert("Invalid Activation Token"),
                                                                    q(m || "Unknown Error"));
                                                    case 22:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        },
                                        e,
                                        null,
                                        [[3, 7]]
                                    );
                                })
                            );
                            return function (t) {
                                return e.apply(this, arguments);
                            };
                        })(),
                        te = (function () {
                            var e = Object(s.a)(
                                l.a.mark(function e() {
                                    return l.a.wrap(function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (!K) {
                                                        e.next = 2;
                                                        break;
                                                    }
                                                    return e.abrupt("return");
                                                case 2:
                                                    if (
                                                        window.confirm(
                                                            Object(v.a)(
                                                                "Are you sure to deactivate Typora on this device?"
                                                            )
                                                        )
                                                    ) {
                                                        e.next = 4;
                                                        break;
                                                    }
                                                    return e.abrupt("return");
                                                case 4:
                                                    return (
                                                        q(""),
                                                            U(!0),
                                                            (e.next = 8),
                                                            window.Setting.invokeWithCallback("removeLicense")
                                                    );
                                                case 8:
                                                    if (!e.sent) {
                                                        e.next = 16;
                                                        break;
                                                    }
                                                    U(!1), j(!1), C(""), z(""), p(0), (e.next = 18);
                                                    break;
                                                case 16:
                                                    U(!1),
                                                    "off" == H &&
                                                    (window.alert(
                                                        Object(v.a)(
                                                            "Failed to deactivate via network connection, please follow the instructions to deactivate this device."
                                                        )
                                                    ),
                                                        window.Setting.openLink(
                                                            "https://support.typora.io/activation/#deactivate-from-web-ui"
                                                        ));
                                                case 18:
                                                case "end":
                                                    return e.stop();
                                            }
                                    }, e);
                                })
                            );
                            return function () {
                                return e.apply(this, arguments);
                            };
                        })(),
                        ne = Object(v.a)(O ? "Typora Activated" : "Activate Typora"),
                        ae = "";
                    f > 0
                        ? O
                            ? ((ne = Object(v.a)("Your Typora License")),
                                (ae = Object(v.a)(
                                    "This copy of Typora is registered with license information below."
                                )))
                            : (ae = Object(v.a)(
                                "Already purchased a license? Fill the form below and activate Typora instantly."
                            ))
                        : (ae = O
                            ? '<span style="margin-top:8px;display: inline-block;">'.concat(
                                Object(v.a)("Thanks for your purchase."),
                                "</span>"
                            )
                            : "false" != a
                                ? Object(v.a)("Your trial will be expired in %@ days.").replace(
                                    "%@",
                                    '<span class="count-down">'.concat(t || 0, "</span>")
                                )
                                : Object(v.a)(
                                    "Enter a license code to support our development \u2764"
                                ));
                    var re = null;
                    if (O) {
                        var ie = null;
                        (ie =
                            0 == f
                                ? r.a.createElement(
                                    "button",
                                    {
                                        className: "default-btn primary-btn",
                                        onClick: function () {
                                            p(1);
                                        },
                                        tabIndex: 7,
                                    },
                                    Object(v.a)("View License")
                                )
                                : r.a.createElement(
                                    "button",
                                    {
                                        className: "default-btn primary-btn",
                                        style: { visibility: "hidden" },
                                        tabIndex: 7,
                                    },
                                    Object(v.a)("View License")
                                )),
                            (re = r.a.createElement(
                                "div",
                                { className: "footer" },
                                r.a.createElement(
                                    "div",
                                    { className: "footer-left" },
                                    r.a.createElement(
                                        "button",
                                        {
                                            className: "default-btn secondary-btn",
                                            onClick: function () {
                                                window.Setting.close();
                                            },
                                            tabIndex: 5,
                                        },
                                        Object(v.a)("Close")
                                    )
                                ),
                                r.a.createElement(
                                    "div",
                                    { className: "footer-right" },
                                    r.a.createElement(
                                        "button",
                                        {
                                            className: "default-btn dangerous-btn",
                                            tabIndex: 6,
                                            onClick: te,
                                        },
                                        Object(v.a)("Deactivate")
                                    ),
                                    ie
                                )
                            ));
                    } else {
                        var ce = null;
                        (ce = f
                            ? r.a.createElement(
                                "button",
                                {
                                    className: "default-btn primary-btn",
                                    onClick: Z,
                                    tabIndex: 6,
                                },
                                Object(v.a)("Activate")
                            )
                            : r.a.createElement(
                                "button",
                                {
                                    className: "default-btn primary-btn",
                                    onClick: function () {
                                        p(1);
                                    },
                                    tabIndex: 6,
                                },
                                Object(v.a)("Enter License")
                            )),
                            (re = r.a.createElement(
                                "div",
                                { className: "footer" },
                                r.a.createElement(
                                    "div",
                                    { className: "footer-left" },
                                    r.a.createElement(
                                        "button",
                                        {
                                            className: "default-btn secondary-btn",
                                            onClick: Object(s.a)(
                                                l.a.mark(function e() {
                                                    return l.a.wrap(function (e) {
                                                        for (;;)
                                                            switch ((e.prev = e.next)) {
                                                                case 0:
                                                                    return (
                                                                        (e.next = 2),
                                                                            window.Setting.get("useMirrorInCN")
                                                                    );
                                                                case 2:
                                                                    if (!e.sent) {
                                                                        e.next = 6;
                                                                        break;
                                                                    }
                                                                    window.Setting.openLink(
                                                                        "https://typoraio.cn/?gopurchase"
                                                                    ),
                                                                        (e.next = 7);
                                                                    break;
                                                                case 6:
                                                                    window.Setting.openLink(
                                                                        "https://store.typora.io"
                                                                    );
                                                                case 7:
                                                                case "end":
                                                                    return e.stop();
                                                            }
                                                    }, e);
                                                })
                                            ),
                                            tabIndex: 4,
                                        },
                                        Object(v.a)("Buy License")
                                    ),
                                    r.a.createElement(
                                        "button",
                                        {
                                            className: "text-btn",
                                            onClick: function () {
                                                window.isNode || window.webkit
                                                    ? n
                                                        ? window.Setting.quit()
                                                        : window.Setting.close()
                                                    : p(0);
                                            },
                                            tabIndex: 5,
                                        },
                                        n
                                            ? Object(v.a)("Quit Typora", "Menu")
                                            : Object(v.a)("Not Now")
                                    )
                                ),
                                r.a.createElement("div", { className: "footer-right" }, ce)
                            ));
                    }
                    var oe = null;
                    return (
                        2 == f
                            ? ((oe = r.a.createElement(g, {
                                token: $,
                                setToken: Y,
                                onOfflineActivation: ee,
                            })),
                                (re = r.a.createElement(
                                    "div",
                                    { className: "footer" },
                                    r.a.createElement(
                                        "div",
                                        { className: "footer-left" },
                                        r.a.createElement(
                                            "button",
                                            {
                                                className: "default-btn secondary-btn",
                                                onClick: function () {
                                                    window.Setting.openLink(
                                                        "https://store.typora.io/offline"
                                                    );
                                                },
                                                tabIndex: 4,
                                            },
                                            Object(v.a)("Get Activation Token")
                                        ),
                                        r.a.createElement(
                                            "button",
                                            {
                                                className: "text-btn",
                                                onClick: function () {
                                                    p(0);
                                                },
                                                tabIndex: 5,
                                            },
                                            Object(v.a)("Back")
                                        )
                                    ),
                                    r.a.createElement(
                                        "div",
                                        { className: "footer-right" },
                                        r.a.createElement(
                                            "button",
                                            {
                                                className: "default-btn primary-btn",
                                                onClick: function (e) {
                                                    return ee($);
                                                },
                                                tabIndex: 6,
                                            },
                                            Object(v.a)("Activate")
                                        )
                                    )
                                )))
                            : f > 0 &&
                            (oe = r.a.createElement(E, {
                                editable: !O,
                                email: N,
                                email2: M,
                                license: P,
                                onChangeEmail: C,
                                onChangeEmail2: z,
                                onChangeLicense: A,
                                error: !O && W,
                                onActivation: Z,
                                jumpToOfflinePage: function () {
                                    p(2);
                                },
                            })),
                            r.a.createElement(
                                "div",
                                { className: "page stage-".concat(f) },
                                r.a.createElement(
                                    "div",
                                    { className: "header" },
                                    r.a.createElement(w, {
                                        header1: ne,
                                        header2: ae,
                                        message: !f && O && Object(v.a)(W || ""),
                                    })
                                ),
                                r.a.createElement("div", { className: "body" }, oe),
                                re,
                                K ? r.a.createElement(m.a, null) : null
                            )
                    );
                },
                O = (function () {
                    var e = {};
                    return (
                        window.location.search
                            .substr(1)
                            .split("&")
                            .forEach(function (t) {
                                e[t.split("=")[0]] = t.split("=")[1];
                            }),
                            (e.hasActivated = "true" == e.hasActivated),
                            (e.index = isNaN(e.index - 0) ? 0 : e.index - 0),
                            e
                    );
                })(),
                j = function () {
                    console.debug("render...");
                    !(function () {
                        var e = document.getElementById("root");
                        c.a.render(
                            r.a.createElement(y, Object.assign({}, window._options, O)),
                            e,
                            function () {
                                e.setAttribute("style", "");
                            }
                        );
                    })();
                };
            if (window.isMac || window.isNode) {
                var k = !1;
                window.loadDict(function () {
                    (k = !0), j();
                }),
                    setTimeout(function () {
                        !k && j();
                    }, 1e3);
            } else window.isNode || j();
        },
        8: function (e, t, n) {
            "use strict";
            n.d(t, "i", function () {
                return i;
            }),
                n.d(t, "c", function () {
                    return c;
                }),
                n.d(t, "b", function () {
                    return o;
                }),
                n.d(t, "k", function () {
                    return l;
                }),
                n.d(t, "d", function () {
                    return s;
                }),
                n.d(t, "l", function () {
                    return u;
                }),
                n.d(t, "f", function () {
                    return d;
                }),
                n.d(t, "j", function () {
                    return m;
                }),
                n.d(t, "h", function () {
                    return f;
                }),
                n.d(t, "a", function () {
                    return p;
                }),
                n.d(t, "e", function () {
                    return b;
                }),
                n.d(t, "g", function () {
                    return h;
                });
            var a = n(0),
                r = n.n(a),
                i = function (e) {
                    return r.a.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
                        r.a.createElement("path", {
                            d: "M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z",
                        }),
                        r.a.createElement(
                            "path",
                            Object.assign(
                                {
                                    d: "M235 339h42v42h-42zM276.8 318h-41.6c0-67 62.4-62.2 62.4-103.8 0-22.9-18.7-41.7-41.6-41.7S214.4 192 214.4 214h-41.6c0-46 37.2-83 83.2-83s83.2 37.1 83.2 83.1c0 52-62.4 57.9-62.4 103.9z",
                                },
                                e
                            )
                        )
                    );
                },
                c = function (e) {
                    return r.a.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
                        r.a.createElement(
                            "path",
                            Object.assign(
                                {
                                    d: "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z",
                                },
                                e
                            )
                        )
                    );
                },
                o = function (e) {
                    return r.a.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
                        r.a.createElement(
                            "path",
                            Object.assign(
                                {
                                    d: "M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z",
                                },
                                e
                            )
                        )
                    );
                },
                l = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            {
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                            },
                            e
                        ),
                        r.a.createElement("path", {
                            d: "M128 128h768a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m170.666667 533.333333v-170.666666l85.333333 85.333333 85.333333-85.333333v170.666666h85.333334v-298.666666h-85.333334l-85.333333 85.333333-85.333333-85.333333H213.333333v298.666666h85.333334z m469.333333-128v-170.666666h-85.333333v170.666666h-85.333334l128 128 128-128h-85.333333z",
                        })
                    );
                },
                s = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            {
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                            },
                            e
                        ),
                        r.a.createElement("path", {
                            d: "M394.368 810.666667H896v85.333333H128v-181.034667l422.4-422.4 180.992 181.077334L394.325333 810.666667z m216.32-578.389334l90.538667-90.538666a42.666667 42.666667 0 0 1 60.330666 0l120.704 120.704a42.666667 42.666667 0 0 1 0 60.330666l-90.538666 90.496-180.992-180.992z",
                            "p-id": "15502",
                        })
                    );
                },
                u = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            {
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                            },
                            e
                        ),
                        " ",
                        r.a.createElement("path", {
                            d: "M820.394667 799.232l75.434666-75.434667 75.392 75.434667a106.666667 106.666667 0 1 1-150.826666 0zM378.794667 46.08l482.730666 482.688a42.666667 42.666667 0 0 1 0 60.373333l-362.026666 362.026667a42.666667 42.666667 0 0 1-60.330667 0l-362.026667-362.026667a42.666667 42.666667 0 0 1 0-60.373333l331.861334-331.861333-90.538667-90.496L378.88 46.08zM469.333333 257.28L167.637333 558.933333H770.986667L469.333333 257.28z",
                        })
                    );
                },
                d = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            {
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                            },
                            e
                        ),
                        r.a.createElement("path", {
                            d: "M298.666667 725.333333h426.666666v213.333334H298.666667v-213.333334z m512 128v-213.333333H213.333333v213.333333H128a42.666667 42.666667 0 0 1-42.666667-42.666666V384a42.666667 42.666667 0 0 1 42.666667-42.666667h768a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666667a42.666667 42.666667 0 0 1-42.666667 42.666666h-85.333333zM213.333333 426.666667v85.333333h128v-85.333333H213.333333z m85.333334-341.333334h426.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v128H256V128a42.666667 42.666667 0 0 1 42.666667-42.666667z",
                        })
                    );
                },
                m = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            {
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                            },
                            e
                        ),
                        r.a.createElement("path", {
                            d: "M928 896H96c-53.02 0-96-42.98-96-96V224c0-53.02 42.98-96 96-96h832c53.02 0 96 42.98 96 96v576c0 53.02-42.98 96-96 96zM224 240c-61.856 0-112 50.144-112 112s50.144 112 112 112 112-50.144 112-112-50.144-112-112-112zM128 768h768V544l-175.03-175.03c-9.372-9.372-24.568-9.372-33.942 0L416 640l-111.03-111.03c-9.372-9.372-24.568-9.372-33.942 0L128 672v96z",
                            fill: "",
                        })
                    );
                },
                f = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            {
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                            },
                            e
                        ),
                        r.a.createElement("path", {
                            d: "M298.666667 490.666667a192 192 0 1 1 0-384 192 192 0 0 1 0 384z m0 426.666666a192 192 0 1 1 0-384 192 192 0 0 1 0 384z m426.666666-426.666666a192 192 0 1 1 0-384 192 192 0 0 1 0 384z m0 426.666666a192 192 0 1 1 0-384 192 192 0 0 1 0 384z",
                        })
                    );
                },
                p = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign({ viewBox: "0 0 45.999 45.999" }, e),
                        r.a.createElement(
                            "g",
                            null,
                            r.a.createElement(
                                "g",
                                null,
                                r.a.createElement("path", {
                                    d: "M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z",
                                })
                            )
                        )
                    );
                },
                b = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign({ version: "1.1", viewBox: "0 0 512 512" }, e),
                        r.a.createElement(
                            "g",
                            null,
                            r.a.createElement(
                                "g",
                                null,
                                r.a.createElement("path", {
                                    d: "M501.609,384.603L320.543,51.265c-13.666-23.006-37.802-36.746-64.562-36.746c-26.76,0-50.896,13.74-64.562,36.746 c-0.103,0.176-0.19,0.352-0.293,0.528L10.662,384.076c-13.959,23.491-14.223,51.702-0.719,75.457 c13.535,23.769,37.919,37.948,65.266,37.948h360.544c27.347,0,52.733-14.179,66.267-37.948 C515.524,435.779,515.261,407.566,501.609,384.603z M225.951,167.148c0-16.586,13.445-30.03,30.03-30.03 c16.586,0,30.03,13.445,30.03,30.03v120.121c0,16.584-13.445,30.03-30.03,30.03s-30.03-13.447-30.03-30.03V167.148z M255.981,437.421c-24.839,0-45.046-20.206-45.046-45.046c0-24.839,20.206-45.045,45.046-45.045 c24.839,0,45.045,20.206,45.045,45.045C301.027,417.214,280.821,437.421,255.981,437.421z",
                                })
                            )
                        )
                    );
                },
                h = function (e) {
                    return r.a.createElement(
                        "svg",
                        Object.assign(
                            { enableBackground: "new 0 0 512 512", viewBox: "0 0 512 512" },
                            e,
                            { xmlns: "http://www.w3.org/2000/svg" }
                        ),
                        r.a.createElement("path", {
                            d: "m330 150c-19.299 0-35-15.701-35-35v-115h-179c-30.327 0-55 24.673-55 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55v-307zm-187 210h72.72c8.284 0 15 6.716 15 15s-6.716 15-15 15h-72.72c-8.284 0-15-6.716-15-15s6.716-15 15-15zm-15-65c0-8.284 6.716-15 15-15h220c8.284 0 15 6.716 15 15s-6.716 15-15 15h-220c-8.284 0-15-6.716-15-15zm235-95c8.284 0 15 6.716 15 15s-6.716 15-15 15h-220c-8.284 0-15-6.716-15-15s6.716-15 15-15z",
                        }),
                        r.a.createElement("path", {
                            d: "m325 115c0 2.757 2.243 5 5 5h114.314c-2.744-5.066-6.274-9.719-10.515-13.732l-96.423-91.222c-3.742-3.54-7.91-6.493-12.375-8.825v108.779z",
                        })
                    );
                };
        },
    },
    [[56, 7, 0, 1]],
]);
//# sourceMappingURL=LicenseIndex.180dd4c7.95238c74.chunk.js.map
