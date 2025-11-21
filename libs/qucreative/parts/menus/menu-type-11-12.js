(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_base_url_arr = get_base_url_arr;
exports.loadScriptIfItDoesNotExist = void 0;
/**
 *
 * @param {string} scriptSrc if no script src - it will just look for var, if scriptSrc is set, it will load it
 * @param {string} checkForVar must be on window property
 * @returns {Promise<any>}
 */
const loadScriptIfItDoesNotExist = (scriptSrc, checkForVar) => {
  const CHECK_INTERVAL = 50;
  const TIMEOUT_MAX = 5000;
  let checkInterval = 0;
  const loadScript = (scriptSrc, resolve, reject) => {
    const script = document.createElement('script');
    script.onload = function () {
      resolve('loadfromload');
    };
    script.onerror = function () {
      reject();
    };
    script.src = scriptSrc;
    document.head.appendChild(script);
  };
  return new Promise((resolve, reject) => {
    let isAlreadyLoaded = false;
    let isGoingToLoadScript = false;

    /**
     *
     * @returns {boolean}
     */
    function checkIfVarExists() {
      if (window[checkForVar]) {
        clearInterval(checkInterval);
        resolve('loadfromvar');
        return true;
      }
      return false;
    }
    isAlreadyLoaded = checkIfVarExists();
    if (!isAlreadyLoaded) {
      isGoingToLoadScript = true;
      if (checkForVar) {
        checkInterval = setInterval(checkIfVarExists, CHECK_INTERVAL);
      }
      setTimeout(() => {
        clearInterval(checkInterval);
        reject('timeout');
      }, TIMEOUT_MAX);
    }
    if (!checkForVar) {
      isGoingToLoadScript = true;
    }
    if (!scriptSrc) {
      isGoingToLoadScript = false;
    }
    if (isGoingToLoadScript) {
      clearInterval(checkInterval);
      loadScript(scriptSrc, resolve, reject);
    }
  });
};

/**
 *
 * @returns {string[]}
 */
exports.loadScriptIfItDoesNotExist = loadScriptIfItDoesNotExist;
function get_base_url_arr() {
  var scripts = document.getElementsByTagName("script");
  var scriptKey = '';
  for (scriptKey in scripts) {
    if (scripts[scriptKey] && scripts[scriptKey].src && String(scripts[scriptKey].src).indexOf('vplayer.js') > -1) {
      break;
    }
  }
  return String(scripts[scriptKey].src).split('/');
}

},{}],2:[function(require,module,exports){
"use strict";

var _dzsCommonFunctions = require("../../js/common/_dzs-common-functions");
// -- overlay menus

(0, _dzsCommonFunctions.loadScriptIfItDoesNotExist)(null, 'quCreative_main').then(() => {
  // todo: maybe some kind of init link
  const qcm = window.quCreative_main;
  const $ = jQuery;
  const $menuTogglerTarget = qcm._mainContainer.find(".menu-toggler-target");
  console.log('qcm._mainContainer -', qcm._mainContainer);
  console.log('$menuTogglerTarget -', $menuTogglerTarget);
  $menuTogglerTarget.eq(0).append(qcm._navCon.find(".the-actual-nav").eq(0));
  $(document).on("click", ".qu-overlay-menu-closer,.qu-overlay-menu-toggler", handle_mouse);
  function handle_mouse(e) {
    const _t = $(this);
    console.log('_t', _t);
    if (e) {
      if (e.type == "click") {
        if (_t.hasClass("qu-overlay-menu-toggler") || _t.hasClass("qu-overlay-menu-closer")) {
          console.log('$(".menu-toggler-target")- ', $(".menu-toggler-target"));
          $(".menu-toggler-target").eq(0).toggleClass("active");
        }
      }
    }
  }
});

},{"../../js/common/_dzs-common-functions":1}]},{},[2])


//# sourceMappingURL=menu-type-11-12.js.map