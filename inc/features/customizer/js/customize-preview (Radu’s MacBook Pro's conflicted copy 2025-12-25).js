(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replace_font = replace_font;
function replace_font(newval, selector) {
  $(selector).each(function () {
    const _t = $(this);
    var oldNode = _t.get(0),
      newNode = null,
      node,
      nextNode;
    if (newval == "h-group-1" || newval == "h-group-2") {
      newNode = document.createElement("h3");
    } else {
      newNode = document.createElement(newval);
    }
    node = oldNode.firstChild;
    while (node) {
      nextNode = node.nextSibling;
      newNode.appendChild(node);
      node = nextNode;
    }
    let newClass = "";
    if (newval == "h-group-1" || newval == "h-group-2") {
      newClass = "the-variable-heading widget-title " + newval;
    } else {
      newClass = oldNode.className;
      newClass = newClass.replace("h-group-1", "");
      newClass = newClass.replace("h-group-2", "");
    }
    newNode.className = newClass;
    // -- Do attributes too if you need to
    newNode.id = oldNode.id; // -- (Not invalid, they're not both in the tree at the same time)
    oldNode.parentNode.replaceChild(newNode, oldNode);
  });
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSocialIcons = setupSocialIcons;
function setupSocialIcons(wp) {
  const $ = jQuery;
  wp.customize("social_icons", function (value) {
    value.bind(function (newval) {
      let str_icons = "";
      try {
        const arr = JSON.parse(newval);
        for (const i in arr) {
          str_icons += '<a href="' + arr[i].link + '"><i class="fa fa-' + arr[i].icon + '"></i></a>';
        }
      } catch (err) {
        console.log(err);
      }
      if ($(".social-icons").length == 0) {
        if ($("body").eq(0).hasClass("menu-type-1")) {}
        $(".nav-social-con").prepend('<p class="social-icons"></p>');
      } else {}
      $(".social-icons").eq(0).html(str_icons);
    });
  });
}

},{}],3:[function(require,module,exports){
"use strict";var _socialIcons=require("./_socialIcons"),_customizerUtil=require("./_customizerUtil");!function(i){const t=wp,e=wp.customize;(0,_socialIcons.setupSocialIcons)(t),wp.customize("typography_sidebar_heading_style",function(i){i.bind(function(i){console.warn("newval - ",i),(0,_customizerUtil.replace_font)(i,".sidebar-main .widget-title")})}),wp.customize("typography_footer_heading_style",function(i){i.bind(function(i){console.warn("newval - ",i),(0,_customizerUtil.replace_font)(i,".upper-footer .widget-title")})}),e("blogname",function(t){t.bind(function(t){i(".site-title a").text(t)})}),e("blogdescription",function(t){t.bind(function(t){i(".site-description").text(t)})}),e.bind("preview-ready",function(){})}(jQuery),jQuery(document).ready(function(i){});
},{"./_customizerUtil":1,"./_socialIcons":2}]},{},[3])


//# sourceMappingURL=customize-preview.js.map