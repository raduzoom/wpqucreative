"use strict";

import { is_touch_device } from "../js/common/_helpers";

jQuery(document).ready(function ($) {
  var duration_vix = 20;
  var target_vix = 0;
  var begin_vix = 0;
  var finish_vix = 0;
  var change_vix = 0;
  var duration_viy = 5,
    target_viy = 0,
    begin_viy = 0,
    finish_viy = 0,
    change_viy = 0;

  const _body = $('body');

  const RESPONSIVE_BREAKPOINT = 1000;

  let
      gallery_thumbs_img_container_padding_space = 20;

  let
      gallery_thumbs_img_container_nw = 0, // -- natural width for gallery thumbs image container
      gallery_thumbs_img_container_nh = 0,
      gallery_thumbs_img_container_cw = 0,
      gallery_thumbs_img_container_ch = 0;


  const quCreative_main = window.quCreative_main;
  let currNr_gallery_w_thumbs = 0;


  $(document).on(
      "click",
      ".gallery-thumbs--image-container .advancedscroller .arrow-right,.gallery-thumbs--image-container .advancedscroller .arrow-left",
      handle_mouse_for_gallery_w_thumbs,
  );




  handle_frame();

  function handle_frame() {
    if (quCreative_main.page == "page-gallery-w-thumbs") {
      if (finish_vix) {
        begin_vix = target_vix;
        change_vix = finish_vix - begin_vix;

        target_vix = Number(
          Math.easeIn(1, begin_vix, change_vix, duration_vix).toFixed(4),
        );
        if (!_gallery_thumbs_con) {
          if ($(".gallery-thumbs-con").length > 0) {
            _gallery_thumbs_con = $(".gallery-thumbs-con").eq(0);
          }
        }

        if (is_ios() == false && is_android() == false && _gallery_thumbs_con) {
          _gallery_thumbs_con
            .find(".thumbs-list")
            .eq(0)
            .css({
              transform: "translate3d(" + target_vix + "px,0,0)",
            });
        }
      }
    }

    requestAnimFrame(handle_frame);
  }



  function gotoNewBgImage() {

    if (
        quCreative_main.newclass_body_page == "page-gallery-w-thumbs"
    ) {
      calculate_dims_gallery_thumbs_img_container();
    }
  }

  window.qucreative_actions_setupNewBgImage.push(gotoNewBgImage);

  function page_gallery_w_thumbs_calculate(argcthis, arg, pargs) {
    var margs = {
      arg: 0,
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    if (argcthis.hasClass("transition-wipeoutandfade")) {
      _body.addClass("page-gallery-w-thumbs-transitioning-content");
      setTimeout(function () {
        gallery_thumbs_img_container_nw = arg.data("naturalWidth");
        gallery_thumbs_img_container_nh = arg.data("naturalHeight");

        if (arg.attr("data-width-for-gallery")) {
          gallery_thumbs_img_container_nw = Number(
              arg.attr("data-width-for-gallery"),
          );
        }
        if (arg.attr("data-height-for-gallery")) {
          gallery_thumbs_img_container_nh = Number(
              arg.attr("data-height-for-gallery"),
          );
        }

        if (!gallery_thumbs_img_container_nw) {
          if (arg.attr("data-width-for-gallery")) {
            gallery_thumbs_img_container_nw = Number(
                arg.attr("data-width-for-gallery"),
            );
          }
          if (arg.attr("data-height-for-gallery")) {
            gallery_thumbs_img_container_nh = Number(
                arg.attr("data-height-for-gallery"),
            );
          }

          setTimeout(function () {
            if (arg.find("img").length) {
              if (arg.find("img").get(0).naturalWidth) {
                arg.data("naturalWidth", arg.find("img").get(0).naturalWidth);
                arg.data("naturalHeight", arg.find("img").get(0).naturalHeight);
              }
            }

            // -- recursive
            page_gallery_w_thumbs_calculate(argcthis, arg, margs);
          }, 150);

          return false;
        }

        var args = {
          this_is_new_item: true,
        };

        calculate_dims_gallery_thumbs_img_container(args);

        setTimeout(function () {
          _body.addClass("page-gallery-w-thumbs-transition-on-content");

          var args = {
            force_width: parseInt(
                gallery_thumbs_img_container_cw -
                gallery_thumbs_img_container_padding_space * 2,
                10,
            ),
            force_height: parseInt(
                gallery_thumbs_img_container_ch -
                gallery_thumbs_img_container_padding_space * 2,
                10,
            ),
            arg: margs.arg,
            called_from: "calling from qcreative.js 3266 ",
          };

          argcthis.get(0).api_do_transition(args);

          setTimeout(function () {}, 20000);
          _body.removeClass("page-gallery-w-thumbs-transitioning-content");
        }, 900);
      }, 700);
    } else {
      argcthis.get(0).api_do_transition();
    }
  }


  function calculate_dims_gallery_thumbs_img_container(pargs) {
    var margs = {
      this_is_new_item: false,
    };

    var thumb_space = 140;

    var aux_menu_width = menu_width;
    var aux_menu_width_on_right = menu_width_on_right;
    var aux_menu_height = menu_height;

    if (_navCon.css("display") == "none") {
      aux_menu_width = 0;
      aux_menu_height = 0;
      aux_menu_width_on_right = 0;

      // --d but on 0 account lets just leave normal scroller
    }

    var responsive_nav_and_thumbs_h = 0;

    var new_iw = 0;
    var new_ih = 0;

    var aux_sep_w = 80;
    var aux_sep_h = 110;

    var blur_margin = 30;
    if (force_width_blur_margin != 30) {
      if (isNaN(Number(force_width_blur_margin)) == false) {
        blur_margin = Number(force_width_blur_margin);
      } else {
      }
    }

    // -- image width
    var aux_iw = 0;
    var aux_ih = 0;

    aux_iw = Number(gallery_thumbs_img_container_nw);
    aux_ih = Number(gallery_thumbs_img_container_nh);

    aux_iw += blur_margin * 2;
    aux_ih += blur_margin * 2;

    // space width

    var aux_sw = 0;
    var aux_sh = 0;

    aux_sw = _theContent.parent().width();
    aux_sh = _theContent.parent().height();

    aux_sw -= blur_margin;
    aux_sh -= blur_margin;

    $(".the-content-bg-placeholder").eq(0).outerHeight(0);
    if (ww <= RESPONSIVE_BREAKPOINT) {
      responsive_nav_and_thumbs_h = _theContent.parent().height();

      aux_sw = ww - 40;
      aux_sh = wh - responsive_nav_and_thumbs_h;
      if (aux_sh < 400) {
        aux_sh = 400;
        _body.addClass("remove_overflow");
      } else {
        _body.removeClass("remove_overflow");
      }

      if (
          _theContent &&
          _theContent.prev().hasClass("the-content-bg") == false
      ) {
        _theContent.before('<div class="the-content-bg"></div>');
      }
    }

    var aux_ir = aux_iw / aux_ih;
    var aux_sr = aux_sw / aux_sh;

    if (aux_sr > aux_ir) {
      gallery_thumbs_img_container_cw = aux_iw * (aux_sh / aux_ih);
      gallery_thumbs_img_container_ch = aux_sh;
    } else {
      gallery_thumbs_img_container_cw = aux_sw;

      gallery_thumbs_img_container_ch = aux_ih * (aux_sw / aux_iw);
    }

    if (gallery_thumbs_img_container_cw > aux_iw) {
      gallery_thumbs_img_container_cw = aux_iw;
      gallery_thumbs_img_container_ch = aux_iw * (aux_ih / aux_iw);
    }

    var _c = $(".the-content-con > .the-content").eq(0);

    if (ww <= responsive_breakpoint) {
      // -- responsive
    }

    setTimeout(function () {
      // TODO: _c is the the-content ?
      _c.outerWidth(parseInt(gallery_thumbs_img_container_cw, 10));
      _c.eq(0).css({});

      _c.outerHeight(parseInt(gallery_thumbs_img_container_ch, 10));
      _c.eq(0).css({});
    }, 50);

    if (quCreative_main.newclass_body_page == "page-gallery-w-thumbs") {
      if (
          document.getElementById("as-gallery-w-thumbs") &&
          document.getElementById("as-gallery-w-thumbs")
              .api_set_action_call_on_gotoItem
      ) {
        document
            .getElementById("as-gallery-w-thumbs")
            .api_set_action_call_on_gotoItem(page_gallery_w_thumbs_calculate);
      }

      var delaytime = 0;

      if (margs.this_is_new_item) {
        delaytime = 1000;
      }
      setTimeout(function () {
        var _c4 =  quCreative_main._theContent.find(".advancedscroller").eq(0);

        _c4
            .find(".thumbsCon")
            .eq(0)
            .height(gallery_thumbs_img_container_ch - blur_margin * 2);
        _c4
            .find(".thumbsCon")
            .eq(0)
            .width(gallery_thumbs_img_container_cw - blur_margin * 2);
        _c4
            .find(".currItem")
            .eq(0)
            .height(gallery_thumbs_img_container_ch - blur_margin * 2);
        _c4
            .find(".currItem")
            .eq(0)
            .width(gallery_thumbs_img_container_cw - blur_margin * 2);

        if (margs.this_is_new_item == false) {
          quCreative_main._theContent
              .find(".advancedscroller")
              .eq(0)
              .find(".currItem > img")
              .eq(0)
              .css(
                  {
                    width: gallery_thumbs_img_container_cw - blur_margin * 2,
                    height: gallery_thumbs_img_container_ch - blur_margin * 2,
                  },
                  { queue: false, duration: 400 },
              );
        }

        quCreative_main._theContent.addClass("active");
      }, 1000);

      window.qucreative_calculate_dims_actions.forEach((calculateDimAction) => {
        calculateDimAction();
      });
    }
  }


  let _gallery_thumbs_con = null;
  function calculateDims() {


    if (quCreative_main.page == "page-gallery-w-thumbs") {
      calculate_dims_gallery_thumbs_img_container();
    }

    if ($(".gallery-thumbs-con").length > 0) {
      _gallery_thumbs_con = $(".gallery-thumbs-con").eq(0);

      var gallery_width = 0;

      var gallery_max_width = ww - (menu_width + menu_content_space);

      _gallery_thumbs_con.find("li.thumb:not(.inited)").each(function () {
        var _t = $(this);

        _t.addClass("inited");

        if (_t.children().eq(0).hasClass("bgimage")) {
          var aux32 = _t.children().eq(0).css("background-image");
          aux32 = aux32.replace("url(", "");
          aux32 = aux32.replace(")", "");
          aux32 = aux32.replace(/"/g, "");

          var auximg = new Image();
          auximg.ref_t = _t;

          if (auximg.addEventListener) {
            auximg.addEventListener("load", imgLoaded_for_thumbs);
          }

          auximg.src = aux32;
        } else {
          _t.addClass("img-loaded");
        }

        _t.bind("click", handle_mouse);
      });

      gallery_width = _gallery_thumbs_con.find("li.thumb").length * 100 + 40;

      _gallery_thumbs_con.find(".thumbs-list").width(gallery_width - 40);

      var aux_add_20 = 0;

      if (gallery_width > gallery_max_width) {
        gallery_width = gallery_max_width;

        aux_add_20 += 20;
      }

      // -- 40 padding
      var auxer23 = 0;
      if (aux_menu_width_on_right) {
        auxer23 = 20;
      }

      var aux_thumbs_list_padding_right = thumbs_list_padding_right;

      var aux =
        menu_width +
        menu_content_space +
        ((ww - (menu_width + menu_content_space * 2)) / 2 - gallery_width / 2);

      if (aux < menu_width + menu_content_space) {
        aux = menu_width + menu_content_space;
      }

      if (aux > 0) {
        aux_thumbs_list_padding_right = 0;
      }

      _gallery_thumbs_con
        .find(".thumbs-list-con")
        .eq(0)
        .width(
          gallery_width +
            aux_add_20 -
            thumbs_padding_left_and_right -
            aux_menu_width_on_right -
            auxer23 -
            aux_thumbs_list_padding_right,
        );

      _gallery_thumbs_con.css({
        left: aux + "px",
      });

      if (aux_menu_width_on_right) {
        _gallery_thumbs_con.css({
          width:
            "calc(100% - " +
            (aux_menu_width_on_right + 20 + menu_width) +
            "px)",
        });
      } else {
        _gallery_thumbs_con.css({
          width: "",
        });
      }

      if (ww <= responsive_breakpoint) {
        _gallery_thumbs_con.css({
          left: 0,
          width: "100%",
        });
        _gallery_thumbs_con.find(".thumbs-list-con").css("width", "100%");
      }

      if (is_touch_device() == false) {
        _gallery_thumbs_con.find(".thumbs-list-con").eq(0).unbind("mousemove");
        _gallery_thumbs_con
          .find(".thumbs-list-con")
          .eq(0)
          .bind("mousemove", handle_mouse);
      } else {
        _gallery_thumbs_con.find(".thumbs-list-con").css("overflow", "auto");
      }
    }
  }

  function handle_mouse(e) {
    const _t = $(this);

    if (_t.hasClass("thumb")) {
      const ind = _t.parent().children().index(_t);

      currNr_gallery_w_thumbs = ind;

      _t.parent().children().removeClass("curr-thumb");
      _t.addClass("curr-thumb");

      if (page == "page-gallery-w-thumbs") {
        if (
          document.getElementById("as-gallery-w-thumbs") &&
          document.getElementById("as-gallery-w-thumbs").api_goto_page
        ) {
          document.getElementById("as-gallery-w-thumbs").api_goto_page(ind);
        }
      }
    }
  }

  function handle_mouse_for_gallery_w_thumbs(e) {
    var _t = $(this);

    if (_t.hasClass("arrow-left")) {
      currNr_gallery_w_thumbs--;

      if (currNr_gallery_w_thumbs < 0) {
        currNr_gallery_w_thumbs =
            quCreative_main._theContent.find(".advancedscroller").find(".thumbsClip").children()
                .length - 1;
      }
    }

    if (_t.hasClass("arrow-right")) {
      currNr_gallery_w_thumbs++;

      if (
          currNr_gallery_w_thumbs >=
          quCreative_main._theContent.find(".advancedscroller").find(".thumbsClip").children()
              .length
      ) {
        currNr_gallery_w_thumbs = 0;
      }
    }

    if (_gallery_thumbs_con) {
      _gallery_thumbs_con.find(".thumbs-list .thumb").removeClass("curr-thumb");
      _gallery_thumbs_con
          .find(".thumbs-list .thumb")
          .eq(currNr_gallery_w_thumbs)
          .addClass("curr-thumb");
    } else {
      console.warn("gallery_thumb_con not found");
    }
  }


  /**
   * destroy
   */
  function goToBgDoIt() {
    if (_gallery_thumbs_con) {
      _gallery_thumbs_con.find(".thumbs-list-con").eq(0).unbind("mousemove");
    }
  }

  function reinit(pargs) {


    var margs = Object.assign(
        {
          call_from: "default",
        },
        pargs || {},
    );

    _gallery_thumbs_con = null;



    if (
        document.getElementById("as-gallery-w-thumbs") &&
        document.getElementById("as-gallery-w-thumbs")
            .api_set_action_call_on_gotoItem
    ) {
      document
          .getElementById("as-gallery-w-thumbs")
          .api_set_action_call_on_gotoItem(page_gallery_w_thumbs_calculate);
    }
  }
  window.qucreative_actions_goToBg_doIt.push(goToBgDoIt);
  window.qucreative_actions_reinit.push(reinit);
  window.qucreative_calculate_dims_actions.push(calculateDims);


});

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
