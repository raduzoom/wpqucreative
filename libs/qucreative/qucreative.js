(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function quSetupCheckLazyLoading(){const i=jQuery;window.dzs_check_lazyloading_images_inited?window.dzs_check_lazyloading_images&&(window.dzs_check_lazyloading_images(),setTimeout(function(){window.dzs_check_lazyloading_images&&window.dzs_check_lazyloading_images()},1e3),setTimeout(function(){window.dzs_check_lazyloading_images&&window.dzs_check_lazyloading_images()},2e3),setTimeout(function(){window.dzs_check_lazyloading_images&&window.dzs_check_lazyloading_images()},3e3)):(window.dzs_check_lazyloading_images_inited=!0,i(window).bind("scroll",window.dzs_check_lazyloading_images),window.dzs_check_lazyloading_images(),setTimeout(function(){window.dzs_check_lazyloading_images()},1500),setTimeout(function(){window.dzs_check_lazyloading_images()},2500))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.quSetupCheckLazyLoading=quSetupCheckLazyLoading;
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qu_setupActions = void 0;
var _qucreative = require("./_qucreative.config");
const qu_setupActions = () => {
  const $ = jQuery;
  const _body = $("body");
  if (_body.children("#wpadminbar").length) {
    $(document).bind("mousemove", mousemove_document);
  }
  $(document).on("click", ".main-gallery-buttons-con > *, .close-responsive-con, .custom-menu a", handle_mouse);
  $(document).on("submit", "form.search-form", function () {
    const _t = $(this);
    var _c = _t.find("*[name=s]").eq(0);
    if (_c.val() == "") {
      return false;
    }
  });
  $(document).on("click", ".submit-comment,.description-wrapper--icon-con,.submenu-toggler,a[data-vc-container]", handle_mouse);
  $(document).on("mouseover", ".search-submit.screen-reader-text", function () {
    $(this).addClass("hovered");
    $(this).parent().addClass("hovered");
  });
  $(document).on("mouseout", ".search-submit.screen-reader-text", function () {
    $(this).removeClass("hovered");
    $(this).parent().removeClass("hovered");
  });
  if (qucreative_options.menu_scroll_method == "mousemove") {
    quCreative_main._navCon.bind("mousemove", handle_mouse);
  } else {
    if (quCreative_main._navCon[0] && quCreative_main._navCon[0].addEventListener) {
      quCreative_main._navCon[0].addEventListener("DOMMouseScroll", handle_wheel, false);
      quCreative_main._navCon[0].onmousewheel = handle_wheel;
    } else {}
  }
  function handle_mouse(e) {
    const _t = $(this);
    if (e) {
      if (e.type == "mousemove") {
        // -- mouse move
        if (_t.hasClass("qucreative--nav-con")) {
          if (_body.hasClass("menu-type-1") || _body.hasClass("menu-type-2")) {
            if (e.pageX > 250) {
              return false;
            }
          }
        }
      }
      if (e.type == "click") {
        if (_t.attr("data-vc-container")) {
          if (_t.attr("href") == "#") {
            return false;
          }
        }
        if (_t.parent().hasClass("has-children") && _t.attr("href") == "#") {
          _t.parent().children(".submenu-toggler").trigger("click");
          return false;
        }
        if (_t.hasClass("submenu-toggler")) {
          _t.parent().toggleClass("children-active");
          var _cach = _t.parent().children("ul").eq(0);
          submenu_animate_size(_cach);
        }
        if (_t.hasClass("close-responsive-con")) {
          if (quCreative_main.custom_responsive_menu) {
            _body.removeClass("custom-responsive-menu-active");
            if (quCreative_main._mainContainer.get(0) && quCreative_main._mainContainer.get(0).api_unblock_scroll) {
              quCreative_main._mainContainer.get(0).api_unblock_scroll();
            }
          }
        }
        const _mainContainer = quCreative_main._mainContainer;
        if (_t.hasClass("submit-comment")) {}
        if (_t.hasClass("description-wrapper--icon-con")) {
          _t.parent().toggleClass("active");
        }
      }
    }
  }
  function mousemove_document(e) {
    if (e && e.pageY) {
      if (e.pageY < 33) {
        $("#wpadminbar").addClass("active");
      } else {
        $("#wpadminbar").removeClass("active");
      }
    }
  }

  /**
   * todo: move only if has submenu
   * @param _arg
   */
  function submenu_animate_size(_arg) {
    // -- _arg is the ul element

    if (_arg.css("display") == "none") {
      var auxh = _arg.eq(0).height();
      if (_arg.parent().parent().hasClass("custom-menu")) {
        _arg.css("display", "block");
        _arg.css("height", "auto");
        _arg.css({
          display: "block",
          height: "0"
        });
        _arg.animate({
          height: auxh + "px"
        }, {
          queue: false,
          duration: 300,
          complete: function (e) {
            $(this).css("height", "");
          }
        });
      }
      if (_arg.parent().parent().parent().parent().hasClass("custom-menu")) {
        var _cach_parent = _arg.parent().parent();
        var _cach_parent_orig_h = _cach_parent.height();
        setTimeout(function () {
          _arg.css({
            display: "block",
            height: "auto"
          });
          targeth = _arg.height();
          var _cach_parent_targeth = _cach_parent.height();
          _cach_parent.css({
            display: "block",
            height: _cach_parent_orig_h + "px"
          });
          _cach_parent.animate({
            height: _cach_parent_targeth + "px"
          }, {
            queue: false,
            duration: 300,
            complete: function (e) {
              $(this).css("height", "");
            }
          });
          _arg.css({
            display: "block",
            height: "0"
          });
          _arg.animate({
            height: auxh + "px"
          }, {
            queue: false,
            duration: 300,
            complete: function (e) {
              $(this).css("height", "");
            }
          });
        }, 50);
      }
    } else {
      // -- close submenu

      if (_arg.parent().parent().hasClass("custom-menu")) {
        _arg.animate({
          height: 0
        }, {
          queue: false,
          duration: 300,
          complete: function (e) {
            console.info(this);
            $(this).css("display", "none");
            $(this).css("height", "");
          }
        });
      }
      if (_arg.parent().parent().parent().parent().hasClass("custom-menu")) {
        var _cach_parent = _arg.parent().parent();
        var _cach_parent_orig_h = _cach_parent.height();
        setTimeout(function () {
          _arg.css({
            display: "block",
            height: "0"
          });
          var targeth = _arg.height();
          var _cach_parent_targeth = _cach_parent.height();
          _cach_parent.css({
            display: "block",
            height: _cach_parent_orig_h + "px"
          });
          _cach_parent.animate({
            height: _cach_parent_targeth + "px"
          }, {
            queue: false,
            duration: 300,
            complete: function (e) {
              console.info(this);
              $(this).css("height", "");
            }
          });
          _arg.css({
            display: "block",
            height: ""
          });
          _arg.animate({
            height: "0"
          }, {
            queue: false,
            duration: 300,
            complete: function (e) {
              $(this).css("display", "none");
              $(this).css("height", "");
            }
          });
        }, 50);
      }
    }
  }
  function calculate_dims_light() {}
  function handle_wheel(e) {
    var _t = $(this);
  }
};
exports.qu_setupActions = qu_setupActions;

},{"./_qucreative.config":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate_mainbg = calculate_mainbg;
exports.goto_bg = goto_bg;
exports.update_parallaxer = update_parallaxer;
var _sniffers = require("./js/common/_sniffers");
var _defaultSettings = require("./config/_defaultSettings");
var _qucreative = require("./_qucreative.util");
var _qucreative2 = require("./_qucreative.config");
var _quViewDeterminePage = require("./_qu-view-determine-page");
var _checkLazyLoading = require("./_checkLazyLoading");
var inter_check_if_main_content_loaded = 0;
let is_ready_load = false,
  bg_errored = false,
  is_ready_transition = false,
  parallax_reverse = true;
const ANIMATION_TIME_BASIC = 400;
let animation_time = ANIMATION_TIME_BASIC;
let _mainGalleryDescs;
let theQuery = "";
let first_page_not_transitioned = true,
  // -- only on the first page load, only once
  first_bg_not_transitioned = true;

/**
 *
 *     // -- @stack trace
 *     // -- click_menu_anchor()
 *     // -- load_new_page
 *     // -- goto_bg
 * @param arg
 * @param pargs
 * @returns {boolean}
 */
function goto_bg(arg, pargs) {
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  const now = Number(new Date().getDate());
  console.log('[animation] goto_bg -> ', now - window.quCreative_debug_time);
  window.quCreative_debug_time = now;
  if (quCreative_main.busy_main_transition) {
    return false;
  }
  var margs = {
    newpage_transition: false,
    call_from: "default"
  };
  if (pargs) {
    margs = $.extend(margs, pargs);
  }
  var cek = qucreative_options.images_arr[arg];
  if (quCreative_main._theContent && (quCreative_main._theContent.parent().hasClass("page-portfolio-single") && quCreative_main._theContent.parent().hasClass("page-portfolio-type-slider") || quCreative_main._theContent.parent().hasClass("page-blogsingle") && quCreative_main._theContent.parent().hasClass("post-media-type-slider"))) {
    if (window.qucreative_options.the_background) {
      cek = window.qucreative_options.the_background;
    }
  }
  const img = new Image();
  if ($(".main-gallery--descs").length > 0) {
    _mainGalleryDescs = $(".main-gallery--descs").eq(0);
  }
  if (quCreative_main.bg_transition == "fade") {
    quCreative_main._mainBg.addClass("for-remove js-transitioning-out");
    if (quCreative_main._theContent) {
      quCreative_main._theContent.parent().addClass("js-transitioning-out");
    }
    quCreative_main._navCon.addClass("js-transitioning-out");
  }

  // -- lets kill all page-homepage main gallery descs
  if (_mainGalleryDescs) {
    if (_mainGalleryDescs.children(".active").length > 0) {
      _mainGalleryDescs.css({
        width: "",
        opacity: ""
      });
      setTimeout(function () {
        // -- firefox windows bug fix
        _mainGalleryDescs.css({
          width: ""
        });
      }, 20);
      setTimeout(function () {
        is_ready_transition = true;
        if (is_ready_load == true) {
          margs.call_from = " is_ready_transition now, is_ready_load was";
          goto_bg_doit(arg, margs);
        }
        if (_mainGalleryDescs) {
          _mainGalleryDescs.css({
            height: "0"
          });
        }
      }, 500);
    } else {
      is_ready_transition = true;
    }
  } else {
    is_ready_transition = true;
  }
  img.onload = function (e) {
    // -- image  has been loaded

    is_ready_load = true;
    bg_errored = false;
    if (is_ready_transition == true) {
      margs.call_from = " is_ready_load now, is_ready_transition was";
      goto_bg_doit(arg, margs);
    }
  };
  img.onerror = function (e) {
    bg_errored = true;
    is_ready_load = true;
    if (is_ready_transition == true) {
      margs.call_from = "bg_errored yes, is_ready_transition now, is_ready_load was";
      goto_bg_doit(arg, margs);
    }
  };

  // --if it's background color
  if (cek.indexOf("#") == 0) {
    is_ready_load = true;
    if (is_ready_transition == true) {
      margs.call_from = "is_ready_load now, is_ready_transition was";
      goto_bg_doit(arg, margs);
    }
  } else {
    img.src = cek;
  }
  quCreative_main.busy_main_transition = true;
}

/**
 * after goto_bg
 * @param arg
 * @param pargs
 */
function goto_bg_doit(arg, pargs) {
  const $ = jQuery;
  // -- image has loaded

  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  const now = Number(new Date().getDate());
  console.log('[animation] goto_bg_doit -> ', now - window.quCreative_debug_time);
  window.quCreative_debug_time = now;
  const wh = window.innerHeight;
  var margs = {
    newpage_transition: false,
    call_from: "default"
  };
  if (pargs) {
    margs = $.extend(margs, pargs);
  }
  if (quCreative_main.border_width > 0) {}
  if (margs.newpage_transition) {}
  var extra_class = "";
  var extra_class_main_bg = "";
  var isparallax = false;
  var targeth = "100%";
  var extra_translate = "";
  margs.arg = arg;
  if (window.qucreative_options.bg_isparallax != "on") {}
  if ((0, _qucreative.do_we_need_parallaxer)()) {
    extra_class += " dzsparallaxer";
    extra_class_main_bg += " dzsparallaxer--target";
    isparallax = true;
    var auxpix = wh * (quCreative_main.parallaxer_multiplier - 1) - qucreative_options.substract_parallaxer_pixels;

    // -- for main-bg-con

    extra_translate = "transform: translate3d(0,-" + auxpix + "px,0);";
  }
  var aux_top = "-50";
  quCreative_main.is_content_page = false;
  if (quCreative_main.newclass_body.indexOf("page-normal") > -1 || quCreative_main.newclass_body.indexOf("page-blogsingle") > -1 || quCreative_main.newclass_body.indexOf("page-blog") > -1 || quCreative_main.newclass_body.indexOf("page-portfolio") > -1) {
    quCreative_main.is_content_page = true;
  }
  if (margs.newpage_transition == false) {
    if (_body.hasClass("page-normal") || _body.hasClass("page-blogsingle") || _body.hasClass("page-blog") || _body.hasClass("page-portfolio")) {
      quCreative_main.is_content_page = true;
    }
  }
  _body.addClass("new-" + quCreative_main.newclass_body_page);
  quCreative_main.bg_transition = "slidedown";
  if (quCreative_main.initial_bg_transition) {
    quCreative_main.bg_transition = quCreative_main.initial_bg_transition;
  }
  if (first_bg_not_transitioned == false && margs.newpage_transition == false && quCreative_main.is_content_page) {
    quCreative_main.bg_transition = "fade";
  }
  first_bg_not_transitioned = false;
  if (quCreative_main.bg_transition == "fade") {
    aux_top = 0;
  }
  if (quCreative_main.bg_transition == "fade") {}
  if (margs.newpage_transition == true) {} else {
    quCreative_main._mainBg.addClass("for-remove");
    var aux9000 = quCreative_main._mainBg;
    setTimeout(function () {
      if (aux9000.get(0) && aux9000.get(0).api_destroy) {
        aux9000.get(0).api_destroy();
      }
    }, 1000);
  }
  let the_bg = qucreative_options.images_arr[arg];

  // -- here has an impact
  if (quCreative_main._theContent && (quCreative_main._theContent.parent().hasClass("page-portfolio-single") && quCreative_main._theContent.parent().hasClass("page-portfolio-type-slider") || quCreative_main._theContent.parent().hasClass("page-blogsingle") && quCreative_main._theContent.parent().hasClass("post-media-type-slider"))) {
    if (window.qucreative_options.the_background) {
      the_bg = window.qucreative_options.the_background;
    }
  }
  var aux23_img = '<img class="main-bg-image' + extra_class_main_bg + '" style=" ' + extra_translate + '" src="' + the_bg + '"/>';
  if (the_bg.indexOf("#") == 0) {
    aux23_img = '<div class="main-bg-image is-image ' + extra_class_main_bg + '" style=" width: 100%;height:120%; background-color: ' + the_bg + "; " + extra_translate + '"></div>';
  }
  var mainBgConTr_str = '<div class="main-bg-con do-not-set-js-height js-transitioning-in preparing-to-transition transitioning' + extra_class + '" style="display:none;';
  if (quCreative_main.bg_transition == "fade") {}
  mainBgConTr_str += '">' + aux23_img + '<div class="main-bg-div"  style="height: ' + wh + "px; background-image:url(" + the_bg + ');"></div></div>';

  // -- new page transition
  if (margs.newpage_transition == true) {
    if (quCreative_main.page == "page-homepage") {
      if ($(".main-gallery--descs").length > 0) {
        $(".main-gallery--descs").addClass("removed");
        _mainGalleryDescs = null;
      }
      quCreative_main.currBgNr = 0;
    }
    quCreative_main._mainBg.removeClass("js-transitioning-in");
    if (_body.hasClass("menu-type-9") || _body.hasClass("menu-type-10") || _body.hasClass("menu-type-13") || _body.hasClass("menu-type-14") || _body.hasClass("menu-type-15") || _body.hasClass("menu-type-16") || _body.hasClass("menu-type-17") || _body.hasClass("menu-type-18")) {
      $(".the-content-con").addClass("transitioning-out").removeClass("currContent");
      if (quCreative_main.bg_transition == "fade" && margs.newpage_transition) {
        $(".the-content-con.transitioning-out").animate({}, {
          queue: false,
          duration: animation_time
        });
      }
      if (quCreative_main.new_bg_transition != "off") {
        // -- not sure if here
        quCreative_main._mainContainer.append(mainBgConTr_str);
      }
    } else {
      $(".the-content-con").addClass("transitioning-out").removeClass("currContent");
      if (quCreative_main.new_bg_transition != "off") {
        quCreative_main._navCon.before(mainBgConTr_str);
      }
    }
    calculate_mainbg({
      call_from: "new_page"
    });
    if ($(".main-bg-con.transitioning").eq(0).hasClass("dzsparallaxer")) {
      $(".main-bg-con.transitioning").eq(0).find(".dzsparallaxer--target").css({
        transform: "translate3d(0,-" + (quCreative_main.bigimageheight - wh - qucreative_options.substract_parallaxer_pixels) + "px,0)"
      });
    }
    if (quCreative_main._theContent) {
      quCreative_main._theContent.find(".selector-con,.call-to-action-con, .row.services-lightbox-content, .dzs-tabs.skin-menu .tabs-menu").css({
        "z-index": "auto"
      });
      quCreative_main._theContent.find(".advancedscroller.skin-whitefish.is-thicker .bulletsCon").animate({
        opacity: "0"
      }, {
        queue: false,
        duration: 300
      });
    }
    if (quCreative_main.___response) {
      // -- do script actions

      var sw_wait_for_load = false;
      if (quCreative_main.response_str.indexOf('<div class="qucreative-option-feed" data-rel="zfolio-wait-for-load">') > -1) {
        sw_wait_for_load = true;
      }
      quCreative_main._theContentConTr = quCreative_main.___response.find(".the-content-con");
      quCreative_main._theContentConTr.addClass("transitioning");
      if (sw_wait_for_load) {
        quCreative_main._theContentConTr.addClass("wait-for-main-content-to-load");
      }
      if (!quCreative_main._theContentConTr) {
        console.log("[warn] _theContentConTr missing ..");
      }
      if (quCreative_main._theContentConTr.hasClass("fullit") == false) {
        quCreative_main.page_is_fullwidth = false;
        setTimeout(function () {
          quCreative_main._theContentConTr.css({});
          quCreative_main._theContentConTr.css({});
          quCreative_main._theContentConTr.children("").css({});
          quCreative_main._theContentConTr.children("h1,.the-content,footer").css({});
        }, 100);
      } else {
        quCreative_main._theContentConTr.css({
          opacity: 0
        });
        quCreative_main._theContentConTr.find(".zfolio.fullwidth").css({});
        quCreative_main.page_is_fullwidth = true;
      }
      // -- here we add them
      if (_body.hasClass("menu-type-9") || _body.hasClass("menu-type-10") || _body.hasClass("menu-type-13") || _body.hasClass("menu-type-14") || _body.hasClass("menu-type-15") || _body.hasClass("menu-type-16") || _body.hasClass("menu-type-17") || _body.hasClass("menu-type-18")) {
        quCreative_main._mainContainer.append(quCreative_main._theContentConTr);
      } else {
        quCreative_main._navCon.before(quCreative_main._theContentConTr);
      }
      window.qucreative_actions_goToBg_doIt.forEach(goToBgDoItAction => {
        goToBgDoItAction();
      });

      // -- destroy listeners for dzsap, dzsvg, dzszfl todo: move
      if (quCreative_main._theContent) {
        var selector = ".vplayer,.zfolio";
        if ($(".dzsap_footer").length == 0) {
          selector += ",.audioplayer";
        }
        quCreative_main._theContent.find(selector).each(function () {
          var _t = $(this);
          if (_t.get(0) && _t.get(0).api_destroy_listeners) {
            _t.get(0).api_destroy_listeners();
          }
          setTimeout(function (arg) {
            if (arg && arg.api_destroy) {
              arg.api_destroy();
            }
            _t[0] = null;
          }, 1000, _t.get(0));
        });
      }
      quCreative_main._theContentConTr.find("a.comment-reply-link").addClass("custom-a");
      // todo: move
      if (window.dzsas_init) {
        if (quCreative_main.windowWidth > _qucreative2.RESPONSIVE_BREAKPOINT) {
          if (_body.hasClass("page-portfolio") && quCreative_main.newclass_body_page == "page-portfolio-single" && quCreative_main._theContentConTr.hasClass("fullit") == false) {}
        }
        dzsas_init(quCreative_main._theContentConTr.find(".advancedscroller.skin-qucreative.auto-init-from-q"), {
          init_each: true
        });
        dzsas_init(quCreative_main._theContentConTr.find(".advancedscroller.skin-trumpet.auto-init-from-q"), {
          init_each: true
        });
      }

      // todo: move
      if (window.dzszfl_init) {
        if (quCreative_main.windowWidth > _qucreative2.RESPONSIVE_BREAKPOINT) {
          if (quCreative_main.newclass_body_page == "page-portfolio" && quCreative_main._theContentConTr.hasClass("fullit") == false) {}
        }
        dzszfl_init(quCreative_main._theContentConTr.find(".zfolio.auto-init-from-q"), {
          init_each: true
        });
        setTimeout(function () {
          $(".the-content-con .zfolio").each(function () {
            var _t100 = $(this);
            if (_t100.get(0) && _t100.get(0).api_handle_resize) {
              if (_t100.parent().parent().parent().parent().hasClass("the-content-con")) {
                _t100.parent().parent().parent().parent().css("width", "");
              }
              _t100.get(0).api_handle_resize();
            }
          });
        }, 1000);
      }
    }
  } else {
    // -- same page

    if (quCreative_main.new_bg_transition != "off") {
      quCreative_main._mainBg.after(mainBgConTr_str);
    }
    calculate_mainbg({
      call_from: "same_page"
    });
    if ($(".main-bg-con.transitioning").eq(0).hasClass("dzsparallaxer")) {
      $(".main-bg-con.transitioning").eq(0).find(".dzsparallaxer--target").css({
        transform: "translate3d(0,-" + (quCreative_main.bigimageheight - wh - qucreative_options.substract_parallaxer_pixels) + "px,0)"
      });
    }
  }
  quCreative_main._mainBgTransitioning = _body.find(".main-bg-con.js-transitioning-in:not(.for-remove)");
  if (quCreative_main.bg_transition == "fade") {
    setTimeout(function () {
      quCreative_main._mainBgTransitioning.addClass("transitioning-in ");
    }, animation_time / 2);
  } else {
    quCreative_main._mainBgTransitioning.addClass("transitioning-in ");
  }
  do_transition();
}
function transitionComplete() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve();
    }, quCreative_main.view_animation_duration);
  });
}

