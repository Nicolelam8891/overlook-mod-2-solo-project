/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".hidden {\n  display: none;\n}\n\nh1,\n.sage-serenity-tagline {\n  color: #333e39;\n  font-family: fantasy;\n}\n\nh2,\n.nav-right {\n  color: #333e39;\n  font-family: fantasy;\n  font-size: xx-large;\n  margin: auto;\n}\n\nbody {\n  min-height: 100vh;\n  margin: 0;\n  margin: auto;\n  background: #82a393;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n}\n\n.flower {\n  margin-left: 20px;\n  width: 160px;\n  height: 150px;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n  text-align: end;\n  background-color: #b8d6c4;\n  padding-top: 20px;\n  padding-right: 20px;\n  font-family: fantasy;\n  font-weight: bold;\n  font-size: x-large;\n}\n\n.dashboard-button {\n  margin-right: 10px;\n}\n\nbutton {\n  background-color: #b8d6c4;\n  color: #41564c;\n  font-weight: bold;\n  font-family: fantasy;\n  padding: 10px 20px;\n  border-color: rgb(102, 126, 102);\n  cursor: pointer;\n  border-radius: 10px;\n  font-size: 20px;\n}\n\nbutton:hover,\n.login-button:hover {\n  background-color: #8cb2a5;\n}\n\nbutton:active {\n  background-color: #8ab39c;\n  color: #b8d6c4;\n  transform: scale(0.95);\n}\n\n.main-nav {\n  display: flex;\n  justify-content: space-between;\n  margin-left: 50px;\n  margin-top: 25px;\n}\n\n.booking-wrapper {\n  display: flex;\n  justify-content: center;\n}\n\n.outer-booking-box {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  background-color: #b8d6c4;\n  width: 500px;\n  border: 3px solid rgb(221, 233, 227);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n}\n\n.bookings-title {\n  width: 200px;\n  height: 200px;\n  border: 15px solid green;\n  padding: 50px;\n  margin: 20px;\n}\n\n.booking-scroll-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #b8d6c4;\n  width: 400px;\n  height: 600px;\n  border: 3px solid rgb(131, 165, 148);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n  flex-wrap: wrap;\n}\n\n.booking-scroll-box::-webkit-scrollbar {\n  width: 10px;\n}\n\n.booking-scroll-box::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.booking-scroll-box::-webkit-scrollbar-thumb {\n  background-color: rgba(107, 171, 127, 0.5);\n  border-radius: 5px;\n}\n\n.login-wrapper {\n  display: flex;\n  justify-content: center;\n  margin-top: 150px;\n}\n\n.login-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-family: fantasy;\n  color: #1b231f;\n  font-size: 20px;\n  background-color: #b8d6c4;\n  width: 500px;\n  height: 350px;\n  border: 3px solid rgb(221, 233, 227);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n}\n\n.username-wrapper,\n.password-wrapper {\n  margin-bottom: 15px;\n  display: flex;\n  justify-content: center;\n}\n\n.login-button {\n  background-color: #8eb5a2;\n  color: #324138;\n  font-weight: bold;\n  width: 150px;\n  font-family: fantasy;\n  border: none;\n  cursor: pointer;\n  border-radius: 10px;\n  font-size: 20px;\n}\n\n.login-button:active {\n  background-color: #8ab39c;\n  color: #b8d6c4;\n  transform: scale(0.95);\n}\n\n.login-button-wrapper {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.login-error-message {\n  color: rgb(203, 79, 79);\n  font-weight: bolder;\n  font-family: fantasy;\n}\n\n.bookings-message {\n  color: #222926;\n  font-weight: bolder;\n  font-family: fantasy;\n}\n\n.booking-cards,\n.available-rooms-cards {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 275px;\n  height: 445px;\n  color: #242a28;\n  background-color: #8ebaa4;\n  font-family: fantasy;\n  font-size: larger;\n  border: 3px solid rgb(70, 96, 83);\n  border-radius: 20px;\n  padding: 20px;\n  padding-bottom: 80px;\n  margin: 20px;\n  line-height: 1;\n}\n\n.modal-text {\n  color: #222926;\n  font-family: fantasy;\n  font-size: large;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(0, 0, 0);\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n.modal-content {\n  background-color: #ddf4e9;\n  border-radius: 20px;\n  margin: 15% auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 25%;\n  height: 20%;\n}\n\n.close {\n  color: #aaa;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n  color: black;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.available-rooms-wrapper {\n  display: flex;\n  justify-content: center;\n}\n\n.outer-available-rooms-box {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  background-color: #b8d6c4;\n  width: 500px;\n  border: 3px solid rgb(221, 233, 227);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n}\n\n.available-rooms-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #b8d6c4;\n  width: 400px;\n  height: 600px;\n  border: 3px solid rgb(131, 165, 148);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n  flex-wrap: wrap;\n}\n\n.available-rooms-box::-webkit-scrollbar {\n  width: 10px;\n}\n.available-rooms-box::-webkit-scrollbar-track {\n  background: transparent;\n}\n.available-rooms-box::-webkit-scrollbar-thumb {\n  background-color: rgba(107, 171, 127, 0.5);\n  border-radius: 5px;\n}\n\n.roomImg {\n  width: 300px;\n  height: 290px;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":[".hidden {\n  display: none;\n}\n\nh1,\n.sage-serenity-tagline {\n  color: #333e39;\n  font-family: fantasy;\n}\n\nh2,\n.nav-right {\n  color: #333e39;\n  font-family: fantasy;\n  font-size: xx-large;\n  margin: auto;\n}\n\nbody {\n  min-height: 100vh;\n  margin: 0;\n  margin: auto;\n  background: #82a393;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n}\n\n.flower {\n  margin-left: 20px;\n  width: 160px;\n  height: 150px;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n  text-align: end;\n  background-color: #b8d6c4;\n  padding-top: 20px;\n  padding-right: 20px;\n  font-family: fantasy;\n  font-weight: bold;\n  font-size: x-large;\n}\n\n.dashboard-button {\n  margin-right: 10px;\n}\n\nbutton {\n  background-color: #b8d6c4;\n  color: #41564c;\n  font-weight: bold;\n  font-family: fantasy;\n  padding: 10px 20px;\n  border-color: rgb(102, 126, 102);\n  cursor: pointer;\n  border-radius: 10px;\n  font-size: 20px;\n}\n\nbutton:hover,\n.login-button:hover {\n  background-color: #8cb2a5;\n}\n\nbutton:active {\n  background-color: #8ab39c;\n  color: #b8d6c4;\n  transform: scale(0.95);\n}\n\n.main-nav {\n  display: flex;\n  justify-content: space-between;\n  margin-left: 50px;\n  margin-top: 25px;\n}\n\n.booking-wrapper {\n  display: flex;\n  justify-content: center;\n}\n\n.outer-booking-box {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  background-color: #b8d6c4;\n  width: 500px;\n  border: 3px solid rgb(221, 233, 227);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n}\n\n.bookings-title {\n  width: 200px;\n  height: 200px;\n  border: 15px solid green;\n  padding: 50px;\n  margin: 20px;\n}\n\n.booking-scroll-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #b8d6c4;\n  width: 400px;\n  height: 600px;\n  border: 3px solid rgb(131, 165, 148);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n  flex-wrap: wrap;\n}\n\n.booking-scroll-box::-webkit-scrollbar {\n  width: 10px;\n}\n\n.booking-scroll-box::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.booking-scroll-box::-webkit-scrollbar-thumb {\n  background-color: rgba(107, 171, 127, 0.5);\n  border-radius: 5px;\n}\n\n.login-wrapper {\n  display: flex;\n  justify-content: center;\n  margin-top: 150px;\n}\n\n.login-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-family: fantasy;\n  color: #1b231f;\n  font-size: 20px;\n  background-color: #b8d6c4;\n  width: 500px;\n  height: 350px;\n  border: 3px solid rgb(221, 233, 227);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n}\n\n.username-wrapper,\n.password-wrapper {\n  margin-bottom: 15px;\n  display: flex;\n  justify-content: center;\n}\n\n.login-button {\n  background-color: #8eb5a2;\n  color: #324138;\n  font-weight: bold;\n  width: 150px;\n  font-family: fantasy;\n  border: none;\n  cursor: pointer;\n  border-radius: 10px;\n  font-size: 20px;\n}\n\n.login-button:active {\n  background-color: #8ab39c;\n  color: #b8d6c4;\n  transform: scale(0.95);\n}\n\n.login-button-wrapper {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.login-error-message {\n  color: rgb(203, 79, 79);\n  font-weight: bolder;\n  font-family: fantasy;\n}\n\n.bookings-message {\n  color: #222926;\n  font-weight: bolder;\n  font-family: fantasy;\n}\n\n.booking-cards,\n.available-rooms-cards {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 275px;\n  height: 445px;\n  color: #242a28;\n  background-color: #8ebaa4;\n  font-family: fantasy;\n  font-size: larger;\n  border: 3px solid rgb(70, 96, 83);\n  border-radius: 20px;\n  padding: 20px;\n  padding-bottom: 80px;\n  margin: 20px;\n  line-height: 1;\n}\n\n.modal-text {\n  color: #222926;\n  font-family: fantasy;\n  font-size: large;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(0, 0, 0);\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n.modal-content {\n  background-color: #ddf4e9;\n  border-radius: 20px;\n  margin: 15% auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 25%;\n  height: 20%;\n}\n\n.close {\n  color: #aaa;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n  color: black;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.available-rooms-wrapper {\n  display: flex;\n  justify-content: center;\n}\n\n.outer-available-rooms-box {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  background-color: #b8d6c4;\n  width: 500px;\n  border: 3px solid rgb(221, 233, 227);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n}\n\n.available-rooms-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #b8d6c4;\n  width: 400px;\n  height: 600px;\n  border: 3px solid rgb(131, 165, 148);\n  padding: 50px;\n  margin: 20px;\n  border-radius: 20px;\n  flex-wrap: wrap;\n}\n\n.available-rooms-box::-webkit-scrollbar {\n  width: 10px;\n}\n.available-rooms-box::-webkit-scrollbar-track {\n  background: transparent;\n}\n.available-rooms-box::-webkit-scrollbar-thumb {\n  background-color: rgba(107, 171, 127, 0.5);\n  border-radius: 5px;\n}\n\n.roomImg {\n  width: 300px;\n  height: 290px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCustomers": () => (/* binding */ getCustomers),
/* harmony export */   "getBookings": () => (/* binding */ getBookings),
/* harmony export */   "getRooms": () => (/* binding */ getRooms),
/* harmony export */   "postNewBookedRoom": () => (/* binding */ postNewBookedRoom)
/* harmony export */ });
const getCustomers = () => {
  return fetch("https://overlook-api-1.vercel.app/api/v1/customers")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

const getBookings = () => {
  return fetch("https://overlook-api-1.vercel.app/api/v1/bookings")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

const getRooms = () => {
  return fetch("https://overlook-api-1.vercel.app/api/v1/rooms")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

const postNewBookedRoom = (userID, dateSelected, roomNumber) => {
  const postNewBooking = { "userID": userID , "date": dateSelected, "roomNumber": roomNumber}; 

  return (
    fetch("https://overlook-api-1.vercel.app/api/v1/bookings", {
      method: "POST",
      body: JSON.stringify(postNewBooking),
      headers: {
        "Content-Type": 'application/json', 
      }
    })
      .then(response => response.json())
      .catch(error => console.log(error)) 
  );
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllCustomerBookings": () => (/* binding */ getAllCustomerBookings),
/* harmony export */   "getPastOrUpcomingCustomerBookings": () => (/* binding */ getPastOrUpcomingCustomerBookings),
/* harmony export */   "getSelectedAvailableRooms": () => (/* binding */ getSelectedAvailableRooms),
/* harmony export */   "getAllRoomTypes": () => (/* binding */ getAllRoomTypes)
/* harmony export */ });
const getAllCustomerBookings = (customerID, bookingsData) => {
  const allCustomerBookings = bookingsData.filter(
    (booking) => booking.userID === customerID
  ); 
  if (allCustomerBookings.length === 0) {
    return `ID not found.`;
  }
  return allCustomerBookings;
};

const getPastOrUpcomingCustomerBookings = (timeline, bookingsData,roomsData) => {
  var currentDate = new Date(); 
  if (timeline === "past") {
    const pastBookings = bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); 
      return bookingDate < currentDate;
    });
    
    let pastRooms = [];
    pastBookings.forEach((booking) => {
      let room = roomsData.find((room) => room.number === booking.roomNumber);
      if (room) {
        room.date = booking.date; 
        pastRooms.push(room);
      }
    });
    return pastRooms;
  } else if (timeline === "upcoming") {
    const upcomingBookings = bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); 
      return bookingDate > currentDate;
    });

    let upcomingRooms = [];
    upcomingBookings.forEach((booking) => {
      let room = roomsData.find((room) => room.number === booking.roomNumber);
      if (room) {
        room.date = booking.date; 
        upcomingRooms.push(room);
      }
    });
    return upcomingRooms;
  } else {
    return "Error";
  }
};

