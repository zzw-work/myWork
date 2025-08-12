/**
 * 环境判断
 */
var __wormhole__, __wormhole_extend__;
var getContext = function () {
  // mock,举例
  let wormhole = {
    mtopEvent: {
      httpInfo: {
        headers: {
          browseruseragentkey:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.18(0x1800123f) NetType/WIFI Language/zh_CN",
        },
        cookies: {
          xxx: "xxx",
        },
        params: {
          xxx: "xxx",
        },
        method: "GET",
      },
    },
  };
  return wormhole;
};

var getUserAgent = function (isSSR) {
  if (isSSR) {
    var _motEvent_httpInfo;
    var context = getContext();
    var mtopEvent = (context || {}).mtopEvent;
    var headers =
      (mtopEvent === null || mtopEvent === void 0
        ? void 0
        : (_motEvent_httpInfo = mtopEvent.httpInfo) === null ||
          _motEvent_httpInfo === void 0
        ? void 0
        : _motEvent_httpInfo.headers) || {};
    return headers["browseruseragentkey"] || headers["user-agent"] || "";
  }
  if (typeof navigator === "undefined") {
    return "";
  }
  return navigator.swuserAgent || navigator.userAgent || "";
};

export var UNKNOWN = "UNKNOWN";

/** 是否预发环境 */
var isPre = false;

/** 是否预发环境或本地开发环境 */
var isPreOrDev = false;

/** 系统版本 */
var osVersion = UNKNOWN;

/** appname */
var appName = UNKNOWN;

/** app版本 */
var appVersion = UNKNOWN;

/** 是否是ios环境 */
var isIOS = false;

/** * 是否是android环境 */
var isAndroid = false;

/** * 是否是鸿蒙环境 */
var isHarmony = false;

/** 是否iPhone X */
var isIPhoneX = false;

/** 容器是否Web */
var isWeb = false;

/** 是否原生微信小程序 */
var isMiniWx = false;

/** 是否微信小程序套壳H5 */
var isWxMiniWeb = false;

/** 微信H5 */
var isWxWeb = false;

/** 是否是支付宝 */
var isAlipay = false;

/** 是否原生支付宝小程序 */
var isMiniAlipay = false;

/** 是否支付宝小程序套壳H5 */
var isAlipayMiniWeb = false;

/** 支付宝H5 */
var isAlipayWeb = false;

var isWeixin = false; // 是否微信环境

/** 是否是SSR环境 */
var isSSR = false;
var init = function () {
  var _window_navigator, _window_navigator_userAgent;
  isSSR =
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node &&
    typeof window !== "undefined" &&
    window.isSSR;
  isWeb = typeof window !== "undefined" && "onload" in window;
  var ua = getUserAgent(isSSR);
  // 微信相关
  isMiniWx =
    typeof __wxConfig !== "undefined" &&
    typeof wx !== "undefined" &&
    wx &&
    typeof wx.login === "function";
  isWxMiniWeb =
    typeof window !== "undefined" &&
    (window.__wxjs_environment === "miniprogram" ||
      ((_window_navigator = window.navigator) === null ||
      _window_navigator === void 0
        ? void 0
        : (_window_navigator_userAgent = _window_navigator.userAgent) ===
            null || _window_navigator_userAgent === void 0
        ? void 0
        : _window_navigator_userAgent.includes("miniProgram")));
  isWxWeb = !isWxMiniWeb && /MicroMessenger/i.test(ua);
  if (typeof location !== "undefined") {
    var host = location.host,
      port = location.port;
    isPre = host.includes("pre-") || host.indexOf(".wapa.") > 0;
    isPreOrDev = isPre || !!port;
  }
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  isHarmony = !!ua.match(/(ArkWeb);?[\s/]+([\d.]+)?/);
  var appInfo = ua.match(/AliApp\(([^)]*)\)/);
  if (appInfo) {
    appName = appInfo[1] && appInfo[1].split("/")[0];
    appVersion = appInfo[1] && appInfo[1].split("/")[1];
  }
  isAlipay = appName === "AP";
  //支付宝相关
  isMiniAlipay =
    typeof my !== "undefined" && my && typeof my.ap !== "undefined";
  isAlipayMiniWeb = isAlipay && isMiniAlipay && /miniProgram/.test(ua);
  isAlipayWeb = isAlipay && !isMiniAlipay && !isAlipayMiniWeb && isWeb;
  // 微信相关
  isWeixin = /MicroMessenger/i.test(ua);
  if (isWeixin) {
    appName = "Weixin";
  } else if (!appName) {
    appName = "Other";
  }
  if (android) {
    isAndroid = true;
    osVersion = android[2];
  } else if (iphone || ipad) {
    isIOS = true;
    osVersion = iphone
      ? iphone[2].replace(/_/g, ".")
      : ipad[2].replace(/_/g, ".");
  }

  if (isHarmony) {
    var harmony = ua.match(/(OpenHarmonyOS|HarmonyOS)\s([\d.]+)?/i);
    osVersion = harmony === null || harmony === void 0 ? void 0 : harmony[2];
  }

  // 刘海屏检测
  if (isIOS && typeof window !== "undefined") {
    var ratio = window.devicePixelRatio || 1;
    var screen = {
      width: window.screen.width * ratio,
      height: window.screen.height * ratio,
    };

    isIPhoneX =
      (screen.width === 1125 && screen.height === 2436) || // X/XS/11 Pro
      (screen.width === 1242 && screen.height === 2688) || // XS Max/11 Pro Max
      (screen.width === 828 && screen.height === 1792) || // XR/11
      (screen.width === 750 && screen.height === 1624) || // XR 放大模式
      (screen.width === 1170 && screen.height === 2532) || // 12/12 Pro/13/13 Pro/14
      (screen.width === 1284 && screen.height === 2778) || // 12 Pro Max/13 Pro Max/14 Plus
      (screen.width === 960 && screen.height === 2079) || // 12 Pro 放大模式
      (screen.width === 1080 && screen.height === 2340) || // 12 Mini/13 Mini/14 Mini
      (screen.width === 1179 && screen.height === 2556) || // 14 Pro
      (screen.width === 1290 && screen.height === 2796); // 14 Pro Max
  }
};
init();
/** 重置环境判断，主要用于单测 */ export var reset = function () {
  init();
};

