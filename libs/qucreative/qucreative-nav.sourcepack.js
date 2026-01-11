"use strict";
import { RESPONSIVE_BREAKPOINT } from "./_qucreative.config";

jQuery(document).ready(function ($) {
  let st = 0;

  const quCreative_main = window.quCreative_main;

  $(window).on("scroll.qcre", handle_scroll);

  function handle_scroll(e) {
    st = $(window).scrollTop();



  }



  let sw_native_scrollbar_sidebar_check = false;

  var _selectorCon = null;
  var selectorCon_initialOffset = 0;
  let sw_native_scrollbar_sidebar_check_anim_frame_called = false;

  let  initial_sidebar_offset = 0,
      initial_theContent_offset = 0;

  function qucreative_lifecycle_reinit_nav(pargs) {
    var margs = Object.assign(
      {
        call_from: "default",
      },
      pargs || {},
    );

    sw_native_scrollbar_sidebar_check = false;

    if (
      window.qucreative_options.enable_native_scrollbar == "off" ||
      window.qucreative_options.enable_native_scrollbar == "on"
    ) {
      if (_sidebarMain && $(".col-content").eq(0).height() > wh) {
        sw_native_scrollbar_sidebar_check = true;

        misc_regulate_nav_native();
      }
    }

    if (margs.call_from != "setup_newBgImage() _ samePageTransition") {
      sw_native_scrollbar_sidebar_check_anim_frame_called = false;
    }

    if (
      window.qucreative_options.enable_native_scrollbar == "off" ||
      window.qucreative_options.enable_native_scrollbar == "on"
    ) {
      if (quCreative_main.page_portfolio_requires_move_filters) {
        misc_regulate_nav_native();
      }
    }

    if (quCreative_main._theContent && quCreative_main._theContent.parent()) {
      setTimeout(function () {
        if (
          quCreative_main._theContent.parent().attr("data-scrollbar-theme") ==
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

      _selectorCon = null;

      if ($(".selector-con").length) {
        _selectorCon = $(".selector-con").eq(0);

        selectorCon_initialOffset =
          _selectorCon.offset().top - $(window).scrollTop();
      }
    }



    if (quCreative_main._theContent && quCreative_main._theContent.find(".sidebar-main").length > 0) {
      _sidebarMain = quCreative_main._theContent.find(".sidebar-main").last();

      initial_sidebar_offset = _sidebarMain.offset().top;
    } else {
      _sidebarMain = null;

      initial_sidebar_offset = 0;
      initial_theContent_offset = 0;
    }



    if (quCreative_main._theContent.find(".upper-footer").length) {
      _upperFooter = quCreative_main._theContent.find(".upper-footer").eq(0);
    } else {
      _upperFooter = null;
    }


    if (quCreative_main._theContent) {
      if (_sidebarMain || _upperFooter) {
        var _cal = $(".calendar_wrap");

        if (_cal.length) {
          _cal.each(function () {
            var _t2 = $(this);

            _t2.find("table").addClass("h-group-1");
            _t2.find("table > caption").addClass("h-group-1");
            _t2.find("a").addClass("custom-a");

            _t2
                .find("tfoot #prev a")
                .eq(0)
                .addClass("calendar-arrow-left")
                .html('<i class="fa fa-chevron-left"></i>');
            _t2
                .find("tfoot #next a")
                .eq(0)
                .addClass("calendar-arrow-right")
                .html('<i class="fa fa-chevron-right"></i>');

            _t2.find("*[colspan]").each(function () {
              var _t3 = $(this);

              if (_t3.hasClass("treated")) {
                return;
              }

              var len = Number(_t3.attr("colspan")) - 1;

              _t3.addClass("treated");
              if (len) {
                for (var i = 0; i < len; i++) {
                  _t3.after("<td> </td>");
                }
              }
            });
          });
        }

        $(
            ".widget_meta.widget,.widget_archive.widget,.widget_categories.widget,.widget_pages.widget,.widget_nav_menu.widget,.widget_rss.widget,.widget_recent_entries.widget",
        ).each(function () {
          var _t2 = $(this);

          _t2.find("ul").addClass("links-list");
          _t2.find("ul li").addClass("font-group-6");
        });
      }
    }

  }

  var _body = $('body');
  var _sidebarMain = null;
  var _upperFooter = null;

  function handle_resize(margs) {
    if (margs.calculate_sidebar_main_is_bigger) {
      if (_sidebarMain) {
        if (_sidebarMain.height() > _sidebarMain.prev().height()) {
          _body.addClass("sidebar-is-bigger-then-content");
        } else {
          _body.removeClass("sidebar-is-bigger-then-content");
        }
      }
    }

  }

  let duration_viy = 10;
  window.qucreative_handle_resize_actions.push(handle_resize);
  window.qucreative_actions_reinit.push(qucreative_lifecycle_reinit_nav);







});