const getSelectedAvailableRooms = (dateSelected, roomSelected, bookingsData, roomsData) => {
  const formattedDateSelected = dateSelected.replace(/-/g, "/");
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  if (formattedDateSelected < currentDate) {
    return `Please select a date.`;
  }
  const getUnavailableDateAndRoomNumber = bookingsData
    .filter((booking) => booking.date === formattedDateSelected)
    .map((booking) => booking.roomNumber);
  const getAvailableRooms = roomsData.filter((room) => {
    if (roomSelected === "any") {
      return !getUnavailableDateAndRoomNumber.includes(room.number); 
    } 
      return !getUnavailableDateAndRoomNumber.includes(room.number) && room.roomType === roomSelected 
  });
  const apologyMessage =
    "Sage Serenity deeply apologizes for the inconvenience! The room type is not available on the date you selected, please adjust your search.";
  if (getAvailableRooms.length === 0) {
    return apologyMessage;
  } else {
    return getAvailableRooms;
  }
};

const getAllRoomTypes = (roomsData) => {
  const allRoomTypes = roomsData
    .map((room) => room.roomType)
    .sort((a, b) => a - b);
  const uniqueRoomTypes = [...new Set(allRoomTypes)];
  return uniqueRoomTypes;
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleLogin": () => (/* binding */ handleLogin),
/* harmony export */   "checkValidCustomerLogin": () => (/* binding */ checkValidCustomerLogin)
/* harmony export */ });
let handleLogin = (username, password) => {
  if (username === "" || password === "") {
    return "Please enter both your username and password."
  } 
  if (username.includes("customer") && password === "overlook2021") {
    return true
  } else {
    return "Invalid credentials, please try again!";
  }
}