export var OLDCHANNELS;
(function () {
  OLDCHANNELS["WX"] = "wx";
  OLDCHANNELS["WXTAOCODE"] = "wx-taocode";
  OLDCHANNELS["OTHER"] = "other";
})(OLDCHANNELS || (OLDCHANNELS = {}));

export var SYSTEMS;
(function () {
  SYSTEMS["ANDROID"] = "android";
  SYSTEMS["IOS"] = "ios";
  SYSTEMS["HUAWEI"] = "huawei";
  SYSTEMS["HONGMENG"] = "hongmeng";
  SYSTEMS["HONOR"] = "honor";
  SYSTEMS["XIAOMI"] = "xionmi";
  SYSTEMS["OPPO"] = "oppo";
  SYSTEMS["VIVO"] = "vivo";
  SYSTEMS["SAMSUNG"] = "samsung";
  SYSTEMS["MEIZU"] = "meizu";
  SYSTEMS["ONEPLUS"] = "oneplus";
})(SYSTEMS || (SYSTEMS = {}));

/** 匹配ua */ var chechUa = function (val) {
  var ua = getUserAgent();
  return Boolean(ua.match(new RegExp(val, "i")));
};

/** 获取渠道信息 */ export var getChannel = function () {
  var channel = OLDCHANNELS.OTHER;
  if (isWeixin) {
    channel = OLDCHANNELS.WX;
  } else {
    channel = OLDCHANNELS.OTHER;
  }
  return channel;
};

/** 获取应用信息 */ export var getSystem = function () {
  if (isIOS || chechUa("Mac OS")) {
    return SYSTEMS.IOS;
  } else if (chechUa("OpenHarmony")) {
    return SYSTEMS.HONGMENG;
  } else if (chechUa("huawei") || chechUa("harmonyos")) {
    return SYSTEMS.HUAWEI;
  } else if (chechUa("honor")) {
    return SYSTEMS.HONOR;
  } else if (
    chechUa("Xiaomi") ||
    chechUa("mi\\s") ||
    chechUa("mix\\s") ||
    chechUa("redmi")
  ) {
    return SYSTEMS.XIAOMI;
  } else if (
    chechUa("OPPO") ||
    chechUa("pacm00") ||
    chechUa("peqm00") ||
    chechUa("pcgm00") ||
    chechUa("pdsm00") ||
    chechUa("pcam00") ||
    chechUa("pdbm00")
  ) {
    return SYSTEMS.OPPO;
  } else if (chechUa("vivo") || chechUa("v2011q") || chechUa("v2046a")) {
    return SYSTEMS.VIVO;
  } else if (chechUa("sm-")) {
    return SYSTEMS.SAMSUNG;
  } else if (chechUa("meizu")) {
    return SYSTEMS.MEIZU;
  } else if (
    chechUa("onePlus") ||
    chechUa("HD1900") ||
    chechUa("in2010") ||
    chechUa("in2020")
  ) {
    return SYSTEMS.ONEPLUS;
  } else {
    return SYSTEMS.ANDROID;
  }
};

export {
  appName,
  appVersion,
  isAlipayWeb,
  isAndroid,
  isHarmony,
  isIOS,
  isIPhoneX,
  isMiniAlipay,
  isAlipayMiniWeb,
  isMiniWx,
  isWxMiniWeb,
  isPre,
  isPreOrDev,
  isSSR,
  isWxWeb,
  isWeixin,
  osVersion,
  getUserAgent,
};
