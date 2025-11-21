"use strict";

import { dzsCommon_init_lazyloadingImages } from "./js/check-lazyloading-images/_check-lazyloading-images";
import { dzsQuc_init_progressMarkers } from "./js/init-progress-markers/_init-progress-markers";
import {
  getBrowserScrollSize,
  initObjectSizeProto,
} from "./js/common/_helpers";
import { dzsQuc_wpAddComment } from "./js/features/_wpAddComment";
import { dzsQuc_initAdvancedScrollers } from "./js/features/_advancedScrollers";
import {
  QUCREATIVE_DEFAULTS,
  regex_bodyclass_page, regex_menu_type,
} from "./_qucreative.config";
import {  goto_bg } from './_qu-view-animation'
import { determine_page } from './_qu-view-determine-page'
import { check_animation_time, quBuildResponsiveMenu, quSetupBorderCss } from "./_qu-view";
import { quSetupCheckLazyLoading } from '../../js/_checkLazyLoading'
import { dzsQu_view_adjustLayout, calculate_menu_width } from './js/features/_quViewLayout'
import { qu_setupActions } from './_qu-actions'

import {QuCreative} from './_qucreative-class';

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
window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll =
  null;

window.dzs_check_lazyloading_images_toberesized_arr = [];
window.dzs_check_lazyloading_inter = 0;
window.dzs_check_lazyloading_delayed = 0; // -- at 50 we launch the function nonetheless

dzsCommon_init_lazyloadingImages();

dzsQuc_init_progressMarkers();

dzsQuc_initAdvancedScrollers();

initObjectSizeProto();

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