const checkValidCustomerLogin = (username) => {
  let userId = username.slice(8) 
  userId = parseInt(userId)
  if (userId <= 50) { 
    return userId  
  } else {
    return `Sorry, this is not a valid ID number, please try again.`
  }
}

  
  
  
  

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadDashboardPage": () => (/* binding */ loadDashboardPage),
/* harmony export */   "loadAvailableRoomsPage": () => (/* binding */ loadAvailableRoomsPage),
/* harmony export */   "loginMessageError": () => (/* binding */ loginMessageError),
/* harmony export */   "getRoomImages": () => (/* binding */ getRoomImages),
/* harmony export */   "renderPastAndUpcomingBookingsCards": () => (/* binding */ renderPastAndUpcomingBookingsCards),
/* harmony export */   "renderRoomTypes": () => (/* binding */ renderRoomTypes),
/* harmony export */   "renderAvailableRooms": () => (/* binding */ renderAvailableRooms),
/* harmony export */   "displayTotalSpent": () => (/* binding */ displayTotalSpent)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _customer_bookings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _calculations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);




/* Calender */
const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();
const currentDate = yyyy + "-" + mm + "-" + dd;
document.querySelector('input[type="date"]').setAttribute("min", currentDate);

/* QuerySelectors here */
const loginPage = document.querySelector(".login-page");
const loginErrorMessage = document.querySelector(".login-error-message");
const dashboardPage = document.querySelector(".dashboard-page");
const dashboardButton = document.querySelector(".dashboard-button");
const pastCustomerBookings = document.querySelector("#past-customer-bookings");
const upcomingCustomerBookings = document.querySelector("#upcoming-customer-bookings");
const dropDownMenu = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");
const availableRoomsPage = document.querySelector(".available-rooms-page");
const outerMainNav = document.querySelector(".outer-main-nav");
const totalSpentTitle = document.querySelector(".total-spent-title");
const availableTitle = document.querySelector(".available-title");
const bookingsMessage = document.querySelector(".bookings-message");

