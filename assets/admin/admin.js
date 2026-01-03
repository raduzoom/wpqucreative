(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupAdminGallery=void 0,window.click_add_gallery_item=function(e){var t=jQuery(this),i=wp.media.frames.downloadable_file=wp.media({title:"Add Images to Item Gallery",button:{text:"Add to gallery"},multiple:!0});return i.on("select",function(){var e=i.state().get("selection"),a=null;t.parent().children(".dzs_item_gallery_list").length>0&&(a=t.parent().children(".dzs_item_gallery_list").eq(0)),e=e.toJSON();for(var l=0;l<e.length;l++){var d=e[l];void 0!=d.id&&(a&&a.append('<li class="item-element" data-id="'+d.id+'"><img class="the-image" src="'+d.url+'"/><div class="ui-delete"></div><div class="ui-edit">'+window.qucreative_settings.lang_edit+'</div><div class="ui-edit-field"><div class="ui-edit-field-close"><i class="fa fa-times-circle"></i></div> <input type="hidden" name="qucreative_meta_post_id" value="'+d.id+'"/> <div class="setting"> <h5>'+window.qucreative_settings.lang_title+'</h5> <input class="q-att-meta-edit-field" type="text" name="qucreative_meta_post_excerpt" value="'+d.caption+'"/> </div> <div class="setting"> <h5>'+window.qucreative_settings.lang_description+'</h5> <textarea class="q-att-meta-edit-field" type="text" name="qucreative_meta_post_content">'+d.description+'</textarea> </div> <div class="setting"> <h5>'+window.qucreative_settings.lang_aligment+'</h5> <select name="qucreative_meta_att_aligment" class="q-att-meta-edit-field"><option value="right" selected>'+window.qucreative_settings.lang_right+'</option><option value="left">'+window.qucreative_settings.lang_left+'</option></select> </div> <div class="setting"> <h5>Attached Video</h5> <input class="q-att-meta-edit-field" type="text" name="qucreative_meta_att_video" value=""/> </div> <div class="setting"> <h5>Enable Video Cover</h5> <select name="qucreative_meta_att_enable_video_cover" class="q-att-meta-edit-field"><option value="off">Off</option><option value="on">On</option></select> </div> </div> </div></li>'))}window.update_dzs_item_gallery_metafield(a)}),i.open(),!1};const setupAdminGallery=function(e){function t(){var t=e(this),i=t.parent().parent();t.parent().remove(),window.update_dzs_item_gallery_metafield(i)}function i(){var t=e(this),i=t.parent();i.parent().children().removeClass("edit-field-active"),i.addClass("edit-field-active")}var a=e(".dzs_item_gallery_list");e(".dzs-add-gallery-item").unbind("click",window.click_add_gallery_item),e(".dzs-add-gallery-item").bind("click",window.click_add_gallery_item),e(document).undelegate("li .ui-delete","click"),e(document).delegate("li .ui-delete","click",t),e(document).undelegate("li .ui-edit","click"),e(document).delegate("li .ui-edit","click",i),e.fn.sortable?a.each(function(){var t=e(this);0==t.hasClass("ui-sortable")&&t.sortable({items:"li",handle:".the-handler",scrollSensitivity:50,forcePlaceholderSize:!0,forceHelperSize:!1,helper:"clone",opacity:.7,placeholder:"dzs_item_gallery_list-placeholder",update:function(t,i){console.info(this),window.update_dzs_item_gallery_metafield(e(this))}})}):console.warn("please include sortable")};exports.setupAdminGallery=setupAdminGallery,window.update_dzs_item_gallery_metafield=function(e){console.info("update_dzs_item_gallery_metafield",e);var t=null;e&&e.parent&&e.parent().children("input[name*=image_gallery]").length>0&&(t=e.parent().children("input[name*=image_gallery]").eq(0)),t&&t.val("");var i="",a=0;e&&e.children&&e.children().each(function(){var e=jQuery(this);a>0&&(i+=","),i+=e.attr("data-id"),a++}),t&&t.val(i)};
},{}],2:[function(require,module,exports){
/* @projectDescription jQuery Serialize Anything - Serialize anything (and not just forms!)
 * @author Bramus! (Bram Van Damme)
 * @version 1.0
 * @website: http://www.bram.us/
 * @license : BSD
 */

"use strict";

var _checkDependencySettings = require("./js/_checkDependencySettings");
var _bigImage = require("./js/_bigImage");
var _customizer = require("./js/_customizer");
var _adminGallery = require("../../../../plugins/qu-extend/assets/admin/js/_adminGallery");
(0, _checkDependencySettings.setupDzsCheckDependencySettings)();
jQuery(document).ready(function ($) {
  let isAskBeforeLeave = true;
  setInterval(function () {}, 1000);

  // -- global
  var i = 0;
  $(document).on("click", ".ui-edit-field-close", handle_mouse);
  $(document).on("click.dzs", 'input[name="save"],input[name="publish"]', function (e) {
    isAskBeforeLeave = false;
  });
  setTimeout(function () {
    $(document).on("change", ".qucreative_meta-meta-bigcon > .setting > input,.qucreative_meta-meta-bigcon > .setting, .qucreative_meta-meta-bigcon > .setting > select,.qucreative_meta-meta-bigcon > .setting .dzs-select-wrapper > select", function () {
      // -- this makes sure that it asks you when close window

      $(window).on("beforeunload.dzs", function () {
        if (isAskBeforeLeave) {
          return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
        }
      });
    });
  }, 3000);
  $(".input-big-image").trigger("change");
  if (window.reskin_select) {
    setTimeout(reskin_select, 10);
  }
  (0, _customizer.setupCustomizer)($);
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
  (0, _checkDependencySettings.setupDependencySettings)($);

  /// -- item gallery CODE END

  function handle_mouse(e) {
    var _t = $(this);
    if (e.type == "click") {
      if (_t.hasClass("ui-edit-field-close")) {
        _t.parent().parent().removeClass("edit-field-active");
      }
    }
  }
  (0, _bigImage.setupBigImage)($);
  jQuery(document).on("widget-updated", function (e, widget) {
    // -- do your awesome stuff here

    setTimeout(function () {
      dzssel_init("select.dzs-style-me", {
        init_each: true
      });
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
    if ($cache.hasClass("styleme") == false || $cache.parent().hasClass("select_wrapper") || $cache.parent().hasClass("select-wrapper")) {
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

},{"../../../../plugins/qu-extend/assets/admin/js/_adminGallery":1,"./js/_bigImage":3,"./js/_checkDependencySettings":4,"./js/_customizer":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupBigImage = void 0;
/**
 *
 * @param {jQuery} thejQuery
 */
const setupBigImage = $ => {
  $(document).delegate(".input-big-image", "change", change_big_image);
  function change_big_image() {
    var _t = $(this);
    var _it = _t.parent();
    var val = _t.val();

    //console.log(_t, val);
    if (val != undefined && val != "") {
      _it.find(".dzs-img-preview-con").eq(0).fadeIn("slow");
      _it.find(".dzs-img-preview").eq(0).css({
        "background-image": "url(" + val + ")"
      });
    } else {
      _it.find(".dzs-img-preview-con").eq(0).fadeOut("slow");
    }
  }
};
exports.setupBigImage = setupBigImage;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupDzsCheckDependencySettings = exports.setupDependencySettings = void 0;
const setupDzsCheckDependencySettings = () => {
  window.dzs_check_dependency_settings = function () {
    var $ = jQuery;
    var margs = {
      target_attribute: "name"
    };
    $("*[data-dependency]").each(function () {
      var _t = $(this);
      var str_dependency = _t.attr("data-dependency");
      str_dependency = str_dependency.replace(/{{quot}}/g, '"');
      str_dependency = str_dependency.replace(/{quot}/g, '"');
      var dep_arr = [];
      try {
        dep_arr = JSON.parse(str_dependency);
        if (dep_arr[0]) {
          var _c = null;
          var target_attribute = margs.target_attribute;
          var target_con = $(document);
          if (_t.hasClass("check-label")) {
            target_attribute = "data-label";
          }
          if (_t.hasClass("check-customize-setting-link")) {
            target_attribute = "data-customize-setting-link";
          }
          if (_t.hasClass("check-parent1")) {
            target_con = _t.parent();
          }
          if (_t.hasClass("check-parent2")) {
            target_con = _t.parent().parent();
          }
          if (_t.hasClass("check-parent3")) {
            target_con = _t.parent().parent().parent();
          }
          if (dep_arr[0].lab) {
            _c = target_con.find("*[" + target_attribute + '="' + dep_arr[0].lab + '"]:not(.fake-input)').eq(0);
          }
          if (dep_arr[0].label) {
            _c = target_con.find("*[" + target_attribute + '="' + dep_arr[0].label + '"]:not(.fake-input)').eq(0);
          }
          if (dep_arr[0].element) {
            _c = target_con.find("*[" + target_attribute + '="' + dep_arr[0].element + '"]:not(.fake-input)').eq(0);
          }
          if (_c) {
            var cval = _c.val();
            var sw_show = false;
            if (dep_arr[0].val) {
              for (var i3 in dep_arr[0].val) {
                if (_c.val() == dep_arr[0].val[i3]) {
                  if (_c.attr("type") == "checkbox") {
                    if (_c.val() == dep_arr[0].val[i3] && _c.prop("checked")) {
                      sw_show = true;
                    }
                  } else {
                    sw_show = true;
                  }
                }
              }
            }
            if (dep_arr.relation) {
              for (var i in dep_arr) {
                if (i == "relation") {
                  continue;
                }
                if (dep_arr[i].lab) {
                  _c = target_con.find("*[" + target_attribute + '="' + dep_arr[i].lab + '"]:not(.fake-input)').eq(0);
                }
                if (dep_arr[i].label) {
                  _c = target_con.find("*[" + target_attribute + '="' + dep_arr[i].label + '"]:not(.fake-input)').eq(0);
                }
                if (dep_arr[i].element) {
                  _c = target_con.find("*[" + target_attribute + '="' + dep_arr[i].element + '"]:not(.fake-input)').eq(0);
                }
                if (dep_arr[i].value) {
                  if (dep_arr.relation == "AND") {
                    sw_show = false;
                  }
                  if (dep_arr[0].element) {
                    _c = target_con.find("*[" + target_attribute + '="' + dep_arr[i].element + '"]:not(.fake-input)').eq(0);
                  }
                  for (var i3 in dep_arr[i].value) {
                    if (_c.val() == dep_arr[i].value[i3]) {
                      if (_c.attr("type") == "checkbox") {
                        if (_c.val() == dep_arr[i].value[i3] && _c.prop("checked")) {
                          sw_show = true;
                        }
                      } else {
                        sw_show = true;
                      }
                      break;
                    }
                    if (dep_arr[i].value[i3] == "anything_but_blank" && cval) {
                      sw_show = true;
                      break;
                    }
                  }
                  if (dep_arr.relation == "AND") {
                    if (sw_show == false) {
                      break;
                    }
                  }
                }
              }
            } else {
              if (dep_arr[0].value) {
                for (var i3 in dep_arr[0].value) {
                  if (_c.val() == dep_arr[0].value[i3]) {
                    if (_c.attr("type") == "checkbox") {
                      if (_c.val() == dep_arr[0].value[i3] && _c.prop("checked")) {
                        sw_show = true;
                      }
                    } else {
                      sw_show = true;
                    }
                    break;
                  }
                  if (dep_arr[0].value[i3] == "anything_but_blank" && cval) {
                    sw_show = true;
                    break;
                  }
                }
              }
            }
            if (sw_show) {
              _t.show();
            } else {
              _t.hide();
            }
          }
        }
      } catch (err) {
        console.error("json dependency error - ", str_dependency);
        console.error(err);
      }
    });
  };
};
exports.setupDzsCheckDependencySettings = setupDzsCheckDependencySettings;
const setupDependencySettings = function ($) {
  setTimeout(function () {
    $(".dzs-dependency-field,*[name=zfolio-mode]").trigger("change");
  }, 1000);
  $(document).on("change.dzsdepe", '.customize-control select, .dzs-dependency-field,*[name="0-settings-vpconfig"],.wpb_vc_param_value[name=skin],*[name=zfolio-mode],*[name="qucreative_meta_port_open_custom_link_sw"]', handle_change);
  function handle_change(e) {
    var _t = $(this);
    if (_t.attr("data-customize-setting-link") || _t.hasClass("dzs-dependency-field") || _t.attr("name") == "zfolio-mode" || _t.attr("name") == "skin" || _t.attr("name") == "qucreative_meta_port_open_custom_link_sw") {
      dzs_check_dependency_settings();
    }
    if (_t.attr("name") == "0-settings-vpconfig") {
      var ind = 0;
      _t.children().each(function () {
        var _t2 = $(this);

        // console.info(_t2);
        if (_t2.prop("selected")) {
          ind = _t2.parent().children().index(_t2) - 1;
          return false;
        }
      });
      $("#quick-edit").attr("href", add_query_arg($("#quick-edit").attr("href"), "currslider", ind));
    }
  }
};
exports.setupDependencySettings = setupDependencySettings;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupCustomizer=void 0;const setupCustomizer=function(e){e(document).delegate('.customize-control-checkbox-multiple input[type="checkbox"]',"change",function(){console.info(this);var t=e(this).parents(".customize-control").find('input[type="checkbox"]:checked').map(function(){return this.value}).get().join(",");console.info(e(this).parents(".customize-control").find('input[type="hidden"]')),e(this).parents(".customize-control").find('input[type="hidden"]').val(t).trigger("change")})};exports.setupCustomizer=setupCustomizer;
},{}]},{},[2])


//# sourceMappingURL=admin.js.map