/**
 * this is where all transition really come
 */
function do_transition_really_do_it(margs) {
  // -- this is where all transition really come
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  const now = Number(new Date().getDate());
  console.log('[animation] do_transition_really_do_it -> ', now - window.quCreative_debug_time);
  window.quCreative_debug_time = now;
  if (margs && margs.newpage_transition) {}
  var margs_default = {
    arg: 0
  };
  margs = $.extend(margs_default, margs);
  quCreative_main._body.removeClass("qtransitioned");
  quCreative_main._body.addClass("qtransitioning");
  quCreative_main._mainBgTransitioning.css("display", "");
  const _aux_mainBgTransitioning = quCreative_main._mainBgTransitioning;
  if (quCreative_main.view_isFirstTransition) {
    _aux_mainBgTransitioning.addClass("transitionduration0");
    setTimeout(function () {
      _aux_mainBgTransitioning.removeClass("transitionduration0");
    }, 50);
    setTimeout(function () {
      _aux_mainBgTransitioning.removeClass("preparing-to-transition");
      quCreative_main._mainBg.removeClass("preparing-to-transition");
    }, 100);
  } else {
    // -- not first transition

    let delay_time = 50;
    if (quCreative_main.bg_transition == "fade") {
      delay_time = animation_time + 100;
    }
    setTimeout(function () {
      _aux_mainBgTransitioning.removeClass("preparing-to-transition ");
      if (quCreative_main.bg_transition != "fade") {
        _aux_mainBgTransitioning.removeClass("transitioning-out ");
      } else {}
      quCreative_main._mainBg.removeClass("preparing-to-transition transitioning-out");
    }, delay_time);
  }
  var delay_for_main_bg = 0;
  if (_body.hasClass("menu-type-13") || _body.hasClass("menu-type-14") || _body.hasClass("menu-type-17") || _body.hasClass("menu-type-18")) {
    delay_for_main_bg = 100;
  }

  // -- _mainBg Transition

  transitionComplete().then(() => {
    main_bg_transition_complete();
  });
  function main_bg_transition_complete() {
    const now = Number(new Date().getDate());
    console.log("%c [animation] main_bg_transition_complete", "background-color: #dd0000;", now - window.quCreative_debug_time);
    window.quCreative_debug_time = now;
    quCreative_main._mainBg = quCreative_main._mainBgTransitioning;
    quCreative_main._mainBgTransitioning = null;
    theQuery = '.main-bg-con:not(".transitioning")';
    if (quCreative_main.bg_transition == "fade") {
      $(theQuery).addClass("for-remove transitioning-out");
      setTimeout(function () {
        $(".main-bg-con.for-remove").remove();
      }, animation_time + 100);
    } else {
      if (quCreative_main.new_bg_transition != "off") {
        $(theQuery).remove();
      }
    }
    theQuery = '.main-bg-con:not(".for-remove")';
    quCreative_main._mainBg = $(theQuery).eq(0);
    quCreative_main._mainBg.removeClass("transitioning");
    quCreative_main._mainBg.find("figure").eq(0).css({
      width: "",
      height: ""
    });
    if (window.qucreative_options.bg_isparallax == "on" && quCreative_main.newclass_body_page != "page-homepage" && quCreative_main.newclass_body_page != "page-gallery-w-thumbs") {
      setTimeout(function () {}, 30000);
      quCreative_main._mainBg.addClass("dzsparallaxer");
      quCreative_main._mainBg.children(".main-bg").addClass("dzsparallaxer--target");
      setTimeout(function () {}, 4000);
    } else {
      quCreative_main._mainBg.removeClass("dzsparallaxer");
      quCreative_main._mainBg.children(".main-bg").removeClass("dzsparallaxer--target");
    }
    const $mainGalleryDescs = $(".main-gallery--descs");
    if ($mainGalleryDescs.length > 0) {
      if ($mainGalleryDescs.eq(0).hasClass("removed") == false) {
        _mainGalleryDescs = $mainGalleryDescs.eq(0);
      }
    }
    if (_mainGalleryDescs) {
      _mainGalleryDescs.children().removeClass("active");
      _mainGalleryDescs.children().eq(margs.arg).addClass("active");
      if (_mainGalleryDescs.children().eq(margs.arg).find(".big-desc").html()) {
        $(".responsive-info-btn-con").find(".info-text-con").html("<h6>" + _mainGalleryDescs.children().eq(margs.arg).find(".big-desc").html() + "</h6>");
      } else {
        $(".responsive-info-btn-con").find(".info-text-con").html("");
      }
      if (_mainGalleryDescs.children().eq(margs.arg).hasClass("style2")) {
        _mainGalleryDescs.removeClass("style1").addClass("style2");
        _mainGalleryDescs.css({});
      } else {
        _mainGalleryDescs.removeClass("style2").addClass("style1");
        _mainGalleryDescs.css({
          right: ""
        });
      }
      if (is_chrome() && String(window.location.href).indexOf("file://") == 0) {} else {}
      _mainGalleryDescs.css({
        width: _mainGalleryDescs.children().eq(margs.arg).width() + "px",
        height: _mainGalleryDescs.children().eq(margs.arg).height() + "px",
        opacity: "1"
      });
    }
    setup_newBgImage(margs);
    quCreative_main.currBgNr = margs.arg;
    is_ready_load = false;
    is_ready_transition = false;
    quCreative_main.busy_main_transition = false;
    if (!_body.hasClass("q-inited")) {
      setTimeout(function () {
        _body.addClass("q-inited");
        var _c = null;
        if (quCreative_main._theContent) {
          _c = quCreative_main._theContent.parent();
        } else {
          if ($(".the-content-con").length > 0) {
            _c = $(".the-content-con").eq(0);
          }
        }
        if (_c && _c.css("opacity") == 0) {
          fade_the_content_con(_c);
        }
      }, 300);
    }
  }
  if (quCreative_main.view_isFirstTransition) {
    setTimeout(function () {
      _body.removeClass("first-transition");
    }, animation_time);
    setTimeout(function () {
      quCreative_main.view_isFirstTransition = false;
    }, animation_time);
  }
  setTimeout(function () {
    _body.removeClass("first-transition");
  }, animation_time);
  main_content_loaded = true;
  if (margs.newpage_transition == false) {
    setTimeout(function () {
      // -- TODO: debugger animation time
    }, 2000);
  }
}
function fade_the_content_con(arg) {
  const quCreative_main = window.quCreative_main;
}

