"use strict";


import { ieVersion } from './js/common/_sniffers'
import { zoomboxDefaultSettings } from './config/_defaultSettings'
import { do_we_need_parallaxer } from './_qucreative.util'
import { RESPONSIVE_BREAKPOINT } from './_qucreative.config'
import { determine_page } from './_qu-view-determine-page'
import { quSetupCheckLazyLoading } from './_checkLazyLoading'





var
    inter_check_if_main_content_loaded = 0;





let is_ready_load = false,
    bg_errored = false,
    is_ready_transition = false,
    parallax_reverse = true;




const ANIMATION_TIME_BASIC = 400;
let animation_time = ANIMATION_TIME_BASIC;


let _mainGalleryDescs;

let theQuery = "";
let first_page_not_transitioned = true, // -- only on the first page load, only once
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
export function goto_bg(arg, pargs) {
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
    call_from: "default",
  };
  if (pargs) {
    margs = $.extend(margs, pargs);
  }

  var cek = qucreative_options.images_arr[arg];

  if (
    quCreative_main._theContent &&
    ((quCreative_main._theContent
          .parent()
          .hasClass("page-portfolio-single") &&
        quCreative_main._theContent
          .parent()
          .hasClass("page-portfolio-type-slider")) ||
      (quCreative_main._theContent.parent().hasClass("page-blogsingle") &&
        quCreative_main._theContent
          .parent()
          .hasClass("post-media-type-slider")))
  ) {
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
        opacity: "",
      });
      setTimeout(function () {
        // -- firefox windows bug fix
        _mainGalleryDescs.css({
          width: "",
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
            height: "0",
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
      margs.call_from =
        "bg_errored yes, is_ready_transition now, is_ready_load was";
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
  console.log('[animation] goto_bg_doit -> ', (now - window.quCreative_debug_time));
  window.quCreative_debug_time = now;

  const wh = window.innerHeight;

  var margs = {
    newpage_transition: false,
    call_from: "default",
  };

  if (pargs) {
    margs = $.extend(margs, pargs);
  }

  if (quCreative_main.border_width > 0) {
  }

  if (margs.newpage_transition) {
  }

  var extra_class = "";
  var extra_class_main_bg = "";
  var isparallax = false;
  var targeth = "100%";
  var extra_translate = "";

  margs.arg = arg;

  if (window.qucreative_options.bg_isparallax != "on") {
  }

  if (do_we_need_parallaxer()) {
    extra_class += " dzsparallaxer";
    extra_class_main_bg += " dzsparallaxer--target";

    isparallax = true;

    var auxpix =
      wh * (quCreative_main.parallaxer_multiplier - 1) -
      qucreative_options.substract_parallaxer_pixels;

    // -- for main-bg-con

    extra_translate = "transform: translate3d(0,-" + auxpix + "px,0);";
  }

  var aux_top = "-50";

  quCreative_main.is_content_page = false;
  if (
    quCreative_main.newclass_body.indexOf("page-normal") > -1 ||
    quCreative_main.newclass_body.indexOf("page-blogsingle") > -1 ||
    quCreative_main.newclass_body.indexOf("page-blog") > -1 ||
    quCreative_main.newclass_body.indexOf("page-portfolio") > -1
  ) {
    quCreative_main.is_content_page = true;
  }

  if (margs.newpage_transition == false) {
    if (
      _body.hasClass("page-normal") ||
      _body.hasClass("page-blogsingle") ||
      _body.hasClass("page-blog") ||
      _body.hasClass("page-portfolio")
    ) {
      quCreative_main.is_content_page = true;
    }
  }

  _body.addClass("new-" + quCreative_main.newclass_body_page);

  quCreative_main.bg_transition = "slidedown";
  if (quCreative_main.initial_bg_transition) {
    quCreative_main.bg_transition = quCreative_main.initial_bg_transition;
  }

  if (
    first_bg_not_transitioned == false &&
    margs.newpage_transition == false &&
    quCreative_main.is_content_page
  ) {
    quCreative_main.bg_transition = "fade";
  }

  first_bg_not_transitioned = false;
  if (quCreative_main.bg_transition == "fade") {
    aux_top = 0;
  }

  if (quCreative_main.bg_transition == "fade") {
  }

  if (margs.newpage_transition == true) {
  } else {
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
  if (
    quCreative_main._theContent &&
    ((quCreative_main._theContent
          .parent()
          .hasClass("page-portfolio-single") &&
        quCreative_main._theContent
          .parent()
          .hasClass("page-portfolio-type-slider")) ||
      (quCreative_main._theContent.parent().hasClass("page-blogsingle") &&
        quCreative_main._theContent
          .parent()
          .hasClass("post-media-type-slider")))
  ) {
    if (window.qucreative_options.the_background) {
      the_bg = window.qucreative_options.the_background;
    }
  }

  var aux23_img =
    '<img class="main-bg-image' +
    extra_class_main_bg +
    '" style=" ' +
    extra_translate +
    '" src="' +
    the_bg +
    '"/>';

  if (the_bg.indexOf("#") == 0) {
    aux23_img =
      '<div class="main-bg-image is-image ' +
      extra_class_main_bg +
      '" style=" width: 100%;height:120%; background-color: ' +
      the_bg +
      "; " +
      extra_translate +
      '"></div>';
  }

  var mainBgConTr_str =
    '<div class="main-bg-con do-not-set-js-height js-transitioning-in preparing-to-transition transitioning' +
    extra_class +
    '" style="display:none;';

  if (quCreative_main.bg_transition == "fade") {
  }

  mainBgConTr_str +=
    '">' +
    aux23_img +
    '<div class="main-bg-div"  style="height: ' +
    wh +
    "px; background-image:url(" +
    the_bg +
    ');"></div></div>';



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

    if (
      _body.hasClass("menu-type-9") ||
      _body.hasClass("menu-type-10") ||
      _body.hasClass("menu-type-13") ||
      _body.hasClass("menu-type-14") ||
      _body.hasClass("menu-type-15") ||
      _body.hasClass("menu-type-16") ||
      _body.hasClass("menu-type-17") ||
      _body.hasClass("menu-type-18")
    ) {
      $(".the-content-con")
        .addClass("transitioning-out")
        .removeClass("currContent");

      if (
        quCreative_main.bg_transition == "fade" &&
        margs.newpage_transition
      ) {
        $(".the-content-con.transitioning-out").animate(
          {},
          {
            queue: false,
            duration: animation_time,
          },
        );
      }

      if (quCreative_main.new_bg_transition != "off") {
        // -- not sure if here
        quCreative_main._mainContainer.append(mainBgConTr_str);
      }
    } else {
      $(".the-content-con")
        .addClass("transitioning-out")
        .removeClass("currContent");

      if (quCreative_main.new_bg_transition != "off") {
        quCreative_main._navCon.before(mainBgConTr_str);
      }
    }

    calculate_mainbg({
      call_from: "new_page",
    });

    if ($(".main-bg-con.transitioning").eq(0).hasClass("dzsparallaxer")) {
      $(".main-bg-con.transitioning")
        .eq(0)
        .find(".dzsparallaxer--target")
        .css({
          transform:
            "translate3d(0,-" +
            (quCreative_main.bigimageheight -
              wh -
              qucreative_options.substract_parallaxer_pixels) +
            "px,0)",
        });
    }

    if (quCreative_main._theContent) {
      quCreative_main._theContent
        .find(
          ".selector-con,.call-to-action-con, .row.services-lightbox-content, .dzs-tabs.skin-menu .tabs-menu",
        )
        .css({
          "z-index": "auto",
        });
      quCreative_main._theContent
        .find(".advancedscroller.skin-whitefish.is-thicker .bulletsCon")
        .animate(
          {
            opacity: "0",
          },
          {
            queue: false,
            duration: 300,
          },
        );
    }

    if (quCreative_main.___response) {
      // -- do script actions

      var sw_wait_for_load = false;

      if (
        quCreative_main.response_str.indexOf(
          '<div class="qucreative-option-feed" data-rel="zfolio-wait-for-load">',
        ) > -1
      ) {
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
      if (quCreative_main._theContentConTr.hasClass("qucreative-view-fullwidth") == false) {
        quCreative_main.viewPageIsFullwidth = false;

        setTimeout(function () {

          quCreative_main._theContentConTr.css({});

          quCreative_main._theContentConTr.css({});

          quCreative_main._theContentConTr.children("").css({});

          quCreative_main._theContentConTr.children("h1,.the-content,footer").css({});
        }, 100);
      } else {
        quCreative_main._theContentConTr.css({
          opacity: 0,
        });

        quCreative_main._theContentConTr.find(".zfolio.fullwidth").css({});

        quCreative_main.viewPageIsFullwidth = true;
      }
      // -- here we add them
      if (
        _body.hasClass("menu-type-9") ||
        _body.hasClass("menu-type-10") ||
        _body.hasClass("menu-type-13") ||
        _body.hasClass("menu-type-14") ||
        _body.hasClass("menu-type-15") ||
        _body.hasClass("menu-type-16") ||
        _body.hasClass("menu-type-17") ||
        _body.hasClass("menu-type-18")
      ) {
        quCreative_main._mainContainer.append(quCreative_main._theContentConTr);
      } else {
        quCreative_main._navCon.before(quCreative_main._theContentConTr);
      }

      window.qucreative_actions_goToBg_doIt.forEach((goToBgDoItAction) => {
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

          setTimeout(
            function (arg) {
              if (arg && arg.api_destroy) {
                arg.api_destroy();
              }
              _t[0] = null;
            },
            1000,
            _t.get(0),
          );
        });
      }

      quCreative_main._theContentConTr.find("a.comment-reply-link").addClass("custom-a");
      // todo: move
      if (window.dzsas_init) {
        if (quCreative_main.windowWidth > RESPONSIVE_BREAKPOINT) {
          if (
            _body.hasClass("page-portfolio") &&
            quCreative_main.newclass_body_page == "page-portfolio-single" &&
            quCreative_main._theContentConTr.hasClass("qucreative-view-fullwidth") == false
          ) {
          }
        }

        dzsas_init(
          quCreative_main._theContentConTr.find(
            ".advancedscroller.skin-qucreative.auto-init-from-q",
          ),
          {
            init_each: true,
          },
        );

        dzsas_init(
          quCreative_main._theContentConTr.find(
            ".advancedscroller.skin-trumpet.auto-init-from-q",
          ),
          {
            init_each: true,
          },
        );
      }

      // todo: move
      if (window.dzszfl_init) {
        if (quCreative_main.windowWidth > RESPONSIVE_BREAKPOINT) {
          if (
            quCreative_main.newclass_body_page == "page-portfolio" &&
            quCreative_main._theContentConTr.hasClass("qucreative-view-fullwidth") == false
          ) {
          }
        }

        dzszfl_init(quCreative_main._theContentConTr.find(".zfolio.auto-init-from-q"), {
          init_each: true,
        });

        setTimeout(function () {
          $(".the-content-con .zfolio").each(function () {
            var _t100 = $(this);

            if (_t100.get(0) && _t100.get(0).api_handle_resize) {
              if (
                _t100
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .hasClass("the-content-con")
              ) {
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
      call_from: "same_page",
    });

    if ($(".main-bg-con.transitioning").eq(0).hasClass("dzsparallaxer")) {
      $(".main-bg-con.transitioning")
        .eq(0)
        .find(".dzsparallaxer--target")
        .css({
          transform:
            "translate3d(0,-" +
            (quCreative_main.bigimageheight -
              wh -
              qucreative_options.substract_parallaxer_pixels) +
            "px,0)",
        });
    }
  }

  quCreative_main._mainBgTransitioning = _body.find(
    ".main-bg-con.js-transitioning-in:not(.for-remove)",
  );

  if (quCreative_main.bg_transition == "fade") {
    setTimeout(function () {
      quCreative_main._mainBgTransitioning.addClass("transitioning-in ");
    }, animation_time / 2);
  } else {
    quCreative_main._mainBgTransitioning.addClass("transitioning-in ");
  }

  qucreative_view_animation_doTransition();
}




















function transitionComplete() {
  return new Promise((resolve, reject) => {


    setTimeout(function () {
      resolve();
    }, quCreative_main.view_animation_duration);

  })
}





/**
 * this is where all transition really come
 */
function do_transition_really_do_it(margs) {
  // -- this is where all transition really come
  const $  = jQuery;

  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;

  const now = Number(new Date().getDate());
  console.log('[animation] do_transition_really_do_it -> ', now - window.quCreative_debug_time);
  window.quCreative_debug_time = now;

  if (margs && margs.newpage_transition) {
  }

  var margs_default = {
    arg: 0,
  };

  margs = $.extend(margs_default, margs);

  quCreative_main._body.removeClass("qtransitioned");
  quCreative_main._body.addClass("qucreative-view-animation-transitioning");

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
      } else {
      }
      quCreative_main._mainBg.removeClass(
        "preparing-to-transition transitioning-out",
      );
    }, delay_time);
  }



  var delay_for_main_bg = 0;

  if (
      _body.hasClass("menu-type-13") ||
      _body.hasClass("menu-type-14") ||
      _body.hasClass("menu-type-17") ||
      _body.hasClass("menu-type-18")
  ) {
    delay_for_main_bg = 100;
  }

  // -- _mainBg Transition





  transitionComplete().then(()=>{
    main_bg_transition_complete();
  })

  function main_bg_transition_complete() {


    const now = Number(new Date().getDate());
    console.log(
        "%c [animation] main_bg_transition_complete",
        "background-color: #dd0000;", now - window.quCreative_debug_time);
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
      height: "",
    });

    if (
        window.qucreative_options.bg_isparallax == "on" &&
        quCreative_main.newclass_body_page != "page-homepage" &&
        quCreative_main.newclass_body_page != "page-gallery-w-thumbs"
    ) {
      setTimeout(function () {}, 30000);

      quCreative_main._mainBg.addClass("dzsparallaxer");
      quCreative_main._mainBg
          .children(".main-bg")
          .addClass("dzsparallaxer--target");

      setTimeout(function () {}, 4000);
    } else {
      quCreative_main._mainBg.removeClass("dzsparallaxer");
      quCreative_main._mainBg
          .children(".main-bg")
          .removeClass("dzsparallaxer--target");
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

      if (
          _mainGalleryDescs.children().eq(margs.arg).find(".big-desc").html()
      ) {
        $(".responsive-info-btn-con")
            .find(".info-text-con")
            .html(
                "<h6>" +
                _mainGalleryDescs
                    .children()
                    .eq(margs.arg)
                    .find(".big-desc")
                    .html() +
                "</h6>",
            );
      } else {
        $(".responsive-info-btn-con").find(".info-text-con").html("");
      }

      if (_mainGalleryDescs.children().eq(margs.arg).hasClass("style2")) {
        _mainGalleryDescs.removeClass("style1").addClass("style2");
        _mainGalleryDescs.css({});
      } else {
        _mainGalleryDescs.removeClass("style2").addClass("style1");
        _mainGalleryDescs.css({
          right: "",
        });
      }

      if (
          is_chrome() &&
          String(window.location.href).indexOf("file://") == 0
      ) {
      } else {
      }

      _mainGalleryDescs.css({
        width: _mainGalleryDescs.children().eq(margs.arg).width() + "px",
        height: _mainGalleryDescs.children().eq(margs.arg).height() + "px",
        opacity: "1",
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
      }, 300)
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


  var margs_default = {
    newpage_transition: true,
  };

  margs = $.extend(margs_default, margs);





  var aux = quCreative_main._mainBg
      .find("figure")
      .eq(0)
      .css("background-image");
  mainBgImgCSS = aux;

  if (aux) {
    aux = aux.replace("url(", "");
    aux = aux.replace('url("', "");
    aux = aux.replace(")", "");
    aux = aux.replace('")', "");
  } else {
  }

  mainBgImgUrl = aux;


  // -for now we force fade

  const arg = "";


  if (margs.newpage_transition && quCreative_main.___response) {
    quCreative_main.transitioned_via_ajax_first = true;

    // -- this is the new page transition from setup_newBgImage() . destroy any listeners here
    determine_page();

    document.body.style.zoom = 1.0;

    qucreative_view_forceScrollToTop();
  }


  if (margs.newpage_transition && quCreative_main.___response) {
    // -- part of setup_newBgImage

    $(".map-canvas.to-remove").remove();

    /**     *   * @type {string}   */
    theQuery = '.the-content-con:not(".transitioning")';
    let theQuery = "";
    $(".the-content-con.transitioning-out").remove();

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


      // -- the new content-con is the real content-con NOW
      quCreative_main._theContent = $(
          ".the-content:not(.the-content-for-preseter)",
      ).eq(0);

      quCreative_main.handle_resize(null, {
        placew: false,
        place_page: true,
      });

      if (quCreative_main._theContentConTr.hasClass("qucreative-view-fullwidth")) {

        quCreative_main.viewPageIsFullwidth = true;
      }

      setTimeout(function () {
        if (!quCreative_main._theContentConTr.hasClass("qucreative-view-fullwidth")) {
          if (quCreative_main.page != "nuttin") {

            window.qucreative_actions_setupNewBgImage.forEach(
                (goToBgDoItAction) => {
                  goToBgDoItAction();
                },
            );

            setTimeout(function () {
              quCreative_main._theContentConTr.addClass("currContent");
            }, 100);



          }

        }
      }, 400);
    });

    setTimeout(function () {
      quCreative_main.reinit({
        call_from: "setup_newBgImage() _ newPageTransition",
      });
    }, 100);
  } else {
    if (first_page_not_transitioned) {
      quCreative_main.reinit({
        call_from: "setup_newBgImage() _ samePageTransition",
      });
      first_page_not_transitioned = false;
    }

    $(".the-content-con").addClass("currContent");

  }

  quCreative_main._mainContainer.addClass("transition-" + quCreative_main.bg_transition);

  setTimeout(function () {
    const args = {
      ignore_menu: false,
      placew: false,
      place_page: false,
      redraw_canvas: false,
      calculate_sidebar_main_is_bigger: true,
    };

    quCreative_main.handle_resize(null, args);
  }, 1000);


}


function qucreative_view_forceScrollToTop() {
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  window.scroll_top_object.val = 0;
  if (quCreative_main._mainContainer.get(0) && quCreative_main._mainContainer.get(0).api_scrolly_to) {
    quCreative_main._mainContainer.get(0).api_scrolly_to(0, {
      force_no_easing: "on",
      show_scrollbar: false,
    });
  } else {
    $(window).scrollTop(0);
  }
}


let main_content_loaded = false;
/**
 * only on ajax ?
 */
function qucreative_view_animation_doTransition(margs) {
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

      if (
          quCreative_main._theContentConTr &&
          quCreative_main._theContentConTr.hasClass("wait-for-main-content-to-load")
      ) {
        main_content_loaded = false;

        const _czfolio = quCreative_main._theContentConTr.find(".zfolio").eq(0);
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
    })
  }

  promiseContentReady().then(()=>{

    console.log('[animation] content ready');


    do_transition_really_do_it(margs);

  });

}


export function calculate_mainbg(pargs) {
  const $ = jQuery;
  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;
  var margs = {
    call_from: "default",
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

    if (do_we_need_parallaxer(arg)) {
      auxwh *= quCreative_main.parallaxer_multiplier;
    }

    var sw_no_parallaxer = false;

    if (margs.call_from == "new_page") {
      if (
          (quCreative_main.newclass_body.indexOf(
                  "single-dzsvcs_port_items-fullscreen",
              ) > -1 ||
              quCreative_main.newclass_body.indexOf(
                  "single-quextend_port_items-fullscreen",
              ) > -1) &&
          quCreative_main.newclass_body.indexOf("post-media-type-image") > -1
      ) {
        sw_no_parallaxer = true;
      }
    } else {
      if (quCreative_main._theContent) {
        if (
            quCreative_main._theContent
                .parent()
                .hasClass(
                    "single-dzsvcs_port_items-fullscreen post-media-type-image",
                ) ||
            quCreative_main._theContent
                .parent()
                .hasClass(
                    "single-quextend_port_items-fullscreen post-media-type-image",
                )
        ) {
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


