"use strict";

import { can_history_api, is_touch_device } from "../js/common/_helpers";
import { adjustZoombox } from '../_adjustZoombox'
import { regex_ajax_find_links, regex_ajax_find_scripts } from '../_qucreative.config'
import {quAjax_view_loadFromNewPage} from "./_qu-ajax-view";

/**
 * called in init
 */
function setupAjax(quCreative_main) {
  const $ = jQuery;

  let ajax_site_url;

  const _body = $("body");


  const ajaxOptions = {
    stylesheets_tobeloaded: [],
    scripts_tobeloaded: [],
    new_footer_extra_content_html: null,
    response: null
  }

  let page_change_ind = 0;

  var state_curr_menu_items_links = [];

  let history_first_pushed_state = false;

  $("script").each(function () {
    var _t = $(this);

    if (_t.attr("src")) {
      quCreative_main.scripts_loaded_arr.push(_t.attr("src"));
    }

    if (
      String(_t.attr("src")).indexOf("https://maps.googleapis.com/maps/api") ==
      0
    ) {
      window.google_maps_loaded = true;
    }
  });

  $("link").each(function () {
    const _t = $(this);

    if (_t.attr("rel") == "stylesheet" && _t.attr("href")) {
      var aux_href = _t.attr("href");
      if (aux_href.indexOf("./") == 0) {
        aux_href = aux_href.replace("./", "");
      }
      quCreative_main.scripts_loaded_arr.push(aux_href);
    }
  });

  let windowhref = window.location.href;
  if (window.qucreative_options.enable_ajax == "on" && window) {
    if (window.qucreative_options.site_url == "detect") {
      var auxa = windowhref.split("/");

      var i = 0;
      for (i in auxa) {
        if (i > 0) {
          ajax_site_url += "/";
        }
        if (i < auxa.length - 1) {
          ajax_site_url += auxa[i];
        }
      }
    } else {
      ajax_site_url = window.qucreative_options.site_url;
    }
  }

  var selector_ajax =
    ".zfolio-portfolio-classic a.zfolio-item--inner:not(.not-ajax), .portfolio-link--toback-a, a.portfolio-link--title,a.ajax-link";

  if (qucreative_options.base_url) {
    selector_ajax += ',a[href^="' + qucreative_options.base_url + '"]';
  }


  $(document).on(
    "click",
    ".the-actual-nav a, a.zfolio-item--inner:not(.for-content-opener),.qc-pagination > li > a",
    click_menu_anchor,
  );

  $(document).on("click", selector_ajax, click_menu_anchor);

  $(".menu-toggler-target, .logo-con")
    .find("a")
    .bind("click", click_menu_anchor);

  if (window.addEventListener) {
    window.addEventListener("popstate", handle_popstate);
  }

  quCreative_main._navCon_520
    .find("select")
    .eq(0)
    .unbind("change", change_nav_con_520);
  quCreative_main._navCon_520
    .find("select")
    .eq(0)
    .bind("change", change_nav_con_520);

  function handle_popstate(e) {
    console.log("handle_popstate", e, e.state);

    if (e.state && e.state.href) {
      click_menu_anchor(null, {
        force_href: e.state.href,
        force_no_ajax: "on",
        call_from: "popstate",
      });

      if (Object.size(e.state.curr_menu_items) > 0) {
        quCreative_main.$theActualNav
          .find(".current-menu-item")
          .removeClass("current-menu-item");

        for (var i2 = 0; i2 < Object.size(e.state.curr_menu_items); i2++) {
          quCreative_main.$theActualNav
            .find("li")
            .eq(e.state.curr_menu_items[i2])
            .addClass("current-menu-item");
        }
      }
      return false;
    }
  }

  function click_menu_anchor(e, pargs) {
    var _t = $(this);
    var thehref = _t.attr("href");
    var isselectoption = false;
    var newtitle = null;

    var margs = {
      _t: null,
      force_href: "",
      force_no_ajax: "off",
      call_from: "default",
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    if (margs._t) {
      _t = margs._t;
    }

    if (_t.hasClass("not-ajax") == false) {
    }

    let allow_html5_link_process = true;

    if (_t && _t.hasClass("zoombox-delegated")) {
      allow_html5_link_process = false;
    }

    if (_t && _t.get(0) && _t.get(0).nodeName == "SELECT") {
      isselectoption = true;
      thehref = _t.val();
    }

    if (_t && _t.get(0) && _t.get(0).nodeName == "OPTION") {
      isselectoption = true;
      thehref = _t.val();
    }

    if (
      qucreative_options.enable_ajax == "on" &&
      thehref == quCreative_main.curr_html
    ) {
      return false;
    }

    if (is_touch_device()) {
      if (_t && _t.hasClass("zoombox-delegated")) {
      } else {
        margs.force_no_ajax = "on";
        window.location.href = thehref;
      }
    }

    if (margs.force_href) {
      thehref = margs.force_href;

      if (margs.force_no_ajax == "on") {
        window.location.href = thehref;
      }
    }

    if (quCreative_main.busy_main_transition) {
      setTimeout(function () {
        var args = {};
        if (_t) {
          args._t = _t;
          args.force_href = thehref;
        }
        click_menu_anchor(e, args);
      }, 1000);

      return false;
    }

    window.quCreative_debug_time = new Date().getDate();
    console.log('currTime - ', new Date().getDate() - window.quCreative_debug_time);

    if (isselectoption) {
    }

    ajaxOptions.new_footer_extra_content_html = "";
    if (
      window.qucreative_options.enable_ajax == "on" &&
      (!_t || _t.hasClass("not-ajax") == false) &&
      window &&
      margs.force_no_ajax != "on" &&
      allow_html5_link_process
    ) {
      if (
        thehref == "#" ||
        (thehref && thehref.indexOf("#") == 0) ||
        (thehref.indexOf("#") > -1 &&
          thehref.split("#")[0] == String(window.location.href).split("#")[0])
      ) {
        if (window.qucreative_options.enable_native_scrollbar != "on") {
          return false;
        }
        if (thehref == "#") {
        }
      } else {
        if (
          window.location.href.indexOf("file://") == 0 ||
          ((thehref.indexOf("http://") > -1 ||
            thehref.indexOf("https://") > -1) &&
            thehref.indexOf(ajax_site_url) != 0)
        ) {
        } else {
          clearInterval(quCreative_main.inter_bg_slideshow);
          _body.removeClass("loaded");

          if (can_history_api()) {
            ajaxOptions.scripts_tobeloaded = [];
            ajaxOptions.stylesheets_tobeloaded = [];
            var nr_scripts_tobeloaded = 0;

            $(".portfolio-fulscreen--items").remove();
            _body.addClass("q-ajax-transitioning");
            $.ajax({
              url: thehref,
              context: document.body,
            }).done(function (response) {

              ajaxOptions.response = response;
              let arg;
              if (_t) {
                if (
                  _t.parent().parent().parent().hasClass("menu-toggler-target")
                ) {
                  _t.parent().parent().parent().removeClass("active");
                }
                if (
                  _t
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .hasClass("menu-toggler-target")
                ) {
                  _t.parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .removeClass("active");
                }
              }

              quCreative_main.response_str = response;
              quCreative_main.___response = $(response);

              quAjax_view_loadFromNewPage();

              if ($(".footer-extra-zoombox-items").length) {
                $(".footer-extra-zoombox-items").html(
                  ajaxOptions.new_footer_extra_content_html,
                );
              } else {
                _body.append(
                  '<div class="footer-extra-zoombox-items">' +
                  ajaxOptions.new_footer_extra_content_html +
                    '<span style="display: none;">dzs2</span></div>',
                );
              }

              for (i = 0; i < quCreative_main.___response.length; i++) {
                var _t3 = quCreative_main.___response[i];

                var aux_href = "";
                if (_t3.href) {
                  aux_href = _t3.href;

                  if (aux_href.indexOf("./") == 0) {
                    aux_href = aux_href.replace("./", "");
                  }
                }

                if (_t3.nodeName == "TITLE") {
                  newtitle = _t3.innerHTML;
                }
              }
              // -- parsing response end

              setTimeout(function () {
                var i = 0;
                nr_scripts_tobeloaded =
                  ajaxOptions.scripts_tobeloaded.length + ajaxOptions.stylesheets_tobeloaded.length;

                function loadFunc(e) {}

                if (nr_scripts_tobeloaded <= 0) {
                  load_new_page();
                  return false;
                }

                var i4 = 0;
                for (i4 = 0; i4 < ajaxOptions.scripts_tobeloaded.length; i4++) {
                  $.getScript(ajaxOptions.scripts_tobeloaded[i4])
                    .done(function (data, textStatus, jqxhr) {
                      if (
                        String(this.url).indexOf(
                          "http://maps.googleapis.com/maps",
                        ) > -1
                      ) {
                        window.google_maps_loaded = true;
                        window.gooogle_maps_must_init = true;
                      }

                      nr_scripts_tobeloaded--;

                      if (nr_scripts_tobeloaded <= 0) {
                        load_new_page();
                      }

                      var aux = this.url;

                      if (aux.indexOf("?") > -1) {
                        aux = aux.split("?")[0];
                      }

                      quCreative_main.scripts_loaded_arr.push(aux);
                    })
                    .fail(function (jqxhr, settings, exception) {
                      console.log(
                        "Triggered ajaxError handler.",
                        jqxhr,
                        settings,
                        exception,
                        this,
                      );

                      nr_scripts_tobeloaded--;
                      if (nr_scripts_tobeloaded <= 0) {
                        load_new_page();
                      }
                    });
                }
                for (i4 = 0; i4 < ajaxOptions.stylesheets_tobeloaded.length; i4++) {
                  $("<link/>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: ajaxOptions.stylesheets_tobeloaded[i4],
                  }).appendTo("head");

                  quCreative_main.scripts_loaded_arr.push(
                    ajaxOptions.stylesheets_tobeloaded[i4],
                  );

                  nr_scripts_tobeloaded--;

                  if (nr_scripts_tobeloaded <= 0) {
                    load_new_page();
                  }
                }

                setTimeout(function () {}, 1000);
              }, 100);

              if (quCreative_main.bg_transition == "fade") {
                var aux9000 = quCreative_main._mainBg;

                setTimeout(function () {
                  if (aux9000.get(0) && aux9000.get(0).api_destroy) {
                    aux9000.get(0).api_destroy();
                  }
                }, 300);
              } else {
                if (
                  quCreative_main._mainBg.get(0) &&
                  quCreative_main._mainBg.get(0).api_destroy
                ) {
                  quCreative_main._mainBg.get(0).api_destroy();
                }
              }

              if (window.api_destroy_zoombox) {
                window.api_destroy_zoombox();
              }

              if (_t.get(0) != window) {
                if (history_first_pushed_state == false) {
                  if (window.location.href.indexOf("file://") === -1) {
                    var aux = quCreative_main.curr_html;
                    if (aux == "index.html") {
                      aux = "";
                    }
                    if (aux == "index.php") {
                      aux = "";
                    }

                    var stateObj = { href: quCreative_main.curr_html };

                    history.pushState(stateObj, null, aux);
                  }
                  history_first_pushed_state = true;
                }

                var aux_arr = state_curr_menu_items_links.slice(0);

                var stateObj = {
                  foo: page_change_ind,
                  href: thehref,
                  curr_menu_items: aux_arr,
                };

                page_change_ind++;

                history.pushState(stateObj, newtitle, thehref);
                if (newtitle) {
                  document.title = newtitle;
                }
              }
            });

            if (_t.get(0) != window) {
              // -- adjust current-menu-item

              state_curr_menu_items_links = [];

              quCreative_main.$theActualNav
                .find(".current-menu-item")
                .each(function () {
                  var _t = $(this);

                  state_curr_menu_items_links.push(
                    quCreative_main.$theActualNav.find("li").index(_t),
                  );
                });

              if ((_t && _t.hasClass("donotchange-ajax-menu")) == false) {
                if (_t) {
                }
                quCreative_main.$theActualNav
                  .find(".current-menu-item,.current-menu-ancestor")
                  .removeClass("current-menu-item current-menu-ancestor");
                if (_t.attr("rel") == "home") {
                  if (
                    quCreative_main.$theActualNav.find("a[rel=home]").length > 0
                  ) {
                    quCreative_main.$theActualNav
                      .find("a[rel=home]")
                      .eq(0)
                      .parent()
                      .addClass("current-menu-item");
                  }
                }
                if (_t.parent().parent().hasClass("the-actual-nav")) {
                  _t.parent().addClass("current-menu-item");
                }
                if (
                  _t
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .hasClass("the-actual-nav")
                ) {
                  _t.parent()
                    .parent()
                    .parent()
                    .parent()
                    .find(".current-menu-item")
                    .removeClass("current-menu-item");
                  _t.parent().parent().parent().addClass("current-menu-item");
                  _t.parent().addClass("current-menu-item");
                }

                if (
                  _t
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .hasClass("the-actual-nav")
                ) {
                  _t.parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .find(".current-menu-item")
                    .removeClass("current-menu-item");

                  _t.parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .addClass("current-menu-item");
                  _t.parent().parent().parent().addClass("current-menu-item");
                  _t.parent().addClass("current-menu-item");
                }
              }
            }

            if (_t && _t.hasClass("ajax-link")) {
              if ((_t && _t.hasClass("donotchange-ajax-menu")) == false) {
                quCreative_main.$theActualNav.find("li > a").each(function () {
                  var _t3 = $(this);

                  if (
                    _t3.attr("href") == thehref ||
                    _t3.attr("href") == ajax_site_url + thehref
                  ) {
                    quCreative_main.$theActualNav
                      .find("li")
                      .removeClass("current-menu-item");
                    _t3.parent().addClass("current-menu-item");
                  }
                });
              }
            }

            return false;
          }
        }
      }
    }
  }

  function change_nav_con_520(e) {
    var _t = $(this);

    var _tc = _t.find(":selected").eq(0);

    click_menu_anchor(e, { _t: _tc });
  }

  function load_new_page() {
    // -- @stack trace
    // -- click_menu_anchor()
    // -- load_new_page

    console.log('load_new_page -> ', new Date().getDate() - window.quCreative_debug_time);


    try {
      quCreative_main.videoplayers_tobe_resized = [];
    } catch (e) {
      console.log("hmm", e);
    }

    quCreative_main.goto_bg(0, {
      newpage_transition: true,
      call_from: "load_new_page",
    });
  }
}