/**
 *
 * @param margs
 */
function setup_newBgImage(margs) {
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  var mainBgImgCSS = "";
  var mainBgImgUrl = "";
  if (quCreative_main._mainContainer.get(0) && quCreative_main._mainContainer.get(0).api_scrolly_to) {
    _body.addClass("has-custom-scroller");
  }
  var margs_default = {
    newpage_transition: true
  };
  margs = $.extend(margs_default, margs);
  var aux = quCreative_main._mainBg.find("figure").eq(0).css("background-image");
  mainBgImgCSS = aux;
  if (aux) {
    aux = aux.replace("url(", "");
    aux = aux.replace('url("', "");
    aux = aux.replace(")", "");
    aux = aux.replace('")', "");
  } else {}
  mainBgImgUrl = aux;
  if (quCreative_main.qcre_init_zoombox || _body.children(".zoombox-maincon").length == 0) {
    let defaultZoomSoundsSettings = JSON.parse(JSON.stringify(_defaultSettings.zoomboxDefaultSettings));
    var def_opts_parse = $.extend(true, {}, defaultZoomSoundsSettings);
    if (window.init_zoombox) {
      if (window.init_zoombox_preset == "darkfull") {
        quCreative_main.zoombox_options = $.extend(def_opts_parse, window.init_zoombox_darkfull);
      }
      if (window.init_zoombox_preset == "whitefull") {
        quCreative_main.zoombox_options = $.extend(def_opts_parse, window.init_zoombox_whitefull);
      }
      window.init_zoombox(zoombox_options);
    } else {}
    quCreative_main.qcre_init_zoombox = false;
  }
  quCreative_main._c_for_parallax_items = [];

  // -for now we force fade

  var arg = "";
  if ((0, _qucreative.do_we_need_parallaxer)(arg)) {
    quCreative_main._c_for_parallax_items = [];
    if ($(".for-parallaxer").length > 0) {
      $(".for-parallaxer").each(function () {
        var _t = $(this);
        quCreative_main._c_for_parallax_items.push(_t);
      });
    }
  }
  if (margs.newpage_transition && quCreative_main.___response) {
    quCreative_main.transitioned_via_ajax_first = true;

    // -- this is the new page transition from setup_newBgImage() . destroy any listeners here
    (0, _quViewDeterminePage.determine_page)();
    document.body.style.zoom = 1.0;
    $(".dzs-progress-bar").each(function () {
      var _t = $(this);
      if (_t.get(0) && _t.get(0).api_destroy_listeners) {
        _t.get(0).api_destroy_listeners();
      }
      setTimeout(function () {
        _t[0] = null;
      }, 300);
    });
    force_scroll_to_top();
  }
  if (window.qucreative_options.bg_isparallax == "on" && quCreative_main.newclass_body_page != "page-homepage" && quCreative_main.newclass_body_page != "page-gallery-w-thumbs") {
    const args = {
      mode_scroll: "normal",
      animation_duration: "20",
      is_fullscreen: "on",
      init_functional_delay: "0",
      init_functional_remove_delay_on_scroll: "off",
      settings_substract_from_th: qucreative_options.substract_parallaxer_pixels
    };
    if (parallax_reverse) {
      args.direction = "reverse";
    }
    var _aux_theContentCon = $(".main-container > .the-content-con").eq(0);
    if ($(".main-container > .the-content-con.transitioning").length > 0) {
      _aux_theContentCon = $(".main-container > .the-content-con.transitioning").eq(0);
    }
    if (_body.hasClass("with-border")) {}
    args.cthis_height_is_window_height = "on";
    if (window.dzsprx_init) {
      window.dzsprx_init(quCreative_main._mainBg, args);
    }
    quCreative_main._curr_parallaxer = quCreative_main._mainBg;
    if (quCreative_main._mainBg.get(0) && quCreative_main._mainBg.get(0).api_set_update_func) {
      quCreative_main._mainBg.get(0).api_set_update_func(update_parallaxer);
    }
  }
  if (margs.newpage_transition && quCreative_main.___response) {
    // -- part of setup_newBgImage

    $(".map-canvas.to-remove").remove();

    /**     *   * @type {string}   */
    let theQuery = "";
    $(".the-content-con.transitioning-out").remove();
    theQuery = '.the-content-con:not(".transitioning")';
    $(theQuery).find(".zfolio").remove();
    let _contentConTransitioning = $(".the-content-con.transitioning");
    if (quCreative_main._theContent) {
      let _lastContentConTransitioning = _contentConTransitioning.last();
      if (quCreative_main.bg_transition == "fade") {
        setTimeout(function () {
          _lastContentConTransitioning = $(".the-content-con.transitioning").last();
          _lastContentConTransitioning.addClass("currContent");
        }, 100);
        setTimeout(function () {
          _lastContentConTransitioning.addClass("currContent");
        }, 500);
      } else {
        _lastContentConTransitioning.addClass("currContent");
      }
    }
    _contentConTransitioning.each(function () {
      quCreative_main._theContentConTr = $(this);
      quCreative_main._theContentConTr.css("width", "");
      quCreative_main._theContentConTr.css("max-width", "");
      quCreative_main._theContentConTr.removeClass("transitioning");

      // -- olg content destroy zoomfolio
      if (quCreative_main._theContent) {
        quCreative_main._theContent.find(".zfolio").each(function () {
          const _theContentConTr_zfolio = $(this);
          if (_theContentConTr_zfolio.get(0) && _theContentConTr_zfolio.get(0).api_destroy) {
            _theContentConTr_zfolio.get(0).api_destroy();
          }
        });
      }

      // -- the new content-con is the real content-con NOW
      quCreative_main._theContent = $(".the-content:not(.the-content-for-preseter)").eq(0);
      quCreative_main.handle_resize(null, {
        placew: false,
        place_page: true
      });
      if (quCreative_main._theContentConTr.hasClass("fullit")) {
        quCreative_main._theContentConTr.find(".zfolio.fullwidth").css({
          width: ""
        });
        quCreative_main.page_is_fullwidth = true;
      }
      setTimeout(function () {
        if (!quCreative_main._theContentConTr.hasClass("fullit")) {
          if (quCreative_main.page != "nuttin") {
            window.qucreative_actions_setupNewBgImage.forEach(goToBgDoItAction => {
              goToBgDoItAction();
            });
            setTimeout(function () {
              quCreative_main._theContentConTr.addClass("currContent");
            }, 100);
          }
        }
      }, 400);
    });
    setTimeout(function () {
      quCreative_main.reinit({
        call_from: "setup_newBgImage() _ newPageTransition"
      });
    }, 100);
  } else {
    if (first_page_not_transitioned) {
      quCreative_main.reinit({
        call_from: "setup_newBgImage() _ samePageTransition"
      });
      first_page_not_transitioned = false;
    }
    $(".the-content-con").addClass("currContent");
    if (quCreative_main.start_bg_slideshow_time) {
      quCreative_main.start_bg_slideshow_time();
    }
  }
  quCreative_main._mainContainer.addClass("transition-" + quCreative_main.bg_transition);
  setTimeout(function () {
    const args = {
      ignore_menu: false,
      placew: false,
      place_page: false,
      redraw_canvas: false,
      calculate_sidebar_main_is_bigger: true
    };
    quCreative_main.handle_resize(null, args);
  }, 1000);
  const $mapCanvas = $(".map-canvas");
  if ($mapCanvas.length > 0 && window.qcreative_gm_init) {
    window.qcreative_gm_init();
  }
  $mapCanvas.removeClass("transitioning").addClass("to-remove");
  $(".map-canvas-con").removeClass("transitioning");
}
function force_scroll_to_top() {
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  window.scroll_top_object.val = 0;
  if (quCreative_main._mainContainer.get(0) && quCreative_main._mainContainer.get(0).api_scrolly_to) {
    quCreative_main._mainContainer.get(0).api_scrolly_to(0, {
      force_no_easing: "on",
      show_scrollbar: false
    });
  } else {
    $(window).scrollTop(0);
  }
}
let main_content_loaded = false;
/**
 * only on ajax ?
 */