window.scroll_top_object = { val: 0 };



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
  var
    thumbs_padding_left_and_right = 40,
    thumbs_list_padding_right = 0,
    menu_height = 0,
    native_scrollbar_width = 0,
    css_border_width = 0;


  var global_image_data = null;

  const qcm = new QuCreative($, reinit, goto_bg);

  window.quCreative_main = qcm;

  var old_qcre_options = null;





  var selector_con_cloned = false;
  var windowhref = "";
  var is_menu_horizontal_and_full_bg = false;




  $("div.the-actual-nav").children("ul").addClass("the-actual-nav");

  qcm._logoCon = qcm._navCon.find(".logo-con").eq(0);
  if ($(".the-content:not(.the-content-for-preseter)").length > 0) {
    qcm._theContent = $(
      ".the-content:not(.the-content-for-preseter)",
    ).eq(0);
  }


  if (isiPad) {
    _body.addClass("is-ipad");
  }

 

  const regex_menu_type_res = regex_menu_type.exec(_body.attr("class"));

  if (regex_menu_type_res) {
    qcm.menu_type = "menu-type-" + regex_menu_type_res[1];
  }

  let browserScrollSize = getBrowserScrollSize();

  native_scrollbar_width = browserScrollSize.width;


  var qucreative_options_defaults = QUCREATIVE_DEFAULTS;

  if (window.qucreative_options) {
    window.qucreative_options = $.extend(
      qucreative_options_defaults,
      window.qucreative_options,
    );
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


    if (
      _body.attr('class').indexOf(["menu-type-1 ","menu-type-2","menu-type-3","menu-type-4","menu-type-5","menu-type-6","menu-type-7","menu-type-8"])>-1
    ){
      qcm.menu_macrotype = 'vertical';
    }
    // -- todo: move to ajax
    const tempFindClass = regex_bodyclass_page.exec(String(_body.attr("class")));

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


    if (
      (isNaN(parseInt(_body.css("border-width"), 10)),
      parseInt(_body.css("border-width"), 10))
    ) {
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

    if (
      isNaN(parseInt(window.qucreative_options.border_width, 10)) == false &&
      parseInt(window.qucreative_options.border_width, 10)
    ) {
      qcm.border_width = parseInt(window.qucreative_options.border_width, 10);
    }

    if (qcm.border_width > 0) {

      quSetupBorderCss(qcm, _body);
    }

    if (isNaN(parseInt(window.qucreative_options.blur_amount, 10)) == false) {
      window.qucreative_options.blur_amount = parseInt(
        window.qucreative_options.blur_amount,
        10,
      );
    } else {
      window.qucreative_options.blur_amount = 25;
    }

    check_animation_time(qcm);

    dzsQu_view_adjustLayout(qcm);




    // todo: move to php
    if (
      _body.hasClass("menu-type-13") ||
      _body.hasClass("menu-type-14") ||
      _body.hasClass("menu-type-15") ||
      _body.hasClass("menu-type-16") ||
      _body.hasClass("menu-type-17") ||
      _body.hasClass("menu-type-18")
    ) {
      qcm.$theActualNav
        .find("> li > .sub-menu")
        .prepend(
          '<svg class="tooltip--icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" enable-background="new 0 0 15 15" xml:space="preserve"> <path fill-rule="evenodd" clip-rule="evenodd" fill="#5EBB53" d="M0,0v15h15C6.716,15,0,8.284,0,0z"/> </svg> ',
        );
    }

    windowhref = window.location.href;



    $(".the-actual-nav .menu-item > a").addClass("custom-a");

    $(this).scrollTop(0);


    if (window.qucreative_options.enable_ajax == "on") {
      if (_body.children(".ajax-preloader").length == 0) {
        _body.append(
          '<div class="ajax-preloader"><div class="loader"></div></div>',
        );
      }
    }

    determine_page();


    window.qucreative_reinit = reinit;


    // todo: load ajax sync

    // setupAjax(quCreative_main);

    qu_setupActions();

    _body.addClass(
      "menu-scroll-method-" + qucreative_options.menu_scroll_method,
    );

    $(window).bind("resize", qcm.handle_resize.bind(qcm));
    qcm.handle_resize(null, {
      redraw_canvas: false,
    });

    // -- todo: move to menu type extras js
    if (
      _body.hasClass("menu-type-3") ||
      _body.hasClass("menu-type-4") ||
      _body.hasClass("menu-type-5") ||
      _body.hasClass("menu-type-6") ||
      _body.hasClass("menu-type-7") ||
      _body.hasClass("menu-type-8")
    ) {
      qcm.$theActualNav.children().each(function () {
        var _t = $(this);

        if (_t.find("ul").length > 0) {
          _t.append(
            '<i class="sub-menu-indicator fa fa-chevron-circle-right"></i>',
          );
        }
      });
    }



    goto_bg(0, {});
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

    const margs = Object.assign(
      {
        call_from: "default",
      },
      pargs || {},
    );

    if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
      _body.addClass("menu-is-sticky");
    }

    var auxa = String(window.location.href).split("/");

    var aux2 = auxa[auxa.length - 1];


    quSetupCheckLazyLoading();

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
      if (
        window.qucreative_options.bg_isparallax == "on" &&
        _body.hasClass("page-homepage") == false &&
        _body.hasClass("page-gallery-w-thumbs") == false
      ) {
        setTimeout(function () {
          if (qcm._mainBgTransitioning) {
            qcm._mainBgTransitioning.addClass("dzsparallaxer");
            qcm._mainBgTransitioning
              .children(".main-bg")
              .addClass("dzsparallaxer--target");
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

            if (
              _c.children().length == 1 &&
              _c.find(".wpb_wrapper").length == 1 &&
              _c.find(".wpb_wrapper").html() == ""
            ) {
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

      qcm._theContent
        .find(".delete-prev-section")
        .each(function () {
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

      qcm._theContent
        .find(".vc_empty_space,.qucreative-divider-from-element")
        .each(function () {
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

      qcm._theContent
        .find(".wpb_wrapper .antfarm-divider")
        .each(function () {
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
                      "line-height": "1",
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
        if (
          _ctl.hasClass("custom-color") == false &&
          _ctl.hasClass("custom-opacity") == false
        ) {
          if (_body.hasClass("body-style-light")) {
            qcm._theContent
              .find(".translucent-con .translucent-overlay")
              .css("background-color", "#eeeeee");
            qcm._theContent
              .find(".translucent-layer")
              .eq(0)
              .css("background-color", "#fff");
          } else {
            qcm._theContent
              .find(".translucent-con .translucent-overlay")
              .css("background-color", "#333333");
            qcm._theContent
              .find(".translucent-layer")
              .eq(0)
              .css("background-color", "#222222");
          }
        }
      }



      if (
        qcm._theContent &&
        qcm._theContent.find(".post-password-form").length
      ) {
        qcm._theContent
          .find(".post-password-form input[type=submit]")
          .addClass("antfarm-btn btn-read-more style-default padding-small");
      }
    }


    if (qcm._mainContainer.find(".the-content-con").eq(0).hasClass("fullit")) {
      qcm.page_is_fullwidth = true;
    }

    if (
      qcm.page == "page-gallery-w-thumbs" ||
      qcm.page == "page-homepage"
    ) {
      qcm.page_is_fullwidth = true;
    }

    selector_con_cloned = false;
    is_menu_horizontal_and_full_bg = false;
    if (qcm.page_is_fullwidth) {
      _body.addClass("page-is-fullwidth");

      if (
        qcm.menu_macrotype === 'horizontal'
      ) {
        is_menu_horizontal_and_full_bg = true;
      }
    }



    quBuildResponsiveMenu(qcm, _body);
    if (qcm._theContent && qcm._theContent.length) {


      const _c = qcm._theContent
        .find(".responsive-featured-media-con")
        .eq(0);
      if (_c.length > 0) {
        if (_c.children().length == 0) {
          if (
            qcm._theContent.find(
              ".responsive-featured-media-con--target",
            ).length > 0
          ) {
            _c.append(
              qcm._theContent
                .find(".responsive-featured-media-con--target")
                .html(),
            );

            if (
              qcm._theContent
                .find(".responsive-featured-media-con--target")
                .eq(0)
                .hasClass("advancedscroller-con")
            ) {
              _c.children(".advancedscroller")
                .removeClass("skin-nonav")
                .addClass("skin-qucreative")
                .height(400);
              _c.children(".advancedscroller").attr(
                "data-options",
                '{ settings_mode: "onlyoneitem",design_arrowsize: "0" ,settings_swipe: "on" ,settings_autoHeight: "on",settings_autoHeight_proportional: "on",settings_swipeOnDesktopsToo: "on" ,settings_slideshow: "on" ,settings_slideshowTime: "150" }',
              );
            }
          }
        }

        if (_c.children().length == 0) {
          if (
            qcm._theContent.find(
              ".responsive-featured-media-con--target",
            ).length == 0
          ) {
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
        if (
          $(".the-content-con").eq(0).children(".qucreative--520-nav-con")
            .length == 0
        ) {
          $(".the-content-con")
            .eq(0)
            .prepend(
              '<div class="qucreative--520-nav-con "> <div class="dzs-select-wrapper skin-justvisible "> <div class="dzs-select-wrapper-head"> <div class="nav-wrapper-head  bg-color-hg"><i class="fa fa-bars"></i></div> </div> ' +
                the_select_str +
                " </div>" +
                the_custom_menu_str +
                "</div>",
            );

          qcm._navCon_520 = $(".the-content-con")
            .eq(0)
            .children(".qucreative--520-nav-con")
            .eq(0);
        }
      }
    }

    if (qcm._theContent && qcm._theContent.parent()) {
      setTimeout(function () {
        if (
          qcm._theContent.parent().attr("data-scrollbar-theme") ==
          "light"
        ) {
          $(".main-container > .scrollbar .scrollbary").css({
            "background-color": "rgba(255,255,255,0.5)",
          });
        } else {
          $(".main-container > .scrollbar .scrollbary").css({
            "background-color": "",
          });
        }
      }, 1000);
    }

    if (qcm._navCon_520.children(".logo-con").length == 0) {
      qcm._navCon_520.prepend(
          qcm._navCon.children(".logo-con").clone(),
      );
    }

    var _cac = qcm._navCon_520
      .find(".dzs-select-wrapper select")
      .eq(0);

    if (
      qcm._navCon_520.children(".custom-responsive-menu").length > 0
    ) {
      qcm.custom_responsive_menu = true;
      _cac = qcm._navCon_520
        .children(".custom-responsive-menu")
        .find(".custom-menu")
        .eq(0);
    }
    qcm._navCon_520.find(".logo-con").addClass("logo-con-520");

    _cac.html("");
    qcm.$theActualNav.children("li").each(function () {
      var _t = $(this);

      var aux_str = "";

      if ( !qcm.custom_responsive_menu ) {
        aux_str = "<option";

        if (_t.hasClass("current-menu-item")) {
          aux_str += " selected";
        }

        aux_str +=
          ' value="' +
          _t.children("a").attr("href") +
          '">' +
          _t.children("a").eq(0).html() +
          "</option>";

        _cac.append(aux_str);

        if (_t.children("ul").length > 0) {
          _t.children("ul")
            .eq(0)
            .children("li")
            .each(function () {
              var _t2 = $(this);
              _cac.append(
                '<option value="' +
                  _t2.children("a").attr("href") +
                  '"> - ' +
                  _t2.children("a").eq(0).html() +
                  "</option>",
              );

              _t2
                .children("ul")
                .eq(0)
                .children("li")
                .each(function () {
                  var _t3 = $(this);

                  _cac.append(
                    '<option value="' +
                      _t3.children("a").attr("href") +
                      '"> - - ' +
                      _t3.children("a").eq(0).html() +
                      "</option>",
                  );
                });
            });
        }
      } else {
      }
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

    calculate_menu_width(qcm);

    if (_body.hasClass("page-portfolio") || _body.hasClass("page-blogsingle")) {
    }

    if (
      _body.hasClass("menu-type-5") ||
      _body.hasClass("menu-type-6") ||
      _body.hasClass("menu-type-7") ||
      _body.hasClass("menu-type-8") ||
      _body.hasClass("menu-type-11")
    ) {
      qcm.menu_content_space = 30;
    }
    if (
      qcm.menu_macrotype === 'horizontal'
    ) {
      qcm.view_menuWidth = 0;
      qcm.view_menuWidth_onRight = 0;
      qcm.menu_content_space = 0;
      menu_height = 135;
      thumbs_padding_left_and_right = 40;
      thumbs_list_padding_right = 20;

      if (
        _body.hasClass("menu-type-13") ||
        _body.hasClass("menu-type-14") ||
        _body.hasClass("menu-type-15") ||
        _body.hasClass("menu-type-16") ||
        _body.hasClass("menu-type-17") ||
        _body.hasClass("menu-type-18")
      ) {
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
      $('ul[class*="qc-pagination-for-zfolio"]')
        .find("a")
        .addClass("dzszfl-pagination-a custom-a");

      if ($.fn.vcGrid) {
        $("[data-vc-grid-settings]").vcGrid();
      }
    }, 1000);

    _body.removeClass("page-title-no-antetitle");

    window.qucreative_actions_reinit.forEach((reinitAction) => {
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
      qcm._theContent
        .find(".divimage-calculate-real-size,a.comment-reply-link")
        .each(function () {
          var _t4 = $(this);

          if (_t4.hasClass("comment-reply-link")) {
            _t4
              .addClass("custom-a")
              .attr("onclick", String(_t4.attr("onclick")).replace("div-", ""));
          }

          if (_t4.hasClass("divimage-calculate-real-size")) {
            var src = sanitize_image_src_from_background(
              _t4.css("background-image"),
            );

            var img = new Image();

            img.parentEl = _t4;

            img.onload = function (e) {
              // image  has been loaded

              var _t4_c = this.parentEl;

              if (_t4_c.parent().hasClass("pic-con")) {
                _t4_c.parent().animate({
                  "max-width": this.naturalWidth,
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
        calculate_sidebar_main_is_bigger: false,
      });
    }, 100);

    if (
      _body.hasClass("single-antfarm_port_items") ||
      _body.hasClass("single-dzsvcs_port_items")
    ) {
      if (qucreative_options.portfolio_page_url) {
        var pgu = qucreative_options.portfolio_page_url;


        const $portfolioPageLinks = $('a[href="' + pgu + '"]');
        $portfolioPageLinks
          .parent()
          .addClass("current-menu-item");
        $portfolioPageLinks
          .parent()
          .parent()
          .parent()
          .addClass("current-menu-item");
      }
    }
    if (_body.hasClass("page-blogsingle")) {
      if (qucreative_options.blog_posts_url) {
        var pgu = qucreative_options.blog_posts_url;

        const $blogPageLinks = $('a[href="' + pgu + '"]');
        $blogPageLinks
          .parent()
          .addClass("current-menu-item");
        $blogPageLinks
          .parent()
          .parent()
          .parent()
          .addClass("current-menu-item");
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
              show_scrollbar: false,
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
      if (
        qcm._theContent &&
        qcm._theContent.parent().hasClass("fullit")
      ) {
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
      calculate_sidebar_main_is_bigger: true,
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    global_image_data = null;
    _body.removeClass("resizing");

    window.qucreative_calculate_dims_actions.forEach((reinitAction) => {
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
        if (
          qcm._mainBg.get(0) &&
          qcm._mainBg.get(0).api_handle_scroll
        ) {
          qcm._mainBg.get(0).api_handle_scroll(null, {
            from: "qcre",
            force_th: qcm.bigimageheight,
            force_ch: qcm.windowHeight,
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

      if (
        110 + _cach_cont.find(".the-content-inner-inner").height() + 56 >
          qcm.windowHeight
      ) {
        _cach.outerHeight(qcm.windowHeight - 110);
        _cach.removeClass("auto-height");
        _cach.addClass("needs-scrolling");

        _cach_cont.find(".the-content-inner-inner").css({
          "padding-right": 39 - native_scrollbar_width + "px",
          width: 490 - native_scrollbar_width + "px",
        });
        _cach_cont.find(".the-bg").eq(0).css({});
      } else {
        _cach.css("height", "auto");
        _cach.addClass("auto-height");
        _cach.removeClass("needs-scrolling");

        _cach_cont.find(".the-content-inner-inner").css({
          "padding-right": "",
          width: "",
        });
        _cach_cont.find(".the-bg").eq(0).css({
          right: "",
          width: "",
        });
      }
    }
  }







});
qcreative_curr_html = "";



var isiPad = navigator.userAgent.match(/iPad/i) != null;

window.addComment = dzsQuc_wpAddComment;
