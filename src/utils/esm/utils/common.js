import {
  isSSR,
  isWxWeb,
  isMiniWx,
  isMiniAlipay,
  isWxMiniWeb,
  isAlipayWeb,
} from "./env";
export var notSupportAsync = function () {
  try {
    throwFishError(
      {
        errorCode: -1,
        errorMsg: "该环境下 api不支持",
      },
      {
        apiName: "",
        env: "",
      }
    );
  } catch (e) {
    return Promise.reject(e);
  }
};
export var notSupportSync = function () {
  throwFishError(
    {
      errorCode: -1,
      errorMsg: "该环境下 api不支持",
    },
    {
      apiName: "",
      env: "",
    }
  );
};
export var IMPL_ENV;
(function (IMPL_ENV) {
  IMPL_ENV["SSR"] = "SSR";
  IMPL_ENV["WX_WEB"] = "WX_WEB";
  IMPL_ENV["MINI_WX"] = "MINI_WX";
  IMPL_ENV["MINI_WX_WEB"] = "MINI_WX_WEB";
  IMPL_ENV["FALLBACK"] = "FALLBACK";
  IMPL_ENV["ALIPAY_WEB"] = "ALIPAY_WEB";
  IMPL_ENV["MINI_ALIPAY"] = "MINI_ALIPAY";
  IMPL_ENV["MINI_ALIPAY_WEB"] = "MINI_ALIPAY_WEB";
})(IMPL_ENV || {});

console.log("IMPL_ENV", IMPL_ENV);

var implList = [
  {
    key: "SSR",
    is: isSSR,
  },
  {
    key: "WX_WEB",
    is: isWxWeb,
  },
  {
    key: "MINI_WX",
    is: isMiniWx,
  },
  {
    key: "MINI_WX_WEB",
    is: isWxMiniWeb,
  },
  {
    key: "FALLBACK",
    is: true,
  },
  {
    key: "ALIPAY_WEB",
    is: isAlipayWeb,
  },
  {
    key: "MINI_ALIPAY",
    is: isMiniAlipay,
  },
  {
    key: "MINI_ALIPAY_WEB",
    is: true,
  },
];

/**
 * 获取api 具体实现
 * @param implMap
 */
export var getApiImpl = function (implMap) {
  var isAsync = false;
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = undefined;
  try {
    for (
      var _iterator = implList[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var item = _step.value;
      var implFunc = implMap[item.key];
      if (implFunc) {
        if (
          implFunc !== notSupportSync &&
          implFunc !== notSupportAsync &&
          item.is
        ) {
          return implFunc;
        }
        if ((!isAsync && implFunc.isAsync) || implFunc === notSupportAsync) {
          isAsync = true;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return !== null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return isAsync ? notSupportAsync : notSupportSync;
};
