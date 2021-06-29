/* DYMO.Connect.Framework */
var COMPILED = !1, goog = goog || {};
goog.global = this,
goog.global.CLOSURE_UNCOMPILED_DEFINES,
goog.global.CLOSURE_DEFINES,
goog.isDef = function (e) {
    return void 0 !== e
}
,
goog.exportPath_ = function (e, o, t) {
    var r, g = e.split("."), n = t || goog.global;
    g[0] in n || !n.execScript || n.execScript("var " + g[0]);
    for (; g.length && (r = g.shift());)
        !g.length && goog.isDef(o) ? n[r] = o : n = n[r] ? n[r] : n[r] = {}
}
,
goog.define = function (e, o) {
    var t = o;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, e) ? t = goog.global.CLOSURE_UNCOMPILED_DEFINES[e] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, e) && (t = goog.global.CLOSURE_DEFINES[e])),
        goog.exportPath_(e, t)
}
,
goog.define("goog.DEBUG", !0),
goog.define("goog.LOCALE", "en"),
goog.define("goog.TRUSTED_SITE", !0),
goog.define("goog.STRICT_MODE_COMPATIBLE", !1),
goog.define("goog.DISALLOW_TEST_ONLY_CODE", COMPILED && !goog.DEBUG),
goog.define("goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING", !1),
goog.provide = function (e) {
    if (!COMPILED && goog.isProvided_(e))
        throw Error('Namespace "' + e + '" already declared.');
    goog.constructNamespace_(e)
}
,
goog.constructNamespace_ = function (e, o) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[e];
        for (var t = e; (t = t.substring(0, t.lastIndexOf("."))) && !goog.getObjectByName(t);)
            goog.implicitNamespaces_[t] = !0
    }
    goog.exportPath_(e, o)
}
,
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/,
goog.module = function (e) {
    if (!goog.isString(e) || !e || -1 == e.search(goog.VALID_MODULE_RE_))
        throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_())
        throw Error("Module " + e + " has been loaded incorrectly.");
    if (goog.moduleLoaderState_.moduleName)
        throw Error("goog.module may only be called once per module.");
    if (goog.moduleLoaderState_.moduleName = e,
        !COMPILED) {
        if (goog.isProvided_(e))
            throw Error('Namespace "' + e + '" already declared.');
        delete goog.implicitNamespaces_[e]
    }
}
,
goog.module.get = function (e) {
    return goog.module.getInternal_(e)
}
,
goog.module.getInternal_ = function (e) {
    if (!COMPILED)
        return goog.isProvided_(e) ? e in goog.loadedModules_ ? goog.loadedModules_[e] : goog.getObjectByName(e) : null
}
,
goog.moduleLoaderState_ = null,
goog.isInModuleLoader_ = function () {
    return null != goog.moduleLoaderState_
}
,
goog.module.declareTestMethods = function () {
    if (!goog.isInModuleLoader_())
        throw new Error("goog.module.declareTestMethods must be called from within a goog.module");
    goog.moduleLoaderState_.declareTestMethods = !0
}
,
goog.module.declareLegacyNamespace = function () {
    if (!COMPILED && !goog.isInModuleLoader_())
        throw new Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName)
        throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
}
,
goog.setTestOnly = function (e) {
    if (goog.DISALLOW_TEST_ONLY_CODE)
        throw e = e || "",
        Error("Importing test-only code into non-debug environment" + (e ? ": " + e : "."))
}
,
goog.forwardDeclare = function (e) { }
,
COMPILED || (goog.isProvided_ = function (e) {
    return e in goog.loadedModules_ || !goog.implicitNamespaces_[e] && goog.isDefAndNotNull(goog.getObjectByName(e))
}
    ,
    goog.implicitNamespaces_ = {
        "goog.module": !0
    }),
goog.getObjectByName = function (e, o) {
    for (var t, r = e.split("."), g = o || goog.global; t = r.shift();) {
        if (!goog.isDefAndNotNull(g[t]))
            return null;
        g = g[t]
    }
    return g
}
,
goog.globalize = function (e, o) {
    var t = o || goog.global;
    for (var r in e)
        t[r] = e[r]
}
,
goog.addDependency = function (e, o, t, r) {
    if (goog.DEPENDENCIES_ENABLED) {
        for (var g, n, i = e.replace(/\\/g, "/"), a = goog.dependencies_, s = 0; g = o[s]; s++)
            a.nameToPath[g] = i,
                a.pathIsModule[i] = !!r;
        for (var l = 0; n = t[l]; l++)
            i in a.requires || (a.requires[i] = {}),
                a.requires[i][n] = !0
    }
}
,
goog.define("goog.ENABLE_DEBUG_LOADER", !0),
goog.logToConsole_ = function (e) {
    goog.global.console && goog.global.console.error(e)
}
,
goog.require = function (e) {
    if (!COMPILED) {
        if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(e),
            goog.isProvided_(e))
            return goog.isInModuleLoader_() ? goog.module.getInternal_(e) : null;
        if (goog.ENABLE_DEBUG_LOADER) {
            var o = goog.getPathFromDeps_(e);
            if (o)
                return goog.included_[o] = !0,
                    goog.writeScripts_(),
                    null
        }
        var t = "goog.require could not find: " + e;
        throw goog.logToConsole_(t),
        Error(t)
    }
}
,
goog.basePath = "",
goog.global.CLOSURE_BASE_PATH,
goog.global.CLOSURE_NO_DEPS = !0,
goog.global.CLOSURE_IMPORT_SCRIPT,
goog.nullFunction = function () { }
,
goog.abstractMethod = function () {
    throw Error("unimplemented abstract method")
}
,
goog.addSingletonGetter = function (e) {
    e.getInstance = function () {
        return e.instance_ ? e.instance_ : (goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = e),
            e.instance_ = new e)
    }
}
,
goog.instantiatedSingletons_ = [],
goog.define("goog.LOAD_MODULE_USING_EVAL", !0),
goog.define("goog.SEAL_MODULE_EXPORTS", goog.DEBUG),
goog.loadedModules_ = {},
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER,
goog.DEPENDENCIES_ENABLED && (goog.included_ = {},
    goog.dependencies_ = {
        pathIsModule: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {},
        deferred: {}
    },
    goog.inHtmlDocument_ = function () {
        var e = goog.global.document;
        return void 0 !== e && "write" in e
    }
    ,
    goog.findBasePath_ = function () {
        if (goog.global.CLOSURE_BASE_PATH)
            goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_())
            for (var e = goog.global.document.getElementsByTagName("SCRIPT"), o = e.length - 1; 0 <= o; --o) {
                var t = e[o].src
                    , r = t.lastIndexOf("?")
                    , g = -1 == r ? t.length : r;
                if ("base.js" == t.substr(g - 7, 7))
                    return void (goog.basePath = t.substr(0, g - 7))
            }
    }
    ,
    goog.importScript_ = function (e, o) {
        (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(e, o) && (goog.dependencies_.written[e] = !0)
    }
    ,
    goog.IS_OLD_IE_ = !goog.global.atob && goog.global.document && goog.global.document.all,
    goog.importModule_ = function (e) {
        var o = 'goog.retrieveAndExecModule_("' + e + '");';
        goog.importScript_("", o) && (goog.dependencies_.written[e] = !0)
    }
    ,
    goog.queuedModules_ = [],
    goog.wrapModule_ = function (e, o) {
        return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(o + "\n//# sourceURL=" + e + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + o + "\n;return exports});\n//# sourceURL=" + e + "\n"
    }
    ,
    goog.loadQueuedModules_ = function () {
        var e = goog.queuedModules_.length;
        if (0 < e) {
            var o = goog.queuedModules_;
            goog.queuedModules_ = [];
            for (var t = 0; t < e; t++) {
                var r = o[t];
                goog.maybeProcessDeferredPath_(r)
            }
        }
    }
    ,
    goog.maybeProcessDeferredDep_ = function (e) {
        if (goog.isDeferredModule_(e) && goog.allDepsAreAvailable_(e)) {
            var o = goog.getPathFromDeps_(e);
            goog.maybeProcessDeferredPath_(goog.basePath + o)
        }
    }
    ,
    goog.isDeferredModule_ = function (e) {
        var o = goog.getPathFromDeps_(e);
        return !(!o || !goog.dependencies_.pathIsModule[o]) && goog.basePath + o in goog.dependencies_.deferred
    }
    ,
    goog.allDepsAreAvailable_ = function (e) {
        var o = goog.getPathFromDeps_(e);
        if (o && o in goog.dependencies_.requires)
            for (var t in goog.dependencies_.requires[o])
                if (!goog.isProvided_(t) && !goog.isDeferredModule_(t))
                    return !1;
        return !0
    }
    ,
    goog.maybeProcessDeferredPath_ = function (e) {
        if (e in goog.dependencies_.deferred) {
            var o = goog.dependencies_.deferred[e];
            delete goog.dependencies_.deferred[e],
                goog.globalEval(o)
        }
    }
    ,
    goog.loadModule = function (e) {
        var o = goog.moduleLoaderState_;
        try {
            var t;
            if (goog.moduleLoaderState_ = {
                moduleName: void 0,
                declareTestMethods: !1
            },
                goog.isFunction(e))
                t = e.call(goog.global, {});
            else {
                if (!goog.isString(e))
                    throw Error("Invalid module definition");
                t = goog.loadModuleFromSource_.call(goog.global, e)
            }
            var r = goog.moduleLoaderState_.moduleName;
            if (!goog.isString(r) || !r)
                throw Error('Invalid module name "' + r + '"');
            if (goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(r, t) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(t),
                goog.loadedModules_[r] = t,
                goog.moduleLoaderState_.declareTestMethods)
                for (var g in t)
                    0 !== g.indexOf("test", 0) && "tearDown" != g && "setUp" != g && "setUpPage" != g && "tearDownPage" != g || (goog.global[g] = t[g])
        } finally {
            goog.moduleLoaderState_ = o
        }
    }
    ,
    goog.loadModuleFromSource_ = function (source) {
        "use strict";
        var exports = {};
        return eval(source),
            exports
    }
    ,
    goog.writeScriptSrcNode_ = function (e) {
        goog.global.document.write('<script type="text/javascript" src="' + e + '"><\/script>')
    }
    ,
    goog.appendScriptSrcNode_ = function (e) {
        var o = goog.global.document
            , t = o.createElement("script");
        t.type = "text/javascript",
            t.src = e,
            t.defer = !1,
            t.async = !1,
            o.head.appendChild(t)
    }
    ,
    goog.writeScriptTag_ = function (e, o) {
        if (goog.inHtmlDocument_()) {
            var t = goog.global.document;
            if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == t.readyState) {
                if (/\bdeps.js$/.test(e))
                    return !1;
                throw Error('Cannot write "' + e + '" after document load')
            }
            var r = goog.IS_OLD_IE_;
            if (void 0 === o)
                if (r) {
                    var g = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
                    t.write('<script type="text/javascript" src="' + e + '"' + g + "><\/script>")
                } else
                    goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(e) : goog.writeScriptSrcNode_(e);
            else
                t.write('<script type="text/javascript">' + o + "<\/script>");
            return !0
        }
        return !1
    }
    ,
    goog.lastNonModuleScriptIndex_ = 0,
    goog.onScriptLoad_ = function (e, o) {
        return "complete" == e.readyState && goog.lastNonModuleScriptIndex_ == o && goog.loadQueuedModules_(),
            !0
    }
    ,
    goog.writeScripts_ = function () {
        var t = []
            , r = {}
            , g = goog.dependencies_;
        function n(e) {
            if (!(e in g.written))
                if (e in g.visited)
                    e in r || (r[e] = !0,
                        t.push(e));
                else {
                    if (g.visited[e] = !0,
                        e in g.requires)
                        for (var o in g.requires[e])
                            if (!goog.isProvided_(o)) {
                                if (!(o in g.nameToPath))
                                    throw Error("Undefined nameToPath for " + o);
                                n(g.nameToPath[o])
                            }
                    e in r || (r[e] = !0,
                        t.push(e))
                }
        }
        for (var e in goog.included_)
            g.written[e] || n(e);
        for (var o = 0; o < t.length; o++) {
            e = t[o];
            goog.dependencies_.written[e] = !0
        }
        var i = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;
        for (o = 0; o < t.length; o++) {
            if (!(e = t[o]))
                throw goog.moduleLoaderState_ = i,
                Error("Undefined script input");
            g.pathIsModule[e] ? (!0,
                goog.importModule_(goog.basePath + e)) : goog.importScript_(goog.basePath + e)
        }
        goog.moduleLoaderState_ = i
    }
    ,
    goog.getPathFromDeps_ = function (e) {
        return e in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[e] : null
    }
    ,
    goog.findBasePath_(),
    goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")),
goog.normalizePath_ = function (e) {
    for (var o = e.split("/"), t = 0; t < o.length;)
        "." == o[t] ? o.splice(t, 1) : t && ".." == o[t] && o[t - 1] && ".." != o[t - 1] ? o.splice(--t, 2) : t++;
    return o.join("/")
}
,
goog.loadFileSync_ = function (e) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC)
        return goog.global.CLOSURE_LOAD_FILE_SYNC(e);
    var o = new goog.global.XMLHttpRequest;
    return o.open("get", e, !1),
        o.send(),
        o.responseText
}
,
goog.retrieveAndExecModule_ = function (e) {
    if (!COMPILED) {
        var o = e;
        e = goog.normalizePath_(e);
        var t = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_
            , r = goog.loadFileSync_(e);
        if (null == r)
            throw new Error("load of " + e + "failed");
        var g = goog.wrapModule_(e, r);
        goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[o] = g,
            goog.queuedModules_.push(o)) : t(e, g)
    }
}
,
goog.typeOf = function (e) {
    var o = typeof e;
    if ("object" == o) {
        if (!e)
            return "null";
        if (e instanceof Array)
            return "array";
        if (e instanceof Object)
            return o;
        var t = Object.prototype.toString.call(e);
        if ("[object Window]" == t)
            return "object";
        if ("[object Array]" == t || "number" == typeof e.length && void 0 !== e.splice && void 0 !== e.propertyIsEnumerable && !e.propertyIsEnumerable("splice"))
            return "array";
        if ("[object Function]" == t || void 0 !== e.call && void 0 !== e.propertyIsEnumerable && !e.propertyIsEnumerable("call"))
            return "function"
    } else if ("function" == o && void 0 === e.call)
        return "object";
    return o
}
,
goog.isNull = function (e) {
    return null === e
}
,
goog.isDefAndNotNull = function (e) {
    return null != e
}
,
goog.isArray = function (e) {
    return "array" == goog.typeOf(e)
}
,
goog.isArrayLike = function (e) {
    var o = goog.typeOf(e);
    return "array" == o || "object" == o && "number" == typeof e.length
}
,
goog.isDateLike = function (e) {
    return goog.isObject(e) && "function" == typeof e.getFullYear
}
,
goog.isString = function (e) {
    return "string" == typeof e
}
,
goog.isBoolean = function (e) {
    return "boolean" == typeof e
}
,
goog.isNumber = function (e) {
    return "number" == typeof e
}
,
goog.isFunction = function (e) {
    return "function" == goog.typeOf(e)
}
,
goog.isObject = function (e) {
    var o = typeof e;
    return "object" == o && null != e || "function" == o
}
,
goog.getUid = function (e) {
    return e[goog.UID_PROPERTY_] || (e[goog.UID_PROPERTY_] = ++goog.uidCounter_)
}
,
goog.hasUid = function (e) {
    return !!e[goog.UID_PROPERTY_]
}
,
goog.removeUid = function (e) {
    "removeAttribute" in e && e.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete e[goog.UID_PROPERTY_]
    } catch (e) { }
}
,
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0),
goog.uidCounter_ = 0,
goog.getHashCode = goog.getUid,
goog.removeHashCode = goog.removeUid,
goog.cloneObject = function (e) {
    var o = goog.typeOf(e);
    if ("object" != o && "array" != o)
        return e;
    if (e.clone)
        return e.clone();
    var t = "array" == o ? [] : {};
    for (var r in e)
        t[r] = goog.cloneObject(e[r]);
    return t
}
,
goog.bindNative_ = function (e, o, t) {
    return e.call.apply(e.bind, arguments)
}
,
goog.bindJs_ = function (o, t, e) {
    if (!o)
        throw new Error;
    if (2 < arguments.length) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function () {
            var e = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(e, r),
                o.apply(t, e)
        }
    }
    return function () {
        return o.apply(t, arguments)
    }
}
,
goog.bind = function (e, o, t) {
    return Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_,
        goog.bind.apply(null, arguments)
}
,
goog.partial = function (o, e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return function () {
        var e = t.slice();
        return e.push.apply(e, arguments),
            o.apply(this, e)
    }
}
,
goog.mixin = function (e, o) {
    for (var t in o)
        e[t] = o[t]
}
,
goog.now = goog.TRUSTED_SITE && Date.now || function () {
    return +new Date
}
,
goog.globalEval = function (e) {
    if (goog.global.execScript)
        goog.global.execScript(e, "JavaScript");
    else {
        if (!goog.global.eval)
            throw Error("goog.globalEval not available");
        if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"),
            void 0 !== goog.global._et_ ? (delete goog.global._et_,
                goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1),
            goog.evalWorksForGlobals_)
            goog.global.eval(e);
        else {
            var o = goog.global.document
                , t = o.createElement("SCRIPT");
            t.type = "text/javascript",
                t.defer = !1,
                t.appendChild(o.createTextNode(e)),
                o.body.appendChild(t),
                o.body.removeChild(t)
        }
    }
}
,
goog.evalWorksForGlobals_ = null,
goog.cssNameMapping_,
goog.cssNameMappingStyle_,
goog.getCssName = function (e, o) {
    function g(e) {
        return goog.cssNameMapping_[e] || e
    }
    var t;
    return t = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? g : function (e) {
        for (var o = e.split("-"), t = [], r = 0; r < o.length; r++)
            t.push(g(o[r]));
        return t.join("-")
    }
        : function (e) {
            return e
        }
        ,
        o ? e + "-" + t(o) : t(e)
}
,
goog.setCssNameMapping = function (e, o) {
    goog.cssNameMapping_ = e,
        goog.cssNameMappingStyle_ = o
}
,
goog.global.CLOSURE_CSS_NAME_MAPPING,
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING),
goog.getMsg = function (e, t) {
    return t && (e = e.replace(/\{\$([^}]+)}/g, function (e, o) {
        return o in t ? t[o] : e
    })),
        e
}
,
goog.getMsgWithFallback = function (e, o) {
    return e
}
,
goog.exportSymbol = function (e, o, t) {
    goog.exportPath_(e, o, t)
}
,
goog.exportProperty = function (e, o, t) {
    e[o] = t
}
,
goog.inherits = function (e, n) {
    function o() { }
    o.prototype = n.prototype,
        e.superClass_ = n.prototype,
        e.prototype = new o,
        (e.prototype.constructor = e).base = function (e, o, t) {
            for (var r = new Array(arguments.length - 2), g = 2; g < arguments.length; g++)
                r[g - 2] = arguments[g];
            return n.prototype[o].apply(e, r)
        }
}
,
goog.base = function (e, o, t) {
    var r = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !r)
        throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (r.superClass_) {
        for (var g = new Array(arguments.length - 1), n = 1; n < arguments.length; n++)
            g[n - 1] = arguments[n];
        return r.superClass_.constructor.apply(e, g)
    }
    var i = new Array(arguments.length - 2);
    for (n = 2; n < arguments.length; n++)
        i[n - 2] = arguments[n];
    for (var a = !1, s = e.constructor; s; s = s.superClass_ && s.superClass_.constructor)
        if (s.prototype[o] === r)
            a = !0;
        else if (a)
            return s.prototype[o].apply(e, i);
    if (e[o] === r)
        return e.constructor.prototype[o].apply(e, i);
    throw Error("goog.base called from a method of one name to a method of a different name")
}
,
goog.scope = function (e) {
    e.call(goog.global)
}
,
COMPILED || (goog.global.COMPILED = COMPILED),
goog.defineClass = function (e, o) {
    var t = o.constructor
        , r = o.statics;
    t && t != Object.prototype.constructor || (t = function () {
        throw Error("cannot instantiate an interface (no constructor defined).")
    }
    );
    var g = goog.defineClass.createSealingConstructor_(t, e);
    return e && goog.inherits(g, e),
        delete o.constructor,
        delete o.statics,
        goog.defineClass.applyProperties_(g.prototype, o),
        null != r && (r instanceof Function ? r(g) : goog.defineClass.applyProperties_(g, r)),
        g
}
,
goog.defineClass.ClassDescriptor,
goog.define("goog.defineClass.SEAL_CLASS_INSTANCES", goog.DEBUG),
goog.defineClass.createSealingConstructor_ = function (o, e) {
    if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
        if (e && e.prototype && e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_])
            return o;
        var t = function () {
            var e = o.apply(this, arguments) || this;
            return e[goog.UID_PROPERTY_] = e[goog.UID_PROPERTY_],
                this.constructor === t && Object.seal(e),
                e
        };
        return t
    }
    return o
}
,
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
goog.defineClass.applyProperties_ = function (e, o) {
    var t;
    for (t in o)
        Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t]);
    for (var r = 0; r < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; r++)
        t = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[r],
            Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t])
}
,
goog.tagUnsealableClass = function (e) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
}
,
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable",
goog.provide("goog.debug.Error"),
goog.debug.Error = function (e) {
    if (Error.captureStackTrace)
        Error.captureStackTrace(this, goog.debug.Error);
    else {
        var o = (new Error).stack;
        o && (this.stack = o)
    }
    e && (this.message = String(e)),
        this.reportErrorToServer = !0
}
,
goog.inherits(goog.debug.Error, Error),
goog.debug.Error.prototype.name = "CustomError",
goog.provide("goog.dom.NodeType"),
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
},
goog.provide("goog.string"),
goog.provide("goog.string.Unicode"),
goog.define("goog.string.DETECT_DOUBLE_ESCAPING", !1),
goog.define("goog.string.FORCE_NON_DOM_HTML_UNESCAPING", !1),
goog.string.Unicode = {
    NBSP: " "
},
goog.string.startsWith = function (e, o) {
    return 0 == e.lastIndexOf(o, 0)
}
,
goog.string.endsWith = function (e, o) {
    var t = e.length - o.length;
    return 0 <= t && e.indexOf(o, t) == t
}
,
goog.string.caseInsensitiveStartsWith = function (e, o) {
    return 0 == goog.string.caseInsensitiveCompare(o, e.substr(0, o.length))
}
,
goog.string.caseInsensitiveEndsWith = function (e, o) {
    return 0 == goog.string.caseInsensitiveCompare(o, e.substr(e.length - o.length, o.length))
}
,
goog.string.caseInsensitiveEquals = function (e, o) {
    return e.toLowerCase() == o.toLowerCase()
}
,
goog.string.subs = function (e, o) {
    for (var t = e.split("%s"), r = "", g = Array.prototype.slice.call(arguments, 1); g.length && 1 < t.length;)
        r += t.shift() + g.shift();
    return r + t.join("%s")
}
,
goog.string.collapseWhitespace = function (e) {
    return e.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
}
,
goog.string.isEmptyOrWhitespace = function (e) {
    return /^[\s\xa0]*$/.test(e)
}
,
goog.string.isEmptyString = function (e) {
    return 0 == e.length
}
,
goog.string.isEmpty = goog.string.isEmptyOrWhitespace,
goog.string.isEmptyOrWhitespaceSafe = function (e) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(e))
}
,
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe,
goog.string.isBreakingWhitespace = function (e) {
    return !/[^\t\n\r ]/.test(e)
}
,
goog.string.isAlpha = function (e) {
    return !/[^a-zA-Z]/.test(e)
}
,
goog.string.isNumeric = function (e) {
    return !/[^0-9]/.test(e)
}
,
goog.string.isAlphaNumeric = function (e) {
    return !/[^a-zA-Z0-9]/.test(e)
}
,
goog.string.isSpace = function (e) {
    return " " == e
}
,
goog.string.isUnicodeChar = function (e) {
    return 1 == e.length && " " <= e && e <= "~" || "" <= e && e <= "�"
}
,
goog.string.stripNewlines = function (e) {
    return e.replace(/(\r\n|\r|\n)+/g, " ")
}
,
goog.string.canonicalizeNewlines = function (e) {
    return e.replace(/(\r\n|\r|\n)/g, "\n")
}
,
goog.string.normalizeWhitespace = function (e) {
    return e.replace(/\xa0|\s/g, " ")
}
,
goog.string.normalizeSpaces = function (e) {
    return e.replace(/\xa0|[ \t]+/g, " ")
}
,
goog.string.collapseBreakingSpaces = function (e) {
    return e.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
,
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function (e) {
    return e.trim()
}
    : function (e) {
        return e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }
,
goog.string.trimLeft = function (e) {
    return e.replace(/^[\s\xa0]+/, "")
}
,
goog.string.trimRight = function (e) {
    return e.replace(/[\s\xa0]+$/, "")
}
,
goog.string.caseInsensitiveCompare = function (e, o) {
    var t = String(e).toLowerCase()
        , r = String(o).toLowerCase();
    return t < r ? -1 : t == r ? 0 : 1
}
,
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g,
goog.string.numerateCompare = function (e, o) {
    if (e == o)
        return 0;
    if (!e)
        return -1;
    if (!o)
        return 1;
    for (var t = e.toLowerCase().match(goog.string.numerateCompareRegExp_), r = o.toLowerCase().match(goog.string.numerateCompareRegExp_), g = Math.min(t.length, r.length), n = 0; n < g; n++) {
        var i = t[n]
            , a = r[n];
        if (i != a) {
            var s = parseInt(i, 10);
            if (!isNaN(s)) {
                var l = parseInt(a, 10);
                if (!isNaN(l) && s - l)
                    return s - l
            }
            return i < a ? -1 : 1
        }
    }
    return t.length != r.length ? t.length - r.length : e < o ? -1 : 1
}
,
goog.string.urlEncode = function (e) {
    return encodeURIComponent(String(e))
}
,
goog.string.urlDecode = function (e) {
    return decodeURIComponent(e.replace(/\+/g, " "))
}
,
goog.string.newLineToBr = function (e, o) {
    return e.replace(/(\r\n|\r|\n)/g, o ? "<br />" : "<br>")
}
,
goog.string.htmlEscape = function (e, o) {
    return o ? (e = e.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"),
        goog.string.DETECT_DOUBLE_ESCAPING && (e = e.replace(goog.string.E_RE_, "&#101;"))) : goog.string.ALL_RE_.test(e) && (-1 != e.indexOf("&") && (e = e.replace(goog.string.AMP_RE_, "&amp;")),
            -1 != e.indexOf("<") && (e = e.replace(goog.string.LT_RE_, "&lt;")),
            -1 != e.indexOf(">") && (e = e.replace(goog.string.GT_RE_, "&gt;")),
            -1 != e.indexOf('"') && (e = e.replace(goog.string.QUOT_RE_, "&quot;")),
            -1 != e.indexOf("'") && (e = e.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")),
            -1 != e.indexOf("\0") && (e = e.replace(goog.string.NULL_RE_, "&#0;")),
            goog.string.DETECT_DOUBLE_ESCAPING && -1 != e.indexOf("e") && (e = e.replace(goog.string.E_RE_, "&#101;"))),
        e
}
,
goog.string.AMP_RE_ = /&/g,
goog.string.LT_RE_ = /</g,
goog.string.GT_RE_ = />/g,
goog.string.QUOT_RE_ = /"/g,
goog.string.SINGLE_QUOTE_RE_ = /'/g,
goog.string.NULL_RE_ = /\x00/g,
goog.string.E_RE_ = /e/g,
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/,
goog.string.unescapeEntities = function (e) {
    return goog.string.contains(e, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(e) : goog.string.unescapePureXmlEntities_(e) : e
}
,
goog.string.unescapeEntitiesWithDocument = function (e, o) {
    return goog.string.contains(e, "&") ? goog.string.unescapeEntitiesUsingDom_(e, o) : e
}
,
goog.string.unescapeEntitiesUsingDom_ = function (e, o) {
    var g, n = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"'
    };
    return g = o ? o.createElement("div") : goog.global.document.createElement("div"),
        e.replace(goog.string.HTML_ENTITY_PATTERN_, function (e, o) {
            var t = n[e];
            if (t)
                return t;
            if ("#" == o.charAt(0)) {
                var r = Number("0" + o.substr(1));
                isNaN(r) || (t = String.fromCharCode(r))
            }
            return t || (g.innerHTML = e + " ",
                t = g.firstChild.nodeValue.slice(0, -1)),
                n[e] = t
        })
}
,
goog.string.unescapePureXmlEntities_ = function (e) {
    return e.replace(/&([^;]+);/g, function (e, o) {
        switch (o) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == o.charAt(0)) {
                    var t = Number("0" + o.substr(1));
                    if (!isNaN(t))
                        return String.fromCharCode(t)
                }
                return e
        }
    })
}
,
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g,
goog.string.whitespaceEscape = function (e, o) {
    return goog.string.newLineToBr(e.replace(/  /g, " &#160;"), o)
}
,
goog.string.preserveSpaces = function (e) {
    return e.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
}
,
goog.string.stripQuotes = function (e, o) {
    for (var t = o.length, r = 0; r < t; r++) {
        var g = 1 == t ? o : o.charAt(r);
        if (e.charAt(0) == g && e.charAt(e.length - 1) == g)
            return e.substring(1, e.length - 1)
    }
    return e
}
,
goog.string.truncate = function (e, o, t) {
    return t && (e = goog.string.unescapeEntities(e)),
        e.length > o && (e = e.substring(0, o - 3) + "..."),
        t && (e = goog.string.htmlEscape(e)),
        e
}
,
goog.string.truncateMiddle = function (e, o, t, r) {
    if (t && (e = goog.string.unescapeEntities(e)),
        r && e.length > o) {
        o < r && (r = o);
        var g = e.length - r
            , n = o - r;
        e = e.substring(0, n) + "..." + e.substring(g)
    } else if (e.length > o) {
        var i = Math.floor(o / 2)
            , a = e.length - i;
        i += o % 2,
            e = e.substring(0, i) + "..." + e.substring(a)
    }
    return t && (e = goog.string.htmlEscape(e)),
        e
}
,
goog.string.specialEscapeChars_ = {
    "\0": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\x0B",
    '"': '\\"',
    "\\": "\\\\"
},
goog.string.jsEscapeCache_ = {
    "'": "\\'"
},
goog.string.quote = function (e) {
    if ((e = String(e)).quote)
        return e.quote();
    for (var o = ['"'], t = 0; t < e.length; t++) {
        var r = e.charAt(t)
            , g = r.charCodeAt(0);
        o[t + 1] = goog.string.specialEscapeChars_[r] || (31 < g && g < 127 ? r : goog.string.escapeChar(r))
    }
    return o.push('"'),
        o.join("")
}
,
goog.string.escapeString = function (e) {
    for (var o = [], t = 0; t < e.length; t++)
        o[t] = goog.string.escapeChar(e.charAt(t));
    return o.join("")
}
,
goog.string.escapeChar = function (e) {
    if (e in goog.string.jsEscapeCache_)
        return goog.string.jsEscapeCache_[e];
    if (e in goog.string.specialEscapeChars_)
        return goog.string.jsEscapeCache_[e] = goog.string.specialEscapeChars_[e];
    var o = e
        , t = e.charCodeAt(0);
    return 31 < t && t < 127 ? o = e : (t < 256 ? (o = "\\x",
        (t < 16 || 256 < t) && (o += "0")) : (o = "\\u",
            t < 4096 && (o += "0")),
        o += t.toString(16).toUpperCase()),
        goog.string.jsEscapeCache_[e] = o
}
,
goog.string.contains = function (e, o) {
    return -1 != e.indexOf(o)
}
,
goog.string.caseInsensitiveContains = function (e, o) {
    return goog.string.contains(e.toLowerCase(), o.toLowerCase())
}
,
goog.string.countOf = function (e, o) {
    return e && o ? e.split(o).length - 1 : 0
}
,
goog.string.removeAt = function (e, o, t) {
    var r = e;
    return 0 <= o && o < e.length && 0 < t && (r = e.substr(0, o) + e.substr(o + t, e.length - o - t)),
        r
}
,
goog.string.remove = function (e, o) {
    var t = new RegExp(goog.string.regExpEscape(o), "");
    return e.replace(t, "")
}
,
goog.string.removeAll = function (e, o) {
    var t = new RegExp(goog.string.regExpEscape(o), "g");
    return e.replace(t, "")
}
,
goog.string.regExpEscape = function (e) {
    return String(e).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
}
,
goog.string.repeat = function (e, o) {
    return new Array(o + 1).join(e)
}
,
goog.string.padNumber = function (e, o, t) {
    var r = goog.isDef(t) ? e.toFixed(t) : String(e)
        , g = r.indexOf(".");
    return -1 == g && (g = r.length),
        goog.string.repeat("0", Math.max(0, o - g)) + r
}
,
goog.string.makeSafe = function (e) {
    return null == e ? "" : String(e)
}
,
goog.string.buildString = function (e) {
    return Array.prototype.join.call(arguments, "")
}
,
goog.string.getRandomString = function () {
    var e = 2147483648;
    return Math.floor(Math.random() * e).toString(36) + Math.abs(Math.floor(Math.random() * e) ^ goog.now()).toString(36)
}
,
goog.string.compareVersions = function (e, o) {
    for (var t = 0, r = goog.string.trim(String(e)).split("."), g = goog.string.trim(String(o)).split("."), n = Math.max(r.length, g.length), i = 0; 0 == t && i < n; i++) {
        var a = r[i] || ""
            , s = g[i] || ""
            , l = new RegExp("(\\d*)(\\D*)", "g")
            , u = new RegExp("(\\d*)(\\D*)", "g");
        do {
            var c = l.exec(a) || ["", "", ""]
                , d = u.exec(s) || ["", "", ""];
            if (0 == c[0].length && 0 == d[0].length)
                break;
            var m = 0 == c[1].length ? 0 : parseInt(c[1], 10)
                , p = 0 == d[1].length ? 0 : parseInt(d[1], 10);
            t = goog.string.compareElements_(m, p) || goog.string.compareElements_(0 == c[2].length, 0 == d[2].length) || goog.string.compareElements_(c[2], d[2])
        } while (0 == t)
    }
    return t
}
,
goog.string.compareElements_ = function (e, o) {
    return e < o ? -1 : o < e ? 1 : 0
}
,
goog.string.HASHCODE_MAX_ = 4294967296,
goog.string.hashCode = function (e) {
    for (var o = 0, t = 0; t < e.length; ++t)
        o = 31 * o + e.charCodeAt(t),
            o %= goog.string.HASHCODE_MAX_;
    return o
}
,
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0,
goog.string.createUniqueString = function () {
    return "goog_" + goog.string.uniqueStringCounter_++
}
,
goog.string.toNumber = function (e) {
    var o = Number(e);
    return 0 == o && goog.string.isEmptyOrWhitespace(e) ? NaN : o
}
,
goog.string.isLowerCamelCase = function (e) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(e)
}
,
goog.string.isUpperCamelCase = function (e) {
    return /^([A-Z][a-z]*)+$/.test(e)
}
,
goog.string.toCamelCase = function (e) {
    return String(e).replace(/\-([a-z])/g, function (e, o) {
        return o.toUpperCase()
    })
}
,
goog.string.toSelectorCase = function (e) {
    return String(e).replace(/([A-Z])/g, "-$1").toLowerCase()
}
,
goog.string.toTitleCase = function (e, o) {
    var t = goog.isString(o) ? goog.string.regExpEscape(o) : "\\s";
    t = t ? "|[" + t + "]+" : "";
    var r = new RegExp("(^" + t + ")([a-z])", "g");
    return e.replace(r, function (e, o, t) {
        return o + t.toUpperCase()
    })
}
,
goog.string.capitalize = function (e) {
    return String(e.charAt(0)).toUpperCase() + String(e.substr(1)).toLowerCase()
}
,
goog.string.parseInt = function (e) {
    return isFinite(e) && (e = String(e)),
        goog.isString(e) ? /^\s*-?0x/i.test(e) ? parseInt(e, 16) : parseInt(e, 10) : NaN
}
,
goog.string.splitLimit = function (e, o, t) {
    for (var r = e.split(o), g = []; 0 < t && r.length;)
        g.push(r.shift()),
            t--;
    return r.length && g.push(r.join(o)),
        g
}
,
goog.string.editDistance = function (e, o) {
    var t = []
        , r = [];
    if (e == o)
        return 0;
    if (!e.length || !o.length)
        return Math.max(e.length, o.length);
    for (var g = 0; g < o.length + 1; g++)
        t[g] = g;
    for (g = 0; g < e.length; g++) {
        r[0] = g + 1;
        for (var n = 0; n < o.length; n++) {
            var i = e[g] != o[n];
            r[n + 1] = Math.min(r[n] + 1, t[n + 1] + 1, t[n] + i)
        }
        for (n = 0; n < t.length; n++)
            t[n] = r[n]
    }
    return r[o.length]
}
,
goog.provide("goog.asserts"),
goog.provide("goog.asserts.AssertionError"),
goog.require("goog.debug.Error"),
goog.require("goog.dom.NodeType"),
goog.require("goog.string"),
goog.define("goog.asserts.ENABLE_ASSERTS", goog.DEBUG),
goog.asserts.AssertionError = function (e, o) {
    o.unshift(e),
        goog.debug.Error.call(this, goog.string.subs.apply(null, o)),
        o.shift(),
        this.messagePattern = e
}
,
goog.inherits(goog.asserts.AssertionError, goog.debug.Error),
goog.asserts.AssertionError.prototype.name = "AssertionError",
goog.asserts.DEFAULT_ERROR_HANDLER = function (e) {
    throw e
}
,
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER,
goog.asserts.doAssertFailure_ = function (e, o, t, r) {
    var g = "Assertion failed";
    if (t) {
        g += ": " + t;
        var n = r
    } else
        e && (g += ": " + e,
            n = o);
    var i = new goog.asserts.AssertionError("" + g, n || []);
    goog.asserts.errorHandler_(i)
}
,
goog.asserts.setErrorHandler = function (e) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = e)
}
,
goog.asserts.assert = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !e && goog.asserts.doAssertFailure_("", null, o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.fail = function (e, o) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (e ? ": " + e : ""), Array.prototype.slice.call(arguments, 1)))
}
,
goog.asserts.assertNumber = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isNumber(e) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertString = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isString(e) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertFunction = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isFunction(e) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertObject = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isObject(e) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertArray = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isArray(e) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertBoolean = function (e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(e) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertElement = function (e, o, t) {
    return !goog.asserts.ENABLE_ASSERTS || goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)),
        e
}
,
goog.asserts.assertInstanceof = function (e, o, t, r) {
    return !goog.asserts.ENABLE_ASSERTS || e instanceof o || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(o), goog.asserts.getType_(e)], t, Array.prototype.slice.call(arguments, 3)),
        e
}
,
goog.asserts.assertObjectPrototypeIsIntact = function () {
    for (var e in Object.prototype)
        goog.asserts.fail(e + " should not be enumerable in Object.prototype.")
}
,
goog.asserts.getType_ = function (e) {
    return e instanceof Function ? e.displayName || e.name || "unknown type name" : e instanceof Object ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : null === e ? "null" : typeof e
}
,
goog.provide("goog.array"),
goog.provide("goog.array.ArrayLike"),
goog.require("goog.asserts"),
goog.define("goog.NATIVE_ARRAY_PROTOTYPES", goog.TRUSTED_SITE),
goog.define("goog.array.ASSUME_NATIVE_FUNCTIONS", !1),
goog.array.ArrayLike,
goog.array.peek = function (e) {
    return e[e.length - 1]
}
,
goog.array.last = goog.array.peek,
goog.array.ARRAY_PROTOTYPE_ = Array.prototype,
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function (e, o, t) {
    return goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.indexOf.call(e, o, t)
}
    : function (e, o, t) {
        var r = null == t ? 0 : t < 0 ? Math.max(0, e.length + t) : t;
        if (goog.isString(e))
            return goog.isString(o) && 1 == o.length ? e.indexOf(o, r) : -1;
        for (var g = r; g < e.length; g++)
            if (g in e && e[g] === o)
                return g;
        return -1
    }
,
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function (e, o, t) {
    goog.asserts.assert(null != e.length);
    var r = null == t ? e.length - 1 : t;
    return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(e, o, r)
}
    : function (e, o, t) {
        var r = null == t ? e.length - 1 : t;
        if (r < 0 && (r = Math.max(0, e.length + r)),
            goog.isString(e))
            return goog.isString(o) && 1 == o.length ? e.lastIndexOf(o, r) : -1;
        for (var g = r; 0 <= g; g--)
            if (g in e && e[g] === o)
                return g;
        return -1
    }
,
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function (e, o, t) {
    goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.forEach.call(e, o, t)
}
    : function (e, o, t) {
        for (var r = e.length, g = goog.isString(e) ? e.split("") : e, n = 0; n < r; n++)
            n in g && o.call(t, g[n], n, e)
    }
,
goog.array.forEachRight = function (e, o, t) {
    for (var r = e.length, g = goog.isString(e) ? e.split("") : e, n = r - 1; 0 <= n; --n)
        n in g && o.call(t, g[n], n, e)
}
,
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function (e, o, t) {
    return goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.filter.call(e, o, t)
}
    : function (e, o, t) {
        for (var r = e.length, g = [], n = 0, i = goog.isString(e) ? e.split("") : e, a = 0; a < r; a++)
            if (a in i) {
                var s = i[a];
                o.call(t, s, a, e) && (g[n++] = s)
            }
        return g
    }
,
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function (e, o, t) {
    return goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.map.call(e, o, t)
}
    : function (e, o, t) {
        for (var r = e.length, g = new Array(r), n = goog.isString(e) ? e.split("") : e, i = 0; i < r; i++)
            i in n && (g[i] = o.call(t, n[i], i, e));
        return g
    }
,
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function (e, o, t, r) {
    return goog.asserts.assert(null != e.length),
        r && (o = goog.bind(o, r)),
        goog.array.ARRAY_PROTOTYPE_.reduce.call(e, o, t)
}
    : function (t, r, e, g) {
        var n = e;
        return goog.array.forEach(t, function (e, o) {
            n = r.call(g, n, e, o, t)
        }),
            n
    }
,
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function (e, o, t, r) {
    return goog.asserts.assert(null != e.length),
        r && (o = goog.bind(o, r)),
        goog.array.ARRAY_PROTOTYPE_.reduceRight.call(e, o, t)
}
    : function (t, r, e, g) {
        var n = e;
        return goog.array.forEachRight(t, function (e, o) {
            n = r.call(g, n, e, o, t)
        }),
            n
    }
,
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function (e, o, t) {
    return goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.some.call(e, o, t)
}
    : function (e, o, t) {
        for (var r = e.length, g = goog.isString(e) ? e.split("") : e, n = 0; n < r; n++)
            if (n in g && o.call(t, g[n], n, e))
                return !0;
        return !1
    }
,
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function (e, o, t) {
    return goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.every.call(e, o, t)
}
    : function (e, o, t) {
        for (var r = e.length, g = goog.isString(e) ? e.split("") : e, n = 0; n < r; n++)
            if (n in g && !o.call(t, g[n], n, e))
                return !1;
        return !0
    }
,
goog.array.count = function (e, r, g) {
    var n = 0;
    return goog.array.forEach(e, function (e, o, t) {
        r.call(g, e, o, t) && ++n
    }, g),
        n
}
,
goog.array.find = function (e, o, t) {
    var r = goog.array.findIndex(e, o, t);
    return r < 0 ? null : goog.isString(e) ? e.charAt(r) : e[r]
}
,
goog.array.findIndex = function (e, o, t) {
    for (var r = e.length, g = goog.isString(e) ? e.split("") : e, n = 0; n < r; n++)
        if (n in g && o.call(t, g[n], n, e))
            return n;
    return -1
}
,
goog.array.findRight = function (e, o, t) {
    var r = goog.array.findIndexRight(e, o, t);
    return r < 0 ? null : goog.isString(e) ? e.charAt(r) : e[r]
}
,
goog.array.findIndexRight = function (e, o, t) {
    for (var r = e.length, g = goog.isString(e) ? e.split("") : e, n = r - 1; 0 <= n; n--)
        if (n in g && o.call(t, g[n], n, e))
            return n;
    return -1
}
,
goog.array.contains = function (e, o) {
    return 0 <= goog.array.indexOf(e, o)
}
,
goog.array.isEmpty = function (e) {
    return 0 == e.length
}
,
goog.array.clear = function (e) {
    if (!goog.isArray(e))
        for (var o = e.length - 1; 0 <= o; o--)
            delete e[o];
    e.length = 0
}
,
goog.array.insert = function (e, o) {
    goog.array.contains(e, o) || e.push(o)
}
,
goog.array.insertAt = function (e, o, t) {
    goog.array.splice(e, t, 0, o)
}
,
goog.array.insertArrayAt = function (e, o, t) {
    goog.partial(goog.array.splice, e, t, 0).apply(null, o)
}
,
goog.array.insertBefore = function (e, o, t) {
    var r;
    2 == arguments.length || (r = goog.array.indexOf(e, t)) < 0 ? e.push(o) : goog.array.insertAt(e, o, r)
}
,
goog.array.remove = function (e, o) {
    var t, r = goog.array.indexOf(e, o);
    return (t = 0 <= r) && goog.array.removeAt(e, r),
        t
}
,
goog.array.removeAt = function (e, o) {
    return goog.asserts.assert(null != e.length),
        1 == goog.array.ARRAY_PROTOTYPE_.splice.call(e, o, 1).length
}
,
goog.array.removeIf = function (e, o, t) {
    var r = goog.array.findIndex(e, o, t);
    return 0 <= r && (goog.array.removeAt(e, r),
        !0)
}
,
goog.array.removeAllIf = function (t, r, g) {
    var n = 0;
    return goog.array.forEachRight(t, function (e, o) {
        r.call(g, e, o, t) && goog.array.removeAt(t, o) && n++
    }),
        n
}
,
goog.array.concat = function (e) {
    return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
}
,
goog.array.join = function (e) {
    return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
}
,
goog.array.toArray = function (e) {
    var o = e.length;
    if (0 < o) {
        for (var t = new Array(o), r = 0; r < o; r++)
            t[r] = e[r];
        return t
    }
    return []
}
,
goog.array.clone = goog.array.toArray,
goog.array.extend = function (e, o) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        if (goog.isArrayLike(r)) {
            var g = e.length || 0
                , n = r.length || 0;
            e.length = g + n;
            for (var i = 0; i < n; i++)
                e[g + i] = r[i]
        } else
            e.push(r)
    }
}
,
goog.array.splice = function (e, o, t, r) {
    return goog.asserts.assert(null != e.length),
        goog.array.ARRAY_PROTOTYPE_.splice.apply(e, goog.array.slice(arguments, 1))
}
,
goog.array.slice = function (e, o, t) {
    return goog.asserts.assert(null != e.length),
        arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(e, o) : goog.array.ARRAY_PROTOTYPE_.slice.call(e, o, t)
}
,
goog.array.removeDuplicates = function (e, o, t) {
    for (var r = o || e, g = t || function (e) {
        return goog.isObject(s) ? "o" + goog.getUid(s) : (typeof s).charAt(0) + s
    }
        , n = {}, i = 0, a = 0; a < e.length;) {
        var s = e[a++]
            , l = g(s);
        Object.prototype.hasOwnProperty.call(n, l) || (n[l] = !0,
            r[i++] = s)
    }
    r.length = i
}
,
goog.array.binarySearch = function (e, o, t) {
    return goog.array.binarySearch_(e, t || goog.array.defaultCompare, !1, o)
}
,
goog.array.binarySelect = function (e, o, t) {
    return goog.array.binarySearch_(e, o, !0, void 0, t)
}
,
goog.array.binarySearch_ = function (e, o, t, r, g) {
    for (var n, i = 0, a = e.length; i < a;) {
        var s, l = i + a >> 1;
        0 < (s = t ? o.call(g, e[l], l, e) : o(r, e[l])) ? i = 1 + l : (a = l,
            n = !s)
    }
    return n ? i : ~i
}
,
goog.array.sort = function (e, o) {
    e.sort(o || goog.array.defaultCompare)
}
,
goog.array.stableSort = function (e, o) {
    for (var t = 0; t < e.length; t++)
        e[t] = {
            index: t,
            value: e[t]
        };
    var r = o || goog.array.defaultCompare;
    goog.array.sort(e, function (e, o) {
        return r(e.value, o.value) || e.index - o.index
    });
    for (t = 0; t < e.length; t++)
        e[t] = e[t].value
}
,
goog.array.sortByKey = function (e, t, o) {
    var r = o || goog.array.defaultCompare;
    goog.array.sort(e, function (e, o) {
        return r(t(e), t(o))
    })
}
,
goog.array.sortObjectsByKey = function (e, o, t) {
    goog.array.sortByKey(e, function (e) {
        return e[o]
    }, t)
}
,
goog.array.isSorted = function (e, o, t) {
    for (var r = o || goog.array.defaultCompare, g = 1; g < e.length; g++) {
        var n = r(e[g - 1], e[g]);
        if (0 < n || 0 == n && t)
            return !1
    }
    return !0
}
,
goog.array.equals = function (e, o, t) {
    if (!goog.isArrayLike(e) || !goog.isArrayLike(o) || e.length != o.length)
        return !1;
    for (var r = e.length, g = t || goog.array.defaultCompareEquality, n = 0; n < r; n++)
        if (!g(e[n], o[n]))
            return !1;
    return !0
}
,
goog.array.compare3 = function (e, o, t) {
    for (var r = t || goog.array.defaultCompare, g = Math.min(e.length, o.length), n = 0; n < g; n++) {
        var i = r(e[n], o[n]);
        if (0 != i)
            return i
    }
    return goog.array.defaultCompare(e.length, o.length)
}
,
goog.array.defaultCompare = function (e, o) {
    return o < e ? 1 : e < o ? -1 : 0
}
,
goog.array.inverseDefaultCompare = function (e, o) {
    return -goog.array.defaultCompare(e, o)
}
,
goog.array.defaultCompareEquality = function (e, o) {
    return e === o
}
,
goog.array.binaryInsert = function (e, o, t) {
    var r = goog.array.binarySearch(e, o, t);
    return r < 0 && (goog.array.insertAt(e, o, -(r + 1)),
        !0)
}
,
goog.array.binaryRemove = function (e, o, t) {
    var r = goog.array.binarySearch(e, o, t);
    return 0 <= r && goog.array.removeAt(e, r)
}
,
goog.array.bucket = function (e, o, t) {
    for (var r = {}, g = 0; g < e.length; g++) {
        var n = e[g]
            , i = o.call(t, n, g, e);
        if (goog.isDef(i))
            (r[i] || (r[i] = [])).push(n)
    }
    return r
}
,
goog.array.toObject = function (t, r, g) {
    var n = {};
    return goog.array.forEach(t, function (e, o) {
        n[r.call(g, e, o, t)] = e
    }),
        n
}
,
goog.array.range = function (e, o, t) {
    var r = []
        , g = 0
        , n = e
        , i = t || 1;
    if (void 0 !== o && (g = e,
        n = o),
        i * (n - g) < 0)
        return [];
    if (0 < i)
        for (var a = g; a < n; a += i)
            r.push(a);
    else
        for (a = g; n < a; a += i)
            r.push(a);
    return r
}
,
goog.array.repeat = function (e, o) {
    for (var t = [], r = 0; r < o; r++)
        t[r] = e;
    return t
}
,
goog.array.flatten = function (e) {
    for (var o = [], t = 0; t < arguments.length; t++) {
        var r = arguments[t];
        if (goog.isArray(r))
            for (var g = 0; g < r.length; g += 8192)
                for (var n = goog.array.slice(r, g, g + 8192), i = goog.array.flatten.apply(null, n), a = 0; a < i.length; a++)
                    o.push(i[a]);
        else
            o.push(r)
    }
    return o
}
,
goog.array.rotate = function (e, o) {
    return goog.asserts.assert(null != e.length),
        e.length && (0 < (o %= e.length) ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(e, e.splice(-o, o)) : o < 0 && goog.array.ARRAY_PROTOTYPE_.push.apply(e, e.splice(0, -o))),
        e
}
,
goog.array.moveItem = function (e, o, t) {
    goog.asserts.assert(0 <= o && o < e.length),
        goog.asserts.assert(0 <= t && t < e.length);
    var r = goog.array.ARRAY_PROTOTYPE_.splice.call(e, o, 1);
    goog.array.ARRAY_PROTOTYPE_.splice.call(e, t, 0, r[0])
}
,
goog.array.zip = function (e) {
    if (!arguments.length)
        return [];
    for (var o = [], t = 0; ; t++) {
        for (var r = [], g = 0; g < arguments.length; g++) {
            var n = arguments[g];
            if (t >= n.length)
                return o;
            r.push(n[t])
        }
        o.push(r)
    }
}
,
goog.array.shuffle = function (e, o) {
    for (var t = o || Math.random, r = e.length - 1; 0 < r; r--) {
        var g = Math.floor(t() * (r + 1))
            , n = e[r];
        e[r] = e[g],
            e[g] = n
    }
}
,
goog.array.copyByIndex = function (o, e) {
    var t = [];
    return goog.array.forEach(e, function (e) {
        t.push(o[e])
    }),
        t
}
,
goog.provide("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
    var e = goog.labs.userAgent.util.getNavigator_();
    if (e) {
        var o = e.userAgent;
        if (o)
            return o
    }
    return ""
}
,
goog.labs.userAgent.util.getNavigator_ = function () {
    return goog.global.navigator
}
,
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_(),
goog.labs.userAgent.util.setUserAgent = function (e) {
    goog.labs.userAgent.util.userAgent_ = e || goog.labs.userAgent.util.getNativeUserAgentString_()
}
,
goog.labs.userAgent.util.getUserAgent = function () {
    return goog.labs.userAgent.util.userAgent_
}
,
goog.labs.userAgent.util.matchUserAgent = function (e) {
    var o = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(o, e)
}
,
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (e) {
    var o = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(o, e)
}
,
goog.labs.userAgent.util.extractVersionTuples = function (e) {
    for (var o, t = new RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), r = []; o = t.exec(e);)
        r.push([o[1], o[2], o[3] || void 0]);
    return r
}
,
goog.provide("goog.object"),
goog.object.forEach = function (e, o, t) {
    for (var r in e)
        o.call(t, e[r], r, e)
}
,
goog.object.filter = function (e, o, t) {
    var r = {};
    for (var g in e)
        o.call(t, e[g], g, e) && (r[g] = e[g]);
    return r
}
,
goog.object.map = function (e, o, t) {
    var r = {};
    for (var g in e)
        r[g] = o.call(t, e[g], g, e);
    return r
}
,
goog.object.some = function (e, o, t) {
    for (var r in e)
        if (o.call(t, e[r], r, e))
            return !0;
    return !1
}
,
goog.object.every = function (e, o, t) {
    for (var r in e)
        if (!o.call(t, e[r], r, e))
            return !1;
    return !0
}
,
goog.object.getCount = function (e) {
    var o = 0;
    for (var t in e)
        o++;
    return o
}
,
goog.object.getAnyKey = function (e) {
    for (var o in e)
        return o
}
,
goog.object.getAnyValue = function (e) {
    for (var o in e)
        return e[o]
}
,
goog.object.contains = function (e, o) {
    return goog.object.containsValue(e, o)
}
,
goog.object.getValues = function (e) {
    var o = []
        , t = 0;
    for (var r in e)
        o[t++] = e[r];
    return o
}
,
goog.object.getKeys = function (e) {
    var o = []
        , t = 0;
    for (var r in e)
        o[t++] = r;
    return o
}
,
goog.object.getValueByKeys = function (e, o) {
    for (var t = goog.isArrayLike(o), r = t ? o : arguments, g = t ? 0 : 1; g < r.length && (e = e[r[g]],
        goog.isDef(e)); g++)
        ;
    return e
}
,
goog.object.containsKey = function (e, o) {
    return o in e
}
,
goog.object.containsValue = function (e, o) {
    for (var t in e)
        if (e[t] == o)
            return !0;
    return !1
}
,
goog.object.findKey = function (e, o, t) {
    for (var r in e)
        if (o.call(t, e[r], r, e))
            return r
}
,
goog.object.findValue = function (e, o, t) {
    var r = goog.object.findKey(e, o, t);
    return r && e[r]
}
,
goog.object.isEmpty = function (e) {
    for (var o in e)
        return !1;
    return !0
}
,
goog.object.clear = function (e) {
    for (var o in e)
        delete e[o]
}
,
goog.object.remove = function (e, o) {
    var t;
    return (t = o in e) && delete e[o],
        t
}
,
goog.object.add = function (e, o, t) {
    if (o in e)
        throw Error('The object already contains the key "' + o + '"');
    goog.object.set(e, o, t)
}
,
goog.object.get = function (e, o, t) {
    return o in e ? e[o] : t
}
,
goog.object.set = function (e, o, t) {
    e[o] = t
}
,
goog.object.setIfUndefined = function (e, o, t) {
    return o in e ? e[o] : e[o] = t
}
,
goog.object.setWithReturnValueIfNotSet = function (e, o, t) {
    if (o in e)
        return e[o];
    var r = t();
    return e[o] = r
}
,
goog.object.equals = function (e, o) {
    for (var t in e)
        if (!(t in o) || e[t] !== o[t])
            return !1;
    for (var t in o)
        if (!(t in e))
            return !1;
    return !0
}
,
goog.object.clone = function (e) {
    var o = {};
    for (var t in e)
        o[t] = e[t];
    return o
}
,
goog.object.unsafeClone = function (e) {
    var o = goog.typeOf(e);
    if ("object" != o && "array" != o)
        return e;
    if (e.clone)
        return e.clone();
    var t = "array" == o ? [] : {};
    for (var r in e)
        t[r] = goog.object.unsafeClone(e[r]);
    return t
}
,
goog.object.transpose = function (e) {
    var o = {};
    for (var t in e)
        o[e[t]] = t;
    return o
}
,
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
goog.object.extend = function (e, o) {
    for (var t, r, g = 1; g < arguments.length; g++) {
        for (t in r = arguments[g])
            e[t] = r[t];
        for (var n = 0; n < goog.object.PROTOTYPE_FIELDS_.length; n++)
            t = goog.object.PROTOTYPE_FIELDS_[n],
                Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t])
    }
}
,
goog.object.create = function (e) {
    var o = arguments.length;
    if (1 == o && goog.isArray(e))
        return goog.object.create.apply(null, e);
    if (o % 2)
        throw Error("Uneven number of arguments");
    for (var t = {}, r = 0; r < o; r += 2)
        t[arguments[r]] = arguments[r + 1];
    return t
}
,
goog.object.createSet = function (e) {
    var o = arguments.length;
    if (1 == o && goog.isArray(e))
        return goog.object.createSet.apply(null, e);
    for (var t = {}, r = 0; r < o; r++)
        t[arguments[r]] = !0;
    return t
}
,
goog.object.createImmutableView = function (e) {
    var o = e;
    return Object.isFrozen && !Object.isFrozen(e) && (o = Object.create(e),
        Object.freeze(o)),
        o
}
,
goog.object.isImmutableView = function (e) {
    return !!Object.isFrozen && Object.isFrozen(e)
}
,
goog.provide("goog.labs.userAgent.browser"),
goog.require("goog.array"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.object"),
goog.require("goog.string"),
goog.labs.userAgent.browser.matchOpera_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR")
}
,
goog.labs.userAgent.browser.matchIE_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Edge") || goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
}
,
goog.labs.userAgent.browser.matchFirefox_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
}
,
goog.labs.userAgent.browser.matchSafari_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchIE_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
}
,
goog.labs.userAgent.browser.matchCoast_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
}
,
goog.labs.userAgent.browser.matchIosWebview_ = function () {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
}
,
goog.labs.userAgent.browser.matchChrome_ = function () {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchIE_()
}
,
goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
}
,
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_,
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_,
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_,
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_,
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_,
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_,
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_,
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_,
goog.labs.userAgent.browser.isSilk = function () {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
}
,
goog.labs.userAgent.browser.getVersion = function () {
    var e = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE())
        return goog.labs.userAgent.browser.getIEVersion_(e);
    var o = goog.labs.userAgent.util.extractVersionTuples(e)
        , r = {};
    goog.array.forEach(o, function (e) {
        var o = e[0]
            , t = e[1];
        r[o] = t
    });
    var t = goog.partial(goog.object.containsKey, r);
    function g(e) {
        var o = goog.array.find(e, t);
        return r[o] || ""
    }
    if (goog.labs.userAgent.browser.isOpera())
        return g(["Version", "Opera", "OPR"]);
    if (goog.labs.userAgent.browser.isChrome())
        return g(["Chrome", "CriOS"]);
    var n = o[2];
    return n && n[1] || ""
}
,
goog.labs.userAgent.browser.isVersionOrHigher = function (e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), e)
}
,
goog.labs.userAgent.browser.getIEVersion_ = function (e) {
    var o = /rv: *([\d\.]*)/.exec(e);
    if (o && o[1])
        return o[1];
    var t = /Edge\/([\d\.]+)/.exec(e);
    if (t)
        return t[1];
    var r = ""
        , g = /MSIE +([\d\.]+)/.exec(e);
    if (g && g[1]) {
        var n = /Trident\/(\d.\d)/.exec(e);
        if ("7.0" == g[1])
            if (n && n[1])
                switch (n[1]) {
                    case "4.0":
                        r = "8.0";
                        break;
                    case "5.0":
                        r = "9.0";
                        break;
                    case "6.0":
                        r = "10.0";
                        break;
                    case "7.0":
                        r = "11.0"
                }
            else
                r = "7.0";
        else
            r = g[1]
    }
    return r
}
,
goog.provide("goog.labs.userAgent.engine"),
goog.require("goog.array"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.labs.userAgent.engine.isPresto = function () {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
}
,
goog.labs.userAgent.engine.isTrident = function () {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
}
,
goog.labs.userAgent.engine.isEdge = function () {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
}
,
goog.labs.userAgent.engine.isWebKit = function () {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
}
,
goog.labs.userAgent.engine.isGecko = function () {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
}
,
goog.labs.userAgent.engine.getVersion = function () {
    var e = goog.labs.userAgent.util.getUserAgent();
    if (e) {
        var o = goog.labs.userAgent.util.extractVersionTuples(e)
            , t = goog.labs.userAgent.engine.getEngineTuple_(o);
        if (t)
            return "Gecko" == t[0] ? goog.labs.userAgent.engine.getVersionForKey_(o, "Firefox") : t[1];
        var r, g = o[0];
        if (g && (r = g[2])) {
            var n = /Trident\/([^\s;]+)/.exec(r);
            if (n)
                return n[1]
        }
    }
    return ""
}
,
goog.labs.userAgent.engine.getEngineTuple_ = function (e) {
    if (!goog.labs.userAgent.engine.isEdge())
        return e[1];
    for (var o = 0; o < e.length; o++) {
        var t = e[o];
        if ("Edge" == t[0])
            return t
    }
}
,
goog.labs.userAgent.engine.isVersionOrHigher = function (e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), e)
}
,
goog.labs.userAgent.engine.getVersionForKey_ = function (e, o) {
    var t = goog.array.find(e, function (e) {
        return o == e[0]
    });
    return t && t[1] || ""
}
,
goog.provide("goog.labs.userAgent.platform"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.labs.userAgent.platform.isAndroid = function () {
    return goog.labs.userAgent.util.matchUserAgent("Android")
}
,
goog.labs.userAgent.platform.isIpod = function () {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
}
,
goog.labs.userAgent.platform.isIphone = function () {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
}
,
goog.labs.userAgent.platform.isIpad = function () {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
}
,
goog.labs.userAgent.platform.isIos = function () {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
}
,
goog.labs.userAgent.platform.isMacintosh = function () {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
}
,
goog.labs.userAgent.platform.isLinux = function () {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
}
,
goog.labs.userAgent.platform.isWindows = function () {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
}
,
goog.labs.userAgent.platform.isChromeOS = function () {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
}
,
goog.labs.userAgent.platform.getVersion = function () {
    var e = goog.labs.userAgent.util.getUserAgent()
        , o = "";
    if (goog.labs.userAgent.platform.isWindows())
        o = (t = /Windows (?:NT|Phone) ([0-9.]+)/.exec(e)) ? t[1] : "0.0";
    else if (goog.labs.userAgent.platform.isIos()) {
        o = (t = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/.exec(e)) && t[1].replace(/_/g, ".")
    } else if (goog.labs.userAgent.platform.isMacintosh()) {
        o = (t = /Mac OS X ([0-9_.]+)/.exec(e)) ? t[1].replace(/_/g, ".") : "10"
    } else if (goog.labs.userAgent.platform.isAndroid()) {
        o = (t = /Android\s+([^\);]+)(\)|;)/.exec(e)) && t[1]
    } else if (goog.labs.userAgent.platform.isChromeOS()) {
        var t;
        o = (t = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/.exec(e)) && t[1]
    }
    return o || ""
}
,
goog.labs.userAgent.platform.isVersionOrHigher = function (e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), e)
}
,
goog.provide("goog.userAgent"),
goog.require("goog.labs.userAgent.browser"),
goog.require("goog.labs.userAgent.engine"),
goog.require("goog.labs.userAgent.platform"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.define("goog.userAgent.ASSUME_IE", !1),
goog.define("goog.userAgent.ASSUME_GECKO", !1),
goog.define("goog.userAgent.ASSUME_WEBKIT", !1),
goog.define("goog.userAgent.ASSUME_MOBILE_WEBKIT", !1),
goog.define("goog.userAgent.ASSUME_OPERA", !1),
goog.define("goog.userAgent.ASSUME_ANY_VERSION", !1),
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA,
goog.userAgent.getUserAgentString = function () {
    return goog.labs.userAgent.util.getUserAgent()
}
,
goog.userAgent.getNavigator = function () {
    return goog.global.navigator || null
}
,
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera(),
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE(),
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko(),
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit(),
goog.userAgent.isMobile_ = function () {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
}
,
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_(),
goog.userAgent.SAFARI = goog.userAgent.WEBKIT,
goog.userAgent.determinePlatform_ = function () {
    var e = goog.userAgent.getNavigator();
    return e && e.platform || ""
}
,
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_(),
goog.define("goog.userAgent.ASSUME_MAC", !1),
goog.define("goog.userAgent.ASSUME_WINDOWS", !1),
goog.define("goog.userAgent.ASSUME_LINUX", !1),
goog.define("goog.userAgent.ASSUME_X11", !1),
goog.define("goog.userAgent.ASSUME_ANDROID", !1),
goog.define("goog.userAgent.ASSUME_IPHONE", !1),
goog.define("goog.userAgent.ASSUME_IPAD", !1),
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD,
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh(),
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows(),
goog.userAgent.isLegacyLinux_ = function () {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
}
,
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_(),
goog.userAgent.isX11_ = function () {
    var e = goog.userAgent.getNavigator();
    return !!e && goog.string.contains(e.appVersion || "", "X11")
}
,
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_(),
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid(),
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone(),
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad(),
goog.userAgent.determineVersion_ = function () {
    if (goog.userAgent.OPERA && goog.global.opera) {
        var e = goog.global.opera.version;
        return goog.isFunction(e) ? e() : e
    }
    var o = ""
        , t = goog.userAgent.getVersionRegexResult_();
    if (t && (o = t ? t[1] : ""),
        goog.userAgent.IE && !goog.labs.userAgent.engine.isEdge()) {
        var r = goog.userAgent.getDocumentMode_();
        if (r > parseFloat(o))
            return String(r)
    }
    return o
}
,
goog.userAgent.getVersionRegexResult_ = function () {
    var e = goog.userAgent.getUserAgentString();
    return goog.userAgent.GECKO ? /rv\:([^\);]+)(\)|;)/.exec(e) : goog.userAgent.IE && goog.labs.userAgent.engine.isEdge() ? /Edge\/([\d\.]+)/.exec(e) : goog.userAgent.IE ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e) : goog.userAgent.WEBKIT ? /WebKit\/(\S+)/.exec(e) : void 0
}
,
goog.userAgent.getDocumentMode_ = function () {
    var e = goog.global.document;
    return e ? e.documentMode : void 0
}
,
goog.userAgent.VERSION = goog.userAgent.determineVersion_(),
goog.userAgent.compare = function (e, o) {
    return goog.string.compareVersions(e, o)
}
,
goog.userAgent.isVersionOrHigherCache_ = {},
goog.userAgent.isVersionOrHigher = function (e) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[e] || (goog.userAgent.isVersionOrHigherCache_[e] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, e))
}
,
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher,
goog.userAgent.isDocumentModeOrHigher = function (e) {
    return goog.userAgent.IE && (goog.labs.userAgent.engine.isEdge() || goog.userAgent.DOCUMENT_MODE >= e)
}
,
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher,
goog.userAgent.DOCUMENT_MODE = function () {
    var e = goog.global.document
        , o = goog.userAgent.getDocumentMode_();
    if (e && goog.userAgent.IE && (o || !goog.labs.userAgent.engine.isEdge()))
        return o || ("CSS1Compat" == e.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5)
}(),
goog.provide("goog.dom.BrowserFeature"),
goog.require("goog.userAgent"),
goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
},
goog.provide("goog.dom.TagName"),
goog.dom.TagName = {
    A: "A",
    ABBR: "ABBR",
    ACRONYM: "ACRONYM",
    ADDRESS: "ADDRESS",
    APPLET: "APPLET",
    AREA: "AREA",
    ARTICLE: "ARTICLE",
    ASIDE: "ASIDE",
    AUDIO: "AUDIO",
    B: "B",
    BASE: "BASE",
    BASEFONT: "BASEFONT",
    BDI: "BDI",
    BDO: "BDO",
    BIG: "BIG",
    BLOCKQUOTE: "BLOCKQUOTE",
    BODY: "BODY",
    BR: "BR",
    BUTTON: "BUTTON",
    CANVAS: "CANVAS",
    CAPTION: "CAPTION",
    CENTER: "CENTER",
    CITE: "CITE",
    CODE: "CODE",
    COL: "COL",
    COLGROUP: "COLGROUP",
    COMMAND: "COMMAND",
    DATA: "DATA",
    DATALIST: "DATALIST",
    DD: "DD",
    DEL: "DEL",
    DETAILS: "DETAILS",
    DFN: "DFN",
    DIALOG: "DIALOG",
    DIR: "DIR",
    DIV: "DIV",
    DL: "DL",
    DT: "DT",
    EM: "EM",
    EMBED: "EMBED",
    FIELDSET: "FIELDSET",
    FIGCAPTION: "FIGCAPTION",
    FIGURE: "FIGURE",
    FONT: "FONT",
    FOOTER: "FOOTER",
    FORM: "FORM",
    FRAME: "FRAME",
    FRAMESET: "FRAMESET",
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    HEAD: "HEAD",
    HEADER: "HEADER",
    HGROUP: "HGROUP",
    HR: "HR",
    HTML: "HTML",
    I: "I",
    IFRAME: "IFRAME",
    IMG: "IMG",
    INPUT: "INPUT",
    INS: "INS",
    ISINDEX: "ISINDEX",
    KBD: "KBD",
    KEYGEN: "KEYGEN",
    LABEL: "LABEL",
    LEGEND: "LEGEND",
    LI: "LI",
    LINK: "LINK",
    MAP: "MAP",
    MARK: "MARK",
    MATH: "MATH",
    MENU: "MENU",
    META: "META",
    METER: "METER",
    NAV: "NAV",
    NOFRAMES: "NOFRAMES",
    NOSCRIPT: "NOSCRIPT",
    OBJECT: "OBJECT",
    OL: "OL",
    OPTGROUP: "OPTGROUP",
    OPTION: "OPTION",
    OUTPUT: "OUTPUT",
    P: "P",
    PARAM: "PARAM",
    PRE: "PRE",
    PROGRESS: "PROGRESS",
    Q: "Q",
    RP: "RP",
    RT: "RT",
    RUBY: "RUBY",
    S: "S",
    SAMP: "SAMP",
    SCRIPT: "SCRIPT",
    SECTION: "SECTION",
    SELECT: "SELECT",
    SMALL: "SMALL",
    SOURCE: "SOURCE",
    SPAN: "SPAN",
    STRIKE: "STRIKE",
    STRONG: "STRONG",
    STYLE: "STYLE",
    SUB: "SUB",
    SUMMARY: "SUMMARY",
    SUP: "SUP",
    SVG: "SVG",
    TABLE: "TABLE",
    TBODY: "TBODY",
    TD: "TD",
    TEMPLATE: "TEMPLATE",
    TEXTAREA: "TEXTAREA",
    TFOOT: "TFOOT",
    TH: "TH",
    THEAD: "THEAD",
    TIME: "TIME",
    TITLE: "TITLE",
    TR: "TR",
    TRACK: "TRACK",
    TT: "TT",
    U: "U",
    UL: "UL",
    VAR: "VAR",
    VIDEO: "VIDEO",
    WBR: "WBR"
},
goog.provide("goog.dom.tags"),
goog.require("goog.object"),
goog.dom.tags.VOID_TAGS_ = goog.object.createSet("area,base,br,col,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr".split(",")),
goog.dom.tags.isVoidTag = function (e) {
    return !0 === goog.dom.tags.VOID_TAGS_[e]
}
,
goog.provide("goog.string.TypedString"),
goog.string.TypedString = function () { }
,
goog.string.TypedString.prototype.implementsGoogStringTypedString,
goog.string.TypedString.prototype.getTypedStringValue,
goog.provide("goog.string.Const"),
goog.require("goog.asserts"),
goog.require("goog.string.TypedString"),
goog.string.Const = function () {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "",
        this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
}
,
goog.string.Const.prototype.implementsGoogStringTypedString = !0,
goog.string.Const.prototype.getTypedStringValue = function () {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
}
,
goog.string.Const.prototype.toString = function () {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
}
,
goog.string.Const.unwrap = function (e) {
    return e instanceof goog.string.Const && e.constructor === goog.string.Const && e.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_ ? e.stringConstValueWithSecurityContract__googStringSecurityPrivate_ : (goog.asserts.fail("expected object of type Const, got '" + e + "'"),
        "type_error:Const")
}
,
goog.string.Const.from = function (e) {
    return goog.string.Const.create__googStringSecurityPrivate_(e)
}
,
goog.string.Const.TYPE_MARKER_ = {},
goog.string.Const.create__googStringSecurityPrivate_ = function (e) {
    var o = new goog.string.Const;
    return o.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = e,
        o
}
,
goog.provide("goog.html.SafeStyle"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.string"),
goog.require("goog.string.Const"),
goog.require("goog.string.TypedString"),
goog.html.SafeStyle = function () {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "",
        this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
,
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0,
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
goog.html.SafeStyle.fromConstant = function (e) {
    var o = goog.string.Const.unwrap(e);
    return 0 === o.length ? goog.html.SafeStyle.EMPTY : (goog.html.SafeStyle.checkStyle_(o),
        goog.asserts.assert(goog.string.endsWith(o, ";"), "Last character of style string is not ';': " + o),
        goog.asserts.assert(goog.string.contains(o, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + o),
        goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o))
}
,
goog.html.SafeStyle.checkStyle_ = function (e) {
    goog.asserts.assert(!/[<>]/.test(e), "Forbidden characters in style string: " + e)
}
,
goog.html.SafeStyle.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
}
,
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function () {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
}
),
goog.html.SafeStyle.unwrap = function (e) {
    return e instanceof goog.html.SafeStyle && e.constructor === goog.html.SafeStyle && e.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeStyleWrappedValue_ : (goog.asserts.fail("expected object of type SafeStyle, got '" + e + "'"),
        "type_error:SafeStyle")
}
,
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function (e) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(e)
}
,
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (e) {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = e,
        this
}
,
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(""),
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez",
goog.html.SafeStyle.PropertyMap,
goog.html.SafeStyle.create = function (e) {
    var o = "";
    for (var t in e) {
        if (!/^[-_a-zA-Z0-9]+$/.test(t))
            throw Error("Name allows only [-_a-zA-Z0-9], got: " + t);
        var r = e[t];
        null != r && (r instanceof goog.string.Const ? (r = goog.string.Const.unwrap(r),
            goog.asserts.assert(!/[{;}]/.test(r), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(r) ? goog.html.SafeStyle.hasBalancedQuotes_(r) || (goog.asserts.fail("String value requires balanced quotes, got: " + r),
                r = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], got: " + r),
                    r = goog.html.SafeStyle.INNOCUOUS_STRING),
            o += t + ":" + r + ";")
    }
    return o ? (goog.html.SafeStyle.checkStyle_(o),
        goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o)) : goog.html.SafeStyle.EMPTY
}
,
goog.html.SafeStyle.hasBalancedQuotes_ = function (e) {
    for (var o = !0, t = !0, r = 0; r < e.length; r++) {
        var g = e.charAt(r);
        "'" == g && t ? o = !o : '"' == g && o && (t = !t)
    }
    return o && t
}
,
goog.html.SafeStyle.VALUE_RE_ = /^[-,."'%_!# a-zA-Z0-9]+$/,
goog.html.SafeStyle.concat = function (e) {
    var o = ""
        , t = function (e) {
            goog.isArray(e) ? goog.array.forEach(e, t) : o += goog.html.SafeStyle.unwrap(e)
        };
    return goog.array.forEach(arguments, t),
        o ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o) : goog.html.SafeStyle.EMPTY
}
,
goog.provide("goog.html.SafeStyleSheet"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.string"),
goog.require("goog.string.Const"),
goog.require("goog.string.TypedString"),
goog.html.SafeStyleSheet = function () {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "",
        this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
,
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0,
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
goog.html.SafeStyleSheet.concat = function (e) {
    var o = ""
        , t = function (e) {
            goog.isArray(e) ? goog.array.forEach(e, t) : o += goog.html.SafeStyleSheet.unwrap(e)
        };
    return goog.array.forEach(arguments, t),
        goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.SafeStyleSheet.fromConstant = function (e) {
    var o = goog.string.Const.unwrap(e);
    return 0 === o.length ? goog.html.SafeStyleSheet.EMPTY : (goog.asserts.assert(!goog.string.contains(o, "<"), "Forbidden '<' character in style sheet string: " + o),
        goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o))
}
,
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
}
,
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function () {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
}
),
goog.html.SafeStyleSheet.unwrap = function (e) {
    return e instanceof goog.html.SafeStyleSheet && e.constructor === goog.html.SafeStyleSheet && e.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ : (goog.asserts.fail("expected object of type SafeStyleSheet, got '" + e + "'"),
        "type_error:SafeStyleSheet")
}
,
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function (e) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(e)
}
,
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (e) {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = e,
        this
}
,
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(""),
goog.provide("goog.fs.url"),
goog.fs.url.createObjectUrl = function (e) {
    return goog.fs.url.getUrlObject_().createObjectURL(e)
}
,
goog.fs.url.revokeObjectUrl = function (e) {
    goog.fs.url.getUrlObject_().revokeObjectURL(e)
}
,
goog.fs.url.UrlObject_,
goog.fs.url.getUrlObject_ = function () {
    var e = goog.fs.url.findUrlObject_();
    if (null != e)
        return e;
    throw Error("This browser doesn't seem to support blob URLs")
}
,
goog.fs.url.findUrlObject_ = function () {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
}
,
goog.fs.url.browserSupportsObjectUrls = function () {
    return null != goog.fs.url.findUrlObject_()
}
,
goog.provide("goog.i18n.bidi"),
goog.provide("goog.i18n.bidi.Dir"),
goog.provide("goog.i18n.bidi.DirectionalString"),
goog.provide("goog.i18n.bidi.Format"),
goog.define("goog.i18n.bidi.FORCE_RTL", !1),
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)),
goog.i18n.bidi.Format = {
    LRE: "‪",
    RLE: "‫",
    PDF: "‬",
    LRM: "‎",
    RLM: "‏"
},
goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
},
goog.i18n.bidi.RIGHT = "right",
goog.i18n.bidi.LEFT = "left",
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT,
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT,
goog.i18n.bidi.toDir = function (e, o) {
    return "number" == typeof e ? 0 < e ? goog.i18n.bidi.Dir.LTR : e < 0 ? goog.i18n.bidi.Dir.RTL : o ? null : goog.i18n.bidi.Dir.NEUTRAL : null == e ? null : e ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}
,
goog.i18n.bidi.ltrChars_ = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿",
goog.i18n.bidi.rtlChars_ = "֑-ۯۺ-߿‏יִ-﷿ﹰ-ﻼ",
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g,
goog.i18n.bidi.stripHtmlIfNeeded_ = function (e, o) {
    return o ? e.replace(goog.i18n.bidi.htmlSkipReg_, "") : e
}
,
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]"),
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]"),
goog.i18n.bidi.hasAnyRtl = function (e, o) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}
,
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl,
goog.i18n.bidi.hasAnyLtr = function (e, o) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}
,
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]"),
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]"),
goog.i18n.bidi.isRtlChar = function (e) {
    return goog.i18n.bidi.rtlRe_.test(e)
}
,
goog.i18n.bidi.isLtrChar = function (e) {
    return goog.i18n.bidi.ltrRe_.test(e)
}
,
goog.i18n.bidi.isNeutralChar = function (e) {
    return !goog.i18n.bidi.isLtrChar(e) && !goog.i18n.bidi.isRtlChar(e)
}
,
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]"),
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]"),
goog.i18n.bidi.startsWithRtl = function (e, o) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}
,
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl,
goog.i18n.bidi.startsWithLtr = function (e, o) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}
,
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr,
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/,
goog.i18n.bidi.isNeutralText = function (e, o) {
    return e = goog.i18n.bidi.stripHtmlIfNeeded_(e, o),
        goog.i18n.bidi.isRequiredLtrRe_.test(e) || !goog.i18n.bidi.hasAnyLtr(e) && !goog.i18n.bidi.hasAnyRtl(e)
}
,
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$"),
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$"),
goog.i18n.bidi.endsWithLtr = function (e, o) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}
,
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr,
goog.i18n.bidi.endsWithRtl = function (e, o) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}
,
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl,
goog.i18n.bidi.rtlLocalesRe_ = new RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)", "i"),
goog.i18n.bidi.isRtlLanguage = function (e) {
    return goog.i18n.bidi.rtlLocalesRe_.test(e)
}
,
goog.i18n.bidi.bracketGuardHtmlRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g,
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g,
goog.i18n.bidi.guardBracketInHtml = function (e, o) {
    return (void 0 === o ? goog.i18n.bidi.hasAnyRtl(e) : o) ? e.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=rtl>$&</span>") : e.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=ltr>$&</span>")
}
,
goog.i18n.bidi.guardBracketInText = function (e, o) {
    var t = (void 0 === o ? goog.i18n.bidi.hasAnyRtl(e) : o) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return e.replace(goog.i18n.bidi.bracketGuardTextRe_, t + "$&" + t)
}
,
goog.i18n.bidi.enforceRtlInHtml = function (e) {
    return "<" == e.charAt(0) ? e.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + e + "</span>"
}
,
goog.i18n.bidi.enforceRtlInText = function (e) {
    return goog.i18n.bidi.Format.RLE + e + goog.i18n.bidi.Format.PDF
}
,
goog.i18n.bidi.enforceLtrInHtml = function (e) {
    return "<" == e.charAt(0) ? e.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + e + "</span>"
}
,
goog.i18n.bidi.enforceLtrInText = function (e) {
    return goog.i18n.bidi.Format.LRE + e + goog.i18n.bidi.Format.PDF
}
,
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g,
goog.i18n.bidi.leftRe_ = /left/gi,
goog.i18n.bidi.rightRe_ = /right/gi,
goog.i18n.bidi.tempRe_ = /%%%%/g,
goog.i18n.bidi.mirrorCSS = function (e) {
    return e.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
}
,
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g,
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g,
goog.i18n.bidi.normalizeHebrewQuote = function (e) {
    return e.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1״").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1׳")
}
,
goog.i18n.bidi.wordSeparatorRe_ = /\s+/,
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/,
goog.i18n.bidi.rtlDetectionThreshold_ = .4,
goog.i18n.bidi.estimateDirection = function (e, o) {
    for (var t = 0, r = 0, g = !1, n = goog.i18n.bidi.stripHtmlIfNeeded_(e, o).split(goog.i18n.bidi.wordSeparatorRe_), i = 0; i < n.length; i++) {
        var a = n[i];
        goog.i18n.bidi.startsWithRtl(a) ? (t++,
            r++) : goog.i18n.bidi.isRequiredLtrRe_.test(a) ? g = !0 : goog.i18n.bidi.hasAnyLtr(a) ? r++ : goog.i18n.bidi.hasNumeralsRe_.test(a) && (g = !0)
    }
    return 0 == r ? g ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : t / r > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}
,
goog.i18n.bidi.detectRtlDirectionality = function (e, o) {
    return goog.i18n.bidi.estimateDirection(e, o) == goog.i18n.bidi.Dir.RTL
}
,
goog.i18n.bidi.setElementDirAndAlign = function (e, o) {
    e && (o = goog.i18n.bidi.toDir(o)) && (e.style.textAlign = o == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT,
        e.dir = o == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
}
,
goog.i18n.bidi.setElementDirByTextDirectionality = function (e, o) {
    switch (goog.i18n.bidi.estimateDirection(o)) {
        case goog.i18n.bidi.Dir.LTR:
            e.dir = "ltr";
            break;
        case goog.i18n.bidi.Dir.RTL:
            e.dir = "rtl";
            break;
        default:
            e.removeAttribute("dir")
    }
}
,
goog.i18n.bidi.DirectionalString = function () { }
,
goog.i18n.bidi.DirectionalString.prototype.implementsGoogI18nBidiDirectionalString,
goog.i18n.bidi.DirectionalString.prototype.getDirection,
goog.provide("goog.html.SafeUrl"),
goog.require("goog.asserts"),
goog.require("goog.fs.url"),
goog.require("goog.i18n.bidi.Dir"),
goog.require("goog.i18n.bidi.DirectionalString"),
goog.require("goog.string.Const"),
goog.require("goog.string.TypedString"),
goog.html.SafeUrl = function () {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "",
        this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
,
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez",
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0,
goog.html.SafeUrl.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}
,
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0,
goog.html.SafeUrl.prototype.getDirection = function () {
    return goog.i18n.bidi.Dir.LTR
}
,
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function () {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}
),
goog.html.SafeUrl.unwrap = function (e) {
    return e instanceof goog.html.SafeUrl && e.constructor === goog.html.SafeUrl && e.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (goog.asserts.fail("expected object of type SafeUrl, got '" + e + "'"),
        "type_error:SafeUrl")
}
,
goog.html.SafeUrl.fromConstant = function (e) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(e))
}
,
goog.html.SAFE_BLOB_TYPE_PATTERN_ = /^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)$/i,
goog.html.SafeUrl.fromBlob = function (e) {
    var o = goog.html.SAFE_BLOB_TYPE_PATTERN_.test(e.type) ? goog.fs.url.createObjectUrl(e) : goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,
goog.html.SafeUrl.sanitize = function (e) {
    return e instanceof goog.html.SafeUrl ? e : (e = e.implementsGoogStringTypedString ? e.getTypedStringValue() : String(e),
        e = goog.html.SAFE_URL_PATTERN_.test(e) ? goog.html.SafeUrl.normalize_(e) : goog.html.SafeUrl.INNOCUOUS_STRING,
        goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e))
}
,
goog.html.SafeUrl.normalize_ = function (e) {
    try {
        var o = encodeURI(e)
    } catch (e) {
        return goog.html.SafeUrl.INNOCUOUS_STRING
    }
    return o.replace(goog.html.SafeUrl.NORMALIZE_MATCHER_, function (e) {
        return goog.html.SafeUrl.NORMALIZE_REPLACER_MAP_[e]
    })
}
,
goog.html.SafeUrl.NORMALIZE_MATCHER_ = /[()']|%5B|%5D|%25/g,
goog.html.SafeUrl.NORMALIZE_REPLACER_MAP_ = {
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "%5B": "[",
    "%5D": "]",
    "%25": "%"
},
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function (e) {
    var o = new goog.html.SafeUrl;
    return o.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = e,
        o
}
,
goog.provide("goog.html.TrustedResourceUrl"),
goog.require("goog.asserts"),
goog.require("goog.i18n.bidi.Dir"),
goog.require("goog.i18n.bidi.DirectionalString"),
goog.require("goog.string.Const"),
goog.require("goog.string.TypedString"),
goog.html.TrustedResourceUrl = function () {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "",
        this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
,
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0,
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
}
,
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0,
goog.html.TrustedResourceUrl.prototype.getDirection = function () {
    return goog.i18n.bidi.Dir.LTR
}
,
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function () {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
}
),
goog.html.TrustedResourceUrl.unwrap = function (e) {
    return e instanceof goog.html.TrustedResourceUrl && e.constructor === goog.html.TrustedResourceUrl && e.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ : (goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + e + "'"),
        "type_error:TrustedResourceUrl")
}
,
goog.html.TrustedResourceUrl.fromConstant = function (e) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(e))
}
,
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function (e) {
    var o = new goog.html.TrustedResourceUrl;
    return o.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = e,
        o
}
,
goog.provide("goog.html.SafeHtml"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.dom.TagName"),
goog.require("goog.dom.tags"),
goog.require("goog.html.SafeStyle"),
goog.require("goog.html.SafeStyleSheet"),
goog.require("goog.html.SafeUrl"),
goog.require("goog.html.TrustedResourceUrl"),
goog.require("goog.i18n.bidi.Dir"),
goog.require("goog.i18n.bidi.DirectionalString"),
goog.require("goog.object"),
goog.require("goog.string"),
goog.require("goog.string.Const"),
goog.require("goog.string.TypedString"),
goog.html.SafeHtml = function () {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "",
        this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_,
        this.dir_ = null
}
,
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0,
goog.html.SafeHtml.prototype.getDirection = function () {
    return this.dir_
}
,
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0,
goog.html.SafeHtml.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}
,
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function () {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}
),
goog.html.SafeHtml.unwrap = function (e) {
    return e instanceof goog.html.SafeHtml && e.constructor === goog.html.SafeHtml && e.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (goog.asserts.fail("expected object of type SafeHtml, got '" + e + "'"),
        "type_error:SafeHtml")
}
,
goog.html.SafeHtml.TextOrHtml_,
goog.html.SafeHtml.htmlEscape = function (e) {
    if (e instanceof goog.html.SafeHtml)
        return e;
    var o, t = null;
    return e.implementsGoogI18nBidiDirectionalString && (t = e.getDirection()),
        o = e.implementsGoogStringTypedString ? e.getTypedStringValue() : String(e),
        goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(o), t)
}
,
goog.html.SafeHtml.htmlEscapePreservingNewlines = function (e) {
    if (e instanceof goog.html.SafeHtml)
        return e;
    var o = goog.html.SafeHtml.htmlEscape(e);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(o)), o.getDirection())
}
,
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function (e) {
    if (e instanceof goog.html.SafeHtml)
        return e;
    var o = goog.html.SafeHtml.htmlEscape(e);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(o)), o.getDirection())
}
,
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape,
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/,
goog.html.SafeHtml.URL_ATTRIBUTES_ = goog.object.createSet("action", "cite", "data", "formaction", "href", "manifest", "poster", "src"),
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.TEMPLATE),
goog.html.SafeHtml.AttributeValue_,
goog.html.SafeHtml.create = function (e, o, t) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(e))
        throw Error("Invalid tag name <" + e + ">.");
    if (e.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)
        throw Error("Tag name <" + e + "> is not allowed for SafeHtml.");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(e, o, t)
}
,
goog.html.SafeHtml.createIframe = function (e, o, t, r) {
    var g = {};
    g.src = e || null,
        g.srcdoc = o || null;
    var n = goog.html.SafeHtml.combineAttributes(g, {
        sandbox: ""
    }, t);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", n, r)
}
,
goog.html.SafeHtml.createStyle = function (e, o) {
    var t = goog.html.SafeHtml.combineAttributes({
        type: "text/css"
    }, {}, o)
        , r = "";
    e = goog.array.concat(e);
    for (var g = 0; g < e.length; g++)
        r += goog.html.SafeStyleSheet.unwrap(e[g]);
    var n = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(r, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", t, n)
}
,
goog.html.SafeHtml.getAttrNameAndValue_ = function (e, o, t) {
    if (t instanceof goog.string.Const)
        t = goog.string.Const.unwrap(t);
    else if ("style" == o.toLowerCase())
        t = goog.html.SafeHtml.getStyleValue_(t);
    else {
        if (/^on/i.test(o))
            throw Error('Attribute "' + o + '" requires goog.string.Const value, "' + t + '" given.');
        if (o.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (t instanceof goog.html.TrustedResourceUrl)
                t = goog.html.TrustedResourceUrl.unwrap(t);
            else {
                if (!(t instanceof goog.html.SafeUrl))
                    throw Error('Attribute "' + o + '" on tag "' + e + '" requires goog.html.SafeUrl or goog.string.Const value, "' + t + '" given.');
                t = goog.html.SafeUrl.unwrap(t)
            }
    }
    return t.implementsGoogStringTypedString && (t = t.getTypedStringValue()),
        goog.asserts.assert(goog.isString(t) || goog.isNumber(t), "String or number value expected, got " + typeof t + " with value: " + t),
        o + '="' + goog.string.htmlEscape(String(t)) + '"'
}
,
goog.html.SafeHtml.getStyleValue_ = function (e) {
    if (!goog.isObject(e))
        throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof e + " given: " + e);
    return e instanceof goog.html.SafeStyle || (e = goog.html.SafeStyle.create(e)),
        goog.html.SafeStyle.unwrap(e)
}
,
goog.html.SafeHtml.createWithDir = function (e, o, t, r) {
    var g = goog.html.SafeHtml.create(o, t, r);
    return g.dir_ = e,
        g
}
,
goog.html.SafeHtml.concat = function (e) {
    var r = goog.i18n.bidi.Dir.NEUTRAL
        , g = ""
        , n = function (e) {
            if (goog.isArray(e))
                goog.array.forEach(e, n);
            else {
                var o = goog.html.SafeHtml.htmlEscape(e);
                g += goog.html.SafeHtml.unwrap(o);
                var t = o.getDirection();
                r == goog.i18n.bidi.Dir.NEUTRAL ? r = t : t != goog.i18n.bidi.Dir.NEUTRAL && r != t && (r = null)
            }
        };
    return goog.array.forEach(arguments, n),
        goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(g, r)
}
,
goog.html.SafeHtml.concatWithDir = function (e, o) {
    var t = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    return t.dir_ = e,
        t
}
,
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function (e, o) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(e, o)
}
,
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (e, o) {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = e,
        this.dir_ = o,
        this
}
,
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function (e, o, t) {
    var r = null
        , g = "<" + e;
    if (o)
        for (var n in o) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(n))
                throw Error('Invalid attribute name "' + n + '".');
            var i = o[n];
            goog.isDefAndNotNull(i) && (g += " " + goog.html.SafeHtml.getAttrNameAndValue_(e, n, i))
        }
    var a = t;
    if (goog.isDefAndNotNull(a) ? goog.isArray(a) || (a = [a]) : a = [],
        goog.dom.tags.isVoidTag(e.toLowerCase()))
        goog.asserts.assert(!a.length, "Void tag <" + e + "> does not allow content."),
            g += ">";
    else {
        var s = goog.html.SafeHtml.concat(a);
        g += ">" + goog.html.SafeHtml.unwrap(s) + "</" + e + ">",
            r = s.getDirection()
    }
    var l = o && o.dir;
    return l && (r = /^(ltr|rtl|auto)$/i.test(l) ? goog.i18n.bidi.Dir.NEUTRAL : null),
        goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(g, r)
}
,
goog.html.SafeHtml.combineAttributes = function (e, o, t) {
    var r, g = {};
    for (r in e)
        goog.asserts.assert(r.toLowerCase() == r, "Must be lower case"),
            g[r] = e[r];
    for (r in o)
        goog.asserts.assert(r.toLowerCase() == r, "Must be lower case"),
            g[r] = o[r];
    for (r in t) {
        var n = r.toLowerCase();
        if (n in e)
            throw Error('Cannot override "' + n + '" attribute, got "' + r + '" with value "' + t[r] + '"');
        n in o && delete g[n],
            g[r] = t[r]
    }
    return g
}
,
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL),
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL),
goog.provide("goog.dom.safe"),
goog.provide("goog.dom.safe.InsertAdjacentHtmlPosition"),
goog.require("goog.asserts"),
goog.require("goog.html.SafeHtml"),
goog.require("goog.html.SafeUrl"),
goog.require("goog.html.TrustedResourceUrl"),
goog.require("goog.string"),
goog.require("goog.string.Const"),
goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
},
goog.dom.safe.insertAdjacentHtml = function (e, o, t) {
    e.insertAdjacentHTML(o, goog.html.SafeHtml.unwrap(t))
}
,
goog.dom.safe.setInnerHtml = function (e, o) {
    e.innerHTML = goog.html.SafeHtml.unwrap(o)
}
,
goog.dom.safe.setOuterHtml = function (e, o) {
    e.outerHTML = goog.html.SafeHtml.unwrap(o)
}
,
goog.dom.safe.documentWrite = function (e, o) {
    e.write(goog.html.SafeHtml.unwrap(o))
}
,
goog.dom.safe.setAnchorHref = function (e, o) {
    var t;
    t = o instanceof goog.html.SafeUrl ? o : goog.html.SafeUrl.sanitize(o),
        e.href = goog.html.SafeUrl.unwrap(t)
}
,
goog.dom.safe.setEmbedSrc = function (e, o) {
    e.src = goog.html.TrustedResourceUrl.unwrap(o)
}
,
goog.dom.safe.setFrameSrc = function (e, o) {
    e.src = goog.html.TrustedResourceUrl.unwrap(o)
}
,
goog.dom.safe.setIframeSrc = function (e, o) {
    e.src = goog.html.TrustedResourceUrl.unwrap(o)
}
,
goog.dom.safe.setLinkHrefAndRel = function (e, o, t) {
    e.rel = t,
        goog.string.caseInsensitiveContains(t, "stylesheet") ? (goog.asserts.assert(o instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'),
            e.href = goog.html.TrustedResourceUrl.unwrap(o)) : o instanceof goog.html.TrustedResourceUrl ? e.href = goog.html.TrustedResourceUrl.unwrap(o) : o instanceof goog.html.SafeUrl ? e.href = goog.html.SafeUrl.unwrap(o) : e.href = goog.html.SafeUrl.sanitize(o).getTypedStringValue()
}
,
goog.dom.safe.setObjectData = function (e, o) {
    e.data = goog.html.TrustedResourceUrl.unwrap(o)
}
,
goog.dom.safe.setScriptSrc = function (e, o) {
    e.src = goog.html.TrustedResourceUrl.unwrap(o)
}
,
goog.dom.safe.setLocationHref = function (e, o) {
    var t;
    t = o instanceof goog.html.SafeUrl ? o : goog.html.SafeUrl.sanitize(o),
        e.href = goog.html.SafeUrl.unwrap(t)
}
,
goog.dom.safe.openInWindow = function (e, o, t, r, g) {
    var n;
    return n = e instanceof goog.html.SafeUrl ? e : goog.html.SafeUrl.sanitize(e),
        (o || window).open(goog.html.SafeUrl.unwrap(n), t ? goog.string.Const.unwrap(t) : "", r, g)
}
,
goog.provide("goog.math"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.math.randomInt = function (e) {
    return Math.floor(Math.random() * e)
}
,
goog.math.uniformRandom = function (e, o) {
    return e + Math.random() * (o - e)
}
,
goog.math.clamp = function (e, o, t) {
    return Math.min(Math.max(e, o), t)
}
,
goog.math.modulo = function (e, o) {
    var t = e % o;
    return t * o < 0 ? t + o : t
}
,
goog.math.lerp = function (e, o, t) {
    return e + t * (o - e)
}
,
goog.math.nearlyEquals = function (e, o, t) {
    return Math.abs(e - o) <= (t || 1e-6)
}
,
goog.math.standardAngle = function (e) {
    return goog.math.modulo(e, 360)
}
,
goog.math.standardAngleInRadians = function (e) {
    return goog.math.modulo(e, 2 * Math.PI)
}
,
goog.math.toRadians = function (e) {
    return e * Math.PI / 180
}
,
goog.math.toDegrees = function (e) {
    return 180 * e / Math.PI
}
,
goog.math.angleDx = function (e, o) {
    return o * Math.cos(goog.math.toRadians(e))
}
,
goog.math.angleDy = function (e, o) {
    return o * Math.sin(goog.math.toRadians(e))
}
,
goog.math.angle = function (e, o, t, r) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(r - o, t - e)))
}
,
goog.math.angleDifference = function (e, o) {
    var t = goog.math.standardAngle(o) - goog.math.standardAngle(e);
    return 180 < t ? t -= 360 : t <= -180 && (t = 360 + t),
        t
}
,
goog.math.sign = Math.sign || function (e) {
    return 0 < e ? 1 : e < 0 ? -1 : e
}
,
goog.math.longestCommonSubsequence = function (t, e, o, r) {
    for (var g = o || function (e, o) {
        return e == o
    }
        , n = r || function (e, o) {
            return t[e]
        }
        , i = t.length, a = e.length, s = [], l = 0; l < i + 1; l++)
        s[l] = [],
            s[l][0] = 0;
    for (var u = 0; u < a + 1; u++)
        s[0][u] = 0;
    for (l = 1; l <= i; l++)
        for (u = 1; u <= a; u++)
            g(t[l - 1], e[u - 1]) ? s[l][u] = s[l - 1][u - 1] + 1 : s[l][u] = Math.max(s[l - 1][u], s[l][u - 1]);
    var c = [];
    for (l = i,
        u = a; 0 < l && 0 < u;)
        g(t[l - 1], e[u - 1]) ? (c.unshift(n(l - 1, u - 1)),
            l--,
            u--) : s[l - 1][u] > s[l][u - 1] ? l-- : u--;
    return c
}
,
goog.math.sum = function (e) {
    return goog.array.reduce(arguments, function (e, o) {
        return e + o
    }, 0)
}
,
goog.math.average = function (e) {
    return goog.math.sum.apply(null, arguments) / arguments.length
}
,
goog.math.sampleVariance = function (e) {
    var o = arguments.length;
    if (o < 2)
        return 0;
    var t = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function (e) {
        return Math.pow(e - t, 2)
    })) / (o - 1)
}
,
goog.math.standardDeviation = function (e) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
}
,
goog.math.isInt = function (e) {
    return isFinite(e) && e % 1 == 0
}
,
goog.math.isFiniteNumber = function (e) {
    return isFinite(e) && !isNaN(e)
}
,
goog.math.isNegativeZero = function (e) {
    return 0 == e && 1 / e < 0
}
,
goog.math.log10Floor = function (e) {
    if (0 < e) {
        var o = Math.round(Math.log(e) * Math.LOG10E);
        return o - (parseFloat("1e" + o) > e)
    }
    return 0 == e ? -1 / 0 : NaN
}
,
goog.math.safeFloor = function (e, o) {
    return goog.asserts.assert(!goog.isDef(o) || 0 < o),
        Math.floor(e + (o || 2e-15))
}
,
goog.math.safeCeil = function (e, o) {
    return goog.asserts.assert(!goog.isDef(o) || 0 < o),
        Math.ceil(e - (o || 2e-15))
}
,
goog.provide("goog.math.Coordinate"),
goog.require("goog.math"),
goog.math.Coordinate = function (e, o) {
    this.x = goog.isDef(e) ? e : 0,
        this.y = goog.isDef(o) ? o : 0
}
,
goog.math.Coordinate.prototype.clone = function () {
    return new goog.math.Coordinate(this.x, this.y)
}
,
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")"
}
),
goog.math.Coordinate.equals = function (e, o) {
    return e == o || !(!e || !o) && (e.x == o.x && e.y == o.y)
}
,
goog.math.Coordinate.distance = function (e, o) {
    var t = e.x - o.x
        , r = e.y - o.y;
    return Math.sqrt(t * t + r * r)
}
,
goog.math.Coordinate.magnitude = function (e) {
    return Math.sqrt(e.x * e.x + e.y * e.y)
}
,
goog.math.Coordinate.azimuth = function (e) {
    return goog.math.angle(0, 0, e.x, e.y)
}
,
goog.math.Coordinate.squaredDistance = function (e, o) {
    var t = e.x - o.x
        , r = e.y - o.y;
    return t * t + r * r
}
,
goog.math.Coordinate.difference = function (e, o) {
    return new goog.math.Coordinate(e.x - o.x, e.y - o.y)
}
,
goog.math.Coordinate.sum = function (e, o) {
    return new goog.math.Coordinate(e.x + o.x, e.y + o.y)
}
,
goog.math.Coordinate.prototype.ceil = function () {
    return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this
}
,
goog.math.Coordinate.prototype.floor = function () {
    return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this
}
,
goog.math.Coordinate.prototype.round = function () {
    return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this
}
,
goog.math.Coordinate.prototype.translate = function (e, o) {
    return e instanceof goog.math.Coordinate ? (this.x += e.x,
        this.y += e.y) : (this.x += e,
            goog.isNumber(o) && (this.y += o)),
        this
}
,
goog.math.Coordinate.prototype.scale = function (e, o) {
    var t = goog.isNumber(o) ? o : e;
    return this.x *= e,
        this.y *= t,
        this
}
,
goog.math.Coordinate.prototype.rotateRadians = function (e, o) {
    var t = o || new goog.math.Coordinate(0, 0)
        , r = this.x
        , g = this.y
        , n = Math.cos(e)
        , i = Math.sin(e);
    this.x = (r - t.x) * n - (g - t.y) * i + t.x,
        this.y = (r - t.x) * i + (g - t.y) * n + t.y
}
,
goog.math.Coordinate.prototype.rotateDegrees = function (e, o) {
    this.rotateRadians(goog.math.toRadians(e), o)
}
,
goog.provide("goog.math.Size"),
goog.math.Size = function (e, o) {
    this.width = e,
        this.height = o
}
,
goog.math.Size.equals = function (e, o) {
    return e == o || !(!e || !o) && (e.width == o.width && e.height == o.height)
}
,
goog.math.Size.prototype.clone = function () {
    return new goog.math.Size(this.width, this.height)
}
,
goog.DEBUG && (goog.math.Size.prototype.toString = function () {
    return "(" + this.width + " x " + this.height + ")"
}
),
goog.math.Size.prototype.getLongest = function () {
    return Math.max(this.width, this.height)
}
,
goog.math.Size.prototype.getShortest = function () {
    return Math.min(this.width, this.height)
}
,
goog.math.Size.prototype.area = function () {
    return this.width * this.height
}
,
goog.math.Size.prototype.perimeter = function () {
    return 2 * (this.width + this.height)
}
,
goog.math.Size.prototype.aspectRatio = function () {
    return this.width / this.height
}
,
goog.math.Size.prototype.isEmpty = function () {
    return !this.area()
}
,
goog.math.Size.prototype.ceil = function () {
    return this.width = Math.ceil(this.width),
        this.height = Math.ceil(this.height),
        this
}
,
goog.math.Size.prototype.fitsInside = function (e) {
    return this.width <= e.width && this.height <= e.height
}
,
goog.math.Size.prototype.floor = function () {
    return this.width = Math.floor(this.width),
        this.height = Math.floor(this.height),
        this
}
,
goog.math.Size.prototype.round = function () {
    return this.width = Math.round(this.width),
        this.height = Math.round(this.height),
        this
}
,
goog.math.Size.prototype.scale = function (e, o) {
    var t = goog.isNumber(o) ? o : e;
    return this.width *= e,
        this.height *= t,
        this
}
,
goog.math.Size.prototype.scaleToCover = function (e) {
    var o = this.aspectRatio() <= e.aspectRatio() ? e.width / this.width : e.height / this.height;
    return this.scale(o)
}
,
goog.math.Size.prototype.scaleToFit = function (e) {
    var o = this.aspectRatio() > e.aspectRatio() ? e.width / this.width : e.height / this.height;
    return this.scale(o)
}
,
goog.provide("goog.dom"),
goog.provide("goog.dom.Appendable"),
goog.provide("goog.dom.DomHelper"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.dom.BrowserFeature"),
goog.require("goog.dom.NodeType"),
goog.require("goog.dom.TagName"),
goog.require("goog.dom.safe"),
goog.require("goog.html.SafeHtml"),
goog.require("goog.math.Coordinate"),
goog.require("goog.math.Size"),
goog.require("goog.object"),
goog.require("goog.string"),
goog.require("goog.string.Unicode"),
goog.require("goog.userAgent"),
goog.define("goog.dom.ASSUME_QUIRKS_MODE", !1),
goog.define("goog.dom.ASSUME_STANDARDS_MODE", !1),
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE,
goog.dom.getDomHelper = function (e) {
    return e ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(e)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
}
,
goog.dom.defaultDomHelper_,
goog.dom.getDocument = function () {
    return document
}
,
goog.dom.getElement = function (e) {
    return goog.dom.getElementHelper_(document, e)
}
,
goog.dom.getElementHelper_ = function (e, o) {
    return goog.isString(o) ? e.getElementById(o) : o
}
,
goog.dom.getRequiredElement = function (e) {
    return goog.dom.getRequiredElementHelper_(document, e)
}
,
goog.dom.getRequiredElementHelper_ = function (e, o) {
    goog.asserts.assertString(o);
    var t = goog.dom.getElementHelper_(e, o);
    return t = goog.asserts.assertElement(t, "No element found with id: " + o)
}
,
goog.dom.$ = goog.dom.getElement,
goog.dom.getElementsByTagNameAndClass = function (e, o, t) {
    return goog.dom.getElementsByTagNameAndClass_(document, e, o, t)
}
,
goog.dom.getElementsByClass = function (e, o) {
    var t = o || document;
    return goog.dom.canUseQuerySelector_(t) ? t.querySelectorAll("." + e) : goog.dom.getElementsByTagNameAndClass_(document, "*", e, o)
}
,
goog.dom.getElementByClass = function (e, o) {
    var t = o || document;
    return (t.getElementsByClassName ? t.getElementsByClassName(e)[0] : goog.dom.canUseQuerySelector_(t) ? t.querySelector("." + e) : goog.dom.getElementsByTagNameAndClass_(document, "*", e, o)[0]) || null
}
,
goog.dom.getRequiredElementByClass = function (e, o) {
    var t = goog.dom.getElementByClass(e, o);
    return goog.asserts.assert(t, "No element found with className: " + e)
}
,
goog.dom.canUseQuerySelector_ = function (e) {
    return !(!e.querySelectorAll || !e.querySelector)
}
,
goog.dom.getElementsByTagNameAndClass_ = function (e, o, t, r) {
    var g = r || e
        , n = o && "*" != o ? o.toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(g) && (n || t)) {
        var i = n + (t ? "." + t : "");
        return g.querySelectorAll(i)
    }
    if (t && g.getElementsByClassName) {
        var a = g.getElementsByClassName(t);
        if (n) {
            for (var s = {}, l = 0, u = 0; c = a[u]; u++)
                n == c.nodeName && (s[l++] = c);
            return s.length = l,
                s
        }
        return a
    }
    a = g.getElementsByTagName(n || "*");
    if (t) {
        var c;
        for (s = {},
            l = 0,
            u = 0; c = a[u]; u++) {
            var d = c.className;
            "function" == typeof d.split && goog.array.contains(d.split(/\s+/), t) && (s[l++] = c)
        }
        return s.length = l,
            s
    }
    return a
}
,
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass,
goog.dom.setProperties = function (t, e) {
    goog.object.forEach(e, function (e, o) {
        "style" == o ? t.style.cssText = e : "class" == o ? t.className = e : "for" == o ? t.htmlFor = e : o in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? t.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[o], e) : goog.string.startsWith(o, "aria-") || goog.string.startsWith(o, "data-") ? t.setAttribute(o, e) : t[o] = e
    })
}
,
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
},
goog.dom.getViewportSize = function (e) {
    return goog.dom.getViewportSize_(e || window)
}
,
goog.dom.getViewportSize_ = function (e) {
    var o = e.document
        , t = goog.dom.isCss1CompatMode_(o) ? o.documentElement : o.body;
    return new goog.math.Size(t.clientWidth, t.clientHeight)
}
,
goog.dom.getDocumentHeight = function () {
    return goog.dom.getDocumentHeight_(window)
}
,
goog.dom.getDocumentHeight_ = function (e) {
    var o = e.document
        , t = 0;
    if (o) {
        var r = o.body
            , g = o.documentElement;
        if (!g || !r)
            return 0;
        var n = goog.dom.getViewportSize_(e).height;
        if (goog.dom.isCss1CompatMode_(o) && g.scrollHeight)
            t = g.scrollHeight != n ? g.scrollHeight : g.offsetHeight;
        else {
            var i = g.scrollHeight
                , a = g.offsetHeight;
            g.clientHeight != a && (i = r.scrollHeight,
                a = r.offsetHeight),
                t = n < i ? a < i ? i : a : i < a ? i : a
        }
    }
    return t
}
,
goog.dom.getPageScroll = function (e) {
    var o = e || goog.global || window;
    return goog.dom.getDomHelper(o.document).getDocumentScroll()
}
,
goog.dom.getDocumentScroll = function () {
    return goog.dom.getDocumentScroll_(document)
}
,
goog.dom.getDocumentScroll_ = function (e) {
    var o = goog.dom.getDocumentScrollElement_(e)
        , t = goog.dom.getWindow_(e);
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && t.pageYOffset != o.scrollTop ? new goog.math.Coordinate(o.scrollLeft, o.scrollTop) : new goog.math.Coordinate(t.pageXOffset || o.scrollLeft, t.pageYOffset || o.scrollTop)
}
,
goog.dom.getDocumentScrollElement = function () {
    return goog.dom.getDocumentScrollElement_(document)
}
,
goog.dom.getDocumentScrollElement_ = function (e) {
    return e.scrollingElement ? e.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(e) ? e.documentElement : e.body || e.documentElement
}
,
goog.dom.getWindow = function (e) {
    return e ? goog.dom.getWindow_(e) : window
}
,
goog.dom.getWindow_ = function (e) {
    return e.parentWindow || e.defaultView
}
,
goog.dom.createDom = function (e, o, t) {
    return goog.dom.createDom_(document, arguments)
}
,
goog.dom.createDom_ = function (e, o) {
    var t = o[0]
        , r = o[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && r && (r.name || r.type)) {
        var g = ["<", t];
        if (r.name && g.push(' name="', goog.string.htmlEscape(r.name), '"'),
            r.type) {
            g.push(' type="', goog.string.htmlEscape(r.type), '"');
            var n = {};
            goog.object.extend(n, r),
                delete n.type,
                r = n
        }
        g.push(">"),
            t = g.join("")
    }
    var i = e.createElement(t);
    return r && (goog.isString(r) ? i.className = r : goog.isArray(r) ? i.className = r.join(" ") : goog.dom.setProperties(i, r)),
        2 < o.length && goog.dom.append_(e, i, o, 2),
        i
}
,
goog.dom.append_ = function (o, t, e, r) {
    function g(e) {
        e && t.appendChild(goog.isString(e) ? o.createTextNode(e) : e)
    }
    for (var n = r; n < e.length; n++) {
        var i = e[n];
        goog.isArrayLike(i) && !goog.dom.isNodeLike(i) ? goog.array.forEach(goog.dom.isNodeList(i) ? goog.array.toArray(i) : i, g) : g(i)
    }
}
,
goog.dom.$dom = goog.dom.createDom,
goog.dom.createElement = function (e) {
    return document.createElement(e)
}
;
goog.dom.createTextNode = function (e) {
return document.createTextNode(String(e))
}
,
goog.dom.createTable = function (e, o, t) {
    return goog.dom.createTable_(document, e, o, !!t)
}
,
goog.dom.createTable_ = function (e, o, t, r) {
    for (var g = e.createElement(goog.dom.TagName.TABLE), n = g.appendChild(e.createElement(goog.dom.TagName.TBODY)), i = 0; i < o; i++) {
        for (var a = e.createElement(goog.dom.TagName.TR), s = 0; s < t; s++) {
            var l = e.createElement(goog.dom.TagName.TD);
            r && goog.dom.setTextContent(l, goog.string.Unicode.NBSP),
                a.appendChild(l)
        }
        n.appendChild(a)
    }
    return g
}
,
goog.dom.safeHtmlToNode = function (e) {
    return goog.dom.safeHtmlToNode_(document, e)
}
,
goog.dom.safeHtmlToNode_ = function (e, o) {
    var t = e.createElement(goog.dom.TagName.DIV);
    return goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(t, goog.html.SafeHtml.concat(goog.html.SafeHtml.create("br"), o)),
        t.removeChild(t.firstChild)) : goog.dom.safe.setInnerHtml(t, o),
        goog.dom.childrenToNode_(e, t)
}
,
goog.dom.htmlToDocumentFragment = function (e) {
    return goog.dom.htmlToDocumentFragment_(document, e)
}
,
goog.dom.htmlToDocumentFragment_ = function (e, o) {
    var t = e.createElement(goog.dom.TagName.DIV);
    return goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (t.innerHTML = "<br>" + o,
        t.removeChild(t.firstChild)) : t.innerHTML = o,
        goog.dom.childrenToNode_(e, t)
}
,
goog.dom.childrenToNode_ = function (e, o) {
    if (1 == o.childNodes.length)
        return o.removeChild(o.firstChild);
    for (var t = e.createDocumentFragment(); o.firstChild;)
        t.appendChild(o.firstChild);
    return t
}
,
goog.dom.isCss1CompatMode = function () {
    return goog.dom.isCss1CompatMode_(document)
}
,
goog.dom.isCss1CompatMode_ = function (e) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == e.compatMode
}
,
goog.dom.canHaveChildren = function (e) {
    if (e.nodeType != goog.dom.NodeType.ELEMENT)
        return !1;
    switch (e.tagName) {
        case goog.dom.TagName.APPLET:
        case goog.dom.TagName.AREA:
        case goog.dom.TagName.BASE:
        case goog.dom.TagName.BR:
        case goog.dom.TagName.COL:
        case goog.dom.TagName.COMMAND:
        case goog.dom.TagName.EMBED:
        case goog.dom.TagName.FRAME:
        case goog.dom.TagName.HR:
        case goog.dom.TagName.IMG:
        case goog.dom.TagName.INPUT:
        case goog.dom.TagName.IFRAME:
        case goog.dom.TagName.ISINDEX:
        case goog.dom.TagName.KEYGEN:
        case goog.dom.TagName.LINK:
        case goog.dom.TagName.NOFRAMES:
        case goog.dom.TagName.NOSCRIPT:
        case goog.dom.TagName.META:
        case goog.dom.TagName.OBJECT:
        case goog.dom.TagName.PARAM:
        case goog.dom.TagName.SCRIPT:
        case goog.dom.TagName.SOURCE:
        case goog.dom.TagName.STYLE:
        case goog.dom.TagName.TRACK:
        case goog.dom.TagName.WBR:
            return !1
    }
    return !0
}
,
goog.dom.appendChild = function (e, o) {
    e.appendChild(o)
}
,
goog.dom.append = function (e, o) {
    goog.dom.append_(goog.dom.getOwnerDocument(e), e, arguments, 1)
}
,
goog.dom.removeChildren = function (e) {
    for (var o; o = e.firstChild;)
        e.removeChild(o)
}
,
goog.dom.insertSiblingBefore = function (e, o) {
    o.parentNode && o.parentNode.insertBefore(e, o)
}
,
goog.dom.insertSiblingAfter = function (e, o) {
    o.parentNode && o.parentNode.insertBefore(e, o.nextSibling)
}
,
goog.dom.insertChildAt = function (e, o, t) {
    e.insertBefore(o, e.childNodes[t] || null)
}
,
goog.dom.removeNode = function (e) {
    return e && e.parentNode ? e.parentNode.removeChild(e) : null
}
,
goog.dom.replaceNode = function (e, o) {
    var t = o.parentNode;
    t && t.replaceChild(e, o)
}
,
goog.dom.flattenElement = function (e) {
    var o, t = e.parentNode;
    if (t && t.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (e.removeNode)
            return e.removeNode(!1);
        for (; o = e.firstChild;)
            t.insertBefore(o, e);
        return goog.dom.removeNode(e)
    }
}
,
goog.dom.getChildren = function (e) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && null != e.children ? e.children : goog.array.filter(e.childNodes, function (e) {
        return e.nodeType == goog.dom.NodeType.ELEMENT
    })
}
,
goog.dom.getFirstElementChild = function (e) {
    return null != e.firstElementChild ? e.firstElementChild : goog.dom.getNextElementNode_(e.firstChild, !0)
}
,
goog.dom.getLastElementChild = function (e) {
    return null != e.lastElementChild ? e.lastElementChild : goog.dom.getNextElementNode_(e.lastChild, !1)
}
,
goog.dom.getNextElementSibling = function (e) {
    return null != e.nextElementSibling ? e.nextElementSibling : goog.dom.getNextElementNode_(e.nextSibling, !0)
}
,
goog.dom.getPreviousElementSibling = function (e) {
    return null != e.previousElementSibling ? e.previousElementSibling : goog.dom.getNextElementNode_(e.previousSibling, !1)
}
,
goog.dom.getNextElementNode_ = function (e, o) {
    for (; e && e.nodeType != goog.dom.NodeType.ELEMENT;)
        e = o ? e.nextSibling : e.previousSibling;
    return e
}
,
goog.dom.getNextNode = function (e) {
    if (!e)
        return null;
    if (e.firstChild)
        return e.firstChild;
    for (; e && !e.nextSibling;)
        e = e.parentNode;
    return e ? e.nextSibling : null
}
,
goog.dom.getPreviousNode = function (e) {
    if (!e)
        return null;
    if (!e.previousSibling)
        return e.parentNode;
    for (e = e.previousSibling; e && e.lastChild;)
        e = e.lastChild;
    return e
}
,
goog.dom.isNodeLike = function (e) {
    return goog.isObject(e) && 0 < e.nodeType
}
,
goog.dom.isElement = function (e) {
    return goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT
}
,
goog.dom.isWindow = function (e) {
    return goog.isObject(e) && e.window == e
}
,
goog.dom.getParentElement = function (e) {
    var o;
    if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && (!(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && e instanceof goog.global.SVGElement) && (o = e.parentElement)))
        return o;
    return o = e.parentNode,
        goog.dom.isElement(o) ? o : null
}
,
goog.dom.contains = function (e, o) {
    if (e.contains && o.nodeType == goog.dom.NodeType.ELEMENT)
        return e == o || e.contains(o);
    if (void 0 !== e.compareDocumentPosition)
        return e == o || Boolean(16 & e.compareDocumentPosition(o));
    for (; o && e != o;)
        o = o.parentNode;
    return o == e
}
,
goog.dom.compareNodeOrder = function (e, o) {
    if (e == o)
        return 0;
    if (e.compareDocumentPosition)
        return 2 & e.compareDocumentPosition(o) ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (e.nodeType == goog.dom.NodeType.DOCUMENT)
            return -1;
        if (o.nodeType == goog.dom.NodeType.DOCUMENT)
            return 1
    }
    if ("sourceIndex" in e || e.parentNode && "sourceIndex" in e.parentNode) {
        var t = e.nodeType == goog.dom.NodeType.ELEMENT
            , r = o.nodeType == goog.dom.NodeType.ELEMENT;
        if (t && r)
            return e.sourceIndex - o.sourceIndex;
        var g = e.parentNode
            , n = o.parentNode;
        return g == n ? goog.dom.compareSiblingOrder_(e, o) : !t && goog.dom.contains(g, o) ? -1 * goog.dom.compareParentsDescendantNodeIe_(e, o) : !r && goog.dom.contains(n, e) ? goog.dom.compareParentsDescendantNodeIe_(o, e) : (t ? e.sourceIndex : g.sourceIndex) - (r ? o.sourceIndex : n.sourceIndex)
    }
    var i, a, s = goog.dom.getOwnerDocument(e);
    return (i = s.createRange()).selectNode(e),
        i.collapse(!0),
        (a = s.createRange()).selectNode(o),
        a.collapse(!0),
        i.compareBoundaryPoints(goog.global.Range.START_TO_END, a)
}
,
goog.dom.compareParentsDescendantNodeIe_ = function (e, o) {
    var t = e.parentNode;
    if (t == o)
        return -1;
    for (var r = o; r.parentNode != t;)
        r = r.parentNode;
    return goog.dom.compareSiblingOrder_(r, e)
}
,
goog.dom.compareSiblingOrder_ = function (e, o) {
    for (var t = o; t = t.previousSibling;)
        if (t == e)
            return -1;
    return 1
}
,
goog.dom.findCommonAncestor = function (e) {
    var o, t = arguments.length;
    if (!t)
        return null;
    if (1 == t)
        return e;
    var r = []
        , g = 1 / 0;
    for (o = 0; o < t; o++) {
        for (var n = [], i = arguments[o]; i;)
            n.unshift(i),
                i = i.parentNode;
        r.push(n),
            g = Math.min(g, n.length)
    }
    var a = null;
    for (o = 0; o < g; o++) {
        for (var s = r[0][o], l = 1; l < t; l++)
            if (s != r[l][o])
                return a;
        a = s
    }
    return a
}
,
goog.dom.getOwnerDocument = function (e) {
    return goog.asserts.assert(e, "Node cannot be null or undefined."),
        e.nodeType == goog.dom.NodeType.DOCUMENT ? e : e.ownerDocument || e.document
}
,
goog.dom.getFrameContentDocument = function (e) {
    return e.contentDocument || e.contentWindow.document
}
,
goog.dom.getFrameContentWindow = function (e) {
    return e.contentWindow || goog.dom.getWindow(goog.dom.getFrameContentDocument(e))
}
,
goog.dom.setTextContent = function (e, o) {
    if (goog.asserts.assert(null != e, "goog.dom.setTextContent expects a non-null value for node"),
        "textContent" in e)
        e.textContent = o;
    else if (e.nodeType == goog.dom.NodeType.TEXT)
        e.data = o;
    else if (e.firstChild && e.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; e.lastChild != e.firstChild;)
            e.removeChild(e.lastChild);
        e.firstChild.data = o
    } else {
        goog.dom.removeChildren(e);
        var t = goog.dom.getOwnerDocument(e);
        e.appendChild(t.createTextNode(String(o)))
    }
}
,
goog.dom.getOuterHtml = function (e) {
    if ("outerHTML" in e)
        return e.outerHTML;
    var o = goog.dom.getOwnerDocument(e).createElement(goog.dom.TagName.DIV);
    return o.appendChild(e.cloneNode(!0)),
        o.innerHTML
}
,
goog.dom.findNode = function (e, o) {
    var t = [];
    return goog.dom.findNodes_(e, o, t, !0) ? t[0] : void 0
}
,
goog.dom.findNodes = function (e, o) {
    var t = [];
    return goog.dom.findNodes_(e, o, t, !1),
        t
}
,
goog.dom.findNodes_ = function (e, o, t, r) {
    if (null != e)
        for (var g = e.firstChild; g;) {
            if (o(g) && (t.push(g),
                r))
                return !0;
            if (goog.dom.findNodes_(g, o, t, r))
                return !0;
            g = g.nextSibling
        }
    return !1
}
,
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
},
goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
},
goog.dom.isFocusableTabIndex = function (e) {
    return goog.dom.hasSpecifiedTabIndex_(e) && goog.dom.isTabIndexFocusable_(e)
}
,
goog.dom.setFocusableTabIndex = function (e, o) {
    o ? e.tabIndex = 0 : (e.tabIndex = -1,
        e.removeAttribute("tabIndex"))
}
,
goog.dom.isFocusable = function (e) {
    var o;
    return (o = goog.dom.nativelySupportsFocus_(e) ? !e.disabled && (!goog.dom.hasSpecifiedTabIndex_(e) || goog.dom.isTabIndexFocusable_(e)) : goog.dom.isFocusableTabIndex(e)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(e) : o
}
,
goog.dom.hasSpecifiedTabIndex_ = function (e) {
    var o = e.getAttributeNode("tabindex");
    return goog.isDefAndNotNull(o) && o.specified
}
,
goog.dom.isTabIndexFocusable_ = function (e) {
    var o = e.tabIndex;
    return goog.isNumber(o) && 0 <= o && o < 32768
}
,
goog.dom.nativelySupportsFocus_ = function (e) {
    return e.tagName == goog.dom.TagName.A || e.tagName == goog.dom.TagName.INPUT || e.tagName == goog.dom.TagName.TEXTAREA || e.tagName == goog.dom.TagName.SELECT || e.tagName == goog.dom.TagName.BUTTON
}
,
goog.dom.hasNonZeroBoundingRect_ = function (e) {
    var o = goog.isFunction(e.getBoundingClientRect) ? e.getBoundingClientRect() : {
        height: e.offsetHeight,
        width: e.offsetWidth
    };
    return goog.isDefAndNotNull(o) && 0 < o.height && 0 < o.width
}
,
goog.dom.getTextContent = function (e) {
    var o;
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in e)
        o = goog.string.canonicalizeNewlines(e.innerText);
    else {
        var t = [];
        goog.dom.getTextContent_(e, t, !0),
            o = t.join("")
    }
    return o = (o = o.replace(/ \xAD /g, " ").replace(/\xAD/g, "")).replace(/\u200B/g, ""),
        goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (o = o.replace(/ +/g, " ")),
        " " != o && (o = o.replace(/^\s*/, "")),
        o
}
,
goog.dom.getRawTextContent = function (e) {
    var o = [];
    return goog.dom.getTextContent_(e, o, !1),
        o.join("")
}
,
goog.dom.getTextContent_ = function (e, o, t) {
    if (e.nodeName in goog.dom.TAGS_TO_IGNORE_)
        ;
    else if (e.nodeType == goog.dom.NodeType.TEXT)
        t ? o.push(String(e.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : o.push(e.nodeValue);
    else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)
        o.push(goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName]);
    else
        for (var r = e.firstChild; r;)
            goog.dom.getTextContent_(r, o, t),
                r = r.nextSibling
}
,
goog.dom.getNodeTextLength = function (e) {
    return goog.dom.getTextContent(e).length
}
,
goog.dom.getNodeTextOffset = function (e, o) {
    for (var t = o || goog.dom.getOwnerDocument(e).body, r = []; e && e != t;) {
        for (var g = e; g = g.previousSibling;)
            r.unshift(goog.dom.getTextContent(g));
        e = e.parentNode
    }
    return goog.string.trimLeft(r.join("")).replace(/ +/g, " ").length
}
,
goog.dom.getNodeAtOffset = function (e, o, t) {
    for (var r = [e], g = 0, n = null; 0 < r.length && g < o;)
        if ((n = r.pop()).nodeName in goog.dom.TAGS_TO_IGNORE_)
            ;
        else if (n.nodeType == goog.dom.NodeType.TEXT) {
            g += n.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ").length
        } else if (n.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)
            g += goog.dom.PREDEFINED_TAG_VALUES_[n.nodeName].length;
        else
            for (var i = n.childNodes.length - 1; 0 <= i; i--)
                r.push(n.childNodes[i]);
    return goog.isObject(t) && (t.remainder = n ? n.nodeValue.length + o - g - 1 : 0,
        t.node = n),
        n
}
,
goog.dom.isNodeList = function (e) {
    if (e && "number" == typeof e.length) {
        if (goog.isObject(e))
            return "function" == typeof e.item || "string" == typeof e.item;
        if (goog.isFunction(e))
            return "function" == typeof e.item
    }
    return !1
}
,
goog.dom.getAncestorByTagNameAndClass = function (e, o, t, r) {
    if (!o && !t)
        return null;
    var g = o ? o.toUpperCase() : null;
    return goog.dom.getAncestor(e, function (e) {
        return (!g || e.nodeName == g) && (!t || goog.isString(e.className) && goog.array.contains(e.className.split(/\s+/), t))
    }, !0, r)
}
,
goog.dom.getAncestorByClass = function (e, o, t) {
    return goog.dom.getAncestorByTagNameAndClass(e, null, o, t)
}
,
goog.dom.getAncestor = function (e, o, t, r) {
    t || (e = e.parentNode);
    for (var g = null == r, n = 0; e && (g || n <= r);) {
        if (goog.asserts.assert("parentNode" != e.name),
            o(e))
            return e;
        e = e.parentNode,
            n++
    }
    return null
}
,
goog.dom.getActiveElement = function (e) {
    try {
        return e && e.activeElement
    } catch (e) { }
    return null
}
,
goog.dom.getPixelRatio = function () {
    var e = goog.dom.getWindow()
        , o = goog.userAgent.GECKO && goog.userAgent.MOBILE;
    return goog.isDef(e.devicePixelRatio) && !o ? e.devicePixelRatio : e.matchMedia && (goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3)) || 1
}
,
goog.dom.matchesPixelRatio_ = function (e) {
    var o = "(-webkit-min-device-pixel-ratio: " + e + "),(min--moz-device-pixel-ratio: " + e + "),(min-resolution: " + e + "dppx)";
    return goog.dom.getWindow().matchMedia(o).matches ? e : 0
}
,
goog.dom.DomHelper = function (e) {
    this.document_ = e || goog.global.document || document
}
,
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper,
goog.dom.DomHelper.prototype.setDocument = function (e) {
    this.document_ = e
}
,
goog.dom.DomHelper.prototype.getDocument = function () {
    return this.document_
}
,
goog.dom.DomHelper.prototype.getElement = function (e) {
    return goog.dom.getElementHelper_(this.document_, e)
}
,
goog.dom.DomHelper.prototype.getRequiredElement = function (e) {
    return goog.dom.getRequiredElementHelper_(this.document_, e)
}
,
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement,
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function (e, o, t) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, e, o, t)
}
,
goog.dom.DomHelper.prototype.getElementsByClass = function (e, o) {
    var t = o || this.document_;
    return goog.dom.getElementsByClass(e, t)
}
,
goog.dom.DomHelper.prototype.getElementByClass = function (e, o) {
    var t = o || this.document_;
    return goog.dom.getElementByClass(e, t)
}
,
goog.dom.DomHelper.prototype.getRequiredElementByClass = function (e, o) {
    var t = o || this.document_;
    return goog.dom.getRequiredElementByClass(e, t)
}
,
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass,
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties,
goog.dom.DomHelper.prototype.getViewportSize = function (e) {
    return goog.dom.getViewportSize(e || this.getWindow())
}
,
goog.dom.DomHelper.prototype.getDocumentHeight = function () {
    return goog.dom.getDocumentHeight_(this.getWindow())
}
,
goog.dom.Appendable,
goog.dom.DomHelper.prototype.createDom = function (e, o, t) {
    return goog.dom.createDom_(this.document_, arguments)
}
,
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom,
goog.dom.DomHelper.prototype.createElement = function (e) {
    return this.document_.createElement(e)
}
,
goog.dom.DomHelper.prototype.createTextNode = function (e) {
    return this.document_.createTextNode(String(e))
}
,
goog.dom.DomHelper.prototype.createTable = function (e, o, t) {
    return goog.dom.createTable_(this.document_, e, o, !!t)
}
,
goog.dom.DomHelper.prototype.safeHtmlToNode = function (e) {
    return goog.dom.safeHtmlToNode_(this.document_, e)
}
,
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function (e) {
    return goog.dom.htmlToDocumentFragment_(this.document_, e)
}
,
goog.dom.DomHelper.prototype.isCss1CompatMode = function () {
    return goog.dom.isCss1CompatMode_(this.document_)
}
,
goog.dom.DomHelper.prototype.getWindow = function () {
    return goog.dom.getWindow_(this.document_)
}
,
goog.dom.DomHelper.prototype.getDocumentScrollElement = function () {
    return goog.dom.getDocumentScrollElement_(this.document_)
}
,
goog.dom.DomHelper.prototype.getDocumentScroll = function () {
    return goog.dom.getDocumentScroll_(this.document_)
}
,
goog.dom.DomHelper.prototype.getActiveElement = function (e) {
    return goog.dom.getActiveElement(e || this.document_)
}
,
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild,
goog.dom.DomHelper.prototype.append = goog.dom.append,
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren,
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren,
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore,
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter,
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt,
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode,
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode,
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement,
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren,
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild,
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild,
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling,
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling,
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode,
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode,
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike,
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement,
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow,
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement,
goog.dom.DomHelper.prototype.contains = goog.dom.contains,
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder,
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor,
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument,
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument,
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow,
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent,
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml,
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode,
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes,
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex,
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex,
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable,
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent,
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength,
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset,
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset,
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList,
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass,
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass,
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor,
goog.provide("goog.Thenable"),
goog.Thenable = function () { }
,
goog.Thenable.prototype.then = function (e, o, t) { }
,
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable",
goog.Thenable.addImplementation = function (e) {
    goog.exportProperty(e.prototype, "then", e.prototype.then),
        COMPILED ? e.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : e.prototype.$goog_Thenable = !0
}
,
goog.Thenable.isImplementedBy = function (e) {
    if (!e)
        return !1;
    try {
        return COMPILED ? !!e[goog.Thenable.IMPLEMENTED_BY_PROP] : !!e.$goog_Thenable
    } catch (e) {
        return !1
    }
}
,
goog.provide("goog.async.FreeList"),
goog.async.FreeList = goog.defineClass(null, {
    constructor: function (e, o, t) {
        this.limit_ = t,
            this.create_ = e,
            this.reset_ = o,
            this.occupants_ = 0,
            this.head_ = null
    },
    get: function () {
        var e;
        return 0 < this.occupants_ ? (this.occupants_--,
            e = this.head_,
            this.head_ = e.next,
            e.next = null) : e = this.create_(),
            e
    },
    put: function (e) {
        this.reset_(e),
            this.occupants_ < this.limit_ && (this.occupants_++,
                e.next = this.head_,
                this.head_ = e)
    },
    occupants: function () {
        return this.occupants_
    }
}),
goog.provide("goog.async.WorkItem"),
goog.provide("goog.async.WorkQueue"),
goog.require("goog.asserts"),
goog.require("goog.async.FreeList"),
goog.async.WorkQueue = function () {
    this.workHead_ = null,
        this.workTail_ = null
}
,
goog.define("goog.async.WorkQueue.DEFAULT_MAX_UNUSED", 100),
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function () {
    return new goog.async.WorkItem
}
    , function (e) {
        e.reset()
    }
    , goog.async.WorkQueue.DEFAULT_MAX_UNUSED),
goog.async.WorkQueue.prototype.add = function (e, o) {
    var t = this.getUnusedItem_();
    t.set(e, o),
        this.workTail_ ? this.workTail_.next = t : (goog.asserts.assert(!this.workHead_),
            this.workHead_ = t),
        this.workTail_ = t
}
,
goog.async.WorkQueue.prototype.remove = function () {
    var e = null;
    return this.workHead_ && (e = this.workHead_,
        this.workHead_ = this.workHead_.next,
        this.workHead_ || (this.workTail_ = null),
        e.next = null),
        e
}
,
goog.async.WorkQueue.prototype.returnUnused = function (e) {
    goog.async.WorkQueue.freelist_.put(e)
}
,
goog.async.WorkQueue.prototype.getUnusedItem_ = function () {
    return goog.async.WorkQueue.freelist_.get()
}
,
goog.async.WorkItem = function () {
    this.fn = null,
        this.scope = null,
        this.next = null
}
,
goog.async.WorkItem.prototype.set = function (e, o) {
    this.fn = e,
        this.scope = o,
        this.next = null
}
,
goog.async.WorkItem.prototype.reset = function () {
    this.fn = null,
        this.scope = null,
        this.next = null
}
,
goog.provide("goog.debug.EntryPointMonitor"),
goog.provide("goog.debug.entryPointRegistry"),
goog.require("goog.asserts"),
goog.debug.EntryPointMonitor = function () { }
,
goog.debug.EntryPointMonitor.prototype.wrap,
goog.debug.EntryPointMonitor.prototype.unwrap,
goog.debug.entryPointRegistry.refList_ = [],
goog.debug.entryPointRegistry.monitors_ = [],
goog.debug.entryPointRegistry.monitorsMayExist_ = !1,
goog.debug.entryPointRegistry.register = function (e) {
    if (goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = e,
        goog.debug.entryPointRegistry.monitorsMayExist_)
        for (var o = goog.debug.entryPointRegistry.monitors_, t = 0; t < o.length; t++)
            e(goog.bind(o[t].wrap, o[t]))
}
,
goog.debug.entryPointRegistry.monitorAll = function (e) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var o = goog.bind(e.wrap, e), t = 0; t < goog.debug.entryPointRegistry.refList_.length; t++)
        goog.debug.entryPointRegistry.refList_[t](o);
    goog.debug.entryPointRegistry.monitors_.push(e)
}
,
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function (e) {
    var o = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(e == o[o.length - 1], "Only the most recent monitor can be unwrapped.");
    for (var t = goog.bind(e.unwrap, e), r = 0; r < goog.debug.entryPointRegistry.refList_.length; r++)
        goog.debug.entryPointRegistry.refList_[r](t);
    o.length--
}
,
goog.provide("goog.functions"),
goog.functions.constant = function (e) {
    return function () {
        return e
    }
}
,
goog.functions.FALSE = goog.functions.constant(!1),
goog.functions.TRUE = goog.functions.constant(!0),
goog.functions.NULL = goog.functions.constant(null),
goog.functions.identity = function (e, o) {
    return e
}
,
goog.functions.error = function (e) {
    return function () {
        throw Error(e)
    }
}
,
goog.functions.fail = function (e) {
    return function () {
        throw e
    }
}
,
goog.functions.lock = function (e, o) {
    return o = o || 0,
        function () {
            return e.apply(this, Array.prototype.slice.call(arguments, 0, o))
        }
}
,
goog.functions.nth = function (e) {
    return function () {
        return arguments[e]
    }
}
,
goog.functions.withReturnValue = function (e, o) {
    return goog.functions.sequence(e, goog.functions.constant(o))
}
,
goog.functions.equalTo = function (o, t) {
    return function (e) {
        return t ? o == e : o === e
    }
}
,
goog.functions.compose = function (e, o) {
    var t = arguments
        , r = t.length;
    return function () {
        var e;
        r && (e = t[r - 1].apply(this, arguments));
        for (var o = r - 2; 0 <= o; o--)
            e = t[o].call(this, e);
        return e
    }
}
,
goog.functions.sequence = function (e) {
    var t = arguments
        , r = t.length;
    return function () {
        for (var e, o = 0; o < r; o++)
            e = t[o].apply(this, arguments);
        return e
    }
}
,
goog.functions.and = function (e) {
    var o = arguments
        , t = o.length;
    return function () {
        for (var e = 0; e < t; e++)
            if (!o[e].apply(this, arguments))
                return !1;
        return !0
    }
}
,
goog.functions.or = function (e) {
    var o = arguments
        , t = o.length;
    return function () {
        for (var e = 0; e < t; e++)
            if (o[e].apply(this, arguments))
                return !0;
        return !1
    }
}
,
goog.functions.not = function (e) {
    return function () {
        return !e.apply(this, arguments)
    }
}
,
goog.functions.create = function (e, o) {
    function t() { }
    t.prototype = e.prototype;
    var r = new t;
    return e.apply(r, Array.prototype.slice.call(arguments, 1)),
        r
}
,
goog.define("goog.functions.CACHE_RETURN_VALUE", !0),
goog.functions.cacheReturnValue = function (e) {
    var o, t = !1;
    return function () {
        return goog.functions.CACHE_RETURN_VALUE ? (t || (o = e(),
            t = !0),
            o) : e()
    }
}
,
goog.provide("goog.async.nextTick"),
goog.provide("goog.async.throwException"),
goog.require("goog.debug.entryPointRegistry"),
goog.require("goog.dom.TagName"),
goog.require("goog.functions"),
goog.require("goog.labs.userAgent.browser"),
goog.require("goog.labs.userAgent.engine"),
goog.async.throwException = function (e) {
    goog.global.setTimeout(function () {
        throw e
    }, 0)
}
,
goog.async.nextTick = function (e, o, t) {
    var r = e;
    o && (r = goog.bind(e, o)),
        r = goog.async.nextTick.wrapCallback_(r),
        !goog.isFunction(goog.global.setImmediate) || !t && goog.global.Window && goog.global.Window.prototype && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()),
            goog.async.nextTick.setImmediate_(r)) : goog.global.setImmediate(r)
}
,
goog.async.nextTick.setImmediate_,
goog.async.nextTick.getSetImmediateEmulator_ = function () {
    var e = goog.global.MessageChannel;
    if (void 0 === e && "undefined" != typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (e = function () {
        var e = document.createElement(goog.dom.TagName.IFRAME);
        e.style.display = "none",
            e.src = "",
            document.documentElement.appendChild(e);
        var o = e.contentWindow
            , t = o.document;
        t.open(),
            t.write(""),
            t.close();
        var r = "callImmediate" + Math.random()
            , g = "file:" == o.location.protocol ? "*" : o.location.protocol + "//" + o.location.host
            , n = goog.bind(function (e) {
                "*" != g && e.origin != g || e.data != r || this.port1.onmessage()
            }, this);
        o.addEventListener("message", n, !1),
            this.port1 = {},
            this.port2 = {
                postMessage: function () {
                    o.postMessage(r, g)
                }
            }
    }
    ),
        void 0 === e || goog.labs.userAgent.browser.isIE())
        return "undefined" != typeof document && "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT) ? function (e) {
            var o = document.createElement(goog.dom.TagName.SCRIPT);
            o.onreadystatechange = function () {
                o.onreadystatechange = null,
                    o.parentNode.removeChild(o),
                    o = null,
                    e(),
                    e = null
            }
                ,
                document.documentElement.appendChild(o)
        }
            : function (e) {
                goog.global.setTimeout(e, 0)
            }
            ;
    var o = new e
        , t = {}
        , r = t;
    return o.port1.onmessage = function () {
        if (goog.isDef(t.next)) {
            var e = (t = t.next).cb;
            t.cb = null,
                e()
        }
    }
        ,
        function (e) {
            r.next = {
                cb: e
            },
                r = r.next,
                o.port2.postMessage(0)
        }
}
,
goog.async.nextTick.wrapCallback_ = goog.functions.identity,
goog.debug.entryPointRegistry.register(function (e) {
    goog.async.nextTick.wrapCallback_ = e
}),
goog.provide("goog.testing.watchers"),
goog.testing.watchers.resetWatchers_ = [],
goog.testing.watchers.signalClockReset = function () {
    for (var e = goog.testing.watchers.resetWatchers_, o = 0; o < e.length; o++)
        goog.testing.watchers.resetWatchers_[o]()
}
,
goog.testing.watchers.watchClockReset = function (e) {
    goog.testing.watchers.resetWatchers_.push(e)
}
,
goog.provide("goog.async.run"),
goog.require("goog.async.WorkQueue"),
goog.require("goog.async.nextTick"),
goog.require("goog.async.throwException"),
goog.require("goog.testing.watchers"),
goog.async.run = function (e, o) {
    goog.async.run.schedule_ || goog.async.run.initializeRunner_(),
        goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(),
            goog.async.run.workQueueScheduled_ = !0),
        goog.async.run.workQueue_.add(e, o)
}
,
goog.async.run.initializeRunner_ = function () {
    if (goog.global.Promise && goog.global.Promise.resolve) {
        var e = goog.global.Promise.resolve();
        goog.async.run.schedule_ = function () {
            e.then(goog.async.run.processWorkQueue)
        }
    } else
        goog.async.run.schedule_ = function () {
            goog.async.nextTick(goog.async.run.processWorkQueue)
        }
}
,
goog.async.run.forceNextTick = function (e) {
    goog.async.run.schedule_ = function () {
        goog.async.nextTick(goog.async.run.processWorkQueue),
            e && e(goog.async.run.processWorkQueue)
    }
}
,
goog.async.run.schedule_,
goog.async.run.workQueueScheduled_ = !1,
goog.async.run.workQueue_ = new goog.async.WorkQueue,
goog.DEBUG && (goog.async.run.resetQueue_ = function () {
    goog.async.run.workQueueScheduled_ = !1,
        goog.async.run.workQueue_ = new goog.async.WorkQueue
}
    ,
    goog.testing.watchers.watchClockReset(goog.async.run.resetQueue_)),
goog.async.run.processWorkQueue = function () {
    for (var e = null; e = goog.async.run.workQueue_.remove();) {
        try {
            e.fn.call(e.scope)
        } catch (e) {
            goog.async.throwException(e)
        }
        goog.async.run.workQueue_.returnUnused(e)
    }
    goog.async.run.workQueueScheduled_ = !1
}
,
goog.provide("goog.promise.Resolver"),
goog.promise.Resolver = function () { }
,
goog.promise.Resolver.prototype.promise,
goog.promise.Resolver.prototype.resolve,
goog.promise.Resolver.prototype.reject,
goog.provide("goog.Promise"),
goog.require("goog.Thenable"),
goog.require("goog.asserts"),
goog.require("goog.async.FreeList"),
goog.require("goog.async.run"),
goog.require("goog.async.throwException"),
goog.require("goog.debug.Error"),
goog.require("goog.promise.Resolver"),
goog.Promise = function (e, o) {
    if (this.state_ = goog.Promise.State_.PENDING,
        this.result_ = void 0,
        this.parent_ = null,
        this.callbackEntries_ = null,
        this.callbackEntriesTail_ = null,
        this.executing_ = !1,
        0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1),
        goog.Promise.LONG_STACK_TRACES && (this.stack_ = [],
            this.addStackTrace_(new Error("created")),
            this.currentStep_ = 0),
        e == goog.Promise.RESOLVE_FAST_PATH_)
        this.resolve_(goog.Promise.State_.FULFILLED, o);
    else
        try {
            var t = this;
            e.call(o, function (e) {
                t.resolve_(goog.Promise.State_.FULFILLED, e)
            }, function (e) {
                if (goog.DEBUG && !(e instanceof goog.Promise.CancellationError))
                    try {
                        throw e instanceof Error ? e : new Error("Promise rejected.")
                    } catch (e) { }
                t.resolve_(goog.Promise.State_.REJECTED, e)
            })
        } catch (e) {
            this.resolve_(goog.Promise.State_.REJECTED, e)
        }
}
,
goog.define("goog.Promise.LONG_STACK_TRACES", !1),
goog.define("goog.Promise.UNHANDLED_REJECTION_DELAY", 0),
goog.Promise.State_ = {
    PENDING: 0,
    BLOCKED: 1,
    FULFILLED: 2,
    REJECTED: 3
},
goog.Promise.CallbackEntry_ = function () {
    this.child = null,
        this.onFulfilled = null,
        this.onRejected = null,
        this.context = null,
        this.next = null,
        this.always = !1
}
,
goog.Promise.CallbackEntry_.prototype.reset = function () {
    this.child = null,
        this.onFulfilled = null,
        this.onRejected = null,
        this.context = null,
        this.always = !1
}
,
goog.define("goog.Promise.DEFAULT_MAX_UNUSED", 100),
goog.Promise.freelist_ = new goog.async.FreeList(function () {
    return new goog.Promise.CallbackEntry_
}
    , function (e) {
        e.reset()
    }
    , goog.Promise.DEFAULT_MAX_UNUSED),
goog.Promise.getCallbackEntry_ = function (e, o, t) {
    var r = goog.Promise.freelist_.get();
    return r.onFulfilled = e,
        r.onRejected = o,
        r.context = t,
        r
}
,
goog.Promise.returnEntry_ = function (e) {
    goog.Promise.freelist_.put(e)
}
,
goog.Promise.RESOLVE_FAST_PATH_ = function () { }
,
goog.Promise.resolve = function (e) {
    return e instanceof goog.Promise ? e : new goog.Promise(goog.Promise.RESOLVE_FAST_PATH_, e)
}
,
goog.Promise.reject = function (t) {
    return new goog.Promise(function (e, o) {
        o(t)
    }
    )
}
,
goog.Promise.race = function (g) {
    return new goog.Promise(function (e, o) {
        g.length || e(void 0);
        for (var t, r = 0; t = g[r]; r++)
            goog.Promise.maybeThenVoid_(t, e, o)
    }
    )
}
,
goog.Promise.all = function (s) {
    return new goog.Promise(function (t, o) {
        var r = s.length
            , g = [];
        if (r) {
            function e(e, o) {
                r--,
                    g[e] = o,
                    0 == r && t(g)
            }
            function n(e) {
                o(e)
            }
            for (var i, a = 0; i = s[a]; a++)
                goog.Promise.maybeThenVoid_(i, goog.partial(e, a), n)
        } else
            t(g)
    }
    )
}
,
goog.Promise.allSettled = function (a) {
    return new goog.Promise(function (r, e) {
        var g = a.length
            , n = [];
        if (g) {
            function o(e, o, t) {
                g--,
                    n[e] = o ? {
                        fulfilled: !0,
                        value: t
                    } : {
                            fulfilled: !1,
                            reason: t
                        },
                    0 == g && r(n)
            }
            for (var t, i = 0; t = a[i]; i++)
                goog.Promise.maybeThenVoid_(t, goog.partial(o, i, !0), goog.partial(o, i, !1))
        } else
            r(n)
    }
    )
}
,
goog.Promise.firstFulfilled = function (s) {
    return new goog.Promise(function (o, t) {
        var r = s.length
            , g = [];
        if (r) {
            function e(e) {
                o(e)
            }
            function n(e, o) {
                r--,
                    g[e] = o,
                    0 == r && t(g)
            }
            for (var i, a = 0; i = s[a]; a++)
                goog.Promise.maybeThenVoid_(i, e, goog.partial(n, a))
        } else
            o(void 0)
    }
    )
}
,
goog.Promise.withResolver = function () {
    var t, r, e = new goog.Promise(function (e, o) {
        t = e,
            r = o
    }
    );
    return new goog.Promise.Resolver_(e, t, r)
}
,
goog.Promise.prototype.then = function (e, o, t) {
    return null != e && goog.asserts.assertFunction(e, "opt_onFulfilled should be a function."),
        null != o && goog.asserts.assertFunction(o, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),
        goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(new Error("then")),
        this.addChildPromise_(goog.isFunction(e) ? e : null, goog.isFunction(o) ? o : null, t)
}
,
goog.Thenable.addImplementation(goog.Promise),
goog.Promise.prototype.thenVoid = function (e, o, t) {
    null != e && goog.asserts.assertFunction(e, "opt_onFulfilled should be a function."),
        null != o && goog.asserts.assertFunction(o, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),
        goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(new Error("then")),
        this.addCallbackEntry_(goog.Promise.getCallbackEntry_(e || goog.nullFunction, o || null, t))
}
,
goog.Promise.maybeThenVoid_ = function (e, o, t, r) {
    e instanceof goog.Promise ? e.thenVoid(o, t, r) : e.then(o, t, r)
}
,
goog.Promise.prototype.thenAlways = function (e, o) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(new Error("thenAlways"));
    var t = goog.Promise.getCallbackEntry_(e, e, o);
    return t.always = !0,
        this.addCallbackEntry_(t),
        this
}
,
goog.Promise.prototype.thenCatch = function (e, o) {
    return goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(new Error("thenCatch")),
        this.addChildPromise_(null, e, o)
}
,
goog.Promise.prototype.cancel = function (o) {
    this.state_ == goog.Promise.State_.PENDING && goog.async.run(function () {
        var e = new goog.Promise.CancellationError(o);
        this.cancelInternal_(e)
    }, this)
}
,
goog.Promise.prototype.cancelInternal_ = function (e) {
    this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, e),
        this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, e))
}
,
goog.Promise.prototype.cancelChild_ = function (e, o) {
    if (this.callbackEntries_) {
        for (var t = 0, r = null, g = null, n = this.callbackEntries_; n && (n.always || (t++,
            n.child == e && (r = n),
            !(r && 1 < t))); n = n.next)
            r || (g = n);
        r && (this.state_ == goog.Promise.State_.PENDING && 1 == t ? this.cancelInternal_(o) : (g ? this.removeEntryAfter_(g) : this.popEntry_(),
            this.executeCallback_(r, goog.Promise.State_.REJECTED, o)))
    }
}
,
goog.Promise.prototype.addCallbackEntry_ = function (e) {
    this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_(),
        this.queueEntry_(e)
}
,
goog.Promise.prototype.addChildPromise_ = function (g, n, i) {
    var e = goog.Promise.getCallbackEntry_(null, null, null);
    return e.child = new goog.Promise(function (t, r) {
        e.onFulfilled = g ? function (e) {
            try {
                var o = g.call(i, e);
                t(o)
            } catch (e) {
                r(e)
            }
        }
            : t,
            e.onRejected = n ? function (e) {
                try {
                    var o = n.call(i, e);
                    !goog.isDef(o) && e instanceof goog.Promise.CancellationError ? r(e) : t(o)
                } catch (e) {
                    r(e)
                }
            }
                : r
    }
    ),
        (e.child.parent_ = this).addCallbackEntry_(e),
        e.child
}
,
goog.Promise.prototype.unblockAndFulfill_ = function (e) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED),
        this.state_ = goog.Promise.State_.PENDING,
        this.resolve_(goog.Promise.State_.FULFILLED, e)
}
,
goog.Promise.prototype.unblockAndReject_ = function (e) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED),
        this.state_ = goog.Promise.State_.PENDING,
        this.resolve_(goog.Promise.State_.REJECTED, e)
}
,
goog.Promise.prototype.resolve_ = function (o, t) {
    if (this.state_ == goog.Promise.State_.PENDING) {
        if (this == t)
            o = goog.Promise.State_.REJECTED,
                t = new TypeError("Promise cannot resolve to itself");
        else {
            if (goog.Thenable.isImplementedBy(t))
                return t = t,
                    this.state_ = goog.Promise.State_.BLOCKED,
                    void goog.Promise.maybeThenVoid_(t, this.unblockAndFulfill_, this.unblockAndReject_, this);
            if (goog.isObject(t))
                try {
                    var e = t.then;
                    if (goog.isFunction(e))
                        return void this.tryThen_(t, e)
                } catch (e) {
                    o = goog.Promise.State_.REJECTED,
                        t = e
                }
        }
        this.result_ = t,
            this.state_ = o,
            this.parent_ = null,
            this.scheduleCallbacks_(),
            o != goog.Promise.State_.REJECTED || t instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, t)
    }
}
,
goog.Promise.prototype.tryThen_ = function (e, o) {
    this.state_ = goog.Promise.State_.BLOCKED;
    function t(e) {
        g || (g = !0,
            r.unblockAndReject_(e))
    }
    var r = this
        , g = !1;
    try {
        o.call(e, function (e) {
            g || (g = !0,
                r.unblockAndFulfill_(e))
        }, t)
    } catch (e) {
        t(e)
    }
}
,
goog.Promise.prototype.scheduleCallbacks_ = function () {
    this.executing_ || (this.executing_ = !0,
        goog.async.run(this.executeCallbacks_, this))
}
,
goog.Promise.prototype.hasEntry_ = function () {
    return !!this.callbackEntries_
}
,
goog.Promise.prototype.queueEntry_ = function (e) {
    goog.asserts.assert(null != e.onFulfilled),
        this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = e : this.callbackEntries_ = e,
        this.callbackEntriesTail_ = e
}
,
goog.Promise.prototype.popEntry_ = function () {
    var e = null;
    return this.callbackEntries_ && (e = this.callbackEntries_,
        this.callbackEntries_ = e.next,
        e.next = null),
        this.callbackEntries_ || (this.callbackEntriesTail_ = null),
        null != e && goog.asserts.assert(null != e.onFulfilled),
        e
}
,
goog.Promise.prototype.removeEntryAfter_ = function (e) {
    goog.asserts.assert(this.callbackEntries_),
        goog.asserts.assert(null != e),
        e.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = e),
        e.next = e.next.next
}
,
goog.Promise.prototype.executeCallbacks_ = function () {
    for (var e = null; e = this.popEntry_();)
        goog.Promise.LONG_STACK_TRACES && this.currentStep_++,
            this.executeCallback_(e, this.state_, this.result_);
    this.executing_ = !1
}
,
goog.Promise.prototype.executeCallback_ = function (e, o, t) {
    if (o == goog.Promise.State_.REJECTED && e.onRejected && !e.always && this.removeUnhandledRejection_(),
        e.child)
        e.child.parent_ = null,
            goog.Promise.invokeCallback_(e, o, t);
    else
        try {
            e.always ? e.onFulfilled.call(e.context) : goog.Promise.invokeCallback_(e, o, t)
        } catch (e) {
            goog.Promise.handleRejection_.call(null, e)
        }
    goog.Promise.returnEntry_(e)
}
,
goog.Promise.invokeCallback_ = function (e, o, t) {
    o == goog.Promise.State_.FULFILLED ? e.onFulfilled.call(e.context, t) : e.onRejected && e.onRejected.call(e.context, t)
}
,
goog.Promise.prototype.addStackTrace_ = function (e) {
    if (goog.Promise.LONG_STACK_TRACES && goog.isString(e.stack)) {
        var o = e.stack.split("\n", 4)[3]
            , t = e.message;
        t += Array(11 - t.length).join(" "),
            this.stack_.push(t + o)
    }
}
,
goog.Promise.prototype.appendLongStack_ = function (e) {
    if (goog.Promise.LONG_STACK_TRACES && e && goog.isString(e.stack) && this.stack_.length) {
        for (var o = ["Promise trace:"], t = this; t; t = t.parent_) {
            for (var r = this.currentStep_; 0 <= r; r--)
                o.push(t.stack_[r]);
            o.push("Value: [" + (t.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(t.result_) + ">")
        }
        e.stack += "\n\n" + o.join("\n")
    }
}
,
goog.Promise.prototype.removeUnhandledRejection_ = function () {
    if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (var e = this; e && e.unhandledRejectionId_; e = e.parent_)
            goog.global.clearTimeout(e.unhandledRejectionId_),
                e.unhandledRejectionId_ = 0;
    else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (e = this; e && e.hadUnhandledRejection_; e = e.parent_)
            e.hadUnhandledRejection_ = !1
}
,
goog.Promise.addUnhandledRejection_ = function (e, o) {
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? e.unhandledRejectionId_ = goog.global.setTimeout(function () {
        e.appendLongStack_(o),
            goog.Promise.handleRejection_.call(null, o)
    }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (e.hadUnhandledRejection_ = !0,
        goog.async.run(function () {
            e.hadUnhandledRejection_ && (e.appendLongStack_(o),
                goog.Promise.handleRejection_.call(null, o))
        }))
}
,
goog.Promise.handleRejection_ = goog.async.throwException,
goog.Promise.setUnhandledRejectionHandler = function (e) {
    goog.Promise.handleRejection_ = e
}
,
goog.Promise.CancellationError = function (e) {
    goog.Promise.CancellationError.base(this, "constructor", e)
}
,
goog.inherits(goog.Promise.CancellationError, goog.debug.Error),
goog.Promise.CancellationError.prototype.name = "cancel",
goog.Promise.Resolver_ = function (e, o, t) {
    this.promise = e,
        this.resolve = o,
        this.reject = t
}
,
goog.provide("goog.disposable.IDisposable"),
goog.disposable.IDisposable = function () { }
,
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod,
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod,
goog.provide("goog.Disposable"),
goog.provide("goog.dispose"),
goog.provide("goog.disposeAll"),
goog.require("goog.disposable.IDisposable"),
goog.Disposable = function () {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = (new Error).stack),
        goog.Disposable.instances_[goog.getUid(this)] = this),
        this.disposed_ = this.disposed_,
        this.onDisposeCallbacks_ = this.onDisposeCallbacks_
}
,
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
},
goog.define("goog.Disposable.MONITORING_MODE", 0),
goog.define("goog.Disposable.INCLUDE_STACK_ON_CREATION", !0),
goog.Disposable.instances_ = {},
goog.Disposable.getUndisposedObjects = function () {
    var e = [];
    for (var o in goog.Disposable.instances_)
        goog.Disposable.instances_.hasOwnProperty(o) && e.push(goog.Disposable.instances_[Number(o)]);
    return e
}
,
goog.Disposable.clearUndisposedObjects = function () {
    goog.Disposable.instances_ = {}
}
,
goog.Disposable.prototype.disposed_ = !1,
goog.Disposable.prototype.onDisposeCallbacks_,
goog.Disposable.prototype.creationStack,
goog.Disposable.prototype.isDisposed = function () {
    return this.disposed_
}
,
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed,
goog.Disposable.prototype.dispose = function () {
    if (!this.disposed_ && (this.disposed_ = !0,
        this.disposeInternal(),
        goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var e = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(e))
            throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[e]
    }
}
,
goog.Disposable.prototype.registerDisposable = function (e) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, e))
}
,
goog.Disposable.prototype.addOnDisposeCallback = function (e, o) {
    this.disposed_ ? e.call(o) : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []),
        this.onDisposeCallbacks_.push(goog.isDef(o) ? goog.bind(e, o) : e))
}
,
goog.Disposable.prototype.disposeInternal = function () {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length;)
            this.onDisposeCallbacks_.shift()()
}
,
goog.Disposable.isDisposed = function (e) {
    return !(!e || "function" != typeof e.isDisposed) && e.isDisposed()
}
,
goog.dispose = function (e) {
    e && "function" == typeof e.dispose && e.dispose()
}
,
goog.disposeAll = function (e) {
    for (var o = 0, t = arguments.length; o < t; ++o) {
        var r = arguments[o];
        goog.isArrayLike(r) ? goog.disposeAll.apply(null, r) : goog.dispose(r)
    }
}
,
goog.provide("goog.events.BrowserFeature"),
goog.require("goog.userAgent"),
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
},
goog.provide("goog.events.EventId"),
goog.events.EventId = function (e) {
    this.id = e
}
,
goog.events.EventId.prototype.toString = function () {
    return this.id
}
,
goog.provide("goog.events.Event"),
goog.provide("goog.events.EventLike"),
goog.require("goog.Disposable"),
goog.require("goog.events.EventId"),
goog.events.EventLike,
goog.events.Event = function (e, o) {
    this.type = e instanceof goog.events.EventId ? String(e) : e,
        this.target = o,
        this.currentTarget = this.target,
        this.propagationStopped_ = !1,
        this.defaultPrevented = !1,
        this.returnValue_ = !0
}
,
goog.events.Event.prototype.stopPropagation = function () {
    this.propagationStopped_ = !0
}
,
goog.events.Event.prototype.preventDefault = function () {
    this.defaultPrevented = !0,
        this.returnValue_ = !1
}
,
goog.events.Event.stopPropagation = function (e) {
    e.stopPropagation()
}
,
goog.events.Event.preventDefault = function (e) {
    e.preventDefault()
}
,
goog.provide("goog.events.EventType"),
goog.require("goog.userAgent"),
goog.events.getVendorPrefixedName_ = function (e) {
    return goog.userAgent.WEBKIT ? "webkit" + e : goog.userAgent.OPERA ? "o" + e.toLowerCase() : e.toLowerCase()
}
,
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified"
},
goog.provide("goog.reflect"),
goog.reflect.object = function (e, o) {
    return o
}
,
goog.reflect.sinkValue = function (e) {
    return goog.reflect.sinkValue[" "](e),
        e
}
,
goog.reflect.sinkValue[" "] = goog.nullFunction,
goog.reflect.canAccessProperty = function (e, o) {
    try {
        return goog.reflect.sinkValue(e[o]),
            !0
    } catch (e) { }
    return !1
}
,
goog.provide("goog.events.BrowserEvent"),
goog.provide("goog.events.BrowserEvent.MouseButton"),
goog.require("goog.events.BrowserFeature"),
goog.require("goog.events.Event"),
goog.require("goog.events.EventType"),
goog.require("goog.reflect"),
goog.require("goog.userAgent"),
goog.events.BrowserEvent = function (e, o) {
    goog.events.BrowserEvent.base(this, "constructor", e ? e.type : ""),
        this.target = null,
        this.currentTarget = null,
        this.relatedTarget = null,
        this.offsetX = 0,
        this.offsetY = 0,
        this.clientX = 0,
        this.clientY = 0,
        this.screenX = 0,
        this.screenY = 0,
        this.button = 0,
        this.keyCode = 0,
        this.charCode = 0,
        this.ctrlKey = !1,
        this.altKey = !1,
        this.shiftKey = !1,
        this.metaKey = !1,
        this.state = null,
        this.platformModifierKey = !1,
        this.event_ = null,
        e && this.init(e, o)
}
,
goog.inherits(goog.events.BrowserEvent, goog.events.Event),
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
},
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2],
goog.events.BrowserEvent.prototype.init = function (e, o) {
    var t = this.type = e.type;
    this.target = e.target || e.srcElement,
        this.currentTarget = o;
    var r = e.relatedTarget;
    r ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(r, "nodeName") || (r = null)) : t == goog.events.EventType.MOUSEOVER ? r = e.fromElement : t == goog.events.EventType.MOUSEOUT && (r = e.toElement),
        this.relatedTarget = r,
        this.offsetX = goog.userAgent.WEBKIT || void 0 !== e.offsetX ? e.offsetX : e.layerX,
        this.offsetY = goog.userAgent.WEBKIT || void 0 !== e.offsetY ? e.offsetY : e.layerY,
        this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX,
        this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY,
        this.screenX = e.screenX || 0,
        this.screenY = e.screenY || 0,
        this.button = e.button,
        this.keyCode = e.keyCode || 0,
        this.charCode = e.charCode || ("keypress" == t ? e.keyCode : 0),
        this.ctrlKey = e.ctrlKey,
        this.altKey = e.altKey,
        this.shiftKey = e.shiftKey,
        this.metaKey = e.metaKey,
        this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey,
        this.state = e.state,
        (this.event_ = e).defaultPrevented && this.preventDefault()
}
,
goog.events.BrowserEvent.prototype.isButton = function (e) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == e : "click" == this.type ? e == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[e])
}
,
goog.events.BrowserEvent.prototype.isMouseActionButton = function () {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
}
,
goog.events.BrowserEvent.prototype.stopPropagation = function () {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this),
        this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
}
,
goog.events.BrowserEvent.prototype.preventDefault = function () {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var e = this.event_;
    if (e.preventDefault)
        e.preventDefault();
    else if (e.returnValue = !1,
        goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT)
        try {
            (e.ctrlKey || 112 <= e.keyCode && e.keyCode <= 123) && (e.keyCode = -1)
        } catch (e) { }
}
,
goog.events.BrowserEvent.prototype.getBrowserEvent = function () {
    return this.event_
}
,
goog.provide("goog.events.Listenable"),
goog.provide("goog.events.ListenableKey"),
goog.require("goog.events.EventId"),
goog.events.Listenable = function () { }
,
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1e6 * Math.random() | 0),
goog.events.Listenable.addImplementation = function (e) {
    e.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
}
,
goog.events.Listenable.isImplementedBy = function (e) {
    return !(!e || !e[goog.events.Listenable.IMPLEMENTED_BY_PROP])
}
,
goog.events.Listenable.prototype.listen,
goog.events.Listenable.prototype.listenOnce,
goog.events.Listenable.prototype.unlisten,
goog.events.Listenable.prototype.unlistenByKey,
goog.events.Listenable.prototype.dispatchEvent,
goog.events.Listenable.prototype.removeAllListeners,
goog.events.Listenable.prototype.getParentEventTarget,
goog.events.Listenable.prototype.fireListeners,
goog.events.Listenable.prototype.getListeners,
goog.events.Listenable.prototype.getListener,
goog.events.Listenable.prototype.hasListener,
goog.events.ListenableKey = function () { }
,
goog.events.ListenableKey.counter_ = 0,
goog.events.ListenableKey.reserveKey = function () {
    return ++goog.events.ListenableKey.counter_
}
,
goog.events.ListenableKey.prototype.src,
goog.events.ListenableKey.prototype.type,
goog.events.ListenableKey.prototype.listener,
goog.events.ListenableKey.prototype.capture,
goog.events.ListenableKey.prototype.handler,
goog.events.ListenableKey.prototype.key,
goog.provide("goog.events.Listener"),
goog.require("goog.events.ListenableKey"),
goog.events.Listener = function (e, o, t, r, g, n) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = (new Error).stack),
        this.listener = e,
        this.proxy = o,
        this.src = t,
        this.type = r,
        this.capture = !!g,
        this.handler = n,
        this.key = goog.events.ListenableKey.reserveKey(),
        this.callOnce = !1,
        this.removed = !1
}
,
goog.define("goog.events.Listener.ENABLE_MONITORING", !1),
goog.events.Listener.prototype.creationStack,
goog.events.Listener.prototype.markAsRemoved = function () {
    this.removed = !0,
        this.listener = null,
        this.proxy = null,
        this.src = null,
        this.handler = null
}
,
goog.provide("goog.events.ListenerMap"),
goog.require("goog.array"),
goog.require("goog.events.Listener"),
goog.require("goog.object"),
goog.events.ListenerMap = function (e) {
    this.src = e,
        this.listeners = {},
        this.typeCount_ = 0
}
,
goog.events.ListenerMap.prototype.getTypeCount = function () {
    return this.typeCount_
}
,
goog.events.ListenerMap.prototype.getListenerCount = function () {
    var e = 0;
    for (var o in this.listeners)
        e += this.listeners[o].length;
    return e
}
,
goog.events.ListenerMap.prototype.add = function (e, o, t, r, g) {
    var n, i = e.toString(), a = this.listeners[i];
    a || (a = this.listeners[i] = [],
        this.typeCount_++);
    var s = goog.events.ListenerMap.findListenerIndex_(a, o, r, g);
    return -1 < s ? (n = a[s],
        t || (n.callOnce = !1)) : ((n = new goog.events.Listener(o, null, this.src, i, !!r, g)).callOnce = t,
            a.push(n)),
        n
}
,
goog.events.ListenerMap.prototype.remove = function (e, o, t, r) {
    var g = e.toString();
    if (!(g in this.listeners))
        return !1;
    var n = this.listeners[g]
        , i = goog.events.ListenerMap.findListenerIndex_(n, o, t, r);
    return -1 < i && (n[i].markAsRemoved(),
        goog.array.removeAt(n, i),
        0 == n.length && (delete this.listeners[g],
            this.typeCount_--),
        !0)
}
,
goog.events.ListenerMap.prototype.removeByKey = function (e) {
    var o = e.type;
    if (!(o in this.listeners))
        return !1;
    var t = goog.array.remove(this.listeners[o], e);
    return t && (e.markAsRemoved(),
        0 == this.listeners[o].length && (delete this.listeners[o],
            this.typeCount_--)),
        t
}
,
goog.events.ListenerMap.prototype.removeAll = function (e) {
    var o = e && e.toString()
        , t = 0;
    for (var r in this.listeners)
        if (!o || r == o) {
            for (var g = this.listeners[r], n = 0; n < g.length; n++)
                ++t,
                    g[n].markAsRemoved();
            delete this.listeners[r],
                this.typeCount_--
        }
    return t
}
,
goog.events.ListenerMap.prototype.getListeners = function (e, o) {
    var t = this.listeners[e.toString()]
        , r = [];
    if (t)
        for (var g = 0; g < t.length; ++g) {
            var n = t[g];
            n.capture == o && r.push(n)
        }
    return r
}
,
goog.events.ListenerMap.prototype.getListener = function (e, o, t, r) {
    var g = this.listeners[e.toString()]
        , n = -1;
    return g && (n = goog.events.ListenerMap.findListenerIndex_(g, o, t, r)),
        -1 < n ? g[n] : null
}
,
goog.events.ListenerMap.prototype.hasListener = function (e, r) {
    var g = goog.isDef(e)
        , n = g ? e.toString() : ""
        , i = goog.isDef(r);
    return goog.object.some(this.listeners, function (e, o) {
        for (var t = 0; t < e.length; ++t)
            if (!(g && e[t].type != n || i && e[t].capture != r))
                return !0;
        return !1
    })
}
,
goog.events.ListenerMap.findListenerIndex_ = function (e, o, t, r) {
    for (var g = 0; g < e.length; ++g) {
        var n = e[g];
        if (!n.removed && n.listener == o && n.capture == !!t && n.handler == r)
            return g
    }
    return -1
}
,
goog.provide("goog.events"),
goog.provide("goog.events.CaptureSimulationMode"),
goog.provide("goog.events.Key"),
goog.provide("goog.events.ListenableType"),
goog.require("goog.asserts"),
goog.require("goog.debug.entryPointRegistry"),
goog.require("goog.events.BrowserEvent"),
goog.require("goog.events.BrowserFeature"),
goog.require("goog.events.Listenable"),
goog.require("goog.events.ListenerMap"),
goog.forwardDeclare("goog.debug.ErrorHandler"),
goog.forwardDeclare("goog.events.EventWrapper"),
goog.events.Key,
goog.events.ListenableType,
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1e6 * Math.random() | 0),
goog.events.onString_ = "on",
goog.events.onStringMap_ = {},
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
},
goog.define("goog.events.CAPTURE_SIMULATION_MODE", 2),
goog.events.listenerCountEstimate_ = 0,
goog.events.listen = function (e, o, t, r, g) {
    if (goog.isArray(o)) {
        for (var n = 0; n < o.length; n++)
            goog.events.listen(e, o[n], t, r, g);
        return null
    }
    return t = goog.events.wrapListener(t),
        goog.events.Listenable.isImplementedBy(e) ? e.listen(o, t, r, g) : goog.events.listen_(e, o, t, !1, r, g)
}
,
goog.events.listen_ = function (e, o, t, r, g, n) {
    if (!o)
        throw Error("Invalid event type");
    var i = !!g;
    if (i && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL)
            return goog.asserts.fail("Can not register capture listener in IE8-."),
                null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT)
            return null
    }
    var a = goog.events.getListenerMap_(e);
    a || (e[goog.events.LISTENER_MAP_PROP_] = a = new goog.events.ListenerMap(e));
    var s = a.add(o, t, r, g, n);
    if (s.proxy)
        return s;
    var l = goog.events.getProxy();
    if ((s.proxy = l).src = e,
        l.listener = s,
        e.addEventListener)
        e.addEventListener(o.toString(), l, i);
    else {
        if (!e.attachEvent)
            throw Error("addEventListener and attachEvent are unavailable.");
        e.attachEvent(goog.events.getOnString_(o.toString()), l)
    }
    return goog.events.listenerCountEstimate_++,
        s
}
,
goog.events.getProxy = function () {
    var t = goog.events.handleBrowserEvent_
        , r = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function (e) {
            return t.call(r.src, r.listener, e)
        }
            : function (e) {
                var o = t.call(r.src, r.listener, e);
                if (!o)
                    return o
            }
        ;
    return r
}
,
goog.events.listenOnce = function (e, o, t, r, g) {
    if (goog.isArray(o)) {
        for (var n = 0; n < o.length; n++)
            goog.events.listenOnce(e, o[n], t, r, g);
        return null
    }
    return t = goog.events.wrapListener(t),
        goog.events.Listenable.isImplementedBy(e) ? e.listenOnce(o, t, r, g) : goog.events.listen_(e, o, t, !0, r, g)
}
,
goog.events.listenWithWrapper = function (e, o, t, r, g) {
    o.listen(e, t, r, g)
}
,
goog.events.unlisten = function (e, o, t, r, g) {
    if (goog.isArray(o)) {
        for (var n = 0; n < o.length; n++)
            goog.events.unlisten(e, o[n], t, r, g);
        return null
    }
    if (t = goog.events.wrapListener(t),
        goog.events.Listenable.isImplementedBy(e))
        return e.unlisten(o, t, r, g);
    if (!e)
        return !1;
    var i = !!r
        , a = goog.events.getListenerMap_(e);
    if (a) {
        var s = a.getListener(o, t, i, g);
        if (s)
            return goog.events.unlistenByKey(s)
    }
    return !1
}
,
goog.events.unlistenByKey = function (e) {
    if (goog.isNumber(e))
        return !1;
    var o = e;
    if (!o || o.removed)
        return !1;
    var t = o.src;
    if (goog.events.Listenable.isImplementedBy(t))
        return t.unlistenByKey(o);
    var r = o.type
        , g = o.proxy;
    t.removeEventListener ? t.removeEventListener(r, g, o.capture) : t.detachEvent && t.detachEvent(goog.events.getOnString_(r), g),
        goog.events.listenerCountEstimate_--;
    var n = goog.events.getListenerMap_(t);
    return n ? (n.removeByKey(o),
        0 == n.getTypeCount() && (n.src = null,
            t[goog.events.LISTENER_MAP_PROP_] = null)) : o.markAsRemoved(),
        !0
}
,
goog.events.unlistenWithWrapper = function (e, o, t, r, g) {
    o.unlisten(e, t, r, g)
}
,
goog.events.removeAll = function (e, o) {
    if (!e)
        return 0;
    if (goog.events.Listenable.isImplementedBy(e))
        return e.removeAllListeners(o);
    var t = goog.events.getListenerMap_(e);
    if (!t)
        return 0;
    var r = 0
        , g = o && o.toString();
    for (var n in t.listeners)
        if (!g || n == g)
            for (var i = t.listeners[n].concat(), a = 0; a < i.length; ++a)
                goog.events.unlistenByKey(i[a]) && ++r;
    return r
}
,
goog.events.getListeners = function (e, o, t) {
    if (goog.events.Listenable.isImplementedBy(e))
        return e.getListeners(o, t);
    if (!e)
        return [];
    var r = goog.events.getListenerMap_(e);
    return r ? r.getListeners(o, t) : []
}
,
goog.events.getListener = function (e, o, t, r, g) {
    o = o,
        t = goog.events.wrapListener(t);
    var n = !!r;
    if (goog.events.Listenable.isImplementedBy(e))
        return e.getListener(o, t, n, g);
    if (!e)
        return null;
    var i = goog.events.getListenerMap_(e);
    return i ? i.getListener(o, t, n, g) : null
}
,
goog.events.hasListener = function (e, o, t) {
    if (goog.events.Listenable.isImplementedBy(e))
        return e.hasListener(o, t);
    var r = goog.events.getListenerMap_(e);
    return !!r && r.hasListener(o, t)
}
,
goog.events.expose = function (e) {
    var o = [];
    for (var t in e)
        e[t] && e[t].id ? o.push(t + " = " + e[t] + " (" + e[t].id + ")") : o.push(t + " = " + e[t]);
    return o.join("\n")
}
,
goog.events.getOnString_ = function (e) {
    return e in goog.events.onStringMap_ ? goog.events.onStringMap_[e] : goog.events.onStringMap_[e] = goog.events.onString_ + e
}
,
goog.events.fireListeners = function (e, o, t, r) {
    return goog.events.Listenable.isImplementedBy(e) ? e.fireListeners(o, t, r) : goog.events.fireListeners_(e, o, t, r)
}
,
goog.events.fireListeners_ = function (e, o, t, r) {
    var g = !0
        , n = goog.events.getListenerMap_(e);
    if (n) {
        var i = n.listeners[o.toString()];
        if (i) {
            i = i.concat();
            for (var a = 0; a < i.length; a++) {
                var s = i[a];
                if (s && s.capture == t && !s.removed) {
                    var l = goog.events.fireListener(s, r);
                    g = g && !1 !== l
                }
            }
        }
    }
    return g
}
,
goog.events.fireListener = function (e, o) {
    var t = e.listener
        , r = e.handler || e.src;
    return e.callOnce && goog.events.unlistenByKey(e),
        t.call(r, o)
}
,
goog.events.getTotalListenerCount = function () {
    return goog.events.listenerCountEstimate_
}
,
goog.events.dispatchEvent = function (e, o) {
    return goog.asserts.assert(goog.events.Listenable.isImplementedBy(e), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance."),
        e.dispatchEvent(o)
}
,
goog.events.protectBrowserEventEntryPoint = function (e) {
    goog.events.handleBrowserEvent_ = e.protectEntryPoint(goog.events.handleBrowserEvent_)
}
,
goog.events.handleBrowserEvent_ = function (e, o) {
    if (e.removed)
        return !0;
    if (goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT)
        return goog.events.fireListener(e, new goog.events.BrowserEvent(o, this));
    var t = o || goog.getObjectByName("window.event")
        , r = new goog.events.BrowserEvent(t, this)
        , g = !0;
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
        if (!goog.events.isMarkedIeEvent_(t)) {
            goog.events.markIeEvent_(t);
            for (var n = [], i = r.currentTarget; i; i = i.parentNode)
                n.push(i);
            for (var a = e.type, s = n.length - 1; !r.propagationStopped_ && 0 <= s; s--) {
                r.currentTarget = n[s];
                var l = goog.events.fireListeners_(n[s], a, !0, r);
                g = g && l
            }
            for (s = 0; !r.propagationStopped_ && s < n.length; s++) {
                r.currentTarget = n[s];
                l = goog.events.fireListeners_(n[s], a, !1, r);
                g = g && l
            }
        }
    } else
        g = goog.events.fireListener(e, r);
    return g
}
,
goog.events.markIeEvent_ = function (e) {
    var o = !1;
    if (0 == e.keyCode)
        try {
            return void (e.keyCode = -1)
        } catch (e) {
            o = !0
        }
    !o && null != e.returnValue || (e.returnValue = !0)
}
,
goog.events.isMarkedIeEvent_ = function (e) {
    return e.keyCode < 0 || null != e.returnValue
}
,
goog.events.uniqueIdCounter_ = 0,
goog.events.getUniqueId = function (e) {
    return e + "_" + goog.events.uniqueIdCounter_++
}
,
goog.events.getListenerMap_ = function (e) {
    var o = e[goog.events.LISTENER_MAP_PROP_];
    return o instanceof goog.events.ListenerMap ? o : null
}
,
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1e9 * Math.random() >>> 0),
goog.events.wrapListener = function (o) {
    return goog.asserts.assert(o, "Listener can not be null."),
        goog.isFunction(o) ? o : (goog.asserts.assert(o.handleEvent, "An object listener must have handleEvent method."),
            o[goog.events.LISTENER_WRAPPER_PROP_] || (o[goog.events.LISTENER_WRAPPER_PROP_] = function (e) {
                return o.handleEvent(e)
            }
            ),
            o[goog.events.LISTENER_WRAPPER_PROP_])
}
,
goog.debug.entryPointRegistry.register(function (e) {
    goog.events.handleBrowserEvent_ = e(goog.events.handleBrowserEvent_)
}),
goog.provide("goog.events.EventTarget"),
goog.require("goog.Disposable"),
goog.require("goog.asserts"),
goog.require("goog.events"),
goog.require("goog.events.Event"),
goog.require("goog.events.Listenable"),
goog.require("goog.events.ListenerMap"),
goog.require("goog.object"),
goog.events.EventTarget = function () {
    goog.Disposable.call(this),
        this.eventTargetListeners_ = new goog.events.ListenerMap(this),
        (this.actualEventTarget_ = this).parentEventTarget_ = null
}
,
goog.inherits(goog.events.EventTarget, goog.Disposable),
goog.events.Listenable.addImplementation(goog.events.EventTarget),
goog.events.EventTarget.MAX_ANCESTORS_ = 1e3,
goog.events.EventTarget.prototype.getParentEventTarget = function () {
    return this.parentEventTarget_
}
,
goog.events.EventTarget.prototype.setParentEventTarget = function (e) {
    this.parentEventTarget_ = e
}
,
goog.events.EventTarget.prototype.addEventListener = function (e, o, t, r) {
    goog.events.listen(this, e, o, t, r)
}
,
goog.events.EventTarget.prototype.removeEventListener = function (e, o, t, r) {
    goog.events.unlisten(this, e, o, t, r)
}
,
goog.events.EventTarget.prototype.dispatchEvent = function (e) {
    this.assertInitialized_();
    var o, t = this.getParentEventTarget();
    if (t) {
        o = [];
        for (var r = 1; t; t = t.getParentEventTarget())
            o.push(t),
                goog.asserts.assert(++r < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, e, o)
}
,
goog.events.EventTarget.prototype.disposeInternal = function () {
    goog.events.EventTarget.superClass_.disposeInternal.call(this),
        this.removeAllListeners(),
        this.parentEventTarget_ = null
}
,
goog.events.EventTarget.prototype.listen = function (e, o, t, r) {
    return this.assertInitialized_(),
        this.eventTargetListeners_.add(String(e), o, !1, t, r)
}
,
goog.events.EventTarget.prototype.listenOnce = function (e, o, t, r) {
    return this.eventTargetListeners_.add(String(e), o, !0, t, r)
}
,
goog.events.EventTarget.prototype.unlisten = function (e, o, t, r) {
    return this.eventTargetListeners_.remove(String(e), o, t, r)
}
,
goog.events.EventTarget.prototype.unlistenByKey = function (e) {
    return this.eventTargetListeners_.removeByKey(e)
}
,
goog.events.EventTarget.prototype.removeAllListeners = function (e) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(e) : 0
}
,
goog.events.EventTarget.prototype.fireListeners = function (e, o, t) {
    var r = this.eventTargetListeners_.listeners[String(e)];
    if (!r)
        return !0;
    r = r.concat();
    for (var g = !0, n = 0; n < r.length; ++n) {
        var i = r[n];
        if (i && !i.removed && i.capture == o) {
            var a = i.listener
                , s = i.handler || i.src;
            i.callOnce && this.unlistenByKey(i),
                g = !1 !== a.call(s, t) && g
        }
    }
    return g && 0 != t.returnValue_
}
,
goog.events.EventTarget.prototype.getListeners = function (e, o) {
    return this.eventTargetListeners_.getListeners(String(e), o)
}
,
goog.events.EventTarget.prototype.getListener = function (e, o, t, r) {
    return this.eventTargetListeners_.getListener(String(e), o, t, r)
}
,
goog.events.EventTarget.prototype.hasListener = function (e, o) {
    var t = goog.isDef(e) ? String(e) : void 0;
    return this.eventTargetListeners_.hasListener(t, o)
}
,
goog.events.EventTarget.prototype.setTargetForTesting = function (e) {
    this.actualEventTarget_ = e
}
,
goog.events.EventTarget.prototype.assertInitialized_ = function () {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
}
,
goog.events.EventTarget.dispatchEventInternal_ = function (e, o, t) {
    var r = o.type || o;
    if (goog.isString(o))
        o = new goog.events.Event(o, e);
    else if (o instanceof goog.events.Event)
        o.target = o.target || e;
    else {
        var g = o;
        o = new goog.events.Event(r, e),
            goog.object.extend(o, g)
    }
    var n, i = !0;
    if (t)
        for (var a = t.length - 1; !o.propagationStopped_ && 0 <= a; a--)
            i = (n = o.currentTarget = t[a]).fireListeners(r, !0, o) && i;
    if (o.propagationStopped_ || (i = (n = o.currentTarget = e).fireListeners(r, !0, o) && i,
        o.propagationStopped_ || (i = n.fireListeners(r, !1, o) && i)),
        t)
        for (a = 0; !o.propagationStopped_ && a < t.length; a++)
            i = (n = o.currentTarget = t[a]).fireListeners(r, !1, o) && i;
    return i
}
,
goog.provide("goog.Timer"),
goog.require("goog.Promise"),
goog.require("goog.events.EventTarget"),
goog.Timer = function (e, o) {
    goog.events.EventTarget.call(this),
        this.interval_ = e || 1,
        this.timerObject_ = o || goog.Timer.defaultTimerObject,
        this.boundTick_ = goog.bind(this.tick_, this),
        this.last_ = goog.now()
}
,
goog.inherits(goog.Timer, goog.events.EventTarget),
goog.Timer.MAX_TIMEOUT_ = 2147483647,
goog.Timer.INVALID_TIMEOUT_ID_ = -1,
goog.Timer.prototype.enabled = !1,
goog.Timer.defaultTimerObject = goog.global,
goog.Timer.intervalScale = .8,
goog.Timer.prototype.timer_ = null,
goog.Timer.prototype.getInterval = function () {
    return this.interval_
}
,
goog.Timer.prototype.setInterval = function (e) {
    this.interval_ = e,
        this.timer_ && this.enabled ? (this.stop(),
            this.start()) : this.timer_ && this.stop()
}
,
goog.Timer.prototype.tick_ = function () {
    if (this.enabled) {
        var e = goog.now() - this.last_;
        if (0 < e && e < this.interval_ * goog.Timer.intervalScale)
            return void (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - e));
        this.timer_ && (this.timerObject_.clearTimeout(this.timer_),
            this.timer_ = null),
            this.dispatchTick(),
            this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_),
                this.last_ = goog.now())
    }
}
,
goog.Timer.prototype.dispatchTick = function () {
    this.dispatchEvent(goog.Timer.TICK)
}
,
goog.Timer.prototype.start = function () {
    this.enabled = !0,
        this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_),
            this.last_ = goog.now())
}
,
goog.Timer.prototype.stop = function () {
    this.enabled = !1,
        this.timer_ && (this.timerObject_.clearTimeout(this.timer_),
            this.timer_ = null)
}
,
goog.Timer.prototype.disposeInternal = function () {
    goog.Timer.superClass_.disposeInternal.call(this),
        this.stop(),
        delete this.timerObject_
}
,
goog.Timer.TICK = "tick",
goog.Timer.callOnce = function (e, o, t) {
    if (goog.isFunction(e))
        t && (e = goog.bind(e, t));
    else {
        if (!e || "function" != typeof e.handleEvent)
            throw Error("Invalid listener argument");
        e = goog.bind(e.handleEvent, e)
    }
    return o > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(e, o || 0)
}
,
goog.Timer.clear = function (e) {
    goog.Timer.defaultTimerObject.clearTimeout(e)
}
,
goog.Timer.promise = function (t, r) {
    var g = null;
    return new goog.Promise(function (e, o) {
        (g = goog.Timer.callOnce(function () {
            e(r)
        }, t)) == goog.Timer.INVALID_TIMEOUT_ID_ && o(new Error("Failed to schedule timer."))
    }
    ).thenCatch(function (e) {
        throw goog.Timer.clear(g),
        e
    })
}
,
goog.provide("goog.json"),
goog.provide("goog.json.Replacer"),
goog.provide("goog.json.Reviver"),
goog.provide("goog.json.Serializer"),
goog.define("goog.json.USE_NATIVE_JSON", !1),
goog.json.isValid = function (e) {
    if (/^\s*$/.test(e))
        return !1;
    return /^[\],:{}\s\u2028\u2029]*$/.test(e.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
}
,
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function (s) {
    var o = String(s);
    if (goog.json.isValid(o))
        try {
            return eval("(" + o + ")")
        } catch (e) { }
    throw Error("Invalid JSON string: " + o)
}
,
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function (s) {
    return eval("(" + s + ")")
}
,
goog.json.Replacer,
goog.json.Reviver,
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function (e, o) {
    return new goog.json.Serializer(o).serialize(e)
}
,
goog.json.Serializer = function (e) {
    this.replacer_ = e
}
,
goog.json.Serializer.prototype.serialize = function (e) {
    var o = [];
    return this.serializeInternal(e, o),
        o.join("")
}
,
goog.json.Serializer.prototype.serializeInternal = function (e, o) {
    if (null != e) {
        if ("object" == typeof e) {
            if (goog.isArray(e))
                return void this.serializeArray(e, o);
            if (!(e instanceof String || e instanceof Number || e instanceof Boolean))
                return void this.serializeObject_(e, o);
            e = e.valueOf()
        }
        switch (typeof e) {
            case "string":
                this.serializeString_(e, o);
                break;
            case "number":
                this.serializeNumber_(e, o);
                break;
            case "boolean":
                o.push(e);
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof e)
        }
    } else
        o.push("null")
}
,
goog.json.Serializer.charToJsonCharCache_ = {
    '"': '\\"',
    "\\": "\\\\",
    "/": "\\/",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\u000b"
},
goog.json.Serializer.charsToReplace_ = /\uffff/.test("￿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
goog.json.Serializer.prototype.serializeString_ = function (e, o) {
    o.push('"', e.replace(goog.json.Serializer.charsToReplace_, function (e) {
        var o = goog.json.Serializer.charToJsonCharCache_[e];
        return o || (o = "\\u" + (65536 | e.charCodeAt(0)).toString(16).substr(1),
            goog.json.Serializer.charToJsonCharCache_[e] = o),
            o
    }), '"')
}
,
goog.json.Serializer.prototype.serializeNumber_ = function (e, o) {
    o.push(isFinite(e) && !isNaN(e) ? e : "null")
}
,
goog.json.Serializer.prototype.serializeArray = function (e, o) {
    var t = e.length;
    o.push("[");
    for (var r = "", g = 0; g < t; g++) {
        o.push(r);
        var n = e[g];
        this.serializeInternal(this.replacer_ ? this.replacer_.call(e, String(g), n) : n, o),
            r = ","
    }
    o.push("]")
}
,
goog.json.Serializer.prototype.serializeObject_ = function (e, o) {
    o.push("{");
    var t = "";
    for (var r in e)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
            var g = e[r];
            "function" != typeof g && (o.push(t),
                this.serializeString_(r, o),
                o.push(":"),
                this.serializeInternal(this.replacer_ ? this.replacer_.call(e, r, g) : g, o),
                t = ",")
        }
    o.push("}")
}
,
goog.provide("goog.html.SafeScript"),
goog.require("goog.asserts"),
goog.require("goog.string.Const"),
goog.require("goog.string.TypedString"),
goog.html.SafeScript = function () {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "",
        this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
,
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0,
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
goog.html.SafeScript.fromConstant = function (e) {
    var o = goog.string.Const.unwrap(e);
    return 0 === o.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.SafeScript.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
}
,
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function () {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
}
),
goog.html.SafeScript.unwrap = function (e) {
    return e instanceof goog.html.SafeScript && e.constructor === goog.html.SafeScript && e.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeScriptWrappedValue_ : (goog.asserts.fail("expected object of type SafeScript, got '" + e + "'"),
        "type_error:SafeScript")
}
,
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function (e) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(e)
}
,
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (e) {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = e,
        this
}
,
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(""),
goog.provide("goog.html.uncheckedconversions"),
goog.require("goog.asserts"),
goog.require("goog.html.SafeHtml"),
goog.require("goog.html.SafeScript"),
goog.require("goog.html.SafeStyle"),
goog.require("goog.html.SafeStyleSheet"),
goog.require("goog.html.SafeUrl"),
goog.require("goog.html.TrustedResourceUrl"),
goog.require("goog.string"),
goog.require("goog.string.Const"),
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function (e, o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"),
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"),
        goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(o, t || null)
}
,
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function (e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"),
        goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(e)), "must provide non-empty justification"),
        goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function (e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"),
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"),
        goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function (e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"),
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"),
        goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function (e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"),
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"),
        goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function (e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"),
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"),
        goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(o)
}
,
goog.provide("goog.structs"),
goog.require("goog.array"),
goog.require("goog.object"),
goog.structs.getCount = function (e) {
    return "function" == typeof e.getCount ? e.getCount() : goog.isArrayLike(e) || goog.isString(e) ? e.length : goog.object.getCount(e)
}
,
goog.structs.getValues = function (e) {
    if ("function" == typeof e.getValues)
        return e.getValues();
    if (goog.isString(e))
        return e.split("");
    if (goog.isArrayLike(e)) {
        for (var o = [], t = e.length, r = 0; r < t; r++)
            o.push(e[r]);
        return o
    }
    return goog.object.getValues(e)
}
,
goog.structs.getKeys = function (e) {
    if ("function" == typeof e.getKeys)
        return e.getKeys();
    if ("function" != typeof e.getValues) {
        if (goog.isArrayLike(e) || goog.isString(e)) {
            for (var o = [], t = e.length, r = 0; r < t; r++)
                o.push(r);
            return o
        }
        return goog.object.getKeys(e)
    }
}
,
goog.structs.contains = function (e, o) {
    return "function" == typeof e.contains ? e.contains(o) : "function" == typeof e.containsValue ? e.containsValue(o) : goog.isArrayLike(e) || goog.isString(e) ? goog.array.contains(e, o) : goog.object.containsValue(e, o)
}
,
goog.structs.isEmpty = function (e) {
    return "function" == typeof e.isEmpty ? e.isEmpty() : goog.isArrayLike(e) || goog.isString(e) ? goog.array.isEmpty(e) : goog.object.isEmpty(e)
}
,
goog.structs.clear = function (e) {
    "function" == typeof e.clear ? e.clear() : goog.isArrayLike(e) ? goog.array.clear(e) : goog.object.clear(e)
}
,
goog.structs.forEach = function (e, o, t) {
    if ("function" == typeof e.forEach)
        e.forEach(o, t);
    else if (goog.isArrayLike(e) || goog.isString(e))
        goog.array.forEach(e, o, t);
    else
        for (var r = goog.structs.getKeys(e), g = goog.structs.getValues(e), n = g.length, i = 0; i < n; i++)
            o.call(t, g[i], r && r[i], e)
}
,
goog.structs.filter = function (e, o, t) {
    if ("function" == typeof e.filter)
        return e.filter(o, t);
    if (goog.isArrayLike(e) || goog.isString(e))
        return goog.array.filter(e, o, t);
    var r, g = goog.structs.getKeys(e), n = goog.structs.getValues(e), i = n.length;
    if (g) {
        r = {};
        for (var a = 0; a < i; a++)
            o.call(t, n[a], g[a], e) && (r[g[a]] = n[a])
    } else {
        r = [];
        for (a = 0; a < i; a++)
            o.call(t, n[a], void 0, e) && r.push(n[a])
    }
    return r
}
,
goog.structs.map = function (e, o, t) {
    if ("function" == typeof e.map)
        return e.map(o, t);
    if (goog.isArrayLike(e) || goog.isString(e))
        return goog.array.map(e, o, t);
    var r, g = goog.structs.getKeys(e), n = goog.structs.getValues(e), i = n.length;
    if (g) {
        r = {};
        for (var a = 0; a < i; a++)
            r[g[a]] = o.call(t, n[a], g[a], e)
    } else {
        r = [];
        for (a = 0; a < i; a++)
            r[a] = o.call(t, n[a], void 0, e)
    }
    return r
}
,
goog.structs.some = function (e, o, t) {
    if ("function" == typeof e.some)
        return e.some(o, t);
    if (goog.isArrayLike(e) || goog.isString(e))
        return goog.array.some(e, o, t);
    for (var r = goog.structs.getKeys(e), g = goog.structs.getValues(e), n = g.length, i = 0; i < n; i++)
        if (o.call(t, g[i], r && r[i], e))
            return !0;
    return !1
}
,
goog.structs.every = function (e, o, t) {
    if ("function" == typeof e.every)
        return e.every(o, t);
    if (goog.isArrayLike(e) || goog.isString(e))
        return goog.array.every(e, o, t);
    for (var r = goog.structs.getKeys(e), g = goog.structs.getValues(e), n = g.length, i = 0; i < n; i++)
        if (!o.call(t, g[i], r && r[i], e))
            return !1;
    return !0
}
,
goog.provide("goog.structs.Collection"),
goog.structs.Collection = function () { }
,
goog.structs.Collection.prototype.add,
goog.structs.Collection.prototype.remove,
goog.structs.Collection.prototype.contains,
goog.structs.Collection.prototype.getCount,
goog.provide("goog.iter"),
goog.provide("goog.iter.Iterable"),
goog.provide("goog.iter.Iterator"),
goog.provide("goog.iter.StopIteration"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.functions"),
goog.require("goog.math"),
goog.iter.Iterable,
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
},
goog.iter.Iterator = function () { }
,
goog.iter.Iterator.prototype.next = function () {
    throw goog.iter.StopIteration
}
,
goog.iter.Iterator.prototype.__iterator__ = function (e) {
    return this
}
,
goog.iter.toIterator = function (e) {
    if (e instanceof goog.iter.Iterator)
        return e;
    if ("function" == typeof e.__iterator__)
        return e.__iterator__(!1);
    if (goog.isArrayLike(e)) {
        var o = 0
            , t = new goog.iter.Iterator;
        return t.next = function () {
            for (; ;) {
                if (o >= e.length)
                    throw goog.iter.StopIteration;
                if (o in e)
                    return e[o++];
                o++
            }
        }
            ,
            t
    }
    throw Error("Not implemented")
}
,
goog.iter.forEach = function (e, o, t) {
    if (goog.isArrayLike(e))
        try {
            goog.array.forEach(e, o, t)
        } catch (e) {
            if (e !== goog.iter.StopIteration)
                throw e
        }
    else {
        e = goog.iter.toIterator(e);
        try {
            for (; ;)
                o.call(t, e.next(), void 0, e)
        } catch (e) {
            if (e !== goog.iter.StopIteration)
                throw e
        }
    }
}
,
goog.iter.filter = function (e, o, t) {
    var r = goog.iter.toIterator(e)
        , g = new goog.iter.Iterator;
    return g.next = function () {
        for (; ;) {
            var e = r.next();
            if (o.call(t, e, void 0, r))
                return e
        }
    }
        ,
        g
}
,
goog.iter.filterFalse = function (e, o, t) {
    return goog.iter.filter(e, goog.functions.not(o), t)
}
,
goog.iter.range = function (e, o, t) {
    var r = 0
        , g = e
        , n = t || 1;
    if (1 < arguments.length && (r = e,
        g = o),
        0 == n)
        throw Error("Range step argument must not be zero");
    var i = new goog.iter.Iterator;
    return i.next = function () {
        if (0 < n && g <= r || n < 0 && r <= g)
            throw goog.iter.StopIteration;
        var e = r;
        return r += n,
            e
    }
        ,
        i
}
,
goog.iter.join = function (e, o) {
    return goog.iter.toArray(e).join(o)
}
,
goog.iter.map = function (e, o, t) {
    var r = goog.iter.toIterator(e)
        , g = new goog.iter.Iterator;
    return g.next = function () {
        var e = r.next();
        return o.call(t, e, void 0, r)
    }
        ,
        g
}
,
goog.iter.reduce = function (e, o, t, r) {
    var g = t;
    return goog.iter.forEach(e, function (e) {
        g = o.call(r, g, e)
    }),
        g
}
,
goog.iter.some = function (e, o, t) {
    e = goog.iter.toIterator(e);
    try {
        for (; ;)
            if (o.call(t, e.next(), void 0, e))
                return !0
    } catch (e) {
        if (e !== goog.iter.StopIteration)
            throw e
    }
    return !1
}
,
goog.iter.every = function (e, o, t) {
    e = goog.iter.toIterator(e);
    try {
        for (; ;)
            if (!o.call(t, e.next(), void 0, e))
                return !1
    } catch (e) {
        if (e !== goog.iter.StopIteration)
            throw e
    }
    return !0
}
,
goog.iter.chain = function (e) {
    return goog.iter.chainFromIterable(arguments)
}
,
goog.iter.chainFromIterable = function (e) {
    var o = goog.iter.toIterator(e)
        , t = new goog.iter.Iterator
        , r = null;
    return t.next = function () {
        for (; ;) {
            if (null == r) {
                var e = o.next();
                r = goog.iter.toIterator(e)
            }
            try {
                return r.next()
            } catch (e) {
                if (e !== goog.iter.StopIteration)
                    throw e;
                r = null
            }
        }
    }
        ,
        t
}
,
goog.iter.dropWhile = function (e, o, t) {
    var r = goog.iter.toIterator(e)
        , g = new goog.iter.Iterator
        , n = !0;
    return g.next = function () {
        for (; ;) {
            var e = r.next();
            if (!n || !o.call(t, e, void 0, r))
                return n = !1,
                    e
        }
    }
        ,
        g
}
,
goog.iter.takeWhile = function (e, o, t) {
    var r = goog.iter.toIterator(e)
        , g = new goog.iter.Iterator;
    return g.next = function () {
        var e = r.next();
        if (o.call(t, e, void 0, r))
            return e;
        throw goog.iter.StopIteration
    }
        ,
        g
}
,
goog.iter.toArray = function (e) {
    if (goog.isArrayLike(e))
        return goog.array.toArray(e);
    e = goog.iter.toIterator(e);
    var o = [];
    return goog.iter.forEach(e, function (e) {
        o.push(e)
    }),
        o
}
,
goog.iter.equals = function (e, o, t) {
    var r = goog.iter.zipLongest({}, e, o)
        , g = t || goog.array.defaultCompareEquality;
    return goog.iter.every(r, function (e) {
        return g(e[0], e[1])
    })
}
,
goog.iter.nextOrValue = function (e, o) {
    try {
        return goog.iter.toIterator(e).next()
    } catch (e) {
        if (e != goog.iter.StopIteration)
            throw e;
        return o
    }
}
,
goog.iter.product = function (e) {
    if (goog.array.some(arguments, function (e) {
        return !e.length
    }) || !arguments.length)
        return new goog.iter.Iterator;
    var o = new goog.iter.Iterator
        , t = arguments
        , r = goog.array.repeat(0, t.length);
    return o.next = function () {
        if (r) {
            for (var e = goog.array.map(r, function (e, o) {
                return t[o][e]
            }), o = r.length - 1; 0 <= o; o--) {
                if (goog.asserts.assert(r),
                    r[o] < t[o].length - 1) {
                    r[o]++;
                    break
                }
                if (0 == o) {
                    r = null;
                    break
                }
                r[o] = 0
            }
            return e
        }
        throw goog.iter.StopIteration
    }
        ,
        o
}
,
goog.iter.cycle = function (e) {
    var o = goog.iter.toIterator(e)
        , t = []
        , r = 0
        , g = new goog.iter.Iterator
        , n = !1;
    return g.next = function () {
        var e = null;
        if (!n)
            try {
                return e = o.next(),
                    t.push(e),
                    e
            } catch (e) {
                if (e != goog.iter.StopIteration || goog.array.isEmpty(t))
                    throw e;
                n = !0
            }
        return e = t[r],
            r = (r + 1) % t.length,
            e
    }
        ,
        g
}
,
goog.iter.count = function (e, o) {
    var t = e || 0
        , r = goog.isDef(o) ? o : 1
        , g = new goog.iter.Iterator;
    return g.next = function () {
        var e = t;
        return t += r,
            e
    }
        ,
        g
}
,
goog.iter.repeat = function (e) {
    var o = new goog.iter.Iterator;
    return o.next = goog.functions.constant(e),
        o
}
,
goog.iter.accumulate = function (e) {
    var o = goog.iter.toIterator(e)
        , t = 0
        , r = new goog.iter.Iterator;
    return r.next = function () {
        return t += o.next()
    }
        ,
        r
}
,
goog.iter.zip = function (e) {
    var o = arguments
        , t = new goog.iter.Iterator;
    if (0 < o.length) {
        var r = goog.array.map(o, goog.iter.toIterator);
        t.next = function () {
            return goog.array.map(r, function (e) {
                return e.next()
            })
        }
    }
    return t
}
,
goog.iter.zipLongest = function (r, e) {
    var o = goog.array.slice(arguments, 1)
        , t = new goog.iter.Iterator;
    if (0 < o.length) {
        var g = goog.array.map(o, goog.iter.toIterator);
        t.next = function () {
            var t = !1
                , e = goog.array.map(g, function (e) {
                    var o;
                    try {
                        o = e.next(),
                            t = !0
                    } catch (e) {
                        if (e !== goog.iter.StopIteration)
                            throw e;
                        o = r
                    }
                    return o
                });
            if (!t)
                throw goog.iter.StopIteration;
            return e
        }
    }
    return t
}
,
goog.iter.compress = function (e, o) {
    var t = goog.iter.toIterator(o);
    return goog.iter.filter(e, function () {
        return !!t.next()
    })
}
,
goog.iter.GroupByIterator_ = function (e, o) {
    this.iterator = goog.iter.toIterator(e),
        this.keyFunc = o || goog.functions.identity,
        this.targetKey,
        this.currentKey,
        this.currentValue
}
,
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator),
goog.iter.GroupByIterator_.prototype.next = function () {
    for (; this.currentKey == this.targetKey;)
        this.currentValue = this.iterator.next(),
            this.currentKey = this.keyFunc(this.currentValue);
    return this.targetKey = this.currentKey,
        [this.currentKey, this.groupItems_(this.targetKey)]
}
,
goog.iter.GroupByIterator_.prototype.groupItems_ = function (e) {
    for (var o = []; this.currentKey == e;) {
        o.push(this.currentValue);
        try {
            this.currentValue = this.iterator.next()
        } catch (e) {
            if (e !== goog.iter.StopIteration)
                throw e;
            break
        }
        this.currentKey = this.keyFunc(this.currentValue)
    }
    return o
}
,
goog.iter.groupBy = function (e, o) {
    return new goog.iter.GroupByIterator_(e, o)
}
,
goog.iter.starMap = function (e, o, t) {
    var r = goog.iter.toIterator(e)
        , g = new goog.iter.Iterator;
    return g.next = function () {
        var e = goog.iter.toArray(r.next());
        return o.apply(t, goog.array.concat(e, void 0, r))
    }
        ,
        g
}
,
goog.iter.tee = function (e, o) {
    var t = goog.iter.toIterator(e)
        , r = goog.isNumber(o) ? o : 2
        , g = goog.array.map(goog.array.range(r), function () {
            return []
        });
    return goog.array.map(g, function (e) {
        var o = new goog.iter.Iterator;
        return o.next = function () {
            return goog.array.isEmpty(e) && function () {
                var o = t.next();
                goog.array.forEach(g, function (e) {
                    e.push(o)
                })
            }(),
                goog.asserts.assert(!goog.array.isEmpty(e)),
                e.shift()
        }
            ,
            o
    })
}
,
goog.iter.enumerate = function (e, o) {
    return goog.iter.zip(goog.iter.count(o), e)
}
,
goog.iter.limit = function (e, o) {
    goog.asserts.assert(goog.math.isInt(o) && 0 <= o);
    var t = goog.iter.toIterator(e)
        , r = new goog.iter.Iterator
        , g = o;
    return r.next = function () {
        if (0 < g--)
            return t.next();
        throw goog.iter.StopIteration
    }
        ,
        r
}
,
goog.iter.consume = function (e, o) {
    goog.asserts.assert(goog.math.isInt(o) && 0 <= o);
    for (var t = goog.iter.toIterator(e); 0 < o--;)
        goog.iter.nextOrValue(t, null);
    return t
}
,
goog.iter.slice = function (e, o, t) {
    goog.asserts.assert(goog.math.isInt(o) && 0 <= o);
    var r = goog.iter.consume(e, o);
    return goog.isNumber(t) && (goog.asserts.assert(goog.math.isInt(t) && o <= t),
        r = goog.iter.limit(r, t - o)),
        r
}
,
goog.iter.hasDuplicates_ = function (e) {
    var o = [];
    return goog.array.removeDuplicates(e, o),
        e.length != o.length
}
,
goog.iter.permutations = function (e, o) {
    var t = goog.iter.toArray(e)
        , r = goog.isNumber(o) ? o : t.length
        , g = goog.array.repeat(t, r)
        , n = goog.iter.product.apply(void 0, g);
    return goog.iter.filter(n, function (e) {
        return !goog.iter.hasDuplicates_(e)
    })
}
,
goog.iter.combinations = function (e, o) {
    var t = goog.iter.toArray(e)
        , r = goog.iter.range(t.length)
        , g = goog.iter.permutations(r, o)
        , n = goog.iter.filter(g, function (e) {
            return goog.array.isSorted(e)
        })
        , i = new goog.iter.Iterator;
    function a(e) {
        return t[e]
    }
    return i.next = function () {
        return goog.array.map(n.next(), a)
    }
        ,
        i
}
,
goog.iter.combinationsWithReplacement = function (e, o) {
    var t = goog.iter.toArray(e)
        , r = goog.array.range(t.length)
        , g = goog.array.repeat(r, o)
        , n = goog.iter.product.apply(void 0, g)
        , i = goog.iter.filter(n, function (e) {
            return goog.array.isSorted(e)
        })
        , a = new goog.iter.Iterator;
    function s(e) {
        return t[e]
    }
    return a.next = function () {
        return goog.array.map(i.next(), s)
    }
        ,
        a
}
,
goog.provide("goog.structs.Map"),
goog.require("goog.iter.Iterator"),
goog.require("goog.iter.StopIteration"),
goog.require("goog.object"),
goog.structs.Map = function (e, o) {
    this.map_ = {},
        this.keys_ = [],
        this.count_ = 0,
        this.version_ = 0;
    var t = arguments.length;
    if (1 < t) {
        if (t % 2)
            throw Error("Uneven number of arguments");
        for (var r = 0; r < t; r += 2)
            this.set(arguments[r], arguments[r + 1])
    } else
        e && this.addAll(e)
}
,
goog.structs.Map.prototype.getCount = function () {
    return this.count_
}
,
goog.structs.Map.prototype.getValues = function () {
    this.cleanupKeysArray_();
    for (var e = [], o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o];
        e.push(this.map_[t])
    }
    return e
}
,
goog.structs.Map.prototype.getKeys = function () {
    return this.cleanupKeysArray_(),
        this.keys_.concat()
}
,
goog.structs.Map.prototype.containsKey = function (e) {
    return goog.structs.Map.hasKey_(this.map_, e)
}
,
goog.structs.Map.prototype.containsValue = function (e) {
    for (var o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o];
        if (goog.structs.Map.hasKey_(this.map_, t) && this.map_[t] == e)
            return !0
    }
    return !1
}
,
goog.structs.Map.prototype.equals = function (e, o) {
    if (this === e)
        return !0;
    if (this.count_ != e.getCount())
        return !1;
    var t = o || goog.structs.Map.defaultEquals;
    this.cleanupKeysArray_();
    for (var r, g = 0; r = this.keys_[g]; g++)
        if (!t(this.get(r), e.get(r)))
            return !1;
    return !0
}
,
goog.structs.Map.defaultEquals = function (e, o) {
    return e === o
}
,
goog.structs.Map.prototype.isEmpty = function () {
    return 0 == this.count_
}
,
goog.structs.Map.prototype.clear = function () {
    this.map_ = {},
        this.keys_.length = 0,
        this.count_ = 0,
        this.version_ = 0
}
,
goog.structs.Map.prototype.remove = function (e) {
    return !!goog.structs.Map.hasKey_(this.map_, e) && (delete this.map_[e],
        this.count_--,
        this.version_++,
        this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(),
        !0)
}
,
goog.structs.Map.prototype.cleanupKeysArray_ = function () {
    if (this.count_ != this.keys_.length) {
        for (var e = 0, o = 0; e < this.keys_.length;) {
            var t = this.keys_[e];
            goog.structs.Map.hasKey_(this.map_, t) && (this.keys_[o++] = t),
                e++
        }
        this.keys_.length = o
    }
    if (this.count_ != this.keys_.length) {
        var r = {};
        for (e = 0,
            o = 0; e < this.keys_.length;) {
            t = this.keys_[e];
            goog.structs.Map.hasKey_(r, t) || (r[this.keys_[o++] = t] = 1),
                e++
        }
        this.keys_.length = o
    }
}
,
goog.structs.Map.prototype.get = function (e, o) {
    return goog.structs.Map.hasKey_(this.map_, e) ? this.map_[e] : o
}
,
goog.structs.Map.prototype.set = function (e, o) {
    goog.structs.Map.hasKey_(this.map_, e) || (this.count_++,
        this.keys_.push(e),
        this.version_++),
        this.map_[e] = o
}
,
goog.structs.Map.prototype.addAll = function (e) {
    var o, t;
    t = e instanceof goog.structs.Map ? (o = e.getKeys(),
        e.getValues()) : (o = goog.object.getKeys(e),
            goog.object.getValues(e));
    for (var r = 0; r < o.length; r++)
        this.set(o[r], t[r])
}
,
goog.structs.Map.prototype.forEach = function (e, o) {
    for (var t = this.getKeys(), r = 0; r < t.length; r++) {
        var g = t[r]
            , n = this.get(g);
        e.call(o, n, g, this)
    }
}
,
goog.structs.Map.prototype.clone = function () {
    return new goog.structs.Map(this)
}
,
goog.structs.Map.prototype.transpose = function () {
    for (var e = new goog.structs.Map, o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o]
            , r = this.map_[t];
        e.set(r, t)
    }
    return e
}
,
goog.structs.Map.prototype.toObject = function () {
    this.cleanupKeysArray_();
    for (var e = {}, o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o];
        e[t] = this.map_[t]
    }
    return e
}
,
goog.structs.Map.prototype.getKeyIterator = function () {
    return this.__iterator__(!0)
}
,
goog.structs.Map.prototype.getValueIterator = function () {
    return this.__iterator__(!1)
}
,
goog.structs.Map.prototype.__iterator__ = function (o) {
    this.cleanupKeysArray_();
    var t = 0
        , r = this.version_
        , g = this
        , e = new goog.iter.Iterator;
    return e.next = function () {
        if (r != g.version_)
            throw Error("The map has changed since the iterator was created");
        if (t >= g.keys_.length)
            throw goog.iter.StopIteration;
        var e = g.keys_[t++];
        return o ? e : g.map_[e]
    }
        ,
        e
}
,
goog.structs.Map.hasKey_ = function (e, o) {
    return Object.prototype.hasOwnProperty.call(e, o)
}
,
goog.provide("goog.structs.Set"),
goog.require("goog.structs"),
goog.require("goog.structs.Collection"),
goog.require("goog.structs.Map"),
goog.structs.Set = function (e) {
    this.map_ = new goog.structs.Map,
        e && this.addAll(e)
}
,
goog.structs.Set.getKey_ = function (e) {
    var o = typeof e;
    return "object" == o && e || "function" == o ? "o" + goog.getUid(e) : o.substr(0, 1) + e
}
,
goog.structs.Set.prototype.getCount = function () {
    return this.map_.getCount()
}
,
goog.structs.Set.prototype.add = function (e) {
    this.map_.set(goog.structs.Set.getKey_(e), e)
}
,
goog.structs.Set.prototype.addAll = function (e) {
    for (var o = goog.structs.getValues(e), t = o.length, r = 0; r < t; r++)
        this.add(o[r])
}
,
goog.structs.Set.prototype.removeAll = function (e) {
    for (var o = goog.structs.getValues(e), t = o.length, r = 0; r < t; r++)
        this.remove(o[r])
}
,
goog.structs.Set.prototype.remove = function (e) {
    return this.map_.remove(goog.structs.Set.getKey_(e))
}
,
goog.structs.Set.prototype.clear = function () {
    this.map_.clear()
}
,
goog.structs.Set.prototype.isEmpty = function () {
    return this.map_.isEmpty()
}
,
goog.structs.Set.prototype.contains = function (e) {
    return this.map_.containsKey(goog.structs.Set.getKey_(e))
}
,
goog.structs.Set.prototype.containsAll = function (e) {
    return goog.structs.every(e, this.contains, this)
}
,
goog.structs.Set.prototype.intersection = function (e) {
    for (var o = new goog.structs.Set, t = goog.structs.getValues(e), r = 0; r < t.length; r++) {
        var g = t[r];
        this.contains(g) && o.add(g)
    }
    return o
}
,
goog.structs.Set.prototype.difference = function (e) {
    var o = this.clone();
    return o.removeAll(e),
        o
}
,
goog.structs.Set.prototype.getValues = function () {
    return this.map_.getValues()
}
,
goog.structs.Set.prototype.clone = function () {
    return new goog.structs.Set(this)
}
,
goog.structs.Set.prototype.equals = function (e) {
    return this.getCount() == goog.structs.getCount(e) && this.isSubsetOf(e)
}
,
goog.structs.Set.prototype.isSubsetOf = function (o) {
    var e = goog.structs.getCount(o);
    return !(this.getCount() > e) && (!(o instanceof goog.structs.Set) && 5 < e && (o = new goog.structs.Set(o)),
        goog.structs.every(this, function (e) {
            return goog.structs.contains(o, e)
        }))
}
,
goog.structs.Set.prototype.__iterator__ = function (e) {
    return this.map_.__iterator__(!1)
}
,
goog.provide("goog.debug"),
goog.require("goog.array"),
goog.require("goog.html.SafeHtml"),
goog.require("goog.html.SafeUrl"),
goog.require("goog.html.uncheckedconversions"),
goog.require("goog.string.Const"),
goog.require("goog.structs.Set"),
goog.require("goog.userAgent"),
goog.define("goog.debug.LOGGING_ENABLED", goog.DEBUG),
goog.debug.catchErrors = function (n, e, o) {
    var t = o || goog.global
        , i = t.onerror
        , a = !!e;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (a = !a),
        t.onerror = function (e, o, t, r, g) {
            return i && i(e, o, t, r, g),
                n({
                    message: e,
                    fileName: o,
                    line: t,
                    col: r,
                    error: g
                }),
                a
        }
}
,
goog.debug.expose = function (e, o) {
    if (void 0 === e)
        return "undefined";
    if (null == e)
        return "NULL";
    var t = [];
    for (var r in e)
        if (o || !goog.isFunction(e[r])) {
            var g = r + " = ";
            try {
                g += e[r]
            } catch (e) {
                g += "*** " + e + " ***"
            }
            t.push(g)
        }
    return t.join("\n")
}
,
goog.debug.deepExpose = function (e, a) {
    var s = []
        , l = function (e, o, t) {
            function r(e) {
                return e.replace(/\n/g, "\n" + o)
            }
            var g = o + "  "
                , n = new goog.structs.Set(t);
            try {
                if (goog.isDef(e))
                    if (goog.isNull(e))
                        s.push("NULL");
                    else if (goog.isString(e))
                        s.push('"' + r(e) + '"');
                    else if (goog.isFunction(e))
                        s.push(r(String(e)));
                    else if (goog.isObject(e))
                        if (n.contains(e))
                            s.push("*** reference loop detected ***");
                        else {
                            for (var i in n.add(e),
                                s.push("{"),
                                e)
                                !a && goog.isFunction(e[i]) || (s.push("\n"),
                                    s.push(g),
                                    s.push(i + " = "),
                                    l(e[i], g, n));
                            s.push("\n" + o + "}")
                        }
                    else
                        s.push(e);
                else
                    s.push("undefined")
            } catch (e) {
                s.push("*** " + e + " ***")
            }
        };
    return l(e, "", new goog.structs.Set),
        s.join("")
}
,
goog.debug.exposeArray = function (e) {
    for (var o = [], t = 0; t < e.length; t++)
        goog.isArray(e[t]) ? o.push(goog.debug.exposeArray(e[t])) : o.push(e[t]);
    return "[ " + o.join(", ") + " ]"
}
,
goog.debug.exposeException = function (e, o) {
    var t = goog.debug.exposeExceptionAsHtml(e, o);
    return goog.html.SafeHtml.unwrap(t)
}
,
goog.debug.exposeExceptionAsHtml = function (e, o) {
    try {
        var t = goog.debug.normalizeErrorObject(e)
            , r = goog.debug.createViewSourceUrl_(t.fileName);
        return goog.html.SafeHtml.concat(goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Message: " + t.message + "\nUrl: "), goog.html.SafeHtml.create("a", {
            href: r,
            target: "_new"
        }, t.fileName), goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("\nLine: " + t.lineNumber + "\n\nBrowser stack:\n" + t.stack + "-> [end]\n\nJS stack traversal:\n" + goog.debug.getStacktrace(o) + "-> "))
    } catch (e) {
        return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + e)
    }
}
,
goog.debug.createViewSourceUrl_ = function (e) {
    if (goog.isDefAndNotNull(e) || (e = ""),
        !/^https?:\/\//i.test(e))
        return goog.html.SafeUrl.fromConstant(goog.string.Const.from("sanitizedviewsrc"));
    var o = goog.html.SafeUrl.sanitize(e);
    return goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + goog.html.SafeUrl.unwrap(o))
}
,
goog.debug.normalizeErrorObject = function (e) {
    var o, t, r = goog.getObjectByName("window.location.href");
    if (goog.isString(e))
        return {
            message: e,
            name: "Unknown error",
            lineNumber: "Not available",
            fileName: r,
            stack: "Not available"
        };
    var g = !1;
    try {
        o = e.lineNumber || e.line || "Not available"
    } catch (e) {
        o = "Not available",
            g = !0
    }
    try {
        t = e.fileName || e.filename || e.sourceURL || goog.global.$googDebugFname || r
    } catch (e) {
        t = "Not available",
            g = !0
    }
    return !g && e.lineNumber && e.fileName && e.stack && e.message && e.name ? e : {
        message: e.message || "Not available",
        name: e.name || "UnknownError",
        lineNumber: o,
        fileName: t,
        stack: e.stack || "Not available"
    }
}
,
goog.debug.enhanceError = function (e, o) {
    var t;
    if ("string" == typeof e ? (t = Error(e),
        Error.captureStackTrace && Error.captureStackTrace(t, goog.debug.enhanceError)) : t = e,
        t.stack || (t.stack = goog.debug.getStacktrace(goog.debug.enhanceError)),
        o) {
        for (var r = 0; t["message" + r];)
            ++r;
        t["message" + r] = String(o)
    }
    return t
}
,
goog.debug.getStacktraceSimple = function (e) {
    if (goog.STRICT_MODE_COMPATIBLE) {
        var o = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
        if (o)
            return o
    }
    for (var t = [], r = arguments.callee.caller, g = 0; r && (!e || g < e);) {
        t.push(goog.debug.getFunctionName(r)),
            t.push("()\n");
        try {
            r = r.caller
        } catch (e) {
            t.push("[exception trying to get caller]\n");
            break
        }
        if (++g >= goog.debug.MAX_STACK_DEPTH) {
            t.push("[...long stack...]");
            break
        }
    }
    return e && e <= g ? t.push("[...reached max depth limit...]") : t.push("[end]"),
        t.join("")
}
,
goog.debug.MAX_STACK_DEPTH = 50,
goog.debug.getNativeStackTrace_ = function (e) {
    var o = new Error;
    if (Error.captureStackTrace)
        return Error.captureStackTrace(o, e),
            String(o.stack);
    try {
        throw o
    } catch (e) {
        o = e
    }
    var t = o.stack;
    return t ? String(t) : null
}
,
goog.debug.getStacktrace = function (e) {
    var o;
    if (goog.STRICT_MODE_COMPATIBLE) {
        var t = e || goog.debug.getStacktrace;
        o = goog.debug.getNativeStackTrace_(t)
    }
    return o = o || goog.debug.getStacktraceHelper_(e || arguments.callee.caller, [])
}
,
goog.debug.getStacktraceHelper_ = function (e, o) {
    var t = [];
    if (goog.array.contains(o, e))
        t.push("[...circular reference...]");
    else if (e && o.length < goog.debug.MAX_STACK_DEPTH) {
        t.push(goog.debug.getFunctionName(e) + "(");
        for (var r = e.arguments, g = 0; r && g < r.length; g++) {
            var n;
            0 < g && t.push(", ");
            var i = r[g];
            switch (typeof i) {
                case "object":
                    n = i ? "object" : "null";
                    break;
                case "string":
                    n = i;
                    break;
                case "number":
                    n = String(i);
                    break;
                case "boolean":
                    n = i ? "true" : "false";
                    break;
                case "function":
                    n = (n = goog.debug.getFunctionName(i)) || "[fn]";
                    break;
                case "undefined":
                default:
                    n = typeof i
            }
            40 < n.length && (n = n.substr(0, 40) + "..."),
                t.push(n)
        }
        o.push(e),
            t.push(")\n");
        try {
            t.push(goog.debug.getStacktraceHelper_(e.caller, o))
        } catch (e) {
            t.push("[exception trying to get caller]\n")
        }
    } else
        e ? t.push("[...long stack...]") : t.push("[end]");
    return t.join("")
}
,
goog.debug.setFunctionResolver = function (e) {
    goog.debug.fnNameResolver_ = e
}
,
goog.debug.getFunctionName = function (e) {
    if (goog.debug.fnNameCache_[e])
        return goog.debug.fnNameCache_[e];
    if (goog.debug.fnNameResolver_) {
        var o = goog.debug.fnNameResolver_(e);
        if (o)
            return goog.debug.fnNameCache_[e] = o
    }
    var t = String(e);
    if (!goog.debug.fnNameCache_[t]) {
        var r = /function ([^\(]+)/.exec(t);
        if (r) {
            var g = r[1];
            goog.debug.fnNameCache_[t] = g
        } else
            goog.debug.fnNameCache_[t] = "[Anonymous]"
    }
    return goog.debug.fnNameCache_[t]
}
,
goog.debug.makeWhitespaceVisible = function (e) {
    return e.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
}
,
goog.debug.runtimeType = function (e) {
    return e instanceof Function ? e.displayName || e.name || "unknown type name" : e instanceof Object ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : null === e ? "null" : typeof e
}
,
goog.debug.fnNameCache_ = {},
goog.debug.fnNameResolver_,
goog.provide("goog.debug.LogRecord"),
goog.debug.LogRecord = function (e, o, t, r, g) {
    this.reset(e, o, t, r, g)
}
,
goog.debug.LogRecord.prototype.time_,
goog.debug.LogRecord.prototype.level_,
goog.debug.LogRecord.prototype.msg_,
goog.debug.LogRecord.prototype.loggerName_,
goog.debug.LogRecord.prototype.sequenceNumber_ = 0,
goog.debug.LogRecord.prototype.exception_ = null,
goog.define("goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS", !0),
goog.debug.LogRecord.nextSequenceNumber_ = 0,
goog.debug.LogRecord.prototype.reset = function (e, o, t, r, g) {
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof g ? g : goog.debug.LogRecord.nextSequenceNumber_++),
        this.time_ = r || goog.now(),
        this.level_ = e,
        this.msg_ = o,
        this.loggerName_ = t,
        delete this.exception_
}
,
goog.debug.LogRecord.prototype.getLoggerName = function () {
    return this.loggerName_
}
,
goog.debug.LogRecord.prototype.getException = function () {
    return this.exception_
}
,
goog.debug.LogRecord.prototype.setException = function (e) {
    this.exception_ = e
}
,
goog.debug.LogRecord.prototype.setLoggerName = function (e) {
    this.loggerName_ = e
}
,
goog.debug.LogRecord.prototype.getLevel = function () {
    return this.level_
}
,
goog.debug.LogRecord.prototype.setLevel = function (e) {
    this.level_ = e
}
,
goog.debug.LogRecord.prototype.getMessage = function () {
    return this.msg_
}
,
goog.debug.LogRecord.prototype.setMessage = function (e) {
    this.msg_ = e
}
,
goog.debug.LogRecord.prototype.getMillis = function () {
    return this.time_
}
,
goog.debug.LogRecord.prototype.setMillis = function (e) {
    this.time_ = e
}
,
goog.debug.LogRecord.prototype.getSequenceNumber = function () {
    return this.sequenceNumber_
}
,
goog.provide("goog.debug.LogBuffer"),
goog.require("goog.asserts"),
goog.require("goog.debug.LogRecord"),
goog.debug.LogBuffer = function () {
    goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY."),
        this.clear()
}
,
goog.debug.LogBuffer.getInstance = function () {
    return goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer),
        goog.debug.LogBuffer.instance_
}
,
goog.define("goog.debug.LogBuffer.CAPACITY", 0),
goog.debug.LogBuffer.prototype.buffer_,
goog.debug.LogBuffer.prototype.curIndex_,
goog.debug.LogBuffer.prototype.isFull_,
goog.debug.LogBuffer.prototype.addRecord = function (e, o, t) {
    var r = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
    if (this.curIndex_ = r,
        this.isFull_) {
        var g = this.buffer_[r];
        return g.reset(e, o, t),
            g
    }
    return this.isFull_ = r == goog.debug.LogBuffer.CAPACITY - 1,
        this.buffer_[r] = new goog.debug.LogRecord(e, o, t)
}
,
goog.debug.LogBuffer.isBufferingEnabled = function () {
    return 0 < goog.debug.LogBuffer.CAPACITY
}
,
goog.debug.LogBuffer.prototype.clear = function () {
    this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY),
        this.curIndex_ = -1,
        this.isFull_ = !1
}
,
goog.debug.LogBuffer.prototype.forEachRecord = function (e) {
    var o = this.buffer_;
    if (o[0])
        for (var t = this.curIndex_, r = this.isFull_ ? t : -1; e(o[r = (r + 1) % goog.debug.LogBuffer.CAPACITY]),
            r != t;)
            ;
}
,
goog.provide("goog.debug.LogManager"),
goog.provide("goog.debug.Loggable"),
goog.provide("goog.debug.Logger"),
goog.provide("goog.debug.Logger.Level"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.debug"),
goog.require("goog.debug.LogBuffer"),
goog.require("goog.debug.LogRecord"),
goog.debug.Loggable,
goog.debug.Logger = function (e) {
    this.name_ = e,
        this.parent_ = null,
        this.level_ = null,
        this.children_ = null,
        this.handlers_ = null
}
,
goog.debug.Logger.ROOT_LOGGER_NAME = "",
goog.define("goog.debug.Logger.ENABLE_HIERARCHY", !0),
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = [],
    goog.debug.Logger.rootLevel_),
goog.debug.Logger.Level = function (e, o) {
    this.name = e,
        this.value = o
}
,
goog.debug.Logger.Level.prototype.toString = function () {
    return this.name
}
,
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", 1 / 0),
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200),
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1e3),
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900),
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800),
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700),
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500),
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400),
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300),
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0),
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL],
goog.debug.Logger.Level.predefinedLevelsCache_ = null,
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function () {
    goog.debug.Logger.Level.predefinedLevelsCache_ = {};
    for (var e, o = 0; e = goog.debug.Logger.Level.PREDEFINED_LEVELS[o]; o++)
        goog.debug.Logger.Level.predefinedLevelsCache_[e.value] = e,
            goog.debug.Logger.Level.predefinedLevelsCache_[e.name] = e
}
,
goog.debug.Logger.Level.getPredefinedLevel = function (e) {
    return goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_(),
        goog.debug.Logger.Level.predefinedLevelsCache_[e] || null
}
,
goog.debug.Logger.Level.getPredefinedLevelByValue = function (e) {
    if (goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_(),
        e in goog.debug.Logger.Level.predefinedLevelsCache_)
        return goog.debug.Logger.Level.predefinedLevelsCache_[e];
    for (var o = 0; o < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++o) {
        var t = goog.debug.Logger.Level.PREDEFINED_LEVELS[o];
        if (t.value <= e)
            return t
    }
    return null
}
,
goog.debug.Logger.getLogger = function (e) {
    return goog.debug.LogManager.getLogger(e)
}
,
goog.debug.Logger.logToProfilers = function (e) {
    goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(e) : goog.global.console.markTimeline && goog.global.console.markTimeline(e)),
        goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(e)
}
,
goog.debug.Logger.prototype.getName = function () {
    return this.name_
}
,
goog.debug.Logger.prototype.addHandler = function (e) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []),
        this.handlers_.push(e)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."),
            goog.debug.Logger.rootHandlers_.push(e)))
}
,
goog.debug.Logger.prototype.removeHandler = function (e) {
    if (goog.debug.LOGGING_ENABLED) {
        var o = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!o && goog.array.remove(o, e)
    }
    return !1
}
,
goog.debug.Logger.prototype.getParent = function () {
    return this.parent_
}
,
goog.debug.Logger.prototype.getChildren = function () {
    return this.children_ || (this.children_ = {}),
        this.children_
}
,
goog.debug.Logger.prototype.setLevel = function (e) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = e : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."),
        goog.debug.Logger.rootLevel_ = e))
}
,
goog.debug.Logger.prototype.getLevel = function () {
    return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF
}
,
goog.debug.Logger.prototype.getEffectiveLevel = function () {
    return goog.debug.LOGGING_ENABLED ? goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ ? this.level_ : this.parent_ ? this.parent_.getEffectiveLevel() : (goog.asserts.fail("Root logger has no level set."),
        null) : goog.debug.Logger.rootLevel_ : goog.debug.Logger.Level.OFF
}
,
goog.debug.Logger.prototype.isLoggable = function (e) {
    return goog.debug.LOGGING_ENABLED && e.value >= this.getEffectiveLevel().value
}
,
goog.debug.Logger.prototype.log = function (e, o, t) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(e) && (goog.isFunction(o) && (o = o()),
        this.doLogRecord_(this.getLogRecord(e, o, t)))
}
,
goog.debug.Logger.prototype.getLogRecord = function (e, o, t) {
    if (goog.debug.LogBuffer.isBufferingEnabled())
        var r = goog.debug.LogBuffer.getInstance().addRecord(e, o, this.name_);
    else
        r = new goog.debug.LogRecord(e, String(o), this.name_);
    return t && r.setException(t),
        r
}
,
goog.debug.Logger.prototype.shout = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, e, o)
}
,
goog.debug.Logger.prototype.severe = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, e, o)
}
,
goog.debug.Logger.prototype.warning = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, e, o)
}
,
goog.debug.Logger.prototype.info = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, e, o)
}
,
goog.debug.Logger.prototype.config = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, e, o)
}
,
goog.debug.Logger.prototype.fine = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, e, o)
}
,
goog.debug.Logger.prototype.finer = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, e, o)
}
,
goog.debug.Logger.prototype.finest = function (e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, e, o)
}
,
goog.debug.Logger.prototype.logRecord = function (e) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(e.getLevel()) && this.doLogRecord_(e)
}
,
goog.debug.Logger.prototype.doLogRecord_ = function (e) {
    if (goog.debug.Logger.logToProfilers("log:" + e.getMessage()),
        goog.debug.Logger.ENABLE_HIERARCHY)
        for (var o = this; o;)
            o.callPublish_(e),
                o = o.getParent();
    else
        for (var t, r = 0; t = goog.debug.Logger.rootHandlers_[r++];)
            t(e)
}
,
goog.debug.Logger.prototype.callPublish_ = function (e) {
    if (this.handlers_)
        for (var o, t = 0; o = this.handlers_[t]; t++)
            o(e)
}
,
goog.debug.Logger.prototype.setParent_ = function (e) {
    this.parent_ = e
}
,
goog.debug.Logger.prototype.addChild_ = function (e, o) {
    this.getChildren()[e] = o
}
,
goog.debug.LogManager = {},
goog.debug.LogManager.loggers_ = {},
goog.debug.LogManager.rootLogger_ = null,
goog.debug.LogManager.initialize = function () {
    goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME),
        goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_,
        goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
}
;
goog.debug.LogManager.getLoggers = function () {
return goog.debug.LogManager.loggers_
}
,
goog.debug.LogManager.getRoot = function () {
    return goog.debug.LogManager.initialize(),
        goog.debug.LogManager.rootLogger_
}
,
goog.debug.LogManager.getLogger = function (e) {
    return goog.debug.LogManager.initialize(),
        goog.debug.LogManager.loggers_[e] || goog.debug.LogManager.createLogger_(e)
}
,
goog.debug.LogManager.createFunctionForCatchErrors = function (o) {
    return function (e) {
        (o || goog.debug.LogManager.getRoot()).severe("Error: " + e.message + " (" + e.fileName + " @ Line: " + e.line + ")")
    }
}
,
goog.debug.LogManager.createLogger_ = function (e) {
    var o = new goog.debug.Logger(e);
    if (goog.debug.Logger.ENABLE_HIERARCHY) {
        var t = e.lastIndexOf(".")
            , r = e.substr(0, t)
            , g = e.substr(t + 1)
            , n = goog.debug.LogManager.getLogger(r);
        n.addChild_(g, o),
            o.setParent_(n)
    }
    return goog.debug.LogManager.loggers_[e] = o
}
,
goog.provide("goog.log"),
goog.provide("goog.log.Level"),
goog.provide("goog.log.LogRecord"),
goog.provide("goog.log.Logger"),
goog.require("goog.debug"),
goog.require("goog.debug.LogManager"),
goog.require("goog.debug.LogRecord"),
goog.require("goog.debug.Logger"),
goog.define("goog.log.ENABLED", goog.debug.LOGGING_ENABLED),
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME,
goog.log.Logger = goog.debug.Logger,
goog.log.Level = goog.debug.Logger.Level,
goog.log.LogRecord = goog.debug.LogRecord,
goog.log.getLogger = function (e, o) {
    if (goog.log.ENABLED) {
        var t = goog.debug.LogManager.getLogger(e);
        return o && t && t.setLevel(o),
            t
    }
    return null
}
,
goog.log.addHandler = function (e, o) {
    goog.log.ENABLED && e && e.addHandler(o)
}
,
goog.log.removeHandler = function (e, o) {
    return !(!goog.log.ENABLED || !e) && e.removeHandler(o)
}
,
goog.log.log = function (e, o, t, r) {
    goog.log.ENABLED && e && e.log(o, t, r)
}
,
goog.log.error = function (e, o, t) {
    goog.log.ENABLED && e && e.severe(o, t)
}
,
goog.log.warning = function (e, o, t) {
    goog.log.ENABLED && e && e.warning(o, t)
}
,
goog.log.info = function (e, o, t) {
    goog.log.ENABLED && e && e.info(o, t)
}
,
goog.log.fine = function (e, o, t) {
    goog.log.ENABLED && e && e.fine(o, t)
}
,
goog.provide("goog.net.ErrorCode"),
goog.net.ErrorCode = {
    NO_ERROR: 0,
    ACCESS_DENIED: 1,
    FILE_NOT_FOUND: 2,
    FF_SILENT_ERROR: 3,
    CUSTOM_ERROR: 4,
    EXCEPTION: 5,
    HTTP_ERROR: 6,
    ABORT: 7,
    TIMEOUT: 8,
    OFFLINE: 9
},
goog.net.ErrorCode.getDebugMessage = function (e) {
    switch (e) {
        case goog.net.ErrorCode.NO_ERROR:
            return "No Error";
        case goog.net.ErrorCode.ACCESS_DENIED:
            return "Access denied to content document";
        case goog.net.ErrorCode.FILE_NOT_FOUND:
            return "File not found";
        case goog.net.ErrorCode.FF_SILENT_ERROR:
            return "Firefox silently errored";
        case goog.net.ErrorCode.CUSTOM_ERROR:
            return "Application custom error";
        case goog.net.ErrorCode.EXCEPTION:
            return "An exception occurred";
        case goog.net.ErrorCode.HTTP_ERROR:
            return "Http response at 400 or 500 level";
        case goog.net.ErrorCode.ABORT:
            return "Request was aborted";
        case goog.net.ErrorCode.TIMEOUT:
            return "Request timed out";
        case goog.net.ErrorCode.OFFLINE:
            return "The resource is not available offline";
        default:
            return "Unrecognized error code"
    }
}
,
goog.provide("goog.net.EventType"),
goog.net.EventType = {
    COMPLETE: "complete",
    SUCCESS: "success",
    ERROR: "error",
    ABORT: "abort",
    READY: "ready",
    READY_STATE_CHANGE: "readystatechange",
    TIMEOUT: "timeout",
    INCREMENTAL_DATA: "incrementaldata",
    PROGRESS: "progress"
},
goog.provide("goog.net.HttpStatus"),
goog.net.HttpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_ENTITY_TOO_LARGE: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUEST_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
    QUIRK_IE_NO_CONTENT: 1223
},
goog.net.HttpStatus.isSuccess = function (e) {
    switch (e) {
        case goog.net.HttpStatus.OK:
        case goog.net.HttpStatus.CREATED:
        case goog.net.HttpStatus.ACCEPTED:
        case goog.net.HttpStatus.NO_CONTENT:
        case goog.net.HttpStatus.PARTIAL_CONTENT:
        case goog.net.HttpStatus.NOT_MODIFIED:
        case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
            return !0;
        default:
            return !1
    }
}
,
goog.provide("goog.net.XhrLike"),
goog.net.XhrLike = function () { }
,
goog.net.XhrLike.OrNative,
goog.net.XhrLike.prototype.onreadystatechange,
goog.net.XhrLike.prototype.responseText,
goog.net.XhrLike.prototype.responseXML,
goog.net.XhrLike.prototype.readyState,
goog.net.XhrLike.prototype.status,
goog.net.XhrLike.prototype.statusText,
goog.net.XhrLike.prototype.open = function (e, o, t, r, g) { }
,
goog.net.XhrLike.prototype.send = function (e) { }
,
goog.net.XhrLike.prototype.abort = function () { }
,
goog.net.XhrLike.prototype.setRequestHeader = function (e, o) { }
,
goog.net.XhrLike.prototype.getResponseHeader = function (e) { }
,
goog.net.XhrLike.prototype.getAllResponseHeaders = function () { }
,
goog.provide("goog.net.XmlHttpFactory"),
goog.require("goog.net.XhrLike"),
goog.net.XmlHttpFactory = function () { }
,
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null,
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod,
goog.net.XmlHttpFactory.prototype.getOptions = function () {
    return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
}
,
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod,
goog.provide("goog.net.WrapperXmlHttpFactory"),
goog.require("goog.net.XhrLike"),
goog.require("goog.net.XmlHttpFactory"),
goog.net.WrapperXmlHttpFactory = function (e, o) {
    goog.net.XmlHttpFactory.call(this),
        this.xhrFactory_ = e,
        this.optionsFactory_ = o
}
,
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory),
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function () {
    return this.xhrFactory_()
}
,
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function () {
    return this.optionsFactory_()
}
,
goog.provide("goog.net.DefaultXmlHttpFactory"),
goog.provide("goog.net.XmlHttp"),
goog.provide("goog.net.XmlHttp.OptionType"),
goog.provide("goog.net.XmlHttp.ReadyState"),
goog.provide("goog.net.XmlHttpDefines"),
goog.require("goog.asserts"),
goog.require("goog.net.WrapperXmlHttpFactory"),
goog.require("goog.net.XmlHttpFactory"),
goog.net.XmlHttp = function () {
    return goog.net.XmlHttp.factory_.createInstance()
}
,
goog.define("goog.net.XmlHttp.ASSUME_NATIVE_XHR", !1),
goog.net.XmlHttpDefines = {},
goog.define("goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR", !1),
goog.net.XmlHttp.getOptions = function () {
    return goog.net.XmlHttp.factory_.getOptions()
}
,
goog.net.XmlHttp.OptionType = {
    USE_NULL_FUNCTION: 0,
    LOCAL_REQUEST_ERROR: 1
},
goog.net.XmlHttp.ReadyState = {
    UNINITIALIZED: 0,
    LOADING: 1,
    LOADED: 2,
    INTERACTIVE: 3,
    COMPLETE: 4
},
goog.net.XmlHttp.factory_,
goog.net.XmlHttp.setFactory = function (e, o) {
    goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(e), goog.asserts.assert(o)))
}
,
goog.net.XmlHttp.setGlobalFactory = function (e) {
    goog.net.XmlHttp.factory_ = e
}
,
goog.net.DefaultXmlHttpFactory = function () {
    goog.net.XmlHttpFactory.call(this)
}
,
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory),
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function () {
    var e = this.getProgId_();
    return e ? new ActiveXObject(e) : new XMLHttpRequest
}
,
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function () {
    var e = {};
    return this.getProgId_() && (e[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0,
        e[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0),
        e
}
,
goog.net.DefaultXmlHttpFactory.prototype.ieProgId_,
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function () {
    if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR)
        return "";
    if (this.ieProgId_ || "undefined" != typeof XMLHttpRequest || "undefined" == typeof ActiveXObject)
        return this.ieProgId_;
    for (var e = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], o = 0; o < e.length; o++) {
        var t = e[o];
        try {
            return new ActiveXObject(t),
                this.ieProgId_ = t
        } catch (e) { }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed")
}
,
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory),
goog.provide("goog.uri.utils"),
goog.provide("goog.uri.utils.ComponentIndex"),
goog.provide("goog.uri.utils.QueryArray"),
goog.provide("goog.uri.utils.QueryValue"),
goog.provide("goog.uri.utils.StandardQueryParam"),
goog.require("goog.asserts"),
goog.require("goog.string"),
goog.require("goog.userAgent"),
goog.uri.utils.CharCode_ = {
    AMPERSAND: 38,
    EQUAL: 61,
    HASH: 35,
    QUESTION: 63
},
goog.uri.utils.buildFromEncodedParts = function (e, o, t, r, g, n, i) {
    var a = "";
    return e && (a += e + ":"),
        t && (a += "//",
            o && (a += o + "@"),
            a += t,
            r && (a += ":" + r)),
        g && (a += g),
        n && (a += "?" + n),
        i && (a += "#" + i),
        a
}
,
goog.uri.utils.splitRe_ = new RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
goog.uri.utils.ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
},
goog.uri.utils.split = function (e) {
    return goog.uri.utils.phishingProtection_(),
        e.match(goog.uri.utils.splitRe_)
}
,
goog.uri.utils.needsPhishingProtection_ = goog.userAgent.WEBKIT,
goog.uri.utils.phishingProtection_ = function () {
    if (goog.uri.utils.needsPhishingProtection_) {
        goog.uri.utils.needsPhishingProtection_ = !1;
        var e = goog.global.location;
        if (e) {
            var o = e.href;
            if (o) {
                var t = goog.uri.utils.getDomain(o);
                if (t && t != e.hostname)
                    throw goog.uri.utils.needsPhishingProtection_ = !0,
                    Error()
            }
        }
    }
}
,
goog.uri.utils.decodeIfPossible_ = function (e, o) {
    return e ? o ? decodeURI(e) : decodeURIComponent(e) : e
}
,
goog.uri.utils.getComponentByIndex_ = function (e, o) {
    return goog.uri.utils.split(o)[e] || null
}
,
goog.uri.utils.getScheme = function (e) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, e)
}
,
goog.uri.utils.getEffectiveScheme = function (e) {
    var o = goog.uri.utils.getScheme(e);
    if (!o && self.location) {
        var t = self.location.protocol;
        o = t.substr(0, t.length - 1)
    }
    return o ? o.toLowerCase() : ""
}
,
goog.uri.utils.getUserInfoEncoded = function (e) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, e)
}
,
goog.uri.utils.getUserInfo = function (e) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(e))
}
,
goog.uri.utils.getDomainEncoded = function (e) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, e)
}
,
goog.uri.utils.getDomain = function (e) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(e), !0)
}
,
goog.uri.utils.getPort = function (e) {
    return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, e)) || null
}
,
goog.uri.utils.getPathEncoded = function (e) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, e)
}
,
goog.uri.utils.getPath = function (e) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(e), !0)
}
,
goog.uri.utils.getQueryData = function (e) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, e)
}
,
goog.uri.utils.getFragmentEncoded = function (e) {
    var o = e.indexOf("#");
    return o < 0 ? null : e.substr(o + 1)
}
,
goog.uri.utils.setFragmentEncoded = function (e, o) {
    return goog.uri.utils.removeFragment(e) + (o ? "#" + o : "")
}
,
goog.uri.utils.getFragment = function (e) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(e))
}
,
goog.uri.utils.getHost = function (e) {
    var o = goog.uri.utils.split(e);
    return goog.uri.utils.buildFromEncodedParts(o[goog.uri.utils.ComponentIndex.SCHEME], o[goog.uri.utils.ComponentIndex.USER_INFO], o[goog.uri.utils.ComponentIndex.DOMAIN], o[goog.uri.utils.ComponentIndex.PORT])
}
,
goog.uri.utils.getPathAndAfter = function (e) {
    var o = goog.uri.utils.split(e);
    return goog.uri.utils.buildFromEncodedParts(null, null, null, null, o[goog.uri.utils.ComponentIndex.PATH], o[goog.uri.utils.ComponentIndex.QUERY_DATA], o[goog.uri.utils.ComponentIndex.FRAGMENT])
}
,
goog.uri.utils.removeFragment = function (e) {
    var o = e.indexOf("#");
    return o < 0 ? e : e.substr(0, o)
}
,
goog.uri.utils.haveSameDomain = function (e, o) {
    var t = goog.uri.utils.split(e)
        , r = goog.uri.utils.split(o);
    return t[goog.uri.utils.ComponentIndex.DOMAIN] == r[goog.uri.utils.ComponentIndex.DOMAIN] && t[goog.uri.utils.ComponentIndex.SCHEME] == r[goog.uri.utils.ComponentIndex.SCHEME] && t[goog.uri.utils.ComponentIndex.PORT] == r[goog.uri.utils.ComponentIndex.PORT]
}
,
goog.uri.utils.assertNoFragmentsOrQueries_ = function (e) {
    if (goog.DEBUG && (0 <= e.indexOf("#") || 0 <= e.indexOf("?")))
        throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + e + "]")
}
,
goog.uri.utils.QueryValue,
goog.uri.utils.QueryArray,
goog.uri.utils.parseQueryData = function (e, o) {
    for (var t = e.split("&"), r = 0; r < t.length; r++) {
        var g = t[r].indexOf("=")
            , n = null
            , i = null;
        0 <= g ? (n = t[r].substring(0, g),
            i = t[r].substring(g + 1)) : n = t[r],
            o(n, i ? goog.string.urlDecode(i) : "")
    }
}
,
goog.uri.utils.appendQueryData_ = function (e) {
    if (e[1]) {
        var o = e[0]
            , t = o.indexOf("#");
        0 <= t && (e.push(o.substr(t)),
            e[0] = o = o.substr(0, t));
        var r = o.indexOf("?");
        r < 0 ? e[1] = "?" : r == o.length - 1 && (e[1] = void 0)
    }
    return e.join("")
}
,
goog.uri.utils.appendKeyValuePairs_ = function (e, o, t) {
    if (goog.isArray(o)) {
        goog.asserts.assertArray(o);
        for (var r = 0; r < o.length; r++)
            goog.uri.utils.appendKeyValuePairs_(e, String(o[r]), t)
    } else
        null != o && t.push("&", e, "" === o ? "" : "=", goog.string.urlEncode(o))
}
,
goog.uri.utils.buildQueryDataBuffer_ = function (e, o, t) {
    goog.asserts.assert(Math.max(o.length - (t || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
    for (var r = t || 0; r < o.length; r += 2)
        goog.uri.utils.appendKeyValuePairs_(o[r], o[r + 1], e);
    return e
}
,
goog.uri.utils.buildQueryData = function (e, o) {
    var t = goog.uri.utils.buildQueryDataBuffer_([], e, o);
    return t[0] = "",
        t.join("")
}
,
goog.uri.utils.buildQueryDataBufferFromMap_ = function (e, o) {
    for (var t in o)
        goog.uri.utils.appendKeyValuePairs_(t, o[t], e);
    return e
}
,
goog.uri.utils.buildQueryDataFromMap = function (e) {
    var o = goog.uri.utils.buildQueryDataBufferFromMap_([], e);
    return o[0] = "",
        o.join("")
}
,
goog.uri.utils.appendParams = function (e, o) {
    return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([e], o, 0) : goog.uri.utils.buildQueryDataBuffer_([e], arguments, 1))
}
,
goog.uri.utils.appendParamsFromMap = function (e, o) {
    return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([e], o))
}
,
goog.uri.utils.appendParam = function (e, o, t) {
    var r = [e, "&", o];
    return goog.isDefAndNotNull(t) && r.push("=", goog.string.urlEncode(t)),
        goog.uri.utils.appendQueryData_(r)
}
,
goog.uri.utils.findParam_ = function (e, o, t, r) {
    for (var g = o, n = t.length; 0 <= (g = e.indexOf(t, g)) && g < r;) {
        var i = e.charCodeAt(g - 1);
        if (i == goog.uri.utils.CharCode_.AMPERSAND || i == goog.uri.utils.CharCode_.QUESTION) {
            var a = e.charCodeAt(g + n);
            if (!a || a == goog.uri.utils.CharCode_.EQUAL || a == goog.uri.utils.CharCode_.AMPERSAND || a == goog.uri.utils.CharCode_.HASH)
                return g
        }
        g += n + 1
    }
    return -1
}
,
goog.uri.utils.hashOrEndRe_ = /#|$/,
goog.uri.utils.hasParam = function (e, o) {
    return 0 <= goog.uri.utils.findParam_(e, 0, o, e.search(goog.uri.utils.hashOrEndRe_))
}
,
goog.uri.utils.getParamValue = function (e, o) {
    var t = e.search(goog.uri.utils.hashOrEndRe_)
        , r = goog.uri.utils.findParam_(e, 0, o, t);
    if (r < 0)
        return null;
    var g = e.indexOf("&", r);
    return (g < 0 || t < g) && (g = t),
        r += o.length + 1,
        goog.string.urlDecode(e.substr(r, g - r))
}
,
goog.uri.utils.getParamValues = function (e, o) {
    for (var t, r = e.search(goog.uri.utils.hashOrEndRe_), g = 0, n = []; 0 <= (t = goog.uri.utils.findParam_(e, g, o, r));)
        ((g = e.indexOf("&", t)) < 0 || r < g) && (g = r),
            t += o.length + 1,
            n.push(goog.string.urlDecode(e.substr(t, g - t)));
    return n
}
,
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/,
goog.uri.utils.removeParam = function (e, o) {
    for (var t, r = e.search(goog.uri.utils.hashOrEndRe_), g = 0, n = []; 0 <= (t = goog.uri.utils.findParam_(e, g, o, r));)
        n.push(e.substring(g, t)),
            g = Math.min(e.indexOf("&", t) + 1 || r, r);
    return n.push(e.substr(g)),
        n.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
}
,
goog.uri.utils.setParam = function (e, o, t) {
    return goog.uri.utils.appendParam(goog.uri.utils.removeParam(e, o), o, t)
}
,
goog.uri.utils.appendPath = function (e, o) {
    return goog.uri.utils.assertNoFragmentsOrQueries_(e),
        goog.string.endsWith(e, "/") && (e = e.substr(0, e.length - 1)),
        goog.string.startsWith(o, "/") && (o = o.substr(1)),
        goog.string.buildString(e, "/", o)
}
,
goog.uri.utils.setPath = function (e, o) {
    goog.string.startsWith(o, "/") || (o = "/" + o);
    var t = goog.uri.utils.split(e);
    return goog.uri.utils.buildFromEncodedParts(t[goog.uri.utils.ComponentIndex.SCHEME], t[goog.uri.utils.ComponentIndex.USER_INFO], t[goog.uri.utils.ComponentIndex.DOMAIN], t[goog.uri.utils.ComponentIndex.PORT], o, t[goog.uri.utils.ComponentIndex.QUERY_DATA], t[goog.uri.utils.ComponentIndex.FRAGMENT])
}
,
goog.uri.utils.StandardQueryParam = {
    RANDOM: "zx"
},
goog.uri.utils.makeUnique = function (e) {
    return goog.uri.utils.setParam(e, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
}
,
goog.provide("goog.net.XhrIo"),
goog.provide("goog.net.XhrIo.ResponseType"),
goog.require("goog.Timer"),
goog.require("goog.array"),
goog.require("goog.debug.entryPointRegistry"),
goog.require("goog.events.EventTarget"),
goog.require("goog.json"),
goog.require("goog.log"),
goog.require("goog.net.ErrorCode"),
goog.require("goog.net.EventType"),
goog.require("goog.net.HttpStatus"),
goog.require("goog.net.XmlHttp"),
goog.require("goog.object"),
goog.require("goog.string"),
goog.require("goog.structs"),
goog.require("goog.structs.Map"),
goog.require("goog.uri.utils"),
goog.require("goog.userAgent"),
goog.forwardDeclare("goog.Uri"),
goog.net.XhrIo = function (e) {
    goog.net.XhrIo.base(this, "constructor"),
        this.headers = new goog.structs.Map,
        this.xmlHttpFactory_ = e || null,
        this.active_ = !1,
        this.xhr_ = null,
        this.xhrOptions_ = null,
        this.lastUri_ = "",
        this.lastMethod_ = "",
        this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR,
        this.lastError_ = "",
        this.errorDispatched_ = !1,
        this.inSend_ = !1,
        this.inOpen_ = !1,
        this.inAbort_ = !1,
        this.timeoutInterval_ = 0,
        this.timeoutId_ = null,
        this.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT,
        this.withCredentials_ = !1,
        this.useXhr2Timeout_ = !1
}
,
goog.inherits(goog.net.XhrIo, goog.events.EventTarget),
goog.net.XhrIo.ResponseType = {
    DEFAULT: "",
    TEXT: "text",
    DOCUMENT: "document",
    BLOB: "blob",
    ARRAY_BUFFER: "arraybuffer"
},
goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo"),
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type",
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i,
goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"],
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8",
goog.net.XhrIo.XHR2_TIMEOUT_ = "timeout",
goog.net.XhrIo.XHR2_ON_TIMEOUT_ = "ontimeout",
goog.net.XhrIo.sendInstances_ = [],
goog.net.XhrIo.send = function (e, o, t, r, g, n, i) {
    var a = new goog.net.XhrIo;
    return goog.net.XhrIo.sendInstances_.push(a),
        o && a.listen(goog.net.EventType.COMPLETE, o),
        a.listenOnce(goog.net.EventType.READY, a.cleanupSend_),
        n && a.setTimeoutInterval(n),
        i && a.setWithCredentials(i),
        a.send(e, t, r, g),
        a
}
,
goog.net.XhrIo.cleanup = function () {
    for (var e = goog.net.XhrIo.sendInstances_; e.length;)
        e.pop().dispose()
}
,
goog.net.XhrIo.protectEntryPoints = function (e) {
    goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = e.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
}
,
goog.net.XhrIo.prototype.cleanupSend_ = function () {
    this.dispose(),
        goog.array.remove(goog.net.XhrIo.sendInstances_, this)
}
,
goog.net.XhrIo.prototype.getTimeoutInterval = function () {
    return this.timeoutInterval_
}
,
goog.net.XhrIo.prototype.setTimeoutInterval = function (e) {
    this.timeoutInterval_ = Math.max(0, e)
}
,
goog.net.XhrIo.prototype.setResponseType = function (e) {
    this.responseType_ = e
}
,
goog.net.XhrIo.prototype.getResponseType = function () {
    return this.responseType_
}
,
goog.net.XhrIo.prototype.setWithCredentials = function (e) {
    this.withCredentials_ = e
}
,
goog.net.XhrIo.prototype.getWithCredentials = function () {
    return this.withCredentials_
}
,
goog.net.XhrIo.prototype.send = function (e, o, t, r) {
    if (this.xhr_)
        throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + e);
    var g = o ? o.toUpperCase() : "GET";
    this.lastUri_ = e,
        this.lastError_ = "",
        this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR,
        this.lastMethod_ = g,
        this.errorDispatched_ = !1,
        this.active_ = !0,
        this.xhr_ = this.createXhr(),
        this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions(),
        this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
    try {
        goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr")),
            this.inOpen_ = !0,
            this.xhr_.open(g, String(e), !0),
            this.inOpen_ = !1
    } catch (e) {
        return goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + e.message)),
            void this.error_(goog.net.ErrorCode.EXCEPTION, e)
    }
    var n = t || ""
        , i = this.headers.clone();
    r && goog.structs.forEach(r, function (e, o) {
        i.set(o, e)
    });
    var a = goog.array.find(i.getKeys(), goog.net.XhrIo.isContentTypeHeader_)
        , s = goog.global.FormData && n instanceof goog.global.FormData;
    !goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, g) || a || s || i.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE),
        i.forEach(function (e, o) {
            this.xhr_.setRequestHeader(o, e)
        }, this),
        this.responseType_ && (this.xhr_.responseType = this.responseType_),
        goog.object.containsKey(this.xhr_, "withCredentials") && (this.xhr_.withCredentials = this.withCredentials_);
    try {
        this.cleanUpTimeoutTimer_(),
            0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_),
                goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)),
                this.useXhr2Timeout_ ? (this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_,
                    this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = goog.bind(this.timeout_, this)) : this.timeoutId_ = goog.Timer.callOnce(this.timeout_, this.timeoutInterval_, this)),
            goog.log.fine(this.logger_, this.formatMsg_("Sending request")),
            this.inSend_ = !0,
            this.xhr_.send(n),
            this.inSend_ = !1
    } catch (e) {
        goog.log.fine(this.logger_, this.formatMsg_("Send error: " + e.message)),
            this.error_(goog.net.ErrorCode.EXCEPTION, e)
    }
}
,
goog.net.XhrIo.shouldUseXhr2Timeout_ = function (e) {
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher(9) && goog.isNumber(e[goog.net.XhrIo.XHR2_TIMEOUT_]) && goog.isDef(e[goog.net.XhrIo.XHR2_ON_TIMEOUT_])
}
,
goog.net.XhrIo.isContentTypeHeader_ = function (e) {
    return goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, e)
}
,
goog.net.XhrIo.prototype.createXhr = function () {
    return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp()
}
,
goog.net.XhrIo.prototype.timeout_ = function () {
    void 0 === goog || this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting",
        this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT,
        goog.log.fine(this.logger_, this.formatMsg_(this.lastError_)),
        this.dispatchEvent(goog.net.EventType.TIMEOUT),
        this.abort(goog.net.ErrorCode.TIMEOUT))
}
,
goog.net.XhrIo.prototype.error_ = function (e, o) {
    this.active_ = !1,
        this.xhr_ && (this.inAbort_ = !0,
            this.xhr_.abort(),
            this.inAbort_ = !1),
        this.lastError_ = o,
        this.lastErrorCode_ = e,
        this.dispatchErrors_(),
        this.cleanUpXhr_()
}
,
goog.net.XhrIo.prototype.dispatchErrors_ = function () {
    this.errorDispatched_ || (this.errorDispatched_ = !0,
        this.dispatchEvent(goog.net.EventType.COMPLETE),
        this.dispatchEvent(goog.net.EventType.ERROR))
}
,
goog.net.XhrIo.prototype.abort = function (e) {
    this.xhr_ && this.active_ && (goog.log.fine(this.logger_, this.formatMsg_("Aborting")),
        this.active_ = !1,
        this.inAbort_ = !0,
        this.xhr_.abort(),
        this.inAbort_ = !1,
        this.lastErrorCode_ = e || goog.net.ErrorCode.ABORT,
        this.dispatchEvent(goog.net.EventType.COMPLETE),
        this.dispatchEvent(goog.net.EventType.ABORT),
        this.cleanUpXhr_())
}
,
goog.net.XhrIo.prototype.disposeInternal = function () {
    this.xhr_ && (this.active_ && (this.active_ = !1,
        this.inAbort_ = !0,
        this.xhr_.abort(),
        this.inAbort_ = !1),
        this.cleanUpXhr_(!0)),
        goog.net.XhrIo.base(this, "disposeInternal")
}
,
goog.net.XhrIo.prototype.onReadyStateChange_ = function () {
    this.isDisposed() || (this.inOpen_ || this.inSend_ || this.inAbort_ ? this.onReadyStateChangeHelper_() : this.onReadyStateChangeEntryPoint_())
}
,
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function () {
    this.onReadyStateChangeHelper_()
}
,
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function () {
    if (this.active_)
        if (void 0 === goog)
            ;
        else if (this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus())
            goog.log.fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
        else {
            if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE)
                return void goog.Timer.callOnce(this.onReadyStateChange_, 0, this);
            if (this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE),
                this.isComplete()) {
                goog.log.fine(this.logger_, this.formatMsg_("Request complete")),
                    this.active_ = !1;
                try {
                    this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE),
                        this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR,
                            this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]",
                            this.dispatchErrors_())
                } finally {
                    this.cleanUpXhr_()
                }
            }
        }
}
,
goog.net.XhrIo.prototype.cleanUpXhr_ = function (e) {
    if (this.xhr_) {
        this.cleanUpTimeoutTimer_();
        var o = this.xhr_
            , t = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
        this.xhr_ = null,
            this.xhrOptions_ = null,
            e || this.dispatchEvent(goog.net.EventType.READY);
        try {
            o.onreadystatechange = t
        } catch (e) {
            goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + e.message)
        }
    }
}
,
goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function () {
    this.xhr_ && this.useXhr2Timeout_ && (this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = null),
        goog.isNumber(this.timeoutId_) && (goog.Timer.clear(this.timeoutId_),
            this.timeoutId_ = null)
}
,
goog.net.XhrIo.prototype.isActive = function () {
    return !!this.xhr_
}
,
goog.net.XhrIo.prototype.isComplete = function () {
    return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
}
,
goog.net.XhrIo.prototype.isSuccess = function () {
    var e = this.getStatus();
    return goog.net.HttpStatus.isSuccess(e) || 0 === e && !this.isLastUriEffectiveSchemeHttp_()
}
,
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function () {
    var e = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(e)
}
,
goog.net.XhrIo.prototype.getReadyState = function () {
    return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
}
,
goog.net.XhrIo.prototype.getStatus = function () {
    try {
        return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
    } catch (e) {
        return -1
    }
}
,
goog.net.XhrIo.prototype.getStatusText = function () {
    try {
        return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
    } catch (e) {
        return goog.log.fine(this.logger_, "Can not get status: " + e.message),
            ""
    }
}
,
goog.net.XhrIo.prototype.getLastUri = function () {
    return String(this.lastUri_)
}
,
goog.net.XhrIo.prototype.getResponseText = function () {
    try {
        return this.xhr_ ? this.xhr_.responseText : ""
    } catch (e) {
        return goog.log.fine(this.logger_, "Can not get responseText: " + e.message),
            ""
    }
}
,
goog.net.XhrIo.prototype.getResponseBody = function () {
    try {
        if (this.xhr_ && "responseBody" in this.xhr_)
            return this.xhr_.responseBody
    } catch (e) {
        goog.log.fine(this.logger_, "Can not get responseBody: " + e.message)
    }
    return null
}
,
goog.net.XhrIo.prototype.getResponseXml = function () {
    try {
        return this.xhr_ ? this.xhr_.responseXML : null
    } catch (e) {
        return goog.log.fine(this.logger_, "Can not get responseXML: " + e.message),
            null
    }
}
,
goog.net.XhrIo.prototype.getResponseJson = function (e) {
    if (this.xhr_) {
        var o = this.xhr_.responseText;
        return e && 0 == o.indexOf(e) && (o = o.substring(e.length)),
            goog.json.parse(o)
    }
}
,
goog.net.XhrIo.prototype.getResponse = function () {
    try {
        if (!this.xhr_)
            return null;
        if ("response" in this.xhr_)
            return this.xhr_.response;
        switch (this.responseType_) {
            case goog.net.XhrIo.ResponseType.DEFAULT:
            case goog.net.XhrIo.ResponseType.TEXT:
                return this.xhr_.responseText;
            case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
                if ("mozResponseArrayBuffer" in this.xhr_)
                    return this.xhr_.mozResponseArrayBuffer
        }
        return goog.log.error(this.logger_, "Response type " + this.responseType_ + " is not supported on this browser"),
            null
    } catch (e) {
        return goog.log.fine(this.logger_, "Can not get response: " + e.message),
            null
    }
}
,
goog.net.XhrIo.prototype.getResponseHeader = function (e) {
    return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(e) : void 0
}
,
goog.net.XhrIo.prototype.getAllResponseHeaders = function () {
    return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
}
,
goog.net.XhrIo.prototype.getResponseHeaders = function () {
    for (var e = {}, o = this.getAllResponseHeaders().split("\r\n"), t = 0; t < o.length; t++)
        if (!goog.string.isEmptyOrWhitespace(o[t])) {
            var r = goog.string.splitLimit(o[t], ": ", 2);
            e[r[0]] ? e[r[0]] += ", " + r[1] : e[r[0]] = r[1]
        }
    return e
}
,
goog.net.XhrIo.prototype.getLastErrorCode = function () {
    return this.lastErrorCode_
}
,
goog.net.XhrIo.prototype.getLastError = function () {
    return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_)
}
,
goog.net.XhrIo.prototype.formatMsg_ = function (e) {
    return e + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
}
,
goog.debug.entryPointRegistry.register(function (e) {
    goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = e(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
}),
goog.provide("goog.Uri"),
goog.provide("goog.Uri.QueryData"),
goog.require("goog.array"),
goog.require("goog.string"),
goog.require("goog.structs"),
goog.require("goog.structs.Map"),
goog.require("goog.uri.utils"),
goog.require("goog.uri.utils.ComponentIndex"),
goog.require("goog.uri.utils.StandardQueryParam"),
goog.Uri = function (e, o) {
    var t;
    this.scheme_ = "",
        this.userInfo_ = "",
        this.domain_ = "",
        this.port_ = null,
        this.path_ = "",
        this.fragment_ = "",
        this.isReadOnly_ = !1,
        this.ignoreCase_ = !1,
        this.queryData_,
        e instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(o) ? o : e.getIgnoreCase(),
            this.setScheme(e.getScheme()),
            this.setUserInfo(e.getUserInfo()),
            this.setDomain(e.getDomain()),
            this.setPort(e.getPort()),
            this.setPath(e.getPath()),
            this.setQueryData(e.getQueryData().clone()),
            this.setFragment(e.getFragment())) : e && (t = goog.uri.utils.split(String(e))) ? (this.ignoreCase_ = !!o,
                this.setScheme(t[goog.uri.utils.ComponentIndex.SCHEME] || "", !0),
                this.setUserInfo(t[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0),
                this.setDomain(t[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0),
                this.setPort(t[goog.uri.utils.ComponentIndex.PORT]),
                this.setPath(t[goog.uri.utils.ComponentIndex.PATH] || "", !0),
                this.setQueryData(t[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0),
                this.setFragment(t[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!o,
                    this.queryData_ = new goog.Uri.QueryData(null, null, this.ignoreCase_))
}
,
goog.Uri.preserveParameterTypesCompatibilityFlag = !1,
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM,
goog.Uri.prototype.toString = function () {
    var e = []
        , o = this.getScheme();
    o && e.push(goog.Uri.encodeSpecialChars_(o, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
    var t = this.getDomain();
    if (t) {
        e.push("//");
        var r = this.getUserInfo();
        r && e.push(goog.Uri.encodeSpecialChars_(r, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@"),
            e.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(t)));
        var g = this.getPort();
        null != g && e.push(":", String(g))
    }
    var n = this.getPath();
    n && (this.hasDomain() && "/" != n.charAt(0) && e.push("/"),
        e.push(goog.Uri.encodeSpecialChars_(n, "/" == n.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0)));
    var i = this.getEncodedQuery();
    i && e.push("?", i);
    var a = this.getFragment();
    return a && e.push("#", goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInFragment_)),
        e.join("")
}
,
goog.Uri.prototype.resolve = function (e) {
    var o = this.clone()
        , t = e.hasScheme();
    t ? o.setScheme(e.getScheme()) : t = e.hasUserInfo(),
        t ? o.setUserInfo(e.getUserInfo()) : t = e.hasDomain(),
        t ? o.setDomain(e.getDomain()) : t = e.hasPort();
    var r = e.getPath();
    if (t)
        o.setPort(e.getPort());
    else if (t = e.hasPath()) {
        if ("/" != r.charAt(0))
            if (this.hasDomain() && !this.hasPath())
                r = "/" + r;
            else {
                var g = o.getPath().lastIndexOf("/");
                -1 != g && (r = o.getPath().substr(0, g + 1) + r)
            }
        r = goog.Uri.removeDotSegments(r)
    }
    return t ? o.setPath(r) : t = e.hasQuery(),
        t ? o.setQueryData(e.getDecodedQuery()) : t = e.hasFragment(),
        t && o.setFragment(e.getFragment()),
        o
}
,
goog.Uri.prototype.clone = function () {
    return new goog.Uri(this)
}
,
goog.Uri.prototype.getScheme = function () {
    return this.scheme_
}
,
goog.Uri.prototype.setScheme = function (e, o) {
    return this.enforceReadOnly(),
        this.scheme_ = o ? goog.Uri.decodeOrEmpty_(e, !0) : e,
        this.scheme_ && (this.scheme_ = this.scheme_.replace(/:$/, "")),
        this
}
,
goog.Uri.prototype.hasScheme = function () {
    return !!this.scheme_
}
,
goog.Uri.prototype.getUserInfo = function () {
    return this.userInfo_
}
,
goog.Uri.prototype.setUserInfo = function (e, o) {
    return this.enforceReadOnly(),
        this.userInfo_ = o ? goog.Uri.decodeOrEmpty_(e) : e,
        this
}
,
goog.Uri.prototype.hasUserInfo = function () {
    return !!this.userInfo_
}
,
goog.Uri.prototype.getDomain = function () {
    return this.domain_
}
,
goog.Uri.prototype.setDomain = function (e, o) {
    return this.enforceReadOnly(),
        this.domain_ = o ? goog.Uri.decodeOrEmpty_(e, !0) : e,
        this
}
,
goog.Uri.prototype.hasDomain = function () {
    return !!this.domain_
}
,
goog.Uri.prototype.getPort = function () {
    return this.port_
}
,
goog.Uri.prototype.setPort = function (e) {
    if (this.enforceReadOnly(),
        e) {
        if (e = Number(e),
            isNaN(e) || e < 0)
            throw Error("Bad port number " + e);
        this.port_ = e
    } else
        this.port_ = null;
    return this
}
,
goog.Uri.prototype.hasPort = function () {
    return null != this.port_
}
,
goog.Uri.prototype.getPath = function () {
    return this.path_
}
,
goog.Uri.prototype.setPath = function (e, o) {
    return this.enforceReadOnly(),
        this.path_ = o ? goog.Uri.decodeOrEmpty_(e, !0) : e,
        this
}
,
goog.Uri.prototype.hasPath = function () {
    return !!this.path_
}
,
goog.Uri.prototype.hasQuery = function () {
    return "" !== this.queryData_.toString()
}
,
goog.Uri.prototype.setQueryData = function (e, o) {
    return this.enforceReadOnly(),
        e instanceof goog.Uri.QueryData ? (this.queryData_ = e,
            this.queryData_.setIgnoreCase(this.ignoreCase_)) : (o || (e = goog.Uri.encodeSpecialChars_(e, goog.Uri.reDisallowedInQuery_)),
                this.queryData_ = new goog.Uri.QueryData(e, null, this.ignoreCase_)),
        this
}
,
goog.Uri.prototype.setQuery = function (e, o) {
    return this.setQueryData(e, o)
}
,
goog.Uri.prototype.getEncodedQuery = function () {
    return this.queryData_.toString()
}
,
goog.Uri.prototype.getDecodedQuery = function () {
    return this.queryData_.toDecodedString()
}
,
goog.Uri.prototype.getQueryData = function () {
    return this.queryData_
}
,
goog.Uri.prototype.getQuery = function () {
    return this.getEncodedQuery()
}
,
goog.Uri.prototype.setParameterValue = function (e, o) {
    return this.enforceReadOnly(),
        this.queryData_.set(e, o),
        this
}
,
goog.Uri.prototype.setParameterValues = function (e, o) {
    return this.enforceReadOnly(),
        goog.isArray(o) || (o = [String(o)]),
        this.queryData_.setValues(e, o),
        this
}
,
goog.Uri.prototype.getParameterValues = function (e) {
    return this.queryData_.getValues(e)
}
,
goog.Uri.prototype.getParameterValue = function (e) {
    return this.queryData_.get(e)
}
,
goog.Uri.prototype.getFragment = function () {
    return this.fragment_
}
,
goog.Uri.prototype.setFragment = function (e, o) {
    return this.enforceReadOnly(),
        this.fragment_ = o ? goog.Uri.decodeOrEmpty_(e) : e,
        this
}
,
goog.Uri.prototype.hasFragment = function () {
    return !!this.fragment_
}
,
goog.Uri.prototype.hasSameDomainAs = function (e) {
    return !((this.hasDomain() || e.hasDomain()) && this.getDomain() != e.getDomain() || (this.hasPort() || e.hasPort()) && this.getPort() != e.getPort())
}
,
goog.Uri.prototype.makeUnique = function () {
    return this.enforceReadOnly(),
        this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString()),
        this
}
,
goog.Uri.prototype.removeParameter = function (e) {
    return this.enforceReadOnly(),
        this.queryData_.remove(e),
        this
}
,
goog.Uri.prototype.setReadOnly = function (e) {
    return this.isReadOnly_ = e,
        this
}
,
goog.Uri.prototype.isReadOnly = function () {
    return this.isReadOnly_
}
,
goog.Uri.prototype.enforceReadOnly = function () {
    if (this.isReadOnly_)
        throw Error("Tried to modify a read-only Uri")
}
,
goog.Uri.prototype.setIgnoreCase = function (e) {
    return this.ignoreCase_ = e,
        this.queryData_ && this.queryData_.setIgnoreCase(e),
        this
}
,
goog.Uri.prototype.getIgnoreCase = function () {
    return this.ignoreCase_
}
,
goog.Uri.parse = function (e, o) {
    return e instanceof goog.Uri ? e.clone() : new goog.Uri(e, o)
}
,
goog.Uri.create = function (e, o, t, r, g, n, i, a) {
    var s = new goog.Uri(null, a);
    return e && s.setScheme(e),
        o && s.setUserInfo(o),
        t && s.setDomain(t),
        r && s.setPort(r),
        g && s.setPath(g),
        n && s.setQueryData(n),
        i && s.setFragment(i),
        s
}
,
goog.Uri.resolve = function (e, o) {
    return e instanceof goog.Uri || (e = goog.Uri.parse(e)),
        o instanceof goog.Uri || (o = goog.Uri.parse(o)),
        e.resolve(o)
}
,
goog.Uri.removeDotSegments = function (e) {
    if (".." == e || "." == e)
        return "";
    if (goog.string.contains(e, "./") || goog.string.contains(e, "/.")) {
        for (var o = goog.string.startsWith(e, "/"), t = e.split("/"), r = [], g = 0; g < t.length;) {
            var n = t[g++];
            "." == n ? o && g == t.length && r.push("") : ".." == n ? ((1 < r.length || 1 == r.length && "" != r[0]) && r.pop(),
                o && g == t.length && r.push("")) : (r.push(n),
                    o = !0)
        }
        return r.join("/")
    }
    return e
}
,
goog.Uri.decodeOrEmpty_ = function (e, o) {
    return e ? o ? decodeURI(e.replace(/%25/g, "%2525")) : decodeURIComponent(e) : ""
}
,
goog.Uri.encodeSpecialChars_ = function (e, o, t) {
    if (goog.isString(e)) {
        var r = encodeURI(e).replace(o, goog.Uri.encodeChar_);
        return t && (r = goog.Uri.removeDoubleEncoding_(r)),
            r
    }
    return null
}
,
goog.Uri.encodeChar_ = function (e) {
    var o = e.charCodeAt(0);
    return "%" + (o >> 4 & 15).toString(16) + (15 & o).toString(16)
}
,
goog.Uri.removeDoubleEncoding_ = function (e) {
    return e.replace(/%25([0-9a-fA-F]{2})/g, "%$1")
}
,
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g,
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g,
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g,
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g,
goog.Uri.reDisallowedInFragment_ = /#/g,
goog.Uri.haveSameDomain = function (e, o) {
    var t = goog.uri.utils.split(e)
        , r = goog.uri.utils.split(o);
    return t[goog.uri.utils.ComponentIndex.DOMAIN] == r[goog.uri.utils.ComponentIndex.DOMAIN] && t[goog.uri.utils.ComponentIndex.PORT] == r[goog.uri.utils.ComponentIndex.PORT]
}
,
goog.Uri.QueryData = function (e, o, t) {
    this.keyMap_ = null,
        this.count_ = null,
        this.encodedQuery_ = e || null,
        this.ignoreCase_ = !!t
}
,
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function () {
    if (!this.keyMap_ && (this.keyMap_ = new goog.structs.Map,
        this.count_ = 0,
        this.encodedQuery_)) {
        var t = this;
        goog.uri.utils.parseQueryData(this.encodedQuery_, function (e, o) {
            t.add(goog.string.urlDecode(e), o)
        })
    }
}
,
goog.Uri.QueryData.createFromMap = function (e, o, t) {
    var r = goog.structs.getKeys(e);
    if (void 0 === r)
        throw Error("Keys are undefined");
    for (var g = new goog.Uri.QueryData(null, null, t), n = goog.structs.getValues(e), i = 0; i < r.length; i++) {
        var a = r[i]
            , s = n[i];
        goog.isArray(s) ? g.setValues(a, s) : g.add(a, s)
    }
    return g
}
,
goog.Uri.QueryData.createFromKeysValues = function (e, o, t, r) {
    if (e.length != o.length)
        throw Error("Mismatched lengths for keys/values");
    for (var g = new goog.Uri.QueryData(null, null, r), n = 0; n < e.length; n++)
        g.add(e[n], o[n]);
    return g
}
,
goog.Uri.QueryData.prototype.getCount = function () {
    return this.ensureKeyMapInitialized_(),
        this.count_
}
,
goog.Uri.QueryData.prototype.add = function (e, o) {
    this.ensureKeyMapInitialized_(),
        this.invalidateCache_(),
        e = this.getKeyName_(e);
    var t = this.keyMap_.get(e);
    return t || this.keyMap_.set(e, t = []),
        t.push(o),
        this.count_++,
        this
}
,
goog.Uri.QueryData.prototype.remove = function (e) {
    return this.ensureKeyMapInitialized_(),
        e = this.getKeyName_(e),
        !!this.keyMap_.containsKey(e) && (this.invalidateCache_(),
            this.count_ -= this.keyMap_.get(e).length,
            this.keyMap_.remove(e))
}
,
goog.Uri.QueryData.prototype.clear = function () {
    this.invalidateCache_(),
        this.keyMap_ = null,
        this.count_ = 0
}
,
goog.Uri.QueryData.prototype.isEmpty = function () {
    return this.ensureKeyMapInitialized_(),
        0 == this.count_
}
,
goog.Uri.QueryData.prototype.containsKey = function (e) {
    return this.ensureKeyMapInitialized_(),
        e = this.getKeyName_(e),
        this.keyMap_.containsKey(e)
}
,
goog.Uri.QueryData.prototype.containsValue = function (e) {
    var o = this.getValues();
    return goog.array.contains(o, e)
}
,
goog.Uri.QueryData.prototype.getKeys = function () {
    this.ensureKeyMapInitialized_();
    for (var e = this.keyMap_.getValues(), o = this.keyMap_.getKeys(), t = [], r = 0; r < o.length; r++)
        for (var g = e[r], n = 0; n < g.length; n++)
            t.push(o[r]);
    return t
}
,
goog.Uri.QueryData.prototype.getValues = function (e) {
    this.ensureKeyMapInitialized_();
    var o = [];
    if (goog.isString(e))
        this.containsKey(e) && (o = goog.array.concat(o, this.keyMap_.get(this.getKeyName_(e))));
    else
        for (var t = this.keyMap_.getValues(), r = 0; r < t.length; r++)
            o = goog.array.concat(o, t[r]);
    return o
}
,
goog.Uri.QueryData.prototype.set = function (e, o) {
    return this.ensureKeyMapInitialized_(),
        this.invalidateCache_(),
        e = this.getKeyName_(e),
        this.containsKey(e) && (this.count_ -= this.keyMap_.get(e).length),
        this.keyMap_.set(e, [o]),
        this.count_++,
        this
}
,
goog.Uri.QueryData.prototype.get = function (e, o) {
    var t = e ? this.getValues(e) : [];
    return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < t.length ? t[0] : o : 0 < t.length ? String(t[0]) : o
}
,
goog.Uri.QueryData.prototype.setValues = function (e, o) {
    this.remove(e),
        0 < o.length && (this.invalidateCache_(),
            this.keyMap_.set(this.getKeyName_(e), goog.array.clone(o)),
            this.count_ += o.length)
}
,
goog.Uri.QueryData.prototype.toString = function () {
    if (this.encodedQuery_)
        return this.encodedQuery_;
    if (!this.keyMap_)
        return "";
    for (var e = [], o = this.keyMap_.getKeys(), t = 0; t < o.length; t++)
        for (var r = o[t], g = goog.string.urlEncode(r), n = this.getValues(r), i = 0; i < n.length; i++) {
            var a = g;
            "" !== n[i] && (a += "=" + goog.string.urlEncode(n[i])),
                e.push(a)
        }
    return this.encodedQuery_ = e.join("&")
}
,
goog.Uri.QueryData.prototype.toDecodedString = function () {
    return goog.Uri.decodeOrEmpty_(this.toString())
}
,
goog.Uri.QueryData.prototype.invalidateCache_ = function () {
    this.encodedQuery_ = null
}
,
goog.Uri.QueryData.prototype.filterKeys = function (t) {
    return this.ensureKeyMapInitialized_(),
        this.keyMap_.forEach(function (e, o) {
            goog.array.contains(t, o) || this.remove(o)
        }, this),
        this
}
,
goog.Uri.QueryData.prototype.clone = function () {
    var e = new goog.Uri.QueryData;
    return e.encodedQuery_ = this.encodedQuery_,
        this.keyMap_ && (e.keyMap_ = this.keyMap_.clone(),
            e.count_ = this.count_),
        e
}
,
goog.Uri.QueryData.prototype.getKeyName_ = function (e) {
    var o = String(e);
    return this.ignoreCase_ && (o = o.toLowerCase()),
        o
}
,
goog.Uri.QueryData.prototype.setIgnoreCase = function (e) {
    e && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(),
        this.invalidateCache_(),
        this.keyMap_.forEach(function (e, o) {
            var t = o.toLowerCase();
            o != t && (this.remove(o),
                this.setValues(t, e))
        }, this)),
        this.ignoreCase_ = e
}
,
goog.Uri.QueryData.prototype.extend = function (e) {
    for (var o = 0; o < arguments.length; o++) {
        var t = arguments[o];
        goog.structs.forEach(t, function (e, o) {
            this.add(o, e)
        }, this)
    }
}
;
var WS_PROTOCOL = "https://"
, WS_START_PORT = 41951
, WS_END_PORT = 41960
, WS_CHECK_TIMEOUT = 3e3
, WS_COMMAND_TIMEOUT = 1e4
, WS_SVC_HOST = "127.0.0.1"
, WS_SVC_HOST_LEGACY = "localhost"
, WS_SVC_PATH = "DYMO/DLS/Printing"
, WS_CMD_STATUS = "StatusConnected"
, WS_CMD_GET_PRINTERS = "GetPrinters"
, WS_CMD_OPEN_LABEL = "OpenLabelFile"
, WS_CMD_PRINT_LABEL = "PrintLabel"
, WS_CMD_PRINT_LABEL2 = "PrintLabel2"
, WS_CMD_RENDER_LABEL = "RenderLabel"
, WS_CMD_LOAD_IMAGE = "LoadImageAsPngBase64"
, WS_CMD_GET_JOB_STATUS = "GetJobStatus";
function areCookiesEnabled() {
var e = "testCookie";
return setCookie(e, "test", 1),
    "test" == getCookie(e)
}
function setCookie(e, o, t) {
var r = new Date;
r.setTime(r.getTime() + 24 * t * 60 * 60 * 1e3);
var g = "expires=" + r.toUTCString();
document.cookie = e + "=" + o + "; " + g
}
function getCookie(e) {
for (var o = e + "=", t = document.cookie.split(";"), r = 0; r < t.length; r++) {
    for (var g = t[r]; " " == g.charAt(0);)
        g = g.substring(1);
    if (0 == g.indexOf(o))
        return g.substring(o.length, g.length)
}
return ""
}
function getLocalStorage() {
return void 0 !== window.localStorage && window.localStorage ? window.localStorage : null
}
function setCachedService(e, o) {
var t = getLocalStorage();
if (t) {
    if (!e || !o) {
        try {
            delete t.ServicePort,
                delete t.ServiceHost
        } catch (e) { }
        return
    }
    t.ServicePort = e,
        t.ServiceHost = o
} else if (areCookiesEnabled()) {
    if (!e || !o)
        return setCookie("ServicePort", "", 100),
            void setCookie("ServiceHost", "", 100);
    setCookie("ServicePort", e, 100),
        setCookie("ServiceHost", o, 100)
} else
    window.webServicePort = e,
        window.webServiceHost = o
}
function getCachedService() {
var e = getLocalStorage();
return e ? {
    Port: e.ServicePort,
    Host: e.ServiceHost
} : areCookiesEnabled() ? {
    Port: getCookie("ServicePort"),
    Host: getCookie("ServiceHost")
} : {
            Port: window.webServicePort,
            Host: window.webServiceHost
        }
}
function ajaxSync(e, o, t) {
var r, g = function () {
    if ("undefined" != typeof XMLHttpRequest)
        return new XMLHttpRequest;
    for (var e, o = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"], t = 0; t < o.length; t++)
        try {
            e = new ActiveXObject(o[t]);
            break
        } catch (e) { }
    return e
}(), n = [], i = null;
for (var a in o)
    n.push(encodeURIComponent(a) + "=" + encodeURIComponent(o[a]));
if ("POST" == t ? i = n.length ? n.join("&") : "" : e += n.length ? "?" + n.join("&") : "",
    g.open(t || "GET", e, !1),
    "POST" == t && g.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
    g.send(i),
    200 != g.status)
    throw r = g.responseText.split(":", 1)[0],
    new Error(r + "\n\n" + g.responseText + ": " + g.statusText);
return g.responseText
}
function asyncFindWebService(o, e) {
var t = getCachedService()
    , r = t.Port
    , g = t.Host;
traceMsg("checkEnvironment > cachedWebPort : " + g + "/" + r),
    traceMsg("checkEnvironment > trying async service discovery");
function n() {
    _findWebService(WS_SVC_HOST_LEGACY, o, e)
}
if (r) {
    var i = WS_PROTOCOL + g + ":" + r + "/" + WS_SVC_PATH + "/" + WS_CMD_STATUS;
    goog.net.XhrIo.send(i, function (e) {
        e.target.isSuccess() ? o() : (setCachedService(null, null),
            _findWebService(WS_SVC_HOST, o, n))
    }, "GET", void 0, void 0, WS_CHECK_TIMEOUT)
} else
    _findWebService(WS_SVC_HOST, o, n)
}
function syncCheckWebService(t, e) {
var o = getCachedService()
    , r = o.Port
    , g = o.Host;
traceMsg("checkEnvironment > cachedWebPort : " + g + "/" + r),
    traceMsg("checkEnvironment > trying synchronous service discovery");
function n(e, o) {
    traceMsg("checkEnvironment > web service found at :" + o + "/" + e),
        setCachedService(e, o),
        t(),
        dymo.label.framework.currentFramework || _createFramework.resetFramework()
}
var i = r || WS_START_PORT
    , a = g || WS_SVC_HOST
    , s = a === WS_SVC_HOST;
checkServiceStatus(i, a) ? n(i, a) : s && checkServiceStatus(i, WS_SVC_HOST_LEGACY) ? n(i, WS_SVC_HOST_LEGACY) : (setCachedService(null, null),
    e())
}
function checkServiceStatus(e, o) {
try {
    return "true" === ajaxSync(WS_PROTOCOL + o + ":" + e + "/" + WS_SVC_PATH + "/" + WS_CMD_STATUS, {}, "GET")
} catch (e) {
    return !1
}
}
function _findWebService(o, t, r) {
for (var e = [], g = WS_START_PORT; g <= WS_END_PORT; ++g)
    e.push(getAjaxPromise(g, o));
goog.Promise.all(e).then(function (e) {
    setTimeout(r, 0)
}).thenCatch(function (e) {
    goog.isNumber(e) ? (setCachedService(e, o),
        t()) : r()
})
}
function getAjaxPromise(r, e) {
var g = WS_PROTOCOL + e + ":" + r + "/" + WS_SVC_PATH + "/" + WS_CMD_STATUS;
return new goog.Promise(function (o, t) {
    goog.net.XhrIo.send(g, function (e) {
        e.target.isSuccess() ? t(r) : o(r)
    }, "GET", void 0, void 0, WS_CHECK_TIMEOUT)
}
)
}
function invokeWsCommandAsync(r, a, g) {
var e = getCachedService()
    , o = e.Port
    , t = e.Host
    , s = WS_PROTOCOL + t + ":" + o + "/" + WS_SVC_PATH + "/" + a;
return new goog.Promise(function (n, i) {
    var e = []
        , o = null;
    for (var t in g)
        e.push(encodeURIComponent(t) + "=" + encodeURIComponent(g[t]));
    "POST" == r ? o = e.length ? e.join("&") : "" : s += e.length ? "?" + e.join("&") : "",
        goog.net.XhrIo.send(s, function (e) {
            var o = e.target
                , t = null;
            if (o.isSuccess()) {
                var r = o.getResponse();
                try {
                    t = window.JSON.parse(r)
                } catch (e) {
                    t = r
                }
                n(t)
            } else {
                var g = "Failed to execute webservice command: " + a + ". Error: " + o.getStatus();
                traceMsg("invokeWsCommandAsync > " + g),
                    i(new Error(g))
            }
        }, r || "GET", o, void 0, WS_COMMAND_TIMEOUT)
}
)
}
function invokeWsCommand(e, o, t) {
var r = getCachedService()
    , g = r.Port
    , n = r.Host
    , i = ajaxSync(WS_PROTOCOL + n + ":" + g + "/" + WS_SVC_PATH + "/" + o, t, e);
try {
    return window.JSON.parse(i)
} catch (e) {
    return i
}
}
function DlsWebService() {
this.getPrinters = function () {
    return invokeWsCommand("GET", WS_CMD_GET_PRINTERS, {})
}
    ,
    this.openLabelFile = function (e) {
        return invokeWsCommand("GET", WS_CMD_OPEN_LABEL, {
            fileName: e
        })
    }
    ,
    this.printLabel = function (e, o, t, r) {
        return invokeWsCommand("POST", WS_CMD_PRINT_LABEL, {
            printerName: e,
            printParamsXml: o,
            labelXml: t,
            labelSetXml: r
        })
    }
    ,
    this.printLabel2 = function (e, o, t, r) {
        return invokeWsCommand("POST", WS_CMD_PRINT_LABEL2, {
            printerName: e,
            printParamsXml: o,
            labelXml: t,
            labelSetXml: r
        })
    }
    ,
    this.renderLabel = function (e, o, t) {
        return invokeWsCommand("POST", WS_CMD_RENDER_LABEL, {
            labelXml: e,
            renderParamsXml: o,
            printerName: t
        })
    }
    ,
    this.loadImageAsPngBase64 = function (e) {
        return invokeWsCommand("GET", WS_CMD_LOAD_IMAGE, {
            imageUri: e
        })
    }
    ,
    this.getPrintersAsync = function () {
        return invokeWsCommandAsync("GET", WS_CMD_GET_PRINTERS, {})
    }
    ,
    this.openLabelFileAsync = function (e) {
        return invokeWsCommandAsync("GET", WS_CMD_OPEN_LABEL, {
            fileName: e
        })
    }
    ,
    this.printLabelAsync = function (e, o, t, r) {
        return invokeWsCommandAsync("POST", WS_CMD_PRINT_LABEL, {
            printerName: e,
            printParamsXml: o,
            labelXml: t,
            labelSetXml: r
        })
    }
    ,
    this.printLabel2Async = function (e, o, t, r) {
        return invokeWsCommandAsync("POST", WS_CMD_PRINT_LABEL2, {
            printerName: e,
            printParamsXml: o,
            labelXml: t,
            labelSetXml: r
        })
    }
    ,
    this.renderLabelAsync = function (e, o, t) {
        return invokeWsCommandAsync("POST", WS_CMD_RENDER_LABEL, {
            labelXml: e,
            renderParamsXml: o,
            printerName: t
        })
    }
    ,
    this.loadImageAsPngBase64Async = function (e) {
        return invokeWsCommandAsync("GET", WS_CMD_LOAD_IMAGE, {
            imageUri: e
        })
    }
}
goog.require("goog.dom"),
goog.require("goog.net.XhrIo"),
goog.require("goog.structs.Map"),
goog.require("goog.Uri.QueryData"),
goog.provide("dymo.label.framework"),
goog.exportProperty(goog.Promise.prototype, "thenCatch", goog.Promise.prototype.thenCatch),
goog.provide("dymo.label.framework.FlowDirection"),
goog.provide("dymo.label.framework.LabelWriterPrintQuality"),
goog.provide("dymo.label.framework.TwinTurboRoll"),
goog.provide("dymo.label.framework.TapeAlignment"),
goog.provide("dymo.label.framework.TapeCutMode"),
goog.provide("dymo.label.framework.AddressBarcodePosition"),
dymo.label.framework.FlowDirection = {},
dymo.label.framework.FlowDirection.LeftToRight = "LeftToRight",
dymo.label.framework.FlowDirection.RightToLeft = "RightToLeft",
dymo.label.framework.LabelWriterPrintQuality = {},
dymo.label.framework.LabelWriterPrintQuality.Auto = "Auto",
dymo.label.framework.LabelWriterPrintQuality.Text = "Text",
dymo.label.framework.LabelWriterPrintQuality.BarcodeAndGraphics = "BarcodeAndGraphics",
dymo.label.framework.TwinTurboRoll = {},
dymo.label.framework.TwinTurboRoll.Auto = "Auto",
dymo.label.framework.TwinTurboRoll.Left = "Left",
dymo.label.framework.TwinTurboRoll.Right = "Right",
dymo.label.framework.TapeAlignment = {},
dymo.label.framework.TapeAlignment.Center = "Center",
dymo.label.framework.TapeAlignment.Left = "Left",
dymo.label.framework.TapeAlignment.Right = "Right",
dymo.label.framework.TapeCutMode = {},
dymo.label.framework.TapeCutMode.AutoCut = "AutoCut",
dymo.label.framework.TapeCutMode.ChainMarks = "ChainMarks",
dymo.label.framework.AddressBarcodePosition = {},
dymo.label.framework.AddressBarcodePosition.AboveAddress = "AboveAddress",
dymo.label.framework.AddressBarcodePosition.BelowAddress = "BelowAddress",
dymo.label.framework.AddressBarcodePosition.Suppress = "Suppress",
dymo.label.framework.PrintJobStatus = {},
dymo.label.framework.PrintJobStatus.Unknown = 0,
dymo.label.framework.PrintJobStatus.Printing = 1,
dymo.label.framework.PrintJobStatus.Finished = 2,
dymo.label.framework.PrintJobStatus.Error = 3,
dymo.label.framework.PrintJobStatus.PaperOut = 4,
dymo.label.framework.PrintJobStatus.InQueue = 5,
dymo.label.framework.PrintJobStatus.ProcessingError = -1,
dymo.label.framework.PrintJobStatus.PrinterBusy = -2,
dymo.label.framework.PrintJobStatus.InvalidJobId = -3,
dymo.label.framework.PrintJobStatus.NotSpooled = -4,
goog.provide("goog.dom.xml"),
goog.require("goog.dom"),
goog.require("goog.dom.NodeType"),
goog.dom.xml.MAX_XML_SIZE_KB = 2048,
goog.dom.xml.MAX_ELEMENT_DEPTH = 256,
goog.dom.xml.createDocument = function (e, o) {
    if (o && !e)
        throw Error("Can't create document with namespace and no root tag");
    if (document.implementation && document.implementation.createDocument)
        return document.implementation.createDocument(o || "", e || "", null);
    if ("undefined" != typeof ActiveXObject) {
        var t = goog.dom.xml.createMsXmlDocument_();
        if (t)
            return e && t.appendChild(t.createNode(goog.dom.NodeType.ELEMENT, e, o || "")),
                t
    }
    throw Error("Your browser does not support creating new documents")
}
,
goog.dom.xml.loadXml = function (e) {
    if ("undefined" != typeof DOMParser)
        return (new DOMParser).parseFromString(e, "application/xml");
    if ("undefined" == typeof ActiveXObject)
        throw Error("Your browser does not support loading xml documents");
    var o = goog.dom.xml.createMsXmlDocument_();
    return o.loadXML(e),
        o
}
,
goog.dom.xml.serialize = function (e) {
    if ("undefined" != typeof XMLSerializer)
        return (new XMLSerializer).serializeToString(e);
    var o = e.xml;
    if (o)
        return o;
    throw Error("Your browser does not support serializing XML documents")
}
,
goog.dom.xml.selectSingleNode = function (e, o) {
    if (void 0 !== e.selectSingleNode)
        return void 0 !== (t = goog.dom.getOwnerDocument(e)).setProperty && t.setProperty("SelectionLanguage", "XPath"),
            e.selectSingleNode(o);
    if (document.implementation.hasFeature("XPath", "3.0")) {
        var t, r = (t = goog.dom.getOwnerDocument(e)).createNSResolver(t.documentElement);
        return t.evaluate(o, e, r, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }
    return null
}
,
goog.dom.xml.selectNodes = function (e, o) {
    if (void 0 !== e.selectNodes)
        return void 0 !== (t = goog.dom.getOwnerDocument(e)).setProperty && t.setProperty("SelectionLanguage", "XPath"),
            e.selectNodes(o);
    if (document.implementation.hasFeature("XPath", "3.0")) {
        for (var t, r = (t = goog.dom.getOwnerDocument(e)).createNSResolver(t.documentElement), g = t.evaluate(o, e, r, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), n = [], i = g.snapshotLength, a = 0; a < i; a++)
            n.push(g.snapshotItem(a));
        return n
    }
    return []
}
,
goog.dom.xml.setAttributes = function (e, o) {
    for (var t in o)
        o.hasOwnProperty(t) && e.setAttribute(t, o[t])
}
,
goog.dom.xml.createMsXmlDocument_ = function () {
    var e = new ActiveXObject("MSXML2.DOMDocument");
    if (e) {
        e.resolveExternals = !1,
            e.validateOnParse = !1;
        try {
            e.setProperty("ProhibitDTD", !0),
                e.setProperty("MaxXMLSize", goog.dom.xml.MAX_XML_SIZE_KB),
                e.setProperty("MaxElementDepth", goog.dom.xml.MAX_ELEMENT_DEPTH)
        } catch (e) { }
    }
    return e
}
,
goog.provide("dymo.xml"),
goog.provide("dymo.xml.XPathExpression"),
goog.require("goog.dom.xml"),
dymo.xml.parse = function (e) {
    return goog.dom.xml.loadXml(e)
}
,
dymo.xml.serialize = function (e) {
    return goog.dom.xml.serialize(e)
}
,
dymo.xml.appendElement = function (e, o, t, r) {
    var g = e.ownerDocument.createElement(o);
    if (t && g.appendChild(e.ownerDocument.createTextNode(t)),
        r)
        for (var n in r)
            g.setAttribute(n, r[n]);
    return e.appendChild(g),
        g
}
,
dymo.xml.getElementText = function (e) {
    return e ? goog.dom.getRawTextContent(e) : ""
}
,
dymo.xml.getElement = function (e, o) {
    var t = e.getElementsByTagName(o);
    if (0 < t.length)
        return t[0]
}
,
dymo.xml.getElements = function (e, o) {
    return e.getElementsByTagName(o)
}
,
dymo.xml.setElementText = function (e, o) {
    dymo.xml.removeAllChildren(e),
        e.appendChild(e.ownerDocument.createTextNode(o))
}
,
dymo.xml.removeAllChildren = function (e) {
    for (; e.firstChild;)
        e.removeChild(e.firstChild)
}
,
goog.provide("dymo.label.framework.LabelSetBuilder"),
goog.provide("dymo.label.framework.ILabelSetRecord"),
goog.provide("dymo.label.framework.LabelSetRecord"),
dymo.label.framework.ILabelSetRecord = function () { }
,
dymo.label.framework.ILabelSetRecord.prototype.setTextMarkup = function (e, o) { }
,
dymo.label.framework.ILabelSetRecord.prototype.setText = function (e, o) { }
,
dymo.label.framework.ILabelSetRecord.prototype.setBase64Image = function (e, o) { }
,
dymo.label.framework.LabelSetBuilder = function () {
    this._records = new Array
}
,
dymo.label.framework.LabelSetBuilder.prototype.getRecords = function () {
    return this._records
}
,
dymo.label.framework.LabelSetBuilder.prototype.addRecord = function () {
    var e = new dymo.label.framework.LabelSetRecord;
    return this._records.push(e),
        e
}
;
var TextMarkupTag = "<TextMarkup>"
, TextMarkupClosedTag = "</TextMarkup>";
dymo.label.framework.LabelSetBuilder.toXml = function (e) {
for (var o = dymo.xml.parse("<LabelSet/>"), t = o.documentElement, r = 0; r < e.length; r++) {
    var g = e[r]
        , n = o.createElement("LabelRecord");
    for (var i in g) {
        var a = g[i];
        if ("function" != typeof a) {
            a = a.toString();
            var s = o.createElement("ObjectData");
            if (s.setAttribute("Name", i),
                0 == a.indexOf(TextMarkupTag)) {
                var l = dymo.xml.parse(a);
                s.appendChild(l.documentElement.cloneNode(!0))
            } else {
                var u = o.createTextNode(a);
                s.appendChild(u)
            }
            n.appendChild(s)
        }
    }
    t.appendChild(n)
}
return dymo.xml.serialize(o)
}
,
dymo.label.framework.LabelSetBuilder.prototype.toString = function () {
    return dymo.label.framework.LabelSetBuilder.toXml(this._records)
}
,
dymo.label.framework.LabelSetRecord = function () { }
,
dymo.label.framework.LabelSetRecord.prototype.setTextMarkup = function (e, o) {
    return 0 != (o = o.toString()).indexOf(TextMarkupTag) && (o = TextMarkupTag + o + TextMarkupClosedTag),
        this[e] = o,
        this
}
,
goog.exportProperty(dymo.label.framework.LabelSetRecord.prototype, "setTextMarkup", dymo.label.framework.LabelSetRecord.prototype.setTextMarkup),
dymo.label.framework.LabelSetRecord.prototype.setText = function (e, o) {
    return this[e] = o,
        this
}
,
goog.exportProperty(dymo.label.framework.LabelSetRecord.prototype, "setText", dymo.label.framework.LabelSetRecord.prototype.setText),
dymo.label.framework.LabelSetRecord.prototype.setBase64Image = function (e, o) {
    return this[e] = o,
        this
}
,
goog.exportProperty(dymo.label.framework.LabelSetRecord.prototype, "setBase64Image", dymo.label.framework.LabelSetRecord.prototype.setBase64Image),
goog.provide("dymo.label.framework.ILabel"),
goog.provide("dymo.label.framework.Label"),
goog.require("goog.array"),
goog.require("goog.dom.DomHelper"),
dymo.label.framework.ILabel = function () { }
,
dymo.label.framework.ILabel.prototype.getLabelXml = function () { }
,
dymo.label.framework.ILabel.prototype.render = function (e, o) { }
,
dymo.label.framework.ILabel.prototype.renderAsync = function (e, o) { }
,
dymo.label.framework.ILabel.prototype.print = function (e, o, t) { }
,
dymo.label.framework.ILabel.prototype.printAsync = function (e, o, t) { }
,
dymo.label.framework.ILabel.prototype.print2 = function (e, o, t) { }
,
dymo.label.framework.ILabel.prototype.print2Async = function (e, o, t) { }
,
dymo.label.framework.ILabel.prototype.printAndPollStatus = function (e, o, t, r, g) { }
,
dymo.label.framework.ILabel.prototype.printAndPollStatusAsync = function (e, o, t, r, g) { }
,
dymo.label.framework.ILabel.prototype.getObjectNames = function () { }
,
dymo.label.framework.ILabel.prototype.getAddressObjectCount = function () { }
,
dymo.label.framework.ILabel.prototype.getAddressBarcodePosition = function (e) { }
,
dymo.label.framework.ILabel.prototype.setAddressBarcodePosition = function (e, o) { }
,
dymo.label.framework.ILabel.prototype.getAddressText = function (e) { }
,
dymo.label.framework.ILabel.prototype.setAddressText = function (e, o) { }
,
dymo.label.framework.ILabel.prototype.isDCDLabel = function () { }
,
dymo.label.framework.ILabel.prototype.isDLSLabel = function () { }
,
dymo.label.framework.ILabel.prototype.isValidLabel = function () { }
,
dymo.label.framework.ILabel.prototype.getObjectText = function (e) { }
,
dymo.label.framework.ILabel.prototype.setObjectText = function (e, o) { }
,
dymo.label.framework.ILabel.prototype.setLabelLength = function (e) { }
,
dymo.label.framework.Label = function (e) {
    this._doc = dymo.xml.parse(e)
}
,
dymo.label.framework.Label.prototype.getLabelXml = function () {
    return dymo.xml.serialize(this._doc)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "getLabelXml", dymo.label.framework.Label.prototype.getLabelXml),
dymo.label.framework.Label.prototype.render = function (e, o) {
    return dymo.label.framework.renderLabel(this.getLabelXml(), e, o)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "render", dymo.label.framework.Label.prototype.render),
dymo.label.framework.Label.prototype.renderAsync = function (e, o) {
    return dymo.label.framework.renderLabelAsync(this.getLabelXml(), e, o)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "renderAsync", dymo.label.framework.Label.prototype.renderAsync),
dymo.label.framework.Label.prototype.print = function (e, o, t) {
    dymo.label.framework.printLabel(e, o, this.getLabelXml(), t)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "print", dymo.label.framework.Label.prototype.print),
dymo.label.framework.Label.prototype.printAsync = function (e, o, t) {
    return dymo.label.framework.printLabelAsync(e, o, this.getLabelXml(), t)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "printAsync", dymo.label.framework.Label.prototype.printAsync),
dymo.label.framework.Label.prototype.print2 = function (e, o, t) {
    return dymo.label.framework.printLabel2(e, o, this.getLabelXml(), t)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "print2", dymo.label.framework.Label.prototype.print2),
dymo.label.framework.Label.prototype.print2Async = function (e, o, t) {
    return dymo.label.framework.printLabel2Async(e, o, this.getLabelXml(), t)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "print2Async", dymo.label.framework.Label.prototype.print2Async),
dymo.label.framework.Label.prototype.printAndPollStatus = function (e, o, t, r, g) {
    return dymo.label.framework.printLabelAndPollStatus(e, o, this.getLabelXml(), t, r, g)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "printAndPollStatus", dymo.label.framework.Label.prototype.printAndPollStatus),
dymo.label.framework.Label.prototype.printAndPollStatusAsync = function (e, o, t, r, g) {
    return dymo.label.framework.printLabelAndPollStatusAsync(e, o, this.getLabelXml(), t, r, g)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "printAndPollStatusAsync", dymo.label.framework.Label.prototype.printAndPollStatusAsync);
var _allObjectTypes = ["AddressObject", "TextObject", "BarcodeObject", "ShapeObject", "CounterObject", "ImageObject", "CircularTextObject", "DateTimeObject", "QRCodeObject"];
dymo.label.framework.Label.prototype._getObjectElements = function (e) {
var o = e || _allObjectTypes;
return goog.dom.findNodes(this._doc.documentElement, function (e) {
    return e.nodeType == goog.dom.NodeType.ELEMENT && 0 <= goog.array.indexOf(o, e.tagName)
})
}
,
dymo.label.framework.Label.prototype.getObjectNames = function () {
    for (var e = this._getObjectElements(), o = new Array, t = 0; t < e.length; t++)
        o.push(dymo.xml.getElementText(dymo.xml.getElement(e[t], "Name")));
    return o
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "getObjectNames", dymo.label.framework.Label.prototype.getObjectNames),
dymo.label.framework.Label.prototype._getAddressObjectElements = function () {
    return this._getObjectElements(["AddressObject"])
}
,
dymo.label.framework.Label.prototype.getAddressObjectCount = function () {
    return this._getAddressObjectElements().length
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "getAddressObjectCount", dymo.label.framework.Label.prototype.getAddressObjectCount),
dymo.label.framework.Label.prototype._getAddressObjectElementByIndex = function (e) {
    return this._getAddressObjectElements()[e]
}
,
dymo.label.framework.Label.prototype.getAddressBarcodePosition = function (e) {
    return this.isDCDLabel() ? "" : dymo.xml.getElementText(dymo.xml.getElement(this._getAddressObjectElementByIndex(e), "BarcodePosition"))
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "getAddressBarcodePosition", dymo.label.framework.Label.prototype.getAddressBarcodePosition),
dymo.label.framework.Label.prototype._verifyAddressBarcodePosition = function (e) {
    if (e != dymo.label.framework.AddressBarcodePosition.AboveAddress && e != dymo.label.framework.AddressBarcodePosition.BelowAddress && e != dymo.label.framework.AddressBarcodePosition.Suppress)
        throw new Error("verifyAddressBarcodePosition(): barcode position '" + e + "' is invalid value")
}
,
dymo.label.framework.Label.prototype.setAddressBarcodePosition = function (e, o) {
    return this.isDCDLabel() || (this._verifyAddressBarcodePosition(o),
        dymo.xml.setElementText(dymo.xml.getElement(this._getAddressObjectElementByIndex(e), "BarcodePosition"), o)),
        this
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "setAddressBarcodePosition", dymo.label.framework.Label.prototype.setAddressBarcodePosition),
dymo.label.framework.Label.prototype.getAddressText = function (e) {
    return this._getAddressObjectText(this._getAddressObjectElementByIndex(e))
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "getAddressText", dymo.label.framework.Label.prototype.getAddressText),
dymo.label.framework.Label.prototype.setAddressText = function (e, o) {
    return this._setAddressObjectText(this._getAddressObjectElementByIndex(e), o)
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "setAddressText", dymo.label.framework.Label.prototype.setAddressText),
dymo.label.framework.Label.prototype._getObjectByNameElement = function (e) {
    for (var o = this._getObjectElements(), t = 0; t < o.length; t++) {
        var r = o[t];
        if (dymo.xml.getElementText(dymo.xml.getElement(r, "Name")) == e)
            return r
    }
    throw new Error("getObjectByNameElement(): no object with name '" + e + "' was found")
}
,
dymo.label.framework.Label.prototype.isDCDLabel = function () {
    var e = !1
        , o = this.getLabelXml();
    return o && (e = -1 !== o.indexOf("</DYMOLabel>")),
        e
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "isDCDLabel", dymo.label.framework.Label.prototype.isDCDLabel),
dymo.label.framework.Label.prototype.isDLSLabel = function () {
    var e = !1
        , o = this.getLabelXml();
    return o && (e = -1 !== o.indexOf("</DieCutLabel>") || -1 !== o.indexOf("</ContinuousLabel>")),
        e
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "isDLSLabel", dymo.label.framework.Label.prototype.isDLSLabel),
dymo.label.framework.Label.prototype.isValidLabel = function () {
    return this.isDCDLabel() || this.isDLSLabel()
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "isValidLabel", dymo.label.framework.Label.prototype.isValidLabel),
dymo.label.framework.Label.prototype._getAddressObjectText = function (e) {
    var o = "";
    if (this.isDCDLabel())
        for (var t = dymo.xml.getElement(e, "FormattedText"), r = dymo.xml.getElements(t, "LineTextSpan"), g = 0; g < r.length; g++) {
            var n = dymo.xml.getElements(r[g], "TextSpan");
            for (g = 0; g < n.length; g++) {
                var i = dymo.xml.getElement(n[g], "Text");
                o += dymo.xml.getElementText(i)
            }
        }
    else {
        var a = dymo.xml.getElement(e, "StyledText")
            , s = dymo.xml.getElements(a, "String");
        o = goog.array.reduce(s, function (e, o) {
            return e + dymo.xml.getElementText(o)
        }, "")
    }
    return o
}
,
dymo.label.framework.Label.prototype._getBarcodeObjectText = function (e) {
    var o = ""
        , t = this.isDCDLabel() ? "Data" : "Text"
        , r = dymo.xml.getElement(e, t);
    return r && (o = dymo.xml.getElementText(r)),
        o
}
,
dymo.label.framework.Label.prototype._getQRcodeObjectText = function (e) {
    var o = "";
    if (this.isDCDLabel()) {
        var t = dymo.xml.getElement(e, "Data");
        if (t) {
            var r = dymo.xml.getElement(t, "DataString");
            o = dymo.xml.getElementText(r)
        }
    }
    return o
}
,
dymo.label.framework.Label.prototype._getImageObjectText = function (e) {
    var o = ""
        , t = this.isDCDLabel() ? "Data" : "Image"
        , r = dymo.xml.getElement(e, t);
    return r && (o = dymo.xml.getElementText(r)),
        o
}
,
dymo.label.framework.Label.prototype._getDateTimeCounterObjectText = function (e) {
    var o = "";
    if (this.isDCDLabel()) {
        var t = dymo.xml.getElement(e, "FormattedText")
            , r = dymo.xml.getElements(t, "LineTextSpan");
        if (r) {
            var g = dymo.xml.getElements(r[0], "TextSpan")
                , n = dymo.xml.getElement(g[0], "Text");
            o += dymo.xml.getElementText(n)
        }
    } else
        o = dymo.xml.getElementText(dymo.xml.getElement(e, "PreText"));
    return o
}
,
dymo.label.framework.Label.prototype.getObjectText = function (e) {
    var o = this._getObjectByNameElement(e)
        , t = "";
    switch (o.tagName) {
        case "AddressObject":
        case "TextObject":
            t = this._getAddressObjectText(o);
            break;
        case "BarcodeObject":
            t = this._getBarcodeObjectText(o);
            break;
        case "ImageObject":
            t = this._getImageObjectText(o);
            break;
        case "CircularTextObject":
            t = this.isDCDLabel() ? this._getAddressObjectText(o) : dymo.xml.getElementText(dymo.xml.getElement(o, "Text"));
            break;
        case "QRCodeObject":
            t = this._getQRcodeObjectText(o);
            break;
        case "DateTimeObject":
        case "CounterObject":
            t = this._getDateTimeCounterObjectText(o)
    }
    return t
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "getObjectText", dymo.label.framework.Label.prototype.getObjectText),
dymo.label.framework.Label.prototype._getStyledTextLineAttributes = function (e) {
    for (var o = new Array, t = dymo.xml.getElements(e, "Element"), r = !0, g = 0; g < t.length; g++) {
        var n = t[g]
            , i = dymo.xml.getElementText(dymo.xml.getElement(n, "String"));
        if (i && i.length) {
            var a = i.split("\n")
                , s = a.length;
            if (1 != s || r) {
                var l = 0;
                r || (l = 1);
                for (var u = dymo.xml.getElement(n, "Attributes"); l < s - 1; l++)
                    o.push(u);
                r = !(0 < a[s - 1].length) || (o.push(u),
                    !1)
            }
        }
    }
    return o
}
,
dymo.label.framework.Label.prototype._setAddressObjectText = function (e, o) {
    if (this.isDCDLabel()) {
        var t = dymo.xml.getElement(e, "FormattedText")
            , r = dymo.xml.getElements(t, "LineTextSpan");
        if (r) {
            var g = dymo.xml.getElements(r[0], "TextSpan");
            if (g) {
                var n = dymo.xml.getElement(g[0], "Text");
                dymo.xml.setElementText(n, o)
            }
        }
    } else {
        var i, a = dymo.xml.getElement(e, "StyledText"), s = this._getStyledTextLineAttributes(a), l = dymo.xml.getElement(e, "LineFonts"), u = [];
        l && (u = dymo.xml.getElements(l, "Font")),
            0 == u.length && (i = dymo.xml.parse('<Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />').documentElement);
        var c = dymo.xml.parse('<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />').documentElement;
        dymo.xml.removeAllChildren(a);
        for (var d = o.split("\n"), m = 0; m < d.length; m++) {
            var p = d[m].replace("\r", "");
            m < d.length - 1 && (p += "\n");
            var f = i;
            0 < u.length ? f = m < u.length ? u[m] : u[u.length - 1] : 0 < s.length && (f = m < s.length ? dymo.xml.getElement(s[m], "Font") : dymo.xml.getElement(s[s.length - 1], "Font"));
            var h = c;
            m < s.length && (h = dymo.xml.getElement(s[m], "ForeColor"));
            var _ = a.ownerDocument.createElement("Element")
                , y = a.ownerDocument.createElement("String");
            dymo.xml.setElementText(y, p);
            var E = a.ownerDocument.createElement("Attributes");
            E.appendChild(f.cloneNode(!0)),
                E.appendChild(h.cloneNode(!0)),
                _.appendChild(y),
                _.appendChild(E),
                a.appendChild(_)
        }
    }
    return this
}
,
dymo.label.framework.Label.prototype._setQRCodeObjectText = function(e, o) {
    if (this.isDCDLabel()) {
        var t = dymo.xml.getElement(e, "Data")
            , r = dymo.xml.getElement(t, "DataString");
        
        dymo.xml.setElementText(r, o);
        
        var t = dymo.xml.getElement(e, "TextDataHolder")
            , r = dymo.xml.getElement(t, "Value");
        
        dymo.xml.setElementText(r, o);
    }
    return this
}
,
dymo.label.framework.Label.prototype._setBarcodeObjectText = function (e, o) {
    var t = this.isDCDLabel() ? "Data" : "Text"
        , r = dymo.xml.getElement(e, t);
    return r && dymo.xml.setElementText(r, o),
        this
}
,
dymo.label.framework.Label.prototype._setImageObjectText = function (e, o) {
    if (this.isDCDLabel()) {
        var t = dymo.xml.getElement(e, "Data");
        t && dymo.xml.setElementText(t, o)
    } else {
        var r = dymo.xml.getElement(e, "Image");
        if (r)
            dymo.xml.setElementText(r, o);
        else {
            var g = dymo.xml.getElement(e, "ImageLocation");
            if (!g)
                throw new Error("setObjectText(): <ImageLocation> is expected but not found: " + dymo.xml.serialize(r));
            r = g.ownerDocument.createElement("Image"),
                dymo.xml.setElementText(r, o),
                e.replaceChild(r, g)
        }
    }
    return this
}
,
dymo.label.framework.Label.prototype._setDateTimeCounterObjectText = function (e, o) {
    if (this.isDCDLabel()) {
        var t = dymo.xml.getElement(e, "FormattedText")
            , r = dymo.xml.getElements(t, "LineTextSpan");
        if (r) {
            var g = dymo.xml.getElements(r[0], "TextSpan")
                , n = dymo.xml.getElement(g[0], "Text");
            dymo.xml.setElementText(n, o)
        }
    } else
        dymo.xml.setElementText(dymo.xml.getElement(e, "PreText"), o);
    return this
}
,
dymo.label.framework.Label.prototype.setObjectText = function (e, o) {
    var t = this._getObjectByNameElement(e);
    switch (t.tagName) {
        case "AddressObject":
        case "TextObject":
            this._setAddressObjectText(t, o);
            break;
        case "QRCodeObject":
            this._setQRCodeObjectText(t, o);
            break;
        case "BarcodeObject":
            this._setBarcodeObjectText(t, o);
            break;
        case "ImageObject":
            this._setImageObjectText(t, o);
            break;
        case "CircularTextObject":
            this.isDCDLabel() ? this._setAddressObjectText(t, o) : dymo.xml.setElementText(dymo.xml.getElement(t, "Text"), o);
            break;
        case "DateTimeObject":
        case "CounterObject":
            this._setDateTimeCounterObjectText(t, o)
    }
    return this
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "setObjectText", dymo.label.framework.Label.prototype.setObjectText),
dymo.label.framework.Label.prototype.setLabelLength = function (e) {
    var o = this._doc.documentElement;
    if ("ContinuousLabel" != o.nodeName)
        throw new Error("Cannot set length on non-continuous label.");
    var t = 0 == e ? "Auto" : "Fixed"
        , r = 0 == e ? 7200 : e;
    dymo.xml.setElementText(dymo.xml.getElement(o, "LengthMode"), t),
        dymo.xml.setElementText(dymo.xml.getElement(o, "LabelLength"), r);
    var g = dymo.xml.getElement(o, "RootCell");
    return dymo.xml.setElementText(dymo.xml.getElement(g, "Length"), r),
        dymo.xml.setElementText(dymo.xml.getElement(g, "LengthMode"), t),
        this
}
,
goog.exportProperty(dymo.label.framework.Label.prototype, "setLabelLength", dymo.label.framework.Label.prototype.setLabelLength),
dymo.label.framework.Label.prototype.toString = function () {
    return this.getLabelXml()
}
,
goog.provide("goog.async.Deferred"),
goog.provide("goog.async.Deferred.AlreadyCalledError"),
goog.provide("goog.async.Deferred.CanceledError"),
goog.require("goog.Promise"),
goog.require("goog.Thenable"),
goog.require("goog.array"),
goog.require("goog.asserts"),
goog.require("goog.debug.Error"),
goog.async.Deferred = function (e, o) {
    if (this.sequence_ = [],
        this.onCancelFunction_ = e,
        this.defaultScope_ = o || null,
        this.fired_ = !1,
        this.hadError_ = !1,
        this.result_ = void 0,
        this.blocked_ = !1,
        this.blocking_ = !1,
        this.silentlyCanceled_ = !1,
        this.unhandledErrorId_ = 0,
        this.parent_ = null,
        this.branches_ = 0,
        goog.async.Deferred.LONG_STACK_TRACES && (this.constructorStack_ = null,
            Error.captureStackTrace)) {
        var t = {
            stack: ""
        };
        Error.captureStackTrace(t, goog.async.Deferred),
            "string" == typeof t.stack && (this.constructorStack_ = t.stack.replace(/^[^\n]*\n/, ""))
    }
}
,
goog.define("goog.async.Deferred.STRICT_ERRORS", !1),
goog.define("goog.async.Deferred.LONG_STACK_TRACES", !1),
goog.async.Deferred.prototype.cancel = function (e) {
    if (this.hasFired())
        this.result_ instanceof goog.async.Deferred && this.result_.cancel();
    else {
        if (this.parent_) {
            var o = this.parent_;
            delete this.parent_,
                e ? o.cancel(e) : o.branchCancel_()
        }
        this.onCancelFunction_ ? this.onCancelFunction_.call(this.defaultScope_, this) : this.silentlyCanceled_ = !0,
            this.hasFired() || this.errback(new goog.async.Deferred.CanceledError(this))
    }
}
,
goog.async.Deferred.prototype.branchCancel_ = function () {
    this.branches_--,
        this.branches_ <= 0 && this.cancel()
}
,
goog.async.Deferred.prototype.continue_ = function (e, o) {
    this.blocked_ = !1,
        this.updateResult_(e, o)
}
,
goog.async.Deferred.prototype.updateResult_ = function (e, o) {
    this.fired_ = !0,
        this.result_ = o,
        this.hadError_ = !e,
        this.fire_()
}
,
goog.async.Deferred.prototype.check_ = function () {
    if (this.hasFired()) {
        if (!this.silentlyCanceled_)
            throw new goog.async.Deferred.AlreadyCalledError(this);
        this.silentlyCanceled_ = !1
    }
}
,
goog.async.Deferred.prototype.callback = function (e) {
    this.check_(),
        this.assertNotDeferred_(e),
        this.updateResult_(!0, e)
}
,
goog.async.Deferred.prototype.errback = function (e) {
    this.check_(),
        this.assertNotDeferred_(e),
        this.makeStackTraceLong_(e),
        this.updateResult_(!1, e)
}
,
goog.async.Deferred.prototype.makeStackTraceLong_ = function (e) {
    goog.async.Deferred.LONG_STACK_TRACES && this.constructorStack_ && goog.isObject(e) && e.stack && /^[^\n]+(\n   [^\n]+)+/.test(e.stack) && (e.stack = e.stack + "\nDEFERRED OPERATION:\n" + this.constructorStack_)
}
,
goog.async.Deferred.prototype.assertNotDeferred_ = function (e) {
    goog.asserts.assert(!(e instanceof goog.async.Deferred), "An execution sequence may not be initiated with a blocking Deferred.")
}
,
goog.async.Deferred.prototype.addCallback = function (e, o) {
    return this.addCallbacks(e, null, o)
}
,
goog.async.Deferred.prototype.addErrback = function (e, o) {
    return this.addCallbacks(null, e, o)
}
,
goog.async.Deferred.prototype.addBoth = function (e, o) {
    return this.addCallbacks(e, e, o)
}
,
goog.async.Deferred.prototype.addFinally = function (t, e) {
    var r = this;
    return this.addCallbacks(t, function (e) {
        var o = t.call(r, e);
        if (!goog.isDef(o))
            throw e;
        return o
    }, e)
}
,
goog.async.Deferred.prototype.addCallbacks = function (e, o, t) {
    return goog.asserts.assert(!this.blocking_, "Blocking Deferreds can not be re-used"),
        this.sequence_.push([e, o, t]),
        this.hasFired() && this.fire_(),
        this
}
,
goog.async.Deferred.prototype.then = function (e, o, t) {
    var r, g, n = new goog.Promise(function (e, o) {
        r = e,
            g = o
    }
    );
    return this.addCallbacks(r, function (e) {
        e instanceof goog.async.Deferred.CanceledError ? n.cancel() : g(e)
    }),
        n.then(e, o, t)
}
,
goog.Thenable.addImplementation(goog.async.Deferred),
goog.async.Deferred.prototype.chainDeferred = function (e) {
    return this.addCallbacks(e.callback, e.errback, e),
        this
}
,
goog.async.Deferred.prototype.awaitDeferred = function (e) {
    return e instanceof goog.async.Deferred ? this.addCallback(goog.bind(e.branch, e)) : this.addCallback(function () {
        return e
    })
}
,
goog.async.Deferred.prototype.branch = function (e) {
    var o = new goog.async.Deferred;
    return this.chainDeferred(o),
        e && (o.parent_ = this).branches_++,
        o
}
,
goog.async.Deferred.prototype.hasFired = function () {
    return this.fired_
}
,
goog.async.Deferred.prototype.isError = function (e) {
    return e instanceof Error
}
,
goog.async.Deferred.prototype.hasErrback_ = function () {
    return goog.array.some(this.sequence_, function (e) {
        return goog.isFunction(e[1])
    })
}
,
goog.async.Deferred.prototype.fire_ = function () {
    this.unhandledErrorId_ && this.hasFired() && this.hasErrback_() && (goog.async.Deferred.unscheduleError_(this.unhandledErrorId_),
        this.unhandledErrorId_ = 0),
        this.parent_ && (this.parent_.branches_--,
            delete this.parent_);
    for (var o = this.result_, t = !1, e = !1; this.sequence_.length && !this.blocked_;) {
        var r = this.sequence_.shift()
            , g = r[0]
            , n = r[1]
            , i = r[2]
            , a = this.hadError_ ? n : g;
        if (a)
            try {
                var s = a.call(i || this.defaultScope_, o);
                goog.isDef(s) && (this.hadError_ = this.hadError_ && (s == o || this.isError(s)),
                    this.result_ = o = s),
                    (goog.Thenable.isImplementedBy(o) || "function" == typeof goog.global.Promise && o instanceof goog.global.Promise) && (e = !0,
                        this.blocked_ = !0)
            } catch (e) {
                o = e,
                    this.hadError_ = !0,
                    this.makeStackTraceLong_(o),
                    this.hasErrback_() || (t = !0)
            }
    }
    if (this.result_ = o,
        e) {
        var l = goog.bind(this.continue_, this, !0)
            , u = goog.bind(this.continue_, this, !1);
        o instanceof goog.async.Deferred ? (o.addCallbacks(l, u),
            o.blocking_ = !0) : o.then(l, u)
    } else
        !goog.async.Deferred.STRICT_ERRORS || !this.isError(o) || o instanceof goog.async.Deferred.CanceledError || (t = this.hadError_ = !0);
    t && (this.unhandledErrorId_ = goog.async.Deferred.scheduleError_(o))
}
,
goog.async.Deferred.succeed = function (e) {
    var o = new goog.async.Deferred;
    return o.callback(e),
        o
}
,
goog.async.Deferred.fromPromise = function (e) {
    var o = new goog.async.Deferred;
    return o.callback(),
        o.addCallback(function () {
            return e
        }),
        o
}
,
goog.async.Deferred.fail = function (e) {
    var o = new goog.async.Deferred;
    return o.errback(e),
        o
}
,
goog.async.Deferred.canceled = function () {
    var e = new goog.async.Deferred;
    return e.cancel(),
        e
}
,
goog.async.Deferred.when = function (e, o, t) {
    return e instanceof goog.async.Deferred ? e.branch(!0).addCallback(o, t) : goog.async.Deferred.succeed(e).addCallback(o, t)
}
,
goog.async.Deferred.AlreadyCalledError = function (e) {
    goog.debug.Error.call(this),
        this.deferred = e
}
,
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error),
goog.async.Deferred.AlreadyCalledError.prototype.message = "Deferred has already fired",
goog.async.Deferred.AlreadyCalledError.prototype.name = "AlreadyCalledError",
goog.async.Deferred.CanceledError = function (e) {
    goog.debug.Error.call(this),
        this.deferred = e
}
,
goog.inherits(goog.async.Deferred.CanceledError, goog.debug.Error),
goog.async.Deferred.CanceledError.prototype.message = "Deferred was canceled",
goog.async.Deferred.CanceledError.prototype.name = "CanceledError",
goog.async.Deferred.Error_ = function (e) {
    this.id_ = goog.global.setTimeout(goog.bind(this.throwError, this), 0),
        this.error_ = e
}
,
goog.async.Deferred.Error_.prototype.throwError = function () {
    throw goog.asserts.assert(goog.async.Deferred.errorMap_[this.id_], "Cannot throw an error that is not scheduled."),
    delete goog.async.Deferred.errorMap_[this.id_],
    this.error_
}
,
goog.async.Deferred.Error_.prototype.resetTimer = function () {
    goog.global.clearTimeout(this.id_)
}
,
goog.async.Deferred.errorMap_ = {},
goog.async.Deferred.scheduleError_ = function (e) {
    var o = new goog.async.Deferred.Error_(e);
    return (goog.async.Deferred.errorMap_[o.id_] = o).id_
}
,
goog.async.Deferred.unscheduleError_ = function (e) {
    var o = goog.async.Deferred.errorMap_[e];
    o && (o.resetTimer(),
        delete goog.async.Deferred.errorMap_[e])
}
,
goog.async.Deferred.assertNoErrors = function () {
    var e = goog.async.Deferred.errorMap_;
    for (var o in e) {
        var t = e[o];
        t.resetTimer(),
            t.throwError()
    }
}
,
goog.provide("goog.net.jsloader"),
goog.provide("goog.net.jsloader.Error"),
goog.provide("goog.net.jsloader.ErrorCode"),
goog.provide("goog.net.jsloader.Options"),
goog.require("goog.array"),
goog.require("goog.async.Deferred"),
goog.require("goog.debug.Error"),
goog.require("goog.dom"),
goog.require("goog.dom.TagName"),
goog.net.jsloader.GLOBAL_VERIFY_OBJS_ = "closure_verification",
goog.net.jsloader.DEFAULT_TIMEOUT = 5e3,
goog.net.jsloader.Options,
goog.net.jsloader.scriptsToLoad_ = [],
goog.net.jsloader.loadMany = function (t, r) {
    if (t.length) {
        var e = goog.net.jsloader.scriptsToLoad_.length;
        if (goog.array.extend(goog.net.jsloader.scriptsToLoad_, t),
            !e) {
            t = goog.net.jsloader.scriptsToLoad_;
            var g = function () {
                var e = t.shift()
                    , o = goog.net.jsloader.load(e, r);
                t.length && o.addBoth(g)
            };
            g()
        }
    }
}
,
goog.net.jsloader.load = function (e, o) {
    var t = o || {}
        , r = t.document || document
        , g = goog.dom.createElement(goog.dom.TagName.SCRIPT)
        , n = {
            script_: g,
            timeout_: void 0
        }
        , i = new goog.async.Deferred(goog.net.jsloader.cancel_, n)
        , a = null
        , s = goog.isDefAndNotNull(t.timeout) ? t.timeout : goog.net.jsloader.DEFAULT_TIMEOUT;
    return 0 < s && (a = window.setTimeout(function () {
        goog.net.jsloader.cleanup_(g, !0),
            i.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.TIMEOUT, "Timeout reached for loading script " + e))
    }, s),
        n.timeout_ = a),
        g.onload = g.onreadystatechange = function () {
            if (!g.readyState || "loaded" == g.readyState || "complete" == g.readyState) {
                var e = t.cleanupWhenDone || !1;
                goog.net.jsloader.cleanup_(g, e, a),
                    i.callback(null)
            }
        }
        ,
        g.onerror = function () {
            goog.net.jsloader.cleanup_(g, !0, a),
                i.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.LOAD_ERROR, "Error while loading script " + e))
        }
        ,
        goog.dom.setProperties(g, {
            type: "text/javascript",
            charset: "UTF-8",
            src: e
        }),
        goog.net.jsloader.getScriptParentElement_(r).appendChild(g),
        i
}
,
goog.net.jsloader.loadAndVerify = function (o, t, e) {
    goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] || (goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] = {});
    var r = goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_];
    if (goog.isDef(r[t]))
        return goog.async.Deferred.fail(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_OBJECT_ALREADY_EXISTS, "Verification object " + t + " already defined."));
    var g = goog.net.jsloader.load(o, e)
        , n = new goog.async.Deferred(goog.bind(g.cancel, g));
    return g.addCallback(function () {
        var e = r[t];
        goog.isDef(e) ? (n.callback(e),
            delete r[t]) : n.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_ERROR, "Script " + o + " loaded, but verification object " + t + " was not defined."))
    }),
        g.addErrback(function (e) {
            goog.isDef(r[t]) && delete r[t],
                n.errback(e)
        }),
        n
}
,
goog.net.jsloader.getScriptParentElement_ = function (e) {
    var o = e.getElementsByTagName(goog.dom.TagName.HEAD);
    return !o || goog.array.isEmpty(o) ? e.documentElement : o[0]
}
,
goog.net.jsloader.cancel_ = function () {
    if (this && this.script_) {
        var e = this.script_;
        e && e.tagName == goog.dom.TagName.SCRIPT && goog.net.jsloader.cleanup_(e, !0, this.timeout_)
    }
}
,
goog.net.jsloader.cleanup_ = function (e, o, t) {
    goog.isDefAndNotNull(t) && goog.global.clearTimeout(t),
        e.onload = goog.nullFunction,
        e.onerror = goog.nullFunction,
        e.onreadystatechange = goog.nullFunction,
        o && window.setTimeout(function () {
            goog.dom.removeNode(e)
        }, 0)
}
,
goog.net.jsloader.ErrorCode = {
    LOAD_ERROR: 0,
    TIMEOUT: 1,
    VERIFY_ERROR: 2,
    VERIFY_OBJECT_ALREADY_EXISTS: 3
},
goog.net.jsloader.Error = function (e, o) {
    var t = "Jsloader error (code #" + e + ")";
    o && (t += ": " + o),
        goog.net.jsloader.Error.base(this, "constructor", t),
        this.code = e
}
,
goog.inherits(goog.net.jsloader.Error, goog.debug.Error),
goog.provide("goog.net.Jsonp"),
goog.require("goog.Uri"),
goog.require("goog.net.jsloader"),
goog.net.Jsonp = function (e, o) {
    this.uri_ = new goog.Uri(e),
        this.callbackParamName_ = o || "callback",
        this.timeout_ = 5e3
}
,
goog.net.Jsonp.CALLBACKS = "_callbacks_",
goog.net.Jsonp.scriptCounter_ = 0,
goog.net.Jsonp.prototype.setRequestTimeout = function (e) {
    this.timeout_ = e
}
,
goog.net.Jsonp.prototype.getRequestTimeout = function () {
    return this.timeout_
}
,
goog.net.Jsonp.prototype.send = function (e, o, t, r) {
    var g = e || null
        , n = r || "_" + (goog.net.Jsonp.scriptCounter_++).toString(36) + goog.now().toString(36);
    goog.global[goog.net.Jsonp.CALLBACKS] || (goog.global[goog.net.Jsonp.CALLBACKS] = {});
    var i = this.uri_.clone();
    if (g && goog.net.Jsonp.addPayloadToUri_(g, i),
        o) {
        var a = goog.net.Jsonp.newReplyHandler_(n, o);
        goog.global[goog.net.Jsonp.CALLBACKS][n] = a,
            i.setParameterValues(this.callbackParamName_, goog.net.Jsonp.CALLBACKS + "." + n)
    }
    var s = goog.net.jsloader.load(i.toString(), {
        timeout: this.timeout_,
        cleanupWhenDone: !0
    })
        , l = goog.net.Jsonp.newErrorHandler_(n, g, t);
    return s.addErrback(l),
    {
        id_: n,
        deferred_: s
    }
}
,
goog.net.Jsonp.prototype.cancel = function (e) {
    e && (e.deferred_ && e.deferred_.cancel(),
        e.id_ && goog.net.Jsonp.cleanup_(e.id_, !1))
}
,
goog.net.Jsonp.newErrorHandler_ = function (e, o, t) {
    return function () {
        goog.net.Jsonp.cleanup_(e, !1),
            t && t(o)
    }
}
,
goog.net.Jsonp.newReplyHandler_ = function (o, t) {
    return function (e) {
        goog.net.Jsonp.cleanup_(o, !0),
            t.apply(void 0, arguments)
    }
}
,
goog.net.Jsonp.cleanup_ = function (e, o) {
    goog.global[goog.net.Jsonp.CALLBACKS][e] && (o ? delete goog.global[goog.net.Jsonp.CALLBACKS][e] : goog.global[goog.net.Jsonp.CALLBACKS][e] = goog.nullFunction)
}
,
goog.net.Jsonp.addPayloadToUri_ = function (e, o) {
    for (var t in e)
        e.hasOwnProperty && !e.hasOwnProperty(t) || o.setParameterValues(t, e[t]);
    return o
}
,
goog.provide("goog.dom.InputType"),
goog.dom.InputType = {
    BUTTON: "button",
    CHECKBOX: "checkbox",
    COLOR: "color",
    DATE: "date",
    DATETIME: "datetime",
    DATETIME_LOCAL: "datetime-local",
    EMAIL: "email",
    FILE: "file",
    HIDDEN: "hidden",
    IMAGE: "image",
    MENU: "menu",
    MONTH: "month",
    NUMBER: "number",
    PASSWORD: "password",
    RADIO: "radio",
    RANGE: "range",
    RESET: "reset",
    SEARCH: "search",
    SELECT_MULTIPLE: "select-multiple",
    SELECT_ONE: "select-one",
    SUBMIT: "submit",
    TEL: "tel",
    TEXT: "text",
    TEXTAREA: "textarea",
    TIME: "time",
    URL: "url",
    WEEK: "week"
},
goog.provide("goog.net.IframeIo"),
goog.provide("goog.net.IframeIo.IncrementalDataEvent"),
goog.require("goog.Timer"),
goog.require("goog.Uri"),
goog.require("goog.asserts"),
goog.require("goog.debug"),
goog.require("goog.dom"),
goog.require("goog.dom.InputType"),
goog.require("goog.dom.TagName"),
goog.require("goog.dom.safe"),
goog.require("goog.events"),
goog.require("goog.events.Event"),
goog.require("goog.events.EventTarget"),
goog.require("goog.events.EventType"),
goog.require("goog.html.uncheckedconversions"),
goog.require("goog.json"),
goog.require("goog.log"),
goog.require("goog.log.Level"),
goog.require("goog.net.ErrorCode"),
goog.require("goog.net.EventType"),
goog.require("goog.reflect"),
goog.require("goog.string"),
goog.require("goog.string.Const"),
goog.require("goog.structs"),
goog.require("goog.userAgent"),
goog.net.IframeIo = function () {
    goog.net.IframeIo.base(this, "constructor"),
        this.name_ = goog.net.IframeIo.getNextName_(),
        this.iframesForDisposal_ = [],
        goog.net.IframeIo.instances_[this.name_] = this
}
,
goog.inherits(goog.net.IframeIo, goog.events.EventTarget),
goog.net.IframeIo.instances_ = {},
goog.net.IframeIo.FRAME_NAME_PREFIX = "closure_frame",
goog.net.IframeIo.INNER_FRAME_SUFFIX = "_inner",
goog.net.IframeIo.IFRAME_DISPOSE_DELAY_MS = 2e3,
goog.net.IframeIo.counter_ = 0,
goog.net.IframeIo.form_,
goog.net.IframeIo.send = function (e, o, t, r, g) {
    var n = new goog.net.IframeIo;
    goog.events.listen(n, goog.net.EventType.READY, n.dispose, !1, n),
        o && goog.events.listen(n, goog.net.EventType.COMPLETE, o),
        n.send(e, t, r, g)
}
,
goog.net.IframeIo.getIframeByName = function (e) {
    return window.frames[e]
}
,
goog.net.IframeIo.getInstanceByName = function (e) {
    return goog.net.IframeIo.instances_[e]
}
,
goog.net.IframeIo.handleIncrementalData = function (e, o) {
    var t = goog.string.endsWith(e.name, goog.net.IframeIo.INNER_FRAME_SUFFIX) ? e.parent.name : e.name
        , r = t.substring(0, t.lastIndexOf("_"))
        , g = goog.net.IframeIo.getInstanceByName(r);
    if (g && t == g.iframeName_)
        g.handleIncrementalData_(o);
    else {
        var n = goog.log.getLogger("goog.net.IframeIo");
        goog.log.info(n, "Incremental iframe data routed for unknown iframe")
    }
}
,
goog.net.IframeIo.getNextName_ = function () {
    return goog.net.IframeIo.FRAME_NAME_PREFIX + goog.net.IframeIo.counter_++
}
,
goog.net.IframeIo.getForm_ = function () {
    if (!goog.net.IframeIo.form_) {
        goog.net.IframeIo.form_ = goog.dom.createDom(goog.dom.TagName.FORM),
            goog.net.IframeIo.form_.acceptCharset = "utf-8";
        var e = goog.net.IframeIo.form_.style;
        e.position = "absolute",
            e.visibility = "hidden",
            e.top = e.left = "-10px",
            e.width = e.height = "10px",
            e.overflow = "hidden",
            goog.dom.getDocument().body.appendChild(goog.net.IframeIo.form_)
    }
    return goog.net.IframeIo.form_
}
,
goog.net.IframeIo.addFormInputs_ = function (r, e) {
    var g = goog.dom.getDomHelper(r);
    goog.structs.forEach(e, function (e, o) {
        var t = g.createDom(goog.dom.TagName.INPUT, {
            type: goog.dom.InputType.HIDDEN,
            name: o,
            value: e
        });
        r.appendChild(t)
    })
}
,
goog.net.IframeIo.useIeReadyStateCodePath_ = function () {
    return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("11")
}
,
goog.net.IframeIo.prototype.logger_ = goog.log.getLogger("goog.net.IframeIo"),
goog.net.IframeIo.prototype.form_ = null,
goog.net.IframeIo.prototype.iframe_ = null,
goog.net.IframeIo.prototype.iframeName_ = null,
goog.net.IframeIo.prototype.nextIframeId_ = 0,
goog.net.IframeIo.prototype.active_ = !1,
goog.net.IframeIo.prototype.complete_ = !1,
goog.net.IframeIo.prototype.success_ = !1,
goog.net.IframeIo.prototype.lastUri_ = null,
goog.net.IframeIo.prototype.lastContent_ = null,
goog.net.IframeIo.prototype.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR,
goog.net.IframeIo.prototype.firefoxSilentErrorTimeout_ = null,
goog.net.IframeIo.prototype.iframeDisposalTimer_ = null,
goog.net.IframeIo.prototype.errorHandled_,
goog.net.IframeIo.prototype.ignoreResponse_ = !1,
goog.net.IframeIo.prototype.errorChecker_,
goog.net.IframeIo.prototype.lastCustomError_,
goog.net.IframeIo.prototype.lastContentHtml_,
goog.net.IframeIo.prototype.send = function (e, o, t, r) {
    if (this.active_)
        throw Error("[goog.net.IframeIo] Unable to send, already active.");
    var g = new goog.Uri(e);
    this.lastUri_ = g;
    var n = o ? o.toUpperCase() : "GET";
    t && g.makeUnique(),
        goog.log.info(this.logger_, "Sending iframe request: " + g + " [" + n + "]"),
        this.form_ = goog.net.IframeIo.getForm_(),
        "GET" == n && goog.net.IframeIo.addFormInputs_(this.form_, g.getQueryData()),
        r && goog.net.IframeIo.addFormInputs_(this.form_, r),
        this.form_.action = g.toString(),
        this.form_.method = n,
        this.sendFormInternal_(),
        this.clearForm_()
}
,
goog.net.IframeIo.prototype.sendFromForm = function (e, o, t) {
    if (this.active_)
        throw Error("[goog.net.IframeIo] Unable to send, already active.");
    var r = new goog.Uri(o || e.action);
    t && r.makeUnique(),
        goog.log.info(this.logger_, "Sending iframe request from form: " + r),
        this.lastUri_ = r,
        this.form_ = e,
        this.form_.action = r.toString(),
        this.sendFormInternal_()
}
,
goog.net.IframeIo.prototype.abort = function (e) {
    if (this.active_) {
        goog.log.info(this.logger_, "Request aborted");
        var o = this.getRequestIframe();
        goog.asserts.assert(o),
            goog.events.removeAll(o),
            this.complete_ = !1,
            this.active_ = !1,
            this.success_ = !1,
            this.lastErrorCode_ = e || goog.net.ErrorCode.ABORT,
            this.dispatchEvent(goog.net.EventType.ABORT),
            this.makeReady_()
    }
}
,
goog.net.IframeIo.prototype.disposeInternal = function () {
    goog.log.fine(this.logger_, "Disposing iframeIo instance"),
        this.active_ && (goog.log.fine(this.logger_, "Aborting active request"),
            this.abort()),
        goog.net.IframeIo.superClass_.disposeInternal.call(this),
        this.iframe_ && this.scheduleIframeDisposal_(),
        this.disposeForm_(),
        delete this.errorChecker_,
        this.form_ = null,
        this.lastCustomError_ = this.lastContent_ = this.lastContentHtml_ = null,
        this.lastUri_ = null,
        this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR,
        delete goog.net.IframeIo.instances_[this.name_]
}
,
goog.net.IframeIo.prototype.isComplete = function () {
    return this.complete_
}
,
goog.net.IframeIo.prototype.isSuccess = function () {
    return this.success_
}
,
goog.net.IframeIo.prototype.isActive = function () {
    return this.active_
}
,
goog.net.IframeIo.prototype.getResponseText = function () {
    return this.lastContent_
}
,
goog.net.IframeIo.prototype.getResponseHtml = function () {
    return this.lastContentHtml_
}
,
goog.net.IframeIo.prototype.getResponseJson = function () {
    return goog.json.parse(this.lastContent_)
}
,
goog.net.IframeIo.prototype.getResponseXml = function () {
    return this.iframe_ ? this.getContentDocument_() : null
}
,
goog.net.IframeIo.prototype.getLastUri = function () {
    return this.lastUri_
}
,
goog.net.IframeIo.prototype.getLastErrorCode = function () {
    return this.lastErrorCode_
}
,
goog.net.IframeIo.prototype.getLastError = function () {
    return goog.net.ErrorCode.getDebugMessage(this.lastErrorCode_)
}
,
goog.net.IframeIo.prototype.getLastCustomError = function () {
    return this.lastCustomError_
}
,
goog.net.IframeIo.prototype.setErrorChecker = function (e) {
    this.errorChecker_ = e
}
,
goog.net.IframeIo.prototype.getErrorChecker = function () {
    return this.errorChecker_
}
,
goog.net.IframeIo.prototype.isIgnoringResponse = function () {
    return this.ignoreResponse_
}
,
goog.net.IframeIo.prototype.setIgnoreResponse = function (e) {
    this.ignoreResponse_ = e
}
,
goog.net.IframeIo.prototype.sendFormInternal_ = function () {
    if (this.active_ = !0,
        this.complete_ = !1,
        this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR,
        this.createIframe_(),
        goog.net.IframeIo.useIeReadyStateCodePath_()) {
        this.form_.target = this.iframeName_ || "",
            this.appendIframe_(),
            this.ignoreResponse_ || goog.events.listen(this.iframe_, goog.events.EventType.READYSTATECHANGE, this.onIeReadyStateChange_, !1, this);
        try {
            this.errorHandled_ = !1,
                this.form_.submit()
        } catch (e) {
            this.ignoreResponse_ || goog.events.unlisten(this.iframe_, goog.events.EventType.READYSTATECHANGE, this.onIeReadyStateChange_, !1, this),
                this.handleError_(goog.net.ErrorCode.ACCESS_DENIED)
        }
    } else {
        goog.log.fine(this.logger_, "Setting up iframes and cloning form"),
            this.appendIframe_();
        var e, o = this.iframeName_ + goog.net.IframeIo.INNER_FRAME_SUFFIX, t = goog.dom.getFrameContentDocument(this.iframe_);
        e = document.baseURI ? goog.net.IframeIo.createIframeHtmlWithBaseUri_(o) : goog.net.IframeIo.createIframeHtml_(o),
            goog.userAgent.OPERA ? goog.dom.safe.setInnerHtml(t.documentElement, e) : goog.dom.safe.documentWrite(t, e),
            this.ignoreResponse_ || goog.events.listen(t.getElementById(o), goog.events.EventType.LOAD, this.onIframeLoaded_, !1, this);
        for (var r = this.form_.getElementsByTagName(goog.dom.TagName.TEXTAREA), g = 0, n = r.length; g < n; g++) {
            var i = r[g].value;
            goog.dom.getRawTextContent(r[g]) != i && (goog.dom.setTextContent(r[g], i),
                r[g].value = i)
        }
        var a = t.importNode(this.form_, !0);
        a.target = o,
            a.action = this.form_.action,
            t.body.appendChild(a);
        var s = this.form_.getElementsByTagName(goog.dom.TagName.SELECT)
            , l = a.getElementsByTagName(goog.dom.TagName.SELECT);
        for (g = 0,
            n = s.length; g < n; g++)
            for (var u = s[g].getElementsByTagName(goog.dom.TagName.OPTION), c = l[g].getElementsByTagName(goog.dom.TagName.OPTION), d = 0, m = u.length; d < m; d++)
                c[d].selected = u[d].selected;
        var p = this.form_.getElementsByTagName(goog.dom.TagName.INPUT)
            , f = a.getElementsByTagName(goog.dom.TagName.INPUT);
        for (g = 0,
            n = p.length; g < n; g++)
            if (p[g].type == goog.dom.InputType.FILE && p[g].value != f[g].value) {
                goog.log.fine(this.logger_, "File input value not cloned properly.  Will submit using original form."),
                    this.form_.target = o,
                    a = this.form_;
                break
            }
        goog.log.fine(this.logger_, "Submitting form");
        try {
            this.errorHandled_ = !1,
                a.submit(),
                t.close(),
                goog.userAgent.GECKO && (this.firefoxSilentErrorTimeout_ = goog.Timer.callOnce(this.testForFirefoxSilentError_, 250, this))
        } catch (e) {
            goog.log.error(this.logger_, "Error when submitting form: " + goog.debug.exposeException(e)),
                this.ignoreResponse_ || goog.events.unlisten(t.getElementById(o), goog.events.EventType.LOAD, this.onIframeLoaded_, !1, this),
                t.close(),
                this.handleError_(goog.net.ErrorCode.FILE_NOT_FOUND)
        }
    }
}
,
goog.net.IframeIo.createIframeHtml_ = function (e) {
    var o = goog.string.htmlEscape(e);
    return goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Short HTML snippet, input escaped, for performance"), '<body><iframe id="' + o + '" name="' + o + '"></iframe>')
}
,
goog.net.IframeIo.createIframeHtmlWithBaseUri_ = function (e) {
    var o = goog.string.htmlEscape(e);
    return goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Short HTML snippet, input escaped, safe URL, for performance"), '<head><base href="' + goog.string.htmlEscape(document.baseURI) + '"></head><body><iframe id="' + o + '" name="' + o + '"></iframe>')
}
,
goog.net.IframeIo.prototype.onIeReadyStateChange_ = function (e) {
    if ("complete" == this.iframe_.readyState) {
        var o;
        goog.events.unlisten(this.iframe_, goog.events.EventType.READYSTATECHANGE, this.onIeReadyStateChange_, !1, this);
        try {
            if (o = goog.dom.getFrameContentDocument(this.iframe_),
                goog.userAgent.IE && "about:blank" == o.location && !navigator.onLine)
                return void this.handleError_(goog.net.ErrorCode.OFFLINE)
        } catch (e) {
            return void this.handleError_(goog.net.ErrorCode.ACCESS_DENIED)
        }
        this.handleLoad_(o)
    }
}
,
goog.net.IframeIo.prototype.onIframeLoaded_ = function (e) {
    if (!goog.userAgent.OPERA || "about:blank" != this.getContentDocument_().location) {
        goog.events.unlisten(this.getRequestIframe(), goog.events.EventType.LOAD, this.onIframeLoaded_, !1, this);
        try {
            this.handleLoad_(this.getContentDocument_())
        } catch (e) {
            this.handleError_(goog.net.ErrorCode.ACCESS_DENIED)
        }
    }
}
,
goog.net.IframeIo.prototype.handleLoad_ = function (e) {
    var o, t;
    goog.log.fine(this.logger_, "Iframe loaded"),
        this.complete_ = !0,
        this.active_ = !1;
    try {
        var r = e.body;
        this.lastContent_ = r.textContent || r.innerText,
            this.lastContentHtml_ = r.innerHTML
    } catch (e) {
        o = goog.net.ErrorCode.ACCESS_DENIED
    }
    o || "function" != typeof this.errorChecker_ || (t = this.errorChecker_(e)) && (o = goog.net.ErrorCode.CUSTOM_ERROR),
        goog.log.log(this.logger_, goog.log.Level.FINER, "Last content: " + this.lastContent_),
        goog.log.log(this.logger_, goog.log.Level.FINER, "Last uri: " + this.lastUri_),
        o ? (goog.log.fine(this.logger_, "Load event occurred but failed"),
            this.handleError_(o, t)) : (goog.log.fine(this.logger_, "Load succeeded"),
                this.success_ = !0,
                this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR,
                this.dispatchEvent(goog.net.EventType.COMPLETE),
                this.dispatchEvent(goog.net.EventType.SUCCESS),
                this.makeReady_())
}
,
goog.net.IframeIo.prototype.handleError_ = function (e, o) {
    this.errorHandled_ || (this.success_ = !1,
        this.active_ = !1,
        this.complete_ = !0,
        (this.lastErrorCode_ = e) == goog.net.ErrorCode.CUSTOM_ERROR && (goog.asserts.assert(goog.isDef(o)),
            this.lastCustomError_ = o),
        this.dispatchEvent(goog.net.EventType.COMPLETE),
        this.dispatchEvent(goog.net.EventType.ERROR),
        this.makeReady_(),
        this.errorHandled_ = !0)
}
,
goog.net.IframeIo.prototype.handleIncrementalData_ = function (e) {
    this.dispatchEvent(new goog.net.IframeIo.IncrementalDataEvent(e))
}
,
goog.net.IframeIo.prototype.makeReady_ = function () {
    goog.log.info(this.logger_, "Ready for new requests"),
        this.scheduleIframeDisposal_(),
        this.disposeForm_(),
        this.dispatchEvent(goog.net.EventType.READY)
}
,
goog.net.IframeIo.prototype.createIframe_ = function () {
    goog.log.fine(this.logger_, "Creating iframe"),
        this.iframeName_ = this.name_ + "_" + (this.nextIframeId_++).toString(36);
    var e = {
        name: this.iframeName_,
        id: this.iframeName_
    };
    goog.userAgent.IE && goog.userAgent.VERSION < 7 && (e.src = 'javascript:""'),
        this.iframe_ = goog.dom.getDomHelper(this.form_).createDom(goog.dom.TagName.IFRAME, e);
    var o = this.iframe_.style;
    o.visibility = "hidden",
        o.width = o.height = "10px",
        o.display = "none",
        goog.userAgent.WEBKIT ? o.marginTop = o.marginLeft = "-10px" : (o.position = "absolute",
            o.top = o.left = "-10px")
}
,
goog.net.IframeIo.prototype.appendIframe_ = function () {
    goog.dom.getDomHelper(this.form_).getDocument().body.appendChild(this.iframe_)
}
,
goog.net.IframeIo.prototype.scheduleIframeDisposal_ = function () {
    var e = this.iframe_;
    e && (e.onreadystatechange = null,
        e.onload = null,
        e.onerror = null,
        this.iframesForDisposal_.push(e)),
        this.iframeDisposalTimer_ && (goog.Timer.clear(this.iframeDisposalTimer_),
            this.iframeDisposalTimer_ = null),
        goog.userAgent.GECKO || goog.userAgent.OPERA ? this.iframeDisposalTimer_ = goog.Timer.callOnce(this.disposeIframes_, goog.net.IframeIo.IFRAME_DISPOSE_DELAY_MS, this) : this.disposeIframes_(),
        this.iframe_ = null,
        this.iframeName_ = null
}
,
goog.net.IframeIo.prototype.disposeIframes_ = function () {
    for (this.iframeDisposalTimer_ && (goog.Timer.clear(this.iframeDisposalTimer_),
        this.iframeDisposalTimer_ = null); 0 != this.iframesForDisposal_.length;) {
        var e = this.iframesForDisposal_.pop();
        goog.log.info(this.logger_, "Disposing iframe"),
            goog.dom.removeNode(e)
    }
}
,
goog.net.IframeIo.prototype.clearForm_ = function () {
    this.form_ && this.form_ == goog.net.IframeIo.form_ && goog.dom.removeChildren(this.form_)
}
,
goog.net.IframeIo.prototype.disposeForm_ = function () {
    this.clearForm_(),
        this.form_ = null
}
,
goog.net.IframeIo.prototype.getContentDocument_ = function () {
    return this.iframe_ ? goog.dom.getFrameContentDocument(this.getRequestIframe()) : null
}
,
goog.net.IframeIo.prototype.getRequestIframe = function () {
    return this.iframe_ ? goog.net.IframeIo.useIeReadyStateCodePath_() ? this.iframe_ : goog.dom.getFrameContentDocument(this.iframe_).getElementById(this.iframeName_ + goog.net.IframeIo.INNER_FRAME_SUFFIX) : null
}
,
goog.net.IframeIo.prototype.testForFirefoxSilentError_ = function () {
    if (this.active_) {
        var e = this.getContentDocument_();
        if (e && !goog.reflect.canAccessProperty(e, "documentUri"))
            return this.ignoreResponse_ || goog.events.unlisten(this.getRequestIframe(), goog.events.EventType.LOAD, this.onIframeLoaded_, !1, this),
                void (navigator.onLine ? (goog.log.warning(this.logger_, "Silent Firefox error detected"),
                    this.handleError_(goog.net.ErrorCode.FF_SILENT_ERROR)) : (goog.log.warning(this.logger_, "Firefox is offline so report offline error instead of silent error"),
                        this.handleError_(goog.net.ErrorCode.OFFLINE)));
        this.firefoxSilentErrorTimeout_ = goog.Timer.callOnce(this.testForFirefoxSilentError_, 250, this)
    }
}
,
goog.net.IframeIo.IncrementalDataEvent = function (e) {
    goog.events.Event.call(this, goog.net.EventType.INCREMENTAL_DATA),
        this.data = e
}
,
goog.inherits(goog.net.IframeIo.IncrementalDataEvent, goog.events.Event),
goog.provide("goog.Delay"),
goog.provide("goog.async.Delay"),
goog.require("goog.Disposable"),
goog.require("goog.Timer"),
goog.async.Delay = function (e, o, t) {
    goog.async.Delay.base(this, "constructor"),
        this.listener_ = e,
        this.interval_ = o || 0,
        this.handler_ = t,
        this.callback_ = goog.bind(this.doAction_, this)
}
,
goog.inherits(goog.async.Delay, goog.Disposable),
goog.Delay = goog.async.Delay,
goog.async.Delay.prototype.id_ = 0,
goog.async.Delay.prototype.disposeInternal = function () {
    goog.async.Delay.base(this, "disposeInternal"),
        this.stop(),
        delete this.listener_,
        delete this.handler_
}
,
goog.async.Delay.prototype.start = function (e) {
    this.stop(),
        this.id_ = goog.Timer.callOnce(this.callback_, goog.isDef(e) ? e : this.interval_)
}
,
goog.async.Delay.prototype.stop = function () {
    this.isActive() && goog.Timer.clear(this.id_),
        this.id_ = 0
}
,
goog.async.Delay.prototype.fire = function () {
    this.stop(),
        this.doAction_()
}
,
goog.async.Delay.prototype.fireIfActive = function () {
    this.isActive() && this.fire()
}
,
goog.async.Delay.prototype.isActive = function () {
    return 0 != this.id_
}
,
goog.async.Delay.prototype.doAction_ = function () {
    this.id_ = 0,
        this.listener_ && this.listener_.call(this.handler_)
}
,
goog.provide("dymo.uuid"),
dymo.uuid.uuid = function () {
    for (var a = Array, s = new a(16), r = [], g = {}, e = 0; e < 256; e++)
        r[e] = (e + 256).toString(16).substr(1).toUpperCase(),
            g[r[e]] = e;
    function l(e) {
        var o = r
            , t = e;
        return o[t[0]] + o[t[1]] + o[t[2]] + o[t[3]] + "-" + o[t[4]] + o[t[5]] + "-" + o[t[6]] + o[t[7]] + "-" + o[t[8]] + o[t[9]] + "-" + o[t[10]] + o[t[11]] + o[t[12]] + o[t[13]] + o[t[14]] + o[t[15]]
    }
    function o(e, o, t) {
        var r = 4294967296
            , g = "binary" != e ? s : o || new a(16)
            , n = o && t || 0
            , i = Math.random() * r;
        return g[n++] = 255 & i,
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 255 & (i >>>= 8),
            i = Math.random() * r,
            g[n++] = 255 & i,
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 15 & (i >>>= 8) | 64,
            g[n++] = 255 & (i >>>= 8),
            i = Math.random() * r,
            g[n++] = 63 & i | 128,
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 255 & (i >>>= 8),
            i = Math.random() * r,
            g[n++] = 255 & i,
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 255 & (i >>>= 8),
            g[n++] = 255 & (i >>>= 8),
            void 0 === e ? l(g) : g
    }
    return o.parse = function (e) {
        var o = new a(16)
            , t = 0;
        return e.toUpperCase().replace(/[0-9A-F][0-9A-F]/g, function (e) {
            o[t++] = g[e]
        }),
            o
    }
        ,
        o.unparse = l,
        o.BufferClass = a,
        o
}(),
goog.require("goog.Uri"),
goog.provide("dymo.label.framework.NetworkPrinter"),
dymo.label.framework.NetworkPrinterName = function (e, o) {
    this.printerUri = e,
        this.printerName = o
}
,
dymo.label.framework.NetworkPrinterName.isNetworkPrinter = function (e) {
    var o = new goog.Uri(e);
    return o.hasScheme() && o.hasDomain() && o.hasPath()
}
,
dymo.label.framework.NetworkPrinterName.splitNetworkPrinterName = function (e) {
    var o = new goog.Uri(e)
        , t = o.getPath();
    return 1 < t.length && "/" == t.charAt(0) && (t = t.slice(1)),
        o.setPath(""),
        new dymo.label.framework.NetworkPrinterName(o.toString(), t)
}
,
goog.provide("dymo.label.framework.PrintJobStatusInfo");
var ASSUME_MOBILE = !1;
function _findPlugin(e) {
for (var o = 0; o < navigator.plugins.length; ++o)
    for (var t = navigator.plugins[o], r = 0; r < t.length; ++r)
        if (t[r].type == e)
            return !0;
return !1
}
function _createSafariPlugin() {
if (ASSUME_MOBILE)
    return null;
var e = "_DymoLabelFrameworkJslSafariPlugin";
if (!document.getElementById(e)) {
    var o = document.createElement("embed");
    o.type = "application/x-dymolabel",
        o.id = e,
        o.width = 1,
        o.height = 1,
        o.hidden = !0,
        document.body.appendChild(o)
}
return window[e]
}
function _createNsapiPlugin2(e) {
if (ASSUME_MOBILE)
    return null;
var o = "_DymoLabelFrameworkJslPlugin";
if (!document.getElementById(o)) {
    var t = document.createElement("embed");
    t.type = "application/x-dymolabel",
        t.id = o,
        e ? (t.width = 1,
            t.height = 1,
            t.hidden = !0) : (t.width = 0,
                t.height = 0,
                t.hidden = !1),
        document.body.appendChild(t)
}
return document.getElementById(o)
}
function _createNsapiPlugin() {
if (ASSUME_MOBILE)
    return null;
var e = _createNsapiPlugin2(!0);
return e.getPrinters || (document.body.removeChild(e),
    e = _createNsapiPlugin2(!1)),
    e
}
function _createMacNsapiPlugin2(e) {
if (ASSUME_MOBILE)
    return null;
var o = "_DymoLabelFrameworkJslPlugin";
if (!document.getElementById(o)) {
    var t = document.createElement("embed");
    t.type = "application/x-npapi-dymolabel",
        t.id = o,
        e ? (t.width = 1,
            t.height = 1,
            t.hidden = !0) : (t.width = 0,
                t.height = 0,
                t.hidden = !1),
        document.body.appendChild(t),
        t.getPrinters || (t.width = 1,
            t.height = 1,
            t.hidden = !1)
}
return document.getElementById(o)
}
function _createMacNsapiPlugin() {
if (ASSUME_MOBILE)
    return null;
var e = _createMacNsapiPlugin2(!0);
return e.getPrinters || (document.body.removeChild(e),
    e = _createMacNsapiPlugin2(!1)),
    e
}
function _createIePlugin() {
if (ASSUME_MOBILE)
    return null;
var e = new ActiveXObject("DYMOLabelFrameworkIEPlugin.Plugin");
if ("object" != typeof e)
    throw new Error("createFramework(): unable to create DYMO.Label.Framework object. Check DYMO Label Framework is installed");
return e
}
function traceMsg(e) {
window.dymo.label.framework.trace && window.console && window.console.log && console.log(e)
}
dymo.label.framework.PrintJobStatusInfo = function (e, o, t, r) {
this.printerName = e,
    this.jobId = o,
    this.status = t,
    this.statusMessage = r
}
,
dymo.label.framework.PrintJobStatusInfo.parse = function (e) {
    var o = {}
        , t = e.split(" ");
    return 1 <= t.length && (o.status = parseInt(t[0], 10)),
        o.statusMessage = t.slice(1).join(" "),
        o
}
,
dymo.label.framework.chooseEnvironment = function (e) {
    var o;
    if ("" != e.errorDetails)
        throw new Error(e.errorDetails);
    if (e.isWebServicePresent) {
        traceMsg("chooseEnvironment > WebServicePresent");
        var g = new DlsWebService;
        if (!g)
            throw new Error("Cannot establish connection to the web service. Is DYMO Label Framework installed?");
        return o = {
            getPrinters: function () {
                return g.getPrinters()
            },
            openLabelFile: function (e) {
                return g.openLabelFile(e)
            },
            printLabel: function (e, o, t, r) {
                g.printLabel(e, o, t, r)
            },
            printLabel2: function (e, o, t, r) {
                g.printLabel2(e, o, t, r)
            },
            renderLabel: function (e, o, t) {
                return g.renderLabel(e, o, t)
            },
            loadImageAsPngBase64: function (e) {
                return g.loadImageAsPngBase64(e)
            },
            getJobStatus: function (e, o) {
                var t;
                return t = goog.isFunction(g.getJobStatus) ? dymo.label.framework.PrintJobStatusInfo.parse(g.getJobStatus(e, parseInt(o, 10))) : {
                    status: dymo.label.framework.PrintJobStatus.Unknown,
                    statusMessage: "not implemented"
                },
                    new dymo.label.framework.PrintJobStatusInfo(e, o, t.status, t.statusMessage)
            },
            getPrintersAsync: function () {
                return g.getPrintersAsync()
            },
            openLabelFileAsync: function (e) {
                return g.openLabelFileAsync(e)
            },
            printLabelAsync: function (e, o, t, r) {
                return g.printLabelAsync(e, o, t, r)
            },
            printLabel2Async: function (e, o, t, r) {
                return g.printLabel2Async(e, o, t, r)
            },
            renderLabelAsync: function (e, o, t) {
                return g.renderLabelAsync(e, o, t)
            },
            loadImageAsPngBase64Async: function (e) {
                return g.loadImageAsPngBase64Async(e)
            }
        }
    }
    if ("ActiveXObject" in window) {
        traceMsg("chooseEnvironment > ActiveXObject"),
            o = {};
        var n = _createIePlugin();
        o.getPrinters = function () {
            return n.GetPrinters()
        }
            ,
            o.openLabelFile = function (e) {
                return n.OpenLabelFile(e)
            }
            ,
            o.printLabel = function (e, o, t, r) {
                n.PrintLabel(e, o, t, r)
            }
            ,
            o.renderLabel = function (e, o, t) {
                return n.RenderLabel(e, o, t)
            }
            ,
            o.loadImageAsPngBase64 = function (e) {
                return n.LoadImageAsPngBase64(e)
            }
            ,
            o.printLabel2 = function (e, o, t, r) {
                if (goog.isFunction(n.PrintLabel2))
                    return n.PrintLabel2(e, o, t, r).toString();
                n.PrintLabel(e, o, t, r)
            }
            ,
            o.getJobStatus = function (e, o) {
                var t;
                return t = goog.isFunction(n.GetJobStatus) ? dymo.label.framework.PrintJobStatusInfo.parse(n.GetJobStatus(e, parseInt(o, 10))) : {
                    status: dymo.label.framework.PrintJobStatus.Unknown,
                    statusMessage: "not implemented"
                },
                    new dymo.label.framework.PrintJobStatusInfo(e, o, t.status, t.statusMessage)
            }
    } else if (-1 != navigator.platform.indexOf("Win")) {
        traceMsg("chooseEnvironment > WIN");
        var i = _createNsapiPlugin();
        if (!i)
            throw new Error("DYMO Label Framework is not installed");
        o = {
            getPrinters: function () {
                return i.getPrinters()
            },
            openLabelFile: function (e) {
                return i.openLabelFile(e)
            },
            printLabel: function (e, o, t, r) {
                i.printLabel(e, o, t, r)
            },
            renderLabel: function (e, o, t) {
                return i.renderLabel(e, o, t)
            },
            loadImageAsPngBase64: function (e) {
                return i.loadImageAsPngBase64(e)
            },
            printLabel2: function (e, o, t, r) {
                if (goog.isFunction(i.printLabel2))
                    return i.printLabel2(e, o, t, r).toString();
                i.printLabel(e, o, t, r)
            },
            getJobStatus: function (e, o) {
                var t;
                return t = goog.isFunction(i.getJobStatus) ? dymo.label.framework.PrintJobStatusInfo.parse(i.getJobStatus(e, parseInt(o, 10))) : {
                    status: dymo.label.framework.PrintJobStatus.Unknown,
                    statusMessage: "not implemented"
                },
                    new dymo.label.framework.PrintJobStatusInfo(e, o, t.status, t.statusMessage)
            }
        }
    } else {
        var a;
        if (traceMsg("chooseEnvironment > not WIN"),
            traceMsg("chooseEnvironment > safariPlugin : " + !!(a = _findPlugin("application/x-dymolabel") ? (traceMsg("chooseEnvironment > _createSafariPlugin"),
                _createSafariPlugin()) : (traceMsg("chooseEnvironment > _createMacNsapiPlugin"),
                    _createMacNsapiPlugin()))),
            !a)
            throw new Error("DYMO Label Framework is not installed");
        o = {
            getPrinters: function () {
                return a.getPrinters()
            },
            openLabelFile: function (e) {
                var o = a.openLabelFile(e);
                if (!o)
                    throw new Error("Unable to open label file '" + e + "'");
                return o
            },
            printLabel: function (e, o, t, r) {
                a.printLabel(t, e, o, r)
            },
            renderLabel: function (e, o, t) {
                return a.renderLabel(e, o, t)
            },
            loadImageAsPngBase64: function (e) {
                var o = a.loadImageAsPngBase64(e);
                if (!o)
                    throw new Error("Unable to load image from uri '" + e + "'");
                return o
            },
            printLabel2: function (e, o, t, r) {
                if (goog.isFunction(a.printLabel2))
                    return a.printLabel2(t, e, o, r).toString();
                a.printLabel(t, e, o, r)
            },
            getJobStatus: function (e, o) {
                var t;
                return t = goog.isFunction(a.getJobStatus) ? dymo.label.framework.PrintJobStatusInfo.parse(a.getJobStatus(e, parseInt(o, 10))) : {
                    status: dymo.label.framework.PrintJobStatus.Unknown,
                    statusMessage: "not implemented"
                },
                    new dymo.label.framework.PrintJobStatusInfo(e, o, t.status, t.statusMessage)
            }
        }
    }
    function t(r) {
        return function () {
            var t = arguments;
            return new goog.Promise(function (e, o) {
                e(r.apply(null, t))
            }
            )
        }
    }
    return o.getPrintersAsync = t(o.getPrinters),
        o.openLabelFileAsync = t(o.openLabelFile),
        o.printLabelAsync = t(o.printLabel),
        o.printLabel2Async = t(o.printLabel2),
        o.renderLabelAsync = t(o.renderLabel),
        o.loadImageAsPngBase64Async = t(o.loadImageAsPngBase64),
        o
}
,
dymo.label.framework.trace = !1,
dymo.label.framework.currentFramework = 0;
var createFaultyFramework = function (e) {
function o() {
    throw t
}
var t = e || new Error("DYMO Label Framework Plugin or WebService are not installed");
return {
    getPrinters: o,
    openLabelFile: o,
    printLabel: o,
    printLabel2: o,
    renderLabel: o,
    loadImageAsPngBase64: o,
    getJobStatus: o,
    getPrintersAsync: o,
    openLabelFileAsync: o,
    printLabelAsync: o,
    printLabel2Async: o,
    renderLabelAsync: o,
    loadImageAsPngBase64Async: o
}
}, _createFramework = (Tca = !1,
Uca = null,
function e(o, t) {
    if (Tca)
        throw traceMsg("_createFramework > Error service discovery is in progress. "),
        new Error("DYMO Label Framework service discovery is in progress.");
    return Sca ? (traceMsg("_createFramework > returning existing instance of _framework, has callBack: " + !!o),
        o && o(Uca),
        Sca) : this && this.constructor == e ? (Tca = !0,
            _createFramework.resetFramework = function () {
                Uca = Sca = null,
                    dymo.label.framework.currentFramework = 0
            }
            ,
            dymo.label.framework.checkEnvironment(function (e) {
                traceMsg("onEnvironmentChecked > checkResult isBrowserSupported : " + (Uca = e).isBrowserSupported + ", isFrameworkInstalled: " + e.isFrameworkInstalled + ", isWebServicePresent: " + e.isWebServicePresent + ", errorDetails: " + e.errorDetails);
                try {
                    Sca = dymo.label.framework.chooseEnvironment(e),
                        dymo.label.framework.currentFramework = e.isWebServicePresent ? 2 : 1
                } catch (e) {
                    if (traceMsg("onEnvironmentChecked > exception e : " + (e.description || e.message || e)),
                        !t)
                        throw e;
                    Sca = createFaultyFramework(e),
                        traceMsg("onEnvironmentChecked > fall back to createFaultyFramework")
                } finally {
                    Tca = !1
                }
                o && o(Uca)
            }, t),
            traceMsg("_createFramework > return _framework : " + Sca + (t ? " (async)" : " (sync)")),
            Sca) : new e(o, t)
}
), Sca, Tca, Uca;
dymo.label.framework.init = function (e) {
_createFramework(e, !0)
}
,
goog.provide("dymo.label.framework.PrinterInfo"),
goog.provide("dymo.label.framework.LabelWriterPrinterInfo"),
goog.provide("dymo.label.framework.TapePrinterInfo"),
goog.provide("dymo.label.framework.DZPrinterInfo"),
dymo.label.framework.PrinterInfo = function (e, o, t, r, g) {
    this.printerType = e,
        this.name = o,
        this.modelName = t,
        this.isConnected = r,
        this.isLocal = g,
        this.printerUri = "",
        this.originalPrinterName = ""
}
,
dymo.label.framework.PrinterInfo.prototype.isNetworkPrinter = function () {
    return "" != this.printerUri
}
,
dymo.label.framework.LabelWriterPrinterInfo = function (e, o, t, r, g) {
    dymo.label.framework.PrinterInfo.call(this, "LabelWriterPrinter", e, o, t, r),
        this.isTwinTurbo = g
}
,
goog.inherits(dymo.label.framework.LabelWriterPrinterInfo, dymo.label.framework.PrinterInfo),
dymo.label.framework.TapePrinterInfo = function (e, o, t, r, g) {
    dymo.label.framework.PrinterInfo.call(this, "TapePrinter", e, o, t, r),
        this.isAutoCutSupported = g
}
,
goog.inherits(dymo.label.framework.TapePrinterInfo, dymo.label.framework.PrinterInfo),
dymo.label.framework.DZPrinterInfo = function (e, o, t, r, g) {
    dymo.label.framework.PrinterInfo.call(this, "DZPrinter", e, o, t, r),
        this.isAutoCutSupported = g
}
,
goog.inherits(dymo.label.framework.DZPrinterInfo, dymo.label.framework.PrinterInfo),
goog.require("goog.net.Jsonp"),
goog.require("goog.Uri"),
goog.require("dymo.label.framework.NetworkPrinter"),
goog.require("dymo.label.framework.PrintJobStatusInfo"),
goog.require("dymo.label.framework.PrinterInfo"),
goog.provide("dymo.label.framework.PrintJob"),
dymo.label.framework.PrintJob = function (e, o) {
    this._printerInfo = e,
        this._jobId = o
}
,
dymo.label.framework.PrintJob.prototype.getPrinterName = function () {
    return this._printerInfo.name
}
,
goog.exportProperty(dymo.label.framework.PrintJob.prototype, "getPrinterName", dymo.label.framework.PrintJob.prototype.getPrinterName),
dymo.label.framework.PrintJob.prototype.getJobId = function () {
    return this._jobId
}
,
goog.exportProperty(dymo.label.framework.PrintJob.prototype, "getJobId", dymo.label.framework.PrintJob.prototype.getJobId),
dymo.label.framework.PrintJob.prototype.getStatus = function (e) {
    if (this._printerInfo.isNetworkPrinter())
        this.getStatusForNetworkPrinter(e);
    else {
        var o;
        try {
            o = _createFramework().getJobStatus(this._printerInfo.name, this._jobId)
        } catch (e) {
            o = new dymo.label.framework.PrintJobStatusInfo(this.getPrinterName(), this._jobId, dymo.label.framework.PrintJobStatus.ProcessingError, e.message || e)
        }
        e(o)
    }
}
,
goog.exportProperty(dymo.label.framework.PrintJob.prototype, "getStatus", dymo.label.framework.PrintJob.prototype.getStatus),
dymo.label.framework.PrintJob.prototype.getStatusForNetworkPrinter = function (t) {
    var r = this.getPrinterName()
        , g = this._jobId
        , o = this._printerInfo.printerUri;
    new goog.net.Jsonp(goog.Uri.resolve(o, "getPrintJobStatus"), "callback").send({
        jobId: g,
        printerName: this._printerInfo.originalPrinterName
    }, function (e) {
        var o = new dymo.label.framework.PrintJobStatusInfo(r, g, e.status, e.statusMessage);
        t(o)
    }, function () {
        var e = new dymo.label.framework.PrintJobStatusInfo(r, g, dymo.label.framework.PrintJobStatus.ProcessingError, 'Error processing getPrintJobStatus(): Unable to contact "' + o + '"');
        t(e)
    })
}
,
goog.require("goog.net.Jsonp"),
goog.require("goog.net.IframeIo"),
goog.require("goog.async.Delay"),
goog.require("dymo.uuid"),
goog.require("dymo.label.framework.PrintJob"),
goog.provide("dymo.label.framework.CheckEnvironmentResult"),
dymo.label.framework.VERSION = "3.0.0",
dymo.label.framework.CheckEnvironmentResult = function (e) {
    this.isWebServicePresent = e.isWebServicePresent,
        this.isBrowserSupported = e.isBrowserSupported,
        this.isFrameworkInstalled = e.isFrameworkInstalled,
        this.errorDetails = e.errorDetails
}
,
dymo.label.framework.checkEnvironment = function (e, o) {
    function t() {
        g.isBrowserSupported = !0,
            g.isFrameworkInstalled = !0,
            g.isWebServicePresent = !0,
            e && e(g)
    }
    function r() {
        !function () {
            traceMsg("checkLegacyPlugins"),
                g.isWebServicePresent = !1;
            var e = window.navigator.platform;
            if (-1 != e.indexOf("Win"))
                if (traceMsg("checkLegacyPlugins > WIN platform "),
                    "ActiveXObject" in window) {
                    traceMsg("checkLegacyPlugins > ActiveXObject"),
                        g.isBrowserSupported = !0;
                    try {
                        "object" != typeof new ActiveXObject("DYMOLabelFrameworkIEPlugin.Plugin") ? g.errorDetails = "Unable to create DYMO.Label.Framework ActiveX object. Check that DYMO.Label.Framework is installed" : g.isFrameworkInstalled = !0
                    } catch (e) {
                        g.errorDetails = "Unable to create DYMO.Label.Framework ActiveX object. Check that DYMO.Label.Framework is installed. Exception details: " + e
                    }
                } else
                    traceMsg("checkLegacyPlugins > non-IE"),
                        g.isBrowserSupported = !0,
                        _findPlugin("application/x-dymolabel") ? (traceMsg("checkLegacyPlugins > 'application/x-dymolabel'"),
                            g.isFrameworkInstalled = !0) : g.errorDetails = "DYMO Label Framework Plugin is not installed";
            else if (-1 != e.indexOf("Mac")) {
                var o;
                if (traceMsg("checkLegacyPlugins > Mac platform"),
                    g.isBrowserSupported = !0,
                    _findPlugin("application/x-dymolabel"))
                    traceMsg("checkLegacyPlugins > safariPluginFound"),
                        "2.0" <= (o = _createSafariPlugin()).GetAPIVersion() ? g.isFrameworkInstalled = !0 : g.errorDetails = "DYMO Label Safari Plugin is installed but outdated. Install the latest version.";
                else if (_findPlugin("application/x-npapi-dymolabel"))
                    traceMsg("checkLegacyPlugins > 'application/x-npapi-dymolabel'"),
                        (o = _createMacNsapiPlugin()) && o.getPrinters ? g.isFrameworkInstalled = !0 : g.errorDetails = 'DYMO NSAPI plugin is loaded but no callable functions found. If running Safari, then run it in 64-bit mode (MacOS X >= 10.7) or set "Open using Rosetta" option';
                else
                    g.errorDetails = "DYMO Label Plugin is not installed."
            } else
                g.errorDetails = "The operating system is not supported."
        }(),
            e && e(g)
    }
    var g = {
        isBrowserSupported: !1,
        isFrameworkInstalled: !1,
        isWebServicePresent: !1,
        errorDetails: ""
    };
    return dymo.label.framework.currentFramework ? (traceMsg("checkEnvironment > return existing instance of framework"),
        2 == dymo.label.framework.currentFramework ? t() : (g.isBrowserSupported = !0,
            g.isFrameworkInstalled = !0,
            g.isWebServicePresent = !1,
            e && e(g))) : o ? asyncFindWebService(t, r) : syncCheckWebService(t, r),
        g
}
;
var _networkPrinters = {}
, NetworkPrinterInfo = function (e, o, t) {
    this.printerUri = e,
        this.printerLocation = o,
        this.printersXml = t
};
function createPrintersCollection() {
var e = [];
return e.byIndex = [],
    Object.defineProperty(e, "byIndex", {
        enumerable: !1,
        value: []
    }),
    e
}
function addPrinterToCollection(e, o) {
var t = e.name;
o.push(e),
    o.byIndex.push(e),
    t.match(/^\d+$/) && console.error("Printer name consisting of numbers only (" + t + ') will break proper array behavior. Consider using "byIndex" property for accessing elements by index reliably.'),
    "length" === t && console.error('Using "length" as printer name overrides Array.length property!'),
    o[t] = e
}
function getPrinters(e) {
function o(e, o) {
    return dymo.xml.getElementText(dymo.xml.getElement(e, o))
}
var t, r, g, n, i, a, s, l = dymo.xml.parse(e), u = createPrintersCollection(), c = dymo.xml.getElement(l, "Printers"), d = dymo.xml.getElements(c, "LabelWriterPrinter");
for (t = 0; t < d.length; t++) {
    r = o(d[t], "Name"),
        g = o(d[t], "ModelName"),
        n = "True" == o(d[t], "IsConnected"),
        i = "True" == o(d[t], "IsLocal"),
        a = "True" == o(d[t], "IsTwinTurbo"),
        addPrinterToCollection(new dymo.label.framework.LabelWriterPrinterInfo(r, g, n, i, a), u)
}
var m = dymo.xml.getElements(c, "TapePrinter");
for (t = 0; t < m.length; t++) {
    r = o(m[t], "Name"),
        g = o(m[t], "ModelName"),
        n = "True" == o(m[t], "IsConnected"),
        i = "True" == o(m[t], "IsLocal"),
        s = "True" == o(m[t], "IsAutoCutSupported"),
        addPrinterToCollection(new dymo.label.framework.TapePrinterInfo(r, g, n, i, s), u)
}
var p = dymo.xml.getElements(c, "DZPrinter");
for (t = 0; t < p.length; t++) {
    r = o(p[t], "Name"),
        g = o(p[t], "ModelName"),
        n = "True" == o(p[t], "IsConnected"),
        i = "True" == o(p[t], "IsLocal"),
        s = "True" == o(p[t], "IsAutoCutSupported"),
        addPrinterToCollection(new dymo.label.framework.DZPrinterInfo(r, g, n, i, s), u)
}
return u
}
function addNetworkPrintersToCollection(e) {
for (var o in _networkPrinters)
    for (var t = _networkPrinters[o].getPrinters(), r = 0; r < t.length; ++r) {
        addPrinterToCollection(t[r], e)
    }
}
function getPrintersByType(e) {
var o = []
    , t = dymo.label.framework.getPrinters();
t = t.byIndex;
for (var r = 0; r < t.length; r++) {
    var g = t[r];
    g.printerType && g.printerType == e && o.push(g)
}
return o
}
function getPrintersByTypeAsync(g) {
return dymo.label.framework.getPrintersAsync().then(function (e) {
    var o = [];
    e = e.byIndex;
    for (var t = 0; t < e.length; t++) {
        var r = e[t];
        r.printerType && r.printerType == g && o.push(r)
    }
    return o
})
}
function printLabelToNetworkPrinter(e, o, t, r) {
var n = dymo.uuid.uuid()
    , g = {
        printerName: e.originalPrinterName,
        labelXml: t,
        printParamsXml: o,
        labelSetXml: r
    }
    , i = goog.Uri.resolve(e.printerUri, "pl")
    , a = goog.json.serialize(g)
    , s = function (r, g) {
        var e = 4e3 * r
            , o = "";
        e >= a.length ? r = -1 : o = a.substr(e, 4e3),
            new goog.net.Jsonp(i, "c").send({
                j: n,
                cid: r,
                pl: o
            }, function (e) {
                var o = e.status
                    , t = new goog.debug.Logger("dymo.label.framework");
                t.setLevel(goog.debug.Logger.Level.INFO),
                    0 == o ? -1 != r ? s(++r, 0) : t.info("Finished sending job payload for " + n) : -5 == o ? g < 10 ? s(++e.lastAckChunkId, ++g) : t.warning('Unable to send print job data for "' + n + '": STATUS_INVALID_CHUNK_ID: Max retry count reached') : g < 10 ? s(r, ++g) : t.warning('Unable to send print job data for "' + n + '": Max retry count reached')
            }, function () {
                var e = new goog.debug.Logger("dymo.label.framework");
                e.setLevel(goog.debug.Logger.Level.INFO),
                    g < 10 ? s(r, ++g) : e.warning('Unable to send print job data for "' + n + '": error: Max retry count reached')
            })
    };
return s(0, 0),
    new dymo.label.framework.PrintJob(e, n)
}
function createRenderLabelRequest(e, o, t, r) {
var g = {};
return g.requestId = e,
    g.imageData = r,
    g.statusId = o,
    g.statusMessage = t,
    g
}
NetworkPrinterInfo.prototype.getPrinters = function () {
var e = getPrinters(this.printersXml)
    , o = new goog.Uri(this.printerUri)
    , t = this.printerLocation;
"" == t && (t = o.getDomain());
for (var r = 0; r < e.length; ++r) {
    var g = e[r]
        , n = g.name;
    g.name = n + " @ " + t,
        g.printerUri = this.printerUri,
        g.location = t,
        g.originalPrinterName = n,
        g.printerUri = g.printerUri,
        g.location = g.location,
        g.localName = g.originalPrinterName
}
return e
}
,
dymo.label.framework.addPrinterUri = function (t, e, r, o) {
    var g = e || "";
    goog.isString(g) || (g = g.toString());
    var n = null;
    o && (n = function () {
        o(t)
    }
    );
    var i = goog.uri.utils.appendPath(t, "getPrinters");
    new goog.net.Jsonp(i, "callback").send(null, function (e) {
        var o = new NetworkPrinterInfo(t, g, e);
        _networkPrinters[t] = o,
            r && r(t)
    }, n)
}
,
dymo.label.framework.removePrinterUri = function (e) {
    delete _networkPrinters[e]
}
,
dymo.label.framework.removeAllPrinterUri = function () {
    _networkPrinters = {}
}
,
dymo.label.framework.getPrinters = function () {
    var e = createPrintersCollection();
    if (!ASSUME_MOBILE)
        try {
            e = getPrinters(_createFramework().getPrinters())
        } catch (e) { }
    return addNetworkPrintersToCollection(e),
        e
}
,
dymo.label.framework.getPrintersAsync = function () {
    if (ASSUME_MOBILE) {
        var e = createPrintersCollection();
        return addNetworkPrintersToCollection(e),
            goog.Promise.resolve(e)
    }
    return _createFramework().getPrintersAsync().then(function (e) {
        try {
            var o = getPrinters(e);
            addNetworkPrintersToCollection(o)
        } catch (e) { }
        return o
    })
}
,
dymo.label.framework.getLabelWriterPrinters = function () {
    return getPrintersByType("LabelWriterPrinter")
}
,
dymo.label.framework.getTapePrinters = function () {
    return getPrintersByType("TapePrinter")
}
,
dymo.label.framework.getDZPrinters = function () {
    return getPrintersByType("DZPrinter")
}
,
dymo.label.framework.getLabelWriterPrintersAsync = function () {
    return getPrintersByTypeAsync("LabelWriterPrinter")
}
,
dymo.label.framework.getTapePrintersAsync = function () {
    return getPrintersByTypeAsync("TapePrinter")
}
,
dymo.label.framework.getDZPrintersAsync = function () {
    return getPrintersByTypeAsync("DZPrinter")
}
,
dymo.label.framework.openLabelFile = function (e) {
    return new dymo.label.framework.Label(_createFramework().openLabelFile(e))
}
,
dymo.label.framework.openLabelFileAsync = function (e) {
    return _createFramework().openLabelFileAsync(e).then(function (e) {
        return new dymo.label.framework.Label(e)
    })
}
,
dymo.label.framework.openLabelXml = function (e) {
    var o = new goog.debug.Logger("dymo.label.framework");
    return o.setLevel(goog.debug.Logger.Level.INFO),
        o.info(e),
        new dymo.label.framework.Label(e)
}
,
dymo.label.framework.printLabel = function (e, o, t, r) {
    if (o = o || "",
        "string" != typeof (r = r || "") && (r = r.toString()),
        void 0 === t)
        throw new Error("printLabel(): labelXml parameter should be specified");
    "string" != typeof t && (t = t.toString());
    var g = dymo.label.framework.getPrinters()[e];
    if (!goog.isDefAndNotNull(g))
        throw new Error("printLabel(): unknown printer '" + e + "'");
    ASSUME_MOBILE || g.isNetworkPrinter() ? printLabelToNetworkPrinter(g, o, t, r) : _createFramework().printLabel(g.name, o, t, r)
}
,
dymo.label.framework.printLabelAsync = function (t, r, g, n) {
    if (r = r || "",
        "string" != typeof (n = n || "") && (n = n.toString()),
        void 0 === g)
        throw new Error("printLabelAsync(): labelXml parameter should be specified");
    return "string" != typeof g && (g = g.toString()),
        dymo.label.framework.getPrintersAsync().then(function (e) {
            var o = e[t];
            if (goog.isDefAndNotNull(o))
                return ASSUME_MOBILE || o.isNetworkPrinter() ? printLabelToNetworkPrinter(o, r, g, n) : _createFramework().printLabelAsync(o.name, r, g, n);
            throw new Error("printLabelAsync(): unknown printer '" + t + "'")
        })
}
,
dymo.label.framework.printLabel2 = function (e, o, t, r) {
    if (o = o || "",
        "string" != typeof (r = r || "") && (r = r.toString()),
        void 0 === t)
        throw new Error("printLabel2(): labelXml parameter should be specified");
    "string" != typeof t && (t = t.toString());
    var g = dymo.label.framework.getPrinters()[e];
    if (goog.isDefAndNotNull(g))
        return ASSUME_MOBILE || g.isNetworkPrinter() ? printLabelToNetworkPrinter(g, o, t, r) : new dymo.label.framework.PrintJob(g, _createFramework().printLabel2(e, o, t, r));
    throw new Error("printLabel(): unknown printer '" + e + "'")
}
,
dymo.label.framework.printLabel2Async = function (t, r, g, n) {
    if (r = r || "",
        "string" != typeof (n = n || "") && (n = n.toString()),
        void 0 === g)
        throw new Error("printLabel2Async(): labelXml parameter should be specified");
    return "string" != typeof g && (g = g.toString()),
        dymo.label.framework.getPrintersAsync().then(function (e) {
            var o = e[t];
            if (goog.isDefAndNotNull(o))
                return ASSUME_MOBILE || o.isNetworkPrinter() ? printLabelToNetworkPrinter(o, r, g, n) : _createFramework().printLabel2Async(t, r, g, n).then(function (e) {
                    return new dymo.label.framework.PrintJob(o, e)
                });
            throw new Error("printLabel2Async(): unknown printer '" + t + "'")
        })
}
,
dymo.label.framework.printLabelAndPollStatus = function (e, o, t, r, g, n) {
    var i = dymo.label.framework.printLabel2(e, o, t, r)
        , a = function (e) {
            if (g(i, e)) {
                var o = new goog.async.Delay(function () {
                    i.getStatus(a),
                        o.dispose()
                }
                    , n);
                o.start()
            }
        };
    return i.getStatus(a),
        i
}
,
dymo.label.framework.printLabelAndPollStatusAsync = function (e, o, t, r, g, n) {
    return dymo.label.framework.printLabel2Async(e, o, t, r).then(function (t) {
        var r = function (e) {
            if (g(t, e)) {
                var o = new goog.async.Delay(function () {
                    t.getStatus(r),
                        o.dispose()
                }
                    , n);
                o.start()
            }
        };
        return t.getStatus(r),
            t
    })
}
,
dymo.label.framework.renderLabel = function (e, o, t) {
    if (void 0 === e)
        throw new Error("renderLabel(): labelXml parameter should be specified");
    return "string" != typeof e && (e = e.toString()),
        o = o || "",
        t = t || "",
        _createFramework().renderLabel(e, o, t)
}
,
dymo.label.framework.renderLabelAsync = function (e, o, t) {
    if (void 0 === e)
        throw new Error("renderLabelAsync(): labelXml parameter should be specified");
    return "string" != typeof e && (e = e.toString()),
        o = o || "",
        t = t || "",
        _createFramework().renderLabelAsync(e, o, t)
}
,
dymo.label.framework.loadImageAsPngBase64 = function (e) {
    return _createFramework().loadImageAsPngBase64(e)
}
,
dymo.label.framework.loadImageAsPngBase64Async = function (e) {
    return _createFramework().loadImageAsPngBase64Async(e)
}
,
dymo.label.framework.createLabelWriterPrintParamsXml = function (e) {
    if (!e)
        return "";
    var o = dymo.xml.parse("<LabelWriterPrintParams/>")
        , t = o.documentElement;
    return e.copies && dymo.xml.appendElement(t, "Copies", e.copies.toString()),
        e.jobTitle && dymo.xml.appendElement(t, "JobTitle", e.jobTitle),
        e.flowDirection && dymo.xml.appendElement(t, "FlowDirection", e.flowDirection),
        e.printQuality && dymo.xml.appendElement(t, "PrintQuality", e.printQuality),
        e.twinTurboRoll && dymo.xml.appendElement(t, "TwinTurboRoll", e.twinTurboRoll),
        dymo.xml.serialize(o)
}
,
dymo.label.framework.createTapePrintParamsXml = function (e) {
    if (!e)
        return "";
    var o = dymo.xml.parse("<TapePrintParams/>")
        , t = o.documentElement;
    return e.copies && dymo.xml.appendElement(t, "Copies", e.copies.toString()),
        e.jobTitle && dymo.xml.appendElement(t, "JobTitle", e.jobTitle),
        e.flowDirection && dymo.xml.appendElement(t, "FlowDirection", e.flowDirection),
        e.alignment && dymo.xml.appendElement(t, "Alignment", e.alignment),
        e.cutMode && dymo.xml.appendElement(t, "CutMode", e.cutMode),
        dymo.xml.serialize(o)
}
,
dymo.label.framework.createDZPrintParamsXml = function (e) {
    if (!e)
        return "";
    var o = dymo.xml.parse("<DZPrintParams/>")
        , t = o.documentElement;
    return e.copies && dymo.xml.appendElement(t, "Copies", e.copies.toString()),
        e.jobTitle && dymo.xml.appendElement(t, "JobTitle", e.jobTitle),
        e.flowDirection && dymo.xml.appendElement(t, "FlowDirection", e.flowDirection),
        e.alignment && dymo.xml.appendElement(t, "Alignment", e.alignment),
        e.cutMode && dymo.xml.appendElement(t, "CutMode", e.cutMode),
        dymo.xml.serialize(o)
}
,
dymo.label.framework.createLabelRenderParamsXml = function (e) {
    if (!e)
        return "";
    function o(e, o) {
        dymo.xml.appendElement(r, e, void 0, {
            Alpha: o.a || o.alpha || 255,
            Red: o.r || o.red || 0,
            Green: o.g || o.green || 0,
            Blue: o.b || o.blue || 0
        })
    }
    var t = dymo.xml.parse("<LabelRenderParams/>")
        , r = t.documentElement;
    return e.labelColor && o("LabelColor", e.labelColor),
        e.shadowColor && o("ShadowColor", e.shadowColor),
        void 0 !== e.shadowDepth && dymo.xml.appendElement(r, "ShadowDepth", e.shadowDepth.toString()),
        e.flowDirection && dymo.xml.appendElement(r, "FlowDirection", e.flowDirection),
        void 0 !== e.pngUseDisplayResolution && dymo.xml.appendElement(r, "PngUseDisplayResolution", e.pngUseDisplayResolution ? "True" : "False"),
        dymo.xml.serialize(t)
}
;
