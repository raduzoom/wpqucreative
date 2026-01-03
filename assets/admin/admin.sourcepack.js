/* @projectDescription jQuery Serialize Anything - Serialize anything (and not just forms!)
 * @author Bramus! (Bram Van Damme)
 * @version 1.0
 * @website: http://www.bram.us/
 * @license : BSD
 */

"use strict";
import {setupDependencySettings, setupDzsCheckDependencySettings} from "./js/_checkDependencySettings";
import {setupBigImage} from "./js/_bigImage";
import {setupCustomizer} from "./js/_customizer";
import {setupAdminGallery} from "../../../../plugins/qu-extend/assets/admin/js/_adminGallery";


setupDzsCheckDependencySettings();

jQuery(document).ready(function ($) {
  let isAskBeforeLeave = true;




  setInterval(function () {}, 1000);

  // -- global
  var i = 0;
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












  /// -- item gallery CODE END



  function handle_mouse(e) {
    var _t = $(this);

    if (e.type == "click") {
      if (_t.hasClass("ui-edit-field-close")) {
        _t.parent().parent().removeClass("edit-field-active");
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
