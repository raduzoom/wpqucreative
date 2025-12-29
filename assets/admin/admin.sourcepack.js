/* @projectDescription jQuery Serialize Anything - Serialize anything (and not just forms!)
 * @author Bramus! (Bram Van Damme)
 * @version 1.0
 * @website: http://www.bram.us/
 * @license : BSD
 */

"use strict";
import { setupSerializeAnythingRepeater} from "./js/_serializeAnythingRepeater";
import {setupDependencySettings, setupDzsCheckDependencySettings} from "./js/_checkDependencySettings";
import {setupUploader} from "../../../../plugins/qu-extend/assets/admin/js/_uploader";
import {setupBigImage} from "./js/_bigImage";
import {setupCustomizer} from "./js/_customizer";
import {setupAdminGallery} from "./js/_adminGallery";
import {setupRepeater2} from "../../../../plugins/qu-extend/assets/admin/js/_repeater-2";

(function ($) {

  setupSerializeAnythingRepeater($);
})(jQuery);

setupDzsCheckDependencySettings();

jQuery(document).ready(function ($) {
  let isAskBeforeLeave = true;

  var update_image_meta_attr_inter = 0;



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
    ".ui-edit-field-close",
    handle_mouse,
  );
  $(document).on(
    "click.dzs",
    'input[name="save"],input[name="publish"]',
    function (e) {
      isAskBeforeLeave = false;
    },
  );

  setTimeout(function () {
    $(document).on(
      "change",
      ".qucreative_meta-meta-bigcon > .setting > input,.qucreative_meta-meta-bigcon > .setting, .qucreative_meta-meta-bigcon > .setting > select,.qucreative_meta-meta-bigcon > .setting .dzs-select-wrapper > select",
      function () {
        // -- this makes sure that it asks you when close window

        $(window).on("beforeunload.dzs", function () {
          if (isAskBeforeLeave) {
            return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
          }
        });
      },
    );
  }, 3000);



  $(".input-big-image").trigger("change");
  if (window.reskin_select) {
    setTimeout(reskin_select, 10);
  }


  setupCustomizer($);


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









  /// -- item gallery CODE END


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

  jQuery(document).on("widget-updated", function (e, widget) {
    // -- do your awesome stuff here

    setTimeout(function () {
      dzssel_init("select.dzs-style-me", { init_each: true });
    }, 2);
    setTimeout(function () {
      jQuery(".iconselector-waiter").trigger("change");
    }, 200);
    // -- "widget" represents jQuery object of the affected widget's DOM element
  });
});






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
