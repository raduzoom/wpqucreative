"use strict";

import {
  initObjectSizeProto,
} from "./js/common/_helpers";
import {
  QUCREATIVE_DEFAULTS,
  regex_bodyclass_page, regex_menu_type,
} from "./_qucreative.config";
import {  goto_bg } from './_qu-view-animation'
import { determine_page } from './_qu-view-determine-page'
import { check_animation_time } from "./_qu-view";

import { qu_setupActions } from './_qu-actions'

import {QuCreative} from './_qucreative-class';

window.quCreative_debug_time = 0;


window.qucreative_env_style_index = 1;
window.qucreative_vc_custom_style_index = 1;
window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll =
  null;

window.dzs_check_lazyloading_images_toberesized_arr = [];
window.dzs_check_lazyloading_inter = 0;
window.dzs_check_lazyloading_delayed = 0; // -- at 50 we launch the function nonetheless


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



jQuery(document).ready(function ($) {

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



  const qcm = new QuCreative($, qucreative_lifecycle_reinit, goto_bg);

  window.quCreative_main = qcm;

  var old_qcre_options = null;





  var selector_con_cloned = false;




  $("div.the-actual-nav").children("ul").addClass("the-actual-nav");

  qcm._logoCon = qcm._navCon.find(".logo-con").eq(0);
  if ($(".the-content:not(.the-content-for-preseter)").length > 0) {
    qcm._theContent = $(
      ".the-content:not(.the-content-for-preseter)",
    ).eq(0);
  }


  const isiPad = navigator.userAgent.match(/iPad/i) != null;
  if (isiPad) {
    _body.addClass("is-ipad");
  }



  const regex_menu_type_res = regex_menu_type.exec(_body.attr("class"));

  if (regex_menu_type_res) {
    qcm.menu_type = "menu-type-" + regex_menu_type_res[1];
  }



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



  setTimeout(function () {
    $(".preseter").css("opacity", "");
  }, 500);

  init();


  function init() {

    console.log('[lifecycle] init()', _body.attr('class'));


    if (
      _body.attr('class').indexOf(["menu-type-1 ","menu-type-2","menu-type-3","menu-type-4","menu-type-5","menu-type-6","menu-type-7","menu-type-8"])>-1
    ){
      qcm.viewMenuMacroType = 'vertical';
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


      }
    });

    qcm.initial_bg_transition = qucreative_options.bg_transition;
    qcm.last_bg_transition = qcm.initial_bg_transition;

    qcm.new_bg_transition = window.qucreative_options.new_bg_transition;



    if (isNaN(parseInt(window.qucreative_options.blur_amount, 10)) == false) {
      window.qucreative_options.blur_amount = parseInt(
        window.qucreative_options.blur_amount,
        10,
      );
    } else {
      window.qucreative_options.blur_amount = 25;
    }

    check_animation_time(qcm);





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


    window.qucreative_reinit = qucreative_lifecycle_reinit;



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
  function qucreative_lifecycle_reinit(pargs) {
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




    setTimeout(function () {
      _body.removeClass("qucreative-view-ajax-animation-transitioning");

    }, 100);
    _body.removeClass("qucreative-view-animation-transitioning");
    _body.removeClass("page-is-fullwidth");




    if (qcm._mainContainer.find(".the-content-con").eq(0).hasClass("qucreative-view-fullwidth")) {
      qcm.viewPageIsFullwidth = true;
    }


    selector_con_cloned = false;

    qcm.viewCheckFullWidth();












    _body.removeClass("page-title-no-antetitle");

    window.qucreative_actions_reinit.forEach((reinitAction) => {
      reinitAction(margs);
    });









    if (_body.hasClass("page-blogsingle")) {
      if (qucreative_options.blog_posts_url) {
        const pgu = qucreative_options.blog_posts_url;

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






  }





});




