(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function quSetupCheckLazyLoading(){const i=jQuery;window.dzs_check_lazyloading_images_inited?window.dzs_check_lazyloading_images&&(window.dzs_check_lazyloading_images(),setTimeout(function(){window.dzs_check_lazyloading_images&&window.dzs_check_lazyloading_images()},1e3),setTimeout(function(){window.dzs_check_lazyloading_images&&window.dzs_check_lazyloading_images()},2e3),setTimeout(function(){window.dzs_check_lazyloading_images&&window.dzs_check_lazyloading_images()},3e3)):(window.dzs_check_lazyloading_images_inited=!0,i(window).bind("scroll",window.dzs_check_lazyloading_images),window.dzs_check_lazyloading_images(),setTimeout(function(){window.dzs_check_lazyloading_images()},1500),setTimeout(function(){window.dzs_check_lazyloading_images()},2500))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.quSetupCheckLazyLoading=quSetupCheckLazyLoading;
},{}],2:[function(require,module,exports){
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
var _checkLazyLoading = require("../../js/_checkLazyLoading");
var inter_resizing = 0,
  inter_calculate_dims_light = 0,
  inter_preseter_scroll = 0,
  inter_check_if_main_content_loaded = 0,
  handle_frame_id = 0,
  last_handle_frame_id = 0;
var ind_blur = 0;
let is_ready_load = false,
  bg_errored = false,
  is_ready_transition = false,
  parallax_reverse = true;
let _cache = null,
  _cache2_translucentCon = null,
  _content_translucent_canvas = null,
  social_scripts_loaded = false;
const ANIMATION_TIME_BASIC = 400;
let animation_time = ANIMATION_TIME_BASIC;
let _mainGalleryDescs;
let theQuery = "";
let first_page_not_transitioned = true,
  // -- only on the first page load, only once
  first_bg_not_transitioned = true,
  has_custom_outside_content_1 = false;

/**
 * this is where all transition really come
 */
function do_transition_really_do_it(margs) {
  // -- this is where all transition really come
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  const now = Number(new Date().getDate());
  console.log('do_transition_really_do_it -> ', now - window.quCreative_debug_time);
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

  console.log('quCreative_main.bg_transition - ', quCreative_main.bg_transition);

  // todo: setup to promise
  if (quCreative_main.bg_transition == "fade") {
    setTimeout(function () {
      if (margs.newpage_transition == true) {}
      const save_mainBgTransitioning = quCreative_main._mainBgTransitioning;
      setTimeout(function () {
        save_mainBgTransitioning.css({}, {
          queue: false,
          duration: animation_time
        });
      }, 5);
      main_bg_transition_complete();
      setTimeout(function () {
        $(".the-content-con").css("opacity", "");
      }, animation_time + 100);
    }, animation_time);
  } else {
    setTimeout(function () {
      main_bg_transition_complete();
    }, animation_time);
  }
  function main_bg_transition_complete() {
    const now = Number(new Date().getDate());
    console.log("%c main_bg_transition_complete", "background-color: #dd0000;", now - window.quCreative_debug_time);
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
    if ($(".main-gallery--descs").length > 0) {
      if ($(".main-gallery--descs").eq(0).hasClass("removed") == false) {
        _mainGalleryDescs = $(".main-gallery--descs").eq(0);
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
          var _theContentConTr_zfolio = $(this);
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
  console.log('do_transition -> ', now - window.quCreative_debug_time);
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
    console.log('ready');
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
      if ((quCreative_main.newclass_body.indexOf("single-dzsvcs_port_items-fullscreen") > -1 || quCreative_main.newclass_body.indexOf("single-antfarm_port_items-fullscreen") > -1) && quCreative_main.newclass_body.indexOf("post-media-type-image") > -1) {
        sw_no_parallaxer = true;
      }
    } else {
      if (quCreative_main._theContent) {
        if (quCreative_main._theContent.parent().hasClass("single-dzsvcs_port_items-fullscreen post-media-type-image") || quCreative_main._theContent.parent().hasClass("single-antfarm_port_items-fullscreen post-media-type-image")) {
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
    for (var i24 = 0; i24 < quCreative_main._c_for_parallax_items.length; i24++) {
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
  console.log('goto_bg -> ', now - window.quCreative_debug_time);
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
  console.log('goto_bg_doit -> ', now - window.quCreative_debug_time);
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
        console.log("_theContentConTr missing ..");
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

},{"../../js/_checkLazyLoading":1,"./_qu-view-determine-page":3,"./_qucreative.config":4,"./_qucreative.util":5,"./config/_defaultSettings":6,"./js/common/_sniffers":7}],3:[function(require,module,exports){
"use strict";function determine_page(){const e=window.quCreative_main,a=e._body;e.is_content_page=!1,a.hasClass("page-gallery-w-thumbs")&&(e.page="page-gallery-w-thumbs"),a.hasClass("page-portfolio")&&(e.page="page-portfolio",e.is_content_page=!0),a.hasClass("page-portfolio-single")&&(e.page="page-portfolio-single",e.is_content_page=!0),a.hasClass("page-normal")&&(e.page="page-normal",e.is_content_page=!0),a.hasClass("page-blog")&&(e.page="page-blog",e.is_content_page=!0),a.hasClass("page-blogsingle")&&(e.page="page-blogsingle",e.is_content_page=!0),a.hasClass("page-about")&&(e.page="page-about",e.is_content_page=!0),a.hasClass("page-contact")&&(e.page="page-contact",e.is_content_page=!0),a.hasClass("page-homepage")&&(e.page="page-homepage"),e.transitioned_via_ajax_first&&e.newclass_body&&(a.removeClass("page-blogsingle page-homepage page-gallery-w-thumbs page-normal page-contact page-about page-contact page-portfolio page-portfolio-single"),a.removeClass("new-"+e.newclass_body_page),a.addClass(e.newclass_body),a.attr("class",e.newclass_body),"menu-type-5"!=e.menu_type&&"menu-type-6"!=e.menu_type||a.addClass("menu-is-sticky"),e.handle_resize(null,{ignore_menu:!1,placew:!1,place_page:!1,redraw_canvas:!1,calculate_sidebar_main_is_bigger:!1,calculate_menu_overflow:!0}),a.removeClass("bg_transition-fade bg_transition-slidedown bg_transition-wipedown"),a.addClass("bg_transition-"+e.bg_transition),a.removeClass("first-transition"),e.border_width>0&&a.addClass("with-border"),e.newclass_body=e.newclass_body.replace(/menu-type-\d*/g,""),e.page=e.newclass_body_page,a.removeClass("no-padding"),e.newclass_body_nopadding&&a.addClass("no-padding"))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.determine_page=determine_page;
},{}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.regex_bodyclass_page=exports.regex_ajax_find_scripts=exports.regex_ajax_find_links=exports.RESPONSIVE_BREAKPOINT=exports.QU_VIEW_ANIM_DEFAULT_TIME=exports.QUCREATIVE_DEFAULTS=void 0;const QUCREATIVE_DEFAULTS=exports.QUCREATIVE_DEFAULTS={images_arr:["#ffffff"],bg_slideshow_time:"0",site_url:"detect",enable_ajax:"on",page:"index",bg_isparallax:"off",gallery_w_thumbs_autoplay_videos:"on",enable_native_scrollbar:"on",blur_amount:25,border_width:"0",border_color:"#ffffff",substract_parallaxer_pixels:10,content_width:"0",width_column:"0",width_gap:"0",width_blur_margin:"0",content_gap_width:"0",menu_scroll_method:"scroll",responsive_menu_type:"custom",bg_transition:"slidedown",new_bg_transition:"on",video_player_settings:{init_each:!0,settings_youtube_usecustomskin:"off",design_skin:"skin_reborn",settings_video_overlay:"on"}},QU_VIEW_ANIM_DEFAULT_TIME=exports.QU_VIEW_ANIM_DEFAULT_TIME=400,RESPONSIVE_BREAKPOINT=exports.RESPONSIVE_BREAKPOINT=1e3,regex_bodyclass_page=exports.regex_bodyclass_page=/.*?(page-(?:blogsingle|homepage|gallery-w-thumbs|normal|contact|about|contact|portfolio|portfolio-single))/g,regex_ajax_find_scripts=exports.regex_ajax_find_scripts=/<script.*?src=['|"](.*?)['|"][\s|\S]*?\/script>/gim,regex_ajax_find_links=exports.regex_ajax_find_links=/(<!--\[if lt IE \d*\]>[\S|\s]{0,1})?<link.*?href=['|"](.*?)['|"][\s|\S]*?\/{0,1}>/gim;
},{}],5:[function(require,module,exports){
"use strict";function find_theContentSheet(e){var t=null;return e.parent().parent().parent().parent().parent().parent().hasClass("the-content-sheet")?t=e.parent().parent().parent().parent().parent().parent():e.parent().parent().parent().parent().parent().hasClass("the-content-sheet")&&(t=e.parent().parent().parent().parent().parent()),t}function do_we_need_parallaxer(e){return e||(e="newbody"),"newbody"==e?"on"==window.qucreative_options.bg_isparallax&&"page-homepage"!=newclass_body_page&&"page-gallery-w-thumbs"!=newclass_body_page&&0==(newclass_content_con.indexOf("page-portfolio-single")>-1&&newclass_content_con.indexOf("page-portfolio-type-image")>-1&&newclass_content_con.indexOf("single-antfarm_port_items-fullscreen")>-1):"currbody"==e&&("on"==window.qucreative_options.bg_isparallax&&-1==_body.attr("class").indexOf("page-homepage")&&-1==_body.attr("class").indexOf("page-gallery-w-thumbs")&&0==(_body.attr("class").indexOf("page-portfolio-single")>-1&&_body.attr("class").indexOf("page-portfolio-type-image")>-1&&_body.attr("class").indexOf("single-antfarm_port_items-fullscreen")>-1))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.do_we_need_parallaxer=do_we_need_parallaxer,exports.find_theContentSheet=find_theContentSheet;
},{}],6:[function(require,module,exports){
"use strict";function qcre_callback_for_zoombox(e){e.prepend('<div class="qucreative--520-nav-con--placeholder" style="height: '+jQuery(".qucreative--520-nav-con").eq(0).outerHeight()+'px;"></div>'),window.dzsscr_init&&window.dzsscr_init(".zoombox-maincon .scroller-con",{settings_skin:"skin_apple",enable_easing:"on",settings_autoresizescrollbar:"on",settings_chrome_multiplier:.12,settings_firefox_multiplier:-3,settings_refresh:700,settings_autoheight:"off",touch_leave_native_scrollbar:"on"}),jQuery(".main-container")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.zoomboxSettings_whiteFull=exports.zoomboxSettings_darkFull=exports.zoomboxDefaultSettings=void 0;const zoomboxDefaultSettings=exports.zoomboxDefaultSettings={settings_paddingHorizontal:"100",settings_paddingVertical:"100",settings_resizemaincon:"off",design_animation:"fromcenter",design_skin:"skin-darkfull",design_borderwidth:"default",settings_deeplinking:"on",settings_disableSocial:"on",settings_useImageTag:"on",zoombox_audioplayersettings:{},settings_makeFunctional:!1,settings_usearrows:"on",social_enableTwitterShare:"on",social_enableGooglePlusShare:"on",social_extraShareIcons:"",videoplayer_settings:{design_skin:"skin_reborn",zoombox_video_autoplay:"off",settings_youtube_usecustomskin:"off",settings_video_overlay:"on"},audioplayer_settings:{},settings_extraClasses:"",settings_disablezoom:"on",preset_name:"darkfull",settings_zoom_doNotGoBeyond1X:"off",settings_zoom_use_multi_dimension:"off",settings_zoom_disableMouse:"off",settings_enableSwipe:"on",settings_enableSwipeOnDesktop:"on",settings_galleryMenu:"dock",settings_transition:"fade",settings_transition_gallery:"slide",settings_transition_out:"fade",settings_transition_gallery_when_ready:"on",settings_force_delay_time_for_loaded:0,settings_add_delay_time_for_gallery_transition:0,settings_add_delay_time_for_transition_in:0,settings_try_to_take_item_from_cache:"on",settings_fullsize:"off",settings_holder_con_extra_classes:"",settings_holder_extra_classes:"",settings_callback_func_gotoItem:null},zoomboxSettings_whiteFull=exports.zoomboxSettings_whiteFull={settings_zoom_doNotGoBeyond1X:"off",design_skin:"skin-whitefull",settings_enableSwipe:"off",settings_enableSwipeOnDesktop:"off",settings_galleryMenu:"none",settings_useImageTag:"on",settings_fullsize:"on",preset_name:"whitefull",settings_disablezoom:"on",settings_transition:"fromtop",settings_transition_gallery:"helper-rectangle",settings_transition_out:"slideup",settings_disableSocial:"on",settings_add_delay_time_for_gallery_transition:50,settings_add_delay_time_for_transition_in:20,videoplayer_settings:{design_skin:"skin_reborn",zoombox_video_autoplay:"off"},settings_extraClasses:"",settings_holder_con_extra_classes:" scroller-con",settings_holder_extra_classes:" inner",settings_callback_func_gotoItem:qcre_callback_for_zoombox},zoomboxSettings_darkFull=exports.zoomboxSettings_darkFull={settings_zoom_doNotGoBeyond1X:"off",design_skin:"skin-darkfull",settings_enableSwipe:"on",settings_enableSwipeOnDesktop:"on",settings_galleryMenu:"dock",settings_useImageTag:"on",settings_paddingHorizontal:"100",settings_paddingVertical:"100",settings_disablezoom:"on",preset_name:"darkfull",settings_transition:"fade",settings_transition_out:"fade",videoplayer_settings:{design_skin:"skin_reborn",zoombox_video_autoplay:"off",settings_youtube_usecustomskin:"off",settings_video_overlay:"on"}};window.qcre_callback_for_zoombox=qcre_callback_for_zoombox;
},{}],7:[function(require,module,exports){
"use strict";function ieVersion(){var e=window.navigator.userAgent;return e.indexOf("Trident/7.0")>0?11:e.indexOf("Trident/6.0")>0?10:e.indexOf("Trident/5.0")>0?9:0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.ieVersion=ieVersion;
},{}],8:[function(require,module,exports){
"use strict";

var _quViewAnimation = require("../_qu-view-animation");
start_bg_slideshow_time();
let bg_slideshow_time = 0;
if (_t.hasClass("prev-btn-con")) {
  goto_prev_bg();
}
if (_t.hasClass("next-btn-con")) {
  goto_next_bg();
}
quCreative_main.start_bg_slideshow_time = start_bg_slideshow_time;
function goto_next_bg() {
  var tempNr = quCreative_main.currBgNr;
  const _body = jQuery('body');
  tempNr++;
  if (qucreative_options.images_arr.length && (qucreative_options.the_background == "" || _body.hasClass("page-homepage"))) {
    if (tempNr > qucreative_options.images_arr.length - 1) {
      tempNr = 0;
    }
    (0, _quViewAnimation.goto_bg)(tempNr, {});
  }
}
function goto_prev_bg() {
  var tempNr = quCreative_main.currBgNr;
  tempNr--;
  if (tempNr < 0) {
    tempNr = qucreative_options.images_arr.length - 1;
  }
  (0, _quViewAnimation.goto_bg)(tempNr, {});
}
function start_bg_slideshow_time() {
  clearInterval(quCreative_main.inter_bg_slideshow);
  bg_slideshow_time = Number(window.qucreative_options.bg_slideshow_time);
  if (bg_slideshow_time) {
    quCreative_main.inter_bg_slideshow = setInterval(function () {
      goto_next_bg();
    }, bg_slideshow_time * 1000);
  }
}

},{"../_qu-view-animation":2}]},{},[8])


//# sourceMappingURL=qucreative-bg-slideshow.js.map