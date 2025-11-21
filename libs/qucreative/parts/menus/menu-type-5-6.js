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
(0, _dzsCommonFunctions.loadScriptIfItDoesNotExist)(null, 'quCreative_main').then(() => {
  const _body = jQuery("body");
  if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
    _body.addClass("menu-is-sticky");
  }
  console.log('window.qucreative_handle_resize_actions ->', window.qucreative_handle_resize_actions);
  window.qucreative_handle_resize_actions.push(handleResizeM56);
  window.quCreative_main.handle_resize.bind(window.quCreative_main)();
  function handleResizeM56(margs, quCreative_main) {
    const _body = quCreative_main._body;
    if (margs.place_page) {
      if (quCreative_main.page == "page-portfolio" || quCreative_main.page == "page-portfolio-single" || quCreative_main.page == "page-normal" || quCreative_main.page == "page-blog" || quCreative_main.page == "page-blogsingle" || quCreative_main.page == "page-about" || quCreative_main.page == "page-contact") {
        if (_body.hasClass("menu-is-sticky") && _body.hasClass("content-align-right") == false && _body.hasClass("content-align-left") == false && quCreative_main._theContent && quCreative_main._theContent.parent().hasClass("fullit") == false && (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6"))) {
          // -- sticky

          quCreative_main.menu_content_space = 30;
          if (quCreative_main.windowWidth > quCreative_main.view_menuWidth + quCreative_main.content_width + quCreative_main.menu_content_space) {
            let targetL = quCreative_main.windowWidth / 2;
            targetL -= (quCreative_main.view_menuWidth + quCreative_main.content_width) / 2;
            targetL -= quCreative_main.menu_content_space / 2;
            quCreative_main._navCon.css({
              left: targetL
            });
          } else {
            // -- tbc
            quCreative_main._navCon.css({
              left: ""
            });
            quCreative_main._theContent.css({
              left: "",
              "margin-left": "",
              "margin-right": ""
            });
          }
        }
      }
    }
  }
});

},{"../../js/common/_dzs-common-functions":1}]},{},[2])


//# sourceMappingURL=menu-type-5-6.js.map