/* Functions that update the DOM here */
const loadDashboardPage = (pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings,roomsData) => {
  dashboardPage.classList.remove("hidden"); 
  dashboardButton.classList.add("hidden");
  loginPage.classList.add("hidden"); 
  availableRoomsPage.classList.add("hidden"); 
  outerMainNav.classList.remove("hidden");
  renderPastAndUpcomingBookingsCards(pastCustomerRooms, upcomingCustomerRooms);
  displayTotalSpent(allCustomerBookings, roomsData);
};

const loadAvailableRoomsPage = () => {
  dashboardPage.classList.add("hidden"); 
  availableRoomsPage.classList.remove("hidden"); 
  dashboardButton.classList.remove("hidden");
};

const loginMessageError = (errorMessage1, errorMessage2) => {
  const showMessage = (errorMessage) => {
    if (typeof errorMessage === "string") {
      loginErrorMessage.classList.remove("hidden");
      loginErrorMessage.innerText = errorMessage;
    }
  };
  showMessage(errorMessage1);
  showMessage(errorMessage2);
};

const getRoomImages = (roomType) => {
  const roomImages = {
    "single room": "single.png",
    "junior suite": "junior.png",
    "suite": "suite.png",
    "residential suite": "residential.png",
  };
  const fileName = roomImages[roomType];
  return `<img src="./images/${fileName}" alt="${roomType}" class="roomImg">`;
};