function do_transition(margs) {
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  const now = Number(new Date().getDate());
  console.log('[animation] do_transition -> ', now - window.quCreative_debug_time);
  window.quCreative_debug_time = now;
  _body.addClass("q-inited-bg");
  var delay_time = 0;
  if (quCreative_main.bg_transition != quCreative_main.last_bg_transition) {
    console.warn("different transition");
    delay_time = 100;
  }
  quCreative_main.last_bg_transition = quCreative_main.bg_transition;
  function promiseContentReady() {
    return new Promise(resolve => {
      if (quCreative_main._theContentConTr && quCreative_main._theContentConTr.hasClass("wait-for-main-content-to-load")) {
        main_content_loaded = false;
        var _czfolio = quCreative_main._theContentConTr.find(".zfolio").eq(0);
        inter_check_if_main_content_loaded = setInterval(function () {
          if (_czfolio.hasClass("all-images-loaded")) {
            clearInterval(inter_check_if_main_content_loaded);
            if (main_content_loaded == false) {
              resolve();
            }
          }
        }, 100);
        setTimeout(function () {
          clearInterval(inter_check_if_main_content_loaded);
          if (!main_content_loaded) {
            resolve();
          }
        }, 2000);
      } else {
        setTimeout(function () {
          resolve();
        }, delay_time);
      }
    });
  }
  promiseContentReady().then(() => {
    console.log('[animation] content ready');
    do_transition_really_do_it(margs);
  });
}
function calculate_mainbg(pargs) {
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  var margs = {
    call_from: "default"
  };
  if (pargs) {
    margs = $.extend(margs, pargs);
  }

  // TODO: decide here which main bg to resize

  var selector = ".main-bg-con .main-bg-image";
  if (margs.call_from == "new_page") {
    selector = ".main-bg-con.transitioning .main-bg-image";
  }
  var _c = $(selector);
  _c.each(function () {
    var _t = $(this);
    var wi = _t.get(0).naturalWidth;
    var he = _t.get(0).naturalHeight;
    if (quCreative_main.border_width) {
      quCreative_main.windowWidth = window.innerWidth - quCreative_main.border_width;
      console.info("ww-", ww);
    }
    var auxww = quCreative_main.windowWidth;
    var auxwh = quCreative_main.windowHeight;
    var arg = "";
    if ((0, _qucreative.do_we_need_parallaxer)(arg)) {
      auxwh *= quCreative_main.parallaxer_multiplier;
    }
    var sw_no_parallaxer = false;
    if (margs.call_from == "new_page") {
      if ((quCreative_main.newclass_body.indexOf("single-dzsvcs_port_items-fullscreen") > -1 || quCreative_main.newclass_body.indexOf("single-quextend_port_items-fullscreen") > -1) && quCreative_main.newclass_body.indexOf("post-media-type-image") > -1) {
        sw_no_parallaxer = true;
      }
    } else {
      if (quCreative_main._theContent) {
        if (quCreative_main._theContent.parent().hasClass("single-dzsvcs_port_items-fullscreen post-media-type-image") || quCreative_main._theContent.parent().hasClass("single-quextend_port_items-fullscreen post-media-type-image")) {
          sw_no_parallaxer = true;
        }
      }
    }
    if (sw_no_parallaxer) {
      quCreative_main.bigimagewidth = quCreative_main.windowWidth;
      quCreative_main.bigimageheight = quCreative_main.windowHeight;
    }
    if (wi / he > auxww / auxwh) {
      quCreative_main.bigimagewidth = auxwh * (wi / he);
      quCreative_main.bigimageheight = auxwh;
    } else {
      quCreative_main.bigimagewidth = auxww;
      quCreative_main.bigimageheight = auxww * (he / wi);
    }
  });
}
function update_parallaxer(arg) {
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  if (isNaN(arg)) {
    arg = 0;
  }

  // -- we receive the value from parallaxer

  if (quCreative_main._c_for_parallax_items) {
    for (let i24 = 0; i24 < quCreative_main._c_for_parallax_items.length; i24++) {
      var _t = quCreative_main._c_for_parallax_items[i24];
      var arg2 = arg;
      if ((_body.hasClass("menu-type-13") || _body.hasClass("menu-type-14") || _body.hasClass("menu-type-17") || _body.hasClass("menu-type-18")) && _body.hasClass("menu-is-sticky") == false) {
        if (_t.parent().parent().hasClass("qucreative--nav-con")) {
          arg2 += Number($(window).scrollTop());
        }
        if (quCreative_main._theContent && quCreative_main._theContent.parent().hasClass("page-portfolio-single")) {
          arg2 = Number($(window).scrollTop());
        }
      }
      _t.css({
        transform: "translate3d(0," + arg2 + "px,0)"
      });
    }
  }
}

},{"./_checkLazyLoading":1,"./_qu-view-determine-page":4,"./_qucreative.config":7,"./_qucreative.util":8,"./config/_defaultSettings":9,"./js/common/_sniffers":12}],4:[function(require,module,exports){
"use strict";function determine_page(){const e=window.quCreative_main,a=e._body;e.is_content_page=!1,a.hasClass("page-gallery-w-thumbs")&&(e.page="page-gallery-w-thumbs"),a.hasClass("page-portfolio")&&(e.page="page-portfolio",e.is_content_page=!0),a.hasClass("page-portfolio-single")&&(e.page="page-portfolio-single",e.is_content_page=!0),a.hasClass("page-normal")&&(e.page="page-normal",e.is_content_page=!0),a.hasClass("page-blog")&&(e.page="page-blog",e.is_content_page=!0),a.hasClass("page-blogsingle")&&(e.page="page-blogsingle",e.is_content_page=!0),a.hasClass("page-about")&&(e.page="page-about",e.is_content_page=!0),a.hasClass("page-contact")&&(e.page="page-contact",e.is_content_page=!0),a.hasClass("page-homepage")&&(e.page="page-homepage"),e.transitioned_via_ajax_first&&e.newclass_body&&(a.removeClass("page-blogsingle page-homepage page-gallery-w-thumbs page-normal page-contact page-about page-contact page-portfolio page-portfolio-single"),a.removeClass("new-"+e.newclass_body_page),a.addClass(e.newclass_body),a.attr("class",e.newclass_body),"menu-type-5"!=e.menu_type&&"menu-type-6"!=e.menu_type||a.addClass("menu-is-sticky"),e.handle_resize(null,{ignore_menu:!1,placew:!1,place_page:!1,redraw_canvas:!1,calculate_sidebar_main_is_bigger:!1,calculate_menu_overflow:!0}),a.removeClass("bg_transition-fade bg_transition-slidedown bg_transition-wipedown"),a.addClass("bg_transition-"+e.bg_transition),a.removeClass("first-transition"),e.border_width>0&&a.addClass("with-border"),e.newclass_body=e.newclass_body.replace(/menu-type-\d*/g,""),e.page=e.newclass_body_page,a.removeClass("no-padding"),e.newclass_body_nopadding&&a.addClass("no-padding"))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.determine_page=determine_page;
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check_animation_time = check_animation_time;
exports.quBuildResponsiveMenu = quBuildResponsiveMenu;
exports.quSetupBorderCss = quSetupBorderCss;
function check_animation_time(quCreative_main) {
  if (window.qucreative_view_animation_duration) {
    quCreative_main.view_animation_duration = window.qucreative_view_animation_duration * 1000;
  }
}

/**
 * should do only on init todo:
 * @param quCreative_main
 * @param _body
 */
function quBuildResponsiveMenu(quCreative_main, _body) {
  let the_select_str = '<select class="dzs-style-me-from-q skin-justvisible " name="the_layout"> <option value="default">default</option> <option value="random">random</option> </select>';
  if (qucreative_options.responsive_menu_type == "custom") {
    the_select_str = "";
  }
  let the_custom_menu_str = "";
  if (qucreative_options.responsive_menu_type == "custom") {
    the_select_str = "";
    the_custom_menu_str = '<div class="custom-responsive-menu"><div class="close-responsive-con"><i class="fa fa-times"></i></div><div class="custom-menu-con"><ul class="custom-menu"></ul></div></div>';
  }
  if (quCreative_main._theContent && quCreative_main._theContent.length) {
    if (quCreative_main._theContent.parent().children(".qucreative--520-nav-con").length == 0) {
      quCreative_main._theContent.parent().prepend('<div class="qucreative--520-nav-con "> <div class="dzs-select-wrapper skin-justvisible "> <div class="dzs-select-wrapper-head"> <div class="nav-wrapper-head bg-color-hg"><i class="fa fa-bars"></i></div> </div> ' + the_select_str + " </div>" + the_custom_menu_str + " </div>");
      quCreative_main._navCon_520 = quCreative_main._theContent.parent().children(".qucreative--520-nav-con").eq(0);
    }
  }
}

/**
 *
 * @param {QuCreative} quCreative_main
 * @param _body
 */
function quSetupBorderCss(quCreative_main) {
  const $ = quCreative_main.$;
  const _body = quCreative_main._body;
  _body.addClass("with-border");
  quCreative_main._mainContainer.css({
    padding: quCreative_main.border_width + "px"
  });
  if (_body.hasClass("qucreative-horizontal-menu") && _body.hasClass("menu-is-sticky")) {
    quCreative_main._navCon.css({
      top: quCreative_main.border_width + "px",
      left: quCreative_main.border_width + "px",
      width: "calc(100% - " + quCreative_main.border_width * 2 + "px)"
    });
  }
  if (_body.hasClass("qucreative-vertical-menu")) {
    quCreative_main._navCon.find(".translucent-con--for-nav-con").css({
      top: -quCreative_main.border_width + "px"
    });
  }
  if (_body.hasClass("qucreative-vertical-menu") && _body.hasClass("menu-is-sticky")) {
    quCreative_main._navCon.css({
      top: quCreative_main.border_width + "px",
      left: quCreative_main.border_width + "px",
      height: "calc(100% - " + quCreative_main.border_width * 2 + "px)"
    });
  }
  var aux = "";
  aux += '<style class="qucreative-border-css">';
  aux += ".main-gallery--descs { right: " + (0 + quCreative_main.border_width) + "px } ";
  aux += ".main-gallery-buttons-con { right: " + (30 + quCreative_main.border_width) + "px } ";
  aux += ".main-gallery-buttons-con { bottom: " + (-30 + quCreative_main.border_width) + "px } ";
  aux += ".main-gallery-buttons-con.style2 { bottom: " + (30 + quCreative_main.border_width) + "px } ";
  if (_body.hasClass("qucreative-vertical-menu")) {
    aux += "nav.qucreative--nav-con { top: " + (0 + quCreative_main.border_width) + "px } ";
    aux += "nav.qucreative--nav-con { left: " + (0 + quCreative_main.border_width) + "px } ";
    aux += "nav.qucreative--nav-con { height: calc(100% - " + quCreative_main.border_width * 2 + "px); } ";
  }
  aux += "</style>";
  $("head").append(aux);
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuCreative = void 0;
var _qucreative = require("./_qucreative.config");
var _quViewLayout = require("./js/features/_quViewLayout");
var _quViewAnimation = require("./_qu-view-animation");
class QuCreative {
  busy_main_transition = false;
  $theActualNav = null;
  response_str = null;
  _theContent = null;
  custom_responsive_menu = null;
  _theContentConTr = null;
  _mainContainer = null;
  ___response = null;
  _curr_parallaxer = null; // -- the current parallax main bg
  _navCon = null;
  _navCon_520 = null;
  _mainBg = null;
  _preloaderCon = null;
  _mainBgTransitioning = null;
  page = null;
  currBgNr = 0;
  inter_bg_slideshow = 0;
  _body = null;
  bg_transition = "slidedown";
  last_bg_transition = "slidedown";
  menu_type = "";
  menu_macrotype = "horizontal"; // -- horizontal = 9-10; 13-18
  initial_bg_transition = "";
  newclass_body_nopadding = false;
  newclass_body_with_fullbg = false;
  qcre_init_zoombox = false;
  zoombox_options = {};
  old_zoombox_options = {};
  _c_for_parallax_items = null;
  page_is_fullwidth = false;
  transitioned_via_ajax_first = false; // -- set to true when the first ajax transition has been made
  page_portfolio_requires_move_filters = false;
  newclass_body = "";
  content_width = 1122;
  force_content_width = 1122;
  newclass_body_page = "";
  reinit = null;
  curr_html = "";
  curr_html_with_clear_cache = false;
  view_isFirstTransition = true; // -- for ajax
  is_content_page = false;
  new_bg_transition = "on"; // -- if set to "off" then the initial background will remain
  parallaxer_multiplier = 1.3;
  bigimagewidth = 0;
  bigimageheight = 0;
  border_width = 0;
  windowWidth = 0;
  windowHeight = 0;
  view_animation_duration = 400;
  menu_content_space = 20;
  view_menuWidth = 250;
  view_menuWidth_onRight = 0;
  $cssFromJs = null;
  _logoCon = null;
  goto_bg = null;
  $ = null;
  // -- ajax
  scripts_loaded_arr = [];
  videoplayers_tobe_resized = []; // we need this ?

  constructor($, reinit, goto_bg) {
    this._mainContainer = $(".main-container").eq(0);
    this._mainBg = $(".main-bg-con").eq(0);
    this._preloaderCon = $(".main-container > .preloader-con");
    this._navCon = $(".qucreative--nav-con").eq(0);
    this._navCon_520 = $(".qucreative--520-nav-con").eq(0);
    this.$theActualNav = $("ul.the-actual-nav").eq(0);
    this._body = $("body");
    this.reinit = reinit;
    this.goto_bg = goto_bg;
    this.$ = $;
  }
  qcreative_overwrite_mainoptions(arg) {
    const $ = this.$;
    const customizer_force_blur = -1;
    var qucreative_options_defaults = _qucreative.QUCREATIVE_DEFAULTS;
    var qucreative_options_defaults_string = JSON.stringify(qucreative_options_defaults);
    var auxer5 = JSON.parse(qucreative_options_defaults_string);
    window.qucreative_options = $.extend(auxer5, arg);
    if (customizer_force_blur > -1) {
      qucreative_options.blur_amount = customizer_force_blur;
    }
    if (isNaN(parseInt(window.qucreative_options.blur_amount, 10)) == false) {
      window.qucreative_options.blur_amount = parseInt(window.qucreative_options.blur_amount, 10);
    } else {
      window.qucreative_options.blur_amount = 25;
    }
    var aux = window.qucreative_options.images_arr;
    aux = aux.replace(/'/g, "");
    window.qucreative_options.images_arr = aux.split(",");
    window.qucreative_options = qucreative_options;
  }
  handle_resize(e, pargs) {
    const $ = this.$;
    let menu_is_scrollable = false,
      menu_is_scrollable_offset = 0,
      the_actual_nav_initial_top_offset = -1;
    const _body = this._body;
    let margs = Object.assign({
      ignore_menu: false,
      placew: true,
      place_page: true,
      // what does this do ?
      redraw_canvas: true,
      calculate_sidebar_main_is_bigger: true,
      calculate_menu_overflow: true
    }, pargs || {});
    const quCreative_main = this;
    quCreative_main.windowWidth = window.innerWidth;
    quCreative_main.windowHeight = window.innerHeight;
    if (quCreative_main.border_width > 0) {
      quCreative_main.windowWidth = quCreative_main.windowWidth - quCreative_main.border_width * 2;
    }
    $(".main-bg-div").height(quCreative_main.windowHeight);
    if (quCreative_main.page == "page-portfolio-single" && quCreative_main._theContent && quCreative_main._theContent.parent().hasClass("fullit")) {
      $(".advancedscroller").eq(0).css("height", "100%");
      $(".advancedscroller-con").eq(0).height(quCreative_main.windowHeight);
      $(".advancedscroller-con-placeholder").eq(0).height(quCreative_main.windowHeight);
    }
    (0, _quViewLayout.calculate_menu_width)(quCreative_main);
    if (margs.placew) {
      $(".placewh").each(function () {
        var _t = $(this);
        _t.attr("data-placeholderh", quCreative_main.windowHeight);
        if (_t.hasClass("for-parallaxer")) {
          _t.attr("data-placeholderh", quCreative_main.bigimageheight * quCreative_main.parallaxer_multiplier);
        }
      });
    }
    if (quCreative_main.videoplayers_tobe_resized.length > 0) {
      for (let i4 = 0; i4 < quCreative_main.videoplayers_tobe_resized.length; i4++) {
        const _c = quCreative_main.videoplayers_tobe_resized[i4];
        if (_c.hasClass("auto-height-16-9")) {
          _c.height(0.562 * _c.width());
        } else {
          var aux_oh = _c.data("original-height");
          var aux_cw = _c.width();
          var aux_rw = _c.data("reference-width");
          var aux_total = aux_cw / aux_rw * aux_oh;
          _c.height(aux_total);
        }
      }
    }
    if (margs.calculate_menu_overflow) {
      if (_body.hasClass("menu-type-1") || _body.hasClass("menu-type-2") || _body.hasClass("menu-type-3") || _body.hasClass("menu-type-4") || _body.hasClass("menu-type-5") || _body.hasClass("menu-type-6") || _body.hasClass("menu-type-7") || _body.hasClass("menu-type-8")) {
        if (quCreative_main.$theActualNav && quCreative_main.$theActualNav.offset && quCreative_main.$theActualNav.offset()) {
          if (the_actual_nav_initial_top_offset == -1) {
            the_actual_nav_initial_top_offset = quCreative_main.$theActualNav.offset().top;
          }
        } else {
          console.warn("actual nav does not exist ? ");
        }
        var aux_sum = the_actual_nav_initial_top_offset + quCreative_main.$theActualNav.outerHeight() + 10;
        if (quCreative_main._navCon.children(".nav-social-con").length > 0) {
          aux_sum += quCreative_main._navCon.children(".nav-social-con").outerHeight() + 30;
        }
        if (aux_sum > quCreative_main.windowHeight) {
          quCreative_main._navCon.addClass("menu-overflows-height");
          menu_is_scrollable = true;
          menu_is_scrollable_offset = aux_sum - quCreative_main.windowHeight;
          if (qucreative_options.menu_scroll_method == "scroll") {
            menu_is_scrollable_offset += 100;
          }
        } else {
          quCreative_main._navCon.removeClass("menu-overflows-height");
          menu_is_scrollable = false;
          menu_is_scrollable_offset = 0;
          this._logoCon.css({
            "margin-top": ""
          });
        }
      }
    }
    if (margs.place_page) {
      if (quCreative_main.page == "page-portfolio" || quCreative_main.page == "page-portfolio-single" || quCreative_main.page == "page-normal" || quCreative_main.page == "page-blog" || quCreative_main.page == "page-blogsingle" || quCreative_main.page == "page-about" || quCreative_main.page == "page-contact") {
        // -- setting the content left position, menu types excluded here

        if (!_body.hasClass("page-is-fullwidth") && quCreative_main.menu_macrotype === 'vertical') {
          if (quCreative_main.windowWidth < quCreative_main.view_menuWidth + this.menu_content_space + quCreative_main.content_width) {
            _body.addClass("semi-responsive-mode");
            _body.addClass("semi-responsive-mode-enforce");
          } else {
            _body.removeClass("semi-responsive-mode");
            _body.removeClass("semi-responsive-mode-enforce");
          }
        }
      }
    }
    if (quCreative_main.windowWidth < 1000 && quCreative_main.windowWidth < quCreative_main.view_menuWidth + this.menu_content_space + quCreative_main.content_width) {
      _body.addClass("responsive-mode-sc");
    } else {
      _body.removeClass("responsive-mode-sc");
    }
    if (quCreative_main.windowWidth + quCreative_main.border_width * 2 < _qucreative.RESPONSIVE_BREAKPOINT) {
      _body.removeClass("semi-responsive-mode");
      _body.removeClass("semi-responsive-mode-enforce");
    }
    if (margs.place_page) {
      $(".translucent-bg").each(function () {
        var _t = $(this);
        if (margs.ignore_menu) {
          if (_t.parent().parent().hasClass("qucreative--nav-con")) {
            return;
          }
        }
      });
      (0, _quViewAnimation.calculate_mainbg)({
        call_from: "handle_resize"
      });
    }
    window.qucreative_handle_resize_actions.forEach(reinitAction => {
      reinitAction(margs, quCreative_main);
    });
  }
}
exports.QuCreative = QuCreative;

},{"./_qu-view-animation":3,"./_qucreative.config":7,"./js/features/_quViewLayout":14}],7:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.regex_menu_type=exports.regex_bodyclass_page=exports.regex_ajax_find_scripts=exports.regex_ajax_find_links=exports.RESPONSIVE_BREAKPOINT=exports.QU_VIEW_ANIM_DEFAULT_TIME=exports.QUCREATIVE_DEFAULTS=void 0;const QUCREATIVE_DEFAULTS=exports.QUCREATIVE_DEFAULTS={images_arr:["#ffffff"],bg_slideshow_time:"0",site_url:"detect",enable_ajax:"on",page:"index",bg_isparallax:"off",gallery_w_thumbs_autoplay_videos:"on",enable_native_scrollbar:"on",blur_amount:25,border_width:"0",border_color:"#ffffff",substract_parallaxer_pixels:10,content_width:"0",width_column:"0",width_gap:"0",width_blur_margin:"0",content_gap_width:"0",menu_scroll_method:"scroll",responsive_menu_type:"custom",bg_transition:"slidedown",new_bg_transition:"on",video_player_settings:{init_each:!0,settings_youtube_usecustomskin:"off",design_skin:"skin_reborn",settings_video_overlay:"on"}},QU_VIEW_ANIM_DEFAULT_TIME=exports.QU_VIEW_ANIM_DEFAULT_TIME=400,RESPONSIVE_BREAKPOINT=exports.RESPONSIVE_BREAKPOINT=1e3,regex_menu_type=exports.regex_menu_type=/menu-type-(.*?)( |$)/g,regex_bodyclass_page=exports.regex_bodyclass_page=/.*?(page-(?:blogsingle|homepage|gallery-w-thumbs|normal|contact|about|contact|portfolio|portfolio-single))/g,regex_ajax_find_scripts=exports.regex_ajax_find_scripts=/<script.*?src=['|"](.*?)['|"][\s|\S]*?\/script>/gim,regex_ajax_find_links=exports.regex_ajax_find_links=/(<!--\[if lt IE \d*\]>[\S|\s]{0,1})?<link.*?href=['|"](.*?)['|"][\s|\S]*?\/{0,1}>/gim;
},{}],8:[function(require,module,exports){
"use strict";function find_theContentSheet(e){var t=null;return e.parent().parent().parent().parent().parent().parent().hasClass("the-content-sheet")?t=e.parent().parent().parent().parent().parent().parent():e.parent().parent().parent().parent().parent().hasClass("the-content-sheet")&&(t=e.parent().parent().parent().parent().parent()),t}function do_we_need_parallaxer(e){return e||(e="newbody"),"newbody"==e?"on"==window.qucreative_options.bg_isparallax&&"page-homepage"!=newclass_body_page&&"page-gallery-w-thumbs"!=newclass_body_page&&0==(newclass_content_con.indexOf("page-portfolio-single")>-1&&newclass_content_con.indexOf("page-portfolio-type-image")>-1&&newclass_content_con.indexOf("single-quextend_port_items-fullscreen")>-1):"currbody"==e&&("on"==window.qucreative_options.bg_isparallax&&-1==_body.attr("class").indexOf("page-homepage")&&-1==_body.attr("class").indexOf("page-gallery-w-thumbs")&&0==(_body.attr("class").indexOf("page-portfolio-single")>-1&&_body.attr("class").indexOf("page-portfolio-type-image")>-1&&_body.attr("class").indexOf("single-quextend_port_items-fullscreen")>-1))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.do_we_need_parallaxer=do_we_need_parallaxer,exports.find_theContentSheet=find_theContentSheet;
},{}],9:[function(require,module,exports){
"use strict";function qcre_callback_for_zoombox(e){e.prepend('<div class="qucreative--520-nav-con--placeholder" style="height: '+jQuery(".qucreative--520-nav-con").eq(0).outerHeight()+'px;"></div>'),window.dzsscr_init&&window.dzsscr_init(".zoombox-maincon .scroller-con",{settings_skin:"skin_apple",enable_easing:"on",settings_autoresizescrollbar:"on",settings_chrome_multiplier:.12,settings_firefox_multiplier:-3,settings_refresh:700,settings_autoheight:"off",touch_leave_native_scrollbar:"on"}),jQuery(".main-container")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.zoomboxSettings_whiteFull=exports.zoomboxSettings_darkFull=exports.zoomboxDefaultSettings=void 0;const zoomboxDefaultSettings=exports.zoomboxDefaultSettings={settings_paddingHorizontal:"100",settings_paddingVertical:"100",settings_resizemaincon:"off",design_animation:"fromcenter",design_skin:"skin-darkfull",design_borderwidth:"default",settings_deeplinking:"on",settings_disableSocial:"on",settings_useImageTag:"on",zoombox_audioplayersettings:{},settings_makeFunctional:!1,settings_usearrows:"on",social_enableTwitterShare:"on",social_enableGooglePlusShare:"on",social_extraShareIcons:"",videoplayer_settings:{design_skin:"skin_reborn",zoombox_video_autoplay:"off",settings_youtube_usecustomskin:"off",settings_video_overlay:"on"},audioplayer_settings:{},settings_extraClasses:"",settings_disablezoom:"on",preset_name:"darkfull",settings_zoom_doNotGoBeyond1X:"off",settings_zoom_use_multi_dimension:"off",settings_zoom_disableMouse:"off",settings_enableSwipe:"on",settings_enableSwipeOnDesktop:"on",settings_galleryMenu:"dock",settings_transition:"fade",settings_transition_gallery:"slide",settings_transition_out:"fade",settings_transition_gallery_when_ready:"on",settings_force_delay_time_for_loaded:0,settings_add_delay_time_for_gallery_transition:0,settings_add_delay_time_for_transition_in:0,settings_try_to_take_item_from_cache:"on",settings_fullsize:"off",settings_holder_con_extra_classes:"",settings_holder_extra_classes:"",settings_callback_func_gotoItem:null},zoomboxSettings_whiteFull=exports.zoomboxSettings_whiteFull={settings_zoom_doNotGoBeyond1X:"off",design_skin:"skin-whitefull",settings_enableSwipe:"off",settings_enableSwipeOnDesktop:"off",settings_galleryMenu:"none",settings_useImageTag:"on",settings_fullsize:"on",preset_name:"whitefull",settings_disablezoom:"on",settings_transition:"fromtop",settings_transition_gallery:"helper-rectangle",settings_transition_out:"slideup",settings_disableSocial:"on",settings_add_delay_time_for_gallery_transition:50,settings_add_delay_time_for_transition_in:20,videoplayer_settings:{design_skin:"skin_reborn",zoombox_video_autoplay:"off"},settings_extraClasses:"",settings_holder_con_extra_classes:" scroller-con",settings_holder_extra_classes:" inner",settings_callback_func_gotoItem:qcre_callback_for_zoombox},zoomboxSettings_darkFull=exports.zoomboxSettings_darkFull={settings_zoom_doNotGoBeyond1X:"off",design_skin:"skin-darkfull",settings_enableSwipe:"on",settings_enableSwipeOnDesktop:"on",settings_galleryMenu:"dock",settings_useImageTag:"on",settings_paddingHorizontal:"100",settings_paddingVertical:"100",settings_disablezoom:"on",preset_name:"darkfull",settings_transition:"fade",settings_transition_out:"fade",videoplayer_settings:{design_skin:"skin_reborn",zoombox_video_autoplay:"off",settings_youtube_usecustomskin:"off",settings_video_overlay:"on"}};window.qcre_callback_for_zoombox=qcre_callback_for_zoombox;
},{}],10:[function(require,module,exports){
"use strict";function dzsCommon_init_lazyloadingImages(){window.dzs_check_lazyloading_images=function(){function a(){var a=jQuery(window).scrollTop(),e=jQuery(window).height();window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll&&(a=-parseInt(window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll.css("top"),10)),jQuery("img[data-src],.divimage[data-src]").each(function(){var i=jQuery(this);if(i.offset().top<=a+e+355){var t=new Image;t.onload=function(){if(i.attr("data-src")){var a=i.attr("data-src");i.hasClass("divimage")?(i.css("background-image","url("+a+")"),window.dzs_check_lazyloading_images_toberesized_arr.push(i),i.attr("data-responsive_ratio",this.naturalHeight/this.naturalWidth),window.dzs_check_lazyloading_image_resize()):i.attr("src",a),i.attr("data-src",""),i.addClass("loaded")}if(i.hasClass("set-height-auto-after-load")&&i.css("height","auto"),i.parent().parent().parent().parent().parent().hasClass("mode-isotope")){var e=i.parent().parent().parent().parent().parent();e.get(0)&&e.get(0).api_relayout_isotope&&e.get(0).api_relayout_isotope()}},t.src=i.attr("data-src")}}),window.dzs_check_lazyloading_inter=0,window.dzs_check_lazyloading_delayed=0}window.dzs_check_lazyloading_inter&&(clearTimeout(window.dzs_check_lazyloading_inter),++window.dzs_check_lazyloading_delayed>39&&a()),window.dzs_check_lazyloading_inter=setTimeout(function(){a()},50)},window.dzs_check_lazyloading_image_resize=function(){for(var a=0;a<window.dzs_check_lazyloading_images_toberesized_arr.length;a++){var e=window.dzs_check_lazyloading_images_toberesized_arr[a];e.height(Number(e.attr("data-responsive_ratio"))*e.width())}},window.dzs_check_lazyloading_images_inited||(window.dzs_check_lazyloading_images_inited=!1,jQuery(window).bind("resize",window.dzs_check_lazyloading_image_resize))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.dzsCommon_init_lazyloadingImages=dzsCommon_init_lazyloadingImages;
},{}],11:[function(require,module,exports){
"use strict";function is_touch_device(){return!!("ontouchstart"in window)}function can_history_api(){return!(!window.history||!history.pushState)}function initObjectSizeProto(){Object.size=function(e){var t,r=0;for(t in e)e.hasOwnProperty(t)&&r++;return r},function(e){e.fn.descendantOf=function(e){return 0!=this.closest(e).length}}(jQuery)}function get_query_arg(e,t){if(e.indexOf(t+"=")>-1){var r="[?&]"+t+"=.+",o=new RegExp(r),i=o.exec(e);if(null!=i){var n=i[0];if(n.indexOf("&")>-1){n=n.split("&")[1]}return n.split("=")[1]}}}function getBrowserScrollSize(){var e={border:"none",height:"200px",margin:"0",padding:"0",width:"200px"},t=jQuery("<div>").css(jQuery.extend({},e)),r=jQuery("<div>").css(jQuery.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},e)).append(t).appendTo("body").scrollLeft(1e3).scrollTop(1e3),o={height:r.offset().top-t.offset().top||0,width:r.offset().left-t.offset().left||0};return r.remove(),o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.can_history_api=can_history_api,exports.getBrowserScrollSize=getBrowserScrollSize,exports.get_query_arg=get_query_arg,exports.initObjectSizeProto=initObjectSizeProto,exports.is_touch_device=is_touch_device;
},{}],12:[function(require,module,exports){
"use strict";function ieVersion(){var e=window.navigator.userAgent;return e.indexOf("Trident/7.0")>0?11:e.indexOf("Trident/6.0")>0?10:e.indexOf("Trident/5.0")>0?9:0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.ieVersion=ieVersion;
},{}],13:[function(require,module,exports){
"use strict";function dzsQuc_initAdvancedScrollers(){window.init_advanced_scrollers=function(){function t(){dzsas_init(".advancedscroller.auto-init-from-q.clients-slider",{init_each:!0,settings_swipe:"on",settings_swipeOnDesktopsToo:"on",design_itemwidth:"16.666667%",responsive_720_design_itemwidth:"25%"}),e(".advancedscroller.skin-qucreative.auto-init-from-q,.advancedscroller.skin-trumpet.auto-init-from-q").each(function(){var t=e(this);t.hasClass("inited")?t.get(0)&&t.get(0).api_handleResize&&t.get(0).api_handleResize():dzsas_init(t,{init_each:!0})}),e(".advancedscroller.testimonial-ascroller").each(function(){var t=e(this);if(t.hasClass("inited"))t.get(0)&&t.get(0).api_handleResize&&t.get(0).api_handleResize();else{var i={settings_mode:"onlyoneitem",design_arrowsize:"0",settings_swipe:"on",settings_swipeOnDesktopsToo:"on",settings_slideshow:"on",settings_slideshowTime:"300",settings_transition:"slide",settings_lazyLoading:"on",settings_lazyLoading_load_otheritems_after_loading_first_items:"on",settings_autoHeight:"off",settings_centeritems:!1,design_bulletspos:"bottom",settings_wait_for_do_transition_call:"off",settings_transition_only_when_loaded:"off"};if(window.temp_options={},t.attr("data-options")){var s=t.attr("data-options");try{i=e.extend(i,JSON.parse(s))}catch(t){console.error(t)}}dzsas_init(t,i)}}),e('.advancedscroller.skin-nonav.auto-init-from-q:not(".inited")').each(function(){var t=e(this),i={init_each:!0,settings_swipe:"on",settings_swipeOnDesktopsToo:"on"};if(t.attr("data-options")){var s=t.attr("data-options");try{i=e.extend(i,JSON.parse(s))}catch(t){console.error(t)}}0==t.hasClass("inited")&&dzsas_init(t,i)}),e(".advancedscroller.auto-init-from-q").each(function(){var t=e(this);if(t.hasClass("inited"))t.get(0)&&t.get(0).api_handleResize&&t.get(0).api_handleResize();else{var i={init_each:!0,settings_swipe:"on",settings_swipeOnDesktopsToo:"on"};if(window.temp_options={},t.attr("data-options")){var s=t.attr("data-options");try{i=e.extend(i,JSON.parse(s))}catch(t){console.error(t)}}dzsas_init(t,i)}}),setTimeout(function(){e(".testimonial-ascroller").each(function(){var t=e(this);t.get(0)&&t.get(0).api_force_resize&&t.get(0).api_force_resize()})},100)}var e=jQuery;window.dzsas_init?t():setTimeout(function(){window.dzsas_init?t():setTimeout(function(){window.dzsas_init&&t()},3e3)},1e3)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.dzsQuc_initAdvancedScrollers=dzsQuc_initAdvancedScrollers;
},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate_menu_width = calculate_menu_width;
exports.dzsQu_view_adjustLayout = dzsQu_view_adjustLayout;
exports.dzsQu_view_adjustLayoutContentWidth = dzsQu_view_adjustLayoutContentWidth;
let force_width_gap = 0,
  force_width_column = 0,
  force_width_blur_margin = 0,
  force_content_gap_width = 0,
  force_width_section_bg = 0;
function calculate_menu_width(quCreative_main) {
  const _body = jQuery("body");
  if (_body.hasClass("menu-type-3") || _body.hasClass("menu-type-4") || _body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
    quCreative_main.view_menuWidth = 230;
  }
  if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
    quCreative_main.view_menuWidth = 230;
  }
  if (_body.hasClass("menu-type-7") || _body.hasClass("menu-type-8") || _body.hasClass("menu-type-11")) {
    quCreative_main.view_menuWidth = 260;
  }
  if (_body.hasClass("menu-type-12")) {
    quCreative_main.view_menuWidth = 170;
    quCreative_main.view_menuWidth_onRight = 200;
  }
}
function dzsQu_view_adjustLayout(quCreative_main) {
  quCreative_main.force_content_width = parseInt(qucreative_options.content_width, 10);
  force_width_column = parseInt(qucreative_options.width_column, 10);
  force_width_gap = parseInt(qucreative_options.width_gap, 10);
  force_width_blur_margin = parseInt(qucreative_options.width_blur_margin, 10);
  force_content_gap_width = parseInt(qucreative_options.content_gap_width, 10);
  force_width_section_bg = parseInt(qucreative_options.width_section_bg, 10);
  if (isNaN(force_width_section_bg)) {
    force_width_section_bg = "";
  }
  if (isNaN(quCreative_main.force_content_width) || quCreative_main.force_content_width == 0) {
    quCreative_main.force_content_width = 0;
  }
  if (force_width_section_bg) {
    if (isNaN(force_width_column)) {
      force_width_column = 56;
    }
    if (isNaN(force_width_gap)) {
      force_width_gap = 30;
    }
    if (isNaN(force_width_blur_margin)) {
      force_width_blur_margin = 30;
    }
  }
  if (isNaN(force_width_column) || force_width_column == 0) {} else {
    if (force_width_section_bg) {}

    // -- defaults ?
    if (force_width_column != 56 || force_width_gap != 30 || force_width_blur_margin != 30 || force_width_section_bg) {
      quCreative_main.force_content_width = force_width_column * 12 + force_width_gap * 13 + force_width_blur_margin * 2;
      if (force_width_section_bg) {
        quCreative_main.force_content_width = force_width_column * 12 + force_width_gap * 11 + force_width_blur_margin * 2 + 2 * force_width_section_bg;
      }
    }
  }
  if (force_width_gap != 30) {
    if (isNaN(force_width_gap)) {
      force_width_gap = 30;
    }
    quCreative_main.$cssFromJs.html(quCreative_main.$cssFromJs.html() + 'div.zfolio[data-margin="theme-column-gap"] > .items { margin-left: -' + force_width_gap / 2 + "px; margin-right: -" + force_width_gap / 2 + 'px; } div.zfolio[data-margin="theme-column-gap"] .zfolio-item { padding-left: ' + force_width_gap / 2 + "px; padding-right: " + force_width_gap / 2 + "px; margin-bottom: " + force_width_gap + "px; }");
  }
  if (quCreative_main.force_content_width > 0) {
    dzsQu_view_adjustLayoutContentWidth(quCreative_main);
  }
  if (force_content_gap_width > 0) {
    var aux23 = " @media (min-width:992px) { .row{  margin-left:-" + Math.round(force_content_gap_width / 2) + "px; margin-right:-" + Math.round(force_content_gap_width / 2) + "px; } .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12{ padding-left:" + Math.round(force_content_gap_width / 2) + "px; padding-right:" + Math.round(force_content_gap_width / 2) + "px;} .the-content-con > .the-content{ padding: " + force_content_gap_width + "px; }   ";
    aux23 += "}";
    quCreative_main.$cssFromJs.html(quCreative_main.$cssFromJs.html() + aux23);
  }
}
function dzsQu_view_adjustLayoutContentWidth(quCreative_main) {
  const content_width = quCreative_main.force_content_width;
  const default_content_width = content_width;
  var aux23 = "  .main-container .the-content-con.page-normal:not(.fullit) > .the-content{max-width:" + quCreative_main.force_content_width + "px; }        .the-content-con.page-portfolio-single:not(.fullit) > .the-content{ max-width:" + quCreative_main.force_content_width + "px; } .main-container .the-content-con:not(.fullit) > .the-content:not(.gallery-thumbs--image-container){ max-width:" + quCreative_main.force_content_width + "px; } ";
  if (force_width_section_bg) {
    aux23 += "body .the-content-sheet .the-content-sheet-text:not(.forced-from-no-rows):not(.post-type-post), .flex-for-sc, .the-content-con:not(.page-blogsingle) footer.upper-footer{ padding-left: " + force_width_section_bg + "px; padding-right: " + force_width_section_bg + "px; }";
  }
  aux23 += "  .main-container .the-content-con.page-template-template-portfolio:not(.fullit)  > .the-content{ max-width:" + (quCreative_main.force_content_width - force_width_gap * 2) + "px; }  ";
  aux23 += ' .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12, div[class*="vc_col-sm-"] >.vc_column-inner  { padding-left: ' + force_width_gap / 2 + "px; padding-right: " + force_width_gap / 2 + "px; } .row,.vc_row { margin-left: -" + force_width_gap / 2 + "px; margin-right: -" + force_width_gap / 2 + "px; }";
  aux23 += " .the-content-con > .the-content { padding: " + force_width_blur_margin + "px; }";
  if (force_width_blur_margin == 0) {
    aux23 += " .the-content-con.template-is-default-and-has-one-zfolio > .the-content , .the-content-con.posts-page > .the-content, .the-content-con.page-blogsingle:not(.ceva) > .the-content { padding: 30px; }";
  }
  aux23 += " body .the-content-con.page-normal.fullit > .the-content { padding: " + force_width_blur_margin + "px; }";
  if (force_width_blur_margin > 30) {
    aux23 += " .the-content-con.page-portfolio:not(.fullit) .the-content-inner>.selector-con:first-child{ margin-top: " + (20 - force_width_blur_margin) + "px; }";
  }
  aux23 += " .margin-right-blur-margin { margin-right: " + force_width_blur_margin + "px; }";
  aux23 += " .margin-left-blur-margin { margin-left: " + force_width_blur_margin + "px; }";
  aux23 += " .the-content-sheet.blog-single-block { margin-bottom: " + force_width_gap + "px; } ";
  aux23 += " body .the-content .the-content-inner + .upper-footer { margin-top: " + force_width_gap + "px; } ";

  // -- TODO: why is force width_gap here

  if (force_width_blur_margin != 30) {
    const pt = 30 - force_width_blur_margin;
    if (pt < 0) {
      aux23 += " .the-content-con > .the-content > .the-content-inner > .selector-con:not(.selector-clone){ margin-top: " + pt + "px; }";
    } else {
      aux23 += " .the-content-con > .the-content > .the-content-inner > .selector-con:not(.selector-clone){ padding-top: " + pt + "px; }";
    }
  }
  quCreative_main.$cssFromJs.html(quCreative_main.$cssFromJs.html() + aux23);
}

},{}],15:[function(require,module,exports){
"use strict";function dzsQuc_init_progressMarkers(){window.init_progress_markers=function(){var t="#eeeeee",r="#333333";jQuery(".antfarm-progress-circle").each(function(){var a=jQuery(this);jQuery(".the-content-sheet.the-content-sheet-dark").find(a).length>0&&(r="#ffffff",t="#444444"),a.html(' <div class="dzs-progress-bar skin-prev9copy" style="width:100%; max-width: 150px; height:auto;margin-top:0px;margin-left:auto;margin-right:auto;margin-bottom:0px;" data-animprops=\'{"animation_time":"'+a.attr("data-animation_time")+'","maxperc":"'+a.attr("data-maxperc")+'","maxnr":"'+a.attr("data-maxnr")+'","initon":"scroll"}\'><canvas class="progress-bars-item progress-bars-item--circ" data-type="circ" data-animprops=\'{"height":"{{width}}","circle_outside_fill":"'+t+'","circle_inside_fill":"transparent","circle_outer_width":"1","circle_line_width":"10"}\' style="position: absolute; width: calc(100% + 8px); top: -4px; left: -4px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: transparent;" width="302" height="302"></canvas><canvas class="progress-bars-item progress-bars-item--circ" data-type="circ" data-animprops=\'{"height":"{{width}}","circle_outside_fill":"'+r+'","circle_inside_fill":"transparent","circle_outer_width":"{{perc-decimal}}","circle_line_width":"2"}\' style="position: relative; width: 100%; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: transparent;" width="298" height="298"></canvas><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{"left":"{{center}}"}\' style="position: absolute; top: 50%; transform: translate(0,-50%);  margin: 0px; margin-top: -3px; width: 100%; height: auto; right: auto; bottom: auto; color: rgb(33, 33, 33); border-radius: 0px; border: 0px; opacity: 1; font-size: 40px; background-color: transparent;"><h3 style="text-align: center; " data-mce-style="text-align: center;">{{perc}}</h3></div></div>'),a.addClass("treated")}),jQuery(".antfarm-progress-line").each(function(){var a=jQuery(this);jQuery(".the-content-sheet.the-content-sheet-dark").find(a).length>0&&(r="#ffffff",t="#333333"),a.html(' <div class="dzs-progress-bar auto-init skin-prev2copy" style="width:100%;height:auto;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"'+a.attr("data-animation_time")+'","maxperc":"'+a.attr("data-maxperc")+'","maxnr":"'+a.attr("data-maxnr")+'","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text h6" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; margin-bottom: 5px; color: rgb(33, 33, 33); border-radius: 0px; border: 0px; opacity: 1;line-height: 1; background-color: transparent;">'+a.attr("data-title")+'</div><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{"left":"{{perc}}"}\' style="position: absolute; width: 0px; height: auto; top: auto; right: auto; bottom: 35px; margin: 0px 0px 0px 0px; color: #999999; border-radius: 0px; border: 0px; font-size: 14px; background-color: transparent;"><h6 style="text-align: right; position:absolute; right:0; white-space:nowrap; margin-top:0; margin-bottom: 0;  " >{{perc}}</h6></div><div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: relative; width: 100%; height: 10px; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: '+t+';"></div><div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{"width":"{{perc}}"}\' style="position: absolute; height: 2px; top: auto; left: 0px; right: auto; bottom: 7px; margin: 0; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: rgb(34, 34, 34);"></div></div>'),a.addClass("treated")}),jQuery(".antfarm-progress-text").each(function(){var t=jQuery(this),r="h2",a="";t.attr("data-h-tag")&&(r=t.attr("data-h-tag")),t.attr("data-h-tag-class")&&(a=t.attr("data-h-tag-class")),t.html('<div class="dzs-progress-bar auto-init skin-bignumber" style="width:100%;height:auto;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"'+t.attr("data-animation_time")+'","maxperc":"'+t.attr("data-maxperc")+'","maxnr":"'+t.attr("data-maxnr")+'","convert_1000_to_k":"'+t.attr("data-convert-1000-to-k")+'","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 50px; background-color: transparent;"><'+r+' class="'+a+'"  style="text-align: center; margin-bottom:0;" ><span style="color: rgb(255, 255, 255); " >{{percmaxnr}}</span></'+r+"></div></div>"),t.addClass("treated")}),jQuery(".antfarm-progress-rect").each(function(){var t=jQuery(this);if(!t.hasClass("treated")){var r="rgb(34,34,34)",a="1";if(jQuery(".the-content-sheet.the-content-sheet-dark").find(t).length>0&&(r="#ffffff","#333333",a="0.25"),0==t.children('div[class*="icon-"]').length)t.html('<div class="dzs-progress-bar auto-init skin-prev3copy" style="width:100%;height:auto;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"'+t.attr("data-animation_time")+'","maxperc":"'+t.attr("data-maxperc")+'","maxnr":"'+t.attr("data-maxnr")+'","convert_1000_to_k":"'+t.attr("data-convert-1000-to-k")+'","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text h1" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 6px; left: 0px; right: auto; bottom: auto; margin: 0px 0px 5px 0px; padding-right:20px; color: '+r+'; border-radius: 0px; border: 0px; opacity: 1; line-height: 1; background-color: transparent;">   <div class="h1 h1-for-progress" style="text-align: center;" data-mce-style="text-align: right;"><span>{{percmaxnr}}</span></div>   </div><div class="progress-bars-item progress-bars-item--text h6" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px 0px 0px 0px; padding-right:20px; padding-bottom:20px; color: '+r+'; border-radius: 0px; border: 0px; opacity: 1;  background-color: transparent;"><div style="text-align: center;" data-mce-style="text-align: center;">'+t.attr("data-text")+'</div></div><div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 100%; height: 1px; top: auto; left: 0px; right: auto; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: '+a+'; font-size: 12px; background-color: rgb(205, 205, 205);"></div> <div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 1px; height: 120px; top: auto; left: auto; right: 0px; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: '+a+'; font-size: 12px; background-color: rgb(205, 205, 205);"></div> </div>');else{var e=t.children('div[class*="icon-"]').eq(0).get(0).outerHTML;t.html('<div class="dzs-progress-bar auto-init skin-prev3copy" style="width:100%;height:185px;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"'+t.attr("data-animation_time")+'","maxperc":"'+t.attr("data-maxperc")+'","maxnr":"'+t.attr("data-maxnr")+'","convert_1000_to_k":"'+t.attr("data-convert-1000-to-k")+'","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px 0px 5px 0px; padding-right:20px;  padding-top: 71px;color: '+r+'; border-radius: 0px; border: 0px; opacity: 1; ;; line-height: 1; background-color: transparent;">    <div class="h1 h1-for-progress" style="text-align: right;" ><span>{{percmaxnr}}</span></div>    </div>    <div class="progress-bars-item progress-bars-item--text h6" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: -3px 0px 0px 0px; padding-right:20px; padding-bottom:20px; color:'+r+'; border-radius: 0px; border: 0px; opacity: 1; line-height: 1; background-color: transparent;"><div style="text-align: right; " data-mce-style="text-align: right;">'+t.attr("data-text")+'</div></div>   <div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 100%; height: 1px; top: auto; left: 0px; right: auto; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: '+a+'; font-size: 12px; background-color: rgb(205, 205, 205);"></div> <div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 1px; height: 185px; top: auto; left: auto; right: 0px; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: '+a+'; font-size: 12px; background-color: rgb(205, 205, 205);"></div> </div>'),t.children(".dzs-progress-bar").prepend(e)}t.addClass("treated")}})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.dzsQuc_init_progressMarkers=dzsQuc_init_progressMarkers;
},{}],16:[function(require,module,exports){
"use strict";

var _checkLazyloadingImages = require("./js/check-lazyloading-images/_check-lazyloading-images");
var _initProgressMarkers = require("./js/init-progress-markers/_init-progress-markers");
var _helpers = require("./js/common/_helpers");
var _advancedScrollers = require("./js/features/_advancedScrollers");
var _qucreative = require("./_qucreative.config");
var _quViewAnimation = require("./_qu-view-animation");
var _quViewDeterminePage = require("./_qu-view-determine-page");
var _quView = require("./_qu-view");
var _checkLazyLoading = require("./_checkLazyLoading");
var _quViewLayout = require("./js/features/_quViewLayout");
var _quActions = require("./_qu-actions");
var _qucreativeClass = require("./_qucreative-class");
/*
 * Author: ant_farm
 * Website: http://antfarmthemes.com
 * Portfolio: http://themeforest.net/user/ant_farm/portfolio?ref=ant_farm
 * This is not free software.
 * QuCreative
 * Version: 1.08
 */
window.quCreative_debug_time = 0;
window.qucreative_env_style_index = 1;
window.qucreative_vc_custom_style_index = 1;
window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll = null;
window.dzs_check_lazyloading_images_toberesized_arr = [];
window.dzs_check_lazyloading_inter = 0;
window.dzs_check_lazyloading_delayed = 0; // -- at 50 we launch the function nonetheless

(0, _checkLazyloadingImages.dzsCommon_init_lazyloadingImages)();
(0, _initProgressMarkers.dzsQuc_init_progressMarkers)();
(0, _advancedScrollers.dzsQuc_initAdvancedScrollers)();
(0, _helpers.initObjectSizeProto)();
window.qucreative_calculate_dims_actions = [];
window.qucreative_handle_resize_actions = [];
window.qucreative_actions_reinit = [];
window.qucreative_actions_goToBg_doIt = [];
window.qucreative_actions_setupNewBgImage = [];
window.qucreative_actions_calculateDimsRedraw = [];
Math.easeIn = function (t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};
window.qcreative_document_ready_ed = false;
window.google_maps_loaded = false;
window.gooogle_maps_must_init = false;
window.scroll_top_object = {
  val: 0
};
let qcreative_curr_html;
jQuery(document).ready(function ($) {
  Math.easeIn = function (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  };
  Math.easeOut = function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  };
  if (window.qcreative_document_ready_ed) {
    return false;
  } else {
    window.qcreative_document_ready_ed = true;
  }
  $.fn.outerHTML = function () {
    return $(this).clone().wrap("<div></div>").parent().html();
  };
  var theQuery = "";
  var page = 3;
  const _body = $("body");
  var newclass_content_con = "";
  var thumbs_padding_left_and_right = 40,
    thumbs_list_padding_right = 0,
    menu_height = 0,
    native_scrollbar_width = 0,
    css_border_width = 0;
  var global_image_data = null;
  const qcm = new _qucreativeClass.QuCreative($, reinit, _quViewAnimation.goto_bg);
  window.quCreative_main = qcm;
  var old_qcre_options = null;
  var selector_con_cloned = false;
  var windowhref = "";
  var is_menu_horizontal_and_full_bg = false;
  $("div.the-actual-nav").children("ul").addClass("the-actual-nav");
  qcm._logoCon = qcm._navCon.find(".logo-con").eq(0);
  if ($(".the-content:not(.the-content-for-preseter)").length > 0) {
    qcm._theContent = $(".the-content:not(.the-content-for-preseter)").eq(0);
  }
  if (isiPad) {
    _body.addClass("is-ipad");
  }
  const regex_menu_type_res = _qucreative.regex_menu_type.exec(_body.attr("class"));
  if (regex_menu_type_res) {
    qcm.menu_type = "menu-type-" + regex_menu_type_res[1];
  }
  let browserScrollSize = (0, _helpers.getBrowserScrollSize)();
  native_scrollbar_width = browserScrollSize.width;
  var qucreative_options_defaults = _qucreative.QUCREATIVE_DEFAULTS;
  if (window.qucreative_options) {
    window.qucreative_options = $.extend(qucreative_options_defaults, window.qucreative_options);
  } else {
    window.qucreative_options = $.extend({}, qucreative_options_defaults);
  }
  $(window).scrollTop(0);
  const regex_bodyclass = /(page-.*?)[ |"]/g;
  setTimeout(function () {
    $(".preseter").css("opacity", "");
  }, 500);
  init();
  function init() {
    console.log('[lifecycle] init()', _body.attr('class'));
    if (_body.attr('class').indexOf(["menu-type-1 ", "menu-type-2", "menu-type-3", "menu-type-4", "menu-type-5", "menu-type-6", "menu-type-7", "menu-type-8"]) > -1) {
      qcm.menu_macrotype = 'vertical';
    }
    // -- todo: move to ajax
    const tempFindClass = _qucreative.regex_bodyclass_page.exec(String(_body.attr("class")));
    qcm.newclass_body_page = "";
    if (tempFindClass) {
      if (tempFindClass[1]) {
        qcm.newclass_body_page = tempFindClass[1];
      }
    }
    // -- end

    if ($("#qucreative-css-from-js").length === 0) {
      $("head").append('<style id="qucreative-css-from-js"></style>');
    }
    qcm.$cssFromJs = $("#qucreative-css-from-js").eq(0);
    newclass_content_con = $(".the-content-con").eq(0).attr("class");
    if (isNaN(parseInt(_body.css("border-width"), 10)), parseInt(_body.css("border-width"), 10)) {
      css_border_width = parseInt(_body.css("border-width"), 10);
    }
    $(".qucreative-option-feed").each(function () {
      let arg;
      let aux;
      const $optionFeed = $(this);
      if ($optionFeed.length) {
        // -- parse mainoptions here
        if ($optionFeed.attr("data-rel") == "mainoptions") {
          try {
            arg = JSON.parse($optionFeed.html());
            qcm.qcreative_overwrite_mainoptions(arg);
          } catch (err) {
            console.info("CANNOT PARSE", err);
          }
        }
        if ($optionFeed.attr("data-rel") == "zoombox-options") {
          try {
            arg = JSON.parse($optionFeed.html());
            window.init_zoombox_preset = arg.type;
          } catch (err) {
            console.info("CANNOT PARSE", err);
          }
        }
        if ($optionFeed.attr("data-rel") == "gmaps-styling") {
          try {
            window.str_gmaps_styling = $optionFeed.html();
          } catch (err) {
            console.info("CANNOT PARSE", err);
          }
        }
      }
    });
    qcm.initial_bg_transition = qucreative_options.bg_transition;
    qcm.last_bg_transition = qcm.initial_bg_transition;
    qcm.new_bg_transition = window.qucreative_options.new_bg_transition;
    if (isNaN(parseInt(window.qucreative_options.border_width, 10)) == false && parseInt(window.qucreative_options.border_width, 10)) {
      qcm.border_width = parseInt(window.qucreative_options.border_width, 10);
    }
    if (qcm.border_width > 0) {
      (0, _quView.quSetupBorderCss)(qcm, _body);
    }
    if (isNaN(parseInt(window.qucreative_options.blur_amount, 10)) == false) {
      window.qucreative_options.blur_amount = parseInt(window.qucreative_options.blur_amount, 10);
    } else {
      window.qucreative_options.blur_amount = 25;
    }
    (0, _quView.check_animation_time)(qcm);
    (0, _quViewLayout.dzsQu_view_adjustLayout)(qcm);

    // todo: move to php
    if (_body.hasClass("menu-type-13") || _body.hasClass("menu-type-14") || _body.hasClass("menu-type-15") || _body.hasClass("menu-type-16") || _body.hasClass("menu-type-17") || _body.hasClass("menu-type-18")) {
      qcm.$theActualNav.find("> li > .sub-menu").prepend('<svg class="tooltip--icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" enable-background="new 0 0 15 15" xml:space="preserve"> <path fill-rule="evenodd" clip-rule="evenodd" fill="#5EBB53" d="M0,0v15h15C6.716,15,0,8.284,0,0z"/> </svg> ');
    }
    windowhref = window.location.href;
    $(".the-actual-nav .menu-item > a").addClass("custom-a");
    $(this).scrollTop(0);
    if (window.qucreative_options.enable_ajax == "on") {
      if (_body.children(".ajax-preloader").length == 0) {
        _body.append('<div class="ajax-preloader"><div class="loader"></div></div>');
      }
    }
    (0, _quViewDeterminePage.determine_page)();
    window.qucreative_reinit = reinit;

    // todo: load ajax sync

    // setupAjax(quCreative_main);

    (0, _quActions.qu_setupActions)();
    _body.addClass("menu-scroll-method-" + qucreative_options.menu_scroll_method);
    $(window).bind("resize", qcm.handle_resize.bind(qcm));
    qcm.handle_resize(null, {
      redraw_canvas: false
    });

    // -- todo: move to menu type extras js
    if (_body.hasClass("menu-type-3") || _body.hasClass("menu-type-4") || _body.hasClass("menu-type-5") || _body.hasClass("menu-type-6") || _body.hasClass("menu-type-7") || _body.hasClass("menu-type-8")) {
      qcm.$theActualNav.children().each(function () {
        var _t = $(this);
        if (_t.find("ul").length > 0) {
          _t.append('<i class="sub-menu-indicator fa fa-chevron-circle-right"></i>');
        }
      });
    }
    (0, _quViewAnimation.goto_bg)(0, {});
  }

  /**
   *
   * todo: we should add an action from AJAX
   * @param pargs
   */
  function reinit(pargs) {
    console.groupCollapsed("[lifecycle] reinit");
    console.trace();
    console.groupEnd();
    // -- reinit after ajax

    const margs = Object.assign({
      call_from: "default"
    }, pargs || {});
    if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
      _body.addClass("menu-is-sticky");
    }
    var auxa = String(window.location.href).split("/");
    var aux2 = auxa[auxa.length - 1];
    (0, _checkLazyLoading.quSetupCheckLazyLoading)();
    if (window.qucreative_options) {
      // -- then it is WordPress
      if (window.qucreative_options.site_url) {
        aux2 = window.location.href;
      }
    }
    if (aux2.indexOf("?") > -1) {
      if (aux2.indexOf("clearcache=on") > -1) {
        qcm.curr_html_with_clear_cache = true;
      }
      qcm.curr_html = aux2.split("?")[0];
    } else {
      qcm.curr_html = aux2;
    }
    if (qcm.curr_html == "") {
      qcm.curr_html = "";
    }
    qcreative_curr_html = qcm.curr_html;
    setTimeout(function () {
      _body.removeClass("q-ajax-transitioning");
      $(".widget_text .textwidget").addClass("font-group-6");
    }, 100);
    _body.removeClass("qtransitioning");
    _body.removeClass("page-is-fullwidth");
    if (margs.call_from == "init()") {
      if (window.qucreative_options.bg_isparallax == "on" && _body.hasClass("page-homepage") == false && _body.hasClass("page-gallery-w-thumbs") == false) {
        setTimeout(function () {
          if (qcm._mainBgTransitioning) {
            qcm._mainBgTransitioning.addClass("dzsparallaxer");
            qcm._mainBgTransitioning.children(".main-bg").addClass("dzsparallaxer--target");
          }
        }, 500);
      }
    }
    if (qcm._theContent) {
      qcm._theContent.find(".sc-final-closer").each(function () {
        const _t = $(this);
        if (_t.html() == "") {
          if (_t.parent().parent().parent().parent().children().length == 1) {
            _t.parent().parent().parent().parent().parent().remove();
          }
          if (_t.parent().parent().parent().parent().children().length == 2) {
            var _c = _t.parent().parent().parent().parent().children().eq(1);
            if (_c.children().length == 1 && _c.find(".wpb_wrapper").length == 1 && _c.find(".wpb_wrapper").html() == "") {
              _t.parent().parent().parent().parent().parent().remove();
            }
          }
        }
      });
      qcm._theContent.find(".delete-prev-cst").each(function () {
        var _t = $(this);
        if (_t.prev().hasClass("the-content-sheet-text")) {
          _t.prev().hide();
        }
      });
      qcm._theContent.find(".wpb_wrapper").each(function () {
        var _t = $(this);
        if (_t.children().last().hasClass("vc_empty_space")) {
          _t.parent().append(_t.children().last());
        }
      });
      qcm._theContent.find(".delete-prev-section").each(function () {
        var _t = $(this);
        if (_t.prev().hasClass("the-content-sheet")) {
          _t.prev().hide();
        }
      });
      qcm._theContent.find(".wpb_wrapper").each(function () {
        var _t = $(this);
        if (_t.html() == "") {
          if (_t.parent().parent().hasClass("vc_col-sm-12")) {
            _t.parent().parent().parent().remove();
          }
        }
      });
      qcm._theContent.find(".vc_empty_space,.qucreative-divider-from-element").each(function () {
        var _t = $(this);
        var _con = null;
        if (_t.parent().parent().parent().hasClass("vc_row")) {
          _con = _t.parent().parent().parent();
        }
        if (_t.parent().parent().parent().parent().hasClass("vc_row")) {
          _con = _t.parent().parent().parent().parent();
        }
        if (_con) {
          var _chtml = _con.html();
          if (_chtml.indexOf("12") > -1) {
            if (_chtml.length < 290) {
              _con.addClass("no-margin-bottom");
            }
          }
        }
      });
      qcm._theContent.find(".wpb_wrapper .antfarm-divider").each(function () {
        var _t = $(this);
        var __par = _t.parent().get(0);
        if (__par && __par.nodeName == "P") {
          if (__par.className == "") {
            if (__par) {
              if (__par.outerHTML) {
                if (String(__par.outerHTML).length < 290) {
                  $(__par).css({
                    "margin-top": "0",
                    "margin-bottom": "0",
                    "font-size": "0",
                    "line-height": "1"
                  });
                }
              }
            }
          }
        }
      });
      ;
      var _ctl = qcm._theContent.find(".translucent-layer").eq(0);
      if (_ctl.hasClass("colorize-layers")) {
        if (_ctl.hasClass("custom-color") == false && _ctl.hasClass("custom-opacity") == false) {
          if (_body.hasClass("body-style-light")) {
            qcm._theContent.find(".translucent-con .translucent-overlay").css("background-color", "#eeeeee");
            qcm._theContent.find(".translucent-layer").eq(0).css("background-color", "#fff");
          } else {
            qcm._theContent.find(".translucent-con .translucent-overlay").css("background-color", "#333333");
            qcm._theContent.find(".translucent-layer").eq(0).css("background-color", "#222222");
          }
        }
      }
      if (qcm._theContent && qcm._theContent.find(".post-password-form").length) {
        qcm._theContent.find(".post-password-form input[type=submit]").addClass("antfarm-btn btn-read-more style-default padding-small");
      }
    }
    if (qcm._mainContainer.find(".the-content-con").eq(0).hasClass("fullit")) {
      qcm.page_is_fullwidth = true;
    }
    if (qcm.page == "page-gallery-w-thumbs" || qcm.page == "page-homepage") {
      qcm.page_is_fullwidth = true;
    }
    selector_con_cloned = false;
    is_menu_horizontal_and_full_bg = false;
    if (qcm.page_is_fullwidth) {
      _body.addClass("page-is-fullwidth");
      if (qcm.menu_macrotype === 'horizontal') {
        is_menu_horizontal_and_full_bg = true;
      }
    }
    (0, _quView.quBuildResponsiveMenu)(qcm, _body);
    if (qcm._theContent && qcm._theContent.length) {
      const _c = qcm._theContent.find(".responsive-featured-media-con").eq(0);
      if (_c.length > 0) {
        if (_c.children().length == 0) {
          if (qcm._theContent.find(".responsive-featured-media-con--target").length > 0) {
            _c.append(qcm._theContent.find(".responsive-featured-media-con--target").html());
            if (qcm._theContent.find(".responsive-featured-media-con--target").eq(0).hasClass("advancedscroller-con")) {
              _c.children(".advancedscroller").removeClass("skin-nonav").addClass("skin-qucreative").height(400);
              _c.children(".advancedscroller").attr("data-options", '{ settings_mode: "onlyoneitem",design_arrowsize: "0" ,settings_swipe: "on" ,settings_autoHeight: "on",settings_autoHeight_proportional: "on",settings_swipeOnDesktopsToo: "on" ,settings_slideshow: "on" ,settings_slideshowTime: "150" }');
            }
          }
        }
        if (_c.children().length == 0) {
          if (qcm._theContent.find(".responsive-featured-media-con--target").length == 0) {
            var aux = $(".main-bg-div").eq(0).css("background-image");
            var the_bg = window.qucreative_options.images_arr[0];
            if (window.qucreative_options.the_background) {
              the_bg = window.qucreative_options.the_background;
            }
            var aux2 = '<img src="' + the_bg + '" class="fullwidth"/>';
            _c.append(aux2);
          }
        }
      }
    } else {
      // -- move to plugin
      if (qcm.page == "page-homepage") {
        if ($(".the-content-con").eq(0).children(".qucreative--520-nav-con").length == 0) {
          $(".the-content-con").eq(0).prepend('<div class="qucreative--520-nav-con "> <div class="dzs-select-wrapper skin-justvisible "> <div class="dzs-select-wrapper-head"> <div class="nav-wrapper-head  bg-color-hg"><i class="fa fa-bars"></i></div> </div> ' + the_select_str + " </div>" + the_custom_menu_str + "</div>");
          qcm._navCon_520 = $(".the-content-con").eq(0).children(".qucreative--520-nav-con").eq(0);
        }
      }
    }
    if (qcm._theContent && qcm._theContent.parent()) {
      setTimeout(function () {
        if (qcm._theContent.parent().attr("data-scrollbar-theme") == "light") {
          $(".main-container > .scrollbar .scrollbary").css({
            "background-color": "rgba(255,255,255,0.5)"
          });
        } else {
          $(".main-container > .scrollbar .scrollbary").css({
            "background-color": ""
          });
        }
      }, 1000);
    }
    if (qcm._navCon_520.children(".logo-con").length == 0) {
      qcm._navCon_520.prepend(qcm._navCon.children(".logo-con").clone());
    }
    var _cac = qcm._navCon_520.find(".dzs-select-wrapper select").eq(0);
    if (qcm._navCon_520.children(".custom-responsive-menu").length > 0) {
      qcm.custom_responsive_menu = true;
      _cac = qcm._navCon_520.children(".custom-responsive-menu").find(".custom-menu").eq(0);
    }
    qcm._navCon_520.find(".logo-con").addClass("logo-con-520");
    _cac.html("");
    qcm.$theActualNav.children("li").each(function () {
      var _t = $(this);
      var aux_str = "";
      if (!qcm.custom_responsive_menu) {
        aux_str = "<option";
        if (_t.hasClass("current-menu-item")) {
          aux_str += " selected";
        }
        aux_str += ' value="' + _t.children("a").attr("href") + '">' + _t.children("a").eq(0).html() + "</option>";
        _cac.append(aux_str);
        if (_t.children("ul").length > 0) {
          _t.children("ul").eq(0).children("li").each(function () {
            var _t2 = $(this);
            _cac.append('<option value="' + _t2.children("a").attr("href") + '"> - ' + _t2.children("a").eq(0).html() + "</option>");
            _t2.children("ul").eq(0).children("li").each(function () {
              var _t3 = $(this);
              _cac.append('<option value="' + _t3.children("a").attr("href") + '"> - - ' + _t3.children("a").eq(0).html() + "</option>");
            });
          });
        }
      } else {}
    });
    if (qcm.custom_responsive_menu) {
      _cac.append(qcm.$theActualNav.html());
      _cac.find("li").each(function () {
        var _t = $(this);
        if (_t.children("ul").length > 0) {
          _t.addClass("has-children");
          _t.prepend('<i class="submenu-toggler fa fa-angle-right"></i>');
        }
      });
    }
    (0, _quViewLayout.calculate_menu_width)(qcm);
    if (_body.hasClass("page-portfolio") || _body.hasClass("page-blogsingle")) {}
    if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6") || _body.hasClass("menu-type-7") || _body.hasClass("menu-type-8") || _body.hasClass("menu-type-11")) {
      qcm.menu_content_space = 30;
    }
    if (qcm.menu_macrotype === 'horizontal') {
      qcm.view_menuWidth = 0;
      qcm.view_menuWidth_onRight = 0;
      qcm.menu_content_space = 0;
      menu_height = 135;
      thumbs_padding_left_and_right = 40;
      thumbs_list_padding_right = 20;
      if (_body.hasClass("menu-type-13") || _body.hasClass("menu-type-14") || _body.hasClass("menu-type-15") || _body.hasClass("menu-type-16") || _body.hasClass("menu-type-17") || _body.hasClass("menu-type-18")) {
        menu_height = 100;
      }

      // if (
      //   quCreative_main._theContent &&
      //   (quCreative_main._theContent.parent().prev().length == 0 ||
      //     quCreative_main._theContent
      //       .parent()
      //       .prev()
      //       .hasClass("q-creative--nav-con") == false) &&
      //     quCreative_main._mainContainer.children().eq(0).hasClass("qucreative--nav-con") == false
      // ) {
      //   quCreative_main._mainContainer.prepend($(".qucreative--nav-con").eq(0));
      // }
    }
    setTimeout(function () {
      $('ul[class*="qc-pagination-for-zfolio"]').find("a").addClass("dzszfl-pagination-a custom-a");
      if ($.fn.vcGrid) {
        $("[data-vc-grid-settings]").vcGrid();
      }
    }, 1000);
    _body.removeClass("page-title-no-antetitle");
    window.qucreative_actions_reinit.forEach(reinitAction => {
      reinitAction(margs);
    });

    // todo: add
    // $(".social-icon").each(function () {
    //   var aux = window.location.href;
    //   var _t = $(this);
    //   _t.attr(
    //     "onclick",
    //     String(_t.attr("onclick")).replace("{{replaceurl}}", aux),
    //   );
    // });

    // todo: add
    // window.init_progress_markers();

    // todo: add
    // if (window.dzsprb_init) {
    //   window.dzsprb_init(".dzs-progress-bar", { init_each: true });
    // }

    var i23 = 0;
    qcm._c_for_parallax_items = [];

    // -- page gallery with thumbs reinit
    if (qcm._mainContainer.get(0) && qcm._mainContainer.get(0).api_toggle_resize) {
      qcm._mainContainer.get(0).api_toggle_resize();
      setTimeout(function () {
        qcm._mainContainer.get(0).api_toggle_resize();
      }, 900);
    }

    // todo: add
    // qu_reinitDzsVp();

    // todo: add
    // qu_reinitDzsTaa();

    // todo: add
    // qu_reinitDzsAp();
    if (qcm._theContent) {
      qcm._theContent.find(".divimage-calculate-real-size,a.comment-reply-link").each(function () {
        var _t4 = $(this);
        if (_t4.hasClass("comment-reply-link")) {
          _t4.addClass("custom-a").attr("onclick", String(_t4.attr("onclick")).replace("div-", ""));
        }
        if (_t4.hasClass("divimage-calculate-real-size")) {
          var src = sanitize_image_src_from_background(_t4.css("background-image"));
          var img = new Image();
          img.parentEl = _t4;
          img.onload = function (e) {
            // image  has been loaded

            var _t4_c = this.parentEl;
            if (_t4_c.parent().hasClass("pic-con")) {
              _t4_c.parent().animate({
                "max-width": this.naturalWidth
              });
            }
          };
          img.onerror = function (e) {
            // image  has been loaded
          };
          img.src = src;
        }
      });
    }

    // todo: add
    // window.init_advanced_scrollers();

    // -- init
    // -- from reinit()
    // todo: add
    // if (window.dzszfl_init) {
    //   dzszfl_init(".zfolio.auto-init-from-q", {
    //     init_each: true,
    //   });
    // }
    // todo: add
    // if (window.dzssel_init) {
    //   dzssel_init("select.dzs-style-me-from-q", { init_each: true });
    // }

    setTimeout(function () {
      calculate_dims({
        ignore_menu: false,
        placew: false,
        place_page: false,
        redraw_canvas: false,
        calculate_sidebar_main_is_bigger: false
      });
    }, 100);
    if (_body.hasClass("single-quextend_port_items") || _body.hasClass("single-dzsvcs_port_items")) {
      if (qucreative_options.portfolio_page_url) {
        var pgu = qucreative_options.portfolio_page_url;
        const $portfolioPageLinks = $('a[href="' + pgu + '"]');
        $portfolioPageLinks.parent().addClass("current-menu-item");
        $portfolioPageLinks.parent().parent().parent().addClass("current-menu-item");
      }
    }
    if (_body.hasClass("page-blogsingle")) {
      if (qucreative_options.blog_posts_url) {
        var pgu = qucreative_options.blog_posts_url;
        const $blogPageLinks = $('a[href="' + pgu + '"]');
        $blogPageLinks.parent().addClass("current-menu-item");
        $blogPageLinks.parent().parent().parent().addClass("current-menu-item");
      }
    }
    if (qcm._theContent) {
      var _contpar = qcm._theContent.parent();
      var posY = 0;
      if (_contpar.attr("data-scroll-to")) {
        if (_contpar.attr("data-scroll-to-pixel")) {
          posY = Number(_contpar.attr("data-scroll-to-pixel"));
        }
        if (_contpar.attr("data-scroll-to") == "browser-bottom") {
          posY = qcm.windowHeight;
        }
      } else {
        var targetid = windowhref.split("#")[1];
        var _c4 = null;
        if (targetid) {
          _c4 = $("#" + targetid).eq(0);
          if (_c4 && _c4.length && _c4.offset()) {
            posY = Number(_c4.offset().top) - 200;
          }
        }
      }
      if (posY) {
        setTimeout(function () {
          if (qcm._mainContainer.get(0) && qcm._mainContainer.get(0).api_scrolly_to) {
            qcm._mainContainer.get(0).api_scrolly_to(posY, {
              force_no_easing: "off",
              show_scrollbar: false
            });
          } else {
            if (_contpar.attr("data-scroll-to")) {
              $(window).scrollTop(posY);
            }
          }
        }, 1000);
      }
    }

    // -- todo: move to menu-type-11-12
    if (_body.hasClass("qucreative-overlay-menu")) {
      if ($(".menu-toggler-target").eq(0).hasClass("active")) {
        setTimeout(function () {
          $(".q-close-btn").trigger("click");
        }, 100);
      }
    }
    if (margs.call_from != "setup_newBgImage() _ samePageTransition") {
      qcm.page_portfolio_requires_move_filters = false;
    }
    if (qcm.page === "page-portfolio") {
      if (qcm._theContent && qcm._theContent.parent().hasClass("fullit")) {
        if (qcm._theContent.find(".selector-con").length) {
          qcm.page_portfolio_requires_move_filters = true;
        }
      }
      if (_body.hasClass("qucreative-horizontal-menu")) {
        if (!_body.hasClass("menu-is-sticky")) {
          qcm.page_portfolio_requires_move_filters = false;
        }
      }
    }

    // todo: add
    // if (window.dzswtl_init) {
    //   window.dzswtl_init();
    // }
  }
  function sanitize_image_src_from_background(arg) {
    var aux32 = arg;
    aux32 = aux32.replace("url(", "");
    aux32 = aux32.replace(")", "");
    aux32 = aux32.replace(/"/g, "");
    return aux32;
  }
  function calculate_dims(pargs) {
    // -- only executes

    var margs = {
      ignore_menu: false,
      placew: true,
      place_page: true,
      redraw_canvas: true,
      calculate_sidebar_main_is_bigger: true
    };
    if (pargs) {
      margs = $.extend(margs, pargs);
    }
    global_image_data = null;
    _body.removeClass("resizing");
    window.qucreative_calculate_dims_actions.forEach(reinitAction => {
      reinitAction();
    });
    if (_body.hasClass("page-is-fullwidth")) {
      if (_body.hasClass("menu-type-9") || _body.hasClass("menu-type-10")) {
        setTimeout(function () {
          if (qcm._mainContainer.get(0) && qcm._mainContainer.get(0).api_handle_wheel) {
            qcm._mainContainer.get(0).api_handle_wheel();
          }
        }, 100);
      }
    }
    if (window.qucreative_options.bg_isparallax == "on") {
      setTimeout(function () {
        if (qcm._mainBg.get(0) && qcm._mainBg.get(0).api_handle_scroll) {
          qcm._mainBg.get(0).api_handle_scroll(null, {
            from: "qcre",
            force_th: qcm.bigimageheight,
            force_ch: qcm.windowHeight
          });
        }
      }, 100);
    }
    $(".height-same-as-width").each(function () {
      var _t23 = $(this);
      _t23.height(_t23.width());
    });
    if (window.preseter_init) {
      var _cach = $(".preseter-content-con").eq(0);
      var _cach_cont = _cach.find(".the-content").eq(0);
      _cach_cont.scrollTop(0);
      if (110 + _cach_cont.find(".the-content-inner-inner").height() + 56 > qcm.windowHeight) {
        _cach.outerHeight(qcm.windowHeight - 110);
        _cach.removeClass("auto-height");
        _cach.addClass("needs-scrolling");
        _cach_cont.find(".the-content-inner-inner").css({
          "padding-right": 39 - native_scrollbar_width + "px",
          width: 490 - native_scrollbar_width + "px"
        });
        _cach_cont.find(".the-bg").eq(0).css({});
      } else {
        _cach.css("height", "auto");
        _cach.addClass("auto-height");
        _cach.removeClass("needs-scrolling");
        _cach_cont.find(".the-content-inner-inner").css({
          "padding-right": "",
          width: ""
        });
        _cach_cont.find(".the-bg").eq(0).css({
          right: "",
          width: ""
        });
      }
    }
  }
});
qcreative_curr_html = "";
var isiPad = navigator.userAgent.match(/iPad/i) != null;

},{"./_checkLazyLoading":1,"./_qu-actions":2,"./_qu-view":5,"./_qu-view-animation":3,"./_qu-view-determine-page":4,"./_qucreative-class":6,"./_qucreative.config":7,"./js/check-lazyloading-images/_check-lazyloading-images":10,"./js/common/_helpers":11,"./js/features/_advancedScrollers":13,"./js/features/_quViewLayout":14,"./js/init-progress-markers/_init-progress-markers":15}]},{},[16])


//# sourceMappingURL=qucreative.js.map