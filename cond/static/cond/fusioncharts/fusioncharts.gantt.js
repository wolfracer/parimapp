/*
 FusionCharts JavaScript Library - Gantt Chart
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.12.2
*/
(function (Q) {
    "object" === typeof module && "undefined" !== typeof module.exports ? module.exports = Q : Q(FusionCharts)
})(function (Q) {
    Q.register("module", ["private", "modules.renderer.js-gantt", function () {
        var V = this, I = V.hcLib, ha = V.window, ia = /msie/i.test(ha.navigator.userAgent) && !ha.opera,
            da = I.chartAPI, ba = I.extend2, q = I.pluck, r = I.pluckNumber, sa = I.pluckFontSize, X = I.getFirstColor,
            oa = I.parseConfiguration, ta = I.setAttribDefs, P = I.graphics, T = P.convertColor, ea = P.getDarkColor,
            Y = I.parseUnsafeString, la = I.getFirstValue, ua =
                I.getValidValue, fa = I.toPrecision, W = I.Raphael, va = I.chartPaletteStr, Da = I.componentDispose,
            wa = I.schedular, Ea = I.COMMASTRING, U = I.setLineHeight, ma = I.getDashStyle, ca = I.toRaphaelColor,
            xa = I.each, J = I.attrTypeNum, ga = I.attrTypeBool, Fa = I.dropHash, Ga = I.HASHSTRING,
            ha = !I.CREDIT_REGEX.test(ha.location.hostname), ja = "rgba(192,192,192," + (ia ? .002 : 1E-6) + ")",
            ya = P.mapSymbolName, ia = Math, M = ia.max, na = ia.min, za = ia.abs, Ha = parseInt, Aa = parseFloat,
            Ba = I.graphics.getLightColor, N = I.plotEventHandler, ka, aa, pa = function (a) {
                return void 0 !==
                    a && null !== a
            }, Ia = {left: "start", right: "end", center: "middle"}, Ja = {left: 0, right: 1, center: .5, undefined: .5},
            Ka = {left: 5, right: -5, center: 0, undefined: 0}, La = function () {
            }, qa = function () {
                for (var a = 0, b = arguments.length, c = !1, a = 0; a < b; a++) {
                    c = arguments[a];
                    if (isNaN(c)) return !1;
                    c = !0
                }
                return c
            }, Ma = {fontWeight: ["normal", "bold"], fontStyle: ["normal", "italic"]}, ra = function (a) {
                var b, c;
                for (c in a) if (void 0 !== a[c]) switch (b = b || {}, c) {
                    case "fontWeight":
                    case "fontStyle":
                        b[c] = Ma[c][a[c]];
                        break;
                    default:
                        b[c] = a[c]
                }
                return b
            };
        da("gantt",
            {
                defaultDatasetType: "task",
                applicableDSList: {task: !0, milestone: !0, connectors: !0},
                fireGroupEvent: !0,
                aligncaptionwithcanvas: 0,
                hasInteractiveLegend: !1,
                creditLabel: ha,
                _createDatasets: function () {
                    var a = this.config, b = this.components, c = this.jsonData, d = [], f, e,
                        h = this.defaultDatasetType, m = this.applicableDSList, g, l, n,
                        u = a.datasetMap || (a.datasetMap = {task: [], milestone: [], connectors: []}),
                        p = {task: [], milestone: [], connectors: []}, t, A, x, k = {};
                    c.tasks && (d = d.concat(c.tasks));
                    c.milestones && (d = d.concat(c.milestones));
                    c.connectors &&
                    (d = d.concat(c.connectors));
                    f = d && d.length;
                    !d || d instanceof Array || (d = [d], f = 1);
                    f || this.setChartMessage();
                    this.config.categories = c.categories && c.categories[0].category;
                    c = b.dataset = [];
                    for (b = 0; b < f; b++) if (n = d[b], n.task ? x = g = "task" : n.milestone ? x = g = "milestone" : n.connector && (g = "connectors", x = "connector"), g = g && g.toLowerCase(), m[g] || (g = h), l = Q.get("component", ["dataset", g])) void 0 === k[g] ? k[g] = 0 : k[g]++, e = u[g], (t = e[0]) ? (l = t.JSONData, l = l[x].length, A = n[x].length, p[g].push(t), c.push(t), t.index = b, l > A && t.removeData(A -
                        1, l - A, !1), t.JSONData = n, t.configure(), e.shift()) : (e = new l, p[g].push(e), c.push(e), e.chart = this, e.index = b, e.init(n));
                    this._createLegendItems();
                    for (g in u) if (d = u[g], f = d.length) for (b = 0; b < f; b++) (e = d[b]) && Da.call(e);
                    a.datasetMap = p
                },
                configure: function () {
                    var a = this.config, b = this.components.background.config, c = this.jsonData.chart;
                    this.__setDefaultConfig();
                    da.mscartesian.configure.call(this);
                    a.showBorder = r(c.showborder, 0);
                    a.borderWidth = a.showBorder ? r(c.borderthickness, 1) : 0;
                    b.borderWidth = a.borderWidth;
                    a.lastVScrollPosition =
                        void 0;
                    a.lastHScrollPosition = void 0
                },
                _createLegendItems: function () {
                    var a = this.components, b = this.jsonData, c = a.legend, d, f, e, h, m, g, l = a.legendItems,
                        b = b.legend && b.legend.item || [];
                    d = a.legendItems && a.legendItems.length || 0;
                    f = b.length;
                    d > f && (c.emptyItems(f, d - f), l && l.splice(f, d - f));
                    l || (a.legendItems = l = []);
                    d = 0;
                    for (a = b.length; d < a; d++) m = b[d], g = l[d], h = m.color, f = Ba(h, 60).replace(Fa, Ga), e = Ba(h, 40), e = {
                        FCcolor: {
                            color: h + "," + h + "," + e + "," + h + "," + h,
                            ratio: "0,70,30",
                            angle: 270,
                            alpha: "100,100,100,100,100"
                        }
                    }, !g && (g = l[d] = {}), f =
                        {
                            fillColor: ca(e),
                            strokeColor: ca(f),
                            label: m.label,
                            interactiveLegend: !1,
                            legendItemId: g.legendItemId
                        }, l[d].legendItemId = c.addItems(this, La, f)
                },
                _setAxisLimits: function () {
                },
                _createAxes: function () {
                    var a = this.components, b = Q.get("component", ["axis", "time"]),
                        c = Q.get("component", ["axis", "process"]);
                    a.yAxis = [];
                    a.xAxis = [];
                    a.yAxis[0] = c = new c;
                    a.xAxis[0] = a = new b;
                    c.chart = this;
                    a.chart = this;
                    c.init();
                    a.init()
                },
                _feedAxesRawData: function () {
                    var a = this.components, b = a.colorManager, c = this.jsonData, d = c.chart, f, e = this.is3d,
                        h = e ? va.chart3D : va.chart2D;
                    f = {
                        outCanfontFamily: q(d.outcnvbasefont, d.basefont, "Verdana,sans"),
                        outCanfontSize: sa(d.outcnvbasefontsize, d.basefontsize, 10),
                        outCancolor: q(d.outcnvbasefontcolor, d.basefontcolor, b.getColor(h.baseFontColor)).replace(/^#? ([a-f0-9]+)/ig, "#$1"),
                        axisBreaks: d.xaxisbreaks,
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
                        divLineColor: q(d.vdivlinecolor, b.getColor(h.divLineColor)),
                        divLineAlpha: q(d.vdivlinealpha, e ? b.getColor("divLineAlpha3D") : b.getColor("divLineAlpha")),
                        divLineThickness: r(d.vdivlinethickness, 1),
                        divLineIsDashed: !!r(d.vdivlinedashed, d.vdivlineisdashed, 0),
                        divLineDashLen: r(d.vdivlinedashlen, 4),
                        divLineDashGap: r(d.vdivlinedashgap, 2),
                        showAlternateGridColor: r(d.showalternatevgridcolor, 0),
                        alternateGridColor: q(d.alternatevgridcolor, b.getColor("altVGridColor")),
                        alternateGridAlpha: q(d.alternatevgridalpha, b.getColor("altVGridAlpha")),
                        numDivLines: r(d.numvdivlines, this.numVDivLines),
                        labelFont: d.labelfont,
                        labelFontSize: d.labelfontsize,
                        labelFontColor: d.labelfontcolor,
                        labelFontAlpha: d.labelalpha,
                        labelFontBold: d.labelfontbold,
                        labelFontItalic: d.labelfontitalic,
                        maxLabelHeight: d.maxlabelheight,
                        axisName: d.xaxisname,
                        axisMinValue: d.xaxisminvalue,
                        axisMaxValue: d.xaxismaxvalue,
                        setAdaptiveMin: d.setadaptivexmin,
                        adjustDiv: d.adjustvdiv,
                        labelDisplay: d.labeldisplay,
                        showLabels: d.showlabels,
                        rotateLabels: d.rotatelabels,
                        slantLabel: r(d.slantlabels, d.slantlabel),
                        labelStep: r(d.labelstep, d.xaxisvaluesstep),
                        showAxisValues: r(d.showxaxisvalues, d.showxaxisvalue),
                        showLimits: r(d.showvlimits, this.showvlimits),
                        showDivLineValues: r(d.showvdivlinevalues, d.showvdivlinevalues),
                        zeroPlaneColor: d.vzeroplanecolor,
                        zeroPlaneThickness: d.vzeroplanethickness || 2,
                        zeroPlaneAlpha: d.vzeroplanealpha,
                        showZeroPlaneValue: d.showvzeroplanevalue,
                        trendlineColor: d.trendlinecolor,
                        trendlineToolText: d.trendlinetooltext,
                        trendlineThickness: d.trendlinethickness,
                        trendlineAlpha: d.trendlinealpha,
                        showTrendlinesOnTop: d.showtrendlinesontop,
                        showAxisLine: r(d.showxaxisline, d.showaxislines, d.drawAxisLines, 0),
                        axisLineThickness: r(d.xaxislinethickness, d.axislinethickness, 1),
                        axisLineAlpha: r(d.xaxislinealpha, d.axislinealpha, 100),
                        axisLineColor: q(d.xaxislinecolor, d.axislinecolor, "#000000")
                    };
                    b = {
                        outCanfontFamily: q(d.outcnvbasefont, d.basefont, "Verdana,sans"),
                        outCanfontSize: sa(d.outcnvbasefontsize, d.basefontsize, 10),
                        outCancolor: q(d.outcnvbasefontcolor, d.basefontcolor, b.getColor(h.baseFontColor)).replace(/^#? ([a-f0-9]+)/ig,
                            "#$1"),
                        axisBreaks: d.yaxisbreaks,
                        axisNamePadding: d.yaxisnamepadding,
                        axisValuePadding: d.yaxisvaluespadding,
                        axisNameFont: d.yaxisnamefont,
                        axisNameFontSize: d.yaxisnamefontsize,
                        axisNameFontColor: d.yaxisnamefontcolor,
                        axisNameFontBold: d.yaxisnamefontbold,
                        axisNameFontItalic: d.yaxisnamefontitalic,
                        axisNameBgColor: d.yaxisnamebgcolor,
                        axisNameBorderColor: d.yaxisnamebordercolor,
                        axisNameAlpha: d.yaxisnamealpha,
                        axisNameFontAlpha: d.yaxisnamefontalpha,
                        axisNameBgAlpha: d.yaxisnamebgalpha,
                        axisNameBorderAlpha: d.yaxisnameborderalpha,
                        axisNameBorderPadding: d.yaxisnameborderpadding,
                        axisNameBorderRadius: d.yaxisnameborderradius,
                        axisNameBorderThickness: d.yaxisnameborderthickness,
                        axisNameBorderDashed: d.yaxisnameborderdashed,
                        axisNameBorderDashLen: d.yaxisnameborderdashlen,
                        axisNameBorderDashGap: d.yaxisnameborderdashgap,
                        axisNameWidth: d.yaxisnamewidth,
                        useEllipsesWhenOverflow: d.useellipseswhenoverflow,
                        rotateAxisName: r(d.rotateyaxisname, 1),
                        axisName: d.yaxisname,
                        divLineColor: q(d.divlinecolor, b.getColor(h.divLineColor)),
                        divLineAlpha: q(d.divlinealpha,
                            e ? b.getColor("divLineAlpha3D") : b.getColor("divLineAlpha")),
                        divLineThickness: r(d.divlinethickness, 1),
                        divLineIsDashed: !!r(d.divlinedashed, d.divlineisdashed, 0),
                        divLineDashLen: r(d.divlinedashlen, 4),
                        divLineDashGap: r(d.divlinedashgap, 2),
                        showAlternateGridColor: r(d.showalternatehgridcolor, 1),
                        alternateGridColor: q(d.alternatehgridcolor, b.getColor("altHGridColor")),
                        alternateGridAlpha: q(d.alternatehgridalpha, b.getColor("altHGridAlpha")),
                        numDivLines: r(d.numdivlines, this.numDivLines),
                        axisMinValue: d.yaxisminvalue,
                        axisMaxValue: d.yaxismaxvalue,
                        setAdaptiveMin: d.setadaptiveymin,
                        adjustDiv: d.adjustdiv,
                        labelStep: d.yaxisvaluesstep,
                        showAxisValues: r(d.showyaxisvalues, d.showyaxisvalue),
                        showLimits: r(d.showlimits, this.showLimits),
                        showDivLineValues: r(d.showdivlinevalues, d.showdivlinevalue),
                        zeroPlaneColor: d.zeroplanecolor,
                        zeroPlaneThickness: d.zeroplanethickness || 2,
                        zeroPlaneAlpha: d.zeroplanealpha,
                        showZeroPlaneValue: d.showzeroplanevalue,
                        trendlineColor: d.trendlinecolor,
                        trendlineToolText: d.trendlinetooltext,
                        trendlineThickness: d.trendlinethickness,
                        trendlineAlpha: d.trendlinealpha,
                        showTrendlinesOnTop: d.showtrendlinesontop,
                        showAxisLine: r(d.showyaxisline, d.showaxislines, d.drawAxisLines, 0),
                        axisLineThickness: r(d.yaxislinethickness, d.axislinethickness, 1),
                        axisLineAlpha: r(d.yaxislinealpha, d.axislinealpha, 100),
                        axisLineColor: q(d.yaxislinecolor, d.axislinecolor, "#000000")
                    };
                    f.vtrendlines = c.trendlines;
                    c = a.yAxis[0];
                    a = a.xAxis[0];
                    c.setCommonConfigArr(b, !0, !0, !1);
                    a.setCommonConfigArr(f, !1, !1, !0);
                    c.configure();
                    a.configure()
                },
                _setCategories: function () {
                    var a = this.get("components"),
                        b = this.jsonData, c = a.xAxis, a = a.yAxis, d = b.processes, f = b.datatable, b = b.categories;
                    a[0].setAxisPadding(.5, .5);
                    a[0].setProcess(d);
                    a[0].setDataTable(f);
                    c[0].setCategory(b)
                },
                _setAxisValuePadding: function () {
                    var a = this.components.dataset, b = a.length, c, d, f = -Infinity, e = -Infinity;
                    for (c = 0; c < b; c++) d = a[c], d = d.getAxisValuePadding && d.getAxisValuePadding() || {}, f = M(f, d.left || -Infinity), e = M(e, d.right || -Infinity)
                },
                _spaceManager: function () {
                    var a, b = this.config, c = this.components, d = c.xAxis && c.xAxis[0], f = c.yAxis && c.yAxis[0],
                        e = c.legend.config.legendPos, h = 100 - (b.ganttwidthpercent || 67);
                    a = b.borderWidth;
                    var m = c = 0;
                    this._resetViewPortConfig && this._resetViewPortConfig();
                    d.resetTransletAxis();
                    f.resetTransletAxis();
                    this._allocateSpace({top: a, bottom: a, left: a, right: a});
                    this._allocateSpace(this._manageActionBarSpace && this._manageActionBarSpace(.225 * b.availableHeight) || {});
                    a = "bottom" === e ? .6 * b.canvasHeight : .6 * b.canvasWidth;
                    this._manageChartMenuBar(a);
                    this._manageLegendSpace("right" === e ? .3 * b.canvasWidth : .3 * b.canvasHeight);
                    b.actualCanvasTop =
                        b.canvasTop;
                    b.actualCanvasLeft = b.canvasLeft;
                    e = f.placeAxis(h / 100 * b.canvasWidth);
                    c += (e.left || 0) + (e.right || 0);
                    f && this._allocateSpace(e);
                    a = .6 * b.canvasHeight;
                    e = d.placeAxis(a);
                    m += e.top || 0;
                    b.totalWidth = c;
                    b.totalHeight = m;
                    d && this._allocateSpace(e);
                    b = f && f.setProcessHeight();
                    f.setAxisConfig({processTotalHeight: b})
                },
                _drawCanvas: function () {
                    var a = this.jsonData.chart, b = this.components, c = this.config, d = this.graphics, f = b.paper,
                        e = b.canvas, b = e.graphics, h = e.config, e = h.clip = {}, m = b.canvasBorderElement,
                        g = this.get("config",
                            "animationObj"), l = g.duration, n = g.dummyObj, u = g.animObj, g = g.animType,
                        p = b.canvasElement, t = c.actualCanvasLeft, A = c.actualCanvasTop, x = c.canvasWidth,
                        k = c.canvasHeight, C = c.canvasLeft, F = c.canvasTop, q = c.canvasWidth + c.totalWidth,
                        c = c.canvasHeight + c.totalHeight, d = d.canvasGroup, y = h.canvasBorderRadius,
                        z = h.canvasBorderWidth, v = .5 * z, w = h.canvasBorderColor, G = h.canBGColor, D = h.shadow,
                        a = h.showCanvasBG = !!r(a.showcanvasbg, 1), B = h.shadowOnCanvasFill, E = h.showCanvasBorder,
                        h = {
                            x: t - v, y: A - v, width: q + z, height: c + z, r: y, "stroke-width": z,
                            stroke: w, "stroke-linejoin": 2 < z ? "round" : "miter"
                        };
                    E ? m ? (m.show(), m.animateWith(n, u, {
                        x: t - v,
                        y: A - v,
                        width: q + z,
                        height: c + z,
                        r: y
                    }, l, g), m.attr({
                        "stroke-width": z,
                        stroke: w,
                        "stroke-linejoin": 2 < z ? "round" : "miter"
                    }), m.shadow(D)) : b.canvasBorderElement = f.rect(h, d).shadow(D) : m && m.hide();
                    e["clip-canvas"] = [M(0, C), M(0, F), M(1, x), M(1, k)];
                    e["clip-canvas-init"] = [M(0, C), M(0, F), 1, M(1, k)];
                    a ? (h = {
                        x: t,
                        y: A,
                        width: q,
                        height: c,
                        r: y,
                        "stroke-width": 0,
                        stroke: "none",
                        fill: ca(G)
                    }, p ? (p.show(), l && p.animateWith(n, u, {x: t, y: A, width: q, height: c, r: y},
                        l, g), p.attr(h), p.shadow(B)) : b.canvasElement = f.rect(h, d).shadow(B)) : p && p.hide()
                },
                _postSpaceManagement: function () {
                    var a = this.config, b = this.components, c = b.xAxis && b.xAxis[0], d = b.yAxis && b.yAxis[0],
                        f = d.getAxisConfig("processTotalHeight"), e = a.canvasHeight, h = b.legend, m = a.xDepth,
                        g = b.canvas.config, l = g.canvasBorderWidth, n = g.canvasPadding, u = b.vScrollBar.userConf, p,
                        t = g.canvasPaddingLeft, g = g.canvasPaddingRight, A = a.ganttpanedurationunit,
                        x = b.hProcessScrollBar, b = (b = b.hScrollBar) && b.userConf.height || 0,
                        x = x && x.userConf.height ||
                            0, k, r;
                    r = void 0 !== Number(a.ganttpaneduration) && void 0 !== A ? !0 : !1;
                    A = d.getAxisConfig("totalWidth");
                    k = d.getAxisConfig("totalVisiblelWidth");
                    b = M(A > k ? x : 0, r ? b : 0);
                    f > e - b && (p = !0);
                    f = p ? u.width || 0 : 0;
                    f = a.canvasWidth - (m || 0) - M(t, n) - M(g, n) - f;
                    c && c.setAxisDimention({
                        x: a.canvasLeft + (m || 0) + M(t, n),
                        y: a.canvasTop - (a.shift || 0),
                        opposite: a.canvasBottom + l,
                        axisLength: f
                    });
                    a.currentCanvasWidth = f;
                    d && d.setAxisDimention({
                        x: a.canvasLeft - (a.shift || 0),
                        y: a.canvasTop,
                        opposite: a.canvasRight + l,
                        axisLength: a.canvasHeight
                    });
                    this._manageScrollerPosition();
                    h.postSpaceManager()
                },
                _resetViewPortConfig: function () {
                    this.config.viewPortConfig = {scaleX: 1, scaleY: 1, x: 0, y: 0}
                },
                _manageScrollerPosition: function () {
                    var a = this.config, b = this.components, c, d = b.hScrollBar, f = b.vScrollBar,
                        e = b.hProcessScrollBar, h = a.totalWidth || 0, m = a.totalHeight || 0;
                    this._setAxisScale && this._setAxisScale();
                    c = a.vScrollEnabled;
                    b = a.hScrollEnabled;
                    d = d.getLogicalSpace();
                    a.hScrollHeight = !1 === b ? 0 : d.height + f.conf.padding;
                    d = f.getLogicalSpace();
                    a.vScrollWidth = !1 !== c ? d.width + f.conf.padding : 0;
                    d = e.getLogicalSpace();
                    a.hProcessScrollHeight = a.hProcessScrollEnabled ? d.height + e.conf.padding : 0;
                    m += M(a.hProcessScrollHeight, a.hScrollHeight);
                    this._allocateSpace({bottom: M(a.hProcessScrollHeight, a.hScrollHeight)});
                    a.totalWidth = h;
                    a.totalHeight = m
                },
                updateManager: function (a, b) {
                    var c = this.config, d = this.config.viewPortConfig, f = d.scaleX, e = this.components.xAxis[0],
                        h = this.components.yAxis[0], m = this.graphics.datasetGroup, g = this.graphics.datalabelsGroup,
                        l = this.graphics.trackerGroup, n = c.xOffset || 0, u = c.yOffset || 0, p = c.canvasHeight, t =
                            c.currentCanvasWidth, A = d.scaleY;
                    b ? c.lastHScrollPosition = a : c.lastVScrollPosition = a;
                    b ? (n = c.xOffset = t * (f - 1) * a, d.x = n / f, e.translateAxis(-n, void 0)) : (u = c.yOffset = p * (A - 1) * a, d.y = u / A, h.translateAxis(void 0, -u));
                    c = "t" + -n + ", " + -u;
                    m.attr({transform: c});
                    g.attr({transform: c});
                    l.attr({transform: c})
                },
                _setAxisScale: function () {
                    var a = this.components, b = this.config, c = a.xAxis[0], d = c.getLimit(), f = d.max, d = d.min,
                        e = new Date(d), h = a.yAxis[0], m = this.components.numberFormatter,
                        g = Number(b.ganttpaneduration), l = b.scrollOptions ||
                        (b.scrollOptions = {}), n = b.ganttpanedurationunit, u = f - d, d = b.canvasHeight,
                        p = b.scrolltodate, t = b.canvasWidth, A = b.canvasLeft, x = a.hProcessScrollBar,
                        a = (a = a.hScrollBar) && a.userConf.height || 0, x = x && x.userConf.height || 0,
                        k = c.getPixel(f) - A, f = h.getAxisConfig("processTotalHeight");
                    if (void 0 === g || void 0 === n) b.hScrollEnabled = !1; else {
                        switch (n) {
                            case "y":
                                e.setFullYear(e.getFullYear() + g);
                                break;
                            case "m":
                                e.setMonth(e.getMonth() + g);
                                break;
                            case "d":
                                e.setDate(e.getDate() + g);
                                break;
                            case "h":
                                e.setHours(e.getHours() + g);
                                break;
                            case "mn":
                                e.setMinutes(e.getMinutes() +
                                    g);
                                break;
                            default:
                                e.setSeconds(e.getSeconds() + g)
                        }
                        e = e.getTime();
                        e = c.getPixel(e) - A;
                        b.hScrollEnabled = !0;
                        b.viewPortConfig.scaleX = e = k / e;
                        l.horizontalVxLength = u / NaN * g;
                        p && (m = m.getDateValue(p).ms, c = c.getPixel(m), b.viewPortConfig.x = na(c - A, t * (e - 1)) / e)
                    }
                    c = h.getAxisConfig("totalWidth");
                    h = h.getAxisConfig("totalVisiblelWidth");
                    b.hProcessScrollEnabled = c > h ? !0 : !1;
                    h = M(b.hProcessScrollEnabled ? x : 0, b.hScrollEnabled ? a : 0);
                    d -= h;
                    Math.floor(f) > d ? (b.viewPortConfig.scaleY = f / d, b.vScrollEnabled = !0) : b.vScrollEnabled = !1
                },
                drawScrollBar: function () {
                    var a =
                            this, b = a.config, c = a.components, d = c.xAxis[0], f = d.config, e = d.config.axisRange,
                        h = b.viewPortConfig, m = b.scrollOptions || (b.scrollOptions = {}), g = e.max, l = e.min,
                        n = m.horizontalVxLength, u = c.hScrollBar, e = u.node, p = c.vScrollBar, t = p.node,
                        A = c.hProcessScrollBar, x = A.node, k = b.useverticalscrolling, q = g - l, F = b.canvasRight,
                        H = h.scaleX, y = h.scaleY, z, v, w, G, D, B = b.vScrollEnabled, E = c.yAxis[0],
                        I = B ? p.conf.width : 0, L = a.graphics, S = c.paper;
                    z = b.canvasLeft;
                    v = b.canvasTop;
                    w = b.canvasHeight;
                    G = b.canvasWidth;
                    c = c.canvas.config;
                    D = c.canvasBorderWidth;
                    r(D, f.showLine ? f.axisLineThickness : 0);
                    r(D, f.lineStartExtension);
                    r(D, f.lineEndExtension);
                    m.viewPortMin = l;
                    m.viewPortMax = g;
                    m.scrollRatio = n / q;
                    f = m.windowedCanvasWidth = d.getAxisPosition(n);
                    g = m.fullCanvasWidth = d.getAxisPosition(g - l) - f;
                    d = m.fullCanvasHeight = E.getAxisConfig("processTotalHeight");
                    m = m.windowedCanvasHeight = w;
                    l = E.getAxisConfig("totalWidth");
                    E = E.getAxisConfig("totalVisiblelWidth");
                    y = 1 / y;
                    n = L.scrollBarParentGroup;
                    n || (n = L.scrollBarParentGroup = S.group("scrollBarParentGroup", L.parentGroup).insertBefore(L.datalabelsGroup));
                    !1 !== b.hScrollEnabled ? (u.draw(z, v + w, {
                        width: G - I,
                        scrollRatio: 1 / H,
                        scrollPosition: h.x * H / (G * (H - 1)),
                        roundEdges: c.isRoundEdges,
                        fullCanvasWidth: g,
                        windowedCanvasWidth: f,
                        parentLayer: n
                    }), !e && function () {
                        var c;
                        W.eve.on("raphael.scroll.start." + u.node.id, function (b) {
                            c = b;
                            V.raiseEvent("scrollstart", {scrollPosition: b}, a.chartInstance)
                        });
                        W.eve.on("raphael.scroll.end." + u.node.id, function (b) {
                            V.raiseEvent("scrollend", {prevScrollPosition: c, scrollPosition: b}, a.chartInstance)
                        })
                    }()) : u && u.node && u.node.hide();
                    !1 !== B && k ? (p.draw(F -
                        I, v, {
                        height: w,
                        scrollRatio: y,
                        roundEdges: c.isRoundEdges,
                        fullCanvasWidth: d,
                        windowedCanvasWidth: m,
                        parentLayer: n
                    }), !t && function () {
                        var b;
                        W.eve.on("raphael.scroll.start." + p.node.id, function (c) {
                            b = c;
                            V.raiseEvent("scrollstart", {scrollPosition: c}, a.chartInstance)
                        });
                        W.eve.on("raphael.scroll.end." + p.node.id, function (c) {
                            V.raiseEvent("scrollend", {prevScrollPosition: b, scrollPosition: c}, a.chartInstance)
                        })
                    }()) : p && p.node && p.node.hide();
                    E < l ? (A.draw(z - E, v + w, {
                        width: E, scrollRatio: E / l, roundEdges: c.isRoundEdges, fullCanvasWidth: g,
                        windowedCanvasWidth: f, parentLayer: n
                    }), !x && function () {
                        var c;
                        W.eve.on("raphael.scroll.start." + A.node.id, function (b) {
                            c = b;
                            V.raiseEvent("scrollstart", {scrollPosition: b}, a.chartInstance)
                        });
                        W.eve.on("raphael.scroll.end." + A.node.id, function (b) {
                            V.raiseEvent("scrollend", {prevScrollPosition: c, scrollPosition: b}, a.chartInstance)
                        })
                    }()) : A && A.node && A.node.hide()
                },
                _createLayers: function () {
                    var a = this.components.paper, b = this.config, c = b.style.inCanvasStyle, d, f;
                    da.mscartesian._createLayers.call(this);
                    f = this.graphics;
                    d = f.datasetGroup;
                    f.parentTaskGroup = f.parentTaskGroup || a.group("parentTaskGroup", d);
                    f.parentConnectorsGroup = f.parentConnectorsGroup || a.group("parentConnectorsGroup", d);
                    f.parentMilestoneGroup = f.parentMilestoneGroup || a.group("parentMilestoneGroup", d);
                    a = this.config.milestoneLabelStyle = {
                        fontSize: r(b.milestonefontsize, c.fontSize) + "px",
                        fontFamily: q(b.milestonefont, c.fontFamily),
                        fontWeight: r(b.milestonefontbold, 0) && "bold" || "normal",
                        fontStyle: r(b.milestonefontitalic, 0) && "italic" || "normal"
                    };
                    U(a);
                    f.parentMilestoneGroup.css(a)
                },
                _drawDataset: function () {
                    this._setClipping();
                    da.mscartesian._drawDataset.call(this)
                },
                drawLegend: function () {
                    var a = this.config, b = this.components.legend, c = b.config, d = c.width, f = c.height,
                        e = a.marginLeft, h = a.marginTop, m = a.width, g = a.marginRight, l = a.marginBottom,
                        n = a.totalWidth + a.canvasWidth, u = a.totalHeight + a.canvasHeight, a = a.height;
                    "right" === c.legendPos ? (c = u - f, d = m - d - g, f = h + (0 > c ? 0 : c) / 2) : (c = n - d, d = e + (0 > c ? 0 : c) / 2, f = a - f - l);
                    b.drawLegend(d, f)
                },
                _setClipping: function () {
                    var a = this.config, b = this.graphics.datasetGroup, c =
                            this.graphics.datalabelsGroup, d = this.graphics.trackerGroup, f = a.viewPortConfig,
                        e = f.scaleX, f = f.x, h = this.config.animationObj, m = h.dummyObj, g = h.animObj,
                        l = h.animType, h = h.transposeAnimDuration,
                        n = this.components.canvas.config.clip["clip-canvas"].slice(0);
                    this.config.clipSet ? (b.animateWith(m, g, {"clip-rect": n}, h, l), c.animateWith(m, g, {"clip-rect": n}, h, l), d.animateWith(m, g, {"clip-rect": n}, h, l)) : (b.attr({"clip-rect": n}), c.attr({"clip-rect": n}), d.attr({"clip-rect": n}));
                    a.xOffset = f * e;
                    b.attr({
                        transform: "T" + -(f * e) +
                            ",0"
                    });
                    c.attr({transform: "T" + -(f * e) + ",0"});
                    d.attr({transform: "T" + -(f * e) + ",0"});
                    this.config.clipSet = !0
                },
                _createToolBox: function () {
                    var a = this.components, b = a.yAxis[0], c = this._scrollBar, d = a.actionBar, f = c.get, e = c.add,
                        h;
                    (a.chartMenuBar || {}).drawn || d && d.drawn || (da.mscartesian._createToolBox.call(this), d = a.tb, h = a.toolBoxAPI, h = h.Scroller, c.clear(), e({isHorizontal: !0}, {
                        scroll: function (a, b) {
                            return function (c) {
                                a.updateManager.call(a, c, b)
                            }
                        }(this, !0)
                    }), e({isHorizontal: !1}, {
                        scroll: function (a, b) {
                            return function (c) {
                                a.updateManager.call(a,
                                    c, b)
                            }
                        }(this, !1)
                    }), e({isHorizontal: !0}, {
                        scroll: function () {
                            return function (a) {
                                b.manageProcessScroll(a)
                            }
                        }(this, !0)
                    }), c = f()[0], e = f()[1], f = f()[2], a.hScrollBar = a.hScrollBar || (new h(c.conf, 1, d.pId)).attachEventHandlers(c.handler), a.vScrollBar = a.vScrollBar || (new h(e.conf, 2, d.pId)).attachEventHandlers(e.handler), a.hProcessScrollBar = a.hProcessScrollBar || (new h(f.conf, 3, d.pId)).attachEventHandlers(f.handler))
                },
                _preDraw: function () {
                    this._setAxisValuePadding();
                    this._setCategories();
                    this.chartMenuTools.reset(this.components.tb,
                        this)
                },
                defaultPaletteOptions: function () {
                    var a = arguments;
                    return I.extend2(I.extend2(I.extend2(I.extend2({}, a[0]), a[1]), a[2]), a[3])
                }(ba({}, I.defaultGaugePaletteOptions), {
                    paletteColors: ["AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),
                        "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" ")],
                    bgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
                    bgAngle: [270, 270, 270, 270, 270],
                    bgRatio: ["100", "100", "100", "100", "100"],
                    bgAlpha: ["100", "100", "100", "100", "100"],
                    canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
                    canvasBgAngle: [0, 0, 0, 0, 0],
                    canvasBgAlpha: ["100", "100", "100", "100", "100"],
                    canvasBgRatio: ["", "", "", "", ""],
                    canvasBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
                    canvasBorderAlpha: [100, 100, 100, 90, 100],
                    gridColor: ["DDDDDD", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
                    gridResizeBarColor: ["999999",
                        "545454", "415D6F", "845001", "D55979"],
                    categoryBgColor: ["F1F1F1", "EEF0E6", "F2F8F9", "F7F0E6", "FFF4F8"],
                    dataTableBgColor: ["F1F1F1", "EEF0E6", "F2F8F9", "F7F0E6", "FFF4F8"],
                    toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
                    toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
                    baseFontColor: ["555555", "60634E", "025B6A", "A15E01", "68001B"],
                    borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
                    borderAlpha: [50, 50, 50, 50, 50],
                    legendBgColor: ["ffffff", "ffffff", "ffffff", "ffffff", "ffffff"],
                    legendBorderColor: ["666666", "545454", "415D6F", "845001", "D55979"],
                    plotBorderColor: ["999999", "8A8A8A", "6BA9B6", "C1934D", "FC819F"],
                    plotFillColor: ["EEEEEE", "D8DCC5", "BCD8DE", "E9D8BE", "FEDAE3"],
                    scrollBarColor: ["EEEEEE", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"]
                })
            }, da.scrollbase, {
                taskbarroundradius: 0,
                taskbarfillmix: " { light-10 }, { dark-20 }, { light-50 }, { light-85 }",
                taskbarfillratio: "0,8,84,8",
                showslackasfill: 1,
                dateintooltip: 1,
                tasklabelsalign: "center",
                datepadding: 3,
                showtasknames: 0,
                showpercentlabel: !1,
                showhovereffect: 1,
                slackfillcolor: "FF5E5E",
                connectorextension: 10,
                tasklabelspadding: 2,
                taskdatepadding: 3,
                showlabels: void 0,
                showtooltip: 1,
                showtaskhovereffect: void 0,
                useverticalscrolling: 1,
                ganttpanedurationunit: void 0,
                ganttpaneduration: void 0,
                showtaskstartdate: void 0,
                showtaskenddate: void 0,
                ganttwidthpercent: void 0,
                showshadow: 1,
                enablemousetracking: !1
            });
        ta && ta({
            showpercentlabel: {type: ga, pAttr: "showpercentlabel"},
            fontsize: {type: J},
            alpha: {type: J},
            showborder: {type: ga},
            borderthickness: {type: J},
            borderalpha: {type: J},
            showHoverEffect: {type: J},
            hoverFillAlpha: {type: J},
            slackHoverFillColor: {type: J},
            slackHoverFillAlpha: {type: ga},
            showlabels: {type: ga, pAttr: "showtasknames"},
            slackfillcolor: {pAttr: "slackfillcolor"},
            showtasklabels: {type: ga, pAttr: "showtasknames"},
            showtasknames: {type: ga, pAttr: "showlabels"},
            showconnectorhovereffect: {type: J, pAttr: "showhovereffect"},
            connectorextension: {type: J},
            tasklabelspadding: {type: J},
            taskdatepadding: {type: J},
            showstartdate: {type: J, pAttr: "showtaskstartdate"},
            showenddate: {type: J, pAttr: "showtaskenddate"},
            showtaskhovereffect: {
                type: J,
                pAttr: "showhovereffect"
            },
            useverticalscrolling: {type: J},
            taskbarroundradius: {type: J},
            showshadow: {type: J},
            showslackasfill: {type: J}
        });
        Q.register("component", ["dataset", "Task", {
            type: "task", configure: function () {
                var a = this.chart, b = ba({}, this.JSONData);
                this.__setDefaultConfig();
                oa(b, this.config, this.chart && this.chart.config, {task: !0});
                this.yAxis = a.components.yAxis[0];
                this._setConfigure()
            }, _setConfigure: function (a) {
                var b = this.config, c = this.chart, d = c.jsonData, f = d.chart, e = this.JSONData;
                a = a || e.task;
                var h = (d.processes ||
                    {}).process || [], d = a && a.length, m = c.components.colorManager, g = c.get("config"),
                    l = c.get("components", "numberFormatter"), n = g.taskbarfillmix, u = g.taskbarfillratio,
                    p = g.showslackasfill, t = this.components.data, A, x, k, C, F, H, y, z = g.dateintooltip, v, w,
                    h = h.length, G = {right: "right", left: "left", undefined: "center", center: "center"}, D, B, E, O,
                    L, S, K, J, Q = c.components.tasksMap = {}, N = g.style.inCanvasStyle, P, Ca, R, W = 0,
                    V = g.dataLabelStyle, Z;
                t || (t = this.components.data = []);
                b.showlabels = q(e.showlabels, e.showlabels, e.showname, f.showtasklabels,
                    f.showtasknames, 0);
                Z = b.labelStyle = ra({fontSize: b.fontSize, fontFamily: b.font});
                U(b.labelStyle);
                if (d) for (c = 0; c < d; c += 1) w = a[c], A = W % h, (D = q(w.processid)) && "string" === typeof D && (D = D.toLowerCase()), R = w.id, B = r(w.alpha, b.alpha), S = q(w.color, b.color, m.getColor("plotFillColor")), E = r(w.borderalpha, b.borderalpha, "100"), O = q(w.bordercolor, b.bordercolor, m.getColor("plotBorderColor")), L = la(q(w.label, w.name), ""), C = m.parseColorMix(S, n), F = m.parseAlphaList(B.toString(), C.length), H = m.parseRatioList(u, C.length), K = r(w.angle,
                    b.angle), v = t[c] || (t[c] = {config: {}}), v = v.config, v.index = c, v.link = w.link, v.processId = q(w.processid, "__FCDPID__" + A), v.textColor = X(q(w.fontcolor, b.fontcolor, N.color)), v.style = ra({
                    fontSize: w.fontsize,
                    fontFamily: w.font
                }), U(v.style), A = v.style, v.lineHeight = q(A && A.lineHeight, Z && Z.lineHeight, V && V.lineHeight), v.startMs = l.getDateValue(w.start).ms, v.endMs = l.getDateValue(w.end).ms, k = l.getFormattedDate(v.startMs), x = l.getFormattedDate(v.endMs), v.tAlpha = B, v.tBorderColor = O, v.tBorderAlpha = E, y = "", v.percentComplete = A =
                    na(r(w.percentcomplete, -1), 100), v.labelAlign = G[[q(w.labelalign, g.tasklabelsalign).toLowerCase()]], v.showAsGroup = r(w.showasgroup, 0), J = v.showPercentLabel = r(w.showpercentlabel, b.showpercentlabel), r(w.showlabel, w.showname, b.showlabels) && (y = L), J && -1 !== A && (y += " " + A + "%"), v.percentComplete = A, Ca = {
                    FCcolor: {
                        color: C.join(),
                        alpha: F,
                        ratio: H,
                        angle: K
                    }
                }, P = m.parseColorMix(q(w.slackfillcolor, b.slackfillcolor), n), P = p ? {
                    FCcolor: {
                        color: P.join(),
                        alpha: F,
                        ratio: H,
                        angle: K
                    }
                } : ja, F = {
                    FCcolor: {
                        color: m.parseColorMix(q(w.hoverfillcolor,
                            b.hoverfillcolor, g.taskhoverfillcolor, ea(S, 80)), n).join(),
                        alpha: m.parseAlphaList(q(w.hoverfillalpha, b.hoverfillalpha).toString(), C.length),
                        ratio: H,
                        angle: K
                    }
                }, S = T(q(w.hoverbordercolor, b.hoverbordercolor, ea(O, 80)), q(w.hoverborderalpha, b.hoverborderalpha, E)), C = p ? {
                    FCcolor: {
                        color: m.parseColorMix(ea(q(w.slackhoverfillcolor, b.slackhoverfillcolor, g.slackfillcolor), 80), n).join(),
                        alpha: m.parseAlphaList(q(w.slackhoverfillalpha, b.slackhoverfillalpha, "100").toString(), C.length),
                        ratio: H,
                        angle: K
                    }
                } : ja, v.color = ca(Ca),
                    v.slackColor = ca(P), v.hoverFillColor = ca(F), v.hoverBorderColor = S, v.slackHoverColor = ca(C), v.showHoverEffect = r(w.showhovereffect, b.showhovereffect, g.showtaskhovereffect, 1), v.taskHeight = q(w.height, "35%"), v.topPadding = q(w.toppadding, "35%"), v.showPercentLabel = J, v.endDate = r(w.showenddate, b.showenddate) ? x : void 0, v._endDate = x, v.startDate = r(w.showstartdate, b.showstartdate) ? k : void 0, v._startDate = k, v.shadow = {
                    opacity: M(B, E) / 100,
                    inverted: !0
                }, v.id = D, v.taskId = R, v.borderColor = T(O, E), v.borderThickness = r(w.showborder,
                    b.showborder) ? r(w.borderthickness, b.borderthickness) : 0, w = ua(Y(q(w.tooltext, b.hovertext, b.plottooltext, f.plottooltext))), w = void 0 !== w ? I.parseTooltext(w, [3, 28, 29, 30, 31], {
                    end: x,
                    start: k,
                    label: L,
                    percentComplete: -1 !== A ? l.percentValue(A) : "",
                    processName: ""
                }, b) : ("" !== L ? L + (z ? ", " : "") : "") + (z ? k + " - " + x : ""), v.label = y, v.toolText = w, "string" === typeof R && (R = R.toLowerCase()), void 0 !== R && (Q[R] = t[c]), W += 1;
                this.visible = r(e.visible, 1)
            }, getAxisValuePadding: function () {
            }, draw: function () {
                var a;
                a = this.visible;
                var b = this.chart,
                    c = b.jsonData, d = b.get("config"), f = b.get("config", "animationObj"), e = f.duration,
                    h = f.dummyObj, m = f.animObj, f = f.animType, g = b.components, l = d.canvasTop, n = g.paper,
                    g = g.xAxis[0], u, p = this.yAxis;
                u = b.graphics.parentTaskGroup;
                var t = this.components, A = t.data, x, k, q = t.removeDataArr, F = q && q.length;
                k = b.graphics.datalabelsGroup;
                var H = this.graphics.dataLabelContainer, y = function () {
                        H.show()
                    }, z = this.graphics, v = z.container, z = z.shadowContainer, t = t.pool || [], w, G, D, B, E, O, L, S,
                    K, J, M, Q, P, N, R, V, T, Z;
                Z = d.showtooltip;
                var X = d.datepadding,
                    U = d.viewPortConfig, Y = U.x, aa = b.getJobList(),
                    c = c.processes.process && c.processes.process.length, U = U.scaleX, ba = d.taskbarroundradius,
                    ca = d.showshadow;
                G = this.config;
                v || (v = this.graphics.container = n.group("columns", u), a ? v.show() : v.hide());
                H ? H.removeCSS() : (H = this.graphics.dataLabelContainer = n.group("labels", k), a ? H.show() : H.hide());
                H.css(G.labelStyle);
                z || (z = this.graphics.shadowContainer = n.group("shadow", u).toBack(), a || z.hide());
                Z ? v.trackTooltip(!0) : v.trackTooltip(!1);
                u = A.length;
                for (a = Z = 0; a < u; a++) G = (k = (x = A[a]) &&
                    x.config) && k.startMs, D = k && k.endMs, void 0 !== x && void 0 !== G && null !== D && (E = k.toolText, D = k.taskHeight, B = k.link, Q = k.borderThickness, O = k.id, V = k.color, G = k.lineHeight, P = !1, Z > c - 1 && (Z = 0), K = void 0 !== k.id ? p.getProcessPositionById(O) : p.getProcessPositionByIndex(Z), Z++, L = K.height, R = L * (/%/g.test(k.topPadding) && .01 * Aa(k.topPadding, 10)) || r(k.topPadding, L), D = k.height = L * (/%/g.test(D) && .01 * Aa(D, 10)) || r(D, L), void 0 !== k.id && p.getProcessPositionById(O), O = k.xPos = g.getAxisPosition(k.startMs) + Y * U, w = g.getAxisPosition(k.endMs) +
                    Y * U, w = k.width = za(S = w - O), K = K.bottom + l - L, K = k.yPos = K + na(R, L - D), N = .5 * D, !x.graphics && (x.graphics = {}), R = W.crispBound(O, K, w, D, Q), O = R.x, K = R.y, w = R.width, D = R.height, !1 !== qa(O, K, w, D) && (L = x.graphics.element, k.showAsGroup ? (S = "path", J = {path: ["M", O, K]}, N = {path: ["M", O, K, "v", D, "L", O + N, K + N, "H", O + w - N, "L", O + w, K + D, "v", -D, "H", O]}) : (S = "rect", N = {
                    x: R.x,
                    y: R.y,
                    width: R.width || 1,
                    height: D
                }, J = e ? {
                    x: R.x,
                    y: R.y,
                    width: 0,
                    height: D
                } : N), L && L && L.type !== S && (L.hide(), L = x.graphics.element = null), L || (S = k.showAsGroup ? "path" : "rect", t.element &&
                t.element.length && (L = t.element[0]).type === S ? x.graphics.element = L = t.element.shift() : (L = x.graphics.element = n[S](v).attr(J).data("dataset", this), P = !0, this.slackElemHandlers(L, b))), T = k.eventArgs = {
                    processId: k.processId,
                    taskId: k.taskId,
                    start: k._startDate,
                    end: k._endDate,
                    showAsGroup: k.showAsGroup,
                    link: k.link,
                    sourceType: "task",
                    percentComplete: -1 !== k.percentComplete
                }, -1 === k.percentComplete || k.showAsGroup ? (x.graphics.taskFill && x.graphics.taskFill.hide(), x.graphics.slackElem && x.graphics.slackElem.hide()) : (S =
                    w * k.percentComplete * .01, V = ja, J = x.graphics.taskFill, M = x.graphics.slackElem, J || (t.taskFill && t.taskFill.length ? J = x.graphics.taskFill = t.taskFill.shift() : (J = x.graphics.taskFill = n.rect(v), this.slackElemHandlers(J, b), P = !0, J.attr({
                    x: O,
                    y: K,
                    height: D,
                    width: e ? 0 : S
                }))), M || (t.slackElem && t.slackElem.length ? M = x.graphics.slackElem = t.slackElem.shift() : (M = x.graphics.slackElem = n.rect(v), this.slackElemHandlers(M, b), P = !0, M.attr({
                    x: O,
                    y: K,
                    width: 0,
                    height: D
                }))), J.show().animateWith(h, m, {x: O, y: K, height: D, width: S, r: 0}, e, f), J.attr({
                    fill: k.color,
                    cursor: B ? "pointer" : "", ishot: !0, "stroke-width": 0
                }).data("chart", b).data("dataObj", x).data("dataset", this).tooltip(E), M.show().animateWith(h, m, {
                    x: O + S || 1,
                    y: K,
                    width: w - S,
                    height: D,
                    r: 0
                }, e, f), M.attr({
                    fill: k.slackColor,
                    cursor: B ? "pointer" : "",
                    ishot: !0,
                    "stroke-width": 0
                }), J && J.data("eventArgs", T), M && M.data("eventArgs", T).data("dataObj", x).data("dataset", this).data("chart", b)), L.show().animateWith(h, m, N, e, f).attr({
                    fill: V,
                    stroke: k.borderColor,
                    cursor: B ? "pointer" : "",
                    ishot: !0,
                    r: ba,
                    "stroke-width": Q
                }).shadow({opacity: ca},
                    z).tooltip(E).data("dataObj", x).data("chart", b).data("dataset", this).data("eventArgs", T), e && P && (H.hide(), L.animateWith(h, m, {width: R.width || 1}, e, f, y)), x = B ? "pointer" : "", B = k.labelAlign, E = k._labelTextAttr || (k._labelTextAttr = {}), E.x = O + w * Ja[B] + Ka[B], E.y = K - .5 * Ha(G, 10) - d.tasklabelspadding, E.text = k.label, E.direction = d.textDirection, E["text-anchor"] = Ia[B], E.cursor = x, E.ishot = !0, E.fill = k.textColor, E["line-height"] = G, B = k._startLabelTextAttr || (k._startLabelTextAttr = {}), B.x = O - 2 - X, B.y = K + .5 * D, B.text = k.startDate, B["text-anchor"] =
                    "end", B.cursor = x, B.ishot = !0, B.direction = d.textDirection, B.fill = k.textColor, B["line-height"] = G, B = k._endLabelTextAttr || (k._endLabelTextAttr = {}), B.x = O + w + 2 + X, B.y = K + .5 * D, B.text = k.endDate, B.cursor = x, B.ishot = !0, B.direction = d.textDirection, B["text-anchor"] = "start", B.fill = k.textColor, B["line-height"] = G, k.cursor = x, P = !1));
                this.drawn ? this.drawLabel() : aa.labelDrawID.push(wa.addJob(this.drawLabel.bind(this), I.priorityList.label));
                this.drawn = !0;
                for (a = 0; a < F; a++) this._removeDataVisuals(q.shift())
            }, drawLabel: function () {
                var a =
                    this.chart, b = a.components.paper, c = this.components.data, d = this.components.pool || {}, f, e;
                e = a.get("config", "animationObj");
                var h = e.dummyObj, m = e.animObj, g = e.duration, l = e.animType, n, u, p,
                    t = this.graphics.dataLabelContainer, A, x = c.length;
                for (A = 0; A < x; A++) n = c[A], e = n.config, P = n.graphics, f = P.label, u = e.eventArgs, pa(e.label) && "" !== e.label ? (p = e._labelTextAttr, (f = P.label || (P.label = d.valElem && d.valElem.shift())) ? (f.removeCSS(), f.show().animateWith(h, m, p, g, l).css(e.style)) : (f = n.graphics.label = b.text(p, e.style, t).data("dataset",
                    this), this.slackElemHandlers(f, a)), f.data("dataObj", n).data("dataObj", n).data("eventArgs", u)) : f && f.hide(), f = n.graphics.startLabel, pa(e.startDate) && "" !== e.startDate ? (p = e._startLabelTextAttr, (f = P.startLabel || (P.startLabel = d.startValElem && d.startValElem.shift())) ? (f.removeCSS(), f.show().animateWith(h, m, p, g, l).css(e.style)) : (f = n.graphics.startLabel = b.text(p, e.style, t).data("dataset", this), this.slackElemHandlers(f, a)), f.data("dataObj", n).data("chart", a).data("eventArgs", u)) : f && f.hide(), f = n.graphics.endLabel,
                    pa(e.endDate) && "" !== e.endDate ? (p = e._endLabelTextAttr, (f = P.endLabel || (P.endLabel = d.endValElem && d.endValElem.shift())) ? (f.removeCSS(), f.show().animateWith(h, m, p, g, l).css(e.style)) : (f = n.graphics.endLabel = b.text(p, e.style, t).data("dataset", this), this.slackElemHandlers(f, a)), f.data("dataObj", n).data("chart", a).data("eventArgs", u)) : f && f.hide()
            }, slackElemHandlers: function (a, b) {
                var c = this;
                a && a.click(function (a) {
                    N.call(this, b, a)
                }).hover(function (a) {
                    var f = this.data("dataObj");
                    N.call(this, b, a, "DataPlotRollOver");
                    f.config.showHoverEffect && c.taskHoverHandler.call(this, b)
                }, function (a) {
                    var f = this.data("dataObj");
                    N.call(this, b, a, "DataPlotRollOut");
                    f.config.showHoverEffect && c.taskHoverOutHandler.call(this, b)
                })
            }, taskHoverHandler: function () {
                var a = this.data("dataObj") || {}, b = this.data("dataset").components.data, a = a.config || {},
                    c = a.index, b = b[c] && b[c].graphics, c = {fill: a.hoverFillColor, stroke: a.hoverBorderColor};
                -1 === a.percentComplete || a.showAsGroup || (b.slackElem.attr({fill: a.slackHoverColor}), b.taskFill.attr({fill: a.hoverFillColor}),
                    delete c.fill);
                b.element.attr(c)
            }, taskHoverOutHandler: function () {
                var a = this.data("dataObj") || {}, b = (this.data("dataset") || {}).components.data,
                    a = a.config || {}, c = a.index, b = b[c] && b[c].graphics, c = {
                        fill: a.color,
                        stroke: a.borderColor,
                        "stroke-width": a.borderThickness,
                        "stroke-dasharray": a.dashedStyle
                    };
                b && (-1 === a.percentComplete || a.showAsGroup || (b.slackElem.attr({fill: a.slackColor}), b.taskFill.attr({fill: a.color}), delete c.fill), b.element.attr(c))
            }, slackElemClickHandler: function (a) {
                var b = this.data("chart");
                N.call(this,
                    b, a)
            }, _removeDataVisuals: function (a) {
                var b = this.components.pool || (this.components.pool = {}), c, d, f;
                if (a) for (c in d = a.graphics, d) a = b[c] || (b[c] = []), f = d[c], f.hide && "function" === typeof f.hide && (f.attr({"text-bound": []}), f.hide(), f.transform && f.transform("")), a.push(d[c])
            }
        }, "column", {
            showpercentlabel: void 0,
            showlabels: void 0,
            showborder: 1,
            borderthickness: 1,
            font: "",
            fontcolor: "",
            fontsize: "",
            color: "",
            alpha: "100",
            angle: 270,
            slackfillcolor: void 0,
            borderalpha: "100",
            hoverfillcolor: "",
            hoverfillalpha: "100",
            slackhoverfillalpha: "100",
            showstartdate: void 0,
            showenddate: void 0
        }]);
        Q.register("component", ["dataset", "Milestone", {
            type: "Milestone", configure: function () {
                var a = this.config, b = this.chart, c = ba({}, this.JSONData);
                this.__setDefaultConfig();
                oa(c, a, {milestones: !0});
                this.yAxis = b.components.yAxis[0];
                this._setConfigure()
            }, _setConfigure: function (a) {
                var b = this.chart, c = this.JSONData, d = (a = a || c.milestone) && a.length,
                    f = b.components.colorManager, e = b.get("config"), h = b.get("components", "numberFormatter"),
                    m = this.components.data, g = b.config.style,
                    l = g.inCanvasStyle, n = b.components.tasksMap, u, p, t, A, x, k, C,
                    F = b.config.milestoneLabelStyle, H;
                m || (m = this.components.data = []);
                for (b = 0; b < d; b += 1) p = a[b], (u = m[b]) || (u = m[b] = {config: {}}), u = u.config, C = la(p.taskid, "").toLowerCase(), A = q(p.shape, "polygon").toLowerCase(), t = r(p.numsides, 5), x = 0, "star" === A ? x = .4 : (ya(t), ya(t).split("-")), A = q(p.color, f.getColor("legendBorderColor")), k = ua(Y(q(p.tooltext, p.hovertext, e.milestonetooltext))), g = h.getDateValue(p.date).ms, H = h.getFormattedDate(g), void 0 !== k && n[C] ? (g = n[C].config,
                    k = I.parseTooltext(k, [28, 32, 33, 34, 35, 36], {
                        date: H,
                        taskStartDate: g._startDate,
                        taskEndDate: g._endDate,
                        taskLabel: g.label,
                        taskPercentComplete: -1 !== g.percentComplete ? h.percentValue(g.percentComplete) : "",
                        processName: ""
                    }, p)) : k = H, g = u.style = ra({
                    fontSize: p.fontsize,
                    fontFamily: p.font,
                    fontWeight: p.fontbold,
                    fontStyle: p.fontitalic
                }), u.textColor = X(q(p.fontcolor, e.milestonefontcolor, l.color)), U(g), u.lineHeight = q(g && g.lineHeight, F && F.lineHeight), u.numSides = t, u.startAngle = r(p.startangle, 90), u.radius = p.radius, u.origDate =
                    p.date, u.date = h.getDateValue(p.date), u.fillColor = X(A), u.fillAlpha = .01 * r(p.fillalpha, p.alpha, 100), u.borderColor = X(q(p.bordercolor, A)), u.borderAlpha = .01 * r(p.borderalpha, p.alpha, 100), u.displayValue = Y(p.label), u.style = g, u.hoverFillColor = X(q(p.hoverfillcolor, e.milestonehoverfillcolor, ea(A, 80))), u.hoverFillAlpha = .01 * r(p.hoverfillalpha, e.milestonehoverfillalpha, p.fillalpha, p.alpha, 100), u.hoverBorderColor = X(q(p.hoverbordercolor, e.milestonehoverbordercolor, ea(q(p.bordercolor, A), 80))), u.hoverBorderAlpha = .01 *
                    r(p.hoverborderalpha, e.milestonehoverborderalpha, p.borderalpha, p.alpha, 100), u.showHoverEffect = r(p.showhovereffect, e.showmilestonehovereffect, e.showhovereffect, 1), u.depth = x, u.taskId = C, u.borderThickness = r(p.borderthickness, 1), u.link = p.link, u.toolText = k;
                this.visible = r(c.visible, 1)
            }, draw: function () {
                var a = this.chart, b = a.components, c = b.xAxis[0], d = this.components.data, f = b.tasksMap,
                    e = a.config, h = a.get("config", "animationObj"), m = h.duration, g = this.graphics.container,
                    l = a.graphics.parentMilestoneGroup, n = this.graphics.dataLabelContainer,
                    u = this.visible, b = b.paper, p = this.components.removeDataArr || [], t = p.length,
                    A = h.dummyObj, x = h.animObj, h = h.animType, k, q, F, H, y, z, v, w, G = a.getJobList();
                k = e.showtooltip;
                var D = this.components.pool || [];
                g || (g = this.graphics.container = b.group("milestone", l), u ? g.show() : g.hide());
                n || (n = this.graphics.dataLabelContainer = b.group("labels", l), u ? n.show() : n.hide());
                k ? g.trackTooltip(!0) : g.trackTooltip(!1);
                u = d && d.length;
                for (n = 0; n < u; n += 1) if (k = d[n]) l = k.config, q = f[l.taskId], !k.graphics && (k.graphics = {}), F = k.graphics, z = F.element,
                    v = F.label, q ? (y = q.config, w = W.animation({
                    "fill-opacity": l.fillAlpha,
                    "stroke-opacity": l.borderAlpha
                }, m, h), H = l.eventArgs = {
                    sides: l.sides,
                    date: l.origDate,
                    radius: l.radius,
                    taskId: l.taskId,
                    toolText: l.toolText,
                    link: l.link,
                    numSides: l.numSides
                }, q = c.getPixel(l.date.ms), v = y.yPos + .5 * y.height, y = r(l.radius, .6 * y.height), !1 !== qa(q, v, y) && (y = [l.numSides, q, v, y, l.startAngle, l.depth], z || (z = D.element && D.element.length ? F.element = D.element.shift() : F.element = b.polypath(g).click(this.clickHandler(a)).hover(this.rollOverHandler(a),
                    this.rollOutHandler(a))), z.show().animateWith(A, x, {polypath: y}, m, h).attr({
                    fill: l.fillColor,
                    "fill-opacity": m ? 0 : l.fillAlpha,
                    stroke: l.borderColor,
                    "stroke-opacity": m ? 0 : l.borderAlpha,
                    groupId: "gId" + n,
                    ishot: !0,
                    cursor: l.link ? "pointer" : "",
                    "stroke-width": l.borderThickness
                }).tooltip(l.toolText).data("eventArgs", H).data("dataObj", k), m && w && !this.drawn && F.element.animateWith(A, x, w.delay(m)), k = l._labelAttrs || (l._labelAttrs = {}), k.x = q, k.y = v, k.text = l.displayValue, k.groupId = "gId" + n, k.cursor = l.link ? "pointer" : "", k.ishot =
                    !0, k.direction = e.textDirection, k["text-anchor"] = "middle", k.fill = l.textColor)) : (z && z.hide(), v && v.hide());
                this.drawn ? this.drawLabel() : G.labelDrawID.push(wa.addJob(this.drawLabel.bind(this), I.priorityList.label));
                this.drawn = !0;
                for (n = 0; n < t; n++) this._removeDataVisuals(p.shift())
            }, drawLabel: function () {
                var a = this.chart, b = a.components.paper, c = a.get("config", "animationObj"), d = c.duration,
                    f = c.animType, e = c.dummyObj, c = c.animObj, h = a.components.tasksMap, m,
                    g = this.graphics.dataLabelContainer, l, n, u, p, t, A, x, k, r = this.components.pool ||
                    {}, q = this.components.data, H;
                u = 0;
                for (t = q.length; u < t; u++) n = q[u], m = n.config, k = h[m.taskId], A = n.graphics, p = A.label, l = m.eventArgs, x = m._labelAttrs, H = m.style, "" !== m.displayValue && void 0 !== m.displayValue && k ? ((p = A.label || (A.label = r.label && r.label.shift())) ? (p.removeCSS(), p.show().animateWith(e, c, x, d, f).css(H)) : p = A.label = b.text(x, H, g).click(this.clickHandler(a)).hover(this.rollOverHandler(a), this.rollOutHandler(a)), p.tooltip(m.toolText).data("eventArgs", l).data("dataObj", n)) : p && p.hide()
            }, clickHandler: function (a) {
                return function (b) {
                    N.call(this,
                        a, b, "MilestoneClick")
                }
            }, rollOverHandler: function (a) {
                return function (b) {
                    var c = this.data("dataObj"), d = c.config;
                    N.call(this, a, b, "MilestoneRollOver");
                    d.showHoverEffect && c.graphics.element.attr({
                        fill: d.hoverFillColor,
                        stroke: d.hoverBorderColor,
                        "fill-opacity": d.hoverFillAlpha,
                        "stroke-opacity": d.hoverBorderAlpha
                    })
                }
            }, rollOutHandler: function (a) {
                return function (b) {
                    var c = this.data("dataObj"), d = c.config;
                    N.call(this, a, b, "MilestoneRollOut");
                    d.showHoverEffect && c.graphics.element.attr({
                        fill: d.fillColor, stroke: d.borderColor,
                        "fill-opacity": d.fillAlpha, "stroke-opacity": d.borderAlpha
                    })
                }
            }
        }, "Task", {
            showpercentlabel: 0,
            showstartdate: 0,
            showenddate: 0,
            showlabels: void 0,
            showborder: 1,
            borderthickness: 1,
            showHoverEffect: 1,
            slackFillColor: "FF5E5E",
            font: "",
            fontcolor: "",
            fontsize: "",
            color: "",
            alpha: "100",
            bordercolor: "",
            borderalpha: "100",
            hoverFillColor: "",
            hoverFillAlpha: "100",
            slackHoverFillColor: 10,
            slackHoverFillAlpha: "100"
        }]);
        Q.register("component", ["dataset", "Connectors", {
            configure: function () {
                var a = this.config, b = this.chart, c = ba({}, this.JSONData);
                this.__setDefaultConfig();
                oa(c, a, {connector: !0});
                this.yAxis = b.components.yAxis[0];
                this._setConfigure()
            }, _setConfigure: function (a) {
                var b = this.config, c = this.chart, d = this.JSONData, f = (a = a || d.connector) && a.length || 0,
                    e = c.components.colorManager, c = c.get("config"), h = this.components.data, m, g, l, n, u, p, t;
                h || (h = this.components.data = []);
                for (m = 0; m < f; m += 1) l = a[m], (g = h[m]) || (g = h[m] = {config: {}}), !g.config && (g.config = {}), g = g.config, n = q(l.color, b.color, e.getColor("plotBorderColor")), u = r(l.alpha, b.alpha, 100), p = r(l.thickness,
                    b.thickness, 1), t = r(l.isdashed, b.isdashed, 1), g.fromTaskId = la(l.fromtaskid, "").toLowerCase(), g.toTaskId = la(l.totaskid, "").toLowerCase(), g.fromTaskConnectStart = r(l.fromtaskconnectstart, 0), g.toTaskConnectStart = r(l.totaskconnectstart, 1), g.color = T(n), g.alpha = .01 * u, g.link = l.link, g.showHoverEffect = r(l.showhovereffect, b.showhovereffect, c.showconnectorhovereffect, 1), g.hoverColor = T(q(l.hovercolor, b.hovercolor, c.connectorhovercolor, ea(n, 80)), r(l.hoveralpha, b.hoveralpha, c.connectorhoveralpha, u)), g.hoverThickness =
                    r(l.hoverthickness, b.hoverthickness, c.connectorhoverthickness, p), g.thickness = p, g.dashedStyle = t ? ma(r(l.dashlen, b.dashlen, 5), r(l.dashgap, b.dashgap, p), p) : "none";
                this.visible = r(d.visible, 1)
            }, draw: function () {
                var a = this.chart, b = a.components, c = this.components.data, d = b.paper, f = c.length,
                    b = b.tasksMap, e = a.config.connectorextension, h = a.graphics.parentConnectorsGroup,
                    m = this.graphics.container, g = this.components.pool || [], l = this.visible,
                    n = a.get("config", "animationObj"), u = n.duration, p = n.dummyObj, t = n.animObj, n = n.animType,
                    A = this.components.removeDataArr || [], x = A.length, k, r, q, H, y, z, v, w, G, D, B, E, I, J, N,
                    K;
                m || (m = this.graphics.container = d.group("connectors", h), l ? m.show() : m.hide());
                for (K = 0; K <= f; K += 1) if (h = c[K]) if (B = h.config, !h.graphics && (h.graphics = {}), l = h.graphics, k = B.fromTaskId && B.fromTaskId.toLowerCase(), r = B.toTaskId && B.toTaskId.toLowerCase(), k = b[k], q = b[r], r = l.connector, k && q) {
                    if (E = k.config, w = q.config, k = E.yPos + .5 * E.height, q = w.yPos + .5 * w.height, H = k == q, y = E.xPos, z = E.xPos + E.width, v = w.xPos, w = w.xPos + w.width, !1 !== qa(y, z, v, w)) {
                        D = 0;
                        0 === B.fromTaskConnectStart && 1 === B.toTaskConnectStart && (D = 1);
                        0 === B.fromTaskConnectStart && 0 === B.toTaskConnectStart && (D = 2);
                        1 === B.fromTaskConnectStart && 1 === B.toTaskConnectStart && (D = 3);
                        1 === B.fromTaskConnectStart && 0 === B.toTaskConnectStart && (D = 4);
                        if (H) switch (E = E.height, D) {
                            case 1:
                                G = (v - z) / 10;
                                G = ["M", z, k, z + G, k, "L", z + G, k, z + G, k - E, "L", z + G, k - E, v - G, k - E, "L", v - G, k - E, v - G, k, "L", v - G, k, v, q];
                                break;
                            case 2:
                                G = ["M", z, k, z + e, k, "L", z + e, k, z + e, k - E, "L", z + e, k - E, w + e, k - E, "L", w + e, q - E, w + e, q, w, q];
                                break;
                            case 3:
                                G = ["M", y, k, y - e, k, "L", y - e,
                                    k, y - e, k - E, "L", y - e, k - E, v - e, k - E, "L", v - e, k - E, v - e, k, "L", v - e, k, v, k];
                                break;
                            case 4:
                                G = ["M", y, k, y - e, k, "L", y - e, k, y - e, k - E, "L", y - e, k - E, w + e, k - E, "L", w + e, k - E, w + e, k, "L", w + e, k, w, k]
                        } else switch (D) {
                            case 1:
                                G = z <= v ? ["M", z, k, z + (v - z) / 2, k, "L", z + (v - z) / 2, k, z + (v - z) / 2, q, "L", z + (v - z) / 2, q, v, q] : ["M", z, k, z + e, k, "L", z + e, k, z + e, k + (q - k) / 2, "L", z + e, k + (q - k) / 2, v - e, k + (q - k) / 2, "L", v - e, k + (q - k) / 2, v - e, q, "L", v - e, q, v, q];
                                break;
                            case 2:
                                G = 0 > w - z ? 0 : w - z;
                                G = ["M", z, k, z + e + G, k, "L", z + e + G, k, z + e + G, q, "L", z + e + G, q, w, q];
                                break;
                            case 3:
                                G = 0 > y - v ? 0 : y - v;
                                G = ["M", y, k, y - e - G, k,
                                    "L", y - e - G, k, y - e - G, q, "L", y - e - G, q, v, q];
                                break;
                            case 4:
                                G = y > w ? ["M", y, k, y - (y - w) / 2, k, "L", y - (y - w) / 2, k, y - (y - w) / 2, q, "L", y - (y - w) / 2, q, w, q] : ["M", y, k, y - e, k, "L", y - e, k, y - e, k + (q - k) / 2, "L", y - e, k + (q - k) / 2, w + e, k + (q - k) / 2, "L", w + e, k + (q - k) / 2, w + e, q, "L", w + e, q, w, q]
                        }
                        r || (r = g.connector && g.connector.length ? l.connector = g.connector.shift() : l.connector = d.path(m), u ? (N = W.animation({"stroke-opacity": B.alpha}, u, n), I = 0, J = u) : I = B.alpha);
                        r.show().animateWith(p, t, {path: G}, u, n).attr({
                            stroke: B.color, "stroke-opacity": I, "stroke-width": B.thickness,
                            "stroke-dasharray": B.dashedStyle
                        });
                        N && r.animate(N.delay(J || 0));
                        r = {
                            fromTaskId: B.fromTaskId,
                            toTaskId: B.toTaskId,
                            fromTaskConnectStart: B.fromTaskConnectStart,
                            toTaskConnectStart: B.toTaskConnectStart,
                            link: B.link,
                            sourceType: "connector"
                        };
                        k = l.tracker;
                        k || (k = g.tracker && g.tracker.length ? l.tracker = g.tracker.shift() : l.tracker = d.path(m).click(this.connectorClick(a)).hover(this.rollOverHandler(a), this.rollOutHandler(a)));
                        k.attr({
                            path: G,
                            stroke: ja,
                            "stroke-width": M(B.thickness, 10),
                            ishot: !0,
                            cursor: B.link ? "pointer" : ""
                        }).data("dataObj",
                            h).data("eventArgs", r)
                    }
                } else r && r.hide();
                for (K = 0; K < x; K++) this._removeDataVisuals(A.shift())
            }, connectorClick: function (a) {
                return function (b) {
                    N.call(this, a, b, "ConnectorClick")
                }
            }, rollOverHandler: function (a) {
                return function (b) {
                    var c = this.data("dataObj"), d = c.config, f = a.components.tasksMap, e = f[d.fromTaskId],
                        f = f[d.toTaskId],
                        h = {stroke: d.hoverColor, "stroke-dasharray": d.dashedStyle, "stroke-width": d.hoverThickness},
                        c = c.graphics.connector;
                    N.call(this, a, b, "ConnectorRollOver");
                    d.showHoverEffect && (xa([e, f], function (a) {
                        var b =
                                {fill: a.config.hoverFillColor, stroke: a.config.hoverBorderColor},
                            c = a.graphics.slackElem, d = a.graphics.element, e = a.graphics.taskFill;
                        a.config.percentComplete && !a.config.showAsGroup && (c && c.attr({fill: a.config.slackHoverColor}), e && e.attr({
                            fill: a.config.hoverFillColor,
                            stroke: a.config.hoverBorderColor
                        }), delete b.fill);
                        d && d.attr(b)
                    }), c && c.attr(h))
                }
            }, rollOutHandler: function (a) {
                return function (b) {
                    var c = this.data("dataObj"), d = c.config, f = a.components.tasksMap, e = f[d.fromTaskId],
                        f = f[d.toTaskId], h = {
                            stroke: d.color,
                            "stroke-width": d.thickness, "stroke-dasharray": d.dashedStyle
                        }, c = c.graphics.connector;
                    N.call(this, a, b, "ConnectorRollOut");
                    d.showHoverEffect && (xa([e, f], function (a) {
                        var b = {
                            fill: a.config.color,
                            stroke: a.config.borderColor,
                            "stroke-width": a.config.borderThickness,
                            "stroke-dasharray": a.config.dashedStyle
                        }, c = a.graphics.slackElem, d = a.graphics.element, e = a.graphics.taskFill;
                        a.config.percentComplete && !a.config.showAsGroup && (c && c.attr({fill: a.config.slackColor}), e && e.attr({fill: a.config.color}), delete b.fill);
                        d &&
                        d.attr(b)
                    }), c && c.attr(h))
                }
            }
        }, "Task", {isdashed: 1, thickness: 1}]);
        Q.get("component", ["axis", "ganttCommon", {
            _drawPlotLine: function () {
                var a = this.config, b = this.chart, c = a.canvas, d = b.config, f = a.ganttPlotLineContainer,
                    e = c.canvasBottom || d.canvasBottom, h = c.canvasLeft || d.canvasLeft,
                    m = c.canvasRight || d.canvasRight, g = c.canvasTop || d.canvasTop, l = b.components.paper,
                    n = a.gridArr, c = this.graphics.line || [], d = a.animateAxis, u, p = 0, t, q, r = [], k, C;
                u = b.get("config", "animationObj");
                k = u.animObj;
                C = u.dummyObj;
                b = u.transposeAnimDuration;
                u = u.animType;
                a = {
                    "stroke-dasharray": a.plotLineDashStyle,
                    "stroke-width": a.plotLineThickness,
                    stroke: a.plotLineColor
                };
                t = 0;
                for (q = n.length; t < q; t += 1) void 0 !== n[t].x ? r.push("M", n[t].x, g, "L", n[t].x, e) : r.push("M", h, n[t].y, "L", m, n[t].y);
                c[p] ? (f = c[p].graphics, b && d ? f.animateWith(C, k, {path: r}, b, u) : f.attr({path: r}), f.attr(a)) : (f = l.path(r, f), f.attr(a), c[p] = {}, c[p].graphics = f);
                t = p + 1;
                for (q = c.length; t < q; t += 1) c[t].graphics.attr({path: "M0,0"});
                this.graphics.line = c
            }, _drawPlotBand: function () {
            }, translateAxis: function (a,
                                        b) {
                var c = this.config, d = c.isVertical, f = c.lastTranslate || (c.lastTranslate = {x: 0, y: 0}),
                    e = c.ganttPlotHoverBandContainer, h, m;
                h = void 0 !== a ? a - f.x : 0;
                m = void 0 !== b ? b - f.y : 0;
                f.x = void 0 !== a ? a : f.x;
                f.y = void 0 !== b ? b : f.y;
                c.labelContainer && c.labelContainer.translate(h, m);
                c.hotContainer && c.hotContainer.translate(h, m);
                c.headerContainer && c.headerContainer.translate(h, 0);
                d ? (c.ganttPlotLineContainer && c.ganttPlotLineContainer.translate(0, m), e && e.translate(0, m)) : (c.ganttPlotLineContainer && c.ganttPlotLineContainer.translate(h,
                    0), e && e.translate(h, 0), this.setAxisConfig({animateAxis: !1}), c.drawTrendLines && this._drawTrendLine(), this.setAxisConfig({animateAxis: !0}))
            }, resetTransletAxis: function () {
                var a = this.config, b;
                b = {transform: "t0,0"};
                a.lastTranslate = {x: 0, y: 0};
                a.labelContainer && a.labelContainer.attr(b);
                a.headerContainer && a.headerContainer.attr(b);
                a.ganttPlotLineContainer && a.ganttPlotLineContainer.attr(b);
                a.ganttPlotHoverBandContainer && a.ganttPlotHoverBandContainer.attr(b);
                a.hotContainer && a.hotContainer.attr(b)
            }, _drawProcessAndDataTableStyleParser: function (a) {
                var b =
                        this.config, c = this.chart, d = c.linkedItems.smartLabel, f = c.components.colorManager,
                    e = b.labels.style, h = a.elem || {}, m = a.dimension, g = h._attrib || {}, l = m.left, n = m.right,
                    u = m.top, p = m.bottom, t, A, x, k, C, F, H, y, z, v, w, G, D;
                switch (a.type) {
                    case "category":
                    case "datatable":
                    case "process":
                        t = q(g.font, e.fontFamily);
                        A = q(g.fontsize, e.fontSize).replace(/px/i, "") + "px";
                        k = q(Number(g.isitalic) ? "italic" : void 0, e.fontStyle);
                        C = T(q(g.bgcolor ? X(g.bgcolor) : void 0, f.getColor("categoryBgColor")), r(g.bgalpha, 100));
                        w = q(g.fontcolor ? X(g.fontcolor) :
                            void 0, e.color);
                        G = r(g.isunderline, 0) && "underline" || "none";
                        z = q(g.valign, "center").toLowerCase();
                        v = q(g.align, "middle").toLowerCase();
                        y = h.drawLabel || "";
                        x = q(Number(g.isbold) ? "bold" : void 0, e.fontWeight);
                        D = h.link;
                        break;
                    case "header":
                        t = q(g.headerfont, e.fontFamily), A = q(g.headerfontsize, e.fontSize).replace(/px/i, "") + "px", x = q(1 === Number(g.headerisbold) ? "bold" : void 0 === g.headerisbold ? "bold" : void 0, e.fontWeight), w = q(g.headerfontcolor ? X(g.headerfontcolor) : void 0, e.color), G = r(g.headerisunderline, 0) && "underline" ||
                            "none", k = q(g.headerisitalic ? "italic" : void 0, e.fontStyle), C = T(q(g.headerbgcolor ? X(g.headerbgcolor) : void 0, f.getColor("categoryBgColor")), r(g.headerbgalpha, 100)), z = q(g.headervalign, "center").toLowerCase(), v = q(g.headeralign, "middle").toLowerCase(), y = h.drawLabel || "", D = h.headerlink
                }
                switch (a.type) {
                    case "category":
                        b.gridLinePath += "M" + l + "," + u + "L" + l + "," + p + "L" + n + "," + p;
                        x = q(1 === Number(g.isbold) ? "bold" : void 0 === g.isbold ? "bold" : void 0, e.fontWeight);
                        break;
                    case "datatable":
                    case "process":
                        b.gridLinePath += "M" + l + "," +
                            p + "L" + n + "," + p + "L" + n + "," + u;
                        break;
                    case "header":
                        b.gridLineHeaderPath += "M" + l + "," + p + "L" + n + "," + p + "L" + n + "," + u
                }
                f = q(h._attrib.hoverbandcolor, b.hoverColor);
                g = r(h._attrib.hoverbandalpha, b.hoverAlpha);
                "left" === v ? (F = l + 2, v = "start") : "right" === v ? (F = l + (n - l) - 2, v = "end") : (v = "middle", F = l + (n - l) / 2);
                "top" === z ? H = u - 2 : "bottom" === z ? H = u + (p - u) - 2 : (z = "center", H = u + (p - u) / 2);
                e = {fontFamily: t, fontSize: A, fontWeight: x, fontStyle: k, textDecoration: G};
                t = U(e);
                t = Number(t.replace(/px/i, ""));
                t = p - u > t ? p - u : t;
                d.useEllipsesOnOverflow(c.config.useEllipsesWhenOverflow);
                d.setStyle(e);
                c = d.getSmartText(y, n - l, t);
                e = {
                    textAttr: {
                        x: F,
                        y: H,
                        text: c.text,
                        fill: w,
                        "text-anchor": v,
                        "vertical-align": z,
                        cursor: D ? "pointer" : "default"
                    },
                    css: e,
                    rectAttr: {
                        x: l,
                        y: u,
                        width: l < n ? n - l : 0,
                        height: u < p ? p - u : 0,
                        fill: C,
                        "stroke-width": 0,
                        cursor: D ? "pointer" : "default"
                    },
                    eventArgs: {isHeader: "header" === a.type, label: y, vAlign: z, align: v, link: D, id: h.id},
                    tooltext: c.oriText
                };
                "datatable" === a.type || "process" === a.type || "category" === a.type ? (n = T(f, g), l = r(h._attrib.showhoverband, b.useHover), b = r(h._attrib.showganttpanehoverband,
                    b.usePlotHover, l), e.dataArgs = {
                    rollOverColor: n,
                    useHover: l,
                    usePlotHover: b,
                    dimension: m,
                    hoverEle: h,
                    type: a.type,
                    pos: a.pos,
                    axis: this,
                    groupId: a.elemIndex
                }) : e.dataArgs = {
                    rollOverColor: void 0,
                    useHover: 0,
                    usePlotHover: 0,
                    dimension: m,
                    hoverEle: h,
                    type: a.type,
                    pos: a.pos,
                    axis: this,
                    groupId: a.elemIndex
                };
                return e
            }, _drawProcessAndDataTableElement: function (a) {
                var b = this, c = b.config, d = b.chart, f = d.components, e = b.components.categoryElement || [],
                    h = c.hoverElemsArr || (c.hoverElemsArr = []), m = f.paper, f = a.elemIndex,
                    g = c.labelHoverEventName,
                    l = c.animateAxis, n, u, p, t, q, r, k = d.config.showtooltip, C, F = function (a) {
                        N.call(this, d, a, g.click)
                    }, H = function (a) {
                        ka = clearTimeout(ka);
                        if (!aa || aa.removed) aa = null;
                        aa && b._gridOutHandler.call(aa);
                        b._gridHoverHandler.call(this);
                        N.call(this, d, a, g.rollOver)
                    }, y = function (a) {
                        aa = this;
                        ka = clearTimeout(ka);
                        ka = setTimeout(function () {
                            b._gridOutHandler.call(aa)
                        }, 500);
                        N.call(aa, d, a, g.rollOut)
                    };
                n = d.get("config", "animationObj");
                q = n.animObj;
                r = n.dummyObj;
                u = n.transposeAnimDuration;
                C = n.animType;
                "header" === a.type ? (n = c.headerBackContainer,
                    p = c.headerTextContainer) : (n = c.labelBackContainer, p = c.labelTextContainer);
                c = b._drawProcessAndDataTableStyleParser(a);
                e[f] ? (m = e[f].graphics.label, t = e[f].graphics.rect, n.appendChild(t), p.appendChild(m), u && l ? (t.animateWith(r, q, c.rectAttr, u, C), m.animateWith(r, q, c.textAttr, u, C)) : (t.attr(c.rectAttr), m.attr(c.textAttr)), m.css(c.css)) : (t = m.rect(c.rectAttr, n), m = m.text(c.textAttr, c.css, p), e[f] = {}, e[f].graphics = {}, e[f].config = {}, e[f].graphics.label = m, e[f].graphics.rect = t, t.hover(H, y).click(F), m.hover(H, y).click(F));
                "header" !== a.type && (h[a.pos] || (h[a.pos] = []), h[a.pos].push({
                    bgElem: t,
                    bgColor: c.rectAttr.fill
                }));
                t.data("dataObj", a.elem).data("eventArgs", c.eventArgs).data("data", c.dataArgs);
                m.data("dataObj", a.elem).data("eventArgs", c.eventArgs).data("data", c.dataArgs).tooltip(c.tooltext).trackTooltip(k ? !0 : !1);
                b.components.categoryElement = e
            }, _drawGridLine: function () {
                var a = this.config, b = this.chart, c = b.components.paper, d = this.graphics.gridLine || [],
                    f = a.animateAxis, e, h, m = 0, g = 0, l = 2, n, u, p, t;
                e = b.get("config", "animationObj");
                u = e.animObj;
                p = e.dummyObj;
                b = e.transposeAnimDuration;
                t = e.animType;
                for (e = {
                    "stroke-dasharray": a.lineDashStyle,
                    "stroke-width": a.lineThickness,
                    stroke: a.lineColor
                }; g < l; g += 1) {
                    if (0 === g) n = a.gridLinePath, h = a.labelLineContainer; else if (n = a.gridLineHeaderPath, h = a.headerLineContainer, !n) continue;
                    d[m] ? (h = d[m].graphics, b && f ? h.animateWith(p, u, {path: n}, b, t) : h.attr({path: n}), h.attr(e)) : (h = c.path(n, h), h.attr(e), d[m] = {}, d[m].graphics = h);
                    m += 1
                }
                g = m;
                for (l = d.length; g < l; g += 1) d[g].graphics.attr({path: "M0,0"});
                this.graphics.gridLine =
                    d
            }, _gridHoverHandler: function () {
                var a = this.data("data"), b = a.type, c = a.dimension, d = a.axis, f = d.chart, e = f.config,
                    h = f.components.paper, m = d.config, f = m.hoverElemsArr || [], m = m.ganttPlotHoverBandContainer,
                    d = d.graphics.plotHoverElement || (d.graphics.plotHoverElement = []), b = "category" === b ? {
                        x: c.left,
                        y: e.canvasTop,
                        width: c.left < c.right ? c.right - c.left : 0,
                        height: e.height,
                        fill: a.rollOverColor,
                        "stroke-width": 0
                    } : {
                        y: c.top,
                        x: e.canvasLeft,
                        height: c.top < c.bottom ? c.bottom - c.top : 0,
                        width: e.width,
                        fill: a.rollOverColor,
                        "stroke-width": 0
                    };
                a.usePlotHover && (d[0] ? d[0].attr(b).show() : d[0] = h.rect(b, m));
                if (a.useHover && f[a.pos]) for (b = 0, c = f[a.pos].length; b < c; b += 1) f[a.pos][b].bgElem.attr({fill: a.rollOverColor})
            }, _gridOutHandler: function () {
                var a = this.data("data"), b = a.axis, c = b.config.hoverElemsArr || [],
                    b = b.graphics.plotHoverElement || [], d, f;
                a.usePlotHover && b[0] && b[0].hide();
                if (a.useHover && c[a.pos]) for (b = 0, d = c[a.pos].length; b < d; b += 1) f = c[a.pos][b], f.bgElem.attr({fill: f.bgColor})
            }, _disposeExtraProcessAndDataTableElement: function (a) {
                var b = this.components.categoryElement ||
                    [], c;
                for (c = b.length; a < c; a += 1) b[a].graphics.label.attr({text: ""}), b[a].graphics.rect.attr({
                    x: 0,
                    y: 0,
                    width: 0,
                    heigth: 0
                })
            }
        }, "cartesian"]);
        Q.get("component", ["axis", "time", {
            configure: function () {
                var a = this.config, b = a.rawAttr, c = this.chart, d = c.jsonData.chart, c = c.components.colorManager;
                Q.register("component", ["axis", "cartesian"]).prototype.configure.call(this);
                a.plotLineColor = a.lineColor = T(q(d.ganttlinecolor, c.getColor("gridColor")), r(d.ganttlinealpha, 100));
                a.plotLineThickness = a.lineThickness = r(d.ganttlinethickness,
                    1);
                a.plotLineDashStyle = a.lineDashStyle = r(d.ganttlinedashed, 0) ? ma(r(d.ganttlinedashlen, 1), d.ganttlinedashgap, a.lineThickness) : "none";
                a.hoverColor = q(d.categoryhoverbandcolor, d.hoverbandcolor, c.getColor("gridColor"));
                a.hoverAlpha = r(d.categoryhoverbandalpha, d.hoverbandalpha, 30);
                a.useHover = r(d.showcategoryhoverband, d.showhoverband, d.showhovereffect, 1);
                a.usePlotHover = r(d.showganttpaneverticalhoverband);
                a.trendlinesDashLen = r(b.trendlinesDashLen, 3);
                a.trendlinesDashGap = r(b.trendlinesDashGap, 3);
                a.gridLineHeaderPath =
                    "";
                a.gridLinePath = ""
            }, setCategory: function (a) {
                var b;
                b = this.chart.get("components").numberFormatter;
                var c = this.config, d = c.axisRange, f = c.startPad || 0, e = c.endPad || 0, h, m, g = Infinity,
                    l = -Infinity, n, u;
                c.categories = {};
                if (a) {
                    c.hasCategory = 1;
                    c = c.categories.category = ba({}, a);
                    this._extractAttribToEnd(c, {});
                    for (n in c) if (c.hasOwnProperty(n) && "_attrib" !== n) for (u = 0, a = c[n].category.length; u < a; u += 1) h = c[n].category[u], m = b.getDateValue(h.start).ms, h = b.getDateValue(h.end).ms, isNaN(m) && (m = void 0), m > l && (l = m), m <= g && (g = m),
                    isNaN(h) && (h = void 0), h > l && (l = h), h <= g && (g = h);
                    b = l + e;
                    d.min = Number(fa(g - f, 10));
                    d.max = Number(fa(b, 10));
                    d.tickInterval = Number(fa(1, 10))
                } else c.hasCategory = 0
            }, _drawComponents: function () {
                var a = this.config;
                this._drawCategories();
                a.drawPlotlines && this._drawPlotLine();
                a.drawPlotBand && this._drawPlotBand();
                a.drawTrendLines && this._drawTrendLine()
            }, _drawCategories: function () {
                var a = this.config, b = (a.axisDimention || {}).y, c = a.totalHeight || 0, d = this.chart,
                    f = d.components, e = d.config, h = e.viewPortConfig, m = f.paper, f = f.numberFormatter,
                    g = a.canvas, l = a.gridArr || (a.gridArr = []), l = g.canvasLeft || e.canvasLeft,
                    n = g.canvasTop || e.canvasTop, u = g.canvasHeight || e.canvasHeight,
                    p = g.canvasWidth || e.canvasWidth, e = a.lastTranslate || (a.lastTranslate = {x: 0, y: 0}),
                    t = d.graphics, q = t.axisBottomGroup, r, g = 0, k, C, F, H, y;
                C = d.get("config", "animationObj");
                d = C.animObj;
                F = C.dummyObj;
                H = C.transposeAnimDuration;
                C = C.animType;
                y = na(c, n - (a.maxTopSpaceAvailable || 0));
                y = 0 < y ? y : 0;
                t.ganttPlotHoverBandContainerParent = t.ganttPlotHoverBandContainerParent || m.group("gantt-plot-band-container-parent",
                    q);
                a.ganttPlotHoverBandContainer ? a.ganttPlotHoverBandContainer.animateWith(F, d, {"clip-rect": l + "," + n + "," + p + "," + u}, H, C) : (a.ganttPlotHoverBandContainer = m.group("gantt-plot-band-container", t.ganttPlotHoverBandContainerParent), a.ganttPlotHoverBandContainer.attr({"clip-rect": l + "," + n + "," + p + "," + u}));
                a.ganttPlotLineContainer ? a.ganttPlotLineContainer.animateWith(F, d, {"clip-rect": l + "," + n + "," + p + "," + u}, H, C) : (a.ganttPlotLineContainer = m.group("gantt-plot-line-container", q), a.ganttPlotLineContainer.attr({
                    "clip-rect": l +
                        "," + n + "," + p + "," + u
                }));
                a.labelContainer ? a.labelContainer.animateWith(F, d, {"clip-rect": l + "," + (n - y) + "," + p + "," + y}, H, C) : (a.labelContainer = m.group("gantt-label-container", q), a.labelContainer.attr({"clip-rect": l + "," + (n - y) + "," + p + "," + y}));
                a.labelBackContainer || (a.labelBackContainer = m.group("gantt-label-back-container", a.labelContainer));
                a.labelLineContainer || (a.labelLineContainer = m.group("gantt-label-line-container", a.labelContainer));
                a.labelTextContainer || (a.labelTextContainer = m.group("gantt-label-text-container",
                    a.labelContainer));
                a.gridLinePath = "";
                a.gridLineHeaderPath = "";
                a.hoverElemsArr = [];
                a.labelHoverEventName = {
                    click: "CategoryClick",
                    rollOver: "CategoryRollOver",
                    rollOut: "CategoryRollOut"
                };
                if (a.hasCategory) {
                    m = a.categories.category;
                    for (r in m) if (m.hasOwnProperty(r) && "_attrib" !== r) for (k in n = m[r].category, u = void 0, l = a.gridArr = [], n) p = f.getDateValue(n[k].start).ms, t = f.getDateValue(n[k].end).ms, !n.hasOwnProperty(k) || "_attrib" === k || isNaN(p) || isNaN(t) || (p = {
                        elem: n[k], elemIndex: g, pos: g, dimension: {
                            left: u || this.getPixel(p),
                            right: this.getPixel(t),
                            top: b - c + m[r]._attrib.topPos,
                            bottom: b - c + m[r]._attrib.bottomPos
                        }, type: "category", isHeader: !1
                    }, u = p.dimension.right, this._drawProcessAndDataTableElement(p), g += 1, l.push({x: p.dimension.left}));
                    0 < h.x ? e.x = -(h.x * h.scaleX) : a.lastTranslate = {x: 0, y: 0}
                }
                this._drawGridLine();
                this._disposeExtraProcessAndDataTableElement(g)
            }, placeAxis: function (a) {
                var b = this.config, c = this.chart, d = c.config, f = c.get("components").numberFormatter,
                    e = c.linkedItems.smartLabel, h = b.labels.style, m = 0, g = {top: 0, bottom: 0},
                    l = 0, n, u, p, t, r, x, k, C = b.trend.trendStyle, F = b.vTrendLines,
                    H = b.useEllipsesWhenOverflow, y = 0, z = 0;
                e.useEllipsesOnOverflow(d.useEllipsesWhenOverflow);
                e.setStyle({
                    fontSize: h.fontSize,
                    fontFamily: h.fontFamily,
                    lineHeight: h.lineHeight,
                    fontWeight: h.fontWeight
                });
                b.maxTopSpaceAvailable = d.canvasTop;
                if (b.hasCategory) for (p in n = b.categories.category, n) if (n.hasOwnProperty(p) && "_attrib" !== p) {
                    m = 0;
                    u = n[p].category;
                    for (r in u) u.hasOwnProperty(r) && "_attrib" !== r && (t = u[r], t.drawLabel = Y(t.label || t.name), x = t._attrib, x = {
                        fontFamily: q(x.fontfamily,
                            h.fontFamily).replace(/px/i, "") + "px",
                        fontSize: q(x.fontsize, h.fontSize),
                        fontWeight: q(1 === Number(x.isbold) ? "bold" : void 0 === x.isbold ? "bold" : void 0, h.fontWeight),
                        fontStyle: q(x.isitalic ? "italic" : void 0, h.fontStyle)
                    }, U(x), e.setStyle(x), t = e.getOriSize(t.drawLabel), t.height > m && (k = t, m = t.height));
                    n[p]._attrib.topPos = l;
                    l += k.height + 8;
                    n[p]._attrib.bottomPos = l
                }
                u = a - l;
                if (b.drawTrendLines && b.drawTrendLabels && F && b.isActive) for (e.setStyle({
                    fontSize: C.fontSize,
                    fontFamily: C.fontFamily,
                    lineHeight: C.lineHeight,
                    fontWeight: C.fontWeight
                }),
                                                                                       b.trendBottomPadding = -1, r = 0, h = F.length; r < h; r += 1) for (p = 0, m = F[r].line.length; p < m; p += 1) n = F[r].line[p], t = n.origText || n.displayvalue || n.endvalue || n.startvalue || "", t = Y(t), n.startvalue = n.start && f.getDateValue(n.start).ms, n.endvalue = n.end && f.getDateValue(n.end).ms, n.origText = t, t = e.getSmartText(t, c.canvasWidth, C.lineHeight, H), k = t.height + 2, 0 > u - k ? n.displayvalue = "" : (n.displayvalue = t.text, y = y < t.height ? t.height : y), t.tooltext ? n.valueToolText = t.tooltext : delete n.valueToolText;
                b.totalHeight = l;
                0 < y && (z += y + za(b.trendBottomPadding ||
                    0));
                l = l > a ? a : l;
                g.top += l;
                g.bottom += z;
                d.categorySpaceUsed = l;
                return g
            }
        }, "ganttCommon"]);
        Q.get("component", ["axis", "process", {
            configure: function () {
                var a = this.config, b = this.chart, c = b.jsonData.chart, b = b.components.colorManager;
                Q.register("component", ["axis", "cartesian"]).prototype.configure.call(this);
                a.lineColor = T(q(c.gridbordercolor, b.getColor("gridColor")), r(c.gridborderalpha, 100));
                a.lineThickness = r(c.gridborderthickness, 1);
                a.lineDashStyle = r(c.gridborderdashed, 0) ? ma(r(c.gridborderdashlen, 1), c.gridborderdashgap,
                    a.lineThickness) : "none";
                a.plotLineColor = T(q(c.ganttlinecolor, b.getColor("gridColor")), r(c.ganttlinealpha, 100));
                a.plotLineThickness = r(c.ganttlinethickness, 1);
                a.plotLineDashStyle = r(c.ganttlinedashed, 0) ? ma(r(c.ganttlinedashlen, 1), c.ganttlinedashgap, a.lineThickness) : "none";
                a.gridResizeBarColor = T(q(c.gridresizebarcolor, b.getColor("gridResizeBarColor")), r(c.gridresizebaralpha, 100));
                a.gridResizeBarThickness = r(c.gridresizebarthickness, 1);
                a.forceRowHeight = r(c.forcerowheight, 0);
                a.rowHeight = r(c.rowheight, 0);
                a.hoverColor = q(c.processhoverbandcolor, c.hoverbandcolor, b.getColor("gridColor"));
                a.hoverAlpha = r(c.processhoverbandalpha, c.hoverbandalpha, 30);
                a.useHover = r(c.showprocesshoverband, c.showhoverband, c.showhovereffect, 1);
                a.usePlotHover = r(c.showganttpanehorizontalhoverband);
                a.showFullDataTable = r(c.showfulldatatable, 1);
                a.useVerticalScrolling = r(c.useverticalscrolling, 1);
                a.gridLineHeaderPath = "";
                a.gridLinePath = ""
            }, setDataTable: function (a) {
                var b = this.config;
                b.dataTables = {};
                b.dataTables.dataTable = {};
                a ? (b.hasDataTables =
                    1, ba(b.dataTables.dataTable, a), a = b.dataTables.dataTable, this._extractAttribToEnd(a, {})) : b.hasDataTables = 0
            }, setProcess: function (a) {
                var b, c = this.config, d = c.axisRange, f = c.startPad || 0;
                b = c.endPad || 0;
                var e, h, m;
                c.processes = {};
                if (a) {
                    c.hasProcess = 1;
                    e = c.processes.process = ba({}, a);
                    this._extractAttribToEnd(e, {});
                    a = e.process.length;
                    m = c.processes.processMap = {};
                    c.processes.processHeightMap = {};
                    for (c = 0; c < a; c += 1) h = e.process[c], h.id && (m[h.id.toLowerCase()] = {
                        catObj: h,
                        index: c
                    });
                    b = a - 1 + b;
                    d.min = Number(fa(-f, 10));
                    d.max = Number(fa(b,
                        10));
                    d.tickInterval = Number(fa(1, 10))
                } else c.hasProcess = 0
            }, getProcessPositionById: function (a) {
                var b = this.config;
                a = b.processes && b.processes.processMap[a];
                b = b.processes.processHeightMap;
                return a ? b[a.index] : !1
            }, getProcessPositionByIndex: function (a) {
                var b = this.config.processes.processHeightMap;
                return b[a] ? b[a] : !1
            }, setProcessHeight: function () {
                var a = this.config, b = this.chart.config.canvasHeight, c = a.processes.process.process,
                    d = a.processes.processHeightMap, f = a.processMaxHeight, e = 0, h = a.forceRowHeight,
                    m = a.rowHeight;
                if (f * c.length < b || 0 === a.useVerticalScrolling) f = b / c.length;
                0 === h ? m && m > f && (f = m) : f = m || f;
                h = 0;
                for (b = c.length; h < b; h++) a = r(c[h].height, f), d[h] = {top: e, bottom: e + a, height: a}, e += a;
                return e
            }, _drawComponents: function () {
                var a = this.config;
                this._drawProcessAndDataTable();
                a.drawPlotlines && this._drawPlotLine();
                a.drawPlotBand && this._drawPlotBand();
                this._drawVerticalLineAndTracker();
                this._drawGridLine()
            }, _drawProcessAndDataTable: function () {
                var a = this.config, b = this.chart, c = (a.axisDimention || {}).x, d = a.totalWidth || 0,
                    f = a.gridArr ||
                        (a.gridArr = []), e = a.canvas, h = b.config, f = b.components.paper,
                    m = e.canvasTop || h.canvasTop, g = e.canvasLeft || h.canvasLeft,
                    l = e.canvasHeight || h.canvasHeight, n = e.canvasWidth || h.canvasWidth, u = b.graphics,
                    p = u.axisBottomGroup, e = a.totalVisiblelWidth, t, q = 0, r, k, C, F;
                k = b.get("config", "animationObj");
                b = k.animObj;
                C = k.dummyObj;
                F = k.transposeAnimDuration;
                k = k.animType;
                u.ganttPlotHoverBandContainerParent = u.ganttPlotHoverBandContainerParent || f.group("gantt-plot-band-container-parent", p);
                a.ganttPlotHoverBandContainer ? a.ganttPlotHoverBandContainer.animateWith(C,
                    b, {"clip-rect": g + "," + m + "," + n + "," + l}, F, k) : (a.ganttPlotHoverBandContainer = f.group("gantt-plot-band-container", u.ganttPlotHoverBandContainerParent), a.ganttPlotHoverBandContainer.attr({"clip-rect": g + "," + m + "," + n + "," + l}));
                a.ganttPlotLineContainer ? a.ganttPlotLineContainer.animateWith(C, b, {"clip-rect": g + "," + m + "," + n + "," + l}, F, k) : (a.ganttPlotLineContainer = f.group("gantt-plot-line-container", p), a.ganttPlotLineContainer.attr({"clip-rect": g + "," + m + "," + n + "," + l}));
                a.headerContainer ? a.headerContainer.animateWith(C,
                    b, {"clip-rect": g - a.totalVisiblelWidth + "," + (m - h.categorySpaceUsed) + "," + a.totalVisiblelWidth + "," + h.categorySpaceUsed}, F, k) : (a.headerContainer = f.group("gantt-header-container", p), a.headerContainer.attr({"clip-rect": g - a.totalVisiblelWidth + "," + (m - h.categorySpaceUsed) + "," + a.totalVisiblelWidth + "," + h.categorySpaceUsed}));
                a.headerBackContainer || (a.headerBackContainer = f.group("gantt-header-back-container", a.headerContainer));
                a.headerLineContainer || (a.headerLineContainer = f.group("gantt-header-line-container",
                    a.headerContainer));
                a.headerTextContainer || (a.headerTextContainer = f.group("gantt-header-text-container", a.headerContainer));
                a.labelContainer ? a.labelContainer.animateWith(C, b, {"clip-rect": g - a.totalVisiblelWidth + "," + m + "," + a.totalVisiblelWidth + "," + l}, F, k) : (a.labelContainer = f.group("gantt-label-container", p), a.labelContainer.attr({"clip-rect": g - a.totalVisiblelWidth + "," + m + "," + a.totalVisiblelWidth + "," + l}));
                a.labelBackContainer || (a.labelBackContainer = f.group("gantt-label-back-container", a.labelContainer));
                a.labelLineContainer || (a.labelLineContainer = f.group("gantt-label-line-container", a.labelContainer));
                a.labelTextContainer || (a.labelTextContainer = f.group("gantt-label-text-container", a.labelContainer));
                a.hotContainer ? a.hotContainer.animateWith(C, b, {"clip-rect": g - a.totalVisiblelWidth + "," + (m - h.categorySpaceUsed) + "," + a.totalVisiblelWidth + "," + (l + h.categorySpaceUsed)}, F, k) : (a.hotContainer = f.group("gantt-hot-container", a.axisLabelGroup), a.hotContainer.attr({
                    "clip-rect": g - a.totalVisiblelWidth + "," + (m - h.categorySpaceUsed) +
                        "," + a.totalVisiblelWidth + "," + (l + h.categorySpaceUsed)
                }));
                a.gridLinePath = "";
                a.gridLineHeaderPath = "";
                a.hoverElemsArr = [];
                a.labelHoverEventName = {click: "ProcessClick", rollOver: "ProcessRollOver", rollOut: "ProcessRollOut"};
                if (a.hasProcess) for (process = a.processes.process.process, g = {
                    elem: a.processes.process,
                    elemIndex: q,
                    dimension: {
                        left: c - d + process._attrib.leftPos,
                        right: c - d + process._attrib.rightPos,
                        top: m - h.categorySpaceUsed,
                        bottom: m
                    },
                    type: "header"
                }, this._drawProcessAndDataTableElement(g), q += 1, f = a.gridArr = [], t =
                    0, l = process.length; t < l; t++) g = this.getProcessPositionByIndex(t), g = {
                    elem: process[t],
                    elemIndex: q,
                    pos: t,
                    dimension: {
                        left: c - d + process._attrib.leftPos,
                        right: c - d + process._attrib.rightPos,
                        top: m + g.top,
                        bottom: m + g.bottom
                    },
                    type: "process"
                }, this._drawProcessAndDataTableElement(g), q += 1, f.push({y: g.dimension.bottom});
                if (a.hasDataTables) {
                    f = a.dataTables.dataTable.datacolumn;
                    for (t in f) if (f.hasOwnProperty(t) && "_attrib" !== t) for (r in g = {
                        elem: f[t], elemIndex: q, pos: t, dimension: {
                            left: c - d + f[t]._attrib.leftPos, right: c - d + f[t]._attrib.rightPos,
                            top: m - h.categorySpaceUsed, bottom: m
                        }, type: "header"
                    }, this._drawProcessAndDataTableElement(g), q += 1, l = f[t].text, l) l[r]._attrib && process[r] && process[r]._attrib && (l[r]._attrib.hoverbandcolor = process[r]._attrib.hoverbandcolor, l[r]._attrib.hoverbandalpha = process[r]._attrib.hoverbandalpha, l[r]._attrib.showhoverband = process[r]._attrib.showhoverband), l.hasOwnProperty(r) && "_attrib" !== r && (g = this.getProcessPositionByIndex(r), g = {
                        elem: l[r], elemIndex: q, pos: r, dimension: {
                            left: c - d + f[t]._attrib.leftPos, right: c - d + f[t]._attrib.rightPos,
                            top: m + g.top, bottom: m + g.bottom
                        }, type: "datatable"
                    }, this._drawProcessAndDataTableElement(g), q += 1);
                    a.drawFromProcessVlineDrag ? a.drawFromProcessVlineDrag = !1 : d > e ? this.translateAxis(d - e, void 0) : (this.resetTransletAxis(), this.resetTransletAxis())
                }
                this._drawGridLine();
                this._disposeExtraProcessAndDataTableElement(q)
            }, _drawVerticalLineAndTracker: function () {
                var a = this, b = a.config, c = a.chart, d = c.config, f = (b.axisDimention || {}).x,
                    e = b.totalWidth || 0, h = b.canvas.canvasTop || d.canvasTop, m = c.components.paper,
                    g = a.components.processVline ||
                        (a.components.processVline = []), l = b.processVlineArr, n = b.hotContainer, u = 0, p, t, q, r,
                    k, C, F, H = function () {
                        var a = this.data("drag-options"), b = a.vHoverLine;
                        a.origX = a.lastX || (a.lastX = 0);
                        b.show();
                        c.trackerClicked = !0;
                        a.draged = !1
                    }, y = function (a) {
                        var b = this.data("drag-options"), c = b.vHoverLine, d = b.vLineSetting, e = d.xPos + a,
                            f = d.leftLimit, g = d.rightLimit;
                        e < f && (a = f - d.xPos);
                        e > g && (a = g - d.xPos);
                        d = {transform: "t" + (b.origX + a) + Ea + 0};
                        this.attr(d);
                        c.attr(d);
                        b.draged = !0;
                        b.lastX = a
                    }, z = function () {
                        var d = this.data("drag-options"), e = d.vLineSetting,
                            f = d.vHoverLine, g = d.vLineIndex;
                        c.trackerClicked = !1;
                        f.hide();
                        d.draged && (e.left.rightPos += d.lastX || 0, e.right.leftPos += d.lastX || 0, e.xPos += d.lastX || 0, l[g - 1] && (l[g - 1].rightLimit += d.lastX || 0), l[g + 1] && (l[g + 1].leftLimit += d.lastX || 0), b.drawFromProcessVlineDrag = !0, a._drawProcessAndDataTable(), a._drawVerticalLineAndTracker(), d = {transform: "t0,0"}, this.attr(d), f.attr(d))
                    };
                k = {stroke: b.gridResizeBarColor, "stroke-width": b.gridResizeBarThickness, visibility: "hidden"};
                C = {stroke: ja, ishot: !0, "stroke-width": 30};
                r = h - d.categorySpaceUsed;
                d = 0;
                for (p = l.length; d < p; d += 1) t = "process" === l[d].type ? b.processes.process.process : b.dataTables.dataTable.datacolumn[l[d].ind], t = f - e + t._attrib.rightPos, t = ["M", t, r, "L", t, h + b.processTotalHeight], g[u] ? (F = g[u].graphics.vHoverLine, F.attr({path: t}).attr(k), q = g[u].graphics.hotElement, q.attr({path: t}).attr(C)) : (F = m.path(t, n), F.attr(k), q = m.path(t, n), q.attr(C), g[u] = {}, g[u].graphics = {}, g[u].config = {}, g[u].graphics.vHoverLine = F, g[u].graphics.hotElement = q), q.css("cursor", W.svg && "ew-resize" || "e-resize").drag(y, H,
                    z).data("drag-options", {
                    vHoverLine: g[u].graphics.vHoverLine,
                    vLineSetting: l[d],
                    vLineIndex: d
                }), u += 1;
                d = u;
                for (p = g.length; d < p; d += 1) g[d].graphics.vHoverLine.attr({path: ["M", 0, 0]}), g[d].graphics.hotElement.attr({path: ["M", 0, 0]})
            }, manageProcessScroll: function (a) {
                var b = this.config, c = b.totalWidth || 0, b = b.totalVisiblelWidth;
                c > b && this.translateAxis((c - b) * (1 - a), void 0)
            }, placeAxis: function (a) {
                var b = this.config, c = this.chart, d = c.linkedItems.smartLabel, f = b.labels.style, e = 0, h = 0,
                    m = {left: 0, right: 0}, g = 0, l = !1, n = 0, u = 0, p,
                    t, r, x, k, C = 0;
                d.useEllipsesOnOverflow(c.config.useEllipsesWhenOverflow);
                d.setStyle({
                    fontSize: f.fontSize,
                    fontFamily: f.fontFamily,
                    lineHeight: f.lineHeight,
                    fontWeight: f.fontWeight
                });
                0 === b.showFullDataTable && (C = a / ((b.hasDataTables && b.dataTables && b.dataTables.dataTable && b.dataTables.dataTable.datacolumn ? b.dataTables.dataTable.datacolumn.length : 0) + 1));
                if (b.hasProcess) {
                    process = b.processes.process.process;
                    p = b.processes.process;
                    "right" === p.positioningrid && (l = !0);
                    p.headertext && (p.drawLabel = Y(p.headertext), c = p._attrib,
                        c = {
                            fontFamily: q(c.headerfontfamily, f.fontFamily),
                            fontSize: q(c.headerfontsize, f.fontSize).replace(/px/i, "") + "px",
                            fontWeight: q(1 === Number(c.headerisbold) ? "bold" : void 0 === c.headerisbold ? "bold" : void 0, f.fontWeight),
                            fontStyle: q(c.headerisitalic ? "italic" : void 0, f.fontStyle)
                        }, c.lineHeight = U(c), d.setStyle(c), c = d.getOriSize(p.drawLabel), c.width > h && (e = c, h = c.width));
                    p = 0;
                    for (t = process.length; p < t; p++) r = process[p], c = r._attrib, r.drawLabel = Y(r.label || r.name), c = {
                        fontFamily: q(c.fontfamily, f.fontFamily),
                        fontSize: q(c.fontsize,
                            f.fontSize).replace(/px/i, "") + "px",
                        fontWeight: q(c.isbold ? "bold" : void 0, f.fontWeight),
                        fontStyle: q(c.isitalic ? "italic" : void 0, f.fontStyle)
                    }, c.lineHeight = U(c), d.setStyle(c), c = d.getOriSize(r.drawLabel), c.width > h && (e = c, h = c.width), c.height > u && (u = c.height);
                    b.processMaxHeight = u + 8;
                    process._attrib.leftPos = g;
                    l ? n = C || e.width + 4 : g += C || e.width + 4;
                    process._attrib.rightPos = g
                }
                if (b.hasDataTables) for (p in e = b.dataTables.dataTable.datacolumn, e) if (e.hasOwnProperty(p) && "_attrib" !== p) {
                    u = e[p];
                    h = 0;
                    u.headertext && (c = u._attrib,
                        u.drawLabel = Y(u.headertext), t = {
                        fontFamily: q(c.headerfontfamily, f.fontFamily),
                        fontSize: q(c.headerfontsize, f.fontSize).replace(/px/i, "") + "px",
                        fontWeight: q(1 === Number(c.headerisbold) ? "bold" : void 0 === c.headerisbold ? "bold" : void 0, f.fontWeight),
                        fontStyle: q(c.headerisitalic ? "italic" : void 0, f.fontStyle)
                    }, t.lineHeight = U(t), d.setStyle(t), c = d.getOriSize(u.drawLabel), c.width > h && (k = c, h = c.width));
                    u = u.text;
                    for (x in u) u.hasOwnProperty(x) && "_attrib" !== x && (c = u[x], c.drawLabel = Y(c.label || c.name), t = c._attrib, t = {
                        fontFamily: q(t.fontfamily,
                            f.fontFamily),
                        fontSize: q(t.fontsize, f.fontSize).replace(/px/i, "") + "px",
                        fontWeight: q(t.isbold ? "bold" : void 0, f.fontWeight),
                        fontStyle: q(t.isitalic ? "italic" : void 0, f.fontStyle)
                    }, t.lineHeight = U(t), d.setStyle(t), c = d.getOriSize(c.drawLabel), c.width > h && (k = c, h = c.width));
                    e[p]._attrib.leftPos = g;
                    g += C || k.width + 4;
                    e[p]._attrib.rightPos = g
                }
                b.hasProcess && l && (process._attrib.leftPos += g, process._attrib.rightPos += g + n, g += n);
                b.totalWidth = g;
                this.adjustWidth();
                g = b.totalWidth > a ? a : b.totalWidth;
                b.totalVisiblelWidth = g;
                m.left +=
                    g;
                return m
            }, adjustWidth: function () {
                var a = this.config, b = a.totalWidth, c = b, d = 0, f = !1, e, h, m, g, l, n;
                e = a.processVlineArr = [];
                c -= 20 * (a.hasDataTables && a.dataTables && a.dataTables.dataTable && a.dataTables.dataTable.datacolumn ? a.dataTables.dataTable.datacolumn.length + 1 : 1);
                m = function (a) {
                    c += 20;
                    a = a.match(/%/g) ? r(b * Number(a.replace(/%/g, "") / 100), 0) : r(a, 0);
                    20 > c ? a = 20 : a > c && (a = c);
                    c -= a;
                    return a
                };
                a.hasProcess && (process = a.processes.process.process, g = a.processes.process, "right" === g.positioningrid && (f = !0), h = process._attrib,
                    l = d, d += m(h.width || "" + (h.rightPos - h.leftPos)), h.leftPos = l, h.rightPos = d, f ? d = 0 : e.push({
                    type: "process",
                    ind: 0,
                    xPos: h.rightPos,
                    left: h,
                    leftLimit: h.leftPos + 20
                }));
                if (a.hasDataTables) for (n in g = a.dataTables.dataTable.datacolumn, g) if (g.hasOwnProperty(n) && "_attrib" !== n) {
                    h = g[n];
                    h = h._attrib;
                    l = d;
                    d += m(h.width || "" + (h.rightPos - h.leftPos));
                    h.leftPos = l;
                    h.rightPos = d;
                    if (l = e[e.length - 1]) l.right = h, l.rightLimit = h.rightPos - 20;
                    e.push({type: "dataTable", ind: n, xPos: h.rightPos, left: h, leftLimit: h.leftPos + 20})
                }
                if (a.hasProcess) if (f) {
                    if (h =
                        process._attrib, h.rightPos = d + (h.rightPos - h.leftPos), h.leftPos = d, d += h.rightPos - h.leftPos, l = e[e.length - 1]) l.right = h, l.rightLimit = h.rightPos - 20
                } else e.pop();
                a.totalWidth = d
            }
        }, "ganttCommon"])
    }])
});

//# sourceMappingURL=http://localhost:3052/3.12.2/map/eval/fusioncharts.gantt.js.map