const renderPastAndUpcomingBookingsCards = (
  pastCustomerRooms,
  upcomingCustomerRooms
) => {
  const render = (element, rooms) => {
    element.innerHTML = "";
    rooms.forEach((room) => {
      const roomImages = getRoomImages(room.roomType);
      element.innerHTML +=
        `<div class="booking-cards">
       ${roomImages}
       <p>Room number: ${room.number} </p>
       <p>Room type: ${room.roomType} </p>
       <p>Bed type: ${room.bedSize} </p>
       <p>Number of beds: ${room.numBeds} </p>
       <p>Date: ${room.date} </p>
     </div>
     `;
    });
  };

  render(pastCustomerBookings, pastCustomerRooms);
  render(upcomingCustomerBookings, upcomingCustomerRooms);
};

const renderRoomTypes = (roomsData) => {
  dropDownMenu.innerHTML = `<option value="any">any</option>`;
  const allRoomTypes = (0,_customer_bookings__WEBPACK_IMPORTED_MODULE_1__.getAllRoomTypes)(roomsData);
  allRoomTypes.forEach((room) => {
    dropDownMenu.innerHTML += `<option value="${room}">${room}</option>
    `;
  });
};

const renderAvailableRooms = (availableRooms) => {
  if (typeof availableRooms !== "string") {
    availableTitle.innerText = "These are the available rooms!";
    bookingsMessage.innerText =
      "Please select a date and room type of your choice!";
    availableRoomsBox.innerHTML = "";
    availableRooms.forEach((room) => {
      const roomImages = getRoomImages(room.roomType);
      availableRoomsBox.innerHTML += `<div class="available-rooms-cards">
      ${roomImages}
      <p>Room number: ${room.number} </p>
      <p>Room type: ${room.roomType} </p>
      <p>Cost per night: $${room.costPerNight}</p>
      <p>Bed Type: ${room.bedSize}</p>
      <p>Number of beds: ${room.numBeds}</p>
      <button class="bookButtons" id="${room.number}"> BOOK </button>
      </div>
      `;
    });
  } else {
    bookingsMessage.innerText = availableRooms;
    availableRoomsBox.innerHTML = "";
  }

  if (availableRooms.includes("Sage")) {
    availableTitle.innerText = "We're Sorry!";
  }
};

const displayTotalSpent = (allCustomerBookings, roomsData) => {
  const roomNumbers = (0,_calculations__WEBPACK_IMPORTED_MODULE_2__.getCustomerRoomNumbers)(allCustomerBookings);
  const totalSpent = (0,_calculations__WEBPACK_IMPORTED_MODULE_2__.calculateBookingsSum)(roomNumbers, roomsData);
  totalSpentTitle.innerText = `Total Spent:  $ ${totalSpent}`;
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCustomerRoomNumbers": () => (/* binding */ getCustomerRoomNumbers),
/* harmony export */   "calculateBookingsSum": () => (/* binding */ calculateBookingsSum)
/* harmony export */ });
const getCustomerRoomNumbers = (allCustomerBookings) => {
  const customerRoomNumbers = allCustomerBookings.map(booking => booking.roomNumber)
  return customerRoomNumbers
}

