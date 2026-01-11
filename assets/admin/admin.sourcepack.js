/* @projectDescription jQuery Serialize Anything - Serialize anything (and not just forms!)
 * @author Bramus! (Bram Van Damme)
 * @version 1.0
 * @website: http://www.bram.us/
 * @license : BSD
 */

"use strict";
import {setupDependencySettings, setupDzsCheckDependencySettings} from "../../../../plugins/qu-extend/inc/features/admin/features/_checkDependencySettings";
import {setupCustomizer} from "../../../../plugins/qu-extend/inc/features/admin/features/_customizer";



jQuery(document).ready(function ($) {





  $(".input-big-image").trigger("change");




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


  setTimeout(function () {
    jQuery(".iconselector-waiter").trigger("change");
  }, 3000);














  /// -- item gallery CODE END



  function handle_mouse(e) {
    var _t = $(this);

    if (e.type == "click") {
      if (_t.hasClass("ui-edit-field-close")) {
        _t.parent().parent().removeClass("edit-field-active");
      }
    }
  }




});







;

;
