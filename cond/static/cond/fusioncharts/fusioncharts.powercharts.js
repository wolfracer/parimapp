/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.12.2
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.12.2
*/
(function (J) {
    "object" === typeof module && "undefined" !== typeof module.exports ? module.exports = J : J(FusionCharts)
})(function (J) {
    J.register("module", ["private", "modules.renderer.js-gradientlegend", function () {
        function a(d, h) {
            (function k(t, h) {
                var x, p;
                for (p in t) ka.call(t, p) && (x = t[p], void 0 === h[p] ? h[p] = x : "object" === typeof x && k(x, h[p]))
            })(d, h);
            return h
        }

        function c(d) {
            return U(d ? d : P) || P
        }

        function E(d) {
            var h = d.fontSize + "";
            if (!h) return d;
            h = h.replace(/(\d+)(px)*/, "$1px");
            d.fontSize = h;
            return d
        }

        function e(d) {
            return void 0 ===
            d || "undefined" === typeof d || null === d || d !== d ? !0 : !1
        }

        function ba(d, h) {
            this.carpet = d;
            this._componentPool = h
        }

        function W(d) {
            this.conf = d;
            this._id = "GL_CARPET";
            this.compositionsByCategory = {};
            this._lSpace = this.group = this.node = void 0;
            this.autoRecalculate = !1;
            this.groupName = "fc-gradient-legend";
            this.moveInstructions = {}
        }

        function S() {
            W.apply(this, arguments)
        }

        function I(d, h) {
            this.rawText = d;
            this.conf = h;
            this._id = "GL_CAPTION";
            this._lSpace = this.bound = this.node = void 0
        }

        function B(d, h, q) {
            this.colorRange = d;
            this.conf = h;
            this.childTextConf =
                q;
            this._id = "GL_BODY";
            this.bound = void 0;
            this.compositionsByCategory = {};
            this._lSpace = void 0
        }

        function X() {
            B.apply(this, arguments)
        }

        function M(d) {
            this.conf = d;
            this._id = "GL_LABELS"
        }

        function R() {
            M.apply(this, arguments)
        }

        function r() {
            M.apply(this, arguments);
            this._id = "GL_VALUES"
        }

        function D() {
            r.apply(this, arguments);
            this._id = "GL_VALUES"
        }

        function v(d) {
            this.conf = d;
            this._id = "FL_AXIS";
            this.markerLine = this.shadow = this.node = void 0;
            this.compositionsByCategory = {}
        }

        function A() {
            v.apply(this, arguments)
        }

        function F(d) {
            var h =
                {};
            this._id = "GL_SG1";
            this.conf = d;
            h.conf = d;
            this.extremes = [];
            this.sliders = {};
            h.sliderGroup = this;
            this.valueRange = [];
            this.callbacks = [];
            this.sliders[!1] = new l(!1, h, this._id + "_0");
            this.sliders[!0] = new l(!0, h, this._id + "_1")
        }

        function l(d, h, q) {
            this.conf = h.conf;
            this.sliderIndex = d;
            this.rangeGroup = h.sliderGroup;
            this._id = q;
            this.tracker = this.node = void 0;
            this.currPos = 0;
            this.swing = []
        }

        function C(d, h, q) {
            q = q.components.numberFormatter;
            var k, t, O, x, p, G;
            this.data = d;
            this.options = h || {};
            G = this.mapByPercent = !!d.mapByPercent;
            this.appender = "";
            t = this.mapByPercent ? 0 : h.min;
            h = this.mapByPercent ? 100 : h.max;
            2 === d.colorRange.length && (k = d.colorRange[0], O = d.colorRange[1], x = k.value = e(k.value) ? t : k.value, p = O.value = e(O.value) ? h : O.value, x === p && (x = k.value = t, p = O.value = h), k.displayValue = G ? x + "%" : q.legendValue(x), O.displayValue = G ? p + "%" : q.legendValue(p));
            e(t) && e(k.value) || e(h) && e(k.value) || !d.gradient ? this._preparationGoneWrong = !0 : this._preparationGoneWrong = !1;
            q = this.colorRange = d.colorRange.sort(function (k, t) {
                return k.value - t.value
            });
            this.valueRatio =
                void 0;
            this.values = [];
            d = 0;
            for (k = q.length; d < k; d++) this.values.push(q[d].value)
        }

        function H() {
            ba.apply(this, arguments)
        }

        var Q = this, n = Q.hcLib, b = n.pluckNumber, z = n.pluck, f = n.toRaphaelColor, K = n.graphics,
            V = n.dehashify, m = n.hashify, Z = K.convertColor, ga = K.RGBtoHex, L = K.HEXtoRGB, w = K.getLightColor,
            U = K.getValidColor, g = "rgba(192,192,192," + (n.isIE ? .002 : 1E-6) + ")", y, P = n.COLOR_BLACK,
            ka = {}.hasOwnProperty, d, N = {};
        y = function () {
            function d(k) {
                var q = h.numberFormatter, x, p, G;
                x = 0;
                for (p = k.length; x < p; x++) if (G = k[x].maxvalue) k[x].maxvalue =
                    q.getCleanValue(G)
            }

            var h, q, k = {
                legendCarpetConf: {
                    spreadFactor: .85,
                    allowDrag: !1,
                    captionAlignment: "center",
                    padding: {v: 3, h: 3},
                    style: {fill: "#e4d9c1", stroke: "#c4b89d"}
                },
                legendCaptionConf: {
                    spreadFactor: .2,
                    padding: {v: 2, h: 2},
                    style: {
                        fill: "#786B50",
                        fontFamily: "sans-serif",
                        fontSize: "12px",
                        fontWeight: "bold",
                        fontStyle: "normal"
                    },
                    bound: {style: {stroke: "none"}}
                },
                legendBodyConf: {spreadFactor: .8, padding: {v: 2, h: 2}, bound: {style: {stroke: "none"}}}
            };
            k.legendAxisConf = {
                legendAxisHeight: 11,
                spreadFactor: .4,
                padding: {v: 1, h: 1},
                style: {stroke: "none", "stroke-opacity": 0, "stroke-width": 1},
                line: {grooveLength: 3, offset: 8, style: {stroke: "rgba(255, 255, 255, 0.65)", "stroke-width": 1.5}},
                shadow: {
                    style: {
                        stroke: "none",
                        fill: f({
                            FCcolor: {
                                alpha: "25,0,0",
                                angle: 360,
                                color: "000000,FFFFFF,FFFFFF",
                                ratio: "0,30,40"
                            }
                        })
                    }
                },
                bound: {style: {stroke: "none"}}
            };
            k.sliderGroupConf = {
                showTooltip: 1,
                outerCircle: {rFactor: 1.4, style: {fill: g, stroke: "#757575", "stroke-width": 3}},
                innerCircle: {rFactor: .65, style: {fill: g, stroke: "#FFFFFF"}}
            };
            k.axisTextItemConf = {
                spreadFactor: .3,
                padding: {v: 1, h: 1},
                style: {
                    fill: "#786B50",
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontStyle: "normal"
                }
            };
            return {
                init: function (k) {
                    q = k.chart;
                    h = q.components
                }, setConf: function (k) {
                }, legacyDataParser: function (k, q) {
                    var x = {}, p = h.numberFormatter, G, u, g, f, a, L, y, U, n;
                    if (!k) return !1;
                    x.mapByPercent = n = !!b(k.mapbypercent, 0);
                    G = k.color || [];
                    void 0 === k.minvalue && (k.minvalue = void 0 !== q.min ? n ? 0 : q.min : 0);
                    void 0 === k.maxvalue && (k.maxvalue = void 0 !== q.max ? n ? 100 : q.max : 100);
                    L = !1;
                    g = 0;
                    for (f = G.length; g < f; g++) if (G[g].maxvalue) {
                        L =
                            !0;
                        break
                    }
                    L || (G = []);
                    g = k.code;
                    L = x.colorRange = [];
                    x.gradient = !!b(k.gradient, 1);
                    G.length ? g = c(g) : (g ? (f = c(g), g = c()) : (g = c(), f = w(g, 1)), G.push({
                        code: f,
                        maxvalue: k.maxvalue,
                        label: void 0
                    }));
                    d(G);
                    G = G.sort(function (k, t) {
                        return k.maxvalue - t.maxvalue
                    });
                    y = U = k.minvalue && p.getCleanValue(k.minvalue);
                    U = (void 0 !== y || null !== y) && (n ? y + "%" : p.legendValue(y));
                    L.push({code: V(g), value: y, displayValue: U, label: k.startlabel});
                    g = 0;
                    for (f = G.length; g < f; g++) u = G[g], a = c(u.code || u.color), y = U = u.maxvalue, isNaN(parseInt(y, 10)) || (U = (void 0 !==
                        y || null !== y) && (n ? y + "%" : p.legendValue(y)), L.push(Object({
                        code: V(a),
                        value: y,
                        displayValue: U,
                        label: u.label || u.displayvalue
                    })));
                    L[L.length - 1].label = k.endlabel || u.label;
                    return x
                }, getDefaultConf: function (t) {
                    return k[t]
                }
            }
        }();
        d = function (d) {
            var h = d.chartInstance.id, q = N[h] || (N[h] = {});
            return function () {
                function k() {
                    var k, t, h, x, d, O;
                    for (k in q) for (t in h = q[k], h) if (x = h[t], x instanceof Array) for (d = 0, O = x.length; d < O; d++) x[d] && x[d].hide(); else x.hide()
                }

                var t, O = {}, x;
                t = {
                    KEY_RECT: "rect", KEY_TEXT: "text", KEY_GROUP: "group",
                    KEY_CIRCLE: "circle", KEY_PATH: "path"
                };
                O[t.KEY_RECT] = function (k) {
                    return x.rect(k)
                };
                O[t.KEY_TEXT] = function (k, t) {
                    return x.text(k, t)
                };
                O[t.KEY_GROUP] = function (k, t) {
                    return x.group(k, t)
                };
                O[t.KEY_CIRCLE] = function (k) {
                    return x.circle(k)
                };
                O[t.KEY_PATH] = function (k, t) {
                    return x.path(k, t)
                };
                return {
                    init: function (t) {
                        x = t;
                        k()
                    }, emptyPool: function () {
                        q = N[h] = {}
                    }, getChart: function () {
                        return d
                    }, getComponent: function (k, t, x) {
                        var h = q[k], d, b, g, T = 0;
                        h || (h = q[k] = {});
                        return (b = h[t]) && !(b instanceof Array) || b instanceof Array && 0 < b.length ?
                            function () {
                                return x ? (g = b[T++]) ? g.show() : b[T] = O[t].apply(this, arguments) : b.show()
                            } : function () {
                                return x ? (d = h[t] || (h[t] = []), b = O[t].apply(this, arguments), d.push(b), b.show()) : h[t] = O[t].apply(this, arguments)
                            }
                    }, hideAll: function () {
                        k()
                    }, getKeys: function () {
                        return t
                    }
                }
            }()
        };
        ba.prototype.constructor = ba;
        ba.prototype.draw = function (d) {
            d.componentPool = this._componentPool;
            return this.carpet.draw(d)
        };
        ba.prototype.getLogicalSpace = function (d, h) {
            d.componentPool = this._componentPool;
            return this.carpet.getLogicalSpace(d, h)
        };
        ba.prototype.dispose = function () {
            this.carpet && this.carpet.group && this.carpet.group.remove();
            this._componentPool.emptyPool()
        };
        W.prototype.constructor = W;
        W.prototype.addCompositions = function (d, h) {
            this.compositionsByCategory[h] = d
        };
        W.prototype.getBoundingBox = function (d) {
            var h = this.conf, q = d.refSide, k = d.alignment, t = d.refOffset, O = d.x, x = d.y,
                h = h.width = q * h.spreadFactor;
            !k || void 0 !== O && null !== O || (O = (t + q) / 2 - h / 2);
            return {width: h, height: d.maxOtherSide, x: O, y: x}
        };
        W.prototype.getPostCalcDecisions = function (d, h) {
            var q =
                this.conf.padding, k, t = 0;
            for (k in h) t += h[k].height || 0;
            d.height = t + 2 * q.v
        };
        W.prototype.getLogicalSpace = function (d, h) {
            var q = this._lSpace, k = this.conf.padding, t = this.compositionsByCategory, O, x, p;
            p = 0;
            var G = {}, u, b = 0;
            if (q && !h) return q.isImpure = !0, q;
            q = this._lSpace = x = this.getBoundingBox(d);
            if (e(q.x) || e(q.y) || e(q.height) || e(q.width)) this.autoRecalculate = !0;
            q = a(x, {});
            q.height -= 2 * k.v;
            q.width -= 2 * k.h;
            q.x += k.h;
            q.y += k.v;
            for (u in t) O = t[u], k = a(q, {}), k.y += p, p = q.height * O.conf.spreadFactor, k.height = p + b, p = O.getLogicalSpace(a(k,
                {}), d, h), b = k.height - p.height, G[u] = p, p = p.height;
            this.getPostCalcDecisions(x, G);
            return this._lSpace = x
        };
        W.prototype.setupDragging = function () {
            var d = this.group, h = 0, q = 0, k = 0, t = 0;
            d.css({cursor: "move"});
            d.drag(function (O, x) {
                h = x[0];
                q = x[1];
                d.attr({transform: "t" + (k + h) + "," + (t + q)})
            }, function () {
                k += h;
                t += q
            }, function () {
            })
        };
        W.prototype.draw = function (d) {
            var h = this.conf, q = this.compositionsByCategory, k = d.paper, t = d.parentGroup, O = d.componentPool, x,
                p, G = O.getChart().get("config", "animationObj").duration, u, b = O.getKeys();
            this.getLogicalSpace(d,
                this.autoRecalculate);
            p = this._lSpace;
            u = O.getComponent(this._id, b.KEY_GROUP);
            this.group = t = u(this.groupName, t);
            t.attr({opacity: 0});
            t.animate({opacity: 1}, G, "easeIn");
            u = O.getComponent(this._id, b.KEY_RECT);
            this.node = u(t).attr(p).css(h.style);
            for (x in q) O = q[x], O.draw(h.captionAlignment, p, {
                colorRange: d.colorRange,
                numberFormatter: d.numberFormatter,
                paper: k,
                parentLayer: t,
                smartLabel: d.smartLabel,
                moveInstructions: this.moveInstructions[x],
                componentPool: d.componentPool
            });
            h.allowDrag && this.setupDragging();
            return this.node
        };
        S.prototype = Object.create(W.prototype);
        S.prototype.constructor = S;
        S.prototype.getBoundingBox = function (d) {
            var h = this.conf, q = d.refSide, k = d.alignment, t = d.refOffset, O = d.x, x = d.y,
                h = h.height = q * h.spreadFactor;
            !k || void 0 !== x && null !== x || (x = (t + q) / 2 - h / 2);
            return {width: d.maxOtherSide, height: h, x: O, y: x}
        };
        S.prototype.getPostCalcDecisions = function (d, h) {
            var q = this.conf.padding, k = Number.NEGATIVE_INFINITY, t, O, x = this.moveInstructions;
            W.prototype.getPostCalcDecisions.apply(this, arguments);
            for (O in h) t = h[O].width, k = k < t ? t :
                k;
            d.width = k + 2 * q.h;
            for (O in h) if (t = h[O].width, q = k - t) x[O] = "t" + q / 2 + ",0"
        };
        I.prototype.constructor = I;
        I.LEFT = {
            x: function (d, h) {
                return h.x + d.width / 2 + 2
            }
        };
        I.RIGHT = {
            x: function (d, h) {
                return h.x + h.width - d.width / 2 - 2
            }
        };
        I.CENTER = {
            x: function (d, h) {
                return h.x + h.width / 2
            }
        };
        I.prototype.getLogicalSpace = function (d, h, q) {
            var k = this.conf.padding, t = this._lSpace, O = this.rawText, x = h.componentPool.getChart();
            if (t && !q) return t.isImpure = !0, t;
            t = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0, smartText: void 0}};
            q = h.smartLabel;
            if (!O) return t.bound;
            h = a(d, {});
            h.height -= 2 * k.v;
            h.width -= 2 * k.h;
            h.x += k.h;
            h.y += k.v;
            q.useEllipsesOnOverflow(x.config.useEllipsesWhenOverflow);
            x = a(this.conf.style, {});
            E(x);
            q.setStyle(this._metaStyle = x);
            O = q.getSmartText(O, h.width, h.height);
            h.height = O.height;
            h.width = O.width;
            d.height = O.height + 2 * k.v;
            d.width = O.width + 2 * k.h;
            t.node.smartText = O;
            t.node.logicArea = h;
            return t.bound = d
        };
        I.prototype.draw = function () {
            var d = this.conf, h, q = d.bound || {}, k, t, O, x, p, G, u;
            3 <= arguments.length ? (O = arguments[0], x = arguments[1], p = arguments[2]) :
                2 <= arguments.length && (O = arguments[0], p = arguments[1]);
            h = p.parentLayer;
            G = p.componentPool;
            u = G.getKeys();
            k = G.getComponent(this._id, u.KEY_GROUP);
            this.group = h = k("legend-caption", h).css(d.style);
            this.getLogicalSpace(x, p);
            k = this._lSpace;
            p = k.node;
            t = k.bound;
            k = G.getComponent(this._id, u.KEY_RECT);
            this.bound = q = k(h).attr(t).css(q.style);
            O = "string" === typeof O ? I[O.toUpperCase()].x(p.smartText, x || p.logicArea) : O;
            k = G.getComponent(this._id, u.KEY_TEXT);
            this.node = k({}, h).attr({
                text: p.smartText.text, x: O, y: p.logicArea.y +
                    p.smartText.height / 2, lineHeight: this._metaStyle.lineHeight, fill: d.style.fill
            });
            return {group: h, bound: q, node: this.node}
        };
        B.SC_STACK = ["LEGEND_LABEL", "LEGEND_AXIS", "AXIS_VALUE"];
        B.DARW_STACK = ["AXIS_VALUE", "LEGEND_AXIS", "LEGEND_LABEL"];
        B.prototype.constructor = B;
        B.prototype.addCompositions = function (d, h) {
            this.compositionsByCategory[h] = d
        };
        B.prototype.getCompositionPlotAreaFor = function (d) {
            var h;
            h = a(d, {});
            return function (q, k) {
                q = q || {};
                h.y += q.height || 0;
                h.height = d.height * k;
                return h
            }
        };
        B.prototype.getSpaceTaken =
            function (d) {
                return d.height
            };
        B.prototype.updateEffectivePlotArea = function (d, h, q) {
            var k = this.conf.padding;
            h.height = q;
            d.height = q + 2 * k.v
        };
        B.prototype.getLogicalSpace = function (d, h, q) {
            var k = this._lSpace, t = this.conf.padding, O = this.compositionsByCategory, x, p, G, u = 0, b, g;
            if (k && !q) return k.isImpure = !0, k;
            k = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0}};
            p = a(d, {});
            p.height -= 2 * t.v;
            p.width -= 2 * t.h;
            p.x += t.h;
            p.y += t.v;
            G = this.getCompositionPlotAreaFor(p);
            h.colorRange = this.colorRange;
            b = 0;
            for (g = B.SC_STACK.length; b <
            g; b++) if (t = O[B.SC_STACK[b]]) x = G(x, t.conf.spreadFactor), x = t.getLogicalSpace(a(x, {}), h, q), u += this.getSpaceTaken(x);
            this.updateEffectivePlotArea(d, p, u);
            k.node.logicArea = p;
            return k.bound = d
        };
        B.prototype.draw = function () {
            var d = this.childTextConf, h = this.conf.bound.style || {}, q = this.compositionsByCategory, k, t, O, x, p,
                G, u;
            3 <= arguments.length ? (O = arguments[1], p = arguments[2]) : 2 <= arguments.length && (p = arguments[1]);
            k = p.parentLayer;
            x = p.componentPool;
            G = x.getKeys();
            this.getLogicalSpace(O, p);
            O = this._lSpace;
            u = x.getComponent(this._id,
                G.KEY_GROUP);
            d = u("legend-body", k).attr({transform: "t0,0"}).css(d.style);
            u = x.getComponent(this._id, G.KEY_RECT);
            this.bound = h = u(d).attr(O.bound).css(h);
            p.colorRange = this.colorRange;
            p.parentLayer = d;
            x = 0;
            for (G = B.DARW_STACK.length; x < G; x++) (t = q[B.DARW_STACK[x]]) && t.draw(p);
            p.moveInstructions && d.attr({transform: p.moveInstructions});
            return {bound: h, group: d}
        };
        X.prototype = Object.create(B.prototype);
        X.prototype.constructor = X;
        X.prototype.getCompositionPlotAreaFor = function (d) {
            var h;
            h = a(d, {});
            return function (q, k) {
                q =
                    q || {};
                h.x += q.width || 0;
                h.width = d.width * k;
                return h
            }
        };
        X.prototype.updateEffectivePlotArea = function (d, h, q) {
            var k = this.conf.padding;
            h.width = q;
            d.width = q + 2 * k.h
        };
        X.prototype.getSpaceTaken = function (d) {
            return d.width
        };
        M.prototype.constructor = M;
        M.prototype.getEffectivePlotArea = function (d) {
            var h = this.conf.padding;
            d.height -= 2 * h.v;
            d.width -= 2 * h.h;
            d.x += h.h;
            d.y += h.v;
            this.node = [];
            return d
        };
        M.prototype.getLogicalSpace = function (d, h, q) {
            var k = this._lSpace, t = this.conf, O = t.padding, x, p, G = [], u, b, g, f, L, w = 0, y, U, n;
            L = h.componentPool.getChart();
            var P = [];
            if (k && !q) return k.isImpure = !0, k;
            k = h.colorRange;
            h = h.smartLabel;
            q = k.getCumulativeValueRatio();
            x = k.colorRange;
            k = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0, smartTexts: []}};
            f = k.node.smartTexts;
            u = a(d, {});
            u = this.getEffectivePlotArea(u);
            h.useEllipsesOnOverflow(L.config.useEllipsesWhenOverflow);
            t = a(t.style, {});
            E(this._metaStyle = t);
            h.setStyle(t);
            L = h.getSmartText("W");
            p = 0;
            for (t = x.length; p < t; p++) (b = x[p].label) ? (w++, P.push({oriIndex: p, label: b})) : f[p] = void 0;
            t = P.length;
            if (0 === t) return {
                height: 0,
                width: 0
            };
            b = g = 1 < t ? (q[P[t - 1].oriIndex] - q[P[0].oriIndex]) / 2 * u.width / 100 : Math.max(q[P[0].oriIndex], 100 - q[P[0].oriIndex]) / 2 * u.width / 100;
            w = h.getSmartText(P[0].label, b, u.height);
            w.x = q[P[0].oriIndex] * u.width / 100;
            p = w.x + w.width;
            G.push(w.height);
            f[P[0].oriIndex] = w;
            w = h.getSmartText(P[t - 1].label, b, u.height);
            w.x = q[P[t - 1].oriIndex] * u.width / 100;
            x = w.x - w.width;
            G.push(w.height);
            f[P[t - 1].oriIndex] = w;
            U = p;
            for (p = 1; p < t - 1; p++) b = P[p].label, n = P[p].oriIndex, w = void 0, g = p + 1 === t - 1 ? x : q[P[p + 1].oriIndex] * u.width / 100, y = q[P[p].oriIndex] *
                u.width / 100, g = Math.min(y - U, g - y), g > 2 * L.width && (w = h.getSmartText(b, g, u.height), w.x = q[n] * u.width / 100, U = g, G.push(w.height)), f[P[p].oriIndex] = w;
            G = Math.max.apply(Math, G);
            u.height = G;
            d.height = G + 2 * O.v;
            k.node.logicArea = u;
            return k.bound = d
        };
        M.prototype.draw = function () {
            var d, h, q = this.conf;
            h = q.bound && q.bound.style || {stroke: "none"};
            var k, t, O, x, p, G, u, b;
            2 <= arguments.length ? (t = arguments[0], x = arguments[1]) : 1 <= arguments.length && (x = arguments[0]);
            d = x.parentLayer;
            x.colorRange.getCumulativeValueRatio();
            k = x.componentPool;
            p = k.getKeys();
            this.getLogicalSpace(t, x);
            O = this._lSpace;
            t = O.node.logicArea;
            x = O.node.smartTexts;
            b = k.getComponent(this._id, p.KEY_GROUP);
            d = b("legend-labels", d);
            b = k.getComponent(this._id, p.KEY_RECT);
            this.bound = h = b(d).attr(O.bound).css(h);
            b = k.getComponent(this._id, p.KEY_TEXT, !0);
            p = 0;
            for (O = x.length; p < O; p++) if (k = x[p]) G = t.y + k.height / 2, u = p === O - 1 ? t.x + k.x - k.width / 2 : p ? t.x + k.x : t.x + k.x + k.width / 2, this.node.push(b({}, d).attr({
                text: k.text,
                x: u,
                y: G,
                lineHeight: this._metaStyle.lineHeight,
                fill: q.style.fill
            }).transform("R0"));
            return {group: d, bound: h, node: this.node}
        };
        R.prototype = Object.create(M.prototype);
        R.prototype.constructor = R;
        R.prototype.getLogicalSpace = function (d, h, q) {
            var k = this._lSpace, t = this.conf, O = t.padding, x, p, G = [], u, b, g, f, L, w = 0, y, U, n;
            L = h.componentPool.getChart();
            var P = [];
            if (k && !q) return k.isImpure = !0, k;
            k = h.colorRange;
            h = h.smartLabel;
            q = k.getCumulativeValueRatio();
            x = k.colorRange;
            k = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0, smartTexts: []}};
            f = k.node.smartTexts;
            u = a(d, {});
            u = this.getEffectivePlotArea(u);
            h.useEllipsesOnOverflow(L.config.useEllipsesWhenOverflow);
            t = a(t.style, {});
            E(this._metaStyle = t);
            h.setStyle(t);
            L = h.getSmartText("W");
            p = 0;
            for (t = x.length; p < t; p++) (b = x[p].label) ? (w++, P.push({oriIndex: p, label: b})) : f[p] = void 0;
            t = P.length;
            if (0 === t) return {height: 0, width: 0};
            b = g = 1 < t ? (q[P[t - 1].oriIndex] - q[P[0].oriIndex]) / 2 * u.height / 100 : Math.max(q[P[0].oriIndex], 100 - q[P[0].oriIndex]) / 2 * u.height / 100;
            w = h.getSmartText(P[0].label, b, u.width);
            w.y = q[P[0].oriIndex] * u.height / 100;
            p = w.y + w.width;
            G.push(w.height);
            f[P[0].oriIndex] =
                w;
            w = h.getSmartText(P[t - 1].label, b, u.width);
            w.y = q[P[t - 1].oriIndex] * u.height / 100;
            x = w.y - w.width;
            G.push(w.height);
            f[P[t - 1].oriIndex] = w;
            U = p;
            for (p = 1; p < t - 1; p++) b = P[p].label, n = P[p].oriIndex, w = void 0, g = p + 1 === t - 1 ? x : q[P[p + 1].oriIndex] * u.height / 100, y = q[P[p].oriIndex] * u.height / 100, g = Math.min(y - U, g - y), g > 2 * L.width && (w = h.getSmartText(b, g, u.width), w.y = q[n] * u.height / 100, U = g, G.push(w.height)), f[P[p].oriIndex] = w;
            G = Math.max.apply(Math, G);
            u.width = G;
            d.width = G + 2 * O.v;
            k.node.logicArea = u;
            return k.bound = d
        };
        R.prototype.draw =
            function () {
                var d, h, q = this.conf;
                h = q.bound && q.bound.style || {stroke: "none"};
                var k, t, O, x, p, G, u, b;
                2 <= arguments.length ? (t = arguments[0], x = arguments[1]) : 1 <= arguments.length && (x = arguments[0]);
                d = x.parentLayer;
                x.colorRange.getCumulativeValueRatio();
                k = x.componentPool;
                p = k.getKeys();
                this.getLogicalSpace(t, x);
                O = this._lSpace;
                t = O.node.logicArea;
                x = O.node.smartTexts;
                b = k.getComponent(this._id, p.KEY_GROUP);
                d = b("legend-labels", d);
                b = k.getComponent(this._id, p.KEY_RECT);
                this.bound = h = b(d).attr(O.bound).css(h);
                b = k.getComponent(this._id,
                    p.KEY_TEXT, !0);
                p = 0;
                for (O = x.length; p < O; p++) if (k = x[p]) G = t.x + k.height / 2, u = p === O - 1 ? t.y + k.y - k.width / 2 : p ? t.y + k.y : t.y + k.y + k.width / 2, this.node.push(b({}, d).attr({
                    text: k.text,
                    x: G,
                    y: u,
                    lineHeight: this._metaStyle.lineHeight,
                    fill: q.style.fill
                }).transform("R270," + G + "," + u));
                return {group: d, bound: h, node: this.node}
            };
        r.prototype = Object.create(M.prototype);
        r.prototype.constructor = r;
        r.prototype.getLogicalSpace = function (d, h, q) {
            var k = this._lSpace, t = this.conf, O = t.padding, x = h.componentPool.getChart(), p, G, u, b, g, f,
                w = [], L, y,
                U, P;
            if (k && !q) return k.isImpure = !0, k;
            k = h.colorRange;
            h = h.smartLabel;
            q = k.colorRange;
            u = k.getCumulativeValueRatio();
            k = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0, smartTexts: []}};
            P = k.node.smartTexts;
            y = a(d, {});
            y.height -= 2 * O.v;
            y.width -= 2 * O.h;
            y.x += O.h;
            y.y += O.v;
            h.useEllipsesOnOverflow(x.config.useEllipsesWhenOverflow);
            t = a(t.style, {});
            E(this._metaStyle = t);
            h.setStyle(t);
            x = h.getSmartText("W");
            t = q.length;
            f = (u[t - 1] - u[0]) / 2 * y.width / 100;
            p = q[0].displayValue;
            p = h.getSmartText("string" !== typeof p && void 0 !==
                p && p.toString() || p, f, y.height);
            p.x = u[0] * y.width / 100;
            G = p.x + p.width;
            w.push(p.height);
            P[0] = p;
            p = h.getSmartText(q[t - 1].displayValue, f, y.height);
            p.x = u[t - 1] * y.width / 100;
            f = p.x - p.width;
            w.push(p.height);
            P[t - 1] = p;
            L = G;
            for (G = 1; G < t - 1; G++) p = void 0, U = q[G].displayValue, b = G + 1 === t - 1 ? f : u[G + 1] * y.width / 100, g = u[G] * y.width / 100, b = Math.min(g - L, b - g), b > 1.5 * x.width && (p = h.getSmartText(U, 2 * b, y.height), p.x = u[G] * y.width / 100, L = b, w.push(p.height)), P[G] = p;
            w = Math.max.apply(Math, w);
            y.height = w;
            d.height = w + 2 * O.v;
            k.node.logicArea = y;
            return k.bound =
                d
        };
        r.prototype.draw = function () {
            var d = this.conf, h = d.bound && d.bound.style || {stroke: "none"}, q, k, t, O, x, p, G, u, b;
            2 <= arguments.length ? (x = arguments[0], G = arguments[1]) : 1 <= arguments.length && (G = arguments[0]);
            O = G.parentLayer;
            k = G.colorRange.getCumulativeValueRatio();
            t = G.componentPool;
            q = t.getKeys();
            this.getLogicalSpace(x, G);
            p = this._lSpace;
            x = p.node.logicArea;
            G = p.node.smartTexts;
            b = t.getComponent(this._id, q.KEY_GROUP);
            O = b("legend-values", O);
            b = t.getComponent(this._id, q.KEY_RECT);
            this.bound = h = b(O).attr(p.bound).css(h);
            b = t.getComponent(this._id, q.KEY_TEXT, !0);
            q = 0;
            for (p = k.length; q < p; q++) if (u = G[q]) k = x.y + u.height / 2, t = q === p - 1 ? x.x + u.x - u.width / 2 : q ? x.x + u.x : x.x + u.x + u.width / 2, b({}, O).attr({
                text: u.text,
                x: t,
                y: k,
                lineHeight: this._metaStyle.lineHeight,
                fill: d.style.fill
            });
            return {group: O, bound: h}
        };
        D.prototype = Object.create(r.prototype);
        D.prototype.constructor = D;
        D.prototype.getLogicalSpace = function (d, h, q) {
            var k = this._lSpace, t = this.conf, O = t.padding, x = h.componentPool.getChart(), p, G, u, b, g, f,
                w = [], L, y, U, P;
            if (k && !q) return k.isImpure =
                !0, k;
            k = h.colorRange;
            h = h.smartLabel;
            q = k.colorRange;
            G = k.getCumulativeValueRatio();
            k = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0, smartTexts: []}};
            P = k.node.smartTexts;
            g = a(d, {});
            g.height -= 2 * O.v;
            g.width -= 2 * O.h;
            g.x += O.h;
            g.y += O.v;
            h.useEllipsesOnOverflow(x.config.useEllipsesWhenOverflow);
            t = a(t.style, {});
            E(t);
            h.setStyle(this._metaStyle = t);
            U = h.getSmartText("W");
            x = q.length;
            f = (G[x - 1] - G[0]) / 2 * g.height / 100;
            t = h.getSmartText(q[0].displayValue, g.width, f);
            t.y = G[0] * g.height / 100;
            p = t.y + t.width;
            w.push(t.width);
            P[0] = t;
            t = h.getSmartText(q[x - 1].displayValue, g.width, f);
            t.y = G[x - 1] * g.height / 100;
            f = t.y - t.height;
            w.push(t.width);
            P[x - 1] = t;
            L = p;
            for (p = 1; p < x - 1; p++) t = void 0, y = q[p].displayValue, u = p + 1 === x - 1 ? f : G[p + 1] * g.height / 100, b = G[p] * g.height / 100, u = Math.min(b - L, u - b), u > 2 * U.height && (t = h.getSmartText(y, g.width, 2 * u), t.y = G[p] * g.height / 100, L = u, w.push(t.width)), P[p] = t;
            w = Math.max.apply(Math, w);
            g.width = w;
            d.width = w + 2 * O.h;
            k.node.logicArea = g;
            return k.bound = d
        };
        D.prototype.draw = function () {
            var d, h, q = this.conf;
            h = q.bound && q.bound.style ||
                {stroke: "none"};
            var k, t, O, x, p, G, u, b;
            2 <= arguments.length ? (k = arguments[0], O = arguments[1]) : 1 <= arguments.length && (O = arguments[0]);
            d = O.parentLayer;
            x = O.colorRange.getCumulativeValueRatio();
            p = O.componentPool;
            G = p.getKeys();
            this.getLogicalSpace(k, O);
            t = this._lSpace;
            k = t.node.logicArea;
            O = t.node.smartTexts;
            b = p.getComponent(this._id, G.KEY_GROUP);
            d = b("legend-values", d);
            b = p.getComponent(this._id, G.KEY_RECT);
            this.bound = h = b(d).attr(t.bound).css(h);
            b = p.getComponent(this._id, G.KEY_TEXT, !0);
            p = 0;
            for (G = x.length; p < G; p++) if (x =
                O[p]) t = k.x + x.width / 2, u = p === G - 1 ? k.y + x.y - x.height / 2 : p ? k.y + x.y : k.y + x.y + x.height / 2, b({}, d).attr({
                text: x.text,
                x: t,
                y: u,
                lineHeight: this._metaStyle.lineHeight,
                fill: q.style.fill
            });
            return {group: d, bound: h}
        };
        v.prototype.constructor = v;
        v.prototype.addCompositions = function (d, h) {
            this.compositionsByCategory[h] = d
        };
        v.prototype.getLogicalSpace = function (d, h, q) {
            h = this._lSpace;
            var k = this.conf, t = k.padding, O, x;
            x = k.legendAxisHeight;
            var p = this.compositionsByCategory, G;
            G = 0;
            if (h && !q) return h.isImpure = !0, h;
            h = this._lSpace = {
                bound: {
                    height: 0,
                    width: 0
                }, node: {logicArea: void 0}
            };
            q = a(d, {});
            q.height -= 2 * t.v;
            q.width -= 2 * t.h;
            q.x += t.h;
            q.y += t.v;
            k = x / 2 + k.line.offset;
            O = x / 2;
            if (p = p.RANGE) G = p.sliders[!1], G = G.conf.outerCircle.rFactor * x, O += G = Math.max(G / 2 - x / 2, 0);
            q.y += G;
            q.height = x = O + k + G;
            d.height = x + 2 * t.v;
            h.node.logicArea = q;
            return h.bound = d
        };
        v.prototype.getDrawableAxisArea = function (d) {
            var h = this.conf;
            return {x: d.x, y: d.y, width: d.width, height: h.legendAxisHeight, r: h.legendAxisHeight / 2}
        };
        v.prototype.preDrawingRangeParam = function (d) {
            return {
                y: d.y + d.height / 2, calculationBase: d.height,
                rangeStart: d.x, rangeEnd: d.x + d.width, prop: "y"
            }
        };
        v.prototype.getScaleMarkerPathStr = function (d, h) {
            var q = a(d, {}), k = this.conf.line, t, O, x, p, G = "";
            q.x += q.r;
            q.width -= 2 * q.r;
            p = q.y + q.height;
            t = 0;
            for (O = h.length; t < O; t++) x = h[t], x = q.x + x * q.width / 100, G += "M" + x + "," + (p - k.grooveLength) + "L" + x + "," + (p + k.offset);
            q = "" + ("M" + q.x + "," + (p + k.offset) + "L" + (q.x + q.width) + "," + (p + k.offset));
            return G + q
        };
        v.prototype.getColorGradient = function (d) {
            return {
                axis: d.getBoxFill(), shadow: f({
                    FCcolor: {
                        alpha: "25,0,0", angle: 90, color: "000000,FFFFFF,FFFFFF",
                        ratio: "0,30,40"
                    }
                })
            }
        };
        v.prototype.draw = function () {
            var d, h = this.conf, q = h.line, k = (h.bound || {}).style || {}, t, O, x = this.compositionsByCategory, p,
                G, u, b, g, f;
            2 <= arguments.length ? (t = arguments[0], g = arguments[1]) : 1 <= arguments.length && (g = arguments[0]);
            d = g.parentLayer;
            p = g.colorRange;
            G = p.getCumulativeValueRatio();
            f = g.componentPool;
            u = f.getKeys();
            this.getLogicalSpace(t, g);
            b = this._lSpace;
            t = f.getComponent(this._id, u.KEY_GROUP);
            d = t("legend-axis", d);
            t = f.getComponent(this._id, u.KEY_RECT, !0);
            this.bound = t(d).attr(b.bound).css(k);
            k = this.getDrawableAxisArea(b.node.logicArea);
            p = this.getColorGradient(p);
            h.style.fill = p.axis;
            h.shadow.style.fill = p.shadow;
            this.node = t(d).attr(k).css(h.style);
            this.shadow = t(d).attr(k).css(h.shadow.style);
            h = this.getScaleMarkerPathStr(k, G);
            t = f.getComponent(this._id, u.KEY_PATH);
            t("M0,0", d).attr({path: h}).css(q.style);
            for (O in x) switch (q = x[O], O) {
                case "RANGE":
                    u = this.preDrawingRangeParam(k), g[u.prop] = u[u.prop], g.key = u.prop, g.rCalcBase = u.calculationBase, g.parentLayer = d, q.draw(u.rangeStart, u.rangeEnd, g)
            }
        };
        A.prototype = Object.create(v.prototype);
        A.prototype.constructor = A;
        A.prototype.getLogicalSpace = function (d, h, q) {
            h = this._lSpace;
            var k = this.conf, t = k.padding, b, x;
            x = k.legendAxisHeight;
            var p = this.compositionsByCategory, G;
            G = 0;
            if (h && !q) return h.isImpure = !0, h;
            h = this._lSpace = {bound: {height: 0, width: 0}, node: {logicArea: void 0}};
            q = a(d, {});
            q.height -= 2 * t.v;
            q.width -= 2 * t.h;
            q.x += t.h;
            q.y += t.v;
            k = x / 2 + k.line.offset;
            b = x / 2;
            if (p = p.RANGE) G = p.sliders[!1], G = G.conf.outerCircle.rFactor * x, b += G = Math.max(G / 2 - x / 2, 0);
            q.x += G;
            q.width = x =
                b + k + G;
            d.width = x + 2 * t.v;
            h.node.logicArea = q;
            return h.bound = d
        };
        A.prototype.getDrawableAxisArea = function (d) {
            var h = this.conf;
            return {x: d.x, y: d.y, width: h.legendAxisHeight, height: d.height, r: h.legendAxisHeight / 2}
        };
        A.prototype.getScaleMarkerPathStr = function (d, h) {
            var q = a(d, {}), k = this.conf.line, t, b, x, p, G = "";
            q.y += q.r;
            q.height -= 2 * q.r;
            p = q.x + q.width;
            t = 0;
            for (x = h.length; t < x; t++) b = h[t], b = q.y + b * q.height / 100, G += "M" + (p - k.grooveLength) + "," + b + "L" + (p + k.offset) + "," + b;
            q = "" + ("M" + (p + k.offset) + "," + q.y + "L" + (p + k.offset) + "," + (q.y +
                q.height));
            return G + q
        };
        A.prototype.getColorGradient = function (d) {
            return {
                axis: d.getBoxFill(!0),
                shadow: f({FCcolor: {alpha: "25,0,0", angle: 360, color: "000000,FFFFFF,FFFFFF", ratio: "0,30,40"}})
            }
        };
        A.prototype.preDrawingRangeParam = function (d) {
            return {
                x: d.x + d.width / 2,
                calculationBase: d.width,
                rangeStart: d.y,
                rangeEnd: d.y + d.height,
                prop: "x"
            }
        };
        F.prototype.constructor = F;
        F.prototype.initRange = function (d, h) {
            this.extremes[+d.sliderIndex] = h
        };
        F.prototype.updateRange = function (d, h) {
            var q = d.sliderIndex;
            this.sliders[!q].updateSwingRange(q,
                h)
        };
        F.prototype.reset = function () {
            var d = {};
            d.conf = this.conf;
            d.sliderGroup = this;
            this.sliders[!1] = new l(!1, d, this._id + "_0");
            this.sliders[!0] = new l(!0, d, this._id + "_1");
            this.draw.apply(this, this._drawParams)
        };
        F.prototype.clearListeners = function () {
            this.callbacks.length = 0
        };
        F.prototype.draw = function (d, h, q) {
            var k = this.sliders, t = k[!1], k = k[!0], b = q.colorRange, x = b.colorRange,
                p = this._fcChart = q.componentPool.getChart();
            this.getValueFormPixel = function (k, t, d, q) {
                var h = (t - k) / (q - d);
                this.getValueFormPixel = function (t) {
                    return k +
                        h * t
                }
            };
            this.updateWhenInMove = function (k, t) {
                this.updateWhenInMove = function (d, q) {
                    var h = this.extremes, h = this.getValueFormPixel(d.sliderIndex ? h[1] - h[0] + q : q);
                    return h = t ? parseFloat(h).toFixed(2) + "%" : k.legendValue(h)
                }
            };
            this._drawParams = [d, h, q];
            this.updateWhenInMove(p.components.numberFormatter, b.mapByPercent);
            d = t.draw(d, x[0].displayValue, q[q.key], q);
            d = k.draw(h, x[x.length - 1].displayValue, q[q.key], q);
            t.swing = this.extremes.slice(0);
            k.swing = this.extremes.slice(0);
            this.getValueFormPixel(x[0].value, x[x.length -
            1].value, this.extremes[0], this.extremes[1]);
            return d
        };
        F.prototype.registerListener = function (d, h, q) {
            this.callbacks.push({fn: d, context: h, params: q || []})
        };
        F.prototype.updateWhenInRest = function (d, h) {
            var q = this.sliders, k = this.extremes, t = d.sliderIndex, b, x = this.callbacks, p, G;
            t ? (b = q[!t].currPos, q = k[1] - k[0] + h) : (b = h, q = k[1] - k[0] + q[!t].currPos);
            k = 0;
            for (t = x.length; k < t; k++) p = x[k], G = p.params.slice(0), G.unshift(this.getValueFormPixel(q)), G.unshift(this.getValueFormPixel(b)), p.fn.apply(p.context, G)
        };
        F.prototype.dragStarted =
            function (d) {
                var h = this.sliders, q = this.extremes, k = d.conf, t = this._fcChart;
                Q.raiseEvent("legendpointerdragstart", {
                    pointerIndex: +d.sliderIndex,
                    pointers: [{value: this.getValueFormPixel(h[!1].currPos)}, {value: this.getValueFormPixel(q[1] - q[0] + h[!0].currPos)}],
                    legendPointerHeight: k.outerRadius,
                    legendPointerWidth: k.innerRadius,
                    outerRadius: k.outerRadius,
                    innerRadius: k.innerRadius
                }, t.chartInstance, [t.id])
            };
        F.prototype.dragCompleted = function (d, h, q) {
            var k = this.sliders, t = this.extremes, b = d.conf, x = this.getValueFormPixel(k[!1].currPos),
                k = this.getValueFormPixel(t[1] - t[0] + k[!0].currPos), p = this._fcChart, G;
            d.sliderIndex ? (G = x, q = this.getValueFormPixel(t[1] - t[0] + q)) : (G = this.getValueFormPixel(q), q = k);
            h && Q.raiseEvent("legendrangeupdated", {
                previousMinValue: x,
                previousMaxValue: k,
                minValue: G,
                maxValue: q
            }, p.chartInstance, [p.id]);
            Q.raiseEvent("legendpointerdragstop", {
                    pointerIndex: +d.sliderIndex,
                    pointers: [{value: x}, {value: k}],
                    legendPointerHeight: b.outerRadius,
                    legendPointerWidth: b.innerRadius,
                    outerRadius: b.outerRadius,
                    innerRadius: b.innerRadius
                }, p.chartInstance,
                [p.id])
        };
        l.prototype.constructor = l;
        l.prototype.updateSwingRange = function (d, h) {
            this.swing[+d] = h
        };
        l.prototype.draw = function (d, h, q, k) {
            var t = k.parentLayer, b = this.conf, x = b.outerCircle, p = b.innerCircle,
                G = Math.ceil(x.rFactor * k.rCalcBase / 2), u = Math.ceil(p.rFactor * k.rCalcBase / 2), f = G - u,
                w = this.rangeGroup, L = this.sliderIndex, a, y, U = k.componentPool, P = U.getKeys();
            b.outerRadius = G;
            b.innerRadius = u;
            this._scaleVal = h;
            p.style["stroke-width"] = f;
            f = Math.ceil(x.style["stroke-width"] / 2);
            u += f;
            y = U.getComponent(this._id, P.KEY_GROUP);
            t = this.node = y("fc-gl-slider", t).attr({cursor: "pointer", transform: "t0,0"});
            "x" === k.key ? d = a = d + (L ? -u : +u) : (a = q, d = q = d + (L ? -u : +u));
            w.initRange(this, d);
            y = U.getComponent(this._id, P.KEY_CIRCLE, !0);
            y(t).attr({cx: q, cy: a, r: G}).css(x.style);
            y(t).attr({cx: q, cy: a, r: u}).css(p.style);
            h = this.tracker = y(t).attr({
                cx: q,
                cy: a,
                r: G + 5,
                ishot: !0,
                fill: g,
                stroke: 0,
                cursor: "pointer"
            }).trackTooltip(b.showTooltip ? !0 : !1).tooltip(h, null, null, !0);
            this._dragAPI = k = this.getDragAPI("x" === k.key);
            h.undrag();
            h.drag(k.dragging, k.dragStart, k.dragEnd);
            return {translateAscending: G + f}
        };
        l.prototype.getDragAPI = function (d) {
            var h = this, q = h.node, k = h.sliderIndex, t = h.rangeGroup, b, x, p, G = h.conf.innerRadius, u;
            return {
                dragging: function (g, f) {
                    var w, L, a, y;
                    g.stopPropagation();
                    g.preventDefault();
                    a = d ? f[1] : f[0];
                    k ? (w = b[0] - b[1] + G, L = 0) : (w = 0, L = b[1] - b[0] - G);
                    y = h.currPos + a;
                    y < w ? a += w - y : y > L && (a -= y - L);
                    q.attr({transform: d ? "t0," + (h.currPos + a) : "t" + (h.currPos + a) + ",0"});
                    x = a;
                    p && clearTimeout(p);
                    p = setTimeout(function () {
                        t.updateWhenInRest(h, h.currPos + a)
                    }, 100);
                    h.tracker.tooltip(t.updateWhenInMove(h,
                        h.currPos + a), null, null, !0);
                    return u = !0
                }, dragStart: function (k) {
                    k.stopPropagation();
                    k.preventDefault();
                    q.attr({transform: d ? "t0," + h.currPos : "t" + h.currPos + ",0"});
                    b = b || h.swing;
                    u = !1;
                    t.dragStarted(h)
                }, dragEnd: function () {
                    var d;
                    t.dragCompleted(h, u, h.currPos + x);
                    u && (p && clearTimeout(p), p = setTimeout(function () {
                        t.updateWhenInRest(h, h.currPos)
                    }, 100), h.currPos += x, d = b[+k] + h.currPos, t.updateRange(h, d))
                }
            }
        };
        C.prototype.constructor = C;
        C.prototype.getValueRatio = function () {
            var d = this.colorRange, h, q, k = d.length, t = this.valueRatio,
                b = d[0].value, x = d[k - 1].value - b, p = 0;
            if (t) return t;
            t = this.valueRatio = [];
            for (q = 0; q < k; q++) h = d[q], h = (h.value - b) / x, t.push(100 * (h - p)), p = h;
            return t
        };
        C.prototype.getCumulativeValueRatio = function () {
            var d = this.colorRange, h, q, k = d.length, t = d[0].value, b = d[k - 1].value, x = [];
            for (q = 0; q < k; q++) h = d[q], x.push((h.value - t) / (b - t) * 100);
            return x
        };
        C.prototype.getBoxFill = function (d) {
            var h = this.colorRange, q, k = h.length, t = [], b;
            b = d ? 90 : 0;
            for (q = 0; q < k; q++) d = h[q], t.push(d.code);
            h = {
                FCcolor: {
                    alpha: "100,100,100", angle: b, color: t.join(","),
                    ratio: this.getValueRatio().join(",")
                }
            };
            return f(h)
        };
        C.prototype.getColorByValue = function (d) {
            var h = this.values, q = this.colorRange, k, t, b, x;
            if (void 0 !== d && null !== d) {
                t = 0;
                for (k = h.length; t < k; t++) if (d === h[t]) {
                    x = q[t].code;
                    break
                } else if (!t && d < h[t]) {
                    b = !0;
                    break
                } else if (t === k - 1 && d > h[t]) {
                    b = !0;
                    break
                } else if (d > h[t] && d < h[t + 1]) {
                    h = q[t];
                    k = q[t + 1];
                    q = h.value;
                    t = L(h.code);
                    h = k.value;
                    k = L(k.code);
                    x = x = void 0;
                    x = h - q;
                    x = [Math.round(t[0] + (k[0] - t[0]) / x * (d - q)), Math.round(t[1] + (k[1] - t[1]) / x * (d - q)), Math.round(t[2] + (k[2] - t[2]) / x * (d - q))];
                    x = ga(x);
                    break
                }
                if (!b) return x
            }
        };
        H.prototype = Object.create(ba.prototype);
        H.prototype.constructor = H;
        J.register("component", ["gradientLegend", "gradientLegend", {
            pIndex: 1, enabled: !1, init: function (b) {
                function h(d) {
                    q.data = b.chart.jsonData.colorrange;
                    (x = q.nData = y.legacyDataParser(q.data, d)) ? (q.drawOptions = {
                            smartLabel: k.linkedItems.smartLabel,
                            colorRange: q.colorRange = g = new C(x, d, p),
                            maxOtherSide: d.maxOtherSide
                        }, q._dontPlot = !1, g && g._preparationGoneWrong && (q._dontPlot = !0), q._recalculateLogicalSpace = !0, q._configure()) :
                        q._dontPlot = !0
                }

                var q = this, k = b.chart, t, g, x, p;
                y.init(b);
                p = q._chart = b.chart;
                q._cpool = d(p);
                if (!(t = b.dataExtremes)) return h;
                h(t)
            }, _configure: function () {
                var d = this._chart, h = d.jsonData.chart, q = this.conf = {}, k = h.outcnvbasefont,
                    t = h.outcnvbasefontsize, g = h.outcnvbasefontcolor, d = d.config.dataLabelStyle, x, p, G, u, f, w,
                    a;
                q.caption = z(h.legendcaption);
                q.legendPosition = z(h.legendposition, "bottom").toLowerCase();
                q.showLegend = b(h.showlegend, 1);
                q.interactiveLegend = b(h.interactivelegend, 1);
                q.showLegendLabels = b(h.showlegendlabels,
                    1);
                x = h.legenditemfontcolor || g;
                p = h.legenditemfont || k;
                G = h.legenditemfontsize || t;
                u = b(h.legenditemfontbold, 0);
                g = h.legendcaptionfontcolor || g;
                k = h.legendcaptionfont || k;
                t = h.legendcaptionfontsize || t;
                f = b(h.legendcaptionfontbold, 1);
                a = (w = h.legendaxisbordercolor ? m(V(h.legendaxisbordercolor)) : void 0) ? b(h.legendaxisborderalpha, 100) / 100 : void 0;
                q.axisTextItemConf = {
                    style: {
                        fill: x ? Z(z(x)) : d.color,
                        fontFamily: p ? z(p) : d.fontFamily,
                        fontSize: G ? b(G) : d.fontSize.match(/\d+/)[0],
                        fontWeight: u ? "bold" : d.fontWeight
                    }
                };
                q.legendCaptionConf =
                    {
                        style: {
                            fill: g ? Z(z(g)) : d.color,
                            fontFamily: k ? z(k) : d.fontFamily,
                            fontSize: t ? b(t) : d.fontSize.match(/\d+/)[0],
                            fontWeight: f ? "bold" : d.fontWeight,
                            fontStyle: "normal"
                        }
                    };
                q.legendAxisConf = {
                    legendAxisHeight: 11,
                    style: {stroke: w, "stroke-opacity": a},
                    line: {
                        style: {
                            stroke: Z(z(h.legendscalelinecolor, "FFF8E9"), b(h.legendscalelinealpha, 100)),
                            "stroke-width": b(h.legendscalelinethickness)
                        }
                    }
                };
                q.sliderGroupConf = {
                    showTooltip: b(h.showtooltip, 1),
                    outerCircle: {
                        rFactor: b(h.sliderdiameterfactor), style: {
                            stroke: Z(z(h.legendpointerbordercolor,
                                "757575"), b(h.legendpointerborderalpha, 100))
                        }
                    },
                    innerCircle: {
                        rFactor: b(h.sliderholediameterfactor),
                        style: {stroke: Z(z(h.legendpointercolor, "FFFFFF"), b(h.legendpointeralpha, 100))}
                    }
                };
                q.legendCarpetConf = {
                    spreadFactor: b(h.legendspreadfactor),
                    allowDrag: !!b(h.legendallowdrag, 0),
                    captionAlignment: z(h.legendcaptionalignment, "center"),
                    style: {
                        fill: Z(z(h.legendbgcolor, "e4d9c1"), b(h.legendbgalpha, 100)),
                        stroke: Z(z(h.legendbordercolor, "c4b89d"), b(h.legendborderalpha, 100)),
                        "stroke-width": b(h.legendborderthickness,
                            1)
                    }
                }
            }, postConfigureInit: function () {
                var d = this.conf, h, q, k, t, b, x, p;
                this.elem = {};
                d.caption && (q = a(y.getDefaultConf("legendCaptionConf"), d.legendCaptionConf), h = new I(d.caption, q));
                d.interactiveLegend && (q = a(y.getDefaultConf("sliderGroupConf"), d.sliderGroupConf), this.elem.sGroup = t = new F(q), this.listeners && 0 < this.listeners.length && t.registerListener.apply(t, this.listeners));
                q = a(y.getDefaultConf("legendCarpetConf"), d.legendCarpetConf);
                "bottom" === d.legendPosition ? (this.drawOptions.refSideKey = "canvasWidth",
                    this.drawOptions.refOffsetKey = "canvasLeft", q = new W(q), b = a(y.getDefaultConf("axisTextItemConf"), d.axisTextItemConf), x = new B(this.drawOptions.colorRange, y.getDefaultConf("legendBodyConf"), b), k = new v(a(y.getDefaultConf("legendAxisConf"), d.legendAxisConf)), d.showLegendLabels && (p = new M(b)), d = new r(b)) : (this.drawOptions.refSideKey = "canvasHeight", this.drawOptions.refOffsetKey = "canvasTop", b = a(y.getDefaultConf("axisTextItemConf"), d.axisTextItemConf), q = new S(q), x = new X(this.drawOptions.colorRange, y.getDefaultConf("legendBodyConf"),
                    b), k = new A(a(y.getDefaultConf("legendAxisConf"), d.legendAxisConf)), d.showLegendLabels && (p = new R(b)), d = new D(b));
                t && k.addCompositions(t, "RANGE");
                p && x.addCompositions(p, "LEGEND_LABEL");
                x.addCompositions(k, "LEGEND_AXIS");
                x.addCompositions(d, "AXIS_VALUE");
                h && q.addCompositions(h, "CAPTION");
                q.addCompositions(x, "LEGEND_BODY");
                this.elem.gl = new H(q, this._cpool)
            }, notifyWhenUpdate: function (d, h, q) {
                var k;
                (k = this.elem && this.elem.sGroup) ? k.registerListener(d, h, q) : this.listeners = [d, h, q]
            }, dispose: function () {
                this.elem &&
                this.elem.gl && this.elem.gl.dispose();
                this.elem = {}
            }, getLogicalSpace: function (d) {
                var h = this.conf, q = {height: 0, width: 0}, k = this.drawOptions, t = this._chart;
                if (!this._recalculateLogicalSpace) return h = k.refSideKey, k = k.refOffsetKey, this.drawOptions.refSide = t.config[h], this.drawOptions.refOffset = t.config[k], (this._logicalArea = this.elem.gl.getLogicalSpace(this.drawOptions, !0)) || q;
                if (this._dontPlot) return q;
                this._recalculateLogicalSpace = !1;
                this.postConfigureInit();
                if (!h.showLegend) return q;
                h = k.refSideKey;
                k = k.refOffsetKey;
                this.drawOptions.refSide = t.config[h];
                this.drawOptions.refOffset = t.config[k];
                this.drawOptions.maxOtherSide = d || this.drawOptions.maxOtherSide;
                return this.elem.gl && (this._logicalArea = this.elem.gl.getLogicalSpace(this.drawOptions, !0))
            }, resetLegend: function () {
                var d;
                (d = this.elem && this.elem.sGroup) && d.reset()
            }, clearListeners: function () {
                var d;
                (d = this.elem && this.elem.sGroup) && d.clearListeners()
            }, draw: function (d, h, q) {
                var k = this.conf;
                this._dontPlot || (this._cpool.init(q.paper), k.showLegend ? (this.drawOptions.paper =
                    q.paper, this.drawOptions.parentGroup = q.parentGroup, this.drawOptions.x = d, this.drawOptions.y = h, this.drawOptions.maxOtherSide = this.drawOptions.maxOtherSide || q.maxOtherSide, d = this.elem.gl.draw(this.drawOptions), d = d.getBBox(), k.xPos = d.x, k.yPos = d.y, k.height = d.height, k.width = d.width, this.enabled = !0) : this.enabled = !1)
            }
        }])
    }]);
    J.register("module", ["private", "modules.renderer.js-msstepline", function () {
        var a = this.hcLib, c = this.window, E = !a.CREDIT_REGEX.test(c.location.hostname), e = a.chartAPI,
            ba = a.pluckNumber, W = a.pluck,
            S = c.Image, c = a.preDefStr, I = a.schedular, B = c.line, X = a.toRaphaelColor, M = a.getFirstValue,
            R = c.configStr, r = c.animationObjStr, D = c.dataLabelStr, v = a.BLANKSTRING, A = c.hiddenStr,
            F = Math.max, l = a.TOUCH_THRESHOLD_PIXELS, C = a.CLICK_THRESHOLD_PIXELS, H = a.hasTouch ? l : C,
            Q = c.ROUND, n = c.miterStr;
        e("msstepline", {
            friendlyName: "Multi-series Step Line Chart",
            standaloneInit: !0,
            creditLabel: E,
            defaultDatasetType: "msstepline",
            defaultPlotShadow: 1,
            applicableDSList: {msstepline: !0}
        }, e.mscartesian, {
            drawverticaljoins: 1, useforwardsteps: 1,
            zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0, enablemousetracking: !0
        }, e.areabase);
        J.register("module", ["private", "modules.renderer.js-dataset-group-msstepline", function () {
            J.register("component", ["datasetGroup", "msstepline", {}, "line"])
        }]);
        J.register("component", ["dataset", "MSStepLine", {
            type: "msstepline", _addLegend: function () {
                var b = this.config, a = this.chart.components.legend, f = ba(b.drawanchors, 1), b = {
                    enabled: b.includeinlegend,
                    type: B,
                    drawLine: W(b.drawLine, !0),
                    fillColor: X({
                        color: b.anchorbgcolor,
                        alpha: b.anchorbgalpha
                    }),
                    strokeColor: X({color: b.anchorbordercolor, alpha: "100"}),
                    rawFillColor: b.anchorbgcolor,
                    rawStrokeColor: b.anchorbordercolor,
                    anchorSide: f ? b.anchorsides : 0,
                    strokeWidth: b.anchorborderthickness,
                    label: M(this.JSONData.seriesname),
                    lineWidth: b.linethickness
                };
                this.legendItemId = a.addItems(this, this.legendInteractivity, b)
            }, draw: function () {
                var b = this, z = b.JSONData, f = b.chart, l = f.getJobList(), V = f.components, m = b.config,
                    Z = b.index || b.positionIndex, ga = f.config, L, w, U = V.paper, g = V.xAxis[0], y = b.yAxis,
                    P, ka, d = f.graphics;
                L = d.datalabelsGroup;
                var N, T, h, q, k, t, O = b.components.data, x, p = b.components.removeDataArr || [], G = p.length,
                    u = m.linethickness, da = b.graphics.container, ma = ga.connectnulldata, La = d.datasetGroup, aa,
                    d = m.shadow, db, c = b.graphics.dataLabelContainer, ta = {}, C, e, ta = f.get(R, r),
                    Qa = ta.dummyObj, Ea = ta.animObj, M = ta.duration, E = b.components.pool || [], ba = function () {
                        !1 !== b.visible || !1 !== b._conatinerHidden && void 0 !== b._conatinerHidden || (da.lineGroup.hide(), da.lineShadowGroup.hide(), da.anchorShadowGroup.hide(),
                            da.anchorGroup.hide(), c && c.hide(), b._conatinerHidden = !0)
                    }, pa = function () {
                        La.lineConnector.attr({"clip-rect": null});
                        La.lineConnector.node && La.lineConnector.node.removeAttribute("clip-path");
                        !1 !== b.visible && (da.lineShadowGroup.show(), da.anchorShadowGroup.show(), da.anchorGroup.show(), c && c.show())
                    }, Na = !0, Ra, Va = y.getAxisBase(), Va = y.yBasePos = y.getAxisPosition(Va),
                    Da = V.canvas.config.clip, V = Da["clip-canvas-init"].slice(0), Da = Da["clip-canvas"].slice(0),
                    J = m.lineDashStyle, va = {color: m.linecolor, alpha: m.alpha},
                    Fa, wa, oa, qa, la = [], ia = 0, ea = [], sa = null, fa, ha = [], ca = !1, Aa,
                    ya = b.graphics.lineElement, Y = b.visible, ua = m.drawverticaljoins, xa = m.useforwardsteps, za,
                    Ga = ta.animType, Ma = 0, ra, f = f.config.stepatmiddle ? .5 * g.getPVR() : 0, Ba,
                    Ua = ga.canvasTop, Ja = ga.canvasBottom;
                m.imagesLoaded = 0;
                La.lineConnector = La.lineConnector || U.group("line-connector", La);
                da || (da = b.graphics.container = {
                    lineShadowGroup: U.group("connector-shadow", La.lineConnector),
                    anchorShadowGroup: U.group("anchor-shadow", La.lineConnector),
                    lineGroup: U.group(B, La.lineConnector),
                    anchorGroup: U.group("anchors", La.lineConnector)
                }, Y || (da.lineShadowGroup.hide(), da.anchorShadowGroup.hide(), da.lineGroup.hide(), da.anchorGroup.hide()));
                O || (O = b.components.data = []);
                c || (c = b.graphics.dataLabelContainer = b.graphics.dataLabelContainer || U.group(D, L), Y || c.hide());
                Y && (da.lineShadowGroup.show(), da.anchorShadowGroup.show(), da.lineGroup.show(), da.anchorGroup.show(), c.show());
                L = g.getCategoryLen();
                for (w = 0; w < L; w++) if (x = O[w]) e = x.config, q = e.setValue, h = e.setLink, k = e.setLevelTooltext, ta = e.anchorProps,
                    C = ta.symbol, db = ta.shadow, t = e.displayValue, T = x.graphics.element, za = x.graphics.image, P = x.graphics.hotElement, ka = x.graphics.label, x || (x = O[w] = {graphics: {}}), null === q ? (ha.length = 0, ma || (sa = null), T && T.hide(), za && za.hide(), ka && ka.hide(), P && P.hide()) : (qa = {
                    color: e.color,
                    alpha: e.alpha
                }, Ra = e.dashStyle, P = g.getAxisPosition(w), ka = !b.visible && M ? Va : y.getAxisPosition(q), aa = e.hoverEffects, ta.isAnchorHoverRadius = aa.anchorRadius, N = ta.radius, Ba = ta.borderThickness, ra = ka - N - Ba / 2, N = ka + N + Ba / 2, ra < Ua && (ga.toleranceTop = F(ga.toleranceTop ||
                    0, Ua - ra)), N > Ja && (ga.toleranceBottom = F(ga.toleranceBottom || 0, N - Ja)), ra = g.getLabel(w), N = ga.showtooltip ? e.toolText + (k ? v : e.toolTipValue) : v, e.finalTooltext = N, k = e.eventArgs || (e.eventArgs = {}), k.index = w, k.link = h, k.value = q, k.displayValue = t, k.categoryLabel = ra, k.toolText = N, k.id = m.userID, k.datasetIndex = Z, k.datasetName = z.seriesname, k.visible = Y, ta.imageUrl ? (e.anchorImageLoaded = !1, x._xPos = P, x._yPos = ka, db = new S, db.onload = this._onAnchorImageLoad(b, w, k, P, ka), db.onerror = this._onErrorSetter(b, w), db.src = ta.imageUrl, Ma++) :
                    (za && za.hide(), q = [C[1] || 2, P, ka, ta.radius, ta.startAngle, ta.dip], h = {
                        fill: X({
                            color: ta.bgColor,
                            alpha: ta.bgAlpha
                        }),
                        stroke: X({color: ta.borderColor, alpha: ta.borderAlpha}),
                        "stroke-width": ta.borderThickness,
                        visibility: ta.radius ? Y : A
                    }, T || (E.element && E.element.length ? T = x.graphics.element = E.element.shift() : (T = x.graphics.element = U.polypath(da.anchorGroup), T.attr({polypath: q}))), T.show().animateWith(Qa, Ea, {polypath: q}, M, Ga, Na && ba), T.attr(h).shadow(db, da.anchorShadowGroup).data("hoverEnabled", aa.enabled).data("eventArgs",
                        k), Na = !1), db = x.graphics.connector, aa.enabled && (q = {
                    polypath: [aa.anchorSides || 2, P, ka, aa.anchorRadius, aa.startAngle, aa.dip],
                    fill: X({color: aa.anchorColor, alpha: aa.anchorBgAlpha}),
                    stroke: X({color: aa.anchorBorderColor, alpha: aa.anchorBorderAlpha}),
                    "stroke-width": aa.anchorBorderThickness
                }, h = {
                    polypath: [ta.sides, P, ka, ta.radius, ta.startAngle, 0],
                    fill: X({color: ta.bgColor, alpha: ta.bgAlpha}),
                    stroke: X({color: ta.borderColor, alpha: ta.borderAlpha}),
                    "stroke-width": ta.borderThickness
                }, T && T.data("anchorRadius", ta.radius).data("anchorHoverRadius",
                    aa.anchorRadius).data("hoverEnabled", aa.enabled).data("setRolloverAttr", q).data("setRolloutAttr", h).data("eventArgs", k)), e.trackerConfig || (e.trackerConfig = {}), e.trackerConfig.trackerRadius = F(ta.radius, aa && aa.anchorRadius || 0, H) + (ta.borderThickness || 0) / 2, oa = oa !== [X(qa || va), Ra || J].join(":"), null !== sa ? (ha.length && (la = la.concat(ha), ha.length = 0), la.join(v) || la.push("M", fa, sa), xa ? (la.push("H", P - f), ua ? la.push("V", ka) : la.push("M", P - f, ka), f && la.push("H", P)) : (ua ? la.push("V", ka) : la.push("M", fa, ka), la.push("H",
                    P)), oa && (ia ? ea = ea.concat(la) : (db || (db = x.graphics.connector = U.path(la, da.lineGroup), ca = !0), db.animateWith(Qa, Ea, {path: la}, M, Ga, Na && ba), db.attr({
                    "stroke-dasharray": wa,
                    "stroke-width": u,
                    stroke: Fa,
                    "stroke-linecap": Q,
                    "stroke-linejoin": 2 < u ? Q : n
                }).shadow(Aa, da.lineShadowGroup), Na = !1), la = []), oa || db && db.hide()) : ha.push("M", P, ka), fa = P, sa = ka, Fa = X(qa || va), Aa = qa ? {opacity: qa && qa.alpha / 100} : d, wa = Ra || J, ia = void 0 === W(e.color, e.alpha, e.dashed) ? 1 : 0, oa = [Fa, wa].join(":"), x._xPos = P, x._yPos = ka, !ta.imageUrl && this.drawLabel(w));
                m.noOfImages = m.totalImages = Ma;
                0 === Ma && l.labelDrawID.push(I.addJob(b.drawLabel.bind(b), a.priorityList.label));
                la.length && (ea = ea.concat(la));
                z = {path: ea};
                h = {
                    "stroke-dasharray": J,
                    "stroke-width": u,
                    stroke: X(va),
                    "stroke-linecap": Q,
                    "stroke-linejoin": 2 <= u ? Q : n
                };
                ya || (ya = b.graphics.lineElement = U.path({path: ea}, da.lineGroup), ca = !0);
                ya.show().animateWith(Qa, Ea, z, M, Ga, Na && ba);
                ya.attr(h).shadow(d, da.lineShadowGroup);
                Na = !1;
                M && Y && ca && (da.anchorGroup.hide(), da.lineShadowGroup.hide(), da.anchorShadowGroup.hide(), c.hide(),
                    La.lineConnector.attr({"clip-rect": V}).animateWith(Qa, Ea, {"clip-rect": Da}, M, "normal", pa));
                for (w = 0; w < G; w++) b._removeDataVisuals(p.shift());
                b.drawn = !0
            }
        }, B, {drawverticaljoins: void 0, useforwardsteps: void 0}])
    }]);
    J.register("module", ["private", "modules.renderer.js-powercharts", function () {
        var a = this.hcLib, c = a.Raphael, E = a.pluckNumber, e = Math, ba = e.sin, W = e.cos, S = e.PI / 180;
        a.eventList.chartupdated = "FC_ChartUpdated";
        a.eventList.dataposted = "FC_DataPosted";
        a.eventList.dataposterror = "FC_DataPostError";
        a.eventList.datarestored =
            "FC_DataRestored";
        c.addSymbol({
            resizeIcon: function (a, c, e) {
                var M = E(e, 15) / 3, W = [];
                0 > M && (M = -M, e = -e, a += e - M / 2, c += e - M / 2);
                for (e = 3; 0 < e; --e) W.push("M", a - M * e, c - 3, "L", a - 3, c - M * e);
                return W
            }, closeIcon: function (a, c, e) {
                var M = 1.3 * e, E = 43 * S, r = 48 * S, D = a + M * W(E), E = c + M * ba(E), v = a + M * W(r),
                    A = c + M * ba(r), r = .71 * (e - 2);
                e = .71 * (e - 2);
                M = ["A", M, M, 0, 1, 0, v, A];
                D = ["M", D, E];
                D = D.concat(M);
                return D = D.concat(["M", a + r, c - e, "L", a - r, c + e, "M", a - r, c - e, "L", a + r, c + e])
            }, configureIcon: function (a, c, e) {
                --e;
                var M = .71 * e, E = .71 * (e + 2), r = a - e, D = c - e, v = a + e;
                e = c + e;
                var A =
                    a + .5, F = c + .5, l = a - .5, C = c - .5, H = r - 2, Q = D - 2, n = v + 2, b = e + 2, z = a + M,
                    f = c + M, K = a - M, M = c - M, V = a + E, m = c + E;
                a -= E;
                c -= E;
                return ["M", r, F, "L", H, F, H, C, r, C, K - .25, M + .25, a - .25, c + .25, a + .25, c - .25, K + .25, M - .25, l, D, l, Q, A, Q, A, D, z - .25, M - .25, V - .25, c - .25, V + .25, c + .25, z + .25, M + .25, v, C, n, C, n, F, v, F, z + .25, f - .25, V + .25, m - .25, V - .25, m + .25, z - .25, f + .25, A, e, A, b, l, b, l, e, K + .25, f + .25, a + .25, m + .25, a - .25, m - .25, K - .25, f - .25, "Z"]
            }, axisIcon: function (a, c, e) {
                --e;
                var M = .33 * e, E = e / 2, r = a - e, D = c - e, v = a + E;
                e = c + e;
                a -= E;
                E = c + M;
                c -= M;
                return ["M", r, D, "L", v, D, v, e, r, e, "M", a, E, "L",
                    v, E, "M", a, c, "L", v, c]
            }, loggerIcon: function (a, c, e) {
                --e;
                a -= e;
                c -= e;
                var M = a + 2 * e, E = a + 2, r = M - 2, D = c + 2;
                e = D + e;
                var v = e + 2;
                return ["M", a, c, "L", M, c, M, D, r, D, r, e, M, e, M, v, a, v, a, e, E, e, E, D, a, D, a, c]
            }
        });
        this.addEventListener("rendered", function (a) {
            a = a.sender;
            var c = a.__state, e = a.jsVars && a.jsVars.instanceAPI;
            a.disposed || c.listenersAdded || !e || "function" !== typeof e.getCollatedData || (a.addEventListener(["chartupdated", "dataupdated", "rendered"], function (a) {
                delete a.sender.__state.hasStaleData
            }), c.listenersAdded = !0)
        })
    }]);
    J.register("module",
        ["private", "modules.renderer.js-spline", function () {
            var a = this.hcLib, c = Math.round, E = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
            a("spline", {
                friendlyName: "Spline Chart",
                standaloneInit: !0,
                singleseries: !0,
                creditLabel: E,
                defaultDatasetType: "msspline",
                defaultPlotShadow: 1,
                applicableDSList: {spline: !0},
                getSplineExtremities: function (a, c, E, S, I) {
                    var B = [], X = !1;
                    S = S || 0;
                    for (I = I || {
                        max: Number.MIN_VALUE,
                        min: Number.MAX_VALUE
                    }; S < a.length; ++S) if (X) if (isNaN(a[S].config.setValue) || null === a[S].config.setValue) {
                        if (!E) break
                    } else B.push({
                        index: S,
                        y: a[S].config.setValue
                    }); else isNaN(a[S].config.setValue) || null === a[S].config.setValue || (X = !0, B.push({
                        index: S,
                        y: a[S].config.setValue
                    }));
                    2 < B.length && this.evalSplineExtremities(B, c, I);
                    S < a.length && !E && this.getSplineExtremities(a, c, E, S, I);
                    return I
                },
                evalSplineExtremities: function (a, E, W) {
                    var S = {}, I, B, X;
                    for (B = 0; B < a.length; ++B) I = a[B].index, S["D" + I] = 0;
                    for (I = 0; 10 > I; ++I) for (B = 0; B < a.length; ++B) X = 0 === B ? (3 * (a[B + 1].y - a[B].y) - S["D" + a[B + 1].index]) / 2 : B === a.length - 1 ? (3 * (a[B].y - a[B - 1].y) - S["D" + a[B - 1].index]) / 2 : (3 * (a[B +
                    1].y - a[B - 1].y) - S["D" + a[B + 1].index] - S["D" + a[B - 1].index]) / 4, S["D" + a[B].index] = X;
                    E = c(E / (a.length - 1));
                    for (B = 1; B < a.length; ++B) this.getSegmentExtremities(B, a, S, W, E)
                },
                getSegmentExtremities: function (a, c, E, S, I) {
                    var B, X, M, R, r;
                    B = E["D" + c[0].index];
                    X = E["D" + c[a].index];
                    E = c[0].y;
                    M = 3 * (c[a].y - c[0].y) - 2 * B - X;
                    a = 2 * (c[0].y - c[a].y) + B + X;
                    c = S.max;
                    X = S.min;
                    for (R = 0; R <= I; R++) r = R / I, r = E + B * r + M * r * r + a * r * r * r, r < X && (X = r), r > c && (c = r);
                    S.max = c;
                    S.min = X
                }
            }, a.sscartesian, {
                minimizetendency: 0, zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0,
                enablemousetracking: !0
            }, a.areabase)
        }]);
    J.register("module", ["private", "modules.renderer.js-splinearea", function () {
        var a = this.hcLib, c = a.HUNDREDSTRING, E = !a.CREDIT_REGEX.test(this.window.location.hostname),
            a = a.chartAPI;
        a("splinearea", {
            friendlyName: "Spline Area Chart",
            standaloneInit: !0,
            hasLegend: !1,
            singleseries: !0,
            creditLabel: E,
            defaultDatasetType: "mssplinearea",
            defaultPlotShadow: 0
        }, a.spline, {anchoralpha: c, minimizetendency: 0, enablemousetracking: !0}, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-msspline",
        function () {
            var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
            a("msspline", {
                standaloneInit: !0,
                friendlyName: "Multi-series Spline  Chart",
                creditLabel: c,
                defaultDatasetType: "msspline",
                applicableDSList: {msspline: !0},
                defaultPlotShadow: 1,
                getSplineExtremities: a.spline.getSplineExtremities,
                evalSplineExtremities: a.spline.evalSplineExtremities,
                getSegmentExtremities: a.spline.getSegmentExtremities
            }, a.mscartesian, {
                minimizetendency: 0, zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0,
                enablemousetracking: !0
            }, a.areabase)
        }]);
    J.register("module", ["private", "modules.renderer.js-mssplinearea", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
        a("mssplinearea", {
            friendlyName: "Multi-series Spline Area Chart",
            standaloneInit: !0,
            creditLabel: c,
            defaultDatasetType: "mssplinearea",
            defaultPlotShadow: 0
        }, a.msspline, {minimizetendency: 0, enablemousetracking: !0}, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-mssplinedy", function () {
        var a =
            this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
        a("mssplinedy", {
                friendlyName: "Multi-series Dual Y-Axis Spline Chart",
                standaloneInit: !0,
                creditLabel: c,
                isDual: !0,
                defaultDatasetType: "msspline",
                applicableDSList: {msspline: !0},
                getSplineExtremities: a.spline.getSplineExtremities,
                evalSplineExtremities: a.spline.evalSplineExtremities,
                getSegmentExtremities: a.spline.getSegmentExtremities
            }, a.msdybasecartesian, {minimizetendency: 0, zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0},
            a.msspline)
    }]);
    J.register("module", ["private", "modules.renderer.js-multiaxisline", function () {
        var a = this.hcLib, c = this.window, E = a.pluck, e = a.pluckNumber, ba = a.preDefStr, W = ba.sStr,
            S = a.BLANKSTRING, I = a.parseUnsafeString, B = ba.defaultFontStr, X = a.pluckFontSize,
            M = ba.divLineAlphaStr, R = ba.divLineAlpha3DStr, r = a.componentDispose, D = a.chartPaletteStr = {
                chart2D: {
                    bgColor: "bgColor",
                    bgAlpha: "bgAlpha",
                    bgAngle: "bgAngle",
                    bgRatio: "bgRatio",
                    canvasBgColor: "canvasBgColor",
                    canvasBaseColor: "canvasBaseColor",
                    divLineColor: "divLineColor",
                    legendBgColor: "legendBgColor",
                    legendBorderColor: "legendBorderColor",
                    toolTipbgColor: "toolTipbgColor",
                    toolTipBorderColor: "toolTipBorderColor",
                    baseFontColor: "baseFontColor",
                    anchorBgColor: "anchorBgColor"
                }, chart3D: {
                    bgColor: "bgColor3D",
                    bgAlpha: "bgAlpha3D",
                    bgAngle: "bgAngle3D",
                    bgRatio: "bgRatio3D",
                    canvasBgColor: "canvasBgColor3D",
                    canvasBaseColor: "canvasBaseColor3D",
                    divLineColor: "divLineColor3D",
                    divLineAlpha: R,
                    legendBgColor: "legendBgColor3D",
                    legendBorderColor: "legendBorderColor3D",
                    toolTipbgColor: "toolTipbgColor3D",
                    toolTipBorderColor: "toolTipBorderColor3D",
                    baseFontColor: "baseFontColor3D",
                    anchorBgColor: "anchorBgColor3D"
                }
            }, c = !a.CREDIT_REGEX.test(c.location.hostname), v = a.graphics.convertColor, A = a.extend2,
            F = ba.altVGridColorStr, l = ba.configStr, C = ba.animationObjStr,
            H = "rgba(192,192,192," + (a.isIE ? .002 : 1E-6) + ")", Q = a.toRaphaelColor, n = a.hasTouch, b = Math,
            z = b.max, f = b.min, K = ba.POSITION_BOTTOM, V = ba.colors.c000000, m = ba.altVGridAlphaStr,
            a = a.chartAPI;
        a("multiaxisline", {
            friendlyName: "Multi-axis Line Chart",
            standaloneInit: !0,
            creditLabel: c,
            defaultDatasetType: "multiaxisline",
            defaultPlotShadow: 1,
            axisPaddingLeft: 0,
            axisPaddingRight: 0,
            applicableDSList: {LINE: !0},
            _createDatasets: function () {
                var b = this.components, a = this.config, f = this.jsonData, w = f.axis, U, g, y, P, n = 0, d, N,
                    T = this.defaultDatasetType, h = this.applicableDSList, q = b.legend.components.items || [], k, t,
                    O, x, p = this.config.isstacked, G, u = {}, da = 0, ma;
                if (w) {
                    U = w.length;
                    this.config.categories = f.categories && f.categories[0].category;
                    f = b.dataset || (b.dataset = []);
                    P = f.length;
                    ma = a.axisDataSetMap = [];
                    for (g = 0; g <
                    U; g++) if (y = w[g].dataset, ma[g] = [], y) for (N = y.length, n += N, a = 0; a < N; a++) if (x = y[a], x.seriesname && (x.seriesname = I(x.seriesname)), d = x.parentyaxis || S, t = (t = this.isDual && d.toLowerCase() === W ? E(x.renderas, this.sDefaultDatasetType) : E(x.renderas, T)) && t.toLowerCase(), h[t] || (t = T), d = J.get("component", ["dataset", t])) void 0 === u[t] ? u[t] = 0 : u[t]++, G = "datasetGroup_" + t, O = J.register("component", ["datasetGroup", t]), k = b[G], O && !k && (k = b[G] = new O, k.chart = this, k.init()), f[da] ? (d = f[da], k = d.JSONData, k = k.data ? k.data.length : 0, t = x.data ?
                        x.data.length : 0, k > t && d.removeData(t - 1, k - t, !1), d.JSONData = x, d.index = g, d.axisIndex = g, d.configure(), ma[g].push(da), da += 1) : (d = new d, f.push(d), d.chart = this, d.index = g, d.axisIndex = g, ma[g].push(da), da += 1, k && (p ? k.addDataSet(d, 0, u[t]) : k.addDataSet(d, u[t], 0)), d.init(x));
                    if (P > n) {
                        b = P - n;
                        for (a = n; a < P; a++) r.call(f[a]);
                        f.splice(n, b);
                        q.splice(n, b)
                    }
                } else this.setChartMessage()
            },
            _createAxes: function () {
                var b = this.components, a = J.register("component", ["axis", "cartesian"]);
                b.yAxis = [];
                b.xAxis = [];
                b.xAxis[0] = b = new a;
                b.chart =
                    this;
                b.init();
                this._setCategories()
            },
            _feedAxesRawData: function () {
                var b = this.components, a = this.config, f = b.colorManager, w = b.numberFormatter, U = this.jsonData,
                    g = U.chart, y, P, n = this.is3d;
                P = n ? D.chart3D : D.chart2D;
                var d = J.register("component", ["axis", "cartesian"]), N, T, h, q, k, t, O, x, p, G, u, da;
                y = !1;
                var ma = 0;
                y = {
                    outCanfontFamily: E(g.outcnvbasefont, g.basefont, B),
                    outCanfontSize: X(g.outcnvbasefontsize, g.basefontsize, 10),
                    outCancolor: E(g.outcnvbasefontcolor, g.basefontcolor, f.getColor(P.baseFontColor)).replace(/^#? ([a-f0-9]+)/ig,
                        "#$1"),
                    axisNamePadding: g.xaxisnamepadding,
                    axisValuePadding: g.labelpadding,
                    axisNameFont: g.xaxisnamefont,
                    axisNameFontSize: g.xaxisnamefontsize,
                    axisNameFontColor: g.xaxisnamefontcolor,
                    axisNameFontBold: g.xaxisnamefontbold,
                    axisNameFontItalic: g.xaxisnamefontitalic,
                    axisNameBgColor: g.xaxisnamebgcolor,
                    axisNameBorderColor: g.xaxisnamebordercolor,
                    axisNameAlpha: g.xaxisnamealpha,
                    axisNameFontAlpha: g.xaxisnamefontalpha,
                    axisNameBgAlpha: g.xaxisnamebgalpha,
                    axisNameBorderAlpha: g.xaxisnameborderalpha,
                    axisNameBorderPadding: g.xaxisnameborderpadding,
                    axisNameBorderRadius: g.xaxisnameborderradius,
                    axisNameBorderThickness: g.xaxisnameborderthickness,
                    axisNameBorderDashed: g.xaxisnameborderdashed,
                    axisNameBorderDashLen: g.xaxisnameborderdashlen,
                    axisNameBorderDashGap: g.xaxisnameborderdashgap,
                    useEllipsesWhenOverflow: g.useellipseswhenoverflow,
                    divLineColor: E(g.vdivlinecolor, g.divlinecolor, f.getColor(P.divLineColor)),
                    divLineAlpha: E(g.vdivlinealpha, g.divlinealpha, n ? f.getColor(R) : f.getColor(M)),
                    divLineThickness: e(g.vdivlinethickness, g.divlinethickness, 1),
                    divLineIsDashed: !!e(g.vdivlinedashed,
                        g.vdivlineisdashed, g.divlinedashed, g.divlineisdashed, 0),
                    divLineDashLen: e(g.vdivlinedashlen, g.divlinedashlen, 4),
                    divLineDashGap: e(g.vdivlinedashgap, g.divlinedashgap, 2),
                    showAlternateGridColor: e(g.showalternatevgridcolor, 0),
                    alternateGridColor: E(g.alternatevgridcolor, f.getColor(F)),
                    alternateGridAlpha: E(g.alternatevgridalpha, f.getColor(m)),
                    numDivLines: g.numvdivlines,
                    labelFont: g.labelfont,
                    labelFontSize: g.labelfontsize,
                    labelFontColor: g.labelfontcolor,
                    labelFontBold: g.labelfontbold,
                    labelFontItalic: g.labelfontitalic,
                    labelFontAlpha: g.labelalpha,
                    maxLabelHeight: g.maxlabelheight,
                    axisName: g.xaxisname,
                    axisMinValue: g.xaxisminvalue,
                    axisMaxValue: g.xaxismaxvalue,
                    setAdaptiveMin: g.setadaptivexmin,
                    adjustDiv: g.adjustvdiv,
                    labelDisplay: g.labeldisplay,
                    showLabels: g.showlabels,
                    rotateLabels: g.rotatelabels,
                    slantLabel: e(g.slantlabels, g.slantlabel),
                    labelStep: e(g.labelstep, g.xaxisvaluesstep),
                    showAxisValues: e(g.showxaxisvalues, g.showxaxisvalue),
                    showLimits: g.showvlimits,
                    showDivLineValues: e(g.showvdivlinevalues, g.showvdivlinevalues),
                    showZeroPlane: g.showvzeroplane,
                    zeroPlaneColor: g.vzeroplanecolor,
                    zeroPlaneThickness: g.vzeroplanethickness,
                    zeroPlaneAlpha: g.vzeroplanealpha,
                    showZeroPlaneValue: g.showvzeroplanevalue,
                    trendlineColor: g.trendlinecolor,
                    trendlineToolText: g.trendlinetooltext,
                    trendlineThickness: g.trendlinethickness,
                    trendlineAlpha: g.trendlinealpha,
                    showTrendlinesOnTop: g.showtrendlinesontop,
                    showAxisLine: e(g.showxaxisline, g.showaxislines, g.drawAxisLines, 0),
                    axisLineThickness: e(g.xaxislinethickness, g.axislinethickness, 1),
                    axisLineAlpha: e(g.xaxislinealpha, g.axislinealpha,
                        100),
                    axisLineColor: E(g.xaxislinecolor, g.axislinecolor, V)
                };
                P = {
                    outCanfontFamily: E(g.outcnvbasefont, g.basefont, B),
                    outCanfontSize: X(g.outcnvbasefontsize, g.basefontsize, 10),
                    outCancolor: E(g.outcnvbasefontcolor, g.basefontcolor, f.getColor(P.baseFontColor)).replace(/^#? ([a-f0-9]+)/ig, "#$1"),
                    useEllipsesWhenOverflow: g.useellipseswhenoverflow,
                    showAlternateGridColor: 0,
                    axisNameFont: g.yaxisnamefont,
                    axisNameFontSize: g.yaxisnamefontsize,
                    axisNameFontColor: g.yaxisnamefontcolor,
                    axisNameFontBold: g.yaxisnamefontbold,
                    axisNameFontItalic: g.yaxisnamefontitalic,
                    axisNameBgColor: g.yaxisnamebgcolor,
                    axisNameBorderColor: g.yaxisnamebordercolor,
                    axisNameAlpha: g.yaxisnamealpha,
                    axisNameFontAlpha: g.yaxisnamefontalpha,
                    axisNameBgAlpha: g.yaxisnamebgalpha,
                    axisNameBorderAlpha: g.yaxisnameborderalpha,
                    axisNameBorderPadding: g.yaxisnameborderpadding,
                    axisNameBorderRadius: g.yaxisnameborderradius,
                    axisNameBorderThickness: g.yaxisnameborderthickness,
                    axisNameBorderDashed: g.yaxisnameborderdashed,
                    axisNameBorderDashLen: g.yaxisnameborderdashlen,
                    axisNameBorderDashGap: g.yaxisnameborderdashgap
                };
                n = b.xAxis[0];
                n.setCommonConfigArr(y, !1, !1, !1);
                n.configure();
                a.axesArr = {leftAxes: [], rightAxes: [], axesMap: [], checkBox: [], leftSideSelected: !1};
                n = a.axesArr.leftAxes = [];
                t = a.axesArr.rightAxes = [];
                O = a.axesArr.axesMap = [];
                N = U.axis || [];
                T = 0;
                for (h = N.length; T < h; T += 1) {
                    b.yAxis[T] ? U = b.yAxis[T] : (U = b.yAxis[T] = new d, U.chart = this, U.init());
                    k = N[T];
                    y = !1;
                    da = 0;
                    for (q = k.dataset ? k.dataset.length : 0; da < q; da += 1) 0 !== Number(k.dataset[da].visible) && (y = !0);
                    da = e(k.showaxis, 1);
                    q = f.getPlotColor(T);
                    x = E(k.color, g.axiscolor, q);
                    v(x, 100);
                    p = e(k.divlinethickness, g.divlinethickness, 1);
                    G = e(k.tickwidth, g.axistickwidth, 2);
                    u = e(k.axislinethickness, g.axislinethickness, 2);
                    (q = !e(k.axisonleft, 1)) ? (O.push({
                        side: "r",
                        index: t.length,
                        showAxis: da,
                        checkBoxChecked: y
                    }), t.push({
                        index: T,
                        showAxis: da,
                        checkBoxChecked: y
                    })) : (da && (a.axesArr.leftSideSelected = !0), O.push({
                        side: "l",
                        index: n.length,
                        showAxis: da,
                        checkBoxChecked: y
                    }), n.push({index: T, showAxis: da, checkBoxChecked: y}));
                    P.labelStep = e(k.yaxisvaluesstep, k.yaxisvaluestep, g.yaxisvaluesstep,
                        g.yaxisvaluestep);
                    P.axisMaxValue = k.maxvalue;
                    P.axisMinValue = k.minvalue;
                    P.setAdaptiveMin = e(k.setadaptiveymin, g.setadaptiveymin);
                    P.numDivLines = e(k.numdivlines, g.numdivlines, 4);
                    P.adjustDiv = e(k.adjustdiv, g.adjustdiv);
                    P.showAxisValues = e(k.showyaxisvalues, k.showyaxisvalue, g.showyaxisvalues, g.showyaxisvalue, 1);
                    P.showLimits = e(k.showlimits, g.showyaxislimits, g.showlimits, P.showAxisValues);
                    P.showDivLineValues = e(k.showdivlinevalue, g.showdivlinevalues, k.showdivlinevalues, P.showAxisValues);
                    P.showZeroPlane = e(k.showzeroplane,
                        g.showzeroplane);
                    P.showZeroPlaneValue = e(k.showzeroplanevalue, g.showzeroplanevalue);
                    P.zeroPlaneColor = k.zeroplanecolor;
                    P.zeroPlaneThickness = e(k.zeroplanethickness, k.divlinethickness, a.zeroplanethickness, 2);
                    P.zeroPlaneAlpha = e(k.zeroplanealpha, k.divlinealpha, a.zeroplanealpha);
                    P.showZeroPlaneOnTop = a.showzeroplaneontop;
                    P.divLineColor = E(k.divlinecolor, x);
                    P.divLineAlpha = e(k.divlinealpha, g.divlinealpha, f.getColor(M), 100);
                    P.divLineThickness = p;
                    P.divLineIsDashed = !!e(k.divlinedashed, k.divlineisdashed, g.divlinedashed,
                        g.divlineisdashed, 0);
                    P.divLineDashLen = e(k.divlinedashlen, g.divlinedashlen, 4);
                    P.divLineDashGap = e(k.divlinedashgap, g.divlinedashgap, 2);
                    P.showAxisLine = 1;
                    P.axisLineThickness = u;
                    P.axisLineAlpha = 100;
                    P.axisLineColor = x;
                    P.tickLength = G;
                    P.tickColor = x;
                    P.tickAlpha = 100;
                    P.tickWidth = u;
                    P.axisName = k.title;
                    P.rotateAxisName = 1;
                    U.setCommonConfigArr(A({}, P), !0, !1, q);
                    U.configure();
                    w.parseMLAxisConf(k, T);
                    0 === e(k.showaxis) ? (U.hide(), U.setAxisConfig({
                        axisIndex: T,
                        drawAxisLineWRTCanvas: !1,
                        drawLabels: !1,
                        drawPlotlines: !1,
                        drawAxisLine: !1,
                        drawPlotBands: !1,
                        drawAxisName: !1,
                        drawTrendLines: !1,
                        drawTrendLabels: !1,
                        drawTick: !1,
                        drawTickMinor: !1
                    })) : (U.show(), U.setAxisConfig({
                        axisIndex: T,
                        drawAxisLineWRTCanvas: !1,
                        drawLabels: !0,
                        drawPlotlines: !0,
                        drawAxisLine: !0,
                        drawPlotBands: !0,
                        drawAxisName: !0,
                        drawTrendLines: !0,
                        drawTrendLabels: !0,
                        drawTick: !0,
                        drawTickMinor: !0
                    }));
                    ma += 1
                }
                T = ma;
                for (h = b.yAxis.length; T < h; T += 1) b.yAxis[T].hide()
            },
            _setAxisLimits: function () {
                var b = this.components, a = this.config.axisDataSetMap, L = b.dataset, b = b.yAxis, w = a.length, U,
                    g = -Infinity, y =
                        Infinity, n, r, d;
                for (U = 0; U < w; U += 1) {
                    n = 0;
                    for (r = a[U].length; n < r; n += 1) d = L[a[U][n]].getDataLimits(), g = z(g, d.max), y = f(y, d.min);
                    Infinity === y && (y = 0);
                    -Infinity === g && (g = y + 1);
                    b[U].setDataLimit(g, y);
                    g = -Infinity;
                    y = Infinity
                }
            },
            _spaceManager: function () {
                var b, a, f, w = this.config, U = w.axesArr, g = this.components;
                f = w.legendPosition;
                var y = g.xAxis;
                b = g.yAxis;
                var n = this.hasLegend, r = w.yDepth;
                a = g.legend;
                var d = w.axesPadding, N = 0, T = 0, h = w.axisDataSetMap.length, q, k, t, O = this.jsonData.chart,
                    x = e(O.showborder, this.is3D ? 0 : 1), g = g.canvas.config.canvasBorderWidth;
                q = w.borderWidth = x ? e(O.borderthickness, 1) : 0;
                var p = w.canvasMarginTop, G = w.canvasMarginBottom, u = w.canvasMarginLeft, O = w.canvasMarginRight,
                    da = w.height, x = w.width;
                this._allocateSpace({top: q, bottom: q, left: q, right: q});
                this._allocateSpace({left: w.canvasMarginLeft, right: w.canvasMarginRight});
                q = U.axesMap;
                k = U.leftAxes;
                U = U.rightAxes;
                t = "right" === f ? .3 * w.canvasWidth : .3 * w.canvasHeight;
                !1 !== n && y && this._allocateSpace(a._manageLegendPosition(t));
                for (n = 0; n < h; n += 1) 0 !== q[n].showaxis && (a = .7 * w.canvasWidth, a = b[n].placeAxis(a),
                b[n] && this._allocateSpace(a), t = q[n], "r" === t.side ? (U[t.index].width = a.right, N += d) : (k[t.index].width = a.left, T += d));
                b = .225 * w.availableHeight;
                b = this._manageActionBarSpace && this._manageActionBarSpace(b) || {};
                this._allocateSpace(b);
                f = f === K ? .6 * w.canvasHeight : .6 * w.canvasWidth;
                this._manageChartMenuBar(f);
                a = .7 * w.canvasWidth;
                a > N + T && this._allocateSpace({left: T, right: N});
                f = .6 * w.canvasHeight;
                y[0] && this._allocateSpace(y[0].placeAxis(f));
                f = .325 * w.canvasHeight;
                this._getDSspace && this._allocateSpace(this._getDSspace(f));
                r && this._allocateSpace({bottom: r});
                this._allocateSpace({top: g, bottom: g, left: g, right: g});
                y = p > w.canvasTop ? p - w.canvasTop : 0;
                r = G > da - w.canvasBottom ? G + w.canvasBottom - da : 0;
                N = u > w.canvasLeft ? u - w.canvasLeft : 0;
                T = O > x - w.canvasRight ? O + w.canvasRight - x : 0;
                this._allocateSpace({top: y, bottom: r, left: N, right: T});
                w.actualCanvasMarginTop = y;
                w.actualCanvasMarginLeft = N;
                w.actualCanvasMarginRight = T;
                w.actualCanvasMarginBottom = r
            },
            _postSpaceManagement: function () {
                var b = this.config, a = this.components, f = a.xAxis && a.xAxis[0], w = a.legend,
                    U = b.xDepth, g = a.canvas.config, a = g.canvasBorderWidth, y = g.canvasPadding,
                    n = g.canvasPaddingLeft, g = g.canvasPaddingRight;
                f && f.setAxisDimention({
                    x: b.canvasLeft + (U || 0) + z(n, y),
                    y: b.canvasBottom + (b.shift || 0) + a,
                    opposite: b.canvasTop - a,
                    axisLength: b.canvasWidth - (U || 0) - z(n, y) - z(g, y)
                });
                f && f.shiftLabels(-U, 0);
                w.postSpaceManager()
            },
            _resuffelAxis: function () {
                var b = this.data("axisDetails"), a = b.iapi, f = a.config.axesArr, w, U, g, y, n;
                w = f.leftAxes;
                U = f.rightAxes;
                if ("l" === b.position) {
                    for (y = w.length - 1; y > b.index; y--) if (w[y].showAxis) {
                        g =
                            y;
                        n = b.index;
                        break
                    }
                    void 0 !== g && (b = A({}, w[n]), w[n] = A({}, w[g]), w[g] = A({}, b));
                    if (f.leftSideSelected && void 0 === g) return;
                    f.leftSideSelected = !0
                } else {
                    for (y = 0; y < b.index; y++) if (U[y].showAxis) {
                        g = y;
                        n = b.index;
                        break
                    }
                    void 0 !== g && (b = A({}, U[n]), U[n] = A({}, U[g]), U[g] = A({}, b));
                    if (!f.leftSideSelected && void 0 === g) return;
                    f.leftSideSelected = !1
                }
                a._drawAxis(!0)
            },
            _dolegendInteraction: function (b, a) {
                var f = a.components.dataset, w = a.components.legend, U;
                if (this.checked) for (U in f) f.hasOwnProperty(U) && (f[U].visible || f[U].axisIndex !==
                    b || f[U].show()); else for (U in f) f.hasOwnProperty(U) && f[U].visible && f[U].axisIndex === b && f[U].hide();
                w.drawLegend()
            },
            _drawAxis: function (b) {
                var a = this.config, f = a.axesArr, w = this.components, U = w.yAxis || [], g = w.xAxis || [],
                    y = w.paper, P = a.allowAxisShift, r = a.allowSelection, d = this.graphics.axisHotElement || [],
                    N = this.graphics.trackerContainer, T = this.graphics.buttonGroup, h = w.canvas.config,
                    q = h.canvasBorderWidth, k = h.canvasPaddingTop, h = h.canvasPaddingBottom, t = a.axesPadding,
                    O = this.components.tb, x = 0, p = 0, G = 0, u, da, ma, m,
                    aa, z, c, v, K, V, D, A, e, F, B, E, M = !1, I = 0, X, W;
                K = this.get(l, C);
                X = K.animObj;
                W = K.dummyObj;
                D = K.transposeAnimDuration;
                A = K.animType;
                K = w.tb || (w.tb = new (J.register("component", ["toolbox", "toolbox"])));
                K.init({iAPI: this, graphics: this.graphics, chart: this, components: w});
                V = w.toolBoxAPI.CheckboxSymbol;
                aa = f.leftAxes;
                w = f.rightAxes;
                F = f.checkBox;
                for (z in F) F.hasOwnProperty(z) && F[z].checkbox.hide();
                v = {cursor: "col-resize", stroke: H, fill: H, ishot: !0, visibility: !0};
                for (z = aa.length - 1; 0 <= z; --z) if (0 !== aa[z].showAxis && (u = a.canvasLeft -
                    q - x - t, da = a.canvasTop + k, ma = a.canvasHeight - k - h, m = aa[z].width, e = aa[z].index, c = U[e], c.setAxisDimention({
                    x: u,
                    y: da,
                    opposite: a.canvasRight + q,
                    axisLength: ma
                }), x += m + t, !M && f.leftSideSelected ? (c.setAxisConfig({
                    isActive: !0,
                    axisNameAlignCanvas: !0,
                    drawAxisNameFromBottom: !0
                }), M = !0) : c.setAxisConfig({
                    isActive: !1,
                    axisNameAlignCanvas: !0,
                    drawAxisNameFromBottom: !0
                }), r && (F[e] ? (c = F[e], B = u - m - F[e].checkboxPrePos.x, E = da + ma + 4 - F[e].checkboxPrePos.y, c.checkbox.show(), c.checkbox.attachEventHandlers({
                    click: {
                        fn: this._dolegendInteraction,
                        args: [e, this]
                    }
                }), D ? c.checkbox.node.animateWith(W, X, {transform: "t" + B + "," + E}, D, A) : c.checkbox.node.attr({transform: "t" + B + "," + E})) : (c = F[e] = {}, c.checkbox = new V(S, !0, I++, O.pId), c.checkbox.conf = K.getDefaultConfiguration(), c.checkbox.attachEventHandlers({
                    click: {
                        fn: this._dolegendInteraction,
                        args: [e, this]
                    }
                }), c.checkbox.draw(u - m, da + ma + 4, {parentLayer: T}), c.checkboxPrePos = {
                    x: u - m,
                    y: da + ma + 4
                }), c.checkbox.node.attr({
                    stroke: Q({
                        color: a.checkBoxColor,
                        alpha: 100
                    })
                }), c.checkbox.node.attr({"stroke-width": [1, 2]}), a.axisConfigured &&
                (aa[z].checkBoxChecked ? c.checkbox.check() : c.checkbox.uncheck())), P)) {
                    v.x = u - m;
                    v.y = da;
                    v.width = m;
                    v.height = ma;
                    if (d[G]) for (ma = d[G].attr(v), ma.show(), u = 0, da = ma.events.length; u < da; u++) ma.events[u].unbind(), ma.events.splice(u, 1), --da; else ma = d[G] = y.rect(v, N);
                    ma.data("axisDetails", {iapi: this, position: "l", index: z});
                    n ? ma.touchstart(this._resuffelAxis) : ma.mousedown(this._resuffelAxis);
                    G += 1
                }
                z = 0;
                for (x = w.length; z < x; z += 1) if (0 !== w[z].showAxis && (e = w[z].index, c = U[e], u = a.canvasRight + q + p + t, da = a.canvasTop + k, ma = a.canvasHeight -
                    k - h, m = w[z].width, c.setAxisDimention({
                    x: u,
                    y: da,
                    opposite: a.canvasLeft - q,
                    axisLength: ma
                }), p += w[z].width + t, M || f.leftSideSelected ? c.setAxisConfig({
                    isActive: !1,
                    axisNameAlignCanvas: !0,
                    drawAxisNameFromBottom: !0
                }) : (c.setAxisConfig({
                    isActive: !0,
                    axisNameAlignCanvas: !0,
                    drawAxisNameFromBottom: !0
                }), M = !0), aa = c.getAxisConfig("axisNamePadding"), r && (F[e] ? (c = F[e], B = u - m - c.checkboxPrePos.x, E = da + ma + 4 - c.checkboxPrePos.y, c.checkbox.show(), c.checkbox.attachEventHandlers({
                    click: {
                        fn: this._dolegendInteraction,
                        args: [e, this]
                    }
                }),
                    D ? c.checkbox.node.animateWith(W, X, {transform: "t" + B + "," + E}, D, A) : c.checkbox.node.attr({transform: "t" + B + "," + E})) : (c = F[e] = {}, c.checkbox = new V(S, !0, I++, O.pId), c.checkbox.conf = K.getDefaultConfiguration(), c.checkbox.attachEventHandlers({
                    click: {
                        fn: this._dolegendInteraction,
                        args: [e, this]
                    }
                }), c.checkbox.draw(u + aa, da + ma + 4, {parentLayer: T}), c.checkboxPrePos = {
                    x: u - m,
                    y: da + ma + 4
                }), c.checkbox.node.attr({
                    stroke: Q({
                        color: a.checkBoxColor,
                        alpha: 100
                    })
                }), c.checkbox.node.attr({"stroke-width": [1, 2]}), a.axisConfigured && (w[z].checkBoxChecked ?
                    c.checkbox.check() : c.checkbox.uncheck())), P)) {
                    v.x = u;
                    v.y = da;
                    v.width = m;
                    v.height = ma;
                    if (d[G]) for (ma = d[G].attr(v), ma.show(), u = 0, da = ma.events.length; u < da; u++) ma.events[u].unbind(), ma.events.splice(u, 1), --da; else ma = d[G] = y.rect(v, N);
                    ma.data("axisDetails", {iapi: this, position: "r", index: z});
                    n ? ma.touchstart(this._resuffelAxis) : ma.mousedown(this._resuffelAxis);
                    G += 1
                }
                this.graphics.axisHotElement = d;
                z = G;
                for (x = d.length; z < x; z += 1) d[z].hide();
                if (!b) for (z = 0, x = g.length; z < x; z++) g[z].draw();
                z = 0;
                for (x = U.length; z < x; z++) U[z].draw();
                a.axisConfigured = !1
            }
        }, a.mscartesian, {enablemousetracking: !0}, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-inversemsline", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), E = a.chartAPI;
        E("inversemsline", {
            friendlyName: "Inverted Y-Axis Multi-series Line Chart",
            standaloneInit: !0,
            creditLabel: c,
            defaultDatasetType: a.preDefStr.line,
            defaultPlotShadow: 1,
            applicableDSList: {LINE: !0}
        }, E.msinversecartesian, {
            zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0,
            enablemousetracking: !0
        }, E.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-inversemsarea", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
        a("inversemsarea", {
            friendlyName: "Inverted Y-Axis Multi-series Area Chart",
            standaloneInit: !0,
            creditLabel: c,
            defaultDatasetType: "area",
            applicableDSList: {area: !0}
        }, a.msinversecartesian, {enablemousetracking: !0}, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-inversemscolumn2d", function () {
        var a =
            this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), E = a.chartAPI;
        E("inversemscolumn2d", {
            friendlyName: "Inverted Y-Axis Multi-series Column Chart",
            standaloneInit: !0,
            creditLabel: c,
            defaultDatasetType: a.preDefStr.column,
            applicableDSList: {COLUMN: !0},
            isInverse: !0
        }, E.msinversecartesian, {enablemousetracking: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-logmsline", function () {
        var a = this.hcLib, c = a.preDefStr.line, E = !a.CREDIT_REGEX.test(this.window.location.hostname),
            a = a.chartAPI;
        a("logmsline",
            {
                standaloneInit: !0,
                friendlyName: "Multi-series Line Chart",
                creditLabel: E,
                defaultDatasetType: c,
                defaultPlotShadow: 1,
                applicableDSList: {LINE: !0}
            }, a.mslog, {
                zeroplanethickness: 1,
                enablemousetracking: !0,
                zeroplanealpha: 40,
                showzeroplaneontop: 0
            }, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-logmscolumn2d", function () {
        var a = this.hcLib, c = a.preDefStr.column, E = !a.CREDIT_REGEX.test(this.window.location.hostname),
            a = a.chartAPI;
        a("logmscolumn2d", {
            friendlyName: "Multi-series Log Column Chart", standaloneInit: !0,
            creditLabel: E, defaultDatasetType: c, applicableDSList: {COLUMN: !0}
        }, a.mslog, {enablemousetracking: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-logstackedcolumn2d", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
        a("logstackedcolumn2d", {
            friendlyName: "Stacked Log Column Chart",
            standaloneInit: !0,
            creditLabel: c
        }, a.logmscolumn2d, {isstacked: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-errorbar2d", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname),
            a = a.chartAPI;
        a("errorbar2d", {
            friendlyName: "Error Bar Chart",
            standaloneInit: !0,
            creditLabel: c,
            showValues: 0,
            isErrorChart: !0,
            fireGroupEvent: !0,
            hasLegend: !0,
            defaultDatasetType: "errorbar2d",
            applicableDSList: {errorbar2d: !0},
            eiMethods: {}
        }, a.mscartesian, {enablemousetracking: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-errorline", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), a = a.chartAPI;
        a("errorline", {
            friendlyName: "Error Line Chart",
            useErrorGroup: !0,
            isErrorChart: !0,
            fireGroupEvent: !0,
            creditLabel: c,
            defaultPlotShadow: 1,
            axisPaddingLeft: 0,
            axisPaddingRight: 0,
            canvasPaddingModifiers: ["anchor", "errorbar"],
            defaultDatasetType: "errorline",
            applicableDSList: {errorline: !0}
        }, a.mscartesian, {
            zeroplanethickness: 1,
            zeroplanealpha: 40,
            showzeroplaneontop: 0,
            enablemousetracking: !0
        }, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-errorscatter", function () {
        var a = this.hcLib, c = a.chartAPI, a = !a.CREDIT_REGEX.test(this.window.location.hostname);
        c("errorscatter", {
            friendlyName: "Error Scatter Chart",
            isXY: !0,
            standaloneInit: !0,
            creditLabel: a,
            defaultDatasetType: "errorscatter",
            applicableDSList: {errorscatter: !0},
            defaultZeroPlaneHighlighted: !1,
            useErrorGroup: !0,
            isErrorChart: !0,
            fireGroupEvent: !0,
            initAnimation: !0
        }, c.scatterBase, {enablemousetracking: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-waterfall2d", function () {
        var a = this.hcLib, c = a.chartAPI, E = !a.CREDIT_REGEX.test(this.window.location.hostname), e = a.each;
        c("waterfall2d", {
            standaloneInit: !0,
            friendlyName: "Waterfall Chart",
            creditLabel: E,
            defaultDatasetType: "Waterfall2D",
            applicableDSList: {Waterfall2D: !0},
            singleseries: !0,
            hasLegend: !1,
            _dataSegregator: function (a) {
                var c = [], E = [];
                e(a, function (a, e) {
                    "true" !== a.vline && !0 !== a.vline && 1 !== a.vline && "1" !== a.vline ? c.push(a) : E.push({
                        index: e,
                        data: a
                    })
                });
                return {data: c, catData: E}
            }
        }, c.sscartesian, {enablemousetracking: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-multilevelpie", function () {
        var a = this.hcLib, c = a.chartAPI, E = !a.CREDIT_REGEX.test(this.window.location.hostname),
            e = a.parseUnsafeString,
            ba = a.BLANKSTRING, W = a.preDefStr.sStr, S = a.pluck;
        c("multilevelpie", {
            standaloneInit: !0,
            friendlyName: "Multi-level Pie Chart",
            creditLabel: E,
            defaultDatasetType: "multiLevelPie",
            applicableDSList: {multiLevelPie: !0},
            is3d: !0,
            hasLegend: !1,
            hasCanvas: !1,
            _createDatasets: function () {
                var a = this.components, c = this.jsonData, E = c.dataset || [], M = E.length, R, r,
                    D = this.defaultDatasetType, v = this.applicableDSList, A;
                R = [];
                var F = {};
                R = this.config.categories = c.category || [];
                c = R.length;
                !M && c && (E = R, M = c);
                c || this.setChartMessage();
                R = a.dataset ||
                    (a.dataset = []);
                for (a = 0; a < M; a += 1) if (c = E[a], c.seriesname && (c.seriesname = e(c.seriesname)), r = c.parentyaxis || ba, r = (r = r.toLowerCase() === W ? S(c.renderas, this.sDefaultDatasetType) : S(c.renderas, D)) && r.toLowerCase(), v[r] || (r = D), A = J.get("component", ["dataset", r])) void 0 === F[r] ? F[r] = 0 : F[r]++, R[0] ? (r = R[0], r.JSONData = c) : (r = new A, R.push(r), r.chart = this, r.index = a), r.init(E)
            },
            _spaceManager: function () {
                var a = this.config;
                this._allocateSpace(this._manageActionBarSpace && this._manageActionBarSpace(.225 * a.availableHeight) ||
                    {});
                this._manageChartMenuBar(.7 * a.canvasHeight)
            }
        }, c.guageBase)
    }]);
    J.register("module", ["private", "modules.renderer.js-radar", function () {
        var a = this.hcLib, c = a.chartAPI, a = !a.CREDIT_REGEX.test(this.window.location.hostname);
        c("radar", {
            friendlyName: "Radar Chart",
            standaloneInit: !0,
            creditLabel: a,
            defaultDatasetType: "radar",
            applicableDSList: {radar: !0},
            hasLegend: !0,
            areaAlpha: 50,
            defaultPlotShadow: 0,
            _postSpaceManagement: function () {
                var a = this.components, c = this.config, ba = a.legend;
                (a.yAxis && a.yAxis[0]).setAxisDimention({
                    x: c.canvasLeft +
                        c.canvasWidth / 2, y: c.canvasTop, axisLength: c.canvasHeight / 2
                });
                ba.postSpaceManager()
            },
            _mouseEvtHandler: function (a) {
                return c.dragbase._mouseEvtHandler.call(this, a)
            }
        }, c.mspolar, {
            radarradius: 0,
            radarborderthickness: 2,
            showvalues: 0,
            plotfillalpha: 50,
            enablemousetracking: !0
        }, c.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-dragbase", function () {
        var a = this, c = a.hcLib, E = a.window, e = E.document, ba = c.preDefStr, W = ba.colors.FFFFFF,
            S = c.ZEROSTRING, I = ba.UNDERSCORE, B = c.BLANKSTRING, X = c.BLANKSTRING, M = c.pluck,
            R = c.getValidValue, r = c.pluckNumber, D = c.extend2, v = c.hasSVG, A = c.isIE, F = c.regex.dropHash,
            l = c.HASHSTRING, C = c.schedular, H = c.priorityList, Q = function (b, a) {
                var f;
                b || (b = {});
                for (f in a) b[f] = a[f];
                return b
            }, n = c.addEvent, b = c.removeEvent, ba = Math, z = ba.min, f = ba.max, K = c.hasTouch,
            V = c.graphics.convertColor, m = c.chartAPI, Z = a.xssEncode, ga = c.createElement;
        m("dragbase", {
            configure: function () {
                var b = this.jsonData.chart, f, n;
                this.base.base.configure.call(this);
                n = this.config;
                n.formAction = R(b.formaction);
                b.submitdataasxml !== S ||
                b.formdataformat || (b.formdataformat = a.dataFormats.CSV);
                n.formDataFormat = M(b.formdataformat, a.dataFormats.XML);
                n.formTarget = M(b.formtarget, "_self");
                n.formMethod = M(b.formmethod, "POST");
                n.submitFormAsAjax = r(b.submitformusingajax, 1);
                n.restoreBtnTitle = M(b.restorebtntitle, "Restore");
                n.submitBtnTitle = M(b.formbtntitle, "Submit");
                n.showFormBtn = r(b.showformbtn, 1) && n.formAction;
                n.showRestoreBtn = r(b.showrestorebtn, 1);
                n.formBtnTitle = M(b.formbtntitle, "Submit");
                n.formBtnBorderColor = M(b.formbtnbordercolor, "CBCBCB");
                n.formBtnBgColor = M(b.formbtnbgcolor, W);
                n.btnPadding = r(b.btnpadding, 7);
                n.btnSpacing = r(b.btnspacing, 5);
                n.formBtnStyle = {
                    fontSize: n.style.outCanfontSize,
                    fontFamily: n.style.outCanfontFamily,
                    fontWeight: "bold"
                };
                n.formBtnLabelFill = n.style.outCancolor;
                b.btntextcolor && (n.formBtnLabelFill = b.btntextcolor.replace(F, l));
                0 <= (f = r(b.btnfontsize)) && (n.formBtnStyle.fontSize = f + "px");
                n.restoreBtnWidth = r(b.restorebtnwidth, 0);
                n.formBtnWidth = r(b.formbtnwidth, 0);
                n.restoreBtnBorderColor = M(b.restorebtnbordercolor, n.formBtnBorderColor);
                n.restoreBtnBgColor = M(b.restorebtnbgcolor, n.formBtnBgColor);
                n.restoreBtnStyle = {
                    fontSize: n.formBtnStyle.fontSize,
                    fontFamily: n.formBtnStyle.fontFamily,
                    fontWeight: "bold"
                };
                n.restoreBtnLabelFill = n.formBtnLabelFill;
                b.toolbary || b.toolbarx ? n.spaceHardCoded = !0 : delete n.spaceHardCoded
            }, _createToolBox: function () {
                var b = this,
                    w = b.components.tb || (b.components.tb = new (J.register("component", ["toolbox", "toolbox"]))), n,
                    g, y, P = b.components, c, d, N, z = b.linkedItems.smartLabel, h = b.config, q = h.showRestoreBtn,
                    k = h.formAction,
                    t = h.restoreBtnTitle, O = h.submitBtnTitle, x = h.formBtnStyle, p = h.restoreBtnStyle,
                    G = h.restoreBtnWidth, u = h.restoreBtnBgColor, da = h.restoreBtnBorderColor, ma = h.formBtnBgColor,
                    r = h.formBtnBorderColor, aa = h.restoreBtnLabelFill, l = h.formBtnLabelFill, v = h.btnSpacing,
                    K = h.btnPadding, Z = h.formBtnWidth;
                n = P.chartMenuBar;
                d = P.actionBar;
                n && n.drawn || d && d.drawn || (n = w.init({
                    graphics: b.graphics || (b.graphics = {}),
                    chart: b,
                    components: b.components
                }), w.pId = n, n = P.toolBoxAPI = w.getAPIInstances(w.ALIGNMENT_HORIZONTAL), g = n.ComponentGroup,
                    y = n.Toolbar, c = n.Symbol, w.getDefaultConfiguration(), n = w.getDefaultConfiguration(), N = new c(t, !0, (w.idCount = w.idCount || 0, w.idCount++), w.pId), c = new c(O, !0, w.idCount++, w.pId), m.mscartesian._createToolBox.call(b), h.spaceHardCoded && (d = P.actionBar = P.chartMenuBar || P.actionBar), (d = P.actionBar) || (d = new y(w.idCount++, w.pId), d = P.actionBar = d), b.addConfigureOptions && b.addConfigureOptions(), w = new g(w.idCount++, w.pId), z.useEllipsesOnOverflow(h.useEllipsesWhenOverflow), z.setStyle(p), t = z.getOriSize(t), G = f(t.width, G),
                    h = t.height, z.setStyle(x), t = z.getOriSize(O), Z = f(Z, t.width), z = t.height, N.conf.width = G + K, c.conf.width = Z + K, N.conf.stroke = V(da, 100), N.conf.height = h + K, c.conf.height = z + K, c.conf.fill = V(ma, 100), c.conf.labelFill = V(l, 100), N.conf.fill = V(u, 100), N.conf.labelFill = V(aa, 100), c.conf.stroke = V(r, 100), c.conf.btnTextStyle.fontSize = x.fontSize, N.conf.btnTextStyle.fontSize = p.fontSize, n.spacing = v, w.setConfiguaration({
                    buttons: n,
                    group: {fill: V(W, 0), borderThickness: 0}
                }), q && (w.addSymbol(N), N.attachEventHandlers({
                    click: function () {
                        b.restoreData()
                    }
                })),
                k && (w.addSymbol(c), c.attachEventHandlers({
                    click: function () {
                        b.submitData(a)
                    }
                })), w.btnConfig.vAlign = "b", d.addComponent(w), d.toolbarConfig.fill = V("EBEBEB", 0), d.toolbarConfig.borderThickness = 0)
            }, addConfigureOptions: function () {
                var b = this, a = b.chartMenuTools, f = b.components, g = f.actionBar,
                    f = (f.chartMenuBar || g).componentGroups[0].symbolList[0].getListRefernce(),
                    g = r(b.jsonData.chart.allowaxischange, 1), a = a.set, y = [{
                        "Increase Upper Limit": {
                            handler: function () {
                                var a = b.components.yAxis[0].config.axisRange;
                                b.changeUpperLimits(a.max +
                                    a.tickInterval)
                            }, action: "click"
                        }
                    }, {
                        "Increase Lower Limit": {
                            handler: function () {
                                var a = b.components.yAxis[0].config.axisRange;
                                b.changeLowerLimits(a.min + a.tickInterval)
                            }, action: "click"
                        }
                    }, {
                        "Decrease Upper Limit": {
                            handler: function () {
                                var a = b.components.yAxis[0].config.axisRange;
                                b.changeUpperLimits(a.max - a.tickInterval)
                            }, action: "click"
                        }
                    }, {
                        "Decrease Lower Limit": {
                            handler: function () {
                                var a = b.components.yAxis[0].config.axisRange;
                                b.changeLowerLimits(a.min - a.tickInterval)
                            }, action: "click"
                        }
                    }];
                g && (a(y), f.appendAsList(y))
            },
            drawAxisUpdateUI: function () {
                var a = this, f = a.graphics, U = a.components.yAxis[0], g = U.config.axisRange,
                    y = U.getAxisConfig("extremeLabels") || [], U = a.config, P = g.min, g = g.max,
                    z = y.lastLabel.graphic, d = y.firstLabel.graphic, N = a.linkedItems.container, y = Q({
                        outline: "none",
                        "-webkit-appearance": "none",
                        filter: "alpha(opacity=0)",
                        position: "absolute",
                        background: "transparent",
                        border: "1px solid #cccccc",
                        textAlign: "right",
                        top: 0,
                        left: 0,
                        width: 50,
                        zIndex: 20,
                        opacity: 0,
                        borderRadius: 0,
                        display: "block"
                    }, a.config.style.inCanvasStyle ||
                    {}), r = c.hashify, P = {max: {label: z, value: g}, min: {label: d, value: P}}, h, q, k, t, O, x,
                    p = function (k, d, t) {
                        return k === d + X ? null : t ? a.changeUpperLimits(Number(k), !0) : a.changeLowerLimits(Number(k), !0)
                    }, d = function () {
                        var k = {
                            opacity: 1,
                            filter: "alpha(opacity=100)",
                            color: (a.config.style.inCanvasStyle || {}).color
                        }, d;
                        k.color && (k.color = r(k.color));
                        this.value = this.dataValue;
                        for (d in k) this.style[d] = k[d];
                        this.hasFocus = this.justFocussed = !0;
                        this.axisLabel && this.axisLabel.hide();
                        a.graphics.hiddenAxisLabels || (a.graphics.hiddenAxisLabels =
                            []);
                        a.graphics.hiddenAxisLabels.push(this.axisLabel)
                    }, G = function () {
                        return function () {
                            var k = this;
                            k.justFocussed && (k.justFocussed = !1, K || setTimeout(function () {
                                k.select()
                            }, 0))
                        }
                    }(), u = function () {
                        !0 !== p(this.value, this.oldValue, this.isMaxLabel) && (this.style.opacity = 0, this.style.filter = "alpha(opacity=0)", this.axisLabel && this.axisLabel.show());
                        A && e.getElementsByTagName("body")[0].focus && e.getElementsByTagName("body")[0].focus();
                        this.hasFocus = this.justFocussed = !1
                    }, da = function (k) {
                        var d = k.originalEvent.keyCode,
                            t = this.value, q = this.oldValue, h = this.isMaxLabel;
                        13 === d ? (d = p(t, q, h), !1 === d ? this.style.color = "#dd0000" : c.dem.fire(this, "blur", k)) : 27 === d && (this.value = q, c.dem.fire(this, "blur", k))
                    }, ma = function (k) {
                        return function (d) {
                            k.parentNode && c.dem.fire(k, "blur", d)
                        }
                    }, m = function (k, d) {
                        return function () {
                            b(a, "defaultprevented", d);
                            k.parentNode.removeChild(k)
                        }
                    }, aa = function (k) {
                        return function (d) {
                            d.srcElement !== k && k.hasFocus && c.dem.fire(k, "blur", d)
                        }
                    }, l = function (k, d) {
                        return function () {
                            b(N, "mousedown", d);
                            k.parentNode.removeChild(k)
                        }
                    },
                    Z;
                for (Z in P) if (h = P[Z], g = h.label, z = h.value, h.oldValue = z, q = g && g.getBBox(), h = "max" === Z ? !0 : !1, f.inputElements || (f.inputElements = {}), k = f.inputElements[Z], q && g) {
                    t = q.x + q.width - U.marginLeft;
                    O = U.canvasLeft - t - (v ? 4 : 5);
                    Q(y, {top: q.y + (v ? -1 : 0) + "px", left: O + "px", width: t + "px"});
                    k || (k = f.inputElements[Z] = ga("input", {
                        type: "text",
                        value: z,
                        name: z || X
                    }, N, !0), c.dem.listen(k, ["focus", "mouseup", "blur", "keyup"], [d, G, u, da]), k.setAttribute("isOverlay", "true"), v ? (n(N, "defaultprevented", q = ma(k)), n(N, "destroy", m(k, q))) : (n(N, "mousedown",
                        q = aa(k)), n(N, "destroy", l(k, q))));
                    k.dataValue = z;
                    y.color && (y.color = r(y.color));
                    for (x in y) k.style[x] = y[x];
                    k.value = z;
                    k.oldValue = z;
                    k.name = z || X;
                    k.axisLabel = g;
                    k.isMaxLabel = h
                } else k && (k.style.display = "none")
            }, changeUpperLimits: function (b) {
                var a = this.components, f = a.yAxis[0], g = f.config.axisRange, y = g.min, n = g.max,
                    c = this.config.yMax, g = !1, d = this.graphics.hiddenAxisLabels || [], z = d.length;
                void 0 !== b && b > c && b !== n ? g = !0 : b = c > n ? c : n;
                if (g) {
                    f.setAxisConfig({axisMaxValue: b, axisMinValue: y, showUpperLimit: !0});
                    f.setDataLimit(b,
                        y);
                    this._manageSpace();
                    this._postSpaceManagement();
                    this._drawCanvas();
                    this.chartMenuBar && this._drawChartMenuBar();
                    this._manageCaptionPosition();
                    this._drawCanvas();
                    a.caption && a.caption.draw();
                    this.drawLegend();
                    this.drawActionBar && this.drawActionBar();
                    for (a = 0; a < z; a++) f = d[a], f.show();
                    this._drawAxis && this._drawAxis();
                    this._drawDataset();
                    this.drawAxisUpdateUI()
                }
                return g
            }, changeLowerLimits: function (b) {
                var a = this.components, f = a.yAxis[0], g = f.config.axisRange, n = this.config.yMin, c = g.max, z,
                    d = !1, N = this.graphics.hiddenAxisLabels ||
                    [], r = N.length, g = g.min;
                void 0 !== b && b < n && b !== g ? (z = b, d = !0) : b = n < g ? n : g;
                if (d) {
                    f.setAxisConfig({axisMaxValue: c, axisMinValue: b});
                    f.setDataLimit(c, z);
                    this._manageSpace();
                    this._postSpaceManagement();
                    this._drawCanvas();
                    this.chartMenuBar && this._drawChartMenuBar();
                    this._manageCaptionPosition();
                    this._drawCanvas();
                    a.caption && a.caption.draw();
                    this.drawLegend();
                    this.drawActionBar && this.drawActionBar();
                    for (b = 0; b < r; b++) a = N[b], a.show();
                    this._drawAxis && this._drawAxis();
                    this._drawDataset();
                    this.drawAxisUpdateUI()
                }
                return d
            },
            eiMethods: {
                getDataWithId: function () {
                    for (var b = this.jsVars.instanceAPI.getJSONData(), a = [[B]], f = b.dataset, b = b.categories && b.categories[0] && b.categories[0].category, g = f && f.length || 0, n = 0, c, z, d, N, r, h; g--;) if (z = f[g]) for (a[0][g + 1] = z.id || z.seriesname, N = z.id || g + 1, h = (z = z.data) && z.length || 0, r = 0; r < h; r += 1) {
                        d = r + 1;
                        if (!a[d]) {
                            for (c = b && b[r + n] || {}; c.vline;) n += 1, c = b[r + n] || {};
                            c = c.label || c.name || B;
                            a[d] = [c]
                        }
                        c = a[d];
                        d = z[r].id || d + I + N;
                        c[g + 1] = [d, Number(z[r].value)]
                    }
                    return a
                }, getData: function (b) {
                    var f = this.jsVars.instanceAPI,
                        n = f.getJSONData(), g = [[B]], y = n.dataset,
                        c = n.categories && n.categories[0] && n.categories[0].category, z = y && y.length || 0, d = 0,
                        r, m;
                    if (b) g = /^json$/ig.test(b) ? n : a.core.transcodeData.call(f.chartInstance, n, "json", b); else for (; z--;) if (b = y[z]) for (g[0][z + 1] = y[z].seriesname, f = (b = y[z] && y[z].data) && b.length || 0, n = 0; n < f; n += 1) {
                        m = n + 1;
                        if (!g[m]) {
                            for (r = c && c[n + d] || {}; r.vline;) d += 1, r = c[n + d] || {};
                            r = r.label || r.name || B;
                            g[m] = [r]
                        }
                        m = g[m];
                        m[z + 1] = Number(b[n].value)
                    }
                    return g
                }, setUpperLimit: function (b, a) {
                    var f = this.apiInstance, g = f.getJobList(),
                        n, c = f.chartInstance.args.asyncRender;
                    if (a || c) g.eiMethods.push(C.addJob(function () {
                        n = f.changeUpperLimits(b);
                        "function" === typeof a && a(n)
                    }, H.postRender)); else return f.changeUpperLimits(b)
                }, setLowerLimit: function (b, a) {
                    var f = this.apiInstance, g = f.getJobList(), n, c = f.chartInstance.args.asyncRender;
                    if (a || c) g.eiMethods.push(C.addJob(function () {
                        n = f.changeLowerLimits(b);
                        "function" === typeof a && a(n)
                    }, H.postRender)); else return f.changeLowerLimits(b)
                }, getLowerLimit: function (b) {
                    var a = this.apiInstance, f = a.components,
                        g = f.yAxis && f.yAxis[0], a = a.getJobList();
                    if (g) if (b) a.eiMethods.push(C.addJob(function () {
                        b(g.config.axisRange.min)
                    }, H.postRender)); else return g.config.axisRange.min
                }, getUpperLimit: function (b) {
                    var a = this.apiInstance, f = a.components, g = f.yAxis && f.yAxis[0], a = a.getJobList();
                    if (g) if (b) a.eiMethods.push(C.addJob(function () {
                        b(g.config.axisRange.max)
                    }, H.postRender)); else return g.config.axisRange.max
                }
            }, restoreData: function () {
                var b = this.components, a = b.yAxis[0], f = b.dataset, b = b.legend, g = f.length, n,
                    z = this.graphics.hiddenAxisLabels ||
                        [], r;
                this.config.isDataRestored = !0;
                for (r = 0; r < g; r++) n = f[r], n.configure();
                a.setAxisConfig({axisMaxValue: void 0, axisMinValue: void 0});
                this._setAxisLimits();
                g = z.length;
                for (r = 0; r < g; r++) a = z[r], a.show();
                this._drawAxis();
                this._drawDataset();
                b._drawPointLegendItem();
                this.drawAxisUpdateUI();
                delete this.config.isDataRestored;
                c.raiseEvent("dataRestored", {}, this.chartInstance, [this.chartInstance.id])
            }, submitData: function (b) {
                var a = this.chartInstance, f = new b.ajax, g = this.config, n = b.dataFormats.JSON,
                    z = b.dataFormats.CSV,
                    r = b.dataFormats.XML, d = g.formAction, N = this.chartInstance, m = g.submitFormAsAjax, h, q, k, t,
                    O;
                g.formDataFormat === n ? (h = n, q = JSON.stringify(this.getJSONData())) : this.formDataFormat === z ? (h = z, q = a.getCSVString && a.getCSVString(), void 0 === q && (q = b.core.transcodeData(this.getJSONData(), n, z))) : (h = r, q = b.core.transcodeData(this.getJSONData(), n, r));
                b.raiseEvent("beforeDataSubmit", {data: q}, N, void 0, function () {
                    m ? (f.onError = function (k, d, t, b) {
                        c.raiseEvent("dataSubmitError", {
                            xhrObject: d.xhr, url: b, statusText: k, httpStatus: d.xhr &&
                            d.xhr.status ? d.xhr.status : -1, data: q
                        }, N, [N.id, k, d.xhr && d.xhr.status])
                    }, f.onSuccess = function (k, d, t, b) {
                        c.raiseEvent("dataSubmitted", {xhrObject: f, response: k, url: b, data: q}, N, [N.id, k])
                    }, k = {}, k["str" + h.toUpperCase()] = q, f.open && f.abort(), f.post(d, k)) : (t = E.document.createElement("span"), t.innerHTML = '<form style="display:none" action="' + d + '" method="' + g.formMethod + '" target="' + g.formTarget + '"> <input type="hidden" name="strXML" value="' + Z(q) + '"><input type="hidden" name="dataFormat" value="' + h.toUpperCase() +
                        '" /></form>', O = t.removeChild(t.firstChild), E.document.body.appendChild(O), O.submit && O.submit(), O.parentNode.removeChild(O), t = O = null)
                }, function () {
                    b.raiseEvent("dataSubmitCancelled", {data: q}, N)
                })
            }, getJSONData: function () {
                var b = this.defaultDatasetType && this.defaultDatasetType.toLowerCase(), a = this.components,
                    f = a["datasetGroup_" + b], b = a.dataset, g = this.jsonData.dataset, n, c = this.jsonData,
                    z = b.length, a = [], d;
                if (f && f.getJSONData) a = f.getJSONData(); else for (f = 0; f < z; f++) n = b[f], d = n.getJSONData(), n = g[f] || {}, delete n.data,
                    a.push(D(n, d));
                b = D({}, c);
                b.dataset = a;
                return b
            }, _setDataLimits: function () {
                var b = this.components.dataset, a = this.config, n = -Infinity, g = Infinity, y, c, r;
                c = b.length;
                for (r = 0; r < c; r++) y = b[r], y = y.getDataLimits(), n = f(n, y.max), g = z(g, y.min);
                a.yMax = n;
                a.yMin = g
            }, _mouseEvtHandler: function (b) {
                var a = b.data.mouseTracker, f = this.config, g = f.canvasLeft, n = f.canvasRight, z = f.canvasBottom,
                    r = f.canvasTop, d = f.datasetOrder || this.components.dataset,
                    N = c.getMouseCoordinate(this.linkedItems.container, b.originalEvent, this), m = N.chartX,
                    h = N.chartY, q, k, t = !1, O = d.length, x, p = a._lastDatasetIndex, N = a._lastPointIndex, G,
                    f = f.dragTolerance || 0;
                void 0 !== N && (G = d[p].components.data[N].config.dragStart);
                if (!G && m > g - f && m < n + f && h > r - f && h < z + f || !G && this.config.plotOverFlow) for (; O-- && !t;) (q = d[O]) && q.visible && (k = q._getHoveredPlot && q._getHoveredPlot(m, h)) && k.hovered && (t = !0, k.datasetIndex = O, x = a._getMouseEvents(b, k.datasetIndex, k.pointIndex));
                G && void 0 !== p && (g = "mouseout" === b.type ? "mousemove" : b.type, d[p] && d[p]._firePlotEvent && d[p]._firePlotEvent(g, N, b));
                !G &&
                (!t || x && x.fireOut) && void 0 !== p && (delete a._lastDatasetIndex, delete a._lastPointIndex, d[p] && d[p]._firePlotEvent && d[p]._firePlotEvent("mouseout", N, b));
                if (t) for (d = x.events && x.events.length, a._lastDatasetIndex = k.datasetIndex, N = a._lastPointIndex = k.pointIndex, a = 0; a < d; a += 1) q && q._firePlotEvent && q._firePlotEvent(x.events[a], N, b)
            }
        }, m.mscartesian)
    }]);
    J.register("module", ["private", "modules.renderer.js-dragnode", function () {
        var a = this, c = a.hcLib, E = c.ZEROSTRING, e = c.pluck, ba = c.getValidValue, W = c.pluckNumber,
            S = c.extend2,
            I = c.componentDispose, B = Math, X = B.min, M = B.max,
            B = !c.CREDIT_REGEX.test(a.window.location.hostname), R = c.chartAPI;
        R("dragnode", {
            friendlyName: "Dragable Node Chart",
            standaloneInit: !0,
            fireGroupEvent: !0,
            hasLegend: !0,
            numVDivLines: 0,
            numDivLines: 0,
            usesXYinCategory: !0,
            showLimits: 0,
            setadaptivexmin: 1,
            showdivlinevalues: 0,
            showzeroplane: 0,
            showyaxisvalues: 0,
            dontShowLegendByDefault: !0,
            creditLabel: B,
            defaultDatasetType: "dragnode",
            configure: function () {
                var c = this.jsonData.chart, D;
                R.dragbase.configure.call(this);
                D = this.config;
                D.formAction = ba(c.formaction);
                c.submitdataasxml !== E || c.formdataformat || (c.formdataformat = a.dataFormats.CSV);
                D.formDataFormat = e(c.formdataformat, a.dataFormats.XML);
                D.formTarget = e(c.formtarget, "_self");
                D.formMethod = e(c.formmethod, "POST");
                D.submitFormAsAjax = W(c.submitformusingajax, 1);
                D.viewMode = W(c.viewmode, 0)
            },
            _createDatasets: function () {
                var a = this.config, c = this.components, v = this.jsonData, A = v.dataset, e = v.connectors,
                    l = v.labels && v.labels.label || [], C = A && A.length, H = e && e.length, Q = l && l.length || [],
                    n = c.legend,
                    b, z, f, K, V, m, Z, ga, L, w;
                ga = 0;
                var U = a.datasetMap || (a.datasetMap = {connectors: [], dragnode: [], labels: []}), g,
                    y = {connectors: [], dragnode: [], labels: []}, P = {};
                if (A) {
                    this.config.categories = v.categories && v.categories[0].category;
                    z = c.dataset = [];
                    b = J.register("component", ["datasetGroup", "dragnode"]);
                    v = c.datasetGroup_dragnode;
                    b && !v && (v = c.datasetGroup_dragnode = new b, v.chart = this, v.init());
                    V = J.get("component", ["dataset", "Dragnode"]);
                    m = J.get("component", ["dataset", "Connector"]);
                    Z = J.get("component", ["dataset", "DragableLabels"]);
                    for (b = 0; b < C; b++) c = "dragnode", f = U[c], g = f[0], void 0 === P[c] ? P[c] = 0 : P[c]++, g ? (K = A[b], L = g.components && g.components.data || [], y[c].push(g), z.push(g), L = L.length, w = K && K.data && K.data.length || 0, L > w && g.removeData(w - 1, L - w), g.JSONData = K, g.configure(), f.shift()) : (K = A[b], f = new V, f.chart = this, y[c].push(f), z.push(f), f.chart = this, f.index = b, f.init(K), v.addDataset(f, b)), ga++;
                    for (b = 0; b < H; b++) c = "connectors", C = e[b], f = U[c], g = f[0], void 0 === P[c] ? P[c] = 0 : P[c]++, g ? (L = g.components && g.components.data || [], L = L.length, w = C.connector &&
                        C.connector.length || 0, y[c].push(g), z.push(g), L > w && g.removeData(w - 1, L - w), g.JSONData = C, g.configure(), f.shift()) : (f = new m, f.chart = this, f.index = b, y[c].push(f), z.push(f), f.init(C), v.addConnectors(f, b)), ga++;
                    c = "labels";
                    f = U[c];
                    g = f[0];
                    void 0 === P[c] ? P[c] = 0 : P[c]++;
                    g ? (L = g.JSONData, L = L.length, w = Q, y[c].push(g), z.push(g), L > w && g.removeData(w - 1, L - w), g.JSONData = l, g.configure(), f.shift()) : (ga = new Z, ga.chart = this, y[c].push(ga), z.push(ga), ga.init(l), v.addLabels(ga, 0));
                    this.config._datasetUpdated = !0;
                    for (A in U) if (f = U[A],
                        l = f.length, ga = P[A] || -1, l) for (e = 0; e < l; e++) "dragnode" === A ? (v.removeNodeDataset(ga), v._clearConnectors(), n.removeItem(f[e].legendItemId)) : "connectors" === A ? v.removeConnectorSet(ga) : v.removeLabelSet(ga), I.call(f[e]), ga += 1;
                    a.datasetMap = y
                } else this.setChartMessage()
            },
            addConfigureOptions: function () {
                var a = this.chartMenuTools, c = this.components, v = c.actionBar,
                    A = this.components["datasetGroup_" + this.defaultDatasetType],
                    c = (c.chartMenuBar || v).componentGroups[0].symbolList[0].getListRefernce(), a = a.set,
                    v = this.config.viewMode,
                    e = [{
                        "Add Node": {
                            handler: function () {
                                A.showNodeAddUI()
                            }, action: "click"
                        }
                    }, {
                        "Add Connector": {
                            handler: function () {
                                A.showConnectorAddUI(A.chart, {})
                            }, action: "click"
                        }
                    }, {
                        "Add Label": {
                            handler: function () {
                                A.showLabelUpdateUI(A.chart, {})
                            }, action: "click"
                        }
                    }];
                a(e);
                !v && c.appendAsList(e)
            },
            _redrawDragNode: function (a, e) {
                var v = this.chart;
                this.draw();
                c.raiseEvent("chartUpdated", S({sourceEvent: e}, a), v.chartInstance, [v.chartInstance.id])
            },
            addNode: function (c) {
                var e = this.components.dataset, v = c.datasetId, A = e.length, F, l, C, H;
                for (H = 0; H < A; H++) if (F = e[H] || {}, C = F.config && F.config.id, void 0 !== C && (C = C.toString()), C === v) {
                    l = !0;
                    break
                }
                F && l && (e = F.groupManager, v = F.components.data, c.add = !0, A = v.length, v = {
                    index: A,
                    dataIndex: A,
                    link: c.link,
                    y: c.y,
                    x: c.x,
                    shape: c.shape,
                    width: c.width,
                    height: c.height,
                    radius: c.radius,
                    sides: c.sides,
                    label: c.name,
                    toolText: c.tooltext,
                    id: c.id,
                    datasetIndex: F.index,
                    datasetName: F.JSONData.seriesname,
                    sourceType: "dataplot"
                }, F._setConfigure(A, c), this._redrawDragNode.call(e, v, "nodeAdded"), a.raiseEvent("nodeAdded", v, this.chartInstance))
            },
            updateNode: function (c) {
                var e = this.components["datasetGroup_" + this.defaultDatasetType], v = e.datasets, A = v.length, F, l,
                    C, H, Q, n, b;
                c.update = !0;
                for (Q = 0; Q < A; Q++) for (C = v[Q].dataset, n = C.components.data || [], F = n.length, b = 0; b < F; b++) if (H = n[b], H.config.id === c.id) {
                    l = !0;
                    break
                }
                C && l && (v = {
                    index: b,
                    dataIndex: b,
                    link: c.link,
                    y: c.y,
                    x: c.x,
                    shape: c.shape,
                    width: c.width,
                    height: c.height,
                    radius: c.radius,
                    sides: c.sides,
                    label: c.name,
                    toolText: c.tooltext,
                    id: c.id,
                    datasetIndex: C.index,
                    datasetName: C.JSONData.seriesname,
                    sourceType: "dataplot"
                },
                    C._setConfigure(b, c), this._redrawDragNode.call(e, v, "nodeupdated"), a.raiseEvent("nodeupdated", v, this.chartInstance))
            },
            deleteNode: function (r) {
                var e = this.components["datasetGroup_" + this.defaultDatasetType].nodes, v = e[r], A, F, l, C, H, Q, n,
                    b, z = function (b) {
                        for (var a in b) b[a].remove()
                    };
                if (v) {
                    A = v.dataset;
                    F = A.components.data;
                    l = v.config.startConnectors;
                    C = v.config.endConnectors;
                    b = F.length;
                    for (v = 0; v < b; v++) if (Q = F[v], Q.config.id === r) {
                        H = !0;
                        break
                    }
                    if (!0 === H) {
                        F = Q.graphics;
                        z(F);
                        for (n in l) H = l[n] || {}, F = H.graphics, z(F), delete H.graphics,
                            H.removed = !0;
                        for (n in C) H = C[n] || {}, F = H.graphics, z(F), delete H.graphics, H.removed = !0;
                        delete e[r];
                        Q.removed = !0;
                        r = Q.config || {};
                        A = {
                            index: v,
                            dataIndex: v,
                            link: r.link,
                            y: r.y,
                            x: r.x,
                            shape: r.shape,
                            width: r.width,
                            height: r.height,
                            radius: r.radius,
                            sides: r.sides,
                            label: r.displayValue,
                            toolText: r.toolText,
                            id: r.id,
                            datasetIndex: v,
                            datasetName: A.JSONData.seriesname,
                            sourceType: "dataplot"
                        };
                        c.raiseEvent("chartUpdated", S({sourceEvent: "nodedeleted"}, A), this.chartInstance, [this.chartInstance.id]);
                        a.raiseEvent("nodedeleted", A, this.chartInstance)
                    }
                }
            },
            addConnector: function (c) {
                var e = this.components["datasetGroup_" + this.defaultDatasetType], v = e.connectorSet[0].connectors,
                    A = v.components.data.length;
                c.add = !0;
                v._setConfigure(A, c);
                c = {
                    arrowAtEnd: !!c.arrowAtEnd,
                    arrowAtStart: !!c.arrowAtStart,
                    fromNodeId: c.from,
                    id: c.id,
                    label: c.label,
                    link: c.connectorLink,
                    sourceType: "connector",
                    toNodeId: c.to
                };
                this._redrawDragNode.call(e, c, "connectoradded");
                a.raiseEvent("connectoradded", c, this.chartInstance)
            },
            editConnector: function (c) {
                var e = this.components["datasetGroup_" + this.defaultDatasetType],
                    v = c.from, A = c.to, F = e.connectorSet, l, C, H, Q, n, b, z, f, K = F.length;
                for (l = 0; l < K; l++) for (H = (f = F[l].connectors) && f.components.data || [], C = H.length, b = 0; b < C; b++) if (Q = H[b], n = Q.config, Q = n.from, n = n.to, Q === v && n === A) {
                    z = !0;
                    break
                }
                c.update = !0;
                z && (f._setConfigure(b, c), c = {
                    arrowAtEnd: !!c.arrowatend,
                    arrowAtStart: !!c.arrowatstart,
                    fromNodeId: c.from,
                    id: c.id,
                    label: c.label,
                    link: c.link,
                    sourceType: "connector",
                    toNodeId: c.to
                }, this._redrawDragNode.call(e, c, "connectorupdated"), a.raiseEvent("connectorupdated", c, this.chartInstance))
            },
            deleteConnector: function (r) {
                var e = r.from;
                r = r.to;
                var v = this.components["datasetGroup_" + this.defaultDatasetType].connectorSet, A, F, l, C, H, Q = !1,
                    n = v.length;
                for (A = 0; A < n; A++) for (F = v[A].connectors, C = F.components.data, H = C.length, F = 0; F < H; F++) if (l = C[F], l.config.from === e && l.config.to === r) {
                    Q = !0;
                    break
                }
                if (Q) {
                    e = l.config || {};
                    e = {
                        arrowAtEnd: e.arrowAtEnd,
                        arrowAtStart: e.arrowAtStart,
                        fromNodeId: e.from,
                        id: e.id,
                        label: e.label,
                        link: e.connectorLink,
                        sourceType: "connector",
                        toNodeId: e.to
                    };
                    r = l.graphics;
                    for (var b in r) r[b].remove();
                    delete l.graphics;
                    l.removed = !0;
                    c.raiseEvent("chartUpdated", S({sourceEvent: "connectordeleted"}, e), this.chartInstance, [this.chartInstance.id]);
                    a.raiseEvent("connectordeleted", e, this.chartInstance)
                }
            },
            addLabel: function (c) {
                var e = this.components["datasetGroup_" + this.defaultDatasetType], v = e.labelSet,
                    A = J.get("component", ["dataset", "DragableLabels"]);
                c.add = !0;
                v.length ? (v = e.labelSet[0].labels, A = v.components.data, A = A.length, v._setConfigure(A, c)) : (v = new A, v.chart = this, v.init([c]), e.addLabels(v, 0));
                v = {
                    text: c.text,
                    x: c.x, y: c.y, allowdrag: c.allowdrag, sourceType: "labelnode", link: c.link
                };
                this._redrawDragNode.call(e, v, "labeladded");
                a.raiseEvent("labeladded", v, this.chartInstance);
                c.add = !0
            },
            deleteLabel: function (r) {
                r = this.components["datasetGroup_" + this.defaultDatasetType].labelSet[0].labels.components.data[r];
                var e, v;
                if (e = r.graphics.element) v = e.data("eventArgs"), e.remove(), delete r.graphics;
                c.raiseEvent("chartUpdated", S({sourceEvent: "labeldeleted"}, v), this.chartInstance, [this.chartInstance.id]);
                a.raiseEvent("labeldeleted",
                    v, this.chartInstance);
                r.removed = !0
            },
            restoreData: function () {
                var a = this.components["datasetGroup_" + this.defaultDatasetType], e = a.datasets,
                    v = this.components.legend, A = a.connectorSet, F, l, C, H, Q = a.labelSet, n = function (b) {
                        var a, f;
                        for (a = 0; a < b.length; a++) if (C = b[a], delete C.removed, C.config.add) for (f in H = b[a].graphics, H) H[f].remove()
                    };
                for (F = 0; F < e.length; F++) l = e[F].dataset, a = l.components.data, n(a), l.drawn = !1, l.configure();
                for (F = 0; F < A.length; F++) l = A[F].connectors, a = l.components.data, n(a), l.drawn = !1, l.configure();
                Q.length && (e = Q[0].labels, a = e.components.data, n(a), e.configure());
                this._setAxisLimits();
                this._drawAxis();
                this._drawDataset();
                v._drawPointLegendItem();
                c.raiseEvent("dataRestored", {}, this.chartInstance, [this.chartInstance.id])
            },
            getJSONData: function () {
                var a = this.defaultDatasetType && this.defaultDatasetType.toLowerCase(), c = this.components,
                    e = c["datasetGroup_" + a], a = c.dataset, A = this.jsonData, F = a.length, c = [], l;
                if (e) c = e.getJSONData(); else for (e = 0; e < F; e++) l = a[e], l = l.getJSONData(), c.push(l);
                a = S({}, A);
                a.dataset =
                    c.dataset;
                a.connectors = c.connectors;
                a.labels = c.labels;
                return a
            },
            _setCategories: function () {
                var a = this.jsonData, c = this.components.xAxis, a = a.categories && a.categories[0].category || [],
                    e = a.length, A = [], F, l;
                for (F = 0; F < e; F++) l = a[F] || {}, void 0 !== l.x && A.push(l);
                c && c[0].setCategory(A)
            },
            _drawDataset: function () {
                var a = this.components["datasetGroup_" + this.defaultDatasetType];
                a && a.draw()
            },
            _setAxisLimits: function () {
                var a = this.components, c = this.jsonData, c = c.categories && c.categories[0].category || [], v,
                    A = a.dataset, F = a.yAxis,
                    a = a.xAxis, l, C = A.length, H, Q = -Infinity, n = Infinity, b = Infinity, z = -Infinity, f, K,
                    V = {}, m = [], Z = function (a) {
                        f = e(a.xMax, -Infinity);
                        K = e(a.xMin, Infinity);
                        Q = M(Q, a.max);
                        n = X(n, a.min);
                        z = M(z, f);
                        b = X(b, K)
                    };
                for (H = 0; H < C; H++) l = A[H], (v = l.groupManager) ? V[l.type] = v : m.push(l);
                for (v in V) A = V[v].getDataLimits(), Z(A);
                C = m.length;
                for (H = 0; H < C; H++) A = m[H].getDataLimits(), Z(A);
                -Infinity === Q && (Q = 0);
                Infinity === n && (n = 0);
                this.config.yMax = Q;
                this.config.yMin = n;
                F[0].setAxisConfig({isPercent: this.isStacked ? this.config.stack100Percent : 0});
                F[0].setDataLimit(Q, n);
                if (-Infinity !== z || Infinity !== b) {
                    H = 0;
                    for (C = c.length; H < C; H++) if (v = c[H], v = v.x) v < b && (b = v), v > z && (z = v);
                    a[0].setDataLimit(z, b)
                }
            }
        }, R.dragbase)
    }]);
    J.register("module", ["private", "modules.renderer.js-dragarea", function () {
        var a = this.hcLib, c = a.HUNDREDSTRING, E = !a.CREDIT_REGEX.test(this.window.location.hostname),
            a = a.chartAPI;
        a("dragarea", {
                friendlyName: "Dragable Area Chart",
                standaloneInit: !0,
                creditLabel: E,
                defaultDatasetType: "dragarea",
                decimals: 2,
                applicableDSList: {dragarea: !0}
            }, a.dragbase,
            {anchoralpha: c, enablemousetracking: !0, isDrag: !0}, a.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-dragline", function () {
        var a = this.hcLib, c = a.chartAPI, a = !a.CREDIT_REGEX.test(this.window.location.hostname);
        c("dragline", {
                friendlyName: "Dragable Line Chart",
                standaloneInit: !0,
                creditLabel: a,
                decimals: 2,
                defaultDatasetType: "dragline",
                applicableDSList: {dragline: !0},
                defaultPlotShadow: 1
            }, c.dragbase, {
                zeroplanethickness: 1,
                zeroplanealpha: 40,
                showzeroplaneontop: 0,
                enablemousetracking: !0,
                isDrag: !0
            },
            c.areabase)
    }]);
    J.register("module", ["private", "modules.renderer.js-dragcolumn2d", function () {
        var a = this.hcLib, c = a.chartAPI, a = !a.CREDIT_REGEX.test(this.window.location.hostname);
        c("dragcolumn2d", {
            friendlyName: "Dragable Column Chart",
            standaloneInit: !0,
            creditLabel: a,
            decimals: 2,
            defaultDatasetType: "DragColumn",
            applicableDSList: {dragcolumn: !0}
        }, c.dragbase, {enablemousetracking: !0, isDrag: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-selectscatter", function () {
        var a = this, c = a.hcLib, E = a.window, e =
                !c.CREDIT_REGEX.test(E.location.hostname), ba = c.getValidValue, W = c.extend2, S = c.toRaphaelColor,
            I = c.preDefStr, B = c.hasSVG, X = c.BLANKSTRING, M = I.ROUND, R = Math, r = R.min, D = R.max, v = R.abs,
            A = a.xssEncode, F = I.hiddenStr, R = I.visibleStr, l = 8 === E.document.documentMode ? R : X,
            C = I.configStr, H = "rgba(192,192,192," + (c.isIE ? .002 : 1E-6) + ")", Q = c.chartAPI;
        Q("selectscatter", {
            isXY: !0,
            hasLegend: !0,
            applicableDSList: {selectScatter: !0},
            friendlyName: "Dragable Scatter Chart",
            standaloneInit: !0,
            creditLabel: e,
            defaultDatasetType: "selectScatter",
            defaultZeroPlaneHighlighted: !1,
            configure: Q.dragbase.configure,
            _createToolBox: Q.dragbase._createToolBox,
            _manageActionBarSpace: Q.dragbase._manageActionBarSpace,
            drawActionBar: Q.dragbase.drawActionBar,
            getData: function (n) {
                var b = this.getCollatedData(), c = [], f = b.dataset, l = f && f.length || 0, e = 0, m = 0, Z;
                if (n) c = /^json$/ig.test(n) ? b : /^csv$/ig.test(n) ? this.getCSVString() : a.core.transcodeData(b, "json", n); else for (; e < l; e += 1) if (b = f[e]) {
                    for ((Z = n = (b = f[e] && f[e].data) && b.length || 0) && (c[m] || (c[m] = [ba(f[e].id, "null")])); Z--;) c[m][Z +
                    1] = ba(b[Z].id, "null");
                    n && (m += 1)
                }
                return c
            },
            getCSVString: function () {
                for (var a = this.getData(), b = a.length; b--;) a[b] = a[b].join(",");
                return a.join("|")
            },
            getCollatedData: function () {
                for (var c = this.components.dataset, b = this.config._selectEleArr, z = b && b.length, f = W({}, this.chartInstance.getChartData(a.dataFormats.JSON)), l = f.dataset, e, m, Z, r, L, w, U, g, y, P = []; z--;) if (e = b[z]) for (w = e.startX, U = e.endX, g = e.startY, y = e.endY, r = l.length; r--;) if (c[r].visible) for (P[r] || (P[r] = {data: []}), L = (Z = l[r].data) && Z.length; L--;) m = Z[L],
                    e = m.x, m = m.y, e > w && e < U && m < g && m > y && (P[r].data[L] = !0);
                for (r = l.length; r--;) for (L = (Z = l[r].data) && Z.length; L--;) P[r] && P[r].data[L] || Z.splice(L, 1);
                return this.updatedDataObj = f
            },
            createSelectionBox: function (a) {
                var b = a.chart, c = b.components, f = c.paper, e = b.config, r = c.yAxis && c.yAxis[0],
                    c = c.xAxis && c.xAxis[0], m = a.selectionLeft, Z = a.selectionTop, v = a.selectionWidth;
                a = a.selectionHeight;
                var L = m + v, w = Z + a, U = 15 < v && 15 < a, g = {
                    resizeEleRadius: 15,
                    canvasTop: e.canvasTop,
                    canvasRight: e.canvasLeft + e.canvasWidth,
                    canvasLeft: e.canvasLeft,
                    canvasBottom: e.canvasTop + e.canvasHeight
                }, y = b.graphics.trackerGroup, P = e._selectEleArr || (e._selectEleArr = []);
                g.index = P.length;
                g.id = "SELECT_" + g.index;
                g.selectBoxG = y = f.group("selection-box", y).toFront();
                g.selectBoxTracker = f.rect(m, Z, v, a, y).attr({
                    "stroke-width": 1,
                    stroke: S(e.selectBorderColor),
                    ishot: !0,
                    fill: e.selectFillColor
                }).css({cursor: "move"});
                g.selectBoxTracker.data(C, {position: 6, selectEleObj: g, xChange: !0, yChange: !0});
                g.topTracker = f.rect(m, Z - 6, v, 12, y).attr({"stroke-width": 0, ishot: !0, fill: H}).css("cursor",
                    B && "ns-resize" || "n-resize");
                g.topTracker.data(C, {position: 1, selectEleObj: g, yChange: !0});
                g.rightTracker = f.rect(m + v - 6, Z, 12, a, y).attr({
                    "stroke-width": 0,
                    ishot: !0,
                    fill: H
                }).css("cursor", B && "ew-resize" || "w-resize");
                g.rightTracker.data(C, {position: 2, selectEleObj: g, xChange: !0});
                g.bottomTracker = f.rect(m, Z + a - 6, v, 12, y).attr({
                    "stroke-width": 0,
                    ishot: !0,
                    fill: H
                }).css("cursor", B && "ns-resize" || "n-resize");
                g.bottomTracker.data(C, {position: 3, selectEleObj: g, yChange: !0});
                g.leftTracker = f.rect(m - 6, Z, 12, a, y).attr({
                    "stroke-width": 0,
                    ishot: !0, fill: H
                }).css("cursor", B && "ew-resize" || "e-resize");
                g.leftTracker.data(C, {position: 4, selectEleObj: g, xChange: !0});
                g.cornerInnerSymbol = f.symbol("resizeIcon", 0, 0, 15, y).attr({
                    transform: "t" + L + "," + w,
                    "stroke-width": 1,
                    visibility: U ? l : F,
                    ishot: !0,
                    stroke: "#999999"
                });
                g.cornerOuterSymbol = f.symbol("resizeIcon", 0, 0, -12, y).attr({
                    transform: "t" + L + "," + w,
                    strokeWidth: 1,
                    visibility: U ? F : l,
                    ishot: !0,
                    stroke: "#777777"
                });
                g.resizeTracker = f.circle(L, w, 12, y).attr({
                    "stroke-width": 1,
                    stroke: H,
                    ishot: !0,
                    fill: H
                }).css("cursor", B &&
                    "nwse-resize" || "nw-resize");
                g.resizeTracker.data(C, {position: 5, selectEleObj: g, yChange: !0, xChange: !0});
                g.closeButton = f.symbol("closeIcon", 0, 0, 6, y).attr({
                    transform: "t" + L + "," + Z,
                    "stroke-width": 2,
                    stroke: e.selectionCancelButtonBorderColor,
                    fill: e.selectionCancelButtonFillColor,
                    "stroke-linecap": M,
                    ishot: !0,
                    "stroke-linejoin": M
                }).css({cursor: "pointer", _cursor: "hand"}).click(function () {
                    b.deleteSelection(this, b)
                });
                g.closeButton.data(C, {index: g.index});
                g.chart = b;
                g.startX = c.getValue(m - e.canvasLeft);
                g.startY = r.getValue(Z -
                    e.canvasTop);
                g.endX = c.getValue(L - e.canvasLeft);
                g.endY = r.getValue(w - e.canvasTop);
                g.isVisible = !0;
                P.push(g);
                b.bindDragEvent(g)
            },
            _deleteAllSelection: function () {
                var a = this.config._selectEleArr, b, c, f, e;
                for (f in a) if (a.hasOwnProperty(f)) {
                    b = a[f];
                    for (e in b) b.hasOwnProperty(e) && (c = b[e], c.remove && c.remove(), delete b[e]);
                    delete a[f]
                }
            },
            deleteSelection: function (c, b) {
                var z = c.data(C).index, f = b.components, e = b.config._selectEleArr, l = e[z], m, r;
                r = l.selectBoxTracker.getBBox();
                r = {
                    selectionLeft: r.x,
                    selectionTop: r.y,
                    selectionWidth: r.width,
                    selectionHeight: r.height,
                    startXValue: f.xAxis[0].getAxisPosition(r.x, 1),
                    startYValue: f.yAxis[0].getAxisPosition(r.y, 1),
                    endXValue: f.xAxis[0].getAxisPosition(r.x + r.width, 1),
                    endYValue: f.yAxis[0].getAxisPosition(r.y + r.height, 1),
                    data: b.getCollatedData(),
                    id: l.id
                };
                for (m in l) l.hasOwnProperty(m) && (f = l[m], f.remove && f.remove(), delete l[m]);
                delete e[z];
                a.raiseEvent("selectionRemoved", r, b.chartInstance)
            },
            bindDragEvent: function (a) {
                for (var b in a) /Tracker/.test(b) && a[b].drag(this.move, this.start, this.up)
            },
            start: function () {
                var a =
                        this.data(C).selectEleObj, b = a.topTracker, c = a.rightTracker, f = a.bottomTracker,
                    e = a.leftTracker, l = a.resizeTracker, m = b.data(C), r = c.data(C), v = f.data(C), L = e.data(C),
                    w = l.data(C), U = a.selectBoxTracker.data(C), g = a.selectBoxTracker.getBBox();
                m.ox = g.x;
                m.oy = g.y;
                r.ox = g.x2;
                r.oy = g.y;
                v.ox = g.x;
                v.oy = g.y2;
                L.ox = g.x;
                L.oy = g.y;
                m.ox = g.x;
                m.oy = g.y;
                w.ox = g.x2;
                w.oy = g.y2;
                U.ox = g.x;
                U.oy = g.y;
                U.ow = g.width;
                U.oh = g.height;
                U.ox2 = g.x2;
                U.oy2 = g.y2;
                a.selectBoxG.toFront();
                b.hide();
                c.hide();
                f.hide();
                e.hide();
                l.hide();
                this.show()
            },
            move: function (c,
                            b) {
                var z = b[0], f = b[1], e = this.data(C), l = e.selectEleObj, m = l.chart, Z = m.config,
                    H = m.components, L = l.topTracker, w = l.rightTracker, U = l.bottomTracker, g = l.leftTracker,
                    y = l.resizeTracker, P = l.selectBoxTracker, A = l.canvasLeft, d = l.canvasRight, N = l.canvasTop,
                    T = l.canvasBottom, h = P.data(C), q = {}, z = e.xChange ? z : 0, f = e.yChange ? f : 0,
                    z = z + e.ox, f = f + e.oy, z = r(d - (e.ow || 0), D(z, A)), f = r(T - (e.oh || 0), D(f, N));
                switch (e.position) {
                    case 1:
                        q.y = r(h.oy2, f);
                        q.height = v(h.oy2 - f) || 1;
                        L.attr({y: f + -6});
                        break;
                    case 2:
                        q.x = r(h.ox, z);
                        q.width = v(h.ox - z) || 1;
                        w.attr({
                            x: z +
                                -6
                        });
                        break;
                    case 3:
                        q.y = r(h.oy, f);
                        q.height = v(h.oy - f) || 1;
                        U.attr({y: f + -6});
                        break;
                    case 4:
                        q.x = r(h.ox2, z);
                        q.width = v(h.ox2 - z) || 1;
                        g.attr({x: z + -6});
                        break;
                    case 5:
                        q.x = r(h.ox, z);
                        q.width = v(h.ox - z) || 1;
                        q.y = r(h.oy, f);
                        q.height = v(h.oy - f) || 1;
                        y.attr({cx: z, cy: f});
                        break;
                    default:
                        q.x = z, q.y = f
                }
                this.data("dragStarted") || (e = P.getBBox(), Z = {
                    selectionLeft: e.x,
                    selectionTop: e.y,
                    selectionWidth: e.width,
                    selectionHeight: e.height,
                    startXValue: H.xAxis[0].getValue(e.x - Z.canvasLeft),
                    startYValue: H.yAxis[0].getValue(e.y - Z.canvasTop),
                    endXValue: H.xAxis[0].getValue(e.x +
                        e.width - Z.canvasLeft),
                    endYValue: H.yAxis[0].getValue(e.y + e.height - Z.canvasTop),
                    id: l.id
                }, a.raiseEvent("BeforeSelectionUpdate", Z, m.chartInstance), this.data("dragStarted", 1));
                P.animate(q);
                l.isVisible && (l.closeButton.hide(), l.cornerInnerSymbol.hide(), l.cornerOuterSymbol.hide(), l.isVisible = !1)
            },
            up: function () {
                var c = this, b = c.data(C).selectEleObj, z = b.chart, f = z.components, e = z.config,
                    l = f.xAxis && f.xAxis[0], m = f.yAxis && f.yAxis[0], r = b.topTracker, v = b.rightTracker,
                    L = b.bottomTracker, w = b.leftTracker, U = b.resizeTracker,
                    g = b.selectBoxTracker, y, P;
                setTimeout(function () {
                    y = g.getBBox();
                    b.startX = l.getValue(y.x - e.canvasLeft);
                    b.startY = m.getValue(y.y - e.canvasTop);
                    b.endX = l.getValue(y.x2 - e.canvasLeft);
                    b.endY = m.getValue(y.y2 - e.canvasTop);
                    r.attr({x: y.x, y: y.y + -6, width: y.width});
                    v.attr({x: y.x2 + -6, y: y.y, height: y.height});
                    L.attr({x: y.x, y: y.y2 + -6, width: y.width});
                    w.attr({x: y.x + -6, y: y.y, height: y.height});
                    U.attr({cx: y.x2, cy: y.y2});
                    b.closeButton.transform("t" + y.x2 + "," + y.y);
                    b.cornerInnerSymbol.transform("t" + y.x2 + "," + y.y2);
                    b.cornerOuterSymbol.transform("t" +
                        y.x2 + "," + y.y2);
                    b.closeButton.show();
                    15 > y.width || 15 > y.height ? (b.cornerInnerSymbol.hide(), b.cornerOuterSymbol.show()) : (b.cornerInnerSymbol.show(), b.cornerOuterSymbol.hide());
                    b.isVisible = !0;
                    r.show();
                    v.show();
                    L.show();
                    w.show();
                    U.show();
                    c.data("dragStarted") && (P = {
                        selectionLeft: y.x,
                        selectionTop: y.y,
                        selectionWidth: y.width,
                        selectionHeight: y.height,
                        startXValue: f.xAxis[0].getValue(y.x - e.canvasLeft),
                        startYValue: f.yAxis[0].getValue(y.y - e.canvasTop),
                        endXValue: f.xAxis[0].getValue(y.x + y.width - e.canvasLeft),
                        endYValue: f.yAxis[0].getValue(y.y +
                            y.height - e.canvasTop),
                        data: z.getCollatedData(),
                        id: b.id
                    }, a.raiseEvent("SelectionUpdated", P, z.chartInstance), c.data("dragStarted", 0))
                }, 100)
            },
            restoreData: function () {
                var a = this.components.dataset, b;
                this._deleteAllSelection();
                for (b = 0; b < a.length; b++) a[b].draw();
                c.raiseEvent("dataRestored", {}, this.chartInstance, [this.chartInstance.id]);
                return !0
            },
            submitData: function () {
                var n = this.chartInstance, b = new a.ajax, z = this.config, f = a.dataFormats.JSON,
                    e = a.dataFormats.CSV, l = a.dataFormats.XML, m = z.formAction || "", r = z.submitFormAsAjax,
                    v, L, w, U, g;
                z.formDataFormat === f ? (v = f, L = JSON.stringify(this.getCollatedData())) : this.formDataFormat === e ? (v = e, L = n.getCSVString && n.getCSVString(), void 0 === L && (L = a.core.transcodeData(this.getCollatedData(), f, e))) : (v = l, L = a.core.transcodeData(this.getCollatedData(), f, l));
                a.raiseEvent("beforeDataSubmit", {data: L}, n, void 0, function () {
                    r ? (b.onError = function (b, a, f, d) {
                        c.raiseEvent("dataSubmitError", {
                            xhrObject: a.xhr,
                            url: d,
                            statusText: b,
                            httpStatus: a.xhr && a.xhr.status ? a.xhr.status : -1,
                            data: L
                        }, n, [n.id, b, a.xhr && a.xhr.status])
                    },
                        b.onSuccess = function (a, f, g, d) {
                            c.raiseEvent("dataSubmitted", {xhrObject: b, response: a, url: d, data: L}, n, [n.id, a])
                        }, w = {}, w["str" + v.toUpperCase()] = L, b.open && b.abort(), b.post(m, w)) : (U = E.document.createElement("span"), U.innerHTML = '<form style="display:none" action="' + m + '" method="' + z.formMethod + '" target="' + z.formTarget + '"> <input type="hidden" name="strXML" value="' + A(L) + '"><input type="hidden" name="dataFormat" value="' + v.toUpperCase() + '" /></form>', g = U.removeChild(U.firstChild), E.document.body.appendChild(g),
                    g.submit && g.submit(), g.parentNode.removeChild(g), U = g = null)
                }, function () {
                    a.raiseEvent("dataSubmitCancelled", {data: L}, n)
                })
            },
            _postSpaceManagement: function () {
                Q("mscartesian")._postSpaceManagement.call(this);
                this._deleteAllSelection()
            },
            eiMethods: {
                getData: function (a) {
                    var b = this.apiInstance;
                    return b && b.getData(a)
                }, restoreData: function () {
                    var a = this.apiInstance;
                    return a && a.restoreData()
                }, submitData: function () {
                    var a = this.apiInstance;
                    return a && a.submitData()
                }
            }
        }, Q.scatterBase, {enablemousetracking: !0, allowreversexaxis: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-candlestick", function () {
        var a = this.hcLib, c = !a.CREDIT_REGEX.test(this.window.location.hostname), E = a.chartAPI, e = a.pluck,
            ba = a.graphics.convertColor, W = a.preDefStr, S = W.altHGridColorStr, I = W.altHGridAlphaStr,
            B = a.parseUnsafeString, X = W.column, M = a.componentDispose, R = W.volume, r = a.POSITION_RIGHT, D = Math,
            v = D.max, A = D.round, F = W.POSITION_BOTTOM, l = W.configStr, C = W.animationObjStr, H = W.ROUND,
            Q = W.miterStr, n = a.toRaphaelColor, b = W.divLineAlpha3DStr, z = W.defaultFontStr, f =
                a.pluckFontSize, K = W.divLineAlphaStr, V = W.altVGridColorStr, m = W.altVGridAlphaStr, Z = D.min,
            ga = W.colors.c000000, L = a.BLANKSTRING, w = a.chartPaletteStr = {
                chart2D: {
                    bgColor: "bgColor",
                    bgAlpha: "bgAlpha",
                    bgAngle: "bgAngle",
                    bgRatio: "bgRatio",
                    canvasBgColor: "canvasBgColor",
                    canvasBaseColor: "canvasBaseColor",
                    divLineColor: "divLineColor",
                    legendBgColor: "legendBgColor",
                    legendBorderColor: "legendBorderColor",
                    toolTipbgColor: "toolTipbgColor",
                    toolTipBorderColor: "toolTipBorderColor",
                    baseFontColor: "baseFontColor",
                    anchorBgColor: "anchorBgColor"
                },
                chart3D: {
                    bgColor: "bgColor3D",
                    bgAlpha: "bgAlpha3D",
                    bgAngle: "bgAngle3D",
                    bgRatio: "bgRatio3D",
                    canvasBgColor: "canvasBgColor3D",
                    canvasBaseColor: "canvasBaseColor3D",
                    divLineColor: "divLineColor3D",
                    divLineAlpha: b,
                    legendBgColor: "legendBgColor3D",
                    legendBorderColor: "legendBorderColor3D",
                    toolTipbgColor: "toolTipbgColor3D",
                    toolTipBorderColor: "toolTipBorderColor3D",
                    baseFontColor: "baseFontColor3D",
                    anchorBgColor: "anchorBgColor3D"
                }
            }, U = a.extend2, g = a.pluckNumber;
        E("candlestick", {
            friendlyName: "Candlestick Chart",
            standaloneInit: !0,
            creditLabel: c,
            usesXYinCategory: !0,
            paletteIndex: 3,
            defaultDatasetType: "candlestick",
            hasLegend: !0,
            applicableDSList: {candlestick: !0},
            canvasborderthickness: 1,
            hasInteractiveLegend: !1,
            init: function (b, a, f, d) {
                var g;
                this.jsonData = a;
                g = this.components = this.components || (this.components = {});
                g.canvasVolume = g.canvasVolume || (g.canvasVolume = {graphics: {}, config: {}});
                E.mscartesian.init.call(this, b, a, f, d)
            },
            configure: function () {
                var b, a, f, d = this.components.colorManager, c = this.jsonData.chart, n = this.components;
                this.base.configure.call(this);
                b = this.config;
                f = n.canvas.config;
                b.showVolumeChart = g(c.showvolumechart, 1);
                a = g(c.volumeheightpercent, 40);
                b.volumeHeightPercent = 20 > a ? 20 : 80 < a ? 80 : a;
                b.canvasBorderWidth = g(c.canvasborderthickness, 1);
                b.rollOverBandColor = ba(e(c.rolloverbandcolor, d.getColor(S)), e(c.rolloverbandalpha, d.getColor(I)));
                U(n.canvasVolume.config, f)
            },
            _createDatasets: function () {
                var b = this.config, a = this.components, f = this.jsonData, d = f.dataset, g = f.trendset || [],
                    c = this.config.showVolumeChart, h = d && d.length, q, k, t = this.defaultDatasetType, O =
                        e(B(f.chart.plotpriceas), X), x, p, G, u, n, w = 0,
                    z = b.datasetMap || (b.datasetMap = {trendset: [], candlestick: []}), aa, m = {},
                    l = {trendset: [], candlestick: []}, L = a.legend;
                if (d) {
                    this.config.categories = f.categories && f.categories[0].category;
                    q = a.dataset = [];
                    f = 0;
                    for (h = d.length; f < h; f++) G = d[f], G.seriesname && (G.seriesname = B(G.seriesname)), x = (x = e(G.renderas, t)) && x.toLowerCase(), p = J.get("component", ["dataset", x]), aa = z[x], k = aa[0], p && (void 0 === m[x] ? m[x] = 0 : m[x]++, k ? (u = k, k.index = f, O !== u.config.plotType ? (M.call(u), k = q[w] = new p, k.chart =
                        this, k.index = w, k.init(G)) : (u = (u = k.JSONData) && u.data && u.data.length, n = G.data && G.data.length, u > n && k.removeData(n - 1, u - n, !1), k.JSONData = G), k.configure(), l[x].push(k), q.push(k), aa.shift()) : (k = new p, q.push(k), l[x].push(k), k.chart = this, k.index = w, k.init(G))), w++, aa = a.yAxis && a.yAxis[1], c && this.config.drawVolume ? (aa && aa.show(), p && (void 0 === m[x] ? m[x] = 0 : m[x]++, aa = z[x], (k = aa[0]) ? (u = (u = k.JSONData) && u.data && u.data.length, n = G.data && G.data.length, u > n && k.removeData(n - 1, u - n, !1), k.JSONData = G, k.configure(), q.push(k),
                        l[x].push(k), aa.shift()) : (k = new p, k.chart = this, q.push(k), l[x].push(k), k.init(G, R))), w++) : aa && aa.hide(), c = this.config.drawVolume && c ? this.config.showVolumeChart = 1 : this.config.showVolumeChart = 0;
                    f = 0;
                    for (h = g.length; f < h; f++) G = g[f], x = "trendset", aa = z[x], k = aa[0], void 0 === m[x] ? m[x] = 0 : m[x]++, k ? (u = (u = k.JSONData) && u.data && u.data.length, n = G.data && G.data.length, l[x].push(k), q.push(k), k.index = w, u > n && k.removeData(n - 1, u - n, !1), k.JSONData = G, k.configure(), aa.shift()) : (p = J.get("component", ["dataset", x]), a = new p, q.push(a),
                        l[x].push(a), a.chart = this, a.index = w, a.init(G)), w++;
                    for (d in z) if (aa = z[d], h = aa.length) for (g = 0; g < h; g++) L.removeItem(aa[g].legendItemId), M.call(aa[g]);
                    b.datasetMap = l
                } else this.setChartMessage()
            },
            _spaceManager: function () {
                var b, a, f, d = this.config, g = this.components, c = d.legendPosition, h = g.xAxis && g.xAxis[0],
                    q = g.xAxis && g.xAxis[1], k = g.yAxis && g.yAxis[0], t = g.yAxis && g.yAxis[1];
                a = this.hasLegend;
                var O = g.legend, x, p = this.config.showVolumeChart, G = p ? d.volumeHeightPercent : 0,
                    u = g.canvas.config, n = g.canvasVolume.config, w =
                        d.width, z = d.height, aa = {};
                b = d.chartBorderWidth;
                g = g.canvas.config.canvasBorderWidth;
                x = d.minCanvasHeight;
                f = d.minCanvasWidth;
                var e = d.canvasMarginLeft, m = d.canvasMarginRight, l = d.canvasMarginTop, L = d.canvasMarginBottom, U,
                    H, Z = d.origCanvasTopMargin, Q = d.origCanvasBottomMargin, V = d.origCanvasLeftMargin,
                    K = d.origCanvasRightMargin;
                this._allocateSpace({top: b, bottom: b, left: b, right: b});
                b = .225 * d.availableHeight;
                b = this._manageActionBarSpace && this._manageActionBarSpace(b) || {};
                this._allocateSpace(b);
                b = c === r ? .225 * d.canvasWidth :
                    .3 * d.canvasHeight;
                !1 !== a && h && this._allocateSpace(O._manageLegendPosition(b));
                a = .7 * d.canvasWidth;
                k = k.placeAxis(a);
                t = p ? t.placeAxis(a) : {};
                aa.left = v(k.left, t.left || 0);
                aa.right = v(k.right, t.right || 0);
                this._allocateSpace(aa);
                f > w - e - m && (H = !0, t = d.canvasWidth - f, aa = e + m, e = d.canvasMarginLeft = t * e / aa, m = d.canvasMarginRight = t * m / aa);
                e = e > d.canvasLeft ? e - d.canvasLeft : 0;
                w = m > w - d.canvasRight ? m + d.canvasRight - w : 0;
                this._allocateSpace({left: e, right: w});
                H && (aa = V + K, H = d.canvasWidth, H > f && (t = H - f, e = t * V / aa, w = t * K / aa), this._allocateSpace({
                    left: e,
                    right: w
                }));
                f = c === F ? .6 * d.canvasHeight : .6 * d.canvasWidth;
                this._manageChartMenuBar(f);
                this._allocateSpace({top: d.canvasMarginTop, bottom: d.canvasMarginBottom});
                f = .3 * d.canvasHeight;
                c = h.placeAxis(f);
                h && this._allocateSpace(c);
                c.bottom += 6;
                u.intermediarySpace = c.bottom;
                p && (h = q.placeAxis(f), this._allocateSpace(h));
                this._allocateSpace({top: g, bottom: 2 * g, left: g, right: g});
                x > z - l - L && (U = !0, t = d.canvasHeight - x, aa = l + L, l = d.canvasMarginTop = t * l / aa, L = d.canvasMarginBottom = t * L / aa);
                h = l > d.canvasTop ? l - d.canvasTop : 0;
                z = L > z - d.canvasBottom ?
                    L + d.canvasBottom - z : 0;
                this._allocateSpace({top: h, bottom: z});
                U && (aa = Z + Q, U = d.canvasHeight, U > x && (t = U - x, h = t * Z / aa, z = t * Q / aa), this._allocateSpace({
                    top: h,
                    bottom: z
                }));
                x = d.canvasHeight;
                u.canvasHeight = A((100 - G) / 100 * x);
                n.canvasHeight = G / 100 * x;
                u.canvasTop = d.canvasTop;
                u.canvasLeft = d.canvasLeft;
                u.canvasBottom = u.canvasTop + u.canvasHeight;
                u.canvasWidth = d.canvasWidth;
                u.canvasRight = d.canvasRight;
                n.canvasTop = u.canvasBottom + c.bottom + 2 * g;
                n.canvasLeft = d.canvasLeft;
                n.canvasBottom = n.canvasTop + n.canvasHeight + 2 * g;
                n.canvasRight =
                    d.canvasRight;
                n.canvasWidth = d.canvasWidth;
                G = d.canvasTop + u.canvasHeight + g;
                d = d.canvasTop + u.canvasHeight + c.bottom + 2 * g;
                u.canvasY = G;
                n.canvasY = d
            },
            _postSpaceManagement: function () {
                var b = this.components, a = this.config.showVolumeChart, f = b.xAxis && b.xAxis[0],
                    d = b.yAxis && b.yAxis[0], g = b.xAxis && b.xAxis[1], c = b.yAxis && b.yAxis[1],
                    h = b.canvas.config, q = b.legend, b = b.canvasVolume.config, k = h.canvasBorderWidth;
                f && f.setAxisDimention({
                    x: h.canvasLeft,
                    y: h.canvasY,
                    opposite: h.canvasTop - k,
                    axisLength: h.canvasWidth
                });
                d && d.setAxisDimention({
                    x: h.canvasLeft -
                        k, y: h.canvasTop, opposite: h.canvasRight + k, axisLength: h.canvasHeight
                });
                a && (g && g.setAxisDimention({
                    x: h.canvasLeft,
                    y: b.canvasBottom,
                    opposite: b.canvasTop - k,
                    axisLength: h.canvasWidth
                }), c && c.setAxisDimention({
                    x: h.canvasLeft - k,
                    y: b.canvasY,
                    opposite: b.canvasRight + k,
                    axisLength: b.canvasHeight
                }), g && g.setCanvas(b), c && c.setCanvas(b));
                f.setCanvas(h);
                d.setCanvas(h);
                q.postSpaceManager()
            },
            _drawCanvas: function () {
                var b = this.components, a = this.graphics, f = b.paper, d = b.canvas, g = b.canvas.config,
                    c = g.clip || (g.clip = []), h = b.canvasVolume.config,
                    q = d.graphics, b = b.canvasVolume.graphics, k = d.config, t = q.topCanvas,
                    O = q.topCanvasBorderElement, d = b.volumeCanvas, x = g.canvasLeft, p = g.canvasTop,
                    G = g.canvasWidth, g = g.canvasHeight, u = h.canvasTop, h = h.canvasHeight, a = a.canvasGroup,
                    w = k.canvasBorderRadius, z = k.canvasBorderWidth, e = .5 * z, aa = k.canvasBorderColor,
                    m = this.get(l, C), L = m.dummyObj, U = m.animObj, r = m.animType, m = m.transposeAnimDuration, Z,
                    A = this.config.showVolumeChart, V = k.shadow, K = k.shadowOnCanvasFill, k = k.canBGColor;
                Z = {
                    x: x - e, y: p - e, width: G + z, height: g + z, r: w, "stroke-width": z,
                    stroke: aa, "stroke-linejoin": 2 < z ? H : Q
                };
                O ? m ? O.animateWith(L, U, {
                    x: x - e,
                    y: p - e,
                    width: G + z,
                    height: g + z,
                    r: w
                }, m, r) : O.attr(Z) : O = q.topCanvasBorderElement = f.rect(Z, a).shadow(V);
                O.attr({"stroke-width": z, stroke: aa, "stroke-linejoin": 2 < z ? H : Q});
                c["clip-canvas"] = [v(0, x), v(0, p), v(1, G), v(1, g)];
                c["clip-canvas-init"] = [v(0, x), v(0, p), 1, v(1, g)];
                t ? m ? t.animate({
                    x: x,
                    y: p,
                    width: G,
                    height: g
                }, m, r).attr({r: w}) : t.attr(void 0) : (q.topCanvas = t = f.rect(a), t.attr({
                    x: x,
                    y: p,
                    width: G,
                    height: g
                }).shadow(K));
                t.animateWith(L, U, {x: x, y: p, width: G, height: g},
                    m, r);
                t.attr({r: w, "stroke-width": 0, stroke: "none", fill: n(k)});
                A ? (c = {
                    x: x - e,
                    y: u - e - 1,
                    width: G + z,
                    height: h + z
                }, d || (b.volumeCanvas = d = f.rect(a).attr(c).shadow(K).crisp()), d.show().animateWith(L, U, c, m, r).attr({
                    r: w,
                    fill: n(k),
                    "stroke-width": z,
                    stroke: aa,
                    "stroke-linejoin": 2 < z ? H : Q,
                    "shape-rendering": "crisp"
                })) : d && d.hide()
            },
            _createAxes: function () {
                var b = this.components, a, g = J.register("component", ["axis", "cartesian"]),
                    d = this.config.showVolumeChart, f, c;
                b.yAxis = [];
                b.xAxis = [];
                b.yAxis[0] = f = new g;
                b.yAxis[1] = a = new g;
                b.xAxis[0] =
                    c = new g;
                f.chart = this;
                a.chart = this;
                c.chart = this;
                d && (b.xAxis[1] = b = new g, b.chart = this, b.init());
                f.init();
                a.init();
                c.init();
                this._setCategories()
            },
            _feedAxesRawData: function () {
                var a = this.components, c = a.colorManager, n = this.jsonData, d = n.chart, l, L, h = this.is3d,
                    q = h ? w.chart3D : w.chart2D, k = J.register("component", ["axis", "cartesian"]),
                    t = this.config.showVolumeChart;
                l = {
                    outCanfontFamily: e(d.outcnvbasefont, d.basefont, z),
                    outCanfontSize: f(d.outcnvbasefontsize, d.basefontsize, 10),
                    outCancolor: e(d.outcnvbasefontcolor, d.basefontcolor,
                        c.getColor(q.baseFontColor)).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    axisNamePadding: d.xaxisnamepadding,
                    axisValuePadding: d.labelpadding,
                    axisNameFont: d.xaxisnamefont,
                    axisNameFontSize: d.xaxisnamefontsize,
                    axisNameFontColor: d.xaxisnamefontcolor,
                    axisNameFontBold: d.xaxisnamefontbold,
                    axisNameFontItalic: d.xaxisnamefontitalic,
                    axisNameBgColor: d.xaxisnamebgcolor,
                    axisNameBorderColor: d.xaxisnamebordercolor,
                    axisNameAlpha: d.xaxisnamealpha,
                    axisNameFontAlpha: d.xaxisnamefontalpha,
                    axisNameBgAlpha: d.xaxisnamebgalpha,
                    axisNameBorderAlpha: d.xaxisnameborderalpha,
                    axisNameBorderPadding: d.xaxisnameborderpadding,
                    axisNameBorderRadius: d.xaxisnameborderradius,
                    axisNameBorderThickness: d.xaxisnameborderthickness,
                    axisNameBorderDashed: d.xaxisnameborderdashed,
                    axisNameBorderDashLen: d.xaxisnameborderdashlen,
                    axisNameBorderDashGap: d.xaxisnameborderdashgap,
                    useEllipsesWhenOverflow: d.useellipseswhenoverflow,
                    divLineColor: e(d.vdivlinecolor, d.divlinecolor, c.getColor(q.divLineColor)),
                    divLineAlpha: e(d.vdivlinealpha, d.divlinealpha, h ? c.getColor(b) : c.getColor(K)),
                    divLineThickness: g(d.vdivlinethickness,
                        d.divlinethickness, 1),
                    divLineIsDashed: !!g(d.vdivlinedashed, d.vdivlineisdashed, d.divlinedashed, d.divlineisdashed, 0),
                    divLineDashLen: g(d.vdivlinedashlen, d.divlinedashlen, 4),
                    divLineDashGap: g(d.vdivlinedashgap, d.divlinedashgap, 2),
                    showAlternateGridColor: g(d.showalternatevgridcolor, 0),
                    alternateGridColor: e(d.alternatevgridcolor, c.getColor(V)),
                    alternateGridAlpha: e(d.alternatevgridalpha, c.getColor(m)),
                    numDivLines: d.numvdivlines,
                    labelFont: d.labelfont,
                    labelFontSize: d.labelfontsize,
                    labelFontColor: d.labelfontcolor,
                    labelFontAlpha: d.labelalpha,
                    labelFontBold: d.labelfontbold,
                    labelFontItalic: d.labelfontitalic,
                    axisName: d.xaxisname,
                    axisMinValue: d.xaxisminvalue,
                    axisMaxValue: d.xaxismaxvalue,
                    setAdaptiveMin: d.setadaptivexmin,
                    adjustDiv: d.adjustvdiv,
                    labelDisplay: d.labeldisplay,
                    showLabels: d.showlabels,
                    rotateLabels: d.rotatelabels,
                    slantLabel: g(d.slantlabels, d.slantlabel),
                    labelStep: g(d.labelstep, d.xaxisvaluesstep),
                    showAxisValues: g(d.showxaxisvalues, d.showxaxisvalue),
                    showLimits: d.showvlimits,
                    showDivLineValues: g(d.showvdivlinevalues,
                        d.showvdivlinevalues),
                    showZeroPlane: d.showvzeroplane,
                    zeroPlaneColor: d.vzeroplanecolor,
                    zeroPlaneThickness: d.vzeroplanethickness,
                    zeroPlaneAlpha: d.vzeroplanealpha,
                    showZeroPlaneValue: d.showvzeroplanevalue,
                    trendlineColor: d.trendlinecolor,
                    trendlineToolText: d.trendlinetooltext,
                    trendlineThickness: d.trendlinethickness,
                    trendlineAlpha: d.trendlinealpha,
                    showTrendlinesOnTop: d.showtrendlinesontop,
                    showAxisLine: g(d.showxaxisline, d.showaxislines, d.drawAxisLines, 0),
                    axisLineThickness: g(d.xaxislinethickness, d.axislinethickness,
                        1),
                    axisLineAlpha: g(d.xaxislinealpha, d.axislinealpha, 100),
                    axisLineColor: e(d.xaxislinecolor, d.axislinecolor, ga)
                };
                h = {
                    outCanfontFamily: e(d.outcnvbasefont, d.basefont, z),
                    outCanfontSize: f(d.outcnvbasefontsize, d.basefontsize, 10),
                    outCancolor: e(d.outcnvbasefontcolor, d.basefontcolor, c.getColor(q.baseFontColor)).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    axisNamePadding: d.xaxisnamepadding,
                    axisValuePadding: d.labelpadding,
                    axisNameFont: d.xaxisnamefont,
                    axisNameFontSize: d.xaxisnamefontsize,
                    axisNameFontColor: d.xaxisnamefontcolor,
                    axisNameFontBold: d.xaxisnamefontbold,
                    axisNameFontItalic: d.xaxisnamefontitalic,
                    axisNameBgColor: d.xaxisnamebgcolor,
                    axisNameBorderColor: d.xaxisnamebordercolor,
                    axisNameAlpha: d.xaxisnamealpha,
                    axisNameFontAlpha: d.xaxisnamefontalpha,
                    axisNameBgAlpha: d.xaxisnamebgalpha,
                    axisNameBorderAlpha: d.xaxisnameborderalpha,
                    axisNameBorderPadding: d.xaxisnameborderpadding,
                    axisNameBorderRadius: d.xaxisnameborderradius,
                    axisNameBorderThickness: d.xaxisnameborderthickness,
                    axisNameBorderDashed: d.xaxisnameborderdashed,
                    axisNameBorderDashLen: d.xaxisnameborderdashlen,
                    axisNameBorderDashGap: d.xaxisnameborderdashgap,
                    useEllipsesWhenOverflow: d.useellipseswhenoverflow,
                    divLineColor: e(d.vdivlinecolor, c.getColor(q.divLineColor)),
                    divLineAlpha: e(d.vdivlinealpha, c.getColor(K)),
                    divLineThickness: g(d.vdivlinethickness, 1),
                    divLineIsDashed: !!g(d.vdivlinedashed, d.vdivlineisdashed, 0),
                    divLineDashLen: g(d.vdivlinedashlen, 4),
                    divLineDashGap: g(d.vdivlinedashgap, 2),
                    showAlternateGridColor: g(d.showalternatevgridcolor, 0),
                    alternateGridColor: e(d.alternatevgridcolor, c.getColor(V)),
                    alternateGridAlpha: e(d.alternatevgridalpha,
                        c.getColor(m)),
                    numDivLines: d.numvdivlines,
                    labelFont: d.labelfont,
                    labelFontSize: d.labelfontsize,
                    labelFontColor: d.labelfontcolor,
                    labelFontAlpha: d.labelalpha,
                    labelFontBold: d.labelfontbold,
                    labelFontItalic: d.labelfontitalic,
                    axisName: d.xaxisname,
                    axisMinValue: d.xaxisminvalue,
                    axisMaxValue: d.xaxismaxvalue,
                    setAdaptiveMin: d.setadaptivexmin,
                    adjustDiv: d.adjustvdiv,
                    labelDisplay: d.labeldisplay,
                    showLabels: 1,
                    rotateLabels: d.rotatelabels,
                    slantLabel: g(d.slantlabels, d.slantlabel),
                    labelStep: g(d.labelstep, d.xaxisvaluesstep),
                    showAxisValues: g(d.showxaxisvalues, d.showxaxisvalue),
                    showLimits: d.showvlimits,
                    showDivLineValues: g(d.showvdivlinevalues, d.showvdivlinevalues),
                    showZeroPlane: d.showvzeroplane,
                    zeroPlaneColor: d.vzeroplanecolor,
                    zeroPlaneThickness: d.vzeroplanethickness,
                    zeroPlaneAlpha: d.vzeroplanealpha,
                    showZeroPlaneValue: d.showvzeroplanevalue,
                    trendlineColor: d.trendlinecolor,
                    trendlineToolText: d.trendlinetooltext,
                    trendlineThickness: d.trendinethickness,
                    trendlineAlpha: d.trendlinealpha,
                    showTrendlinesOnTop: d.showtrendlinesontop,
                    showAxisLine: g(d.showxaxisline, d.showaxislines, d.drawAxisLines, 0),
                    axisLineThickness: g(d.xaxislinethickness, d.axislinethickness, 1),
                    axisLineAlpha: g(d.xaxislinealpha, d.axislinealpha, 100),
                    axisLineColor: e(d.xaxislinecolor, d.axislinecolor, ga)
                };
                L = {
                    outCanfontFamily: e(d.outcnvbasefont, d.basefont, z),
                    outCanfontSize: f(d.outcnvbasefontsize, d.basefontsize, 10),
                    outCancolor: e(d.outcnvbasefontcolor, d.basefontcolor, c.getColor(q.baseFontColor)).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    axisNamePadding: d.yaxisnamepadding,
                    axisValuePadding: d.yaxisvaluespadding,
                    axisNameFont: d.pyaxisnamefont,
                    axisNameFontSize: d.pyaxisnamefontsize,
                    axisNameFontColor: d.pyaxisnamefontcolor,
                    axisNameFontBold: d.pyaxisnamefontbold,
                    axisNameFontItalic: d.pyaxisnamefontitalic,
                    axisNameBgColor: d.pyaxisnamebgcolor,
                    axisNameBorderColor: d.pyaxisnamebordercolor,
                    axisNameAlpha: d.pyaxisnamealpha,
                    axisNameFontAlpha: d.pyaxisnamefontalpha,
                    axisNameBgAlpha: d.pyaxisnamebgalpha,
                    axisNameBorderAlpha: d.pyaxisnameborderalpha,
                    axisNameBorderPadding: d.pyaxisnameborderpadding,
                    axisNameBorderRadius: d.pyaxisnameborderradius,
                    axisNameBorderThickness: d.pyaxisnameborderthickness,
                    axisNameBorderDashed: d.pyaxisnameborderdashed,
                    axisNameBorderDashLen: d.pyaxisnameborderdashlen,
                    axisNameBorderDashGap: d.pyaxisnameborderdashgap,
                    axisNameWidth: d.yaxisnamewidth,
                    useEllipsesWhenOverflow: d.useellipseswhenoverflow,
                    rotateAxisName: g(d.rotateyaxisname, 1),
                    axisName: d.pyaxisname,
                    divLineColor: e(d.divlinecolor, c.getColor(q.divLineColor)),
                    divLineAlpha: e(d.divlinealpha, c.getColor(K)),
                    divLineThickness: g(d.divlinethickness, 1),
                    divLineIsDashed: !!g(d.divlinedashed,
                        d.divlineisdashed, 1),
                    divLineDashLen: g(d.divlinedashlen, 4),
                    divLineDashGap: g(d.divlinedashgap, 2),
                    showAlternateGridColor: g(d.showalternatehgridcolor, 1),
                    alternateGridColor: e(d.alternatehgridcolor, c.getColor(S)),
                    alternateGridAlpha: e(d.alternatehgridalpha, c.getColor(I)),
                    numDivLines: g(d.numpdivlines, 5),
                    axisMinValue: d.pyaxisminvalue,
                    axisMaxValue: d.pyaxismaxvalue,
                    setAdaptiveMin: g(d.setadaptiveymin, 1),
                    adjustDiv: d.adjustdiv,
                    labelStep: d.yaxisvaluesstep,
                    showAxisValues: g(d.showyaxisvalues, d.showyaxisvalue),
                    showLimits: g(d.showyaxislimits,
                        d.showlimits, this.showLimits),
                    showDivLineValues: g(d.showdivlinevalues, d.showdivlinevalue),
                    showZeroPlane: d.showzeroplane,
                    zeroPlaneColor: d.zeroplanecolor,
                    zeroPlaneThickness: d.zeroplanethickness,
                    zeroPlaneAlpha: d.zeroplanealpha,
                    showZeroPlaneValue: d.showzeroplanevalue,
                    trendlineColor: d.trendlinecolor,
                    trendlineToolText: d.trendlinetooltext,
                    trendlineThickness: d.trendlinethickness,
                    trendlineAlpha: d.trendlinealpha,
                    showTrendlinesOnTop: d.showtrendlinesontop,
                    showAxisLine: g(d.showyaxisline, d.showaxislines, d.drawAxisLines,
                        0),
                    axisLineThickness: g(d.yaxislinethickness, d.axislinethickness, 1),
                    axisLineAlpha: g(d.yaxislinealpha, d.axislinealpha, 100),
                    axisLineColor: e(d.yaxislinecolor, d.axislinecolor, ga)
                };
                c = {
                    outCanfontFamily: e(d.outcnvbasefont, d.basefont, z),
                    outCanfontSize: f(d.outcnvbasefontsize, d.basefontsize, 10),
                    outCancolor: e(d.outcnvbasefontcolor, d.basefontcolor, c.getColor(q.baseFontColor)).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    axisNamePadding: d.yaxisnamepadding,
                    axisValuePadding: d.yaxisvaluespadding,
                    axisNameFont: d.vyaxisnamefont,
                    axisNameFontSize: d.vyaxisnamefontsize,
                    axisNameFontColor: d.vyaxisnamefontcolor,
                    axisNameFontBold: d.vyaxisnamefontbold,
                    axisNameFontItalic: d.vyaxisnamefontitalic,
                    axisNameBgColor: d.vyaxisnamebgcolor,
                    axisNameBorderColor: d.vyaxisnamebordercolor,
                    axisNameAlpha: d.vyaxisnamealpha,
                    axisNameFontAlpha: d.vyaxisnamefontalpha,
                    axisNameBgAlpha: d.vyaxisnamebgalpha,
                    axisNameBorderAlpha: d.vyaxisnameborderalpha,
                    axisNameBorderPadding: d.vyaxisnameborderpadding,
                    axisNameBorderRadius: d.vyaxisnameborderradius,
                    axisNameBorderThickness: d.vyaxisnameborderthickness,
                    axisNameBorderDashed: d.vyaxisnameborderdashed,
                    axisNameBorderDashLen: d.vyaxisnameborderdashlen,
                    axisNameBorderDashGap: d.vyaxisnameborderdashgap,
                    axisNameWidth: d.yaxisnamewidth,
                    useEllipsesWhenOverflow: d.useellipseswhenoverflow,
                    rotateAxisName: g(d.rotateyaxisname, 1),
                    axisName: d.vyaxisname,
                    divLineColor: e(d.divlinecolor, c.getColor(q.divLineColor)),
                    divLineAlpha: e(d.divlinealpha, c.getColor(K)),
                    divLineThickness: g(d.divlinethickness, 1),
                    divLineIsDashed: !!g(d.divlinedashed, d.divlineisdashed, 1),
                    divLineDashLen: g(d.divlinedashlen,
                        4),
                    divLineDashGap: g(d.divlinedashgap, 2),
                    showAlternateGridColor: g(d.showalternatehgridcolor, 1),
                    alternateGridColor: e(d.alternatehgridcolor, c.getColor(S)),
                    alternateGridAlpha: e(d.alternatehgridalpha, c.getColor(I)),
                    numDivLines: d.numdivlines,
                    axisMinValue: d.vyaxisminvalue,
                    axisMaxValue: d.vyaxismaxvalue,
                    setAdaptiveMin: d.setadaptiveymin,
                    adjustDiv: d.adjustdiv,
                    labelStep: d.yaxisvaluesstep,
                    showAxisValues: g(d.showyaxisvalues, d.showyaxisvalue),
                    showLimits: g(d.showsecondarylimits, d.showlimits),
                    showDivLineValues: g(d.showdivlinevalues,
                        d.showdivlinevalue),
                    showZeroPlane: d.showzeroplane,
                    zeroPlaneColor: d.zeroplanecolor,
                    zeroPlaneThickness: d.zeroplanethickness,
                    zeroPlaneAlpha: d.zeroplanealpha,
                    showZeroPlaneValue: d.showzeroplanevalue,
                    trendlineColor: d.trendlinecolor,
                    trendlineToolText: d.trendlinetooltext,
                    trendlineThickness: d.trendlinethickness,
                    trendlineAlpha: d.trendlinealpha,
                    showTrendlinesOnTop: d.showtrendlinesontop,
                    showAxisLine: g(d.showyaxisline, d.showaxislines, d.drawAxisLines, 0),
                    axisLineThickness: g(d.yaxislinethickness, d.axislinethickness,
                        1),
                    axisLineAlpha: g(d.yaxislinealpha, d.axislinealpha, 100),
                    axisLineColor: e(d.yaxislinecolor, d.axislinecolor, ga)
                };
                l.vtrendlines = n.vtrendlines;
                h.vtrendlines = n.vtrendlines;
                L.trendlines = n.trendlines;
                d = a.yAxis[0];
                n = a.yAxis[1];
                q = a.xAxis[0];
                d.setCommonConfigArr(L, !0, !1, !1);
                d.configure();
                n.setCommonConfigArr(c, !0, !1, !1);
                n.configure();
                d.setAxisConfig({drawLabelsOpposit: 1, axisNameAlignCanvas: 1, relativeAxis: n});
                n.setAxisConfig({drawLabelsOpposit: 1, axisNameAlignCanvas: 1, uniqueClassName: 1, relativeAxis: d});
                q.setCommonConfigArr(l,
                    !1, !1, !1);
                q.configure();
                q.setAxisConfig({drawTrendLabels: t ? !1 : !0});
                t ? (a.xAxis[1] ? a.xAxis[1].show() : (k = a.xAxis[1] = new k, k.chart = this, k.init()), k = a.xAxis[1], k.setCommonConfigArr(h, !1, !1, !1), k.configure(), k.setAxisConfig({
                    drawLabels: !1,
                    drawPlotlines: !0,
                    drawPlotBands: !1,
                    drawAxisName: !1,
                    drawTrendLines: !0,
                    drawOnlyCategoryLine: !0,
                    uniqueClassName: 1
                })) : a.xAxis[1] && a.xAxis[1].hide()
            },
            _setCategories: function () {
                var b = this.jsonData, a = this.components.xAxis, b = b.categories && b.categories[0].category || [],
                    g = [], d, f;
                for (f = 0; f < b.length; f++) d = U({}, b[f]), d.label = L, g.push(d);
                a[0].setAxisPadding(.5, .5);
                a[0].setCategory(b);
                a[1] && a[1].setAxisPadding(.5, .5);
                a[1] && a[1].setCategory(g)
            },
            _setAxisLimits: function () {
                var b = this.components, a = b.dataset, g = b.yAxis, b = b.xAxis, d, f = a.length, c, h = -Infinity,
                    q = Infinity, k = -Infinity, t = Infinity, O = Infinity, x = -Infinity, p, G = 0, u = {};
                for (c = 0; c < f; c++) d = a[c], p = d.groupManager, G = d.config.parentYAxis, p ? (u[d.type] = p, u[d.type].yAxisIndex = G) : (d = d.getDataLimits(), 1 === G ? (k = v(k, d.max), t = Z(t, d.min)) : (h = v(h,
                    d.max), q = Z(q, d.min)), x = v(x, d.xMax || -Infinity), O = Z(O, d.xMin || Infinity));
                for (p in u) d = u[p].getDataLimits(), h = v(h, d.max), q = Z(q, d.min);
                a = this._getTrendLineMinMax("h");
                h = v(h, a.max);
                q = Z(q, a.min);
                g[0].setDataLimit(h, q);
                g[1].setDataLimit(k, t);
                if (-Infinity !== x || Infinity !== O) b[0].setAxisRange({
                    min: O - .5,
                    max: x + .5,
                    tickInterval: 1
                }), b[1] && b[1].setAxisRange({min: O - .5, max: x + .5, tickInterval: 1})
            },
            isDual: !0
        }, E.mscartesian, {enablemousetracking: !0, iscandlestick: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-kagi",
        function () {
            var a = this.hcLib, c = a.chartAPI, E = Math, e = E.min, ba = E.max, W = a.pluck, S = a.pluckNumber,
                I = a.toPrecision, a = !a.CREDIT_REGEX.test(this.window.location.hostname);
            c("kagi", {
                    standaloneInit: !0,
                    friendlyName: "Kagi Chart",
                    creditLabel: a,
                    defaultDatasetType: "kagi",
                    applicableDSList: {kagi: !0},
                    singleseries: !0,
                    hasLegend: !1,
                    _postSpaceManagement: function () {
                        var a = this.config, c = this.components, E = c.xAxis && c.xAxis[0], I = c.yAxis && c.yAxis[0],
                            r = c.canvas.config, D = r.canvasBorderWidth, v = r.canvasPadding || 15, A = r.canvasPaddingTop,
                            r = r.canvasPaddingBottom, F = this.jsonData.chart,
                            l = (c = c.dataset[0].config) && c.shiftCount, C = S(E.getAxisConfig("axisMinValue"), 0),
                            H = S(E.getAxisConfig("axisMaxValue"), l - 1), Q = this.config.canvasWidth;
                        e(S(F.canvaspadding, 0), Q / 2 - 10);
                        var F = S(F.maxhshiftpercent, 10), Q = Q - 2 * v, n;
                        I && I.setAxisDimention({
                            x: a.canvasLeft - D,
                            y: a.canvasTop + A,
                            opposite: a.canvasRight + D,
                            axisLength: a.canvasHeight - A - r
                        });
                        this._setPosition();
                        c && (n = c.xShiftLength = e(Q / l, (0 >= F ? 10 : F) * Q / 100), ba(l - 1, 1), H = ba(H, 1));
                        this._adjustCanvasPadding();
                        E && E.setAxisDimention({
                            x: this.config.canvasLeft +
                                v + n / 2,
                            axisLength: n * (H - C),
                            y: a.canvasBottom + (a.shift || 0) + D,
                            opposite: a.canvasTop - D
                        })
                    },
                    _setPosition: function () {
                        var a, c, e, E, r, D, v;
                        a = this.components;
                        E = this.jsonData;
                        var A = a.dataset[0], F = E.data || A && A[0] && A[0].data, l = (A = A.components.data) && A.length,
                            C = a.yAxis[0], H = 0, Q = H, n = [];
                        for (a = 0; a < l; a++) c = A[a].config, e = c.setValue, (E = A[a]) || (A[a] = {graphics: {}}), c.isDefined || (e = c.plotValue), e = W(c.plotValue, e), c.plotY = I(C.getAxisPosition(c.setValue), 2), c.graphY = I(C.getAxisPosition(e), 2), c.plotX = Q, c.isShift ? (Q = H += 1, F && n.push(F[a])) :
                            a === l - 1 && F && n.push(F[a]), a && (v = A[a - 1].config, E = c && c.objParams && c.objParams.isRally, e = c && c.objParams && c.objParams.lastHigh, r = c && c.objParams && c.objParams.lastLow, D = c && c.objParams && c.objParams.isRallyInitialised, v && D && v.isRally !== c.isRally ? (c.isChanged = !0, c.ty = I(C.getAxisPosition(E ? e : r), 2)) : c.isChanged = !1)
                    },
                    _setAxisLimits: function () {
                        var a = this.components, c = a.dataset, E = a.yAxis, a = a.xAxis, I, r = c.length, D, v = -Infinity,
                            A = Infinity, F = Infinity, l = -Infinity, C, H = {}, Q = [], n = function (b) {
                                v = ba(v, b.max);
                                A = e(A, b.min);
                                l =
                                    ba(l, b.xMax || -Infinity);
                                F = e(F, b.xMin || Infinity)
                            };
                        for (D = 0; D < r; D++) I = c[D], (C = I.groupManager) ? H[I.type] = C : Q.push(I);
                        for (C in H) c = H[C].getDataLimits(), n(c);
                        r = Q.length;
                        for (D = 0; D < r; D++) c = Q[D].getDataLimits(), n(c);
                        n(this._getTrendLineMinMax("h"));
                        -Infinity === v && (v = 0);
                        Infinity === A && (A = 0);
                        this.config.yMax = v;
                        this.config.yMin = A;
                        E[0].setAxisConfig({setAdaptiveMin: !0});
                        E[0].setDataLimit(v, A);
                        if (-Infinity !== l || Infinity !== F) a[0].config.xaxisrange = {
                            max: l,
                            min: F
                        }, a[0].setDataLimit(l, F)
                    }
                }, c.waterfall2d, {enablemousetracking: !0},
                c.areabase)
        }]);
    J.register("module", ["private", "modules.renderer.js-boxandwhisker2d", function () {
        var a = this.hcLib, c = a.chartAPI, E = a.pluck, e = a.parseUnsafeString, ba = a.BLANKSTRING, W = a.BLANKSTRING,
            S = a.preDefStr.sStr, I = a.componentDispose, B = a.HUNDREDSTRING, X = a.setAttribDefs, M = a.attrTypeNum,
            R = !a.CREDIT_REGEX.test(this.window.location.hostname), r = Math, D = r.round, v = r.abs, A = r.ceil,
            F = r.floor, l = r.sqrt, C = r.pow;
        a.BoxAndWhiskerStatisticalCalc = a = function (a, c, n) {
            this.nf = c;
            this.dataSeparator = n;
            this.method = (a || ba).toLowerCase().replace(/\s/g,
                W)
        };
        a.prototype = {
            setArray: function (a) {
                var c = this.nf, n = this.dataSeparator, b = 0;
                !a && (a = ba);
                for (a = this.dataLength = (n = a.replace(/\s/g, ba).split(n)) && n.length; a--;) b += n[a] = c.getCleanValue(n[a]);
                n && n.sort(function (b, a) {
                    return b - a
                });
                this.values = n;
                this.mean = b / this.dataLength;
                this.getFrequencies()
            }, getQuartiles: function () {
                var a = this.values, c = this.dataLength, n = c % 2, b, z;
                switch (this.method) {
                    case "tukey":
                        n ? (n = (c + 3) / 4, c = (3 * c + 1) / 4) : (n = (c + 2) / 4, c = (3 * c + 2) / 4);
                        break;
                    case "mooremccabe":
                        n ? (n = (c + 1) / 4, c = 3 * n) : (n = (c + 2) / 4, c =
                            (3 * c + 2) / 4);
                        break;
                    case "freundperles":
                        n = (c + 3) / 4;
                        c = (3 * c + 1) / 4;
                        break;
                    case "mendenhallsincich":
                        n = D((c + 1) / 4);
                        c = D(3 * n);
                        break;
                    default:
                        n = (c + 1) / 4, c = 3 * n
                }
                --n;
                --c;
                b = F(n);
                z = F(c);
                n = n - b ? a[b] + (a[A(n)] - a[b]) * (n - b) : a[n];
                a = c - z ? a[z] + (a[A(c)] - a[z]) * (c - z) : a[c];
                return this.quartiles = {q1: n, q3: a}
            }, getMinMax: function () {
                var a = this.values;
                return {min: a[0], max: a[this.dataLength - 1]}
            }, getMean: function () {
                return this.mean
            }, getMD: function () {
                for (var a = this.mean, c = this.frequencies, n = c.length, b, z = 0; n--;) b = c[n], z += b.frequency * v(b.value -
                    a);
                return z / this.dataLength
            }, getSD: function () {
                for (var a = this.mean, c = this.values, n = this.dataLength, b = n, z = 0; n--;) z += C(c[n] - a, 2);
                return l(z) / b
            }, getQD: function () {
                return .5 * (this.quartiles.q3 - this.quartiles.q1)
            }, getFrequencies: function () {
                var a = [], c = this.dataLength, n = this.values, b = 0, z, f, e;
                for (e = 0; e < c; e += 1) b += z = n[e], f = a[e], void 0 !== f && null !== f ? a[e].frequency += 1 : (f = {}, f.value = z, f.frequency = 1, a[e] = f);
                this.sum = b;
                this.frequencies = a
            }, getMedian: function () {
                var a = this.dataLength, c = .5 * a, n = this.values;
                return 0 === a %
                2 ? (n[c] + n[c - 1]) / 2 : n[F(c)]
            }
        };
        a.prototype.constructor = a;
        X && X({
            whiskerslimitswidthratio: {type: M, pAttr: "whiskerslimitswidthratio"},
            outliersupperrangeratio: {type: M, pAttr: "outliersupperrangeratio"},
            outlierslowerrangeratio: {type: M, pAttr: "outlierslowerrangeratio"},
            showalloutliers: {type: M, pAttr: "showalloutliers"},
            showmean: {type: M, pAttr: "showmean"},
            showsd: {type: M, pAttr: "showsd"},
            showmd: {type: M, pAttr: "showmd"},
            showqd: {type: M, pAttr: "showqd"},
            showminvalues: {type: M, pAttr: "showminvalues"},
            showmaxvalues: {
                type: M,
                pAttr: "showmaxvalues"
            },
            showq1values: {type: M, pAttr: "showq1values"},
            showq3values: {type: M, pAttr: "showq3values"},
            showmedianvalues: {type: M, pAttr: "showmedianvalues"}
        });
        c("boxandwhisker2d", {
            friendlyName: "Box and Whisker Chart",
            standaloneInit: !0,
            creditLabel: R,
            chart: c.errorbar2d.chart,
            drawErrorValue: c.errorbar2d.drawErrorValue,
            decimals: 2,
            maxColWidth: Infinity,
            useErrorAnimation: 1,
            avoidCrispError: 0,
            tooltipsepchar: ": ",
            defaultDatasetType: "boxandwhisker2d",
            applicableDSList: {boxandwhisker2d: !0},
            hasSubDataset: !0,
            fireGroupEvent: !0,
            fireInitialAnimation: !0,
            drawTracker: !0,
            _drawDataset: function () {
                var a = this.components.dataset, c, n = a.length, b, z, f = {};
                for (b = 0; b < n; b++) c = a[b], z = c.groupManager, f[c.type] = z;
                for (z in f) f[z].draw();
                a.flag = !0;
                for (b = 0; b < n; b++) for (a[b].components.mean && a[b].components.mean.draw(), a[b].components.sd && a[b].components.sd.draw(), a[b].components.md && a[b].components.md.draw(), a[b].components.qd && a[b].components.qd.draw(), z = a[b].config.maxNumberOfOutliers || a[b].components.outliers.length, c = 0; c < z; c++) a[b].config.showOutliersLegend ||
                (a[b].components.outliers[c].visible = !1), a[b].components.outliers && a[b].components.outliers[c].draw()
            },
            _createDatasets: function () {
                var a = this.components, c = a.xAxis[0], n = this.jsonData, b = n.dataset, z = b && b.length, f, l, r,
                    m = this.defaultDatasetType, v = this.applicableDSList, A = this.components.legend;
                f = A.components.items || [];
                var L, w, U, g, y = this.isStacked, P, C, d = [], N = this.isRealTime, T = this.config.catLen, h = {};
                b || this.setChartMessage();
                this.config.categories = n.categories && n.categories[0].category;
                n = a.dataset || (a.dataset =
                    []);
                l = n.length;
                A.emptyItems(0, f.length);
                for (f = 0; f < z; f++) if (g = b[f], g.seriesname && (g.seriesname = e(g.seriesname)), r = g.parentyaxis || W, w = (w = this.isDual && r.toLowerCase() === S ? E(g.renderas, this.sDefaultDatasetType) : E(g.renderas, m)) && w.toLowerCase(), v[w] || (w = m), U = J.get("component", ["dataset", w])) void 0 === h[w] ? h[w] = 0 : h[w]++, P = "datasetGroup_" + w, r = J.register("component", ["datasetGroup", w]), (L = a[P]) && d.push(L), r && !L && (L = a[P] = new r, L.chart = this, L.init()), (r = n[f]) ? (w = c.getCategoryLen(), P = T - w, U = N ? r.components : r.JSONData,
                    C = U.data && U.data.length || 0, U = g.data && g.data.length || 0, C -= U, P > C || (P = C, w = U), 0 < P && r.removeData(w, P, !1), n[f].JSONData = g, n[f].configure(), n[f]._deleteGridImages && n[f]._deleteGridImages()) : (r = new U, n.push(r), r.chart = this, r.index = f, L && (y ? L.addDataSet(r, 0, h[w]) : L.addDataSet(r, h[w], 0)), r.init(g));
                if (l > z) {
                    P = l - z;
                    L && y && L.removeDataSet(0, f, P);
                    a = f;
                    for (z = P + f; a < z; a++) L && !y && L.removeDataSet(f, 0, 1), A.removeItem(n[a].legendItemId), I.call(n[a]);
                    n.splice(f, P)
                }
                this.config.catLen = c.getCategoryLen()
            }
        }, c.mscartesian, {
            showplotborder: 1,
            plotborderdashlen: 5,
            plotborderdashgap: 4,
            plotfillalpha: B,
            useroundedges: 0,
            plotborderthickness: 1,
            showvalues: 1,
            valuepadding: 2,
            showtooltip: 1,
            maxcolwidth: 50,
            rotatevalues: 0,
            use3dlighting: 1,
            whiskerslimitswidthratio: 40,
            outliersupperrangeratio: 0,
            outlierslowerrangeratio: 0,
            showalloutliers: 0,
            showmean: 0,
            showsd: 0,
            showmd: 0,
            showqd: 0,
            showminvalues: 1,
            showmaxvalues: 1,
            showq1values: 0,
            showq3values: 0,
            showmedianvalues: 1
        })
    }]);
    J.register("module", ["private", "modules.renderer.js-heatmap", function () {
        var a = this.hcLib, c = a.chartAPI,
            E = a.pluckFontSize, e = a.pluck, ba = a.pluckNumber, W = a.preDefStr, S = W.defaultFontStr,
            I = W.divLineAlpha3DStr, B = W.divLineAlphaStr, X = W.altVGridColorStr, M = W.altVGridAlphaStr,
            R = W.altHGridColorStr, r = W.altHGridAlphaStr, D = W.colors.c000000,
            W = !a.CREDIT_REGEX.test(this.window.location.hostname);
        c("heatmap", {
            friendlyName: "Heatmap Chart",
            standaloneInit: !0,
            creditLabel: W,
            hasLegend: !0,
            tooltipsepchar: ": ",
            tooltipConstraint: "chart",
            defaultDatasetType: "heatmap",
            applicableDSList: {heatmap: !0},
            isSingleSeries: !0,
            hasGradientLegend: !0,
            _createAxes: function () {
                var a = this.components, c = J.register("component", ["axis", "cartesian"]), e;
                a.yAxis = [];
                a.xAxis = [];
                a.yAxis[0] = e = new c;
                a.xAxis[0] = a = new c;
                e.chart = this;
                a.chart = this;
                e.init();
                a.init()
            },
            _postSpaceManagement: function () {
                var a = this.config, c = a.placeAxisLabelsOnTop, e = this.components, l = e.xAxis && e.xAxis[0],
                    r = e.yAxis && e.yAxis[0], H = e.legend, Q = a.xDepth, e = e.canvas.config.canvasBorderWidth;
                l && l.setAxisDimention({
                    x: a.canvasLeft,
                    y: c ? a.canvasTop + (a.shift || 0) - e : a.canvasBottom + (a.shift || 0) + e,
                    opposite: a.canvasTop -
                        e,
                    axisLength: a.canvasWidth
                });
                r && r.setAxisDimention({
                    x: a.canvasLeft - e,
                    y: a.canvasTop,
                    opposite: a.canvasRight + e,
                    axisLength: a.canvasHeight
                });
                l && l.shiftLabels(-Q, 0);
                H.postSpaceManager();
                this.config.realtimeEnabled && this._setRealTimeCategories && this._setRealTimeCategories();
                this._adjustCanvasPadding()
            },
            _adjustCanvasPadding: function () {
            },
            _feedAxesRawData: function () {
                var c = this.components, A = c.colorManager, F = this.jsonData, l = F.chart, C;
                C = this.is3d;
                var H = a.chartPaletteStr, H = C ? H.chart3D : H.chart2D;
                C = {
                    outCanfontFamily: e(l.outcnvbasefont,
                        l.basefont, S),
                    outCanfontSize: E(l.outcnvbasefontsize, l.basefontsize, 10),
                    outCancolor: e(l.outcnvbasefontcolor, l.basefontcolor, A.getColor(H.baseFontColor)).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    axisNamePadding: l.xaxisnamepadding,
                    axisValuePadding: l.labelpadding,
                    axisNameFont: l.xaxisnamefont,
                    axisNameFontSize: l.xaxisnamefontsize,
                    axisNameFontColor: l.xaxisnamefontcolor,
                    axisNameFontBold: l.xaxisnamefontbold,
                    axisNameFontItalic: l.xaxisnamefontitalic,
                    axisNameBgColor: l.xaxisnamebgcolor,
                    axisNameBorderColor: l.xaxisnamebordercolor,
                    axisNameAlpha: l.xaxisnamealpha,
                    axisNameFontAlpha: l.xaxisnamefontalpha,
                    axisNameBgAlpha: l.xaxisnamebgalpha,
                    axisNameBorderAlpha: l.xaxisnameborderalpha,
                    axisNameBorderPadding: l.xaxisnameborderpadding,
                    axisNameBorderRadius: l.xaxisnameborderradius,
                    axisNameBorderThickness: l.xaxisnameborderthickness,
                    axisNameBorderDashed: l.xaxisnameborderdashed,
                    axisNameBorderDashLen: l.xaxisnameborderdashlen,
                    axisNameBorderDashGap: l.xaxisnameborderdashgap,
                    useEllipsesWhenOverflow: l.useellipseswhenoverflow,
                    divLineColor: e(l.vdivlinecolor,
                        l.divlinecolor, A.getColor(H.divLineColor)),
                    divLineAlpha: e(l.vdivlinealpha, l.divlinealpha, C ? A.getColor(I) : A.getColor(B)),
                    divLineThickness: ba(l.vdivlinethickness, l.divlinethickness, 1),
                    divLineIsDashed: !!ba(l.vdivlinedashed, l.vdivlineisdashed, l.divlinedashed, l.divlineisdashed, 0),
                    divLineDashLen: ba(l.vdivlinedashlen, l.divlinedashlen, 4),
                    divLineDashGap: ba(l.vdivlinedashgap, l.divlinedashgap, 2),
                    showAlternateGridColor: ba(l.showalternatevgridcolor, 0),
                    alternateGridColor: e(l.alternatevgridcolor, A.getColor(X)),
                    alternateGridAlpha: e(l.alternatevgridalpha, A.getColor(M)),
                    numDivLines: l.numvdivlines,
                    labelFont: l.labelfont,
                    labelFontSize: l.labelfontsize,
                    labelFontColor: l.labelfontcolor,
                    labelFontAlpha: l.labelalpha,
                    labelFontBold: l.labelfontbold,
                    labelFontItalic: l.labelfontitalic,
                    axisName: l.xaxisname,
                    axisMinValue: l.xaxisminvalue,
                    axisMaxValue: l.xaxismaxvalue,
                    setAdaptiveMin: l.setadaptivexmin,
                    adjustDiv: l.adjustvdiv,
                    labelDisplay: l.labeldisplay,
                    showLabels: ba(l.showxaxislabels, l.showlabels),
                    rotateLabels: l.rotatexaxislabels,
                    slantLabel: ba(l.slantlabels, l.slantlabel),
                    labelStep: ba(l.labelstep, l.xaxisvaluesstep),
                    showAxisValues: ba(l.showxaxisvalues, l.showxaxisvalue),
                    maxLabelHeight: l.maxlabelheight,
                    showZeroPlane: l.showvzeroplane,
                    zeroPlaneColor: l.vzeroplanecolor,
                    zeroPlaneThickness: l.vzeroplanethickness,
                    zeroPlaneAlpha: l.vzeroplanealpha,
                    showZeroPlaneValue: l.showvzeroplanevalue,
                    trendlineColor: l.trendlinecolor,
                    trendlineToolText: l.trendlinetooltext,
                    trendlineThickness: l.trendlinethickness,
                    trendlineAlpha: l.trendlinealpha,
                    showTrendlinesOnTop: l.showtrendlinesontop,
                    showAxisLine: ba(l.showxaxisline, l.showaxislines, l.drawAxisLines, 0),
                    axisLineThickness: ba(l.xaxislinethickness, l.axislinethickness, 1),
                    axisLineAlpha: ba(l.xaxislinealpha, l.axislinealpha, 100),
                    axisLineColor: e(l.xaxislinecolor, l.axislinecolor, D)
                };
                A = {
                    outCanfontFamily: e(l.outcnvbasefont, l.basefont, S),
                    outCanfontSize: E(l.outcnvbasefontsize, l.basefontsize, 10),
                    outCancolor: e(l.outcnvbasefontcolor, l.basefontcolor, A.getColor(H.baseFontColor)).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    axisNamePadding: l.yaxisnamepadding,
                    axisValuePadding: l.yaxisvaluespadding,
                    axisNameFont: l.yaxisnamefont,
                    axisNameFontSize: l.yaxisnamefontsize,
                    axisNameFontColor: l.yaxisnamefontcolor,
                    axisNameFontBold: l.yaxisnamefontbold,
                    axisNameFontItalic: l.yaxisnamefontitalic,
                    axisNameBgColor: l.yaxisnamebgcolor,
                    axisNameBorderColor: l.yaxisnamebordercolor,
                    axisNameAlpha: l.yaxisnamealpha,
                    axisNameFontAlpha: l.yaxisnamefontalpha,
                    axisNameBgAlpha: l.yaxisnamebgalpha,
                    axisNameBorderAlpha: l.yaxisnameborderalpha,
                    axisNameBorderPadding: l.yaxisnameborderpadding,
                    axisNameBorderRadius: l.yaxisnameborderradius,
                    axisNameBorderThickness: l.yaxisnameborderthickness,
                    axisNameBorderDashed: l.yaxisnameborderdashed,
                    axisNameBorderDashLen: l.yaxisnameborderdashlen,
                    axisNameBorderDashGap: l.yaxisnameborderdashgap,
                    axisNameWidth: l.yaxisnamewidth,
                    useEllipsesWhenOverflow: l.useellipseswhenoverflow,
                    rotateAxisName: ba(l.rotateyaxisname, 1),
                    axisName: l.yaxisname,
                    showAlternateGridColor: ba(l.showalternatehgridcolor, 1),
                    alternateGridColor: e(l.alternatehgridcolor, A.getColor(R)),
                    alternateGridAlpha: e(l.alternatehgridalpha, A.getColor(r)),
                    numDivLines: l.numdivlines,
                    axisMinValue: l.yaxisminvalue,
                    axisMaxValue: l.yaxismaxvalue,
                    setAdaptiveMin: l.setadaptiveymin,
                    adjustDiv: l.adjustdiv,
                    labelStep: l.yaxisvaluesstep,
                    showLabels: ba(l.showyaxislabels, l.showlabels),
                    maxLabelWidthPercent: l.maxlabelwidthpercent,
                    showAxisValues: ba(l.showyaxisvalues, l.showyaxisvalue),
                    divLineColor: e(l.hdivlinecolor, A.getColor(H.divLineColor)),
                    divLineAlpha: e(l.hdivlinealpha, A.getColor(B)),
                    divLineThickness: ba(l.hdivlinethickness, 1),
                    divLineIsDashed: !!ba(l.hdivlinedashed, l.hdivlineisdashed,
                        0),
                    divLineDashLen: ba(l.hdivlinedashlen, 4),
                    divLineDashGap: ba(l.hdivlinedashgap, 2),
                    showZeroPlane: l.showzeroplane,
                    zeroPlaneColor: l.zeroplanecolor,
                    zeroPlaneThickness: l.zeroplanethickness,
                    zeroPlaneAlpha: l.zeroplanealpha,
                    showZeroPlaneValue: l.showzeroplanevalue,
                    trendlineColor: l.trendlinecolor,
                    trendlineToolText: l.trendlinetooltext,
                    trendlineThickness: l.trendlinethickness,
                    trendlineAlpha: l.trendlinealpha,
                    showTrendlinesOnTop: l.showtrendlinesontop,
                    showAxisLine: ba(l.showyaxisline, l.showaxislines, l.drawAxisLines,
                        0),
                    axisLineThickness: ba(l.yaxislinethickness, l.axislinethickness, 1),
                    axisLineAlpha: ba(l.yaxislinealpha, l.axislinealpha, 100),
                    axisLineColor: e(l.yaxislinecolor, l.axislinecolor, D)
                };
                C.vtrendlines = F.vtrendlines;
                A.trendlines = F.trendlines;
                F = c.yAxis[0];
                c = c.xAxis[0];
                F.setCommonConfigArr(A, !0, !0, !1);
                c.setCommonConfigArr(C, !1, !1, this.config.placeAxisLabelsOnTop ? !0 : !1);
                F.configure();
                c.configure();
                this._setCategories()
            },
            _setAxisLimits: function () {
            },
            _setCategories: function () {
                var a = this.components, c = this.jsonData,
                    r = a.xAxis, a = a.yAxis, l = c.dataset && c.dataset[0].data && c.dataset[0].data.length, C, H, Q,
                    n, b, z = [], f = [], K;
                if (!c.columns || !c.rows) for (c.columns = {}, c.columns.column = n = [], c.rows = {}, c.rows.row = b = [], C = 0; C < l; C++) {
                    Q = H = !0;
                    for (K = 0; K < n.length; K++) c.dataset[0].data[C].columnid == n[K].id && (H = !1);
                    H && (H = {
                        id: c.dataset[0].data[C].columnid,
                        label: c.dataset[0].data[C].columnid
                    }, c.columns.column.push(H));
                    for (K = 0; K < b.length; K++) c.dataset[0].data[C].rowid == b[K].id && (Q = !1);
                    Q && (Q = {id: c.dataset[0].data[C].rowid, label: c.dataset[0].data[C].rowid},
                        c.rows.row.push(Q))
                }
                n = c.columns.column;
                b = c.rows.row;
                for (C = 0; C < (n && n.length); C++) n[C].label = e(n[C].label, n[C].name, n[C].id), void 0 !== n[C].label && z.push(n[C]);
                c.columns.column = z;
                for (C = 0; C < (b && b.length); C++) b[C].label = e(b[C].label, b[C].name, b[C].id), void 0 !== b[C].label && f.push(b[C]);
                c.rows.row = f;
                c.columns && r[0].setAxisPadding(.5, .5);
                c.columns && r[0].setCategory(c.columns.column);
                c.columns && a[0].setAxisPadding(.5, .5);
                c.rows && a[0].setCategory(c.rows.row);
                r[0].setAxisConfig({
                    categoryNumDivLines: c.columns.column.length -
                        1, categoryDivLinesFromZero: 0, showAlternateGridColor: 0
                });
                a[0].setAxisConfig({
                    categoryNumDivLines: c.rows.row.length - 1,
                    categoryDivLinesFromZero: 0,
                    showAlternateGridColor: 0
                })
            }
        }, c.mscartesian, {enablemousetracking: !0})
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-errorbar2d", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.colors, e = E.FFFFFF, ba = E.AAAAAA, W = c.configStr,
            S = c.animationObjStr, I = c.columnStr, B = c.shadowStr, X = c.errorBarStr, M = c.errorShadowStr,
            R = c.miterStr, r = c.visibleStr, D = c.visiblilityStr,
            v = c.ROUND, A = c.PERCENTAGESTRING, F = c.pStr, l = c.sStr, C = a.BLANKSTRING, H = a.parseTooltext,
            Q = a.pluck, n = a.getValidValue, b = a.pluckNumber, z = a.getFirstValue, f = a.toRaphaelColor,
            K = a.COMMASPACE, V = c.showHoverEffectStr, m = c.setRolloverAttrStr, Z = c.setRolloutAttrStr,
            ga = "rgba(192,192,192," + (a.isIE ? .002 : 1E-6) + ")", c = a.TOUCH_THRESHOLD_PIXELS,
            E = a.CLICK_THRESHOLD_PIXELS, L = Math, w = L.round, U = L.min, g = L.max, y = L.abs,
            P = a.hasTouch ? c : E, ka = a.getFirstColor, d = a.getFirstAlpha, N = a.graphics.getLightColor,
            T = a.graphics.convertColor, h = a.HUNDREDSTRING,
            q = a.plotEventHandler;
        J.register("component", ["dataset", "ErrorBar2D", {
            configure: function () {
                var k = this.chart, d = this.config, q = this.JSONData, x = q.data, p = k.config.categories,
                    c = U(p && p.length, x && x.length), u = k.jsonData.chart, da = k.components.colorManager, m,
                    y = da.getPlotColor(this.index || this.positionIndex), aa = b(q.dashed, u.plotborderdashed),
                    L = b(u.useplotgradientcolor, 1), r = a.parseUnsafeString, T = r(u.yaxisname), P = r(u.xaxisname),
                    Z = r(Q(u.tooltipsepchar, K)), v = b(u.seriesnameintooltip, 1), V = a.parseTooltext, H, ga, D, E,
                    ka,
                    B, M, I, W, S, X, R, ba, J, la, ia, ea, sa, fa, ha, ca, Aa, ya, Y, ua, xa, za, Ga,
                    Ma = a.getDashStyle, ra = this.components.data, Ba = k.components.numberFormatter, Ua = k.isBar,
                    Ja = k.is3D;
                ea = k.isStacked;
                var ja, xb, eb;
                m = {};
                m = m.dataObj || (m.dataObj = {});
                S = m.chart || (m.chart = {});
                d.legendSymbolColor = y;
                m = d.showplotborder = b(u.showplotborder, Ja ? 0 : 1);
                d.plotDashLen = M = b(u.plotborderdashlen, 5);
                d.plotDashGap = I = b(u.plotborderdashgap, 4);
                d.plotfillAngle = X = b(360 - u.plotfillangle, Ua ? 180 : 90);
                d.plotFillAlpha = R = Q(q.alpha, u.plotfillalpha, h);
                d.plotColor = Q(q.color,
                    y);
                d.legendSymbolColor = d.plotColor;
                d.isRoundEdges = W = b(u.useroundedges, 0);
                d.plotRadius = b(u.useRoundEdges, d.isRoundEdges ? 1 : 0);
                d.plotFillRatio = ba = Q(q.ratio, u.plotfillratio);
                d.plotgradientcolor = J = a.getDefinedColor(u.plotgradientcolor, da.getColor("plotGradientColor"));
                !L && (J = C);
                d.plotBorderAlpha = la = m ? Q(u.plotborderalpha, R, h) : 0;
                d.plotBorderColor = ia = Q(u.plotbordercolor, Ja ? e : da.getColor("plotBorderColor"));
                d.plotBorderThickness = L = b(u.plotborderthickness, 1);
                d.plotBorderDashStyle = aa = aa ? Ma(M, I, L) : "none";
                d.showValues =
                    b(q.showvalues, u.showvalues, 1);
                d.valuePadding = b(u.valuepadding, 2);
                d.enableAnimation = ja = b(u.animation, u.defaultanimation, 1);
                d.animation = ja ? {duration: 1E3 * b(u.animationduration, 1)} : !1;
                S.transposeAnimation = d.transposeAnimation = b(u.transposeanimation, S.transposeAnimation, ja);
                d.transposeAnimDuration = 1E3 * b(u.transposeanimduration, .2);
                d.showShadow = W || Ja ? b(u.showshadow, 1) : b(u.showshadow, da.getColor("showShadow"));
                d.showHoverEffect = S = b(u.plothovereffect, u.showhovereffect, void 0);
                d.showTooltip = da = b(u.showtooltip,
                    1);
                d.stack100Percent = ja = b(k.stack100percent, u.stack100percent, 0);
                d.definedGroupPadding = g(b(u.plotspacepercent), 0);
                d.plotSpacePercent = g(b(u.plotspacepercent, 20) % 100, 0);
                d.maxColWidth = b(Ua ? u.maxbarheight : u.maxcolwidth, 50);
                d.showPercentValues = b(u.showpercentvalues, ea && ja ? 1 : 0);
                d.showPercentInToolTip = b(u.showpercentintooltip, ea && ja ? 1 : 0);
                d.plotPaddingPercent = b(u.plotpaddingpercent);
                d.rotateValues = b(u.rotatevalues) ? 270 : 0;
                d.placeValuesInside = b(u.placevaluesinside, 0);
                d.includeInLegend = b(q.includeinlegend, 1);
                d.errorInPercent = xb = b(q.errorinpercent, u.errorinpercent);
                d.cumulativeValueOnErrorBar = b(q.cumulativevalueonerrorbar, u.cumulativevalueonerrorbar, 1);
                d.use3DLighting = b(u.use3dlighting, 1);
                d.parentYAxis = ja = Q(q.parentyaxis && q.parentyaxis.toLowerCase(), F) === l ? 1 : 0;
                ra || (ra = this.components.data = []);
                for (eb = 0; eb < c; eb++) B = x && x[eb], ea = (E = ra[eb]) && E.config, E || (E = ra[eb] = {graphics: {}}), E.config || (ea = ra[eb].config = {}), ea.showValue = b(B.showvalue, d.showValues), ea.setValue = E = Ba.getCleanValue(B.value), ea.setLink = Q(B.link),
                    ea.toolTipValue = ga = Ba.dataLabels(E, ja), ea.setDisplayValue = y = r(B.displayvalue), ea.displayValue = Q(y, ga), ga = b(B.dashed), y = b(B.dashlen, M), H = I = b(B.dashgap, I), ea.plotBorderDashStyle = H = 1 === ga ? Ma(y, H, L) : 0 === ga ? "none" : aa, y = Q(B.color, d.plotColor), R = Q(B.alpha, d.plotFillAlpha), 0 > E && !W && (ka = X, X = Ua ? 180 - X : 360 - X), ea.colorArr = sa = a.graphics.getColumnColor(y + "," + J, R, ba, X, W, ia, la.toString(), Ua ? 1 : 0, Ja ? !0 : !1), ea.label = ga = n(r(Q(p[eb].tooltext, p[eb].label))), 0 !== S && (fa = Q(B.hovercolor, q.hovercolor, u.plotfillhovercolor, u.columnhovercolor,
                    y), ha = Q(B.hoveralpha, q.hoveralpha, u.plotfillhoveralpha, u.columnhoveralpha, R), ca = Q(B.hovergradientcolor, q.hovergradientcolor, u.plothovergradientcolor, J), !ca && (ca = C), Aa = Q(B.hoverratio, q.hoverratio, u.plothoverratio, ba), ya = b(360 - B.hoverangle, 360 - q.hoverangle, 360 - u.plothoverangle, X), Y = Q(B.borderhovercolor, q.borderhovercolor, u.plotborderhovercolor, ia), ua = Q(B.borderhoveralpha, q.borderhoveralpha, u.plotborderhoveralpha, u.plotfillhoveralpha, la, R), R = b(B.borderhoverthickness, q.borderhoverthickness, u.plotborderhoverthickness,
                    L), xa = b(B.borderhoverdashed, q.borderhoverdashed, u.plotborderhoverdashed), za = b(B.borderhoverdashgap, q.borderhoverdashgap, u.plotborderhoverdashgap, M), Ga = b(B.borderhoverdashlen, q.borderhoverdashlen, u.plotborderhoverdashlen, I), xa = xa ? Ma(Ga, za, R) : H, 1 == S && fa === y && (fa = N(fa, 70)), y = a.graphics.getColumnColor(fa + "," + ca, ha, Aa, ya, W, Y, ua.toString(), Ua ? 1 : 0, Ja ? !0 : !1), ea.setRolloutAttr = {
                    fill: Ja ? [f(sa[0]), !d.use3DLighting] : f(sa[0]),
                    stroke: m && f(sa[1]),
                    "stroke-width": L,
                    "stroke-dasharray": H
                }, ea.setRolloverAttr = {
                    fill: Ja ?
                        [f(y[0]), !d.use3DLighting] : f(y[0]),
                    stroke: m && f(y[1]),
                    "stroke-width": R,
                    "stroke-dasharray": xa
                }), H = ea.toolTipValue, y = n(r(Q(B.tooltext, q.plottooltext, u.plottooltext))), ea.setErrorValue = sa = Ba.getCleanValue(B.errorvalue), ea.errorInPercent = b(B.errorinpercent, xb, 0), ea.errorInPercent && (ea.setErrorValue = sa = b((sa / 100 * E).toFixed(2))), ea.cumulativeValueOnErrorBar = b(B.cumulativevalueonerrorbar, d.cumulativeValueOnErrorBar, 1), ea.positiveErrorValue = Ba.getCleanValue(b(B.positiveerrorvalue, B.errorvalue)), ea.errorInPercent &&
                ea.positiveErrorValue && (ea.positiveErrorValue = b((ea.positiveErrorValue / 100 * E).toFixed(2))), ea.positiveCumulativeErrorValue = E + b(ea.positiveErrorValue, ea.setErrorValue), ea.negativeErrorValue = Ba.getCleanValue(b(B.negativeerrorvalue, B.errorvalue)), ea.errorInPercent && ea.negativeErrorValue && (ea.negativeErrorValue = b((ea.negativeErrorValue / 100 * E).toFixed(2))), ea.negativeCumulativeErrorValue = E - b(ea.negativeErrorValue, ea.setErrorValue), ea.errorToolTipValue = fa = Ba.dataLabels(sa, ja), ea.negativeErrorToolTipValue =
                    Ba.dataLabels(ea.negativeErrorValue, ja), ea.negativeCumulativeErrorTooltipValue = Ba.dataLabels(ea.negativeCumulativeErrorValue, ja), ea.positiveErrorToolTipValue = Ba.dataLabels(ea.positiveErrorValue, ja), ea.positiveCumulativeErrorTooltipValue = Ba.dataLabels(ea.positiveCumulativeErrorValue, ja), ea.errorPercentValue = ha = w(sa / E * h * h) / h + A, da ? null === H ? B = !1 : void 0 !== y ? (E = [1, 2, 3, 4, 5, 6, 7, 99, 100, 101, 102, 120, 121], ga = {
                    yaxisName: T,
                    xaxisName: P,
                    formattedValue: H,
                    errorValue: sa,
                    errorDataValue: fa,
                    errorPercentValue: ha,
                    errorPercentDataValue: ha,
                    positiveErrorValue: ea.positiveErrorToolTipValue,
                    negativeErrorValue: ea.negativeErrorToolTipValue,
                    label: ga
                }, B = V(y, E, ga, B, u, q)) : (v && (D = z(q && q.seriesname)), B = D ? D + Z : C, B += ga ? ga + Z : C) : B = !1, ea.toolText = B, ea.setTooltext = B, ka && (X = ka);
                d = this.config.includeInLegend;
                !1 !== k.hasLegend && d && this._addLegend();
                this.ErrorValueConfigure()
            }, ErrorValueConfigure: function () {
                var k = this.chart, t = this.config, q = this.JSONData, h = q.data, p = k.config.categories,
                    p = U(p && p.length, h && h.length), c = k.jsonData.chart, k = a.parseUnsafeString, f,
                    w, e, y = this.components.data, m = k(c.yaxisname), l = k(c.xaxisname), L,
                    r = b(c.seriesnameintooltip, 1), N, P = k(Q(c.tooltipsepchar, K)), Z, v, A, V, ga, E, D,
                    B = -Infinity, F = Infinity, M, I, W, S, X, R = function (k) {
                        t.showTooltip ? null === E ? k = !1 : void 0 !== k ? (Z = [1, 2, 3, 4, 5, 6, 7, 99, 100, 101, 102, 120, 121], v = {
                            yaxisName: m,
                            xaxisName: l,
                            formattedValue: e.toolTipValue,
                            errorValue: ga,
                            errorDataValue: e.errorToolTipValue,
                            errorPercentValue: e.errorPercentValue,
                            errorPercentDataValue: e.errorPercentValue,
                            positiveErrorValue: e.positiveErrorToolTipValue,
                            negativeErrorValue: e.negativeErrorToolTipValue,
                            label: e.label
                        }, k = H(k, Z, v, f, c, q)) : (r && (N = z(q && q.seriesname)), k = N ? N + P : C, k += e.label ? e.label + P : C) : k = !1;
                        return k
                    }, J;
                t.showValues = b(q.showvalues, c.showvalues, 0);
                t.errorBarShadow = w = b(c.errorbarshadow, c.showshadow, 1);
                t.ignoreEmptyDatasets = b(q.ignoreemptydatasets, 0);
                I = b(c.halferrorbar, 1);
                t.notHalfErrorBar = !b(c.halferrorbar, 1);
                V = d(Q(q.errorbaralpha, c.errorbaralpha, t.plotFillAlpha));
                t.errorBarWidthPercent = b(q.errorbarwidthpercent, c.errorbarwidthpercent, 70);
                t.errorBarColor = T(ka(Q(q.errorbarcolor, c.errorbarcolor,
                    ba)), V);
                t.errorBarThickness = b(q.errorbarthickness, c.errorbarthickness, 1);
                t.shadowOpacity = w ? V / 250 : 0;
                for (V = 0; V < p; V++) if (f = h && h[V], e = (w = y[V]) && w.config, J = A = void 0, void 0 !== b(f.value)) {
                    w || (w = y[V] = {graphics: {}});
                    w.config || (e = y[V].config = {});
                    w = e.cumulativeValueOnErrorBar;
                    e.notHalfErrorBar = t.notHalfErrorBar;
                    e.halfErrorBar = I;
                    M = e.setValue;
                    e.showValue = b(f.showvalue, t.showValues);
                    e.hasErrorValue = void 0 !== b(f.errorvalue) ? 1 : 0;
                    ga = e.setErrorValue;
                    D = e.errorValue = ga;
                    E = A = e.errorToolTipValue;
                    D = n(k(Q(f.errorplottooltext,
                        q.errorplottooltext, c.errorplottooltext, E)));
                    L = R(D);
                    A = J = void 0;
                    (D = n(k(Q(f.errorplottooltext, q.errorplottooltext, c.errorplottooltext, e.positiveErrorToolTipValue)))) && e.positiveErrorToolTipValue && (A = R(D));
                    (D = n(k(Q(f.errorplottooltext, q.errorplottooltext, c.errorplottooltext, e.negativeErrorToolTipValue)))) && e.negativeErrorToolTipValue && (J = R(D));
                    w && ((D = n(k(Q(f.errorplottooltext, q.errorplottooltext, c.errorplottooltext, e.positiveCumulativeErrorTooltipValue)))) && e.positiveCumulativeErrorTooltipValue && (S =
                        R(D)), (D = n(k(Q(f.errorplottooltext, q.errorplottooltext, c.errorplottooltext, e.negativeCumulativeErrorTooltipValue)))) && e.negativeCumulativeErrorTooltipValue && (X = R(D)));
                    D = e.positiveErrorValue;
                    W = e.negativeErrorValue;
                    if (f.positiveerrorvalue || f.negativeerrorvalue) e.halfErrorBar = 0, e.notHalfErrorBar = !0;
                    D = M + (null !== D ? D : ga);
                    M -= e.halfErrorBar ? 0 : 0 > W && 0 > M ? 0 : null != W ? W : ga;
                    B = g(B, D, M);
                    F = U(F, D, M);
                    e.errorValueArr = [];
                    null === e.positiveErrorValue && (e.positiveErrorValue = void 0);
                    D = -e.positiveErrorValue;
                    e.errorValueArr.push({
                        errorValue: D,
                        tooltext: w ? S : A || L, errorEdgeBar: !0
                    });
                    e.errorValueArr.push({errorValue: D, tooltext: A || L});
                    e.notHalfErrorBar && (D = e.negativeErrorValue, e.errorValueArr.push({
                        errorValue: D,
                        tooltext: w ? X : J || L,
                        errorEdgeBar: !0
                    }), e.errorValueArr.push({errorValue: D, tooltext: J || L}))
                }
                t.maxValue = B;
                t.minValue = F
            }, init: function (k) {
                var d = this.chart, a = d.components, a = d.isDual ? a.yAxis[this.yAxis || 0] : a.yAxis[0];
                if (!k) return !1;
                this.JSONData = k;
                this.yAxis = a;
                this.chartGraphics = d.chartGraphics;
                this.components = {};
                this.graphics = {};
                this.visible =
                    1 === b(this.JSONData.visible, !Number(this.JSONData.initiallyhidden), 1);
                this.configure()
            }, draw: function () {
                var k = this, d = k.JSONData, q = k.chart.jsonData.chart, h = k.config, p = k.groupManager, c = k.index,
                    g = k.chart.config.categories, n = d.data, w, e, z, l, L = k.visible, r = k.chart,
                    N = r.components.paper, T = r.components.xAxis[0], v = r.components.yAxis[0];
                w = r.graphics.columnGroup;
                var A, H, K = a.parseUnsafeString, D = a.getValidValue, E = a.Raphael, F = h.showTooltip,
                    ka = T.getAxisPosition(0), M = T.getAxisPosition(1), X = h.groupMaxWidth = M - ka, ba =
                        h.definedGroupPadding, J = h.plotSpacePercent / 200, Fa = p.getDataSetPosition(k),
                    ka = p.manageClip, wa = h.maxColWidth, oa = r.get(W, S), M = oa.animType, qa = oa.animObj,
                    la = oa.dummyObj, oa = oa.duration, X = (1 - .01 * ba) * X || U(X * (1 - 2 * J), 1 * wa),
                    X = b(Fa.columnWidth, X / 1), ia, ba = Fa.xPosOffset || 0, Fa = Fa.height, ea, sa,
                    J = k.components.data, fa, ha, ca, Aa, ya, wa = v.getLimit(), Y = wa.min, wa = 0 < wa.max && 0 > Y,
                    Y = v.getAxisBase(), ua = v.yBasePos = v.getAxisPosition(Y), xa = 0, za = h.showShadow,
                    Ga = h.plotBorderThickness, h = h.plotRadius, Ma = k.graphics.container,
                    ra = k.graphics.dataLabelContainer,
                    Ba = k.graphics.shadowContainer, Ua = k.graphics.errorGroupContainer,
                    Ja = k.graphics.errorShadowContainer, ja, xb = !0, eb = !1, Qb = !1,
                    Db = (k.components.removeDataArr || []).length, Kb = k.components.pool || [],
                    pb = r.config.plothovereffect, hb, Eb = function () {
                        !1 !== k.visible || !1 !== k._conatinerHidden && void 0 !== k._conatinerHidden || (Ma.hide(), Ba.hide(), ra && ra.hide(), Ua && Ua.hide(), Ja && Ja.hide(), k._conatinerHidden = !0)
                    }, Fb = function () {
                        k.drawLabel();
                        k.drawErrorValue()
                    };
                Ma || (Ma = k.graphics.container = N.group(I, w).trackTooltip(!0), L ? Ma.show() :
                    Ma.hide());
                Ba || (Ba = k.graphics.shadowContainer = N.group(B, w).toBack(), L || Ba.hide());
                w = T.getCategoryLen();
                for (l = 0; l < w; l++) if (e = n && n[l], fa = J[l]) if (hb = fa.trackerConfig = {}, z = (ya = fa && fa.config) && ya.setValue, void 0 !== fa && void 0 !== z && null !== z) {
                    A = 0 <= z;
                    ca = ya.setLink;
                    ja = ya.colorArr;
                    fa.graphics || (J[l].graphics = {});
                    Aa = ya.displayValue;
                    A = A ? ya.previousPositiveY : ya.previousNegativeY;
                    ha = D(K(Q(e.tooltext, d.plottooltext, q.plottooltext)));
                    ia = v.getAxisPosition(A || Y);
                    e = T.getAxisPosition(l) + ba;
                    0 !== Fa ? (A = v.getAxisPosition(z +
                        (A || 0)), ea = y(ia - A)) : (ea = 0, A = ia);
                    A = U(A, ia);
                    !wa && ka && L && 0 < Ga && (ea += Ga, p.manageClip = !1);
                    fa._oriXPos = e;
                    fa._oriYPos = A;
                    fa._oriHeight = ea;
                    fa._oriWidth = X;
                    p.isCrisp ? (H = E.crispBound(e, A, X, ea, Ga), e = H.x, A = H.y, ia = H.width, ea = H.height) : ia = X;
                    sa = ya.finalTooltext = !1 !== ya.toolText && ya.toolText + (ha ? "" : ya.toolTipValue);
                    ha = ya.plotBorderDashStyle;
                    hb.eventArgs = {
                        index: l,
                        link: ca,
                        value: z,
                        cursor: ca ? "pointer" : C,
                        displayValue: Aa,
                        categoryLabel: g[l].label,
                        toolText: sa ? sa : "",
                        id: C,
                        datasetIndex: c,
                        datasetName: d.seriesname,
                        visible: L
                    };
                    oa ||
                    (ua = A, xa = ea);
                    z = {
                        x: e,
                        y: ua,
                        width: ia,
                        height: xa || 1,
                        r: h,
                        ishot: !F,
                        fill: f(ja[0]),
                        stroke: f(ja[1]),
                        "stroke-width": Ga,
                        "stroke-dasharray": ha,
                        "stroke-linejoin": R,
                        visibility: L
                    };
                    fa._xPos = e;
                    fa._yPos = A;
                    fa._height = ea;
                    fa._width = ia;
                    fa.graphics.element ? (eb = Qb = !0, fa = fa.graphics.element, z = {
                        x: e,
                        y: A,
                        width: ia,
                        height: ea || 1
                    }, fa.animateWith(la, qa, z, oa, M, xb && Eb), fa.attr({
                        r: h,
                        ishot: !F,
                        fill: f(ja[0]),
                        stroke: f(ja[1]),
                        "stroke-width": Ga,
                        "stroke-dasharray": ha,
                        "stroke-linejoin": R,
                        visibility: L
                    }), ya.elemCreated = !1) : (Kb.element && Kb.element.length ?
                        (fa = fa.graphics.element = Kb.element.shift(), fa.show()) : fa = fa.graphics.element = N.rect(z, Ma), fa.attr(z), fa.animateWith(la, qa, {
                        y: A,
                        height: ea || 1
                    }, oa, M, xb && Fb), xb = !1, ya.elemCreated = !0);
                    fa.shadow({opacity: za}, Ba).data("BBox", H);
                    if (ca || F) ea < P && (A -= (P - ea) / 2, ea = P), hb.attr = {
                        x: e,
                        y: A,
                        width: ia,
                        height: ea,
                        r: h,
                        stroke: ga,
                        "stroke-width": Ga,
                        fill: ga,
                        ishot: !0,
                        visibility: L
                    };
                    ca = c + "_" + l;
                    r.config.enablemousetracking && fa.data("groupId", ca).data("eventArgs", hb.eventArgs).data(V, pb).data(m, ya.setRolloverAttr || {}).data(Z, ya.setRolloutAttr ||
                        {})
                }
                Db && k.remove();
                eb && k.drawLabel();
                Qb && k.drawErrorValue()
            }, show: function () {
                var k = this.graphics && this.graphics.container, d = this.graphics && this.graphics.dataLabelContainer,
                    a = this.graphics && this.graphics.shadowContainer,
                    b = this.graphics && this.graphics.errorGroupContainer,
                    q = this.graphics && this.graphics.errorShadowContainer, h = this.chart.is3D,
                    c = this.components.data, f = this.chart.config.categories, g = this.yAxis, n = this.chart,
                    f = U(this.JSONData.data && this.JSONData.data.length, f && f.length);
                n._chartAnimation();
                this.visible = !0;
                this._conatinerHidden = !1;
                if (h) for (k = 0; k < f; k++) c[k].graphics.element && c[k].graphics.element.attr(D, r); else k.show();
                a.show();
                d && d.show();
                b && b.show();
                q && q.show();
                n._setAxisLimits();
                g.draw();
                n._drawDataset()
            }, hide: function () {
                var k = this.yAxis, d = this.chart;
                d._chartAnimation();
                this.visible = !1;
                d._setAxisLimits();
                k.draw();
                d._drawDataset()
            }, drawErrorValue: function () {
                var k = this.index, d = this.config, a = this.JSONData.data, b = a && a.length, q, h, c;
                h = this.visible;
                var a = this.chart, f = a.components.xAxis[0].getCategoryLen(),
                    g = a.graphics.columnGroup, n = a.components.paper, e = a.components.yAxis[0],
                    z = this.components.data, m = this.groupManager.getDataSetPosition(this).height, l = a.get(W, S),
                    L = l.animType, r = l.animObj, N = l.dummyObj, l = l.duration, T = d.errorBarThickness,
                    Z = d.errorBarWidthPercent, A = d.errorBarColor, V = d.showTooltip, d = d.shadowOpacity,
                    H = this.graphics.errorGroupContainer, K = this.graphics.errorShadowContainer, D, E, Q, B, F, ka, I,
                    R, ba, J, ia, ea, sa, fa, ha, ca = 5 < T ? T / 2 : 2.5, Aa;
                H || (H = this.graphics.errorGroupContainer = n.group(X, g), h || H.hide());
                K || (K = this.graphics.errorShadowContainer = n.group(M, g).toBack(), h || K.hide());
                b = U(f, b);
                for (h = 0; h < b; h++) {
                    f = z[h];
                    ha = f.trackerConfig;
                    Aa = f.errorTrackerConfig = {};
                    Aa.errorTrackerArr = [];
                    E = (g = f && f.config) && g.setValue;
                    if (f && (void 0 === E || null === E)) for (f.graphics.element && (f.graphics.element.hide(), f.graphics.element.shadow(!1)), f.graphics.hotElement && f.graphics.hotElement.hide(), R = f.graphics.error && f.graphics.error.length, c = 0; c < R; c++) f.graphics.error && f.graphics.error[c] && (f.graphics.error[c].hide(), f.graphics.error[c].shadow({opacity: 0}));
                    if (void 0 !== f && void 0 !== E && null !== E) if (f.errorBar && delete f.errorBar, ka = g.errorValueArr, Aa.errorLen = R = ka.length, !f.graphics.error && (f.graphics.error = []), !f.graphics.errorTracker && (f.graphics.errorTracker = []), g.errorValue === C || void 0 === g.errorValue || null === g.errorValue && null === g.positiveErrorValue && null === g.negativeErrorValue) for (c = 0; c < R; c++) f.graphics.error && f.graphics.error[c] && (f.graphics.error[c].hide(), f.graphics.error[c].shadow({opacity: 0})); else {
                        J = k + "_" + h;
                        c = g.setLink;
                        ia = 0 > E;
                        D = f._oriXPos;
                        ea =
                            f._oriYPos;
                        sa = f._oriWidth;
                        fa = f._oriHeight;
                        E = ia ? ea + fa : ea;
                        D += sa / 2;
                        for (f.errorBar || (f.errorBar = []); R--;) Aa.errorTrackerArr[R] = {}, q = ka[R], Aa.errorTrackerArr[R].tooltext = q.tooltext, I = E, F = q.errorValue, null === F || isNaN(F) ? f.graphics.error && f.graphics.error[R] && (f.graphics.error[R].hide(), f.graphics.error[R].shadow({opacity: 0})) : (ba = Z / 100 * sa, ba /= 2, Q = 0 === m ? 0 : 1, F = ea + (e.getAxisPosition(0) - e.getAxisPosition(1)) * F * Q, ia && (F += fa), Q = w(F) + T % 2 / 2, B = w(D) + T % 2 / 2, f.errorBar[R] || (f.errorBar[R] = []), q.errorEdgeBar ? (F = ["M",
                            B - ba, Q, "H", B + ba], f.errorBar[R][1] = {
                            _xPos: B - ba - ca,
                            _yPos: Q - ca,
                            _height: 2 * ca,
                            _width: 2 * (ba + ca),
                            _toolText: q.tooltext
                        }) : (F = ["M", B, I, "V", Q], f.errorBar[R][0] = {
                            _xPos: B - ca,
                            _yPos: Q < I ? Q : I,
                            _height: y(I - Q),
                            _width: 2 * ca,
                            _toolText: q.tooltext
                        }), f.graphics.error[R] ? (q = {path: F}, I = f.graphics.error[R], I.animateWith(N, r, q, l, L), I.attr({
                            stroke: A,
                            ishot: !V,
                            "stroke-width": T,
                            cursor: c ? "pointer" : C,
                            "stroke-linecap": v
                        })) : I = f.graphics.error[R] = n.path(F, H).attr({
                            stroke: A,
                            ishot: !V,
                            "stroke-width": T,
                            cursor: c ? "pointer" : C,
                            "stroke-linecap": v
                        }),
                            I.show(), I.shadow({opacity: d}, K), Aa.errorTrackerArr[R].attr = {
                            path: F,
                            stroke: ga,
                            "stroke-width": T < P ? P : T,
                            cursor: c ? "pointer" : C,
                            ishot: !!c
                        }, a.config.enablemousetracking && I.data("groupId", J).data("eventArgs", ha.eventArgs));
                        if (!g.notHalfErrorBar) for (c = 2; 4 > c; c++) f.graphics.error && f.graphics.error[c] && f.graphics.error[c].hide() && f.graphics.error[c].shadow({opacity: 0})
                    }
                }
            }, _rolloverResponseSetter: function (k, d, a) {
                var b = d.graphics;
                d = d.errorBarHovered;
                var h = (b = b && b.element) && b.getData();
                !d && b && 0 !== h.showHoverEffect &&
                b.attr(b.getData().setRolloverAttr);
                b && q.call(b, k, a, "DataPlotRollOver")
            }, _rolloutResponseSetter: function (k, d, a) {
                var b = d.graphics;
                d = d.errorBarHovered;
                var h = (b = b && b.element) && b.getData();
                !d && b && 0 !== h.showHoverEffect && b.attr(b.getData().setRolloutAttr);
                b && q.call(b, k, a, "DataPlotRollOut")
            }, _firePlotEvent: function (k, d, b, h) {
                var p = this.chart, f = this.components.data[d], c = f.graphics.element, g = f.errorBarHovered,
                    n = a.toolTip, w = b.originalEvent, e = p.components.paper.canvas.style, z = f.config.setLink;
                if (c) switch (k) {
                    case "mouseover":
                        this._decideTooltipType(d,
                            h, b);
                        this._rolloverResponseSetter(p, f, w);
                        z && (e.cursor = "pointer");
                        break;
                    case "mouseout":
                        n.hide(p.chartInstance.id);
                        this._rolloutResponseSetter(p, f, w);
                        z && (e.cursor = "default");
                        break;
                    case "click":
                        q.call(c, p, w);
                        break;
                    case "mousemove":
                        this._decideTooltipType(d, h, b), g && !f._isRollover ? (0 !== c.showHoverEffect && c.attr(c.getData().setRolloutAttr), f._isRollover = !0, f._isRollout = !1) : g || f._isRollout || (0 !== c.showHoverEffect && c.attr(c.getData().setRolloverAttr), f._isRollover = !1, f._isRollout = !0)
                }
            }, _checkPointerOverErrorBar: function (k,
                                                    d, a) {
                var b = this.components.data, q = b[k], h, f, c, g, n, w, e, z;
                if (q && (q = q.errorBar)) for (c = q && q.length; c--;) for (g = (f = q[c]) && f.length; g--;) if (f[g] && f[g]._xPos && (h = f[g]._xPos, w = f[g]._yPos, e = f[g]._height, z = f[g]._width, n = f[g]._toolText, h = d >= h && d <= h + z && a >= w && a <= w + e)) return {
                    pointIndex: k,
                    hovered: h,
                    pointObj: b[k],
                    toolText: n
                }
            }, _checkPointerOverPlot: function (k, d, a) {
                var b = this.components.data[k], q = b && b.config, h;
                if (b) return (h = this._checkPointerOverErrorBar(k, d, a)) ? (b.errorBarHovered = !0, q.finalTooltext = h.toolText) : (h = this._checkPointerOverColumn(k,
                    d, a), b.errorBarHovered = !1, h && (q.finalTooltext = !1 !== q.toolText && q.toolText + q.toolTipValue)), h
            }, _getHoveredPlot: function (k, d) {
                var a = this.chart, b = a.components.canvas.config,
                    a = a.components.xAxis[0].getValue(k - a.config.canvasLeft - Math.max(b.canvasPaddingLeft, b.canvasPadding)),
                    b = Math.round(a);
                return 0 < b - a ? this._checkPointerOverPlot(b, k, d) || this._checkPointerOverPlot(b - 1, k, d) : this._checkPointerOverPlot(b + 1, k, d) || this._checkPointerOverPlot(b, k, d)
            }, remove: function () {
                var d = this.components, a = d.removeDataArr,
                    b = d.pool || (d.pool = {element: [], hotElement: [], label: []}), q = a.length, h,
                    f = this.maxminFlag, c, g, n;
                for (g = 0; g < q; g++) if (h = a[0], a.splice(0, 1), h && h.graphics) {
                    c = h.graphics;
                    c.element && c.element.hide() && c.element.shadow({opacity: 0});
                    for (n = 0; 4 > n; n++) c.error && c.error[n] && c.error[n].hide() && c.error[n].shadow({opacity: 0});
                    c.hotElement && c.hotElement.hide() && c.hotElement.attr({width: 0});
                    h.graphics.element && (b.element = b.element.concat(h.graphics.element));
                    h.graphics.hotElement && (b.hotElement = b.hotElement.concat(h.graphics.hotElement));
                    h.graphics.label && (b.label = b.label.concat(h.graphics.label))
                }
                d.pool = b;
                f && this.setMaxMin()
            }
        }, "Column"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-errorline", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.colors.AAAAAA, e = c.configStr, ba = c.animationObjStr,
            W = c.errorBarStr, S = c.errorShadowStr, I = c.ROUND, B = c.PERCENTAGESTRING, c = c.line, X = a.BLANKSTRING,
            M = a.parseTooltext, R = a.pluck, r = a.getValidValue, D = a.pluckNumber, v = a.getFirstValue,
            A = a.COMMASPACE, F = "rgba(192,192,192," + (a.isIE ? .002 : 1E-6) + ")",
            l = a.TOUCH_THRESHOLD_PIXELS, C = a.CLICK_THRESHOLD_PIXELS, H = Math, Q = H.round, n = H.min, b = H.max,
            z = H.abs, f = a.hasTouch ? l : C, K = a.getFirstColor, V = a.getFirstAlpha, m = a.graphics.convertColor,
            Z = a.HUNDREDSTRING;
        J.register("component", ["dataset", "ErrorLine", {
            type: c,
            ErrorValueConfigure: function () {
                var f = this.chart, c = this.config, w = f.config, e = c.parentYAxis, g = this.JSONData, z = g.data,
                    l = f.jsonData.chart, H = f.components.xAxis[0].getCategoryLen(), d = a.parseUnsafeString, N, T, h,
                    q = this.components.data, f = f.components.numberFormatter,
                    k, t, O, x, p, G, u, da;
                da = c.linethickness;
                var ma = -Infinity, La = Infinity, aa, C = d(l.yaxisname), F = d(l.xaxisname), ta,
                    I = R(l.tooltipsepchar, A), W, Qa, Ea, S, ba = D(l.seriesnameintooltip, 1), J = function (d) {
                        w.showtooltip ? null === x ? d = !1 : void 0 !== d ? (W = [1, 2, 3, 4, 5, 6, 7, 99, 100, 101, 102], Qa = {
                            yaxisName: C,
                            xaxisName: F,
                            formattedValue: h.toolTipValue,
                            errorValue: O,
                            errorDataValue: h.errorToolTipValue,
                            errorPercentValue: h.errorPercentValue,
                            errorPercentDataValue: h.errorPercentValue,
                            label: h.label
                        }, d = M(d, W, Qa, N, l, g)) : (ba && (Ea = v(g && g.seriesname)),
                            d = Ea ? Ea + I : X, d += h.label ? h.label + I : X) : d = !1;
                        return d
                    };
                c.errorBarShadow = T = D(l.errorbarshadow, l.showshadow, 1);
                c.ignoreEmptyDatasets = D(g.ignoreemptydatasets, 0);
                D(l.halferrorbar, 1);
                c.notHalfErrorBar = !D(l.halferrorbar, 1);
                k = V(R(g.errorbaralpha, l.errorbaralpha, c.alpha));
                c.errorBarWidth = D(g.errorbarwidth, l.errorbarwidth, 5);
                c.errorBarColor = m(K(R(g.errorbarcolor, l.errorbarcolor, E)), k);
                t = D(g.errorbarthickness, l.errorbarthickness, 1);
                c.errorBarThickness = t > da ? da : t;
                c.shadowOpacity = T ? k / 250 : 0;
                c.errorInPercent = k = D(g.errorinpercent,
                    l.errorinpercent);
                c.cumulativeValueOnErrorBar = D(g.cumulativevalueonerrorbar, l.cumulativevalueonerrorbar, 1);
                for (t = 0; t < H; t++) if (N = z && z[t], z && N) {
                    h = (T = q[t]) && T.config;
                    T || (T = q[t] = {graphics: {}});
                    T.config || (h = q[t].config = {});
                    aa = h.setValue;
                    h.notHalfErrorBar = c.notHalfErrorBar;
                    O = f.getCleanValue(N.errorvalue);
                    h.errorToolTipValue = f.dataLabels(O, e);
                    Q(O / aa * Z * Z);
                    h.setErrorValue = h.errorValue = p = O;
                    h.hasErrorValue = void 0 !== D(N.errorvalue) ? 1 : 0;
                    x = T = h.errorToolTipValue;
                    p = r(d(R(N.errorplottooltext, g.errorplottooltext, l.errorplottooltext,
                        x)));
                    S = J(p);
                    h.errorInPercent = D(N.errorinpercent, k, 0);
                    h.errorInPercent && (h.setErrorValue = O = D((O / 100 * aa).toFixed(2)));
                    h.cumulativeValueOnErrorBar = ta = D(N.cumulativevalueonerrorbar, c.cumulativeValueOnErrorBar, 1);
                    h.positiveErrorValue = f.getCleanValue(D(N.positiveerrorvalue, N.errorvalue));
                    h.errorInPercent && h.positiveErrorValue && (h.positiveErrorValue = D((h.positiveErrorValue / 100 * aa).toFixed(2)));
                    h.positiveCumulativeErrorValue = aa + D(h.positiveErrorValue, h.setErrorValue);
                    h.negativeErrorValue = f.getCleanValue(D(N.negativeerrorvalue,
                        N.errorvalue));
                    h.errorInPercent && h.negativeErrorValue && (h.negativeErrorValue = D((h.negativeErrorValue / 100 * aa).toFixed(2)));
                    h.negativeCumulativeErrorValue = aa - D(h.negativeErrorValue, h.setErrorValue);
                    h.errorToolTipValue = f.dataLabels(O, e);
                    h.negativeErrorToolTipValue = f.dataLabels(h.negativeErrorValue, e);
                    h.negativeCumulativeErrorTooltipValue = f.dataLabels(h.negativeCumulativeErrorValue, e);
                    h.positiveErrorToolTipValue = f.dataLabels(h.positiveErrorValue, e);
                    h.positiveCumulativeErrorTooltipValue = f.dataLabels(h.positiveCumulativeErrorValue,
                        e);
                    h.errorPercentValue = Q(O / aa * Z * Z) / Z + B;
                    T = da = void 0;
                    (p = r(d(R(N.errorplottooltext, g.errorplottooltext, l.errorplottooltext, h.positiveErrorToolTipValue)))) && h.positiveErrorToolTipValue && (T = J(p));
                    (p = r(d(R(N.errorplottooltext, g.errorplottooltext, l.errorplottooltext, h.negativeErrorToolTipValue)))) && h.negativeErrorToolTipValue && (da = J(p));
                    if (N.positiveerrorvalue || N.negativeerrorvalue) h.halfErrorBar = 0, h.notHalfErrorBar = !0;
                    ta && ((p = r(d(R(N.errorplottooltext, g.errorplottooltext, l.errorplottooltext, h.positiveCumulativeErrorTooltipValue)))) &&
                    h.positiveCumulativeErrorTooltipValue && (G = J(p)), (p = r(d(R(N.errorplottooltext, g.errorplottooltext, l.errorplottooltext, h.negativeCumulativeErrorTooltipValue)))) && h.negativeCumulativeErrorTooltipValue && (u = J(p)));
                    p = aa + (null !== h.positiveErrorValue ? h.positiveErrorValue : O);
                    aa -= h.halfErrorBar ? 0 : 0 > h.negativeErrorValue && 0 > aa ? 0 : null != h.negativeErrorValue ? h.negativeErrorValue : O;
                    ma = b(ma, p, aa);
                    La = n(La, p, aa);
                    null == O && (O = void 0);
                    h.errorValueArr = [];
                    null === h.positiveErrorValue && (h.positiveErrorValue = void 0);
                    p = -h.positiveErrorValue;
                    h.errorValueArr.push({errorValue: p, tooltext: ta ? G : T || S, errorEdgeBar: !0});
                    h.errorValueArr.push({errorValue: p, tooltext: T || S});
                    h.notHalfErrorBar && (p = h.negativeErrorValue, h.errorValueArr.push({
                        errorValue: p,
                        tooltext: ta ? u : da || S,
                        errorEdgeBar: !0
                    }), h.errorValueArr.push({errorValue: p, tooltext: da || S}));
                    h.toolText = J(h.setTooltext)
                }
                c.maxValue = ma;
                c.minValue = La
            },
            init: function (a) {
                var b = this.chart, f = b.components, c = b.isDual;
                this.chart = b;
                this.yAxis = c ? f.yAxis[this.yAxis || 0] : f.yAxis[0];
                this.components = {};
                this.graphics =
                    {};
                this.JSONData = a;
                this.visible = 1 === D(this.JSONData.visible, !Number(this.JSONData.initiallyhidden), 1);
                this.configure()
            },
            show: function () {
                var a = this.chart, b = this.yAxis, f = this.graphics && this.graphics.container,
                    c = this.graphics && this.graphics.dataLabelContainer,
                    g = this.graphics && this.graphics.errorGroupContainer,
                    n = this.graphics && this.graphics.errorShadowContainer;
                a._chartAnimation();
                f.lineGroup.show();
                f.anchorGroup.show();
                f.anchorShadowGroup.show();
                f.lineShadowGroup.show();
                c.show();
                this.visible = !0;
                g && g.show();
                n && n.show();
                this._conatinerHidden = !1;
                a._setAxisLimits();
                b.draw();
                a._drawDataset()
            },
            hide: function () {
                var a = this.chart, b = this.yAxis;
                a._chartAnimation();
                this.visible = !1;
                a._setAxisLimits();
                b.draw();
                a._drawDataset()
            },
            drawErrorValue: function () {
                var a = this.config, b = this.chart, c = b.graphics.datasetGroup, n = b.components,
                    g = n.xAxis[0].getCategoryLen(), l, m, r = this.visible, n = n.paper, d = this.yAxis,
                    N = this.components.data, T = b.get(e, ba), h = T.animType, q = T.animObj, k = T.dummyObj,
                    T = T.duration, t = a.errorBarThickness, O = a.errorBarWidth,
                    x = a.errorBarColor, b = b.config.showtooltip, a = a.shadowOpacity,
                    p = this.graphics.container.lineGroup, G = this.graphics.errorGroupContainer,
                    u = this.graphics.errorShadowContainer, da, v, Z, aa, A, H, V, K, C, D, E = 5 < t ? t / 2 : 2.5, B,
                    M;
                G || (G = this.graphics.errorGroupContainer = n.group(W, c).insertAfter(p), r || G.hide());
                u || (u = this.graphics.errorShadowContainer = n.group(S, c).insertBefore(G), r || u.hide());
                for (c = 0; c < g; c++) if (p = N[c], M = p.errorTrackerConfig = {}, M.errorTrackerArr = [], aa = (m = p && p.config) && m.setValue, void 0 === p || void 0 === aa ||
                null === aa) {
                    if (p.graphics.error) for (m = 0; m < p.graphics.error.length; m++) p.graphics.error[m].hide(), p.graphics.errorTracker[m].hide(), p.graphics.error[m].shadow(!1)
                } else if (K = m.errorValueArr, M.errorLen = aa = K.length, !p.graphics.error && (p.graphics.error = []), !p.graphics.errorTracker && (p.graphics.errorTracker = []), m.errorValue === X || void 0 === m.errorValue || null === m.errorValue && null === m.positiveErrorValue && null === m.negativeErrorValue) for (m = 0; m < aa; m++) p.graphics.error && p.graphics.error[m] && (p.graphics.error[m].hide(),
                    p.graphics.error[m].shadow({opacity: 0})); else {
                    da = m.setLink;
                    v = p._xPos;
                    Z = B = p._yPos;
                    p.errorBar && delete p.errorBar;
                    for (p.errorBar = []; aa--;) M.errorTrackerArr[aa] = {}, l = K[aa], M.errorTrackerArr[aa].tooltext = l.tooltext, C = Z, A = l.errorValue, null === A || isNaN(A) ? p.graphics.error && p.graphics.error[aa] && (p.graphics.error[aa].hide(), p.graphics.error[aa].shadow({opacity: 0})) : (D = O / 2, V = r ? 1 : 0, V = B + (d.getAxisPosition(0) - d.getAxisPosition(1)) * A * V, A = Q(V) + t % 2 / 2, H = Q(v) + t % 2 / 2, p.errorBar[aa] || (p.errorBar[aa] = []), l.errorEdgeBar ?
                        (V = ["M", H - D, A, "H", H + D], p.errorBar[aa][1] = {
                            _xPos: H - D - E,
                            _yPos: A - E,
                            _height: 2 * E,
                            _width: 2 * (D + E),
                            _toolText: l.tooltext
                        }) : (V = ["M", H, C, "V", A], p.errorBar[aa][0] = {
                            _xPos: H - E,
                            _yPos: A < C ? A : C,
                            _height: z(C - A),
                            _width: 2 * E,
                            _toolText: l.tooltext
                        }), p.graphics.error[aa] ? (l = {path: V}, C = p.graphics.error[aa], C.animateWith(k, q, l, T, h), C.attr({
                        stroke: x,
                        ishot: !b,
                        "stroke-width": t,
                        cursor: da ? "pointer" : X,
                        "stroke-linecap": I
                    })) : C = p.graphics.error[aa] = n.path(V, G).attr({
                        stroke: x,
                        ishot: !b,
                        "stroke-width": t,
                        cursor: da ? "pointer" : X,
                        "stroke-linecap": I
                    }),
                        C.show(), C.shadow({opacity: a}, u), M.errorTrackerArr[aa].attr = {
                        path: V,
                        stroke: F,
                        "stroke-width": t < f ? f : t,
                        cursor: da ? "pointer" : X,
                        ishot: !!da
                    });
                    if (!m.notHalfErrorBar) for (m = 2; 4 > m; m++) p.graphics.error && p.graphics.error[m] && p.graphics.error[m].hide() && p.graphics.error[m].shadow({opacity: 0})
                }
            },
            _rolloverResponseSetter: J.get("component", ["dataset", "ErrorBar2D"]).prototype._rolloverResponseSetter,
            _rolloutResponseSetter: J.get("component", ["dataset", "ErrorBar2D"]).prototype._rolloutResponseSetter,
            _firePlotEvent: J.get("component",
                ["dataset", "ErrorBar2D"]).prototype._firePlotEvent,
            _checkPointerOverErrorBar: J.get("component", ["dataset", "ErrorBar2D"]).prototype._checkPointerOverErrorBar,
            _checkPointerOverPlot: function (a, b, f) {
                var c = this.components.data[a], g = c && c.config, n;
                if (c) {
                    if (n = this.isWithinShape(c, a, b, f)) c.errorBarHovered = !1, g.finalTooltext = !1 !== g.toolText && g.toolText + g.toolTipValue; else if (n = this._checkPointerOverErrorBar(a, b, f)) c.errorBarHovered = !0, g.finalTooltext = n.toolText;
                    return n
                }
            },
            _getHoveredPlot: J.get("component",
                ["dataset", "ErrorBar2D"]).prototype._getHoveredPlot,
            manageSpace: function () {
                var a = .5 * this.config.errorBarWidth, f = this.chart, c = f.config.dataLabelStyle,
                    n = (this.components || {}).data || [], g = n[0], n = n[n.length - 1], e, z;
                e = {};
                var m, d, l, r = f.linkedItems.smartLabel, h = {paddingLeft: 0, paddingRight: 0};
                g && (g = g.config, l = g.showValue, z = g && g.anchorProps || {}, l && (e = g.displayValue, r.useEllipsesOnOverflow(f.config.useEllipsesWhenOverflow), r.setStyle(c), e = r.getOriSize(e)), g.setValue && (m = b(D(z.radius, 0), a) + D(z.borderThickness,
                    0), d = (e.width || 0) / 2), h.paddingLeft = b(m, d));
                n && (g = n.config, l = g.showValue, z = g && g.anchorProps || {}, l && (e = g.displayValue, r.setStyle(c), e = r.getOriSize(e)), g.setValue && (m = b(D(z.radius, 0), a) + D(z.borderThickness, 0), d = (e.width || 0) / 2), h.paddingRight = b(m, d));
                return h
            },
            _removeDataVisuals: function (a) {
                var b, f;
                if (a) {
                    b = a.graphics;
                    b.element && b.element.hide() && b.element.shadow({opacity: 0});
                    for (f = 0; 4 > f; f++) a.graphics.error && a.graphics.error[f] && a.graphics.error[f].hide() && a.graphics.error[f].shadow({opacity: 0});
                    b.hotElement &&
                    b.hotElement.hide() && b.hotElement.attr({width: 0})
                }
            }
        }, c])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-errorscatter", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.colors.AAAAAA, e = c.configStr, ba = c.animationObjStr,
            W = c.errorBarStr, S = c.errorShadowStr, I = c.ROUND, B = c.PERCENTAGESTRING, X = a.BLANKSTRING,
            M = a.BLANKSTRING, R = a.parseTooltext, r = a.pluck, D = a.getValidValue, v = a.pluckNumber,
            A = a.COMMASPACE, F = "rgba(192,192,192," + (a.isIE ? .002 : 1E-6) + ")", c = a.TOUCH_THRESHOLD_PIXELS,
            l = a.CLICK_THRESHOLD_PIXELS,
            C = Math, H = C.round, Q = C.min, n = C.max, b = C.abs, z = a.hasTouch ? c : l, f = a.getFirstColor,
            K = a.getFirstAlpha, V = a.graphics.convertColor, m = a.HUNDREDSTRING;
        J.register("component", ["dataset", "ErrorScatter", {
            ErrorValueConfigure: function () {
                var b = this.chart, c = b.components, e = this.config, w = this.JSONData, z = b.config.categories,
                    g = b.jsonData.chart, l = w.data, P = c.xAxis[0].getCategoryLen(), P = l && l.length || P,
                    C = a.parseUnsafeString, d, N, T, h = this.components.data, q = c.numberFormatter, k, t, O, x, p, G,
                    u, da, ma, La, aa = r(g.tooltipsepchar, A), F = C(g.yaxisname),
                    M = C(g.xaxisname), ta = e.parentYAxis, I, W, Qa, Ea, S, ba, J, pa, Na, Ra, Va, Da, Ia, va, Fa, wa,
                    oa, qa, la, ia, ea, sa, fa, ha, ca, Aa, ya, Y, ua, xa, za = -Infinity, Ga = Infinity, Ma = Infinity,
                    ra = -Infinity, Ba = function (k, b) {
                        var t;
                        e.showTooltip ? null === W ? t = !1 : void 0 !== k ? (S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 99, 100, 101, 102, 103, 104, 105, 106, 107, 109], ba = {
                            yaxisName: F,
                            xaxisName: M,
                            yDataValue: W,
                            xDataValue: T.label,
                            formattedValue: T.toolTipValue,
                            horizontalErrorValue: ma,
                            horizontalErrorDataValue: void 0,
                            verticalErrorValue: La,
                            verticalErrorDataValue: void 0,
                            horizontalErrorPercent: Qa,
                            verticalErrorPercent: Ea,
                            label: T.label,
                            errorValue: b,
                            errorDataValue: b,
                            errorPercentValue: T.errorPercentValue,
                            errorPercentDataValue: T.errorPercentValue
                        }, t = R(k, S, ba, d, g, w)) : null === W ? t = !1 : (e.seriesNameInTooltip && (J = a.getFirstValue(w && w.seriesname)), t = J ? J + aa : X, t += I.x ? q.xAxis(I.x) + aa : X, t += T.toolTipValue) : t = !1;
                        return t
                    };
                e.errorBarShadow = c = v(g.errorbarshadow, g.showshadow, 0);
                e.ignoreEmptyDatasets = v(w.ignoreemptydatasets, 0);
                e.notHalfErrorBar = !v(g.halferrorbar, 1);
                e.errorBarAlpha = K(r(w.errorbaralpha, g.errorbaralpha));
                e.errorBarWidth = t = v(w.errorbarwidth, g.errorbarwidth, 5);
                e.errorBarColor = O = V(f(r(w.errorbarcolor, g.errorbarcolor, E)), void 0);
                e.errorBarThickness = k = v(w.errorbarthickness, g.errorbarthickness, 1);
                e.shadowOpacity = c ? NaN : 0;
                e.halfHorizontalErrorBar = x = v(g.halfhorizontalerrorbar, 1);
                e.halfVerticalErrorBar = p = v(g.halfverticalerrorbar, 1);
                void 0 === e.initAnimation && (e.initAnimation = b.initAnimation);
                b = r(w.horizontalerrorbaralpha, w.errorbaralpha, g.horizontalerrorbaralpha, void 0);
                G = v(w.verticalerrorbaralpha, w.errorbaralpha,
                    g.verticalerrorbaralpha, void 0);
                u = V(r(w.horizontalerrorbarcolor, w.errorbarcolor, g.horizontalerrorbarcolor, O), b);
                O = V(r(w.verticalerrorbarcolor, w.errorbarcolor, g.verticalerrorbarcolor, O), G);
                da = v(w.horizontalerrorbarthickness, w.errorbarthickness, g.horizontalerrorbarthickness, k);
                k = v(w.verticalerrorbarthickness, w.errorbarthickness, g.verticalerrorbarthickness, k);
                e.horizontalErrorBarWidth = v(w.horizontalerrorbarwidth, g.horizontalerrorbarwidth, t);
                e.verticalErrorBarWidth = v(w.verticalerrorbarwidth, g.verticalerrorbarwidth,
                    t);
                e.cumulativeValueOnErrorBar = v(w.cumulativevalueonerrorbar, g.cumulativevalueonerrorbar, 1);
                for (t = 0; t < P; t++) l && (d = l && l[t], T = (N = h[t]) && N.config, N || (N = h[t] = {graphics: {}}), N.config || (T = h[t].config = {}), N = q.getCleanValue(d.errorvalue), I = T.setValue, T.errorValue = d.errorvalue, T.cumulativeValueOnErrorBar = Y = v(d.cumulativevalueonerrorbar, e.cumulativeValueOnErrorBar, 1), T.hErrorValue = ma = q.getCleanValue(r(d.horizontalerrorvalue, d.errorvalue)), T.vErrorValue = La = q.getCleanValue(r(d.verticalerrorvalue, d.errorvalue)),
                    T.hPositiveErrorValue = Da = q.getCleanValue(r(d.horizontalpositiveerrorvalue, d.positiveerrorvalue, ma)), T.hNegativeErrorValue = Va = q.getCleanValue(r(d.horizontalnegativeerrorvalue, d.negativeerrorvalue, ma)), T.vPositiveErrorValue = Ra = q.getCleanValue(r(d.verticalpositiveerrorvalue, d.positiveerrorvalue, La)), T.vNegativeErrorValue = sa = q.getCleanValue(r(d.verticalnegativeerrorvalue, d.negativeerrorvalue, La)), va = q.dataLabels(Da, ta), Ia = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, va))), oa = q.dataLabels(Va,
                    ta), ia = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, oa))), la = q.dataLabels(Ra, ta), ca = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, la))), xa = q.dataLabels(sa, ta), ua = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, xa))), Fa = Aa = ya = fa = void 0, Y && (wa = q.dataLabels(I.x + Da, ta), Fa = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, wa))), qa = q.dataLabels(I.x - Va, ta), Aa = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, qa))),
                    ea = q.dataLabels(I.y + Ra, ta), ya = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, ea))), ha = q.dataLabels(I.y - sa, ta), fa = D(C(r(d.errorplottooltext, w.errorplottooltext, g.errorplottooltext, ha)))), z && z[t] && (T.label = D(C(r(z[t].tooltext, z[t].label)))), T.halfHorizontalErrorBar = d.horizontalpositiveerrorvalue || d.positiveerrorvalue || d.horizontalnegativeerrorvalue || d.negativeerrorvalue ? x = 0 : x = e.halfHorizontalErrorBar, T.halfVerticalErrorBar = d.verticalpositiveerrorvalue || d.positiveerrorvalue || d.verticalnegativeerrorvalue ||
                d.negativeerrorvalue ? p = 0 : p = e.halfVerticalErrorBar, null !== I.x && (pa = I.x + Number(Da), Na = I.x - (x ? 0 : Number(Va)), ra = n(ra, pa, Na), Ma = Q(Ma, pa, Na)), null !== I.y && (pa = I.y + Number(Ra), Na = I.y - (p ? 0 : Number(sa)), za = n(za, pa, Na), Ga = Q(Ga, pa, Na)), T.useHorizontalErrorBar = v(d.usehorizontalerrorbar, w.usehorizontalerrorbar, g.usehorizontalerrorbar, 0), T.useVerticalErrorBar = v(d.useverticalerrorbar, w.useverticalerrorbar, g.useverticalerrorbar, 1), T.errorValueArr = [], T.errorValueArr.push({
                    errorValue: -(null === Da ? NaN : Da), tooltext: Ba(Ia,
                        va), errorBarColor: u, isHorizontal: 1, errorBarThickness: da, shadowOpacity: c ? b / 250 : 0
                }), T.errorValueArr.push({
                    errorValue: -(null === Da ? NaN : Da),
                    tooltext: Y ? Ba(Fa, wa) : Ba(Ia, va),
                    errorBarColor: u,
                    isHorizontal: 1,
                    errorBarThickness: da,
                    shadowOpacity: c ? b / 250 : 0,
                    errorEdgeBar: !0
                }), T.errorValueArr.push({
                    errorValue: Va,
                    tooltext: Ba(ia, oa),
                    errorBarColor: u,
                    isHorizontal: 1,
                    errorBarThickness: da,
                    shadowOpacity: c ? b / 250 : 0
                }), T.errorValueArr.push({
                    errorValue: Va,
                    tooltext: Y ? Ba(Aa, qa) : Ba(ia, oa),
                    errorBarColor: u,
                    isHorizontal: 1,
                    errorBarThickness: da,
                    shadowOpacity: c ? b / 250 : 0,
                    errorEdgeBar: !0
                }), T.errorValueArr.push({
                    errorValue: -(null === Ra ? NaN : Ra),
                    tooltext: Ba(ca, la),
                    errorBarColor: O,
                    errorBarThickness: k,
                    shadowOpacity: c ? G / 250 : 0
                }), T.errorValueArr.push({
                    errorValue: -(null === Ra ? NaN : Ra),
                    tooltext: Y ? Ba(ya, ea) : Ba(ca, la),
                    errorBarColor: O,
                    errorBarThickness: k,
                    shadowOpacity: c ? G / 250 : 0,
                    errorEdgeBar: !0
                }), T.errorValueArr.push({
                    errorValue: sa,
                    tooltext: Ba(ua, xa),
                    errorBarColor: O,
                    errorBarThickness: k,
                    shadowOpacity: c ? G / 250 : 0
                }), T.errorValueArr.push({
                    errorValue: sa,
                    tooltext: Y ?
                        Ba(fa, ha) : Ba(ua, xa),
                    errorBarColor: O,
                    errorBarThickness: k,
                    shadowOpacity: c ? G / 250 : 0,
                    errorEdgeBar: !0
                }), I = T.setValue, H(N / I * m * m), Qa = H(ma / I * m * m) / m + B, Ea = H(La / I * m * m) / m + B, W = T.formatedVal, e.showTooltip ? void 0 !== T.setTooltext ? (S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 99, 100, 101, 102, 103, 104, 105, 106, 107, 109], ba = {
                    yaxisName: F,
                    xaxisName: M,
                    yDataValue: W,
                    xDataValue: T.label,
                    formattedValue: T.toolTipValue,
                    horizontalErrorValue: ma,
                    horizontalErrorDataValue: void 0,
                    verticalErrorValue: La,
                    verticalErrorDataValue: void 0,
                    horizontalErrorPercent: Qa,
                    verticalErrorPercent: Ea,
                    label: T.label
                }, N = R(T.setTooltext, S, ba, d, g, w)) : null === W ? N = !1 : (e.seriesNameInTooltip && (J = a.getFirstValue(w && w.seriesname)), N = J ? J + aa : X, N += I.x ? q.xAxis(I.x) + aa : X, N += T.toolTipValue) : N = !1, T.toolText = N);
                e.xMax = ra;
                e.xMin = Ma;
                e.yMin = Ga;
                e.yMax = za
            }, drawErrorValue: function () {
                var c = this.chart, f = c.components, n = this.parentContainer, w = this.config, m = this.JSONData.data,
                    m = m && m.length, g, l = this.visible, r = f.paper, f = f.xAxis[0], A = this.yAxis,
                    d = this.components.data, N, T, h, q, k = w.showTooltip, t = w.shadowOpacity,
                    O = c.get(e, ba), c = O.animType, x = O.animObj, p = O.dummyObj, O = O.duration,
                    G = this.graphics.container.lineGroup, u = this.graphics.errorGroupContainer,
                    da = this.graphics.errorShadowContainer, ma, V, aa, K, C, D, E, Q, B, Ea, R, X, J, pa, Na = [], Ra;
                u || (u = this.graphics.errorGroupContainer = r.group(W, n).insertAfter(G), l || u.hide());
                da || (da = this.graphics.errorShadowContainer = r.group(S, n).insertBefore(u), l || da.hide());
                for (n = 0; n < m; n++) if (G = d[n], Ra = G.errorTrackerConfig = {}, Ra.errorTrackerArr = [], K = (C = G && G.config) && C.setValue, Q = C.errorValueArr,
                void 0 !== G && void 0 !== K && null !== K && Q) {
                    Q = C.errorValueArr;
                    Ra.errorLen = K = Q.length;
                    !G.graphics.error && (G.graphics.error = []);
                    !G.graphics.errorTracker && (G.graphics.errorTracker = []);
                    if (null === C.vErrorValue && null === C.vPositiveErrorValue && null === C.vNegativeErrorValue) for (T = 0; 4 > T; T++) G.graphics.error && G.graphics.error[T] && (G.graphics.error[T].hide(), G.graphics.error[T].shadow({opacity: 0}));
                    if (null === C.hErrorValue && null === C.hPositiveErrorValue && null === C.vPositiveErrorValue) for (T = 4; 8 > T; T++) G.graphics.error && G.graphics.error[T] &&
                    (G.graphics.error[T].hide(), G.graphics.error[T].shadow({opacity: 0}));
                    if (!(null === C.hErrorValue && null === C.vErrorValue && C.hPositiveErrorValue && C.hNegativeErrorValue && C.vPositiveErrorValue && C.vNegativeErrorValue)) for (ma = C.setLink, R = G._xPos, aa = X = G._yPos, V = R, pa = 0; pa < K; pa++) if (!C.useHorizontalErrorBar && (0 === pa || 1 === pa || 2 === pa || 3 === pa) || !C.useVerticalErrorBar && (4 === pa || 5 === pa || 6 === pa || 7 === pa) || (2 === pa || 3 === pa) && C.halfHorizontalErrorBar || (6 === pa || 7 === pa) && C.halfVerticalErrorBar) G.graphics.error && G.graphics.error[pa] &&
                    G.graphics.error[pa].hide() && G.graphics.error[pa].shadow({opacity: 0}), G.graphics.errorTracker && G.graphics.errorTracker[pa] && G.graphics.errorTracker[pa].hide() && G.graphics.errorTracker[pa].shadow({opacity: 0}); else if (Ra.errorTrackerArr[pa] = {}, g = Q[pa], Ra.errorTrackerArr[pa].tooltext = g.tooltext, B = aa, D = g.errorValue, null === D || void 0 === D || isNaN(D)) G.graphics.error && G.graphics.error[pa] && (G.graphics.error[pa].hide(), G.graphics.error[pa].shadow({opacity: pa})), G.graphics.errorTracker && G.graphics.errorTracker[pa] &&
                    (G.graphics.errorTracker[pa].hide(), G.graphics.errorTracker[pa].shadow({opacity: 0})); else {
                        q = g.errorBarColor;
                        N = v(g.isHorizontal, 0);
                        T = v(g.errorBarThickness, w.errorBarThickness, 1);
                        h = N ? w.horizontalErrorBarWidth : w.verticalErrorBarWidth;
                        Ea = l ? h / 2 : 0;
                        E = l ? 1 : 0;
                        h = 5 < T ? T / 2 + .5 : 2.75;
                        if (N) if (N = R + (f.getAxisPosition(0) - f.getAxisPosition(1)) * D * E, D = H(B) + T % 2 / 2, E = H(N) + T % 2 / 2, g.errorEdgeBar) for (N = ["M", E, D - Ea, "V", D + Ea], J = 2 * Ea, B = D - Ea, Ea = h; Ea < J; Ea += 2 * h) Na.push({
                            x: E,
                            y: B + Ea,
                            r: h,
                            index: n,
                            data: G,
                            toolText: g.tooltext,
                            barType: "h"
                        });
                        else for (N = ["M", V, D, "H", E], J = b(V - E), B = V > E ? E : V, Ea = h; Ea < J; Ea += 2 * h) Na.push({
                                x: B + Ea,
                                y: D,
                                r: h,
                                index: n,
                                data: G,
                                toolText: g.tooltext,
                                barType: "h"
                            }); else if (N = X + (A.getAxisPosition(0) - A.getAxisPosition(1)) * D * E, D = H(N) + T % 2 / 2, E = H(V) + T % 2 / 2, g.errorEdgeBar) for (N = ["M", E - Ea, D, "H", E + Ea], J = 2 * Ea, B = E - Ea, Ea = h; Ea <= J; Ea += 2 * h) Na.push({
                            x: B + Ea,
                            y: D,
                            r: h,
                            index: n,
                            data: G,
                            toolText: g.tooltext,
                            barType: "v"
                        }); else for (N = ["M", E, B, "V", D], J = b(B - D), B = B > D ? D : B, Ea = h; Ea <= J; Ea += 2 * h) Na.push({
                            x: E,
                            y: B + Ea,
                            r: h,
                            index: n,
                            data: G,
                            toolText: g.tooltext,
                            barType: "v"
                        });
                        G.graphics.error[pa] ? (h = G.graphics.error[pa], g = {
                            path: N,
                            "stroke-width": l ? T : 0
                        }, h.animateWith(p, x, g, O, c), h.attr({
                            stroke: q,
                            ishot: !k,
                            cursor: ma ? "pointer" : M,
                            "stroke-linecap": I
                        })) : (h = G.graphics.error[pa] = r.path(N, u).attr({
                            stroke: q,
                            ishot: !k,
                            "stroke-width": T,
                            cursor: ma ? "pointer" : M,
                            "stroke-linecap": I
                        }), w.initAnimation && h.attr({opacity: 0}).animateWith(p, x, {opacity: 1}, O, c));
                        h.show();
                        h.shadow({opacity: t}, da);
                        Ra.errorTrackerArr[pa].attr = {
                            path: N,
                            stroke: F,
                            "stroke-width": l ? T < z ? z : T : 0,
                            cursor: ma ? "pointer" : M,
                            ishot: !!ma
                        }
                    }
                }
                Na.length &&
                (this.dataTreeB = (new a.KdTree).buildKdTree(Na));
                w.initAnimation = !1
            }, _getHoveredPlot: function (a, b) {
                var c, f, n;
                if (c = this.dataTree.getNeighbour({
                    x: a,
                    y: b
                }, !0)) return f = c.data.config.toolText, c.data.config.finalTooltext = f, n = c.data.config.hoverEffects, f = c.data.graphics.element, f.data("hoverEnabled", n.enabled), n.enabled && f.attr(f.getData().setRolloverAttr), {
                    pointIndex: c.index,
                    hovered: !0,
                    pointObj: c.data
                };
                if (c = this.dataTreeB && this.dataTreeB.getNeighbour({
                    x: a,
                    y: b
                }, !0)) return "h" === c.barType ? f = c.toolText : "v" ===
                    c.barType && (f = c.toolText), c.data.config.finalTooltext = f, f = c.data.graphics.element, f.data("hoverEnabled", !1), f.attr(f.getData().setRolloutAttr), {
                    pointIndex: c.index,
                    hovered: !0,
                    pointObj: c.data
                }
            }, show: function () {
                var a = this.chart, b = this.yAxis, c = this.graphics && this.graphics.errorGroupContainer,
                    f = this.graphics && this.graphics.errorShadowContainer;
                a._chartAnimation();
                this.visible = !0;
                this._conatinerHidden = !1;
                c && c.show();
                f && f.show();
                a._setAxisLimits();
                b.draw();
                this.draw()
            }, remove: function () {
                var a = this.components,
                    b = a.removeDataArr, c = a.pool || (a.pool = {element: [], hotElement: [], label: []}),
                    f = b.length, n, g = this.maxminFlag, e, z, m;
                for (z = 0; z < f; z++) if (n = b[0], b.splice(0, 1), n && n.graphics) {
                    e = n.graphics;
                    e.element && e.element.hide() && e.element.shadow({opacity: 0});
                    for (m = 0; 8 > m; m++) e.error && e.error[m] && e.error[m].hide() && e.error[m].shadow({opacity: 0});
                    n.graphics.element && (c.element = c.element.concat(n.graphics.element));
                    n.graphics.label && (c.label = c.label.concat(n.graphics.label))
                }
                a.pool = c;
                g && this.setMaxMin()
            }
        }, "Scatter"])
    }]);
    J.register("module",
        ["private", "modules.renderer.js-dataset-multiaxisline", function () {
            var a = this.hcLib, c = a.pluckNumber, E = a.preDefStr.line, e = a.pluck, ba = a.HUNDREDSTRING;
            J.register("component", ["dataset", "multiaxisline", {
                type: "multiaxisline", pIndex: 2, customConfigFn: "_createDatasets", configure: function () {
                    var W = this.chart, S = this.JSONData, I = this.config, B = W.config, X = W.components,
                        M = W.jsonData, R = M.chart, r = M.axis[this.axisIndex], D = W.singleseries,
                        M = J.get("component", ["dataset", E]).prototype;
                    M.configure.call(this);
                    this.yAxis = X.yAxis[this.axisIndex];
                    B.axesPadding = 5;
                    B.allowAxisShift = c(R.allowaxisshift, 1);
                    B.allowSelection = c(R.allowselection, 1);
                    B.checkBoxColor = e(R.checkboxcolor, "#2196f3");
                    B.axisConfigured = !0;
                    I.linethickness = c(S.linethickness, r.linethickness, R.linethickness, D ? 4 : 2);
                    I.lineDashLen = c(S.linedashlen, r.linedashlen, R.linedashlen, 5);
                    I.lineDashGap = c(S.linedashgap, r.linedashgap, R.linedashgap, 4);
                    I.alpha = c(S.alpha, r.linealpha, R.linealpha, ba);
                    I.linecolor = e(S.color, r.linecolor, r.color, R.linecolor, I.plotColor);
                    I.legendSymbolColor = this.type === E ?
                        I.lineColor : I.plotFillColor;
                    X = c(S.dashed, r.linedashed, R.linedashed);
                    B = a.getDashStyle(I.lineDashLen, I.lineDashGap, I.linethickness);
                    I.anchorBorderColor = e(S.anchorbordercolor, R.anchorbordercolor, I.lineColor, I.plotColor);
                    I.lineDashStyle = X ? B : "none";
                    M._setConfigure.call(this);
                    !1 !== W.hasLegend && this._addLegend()
                }, init: function (a) {
                    this.chart = this.chart;
                    this.components = {};
                    this.conf = {};
                    this.graphics = {};
                    this.JSONData = a;
                    this.visible = 1 === c(this.JSONData.visible, !Number(this.JSONData.initiallyhidden), 1);
                    this.configure()
                },
                legendInteractivity: function (a, c) {
                    var e = a.chart, E = e.components.dataset, X = this.config, M = a.visible, R = c.config,
                        r = c.graphics, D = X.itemHiddenStyle.color, X = X.itemStyle.color, v = R.fillColor,
                        R = R.strokeColor, A = a.axisIndex, F = !0, l, e = e.config.axesArr.checkBox;
                    M ? a.hide() : a.show();
                    if (M) {
                        for (l in E) E.hasOwnProperty(l) && E[l].visible && E[l].axisIndex === A && (F = !1);
                        F && e[A] && e[A].checkbox.uncheck()
                    } else e[A] && e[A].checkbox.check();
                    M ? (r.legendItemSymbol && r.legendItemSymbol.attr({
                        fill: D,
                        stroke: D
                    }), r.legendItemText && r.legendItemText.attr({fill: D}),
                    r.legendIconLine && r.legendIconLine.attr({stroke: D})) : (r.legendItemSymbol && r.legendItemSymbol.attr({
                        fill: v,
                        stroke: R
                    }), r.legendItemText && r.legendItemText.attr({fill: X}), r.legendIconLine && r.legendIconLine.attr({stroke: v}))
                }
            }, E])
        }]);
    J.register("module", ["private", "modules.renderer.js-dataset-multilevelpie", function () {
        var a = this.hcLib, c = a.graphics.convertColor, E = a.plotEventHandler, e = a.preDefStr, ba = e.colors,
            W = ba.FFFFFF, S = ba.c000000, I = e.configStr, B = e.animationObjStr, X = a.ZEROSTRING, M = a.BLANKSTRING,
            R = a.BLANKSTRING,
            r = a.parseTooltext, D = a.pluck, v = a.getValidValue, A = a.pluckNumber, F = a.getFirstValue,
            l = a.parseUnsafeString, C = a.getDashStyle, H = a.toRaphaelColor, Q = a.COMMASPACE, n = a.schedular,
            e = Math, b = e.sin, z = e.cos, f = e.PI, K = e.round, V = e.min, m = e.max;
        J.register("component", ["dataset", "multiLevelPie", {
            init: function (a) {
                !this.components && (this.components = {data: []});
                this.conf = {};
                this.graphics = {};
                this.JSONData = a;
                this.configure()
            }, configure: function () {
                var a, b, n = this, e = n.chart, z = e.config, g = n.conf || (n.conf = {}), m = g.dataLabelOptions ||
                    (g.dataLabelOptions = {}), l = g.piePlotOptions, r = e.config.style, d = n.JSONData,
                    e = e.jsonData.chart;
                a = g.enableAnimation = A(e.animation, e.defaultanimation, 1);
                var N = A(-e.centerangle, 180), T = A(e.totalangle, 360);
                g.animation = a ? {duration: 1E3 * A(e.animationduration, e.moveduration, 1)} : !1;
                g.showShadow = A(e.showshadow, 0);
                a = g.useHoverColor = !!A(e.usehovercolor, 1);
                g.hoverFillColor = c(D(e.hoverfillcolor, "FF5904"), A(e.hoverfillalpha, 100));
                g.pierad = parseInt(e.pieradius, 10);
                b = (b = F(e.valuebordercolor, M)) ? c(b, A(e.valueborderalpha,
                    e.valuebgalpha, e.valuealpha, 100)) : M;
                !m.style && (m.style = {
                    fontFamily: D(e.valuefont, r.fontFamily),
                    fontSize: A(e.valuefontsize, parseInt(r.fontSize, 10)) + "px",
                    color: c(D(e.valuefontcolor, r.color), A(e.valuefontalpha, e.valuealpha, 100)),
                    fontWeight: A(e.valuefontbold) ? "bold" : "normal",
                    fontStyle: A(e.valuefontitalic) ? "italic" : "normal",
                    backgroundColor: e.valuebgcolor ? c(e.valuebgcolor, A(e.valuebgalpha, e.valuealpha, 100)) : M,
                    border: b || e.valuebgcolor ? A(e.valueborderthickness, 1) + "px solid" : M,
                    borderPadding: A(e.valueborderpadding,
                        2),
                    borderThickness: A(e.valueborderthickness, r.borderThickness, 1),
                    borderRadius: A(e.valueborderradius, r.borderRadius, 0),
                    borderColor: b,
                    borderDash: A(e.valueborderdashed, 0) ? C(A(e.valueborderdashlen, 4), A(e.valueborderdashgap, 2), A(e.valueborderthickness, 1)) : "none"
                });
                !l && (l = g.piePlotOptions = {});
                l.allowPointSelect = !1;
                g.borderColor = c(D(e.plotbordercolor, e.piebordercolor, W), e.showplotborder != X ? D(e.plotborderalpha, e.pieborderalpha, 100) : 0);
                g.showTooltip = A(e.showtooltip, 1);
                g.borderWidth = A(e.pieborderthickness,
                    e.plotborderthickness, 1);
                l.startingAngle = 0;
                l.size = "100%";
                g.showLabels = A(e.showlabels, 1);
                g.showValues = A(e.showvalues, 0);
                g.showValuesInTooltip = A(e.showvaluesintooltip, e.showvalues, 0);
                g.showPercentValues = A(e.showpercentvalues, e.showpercentagevalues, 0);
                g.showPercentInTooltip = A(e.showpercentintooltip, 0);
                g.toolTipSepChar = D(e.tooltipsepchar, e.hovercapsepchar, Q);
                g.labelSepChar = D(e.labelsepchar, g.toolTipSepChar);
                g.tooltext = e.plottooltext;
                g.alpha = D(e.plotfillalpha, e.piefillalpha, 100);
                g.startAngle = f / 180 * (N -
                    T / 2);
                g.endtAngle = f / 180 * (N + T / 2);
                g.initialAngle = g.endtAngle;
                g.originX = A(e.originx);
                g.originY = A(e.originy);
                a && (g.events = {
                    mouseOver: function () {
                        for (var d = this.data("plotItem").selfRef, a = n.conf; d.graphics.element;) d.graphics.element.attr({fill: a.hoverFillColor}), d = d.linkedItems.parent
                    }, mouseOut: function () {
                        for (var d = this.data("plotItem"), a = d.selfRef; a.graphics.element;) a.graphics.element.attr({fill: (a.config || d).color}), a = a.linkedItems.parent
                    }
                });
                z.plotBorderWidth = 0;
                z.plotBorderWidth = 0;
                g.maxLevel = n.addMSPieCat(d,
                    1, n, g.startAngle, g.endtAngle);
                g.pieRadius = parseInt(e.pieradius, 10);
                m.distance = 0;
                m.placeLabelsInside = !0
            }, removalFn: function (a, b, c) {
                var f, n, g = this.pool || (this.pool = {});
                f = this.chart.get(I, B);
                var e = f.duration, z = f.dummyObj, m = f.animObj, d = f.animType, l = function (d) {
                    (d || this).hide()
                };
                !g[c] && (g[c] = []);
                "element" === c ? (n = a.attr("ringpath"), f = (n[4] + n[5]) / 2, b ? a.animateWith(z, m, {ringpath: [n[0], n[1], n[2], n[3], f, f]}, e, d, l) : g[c].push(a)) : b ? l(a) : g[c].push(a)
            }, removeGraphics: function (a, b) {
                var c, f, n = a.components && a.components.data,
                    g, e = a.graphics;
                if (n) for (g = n.length, c = 0; c < g; c += 1) this.removeGraphics(n[c]);
                if (a.graphics) for (f in e) e.hasOwnProperty(f) && this.removalFn(a.graphics[f], b, f)
            }, removeChild: function (a, b, c) {
                var f, n;
                if (a.length) for (f = 0; f < a.length; f += 1) n = a[f], c ? this.removalFn(n, b, c) : this.removeGraphics(n, b); else for (f in a) this.removeChild(a[f], b, f)
            }, addMSPieCat: function (a, b, f, n, e) {
                var g, z, V, H = a.length, d = this, N = f.components.data, T = d.chart.components, h = d.conf,
                    q = h.borderWidth, k = h.borderColor, t = T.numberFormatter, T = T.colorManager,
                    O, x = 0, p, G, u = h.labelSepChar, da, ma, La, aa, E, Q = b, B = N.length, F = function () {
                        d.removeChild.apply(d, arguments)
                    }, I = a.length;
                O = e - n;
                var W = 0, R;
                for (G = 0; G < H; G += 1) e = a[G], e._userValue = t.getCleanValue(e.value, !0), e._value = A(e._userValue, 1), x += e._value;
                x = x || 1;
                O /= x;
                for (G = H - 1; 0 <= G; --G) e = a[G], p = O * e._value, g = l(D(e.label, e.name)), ma = null !== e._userValue ? t.dataLabels(e._userValue) : M, La = t.percentValue(e._value / x * 100), da = A(e.alpha, h.alpha), E = h.showLabels ? g : M, h.showValues && (h.showPercentValues ? E += E !== M ? u + La : La : void 0 !== ma && ma !==
                    M && (E += E !== M ? u + ma : ma)), aa = h.showTooltip ? l(D(e.tooltext, e.hovertext, h.tooltext)) : void 0, aa === M ? (aa = g, h.showValuesInTooltip && (h.showPercentInTooltip ? aa += aa !== M ? u + La : La : void 0 !== ma && ma !== M && (aa += aa !== M ? u + ma : ma))) : aa = r(aa, [1, 2, 3, 14], {
                    percentValue: La,
                    label: g,
                    formattedValue: ma
                }, e), g = N[G], ma = n + W, W += p, g || (g = N[G] = {
                    components: {data: []},
                    linkedItems: {},
                    config: {},
                    graphics: {}
                }), g.graphics.element && (R = g.config.startAngle + g.config.angleStrech), g.config = {
                    initialAngle: R || (f.conf || f.config).initialAngle,
                    startAngle: ma,
                    angleStrech: p,
                    level: b,
                    displayValue: E,
                    toolText: aa,
                    link: v(e.link),
                    doNotSlice: !0,
                    color: c(e.color || T.getPlotColor(), da),
                    borderWidth: A(e.borderwidth, q),
                    borderColor: D(e.bordercolor, k),
                    dashStyle: A(e.valueborderdashed, 0) ? C(A(e.borderdashlen, 4), A(e.borderdashgap, 2), A(e.borderthickness, 1)) : "none",
                    shadow: {opacity: .01 * K(50 < da ? da * da * da * 1E-4 : da * da * .01)},
                    isSingleTon: 1 < H ? !1 : !0
                }, g.linkedItems.parent = f, e.category ? (Q = m(Q, d.addMSPieCat(e.category, b + 1, g, ma, p + ma)), (z = g.components.data.length) > (V = e.category.length) && F(g.components.data.splice(z -
                    1, V))) : (z = g.components.data.length) && F(g.components.data.splice(0, z));
                B > I && F(N.splice(I, B - 1));
                return Q
            }, draw: function (c) {
                var f, e, m, l = this, g = l.conf || {}, r = l.chart, v = r.getJobList(), C = r.config, d = r.graphics,
                    N = l.components, T = N.data.length, h = C.dataLabelStyle;
                f = g.showShadow;
                var q = r.components.paper, k = C.textDirection, t = C.tooltip || {};
                e = t && !1 !== t.enabled;
                var T = C.canvasWidth, O = C.canvasHeight, t = A(g.originX, C.canvasLeft + .5 * T),
                    C = A(g.originY, C.canvasTop + .5 * O), x, p, G, u, da, ma, K = d.datasetGroup.trackTooltip(!0),
                    aa = r.get(I,
                        B), D = aa.duration || 0, Q = aa.dummyObj, F = aa.animObj, aa = aa.animType, M, W, Qa,
                    Ea = d.datalabels || (d.datalabels = q.group("datalabels").insertAfter(K)), X = g.events || {},
                    J = function (d) {
                        var k = X.mouseOver;
                        E.call(this, r, d, "DataPlotRollOver");
                        k && k.call(this)
                    }, ba = function (d) {
                        var k = X.mouseOut;
                        E.call(this, r, d, "DataPlotRollOut");
                        k && k.call(this)
                    }, pa = function (d) {
                        E.call(this, r, d)
                    }, d = function () {
                        g._drawn || (g._drawn = !0, Ea.show(), v.labelDrawID.push(n.addJob(function () {
                            l.drawLabel()
                        }, a.priorityList.label)), r._animCallBack())
                    }, Na =
                    l.pool || (l.pool = {}), N = (N = N.removeDataArr) && N.length;
                x = A(2 * g.pieRadius, V(T, O)) / (2 * g.maxLevel);
                N && l.remove();
                D && Ea.hide();
                c || (c = l, Ea.css(h));
                T = c.components.data.length;
                for (N = 0; N < T; N += 1) l.draw(c.components.data[N]);
                O = c.config;
                (m = O.level) ? (T = m * x, x *= m - 1, M = c.graphics, G = O.angleStrech, m = O.displayValue, u = !!O.link, p = O.color, da = O.startAngle, ma = da + O.angleStrech, Qa = O.initialAngle, W = M.element, W || (Na.element && Na.element.length ? (W = M.element = Na.element.shift(), W.show()) : W = M.element = q.ringpath(K).mouseover(J).mouseout(ba).mouseup(pa),
                    W.attr({ringpath: [t, C, T, x, Qa, Qa]})), O.plotItem = c = {
                    chart: r,
                    link: O.link,
                    value: G,
                    color: p,
                    labelText: m,
                    graphics: {element: W},
                    selfRef: c
                }, O.eventArgs = q = {
                    link: O.link,
                    label: O.displayValue,
                    toolText: O.toolText
                }, W.attr({
                    "stroke-width": O.borderWidth,
                    stroke: O.borderColor,
                    fill: H(O.color),
                    "stroke-dasharray": O.dashStyle,
                    ishot: !e,
                    cursor: u ? "pointer" : R
                }).tooltip(O.toolText).shadow(f && !!O.shadow).data("plotItem", c).data("eventArgs", q), void 0 !== m && m !== R && (f = (da + ma) / 2, O._textAttr || (O._textAttr = {}), c = 0 === x && O.isSingleTon ?
                    0 : x + (T - x) / 2, (e = O._textAttrs) || (e = O._textAttrs = {}), e.text = m, e.fill = h.color || S, e.direction = k, e.ishot = u, e.cursor = u ? "pointer" : R, e.x = t + c * z(f), e.y = C + c * b(f), e["text-bound"] = [h.backgroundColor, h.borderColor, h.borderThickness, h.borderPadding, h.borderRadius, h.borderDash]), W.animateWith(Q, F, {ringpath: [t, C, T, x, da, ma]}, D, aa, !N && d)) : (g._drawn && l.drawLabel(), l.removeChild(l.pool, !0))
            }, drawLabel: function (a) {
                var b, c = this.chart, f = c.config, e = c.graphics;
                b = this.components.data.length;
                var g = f.dataLabelStyle, n = c.components.paper,
                    f = (f = f.tooltip || {}, !1 !== f.enabled), m, z, d, l, r = (this.conf || {}).events || {},
                    h = function (d) {
                        var k = r.mouseOver;
                        E.call(this, c, d, "DataPlotRollOver");
                        k && k.call(this)
                    }, q = function (d) {
                        var k = r.mouseOut;
                        E.call(this, c, d, "DataPlotRollOut");
                        k && k.call(this)
                    }, k = function (d) {
                        E.call(this, c, d)
                    }, t = this.pool || (this.pool = {}), e = e.datalabels;
                !a && (a = this);
                b = a.components.data.length;
                for (m = 0; m < b; m += 1) this.drawLabel(a.components.data[m]);
                d = a.config;
                m = d.plotItem;
                z = d.displayValue;
                b = d._textAttrs;
                d.level ? (a = a.graphics, l = a.label, void 0 !==
                z && z !== R ? ((l = a.label) ? l.attr(b).css(g) : t.label && t.label.length ? (l = a.label = t.label.shift(), l.attr(b).css(g)) : l = a.label = n.text(b, g, e).mouseover(h).mouseout(q).mouseup(k), m.label = l.show().data("plotItem", m).data("eventArgs", d.eventArgs), f && l.tooltip(void 0)) : l && l.hide()) : this.removeChild(this.pool, !0)
            }
        }, "Pie2D"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-dragnode", function () {
        var a = this.hcLib, c = "VML" === a.Raphael.type, E = a.preDefStr, e = E.configStr, ba = E.animationObjStr,
            W = a.ZEROSTRING,
            S = E.POSITION_TOP, I = E.POSITION_BOTTOM, B = E.UNDERSCORE, X = a.BLANKSTRING, M = a.BLANKSTRING,
            R = a.parseTooltext, r = a.pluck, D = a.getValidValue, v = a.pluckNumber, A = a.getFirstValue,
            F = a.parseUnsafeString, l = a.extend2, C = a.toRaphaelColor, H = a.schedular, Q = a.getTouchEvent,
            n = a.BGRATIOSTRING, E = Math, b = E.min, z = E.max, f = a.hasTouch, K = a.getFirstColor,
            V = a.getFirstAlpha, m = a.graphics.getDarkColor, Z = a.graphics.getLightColor,
            ga = a.graphics.convertColor, L = a.graphics.mapSymbolName, w = a.COMMASTRING, U = a.HUNDREDSTRING,
            g = a.getMouseCoordinate,
            y = a.plotEventHandler, P = a.SHAPE_RECT, ka = function () {
                this.data("move", !1);
                clearTimeout(this._longpressactive);
                delete this._longpressactive
            };
        J.register("component", ["dataset", "Dragnode", {
            type: "dragnode", configure: function () {
                var d = this.index, a = this.chart, b = this.JSONData, h = a.jsonData.chart, q = (b.data || []).length,
                    k = this.config, a = a.components.colorManager, t, c, f, p, g, u;
                k.showValues = v(b.showvalues, h.showvalues, 1);
                u = k.useRoundEdges = v(h.useroundedges);
                k.zIndex = 1;
                k.name = D(b.seriesname);
                k.viewMode = v(h.viewmode, 0);
                k.id = r(b.id, this.index);
                if (0 === v(b.includeinlegend) || void 0 === k.name) k.showInLegend = !1;
                k.includeInLegend = v(b.includeinlegend, 1);
                k.showTooltip = v(h.showtooltip, 1);
                k.seriesNameInTooltip = v(h.seriesnameintooltip, 1);
                k.tooltipSepChar = r(h.tooltipsepchar, " - ");
                t = k.plotFillAlpha = r(h.plotfillalpha, U);
                c = k.showPlotBorder = v(h.showplotborder, 1);
                f = k.plotBorderColor = K(r(h.plotbordercolor, "666666"));
                p = k.plotBorderThickness = v(h.plotborderthickness, u ? 2 : 1);
                g = k.plotBorderAlpha = r(h.plotborderalpha, h.plotfillalpha, u ? "35" :
                    "95");
                k.use3DLighting = !!v(h.use3dlighting, h.is3d, u ? 1 : 0);
                k.color = K(r(b.color, a.getPlotColor(d)));
                k.alpha = r(b.plotfillalpha, b.nodeFillAlpha, b.alpha, t);
                k.datasetShowPlotBorder = !!v(b.showplotborder, c);
                k.datasetPlotBorderColor = K(r(b.plotbordercolor, b.nodebordercolor, f));
                k.datasetPlotBorderThickness = v(b.plotborderthickness, b.nodeborderthickness, p);
                k.datasetPlotBorderAlpha = k.datasetShowPlotBorder ? r(b.plotborderalpha, b.nodeborderalpha, b.alpha, g) : W;
                k.seriesname = F(b.seriesname);
                k.datasetAllowDrag = !!v(b.allowdrag,
                    1);
                k.colorObj = {
                    fillColor: ga(k.color, k.alpha),
                    lineColor: {FCcolor: {color: k.datasetPlotBorderColor, alpha: k.datasetPlotBorderAlpha}}
                };
                k.lineWidth = void 0;
                k.symbol = "poly_4";
                d = this.components.data = this.components.data || (this.components.data = []);
                h = d.length;
                h > q && d.splice(q, h - q);
                this.visible = 1 === v(b.visible, !Number(b.initiallyhidden), 1);
                k.yMin = k.yMax = k.xMax = k.xMin = 0;
                this._refreshData = !0;
                for (b = 0; b < q; b += 1) this._setConfigure(b);
                this._refreshData = !1;
                this._addLegend()
            }, _setConfigure: function (d, a) {
                var c = this.JSONData,
                    h = c.data, q = a ? a : h[d], k = this.components.data, h = this.config,
                    k = k[d] = k[d] || (k[d] = {}), t = k.config = k.config || (k.config = {}), f = h.id,
                    x = h.yMin || Infinity, p = h.yMax || -Infinity, g = h.xMax || -Infinity, u = h.xMin || Infinity, e,
                    n, m = h.use3DLighting, w = h.datasetPlotBorderThickness, y = h.datasetPlotBorderColor,
                    A = h.datasetPlotBorderAlpha, C = this.chart.jsonData.chart, V = h.color, H = h.alpha,
                    E = h.datasetAllowDrag, U = this.chart.components.numberFormatter;
                !k.graphics && (k.graphics = {});
                t._options = l({}, q);
                if (q || a) {
                    e = t.y = U.getCleanValue(r(q.y));
                    n = t.x = U.getCleanValue(r(q.x));
                    t.index = d;
                    t.dragStart || (t.dragStart = {});
                    p = z(p, t.y);
                    x = b(x, t.y);
                    g = z(g, t.x);
                    u = b(u, t.x);
                    if (null === e) t.value = null; else {
                        n = U.xAxis(n);
                        t.formatedVal = null === e ? e : U.dataLabels(e);
                        t.setTooltext = D(F(r(q.tooltext, c.plottooltext, C.plottooltext)));
                        t.pointLabel = r(q.label, q.name);
                        c = F(t.pointLabel);
                        t.label = c;
                        t.name = c;
                        t.displayValue = c;
                        t.xValue = n;
                        t.startConnectors = {};
                        t.endConnectors = {};
                        t.toolText = h.showTooltip ? this._configureTooltext(t, h, C) : !1;
                        t.link = q.link;
                        t.id = r(q.id, f + B + d);
                        t.allowDrag =
                            !!v(q.allowdrag, E);
                        c = t.shape = D(r(q.shape), "rectangle").toLowerCase();
                        t.height = D(r(q.height), 10);
                        t.width = D(r(q.width), 10);
                        t.radius = D(r(q.radius), 10);
                        t.numSides = D(r(q.numsides), 4);
                        t.color = K(r(q.color, V));
                        t.borderColor = K(r(q.bordercolor, y));
                        t.alpha = r(q.alpha, H);
                        t.imageURL = D(q.imageurl);
                        t.imageNode = !!v(q.imagenode);
                        t.imageWidth = q.imagewidth;
                        t.imageHeight = q.imageheight;
                        t.imageAlign = D(q.imagealign, X).toLowerCase();
                        q = q.labelalign;
                        if (y = t.imageNode) y = t.imageURL, y = void 0 !== y && null !== y;
                        t.labelAlign = r(q, y ? S :
                            "middle");
                        switch (t.shape) {
                            case "circle":
                                q = 0;
                                break;
                            case "polygon":
                                q = 2;
                                c = L(t.numSides);
                                break;
                            default:
                                q = 1
                        }
                        t.symbol = c;
                        m ? (t.fillColor = this.getPointColor(t.color, t.alpha, q), t.cloneFillColor = this.getPointColor(t.color, 50, q)) : (t.fillColor = {
                            color: t.color,
                            alpha: t.alpha
                        }, t.cloneFillColor = ga(t.color, 50));
                        t.rollOverProperties = this.pointHoverOptions(k, C, {
                            shapeType: q,
                            use3D: m,
                            height: t.height,
                            width: t.width,
                            radius: t.radius,
                            color: t.color,
                            alpha: t.alpha,
                            borderColor: t.borderColor,
                            borderAlpha: A,
                            borderThickness: w
                        })
                    }
                    !t.update &&
                    a && (t.update = a.update);
                    !t.add && a && (t.add = a.add);
                    !0 === this._refreshData && delete k.removed
                }
                k.dataset = this;
                h.xMax = g;
                h.xMin = u;
                h.yMin = x;
                h.yMax = p
            }, _configureTooltext: function (d, a, b) {
                var c = d.setTooltext, q = d.formatedVal, k = a.seriesname, t = d.label, f = d.xValue, x = d.pointLabel,
                    p = a.tooltipSepChar;
                void 0 !== c ? d = R(c, [3, 4, 5, 6, 8, 9, 10, 11], {
                    yaxisName: F(b.yaxisname),
                    xaxisName: F(b.xaxisname),
                    yDataValue: q,
                    xDataValue: f,
                    label: t
                }, d, b, a) : void 0 !== x ? d = t : null === q ? d = !1 : (a.seriesNameInToolTip && (k = A(a.seriesname)), d = k ? k + p : X, d += f ? f +
                    p : X, d += q);
                return d
            }, updatePointConfig: function (d, a) {
                var c = this.chart, h = this.config, q = (this.components.data[a] || {}).config,
                    k = c.components.numberFormatter, c = c.jsonData.chart, t = h.yMin || Infinity,
                    f = h.yMax || -Infinity, x = h.xMax || -Infinity, p = h.xMin || Infinity;
                void 0 !== q && (q.y = k.getCleanValue(r(d.y)), q.x = k.getCleanValue(r(d.x)), q._options.x = q.x, q._options.y = q.y, z(f, q.y), b(t, q.y), z(x, q.x), b(p, q.x), t = k.xAxis(q.x), q.formatedVal = null === q.y ? q.y : k.dataLabels(q.y), q.xValue = t, q.toolText = h.showTooltip ? this._configureTooltext(q,
                    h, c) : !1, q.update = d.update)
            }, pointHoverOptions: function (d, a, b) {
                var c = v(d.showhovereffect, this.showhovereffect, a.plothovereffect, a.showhovereffect), q = {},
                    k = !!r(d.hovercolor, this.hovercolor, a.plotfillhovercolor, d.hoveralpha, this.hoveralpha, a.plotfillhoveralpha, d.borderhovercolor, this.borderhovercolor, a.plotborderhovercolor, d.borderhoveralpha, this.borderhoveralpha, a.plotborderhoveralpha, d.borderhoverthickness, this.borderhoverthickness, a.plotborderhoverthickness, d.hoverheight, this.hoverheight, a.plothoverheight,
                        d.hoverwidth, this.hoverwidth, a.plothoverwidth, d.hoverradius, this.hoverradius, a.plothoverradius, c),
                    t = !1;
                if (void 0 === c && k || c) t = !0, c = r(d.hovercolor, this.hovercolor, a.plotfillhovercolor, Z(b.color, 70)), k = r(d.hoveralpha, this.hoveralpha, a.plotfillhoveralpha, b.alpha), q = {
                    stroke: ga(r(d.borderhovercolor, this.borderhovercolor, a.plotborderhovercolor, b.borderColor), v(d.borderhoveralpha, this.borderhoveralpha, a.plotborderhoveralpha, k, b.borderAlpha)),
                    "stroke-width": v(d.borderhoverthickness, this.borderhoverthickness,
                        a.plotborderhoverthickness, b.borderThickness),
                    height: v(d.hoverheight, this.hoverheight, a.plothoverheight, b.height),
                    width: v(d.hoverwidth, this.hoverwidth, a.plothoverwidth, b.width),
                    r: v(d.hoverradius, this.hoverradius, a.plothoverradius, b.radius)
                }, d = b.use3D ? this.getPointColor(K(r(d.hovercolor, this.hovercolor, a.plotfillhovercolor, Z(b.color, 70))), r(d.hoveralpha, this.hoveralpha, a.plotfillhoveralpha, b.alpha), b.shapeType) : ga(c, k), q.fill = C(d);
                return {enabled: t, rollOverAttrs: q}
            }, getJSONData: function () {
                var d = this.components.data,
                    a = d.length, b = [], c, q;
                for (q = 0; q < a; q++) c = d[q], !c.removed && c.config._options && (delete c.config._options.update, delete c.config._options.add, b.push(c.config._options));
                return b
            }, getPointColor: function (d, a, b) {
                var c;
                d = K(d);
                a = V(a);
                c = Z(d, 80);
                d = m(d, 65);
                a = {FCcolor: {gradientUnits: "objectBoundingBox", color: c + "," + d, alpha: a + "," + a, ratio: n}};
                b ? a.FCcolor.angle = 1 === b ? 0 : 180 : (a.FCcolor.cx = .4, a.FCcolor.cy = .4, a.FCcolor.r = "50%", a.FCcolor.radialGradient = !0);
                return a
            }, init: function (a) {
                this.yAxis = this.chart.components.yAxis[0];
                this.components = {};
                this.graphics = {};
                this.JSONData = a;
                this.plotType = "dragnode";
                this.configure()
            }, _addLegend: function () {
                var a = this.config, b = this.chart.components.legend, a = {
                    enabled: a.includeInLegend,
                    type: this.type,
                    fillColor: C({color: a.color, alpha: a.alpha}),
                    strokeColor: C({color: a.plotBorderColor, alpha: U}),
                    anchorSide: 4,
                    strokeWidth: a.anchorBorderThickness,
                    label: A(this.JSONData.seriesname)
                };
                this.legendItemId = b.addItems(this, this.legendInteractivity, a)
            }, draw: function () {
                var d = this, b = d.components, c = d.graphics,
                    f = d.chart, q = f.getJobList(), k = f.linkedItems.smartLabel, b = b.data,
                    t = d.components.removeDataArr || [], g = t.length, x = f.components.paper, p,
                    e = f.config.dataLabelStyle, u = {
                        fontFamily: e.fontFamily,
                        fontSize: e.fontSize,
                        lineHeight: e.lineHeight,
                        fontWeight: e.fontWeight,
                        fontStyle: e.fontStyle
                    }, n = f.graphics.datasetGroup;
                p = c.group = c.group || x.group(n);
                c = c.dragLabelGroup = c.dragLabelGroup || x.group("dragLabelGroup", n);
                p.trackTooltip(!0);
                k.useEllipsesOnOverflow(f.config.useEllipsesWhenOverflow);
                k.setStyle(e);
                p.css(u);
                f = 0;
                for (k =
                         b.length; f < k; f += 1) e = b[f].removed, !e && this._drawNode(f);
                !d.drawn && q.labelDrawID.push(H.addJob(function () {
                    d.drawLabel()
                }, a.priorityList.label));
                d.drawn = !0;
                d.visible && (p.show(), c.show());
                for (f = 0; f < g; f++) d._removeDataVisuals(t.shift())
            }, rolloverResponseSetter: function (a, b) {
                return function (c) {
                    var f = this.data("drag-options"), q = f.chart,
                        f = (f = f.dataObj.config.dragStart) && Object.keys(f).length, k = this.data("hoverAttr");
                    f || (b && a.graphics.element.attr(k), y.call(this, q, c, "DataPlotRollOver"))
                }
            }, rolloutResponseSetter: function (a,
                                                b) {
                return function (c) {
                    var f = this.data("drag-options"), q = f.chart,
                        f = (f = f.dataObj.config.dragStart) && Object.keys(f).length, k = this.data("unHoverAttr");
                    f || (b && a.graphics.element.attr(k), y.call(this, q, c, "DataPlotRollOut"))
                }
            }, dragUp: function (a) {
                this.data("drag-options").dataset._dragUp.call(this, a)
            }, dragMove: function (a, b) {
                var c = this.data("drag-options");
                c.dataset._dragMove.call(this, b[0], b[1], b[2], b[3], c.chart)
            }, dragStart: function (a) {
                var b = this.data("drag-options");
                b.dataset._dragStart.call(this, a, b.chart)
            },
            _drawNode: function (a) {
                var b = this.chart, c = this.index, f = b.components, q = this.groupManager, k = q.nodes, t = f.paper,
                    g = this.xAxis = f.xAxis[0], x = this.yAxis = f.yAxis[0], f = this.components.data[a], p = f.config,
                    G = this.config, u = b.get(e, ba) || {}, n = u.duration, m = u.dummyObj, l = u.animObj,
                    u = f.graphics || (f.graphics = {}), z = p.symbol, w, y, A, V, H, K, E, D, U = G.colorObj.lineColor,
                    L = G.datasetPlotBorderThickness, Q, Z, F;
                V = this.graphics;
                E = b.graphics.datasetGroup;
                var W = V.group, R = f.config.rollOverProperties, ka, S, ga = this.rolloverResponseSetter,
                    J = this.rolloutResponseSetter, oa = this.dragUp, qa = this.dragMove, la = this.dragStart, ia,
                    ea = p.shapeType, sa = p.link ? "pointer" : p.allowDrag ? "move" : M,
                    fa = this.components.pool || {}, ha;
                K = u.graphic;
                var ca = u.cloneText, Aa = u.cloneGraphic, ya = u.cloneImage, Y = u.image, ua, xa = u.label;
                V.cloneGraphicGroup = V.cloneGraphicGroup || t.group("clone", E);
                V.cloneGraphicGroup.attr({opacity: .3});
                p._yPos = x = x.getAxisPosition(p.y);
                p._xPos = g = g.getAxisPosition(p.x);
                if (void 0 !== x && !isNaN(x)) {
                    p.shapeArg = {};
                    K = p.shapeArg;
                    y = v(p.height);
                    w = v(p.width);
                    A = v(p.radius);
                    F = "rectangle" === z;
                    V = p.id;
                    H = p.imageNode;
                    E = p.imageURL;
                    D = p.imageAlign;
                    Q = F ? w : 1.4 * A;
                    ka = v(p.imageWidth, Q);
                    Z = F ? y : 1.4 * A;
                    F = v(p.imageHeight, Z);
                    ia = C(p.fillColor);
                    p._plotWidth = Q;
                    p._plotHeight = Z;
                    S = {fill: ia, "stroke-width": L, stroke: C(U)};
                    z = K.symbol = r(p.symbol, G.symbol, X);
                    z = z.split(B);
                    ha = [z[1], g, x, p.radius, p.startAngle, 0];
                    "poly" === z[0] || "circle" === z[0] ? (p.shapeType = z[0], ua = "polypath", G = "path", ha = {polypath: ha}, K.x = g, K.y = x, K.radius = p.radius, K.sides = z[1]) : (p.shapeType = P, G = ua = "rect", K.x = g - w / 2, K.y = x - y / 2,
                        K.r = 0, K.width = w, K.height = y, ha = {
                        x: K.x,
                        y: K.y,
                        width: w,
                        height: y,
                        r: 0
                    }, S.width = w, S.height = y, S.x = g - w / 2, S.y = x - y / 2, R && R.enabled && (K = R.rollOverAttrs, K.x = g - K.width / 2, K.y = x - K.height / 2, delete K.r));
                    z = (K = u.element) && K.type;
                    -1 === ua.indexOf(z) && K && (K.remove(), K = u.element = null, xa && xa.remove(), Y && Y.remove(), delete u.label, delete u.image, Y = null);
                    K || (fa.element && fa.element[G] && fa.element[G].length ? (K = u.element = fa.element[G].shift(), K.toFront()) : (K = u.element = t[ua](W), K.attr(ha)), K.hover(ga(f, R && R.enabled), J(f, R && R.enabled)),
                        K.drag(qa, la, oa));
                    K.show().animateWith(m, l, ha, n);
                    K.attr({fill: ia, "stroke-width": L, stroke: C(U)});
                    q.animationDone = !0;
                    q = {
                        index: a,
                        link: p.link,
                        y: p.y,
                        x: p.x,
                        shape: r(ea, "rect"),
                        width: w,
                        height: y,
                        radius: A,
                        sides: p.numSides,
                        label: p.displayValue,
                        toolText: p.toolText,
                        id: p.id,
                        datasetIndex: this.index,
                        datasetName: this.JSONData.seriesname,
                        sourceType: "dataplot"
                    };
                    c = c + "_" + a;
                    Aa && (Aa.type === K.type ? (ha.fill = ia, ha["stroke-width"] = L, ha.stroke = C(U), Aa.transform(M), Aa.attr(ha)) : (Aa.remove(), delete f.graphics.cloneGraphic, ca &&
                    (ca.remove(), delete f.graphics.cloneText)));
                    if (H && E) {
                        F > Z && (F = Z);
                        ka > Q && (ka = Q);
                        switch (D) {
                            case "middle":
                                U = x - F / 2;
                                break;
                            case I:
                                U = Z > F ? x + Z / 2 - F : x - F / 2;
                                break;
                            default:
                                U = Z > F ? x - .5 * Z : x - F / 2
                        }
                        p.imageX = g - ka / 2;
                        p.imageY = U;
                        p.imageWidth = ka;
                        p.imageHeight = F;
                        G = "image";
                        Y || (fa.image && fa.image[G] && fa.image[G].length ? (Y = u.image = fa.image[G].shift(), Y.toFront()) : (Y = u.image = t.image(W), Y.tooltip(p.toolText), Y.hover(ga(f, R && R.enabled), J(f, R && R.enabled)), Y.drag(qa, la, oa)));
                        Y.show().attr({src: E, x: p.imageX, y: U, width: ka, height: F});
                        Y.attr({cursor: sa});
                        Y.tooltip(p.toolText);
                        Y.data("drag-options", {
                            dataObj: f,
                            dataset: this,
                            datasetIndex: this.index,
                            pointIndex: f.config.index,
                            cursor: sa,
                            chart: b,
                            link: f.link
                        });
                        Y.data("groupId", c);
                        Y.data("eventArgs", q);
                        Y.data("hoverAttr", R && R.rollOverAttrs);
                        Y.data("unHoverAttr", S);
                        ya && (ya.transform(M), ya.attr({src: E, x: p.imageX, y: U, width: ka, height: F}))
                    }
                    p.pointAttr = S;
                    this.drawn && this.drawLabel(a);
                    k[V] = f;
                    K.attr({cursor: sa});
                    K.tooltip(p.toolText);
                    K.data("drag-options", {
                        dataObj: f, dataset: this, datasetIndex: this.index, pointIndex: f.config.index,
                        cursor: sa, chart: b, link: f.link
                    });
                    K.data("groupId", c);
                    K.data("eventArgs", q);
                    K.data("hoverAttr", R && R.rollOverAttrs);
                    K.data("unHoverAttr", S)
                }
            }, drawLabel: function (a) {
                var b = this.chart, c = this.index, f = b.components.paper, q = this.components.data, k = q.length, t,
                    g, x = this.graphics.group, p = b.config.dataLabelStyle, e = b.get("config", "animationObj"),
                    u = e.dummyObj, n = e.animObj, z = e.duration, m = this.components.pool || {}, l, w, y = b.config,
                    v, K, A, e = e.animType, C, V, H = this.rolloverResponseSetter, E = this.rolloutResponseSetter,
                    U = this.dragUp,
                    D = this.dragMove, L = this.dragStart, F, Q, Z = b.linkedItems.smartLabel;
                for (void 0 !== a ? k = a + 1 : a = 0; a < k; a++) if (A = q[a], l = A.config, K = l._plotWidth, C = l._plotHeight, w = l.displayValue, g = l.labelAlign, V = A.graphics, v = V.cloneText, F = A.config.rollOverProperties, Q = l.shapeType, void 0 !== w && null !== w || w !== X) {
                    Z.useEllipsesOnOverflow(y.useEllipsesWhenOverflow);
                    w = Z.getSmartText(w, K, C);
                    K = .5 * C - .5 * w.height;
                    switch (g) {
                        case S:
                            K = -K;
                            break;
                        case I:
                            break;
                        default:
                            K = 0
                    }
                    C = l._xPos;
                    g = l._yPos;
                    A._yAdjustment = K;
                    K = g + K;
                    t = {
                        text: w.text,
                        title: w.tooltext ||
                            M,
                        fill: p.color,
                        "text-bound": [p.backgroundColor, p.borderColor, p.borderThickness, p.borderPadding, p.borderRadius, p.borderDash]
                    };
                    (g = V.label = V.label || m.label && m.label.text && m.label.text.shift()) ? (g.attr(t), g.show().animateWith(u, n, {
                        x: C,
                        y: K
                    }, z, e)) : (t.x = C, t.y = K, g = V.label = f.text(t, x), g.hover(H(A, F && F.enabled), E(A, F && F.enabled)), g.drag(D, L, U));
                    (V = V && (V.image || V.element)) && g.insertAfter(V);
                    v && (v.transform(M), v.attr({
                        x: C,
                        y: K,
                        text: w.text,
                        title: w.tooltext || M,
                        fill: p.color,
                        "text-bound": [p.backgroundColor, p.borderColor,
                            p.borderThickness, p.borderPadding, p.borderRadius, p.borderDash]
                    }));
                    v = l.link ? "pointer" : l.allowDrag ? "move" : M;
                    g.attr({cursor: v});
                    g.tooltip(l.toolText);
                    g.data("drag-options", {
                        dataObj: A,
                        dataset: this,
                        datasetIndex: this.index,
                        pointIndex: A.config.index,
                        cursor: v,
                        chart: b,
                        link: A.link
                    });
                    l = {
                        index: a,
                        link: l.link,
                        y: l.y,
                        x: l.x,
                        shape: r(Q, "rect"),
                        width: l.width,
                        height: l.height,
                        radius: l.radius,
                        sides: l.numSides,
                        label: l.displayValue,
                        toolText: l.toolText,
                        id: l.id,
                        datasetIndex: this.index,
                        datasetName: this.JSONData.seriesname,
                        sourceType: "dataplot"
                    };
                    A = c + "_" + a;
                    g.data("groupId", A);
                    g.data("eventArgs", l);
                    g.data("hoverAttr", F && F.rollOverAttrs);
                    g.data("unHoverAttr", V.data("unHoverAttr"))
                } else V.label && V.label.hide()
            }, _removeDataVisuals: function (a) {
                var b = this.components.pool || (this.components.pool = {}), c, f, q, k;
                if (a) for (f in a = a.graphics, a) c = b[f] || (b[f] = {}), q = (k = a[f]) && k.type, c = c[q] || (c[q] = []), k.hide && "function" === typeof k.hide && (k.attr({"text-bound": []}), k.hide(), k.transform && k.transform(M)), c.push(a[f])
            }, show: function () {
                var a = this.graphics, b = a.dragLabelGroup;
                a.group.show();
                b.show();
                this.visible = !0
            }, hide: function () {
                var a = this.graphics, b = a.dragLabelGroup;
                a.group.hide();
                b.hide();
                this.visible = !1
            }, _dragStart: function (a, b) {
                var g = this.data("drag-options"), h = g.dataObj, q = h.graphics.element, k = q.getBBox(), t = h.config,
                    e = g.dataset, x = e.groupManager, p = x.graphics, n = p.waitElement, u = g.dataset.config,
                    g = u.viewMode;
                f && Q(a);
                var l = b.components.paper, m = e.graphics.group, z = t.dragStart || (t.dragStart = {}),
                    r = h.graphics.cloneGraphic, y = e.graphics.cloneGraphicGroup, v = h.graphics.cloneText,
                    K = h.graphics.image, V = h.graphics.cloneImage, H = h.graphics.label,
                    E = {circle: "circ", rectangle: "rect", polygon: "poly"};
                c && (q._.dirty = 1);
                t.symbol.split(B);
                t.allowDrag && (!r && h.graphics.element && (r = h.graphics.cloneGraphic = h.graphics.element.clone(), y.appendChild(r)), H && !v && (v = h.graphics.cloneText = h.graphics.label.clone(), v.followers[0] && v.followers[0].el && y.appendChild(v.followers[0].el), y.appendChild(v)), K && !V && (V = h.graphics.cloneImage = h.graphics.image.clone(), y.appendChild(V)), v && v.show(), V && V.show(), r &&
                r.show());
                z.xPos = t._xPos;
                z.yPos = t._yPos;
                z.x = t.x;
                z.y = t.y;
                z.bBox = k;
                z.origX = z.lastDx || (z.lastDx = 0);
                z.origY = z.lastDy || (z.lastDy = 0);
                q.data("fire_click_event", 1);
                q.data("mousedown", 1);
                clearTimeout(q._longpressactive);
                q.data("move", !0);
                g || (n || (n = p.waitElement = l.ringpath(t._xPos, t._yPos, 8, 11, 0, 0, m).attr({
                    fill: C({
                        alpha: "100,100",
                        angle: 120,
                        color: "CCCCCC,FFFFFF",
                        ratio: "30,50"
                    }), "stroke-width": 0
                })), n.attr({ringpath: [t._xPos, t._yPos, 8, 11, 0, 0]}).show().animate({ringpath: [t._xPos, t._yPos, 8, 11, 0, 6.28]}, 1E3), q._longpressactive =
                    setTimeout(function () {
                        var a = u.name !== X && void 0 !== u.name ? u.name + w + " " : X, k = u.id;
                        p.waitElement && p.waitElement.hide();
                        q.data("fire_click_event", 0);
                        x.showNodeUpdateUI(b, {
                            x: {value: t.x},
                            y: {value: t.y},
                            draggable: {value: A(t.allowdrag, 1)},
                            color: {value: t.color},
                            alpha: {value: t.alpha},
                            label: {value: A(t.label, t.name)},
                            tooltip: {value: t.toolText},
                            shape: {value: E[t.shape]},
                            rectWidth: {value: t.width},
                            rectHeight: {value: t.height},
                            circPolyRadius: {value: t.radius},
                            polySides: {value: t.numsides},
                            image: {value: t.imageNode},
                            imgWidth: {value: t.imageWidth},
                            imgHeight: {value: t.imageHeight},
                            imgAlign: {value: t.imageAlign},
                            imgUrl: {value: t.imageURL},
                            id: {value: t.id, disabled: !0},
                            link: {value: t.link},
                            dataset: {innerHTML: '<option value="' + k + '">' + a + k + "</option>", disabled: !0},
                            datasetIndex: e.index
                        }, !0)
                    }, 1E3));
                r && r.show();
                v && v.show();
                V && V.show()
            }, _dragMove: function (a, b, c, f, q) {
                var k = this.data("drag-options"), t = k.dataObj, g = t.graphics.element;
                c = t.graphics.cloneGraphic;
                f = t.graphics.cloneImage;
                var x = t.graphics.cloneText, t = t.config, p = t.dragStart, e = p.bBox.x + a, u = p.bBox.x2 +
                    a, n = p.bBox.y + b, l = p.bBox.y2 + b, z = k.dataset.groupManager.graphics,
                    m = q.config.canvasLeft, r = q.config.canvasRight, w = q.config.canvasTop;
                q = q.config.canvasBottom;
                e < m && (a += m - e);
                u > r && (a -= u - r);
                n < w && (b += w - n);
                l > q && (b -= l - q);
                if (a || b) z.waitElement && z.waitElement.hide(), g.data("fire_click_event", 0), ka.call(g);
                t.allowDrag && (p.draged = !0, p.lastDx = a, p.lastDy = b, q = k._transformObj = {transform: "t" + (p.origX + a) + "," + (p.origY + b)}, c && c.attr(q), f && f.attr(q), x && x.attr({
                    x: t._xPos + a,
                    y: t._yPos + b
                }))
            }, removeData: function (a, b) {
                var c = this.components,
                    f = this.groupManager, q = c.data, k = c.removeDataArr || (c.removeDataArr = []);
                a = a || 0;
                0 > a && (a = 0);
                c.removeDataArr = k.concat(q.splice(a, b || 1));
                f._clearConnectors()
            }, _dragUp: function (b) {
                var c = this.data("drag-options"), f = c.dataset, h = f.chart, q = f.components.data, k = c.dataObj,
                    t = k.graphics.element, e = c.dataset.groupManager, x = t.data("fire_click_event"), c = k.config,
                    p = h.config.canvasTop, n = h.config.canvasLeft, u = k.config.dragStart || {}, z = f.yAxis,
                    m = k.graphics.cloneText, r = f.groupManager.graphics, w = h.components.xAxis[0], v = {}, K,
                    A, V, C, H, E = k.graphics.cloneGraphic, U = k.graphics.cloneImage, D = function (a) {
                        var b;
                        if (a) for (b in a) if (H = a[b]) V = H.config.datasetIndex, K = H.config.fromPointObj, A = H.config.toPointObj, (C = e.connectorSet[V]) && C && C.connectors.drawConnector(H, K, A)
                    };
                r.waitElement && r.waitElement.hide();
                ka.call(this);
                t.data("mousedown", 0);
                x && y.call(t, h, b);
                if (u.draged) {
                    u.origX += u.lastDx;
                    u.origY += u.lastDy;
                    k.config._xPos = u.xPos + u.lastDx;
                    k.config._yPos = u.yPos + u.lastDy;
                    v.x = w.getValue(k.config._xPos - n);
                    v.y = z.getValue(k.config._yPos - p);
                    v.update = !0;
                    x = 0;
                    for (n = q.length; x < n && (p = q[x], k.config.id !== p.config.id); x++) ;
                    f.updatePointConfig(v, x);
                    q = t.data("eventArgs");
                    q.x = v.x;
                    q.y = v.y;
                    f._drawNode(x);
                    f = k.config.startConnectors;
                    k = k.config.endConnectors;
                    D(f);
                    D(k);
                    b = g(h.linkedItems.container, b);
                    b.sourceEvent = "dataplotdragend";
                    a.raiseEvent("chartupdated", l(b, q), h.chartInstance);
                    u.draged = !1
                }
                m && m.hide();
                E && E.hide();
                U && U.hide();
                delete c.dragStart
            }, getDataLimits: function () {
                var a = this.config;
                return {max: a.yMax, min: a.yMin, xMax: a.xMax, xMin: a.xMin}
            }
        }, "Area"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-connector", function () {
        var a = this.hcLib, c = a.preDefStr.configStr, E = a.BLANKSTRING, e = a.BLANKSTRING, ba = a.parseTooltext,
            W = a.pluck, S = a.getValidValue, I = a.pluckNumber, B = a.parseUnsafeString, X = a.getDashStyle,
            M = a.toRaphaelColor, R = a.schedular, r = Math, D = r.sin, v = r.cos, A = r.abs, F = a.getFirstColor,
            l = a.HUNDREDSTRING, C = a.plotEventHandler, H = a.SHAPE_RECT, Q = function () {
                this.data("move", !1);
                clearTimeout(this._longpressactive);
                delete this._longpressactive
            };
        J.register("component",
            ["dataset", "Connector", {
                type: "connector", configure: function () {
                    var c = this.chart.jsonData.chart, b = this.config,
                        e = this.components.data || (this.components.data = []), f = this.JSONData, r = f.connector,
                        v = r && r.length, m = a.parseUnsafeString;
                    b.connectorsTooltext = S(m(W(f.connectortooltext, c.connectortooltext)));
                    b.stdThickness = I(f.stdthickness, 1);
                    b.conColor = F(W(f.color, "FF5904"));
                    b.conAlpha = W(f.alpha, l);
                    b.conDashGap = I(f.dashgap, 5);
                    b.conDashLen = I(f.dashlen, 5);
                    b.conDashed = !!I(f.dashed, 0);
                    b.arrowAtStart = !!I(f.arrowatstart,
                        1);
                    b.arrowAtEnd = !!I(f.arrowatend, 1);
                    b.conStrength = I(f.strength, 1);
                    b.toolTipSepChar = W(c.tooltipsepchar, " - ");
                    b.showTooltip = I(c.showtooltip, 1);
                    b.viewMode = I(c.viewmode, 1);
                    c = e.length;
                    c > v && e.splice(v, c - v);
                    b._refreshData = !0;
                    for (e = 0; e < v; e += 1) this._setConfigure(e, r[e]);
                    b._refreshData = !0
                }, _setConfigure: function (a, b) {
                    var c = this.components.data, c = c[a] || (c[a] = c[a] = {}), f = this.config, e = this.chart,
                        l = B(W(b.label, b.name)), m = W(b.alpha, f.conAlpha), r = e.linkedItems.smartLabel,
                        v = "$fromLabel" + f.toolTipSepChar + "$toLabel",
                        m = {FCcolor: {color: F(W(b.color, f.conColor)), alpha: m}},
                        A = S(B(W(b.tooltext, f.connectorsTooltext)));
                    r.useEllipsesOnOverflow(e.config.useEllipsesWhenOverflow);
                    e = r.getOriSize(l);
                    c.config = c.config || (c.config = {});
                    !c.graphics && (c.graphics = {});
                    v = f.showTooltip ? W(A, l ? "$label" : v) : !1;
                    l = c.config = {
                        _options: b,
                        id: W(b.id, a).toString(),
                        from: W(b.from, E),
                        to: W(b.to, E),
                        label: l,
                        toolText: v,
                        customToolText: A,
                        color: m,
                        index: a,
                        dashStyle: I(b.dashed, f.conDashed) ? X(I(b.dashlen, f.conDashLen), I(b.dashgap, f.conDashGap), f.stdThickness) :
                            "none",
                        dashed: b.dashed,
                        dashlen: b.dashlen,
                        dashgap: b.dashgap,
                        arrowAtStart: !!I(b.arrowatstart, f.arrowAtStart),
                        arrowAtEnd: !!I(b.arrowatend, f.arrowAtEnd),
                        conStrength: I(b.strength, f.conStrength),
                        link: b.link,
                        stdThickness: f.stdThickness,
                        labelWidth: e.widht,
                        labelHeight: e.height
                    };
                    l.datasetIndex = this.index;
                    l.add = b.add;
                    l.update = b.update;
                    f._refreshData && delete c.removed
                }, init: function (a) {
                    this.yAxis = this.chart.components.yAxis[0];
                    this.components = {};
                    this.graphics = {};
                    this.JSONData = a;
                    this.configure()
                }, draw: function () {
                    var c =
                            this, b = c.chart, e = c.config, f = b.graphics, l = c.groupManager.nodes,
                        r = c.components.data, m, v, A = c.chart.components.paper, C = b.getJobList();
                    v = f.datasetGroup;
                    m = b.config.dataLabelStyle;
                    var b = r.length, f = c.components.removeDataArr || [], w = f.length, H;
                    H || (H = c.graphics.connectorGroup = c.graphics.connectorGroup || A.group("connectorGroup").insertBefore(v));
                    e.showTooltip && H.trackTooltip(!0);
                    e.cleared = !1;
                    H.css(m);
                    for (A = 0; A < b; A++) e = r[A], H = e.config, e.graphics || (e.graphics = {}), m = H.from, v = H.to, m = l[m], v = l[v], m && v && !0 !== H.deleted &&
                    c.drawConnector(e, m, v, A);
                    !0 !== c.drawn && C.labelDrawID.push(R.addJob(function () {
                        c.drawLabel()
                    }, a.priorityList.label));
                    c.drawn = !0;
                    for (A = 0; A < w; A++) c._removeDataVisuals(f.shift())
                }, mouseDown: function () {
                    var a = this, b = a.data(c), e = a.data("dataset"), f = e.groupManager, l = e.chart, r = e.config,
                        m = b || {};
                    a._longpressactive = clearTimeout(a._longpressactive);
                    a.data("fire_click_event", 1);
                    a._longpressactive = setTimeout(function () {
                        a.data("fire_click_event", 0);
                        a.data("viewMode") || f.showConnectorUpdateUI(l, {
                            fromid: {
                                val: m.from,
                                innerHTML: "<option>" + m.from + "</option>", disabled: !0
                            },
                            toid: {val: m.to, innerHTML: "<option>" + m.to + "</option>", disabled: !0},
                            datasetIndex: e.index,
                            index: b.index,
                            arratstart: {val: !!I(m.arrowatstart, 1)},
                            arratend: {val: !!I(m.arrowatend, 1)},
                            dashed: {val: I(m.dashed)},
                            dashgap: {val: m.dashgap},
                            dashlen: {val: m.dashlen},
                            label: {val: m.label},
                            tooltext: {val: m.tooltext},
                            id: {val: r.id, disabled: !0},
                            strength: {val: m.conStrength},
                            alpha: {val: m.alpha},
                            color: {val: m.color.FCcolor.color}
                        }, !0)
                    }, 1E3)
                }, mousemove: function () {
                    this.data("fire_click_event",
                        0);
                    Q.call(this)
                }, mouseup: function (a) {
                    var b = this.data("dataset").chart;
                    Q.call(this);
                    C.call(this, b, a, "ConnectorClick")
                }, hoverIn: function (a) {
                    var b = this.data("dataset").chart;
                    C.call(this, b, a, "ConnectorRollover")
                }, hoverOut: function (a) {
                    var b = this.data("dataset").chart;
                    C.call(this, b, a, "ConnectorRollout")
                }, drawConnector: function (a, b, l) {
                    if (!a.removed) {
                        var f = this.chart, r, v, m, A, C = f.components.paper, H = f.components.numberFormatter,
                            w = a.graphics, E = f.get("config", "animationObj"), f = this.graphics.connectorGroup, g =
                                E.animObj, y = E.dummyObj, D = E.animType, E = E.duration, F = a.config;
                        v = F.toolText;
                        var d, Q, B = F.eventArgs || (F.eventArgs = {}), h = this.config,
                            q = this.components.pool || {};
                        F.fromPointObj = b;
                        F.toPointObj = l;
                        d = b.config;
                        Q = l.config;
                        F.fromX = r = d._xPos;
                        F.fromY = m = d._yPos;
                        F.toX = v = Q._xPos;
                        F.toY = A = Q._yPos;
                        F._labelX = (r + v) / 2;
                        F._labelY = (m + A) / 2;
                        F.strokeWidth = r = F.conStrength * F.stdThickness;
                        m = F.color;
                        F.textBgColor = m && m.FCcolor && m.FCcolor.color;
                        B.label = F.label;
                        B.arrowAtStart = F.arrowAtStart;
                        B.arrowAtEnd = F.arrowAtEnd;
                        B.link = F.link;
                        B.id =
                            F.id;
                        B.fromNodeId = d.id;
                        B.toNodeId = Q.id;
                        v = F.toolText = ba(F.toolText, [3, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92], {
                            label: F.label,
                            fromXValue: H.dataLabels(b.config.x),
                            fromYValue: H.dataLabels(b.config.y),
                            fromXDataValue: b.config.x,
                            fromYDataValue: b.config.y,
                            fromLabel: W(b.config.displayValue, b.config.id),
                            toXValue: H.dataLabels(l.config.x),
                            toYValue: H.dataLabels(l.config.y),
                            toXDataValue: l.config.x,
                            toYDataValue: l.config.y,
                            toLabel: W(l.config.displayValue, l.config.id)
                        });
                        d = b.config;
                        Q = l.config;
                        b = d.startConnectors;
                        l = Q.endConnectors;
                        H = a.config.id + "-" + d.id + "-" + Q.id;
                        b[H] = a;
                        l[H] = a;
                        b = this._getlinePath(a);
                        l = w.graphic;
                        w.graphic || (q.graphic && q.graphic.path && q.graphic.path.length ? l = w.graphic = q.graphic.path.shift() : (l = w.graphic = C.path(f).mousedown(this.mouseDown).mousemove(this.mousemove).mouseup(this.mouseup).hover(this.hoverIn, this.hoverOut), l.attr({path: b})));
                        l.show().animateWith(y, g, {path: b}, E, D);
                        l.attr({
                            "stroke-width": r,
                            ishot: !0,
                            "stroke-dasharray": F.dashStyle,
                            cursor: F.link ? "pointer" : e,
                            stroke: M(m)
                        }).data("eventArgs", B).data("viewMode",
                            h.viewMode).data(c, F).data("dataset", this).tooltip(v);
                        this.drawn && this.drawLabel(a)
                    }
                }, drawLabel: function (a) {
                    var b = this, l = b.config, f = b.chart, r = f.components.paper,
                        v = f.get("config", "animationObj"), m = b.graphics.connectorGroup, A = v.animObj,
                        C = v.dummyObj, H = v.animType, w = v.duration, E, g, y, F, D = f.config.dataLabelStyle, d, Q,
                        B, h, q, k, f = b.components.data, t = b.components.pool || {}, v = f.length, O = function (a) {
                            E = a.config;
                            y = E.toolText;
                            Q = a.graphics;
                            g = E.label;
                            h = E._labelX;
                            q = E._labelY;
                            k = E.textBgColor;
                            g ? (d = Q.text = Q.text || t.element &&
                                t.element.text && t.element.text.shift(), F = {
                                text: g,
                                fill: D.color,
                                ishot: !0,
                                direction: e,
                                cursor: E.link ? "pointer" : e,
                                "text-bound": [W(D.backgroundColor, k), W(D.borderColor, k), 1, "2"]
                            }, Q.text ? (d.show().animateWith(C, A, {
                                x: h,
                                y: q
                            }, w, H), d.attr(F)) : (F.x = h, F.y = q, Q.text = d = r.text(F, m).mousedown(b.mouseDown).mousemove(b.mousemove).mouseup(b.mouseup).hover(b.hoverIn, b.hoverOut)), d.data("eventArgs", E.eventArgs).data("viewMode", l.viewMode).data(c, E).data("dataset", b).tooltip(y)) : Q.text && Q.text.hide()
                        };
                    if (a) O(a); else for (B =
                                               0; B < v; B++) a = f[B], O(a)
                }, getJSONData: function () {
                    var a = this.components.data, b = a.length, c = [], f, e;
                    for (e = 0; e < b; e++) f = a[e], f.removed || (f.config._options && (delete f.config._options.update, delete f.config._options.add), c.push(f.config._options));
                    return c
                }, _updateFromPos: function (a, b) {
                    this.fromX = a;
                    this.fromY = b;
                    this.graphic && this.graphic.animate({path: this.getlinePath()});
                    this.text && this.text.animate({x: (this.fromX + this.toX) / 2, y: (this.fromY + this.toY) / 2})
                }, _updateToPos: function (a, b) {
                    this.toX = a;
                    this.toY = b;
                    this.graphic &&
                    this.graphic.animate({path: this.getlinePath()});
                    this.text && this.text.animate({x: (this.fromX + this.toX) / 2, y: (this.fromY + this.toY) / 2})
                }, _getlinePath: function (a) {
                    a = a.config;
                    var b = a.fromPointObj, c = a.toPointObj, f = a.fromX, e = a.fromY, l = a.toX, m = a.toY,
                        r = ["M", f, e];
                    a.arrowAtStart && (b = b.config, r = b.shapeType === H ? r.concat(this._drawArrow(f, e, l, m, b.shapeArg.width, b.shapeArg.height)) : r.concat(this._drawArrow(f, e, l, m, b.shapeArg.radius)));
                    a.arrowAtEnd && (b = c.config, r = b.shapeType === H ? r.concat(this._drawArrow(l, m, f, e, b.shapeArg.width,
                        b.shapeArg.height)) : r.concat(this._drawArrow(l, m, f, e, b.shapeArg.radius)));
                    r.push("L", l, m);
                    return r
                }, _drawArrow: function (a, b, c, f, e, l) {
                    var m = r.atan((b - f) / (a - c)), C = [];
                    0 > m && (m = 2 * r.PI + m);
                    if (f > b) {
                        if (c >= a && m > r.PI || c < a && m > r.PI) m -= r.PI
                    } else if (c >= a && m < r.PI && 0 !== m || c < a && m < r.PI) m += r.PI;
                    "undefined" == typeof l ? (c = a + e * v(m), e = b + e * D(m)) : (e = A(e) / 2, l = A(l) / 2, c = a + (e = a < c ? e : -e), e = b + e * r.tan(m), A(b - e) > A(l) && (e = b + (l = b < f ? l : -l), c = a + l / r.tan(m)));
                    C.push("L", c, e, c + 10 * v(m + .79), e + 10 * D(m + .79), "M", c + 10 * v(m - .79), e + 10 * D(m - .79), "L", c,
                        e);
                    return C
                }, removeData: function (a, b) {
                    var c = this.components, f = c.data;
                    0 > a && (a = 0);
                    c.removeDataArr = f.splice(a, b)
                }
            }, "Dragnode"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-dragablelabels", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.configStr, e = c.animationObjStr, ba = c.visibleStr,
            W = a.BLANKSTRING, S = a.pluck, I = a.pluckNumber, B = a.parseUnsafeString, X = a.extend2,
            M = a.getDashStyle, R = a.regex.dropHash, r = a.HASHSTRING, D = a.hashify, v = a.schedular,
            A = "rgba(192,192,192," + (a.isIE ? .002 : 1E-6) + ")", F = a.setLineHeight,
            l = a.getMouseCoordinate, C = a.plotEventHandler;
        J.register("component", ["dataset", "DragableLabels", {
            configure: function () {
                var a = (this.JSONData || []).length, c, e = this.components.data;
                this.config.viewMode = I(this.chart.jsonData.chart.viewmode, 0);
                e || (e = this.components.data = []);
                c = e.length;
                c > a && e.splice(a, c - a);
                for (c = 0; c < a; c++) this._setConfigure(c)
            }, _setConfigure: function (a, c) {
                var e = this.JSONData, e = c ? c : e[a], b = this.components.data, l,
                    f = this.chart.config.style.inCanvasStyle, v = f.fontSize;
                l = b[a];
                !l && (l = b[a] = {});
                !l.graphics &&
                (l.graphics = {});
                b = l.config = l.config || (l.config = {});
                l = B(S(e.text, e.label));
                b._options = e;
                b.add = e.add;
                l && (b.text = l, b.x = e.x || 0, b.y = e.y || 0, b.labelFontSize = v = I(e.fontsize, v), b.labelColor = D(S(e.color, f.color)), b.alpha = I(e.alpha, 100) / 100, b.allowdrag = I(e.allowdrag, 1), b.padding = I(e.padding, 5), b.labelCSS = e.fontsize ? {fontSize: v + "px"} : void 0, b.labelBGColor = S(e.bgcolor && e.bgcolor.replace(R, r)), b.labelBDColor = S(e.bordercolor && e.bordercolor.replace(R, r)), b.link = e.link, b.allowDrag = I(e.allowdrag, 1), b.borderThickness =
                    e.borderthickness, b.dashLen = e.dashlen, b.dashGap = e.dashgap, b.dashed = e.dashed, b.radius = e.radius)
            }, init: function (a) {
                this.yAxis = this.chart.components.yAxis[0];
                this.components = {};
                this.graphics = {};
                this.JSONData = a;
                this.configure()
            }, getJSONData: function () {
                var a = this.components.data, c = a.length, e = [], b, l;
                for (l = 0; l < c; l++) b = a[l], b.removed || b.config._options && e.push(b.config._options);
                return e
            }, draw: function () {
                var c = this, l = c.components.data, n = c.chart, b = n.getJobList(), r = n.get(E, e), f = r.duration,
                    A = r.animType, C = r.dummyObj,
                    r = r.animObj, m = n.components.paper, D = n.components.yAxis[0], B = n.components.xAxis[0],
                    L = n.linkedItems.smartLabel, w = n.graphics.datalabelsGroup, U = n.graphics.trackerGroup,
                    g = n.config.dataLabelStyle, y, P, R, d, N, T, h, q, k, t, O, x, p, G, u, da = l.length,
                    ma = c.components.removeDataArr || [], La = ma.length, aa = c.components.pool || {}, S, X,
                    w = c.graphics.dataLabelContainer = c.graphics.dataLabelContainer || m.group("datalabels", w);
                c.graphics.trackerContainer = c.graphics.trackerContainer || m.group("tracker", U);
                w.css({
                    "font-weight": g.fontWeight,
                    "font-style": g.fontStyle, "font-size": g.fontSize, "font-family": g.fontFamily
                });
                for (S = 0; S < da; S++) O = l[S], O.removed || (t = O.config, !O.graphics && (O.graphics = {}), t.index = S, U = B.getPixel(t.x), d = D.getPixel(t.y), T = t.text, h = t.labelBGColor, q = t.labelBDColor, k = t.padding, x = t.allowDrag, p = t.labelFontSize, N = t.labelColor, G = t.radius, R = t.dashed, u = t.borderThickness, y = t.dashLen, P = t.dashGap, u = t.borderThickness, X = t.labelCSS, y = {
                    x: U,
                    y: d,
                    text: T,
                    align: "center",
                    fill: N,
                    "text-bound": [h || W, q || W, I(u, 1), k, I(G, 0), I(R, 0) ? M(I(y, 5), I(P, 4),
                        I(u, 1)) : "none"],
                    visibility: ba
                }, h = {
                    backgroundColor: h,
                    borderColor: q,
                    borderPadding: k,
                    fontSize: p + "px",
                    fontStyle: g.fontStyle,
                    fontWeight: g.fontWeight,
                    borderRadius: 0,
                    borderDash: "none",
                    fontFamily: g.fontFamily
                }, F(h), L.useEllipsesOnOverflow(n.config.useEllipsesWhenOverflow), L.setStyle(h), x = {
                    link: t.link,
                    text: T,
                    x: U,
                    y: d,
                    allowdrag: x,
                    sourceType: "labelnode"
                }, (h = O.graphics.element = O.graphics.element || aa.element && aa.element.text && aa.element.text.shift()) ? (t.labelCSSApplied && !X && h.removeCSS(), h.show().animateWith(C,
                    r, y, f, A).css(X)) : h = O.graphics.element = m.text(y, X, w), t.labelCSSApplied = X, h.data("eventArgs", x), T = L.getOriSize(T), t.width = T.width, t.height = T.height, t.xPos = U, t.yPos = d);
                b.trackerDrawID.push(v.addJob(function () {
                    c.drawTracker()
                }, a.priorityList.tracker));
                for (S = 0; S < La; S++) c._removeDataVisuals(ma.shift())
            }, removeData: function (a, c) {
                var e = this.components;
                e.removeDataArr = e.data.splice(a, c)
            }, drawTracker: function () {
                var a = this, c = a.components.data, e = a.chart, b = e.components.paper, l = a.groupManager,
                    f = a.config, r = a.graphics.trackerContainer,
                    v = c.length, m, E, F, D = function (a) {
                        var b = this;
                        b.data("fire_click_event", 1);
                        clearTimeout(b._longpressactive);
                        b._longpressactive = setTimeout(function () {
                            b.data("fire_click_event", 0);
                            b.data("viewMode") || l.showLabelDeleteUI(a)
                        }, 1E3)
                    }, w = function () {
                        this.data("fire_click_event") && (this.data("fire_click_event", 0), l.clearLongPress.call(this))
                    }, U = function (a) {
                        var b = this.data("fire_click_event");
                        l.clearLongPress.call(this);
                        b && C.call(this, e, a, "LabelClick")
                    }, g = function (a) {
                        C.call(this, e, a, "LabelRollover")
                    }, y = function (a) {
                        C.call(this,
                            e, a, "LabelRollout")
                    }, B, I, d, N, T, h, q, k = function (b, k) {
                        a._labelDragMove.call(this, b, k, e)
                    }, t = function (b) {
                        a._labelDragStart.call(this, b, e)
                    }, O = function (b) {
                        a._labelDragUp.call(this, b)
                    }, x;
                for (x = 0; x < v; x++) m = c[x], m.removed || (E = m.config, F = E.padding || 0, h = E.width, q = E.height, N = E.xPos - h / 2, T = E.yPos - q / 2, B = E.allowDrag, I = E.text, d = m.graphics.trackerElement, F = {
                    x: N - F,
                    y: T - F,
                    width: h + 2 * F,
                    height: q + 2 * F,
                    cursor: E.allowDrag ? "move" : W,
                    fill: A,
                    stroke: A,
                    ishot: !0
                }, E = {link: E.link, text: I, x: N, y: T, allowdrag: B, sourceType: "labelnode"}, d ||
                (d = m.graphics.trackerElement = b.rect(r).mousedown(D).mousemove(w).mouseup(U).data("viewMode", f.viewMode).data("eventArgs", E).hover(g, y).drag(k, t, O)), d.attr(F), d.data("drag-options", {
                    index: x,
                    dataset: a
                }))
            }, _labelDragStart: function () {
                var a = this, c = a.getBBox(), e = a.data("drag-options"), b = e.dataset, l = b.groupManager,
                    f = b.components.data[e.index], b = f.graphics.element,
                    r = f.dragStart = f.dragStart || (f.dragStart = {});
                e.ox = b.attr("x");
                e.oy = b.attr("y");
                e.bBox = c;
                r.xPos = f.config.xPos;
                r.yPos = f.config.yPos;
                r.bBox = c;
                a.data("fire_click_event",
                    1);
                a.data("fire_dragend", 0);
                clearTimeout(a._longpressactive);
                a._longpressactive = setTimeout(function () {
                    a.data("fire_click_event", 0);
                    a.data("viewMode") || l.showLabelDeleteUI(f)
                }, 1E3)
            }, _labelDragMove: function (a, c, e) {
                var b = e.config, l = b.canvasLeft, f = b.canvasRight, r = b.canvasBottom, b = b.canvasTop,
                    v = this.data("drag-options"), m = v.dataset, A = m.groupManager, m = m.components.data[v.index],
                    E = m.graphics.element, F = m.dragStart, w = F.bBox, D = c[0];
                c = c[1];
                var g = F.bBox.x + D, y = F.bBox.x2 + D, B = F.bBox.y + c, I = F.bBox.y2 + c, d = e.components.yAxis[0],
                    N = e.components.xAxis[0];
                g < l && (D += l - g);
                y > f && (D -= y - f);
                B < b && (c += b - B);
                I > r && (c -= I - r);
                F.draged = !0;
                this.attr({x: w.x + D, y: w.y + c});
                f = v.ox + D;
                r = v.oy + c;
                E.attr({x: v.ox + D, y: v.oy + c});
                m.config.x = N.getValue(f - l);
                m.config.y = d.getValue(r - b);
                this.data("fire_dragend") || (C.call(this, e, a, "LabelDragStart"), this.data("fire_dragend", 1));
                this.data("fire_click_event") && (this.data("fire_click_event", 0), A.clearLongPress.call(this))
            }, _labelDragUp: function (c) {
                var e = this.data("drag-options"), n = e.dataset, b = n.chart, r = n.groupManager,
                    f = n.components.data[e.index].dragStart, e = this.data("eventArgs"), n = n.yAxis;
                e.x = b.components.xAxis[0].getValue(this.attr("x"));
                e.y = n.getValue(this.attr("y"));
                f.draged = !1;
                this.data("fire_dragend") && (n = l(b.linkedItems.container, c), n.sourceEvent = "labeldragend", a.raiseEvent("chartupdated", X(n, e), b.chartInstance), C.call(this, b, c, "labeldragend"));
                r.clearLongPress.call(this)
            }
        }, "Dragnode"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-dragcolumn", function () {
        var a = this, c = a.hcLib, E = c.pluck,
            e = c.pluckNumber, ba = c.parseUnsafeString, W = c.getValidValue, S = c.toRaphaelColor, I = c.hasSVG,
            B = Math, X = B.round, M = B.abs, R = c.plotEventHandler;
        J.register("component", ["dataset", "DragColumn", {
            configure: function () {
                var a, c = this.chart.jsonData.chart, v, A;
                A = this.JSONData;
                var E = this.JSONData.data || [], l, C;
                this.__base__.configure.call(this);
                a = this.config;
                v = this.components.data;
                a.allowDrag = e(A.allowdrag, 1);
                a.allowNegDrag = e(A.allownegativedrag, 1);
                a.allowAxisChange = e(c.allowaxischange, 1);
                a.snapToDivOnly = e(c.snaptodivonly,
                    0);
                a.snapToDiv = a.snapToDivOnly ? 1 : e(c.snaptodiv, 1);
                a.doNotSnap = e(c.donotsnap, 0);
                a.snapToDivRelaxation = e(c.snaptodivrelaxation, 10);
                a.doNotSnap && (a.snapToDiv = a.snapToDivOnly = 0);
                l = v.length;
                for (c = 0; c < l; c++) C = E[c] || {}, A = v[c].config, A.allowDrag = e(C.allowdrag, a.allowDrag), A.allowNegDrag = e(C.allownegativedrag, a.allowNegDrag)
            }, _firePlotEvent: function (e, D, v) {
                var A = this.JSONData, F = this.chart.jsonData.chart, l = this.chart, C = this.config, H = l.config,
                    B = H.useplotgradientcolor, n = H.useroundedges, b = l.components, z = b.paper,
                    f = z.canvas.style, K = b.numberFormatter, V = this.components.data[D], m = V.config,
                    Z = V.graphics.element, J = m.finalTooltext, L = c.toolTip, w = v.originalEvent,
                    U = I && "ns-resize" || "n-resize", g = v.originalEvent;
                v = c.getMouseCoordinate(l.linkedItems.container, g).chartY;
                var y = V._yPos, P = V._height, ka = b.yAxis[0], b = ka.getPixel(ka.getAxisBase()), d, N = H.canvasTop;
                d = H.canvasBottom;
                var T = m.allowDrag, h = m.allowNegDrag ? d : b, q, k, t = y, O = y + P, H = H.dragTolerance + 1;
                d = y >= b ? y + P : y;
                if (Z) switch (A = W(ba(E(m.origToolText, A.plottooltext, F.plottooltext))),
                    e) {
                    case "mouseover":
                        C.mouseIn = !0;
                        J && L.setStyle(z);
                        v <= O - H && v >= t + H && (L.setPosition(w), L.draw(J, z));
                        !m._rollOverResponseSetterFire && v <= O && v >= t && (this._rolloverResponseSetter(l, Z, w), m._rollOverResponseSetterFire = !0);
                        break;
                    case "mouseout":
                        C.mouseIn = !1;
                        f.cursor = "default";
                        m._rollOverResponseSetterFire && this._rolloutResponseSetter(l, Z, w);
                        m._rollOverResponseSetterFire = !1;
                        L.hide();
                        break;
                    case "click":
                        R.call(Z, l, w);
                        break;
                    case "touchmove":
                    case "mousemove":
                        m.dragStart ? (g.preventDefault ? g.preventDefault() : g.returnValue =
                            !1, m._rollOverResponseSetterFire = !1, f.cursor = U, m._pointerDy++, v += m._dragBuffer, v < N ? v = N : v > h && (v = h), y = b < v ? b : v, P = M(b - v), V._yPos = y, V._height = P, f = m.setValue = X(ka.getValue((y >= b ? y + P : y) - N)), f = K.dataLabels(f), m.toolTipValue = f, m.displayValue = E(m.setDisplayValue, f), B && !n && (m.colorArr[0].FCcolor.angle = y < b ? 90 : 270), Z.attr({
                            y: V._yPos,
                            height: V._height,
                            fill: S(m.colorArr[0])
                        }), this.drawLabel(D, D + 1), V.graphics.element = Z, L.hide(), 1 == m._pointerDy && (V = {
                            dataIndex: D,
                            datasetIndex: V.datasetIndex,
                            startValue: V.startValue,
                            datasetName: V.name
                        },
                            a.raiseEvent("dataplotDragStart", V, l.chartInstance))) : (d = y >= b ? y + P : y, T && v >= d - H && v <= d + H ? (f.cursor = U, L.hide()) : (f.cursor = "default", m._rollOverResponseSetterFire && (L.setPosition(w), L.draw(J, z))), !m._rollOverResponseSetterFire && v <= O && v >= t ? (this._rolloverResponseSetter(l, Z, w), m._rollOverResponseSetterFire = !0) : !m._rollOverResponseSetterFire || v <= O && v >= t || (L.hide(), m._rollOverResponseSetterFire = !1, this._rolloutResponseSetter(l, Z, w)));
                        break;
                    case "touchend":
                    case "mouseup":
                        C.mousedown = !1;
                        m.dragStart && (this.setMaxMin(),
                            l._setDataLimits(), V = {
                            dataIndex: D,
                            datasetIndex: V.datasetIndex,
                            startValue: V.startValue,
                            endValue: m.setValue,
                            datasetName: V.name
                        }, D = [l.chartInstance.id, V.dataIndex, V.datasetIndex, V.datasetName, V.startValue, V.endValue], m._pointerDy && (a.raiseEvent("dataplotDragEnd", V, l.chartInstance), c.raiseEvent("chartupdated", V, l.chartInstance, D)), B && !n && (B = y >= b ? 90 : 270, (q = Z.data("setRolloverAttr")) && q.fill && (l = q.fill, l = l.split("-"), l[0] = B, q.fill = l.join("-")), (k = Z.data("setRolloutAttr")) && k.fill && (l = k.fill, l = l.split("-"),
                            l[0] = B, k.fill = l.join("-"))));
                        m._dragBuffer = 0;
                        m._pointerDy = 0;
                        m.dragStart = !1;
                        m.dragStart = !1;
                        m.finalTooltext = !1 !== m.toolText ? m.toolText + (A ? "" : m.toolTipValue) : "";
                        v >= d - H && v <= d + H || (f.cursor = "default");
                        break;
                    case "touchstart":
                    case "mousedown":
                        C.mouseIn && (C.mousedown = !0, d = y >= b ? y + P : y, T && v >= d - H && v <= d + H ? (m.dragStart = !0, m._pointerDy = 0, m._dragStartY = v, m._dragBuffer = d - v, V.startValue = m.setValue, V.name = C.seriesname, V.datasetIndex = this.positionIndex, V.dragged = !0) : m.dragStart = !1)
                }
            }, _rolloverResponseSetter: function (a,
                                                  c, e) {
                var A = c.getData();
                0 !== A.showHoverEffect && !0 !== A.draged && (c.attr(c.getData().setRolloverAttr), R.call(c, a, e, "DataPlotRollOver"))
            }, _rolloutResponseSetter: function (a, c, e) {
                var A = c.getData();
                0 !== A.showHoverEffect && !0 !== A.draged && (c.attr(c.getData().setRolloutAttr), R.call(c, a, e, "DataPlotRollOut"))
            }, getJSONData: function () {
                var a = this.JSONData.data, c = this.components.data, e = [], A = {}, E, l, C, H, B;
                B = 0;
                for (H = a.length; B < H; B++) {
                    l = a[B];
                    E = c[B];
                    A = {};
                    for (C in l) A[C] = "value" === C ? E.config.setValue : l[C];
                    e.push(A)
                }
                return {data: e}
            }
        },
            "Column"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-dragarea", function () {
        var a = this, c = a.hcLib, E = "VML" === c.Raphael.type, e = c.BLANKSTRING, ba = c.parseUnsafeString,
            W = c.getValidValue, S = c.preDefStr.hiddenStr, I = c.pluck, B = c.pluckNumber, X = c.hasSVG, M = Math,
            R = M.round, r = M.min, D = M.max, v = c.plotEventHandler;
        J.register("component", ["dataset", "DragArea", {
            configure: function () {
                var a, c = this.chart.jsonData.chart;
                a = J.get("component", ["dataset", "area"]);
                var e, r, v;
                r = this.JSONData;
                var E = r.data || [], n;
                a.prototype.configure.call(this);
                a = this.config;
                e = this.components.data;
                a.allowDrag = B(r.allowdrag, 1);
                a.allowNegDrag = B(r.allownegativedrag, 1);
                a.allowAxisChange = B(c.allowaxischange, 1);
                a.snapToDivOnly = B(c.snaptodivonly, 0);
                a.doNotSnap = B(c.donotsnap, 0);
                a.snapToDiv = B(c.snaptodiv, 1);
                a.snapToDivRelaxation = B(c.snaptodivrelaxation, 10);
                a.doNotSnap && (a.snapToDiv = a.snapToDivOnly = 0);
                n = e.length;
                for (c = 0; c < n; c++) v = E[c] || {}, r = e[c].config, r.allowDrag = B(v.allowdrag, a.allowDrag), r.allowNegDrag = B(v.allownegativedrag, a.allowNegDrag)
            }, updateImage: function (a) {
                var c =
                        this.chart, l = a.graphics, l = l.image || l.element, v = a.config, D = v.anchorProps,
                    B = v.hoverEffects, v = l && l.data("imgRef"), n = function (a) {
                        var b = a.length, c = e, f;
                        for (f = 0; f < b; f += 1) c += " " + a[f];
                        return c
                    }, b = D.imageScale, z = c.components.paper, f = v.height * b * .01, K = v.width * b * .01, c = a._xPos;
                a = a._yPos;
                var V = B.imageHoverScale, m = v.width * V * .01, Z = v.height * V * .01,
                    I = D.radius = D.isAnchorRadius ? D.radius : r(K, f) / 2, L = D.imagePadding,
                    w = I - L - .5 * D.borderThickness, L = B.radius - L - .5 * B.anchorBorderThickness,
                    I = D.symbol[1], D = z.polypath(I || 2, c, a, 0 < w ?
                    w : 0, D.startAngle, 0).attr({visibility: S}), w = n(D.attrs.path),
                    b = {x: c - v.width * b * .005, y: a - v.height * b * .005, width: K, height: f, alpha: 100};
                E || (b["clip-path"] = w);
                D.remove();
                D = z.polypath(I || 2, c, a, 0 < L ? L : 0, B.startAngle, B.dip);
                B = n(D.attrs.path);
                D.remove();
                v = {x: c - v.width * V * .005, y: a - v.height * V * .005, width: m, height: Z, alpha: 100};
                E || (v["clip-path"] = B);
                l.attr(b);
                l.data("setRolloverAttr", v);
                l.data("setRolloutAttr", b)
            }, _firePlotEvent: function (e, r, l) {
                var C = this.JSONData, B = this.chart.jsonData.chart, Q = this.chart, n = Q.config,
                    b = Q.components, z = b.paper, f = c.toolTip, K = z.canvas.style, V = b.numberFormatter,
                    m = this.components, Z = m.data[r], M = m.data.length,
                    L = J.get("component", ["dataset", "DragArea"]), w = this.config, U = this.index;
                l = l.originalEvent;
                var g = X && "ns-resize" || "n-resize", y, P, S, d, N, T, h, q, k, t;
                y = Z && Z._yBasePos;
                var O = b.yAxis[0], x = n.canvasTop, p = n.canvasBottom, G, u, b = this.graphics.lineElement, da, ma,
                    La;
                u = u ? p : y;
                var aa, db, fc = "dragline" === this.type ? !0 : !1;
                "touchend" === e && (n = l.changedTouches[0], l.pageX = n && n.pageX, l.pageY = n && n.pageY);
                P = c.getMouseCoordinate(Q.linkedItems.container,
                    l);
                n = P.chartY;
                P = P.chartX;
                if (Z) switch (N = Z.graphics.element, t = Z.config, da = t.anchorProps, ma = da.imageUrl, La = Z.graphics.image, N && N.data("setRolloverAttr"), db = t.hoverEffects && t.hoverEffects.enabled, aa = da.startAngle || 90, h = W(ba(I(t.origToolText, C.plottooltext, B.plottooltext))), q = t.finalTooltext, T = t.hoverEffects.enabled, k = t.eventArgs, C = Z._yPos, B = Z._xPos, G = t.allowDrag, u = (u = t.allowNegDrag) ? p : y, t.dragTolerance = t.dragTolerance < da.markerRadius ? da.markerRadius + .5 : t.dragTolerance, y = D(t.dragTolerance, t.hoverEffects.anchorRadius ||
                    0) + 1, e) {
                    case "mouseover":
                        w.mouseIn = !0;
                        t.allowDrag && (K.cursor = g);
                        t.dragStart || !q || t.dragStart || (f.setStyle(z), f.setPosition(l), f.draw(q, z));
                        t.dragStart || (T && this._hoverPlotAnchor(Z, "DataPlotRollOver"), N && v.call(N, Q, l, "DataPlotRollOver", k));
                        break;
                    case "mouseout":
                        w.mouseIn = !1;
                        K.cursor = "default";
                        T && this._hoverPlotAnchor(Z, "DataPlotRollOut");
                        N && v.call(N, Q, l, "DataPlotRollOut", k);
                        f.hide();
                        break;
                    case "touchmove":
                    case "mousemove":
                        if (t.dragStart) {
                            l.preventDefault ? l.preventDefault() : l.returnValue = !1;
                            t.allowDrag &&
                            (K.cursor = g);
                            t._pointerDy++;
                            n += t._dragBuffer;
                            n < x ? n = x : n > u && (n = u);
                            Z._yPos = n;
                            K = t.setValue = R(O.getValue(C - x));
                            K = V.dataLabels(K);
                            t.toolTipValue = K;
                            t.displayValue = K;
                            this.drawLabel(r, r + 1);
                            Z.graphics.element = N;
                            E && ma ? La = N : (db && (d = N.data("setRolloverAttr")) && (d.polypath[2] = Z._yPos), db && (S = N.data("setRolloutAttr")) && (S.polypath[2] = Z._yPos), N && N.attr(S || {polypath: [da.symbol[1] || 2, B, Z._yPos, da.radius, aa, 0]}));
                            La && L.prototype.updateImage.call(this, Z);
                            m = m.data;
                            this.getLinePath(m, {});
                            if (fc) for (L = 0; L < M; L++) if (d = m[L].graphics &&
                                m[L].graphics.connector) K = m[L], S = K.config.connStartIndex, K = K.config.connEndIndex, S = this.getLinePath(m, {}, {
                                begin: S,
                                end: K + 1
                            }), d.attr({path: S.getPathArr()});
                            b && (S = t.pathStartIndex, K = t.pathEndIndex, S = this.getLinePath(m, {}, {
                                begin: S,
                                end: K
                            }), b.attr({path: S.getPathArr()}));
                            1 == t._pointerDy && (k = {
                                dataIndex: r,
                                datasetIndex: U,
                                startValue: Z.startValue,
                                endValue: t.setValue,
                                datasetName: Z.name
                            }, a.raiseEvent("dataplotDragStart", k, Q.chartInstance))
                        }
                        !t.dragStart && q && n >= C - y && n <= C + y && P <= B + y && P >= B - y ? (f.setPosition(l), f.draw(q,
                            z)) : f.hide();
                        break;
                    case "click":
                        N && v.call(N, Q, l, "dataplotclick", k);
                        break;
                    case "touchend":
                    case "mouseup":
                        w.mousedown = !1;
                        t.dragStart && (this.setMaxMin(), Q._setDataLimits(), k = {
                            dataIndex: r,
                            datasetIndex: U,
                            startValue: Z.startValue,
                            endValue: t.setValue,
                            datasetName: Z.name
                        }, r = [Q.chartInstance.id, k.dataIndex, k.datasetIndex, k.datasetName, k.startValue, k.endValue], t._pointerDy && (T && this._hoverPlotAnchor(Z, "DataPlotRollOut"), a.raiseEvent("dataplotDragEnd", k, Q.chartInstance), c.raiseEvent("chartupdated", k, Q.chartInstance,
                            r)));
                        q = t.finalTooltext = !1 !== t.toolText ? t.toolText + (h ? "" : t.toolTipValue) : "";
                        n >= C - y && n <= C + y && P <= B + y && P >= B - y || (K.cursor = "default");
                        w.mouseIn && !t.dragStart && (f.setPosition(l), f.draw(q, z));
                        t._dragBuffer = 0;
                        t._pointerDy = 0;
                        t.dragStart = !1;
                        break;
                    case "touchstart":
                    case "mousedown":
                        w.mouseIn && (w.mousedown = !0, G && n >= C - y && n <= C + y && P <= B + y && P >= B - y ? (t.dragStart = !0, t._pointerDy = 0, t._dragStartY = n, t._dragBuffer = C - n, Z.dragged = !0, Z.startValue = t.setValue, Z.name = w.seriesname, Z.datasetIndex = this.positionIndex) : t.dragStart =
                            !1)
                }
            }, getJSONData: function () {
                var a = this.JSONData.data, c = this.components.data, e = [], r = {}, v, E, n, b, z;
                z = 0;
                for (b = a.length; z < b; z++) {
                    v = a[z];
                    E = c[z];
                    r = {};
                    for (n in v) r[n] = "value" === n ? E.config.setValue : v[n];
                    e.push(r)
                }
                return {data: e}
            }
        }, "Area"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-dragline", function () {
        var a = this.hcLib.preDefStr.line;
        J.register("component", ["dataset", "DragLine", {
            type: "dragline",
            configure: J.get("component", ["dataset", "DragArea"]).prototype.configure,
            _firePlotEvent: J.get("component",
                ["dataset", "DragArea"]).prototype._firePlotEvent,
            getJSONData: function () {
                var a = this.JSONData.data, E = this.components.data, e = [], J = {}, W, S, I, B, X;
                X = 0;
                for (B = a.length; X < B; X++) {
                    W = a[X];
                    I = E[X];
                    J = {};
                    for (S in W) J[S] = "value" === S ? I.config.setValue : W[S];
                    e.push(J)
                }
                return {data: e}
            }
        }, a])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-selectscatter", function () {
        var a = this, c = a.hcLib, E = c.graphics.convertColor, e = c.preDefStr, ba = e.altHGridColorStr,
            W = e.altHGridAlphaStr, S = e.colors.FFFFFF, I = c.getValidValue, B = c.ZEROSTRING,
            X = c.bindSelectionEvent, M = c.getMouseCoordinate, R = c.extend2, r = c.pluck, D = c.pluckNumber;
        J.register("component", ["dataset", "selectScatter", {
            configure: function () {
                var c = this.chart, e = c.config, F = c.jsonData.chart, c = c.components.colorManager,
                    l = r(F.selectbordercolor, c.getColor("canvasBorderColor")),
                    C = D(F.selectborderalpha, c.getColor("canvasBorderAlpha"));
                J.get("component", ["dataset", "scatter"]).prototype.configure.call(this);
                e.selectBorderColor = {FCcolor: {color: l, alpha: C}};
                e.selectFillColor = E(r(F.selectfillcolor,
                    c.getColor(ba)), D(F.selectfillalpha, c.getColor(W)));
                e.selectionCancelButtonBorderColor = E(r(F.selectioncancelbuttonbordercolor, l), D(F.selectioncancelbuttonborderalpha, C));
                e.selectionCancelButtonFillColor = E(r(F.selectioncancelbuttonfillcolor, S), D(F.selectioncancelbuttonfillalpha, 100));
                e.connativeZoom = !1;
                e.zoomType = "xy";
                e.formAction = I(F.formaction);
                F.submitdataasxml !== B || F.formdataformat || (F.formdataformat = a.dataFormats.CSV);
                e.formDataFormat = r(F.formdataformat, a.dataFormats.XML);
                e.formTarget = r(F.formtarget,
                    "_self");
                e.formMethod = r(F.formmethod, "POST");
                e.submitFormAsAjax = D(F.submitformusingajax, 1)
            }, draw: function () {
                var c = this.chart, e = c.linkedItems.container;
                J.get("component", ["dataset", "scatter"]).prototype.draw.call(this);
                X(c, {
                    selectionStart: function (c) {
                        var l = M(e, c.originalEvent), l = R({
                            selectionLeft: c.selectionLeft,
                            selectionTop: c.selectionTop,
                            selectionWidth: c.selectionWidth,
                            selectionHeight: c.selectionHeight,
                            startXValue: c.chart.components.xAxis[0].getAxisPosition(c.selectionLeft, 1),
                            startYValue: c.chart.components.yAxis[0].getAxisPosition(c.selectionTop,
                                1)
                        }, l);
                        a.raiseEvent("selectionStart", l, c.chart.chartInstance)
                    }, selectionEnd: function (c) {
                        var l = M(e, c.originalEvent), r = c.chart.components.xAxis[0], v = c.chart.components.yAxis[0],
                            l = R({
                                selectionLeft: c.selectionLeft,
                                selectionTop: c.selectionTop,
                                selectionWidth: c.selectionWidth,
                                selectionHeight: c.selectionHeight,
                                startXValue: r.getAxisPosition(c.selectionLeft, 1),
                                startYValue: v.getAxisPosition(c.selectionTop, 1),
                                endXValue: r.getAxisPosition(c.selectionLeft + c.selectionWidth, 1),
                                endYValue: v.getAxisPosition(c.selectionTop +
                                    c.selectionHeight, 1)
                            }, l);
                        a.raiseEvent("selectionEnd", l, c.chart.chartInstance);
                        c.chart.createSelectionBox(c)
                    }
                })
            }
        }, "scatter"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-candlestick", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.line, e = c.volume, ba = c.bar, W = a.BLANKSTRING,
            S = a.getValidValue, I = a.getFirstValue, B = a.getFirstColor, X = c.setRolloverAttrStr,
            M = c.setRolloutAttrStr, R = a.ZEROSTRING, r = a.parseUnsafeString, D = c.column, v = a.getDashStyle,
            A = c.animationObjStr, F = c.columnStr, l = c.shadowStr, C =
                a.toRaphaelColor, H = c.miterStr, Q = a.schedular, n = c.showHoverEffectStr, b = c.ROUND, z = c.visibleStr,
            f = c.errorBarStr, K = c.errorHotStr, V = c.UNDERSCORE, m = a.parseTooltext, Z = c.colors, ga = a.extend2,
            L = c.configStr, w = Z.B90000, U = Z.FFFFFF, g = a.pluck, y = a.pluckNumber, c = Math, P = c.round,
            ka = c.min, d = c.max, N = c.abs, T = a.plotEventHandler;
        J.register("component", ["dataset", "Candlestick", {
            type: "Candlestick", configure: function () {
                if (this.plotType === e) this._configureVolume(); else {
                    var b = this.config, c = this.chart, k = c.components, f = this.JSONData,
                        l = f.data || [], x = c.jsonData.chart, p = l.length,
                        G = b.plotPriceAs = S(x.plotpriceas, W).toLowerCase(), u = k.numberFormatter,
                        n = k.colorManager, m, z, aa, A, k = b.bearBorderColor = B(g(x.bearbordercolor, w)),
                        C = b.bearFillColor = B(g(x.bearfillcolor, w)),
                        K = b.bullBorderColor = B(g(x.bullbordercolor, n.getColor("canvasBorderColor"))),
                        F = b.bullFillColor = B(g(x.bullfillcolor, U)),
                        L = b.linethickness = b.plotBorderThickness = y(x.plotlinethickness, G == E || G == ba ? 2 : 1),
                        H = b.plotLineDashLen = y(x.plotlinedashlen, 5), P = b.plotLineDashGap = y(x.plotlinedashgap,
                        4), Z = !!y(x.drawanchors, 1), I = y(x.anchorstartangle, 90),
                        Q = y(x.anchorradius, this.anchorRadius, 3), T = B(g(x.anchorbordercolor, K)),
                        M = y(x.anchorborderthickness, this.anchorBorderThickness, 1),
                        n = B(g(x.anchorbgcolor, n.getColor("anchorBgColor"))), X = g(x.anchoralpha, R),
                        J = g(x.anchorbgalpha, X), ga, Ia, va, Fa, wa, oa, qa, la, ia, ea, sa, fa, ha, ca = !1,
                        Aa = -Infinity, ya = Infinity, Y = -Infinity, ua = Infinity, xa = a.graphics.mapSymbolName;
                    b.parentYAxis = 0;
                    b.toolText = S(r(g(f.tooltext, x.plottooltext)));
                    b.name = S(f.seriesname);
                    b.showTooltip = g(x.showtooltip,
                        1);
                    switch (G) {
                        case E:
                            b.plotType = E;
                            break;
                        case ba:
                            b.plotType = ba;
                            break;
                        default:
                            b.plotType = D, b.showErrorValue = !0, b.errorBarWidthPercent = 0, ca = !0
                    }
                    b.animation = {duration: 200};
                    ga = g(x.maxcolwidth);
                    b.maxColWidth = N(y(ga, 50)) || 1;
                    b.enableAnimation = ga = y(x.animation, x.defaultanimation, 1);
                    b.animation = ga ? {duration: 1E3 * y(x.animationduration, 1)} : !1;
                    b.lineAlpha = g(x.plotlinealpha, "100");
                    ga = d(y(x.plotspacepercent, 20) % 100, 0);
                    b.plotSpacePercent = b.groupPadding = ga / 200;
                    sa = this.components.data = this.components.data || (this.components.data =
                        []);
                    b.valuePadding = y(f.valuepadding, x.valuepadding, 2);
                    b.plotBorderThickness = L;
                    for (ga = 0; ga < p; ga += 1) if (fa = l[ga], (Ia = sa[ga]) || (Ia = sa[ga] = {}), !Ia.config && (Ia.config = {}), !Ia.graphics && (Ia.graphics = {}), ha = Ia.config, fa && !fa.vline) {
                        ha.setLink = g(fa.link);
                        Ia = ha.open = u.getCleanValue(fa.open);
                        Fa = ha.close = u.getCleanValue(fa.close);
                        wa = ha.high = u.getCleanValue(fa.high);
                        oa = ha.low = u.getCleanValue(fa.low);
                        qa = ha.volume = u.getCleanValue(fa.volume, !0);
                        null !== qa && (c.config.drawVolume = !0);
                        qa = ha.x = u.getCleanValue(fa.x);
                        ha.openVal =
                            ca ? N(Fa - Ia) : Ia;
                        ia = ha.closeVal = ka(Ia, Fa);
                        ea = ha.yVal = d(Ia, Fa);
                        A = G === E ? 1 : 0;
                        va = ka(Ia, Fa, wa, oa);
                        la = d(Ia, Fa, wa, oa);
                        r(S(fa.valuetext, W));
                        z = B(g(fa.bordercolor, Fa < Ia ? k : K));
                        aa = g(fa.alpha, A ? b.lineAlpha : "100");
                        m = B(g(fa.color, Fa < Ia ? C : F));
                        A = y(fa.dashed) ? v(H, P) : "none";
                        ha.dashStyle = A;
                        A = {opacity: aa / 100};
                        ha.color = ca ? m : z;
                        ha.alpha = aa;
                        ha.setColor = ha.color;
                        ha.setAlpha = ha.alpha;
                        ha.anchorImageUrl = g(fa.anchorimageurl, f.anchorimageurl, x.anchorimageurl);
                        z = ha.borderColor = z;
                        ha.borderAlpha = ha.plotLineAlpha;
                        ha.colorArr = [{
                            color: ha.color,
                            alpha: ha.alpha
                        }, {color: ha.borderColor, alpha: ha.borderAlpha}];
                        ha.anchorSides = y(fa.anchorsides, f.anchorsides, x.anchorsides);
                        ha.symbol = xa(ha.anchorSides).split(V);
                        ha.anchorProps = {
                            enabled: Z,
                            bgColor: n,
                            symbol: ha.symbol,
                            bgAlpha: J * X / 100 + W,
                            borderColor: T,
                            borderAlpha: X,
                            anchorAlpha: X,
                            borderThickness: M,
                            imageUrl: ha.anchorImageUrl,
                            radius: Q,
                            imageScale: y(fa.imagescale, f.imagescale, x.imagescale, 100),
                            imagePadding: y(fa.anchorimagepadding, f.anchorimagepadding, x.anchorimagepadding, 1),
                            imageAlpha: y(f.anchorimagealpha, x.anchorimagealpha,
                                100),
                            startAngle: I
                        };
                        ha.showValue = 1;
                        ha.hoverEffects = {};
                        switch (b.plotType) {
                            case E:
                                ha.y = Fa;
                                ha.link = g(fa.link);
                                break;
                            case D:
                                ha.y = N(Fa - Ia);
                                ha.previousY = ia;
                                ha.link = g(fa.link);
                                ha.errorValue = [];
                                0 < wa - ea && ha.errorValue.push({
                                    errorValue: wa - ea,
                                    errorStartValue: ea,
                                    errorBarColor: z,
                                    errorBarThickness: L,
                                    opacity: 1
                                });
                                0 > oa - ia && ha.errorValue.push({
                                    errorValue: oa - ia,
                                    errorStartValue: ia,
                                    errorBarColor: z,
                                    errorBarThickness: L,
                                    opacity: 1
                                });
                                break;
                            default:
                                ha.y = Ia, ha.previousY = Fa, ha.link = g(fa.link)
                        }
                        ha.setValue = ha.y;
                        null !== va && (!Aa &&
                        0 !== Aa && (Aa = va), !ya && 0 !== ya && (ya = va), Aa = d(Aa, va), ya = ka(ya, va));
                        null !== la && (!Aa && 0 !== Aa && (Aa = la), !ya && 0 !== ya && (ya = la), Aa = d(Aa, la), ya = ka(ya, la));
                        null !== qa && (Y = d(Y, qa), ua = ka(ua, qa));
                        va = this._parseToolText(ga);
                        ha.toolText = va;
                        ha.toolTipValue = W;
                        qa = qa ? qa : ga + 1;
                        ha.x = qa;
                        ha.displayValue = r(g(fa.displayvalue, fa.valuetext, W));
                        ha.high = d(Ia, Fa, wa, oa);
                        ha.low = ka(Ia, Fa, wa, oa);
                        ha.shadow = A
                    }
                    b.yMax = Aa;
                    b.yMin = ya;
                    b.xMax = Y;
                    b.xMin = ua
                }
            }, _parseToolText: function (a) {
                var b = this.config, k = this.chart, c = k.jsonData.chart, d = b.plotType ===
                    E ? 1 : 0, f = this.JSONData.data[a], e = this.components.data[a].config,
                    k = k.components.xAxis[0].getLabel(e.x).label;
                a = e.open;
                var G = e.close, u = this.yAxis, l = e.high, n = e.low, e = e.volume,
                    w = void 0 !== e ? f.volumetooltext : void 0;
                b.showTooltip ? (b = S(r(g(w, f.tooltext, b.volumeToolText, b.toolText))), void 0 !== b ? b = m(b, [3, 5, 6, 10, 54, 55, 56, 57, 58, 59, 60, 61, 81, 82], {
                    label: k,
                    yaxisName: r(c.yaxisname),
                    xaxisName: r(c.xaxisname),
                    openValue: f.open,
                    openDataValue: u.dataLabels(a),
                    closeValue: f.close,
                    closeDataValue: u.dataLabels(G),
                    highValue: f.high,
                    highDataValue: u.dataLabels(l),
                    lowValue: f.low,
                    lowDataValue: u.dataLabels(n),
                    volumeValue: f.volume,
                    volumeDataValue: u.dataLabels(e)
                }, f, c) : (b = null === a || d ? W : "<b>Open:</b> " + u.dataLabels(a) + "<br />", b += null !== G ? "<b>Close:</b> " + u.dataLabels(G) + "<br />" : W, b += null === l || d ? W : "<b>High:</b> " + u.dataLabels(l) + "<br />", b += null === n || d ? W : "<b>Low:</b> " + u.dataLabels(n) + "<br />", b += null !== e ? "<b>Volume:</b> " + u.dataLabels(e) : W)) : b = W;
                return b
            }, init: function (a, b) {
                var k = this.chart;
                this.yAxis = b === e ? k.components.yAxis[1] :
                    k.components.yAxis[0];
                this.components = {};
                this.graphics = {};
                this.JSONData = a;
                this.visible = 1;
                this.plotType = b;
                this.configure()
            }, _configureVolume: function () {
                var b = this.config, c = this.chart, k = this.JSONData, f = k.data || [], e = c.jsonData.chart,
                    x = f.length, p = c.components.colorManager, G, u, l, n, m, z,
                    E = b.bearBorderColor = B(g(e.bearbordercolor, w)), A = b.bearFillColor = B(g(e.bearfillcolor, w)),
                    p = b.bullBorderColor = B(g(e.bullbordercolor, p.getColor("canvasBorderColor"))),
                    C = b.bullFillColor = B(g(e.bullfillcolor, U)), K = y(e.showvplotborder,
                    1) ? y(e.vplotborderthickness, 1) : 0, V = b.plotLineDashLen = y(e.plotlinedashlen, 5),
                    F = b.plotLineDashGap = y(e.plotlinedashgap, 4), L, H = this.yAxis, P = -Infinity, Z = Infinity,
                    Q = -Infinity, T = Infinity;
                m = c.components.vNumberFormatter;
                b.plotType = D;
                b.parentYAxis = 1;
                b.volumeToolText = S(r(g(k.volumetooltext, e.volumetooltext, e.plottooltext)));
                b.name = S(k.seriesname);
                b.showTooltip = g(e.showtooltip, 1);
                b.enableAnimation = k = y(e.animation, e.defaultanimation, 1);
                b.animation = k ? {duration: 1E3 * y(e.animationduration, 1)} : !1;
                k = g(e.maxcolwidth);
                b.maxColWidth = N(y(k, 50)) || 1;
                k = d(y(e.plotspacepercent, 20) % 100, 0);
                b.plotSpacePercent = b.groupPadding = k / 200;
                b.plotBorderThickness = K;
                k = this.components.data = this.components.data || (this.components.data = []);
                e = ga(ga({}, e), {
                    forcedecimals: I(e.forcevdecimals, e.forcedecimals),
                    forceyaxisvaluedecimals: I(e.forcevyaxisvaluedecimals, e.forceyaxisvaluedecimals),
                    yaxisvaluedecimals: I(e.vyaxisvaluedecimals, e.yaxisvaluedecimals),
                    formatnumber: I(e.vformatnumber, e.formatnumber),
                    formatnumberscale: I(e.vformatnumberscale, e.formatnumberscale),
                    defaultnumberscale: I(e.vdefaultnumberscale, e.defaultnumberscale),
                    numberscaleunit: I(e.vnumberscaleunit, e.numberscaleunit),
                    vnumberscalevalue: I(e.vnumberscalevalue, e.numberscalevalue),
                    scalerecursively: I(e.vscalerecursively, e.scalerecursively),
                    maxscalerecursion: I(e.vmaxscalerecursion, e.maxscalerecursion),
                    scaleseparator: I(e.vscaleseparator, e.scaleseparator),
                    numberprefix: I(e.vnumberprefix, e.numberprefix),
                    numbersuffix: I(e.vnumbersuffix, e.numbersuffix),
                    decimals: I(e.vdecimals, e.decimals)
                });
                m ? m.configure(e) :
                    m = c.components.vNumberFormatter = new a.NumberFormatter(c, e);
                H.setNumberFormatter(m);
                for (c = 0; c < x; c += 1) m = f[c], (e = k[c]) || (e = k[c] = {}), !e.config && (e.config = {}), !e.graphics && (e.graphics = {}), L = e.config, m && !m.vline && (n = L.open = H.getCleanValue(m.open), G = L.close = H.getCleanValue(m.close), L.high = H.getCleanValue(m.high), L.low = H.getCleanValue(m.low), z = L.volume = H.getCleanValue(m.volume, !0), e = L.x = H.getCleanValue(m.x), L.openVal = N(G - n), L.closeVal = ka(n, G), P = d(P, z), Z = ka(Z, z), Q = d(Q, e), T = ka(T, e), r(S(m.valuetext, W)), u = B(g(m.bordercolor,
                    G < n ? E : p)), l = g(m.alpha, "100"), G = B(g(m.color, G < n ? A : C)), L.dashStyle = y(m.dashed) ? v(V, F) : "none", n = {opacity: l / 100}, L.color = G, L.alpha = l, L.setLink = m.link, L.borderWidth = K, L.borderColor = u, L.borderAlpha = g(L.plotLineAlpha, l), L.y = z, L.colorArr = [{
                    color: L.color,
                    alpha: L.alpha
                }, {
                    color: L.borderColor,
                    alpha: L.borderAlpha
                }], L.setValue = L.y, m = this._parseToolText(c), L.toolText = m, L.toolTipValue = W, e = e ? e : c + 1, L.x = e, L.shadow = n);
                b.yMax = P;
                b.yMin = Z;
                b.xMax = Q;
                b.xMin = T
            }, draw: function () {
                var a = this.config, b = a.plotType, k = this.JSONData &&
                    this.JSONData.data.slice();
                k.sort(function (a, b) {
                    return a.x - b.x
                });
                this.JSONData.sortedData = k;
                b === E ? this.__base__.draw.call(this) : b === D ? (this._drawColumn(), a.showErrorValue && this._drawErrorValue()) : this._drawCandlestickBar();
                this.drawn = !0
            }, _drawColumn: function () {
                var b = this, c = b.JSONData, k = b.chart, d = k.getJobList(), f = b.chart.jsonData.chart, e = b.config,
                    p = b.index, G = c.data, u = G && G.length, m, r, w = b.visible, z = k.components.paper,
                    v = k.components.xAxis[0], E = b.yAxis, B, K, U = k.graphics, P = a.parseUnsafeString,
                    Z = a.getValidValue,
                    T = a.Raphael, I, S = e.showTooltip, R = k.get(L, A), ba = R.duration, ga = R.dummyObj,
                    Va = R.animObj, Da = v.getPVR(), Ia = e.plotSpacePercent, va = e.maxColWidth,
                    Da = (1 - .01 * e.definedGroupPadding) * Da || ka(Da * (1 - 2 * Ia), 1 * va), Ia = Da / 2,
                    Da = Da / 1, va = ka(Da - 1, 0), Ia = 0 * Da - Ia + va / 2, Fa, wa = b.components.data, oa, qa, la,
                    ia, va = E.getAxisBase(), ea = E.yBasePos = E.getAxisPosition(va), sa = e.plotBorderThickness,
                    fa = e.plotRadius || 0, ha = b.graphics.container, ca = b.graphics.shadowContainer, Aa, ya, Y,
                    ua = !k.config.plotAnimDone, xa = b.components.removeDataArr || [], za =
                        xa.length, Ga = J.get("component", ["dataset", D]).prototype.drawLabel, Ma = function () {
                        var a = b.graphics.errorGroupContainer;
                        a && a.show()
                    };
                oa = U.datasetGroup;
                U = b.components.pool || [];
                la = k.components;
                var ra = la.canvas.config;
                ia = la.canvasVolume.config;
                la = k.config.rollOverBandColor;
                ha || (ha = b.graphics.container = z.group(F, oa), w || ha.hide());
                ca || (ca = b.graphics.shadowContainer = z.group(l, oa).toBack(), w || ca.hide());
                Y || (ia = ["M", 0, ra.canvasTop, "L", 0, ra.canvasBottom, "M", 0, ia.canvasTop - ia.canvasBorderWidth, "L", 0, ia.canvasTop +
                ia.canvasHeight + ia.canvasBorderWidth / 2], Y || (Y = k.graphics.rollOverBand = z.path(oa)), Y.transform(W), Y.attr({
                    path: ia,
                    "stroke-width": Da,
                    ishot: !0,
                    stroke: la,
                    "stroke-linecap": "butt"
                }), Y.data("width", Da), Y.toBack(), Y.hide());
                Y = Da;
                e.columnWidth = Da;
                for (e = 0; e < u; e++) m = G[e], oa = wa[e], m.originalIndex = e, ia = oa && oa.config, la = ia.setLink, r = ia.y, B = y(ia.x, e), Aa = ia.colorArr, null !== r && (la = ia.setLink, oa.graphics || (wa[e].graphics = {}), qa = b.index + V + e, ia.groupId = qa, qa = ia.displayValue, Z(P(g(m.tooltext, c.plottooltext, f.plottooltext))),
                    m = ia.previousY, K = E.getAxisPosition(m || va), m = E.getAxisPosition(r + (m || 0)), B = v.getAxisPosition(B) + Ia, K = N(m - K), K = T.crispBound(B, m, Y, K, sa), B = K.x, m = K.y, Y = K.width, K = K.height || 1, Fa = ia.toolText, ya = ia.dashStyle, oa.trackerConfig = {}, I = oa.trackerConfig, I = I.eventArgs = I.eventArgs || {}, I.index = e, I.link = la, I.value = r, I.displayValue = qa, I.categoryLabel = v.getLabel(e).label, I.toolText = Fa, I.id = W, I.datasetIndex = p, I.datasetName = c.seriesname, I.visible = w, oa._xPos = B, oa._yPos = m, oa._height = K, oa._width = Da, qa = oa.graphics.element,
                qa || (U.element && U.element.length ? qa = oa.graphics.element = U.element.shift() : (qa = oa.graphics.element = z.rect(ha), ba && qa.attr({
                    x: B,
                    y: ea,
                    width: Y,
                    height: 0
                }))), r = ia._elemPositions, r || (r = ia._elemPositions = {}), r.x = B, r.y = m, r.width = Y, r.height = K, qa.show().animateWith(ga, Va, r, ba, R.animType, ua && Ma), r = ia._elemCosmetics, r || (r = ia._elemCosmetics = {}), r.r = fa, r.ishot = !S, r.fill = C(Aa[0]), r.stroke = C(Aa[1]), r["stroke-width"] = sa, r["stroke-dasharray"] = ya, r["stroke-linejoin"] = H, r.visibility = w, r.cursor = la ? "pointer" : "default",
                    qa.attr(r).shadow(ia.shadow, ca).data("dataObj", oa), k.config.plotAnimDone = !0, k.config.enablemousetracking && qa.data("eventArgs", I).data(n, !0).data(X, ia.setRolloverAttr || {}).data(M, ia.setRolloutAttr || {}));
                b.drawn ? Ga.call(b, 0, wa.length) : d.labelDrawID.push(Q.addJob(function () {
                    Ga.call(b, 0, wa.length)
                }, a.priorityList.label));
                for (e = 0; e < za; e++) if (oa = xa[0]) b._removeDataVisuals(oa.graphics), xa.shift();
                b.drawn = !0;
                for (e = b.JSONData.data.length; e--;) b.JSONData.data[e].originalIndex = e;
                k.config.toleranceBottom = ra.intermediarySpace +
                    2 * k.config.canvasBorderWidth
            }, _getHoveredPlot: function (a, b) {
                var k = this.config.plotType;
                if (k === E) return this._getHoveredPlotCandleLine(a, b);
                if (k === D) return this._getHoveredPlotCandleColumn(a, b)
            }, _getHoveredPlotCandleLine: function (a, b) {
                var k = this.chart, c = k.components.canvas.config, d = k.components.xAxis[0], f = this.components.data,
                    e, g = f.length;
                e = this.config;
                k = a - k.config.canvasLeft - Math.max(c.canvasPaddingLeft, c.canvasPadding);
                c = e && e.radius || 0;
                e = Math.floor(Math.max(d.getValue(k - c), 0));
                e = this.getPlotIndices(e);
                d = Math.ceil(Math.min(d.getValue(k + c), g - 1));
                d = this.getPlotIndices(d);
                for (g = e.length; g--;) if (k = f[e[g].originalIndex]) if (k = this.isWithinShape(k, e[g].originalIndex, a, b)) return k;
                for (g = d.length; g--;) if (k = f[d[g].originalIndex]) if (k = this.isWithinShape(k, d[g].originalIndex, a, b)) return k
            }, _getHoveredPlotCandleColumn: function (a, b) {
                for (var k = this.chart, c = k.components.canvas.config, d, k = k.components.xAxis[0].getValue(a - k.config.canvasLeft - Math.max(c.canvasPaddingLeft, c.canvasPadding)), k = this.getPlotIndices(k),
                         c = k.length; c--;) this._checkPointerOverErrorBar(k[c].originalIndex, a, b) && (d = this._checkPointerOverErrorBar(k[c].originalIndex, a, b)), this._checkPointerOverColumn(k[c].originalIndex, a, b) && (d = this._checkPointerOverColumn(k[c].originalIndex, a, b));
                return d
            }, getPlotIndices: function (a) {
                var b = Math.floor(a), k = Math.ceil(a), c, d = [];
                for (a = (this.JSONData && this.JSONData.sortedData).length; a--;) c = this.JSONData.sortedData[a], c.x >= b && c.x <= k && d.push(c);
                return d
            }, _checkPointerOverErrorBar: function (a, b, k) {
                var c = this.components.data,
                    d = c[a], f, e, g, u, l, n, m;
                if (d && (d = d.errorBar)) for (g = d && d.length; g--;) for (u = (e = d[g]) && e.length; u--;) if (e[u] && e[u]._xPos && (f = e[u]._xPos, l = e[u]._yPos, n = e[u]._height, m = e[u]._width, f = b >= f && b <= f + m && k >= l && k <= l + n)) return {
                    pointIndex: a,
                    hovered: f,
                    pointObj: c[a]
                }
            }, _checkPointerOverColumn: function (a, b, k) {
                var c = this.chart.config, d = c.plotborderthickness, f = c.showplotborder, e = this.components.data,
                    g = e[a], u = c.viewPortConfig, l = u.x, n = u.scaleX, u = c.dragTolerance || 0;
                if (g && (c = g.config.setValue, d = f ? d : 0, f = d / 2, f = 0 === f % 2 ? f + 1 : Math.round(f),
                null !== c && (b = b - (g._xPos - l * n) + f, k = k - g._yPos + f + (0 < c ? u : 0), d = 0 <= b && b <= g._width + d && 0 <= k && k <= g._height + d + (0 < c ? 0 : u)))) return {
                    pointIndex: a,
                    hovered: d,
                    pointObj: e[a]
                }
            }, _firePlotEvent: function (a, b, c) {
                var d = this.config.plotType;
                if (d === E) return this.__base__._firePlotEvent.call(this, a, b, c);
                if (d === D) return J.get("component", ["dataset", "column"]).prototype._firePlotEvent.call(this, a, b, c)
            }, _rolloverResponseSetter: function (a, b, c) {
                var d = this.graphics.sharedAnchor, d = b.graphics.element || d.element;
                a.graphics.rollOverBand.transform("t" +
                    (b._xPos + (b._width || 0) / 2) + ",0").show();
                T.call(d, a, c, "DataPlotRollOver")
            }, _rolloutResponseSetter: function (a, b, c) {
                var d = this.graphics.sharedAnchor;
                b = b.graphics.element || d.element;
                a.graphics.rollOverBand.hide();
                T.call(b, a, c, "DataPlotRollOut")
            }, _removeDataVisuals: function (a) {
                var b = this.components.pool || (this.components.pool = {}), c, d, f, e, g;
                a.graphics && (a = a.graphics);
                for (d in a) {
                    c = b[d] || (b[d] = []);
                    f = a[d];
                    if (f instanceof Array) for (e = 0, g = f.length; e < g; e++) this._removeDataVisuals(f[e]); else f.hide && "function" ===
                    typeof f.hide && f.hide();
                    c.push(a[d])
                }
            }, _drawCandlestickBar: function () {
                var a = this.chart, c = a.components, d, f = this.config, e = this.components.data, g = e.length,
                    p = c.xAxis[0], G = this.yAxis, u = a.graphics, c = c.paper, l = f.numColumns || 1,
                    n = f.columnPosition || 0, m = p.getPVR(), r = f.groupPadding, w = f.maxColWidth,
                    m = (1 - .01 * f.plotspacepercent) * m || ka(m * (1 - 2 * r), w * l), l = m / l * n - m / 2,
                    u = u.datasetGroup, v, E, B, D, K, n = a.get(L, A) || {}, m = n.duration, r = n.dummyObj,
                    w = n.animObj, V = this.graphics.container, U = this.components.pool || {};
                d = this.visible;
                var H,
                    P, I, Z = this.components.removeDataArr || [], T = Z.lengt, Q;
                V || (V = this.graphics.container = c.group(F, u), d || V.hide());
                for (v = 0; v < g; v += 1) E = e[v], d = E.config, Q = E.graphics, D = d.y, null !== D && (B = y(d.x, v), E = d.link, d.setLink = d.link, B = p.getAxisPosition(B), K = d.previousY, K = G.getAxisPosition(K), D = G.getAxisPosition(D), H = G.getAxisPosition(d.high), P = G.getAxisPosition(d.low), N(D - K), I = l, K = ["M", B, P, "L", B, H, "M", B, D, "L", B + I, D, "M", B, K, "L", B - I, K], B = Q.element, B || (U.element && U.element.length ? Q.element = c.path(u) : B = Q.element = c.path(K, V)),
                    B.show().animateWith(r, w, {path: K}, m, n.animType), a.config.plotAnimDone = !0, B.attr({
                    fill: C(d.color),
                    stroke: C(d.borderColor),
                    "stroke-width": f.linethickness,
                    "stroke-dasharray": d.dashStyle,
                    "stroke-linecap": b,
                    "stroke-linejoin": b,
                    "shape-rendering": "crisp",
                    cursor: E ? "pointer" : W,
                    visibility: z
                }).shadow(d.shadow));
                for (v = 0; v < T; v++) this._removeDataVisuals(Z.shift())
            }, _drawErrorValue: function () {
                var a = this.config, c = this.JSONData.data, c = c && c.length, d;
                d = this.visible;
                var e = this.chart, g = e.components.paper, x = e.components.yAxis[0],
                    p = this.components.data, G, u = a.errorBarWidthPercent, l, n = e.graphics, m = n.datasetGroup,
                    a = a.showTooltip, r = this.graphics.errorGroupContainer, w = this.graphics.errorTrackerContainer,
                    z = n.trackerGroup, v, y, E, B, C, D, V, e = e.get(L, A), n = e.duration, F = e.dummyObj,
                    U = e.animObj, H, I, Z, Q;
                v = this.drawn;
                var T, M = this.components.pool || [], R;
                r || (r = this.graphics.errorGroupContainer = g.group(f, m), d || r.hide());
                w || (w = this.graphics.errorTrackerContainer = g.group(K, z).toBack(), d || w.hide());
                d && (r.show(), w.show());
                n && !v && r.hide();
                for (d = 0; d <
                c; d++) if (v = (m = p[d]) && m.config, B = v.y, w = v.errorValue, z = w.length, !m.graphics.error && (m.graphics.error = []), null !== B) {
                    v = v.setLink;
                    B = 0 > B;
                    y = m._xPos;
                    E = m._yPos;
                    Q = m._width;
                    R = m._height;
                    E += R;
                    y += Q / 2;
                    G = m.graphics.error;
                    l = G.length;
                    if (l > z) for (Z = z; Z < l; Z++) I = G.pop(), this._removeDataVisuals(I);
                    for (m.errorBar || (m.errorBar = []); z--;) (T = m.graphics.error[z]) || (T = m.graphics.error[z] = {}), Z = T.errorLineElem, H = w[z], C = H.errorValue, D = H.errorStartValue, l = H.errorBarColor, G = H.errorBarThickness, I = isNaN(D) ? E : x.getAxisPosition(D), V =
                        u / 100 * Q, V /= 2, C = x.getAxisPosition((void 0 !== D && null !== D ? D : void 0) + C), B && (C += R), C = P(C) + G % 2 / 2, D = P(y) + G % 2 / 2, V = ["M", D, I, "V", C, "M", D - V, C, "H", D + V], H.errorPath = V, H = m.graphics.hotElement || m.graphics.element, H.data("groupId"), m.errorBar[z] || (m.errorBar[z] = []), m.errorBar[z][0] = {
                        _xPos: D - 2,
                        _yPos: C < I ? C : I,
                        _height: N(I - C),
                        _width: 4
                    }, Z || (Z = M.errorLineElem && M.errorLineElem.length ? T.errorLineElem = M.errorLineElem.shift() : T.errorLineElem = g.path(r)), Z.show().animateWith(F, U, {path: V}, n, e.animType), Z.attr({
                        stroke: l, ishot: !a,
                        "stroke-width": G, cursor: v ? "pointer" : W, "stroke-linecap": b
                    })
                }
                this.components.data = p
            }, getDataLimits: function () {
                var a = this.config;
                return {max: a.yMax, min: a.yMin, xMax: a.xMax, xMin: a.xMin}
            }, removeData: function (a, b) {
                var c = this.components, d = c.data, f = c.removeDataArr || (c.removeDataArr = []);
                c.removeDataArr = f.concat(d.splice(a || 0, b || 1))
            }
        }, E])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-trendset", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.configStr, e = c.animationObjStr, ba = c.miterStr, W = c.ROUND,
            S = c.line, I = a.pluck, B = a.getValidValue, X = a.pluckNumber, M = a.getFirstValue, R = a.getDashStyle,
            r = a.toRaphaelColor, c = Math, D = c.min, v = c.max, A = a.getFirstColor, F = a.HUNDREDSTRING;
        J.register("component", ["dataset", "Trendset", {
            configure: function () {
                var a = this.chart, c = a.jsonData.chart, e = this.JSONData, r = this.index, n = e.data || e.set || [],
                    b = this.config, z, f = this.components.data, E, V = -Infinity, m = Infinity, F, M = -Infinity,
                    L = Infinity, w = a.components.numberFormatter, r = A(I(e.color, c.trendsetcolor, "666666"));
                E = I(e.alpha, c.trendsetalpha,
                    "100");
                F = X(e.thickness, c.trendsetthickness, 2);
                z = !!X(e.dashed, c.trendsetdashed, 0);
                var U = X(e.dashlen, c.trendsetdashlen, 4), g = X(e.dashgap, c.trendsetdashgap, 4);
                b.includeInLegend = X(e.includeinlegend, 1);
                b.lineColor = r;
                b.lineAlpha = E;
                b.connectNullData = X(c.connectnulldata, 0);
                b.lineThickness = F;
                b.lineDashStyle = z ? R(U, g) : "none";
                b.name = B(e.name);
                b.includeInLegend = X(e.includeinlegend, 1);
                f || (f = this.components.data = []);
                r = 0;
                for (F = n.length; r < F; r += 1) (z = n[r]) && !z.vline && (e = f[r] = f[r] || (f[r] = {}), E = e.config = e.config || (e.config =
                    {}), c = E.setValue = w.getCleanValue(z.value), z = w.getCleanValue(z.x), z = E.x = null !== z ? z : r + 1, V = v(V, c), m = D(m, c), L = D(L, z), M = v(M, z), e.graphics || (e.graphics = {}));
                b.max = V;
                b.min = m;
                b.xMax = M;
                b.xMin = L;
                this.yAxis = a.components.yAxis[0];
                this.visible = !0;
                this._addLegend()
            }, _addLegend: function () {
                var a = this.JSONData, c = this.config, e = this.chart.components.legend, a = {
                    enabled: c.includeInLegend,
                    interactiveLegend: !1,
                    type: this.type,
                    drawLine: !0,
                    strokeColor: r({color: c.lineColor, alpha: F}),
                    label: M(a.name)
                };
                this.legendItemId = e.addItems(this,
                    this.legendInteractivity, a)
            }, legendInteractivity: function () {
            }, draw: function () {
                var a = this.chart, c = a.components, v = this.config, B = c.canvas.config.clip,
                    n = this.components.data.length, b, z = c.paper, c = c.xAxis[0], f = this.yAxis, A, D,
                    m = a.graphics, F = a.get(E, e), a = F.duration, I = F.dummyObj, L = F.animObj, F = F.animType,
                    w = this.components.data, U, g = v.lineThickness, y = this.graphics.container, P = m.datasetGroup,
                    m = v.shadow, M = function () {
                        P.line.attr({"clip-rect": null});
                        y.lineShadowGroup.show()
                    }, d = B["clip-canvas"].slice(0), B = B["clip-canvas-init"].slice(0),
                    N = v.lineDashStyle, v = {color: v.lineColor, alpha: v.lineAlpha}, T = !1,
                    h = this.graphics.lineElement, q = this.visible;
                P.line = P.line || z.group(S, P);
                P.lineConnector = P.lineConnector || z.group("line-connector", P);
                y || (y = this.graphics.container = {
                    lineShadowGroup: z.group("connector-shadow", P.line),
                    lineGroup: z.group(S, P.line)
                }, q || (y.lineShadowGroup.hide(), y.lineGroup.hide()));
                for (b = 0; b < n; b++) U = w[b], A = U.config, D = A.setValue, A = A.x, A = c.getAxisPosition(A), D = f.getAxisPosition(D), U._xPos = A, U._yPos = D;
                n = this.getLinePath(w, {}).getPathArr();
                h || (h = this.graphics.lineElement = z.path(y.lineGroup), T = !0);
                h.show().animateWith(I, L, {path: n}, a, F);
                h.attr({
                    "stroke-dasharray": N,
                    "stroke-width": g,
                    stroke: r(v),
                    "stroke-linecap": W,
                    "stroke-linejoin": 2 <= g ? W : ba
                }).shadow(m, y.lineShadowGroup);
                a && q && T && (y.lineShadowGroup.hide(), P.line.attr({"clip-rect": B}).animateWith(I, L, {"clip-rect": d}, a, F, M))
            }, getDataLimits: function () {
                var a = this.config;
                return {max: a.max, min: a.min, xMax: a.xMax, xMin: a.xMin}
            }
        }, S])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-boxandwhisker2d",
        function () {
            var a = this.hcLib, c = a.preDefStr, E = c.colors.c000000, e = c.configStr, ba = c.animationObjStr,
                W = c.showHoverEffectStr, S = c.shadowStr, I = c.dataLabelStr, B = c.visibleStr, X = c.ROUND,
                M = a.ZEROSTRING, R = c.pStr, r = c.sStr, D = c.POSITION_START, v = c.POSITION_TOP, A = c.POSITION_END,
                F = c.POSITION_BOTTOM, l = c.PLOTFILLCOLOR_STR, C = c.UNDERSCORE, H = c.line, Q = a.BLANKSTRING,
                n = a.BLANKSTRING, b = a.pluck, z = a.getValidValue, f = a.pluckNumber, K = a.getFirstValue,
                V = a.extend2, m = a.toRaphaelColor, Z = function (a) {
                    return void 0 !== a && null !== a
                }, ga = a.parseConfiguration,
                c = Math, L = c.round, w = c.min, U = c.max, g = a.getFirstColor, y = a.getFirstAlpha,
                P = a.graphics.getLightColor, ka = a.graphics.convertColor, d = a.POSITION_LEFT, N = a.COMMASTRING,
                T = a.HUNDREDSTRING, h = a.plotEventHandler;
            J.register("component", ["dataset", "boxandwhisker2d", {
                type: "boxandwhisker2d", configure: function () {
                    var c = this.chart, d = this.config, e = this.JSONData, h = e.data, x = c.config.categories,
                        p = c.singleseries, G = c.config, u = w(x && x.length, h && h.length), l = c.jsonData.chart,
                        v = c.components.colorManager, E = this.index || this.positionIndex,
                        aa, A = d.plotColor = v.getPlotColor(E), B = f(e.dashed, l.plotborderdashed),
                        D = f(l.useplotgradientcolor, 1), C, K = a.parseUnsafeString, V = K(l.yaxisname),
                        L = K(l.xaxisname), F = K(b(l.tooltipsepchar, ": ")), I = a.parseTooltext, H, Z, M, Q, W, S, X,
                        J, ba, wa, oa, qa, la, ia, ea, sa, fa, ha, ca, Aa, ya, Y, ua, xa, za, Ga, Ma, ra, Ba, Ua, Ja,
                        ja, xb, eb, Qb, Db, Kb, pb, hb, Eb, Fb, Lb, ib = a.getDashStyle, qb = this.components.data,
                        Ka = c.components.numberFormatter, Xb, Mb, $a, Pb, yb, nb, Sa, Wa = 0, ob = 0,
                        Jb = a.BoxAndWhiskerStatisticalCalc, cb, Gb, jb, kb, zb, rb, Oa, fb, tb, Pa, sb, ab, na, Yb,
                        Ha, lb, mb, bb, Hb, Ca, Za, Rb, Sb, Nb, Ob, Ya, Ib, gb = 0, ub;
                    this.visible = 1 === f(this.JSONData.visible, !Number(this.JSONData.initiallyhidden), 1);
                    this.__setDefaultConfig();
                    ga(e, d, G, {data: !0});
                    d.includeInLegend = f(e.includeinlegend, 1);
                    d.legendSymbolColor = d.plotColor;
                    aa = d.showplotborder;
                    X = d.plotborderdashlen;
                    J = d.plotborderdashgap;
                    la = d.plotfillalpha;
                    wa = d.useroundedges;
                    ia = d.ratio;
                    ba = d.plotborderthickness;
                    bb = d.showvalues;
                    C = d.showtooltip;
                    d.rotatevalues && (d.rotatevalues = 270);
                    Hb = d.showalloutliers;
                    d.plotfillAngle = qa = f(360 -
                        l.plotfillangle, 90);
                    d.plotColor = A = b(e.color, A);
                    d.plotRadius = f(l.useroundedges, wa ? 1 : 0);
                    d.plotgradientcolor = ea = a.getDefinedColor(l.plotgradientcolor, v.getColor("plotGradientColor"));
                    !D && (ea = n);
                    d.plotBorderAlpha = sa = aa ? b(l.plotborderalpha, la, T) : 0;
                    d.plotBorderColor = fa = b(l.plotbordercolor, v.getColor("plotBorderColor"));
                    d.plotBorderDashStyle = ha = B ? ib(X, J, ba) : "none";
                    d.showShadow = wa ? f(l.showshadow, 1) : f(l.showshadow, v.getColor("showShadow"));
                    d.showHoverEffect = oa = f(l.plothovereffect, l.showhovereffect, void 0);
                    d.definedGroupPadding = U(f(l.plotspacepercent), 0);
                    d.plotSpacePercent = U(f(l.plotspacepercent, 20) % 100, 0);
                    d.parentYAxis = $a = b(e.parentyaxis && e.parentyaxis.toLowerCase(), R) === r ? 1 : 0;
                    d.dataSeparator = N;
                    d.bwCalc = cb = new Jb(void 0, Ka, d.dataSeparator);
                    d.textDirection = "1" === l.hasrtltext ? "rtl" : n;
                    d.showMeanLegend = d.showSDLegend = d.showMDLegend = d.showQDLegend = d.showOutliersLegend = 0;
                    !this.components.data && (this.components.data = []);
                    qb = this.components.data;
                    for (Sa = 0; Sa < u; Sa++) if (ca = h && h[Sa], Y = (ya = qb[Sa]) && ya.config, ya ||
                    (ya = qb[Sa] = {graphics: {}}), ya.config || (Y = qb[Sa].config = {}), ca.value) {
                        ca.value && (cb.setArray(ca.value), Gb = cb.getQuartiles(), jb = Gb.q1, kb = Gb.q3, zb = cb.getMinMax(), Y.min = rb = zb.min, Y.max = Oa = zb.max, fb = cb.getMedian(), Y.mean = tb = cb.getMean(), Y.md = Pa = cb.getMD(), Y.sd = sb = cb.getSD(), Y.qd = ab = cb.getQD());
                        ca.outliers && (Y.outliers = ca.outliers.split(","), gb = U(gb, Y.outliers.length));
                        Y.showMean = Rb = f(ca.showmean, d.showmean);
                        Y.showSD = Sb = f(ca.showsd, d.showsd);
                        Y.showMD = Nb = f(ca.showmd, d.showmd);
                        Y.showQD = Ob = f(ca.showqd, d.showqd);
                        ca.outliers && (d.showOutliersLegend = 1);
                        Rb && (d.showMeanLegend = 1);
                        Sb && (d.showSDLegend = 1);
                        Nb && (d.showMDLegend = 1);
                        Ob && (d.showQDLegend = 1);
                        Y.upperQuartile = {
                            value: kb,
                            color: ka(b(ca.upperquartilecolor, e.upperquartilecolor, l.upperquartilecolor, l.plotbordercolor, v.getColor("plotBorderColor")), f(ca.upperquartilealpha, e.upperquartilealpha, l.upperquartilealpha, l.plotborderalpha, 100)),
                            borderWidth: f(ca.upperquartilethickness, e.upperquartilethickness, l.upperquartilethickness, l.plotborderthickness, wa ? 0 : 1),
                            displayValue: Ka.dataLabels(kb)
                        };
                        Y.lowerQuartile = {
                            value: jb,
                            color: ka(b(ca.lowerquartilecolor, e.lowerquartilecolor, l.lowerquartilecolor, l.plotbordercolor, v.getColor("plotBorderColor")), f(ca.lowerquartilealpha, e.lowerquartilealpha, l.lowerquartilealpha, l.plotborderalpha, 100)),
                            borderWidth: f(ca.lowerquartilethickness, e.lowerquartilethickness, l.lowerquartilethickness, l.plotborderthickness, wa ? 0 : 1),
                            displayValue: Ka.dataLabels(jb)
                        };
                        Y.upperBoxBorder = {
                            color: ka(b(ca.upperboxbordercolor, e.upperboxbordercolor, l.upperboxbordercolor, l.plotbordercolor,
                                v.getColor("plotBorderColor")), f(ca.upperboxborderalpha, e.upperboxborderalpha, l.upperboxborderalpha, l.plotborderalpha, 100)),
                            borderWidth: f(ca.upperboxborderthickness, e.upperboxborderthickness, l.upperboxborderthickness, !wa && l.plotborderthickness, wa ? 0 : 1)
                        };
                        Y.lowerBoxBorder = {
                            color: ka(b(ca.lowerboxbordercolor, e.lowerboxbordercolor, l.lowerboxbordercolor, l.plotbordercolor, v.getColor("plotBorderColor")), f(ca.lowerboxborderalpha, e.lowerboxborderalpha, l.lowerboxborderalpha, l.plotborderalpha, 100)),
                            borderWidth: f(ca.lowerboxborderthickness,
                                e.lowerboxborderthickness, l.lowerboxborderthickness, !wa && l.plotborderthickness, wa ? 0 : 1)
                        };
                        Y.median = {
                            value: fb,
                            color: ka(b(ca.mediancolor, e.mediancolor, l.mediancolor, l.plotbordercolor, v.getColor("plotBorderColor")), f(ca.medianalpha, e.medianalpha, l.medianalpha, l.plotborderalpha, 100)),
                            borderWidth: f(ca.medianthickness, e.medianthickness, l.medianthickness, l.plotborderthickness, 1),
                            displayValue: Ka.dataLabels(fb)
                        };
                        d.upperBoxColor = na = b(ca.upperboxcolor, e.upperboxcolor, l.upperboxcolor, v.getPlotColor(2 * E));
                        Yb = d.upperBoxAlpha =
                            b(ca.upperboxalpha, e.upperboxalpha, l.upperboxalpha, la, T);
                        d.lowerBoxColor = Ha = b(ca.lowerboxcolor, e.lowerboxcolor, l.lowerboxcolor, v.getPlotColor(2 * E + 1));
                        lb = d.lowerBoxAlpha = b(ca.lowerboxalpha, e.lowerboxalpha, l.lowerboxalpha, la, T);
                        Y.upperColorArr = a.graphics.getColumnColor(na, Yb, void 0, void 0, wa, fa, sa.toString(), 0, !1);
                        Y.lowerColorArr = a.graphics.getColumnColor(Ha, lb, void 0, void 0, wa, fa, sa.toString(), 0, !1);
                        Y.showMinValues = bb ? f(ca.showminvalues, d.showminvalues) : 0;
                        Y.showMaxValues = bb ? f(ca.showmaxvalues, d.showmaxvalues) :
                            0;
                        Y.showQ1Values = bb ? f(ca.showq1values, d.showq1values) : 0;
                        Y.showQ3Values = bb ? f(ca.showq3values, d.showq3values) : 0;
                        Y.showMedianValues = bb ? f(ca.showmedianvalues, d.showmedianvalues) : 0;
                        Y.upperWhiskerAlpha = mb = y(b(ca.upperwhiskeralpha, e.upperwhiskeralpha, l.upperwhiskeralpha, l.plotborderalpha, 100));
                        Y.upperWhiskerColor = ka(g(b(ca.upperwhiskercolor, e.upperwhiskercolor, l.upperwhiskercolor, l.plotbordercolor, v.getColor("plotBorderColor"))), mb);
                        Y.upperWhiskerThickness = f(ca.upperwhiskerthickness, e.upperwhiskerthickness,
                            l.upperwhiskerthickness, l.plotborderthickness, 1);
                        Y.upperWhiskerShadowOpacity = d.showShadow ? mb / 250 : 0;
                        Y.lowerWhiskerAlpha = Za = y(b(ca.lowerwhiskeralpha, e.lowerwhiskeralpha, l.lowerwhiskeralpha, l.plotborderalpha, 100));
                        Y.lowerWhiskerColor = ka(g(b(ca.lowerwhiskercolor, e.lowerwhiskercolor, l.lowerwhiskercolor, l.plotbordercolor, v.getColor("plotBorderColor"))), Za);
                        Y.lowerWhiskerThickness = f(ca.lowerwhiskerthickness, e.lowerwhiskerthickness, l.lowerwhiskerthickness, l.plotborderthickness, 1);
                        Y.lowerWhiskerShadowOpacity =
                            d.showShadow ? Za / 250 : 0;
                        Y.showValue = f(ca.showvalue, d.showvalues);
                        Y.setValue = Aa = Ka.getCleanValue(ca.value);
                        Y.setLink = b(ca.link);
                        Y.toolTipValue = Xb = Ka.dataLabels(Aa, $a);
                        Y.setDisplayValue = Mb = K(ca.displayvalue);
                        Y.displayValue = b(Mb, Xb);
                        Pb = f(ca.dashed);
                        yb = f(ca.dashlen, X);
                        nb = J = f(ca.dashgap, J);
                        Wa = U(Wa, Oa);
                        ob = w(ob, rb);
                        if (Hb && ca.outliers) for (ub = 0; ub < Y.outliers.length; ub++) Wa = U(Wa, Y.outliers[ub]), ob = w(ob, Y.outliers[ub]);
                        Y.plotBorderDashStyle = 1 === Pb ? ib(yb, nb, ba) : 0 === Pb ? "none" : ha;
                        p ? (A = v.getPlotColor(Sa), A = b(ca.color,
                            A), ia = b(ca.ratio, d.ratio)) : A = b(ca.color, d.plotColor);
                        la = b(ca.alpha, d.plotfillalpha);
                        0 > Aa && !wa && (W = qa, qa = 360 - qa);
                        Y.colorArr = a.graphics.getColumnColor(A + "," + ea, la, ia, qa, wa, fa, sa.toString(), 0, !1);
                        Y.label = ua = z(K(b(x[Sa].tooltext, x[Sa].label)));
                        0 !== oa && (xa = b(ca.upperboxhovercolor, e.upperboxhovercolor, l.upperboxhovercolor, na), za = b(ca.upperboxhoveralpha, e.upperboxhoveralpha, l.upperboxhoveralpha, Yb), Ga = b(ca.upperboxborderhovercolor, e.upperboxborderhovercolor, l.upperboxborderhovercolor, ca.upperboxbordercolor,
                            e.upperboxbordercolor, l.upperboxbordercolor, l.plotbordercolor, v.getColor("plotBorderColor")), Ma = b(ca.upperboxborderhoveralpha, e.upperboxborderhoveralpha, l.upperboxborderhoveralpha, ca.upperboxborderalpha, e.upperboxborderalpha, l.upperboxborderalpha, l.plotborderalpha, 100), ra = wa ? 0 : b(ca.upperboxborderhoverthickness, e.upperboxborderhoverthickness, l.upperboxborderhoverthickness, Y.upperBoxBorder.borderWidth), Ba = b(ca.lowerboxhovercolor, e.lowerboxhovercolor, l.lowerboxhovercolor, Ha), Ua = b(ca.lowerboxhoveralpha,
                            e.lowerboxhoveralpha, l.lowerboxhoveralpha, lb), Ja = b(ca.lowerboxborderhovercolor, e.lowerboxborderhovercolor, l.lowerboxborderhovercolor, ca.lowerboxbordercolor, e.lowerboxbordercolor, l.lowerboxbordercolor, l.plotbordercolor, v.getColor("plotBorderColor")), ja = b(ca.lowerboxborderhoveralpha, e.lowerboxborderhoveralpha, l.lowerboxborderhoveralpha, ca.lowerboxborderalpha, e.lowerboxborderalpha, l.lowerboxborderalpha, l.plotborderalpha, 100), xb = wa ? 0 : b(ca.lowerboxborderhoverthickness, e.lowerboxborderhoverthickness, l.lowerboxborderhoverthickness,
                            Y.lowerBoxBorder.borderWidth), eb = b(ca.upperquartilehovercolor, e.upperquartilehovercolor, l.upperquartilehovercolor, ca.upperquartilecolor, e.upperquartilecolor, l.upperquartilecolor, l.plotbordercolor, v.getColor("plotBorderColor")), Qb = b(ca.upperquartilehoveralpha, e.upperquartilehoveralpha, l.upperquartilehoveralpha, ca.upperquartilealpha, e.upperquartilealpha, l.upperquartilealpha, l.plotborderalpha, 100), Db = b(ca.upperquartilehoverthickness, e.upperquartilehoverthickness, l.upperquartilehoverthickness, Y.upperQuartile.borderWidth),
                            Kb = b(ca.lowerquartilehovercolor, e.lowerquartilehovercolor, l.lowerquartilehovercolor, ca.lowerquartilecolor, e.lowerquartilecolor, l.lowerquartilecolor, l.plotbordercolor, v.getColor("plotBorderColor")), pb = b(ca.lowerquartilehoveralpha, e.lowerquartilehoveralpha, l.lowerquartilehoveralpha, ca.lowerquartilealpha, e.lowerquartilealpha, l.lowerquartilealpha, l.plotborderalpha, 100), hb = b(ca.lowerquartilehoverthickness, e.lowerquartilehoverthickness, l.lowerquartilehoverthickness, Y.lowerQuartile.borderWidth), Eb = b(ca.medianhovercolor,
                            e.medianhovercolor, l.medianhovercolor, ca.mediancolor, e.mediancolor, l.mediancolor, l.plotbordercolor, v.getColor("plotBorderColor")), Fb = b(ca.medianhoveralpha, e.medianhoveralpha, l.medianhoveralpha, ca.medianalpha, e.medianalpha, l.medianalpha, l.plotborderalpha, 100), Lb = b(ca.medianhoverthickness, e.medianhoverthickness, l.medianhoverthickness, Y.median.borderWidth), 1 == oa && (na === xa && (xa = P(xa, 70)), Ha === Ba && (Ba = P(Ba, 70))), Y.upperBoxHoverColorArr = a.graphics.getColumnColor(xa, za, void 0, void 0, wa, fa, sa.toString(),
                            0, !1), Y.lowerBoxHoverColorArr = a.graphics.getColumnColor(Ba, Ua, void 0, void 0, wa, fa, sa.toString(), 0, !1), Y.setUpperBoxRolloutAttr = {fill: m(Y.upperColorArr[0])}, Y.setUpperBoxRolloverAttr = {fill: m(Y.upperBoxHoverColorArr[0])}, Y.setLowerBoxRolloutAttr = {fill: m(Y.lowerColorArr[0])}, Y.setLowerBoxRolloverAttr = {fill: m(Y.lowerBoxHoverColorArr[0])}, Y.setUpperBoxBorderRolloverAttr = {
                            stroke: ka(Ga, Ma),
                            "stroke-width": ra
                        }, Y.setUpperBoxBorderRolloutAttr = {
                            stroke: Y.upperBoxBorder.color,
                            "stroke-width": Y.upperBoxBorder.borderWidth
                        },
                            Y.setLowerBoxBorderRolloverAttr = {
                                stroke: ka(Ja, ja),
                                "stroke-width": xb
                            }, Y.setLowerBoxBorderRolloutAttr = {
                            stroke: Y.lowerBoxBorder.color,
                            "stroke-width": Y.lowerBoxBorder.borderWidth
                        }, Y.setUpperQuartileRolloverAttr = {
                            stroke: ka(eb, Qb),
                            "stroke-width": Db
                        }, Y.setUpperQuartileRolloutAttr = {
                            stroke: Y.upperQuartile.color,
                            "stroke-width": Y.upperQuartile.borderWidth
                        }, Y.setLowerQuartileRolloverAttr = {
                            stroke: ka(Kb, pb),
                            "stroke-width": hb
                        }, Y.setLowerQuartileRolloutAttr = {
                            stroke: Y.lowerQuartile.color,
                            "stroke-width": Y.lowerQuartile.borderWidth
                        },
                            Y.setMedianRolloverAttr = {
                                stroke: ka(Eb, Fb),
                                "stroke-width": Lb
                            }, Y.setMedianRolloutAttr = {stroke: Y.median.color, "stroke-width": Y.median.borderWidth});
                        H = Y.toolTipValue;
                        M = z(K(b(ca.tooltext, e.plottooltext, l.plottooltext)));
                        C ? null === H ? S = !1 : void 0 !== M ? (Q = [1, 2, 3, 4, 5, 6, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], Z = {
                            maxValue: Oa,
                            maxDataValue: Ka.dataLabels(Oa),
                            minValue: rb,
                            minDataValue: Ka.dataLabels(rb),
                            Q1: Ka.dataLabels(jb),
                            unformattedQ1: jb,
                            Q3: Ka.dataLabels(kb),
                            unformattedQ3: kb,
                            median: Ka.dataLabels(fb),
                            unformattedMedian: fb,
                            SD: Ka.dataLabels(sb),
                            unformattedsd: sb,
                            QD: Ka.dataLabels(ab),
                            unformattedQD: ab,
                            MD: Ka.dataLabels(Pa),
                            unformattedMD: Pa,
                            mean: Ka.dataLabels(tb),
                            unformattedMean: tb,
                            label: ua,
                            yaxisName: V,
                            xaxisName: L,
                            formattedValue: H,
                            value: ua
                        }, S = I(M, Q, Z, ca, l, e)) : S = "<b>Maximum" + F + "</b>" + Ka.dataLabels(Oa) + "<br /><b>Q3" + F + "</b>" + Ka.dataLabels(kb) + "<br /><b>Median" + F + "</b>" + Ka.dataLabels(fb) + "<br /><b>Q1" + F + "</b>" + Ka.dataLabels(jb) + "<br /><b>Minimum" + F + "</b>" + Ka.dataLabels(rb) : S = !1;
                        Y.toolText = S;
                        Y.setTooltext =
                            S;
                        W && (qa = W)
                    }
                    d.maxNumberOfOutliers = gb;
                    d.maxValue = Wa;
                    d.minValue = ob;
                    Hb || (Ca = Wa - ob, d.maxValue += d.outliersupperrangeratio * Ca, d.minValue -= d.outlierslowerrangeratio * Ca);
                    !1 !== c.hasLegend && this._addLegend();
                    this.subDS = 0;
                    this.components.mean = this._createSubDS(0, "Mean");
                    d.showMeanLegend && this._addLegendSubDS(this.components.mean);
                    d.showMeanLegend && (this.subDS += 1);
                    this.components.sd = this._createSubDS(1, "SD");
                    d.showSDLegend && this._addLegendSubDS(this.components.sd);
                    d.showSDLegend && (this.subDS += 1);
                    this.components.md =
                        this._createSubDS(2, "MD");
                    d.showMDLegend && this._addLegendSubDS(this.components.md);
                    d.showMDLegend && (this.subDS += 1);
                    this.components.qd = this._createSubDS(3, "QD");
                    d.showQDLegend && this._addLegendSubDS(this.components.qd);
                    d.showQDLegend && (this.subDS += 1);
                    !this.components.outliers && (this.components.outliers = []);
                    Ib = this.config.maxNumberOfOutliers || this.components.outliers.length;
                    for (Sa = 0; Sa < Ib; Sa++) Ya = this._createSubDS(4 + Sa, "Outliers", Sa), this.components.outliers[Sa] = Ya;
                    d.showOutliersLegend && this._addLegendOutliers(this.components.outliers);
                    d.showOutliersLegend && (this.subDS += 1)
                }, _createSubDS: function (a, b, d) {
                    var c = this.chart, f = c.jsonData.dataset, e = f && f.length, g = this.components, h, l,
                        f = c.components.legend, m = {}, g = g.dataset || (g.dataset = []),
                        e = e * (a + 1) + this.index;
                    if (g[a]) l = g[a], l.index = e, c = V({}, this.JSONData), l.JSONData = c; else if (h = J.get("component", ["dataset", "subDS"])) void 0 === m.subDS ? m.subDS = 0 : m.subDS++, l = new h, l.chart = c, l.index = e, g.push(l), c = V({}, this.JSONData), this.initSubDataset(c, l), l.name = b;
                    switch (a) {
                        case 0:
                            this.configureMean(l);
                            !this.config.showMeanLegend &&
                            f.removeItem(l.legendItemId);
                            break;
                        case 1:
                            this.configureSD(l);
                            !this.config.showQDLegend && f.removeItem(l.legendItemId);
                            break;
                        case 2:
                            this.configureMD(l);
                            !this.config.showMDLegend && f.removeItem(l.legendItemId);
                            break;
                        case 3:
                            this.configureQD(l);
                            !this.config.showQDLegend && f.removeItem(l.legendItemId);
                            break;
                        default:
                            this.configureOutliers(l, d), !this.config.showOutliersLegend && f.removeItem(this.components.outliers.legendItemId)
                    }
                    return l
                }, configureMean: function (d) {
                    var c = d.chart, e = c.components, g = a.parseUnsafeString,
                        x = d.config, p = d.JSONData, h = c.jsonData.chart, u = e.colorManager,
                        m = d.index || d.stackIndex, n = d.type,
                        v = !c.singleseries || z(h.palettecolors) ? u.getPlotColor(m) : u.getColor(l).split(/\s*\,\s*/)[0],
                        m = p.data, y, A = c.config.categories, A = w(A && A.length, m && m.length),
                        B = e.numberFormatter, D = c.use3dlineshift, C, K = -Infinity, V = Infinity, L, F,
                        I = b(h.tooltipsepchar, ": "), P = f(p.dashed, h.linedashed);
                    F = c.isStacked;
                    y = c.hasLineSet;
                    e = e.xAxis[0];
                    d.visible = 1 === f(d.JSONData.visible, !Number(d.JSONData.initiallyhidden), 1);
                    x.use3dlineshift =
                        void 0 !== D ? f(h.use3dlineshift, D) : 1;
                    x.plotColor = v;
                    x.legendSymbolColor = x.plotColor;
                    c = f(c.defaultPlotShadow, u.getColor("showShadow"));
                    x.drawFullAreaBorder = f(h.drawfullareaborder, 1);
                    x.parentYAxis = y ? L = 1 : L = b(p.parentyaxis && p.parentyaxis.toLowerCase(), R) === r ? 1 : 0;
                    x.connectNullData = f(h.connectnulldata, 0);
                    x.enableAnimation = u = f(h.animation, h.defaultanimation, 1);
                    x.animation = u ? {duration: 1E3 * f(h.animationduration, 1)} : !1;
                    x.transposeanimation = f(h.transposeanimation, u);
                    x.transposeanimduration = 1E3 * f(h.transposeanimduration,
                        .2);
                    x.showValues = 0;
                    x.valuePadding = f(h.valuepadding, 2);
                    x.valuePosition = b(p.valueposition, h.valueposition, "auto");
                    x.stack100Percent = u = f(h.stack100percent, 0);
                    x.showPercentValues = f(h.showpercentvalues, F && u ? 1 : 0);
                    x.showPercentInToolTip = f(h.showpercentintooltip, F && u ? 1 : 0);
                    x.showTooltip = f(h.showtooltip, 1);
                    x.seriesNameInTooltip = f(h.seriesnameintooltip, 1);
                    x.showHoverEffect = f(h.plothovereffect, h.anchorhovereffect, h.showhovereffect, void 0);
                    x.rotateValues = f(h.rotatevalues) ? 270 : 0;
                    x.linethickness = f(p.linethickness,
                        h.linethickness, 1);
                    x.lineDashLen = f(p.linedashlen, h.linedashlen, 5);
                    x.lineDashGap = f(p.linedashgap, h.linedashgap, 4);
                    x.drawLine = x.alpha = f(h.drawmeanconnector, p.drawmeanconnector, 0) && 100;
                    F = a.getDashStyle(x.lineDashLen, x.lineDashGap, x.linethickness);
                    x.lineDashStyle = P ? F : "none";
                    x.shadow = {opacity: f(h.showshadow, c) ? n === H ? x.alpha / 100 : x.plotBorderAlpha / 100 : 0};
                    x.drawAnchors = f(p.drawanchors, p.showanchors, h.drawanchors, h.showanchors);
                    x.anchorBgColor = b(p.meaniconcolor, h.meaniconcolor, E);
                    x.anchorBorderColor = E;
                    x.anchorRadius =
                        f(p.meaniconradius, h.meaniconradius, 5);
                    x.anchorAlpha = b(p.alpha, p.meaniconalpha, h.meaniconalpha);
                    x.anchorBgAlpha = b(p.meaniconalpha, h.meaniconalpha, 100);
                    x.anchorBorderThickness = b(p.anchorborderthickness, h.anchorborderthickness, 1);
                    x.anchorSides = b(p.meaniconsides, h.meaniconsides, 3);
                    x.linecolor = x.anchorBgColor;
                    x.minimizeTendency = f(h.minimizetendency, h.minimisetendency, 0);
                    x.anchorImageUrl = b(p.anchorimageurl, h.anchorimageurl);
                    x.anchorImageAlpha = f(p.anchorimagealpha, h.anchorimagealpha, 100);
                    x.anchorImageScale =
                        f(p.anchorimagescale, h.anchorimagescale, 100);
                    x.anchorImagePadding = f(p.anchorimagepadding, h.anchorimagepadding, 1);
                    x.anchorStartAngle = f(p.anchorstartangle, h.anchorstartangle, 90);
                    x.anchorShadow = f(p.anchorshadow, h.anchorshadow, 0);
                    !d.components.data && (d.components.data = []);
                    c = d.components.data;
                    for (v = 0; v < A; v++) y = m && m[v], n = c[v] = c[v] || {}, n.config = n.config || {}, u = n.config, D = this.components.data[v].config, y.value = D.showMean ? D.mean : null, u.x = this.components.data[v]._xPos, u.setValue = D = B.getCleanValue(y.value), u.setLink =
                        b(y.link), u.anchorProps = this._parseAnchorProperties(v, d, "mean"), C = e.getLabel(v), u.label = a.getValidValue(g(b(C.tooltext, C.label, C.name))), u.showValue = 0, u.dashed = f(y.dashed, P), u.color = b(y.color, x.lineColor), u.alpha = b(y.alpha, y.alpha, x.alpha), K = U(K, D), V = w(V, D), u.dashStyle = u.dashed ? F : "none", u.toolTipValue = D = B.dataLabels(D, L), u.setDisplayValue = C = g(y.displayvalue), u.displayValue = b(C, D), u.formatedVal = u.toolTipValue, u.setTooltext = a.getValidValue(g(b(y.tooltext, p.plottooltext, h.plottooltext))), y = b(y.meaniconshape,
                        p.meaniconshape, h.meaniconshape, "polygon"), x.dip = u.dip = "polygon" === y ? 0 : "spoke" === y ? 1 : 0, y = x.showTooltip ? "<b>Mean" + I + "</b>" : !1, u.toolText = y, u.setTooltext = y, n ? n.graphics || (c[v].graphics = {}) : c[v] = {graphics: {}}, u.hoverEffects = {enabled: !1};
                    x.maxValue = K;
                    x.minValue = V
                }, configureSD: function (d) {
                    var c = d.chart, e = c.components, g = a.parseUnsafeString, h = d.config, p = d.JSONData,
                        m = c.jsonData.chart, u = e.colorManager, n = d.index || d.stackIndex, v = d.type,
                        y = !c.singleseries || z(m.palettecolors) ? u.getPlotColor(n) : u.getColor(l).split(/\s*\,\s*/)[0],
                        n = p.data, A, D = c.config.categories, D = w(D && D.length, n && n.length),
                        B = e.numberFormatter, C = c.use3dlineshift, K, V = -Infinity, L = Infinity, F, I,
                        P = b(m.tooltipsepchar, ": "), Z = f(p.dashed, m.linedashed);
                    I = c.isStacked;
                    A = c.hasLineSet;
                    e = e.xAxis[0];
                    d.visible = 1 === f(d.JSONData.visible, !Number(d.JSONData.initiallyhidden), 1);
                    h.use3dlineshift = void 0 !== C ? f(m.use3dlineshift, C) : 1;
                    h.plotColor = y;
                    h.legendSymbolColor = h.plotColor;
                    c = f(c.defaultPlotShadow, u.getColor("showShadow"));
                    h.drawFullAreaBorder = f(m.drawfullareaborder, 1);
                    h.parentYAxis =
                        A ? F = 1 : F = b(p.parentyaxis && p.parentyaxis.toLowerCase(), R) === r ? 1 : 0;
                    h.connectNullData = f(m.connectnulldata, 0);
                    h.enableAnimation = u = f(m.animation, m.defaultanimation, 1);
                    h.animation = u ? {duration: 1E3 * f(m.animationduration, 1)} : !1;
                    h.transposeanimation = f(m.transposeanimation, u);
                    h.transposeanimduration = 1E3 * f(m.transposeanimduration, .2);
                    h.showValues = 0;
                    h.valuePadding = f(m.valuepadding, 2);
                    h.valuePosition = b(p.valueposition, m.valueposition, "auto");
                    h.stack100Percent = u = f(m.stack100percent, 0);
                    h.showPercentValues = f(m.showpercentvalues,
                        I && u ? 1 : 0);
                    h.showPercentInToolTip = f(m.showpercentintooltip, I && u ? 1 : 0);
                    h.showTooltip = f(m.showtooltip, 1);
                    h.seriesNameInTooltip = f(m.seriesnameintooltip, 1);
                    h.showHoverEffect = f(m.plothovereffect, m.anchorhovereffect, m.showhovereffect, void 0);
                    h.rotateValues = f(m.rotatevalues) ? 270 : 0;
                    h.linethickness = f(p.linethickness, m.linethickness, 1);
                    h.lineDashLen = f(p.linedashlen, m.linedashlen, 5);
                    h.lineDashGap = f(p.linedashgap, m.linedashgap, 4);
                    h.drawLine = h.alpha = f(m.drawsdconnector, p.drawsdconnector, 0) && 100;
                    I = a.getDashStyle(h.lineDashLen,
                        h.lineDashGap, h.linethickness);
                    h.lineDashStyle = Z ? I : "none";
                    h.shadow = {opacity: f(m.showshadow, c) ? v === H ? h.alpha / 100 : h.plotBorderAlpha / 100 : 0};
                    h.drawAnchors = f(p.drawanchors, p.showanchors, m.drawanchors, m.showanchors);
                    h.anchorBgColor = b(p.sdiconcolor, m.sdiconcolor, E);
                    h.anchorBorderColor = E;
                    h.anchorRadius = f(p.sdiconradius, m.sdiconradius, 5);
                    h.anchorAlpha = b(p.alpha, p.sdiconalpha, m.sdiconalpha);
                    h.anchorBgAlpha = b(p.sdiconalpha, m.sdiconalpha, 100);
                    h.anchorBorderThickness = b(p.anchorborderthickness, m.anchorborderthickness,
                        1);
                    h.anchorSides = b(p.sdiconsides, m.sdiconsides, 3);
                    h.linecolor = h.anchorBgColor;
                    h.minimizeTendency = f(m.minimizetendency, m.minimisetendency, 0);
                    h.anchorImageUrl = b(p.anchorimageurl, m.anchorimageurl);
                    h.anchorImageAlpha = f(p.anchorimagealpha, m.anchorimagealpha, 100);
                    h.anchorImageScale = f(p.anchorimagescale, m.anchorimagescale, 100);
                    h.anchorImagePadding = f(p.anchorimagepadding, m.anchorimagepadding, 1);
                    h.anchorStartAngle = f(p.anchorstartangle, m.anchorstartangle, 90);
                    h.anchorShadow = f(p.anchorshadow, m.anchorshadow, 0);
                    !d.components.data && (d.components.data = []);
                    c = d.components.data;
                    for (y = 0; y < D; y++) A = n && n[y], v = c[y] = c[y] || {}, v.config = v.config || {}, u = v.config, C = this.components.data[y].config, A.value = C.showSD ? C.sd : null, u.x = this.components.data[y]._xPos, u.setValue = C = B.getCleanValue(A.value), u.setLink = b(A.link), u.anchorProps = this._parseAnchorProperties(y, d, "sd"), K = e.getLabel(y), u.label = a.getValidValue(g(b(K.tooltext, K.label, K.name))), u.showValue = 0, u.dashed = f(A.dashed, Z), u.color = b(A.color, h.lineColor), u.alpha = b(A.alpha,
                        A.alpha, h.alpha), V = U(V, C), L = w(L, C), u.dashStyle = u.dashed ? I : "none", u.toolTipValue = C = B.dataLabels(C, F), u.setDisplayValue = K = g(A.displayvalue), u.displayValue = b(K, C), u.formatedVal = C = u.toolTipValue, u.setTooltext = a.getValidValue(g(b(A.tooltext, p.plottooltext, m.plottooltext))), A = b(A.sdiconshape, p.sdiconshape, m.sdiconshape, "polygon"), h.dip = u.dip = "polygon" === A ? 0 : "spoke" === A ? 1 : 0, A = h.showTooltip ? null === C ? !1 : "<b>SD" + P + "</b>" : !1, u.toolText = A, u.setTooltext = A, v ? v.graphics || (c[y].graphics = {}) : c[y] = {graphics: {}}, u.hoverEffects =
                        {enabled: !1};
                    h.maxValue = V;
                    h.minValue = L
                }, configureMD: function (d) {
                    var c = d.chart, e = c.components, g = a.parseUnsafeString, h = d.config, p = d.JSONData,
                        m = c.jsonData.chart, u = e.colorManager, n = d.index || d.stackIndex, v = d.type,
                        y = !c.singleseries || z(m.palettecolors) ? u.getPlotColor(n) : u.getColor(l).split(/\s*\,\s*/)[0],
                        n = p.data, A, D = c.config.categories, D = w(D && D.length, n && n.length),
                        B = e.numberFormatter, C = c.use3dlineshift, K, V = -Infinity, L = Infinity, F, I,
                        P = b(m.tooltipsepchar, ": "), Z = f(p.dashed, m.linedashed);
                    I = c.isStacked;
                    A = c.hasLineSet;
                    e = e.xAxis[0];
                    d.visible = 1 === f(d.JSONData.visible, !Number(d.JSONData.initiallyhidden), 1);
                    h.use3dlineshift = void 0 !== C ? f(m.use3dlineshift, C) : 1;
                    h.plotColor = y;
                    h.legendSymbolColor = h.plotColor;
                    c = f(c.defaultPlotShadow, u.getColor("showShadow"));
                    h.drawFullAreaBorder = f(m.drawfullareaborder, 1);
                    h.parentYAxis = A ? F = 1 : F = b(p.parentyaxis && p.parentyaxis.toLowerCase(), R) === r ? 1 : 0;
                    h.connectNullData = f(m.connectnulldata, 0);
                    h.enableAnimation = u = f(m.animation, m.defaultanimation, 1);
                    h.animation = u ? {
                        duration: 1E3 * f(m.animationduration,
                            1)
                    } : !1;
                    h.transposeanimation = f(m.transposeanimation, u);
                    h.transposeanimduration = 1E3 * f(m.transposeanimduration, .2);
                    h.showValues = 0;
                    h.valuePadding = f(m.valuepadding, 2);
                    h.valuePosition = b(p.valueposition, m.valueposition, "auto");
                    h.stack100Percent = u = f(m.stack100percent, 0);
                    h.showPercentValues = f(m.showpercentvalues, I && u ? 1 : 0);
                    h.showPercentInToolTip = f(m.showpercentintooltip, I && u ? 1 : 0);
                    h.showTooltip = f(m.showtooltip, 1);
                    h.seriesNameInTooltip = f(m.seriesnameintooltip, 1);
                    h.showHoverEffect = f(m.plothovereffect, m.anchorhovereffect,
                        m.showhovereffect, void 0);
                    h.rotateValues = f(m.rotatevalues) ? 270 : 0;
                    h.linethickness = f(p.linethickness, m.linethickness, 1);
                    h.lineDashLen = f(p.linedashlen, m.linedashlen, 5);
                    h.lineDashGap = f(p.linedashgap, m.linedashgap, 4);
                    h.drawLine = h.alpha = f(m.drawmdconnector, p.drawmdconnector, 0) && 100;
                    I = a.getDashStyle(h.lineDashLen, h.lineDashGap, h.linethickness);
                    h.lineDashStyle = Z ? I : "none";
                    h.shadow = {opacity: f(m.showshadow, c) ? v === H ? h.alpha / 100 : h.plotBorderAlpha / 100 : 0};
                    h.drawAnchors = f(p.drawanchors, p.showanchors, m.drawanchors,
                        m.showanchors);
                    h.anchorBgColor = b(p.mdiconcolor, m.mdiconcolor, E);
                    h.anchorBorderColor = E;
                    h.anchorRadius = f(p.mdiconradius, m.mdiconradius, 5);
                    h.anchorAlpha = b(p.alpha, p.mdiconalpha, m.mdiconalpha);
                    h.anchorBgAlpha = b(p.mdiconalpha, m.mdiconalpha, 100);
                    h.anchorBorderThickness = b(p.anchorborderthickness, m.anchorborderthickness, 1);
                    h.anchorSides = b(p.mdiconsides, m.mdiconsides, 3);
                    h.linecolor = h.anchorBgColor;
                    h.minimizeTendency = f(m.minimizetendency, m.minimisetendency, 0);
                    h.anchorImageUrl = b(p.anchorimageurl, m.anchorimageurl);
                    h.anchorImageAlpha = f(p.anchorimagealpha, m.anchorimagealpha, 100);
                    h.anchorImageScale = f(p.anchorimagescale, m.anchorimagescale, 100);
                    h.anchorImagePadding = f(p.anchorimagepadding, m.anchorimagepadding, 1);
                    h.anchorStartAngle = f(p.anchorstartangle, m.anchorstartangle, 90);
                    h.anchorShadow = f(p.anchorshadow, m.anchorshadow, 0);
                    !d.components.data && (d.components.data = []);
                    c = d.components.data;
                    for (y = 0; y < D; y++) A = n && n[y], v = c[y] = c[y] || {}, v.config = v.config || {}, u = v.config, C = this.components.data[y].config, A.value = C.showMD ? C.md :
                        null, u.x = this.components.data[y]._xPos, u.setValue = C = B.getCleanValue(A.value), u.setLink = b(A.link), u.anchorProps = this._parseAnchorProperties(y, d, "md"), K = e.getLabel(y), u.label = a.getValidValue(g(b(K.tooltext, K.label, K.name))), u.showValue = 0, u.dashed = f(A.dashed, Z), u.color = b(A.color, h.lineColor), u.alpha = b(A.alpha, A.alpha, h.alpha), V = U(V, C), L = w(L, C), u.dashStyle = u.dashed ? I : "none", u.toolTipValue = C = B.dataLabels(C, F), u.setDisplayValue = K = g(A.displayvalue), u.displayValue = b(K, C), u.formatedVal = u.toolTipValue, u.setTooltext =
                        a.getValidValue(g(b(A.tooltext, p.plottooltext, m.plottooltext))), A = b(A.mdiconshape, p.mdiconshape, m.mdiconshape, "polygon"), h.dip = u.dip = "polygon" === A ? 0 : "spoke" === A ? 1 : 0, A = h.showTooltip ? "<b>MD" + P + "</b>" : !1, u.toolText = A, u.setTooltext = A, v ? v.graphics || (c[y].graphics = {}) : c[y] = {graphics: {}}, u.hoverEffects = {enabled: !1};
                    h.maxValue = V;
                    h.minValue = L
                }, configureQD: function (d) {
                    var c = d.chart, e = c.components, h = a.parseUnsafeString, g = d.config, p = d.JSONData,
                        m = c.jsonData.chart, u = e.colorManager, n = d.index || d.stackIndex, v = d.type,
                        y = !c.singleseries || z(m.palettecolors) ? u.getPlotColor(n) : u.getColor(l).split(/\s*\,\s*/)[0],
                        n = p.data, A, D = c.config.categories, D = w(D && D.length, n && n.length),
                        B = e.numberFormatter, C = c.use3dlineshift, K, V = -Infinity, L = Infinity, F, I,
                        P = b(m.tooltipsepchar, ": "), Z = f(p.dashed, m.linedashed);
                    I = c.isStacked;
                    A = c.hasLineSet;
                    e = e.xAxis[0];
                    d.visible = 1 === f(d.JSONData.visible, !Number(d.JSONData.initiallyhidden), 1);
                    g.use3dlineshift = void 0 !== C ? f(m.use3dlineshift, C) : 1;
                    g.plotColor = y;
                    g.legendSymbolColor = g.plotColor;
                    c = f(c.defaultPlotShadow,
                        u.getColor("showShadow"));
                    g.drawFullAreaBorder = f(m.drawfullareaborder, 1);
                    g.parentYAxis = A ? F = 1 : F = b(p.parentyaxis && p.parentyaxis.toLowerCase(), R) === r ? 1 : 0;
                    g.connectNullData = f(m.connectnulldata, 0);
                    g.enableAnimation = u = f(m.animation, m.defaultanimation, 1);
                    g.animation = u ? {duration: 1E3 * f(m.animationduration, 1)} : !1;
                    g.transposeanimation = f(m.transposeanimation, u);
                    g.transposeanimduration = 1E3 * f(m.transposeanimduration, .2);
                    g.showValues = 0;
                    g.valuePadding = f(m.valuepadding, 2);
                    g.valuePosition = b(p.valueposition, m.valueposition,
                        "auto");
                    g.stack100Percent = u = f(m.stack100percent, 0);
                    g.showPercentValues = f(m.showpercentvalues, I && u ? 1 : 0);
                    g.showPercentInToolTip = f(m.showpercentintooltip, I && u ? 1 : 0);
                    g.showTooltip = f(m.showtooltip, 1);
                    g.seriesNameInTooltip = f(m.seriesnameintooltip, 1);
                    g.showHoverEffect = f(m.plothovereffect, m.anchorhovereffect, m.showhovereffect, void 0);
                    g.rotateValues = f(m.rotatevalues) ? 270 : 0;
                    g.linethickness = f(p.linethickness, m.linethickness, 1);
                    g.lineDashLen = f(p.linedashlen, m.linedashlen, 5);
                    g.lineDashGap = f(p.linedashgap, m.linedashgap,
                        4);
                    g.drawLine = g.alpha = f(m.drawqdconnector, p.drawqdconnector, 0) && 100;
                    I = a.getDashStyle(g.lineDashLen, g.lineDashGap, g.linethickness);
                    g.lineDashStyle = Z ? I : "none";
                    g.shadow = {opacity: f(m.showshadow, c) ? v === H ? g.alpha / 100 : g.plotBorderAlpha / 100 : 0};
                    g.drawAnchors = f(p.drawanchors, p.showanchors, m.drawanchors, m.showanchors);
                    g.anchorBgColor = b(p.qdiconcolor, m.qdiconcolor, E);
                    g.anchorBorderColor = E;
                    g.anchorRadius = f(p.qdiconradius, m.qdiconradius, 5);
                    g.anchorAlpha = b(p.alpha, p.qdiconalpha, m.qdiconalpha);
                    g.anchorBgAlpha = b(p.qdiconalpha,
                        m.qdiconalpha, 100);
                    g.anchorBorderThickness = b(p.anchorborderthickness, m.anchorborderthickness, 1);
                    g.anchorSides = b(p.qdiconsides, m.qdiconsides, 3);
                    g.linecolor = g.anchorBgColor;
                    g.minimizeTendency = f(m.minimizetendency, m.minimisetendency, 0);
                    g.anchorImageUrl = b(p.anchorimageurl, m.anchorimageurl);
                    g.anchorImageAlpha = f(p.anchorimagealpha, m.anchorimagealpha, 100);
                    g.anchorImageScale = f(p.anchorimagescale, m.anchorimagescale, 100);
                    g.anchorImagePadding = f(p.anchorimagepadding, m.anchorimagepadding, 1);
                    g.anchorStartAngle =
                        f(p.anchorstartangle, m.anchorstartangle, 90);
                    g.anchorShadow = f(p.anchorshadow, m.anchorshadow, 0);
                    !d.components.data && (d.components.data = []);
                    c = d.components.data;
                    for (y = 0; y < D; y++) A = n && n[y], v = c[y] = c[y] || {}, v.config = v.config || {}, u = v.config, C = this.components.data[y].config, A.value = C.showQD ? C.qd : null, u.x = this.components.data[y]._xPos, u.setValue = C = B.getCleanValue(A.value), u.setLink = b(A.link), u.anchorProps = this._parseAnchorProperties(y, d, "qd"), K = e.getLabel(y), u.label = a.getValidValue(h(b(K.tooltext, K.label, K.name))),
                        u.showValue = 0, u.dashed = f(A.dashed, Z), u.color = b(A.color, g.lineColor), u.alpha = b(A.alpha, A.alpha, g.alpha), V = U(V, C), L = w(L, C), u.dashStyle = u.dashed ? I : "none", u.toolTipValue = C = B.dataLabels(C, F), u.setDisplayValue = K = h(A.displayvalue), u.displayValue = b(K, C), u.formatedVal = C = u.toolTipValue, u.setTooltext = a.getValidValue(h(b(A.tooltext, p.plottooltext, m.plottooltext))), A = b(A.qdiconshape, p.qdiconshape, m.qdiconshape, "polygon"), g.dip = u.dip = "polygon" === A ? 0 : "spoke" === A ? 1 : 0, A = g.showTooltip ? null === C ? !1 : "<b>QD" + P + "</b>" :
                        !1, u.toolText = A, u.setTooltext = A, v ? v.graphics || (c[y].graphics = {}) : c[y] = {graphics: {}}, u.hoverEffects = {enabled: !1};
                    g.maxValue = V;
                    g.minValue = L
                }, configureOutliers: function (d, c) {
                    var e = d.chart, g = e.components, h = a.parseUnsafeString, p = d.config, m = d.JSONData,
                        u = e.jsonData.chart, n = g.colorManager, v = d.index || d.stackIndex, y = d.type,
                        A = !e.singleseries || z(u.palettecolors) ? n.getPlotColor(v) : n.getColor(l).split(/\s*\,\s*/)[0],
                        v = m.data, D, C = e.config.categories, C = w(C && C.length, v && v.length),
                        B = g.numberFormatter, K = e.use3dlineshift,
                        V, L = -Infinity, F = Infinity, I, P, Z = b(u.tooltipsepchar, ": "),
                        T = f(m.dashed, u.linedashed);
                    P = e.isStacked;
                    D = e.hasLineSet;
                    g = g.xAxis[0];
                    d.visible = 1 === f(d.JSONData.visible, !Number(d.JSONData.initiallyhidden), 1);
                    p.use3dlineshift = void 0 !== K ? f(u.use3dlineshift, K) : 1;
                    p.plotColor = A;
                    p.legendSymbolColor = p.plotColor;
                    e = f(e.defaultPlotShadow, n.getColor("showShadow"));
                    p.drawFullAreaBorder = f(u.drawfullareaborder, 1);
                    p.parentYAxis = D ? I = 1 : I = b(m.parentyaxis && m.parentyaxis.toLowerCase(), R) === r ? 1 : 0;
                    p.connectNullData = f(u.connectnulldata,
                        0);
                    p.enableAnimation = n = f(u.animation, u.defaultanimation, 1);
                    p.animation = n ? {duration: 1E3 * f(u.animationduration, 1)} : !1;
                    p.transposeanimation = f(u.transposeanimation, n);
                    p.transposeanimduration = 1E3 * f(u.transposeanimduration, .2);
                    p.showValues = 0;
                    p.valuePadding = f(u.valuepadding, 2);
                    p.valuePosition = b(m.valueposition, u.valueposition, "auto");
                    p.stack100Percent = n = f(u.stack100percent, 0);
                    p.showPercentValues = f(u.showpercentvalues, P && n ? 1 : 0);
                    p.showPercentInToolTip = f(u.showpercentintooltip, P && n ? 1 : 0);
                    p.showTooltip = f(u.showtooltip,
                        1);
                    p.seriesNameInTooltip = f(u.seriesnameintooltip, 1);
                    p.showHoverEffect = f(u.plothovereffect, u.anchorhovereffect, u.showhovereffect, void 0);
                    p.rotateValues = f(u.rotatevalues) ? 270 : 0;
                    p.linethickness = f(m.linethickness, u.linethickness, 1);
                    p.lineDashLen = f(m.linedashlen, u.linedashlen, 5);
                    p.lineDashGap = f(m.linedashgap, u.linedashgap, 4);
                    p.alpha = 0;
                    P = a.getDashStyle(p.lineDashLen, p.lineDashGap, p.linethickness);
                    p.lineDashStyle = T ? P : "none";
                    p.shadow = {opacity: f(u.showshadow, e) ? y === H ? p.alpha / 100 : p.plotBorderAlpha / 100 : 0};
                    p.drawAnchors =
                        f(m.drawanchors, m.showanchors, u.drawanchors, u.showanchors);
                    p.anchorBgColor = b(m.outliericoncolor, u.outliericoncolor, E);
                    p.anchorBorderColor = E;
                    p.anchorRadius = f(m.outliericonradius, u.outliericonradius, 5);
                    p.anchorAlpha = b(m.alpha, m.outliericonalpha, u.outliericonalpha);
                    p.anchorBgAlpha = b(m.outliericonalpha, u.outliericonalpha, 100);
                    p.anchorBorderThickness = b(m.anchorborderthickness, u.anchorborderthickness, 1);
                    p.anchorSides = b(m.outliericonsides, u.outliericonsides, 3);
                    p.linecolor = p.anchorBgColor;
                    p.minimizeTendency =
                        f(u.minimizetendency, u.minimisetendency, 0);
                    p.anchorImageUrl = b(m.anchorimageurl, u.anchorimageurl);
                    p.anchorImageAlpha = f(m.anchorimagealpha, u.anchorimagealpha, 100);
                    p.anchorImageScale = f(m.anchorimagescale, u.anchorimagescale, 100);
                    p.anchorImagePadding = f(m.anchorimagepadding, u.anchorimagepadding, 1);
                    p.anchorStartAngle = f(m.anchorstartangle, u.anchorstartangle, 90);
                    p.anchorShadow = f(m.anchorshadow, u.anchorshadow, 0);
                    !d.components.data && (d.components.data = []);
                    e = d.components.data;
                    for (A = 0; A < C; A++) D = v && v[A], y = e[A] =
                        e[A] || {}, y.config = y.config || {}, n = y.config, V = this.components.data[A].config, D.value = V.outliers ? V.outliers[c] : null, n.x = this.components.data[A]._xPos, n.setValue = K = B.getCleanValue(D.value), K >= V.min && K <= V.max && (n.setValue = D.value = null), n.setLink = b(D.link), n.anchorProps = this._parseAnchorProperties(A, d, "outlier"), V = g.getLabel(A), n.label = a.getValidValue(h(b(V.tooltext, V.label, V.name))), n.showValue = 0, n.dashed = f(D.dashed, T), n.color = b(D.color, p.lineColor), n.alpha = b(D.alpha, D.alpha, p.alpha), L = U(L, K), F = w(F, K),
                        n.dashStyle = n.dashed ? P : "none", n.toolTipValue = K = B.dataLabels(K, I), n.setDisplayValue = V = h(D.displayvalue), n.displayValue = b(V, K), n.formatedVal = K = n.toolTipValue, n.setTooltext = a.getValidValue(h(b(D.tooltext, m.plottooltext, u.plottooltext))), D = b(D.outliericonshape, m.outliericonshape, u.outliericonshape, "polygon"), p.dip = n.dip = "polygon" === D ? 0 : "spoke" === D ? 1 : 0, D = p.showTooltip ? null === K ? !1 : "<b>Outlier" + Z + "</b>" : !1, n.toolText = D, n.setTooltext = D, y ? y.graphics || (e[A].graphics = {}) : e[A] = {graphics: {}}, n.hoverEffects = {enabled: !1};
                    p.maxValue = L;
                    p.minValue = F
                }, initSubDataset: function (a, b) {
                    var d = b.chart, c = d.components, f = d.hasLineSet,
                        f = a.parentyaxis && a.parentyaxis.toLowerCase() === r || f ? 1 : 0;
                    b.chart = d;
                    b.yAxis = c.yAxis[f];
                    b.components = {};
                    b.graphics = {};
                    b.JSONData = a
                }, _parseAnchorProperties: function (d, c, e) {
                    var g = c.config, h = "area" === c.type ? 0 : 1, p = c.JSONData, m = c.chart.jsonData.chart;
                    d = p.data[d];
                    c = {};
                    var l = a.graphics.mapSymbolName,
                        p = void 0 !== b(d.anchorstartangle, p.anchorstartangle, m.anchorstartangle, d.anchorimagealpha, p.anchorimagealpha, m.anchorimagealpha,
                            d.anchorimagescale, p.anchorimagescale, m.anchorimagescale, d.anchorimagepadding, p.anchorimagepadding, m.anchorimagepadding, d.anchorimageurl, p.anchorimageurl, m.anchorimageurl, d.meaniconradius, p.meaniconradius, m.meaniconradius, d.meaniconcolor, p.meaniconcolor, m.meaniconcolor, d.anchorbordercolor, p.anchorbordercolor, m.anchorbordercolor, d.anchoralpha, p.anchoralpha, m.anchoralpha, d.meaniconsides, p.meaniconsides, m.meaniconsides, d.anchorborderthickness, p.anchorborderthickness, m.anchorborderthickness, void 0),
                        m =
                            f(d.drawanchors, g.drawAnchors);
                    c.enabled = p ? f(m, p) : f(m, h);
                    c.startAngle = f(d.anchorstartangle, g.anchorStartAngle);
                    c.imageAlpha = f(d.anchorimagealpha, g.anchorImageAlpha);
                    c.imageScale = f(d.anchorimagescale, g.anchorImageScale);
                    c.imagePadding = f(d.anchorimagepadding, g.anchorImagePadding);
                    0 > c.imagePadding && (c.imagePadding = 0);
                    c.imageUrl = b(d.anchorimageurl, g.anchorImageUrl);
                    c.radius = f(d[e + "iconradius"], g.anchorRadius);
                    c.isAnchorRadius = c.radius;
                    c.bgColor = b(d[e + "iconcolor"], g.anchorBgColor);
                    h = c.enabled ? y(b(d.anchoralpha,
                        g.anchorAlpha, c.enabled ? T : M)) : 0;
                    c.bgAlpha = y(b(d[e + "iconalpha"], g.meaniconalpha, h));
                    c.borderColor = b(d.anchorbordercolor, g.anchorBorderColor);
                    c.borderAlpha = h;
                    c.anchorAlpha = h;
                    c.sides = b(d[e + "iconsides"], g.anchorSides);
                    c.borderThickness = b(d.anchorborderthickness, g.anchorBorderThickness);
                    c.symbol = l(c.sides).split(C);
                    c.shadow = f(d.anchorshadow, g.anchorShadow) && 1 <= c.radius ? {opacity: h / 100} : !1;
                    g.attachEvents = !0;
                    return c
                }, init: function (a) {
                    var d = this.chart, b = d.components, c = a.parentyaxis && a.parentyaxis.toLowerCase() ===
                    r ? 1 : 0, b = b.yAxis[c];
                    if (!a) return !1;
                    this.JSONData = a;
                    this.yAxis = b;
                    this.chartGraphics = d.chartGraphics;
                    this.components = {};
                    this.graphics = {};
                    this.configure()
                }, draw: function () {
                    var a, b, c, g, l, p, r, u = this, y = u.JSONData, z = u.config, E = u.groupManager, K = u.index,
                        V = u.chart.config.categories, P = y.data, H = V && V.length, T = P && P.length, M, N, R,
                        J = u.visible, ga = u.chart, ka = ga.config, pa = ga.components.paper,
                        Na = ga.components.xAxis[0], Ra = u.yAxis, Va = ga.graphics.columnGroup, Da, Ia,
                        va = ga.graphics, Fa = z.showtooltip, wa = ga.get(e, ba), oa = wa.animType,
                        qa = wa.animObj, la = wa.dummyObj, ia = wa.duration, ea = Na.getAxisPosition(0),
                        sa = Na.getAxisPosition(1) - ea, fa = z.definedGroupPadding, ha = z.plotSpacePercent / 200,
                        ca = E.getDataSetPosition(u), Aa = z.maxcolwidth,
                        ya = (1 - .01 * fa) * sa || w(sa * (1 - 2 * ha), 1 * Aa), Y = f(ca.columnWidth, ya / 1), ua,
                        xa = ca.xPosOffset || 0, za = ca.height, Ga, Ma = u.components.data, ra, Ba, Ua, Ja, ja, xb,
                        eb = Ra.getAxisBase(), Qb, Db, Kb = z.showShadow, pb = u.graphics.upperBoxContainer,
                        hb = u.graphics.lowerBoxContainer, Eb = u.graphics.medianContainer,
                        Fb = u.graphics.upperWhiskerContainer,
                        Lb = u.graphics.lowerWhiskerContainer, ib = u.graphics.dataLabelContainer,
                        qb = u.graphics.shadowContainer, Ka, Xb, Mb, $a, Pb, yb, nb, Sa, Wa, ob, Jb, cb, Gb, jb, kb, zb,
                        rb, Oa, fb, tb, Pa, sb, ab, na = ga.config.dataLabelStyle, Yb = va.datalabelsGroup,
                        Ha = z.rotatevalues, lb = z.valuepadding, mb = ga.components.numberFormatter,
                        bb = Ha ? d : "middle", Hb = ga.linkedItems.smartLabel, Ca, Za, Rb, Sb, Nb, Ob, Ya, Ib, gb, ub,
                        vb, Tb, Zb, dc, Ub, jc = Infinity, Xa, ic, wb = !0,
                        yc = (u.components.removeDataArr || []).length, kc, lc, mc, nc, oc, pc, qc, rc, sc, Vb, Wb,
                        $b = z.showHoverEffect, Ab,
                        Bb, tc, uc, vc, wc, ac = function (a) {
                            h.call(this, ga, a)
                        }, bc = function (a) {
                            return function (d) {
                                var b;
                                if (0 !== this.data(W)) for (b in a) "label" !== b && (a[b].attr(this.data("setRolloverAttr")[b]), h.call(this, ga, d, "DataPlotRollOver"))
                            }
                        }, cc = function (a) {
                            return function (d) {
                                var b;
                                if (0 !== this.data(W)) for (b in a) "label" !== b && (a[b].attr(this.data("setRolloutAttr")[b]), h.call(this, ga, d, "DataPlotRollOut"))
                            }
                        }, Cb = function () {
                            !1 !== u.visible || !1 !== u._conatinerHidden && void 0 !== u._conatinerHidden || (pb.hide(), hb.hide(), Fb.hide(), Lb.hide(),
                                Eb.hide(), qb.hide(), ib && ib.hide(), u._conatinerHidden = !0)
                        };
                    ib || (ib = u.graphics.dataLabelContainer = pa.group(I, Yb), J || ib.hide());
                    pb || (pb = u.graphics.upperBoxContainer = pa.group("upperBox", Va).trackTooltip(!0).toBack(), J || pb.hide());
                    Fb || (Fb = u.graphics.upperWhiskerContainer = pa.group("upperWhisker", Va).trackTooltip(!0), J || Fb.hide());
                    hb || (hb = u.graphics.lowerBoxContainer = pa.group("lowerBox", Va).trackTooltip(!0).toBack(), J || hb.hide());
                    Lb || (Lb = u.graphics.lowerWhiskerContainer = pa.group("lowerWhisker", Va).trackTooltip(!0),
                    J || Lb.hide());
                    Eb || (Eb = u.graphics.medianContainer = pa.group("median", Va).trackTooltip(!0), J || Eb.hide());
                    qb || (qb = u.graphics.shadowContainer = pa.group(S, Va).toBack(), J || qb.hide());
                    J && (pb.show(), hb.show(), Fb.show(), Lb.show(), Eb.show(), qb.show(), ib && ib.show(), u._conatinerHidden = !1, u.components.mean.visible && u.components.mean.show(), u.components.sd.visible && u.components.sd.show(), u.components.qd.visible && u.components.qd.show(), u.components.md.visible && u.components.md.show());
                    M = w(H, T);
                    for (R = 0; R < M; R++) if (Ua =
                        (ja = (ra = Ma[R]) && ra.config) && ja.setValue, sc = rc = qc = pc = oc = nc = mc = lc = kc = !1, void 0 !== ra && void 0 !== Ua && null !== Ua) for (Ca = ra.graphics, xb = 0 <= Ua, Ba = ja.setLink, ra.graphics || (Ma[R].graphics = {}), Ca.label || (Ma[R].graphics.label = []), Qb = xb ? ja.previousPositiveY : ja.previousNegativeY, Db = Ra.getAxisPosition(Qb || eb), Da = Na.getAxisPosition(R) + xa, 0 === za && (jc = 0, Xa = Db), Ia = w(Ia, Db), ua = Y, Mb = ((Xb = (Ka = ja.upperQuartile || {}, Ka.value)) || 0 === Xb) && Ra.getAxisPosition(Xb), yb = ((Pb = ($a = ja.lowerQuartile || {}, $a.value)) || 0 === Pb) && Ra.getAxisPosition(Pb),
                                                                                                                                                                                  Wa = ((Sa = (nb = ja.median) && nb.value) || 0 === Sa) && Ra.getAxisPosition(Sa), ob = Wa - Mb, Jb = yb - Wa, cb = ja.upperBoxBorder || {}, Gb = ja.lowerBoxBorder || {}, Ga = ja.toolText, Za = u.index + C + R, Ja = {
                        index: R,
                        link: Ba,
                        maximum: ja.max,
                        minimum: ja.min,
                        median: Sa,
                        q3: Ka.value,
                        q1: $a.value,
                        maxDisplayValue: ja.showMaxValues ? mb.dataLabels(ja.max) : n,
                        minDisplayValue: ja.showMinValues ? mb.dataLabels(ja.min) : n,
                        medianDisplayValue: ja.showMedianValues ? mb.dataLabels(Sa) : n,
                        q1DisplayValue: ja.showQ1Values ? mb.dataLabels($a.value) : n,
                        q3DisplayValue: ja.showQ3Values ?
                            mb.dataLabels(Ka.value) : n,
                        categoryLabel: ja.label,
                        toolText: Ga,
                        datasetIndex: K,
                        datasetName: y.seriesname,
                        visible: J
                    }, Pa = L(Da) + cb.borderWidth % 2 * .5, sb = L(Da + ua) + cb.borderWidth % 2 * .5, ab = L(Mb) + Ka.borderWidth % 2 * .5, ua = sb - Pa, a = {
                        fill: m(ja.upperColorArr[0]),
                        "stroke-width": 0,
                        "stroke-dasharray": "none",
                        cursor: Ba ? "pointer" : n,
                        ishot: !0,
                        visibility: J
                    }, b = {
                        fill: m(ja.lowerColorArr[0]),
                        "stroke-width": 0,
                        "stroke-dasharray": "none",
                        cursor: Ba ? "pointer" : Q,
                        ishot: !0,
                        visibility: J
                    }, c = {
                        stroke: cb.color, "stroke-width": cb.borderWidth, "stroke-linecap": X,
                        dashstyle: cb.dashStyle, ishot: !0, visibility: J
                    }, g = {
                        stroke: Gb.color,
                        "stroke-width": Gb.borderWidth,
                        dashstyle: Gb.dashStyle,
                        "stroke-linecap": X,
                        ishot: !0,
                        visibility: J
                    }, l = {
                        stroke: m(Ka.color),
                        "stroke-width": Ka.borderWidth,
                        "stroke-dasharray": Ka.dashSyle,
                        "stroke-linecap": X,
                        cursor: Ba ? "pointer" : Q,
                        ishot: !0,
                        visibility: J
                    }, p = {
                        stroke: m($a.color),
                        "stroke-width": $a.borderWidth,
                        "stroke-dasharray": $a.dashSyle,
                        cursor: Ba ? "pointer" : n,
                        "stroke-linecap": X,
                        ishot: !0,
                        visibility: J
                    }, r = {
                        stroke: m(nb.color),
                        "stroke-width": nb.borderWidth,
                        "stroke-dasharray": nb.dashSyle,
                        cursor: Ba ? "pointer" : n,
                        "stroke-linecap": X,
                        ishot: !0,
                        visibility: J
                    }, tc = Xa || ab, N = {
                        x: Pa,
                        y: Xa || ab,
                        width: U(ua, 0),
                        height: U(w(jc, ob), 0),
                        r: 0
                    }, (jb = ra.graphics.upperBoxElem) ? (jb.animateWith(la, qa, N, ia, oa, wb && Cb), wb = !1) : (jb = ra.graphics.upperBoxElem = pa.rect(N, pb), kc = !0), jb.attr(a).shadow({opacity: Kb ? z.upperBoxAlpha / 100 : 0}, qb), N = {path: ["M", Pa, Xa || ab, "V", Xa || ab + ob, "M", sb, Xa || ab, "V", Xa || ab + ob]}, (kb = ra.graphics.upperBoxBorderEle) ? kb.animateWith(la, qa, N, ia, oa, wb && Cb) : (kb = ra.graphics.upperBoxBorderEle =
                        pa.path(N, pb), mc = !0), kb.attr(c), N = {path: ["M", Pa, Xa || ab, "H", Pa + ua]}, (zb = ra.graphics.upperQuartileEle) ? zb.animateWith(la, qa, N, ia, oa, wb && Cb) : (zb = ra.graphics.upperQuartileEle = pa.path(N, pb), oc = !0), zb.attr(l), Rb = ab, Sb = z.whiskerslimitswidthratio / 100 * ua, Nb = Sb / 2, Ib = Ob = Ra.getAxisPosition(ja.max), Ya = Pa, Ib = L(Ob) + ja.upperWhiskerThickness % 2 / 2, Pa = L(Pa + ua / 2) + ja.upperWhiskerThickness % 2 / 2, ub = ["M", Pa, Xa || Rb, "V", w(Xa || Ib, tc), "M", Pa - Nb, w(Xa || Ib, tc), "H", Pa + Nb], gb = ra.graphics.upperWhiskerEle, N = {
                        path: ub, ishot: !Fa, "stroke-width": ja.upperWhiskerThickness,
                        cursor: Ba ? "pointer" : n, "stroke-linecap": X
                    }, gb ? gb.animateWith(la, qa, N, ia, oa, wb && Cb) : (gb = ra.graphics.upperWhiskerEle = pa.path(N, Fb), rc = !0), gb.attr({stroke: ja.upperWhiskerColor}), gb.shadow({opacity: ja.upperWhiskerShadowOpacity}, qb), Hb.useEllipsesOnOverflow(ga.config.useEllipsesWhenOverflow), Hb.setStyle(na), Tb = Hb.getOriSize(mb.dataLabels(ja.max)), Zb = Ha ? Tb.width : Tb.height, Ub = Ob - .5 * ja.upperWhiskerThickness - lb - Zb * (Ha ? .5 : 1), Ub - (Ha ? Zb / 2 : 0) < ka.canvasTop && (Ub = ka.canvasTop + (Ha ? Zb / 2 : 0)), N = {
                        text: mb.dataLabels(ja.max),
                        x: Ya + ua / 2,
                        title: Ka.originalText || n,
                        y: Ub,
                        "text-anchor": Ha ? "middle" : bb,
                        "vertical-align": Ha ? "middle" : v,
                        visibility: B,
                        direction: z.textDirection,
                        fill: na.color,
                        transform: pa.getSuggestiveRotation(Ha, Ya + ua / 2, Ub),
                        "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                    }, ja.showMaxValues ? (Ca.label[3] ? (Ca.label[3].show(), Ab = Ya + ua / 2, Bb = Xa || Ub, Ca.label[3].attr({
                        text: mb.dataLabels(ja.max),
                        title: Ka.originalText || n,
                        "text-anchor": Ha ? "middle" : bb,
                        "vertical-align": Ha ?
                            "middle" : v,
                        visibility: B,
                        direction: z.textDirection,
                        fill: na.color,
                        "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                    }), Ca.label[3].animateWith(la, qa, {
                        x: Ab,
                        y: Bb,
                        transform: pa.getSuggestiveRotation(Ha, Ab, Bb)
                    }, ia, oa, wb && Cb)) : Ca.label[3] = pa.text(N, ib), Ca.label[3].data("groupId", Za)) : Ca.label[3] && Ca.label[3].hide() && Ca.label[3].attr({"text-bound": []}), Pa = L(Da) + Gb.borderWidth % 2 * .5, sb = L(Da + ua) + Gb.borderWidth % 2 * .5, ab = L(Wa + Jb) + $a.borderWidth % 2 * .5,
                                                                                                                                                                                  uc = Xa || Wa, vc = U(w(jc, ab - Wa), 0), wc = uc + vc, N = {
                        x: Pa,
                        y: uc,
                        width: U(ua, 0),
                        height: vc,
                        r: 0
                    }, (rb = ra.graphics.lowerBoxElem) ? rb.animateWith(la, qa, N, ia, oa, wb && Cb) : (rb = ra.graphics.lowerBoxElem = pa.rect(N, hb), lc = !0), rb.attr(b).shadow({opacity: Kb ? z.lowerBoxAlpha / 100 : 0}, qb), N = {path: ["M", Pa, Xa || Wa, "V", Xa || Wa + Jb, "M", sb, Xa || Wa, "V", Xa || Wa + Jb]}, (Oa = ra.graphics.lowerBoxBorderEle) ? Oa.animateWith(la, qa, N, ia, oa, wb && Cb) : (Oa = ra.graphics.lowerBoxBorderEle = pa.path(N, hb), nc = !0), Oa.attr(g), ab = L(Wa + Jb) + $a.borderWidth % 2 * .5, N = {
                        path: ["M",
                            Pa, Xa || ab, "H", Pa + ua]
                    }, (fb = ra.graphics.lowerQuartileEle) ? fb.animateWith(la, qa, N, ia, oa, wb && Cb) : (fb = ra.graphics.lowerQuartileEle = pa.path(N, hb), pc = !0), fb.attr(p), Rb = ab, Sb = z.whiskerslimitswidthratio / 100 * ua, Nb = Sb / 2, Ib = Ob = Ra.getAxisPosition(ja.min), Ya = Pa, Ib = L(Ob) + ja.lowerWhiskerThickness % 2 / 2, Ya = L(Ya + ua / 2) + ja.lowerWhiskerThickness % 2 / 2, ub = ["M", Ya, Xa || Rb, "V", U(Xa || Ib, wc), "M", Ya - Nb, U(Xa || Ib, wc), "H", Ya + Nb], vb = ra.graphics.lowerWhiskerEle, Hb.setStyle(na), Tb = Hb.getOriSize(mb.dataLabels(ja.min)), Zb = Ha ? Tb.width : Tb.height,
                                                                                                                                                                                  dc = Ob + .5 * ja.lowerWhiskerThickness + lb, dc + Zb > ka.canvasBottom && (dc = ka.canvasBottom - Zb), N = {
                        text: mb.dataLabels(ja.min),
                        x: Ya,
                        title: Ka.originalText || n,
                        y: dc,
                        "text-anchor": Ha ? A : bb,
                        "vertical-align": Ha ? "middle" : v,
                        visibility: B,
                        direction: z.textDirection,
                        fill: na.color,
                        transform: pa.getSuggestiveRotation(Ha, Ya, dc),
                        "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                    }, ja.showMinValues ? (Ca.label[4] ? (Ca.label[4].show(), Ab = Ya, Bb = Xa || dc, Ca.label[4].animateWith(la,
                        qa, {
                            x: Ab,
                            y: Bb,
                            transform: pa.getSuggestiveRotation(Ha, Ab, Bb)
                        }, ia, oa, wb && Cb), Ca.label[4].attr({
                        text: mb.dataLabels(ja.min),
                        title: Ka.originalText || n,
                        "text-anchor": Ha ? A : bb,
                        "vertical-align": Ha ? "middle" : v,
                        visibility: B,
                        direction: z.textDirection,
                        fill: na.color,
                        "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                    })) : Ca.label[4] = pa.text(N, ib), Ca.label[4].data("groupId", Za)) : Ca.label[4] && Ca.label[4].hide() && Ca.label[4].attr({"text-bound": []}), N = {
                        path: ub,
                        ishot: !Fa,
                        "stroke-width": ja.lowerWhiskerThickness,
                        cursor: Ba ? "pointer" : n,
                        "stroke-linecap": X
                    }, vb ? vb.animateWith(la, qa, N, ia, oa, wb && Cb) : (vb = ra.graphics.lowerWhiskerEle = pa.path(N, Lb), sc = !0), vb.attr({stroke: ja.lowerWhiskerColor}), vb.shadow({opacity: ja.lowerWhiskerShadowOpacity}, qb), ab = L(Wa) + nb.borderWidth % 2 * .5, N = {path: ["M", Pa, Xa || ab, "H", Pa + ua]},(tb = ra.graphics.midLineElem) ? tb.animateWith(la, qa, N, ia, oa, wb && Cb) : (tb = ra.graphics.midLineElem = pa.path(N, Eb), qc = !0),tb.attr(r),Vb = {
                        upperBoxElem: ja.setUpperBoxRolloverAttr,
                        lowerBoxElem: ja.setLowerBoxRolloverAttr,
                        upperBoxBorderEle: ja.setUpperBoxBorderRolloverAttr,
                        lowerBoxBorderEle: ja.setLowerBoxBorderRolloverAttr,
                        upperQuartileEle: ja.setUpperQuartileRolloverAttr,
                        lowerQuartileEle: ja.setLowerQuartileRolloverAttr,
                        midLineElem: ja.setMedianRolloverAttr
                    },Wb = {
                        upperBoxElem: ja.setUpperBoxRolloutAttr,
                        lowerBoxElem: ja.setLowerBoxRolloutAttr,
                        upperBoxBorderEle: ja.setUpperBoxBorderRolloutAttr,
                        lowerBoxBorderEle: ja.setLowerBoxBorderRolloutAttr,
                        upperQuartileEle: ja.setUpperQuartileRolloutAttr,
                        lowerQuartileEle: ja.setLowerQuartileRolloutAttr,
                        midLineElem: ja.setMedianRolloutAttr
                    },jb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),kc && jb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),rb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),lc && rb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),kb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr",
                        Wb),mc && kb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),Oa.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),nc && Oa.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),zb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),oc && zb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),fb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),pc && fb.click(ac).hover(bc(ra.graphics),
                        cc(ra.graphics)),tb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),qc && tb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),gb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),rc && gb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),vb.data("groupId", Za).data("eventArgs", Ja).data(W, $b).data("setRolloverAttr", Vb).data("setRolloutAttr", Wb),sc && vb.click(ac).hover(bc(ra.graphics), cc(ra.graphics)),
                                                                                                                                                                              bb = Ha ? d : "middle",N = {
                            text: Ka.displayValue,
                            x: Da + ua / 2,
                            title: Ka.originalText || n,
                            y: Mb - lb,
                            "text-anchor": Ha ? D : bb,
                            "vertical-align": Ha ? "middle" : F,
                            visibility: B,
                            direction: z.textDirection,
                            fill: na.color,
                            transform: pa.getSuggestiveRotation(Ha, Da + ua / 2, Mb - lb),
                            "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                        },Z(Ka.displayValue) && Ka.displayValue !== Q && ja.showQ3Values ? (Ca.label[0] ? (Ca.label[0].show(), Ab = Da + ua / 2, Bb = Xa || Mb - lb, Ca.label[0].animateWith(la, qa,
                            {
                                x: Ab,
                                y: Bb,
                                transform: pa.getSuggestiveRotation(Ha, Ab, Bb)
                            }, ia, oa, wb && Cb), Ca.label[0].attr({
                            text: Ka.displayValue,
                            title: Ka.originalText || n,
                            "text-anchor": Ha ? D : bb,
                            "vertical-align": Ha ? "middle" : F,
                            visibility: B,
                            direction: z.textDirection,
                            fill: na.color,
                            "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                        })) : Ca.label[0] = pa.text(N, ib), Ca.label[0].data("groupId", Za)) : Ca.label[0] && Ca.label[0].hide() && Ca.label[0].attr({"text-bound": []}),N = {
                            text: nb.displayValue,
                            x: Pa + ua / 2,
                            y: Wa - lb,
                            title: nb.originalText || n,
                            "text-anchor": Ha ? D : bb,
                            "vertical-align": Ha ? "middle" : F,
                            visibility: B,
                            direction: z.textDirection,
                            fill: na.color,
                            transform: pa.getSuggestiveRotation(Ha, Pa + ua / 2, Wa - lb),
                            "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                        },Z(nb.displayValue) && nb.displayValue !== Q && ja.showMedianValues ? (Ca.label[1] ? (Ca.label[1].show(), Ab = Pa + ua / 2, Bb = Xa || Wa - lb, Ca.label[1].animateWith(la, qa, {
                            x: Ab, y: Bb, transform: pa.getSuggestiveRotation(Ha,
                                Ab, Bb)
                        }, ia, oa, wb && Cb), Ca.label[1].attr({
                            text: nb.displayValue,
                            title: nb.originalText || n,
                            "text-anchor": Ha ? D : bb,
                            "vertical-align": Ha ? "middle" : F,
                            visibility: B,
                            direction: z.textDirection,
                            fill: na.color,
                            "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                        })) : Ca.label[1] = pa.text(N, ib), Ca.label[1].data("groupId", Za)) : Ca.label[1] && Ca.label[1].hide() && Ca.label[1].attr({"text-bound": []}),N = {
                            text: $a.displayValue,
                            x: Da + ua / 2,
                            y: yb + lb,
                            title: $a.originalText ||
                                n,
                            "text-anchor": Ha ? D : bb,
                            "vertical-align": Ha ? "middle" : v,
                            visibility: B,
                            direction: z.textDirection,
                            fill: na.color,
                            transform: pa.getSuggestiveRotation(Ha, Da + ua / 2, yb + lb),
                            "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                        },Z($a.displayValue) && $a.displayValue !== Q && ja.showQ1Values ? (Ca.label[2] ? (Ca.label[2].show(), Ab = Da + ua / 2, Bb = Xa || yb + lb, Ca.label[2].animateWith(la, qa, {
                            x: Ab,
                            y: Bb,
                            transform: pa.getSuggestiveRotation(Ha, Ab, Bb)
                        }, ia, oa, wb && Cb), Ca.label[2].attr({
                            text: $a.displayValue,
                            title: $a.originalText || n,
                            "text-anchor": Ha ? D : bb,
                            "vertical-align": Ha ? "middle" : v,
                            visibility: B,
                            direction: z.textDirection,
                            fill: na.color,
                            "text-bound": [na.backgroundColor, na.borderColor, na.borderThickness, na.borderPadding, na.borderRadius, na.borderDash]
                        })) : Ca.label[2] = pa.text(N, ib), Ca.label[2].data("groupId", Za)) : Ca.label[2] && Ca.label[2].hide() && Ca.label[2].attr({"text-bound": []}),wb && Cb(),Fa ? (jb.tooltip(Ga), rb.tooltip(Ga), kb.tooltip(Ga), Oa.tooltip(Ga), zb.tooltip(Ga), fb.tooltip(Ga), tb.tooltip(Ga), gb.tooltip(Ga),
                            vb.tooltip(Ga)) : (jb.tooltip(!1), rb.tooltip(!1), kb.tooltip(!1), Oa.tooltip(!1), zb.tooltip(!1), fb.tooltip(!1), tb.tooltip(!1), gb.tooltip(!1), vb.tooltip(!1)),Da += ua / 2,u.components.mean.components.data[R].config.xPos = Da,u.components.sd.components.data[R].config.xPos = Da,u.components.qd.components.data[R].config.xPos = Da,u.components.md.components.data[R].config.xPos = Da,ic = 0; ic < z.maxNumberOfOutliers; ic++) u.components.outliers[ic].components.data[R].config.xPos = Da;
                    u.flag = !0;
                    yc && u.remove()
                }, remove: function () {
                    var a =
                            this.components, b = a.removeDataArr,
                        d = a.pool || (a.pool = {element: [], hotElement: [], label: []}), c = b.length, f,
                        e = this.maxminFlag, g, h, m, l, n;
                    for (m = 0; m < c; m++) if (f = b[0], b.splice(0, 1), f && f.graphics) {
                        h = f.graphics;
                        for (g in h) if ("label" !== g) h[g].shadow({opacity: 0}), h[g].hide(); else for (l = h[g].length, n = 0; n < l; n++) h[g][n] && (h[g][n].shadow({opacity: 0}), h[g][n].hide(), h[g][n].attr({"text-bound": []}));
                        f.graphics.element && (d.element = d.element.concat(f.graphics.element));
                        f.graphics.hotElement && (d.hotElement = d.hotElement.concat(f.graphics.hotElement));
                        f.graphics.label && (d.label = d.label.concat(f.graphics.label))
                    }
                    a.pool = d;
                    e && this.setMaxMin()
                }, removeData: function (a, d, b) {
                    var c = this.components, f = c.data, e = c.removeDataArr || (c.removeDataArr = []),
                        g = c.mean.components.removeDataArr || (c.mean.components.removeDataArr = []),
                        h = c.sd.components.removeDataArr || (c.sd.components.removeDataArr = []),
                        m = c.md.components.removeDataArr || (c.md.components.removeDataArr = []),
                        l = c.qd.components.removeDataArr || (c.qd.components.removeDataArr = []), n = this.config,
                        r = this.groupManager, v =
                            this.maxminFlag;
                    d = d || 1;
                    a = a || 0;
                    if (a + d === f.length) this.endPosition = !0; else if (0 === a || void 0 === a) this.endPosition = !1;
                    c.removeDataArr = e = e.concat(f.splice(a, d));
                    c.mean.components.removeDataArr = g.concat(c.mean.components.data.splice(a, d));
                    c.sd.components.removeDataArr = h.concat(c.sd.components.data.splice(a, d));
                    c.md.components.removeDataArr = m.concat(c.md.components.data.splice(a, d));
                    c.qd.components.removeDataArr = l.concat(c.qd.components.data.splice(a, d));
                    g = c.outliers.length;
                    for (f = 0; f < g; f++) h = c.outliers[f].components.removeDataArr ||
                        (c.outliers[f].components.removeDataArr = []), c.outliers[f].components.removeDataArr = h.concat(c.outliers[f].components.data.splice(a, d));
                    r && r.removeSumLabels && r.removeSumLabels(a, d, this.positionIndex);
                    g = e.length;
                    for (f = 0; f < g; f++) if (e[f]) {
                        a = e[f].config;
                        if (a.setValue === n.maxValue || a.setValue === n.minValue) v = this.maxminFlag = !0;
                        if (v) break
                    }
                    v && this.setMaxMin();
                    b && this.draw()
                }, _addLegendSubDS: function (a) {
                    var d;
                    d = a.config;
                    var b = a.chart.components.legend, c = d.anchorBgColor;
                    d = {
                        anchorSide: d.anchorSides,
                        legendBackgroundColor: this.config.upperBoxColor,
                        fillColor: ka(c),
                        strokeColor: ka(E),
                        enabled: this.config.includeInLegend,
                        label: this.JSONData.seriesname && K(a.name),
                        customLegendIcon: !1,
                        spoke: d.dip ? 1 : 0,
                        drawLine: d.drawLine ? !0 : !1,
                        lineColor: m({color: c, alpha: T})
                    };
                    a.itemId = b.addItems(a, a.legendInteractivity, d)
                }, _addLegendOutliers: function (a) {
                    var d = this.JSONData, c = this.chart.jsonData.chart, e = this.config, g = e.upperBoxColor,
                        h = this.chart.components.legend, m = b(d.outliericoncolor, c.outliericoncolor, E), d = {
                            anchorSide: f(d.outliericonsides, c.outliericonsides, 3),
                            fillColor: ka(m),
                            legendBackgroundColor: g,
                            strokeColor: ka(E),
                            enabled: e.includeInLegend,
                            label: this.JSONData.seriesname && "Outliers",
                            customLegendIcon: !1,
                            spoke: a[0].config.dip ? 1 : 0,
                            drawLine: !1,
                            datasetObj: a[0]
                        };
                    a.visible = 1 === f(this.JSONData.visible, !Number(this.JSONData.initiallyhidden), 1);
                    a[0] && (a[0].itemId = h.addItems(a, this.legendInteractivityOutliers, d))
                }, legendInteractivityOutliers: function (a, d) {
                    var b = this.config, c = d.config, f = d.graphics, e = b.itemHiddenStyle.color,
                        b = b.itemStyle.color, g = c.fillColor, c = c.strokeColor, h, m;
                    a.visible =
                        a.visible ? !1 : !0;
                    for (h = 0; h < a.length; h++) m = a[h].visible, a[h].visible = m ? !1 : !0, a[h].draw(), m ? (a.visible = !1, f.legendItemSymbol && f.legendItemSymbol.attr({
                        fill: e,
                        stroke: e
                    }), f.legendItemText && f.legendItemText.attr({fill: e}), f.legendIconLine && f.legendIconLine.attr({stroke: e})) : (f.legendItemSymbol && f.legendItemSymbol.attr({
                        fill: g,
                        stroke: c
                    }), f.legendItemText && f.legendItemText.attr({fill: b}), f.legendIconLine && f.legendIconLine.attr({stroke: g}))
                }, _addLegend: function () {
                    var a;
                    a = this.config;
                    var d = this.chart.components.legend,
                        b = a.upperBoxColor;
                    a = {
                        fillColor: m({
                            FCcolor: {
                                color: b + "," + a.lowerBoxColor,
                                angle: 90,
                                ratio: "50, 0",
                                alpha: "100, 100"
                            }
                        }),
                        legendBackgroundColor: b,
                        strokeColor: m(E),
                        rawFillColor: b,
                        rawStrokeColor: E,
                        enabled: a.includeInLegend,
                        label: K(this.JSONData.seriesname),
                        index: this.index,
                        mainDS: !0
                    };
                    this.itemId = d.addItems(this, this.legendInteractivity, a)
                }, legendInteractivity: function (a, d) {
                    var b = this.config, c = a.visible, f = d.config, e = d.graphics, g = b.itemHiddenStyle.color,
                        b = b.itemStyle, h = b.color, m = f.fillColor, f = f.strokeColor, l =
                            d.index, n = a.subDS;
                    c ? a.hide() : a.show();
                    if (c) for (e.legendItemSymbol && e.legendItemSymbol.attr({
                        fill: g,
                        stroke: g
                    }), e.legendItemText && e.legendItemText.attr({fill: g}), e.legendItemLine && e.legendItemLine.attr({stroke: g}), c = l + 1; c <= l + n; c++) {
                        if (e = (f = this.components.items[c]) && f.graphics) e.legendItemSymbol && e.legendItemSymbol.attr({
                            fill: g,
                            stroke: g
                        }), e.legendItemText && e.legendItemText.attr({fill: g}), e.legendItemLine && e.legendItemLine.attr({stroke: g})
                    } else for (e.legendItemSymbol && e.legendItemSymbol.attr({
                        fill: m,
                        stroke: f
                    }), e.legendItemText && e.legendItemText.attr({fill: h}), e.legendItemLine && e.legendItemLine.attr({stroke: m}), c = l + 1; c <= l + n; c++) if (e = (f = this.components.items[c]) && f.graphics) f = f.config, h = b.color, m = f.fillColor, f = f.strokeColor, e.legendItemSymbol && e.legendItemSymbol.attr({
                        fill: m,
                        stroke: f
                    }), e.legendItemText && e.legendItemText.attr({fill: h}), e.legendItemLine && e.legendItemLine.attr({stroke: m})
                }, show: function () {
                    var a = this.graphics.upperBoxContainer, d = this.graphics.lowerBoxContainer,
                        b = this.graphics.medianContainer,
                        c = this.graphics.upperWhiskerContainer, f = this.graphics.lowerWhiskerContainer,
                        e = this.graphics.dataLabelContainer, g = this.graphics.shadowContainer, h = this.chart,
                        m = this.yAxis;
                    h._chartAnimation();
                    this.visible = !0;
                    this.components.outliers.visible = !0;
                    this._conatinerHidden = !1;
                    a.show();
                    d.show();
                    b.show();
                    c.show();
                    f.show();
                    e.show();
                    g.show();
                    for (a = 0; a < this.config.maxNumberOfOutliers; a++) this.components.outliers[a].show();
                    h._setAxisLimits();
                    m.draw();
                    h._drawDataset();
                    this.components.mean.show();
                    this.components.sd.show();
                    this.components.qd.show();
                    this.components.md.show()
                }, hide: function () {
                    var a = this.chart, d = this.yAxis, b, c;
                    a._chartAnimation();
                    this.visible = !1;
                    b = this.config.maxNumberOfOutliers;
                    for (c = 0; c < b; c++) this.components.outliers[c].hide();
                    a._setAxisLimits();
                    d.draw();
                    a._drawDataset();
                    this.components.mean.hide();
                    this.components.sd.hide();
                    this.components.qd.hide();
                    this.components.md.hide();
                    b = this.config.maxNumberOfOutliers || this.components.outliers.length;
                    this.components.outliers.visible = !1;
                    for (c = 0; c < b; c++) this.components.outliers[c].visible =
                        !1, this.components.outliers[c].draw()
                }
            }, "Column", {
                showplotborder: void 0,
                plotborderdashlen: void 0,
                plotborderdashgap: void 0,
                plotfillalpha: void 0,
                useroundedges: void 0,
                ratio: void 0,
                plotborderthickness: void 0,
                showvalues: void 0,
                valuepadding: void 0,
                showtooltip: void 0,
                maxcolwidth: void 0,
                rotatevalues: void 0,
                use3dlighting: void 0,
                whiskerslimitswidthratio: void 0,
                outliersupperrangeratio: void 0,
                outlierslowerrangeratio: void 0,
                showalloutliers: void 0,
                showmean: void 0,
                showsd: void 0,
                showmd: void 0,
                showqd: void 0,
                showminvalues: void 0,
                showmaxvalues: void 0,
                showq1values: void 0,
                showq3values: void 0,
                showmedianvalues: void 0
            }])
        }]);
    J.register("module", ["private", "modules.renderer.js-dataset-subds", function () {
        J.register("component", ["dataset", "subDS", {
            show: function () {
                var a = this.chart, c = this.yAxis;
                a._chartAnimation();
                this.visible = !0;
                this._conatinerHidden = !1;
                a.config.transposeAxis && (a._setAxisLimits(), c.draw());
                this.draw()
            }, hide: function () {
                var a = this.chart, c = this.yAxis;
                a._chartAnimation();
                this.visible = !1;
                a.config.transposeAxis && (a._setAxisLimits(),
                    c.draw());
                this.draw()
            }, getEventArgs: function () {
                return {
                    datasetName: this.name,
                    datasetIndex: this.index,
                    id: (this.config || {}).userID,
                    visible: this.visible
                }
            }, legendInteractivity: function (a, c) {
                var E = this.config, e = a.visible, J = c.config, W = c.graphics, S = E.itemHiddenStyle.color,
                    E = E.itemStyle.color, I = J.fillColor, B, X = J.strokeColor;
                e ? a.hide() : a.show();
                e = {
                    legendItemSymbol: {fill: e ? S : I, stroke: e ? S : X},
                    legendItemText: {fill: e ? S : E},
                    legendItemLine: {stroke: e ? S : J.lineAttr && J.lineAttr.stroke}
                };
                for (B in W) (J = W[B]) && e[B] && J.attr(e[B])
            }
        },
            "Line"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-heatmap", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.colors.FFFFFF, e = c.configStr, ba = c.animationObjStr,
            W = c.showHoverEffectStr, S = c.columnStr, I = c.shadowStr, B = c.dataLabelStr, X = c.miterStr,
            M = c.hiddenStr, R = c.visibleStr, r = a.ZEROSTRING, D = c.pStr, v = c.sStr, A = c.POSITION_START,
            F = c.POSITION_TOP, l = c.POSITION_END, C = c.POSITION_BOTTOM, H = c.NORMAL, Q = a.BLANKSTRING,
            n = a.BLANKSTRING, b = a.pluck, z = a.getValidValue, f = a.pluckNumber, K = a.toRaphaelColor,
            V = a.regex.dropHash,
            m = a.HASHSTRING, Z = a.schedular, ga = function (a) {
                return void 0 !== a && null !== a
            }, L = "rgba(192,192,192," + (a.isIE ? .002 : 1E-6) + ")", c = a.TOUCH_THRESHOLD_PIXELS,
            w = a.CLICK_THRESHOLD_PIXELS, U = Math, g = U.round, y = U.min, P = U.max, ka = a.hasTouch ? c : w,
            d = a.setLineHeight, N = a.graphics.getLightColor, T = a.graphics.convertColor, h = a.HUNDREDSTRING;
        J.register("component", ["dataset", "HeatMap", {
            type: "heatmap", configure: function () {
                var c = this.chart, e = c.components, t = e.postLegendInitFn, m = e.gradientLegend, l = c.config.style,
                    p = this.config, r = c.jsonData,
                    u = this.JSONData, w = u.data, A = c.singleseries, C = w && w.length, B = c.jsonData.chart,
                    V = c.components.colorManager, L,
                    F = p.plotColor = V.getPlotColor(this.index || this.positionIndex),
                    I = f(u.dashed, B.plotborderdashed), U = f(B.useplotgradientcolor, 1), Z = f(B.showtooltip, 1),
                    M = a.parseUnsafeString, R = M(B.yaxisname), S = M(B.xaxisname), W = M(b(B.tooltipsepchar, ": ")),
                    J = a.parseTooltext, X, ga, ba, ka, Ia, va, Fa, wa, oa, qa, la, ia, ea, sa, fa, ha, ca, Aa, ya, Y,
                    ua, xa, za, Ga = r.colorrange || {}, Ma = c.components.xAxis[0], ra = c.components.yAxis[0], Ba, Ua,
                    Ja = p.mapByPercent =
                        f(Ga.mapbypercent, 0), ja = p.mapByCategory = f(B.mapbycategory, 0), xb = c.jsonData,
                    eb = xb.colorrange && f(xb.colorrange.gradient), Qb = a.nonGradientColorRange, Db, Kb, pb, hb, Eb,
                    Fb, Lb, ib, qb, Ka, Xb, Mb, $a, Pb = a.getDashStyle, yb = this.components.data,
                    nb = this.components.plotGrid = [], Sa = c.components.numberFormatter, Wa, ob, Jb = c.isBar,
                    cb = c.is3D, Gb, jb, kb, zb, rb, Oa, fb, tb, Pa = -Infinity, sb = Infinity, ab, na,
                    Yb = z(B.tltype, Q), Ha = z(B.trtype, Q), lb = z(B.bltype, Q), mb = z(B.brtype, Q), bb, Hb, Ca, Za,
                    Rb = Q, Sb = Q, Nb = Q, Ob = Q, Ya, Ib, gb, ub, vb, Tb, Zb = r.rows.row.length,
                    dc = r.columns.column.length, Ub;
                for (fb = 0; fb < Zb; fb++) for (nb.push([]), tb = 0; tb < dc; tb++) nb[fb].push([]);
                L = p.showplotborder = f(B.showplotborder, cb ? 0 : 1);
                p.plotDashLen = Fa = f(B.plotborderdashlen, 5);
                p.plotDashGap = wa = f(B.plotborderdashgap, 4);
                p.plotfillAngle = ia = f(360 - B.plotfillangle, Jb ? 180 : 90);
                p.plotFillAlpha = ea = b(u.alpha, B.plotfillalpha, h);
                p.plotColor = F = b(u.color, F);
                p.isRoundEdges = qa = f(B.useroundedges, 0);
                p.plotRadius = f(B.useRoundEdges, p.isRoundEdges ? 1 : 0);
                p.plotFillRatio = sa = b(u.ratio, B.plotfillratio);
                p.plotgradientcolor =
                    fa = a.getDefinedColor(B.plotgradientcolor, V.getColor("plotGradientColor"));
                !U && (fa = n);
                p.plotBorderAlpha = ha = L ? b(B.plotborderalpha, ea, h) : 0;
                p.plotBorderColor = ca = b(B.plotbordercolor, cb ? E : V.getColor("plotBorderColor"));
                p.plotBorderThickness = oa = f(B.plotborderthickness, 1);
                p.plotBorderDashStyle = ya = I ? Pb(Fa, wa, oa) : "none";
                p.showValues = f(u.showvalues, B.showvalues, 1);
                p.valuePadding = f(B.valuepadding, 2);
                p.enableAnimation = Gb = f(B.animation, B.defaultanimation, 1);
                p.animation = Gb ? {duration: 1E3 * f(B.animationduration, 1)} :
                    !1;
                p.transposeAnimation = f(B.transposeanimation, Gb);
                p.transposeAnimDuration = 1E3 * f(B.transposeanimduration, .2);
                p.showShadow = qa || cb ? f(B.showshadow, 1) : f(B.showshadow, V.getColor("showShadow"));
                p.showHoverEffect = la = f(B.plothovereffect, B.showhovereffect, void 0);
                p.showTooltip = f(B.showtooltip, 1);
                p.definedGroupPadding = P(f(B.plotspacepercent), 0);
                p.plotSpacePercent = P(f(B.plotspacepercent, 20) % 100, 0);
                p.maxColWidth = f(Jb ? B.maxbarheight : B.maxcolwidth, 50);
                p.plotPaddingPercent = f(B.plotpaddingpercent);
                p.rotateValues =
                    f(B.rotatevalues) ? 270 : 0;
                p.placeValuesInside = f(B.placevaluesinside, 0);
                gb = l.inCanfontFamily;
                ub = parseInt(l.inCanfontSize, 10);
                vb = l.inCancolor;
                p.tlLabelStyle = {
                    fontFamily: b(B.tlfont, gb),
                    fontSize: f(B.tlfontsize, ub) + "px",
                    color: T(b(B.tlfontcolor, vb), 100),
                    fontWeight: H,
                    fontStyle: H
                };
                d(p.tlLabelStyle);
                p.trLabelStyle = {
                    fontFamily: b(B.trfont, gb),
                    fontSize: f(B.trfontsize, ub) + "px",
                    color: T(b(B.trfontcolor, vb), 100),
                    fontWeight: H,
                    fontStyle: H
                };
                p.brLabelStyle = {
                    fontFamily: b(B.brfont, gb), fontSize: f(B.brfontsize, ub) + "px", color: T(b(B.brfontcolor,
                        vb), 100), fontWeight: H, fontStyle: H
                };
                p.blLabelStyle = {
                    fontFamily: b(B.blfont, gb),
                    fontSize: f(B.blfontsize, ub) + "px",
                    color: T(b(B.blfontcolor, vb), 100),
                    fontWeight: H,
                    fontStyle: H
                };
                p.use3DLighting = f(B.use3dlighting, 1);
                p.parentYAxis = jb = b(u.parentyaxis && u.parentyaxis.toLowerCase(), D) === v ? 1 : 0;
                yb || (yb = this.components.data = []);
                for (Oa = 0; Oa < C; Oa++) Y = w && w[Oa], za = (xa = yb[Oa]) && xa.config, xa || (xa = yb[Oa] = {graphics: {}}), xa.config || (za = yb[Oa].config = {}), za.showValue = f(Y.showvalue, p.showValues), za.setValue = ua = Sa.getCleanValue(Y.value),
                    za.setLink = b(Y.link), za.toolTipValue = Wa = Sa.dataLabels(ua, jb), za.setDisplayValue = ob = M(Y.displayvalue), za.displayValue = b(ob, Wa), kb = f(Y.dashed), zb = f(Y.dashlen, Fa), rb = wa = f(Y.dashgap, wa), Pa = P(Pa, ua), sb = y(sb, ua), za.plotBorderDashStyle = Aa = 1 === kb ? Pb(zb, rb, oa) : 0 === kb ? "none" : ya, A ? (F = V.getPlotColor(Oa), F = b(Y.color, F), sa = b(Y.ratio, p.plotFillRatio)) : F = b(Y.color, p.plotColor), za.plotFillAlpha = ea = b(Y.alpha, p.plotFillAlpha), 0 > ua && !qa && (Ia = ia, ia = Jb ? 180 - ia : 360 - ia), za.colorArr = a.graphics.getColumnColor(F + "," + p.plotgradientcolor,
                    ea, sa = p.plotFillRatio, ia, qa, p.plotBorderColor, ha.toString(), Jb ? 1 : 0, cb ? !0 : !1), X = za.toolTipValue, Ia && (ia = Ia);
                p.maxValue = Pa;
                p.minValue = sb;
                ab = Pa - sb;
                if (eb && !ja) t({min: sb, max: Pa}), this.components.colorRange = Ga = m.colorRange; else {
                    this.components.colorRange = Ga = new Qb({
                        colorRange: r.colorrange,
                        dataMin: sb,
                        dataMax: Pa,
                        sortLegend: 0,
                        mapByCategory: ja,
                        defaultColor: "cccccc",
                        numberFormatter: Sa
                    });
                    p.colorMap = [];
                    for (Oa = 0; Oa < Ga.colorArr.length; Oa++) p.colorMap[Oa] = {
                        config: Ga.colorArr[Oa],
                        dataSet: this
                    }, p.colorMap[Oa].config.visible =
                        !0;
                    0 === p.colorMap.length && (c.setChartMessage(), m && m.elem && m.elem.gl.carpet.group.hide())
                }
                for (Oa = 0; Oa < C; Oa++) Y = w && w[Oa], za = (xa = yb[Oa]) && xa.config, za.percentValue = Ja ? Ya = Y.value && g((Y.value - sb) / ab * 1E4) / 100 : void 0, za.value = Tb = ja ? Y.colorrangelabel || Y.categoryid : Ja ? Ya : za.setValue, eb && !ja ? Ub = Ga.getColorByValue(Tb) : (na = Ga.getColorObj(Tb), xa.legendItemIndex = na.seriesIndex), void 0 === na && void 0 === Ub ? za.visible = !1 : na && na.outOfRange ? (za.visible = !1, za.displayValue = n) : (za.visible = !0, F = b(Y.color, na && na.code || Ub),
                    za.color = T(F, b(Y.alpha, p.plotFillAlpha)), 0 !== la && (Db = b(Y.hovercolor, u.hovercolor, B.plotfillhovercolor, B.columnhovercolor, F), Kb = b(Y.hoveralpha, u.hoveralpha, B.plotfillhoveralpha, B.columnhoveralpha, "25"), pb = b(Y.hovergradientcolor, u.hovergradientcolor, B.plothovergradientcolor, fa), !pb && (pb = n), hb = b(Y.hoverratio, u.hoverratio, B.plothoverratio, sa), Eb = f(360 - Y.hoverangle, 360 - u.hoverangle, 360 - B.plothoverangle, ia), Fb = b(Y.borderhovercolor, u.borderhovercolor, B.plotborderhovercolor, ca), Lb = b(Y.borderhoveralpha, u.borderhoveralpha,
                    B.plotborderhoveralpha, ha, ea), ib = f(Y.borderhoverthickness, u.borderhoverthickness, B.plotborderhoverthickness, oa), qb = f(Y.borderhoverdashed, u.borderhoverdashed, B.plotborderhoverdashed), Ka = f(Y.borderhoverdashgap, u.borderhoverdashgap, B.plotborderhoverdashgap, Fa), Xb = f(Y.borderhoverdashlen, u.borderhoverdashlen, B.plotborderhoverdashlen, wa), Mb = qb ? Pb(Xb, Ka, ib) : Aa, 1 == la && Db === F && (Db = N(Db, 70)), $a = a.graphics.getColumnColor(Db, Kb, hb, Eb, qa, Fb, Lb.toString(), Jb ? 1 : 0, cb ? !0 : !1), za.setRolloutAttr = {
                    fill: K(za.color), stroke: L &&
                        K($a[1]), "stroke-width": oa, "stroke-dasharray": Aa
                }, za.setRolloverAttr = {
                    fill: K($a[0]),
                    stroke: L && K($a[1]),
                    "stroke-width": ib,
                    "stroke-dasharray": Mb
                }), Ja && (Ya = Sa.percentValue(Ya)), za.setValue = ua = Sa.getCleanValue(Y.value), za.toolTipValue = Wa = Sa.dataLabels(ua, jb), X = za.toolTipValue, ba = z(M(b(Y.tooltext, u.plottooltext, B.plottooltext))), za.tlLabel = bb = M(b(Y.tllabel, Y.ltlabel)), za.trLabel = Hb = M(b(Y.trlabel, Y.rtlabel)), za.blLabel = Ca = M(b(Y.bllabel, Y.lblabel)), za.brLabel = Za = M(b(Y.brlabel, Y.rblabel)), ob = z(M(Y.displayvalue)),
                    Ib = ja ? ob : b(Y.displayvalue, X), za.displayValue = b(ob, Ya, za.toolTipValue), Yb !== Q && (Rb = "<b>" + Yb + W + "</b>"), Ha !== Q && (Sb = "<b>" + Ha + W + "</b>"), lb !== Q && (Nb = "<b>" + lb + W + "</b>"), mb !== Q && (Ob = "<b>" + mb + W + "</b>"), Ba = Ma.getCategoryFromId(w[Oa].columnid.toLowerCase()), Ua = ra.getCategoryFromId(w[Oa].rowid.toLowerCase()), Z ? (null === X ? va = !1 : void 0 !== ba ? (ka = [1, 2, 5, 6, 7, 14, 93, 94, 95, 96, 97, 98, 112, 113, 114, 115, 116, 117], ga = {
                    formattedValue: X,
                    value: Y.value,
                    yaxisName: R,
                    xaxisName: S,
                    displayValue: ob,
                    percentValue: Ja ? Ya : Q,
                    tlLabel: bb,
                    trLabel: Hb,
                    blLabel: Ca,
                    brLabel: Za,
                    rowLabel: Ua.catObj && Ua.catObj.label,
                    columnLabel: Ba.catObj && Ba.catObj.label,
                    percentDataValue: Ja ? Ya : Q,
                    trtype: Ha,
                    tltype: Yb,
                    brType: mb,
                    blType: lb,
                    colorRangeLabel: za.colorRangeLabel
                }, va = J(ba, ka, ga, Y, B, ga)) : va = (Ja ? "<b>Value" + W + "</b>" + X + "<br /><b>Percentage" + W + "</b>" + Ya : Ib) + (bb !== Q ? "<br />" + (Rb + bb) : Q) + (Hb !== Q ? "<br />" + Sb + Hb : Q) + (Ca !== Q ? "<br />" + Nb + Ca : Q) + (Za !== Q ? "<br />" + Ob + Za : Q), za.toolText = va, za.setTooltext = va) : za.toolText = !1);
                !1 === c.hasLegend || eb && !ja || this._addLegend()
            }, init: function (a) {
                var d =
                        this.chart, c = d.components, b = a.parentyaxis && a.parentyaxis.toLowerCase() === v ? 1 : 0,
                    c = c.yAxis[b];
                if (!a) return !1;
                this.JSONData = a;
                this.yAxis = c;
                this.chartGraphics = d.chartGraphics;
                this.components = {};
                this.graphics = {};
                this.visible = 1 === f(this.JSONData.visible, !Number(this.JSONData.initiallyhidden), 1);
                this.configure()
            }, _addLegend: function () {
                var a = this.components.data, d = this.chart, c = d.jsonData.chart, b, e, g = this.config.colorMap,
                    l = this.components.colorRange, u, n, v, z;
                n = d.components.legend;
                c = f(c.us3dlighting, c.useplotgradientcolor,
                    1);
                n.emptyItems();
                n = 0;
                for (v = g.length; n < v; n++) z = g[n], u = l.colorArr[n].code, b = N(u, 60).replace(V, m), N(u, 40), c ? (e = N(u, 40), e = {
                    FCcolor: {
                        color: u + "," + u + "," + e,
                        ratio: "0,70,30",
                        angle: 270,
                        alpha: "100,100,100"
                    }
                }) : e = {FCcolor: {color: u, angle: 0, ratio: r, alpha: h}}, b = {
                    fillColor: K(e),
                    label: z.config.label,
                    rawFillColor: u,
                    strokeColor: K(b),
                    datasetObj: this
                }, g[n].legendItemId = d.components.legend.addItems(z, this.legendInteractivity, b);
                for (n = 0; n < a.length; n++) for (c = l.getColorObj(a[n].config.value).code, d = 0; d < g.length; d++) if (g[d].config.code ==
                    c) {
                    a[n].legendItemId = g[d].legendItemId;
                    a[n].datasetIndex = d;
                    a[n].datasetName = g[d].config.label;
                    break
                }
            }, legendInteractivity: function (a, d) {
                var c = this.config, b = a.config.visible, f = a.dataSet, e = d.config, g = d.graphics,
                    h = c.itemHiddenStyle.color, c = c.itemStyle.color, m = e.fillColor, e = e.strokeColor;
                b ? f.hide(a) : f.show(a);
                b ? (g.legendItemSymbol && g.legendItemSymbol.attr({
                    fill: h,
                    stroke: h
                }), g.legendItemText && g.legendItemText.attr({fill: h}), g.legendIconLine && g.legendIconLine.attr({stroke: h})) : (g.legendItemSymbol && g.legendItemSymbol.attr({
                    fill: m,
                    stroke: e
                }), g.legendItemText && g.legendItemText.attr({fill: c}), g.legendIconLine && g.legendIconLine.attr({stroke: m}))
            }, hide: function (a) {
                var d = this.components.data, c = this.chart.get(e, ba), b = c.animType, f = c.animObj, g = c.dummyObj,
                    c = c.duration, h = this.components.colorRange, m, l, n, r, v;
                r = a.config.code;
                m = 0;
                for (l = d.length; m < l; m++) v = h.getColorObj(d[m].config.value).code, n = d[m].config, r === v && (d[m].graphics.element && d[m].graphics.element.animateWith(g, f, {
                    "fill-opacity": 0,
                    "stroke-width": 0
                }, c, b), d[m].graphics.hotElement &&
                d[m].graphics.hotElement.hide(), d[m].graphics.valEle && d[m].graphics.valEle.hide(), d[m].graphics.tlLabel && d[m].graphics.tlLabel.hide(), d[m].graphics.trLabel && d[m].graphics.trLabel.hide(), d[m].graphics.blLabel && d[m].graphics.blLabel.hide(), d[m].graphics.brLabel && d[m].graphics.brLabel.hide(), n.visible = !1, d[m].visible = !1);
                a.visible = !1;
                a.config.visible = !1
            }, show: function (a) {
                var d = this.components.data, c = this.config, b = this.chart.get(e, ba), f = b.animType, g = b.animObj,
                    h = b.dummyObj, b = b.duration, m, l, n = this.components.colorRange,
                    r, v, z, w;
                z = a.config.code;
                r = 0;
                for (v = d.length; r < v; r++) m = d[r].config, l = m.plotFillAlpha / 100, w = n.getColorObj(d[r].config.value).code, z === w && (d[r].graphics.element && d[r].graphics.element.attr({visibility: R}).animateWith(h, g, {
                    "fill-opacity": l,
                    "stroke-width": c.plotBorderThickness
                }, b, f), d[r].graphics.hotElement && d[r].graphics.hotElement.show(), d[r].graphics.valEle && d[r].graphics.valEle.show(), d[r].graphics.tlLabel && d[r].graphics.tlLabel.show(), d[r].graphics.trLabel && d[r].graphics.trLabel.show(), d[r].graphics.blLabel &&
                d[r].graphics.blLabel.show(), d[r].graphics.brLabel && d[r].graphics.brLabel.show(), m.visible = !0, d[r].visible = !0);
                a.visible = !0;
                a.config.visible = !0
            }, updatePlot: function (a, d) {
                var c = this.config, b = this.chart.get(e, ba), f = b.animType, g = b.animObj, h = b.dummyObj,
                    b = b.duration, m, l, n = this.components.data, r, v, z;
                r = 0;
                for (v = n.length; r < v; r++) m = n[r].config, l = m.plotFillAlpha / 100, z = n[r].config.value, z < a || z > d ? m.visible && (n[r].graphics.element && n[r].graphics.element.animateWith(h, g, {
                    "fill-opacity": 0,
                    "stroke-width": 0
                }, b, f),
                n[r].graphics.hotElement && n[r].graphics.hotElement.hide(), n[r].graphics.valEle && n[r].graphics.valEle.hide(), n[r].graphics.tlLabel && n[r].graphics.tlLabel.hide(), n[r].graphics.trLabel && n[r].graphics.trLabel.hide(), n[r].graphics.blLabel && n[r].graphics.blLabel.hide(), n[r].graphics.brLabel && n[r].graphics.brLabel.hide(), m.visible = !1, n[r].visible = !1) : m.visible || (n[r].graphics.element && n[r].graphics.element.animateWith(h, g, {
                    "fill-opacity": l,
                    "stroke-width": c.plotBorderThickness
                }, b, f), n[r].graphics.hotElement &&
                n[r].graphics.hotElement.show(), n[r].graphics.valEle && n[r].graphics.valEle.show(), n[r].graphics.tlLabel && n[r].graphics.tlLabel.show(), n[r].graphics.trLabel && n[r].graphics.trLabel.show(), n[r].graphics.blLabel && n[r].graphics.blLabel.show(), n[r].graphics.brLabel && n[r].graphics.brLabel.show(), m.visible = !0, n[r].visible = !0)
            }, _checkPointObj: function (a, d, c, b) {
                var f = this.components.plotGrid, e = this.chart.config, g = e.viewPortConfig, h = g.x, m = g.scaleX,
                    g = e.plotborderthickness, e = e.showplotborder;
                a = f[d] && f[d][a];
                g =
                    e ? g : 0;
                d = g / 2;
                d = 0 === d % 2 ? d + 1 : Math.round(d);
                if (a && a.config && a.config.visible && (c = c - (a._xPos - h * m) + d, b = b - a._yPos + d, b = 0 <= c && c <= a._width + g && 0 <= b && b <= a._height + g)) return {
                    pointIndex: a._index,
                    hovered: b,
                    pointObj: a
                }
            }, _getHoveredPlot: function (a, d) {
                var b = this.chart, c = b.config, f = b.components.xAxis[0], e = b.components.canvas.config,
                    e = Math.max(e.canvasPaddingLeft, e.canvasPadding), g = c.canvasLeft,
                    b = b.components.yAxis[0].getValue(d + b.config.canvasHeight / b.jsonData.rows.row.length / 2 - c.canvasTop - e),
                    c = Math.floor(b), f = f.getValue(a -
                    g - e), e = Math.round(f);
                return 0 < e - f ? .5 < b - c ? this._checkPointObj(e, c, a, d) || this._checkPointObj(e - 1, c, a, d) : this._checkPointObj(e, c - 1, a, d) || this._checkPointObj(e, c, a, d) : .5 < b - c ? this._checkPointObj(e + 1, c, a, d) || this._checkPointObj(e, c, a, d) : this._checkPointObj(e, c - 1, a, d) || this._checkPointObj(e + 1, c, a, d) || this._checkPointObj(e, c, a, d)
            }, draw: function () {
                var d = this.config, c = this.JSONData.data, b, f, g, h = this.visible, m = this.chart,
                    l = m.getJobList(), r = m.components.paper, v = m.components.xAxis[0], z = m.components.yAxis[0],
                    w =
                        m.components.gradientLegend;
                b = m.graphics.datasetGroup;
                var y, A, D = m.graphics, E = m.config.showtooltip, C = m.get(e, ba), V = C.animType, F = C.animObj,
                    U = C.dummyObj, P = C.duration, N, H, T, Q = this.components.data, J;
                g = m.components.canvas.config.clip["clip-canvas"].slice(0);
                var ga, Ia, va, Fa = z.getAxisBase();
                f = z.yBasePos = z.getAxisPosition(Fa);
                T = 0;
                var Fa = d.showShadow, wa = d.plotBorderThickness, oa = d.plotRadius, qa = this.graphics.container;
                H = this.graphics.dataLabelContainer;
                var la = this.graphics.shadowContainer;
                va = D.datalabelsGroup;
                var ia, D = m.components.legend.config.isActive, ea = this.components.plotGrid, sa, fa, ha, ca = [],
                    Aa = (this.components.removeDataArr || []).length, ya = d.showHoverEffect, Y;
                w && w.enabled && (w.resetLegend(), w.clearListeners());
                w.notifyWhenUpdate(this.updatePlot, this);
                qa || (qa = this.graphics.container = r.group(S, b), qa.attr({"clip-rect": g}), h || qa.hide());
                la || (la = this.graphics.shadowContainer = r.group(I, b).toBack(), h || la.hide());
                H || (H = this.graphics.dataLabelContainer = r.group(B, va), h || H.hide());
                b = c && c.length;
                sa = m.config.canvasWidth /
                    m.jsonData.columns.column.length;
                H = m.config.canvasHeight / m.jsonData.rows.row.length;
                for (g = 0; g < b; g++) if (J = Q[g], Y = J.trackerConfig = {}, va = J && J.config, f = va.setValue, w && w.enabled && !D && (va.visible = !0), fa = v.getCategoryFromId(c[g].columnid.toLowerCase()), ha = z.getCategoryFromId(c[g].rowid.toLowerCase()), fa.catObj && ha.catObj && va.value !== n) if (d.mapByCategory || null !== f) {
                    y = fa.index.toString() + ha.index.toString();
                    ca.push(y);
                    ga = va.setLink;
                    ia = va.colorArr;
                    J.graphics || (Q[g].graphics = {});
                    Ia = va.displayValue;
                    y = v.getAxisPosition(fa.index) -
                        sa / 2;
                    A = z.getAxisPosition(ha.index) - H / 2;
                    N = sa;
                    (T = va.toolText) && (va.finalTooltext = T);
                    J.graphics.valEle && J.graphics.valEle.hide();
                    J.graphics.tlLabel && J.graphics.tlLabel.hide();
                    J.graphics.trLabel && J.graphics.trLabel.hide();
                    J.graphics.blLabel && J.graphics.blLabel.hide();
                    J.graphics.brLabel && J.graphics.brLabel.hide();
                    Y.eventArgs = {
                        index: g,
                        link: ga,
                        value: va.percentValue || f,
                        displayValue: Ia,
                        columnId: fa.catObj.id,
                        rowId: ha.catObj.id,
                        tlLabel: va.tlLabel,
                        trLabel: va.trLabel,
                        blLabel: va.blLabel,
                        brLabel: va.brLabel,
                        toolText: T ?
                            T : "",
                        id: n,
                        datasetIndex: D ? J.datasetIndex : void 0,
                        datasetName: D ? J.datasetName : void 0,
                        visible: h
                    };
                    f = A;
                    T = H;
                    f = {
                        x: y,
                        y: f,
                        width: N,
                        height: T || 1,
                        r: oa,
                        ishot: !E,
                        fill: va.color,
                        stroke: K(ia[1]),
                        "stroke-width": P ? 0 : wa,
                        "stroke-dasharray": void 0,
                        "fill-opacity": P ? 0 : va.plotFillAlpha / 100,
                        "stroke-linejoin": X,
                        visibility: va.visible ? R : M,
                        cursor: ga ? "pointer" : n
                    };
                    J._xPos = y;
                    J._yPos = A;
                    J._height = H;
                    J._width = N;
                    J._index = g;
                    ea[ha.index][fa.index] = J;
                    J.graphics.element ? (f = {
                        x: y,
                        y: A,
                        width: N,
                        height: H || 1
                    }, J = J.graphics.element, J.animateWith(U,
                        F, f, P, C.animType), J.attr({
                        ishot: !E,
                        fill: va.color,
                        stroke: K(ia[1]),
                        "fill-opacity": va.visible ? va.plotFillAlpha / 100 : 0,
                        "stroke-width": va.visible ? wa : 0,
                        "stroke-dasharray": void 0,
                        "stroke-linejoin": X,
                        visibility: va.visible ? R : M,
                        cursor: ga ? "pointer" : n
                    }), va.elemCreated = !1) : (J = J.graphics.element = r.rect(f, qa), J.animateWith(U, F, {
                        "fill-opacity": va.plotFillAlpha / 100,
                        "stroke-width": wa
                    }, P, V), va.elemCreated = !0);
                    J.shadow({opacity: Fa}, la).data("BBox", void 0);
                    if (ga || E) H < ka && (A -= (ka - H) / 2, H = ka), Y.attr = {
                        x: y,
                        y: A,
                        width: N,
                        height: H,
                        r: oa,
                        cursor: ga ? "pointer" : n,
                        stroke: L,
                        "stroke-width": wa,
                        fill: L,
                        ishot: !0,
                        visibility: va.visible ? R : M
                    };
                    m.config.enablemousetracking && J.data("eventArgs", Y.eventArgs).data(W, ya).data("setRolloverAttr", va.setRolloverAttr || {}).data("setRolloutAttr", va.setRolloutAttr || {})
                } else J.graphics.element && J.graphics.element.hide(), J.graphics.hotElement && J.graphics.hotElement.hide();
                this.drawn ? this.drawLabel() : l.labelDrawID.push(Z.addJob(this.drawLabel.bind(this), a.priorityList.label));
                this.drawn = !0;
                Aa && this.remove()
            },
            drawLabel: function () {
                var a = this.chart, d = a.config, c = a.graphics, b = a.components.paper, f = a.linkedItems.smartLabel,
                    g = a.config.dataLabelStyle, h = this.config, m = this.JSONData.data.length,
                    r = this.components.data, v = this.visible, z, w, y, D, E, K, V = this.graphics.dataLabelContainer,
                    L = this.graphics.tlLabelContainer, I = this.graphics.blLabelContainer,
                    U = this.graphics.trLabelContainer, P = this.graphics.brLabelContainer, H, N, Z, T, J, W, S, X, ka,
                    wa, oa, qa, la, ia, a = a.get(e, ba), ea = a.animObj, sa = a.dummyObj, fa = a.duration,
                    c = c.datalabelsGroup;
                V || (V = this.graphics.dataLabelContainer = b.group(B, c), v || V.hide());
                L || (L = this.graphics.tlLabelContainer = b.group("tlLabel", c));
                I || (I = this.graphics.blLabelContainer = b.group("blLabel", c));
                U || (U = this.graphics.trLabelContainer = b.group("trLabel", c));
                P || (P = this.graphics.brLabelContainer = b.group("brLabel", c));
                v = h.tlLabelStyle;
                c = h.trLabelStyle;
                H = h.blLabelStyle;
                N = h.brLabelStyle;
                z = {
                    fontFamily: v.fontFamily,
                    fontSize: v.fontSize,
                    lineHeight: v.lineHeight,
                    fontWeight: v.fontWeight,
                    fontStyle: v.fontStyle
                };
                y = {
                    fontFamily: c.fontFamily,
                    fontSize: c.fontSize, lineHeight: c.lineHeight, fontWeight: c.fontWeight, fontStyle: c.fontStyle
                };
                Z = {
                    fontFamily: H.fontFamily,
                    fontSize: H.fontSize,
                    lineHeight: H.lineHeight,
                    fontWeight: H.fontWeight,
                    fontStyle: H.fontStyle
                };
                T = {
                    fontFamily: N.fontFamily,
                    fontSize: N.fontSize,
                    lineHeight: N.lineHeight,
                    fontWeight: N.fontWeight,
                    fontStyle: N.fontStyle
                };
                f.useEllipsesOnOverflow(d.useEllipsesWhenOverflow);
                f.setStyle(g);
                L.css(z);
                I.css(Z);
                U.css(y);
                P.css(T);
                for (z = 0; z < m; z++) if (d = r[z], void 0 !== d && (y = d.graphics)) if (y = d && d.config, Z = y.setValue,
                h.mapByCategory || null !== Z) {
                    if (w = y.displayValue, Z = d.graphics.element) Z = d._width, T = d._height, J = d._xPos, W = d._yPos, f.setStyle(g), ga(w) && w !== Q && y.showValue ? (S = f.getSmartText(w, Z, T, !1), w = S.text, D = W + .5 * T, E = J + .5 * Z, d.graphics.valEle ? (d.graphics.valEle.animateWith(sa, ea, {
                            x: E,
                            y: D
                        }, fa, a.animType), d.graphics.valEle.attr({
                            text: w,
                            title: S.tooltext || n,
                            visibility: y.visible ? R : M,
                            fill: g.color,
                            direction: y.textDirection,
                            "text-bound": [g.backgroundColor, g.borderColor, g.borderThickness, g.borderPadding, g.borderRadius, g.borderDash]
                        })) :
                        (w = {
                            text: w,
                            title: S.tooltext || n,
                            visibility: y.visible ? R : M,
                            fill: g.color,
                            direction: y.textDirection,
                            x: E,
                            y: D,
                            "text-bound": [g.backgroundColor, g.borderColor, g.borderThickness, g.borderPadding, g.borderRadius, g.borderDash]
                        }, d.graphics.valEle = b.text(w, V)), y.visible && d.graphics.valEle.show(), w = y.tlLabel, E = y.trLabel, X = y.blLabel, ka = y.brLabel, K = ga(w) && w !== Q, wa = ga(E) && E !== Q, oa = ga(X) && X !== Q, qa = ga(ka) && ka !== Q, la = Z * (K && wa ? .5 : .9), ia = .5 * (T - (S && S.height || 0)), D = W + 4, K ? (f.setStyle(v), S = f.getSmartText(w, la, ia, !1), w = S.text,
                        K = J, d.graphics.tlLabel ? (d.graphics.tlLabel.animateWith(sa, ea, {
                        x: K + 4,
                        y: D
                    }, fa, a.animType), d.graphics.tlLabel.attr({
                        text: w,
                        title: S.tooltext || n,
                        visibility: y.visible ? R : M,
                        fill: v.color,
                        "text-anchor": A,
                        "vertical-align": F,
                        direction: y.textDirection,
                        "text-bound": [v.backgroundColor, v.borderColor, v.borderThickness, v.borderPadding, v.borderRadius, v.borderDash]
                    })) : (w = {
                        text: w,
                        title: S.tooltext || n,
                        visibility: y.visible ? R : M,
                        fill: v.color,
                        "text-anchor": A,
                        "vertical-align": F,
                        direction: y.textDirection,
                        x: K + 4,
                        y: D,
                        "text-bound": [v.backgroundColor,
                            v.borderColor, v.borderThickness, v.borderPadding, v.borderRadius, v.borderDash]
                    }, d.graphics.tlLabel = b.text(w, L)), y.visible && d.graphics.tlLabel.show()) : d.graphics.tlLabel && (d.graphics.tlLabel.remove(), delete d.graphics.tlLabel), wa ? (f.setStyle(c), S = f.getSmartText(E, la, ia, !1), w = S.text, K = J + Z, d.graphics.trLabel ? (d.graphics.trLabel.animateWith(sa, ea, {
                        x: K - 4,
                        y: D
                    }, fa, a.animType), d.graphics.trLabel.attr({
                        text: w,
                        title: S.tooltext || n,
                        visibility: y.visible ? R : M,
                        fill: c.color,
                        "text-anchor": l,
                        "vertical-align": F,
                        direction: y.textDirection,
                        "text-bound": [c.backgroundColor, c.borderColor, c.borderThickness, c.borderPadding, c.borderRadius, c.borderDash]
                    })) : (w = {
                        text: w,
                        title: S.tooltext || n,
                        visibility: y.visible ? R : M,
                        fill: c.color,
                        "text-anchor": l,
                        "vertical-align": F,
                        direction: y.textDirection,
                        x: K - 4,
                        y: D,
                        "text-bound": [c.backgroundColor, c.borderColor, c.borderThickness, c.borderPadding, c.borderRadius, c.borderDash]
                    }, d.graphics.trLabel = b.text(w, U)), y.visible && d.graphics.trLabel.show()) : d.graphics.trLabel && (d.graphics.trLabel.remove(), delete d.graphics.trLabel),
                        D = W + T - 4, oa ? (f.setStyle(H), S = f.getSmartText(X, la, ia, !1), w = S.text, K = J, d.graphics.blLabel ? (d.graphics.blLabel.animateWith(sa, ea, {
                        x: K + 4,
                        y: D
                    }, fa, a.animType), d.graphics.blLabel.attr({
                        text: w,
                        title: S.tooltext || n,
                        visibility: y.visible ? R : M,
                        fill: H.color,
                        "text-anchor": A,
                        "vertical-align": C,
                        direction: y.textDirection,
                        "text-bound": [H.backgroundColor, H.borderColor, H.borderThickness, H.borderPadding, H.borderRadius, H.borderDash]
                    })) : (w = {
                        text: w,
                        title: S.tooltext || n,
                        visibility: y.visible ? R : M,
                        fill: H.color,
                        "text-anchor": A,
                        "vertical-align": C,
                        direction: y.textDirection,
                        x: K + 4,
                        y: D,
                        "text-bound": [H.backgroundColor, H.borderColor, H.borderThickness, H.borderPadding, H.borderRadius, H.borderDash]
                    }, d.graphics.blLabel = b.text(w, I)), y.visible && d.graphics.blLabel.show()) : d.graphics.blLabel && (d.graphics.blLabel.remove(), delete d.graphics.blLabel), qa ? (f.setStyle(H), S = f.getSmartText(ka, la, ia, !1), w = S.text, K = J + Z - 4, d.graphics.brLabel ? (d.graphics.brLabel.animateWith(sa, ea, {
                            x: K,
                            y: D
                        }, fa, a.animType), d.graphics.brLabel.attr({
                            text: w,
                            title: S.tooltext || n,
                            visibility: y.visible ?
                                R : M,
                            fill: N.color,
                            "text-anchor": l,
                            "vertical-align": C,
                            direction: y.textDirection,
                            "text-bound": [N.backgroundColor, N.borderColor, N.borderThickness, N.borderPadding, N.borderRadius, N.borderDash]
                        })) : (w = {
                            text: w,
                            title: S.tooltext || n,
                            visibility: y.visible ? R : M,
                            fill: N.color,
                            "text-anchor": l,
                            "vertical-align": C,
                            direction: y.textDirection,
                            x: K,
                            y: D,
                            "text-bound": [N.backgroundColor, N.borderColor, N.borderThickness, N.borderPadding, N.borderRadius, N.borderDash]
                        }, d.graphics.brLabel = b.text(w, P)), y.visible && d.graphics.brLabel.show()) :
                        d.graphics.brLabel && (d.graphics.brLabel.remove(), delete d.graphics.brLabel)) : (d.graphics.valEle && (d.graphics.valEle.remove(), delete d.graphics.valEle), d.graphics.tlLabel && (d.graphics.tlLabel.remove(), delete d.graphics.tlLabel), d.graphics.trLabel && (d.graphics.trLabel.remove(), delete d.graphics.trLabel), d.graphics.blLabel && (d.graphics.blLabel.remove(), delete d.graphics.blLabel), d.graphics.brLabel && (d.graphics.brLabel.remove(), delete d.graphics.brLabel))
                } else d.graphics.valEle && d.graphics.valEle.hide(),
                d.graphics.tlLabel && d.graphics.tlLabel.hide(), d.graphics.trLabel && d.graphics.trLabel.hide(), d.graphics.blLabel && d.graphics.blLabel.hide(), d.graphics.brLabel && d.graphics.brLabel.hide();
                this.labelDrawn = !0
            }, remove: function () {
                var a = this.components, d = a.removeDataArr,
                    c = a.pool || (a.pool = {element: [], hotElement: [], label: []}), b = d.length, f,
                    e = this.maxminFlag, g, h, m;
                for (m = 0; m < b; m++) if (f = d[0], d.splice(0, 1), f && f.graphics) {
                    h = f.graphics;
                    for (g in h) h[g].stop(), h[g].hide();
                    f.graphics.element && (c.element = c.element.concat(f.graphics.element));
                    f.graphics.hotElement && (c.hotElement = c.hotElement.concat(f.graphics.hotElement));
                    f.graphics.label && (c.label = c.label.concat(f.graphics.label))
                }
                a.pool = c;
                e && this.setMaxMin()
            }, getEventArgs: function (a) {
                var d = a.dataset.config || {};
                return {datasetName: d.label, datasetIndex: a.index, visible: d.visible}
            }
        }, "Column"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-kagi", function () {
        var a = this.hcLib, c = this.window.Image, E = a.preDefStr, e = E.configStr, ba = E.animationObjStr,
            W = E.dataLabelStr, S = E.hiddenStr,
            I = E.ROUND, B = E.POSITION_TOP, X = E.POSITION_BOTTOM, M = E.line, R = a.BLANKSTRING, r = a.pluck,
            D = a.pluckNumber, v = a.toRaphaelColor, A = a.schedular, F = a.each, E = a.TOUCH_THRESHOLD_PIXELS,
            l = a.CLICK_THRESHOLD_PIXELS, C = Math, H = C.round, Q = C.min, n = C.max, b = C.abs,
            z = a.hasTouch ? E : l, f = a.POSITION_RIGHT;
        J.register("component", ["dataset", "Kagi", {
            type: "kagi", _parseShadowOptions: function () {
                var a = this.config;
                return {opacity: D(this.chart.jsonData.chart.showshadow, 1) ? a.alpha / 100 : 0}
            }, configure: function () {
                var c, e, m = this.chart, l = m.components.xAxis[0],
                    n = 0, v, w = [], z, g, y, A, E, d, C, F, h, q, k = a.getDashStyle, t, I, x, p, G, u, H, M, J, Q;
                h = 0;
                var S;
                this.__base__.configure.call(this);
                c = this.components;
                v = c.data;
                z = this.config;
                g = this.JSONData.data;
                m = m.jsonData.chart;
                y = z.maxValue;
                A = z.minValue;
                e = c.removeDataArr || (c.removeDataArr = []);
                c = !1;
                E = 0;
                d = D(m.reversalvalue, -1);
                C = D(m.reversalpercentage, 5);
                for (F = 0; F < v.length; F += 1) v[F].config.__nullCount = h, null === v[F].config.setValue && (e.push(v.splice(F, 1)[0]), h++, --F);
                if (v.length) {
                    z.rallyColor = r(m.rallycolor, "FF0000");
                    z.rallyAlpha = D(m.rallyalpha,
                        m.linealpha, 100);
                    z.declineColor = r(m.declinecolor, "0000FF");
                    z.declineAlpha = D(m.declinealpha, m.linealpha, 100);
                    z.canvasPadding = D(m.canvaspadding, 15);
                    z.maxHShiftPercent = D(m.maxhshiftpercent, 10);
                    z.rallyThickness = D(m.rallythickness, m.linethickness, 2);
                    F = D(m.rallydashlen, m.linedashlen, 5);
                    h = D(m.rallydashgap, m.linedashgap, 4);
                    z.declineThickness = D(m.declinethickness, m.linethickness, 2);
                    e = D(m.declinedashlen, m.linedashlen, 5);
                    q = D(m.declinedashgap, m.linedashgap, 4);
                    z.lineDashed = {
                        "true": D(m.rallydashed, m.linedashed,
                            0), "false": D(m.declinedashed, m.linedashed, 0)
                    };
                    z.rallyDashed = D(m.rallydashed, m.linedashed, 0) ? k(F, h, z.rallyThickness) : "none";
                    z.declineDashed = D(m.declinedashed, m.linedashed, 0) ? k(e, q, z.declineThickness) : "none";
                    z.canvasPadding = D(m.canvaspadding, this.canvasPadding, 15);
                    d = 0 < d ? d : C * (y - A) / 100;
                    k = v[0].config.setValue;
                    y = function (a, d) {
                        for (var c, b = 1, f = v[0].config.setValue; b < a;) c = v[b].config.setValue, d ? c <= f && (v[b].config.isDefined = !1) : c >= f && (v[b].config.isDefined = !1), b += 1;
                        v[0].config.vAlign = d ? X : B;
                        v[0].config.align =
                            "center"
                    };
                    A = g.length;
                    for (C = F = 0; C < A; C += 1, F += 1) if (t = g[C], !t || !t.vline) if (e = v[F] && v[F].config, I && (I = !1), e && (e.isDefined = !0), t.tooltext || this.JSONData.plottooltext || m.plottooltext || e && (e.toolText += e.displayValue), F && e) {
                        e.isShift = void 0;
                        x = v[F - 1].config;
                        e.vAlign = "middle";
                        e.align = f;
                        e.showLabel = !1;
                        h = null;
                        q = e.setValue;
                        p = v[F + 1] && v[F + 1].config.setValue;
                        G = b(k - q);
                        c ? q < H && u ? u = !1 : q > M && !u && (u = !0) : (q > k && G > d ? (u = !0, H = k, M = null, c = J = !0, y(F, u)) : q < k && G > d ? (u = !1, H = null, M = k, J = !1, c = !0, y(F, u)) : (J = u = null, c = !1), void 0 !== x && null !==
                        x && (x.isRally = u), null != u && (v[0].config.isRally = u));
                        e.isRally = u;
                        if (J && q < k || !J && q > k) h = k;
                        Q = h ? h : q;
                        G = b(Q - p);
                        p = null == J ? null : J ? Q > p && G >= d : Q < p && G >= d;
                        if (x && x.isShift) for (J ? (H = k, S = X) : J || (M = k, S = B), x = F; 1 < x; --x) if (v[x].y == k) {
                            v[x].vAlign = S;
                            v[x].align = "center";
                            v[x].showLabel = !0;
                            break
                        }
                        p ? (E += 1, I = !0, J = !J, e.isShift = !0, k = Q, w.push(g[F + e.__nullCount]), n = this._appendCategory(n, F, w, 0)) : J && q > k || !J && q < k ? k = q : h = k;
                        e.plotValue = h;
                        e.objParams = {isRally: u, lastHigh: M, lastLow: H, isRallyInitialised: c}
                    }
                    this._appendCategory(n, F, w, 1);
                    w.push(t);
                    l.setCategory(w);
                    z.shiftCount = E + 1
                }
            }, _appendCategory: function (a, c, b, f) {
                var e, l, n, r = this.JSONData.catData;
                if (a < r.length) for (e = a; e < r.length; e += 1, a = e) {
                    l = r[e];
                    n = l.data;
                    l = l.index - (e + 1);
                    if (l < c) n.lineposition = D(n.lineposition, f); else if (l > c) break;
                    b.push(n)
                }
                return a
            }, manageSpace: function () {
            }, _getHoveredPlot: function (a, c) {
                for (var b = this.chart, f = b.components.xAxis[0], e = this.config, l = e.trackIndex, n = this.components.data, r = b.components.canvas.config, r = a - b.config.canvasLeft - Math.max(r.canvasPaddingLeft, r.canvasPadding),
                         g, b = Math.floor(Math.max(f.getValue(r - e.maxRadius))), f = Math.ceil(Math.min(f.getValue(r + e.maxRadius))); f >= b; f--) for (r = (e = l[f]) && e.length; 0 <= r; r--) if (g = e[r], g = this.isWithinShape(n[g], g, a, c)) return g
            }, draw: function () {
                var b, f, m, l = this, r = l.graphics, B = l.JSONData;
                b = l.chart;
                var w = b.getJobList(), D = b.components, g = b.config, y = l.config, E = y.trackIndex = {},
                    C = l.components, d = C.data, N = (C = C.removeDataArr) && C.length, J = d && d.length,
                    C = d && d.length, h = D.paper, q = D.xAxis[0], k, t, D = b.graphics, O = D.datalabelsGroup, x, p,
                    G, u, R, X, La =
                        l.components.data, aa, db, fc, ta = r.container, xc, gc = D.datasetGroup, Qa, D = y.shadow, Ea,
                    ec = r.dataLabelContainer, Ta = {}, hc, pa, Na, Ra = function () {
                        ta.lineGroup.attr({"clip-rect": null});
                        ta.lineShadowGroup.show();
                        ta.anchorShadowGroup.show();
                        ta.anchorGroup.show();
                        ec && ec.show()
                    }, Va = !0, Da = q.getAxisPosition(0), Ia = q.getAxisPosition(1) - Da,
                    va = {"clip-rect": [n(0, g.canvasLeft), n(0, g.canvasTop), n(1, g.canvasWidth), n(1, g.canvasHeight)]},
                    Fa = {"clip-rect": [n(0, g.canvasLeft), n(0, g.canvasTop), 1, n(1, g.canvasHeight)]},
                    g = y.rallyThickness,
                    wa = y.declineThickness, oa = {
                        stroke: v({color: y.rallyColor, alpha: y.rallyAlpha}),
                        "stroke-linecap": I,
                        "stroke-linejoin": I,
                        "stroke-width": g,
                        "stroke-dasharray": y.rallyDashed
                    }, qa = {
                        stroke: v({color: y.declineColor, alpha: y.declineAlpha}),
                        "stroke-linecap": I,
                        "stroke-linejoin": I,
                        "stroke-width": wa,
                        "stroke-dasharray": y.declineDashed
                    }, la = {"true": g, "false": wa}, ia = [], ea = [], sa = r.rallyElem, fa = r.declineElem,
                    ha = l.visible, ca = q.getAxisPosition(0), Aa = d[0] && !!d[0].isRally, ya, Da = Da - Ia / 2, Y, ua,
                    xa, za = r.lineElement, Ga = l.pool || (l.pool =
                        {});
                b = b.get(e, ba);
                var Ma = b.duration || 0, ra = b.dummyObj, Ba = b.animObj, Ua = 0, Ja = b.animType, ja;
                y.imagesLoaded = 0;
                N && l.remove();
                if (d.length) {
                    sa && sa.show();
                    fa && fa.show();
                    ta || (ta = l.graphics.container = {
                        lineShadowGroup: h.group("connector-shadow", gc).attr(Fa),
                        anchorShadowGroup: h.group("anchor-shadow", gc).attr(Fa),
                        lineGroup: h.group(M, gc).attr(Fa),
                        anchorGroup: h.group("anchors", gc).attr(Fa)
                    }, ha || (ta.lineShadowGroup.hide(), ta.anchorShadowGroup.hide(), ta.lineGroup.hide(), ta.anchorGroup.hide()));
                    La || (La = l.components.data =
                        []);
                    ec || (ec = l.graphics.dataLabelContainer = l.graphics.dataLabelContainer || h.group(W, O), ha || ec.hide());
                    Q(J, C);
                    if (d[0].config.setValue) Y = d[0].config.plotY; else for (b = 1; b < C; b += 1) if (u = d[b].config.setValue) {
                        Y = d[b].config.plotY;
                        break
                    }
                    Aa = !!d[0].config.isRally;
                    b = H(Y) + la[Aa] % 2 / 2;
                    Aa ? ia.push("M", Da, b, "H", ca) : ea.push("M", Da, b, "H", ca);
                    F(d, function (a, b) {
                        a = a.config;
                        aa = La[b];
                        Na = aa.config;
                        f = a.trackerConfig = {};
                        m = aa.graphics;
                        ja = m.image;
                        Qa = Na.hoverEffects;
                        u = Na.setValue;
                        X = Na.displayValue;
                        ua = d[b + 1] && d[b + 1].config || {};
                        xa =
                            ["M", ca, Y];
                        Aa = a.isRally;
                        a.isShift && (ca += Ia, Y = a.graphY, xa.push("H", ca), xa[2] = H(xa[2]) + la[Aa] % 2 / 2, xa = xa.toString(), Aa ? ia.push(xa) : ea.push(xa), xa = ["M", ca, Y]);
                        ua.isChanged && (Y = ua.ty, xa.push("V", Y), xa[1] = H(xa[1]) + la[Aa] % 2 / 2, xa = xa.toString(), Aa ? ia.push(xa) : ea.push(xa), xa = ["M", ca, Y]);
                        ya = ua.isRally;
                        ua.graphY !== xa[2] && (xa.push("V", ua.graphY), xa[1] = H(xa[1]) + la[ya] % 2 / 2, xa = xa.toString(), ya ? ia.push(xa) : ea.push(xa));
                        Y = ua.graphY;
                        k = aa._xPos = q.getAxisPosition(a.plotX);
                        t = aa._yPos = a.plotY;
                        E[a.plotX] ? E[a.plotX].push(b) :
                            (E[a.plotX] = [], E[a.plotX].push(b));
                        aa._index = a.plotX;
                        Ta = Na.anchorProps;
                        pa = Ta.symbol;
                        Ea = Ta.shadow;
                        x = a.finalTooltext = a.toolText;
                        G = Na.setLink;
                        void 0 !== t && !isNaN(t) && a.isDefined ? (R = a.eventArgs = a.eventArgs || {}, R.index = b, R.link = G, R.value = u, R.displayValue = X, R.categoryLabel = Na.label, R.toolText = x, R.id = y.userID, R.datasetIndex = 0, R.datasetName = B.seriesname, R.visible = ha, db = fc = {}, Ta.imageUrl ? (hc = new c, Na.anchorImageLoaded = !1, hc.onload = l._onAnchorImageLoad(l, b, R, k, t, aa), hc.onerror = l._onErrorSetter(l, b), hc.src = Ta.imageUrl,
                            Ua++) : (ja && ja.hide(), (p = m.element) ? (p.animateWith(ra, Ba, {polypath: [pa[1] || 2, k, t, Ta.radius, Ta.startAngle, 0]}, Ma, Ja), Va && Ra(), Va = !1) : (p = Ga.element && Ga.element.length ? m.element = Ga.element.shift() : m.element = h.polypath(ta.anchorGroup), p.attr({polypath: [pa[1] || 2, k, t, Ta.radius, Ta.startAngle, 0]})), p.attr({
                            fill: v({
                                color: Ta.bgColor,
                                alpha: Ta.bgAlpha
                            }),
                            stroke: v({color: Ta.borderColor, alpha: Ta.borderAlpha}),
                            "stroke-width": Ta.borderThickness,
                            visibility: Ta.radius ? ha : S
                        }).shadow(Ea, ta.anchorShadowGroup).data("anchorRadius",
                            Ta.radius).data("anchorHoverRadius", Qa.anchorRadius).data("hoverEnabled", Qa.enabled).data("eventArgs", R), xc = n(Ta.radius, Qa && Qa.anchorRadius || 0, z) + Ta.borderThickness / 2, f.trackerRadius = xc), Qa.enabled && (fc = {
                            polypath: [Qa.anchorSides || 2, k, t, Qa.anchorRadius, Qa.startAngle, Qa.dip],
                            fill: v({color: Qa.anchorColor, alpha: Qa.anchorBgAlpha}),
                            stroke: v({color: Qa.anchorBorderColor, alpha: Qa.anchorBorderAlpha}),
                            "stroke-width": Qa.anchorBorderThickness
                        }, db = {
                            polypath: [Ta.sides, k, t, Ta.radius, Ta.startAngle, 0],
                            fill: v({
                                color: Ta.bgColor,
                                alpha: Ta.bgAlpha
                            }),
                            stroke: v({color: Ta.borderColor, alpha: Ta.borderAlpha}),
                            "stroke-width": Ta.borderThickness
                        }, p && p.data("anchorRadius", Ta.radius).data("anchorHoverRadius", Qa.anchorRadius).data("hoverEnabled", Qa.enabled).data("setRolloverAttr", fc).data("setRolloutAttr", db).data("eventArgs", R))) : (m.element && m.element.hide(), ja && ja.hide())
                    });
                    za || (sa || (za = sa = r.rallyElem = h.path(ta.lineGroup)), sa.animateWith(ra, Ba, {path: ia}, Va ? 0 : Ma, Ja).attr(oa).shadow(g && D, ta.lineShadowGroup), fa || (za = fa = r.declineElem = h.path(ta.lineGroup)),
                        fa.animateWith(ra, Ba, {path: ea}, Va ? 0 : Ma, Ja).attr(qa).shadow(wa && D, ta.lineShadowGroup));
                    Ma && Va || (Va = !1);
                    y.noOfImages = y.totalImages = Ua;
                    0 === Ua && (l.drawn ? l.drawLabel() : w.labelDrawID.push(A.addJob(l.drawLabel.bind(l), a.priorityList.tracker)));
                    l.drawn = !0;
                    ta.anchorGroup.animateWith(ra, Ba, va, Ma, Ja);
                    ec.hide();
                    ta.lineShadowGroup.animateWith(ra, Ba, va, Ma, Ja);
                    ta.anchorShadowGroup.animateWith(ra, Ba, va, Ma, Ja);
                    ta.lineShadowGroup.animateWith(ra, Ba, va, Ma, Ja);
                    ta.lineGroup.animateWith(ra, Ba, va, Ma, Ja, Ra)
                } else sa && sa.hide(),
                fa && fa.hide()
            }, hidingPosition: function () {
                return function (a) {
                    a = a.graphics.element;
                    return {polypath: (a && a.attr("polypath"))[3] = 0, r: 0, text: R}
                }
            }
        }, "Line"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-group-errorbar2d", function () {
        J.register("component", ["datasetGroup", "errorbar2d", {}, this.hcLib.preDefStr.column])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-group-dragnode", function () {
        var a = this.hcLib, c = a.preDefStr, E = c.colors, e = E.FFFFFF, ba = E.c000000, W = c.configStr,
            S = c.animationObjStr,
            I = a.BLANKSTRING, B = a.BLANKSTRING, X = a.pluck, M = a.getFirstValue, R = a.extend2, r = a.HASHSTRING,
            D = a.hashify, v = a.each, A = a.componentDispose, F = function (a) {
                return void 0 !== a && null !== a
            }, c = Math, l = c.min, C = c.max, H = a.hasTouch, Q = a.COMMASTRING, c = a.graphics, n = c.parseColor,
            b = c.getValidColor;
        J.register("component", ["datasetGroup", "Dragnode", {
            init: function () {
                this.connectorSet = [];
                this.nodes = {};
                this.datasets = [];
                this.components = [];
                this.graphics = {};
                this.labelSet = []
            },
            addDataset: function (a, c) {
                var b = this.datasets[c];
                a.groupManager =
                    this;
                a.datasetIndex = c;
                b || (this.datasets[c] = {dataset: a})
            },
            addLabels: function (a, c) {
                var b = this.labelSet[c];
                a.groupManager = this;
                b || (this.labelSet[c] = {labels: a})
            },
            addConnectors: function (a, c) {
                var b = this.connectorSet[c];
                a.groupManager = this;
                b || (this.connectorSet[c] = {connectors: a})
            },
            showNodeAddUI: function () {
                var a = this.chart, c = a.components.dataset, b = B, e, m, l;
                for (l = 0; l < c.length; l++) m = c[l] || {}, e = m.config, m = m.plotType, "dragnode" === m && (b += '<option value="' + e.id + '">' + (e.name !== I && void 0 !== e.name && e.name + Q + " " || I) +
                    e.id + "</option>");
                this.showNodeUpdateUI(a, {dataset: {innerHTML: b}})
            },
            showConnectorAddUI: function () {
                var a = this.chart, c = this.nodes, b = B, e, m;
                for (m in c) e = c[m], e = e.config, e = e.id, b += '<option value="' + e + '">' + e + "</option>";
                this.showConnectorUpdateUI(a, {fromid: {innerHTML: b}, toid: {innerHTML: b}})
            },
            draw: function () {
                var a = this.datasets, c = this.connectorSet, b, e, m = this.labelSet, l;
                this.updateUIvisuals();
                b = 0;
                for (l = a.length; b < l; b++) e = a[b].dataset, e.draw();
                b = 0;
                for (l = c.length; b < l; b++) a = c[b].connectors, a.draw();
                b = 0;
                for (l =
                         m.length; b < l; b++) c = m[b].labels, c.draw();
                this.drawn = !0
            },
            getJSONData: function () {
                var a = this.datasets, b = this.connectorSet, c = this.labelSet, e = {}, m, l, n;
                e.dataset = [];
                e.connectors = [];
                e.labels = [];
                m = 0;
                for (l = a.length; m < l; m++) n = a[m] && a[m].dataset, e.dataset[m] || (e.dataset[m] = R({}, n.JSONData)), e.dataset[m].data = n.getJSONData();
                m = 0;
                for (l = b.length; m < l; m++) n = b[m] && b[m].connectors, e.connectors[m] || (e.connectors[m] = R({}, n.JSONData)), e.connectors[m].connector = n.getJSONData();
                m = 0;
                for (l = c.length; m < l; m++) n = c[m] && c[m].labels,
                e.labels[m] || (e.labels[m] = {label: []}), e.labels[m].label = n.getJSONData();
                return e
            },
            clearLongPress: function () {
                this.data("move", !1);
                clearTimeout(this._longpressactive);
                delete this._longpressactive
            },
            createHtmlDialog: function (a, b, c, l, m, n, v) {
                var A = a.components.paper, w = a.config.style.inCanvasStyle || {}, B = a.config.width,
                    g = a.config.height, y = a.get(W, S).transposeAnimDuration, E = {
                        color: D(w.color),
                        textAlign: "center",
                        paddingTop: "1px",
                        border: "1px solid #cccccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        _cursor: "hand",
                        backgroundColor: r +
                            e,
                        zIndex: 21,
                        "-webkit-border-radius": "4px"
                    }, C = v;
                C ? y ? C.animate({width: B, height: g}, y, "normal") : C.attr({
                    width: B,
                    height: g
                }) : C = A.html("div", {fill: "transparent", width: B, height: g}, {
                    fontSize: "10px",
                    lineHeight: "15px",
                    fontFamily: w.fontFamily
                }, a.linkedItems.container);
                C.veil ? y ? C.veil.animate({width: B, height: g}, y, "normal") : C.veil.attr({
                    width: B,
                    height: g
                }) : C.veil = A.html("div", {fill: ba, width: B, height: g, opacity: .3}, void 0, C);
                a = {x: (B - b) / 2, y: (g - c) / 2, fill: "efefef", strokeWidth: 1, stroke: ba, width: b, height: c};
                C.dialog ? y ?
                    C.dialog.animate({
                        x: a.x,
                        y: a.y,
                        width: a.width,
                        height: a.height
                    }, y, "normal") : C.dialog.attr(a) : C.dialog = A.html("div", a, {
                    borderRadius: "5px",
                    boxShadow: "1px 1px 3px #000000",
                    "-webkit-border-radius": "5px",
                    "-webkit-box-shadow": "1px 1px 3px #000000",
                    filter: 'progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color="#000000")'
                }, C);
                a = {x: b - 70 - 5, y: c - 23 - 5, width: 65, height: 17, text: "Submit", tabIndex: 1};
                C.ok ? y ? C.ok.animate({
                    x: a.x,
                    y: a.y,
                    width: a.width,
                    height: a.height
                }, y, "normal") : C.ok.attr(a) : C.ok = A.html("div",
                    a, E, C.dialog).on("click", l);
                l = {x: b - 140 - 5, y: c - 23 - 5, width: 65, height: 17, text: "Cancel", tabIndex: 2};
                C.cancel ? y ? C.cancel.animate({
                    x: l.x,
                    y: l.y,
                    width: l.width,
                    height: l.height
                }, y, "normal") : C.cancel.attr(l) : C.cancel = A.html("div", l, E, C.dialog).on("click", m);
                b = {x: b - 210 - 5, y: c - 23 - 5, width: 65, height: 17, text: "Delete", tabIndex: 3};
                C.remove ? y ? C.remove.animate({
                    x: b.x,
                    y: b.y,
                    width: b.width,
                    height: b.height
                }, y, "normal") : C.remove.attr(b) : C.remove = A.html("div", b, E, C.dialog).on("click", n);
                C.handleKeyPress || (C.handleKeyPress = function (a) {
                    13 ===
                    a.keyCode ? C.ok.trigger(H ? "touchStart" : "click", a) : 27 === a.keyCode && C.cancel.trigger(H ? "touchStart" : "click", a)
                });
                return C
            },
            updateUIvisuals: function () {
                var a = this.graphics.cacheConnectorUpdateUI, b = this.chart, c = this.graphics.cacheLabelUpdateUI,
                    e = this.graphics.cacheLabelDeleteUI, m = this.graphics.cacheUpdateUI;
                a && this.createHtmlDialog(b, 350, 215, void 0, void 0, void 0, a);
                m && this.createHtmlDialog(b, 350, 215, void 0, void 0, void 0, m);
                c && this.createHtmlDialog(b, 350, 215, void 0, void 0, void 0, c);
                e && this.createHtmlDialog(b,
                    350, 215, void 0, void 0, void 0, e)
            },
            showConnectorUpdateUI: function (a, b, c) {
                var e = a.components.paper, m = this.cacheConnectorUpdateUI, l = {
                    border: "1px solid #cccccc",
                    fontSize: "10px",
                    lineHeight: "15px",
                    fontFamily: (a.config.style.inCanvasStyle || {}).fontFamily,
                    padding: "2px"
                }, n = {textAlign: "right"}, r = m && m.fields, w = m && m.labels, A, g, y, C = function () {
                    var d = m && m.fields, d = {from: d.fromid.val(), to: d.toid.val(), id: d.id.val()};
                    a.deleteConnector(d);
                    m.hide()
                }, D;
                m ? (m.attr({width: a.config.width, height: a.config.height}), m.veil.attr({
                    width: a.config.width,
                    height: a.config.height
                }), m.dialog.attr({
                    x: (a.config.width - 315) / 2,
                    y: (a.config.height - 215) / 2,
                    width: 315,
                    height: 215
                })) : (m = this.graphics.cacheConnectorUpdateUI = this.createHtmlDialog(a, 315, 215, function () {
                    var d = m && m.fields, b;
                    d && (b = {
                        from: d.fromid.val(),
                        to: d.toid.val(),
                        id: d.id.val(),
                        label: d.label.val(),
                        color: d.color.val(),
                        alpha: d.alpha.val(),
                        link: d.url.val(),
                        tooltext: d.tooltext.val(),
                        strength: d.strength.val(),
                        arrowatstart: d.arratstart.val(),
                        arrowatend: d.arratend.val(),
                        dashed: d.dashed.val(),
                        dashlen: d.dashlen.val(),
                        dashgap: d.dashgap.val()
                    }, b.from ? b.to ? b.from != b.to ? (c ? a.editConnector(b) : a.addConnector(b), m.enableFields(), m.hide(), m.clearFields()) : (m.error.attr({text: "Connector cannot start and end at the same node!"}), d.fromid.focus()) : (m.error.attr({text: "Please select a valid connector end."}), d.toid.focus()) : (m.error.attr({text: "Please select a valid connector start."}), d.fromid.focus()))
                }, function () {
                    m.error.attr({text: B});
                    m.enableFields();
                    m.hide()
                }, C), D = m.dialog, w = m.labels = {}, r = m.fields = {});
                m.config = b;
                m.enableFields ||
                (m.enableFields = function () {
                    for (var a in b) b[a] && b[a].disabled && r[a] && r[a].element.removeAttribute("disabled")
                });
                m.clearFields || (m.clearFields = function () {
                    var a, b = m.fields;
                    for (a in b) b[a].element.disabled || (b[a].element.value = B)
                });
                v(this.connectorUpdateUIDefinition, function (a) {
                    var c = a.key, v = b[c] || {};
                    w[c] || (w[c] = e.html("label", {x: a.x, y: a.y, width: a.labelWidth || 45, text: a.text}, n, D));
                    if (!a.noInput) {
                        if (!(g = r[c])) {
                            g = r[c] = e.html(a.inputType || "input", {
                                y: -2 + (a.inputPaddingTop || 0), x: a.labelWidth && a.labelWidth +
                                    5 || 50, width: a.inputWidth || 50, name: c || B
                            }, l);
                            if ("select" !== a.inputType) g.attr({type: a.type || "text"}).on("keyup", m.handleKeyPress);
                            g.add(w[c])
                        }
                        (A = X(v.innerHTML, a.innerHTML)) && g.attr({innerHTML: A});
                        void 0 !== (y = X(v.val, a.val)) && g.val(y);
                        v.disabled && g.attr({disabled: "disabled"})
                    }
                });
                m.checkDash = function () {
                    var a = r.dashed && r.dashed.val() ? "show" : "hide";
                    w.dashgap && w.dashgap[a]();
                    r.dashgap && r.dashgap[a]();
                    w.dashlen && w.dashlen[a]();
                    r.dashlen && r.dashlen[a]()
                };
                m.checkDash();
                r.dashed.on("click", m.checkDash);
                m.error ||
                (m.error = e.html("span", {color: "ff0000", x: 10, y: 170}, void 0, D));
                m.remove[c ? "show" : "hide"]();
                a.animation ? m.fadeIn("fast") : m.show()
            },
            labelUpdateUIDefinition: [{key: "label", text: "Label*", x: 10, y: 15, inputWidth: 235}, {
                key: "size",
                text: "Size",
                x: 10,
                y: 40
            }, {key: "padding", text: "Padding", x: 10, y: 65}, {
                key: "x",
                text: "Position",
                x: 120,
                y: 65,
                labelWidth: 70,
                inputWidth: 25
            }, {key: "y", text: ",", x: 225, y: 65, labelWidth: 10, inputWidth: 25}, {
                key: "xy",
                text: "(x, y)",
                x: 260,
                y: 65,
                noInput: !0
            }, {
                key: "allowdrag", text: "Allow Drag", x: 120, y: 40, inputType: "checkbox",
                inputPaddingTop: 3, inputWidth: 15, labelWidth: 70, val: 1
            }, {key: "color", text: "Color", x: 10, y: 90}, {
                key: "alpha",
                text: "Alpha",
                x: 145,
                y: 90,
                inputWidth: 30,
                val: a.HUNDREDSTRING
            }, {key: "bordercolor", text: "Border Color", x: 10, y: 125, labelWidth: 100}, {
                key: "bgcolor",
                text: "Background Color",
                x: 10,
                y: 150,
                labelWidth: 100
            }],
            showLabelUpdateUI: function (a, b) {
                var c = a.components.paper, e = this.graphics.cacheLabelUpdateUI, m = {
                    border: "1px solid #cccccc",
                    fontSize: "10px",
                    lineHeight: "15px",
                    fontFamily: (a.config.style.inCanvasStyle || {}).fontFamily,
                    padding: "2px"
                }, l = {textAlign: "right"}, n = e && e.fields, r = e && e.labels, w, A, g;
                e || (e = this.graphics.cacheLabelUpdateUI = this.createHtmlDialog(a, 315, 205, function () {
                        var b = e && e.fields, c;
                        b && (c = {
                            text: b.label.val(),
                            x: b.x.val(),
                            y: b.y.val(),
                            color: b.color.val(),
                            alpha: b.alpha.val(),
                            bgcolor: b.bgcolor.val(),
                            bordercolor: b.bordercolor.val(),
                            fontsize: b.size.val(),
                            allowdrag: b.allowdrag.val(),
                            padding: b.padding.val()
                        }, c.text ? (a.addLabel && a.addLabel(c), e.hide()) : (e.error.attr({text: "Label cannot be blank."}), b.label.focus()))
                    },
                    function () {
                        e.error.attr({text: B});
                        e.hide()
                    }), g = e.dialog, r = e.labels = {}, n = e.fields = {});
                v(this.labelUpdateUIDefinition, function (a) {
                    var v = a.key;
                    r[v] || (r[v] = c.html("label", {x: a.x, y: a.y, width: a.labelWidth || 45, text: a.text}, l, g));
                    a.noInput || ((w = n[v]) || (w = n[v] = c.html("input", {
                        y: -2 + (a.inputPaddingTop || 0),
                        x: a.labelWidth && a.labelWidth + 5 || 50,
                        width: a.inputWidth || 50,
                        type: a.inputType || "text",
                        name: v || B
                    }, m, r[v]).on("keyup", e.handleKeyPress)), void 0 !== (A = X(b[v], a.val)) && w.val(A))
                });
                e.error || (e.error = c.html("span", {
                    color: "ff0000",
                    x: 10, y: 180
                }, void 0, g));
                a.animation ? e.fadeIn("fast") : e.show();
                e.fields.label.focus()
            },
            showLabelDeleteUI: function (a) {
                var b = this.chart, c = b.get(W, S).duration, e = b.components.paper,
                    m = this.graphics.cacheLabelDeleteUI;
                m || (m = this.graphics.cacheLabelDeleteUI = this.createHtmlDialog(b, 250, 100, void 0, function () {
                    m.hide()
                }, function () {
                    b.deleteLabel(a.config.index);
                    m.hide()
                }), m.message = e.html("span", {
                    x: 10,
                    y: 10,
                    width: 230,
                    height: 80
                }).add(m.dialog), m.ok.hide(), m.remove.translate(175).show());
                m.message.attr({
                    text: 'Would you really like to delete the label: "' +
                        a.config.text + '"?'
                });
                c ? m.fadeIn("fast") : m.show()
            },
            connectorUpdateUIDefinition: [{
                key: "fromid",
                text: "Connect From",
                inputType: "select",
                x: 10,
                y: 15,
                labelWidth: 80,
                inputWidth: 100
            }, {
                key: "toid",
                text: "Connect To",
                inputType: "select",
                x: 10,
                y: 40,
                labelWidth: 80,
                inputWidth: 100
            }, {
                key: "arratstart",
                text: "Arrow At Start",
                x: 200,
                y: 15,
                type: "checkbox",
                inputPaddingTop: 3,
                labelWidth: 80,
                inputWidth: 15
            }, {
                key: "arratend",
                text: "Arrow At End",
                x: 200,
                y: 40,
                type: "checkbox",
                inputPaddingTop: 3,
                labelWidth: 80,
                inputWidth: 15
            }, {
                key: "label", text: "Label",
                x: 10, y: 75, labelWidth: 40, inputWidth: 120
            }, {key: "id", text: "Node ID", x: 190, y: 75, inputWidth: 55}, {
                key: "color",
                text: "Color",
                x: 10,
                y: 100,
                labelWidth: 40,
                inputWidth: 35
            }, {key: "alpha", text: "Alpha", x: 110, y: 100, inputWidth: 25, labelWidth: 35}, {
                key: "strength",
                text: "Strength",
                x: 190,
                y: 100,
                inputWidth: 55,
                val: "0.1"
            }, {key: "url", text: "Link", x: 10, y: 125, labelWidth: 40, inputWidth: 120}, {
                key: "tooltext",
                text: "Tooltip",
                x: 190,
                y: 125,
                labelWidth: 40,
                inputWidth: 60
            }, {
                key: "dashed", text: "Dashed", x: 10, y: 150, type: "checkbox", inputPaddingTop: 3,
                inputWidth: 15, labelWidth: 40
            }, {key: "dashgap", text: "Dash Gap", x: 85, y: 150, labelWidth: 60, inputWidth: 25}, {
                key: "dashlen",
                text: "Dash Length",
                x: 190,
                y: 150,
                labelWidth: 70,
                inputWidth: 30
            }],
            nodeUpdateUIDefinition: [{key: "id", text: "Id", inputWidth: 60, x: 10, y: 15}, {
                key: "dataset",
                text: "dataset",
                inputType: "select",
                inputWidth: 110,
                innerHTML: void 0,
                x: 170,
                y: 15
            }, {key: "x", text: "Value", x: 10, y: 40, inputWidth: 21}, {
                key: "y",
                text: ",",
                x: 88,
                y: 40,
                inputWidth: 21,
                labelWidth: 5
            }, {text: "(x, y)", x: 125, y: 40, labelWidth: 33, noInput: !0}, {
                key: "tooltip",
                text: "Tooltip", inputWidth: 105, x: 170, y: 40
            }, {key: "label", text: "Label", inputWidth: 92, x: 10, y: 65}, {
                key: "labelalign",
                text: "Align",
                labelWidth: 70,
                inputWidth: 110,
                inputType: "select",
                innerHTML: '<option></option><option value="top">Top</option><option value="middle">Middle</option><option value="bottom">Bottom</option>',
                x: 145,
                y: 63
            }, {key: "color", text: "Color", x: 10, y: 90, inputWidth: 60}, {
                key: "colorOut",
                innerHTML: "&nbsp;",
                x: 85,
                y: 90,
                inputWidth: 15,
                inputType: "span"
            }, {key: "alpha", text: "Alpha", x: 170, y: 90, inputWidth: 20},
                {
                    key: "draggable",
                    text: "Allow Drag",
                    value: !0,
                    inputWidth: 20,
                    x: 250,
                    y: 90,
                    labelWidth: 58,
                    inputPaddingTop: 3,
                    type: "checkbox"
                }, {
                    key: "shape",
                    text: "Shape",
                    inputType: "select",
                    inputWidth: 97,
                    innerHTML: '<option value="rect">Rectangle</option><option value="circ">Circle</option><option value="poly">Polygon</option>',
                    x: 10,
                    y: 115
                }, {key: "rectHeight", text: "Height", x: 170, y: 115, inputWidth: 20}, {
                    key: "rectWidth",
                    text: "Width",
                    x: 255,
                    y: 115,
                    inputWidth: 20
                }, {key: "circPolyRadius", text: "Radius", x: 170, y: 115, inputWidth: 20}, {
                    key: "polySides",
                    text: "Sides", x: 255, y: 115, inputWidth: 20
                }, {key: "link", text: "Link", x: 10, y: 140, inputWidth: 92}, {
                    key: "image",
                    text: "Image",
                    type: "checkbox",
                    inputPaddingTop: 4,
                    inputWidth: 20,
                    x: 10,
                    y: 170
                }, {key: "imgUrl", text: "URL", inputWidth: 105, x: 170, y: 170}, {
                    key: "imgWidth",
                    text: "Width",
                    inputWidth: 20,
                    x: 10,
                    y: 195
                }, {key: "imgHeight", text: "Height", inputWidth: 20, x: 82, y: 195}, {
                    key: "imgAlign",
                    text: "Align",
                    inputType: "select",
                    inputWidth: 75,
                    innerHTML: '<option value="top">Top</option><option value="middle">Middle</option><option value="bottom">Bottom</option>',
                    x: 170,
                    y: 195
                }],
            showNodeUpdateUI: function () {
                var c = function () {
                    for (var a = this.graphics.cacheUpdateUI, b = a.fields.shape, c = ["rectWidth", "rectHeight", "circPolyRadius", "polySides"], e = c.length, f; e--;) f = c[e], /rect|poly|circ/ig.test(f) && (a.labels[f].hide(), a.fields[f].hide()), (new RegExp(X(b.val(), "rect"), "ig")).test(f) && (a.labels[f].show(), a.fields[f].show())
                }, e = function () {
                    var a = this.graphics.cacheUpdateUI.fields, c = b(a.color.val());
                    c && a.colorOut.css({background: n(c)})
                }, l = function (b, c) {
                    var e = this.graphics.cacheUpdateUI,
                        f = b.config.height, l = e.fields.image.val(), n = c ? 300 : 0,
                        r = ["imgWidth", "imgHeight", "imgAlign", "imgUrl"], g, v, z;
                    g = l ? 250 : 215;
                    e.ok.hide();
                    e.cancel.hide();
                    e.remove.hide();
                    e.error.hide();
                    for (v = r.length; !l && v--;) z = r[v], e.labels[z].hide(), e.fields[z].hide();
                    a.danimate.animate(e.dialog.element, {top: (f - g) / 2, height: g}, n, "linear", function () {
                        for (v = r.length; v-- && l;) z = r[v], e.labels[z].show(), e.fields[z].show();
                        e.ok.attr({y: g - 23 - 5}).show();
                        e.cancel.attr({y: g - 23 - 5}).show();
                        e.remove.attr({y: g - 23 - 5});
                        e.error.attr({
                            y: g - 23 -
                                5 + 4
                        }).show();
                        e.edit ? e.remove.show() : e.remove.hide()
                    })
                };
                return function (a, b, n) {
                    var r = this, A = r.graphics, w = A.cacheUpdateUI, C = r.nodes, g = a.config, y = g.animation,
                        D = a.components.paper, E = {
                            width: "80px",
                            border: "1px solid #cccccc",
                            fontSize: "10px",
                            lineHeight: "15px",
                            padding: "2px",
                            fontFamily: (g.style.inCanvasStyle || {}).fontFamily
                        }, d = {textAlign: "right"}, H = w && w.fields, J = w && w.labels, h, g = function () {
                            var a = w && w.fields, b = w.edit, c = r.chart, d = c.components, e, f, g;
                            e = d.xAxis[0].config.axisRange.min;
                            d = d.yAxis[0].config.axisRange.min;
                            if (a) {
                                switch (a.shape.val()) {
                                    case "circ":
                                        g = "circle";
                                        break;
                                    case "poly":
                                        g = "polygon";
                                        break;
                                    default:
                                        g = "rectangle"
                                }
                                e = {
                                    x: M(a.x.val(), e),
                                    y: M(a.y.val(), d),
                                    id: a.id.val(),
                                    datasetId: a.dataset.val(),
                                    name: a.label.val(),
                                    tooltext: a.tooltip.val(),
                                    color: a.color.val(),
                                    alpha: a.alpha.val(),
                                    labelalign: a.labelalign.val(),
                                    allowdrag: a.draggable.val(),
                                    shape: g,
                                    width: a.rectWidth.val(),
                                    height: a.rectHeight.val(),
                                    radius: a.circPolyRadius.val(),
                                    numsides: a.polySides.val(),
                                    imagenode: a.image.val(),
                                    imagewidth: a.imgWidth.val(),
                                    imageheight: a.imgHeight.val(),
                                    imagealign: a.imgAlign.val(),
                                    imageurl: a.imgUrl.val(),
                                    link: a.link.val()
                                };
                                C[e.id] && (f = !0);
                                if (f && void 0 === b) w.error.attr({text: "ID already exist."}), a.label.focus(); else {
                                    a = e.datasetId;
                                    if (a !== B || b) b ? c.updateNode(e) : c.addNode(e), w.hide(), w.visible = !1;
                                    return
                                }
                            }
                            w.enableFields()
                        }, q = function () {
                            w.hide();
                            w.visible = !1;
                            w.enableFields();
                            w.error.attr({text: I});
                            w.visible = !1
                        }, k = function () {
                            a.deleteNode(w.fields.id.val());
                            w.hide();
                            w.visible = !1
                        };
                    w || (w = A.cacheUpdateUI = this.createHtmlDialog(a, 350, 215, g, q, k), h = w.dialog, J =
                        w.labels = {}, H = w.fields = {});
                    w.config = b;
                    w.edit = n;
                    w.error || (w.error = D.html("span", {color: "ff0000", x: 30, y: 228}, void 0, h));
                    w.enableFields || (w.enableFields = function () {
                        for (var a in b) b[a] && b[a].disabled && H[a] && H[a].element.removeAttribute("disabled")
                    });
                    w.clearFields || (w.clearFields = function () {
                        var a, b = w.fields;
                        for (a in b) b[a].element.disabled || (b[a].element.value = B)
                    });
                    v(this.nodeUpdateUIDefinition, function (g) {
                        var k, n = g.key, p = {}, q = b[n] || {}, u, v;
                        !J[n] && (J[n] = D.html("label", {
                            x: g.x, y: g.y, width: g.labelWidth || 45,
                            text: g.text
                        }, d, h));
                        if (!g.noInput) {
                            k = H[n];
                            if (!k) {
                                E.border = "checkbox" == g.type ? I : "1px solid #cccccc";
                                k = H[n] = D.html(g.inputType || "input", {
                                    x: g.labelWidth && g.labelWidth + 5 || 50,
                                    y: -2 + (g.inputPaddingTop || 0),
                                    width: g.inputWidth || 50,
                                    name: n || B
                                }, E);
                                if ("select" !== g.inputType) k.attr({type: g.type || "text"}).on("keyup", w.handleKeyPress);
                                k.add(J[n])
                            }
                            F(u = M(q.innerHTML, g.innerHTML)) && (p.innerHTML = u);
                            q.disabled ? p.disabled = "disabled" : k.element && (k.element.disabled = !1);
                            k.attr(p);
                            F(v = M(q.value, g.value)) && k.val(v);
                            "shape" ==
                            n && k.on("change", function () {
                                c.call(r, a)
                            });
                            "image" == n && k.on("click", function () {
                                l.call(r, a, !0)
                            });
                            "color" == n && k.on("keyup", function () {
                                e.call(r, a)
                            })
                        }
                    });
                    e.call(this, a);
                    l.call(this, a);
                    c.call(this, a);
                    y ? w.fadeIn("fast") : w.show();
                    w.visible = !0;
                    w.fields[n ? "label" : "id"].focus()
                }
            }(),
            getDataLimits: function () {
                var a = this.datasets, b, c = Infinity, e = -Infinity, m = -Infinity, n = Infinity, r;
                for (b = 0; b < a.length; b++) r = a[b].dataset.config, e = C(e, r.yMax), c = l(c, r.yMin), m = C(m, r.xMax), n = l(n, r.xMin);
                return {max: e, min: c, xMax: m, xMin: n}
            },
            removeNodeDataset: function (a) {
                this.datasets.splice(a)
            },
            removeConnectorSet: function (a) {
                this.connectorSet.splice(a)
            },
            removeLabelSet: function (a) {
                this.labelSet.splice(a)
            },
            _clearConnectors: function () {
                var a = this.nodes, b, c, e, m, l;
                for (b in a) if (e = a[b]) {
                    c = e.config.startConnectors || {};
                    e = e.config.endConnectors || {};
                    for (l in c) m = {graphics: c[l].graphics || {}}, A.call(m);
                    for (l in e) m = {graphics: e[l].graphics || {}}, A.call(m)
                }
                this.nodes = {}
            }
        }])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-group-dragcolumn",
        function () {
            var a = this.hcLib, c = a.extend2, E = Math.ceil;
            J.register("component", ["datasetGroup", "DragColumn", {
                getJSONData: function () {
                    var a = this.chart, E = a.components.dataset, a = a.jsonData && a.jsonData.dataset, J = [], S, I, B,
                        X = E.length;
                    for (B = 0; B < X; B++) S = E[B], I = c({}, a[B]), delete I.data, S = S.getJSONData(), J.push(c(I, S));
                    return J
                }, _decidePlotableData: function (a, c, J, S) {
                    var I = this.stackSumValue && this.stackSumValue[0], B, X, M, R;
                    B = this.chart.config;
                    var r, D, v = (a && a.length) - c, A, F = B.isDataRestored, l,
                        C = E(1 / B.binSize * B.labelBinSize),
                        H, Q, n, b;
                    for (A = X = B = M = 0; M < v && J; M += c, B++, X++) {
                        l = A % C;
                        A++;
                        n = b = void 0;
                        for (R = M + c; R >= M + 1; R--) D = a[R].config, r = I && I[R] || D.setValue, F && delete a[R].dragged, a[R].dragged || (D.labelSkip = !0, D.isSkipped = !0), 0 <= r ? (n || (n = r, 0 === l && delete D.labelSkip, H = R, delete D.isSkipped), n < r && (n = r, H = R, delete D.isSkipped)) : (b || (b = r, 0 === l && delete D.labelSkip, Q = R, delete D.isSkipped), b > r && (b = r, Q = R, delete D.isSkipped));
                        0 === l && (a[H] && delete a[H].config.labelSkip, a[Q] && delete a[Q].config.labelSkip)
                    }
                    S && delete this.lastPlot
                }
            }, a.preDefStr.column])
        }]);
    J.register("module", ["private", "modules.renderer.js-dataset-group-dragarea", function () {
        var a = this.hcLib.extend2, c = Math.ceil;
        J.register("component", ["datasetGroup", "DragArea", {
            getJSONData: function () {
                var c = this.chart, e = c.components.dataset, c = c.jsonData && c.jsonData.dataset, J = [], W, S, I,
                    B = e.length;
                for (I = 0; I < B; I++) W = e[I], S = a({}, c[I]), delete S.data, W = W.getJSONData(), J.push(a(S, W));
                return J
            }, _decidePlotableData: function (a, e, J) {
                var W = this.chart.config, S = W.isDataRestored, I, B, X, M, R, r, D, v, A, F = (a && a.length) - e,
                    l, C, H = c(1 / W.binSize * W.labelBinSize);
                for (l = I = W = B = 0; B < F && J; B += e, W++, I++) {
                    C = l % H;
                    l++;
                    r = D = v = A = void 0;
                    for (X = B + e; X >= B + 1; X--) R = a[X].config, M = R.setValue, S && delete a[X].dragged, a[X].dragged || (R.labelSkip = !0, R.isSkipped = !0), v ? v < M && (r = X, v = M) : (r = X, v = M), A ? A > M && (D = X, A = M) : (D = X, A = M);
                    delete a[D].config.isSkipped;
                    delete a[r].config.isSkipped;
                    0 === C && (delete a[D].config.labelSkip, delete a[r].config.labelSkip)
                }
            }
        }, "area"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-group-dragline", function () {
        J.register("component",
            ["datasetGroup", "DragLine", {_decidePlotableData: J.get("component", ["datasetGroup", "DragArea"]).prototype._decidePlotableData}, "line"])
    }]);
    J.register("module", ["private", "modules.renderer.js-dataset-group-boxandwhisker2d", function () {
        var a = this.hcLib, c = a.extend2, a = a.preDefStr, E = a.configStr, e = a.animationObjStr;
        J.register("component", ["datasetGroup", "boxandwhisker2d", {
            draw: function () {
                var a = this.positionStackArr, J = a.length, S, I, B, X;
                S = this.chart;
                I = S.graphics.datasetGroup;
                var M = S.graphics;
                B = S.components.canvas.config.clip["clip-canvas"].slice(0);
                X = c([], S.components.canvas.config.clip["clip-canvas-init"]);
                var M = M.datalabelsGroup, R = S.get(E, e), r = R.animType, D = R.animObj, v = R.dummyObj,
                    R = R.duration;
                S.fireInitialAnimation && (I.attr({"clip-rect": X}), M.attr({"clip-rect": X}));
                S.fireInitialAnimation = !1;
                I.animateWith(v, D, {"clip-rect": B}, R, r);
                M.animateWith(v, D, {"clip-rect": B}, R, r);
                this.preDrawCalculate();
                this.drawSumValueFlag = !0;
                for (S = 0; S < J; S++) for (I = a[S], B = I.length, this.manageClip = !0, I = 0; I < B; I++) X = a[S][I].dataSet, X.draw()
            }
        }, a.column])
    }]);
    J.register("module",
        ["private", "modules.renderer.js-dataset-group-heatmap", function () {
            J.register("component", ["datasetGroup", "heatmap", {}, this.hcLib.preDefStr.column])
        }])
});

//# sourceMappingURL=http://localhost:3052/3.12.2/map/eval/fusioncharts.powercharts.js.map
