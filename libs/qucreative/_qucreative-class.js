"use strict";
import {QUCREATIVE_DEFAULTS, RESPONSIVE_BREAKPOINT} from "./_qucreative.config";
import {calculate_menu_width} from "../../../../plugins/qu-extend/libs/qushortcodes/view/_quViewLayout";
import {calculate_mainbg} from "./_qu-view-animation";

export class QuCreative{

  busy_main_transition = false;
  $theActualNav= null;
  response_str= null;
  _theContent= null;
  custom_responsive_menu= null;
  _theContentConTr= null;
  _mainContainer= null;
  ___response= null;
  _curr_parallaxer= null;// -- the current parallax main bg
  _navCon= null;
  _navCon_520= null;
  _mainBg= null;
  _preloaderCon= null;
  _mainBgTransitioning= null;


  page= null;
  currBgNr= 0;
  inter_bg_slideshow= 0;


  _body= null;
  bg_transition= "slidedown";
  last_bg_transition= "slidedown";
  menu_type= "";
  viewMenuMacroType= "horizontal"; // -- horizontal = 9-10; 13-18
  initial_bg_transition= "";
  newclass_body_nopadding= false;
  newclass_body_with_fullbg= false;
  qcre_init_zoombox= false;
  zoombox_options= {};
  old_zoombox_options= {};
  mainOptions = {};
  _c_for_parallax_items= null;
  viewPageIsFullwidth= false;
  transitioned_via_ajax_first= false; // -- set to true when the first ajax transition has been made
  page_portfolio_requires_move_filters= false;
  newclass_body= "";
  content_width= 1122;
  force_content_width= 1122;
  newclass_body_page= "";
  reinit= null;
  curr_html= ""; // -- todo: why do we need it ?
  curr_html_with_clear_cache= false;
  view_isFirstTransition= true; // -- for ajax
  is_content_page= false;
  new_bg_transition= "on"; // -- if set to "off" then the initial background will remain
  parallaxer_multiplier= 1.3;
  bigimagewidth= 0;
  bigimageheight= 0;
  border_width= 0;
  windowWidth= 0;
  windowHeight= 0;
  view_animation_duration= 400;
  menu_content_space = 20;
  view_menuWidth= 250;
  view_menuWidth_onRight= 0;
  $cssFromJs= null;
  _logoCon = null;
  goto_bg = null;
  $ = null;
  // -- ajax
  scripts_loaded_arr= [];
  videoplayers_tobe_resized= []; // we need this ?

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

  viewCheckFullWidth(){

    const _body = this._body;
    if (this.viewPageIsFullwidth) {
      _body.addClass("page-is-fullwidth");
    }else{

      _body.removeClass("page-is-fullwidth");
    }
  }
  qcreative_overwrite_mainoptions(arg) {
    const $ = this.$;

    const customizer_force_blur = -1;
    const qucreative_options_defaults_string = JSON.stringify(
      QUCREATIVE_DEFAULTS,
    );


    var auxer5 = JSON.parse(qucreative_options_defaults_string);

    window.qucreative_options = $.extend(auxer5, arg);

    if (customizer_force_blur > -1) {
      qucreative_options.blur_amount = customizer_force_blur;
    }

    if (isNaN(parseInt(window.qucreative_options.blur_amount, 10)) == false) {
      window.qucreative_options.blur_amount = parseInt(
        window.qucreative_options.blur_amount,
        10,
      );
    } else {
      window.qucreative_options.blur_amount = 25;
    }

    var aux = window.qucreative_options.images_arr;

    aux = aux.replace(/'/g, "");

    window.qucreative_options.images_arr = aux.split(",");

    window.qucreative_options = qucreative_options;

    this.mainOptions = window.qucreative_options;
  }





  handle_resize(e, pargs) {

    const $ = this.$;

    let
      menu_is_scrollable = false,
      menu_is_scrollable_offset = 0,
      the_actual_nav_initial_top_offset = -1;


    const _body = this._body;

    let margs = Object.assign(
      {
        ignore_menu: false,
        placew: true,
        place_page: true, // what does this do ?
        redraw_canvas: true,
        calculate_sidebar_main_is_bigger: true,
        calculate_menu_overflow: true,
      },
      pargs || {},
    );

    const quCreative_main = this;
    quCreative_main.windowWidth = window.innerWidth;
    quCreative_main.windowHeight = window.innerHeight;

    if (quCreative_main.border_width > 0) {
      quCreative_main.windowWidth = quCreative_main.windowWidth - quCreative_main.border_width * 2;
    }

    $(".main-bg-div").height(quCreative_main.windowHeight);

    if (
      quCreative_main.page == "page-portfolio-single" &&
      quCreative_main._theContent &&
      quCreative_main._theContent.parent().hasClass("qucreative-view-fullwidth")
    ) {
      $(".advancedscroller").eq(0).css("height", "100%");
      $(".advancedscroller-con").eq(0).height(quCreative_main.windowHeight);
      $(".advancedscroller-con-placeholder").eq(0).height(quCreative_main.windowHeight);
    }


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

          var aux_total = (aux_cw / aux_rw) * aux_oh;

          _c.height(aux_total);
        }
      }
    }

    if (margs.calculate_menu_overflow) {
      if (
        _body.hasClass("menu-type-1") ||
        _body.hasClass("menu-type-2") ||
        _body.hasClass("menu-type-3") ||
        _body.hasClass("menu-type-4") ||
        _body.hasClass("menu-type-5") ||
        _body.hasClass("menu-type-6") ||
        _body.hasClass("menu-type-7") ||
        _body.hasClass("menu-type-8")
      ) {
        if (
          quCreative_main.$theActualNav &&
          quCreative_main.$theActualNav.offset &&
          quCreative_main.$theActualNav.offset()
        ) {
          if (the_actual_nav_initial_top_offset == -1) {
            the_actual_nav_initial_top_offset =
              quCreative_main.$theActualNav.offset().top;
          }
        } else {
          console.warn("actual nav does not exist ? ");
        }

        var aux_sum =
          the_actual_nav_initial_top_offset +
          quCreative_main.$theActualNav.outerHeight() +
          10;

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
            "margin-top": "",
          });
        }
      }
    }

    if (margs.place_page) {
      if (
        quCreative_main.page == "page-portfolio" ||
        quCreative_main.page == "page-portfolio-single" ||
        quCreative_main.page == "page-normal" ||
        quCreative_main.page == "page-blog" ||
        quCreative_main.page == "page-blogsingle" ||
        quCreative_main.page == "page-about" ||
        quCreative_main.page == "page-contact"
      ) {
        // -- setting the content left position, menu types excluded here




        if (
          !_body.hasClass("page-is-fullwidth") &&
          (quCreative_main.viewMenuMacroType === 'vertical')
        ) {
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

    if (quCreative_main.windowWidth + quCreative_main.border_width * 2 < RESPONSIVE_BREAKPOINT) {

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

      calculate_mainbg({
        call_from: "handle_resize",
      });
    }

    window.qucreative_handle_resize_actions.forEach((reinitAction) => {
      reinitAction(margs, quCreative_main);
    });
  }



}
