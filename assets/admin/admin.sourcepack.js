/* @projectDescription jQuery Serialize Anything - Serialize anything (and not just forms!)
 * @author Bramus! (Bram Van Damme)
 * @version 1.0
 * @website: http://www.bram.us/
 * @license : BSD
 */

"use strict";
import { setupSerializeAnythingRepeater} from "./js/_serializeAnythingRepeater";
import {setupDependencySettings, setupDzsCheckDependencySettings} from "./js/_checkDependencySettings";
import {setupUploader} from "./js/_uploader";
import {setupBigImage} from "./js/_bigImage";
import {setupCustomizer} from "./js/_customizer";
import {setupAdminGallery} from "./js/_adminGallery";

(function ($) {

  setupSerializeAnythingRepeater($);
})(jQuery);

setupDzsCheckDependencySettings();

jQuery(document).ready(function ($) {
  var sw_ask_before_leave = true;

  var update_image_meta_attr_inter = 0;


  // $(document).on('click.antfarmrep2', '.btn-add-repeater-field,.delete-btn', handle_mouse_repeater);
  $(document).on(
    "click.antfarmrep",
    ".btn-add-repeater-field,.repeater-btn.delete-btn",
    handle_mouse_repeater,
  );
  $(document).on(
    "change.antfarmrep",
    ".repeater-con:not(.repeater-con-for-clone) .repeater-field",
    handle_change_repeater,
  );

  setup_repeater_cons();
  setInterval(function () {}, 1000);

  // -- global
  var i = 0;
  $(document).delegate(".q-att-meta-edit-field", "keyup", handle_submit);
  $(document).on(
    "change",
    'select[name="page_template"], *[name="qucreative_meta_post_media_type"], select.q-att-meta-edit-field',
    handle_submit,
  );
  $(document).on(
    "click",
    ".ui-edit-field-close, .customize-section-back",
    handle_mouse,
  );
  $(document).on(
    "click.dzs",
    'input[name="save"],input[name="publish"]',
    function (e) {
      sw_ask_before_leave = false;
    },
  );

  setTimeout(function () {
    $(document).on(
      "change",
      ".qucreative_meta-meta-bigcon > .setting > input,.qucreative_meta-meta-bigcon > .setting, .qucreative_meta-meta-bigcon > .setting > select,.qucreative_meta-meta-bigcon > .setting .dzs-select-wrapper > select",
      function () {
        // -- this makes sure that it asks you when close window

        $(window).on("beforeunload.dzs", function () {
          if (sw_ask_before_leave) {
            return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
          }
        });
      },
    );
  }, 3000);

  function con() {
    if (sw_ask_before_leave) {
    }
  }

  $(".input-big-image").trigger("change");
  if (window.reskin_select) {
    setTimeout(reskin_select, 10);
  }

  $(document).on("click", ".install-btn", function () {
    var _t = $(this);

    var data = {
      action: "qucreative_import_demo",
      postdata: "",
      demo: _t.attr("data-demo"),
      nonce: $(".qucreative-nonce").eq(0).html(),
    };

    var _con = _t.parent().parent().parent().parent().parent().parent();

    _con.addClass("loading");
    _con.parent().addClass("loading");

    $.post(ajaxurl, data, function (response) {
      if (window.console) {
        console.log("Got this from the server: " + response);
      }

      setTimeout(function () {
        window.location.reload();
      }, 500);
    });

    return false;
  });

  setupCustomizer($);

  jQuery(document).on("change", "input[name=video]", function () {
    var _t = $(this);
  });

  setTimeout(function () {
    try {
      jQuery('*[name="qucreative_meta_post_media_type"]').trigger("change");
      jQuery("#page_template").trigger("change");
    } catch (err) {
      console.log("try to change page_template", err);
    }
  }, 500);

  setTimeout(function () {
    try {
      jQuery('*[name="qucreative_meta_post_media_type"]').trigger("change");
      jQuery("#page_template").trigger("change");
    } catch (err) {
      console.log("try to change page_template", err);
    }
  }, 2000);

  setTimeout(function () {
    try {
      jQuery("#page_template").trigger("change");
    } catch (err) {
      console.log("try to change page_template", err);
    }
  }, 4000);

  var aux = window.location.href;

  /// --- item gallery CODE


  setTimeout(function () {}, 2000);
  setTimeout(function () {
    jQuery(".iconselector-waiter").trigger("change");
  }, 3000);


  setupDependencySettings($)



  setupAdminGallery($);

  function handle_mouse_repeater(e) {
    var _t3 = $(this);

    if (e.type == "click") {
      if (_t3.hasClass("btn-add-repeater-field")) {
        add_repeater_field(_t3.parent().parent());

        repeater_generate_serialized(_t3.parent().parent());
        return false;
      }
      if (_t3.hasClass("delete-btn")) {
        var _con = _t3.parent().parent().parent().parent().remove().remove();

        repeater_generate_serialized(_con);
      }
    }
  }

  function handle_change_repeater(e) {
    var _t3 = $(this);

    if (e.type == "change") {
      if (_t3.hasClass("repeater-field")) {
        // console.info(_t3.data('repeater-con-main'));

        var _rCM = null;

        if (_t3.data("repeater-con-main")) {
          _rCM = _t3.data("repeater-con-main");
        }

        if (
          _t3
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .hasClass("repeater-main-con")
        ) {
          _rCM = _t3.parent().parent().parent().parent().parent();
        }

        if (
          _t3
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .hasClass("repeater-main-con")
        ) {
          _rCM = _t3
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent();
        }

        repeater_generate_serialized(_rCM, {
          call_from: "change_field",
        });
      }

      if (_t3.attr("data-repeater_name") == "title") {
        _t3.parent().parent().parent().find(".the-title").eq(0).html(_t3.val());
      }
    }
  }

  function repeater_generate_serialized(_argRepeaterMainCon, pargs) {
    var aux = "";

    var margs = {
      call_from: "default",
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    var arr = [];

    if (_argRepeaterMainCon) {
      _argRepeaterMainCon
        .find('.repeater-con:not(".repeater-con-for-clone")')
        .each(function () {
          var _t4 = $(this);

          var arr_aux = {};
          _t4.find("*[data-repeater_name]").each(function () {
            var _t42 = $(this);

            arr_aux[_t42.attr("data-repeater_name")] = _t42.val();
          });

          arr.push(arr_aux);
        });

      aux = JSON.stringify(arr);

      _argRepeaterMainCon.prev().val(aux);
    } else {
    }
  }

  function add_repeater_field(_arg, pargs) {
    var margs = {
      link: "#",
      title: "",
      icon: "",
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    _arg
      .find(".repeaters-con")
      .eq(0)
      .append(_arg.find(".repeater-con-for-clone").clone());
    var _cach = _arg.find(".repeaters-con").children().last();

    _cach.removeClass("repeater-con-for-clone");

    for (var lab in margs) {
      _cach.find('*[data-repeater_name="' + lab + '"]').val(margs[lab]);

      if (lab == "title") {
        _cach.find(".the-title").eq(0).html(margs[lab]);
      }
    }
  }

  function generate_repeater_cons(_repeaterMainCon, _t) {
    var aux_arr = [];

    try {
      var _inp = _repeaterMainCon.data("target-input");

      aux_arr = JSON.parse(_inp.val());

      for (var lab in aux_arr) {
        add_repeater_field(_repeaterMainCon, aux_arr[lab]);
      }
    } catch (err) {
      console.info("err in json ", err);
    }
  }

  function regenerate_repeater_cons() {
    $(".repeater-main-con").each(function () {
      var _t2 = $(this);

      generate_repeater_cons(_t2, _t2.prev());
    });
  }

  function setup_repeater_cons() {
    $(".repeater-con-target").each(function () {
      var _t = $(this);

      var _repeaterMainCon = null;

      if (_t.hasClass("setuped")) {
        return;
      }

      _t.addClass("setuped");

      if (_t.next().hasClass("repeater-main-con")) {
        _repeaterMainCon = _t.next();
      }

      _t.next().data("target-input", _t);

      if (_repeaterMainCon.data("setuped") == "on") {
        return;
      }

      if (
        _t
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass("widgets-holder-wrap")
      ) {
      }
      if (
        _t
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass("widgets-holder-wrap") == false
      ) {
        return;
      }

      var _repeaterTarget = _t;

      var _repeaterCons = null;

      var inter_change_dom = 0;
      if (_repeaterMainCon) {
        _repeaterCons = _repeaterMainCon.find(".repeaters-con").eq(0);

        if ($.fn.sortable) {
          _repeaterCons.sortable({
            items: ".repeater-con",
            handle: ".move-btn",
            scrollSensitivity: 100,
            forcePlaceholderSize: true,
            forceHelperSize: false,
            helper: "clone",
            opacity: 0.7,
            placeholder: "repeater-con-placeholder",
            update: function (event, ui) {
              // console.info(this);

              var _t = $(this);

              if (_t.parent().hasClass("repeater-main-con")) {
                repeater_generate_serialized(_t.parent());
              }

              if (_t.parent().parent().hasClass("repeater-main-con")) {
                repeater_generate_serialized(_t.parent().parent());
              }
            },
          });
        } else {
          console.warn("please include sortable");
        }

        if (_t.parent().parent().hasClass("widget-content")) {
          _t.parent()
            .parent()
            .on("DOMNodeInserted DOMNodeRemoved", function () {
              if (_t.val() != "[]") {
                if (_repeaterMainCon.find(".repeater-con").length == 1) {
                  regenerate_repeater_cons();
                }
              }
              setTimeout(function () {}, 500);
            });
        }
      }

      _repeaterMainCon.addClass("setuped");
      _repeaterMainCon.data("setuped", "on");
      generate_repeater_cons(_repeaterMainCon);
    });
  }


  /// -- item gallery CODE END

  function click_ahtml() {
    $("#wp-content-wrap").removeClass("builder-active");
  }

  function click_atmce() {
    $("#wp-content-wrap").removeClass("builder-active");
  }

  function click_builder_initer() {
    $("#wp-content-wrap")
      .removeClass("tmce-active")
      .removeClass("html-active")
      .addClass("builder-active");
  }

  function update_image_meta_attr(_arg) {
    var _con = null;

    if (_arg.parent().parent().hasClass("ui-edit-field")) {
      _con = _arg.parent().parent();
    }

    var mainarray = {};

    mainarray.id = _con.find('*[name="qucreative_meta_post_id"]').val();
    mainarray.post_excerpt = _con
      .find('*[name="qucreative_meta_post_excerpt"]')
      .val();
    mainarray.post_content = _con
      .find('*[name="qucreative_meta_post_content"]')
      .val();
    mainarray.meta_att_aligment = _con
      .find('*[name="qucreative_meta_att_aligment"]')
      .val();
    mainarray.meta_att_video = _con
      .find('*[name="qucreative_meta_att_video"]')
      .val();
    mainarray.qucreative_meta_att_enable_video_cover = _con
      .find('*[name="qucreative_meta_att_enable_video_cover"]')
      .val();

    mainarray = JSON.stringify(mainarray);

    var data = {
      action: "qucreative_save_att_meta",
      postdata: mainarray,
    };

    jQuery.post(ajaxurl, data, function (response) {
      if (window.console != undefined) {
        console.log("Got this from the server: " + response);
      }
    });
  }

  function handle_mouse(e) {
    var _t = $(this);

    if (e.type == "click") {
      if (_t.hasClass("ui-edit-field-close")) {
        _t.parent().parent().removeClass("edit-field-active");
      }
      if (_t.hasClass("customize-section-back")) {
        var _c = $(".typography-tabs").eq(0);

        if (_c.length) {
          if (_c.get(0) && _c.get(0).api_goto_tab) {
            _c.find(".tab-menu-con.active .tab-menu").trigger("click");
          }
        }
      }

    }
  }

  function handle_submit(e) {
    var _t = $(this);

    if (e.type == "keyup" || e.type == "change") {
      if (_t.hasClass("q-att-meta-edit-field")) {
        clearTimeout(update_image_meta_attr_inter);

        update_image_meta_attr_inter = setTimeout(function () {
          update_image_meta_attr(_t);
        }, 1000);
      }
    }

    if (e.type == "change") {
      if (_t.attr("name") == "page_template") {
        if (
          _t.val() == "template-qucreative-slider.php" ||
          _t.val() == "template-gallery-creative.php"
        ) {
        } else {
          if (
            $('*[name="qucreative_meta_post_media_type"]').eq(0).val() !=
            "slider"
          ) {
          }
        }

        var aux = _t.val();

        aux = aux.replace(".php", "");

        $("body").removeClass(
          "selected-default selected-template-qucreative-slider selected-template-portfolio selected-template-gallery-creative",
        );

        $("body").addClass("selected-" + aux);
      }

      if (String(_t.attr("name")) == "qucreative_meta_post_media_type") {
        if (_t.parent().parent().hasClass("con-type-receiver")) {
          var _con = _t.parent().parent();

          _con.removeClass(
            "type-image type-video type-vimeo type-youtube type-slider",
          );

          _con.addClass("type-" + _t.val());
        }

        if (
          $('*[name="page_template"]').eq(0).val() !=
          "template-qucreative-slider.php"
        ) {
          $("body").removeClass(
            "selected-media-type-image selected-media-type-video selected-media-type-youtube selected-media-type-vimeo selected-media-type-slider ",
          );

          $("body").addClass("selected-media-type-" + _t.val());
        }
      }
    }
  }



  setupBigImage($);
  setupUploader($);

  jQuery(document).on("widget-updated", function (e, widget) {
    // -- do your awesome stuff here

    setTimeout(function () {
      dzssel_init("select.dzs-style-me", { init_each: true });
    }, 2);
    setTimeout(function () {
      setup_repeater_cons();
    }, 100);
    setTimeout(function () {
      jQuery(".iconselector-waiter").trigger("change");
    }, 200);
    // -- "widget" represents jQuery object of the affected widget's DOM element
  });
});

function dzstln_mainoptions_ready() {
  jQuery(".dzstln-save-mainoptions").bind("click", dzstln_mo_saveall);
  jQuery(".saveconfirmer").fadeOut("slow");
}



function dzstln_mo_saveall() {
  jQuery("#save-ajax-loading").css("visibility", "visible");
  var mainarray = jQuery(".mainsettings").serialize();
  var data = {
    action: "dzstln_ajax_mo",
    postdata: mainarray,
  };
  jQuery(".saveconfirmer").html("Options saved.");
  jQuery(".saveconfirmer").fadeIn("fast").delay(2000).fadeOut("fast");
  jQuery.post(ajaxurl, data, function (response) {
    if (window.console != undefined) {
      console.log("Got this from the server: " + response);
    }
    jQuery("#save-ajax-loading").css("visibility", "hidden");
  });

  return false;
}


function reskin_select() {
  for (var i = 0; i < jQuery("select").length; i++) {
    var $cache = jQuery("select").eq(i);

    if (
      $cache.hasClass("styleme") == false ||
      $cache.parent().hasClass("select_wrapper") ||
      $cache.parent().hasClass("select-wrapper")
    ) {
      continue;
    }
    var sel = $cache.find(":selected");
    $cache.wrap('<div class="select-wrapper"></div>');
    $cache.parent().prepend("<span>" + sel.text() + "</span>");
  }
  jQuery(document).undelegate(".select-wrapper select", "change");
  jQuery(document).delegate(".select-wrapper select", "change", change_select);

  function change_select() {
    var selval = jQuery(this).find(":selected").text();
    jQuery(this).parent().children("span").text(selval);
  }
}

;

;