const calculateBookingsSum = (roomNumbers, roomsData) => {
  const total = roomNumbers.reduce((acc, roomNumber) => {
    const room = roomsData.find(room => room.number === roomNumber)
    if (room) {
      return acc = acc + room.costPerNight
    } 
  }, 0) 
  return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
}



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/sage1.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/junior.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/suite.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/residential.png");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _customer_bookings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_sage1_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _images_single_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _images_junior_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _images_suite_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _images_residential_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);











/* Global Variables */ 
let customersData;
let bookingsData;
let roomsData;
let customerIdNumber;
let allCustomerBookings;
let pastCustomerRooms;
let upcomingCustomerRooms;

/* QuerySelectors here */
const loginForm = document.querySelector(".login-form");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const findRoomButton = document.querySelector(".find-rooms-button"); 
const findRoomsModal = document.querySelector("#findRoomsModal");
const closeButtons = document.querySelectorAll(".close"); 
const successfulBookingModal = document.querySelector("#successfulBookingModal");
const dashboardButton = document.querySelector(".dashboard-button")
const findRoomForm = document.querySelector(".find-room-form");
const date = document.querySelector(".date-input");
const roomType = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");
const successButton = document.querySelector(".success-button");

/* Functions here */
const getAllData = () => {
  return Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getCustomers)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getBookings)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getRooms)()]).then(
    (data) => {
      customersData = data[0].customers;
      bookingsData = data[1].bookings;
      roomsData = data[2].rooms;
    }
  );
};

const updateCustomerData = () => {
  allCustomerBookings = (0,_customer_bookings__WEBPACK_IMPORTED_MODULE_2__.getAllCustomerBookings)(customerIdNumber,bookingsData);
  pastCustomerRooms = (0,_customer_bookings__WEBPACK_IMPORTED_MODULE_2__.getPastOrUpcomingCustomerBookings)("past",allCustomerBookings,roomsData);
  upcomingCustomerRooms = (0,_customer_bookings__WEBPACK_IMPORTED_MODULE_2__.getPastOrUpcomingCustomerBookings)("upcoming",allCustomerBookings,roomsData);
}

/* EventListeners here */
window.addEventListener("load", getAllData);

dashboardButton.onclick = function () {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.loadDashboardPage)(pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings, roomsData);
}

findRoomButton.onclick = function () {
  findRoomsModal.style.display = "block";
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.renderRoomTypes)(roomsData);
};

closeButtons.forEach(function (span) {
  span.addEventListener("click", function () {
    findRoomsModal.style.display = "none";
    successfulBookingModal.style.display = "none";
  });
});

window.onclick = function (event) {
  if (
    event.target == findRoomsModal ||
    event.target == successfulBookingModal
  ) {
    findRoomsModal.style.display = "none";
    successfulBookingModal.style.display = "none";
  }
};

findRoomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const availableRooms = (0,_customer_bookings__WEBPACK_IMPORTED_MODULE_2__.getSelectedAvailableRooms)(
    date.value,
    roomType.value,
    bookingsData,
    roomsData
  ); 
 
  findRoomsModal.style.display = "none";
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.renderAvailableRooms)(availableRooms);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.loadAvailableRoomsPage)(); 
});

availableRoomsBox.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("bookButtons")) {
    const roomId = parseInt(event.target.id);
    let formattedDate = date.value.replace(/-/g, "/");
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postNewBookedRoom)(customerIdNumber, formattedDate, roomId)
      .then(() => getAllData()) 
      .then(() => {
        successfulBookingModal.style.display = "block"; 
      });
  }
});

successButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateCustomerData();
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.loadDashboardPage)(pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings, roomsData);
  successfulBookingModal.style.display = "none";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  customerIdNumber = (0,_login__WEBPACK_IMPORTED_MODULE_3__.checkValidCustomerLogin)(userName.value);
  const successfulLogin = (0,_login__WEBPACK_IMPORTED_MODULE_3__.handleLogin)(userName.value, password.value); 
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.loginMessageError)(customerIdNumber, successfulLogin)

  if (successfulLogin === true && Number.isInteger(customerIdNumber)) {
    updateCustomerData();
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.loadDashboardPage)(pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings, roomsData);
  }
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map