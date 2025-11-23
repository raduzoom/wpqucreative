(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function dzstln_mainoptions_ready(){jQuery(".dzstln-save-mainoptions").bind("click",dzstln_mo_saveall),jQuery(".saveconfirmer").fadeOut("slow")}function dzstln_mo_saveall(){jQuery("#save-ajax-loading").css("visibility","visible");var e=jQuery(".mainsettings").serialize(),t={action:"dzstln_ajax_mo",postdata:e};return jQuery(".saveconfirmer").html("Options saved."),jQuery(".saveconfirmer").fadeIn("fast").delay(2e3).fadeOut("fast"),jQuery.post(ajaxurl,t,function(e){void 0!=window.console&&console.log("Got this from the server: "+e),jQuery("#save-ajax-loading").css("visibility","hidden")}),!1}function reskin_select(){function e(){var e=jQuery(this).find(":selected").text();jQuery(this).parent().children("span").text(e)}for(var t=0;t<jQuery("select").length;t++){var a=jQuery("select").eq(t);if(0!=a.hasClass("styleme")&&!a.parent().hasClass("select_wrapper")&&!a.parent().hasClass("select-wrapper")){var n=a.find(":selected");a.wrap('<div class="select-wrapper"></div>'),a.parent().prepend("<span>"+n.text()+"</span>")}}jQuery(document).undelegate(".select-wrapper select","change"),jQuery(document).delegate(".select-wrapper select","change",e)}var _serializeAnythingRepeater=require("./js/_serializeAnythingRepeater"),_checkDependencySettings=require("./js/_checkDependencySettings"),_uploader=require("./js/_uploader"),_bigImage=require("./js/_bigImage"),_customizer=require("./js/_customizer"),_adminGallery=require("./js/_adminGallery");!function(e){(0,_serializeAnythingRepeater.setupSerializeAnythingRepeater)(e)}(jQuery),(0,_checkDependencySettings.setupDzsCheckDependencySettings)(),jQuery(document).ready(function(e){function t(t){var a=e(this);if("click"==t.type){if(a.hasClass("btn-add-repeater-field"))return r(a.parent().parent()),n(a.parent().parent()),!1;if(a.hasClass("delete-btn")){n(a.parent().parent().parent().parent().remove().remove())}}}function a(t){var a=e(this);if("change"==t.type){if(a.hasClass("repeater-field")){var r=null;a.data("repeater-con-main")&&(r=a.data("repeater-con-main")),a.parent().parent().parent().parent().parent().hasClass("repeater-main-con")&&(r=a.parent().parent().parent().parent().parent()),a.parent().parent().parent().parent().parent().parent().parent().hasClass("repeater-main-con")&&(r=a.parent().parent().parent().parent().parent().parent().parent()),n(r,{call_from:"change_field"})}"title"==a.attr("data-repeater_name")&&a.parent().parent().parent().find(".the-title").eq(0).html(a.val())}}function n(t,a){var n="",r={call_from:"default"};a&&(r=e.extend(r,a));var i=[];t&&(t.find('.repeater-con:not(".repeater-con-for-clone")').each(function(){var t=e(this),a={};t.find("*[data-repeater_name]").each(function(){var t=e(this);a[t.attr("data-repeater_name")]=t.val()}),i.push(a)}),n=JSON.stringify(i),t.prev().val(n))}function r(t,a){var n={link:"#",title:"",icon:""};a&&(n=e.extend(n,a)),t.find(".repeaters-con").eq(0).append(t.find(".repeater-con-for-clone").clone());var r=t.find(".repeaters-con").children().last();r.removeClass("repeater-con-for-clone");for(var i in n)r.find('*[data-repeater_name="'+i+'"]').val(n[i]),"title"==i&&r.find(".the-title").eq(0).html(n[i])}function i(e,t){var a=[];try{var n=e.data("target-input");a=JSON.parse(n.val());for(var i in a)r(e,a[i])}catch(e){console.info("err in json ",e)}}function o(){e(".repeater-main-con").each(function(){var t=e(this);i(t,t.prev())})}function s(){e(".repeater-con-target").each(function(){var t=e(this),a=null;if(!t.hasClass("setuped")&&(t.addClass("setuped"),t.next().hasClass("repeater-main-con")&&(a=t.next()),t.next().data("target-input",t),"on"!=a.data("setuped")&&(t.parent().parent().parent().parent().parent().parent().parent().hasClass("widgets-holder-wrap"),0!=t.parent().parent().parent().parent().parent().parent().parent().hasClass("widgets-holder-wrap")))){var r=null;a&&(r=a.find(".repeaters-con").eq(0),e.fn.sortable?r.sortable({items:".repeater-con",handle:".move-btn",scrollSensitivity:100,forcePlaceholderSize:!0,forceHelperSize:!1,helper:"clone",opacity:.7,placeholder:"repeater-con-placeholder",update:function(t,a){var r=e(this);r.parent().hasClass("repeater-main-con")&&n(r.parent()),r.parent().parent().hasClass("repeater-main-con")&&n(r.parent().parent())}}):console.warn("please include sortable"),t.parent().parent().hasClass("widget-content")&&t.parent().parent().on("DOMNodeInserted DOMNodeRemoved",function(){"[]"!=t.val()&&1==a.find(".repeater-con").length&&o(),setTimeout(function(){},500)})),a.addClass("setuped"),a.data("setuped","on"),i(a)}})}function c(e){var t=null;e.parent().parent().hasClass("ui-edit-field")&&(t=e.parent().parent());var a={};a.id=t.find('*[name="qucreative_meta_post_id"]').val(),a.post_excerpt=t.find('*[name="qucreative_meta_post_excerpt"]').val(),a.post_content=t.find('*[name="qucreative_meta_post_content"]').val(),a.meta_att_aligment=t.find('*[name="qucreative_meta_att_aligment"]').val(),a.meta_att_video=t.find('*[name="qucreative_meta_att_video"]').val(),a.qucreative_meta_att_enable_video_cover=t.find('*[name="qucreative_meta_att_enable_video_cover"]').val(),a=JSON.stringify(a);var n={action:"qucreative_save_att_meta",postdata:a};jQuery.post(ajaxurl,n,function(e){void 0!=window.console&&console.log("Got this from the server: "+e)})}function l(t){var a=e(this);if("click"==t.type&&(a.hasClass("ui-edit-field-close")&&a.parent().parent().removeClass("edit-field-active"),a.hasClass("customize-section-back"))){var n=e(".typography-tabs").eq(0);n.length&&n.get(0)&&n.get(0).api_goto_tab&&n.find(".tab-menu-con.active .tab-menu").trigger("click")}}function p(t){var a=e(this);if("keyup"!=t.type&&"change"!=t.type||a.hasClass("q-att-meta-edit-field")&&(clearTimeout(u),u=setTimeout(function(){c(a)},1e3)),"change"==t.type){if("page_template"==a.attr("name")){"template-qucreative-slider.php"==a.val()||"template-gallery-creative.php"==a.val()||e('*[name="qucreative_meta_post_media_type"]').eq(0).val();var n=a.val();n=n.replace(".php",""),e("body").removeClass("selected-default selected-template-qucreative-slider selected-template-portfolio selected-template-gallery-creative"),e("body").addClass("selected-"+n)}if("qucreative_meta_post_media_type"==String(a.attr("name"))){if(a.parent().parent().hasClass("con-type-receiver")){var r=a.parent().parent();r.removeClass("type-image type-video type-vimeo type-youtube type-slider"),r.addClass("type-"+a.val())}"template-qucreative-slider.php"!=e('*[name="page_template"]').eq(0).val()&&(e("body").removeClass("selected-media-type-image selected-media-type-video selected-media-type-youtube selected-media-type-vimeo selected-media-type-slider "),e("body").addClass("selected-media-type-"+a.val()))}}}var d=!0,u=0;e(document).on("click.antfarmrep",".btn-add-repeater-field,.repeater-btn.delete-btn",t),e(document).on("change.antfarmrep",".repeater-con:not(.repeater-con-for-clone) .repeater-field",a),s(),setInterval(function(){},1e3);e(document).delegate(".q-att-meta-edit-field","keyup",p),e(document).on("change",'select[name="page_template"], *[name="qucreative_meta_post_media_type"], select.q-att-meta-edit-field',p),e(document).on("click",".ui-edit-field-close, .customize-section-back",l),e(document).on("click.dzs",'input[name="save"],input[name="publish"]',function(e){d=!1}),setTimeout(function(){e(document).on("change",".qucreative_meta-meta-bigcon > .setting > input,.qucreative_meta-meta-bigcon > .setting, .qucreative_meta-meta-bigcon > .setting > select,.qucreative_meta-meta-bigcon > .setting .dzs-select-wrapper > select",function(){e(window).on("beforeunload.dzs",function(){if(d)return"You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?"})})},3e3),e(".input-big-image").trigger("change"),window.reskin_select&&setTimeout(reskin_select,10),e(document).on("click",".install-btn",function(){var t=e(this),a={action:"qucreative_import_demo",postdata:"",demo:t.attr("data-demo"),nonce:e(".qucreative-nonce").eq(0).html()},n=t.parent().parent().parent().parent().parent().parent();return n.addClass("loading"),n.parent().addClass("loading"),e.post(ajaxurl,a,function(e){window.console&&console.log("Got this from the server: "+e),setTimeout(function(){window.location.reload()},500)}),!1}),(0,_customizer.setupCustomizer)(e),jQuery(document).on("change","input[name=video]",function(){e(this)}),setTimeout(function(){try{jQuery('*[name="qucreative_meta_post_media_type"]').trigger("change"),jQuery("#page_template").trigger("change")}catch(e){console.log("try to change page_template",e)}},500),setTimeout(function(){try{jQuery('*[name="qucreative_meta_post_media_type"]').trigger("change"),jQuery("#page_template").trigger("change")}catch(e){console.log("try to change page_template",e)}},2e3),setTimeout(function(){try{jQuery("#page_template").trigger("change")}catch(e){console.log("try to change page_template",e)}},4e3);window.location.href;setTimeout(function(){},2e3),setTimeout(function(){jQuery(".iconselector-waiter").trigger("change")},3e3),(0,_checkDependencySettings.setupDependencySettings)(e),(0,_adminGallery.setupAdminGallery)(e),(0,_bigImage.setupBigImage)(e),(0,_uploader.setupUploader)(e),jQuery(document).on("widget-updated",function(e,t){setTimeout(function(){dzssel_init("select.dzs-style-me",{init_each:!0})},2),setTimeout(function(){s()},100),setTimeout(function(){jQuery(".iconselector-waiter").trigger("change")},200)})});
},{"./js/_adminGallery":2,"./js/_bigImage":3,"./js/_checkDependencySettings":4,"./js/_customizer":5,"./js/_serializeAnythingRepeater":6,"./js/_uploader":7}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupAdminGallery=void 0,window.click_add_gallery_item=function(e){var t=jQuery(this),i=wp.media.frames.downloadable_file=wp.media({title:"Add Images to Item Gallery",button:{text:"Add to gallery"},multiple:!0});return i.on("select",function(){var e=i.state().get("selection"),a=null;t.parent().children(".dzs_item_gallery_list").length>0&&(a=t.parent().children(".dzs_item_gallery_list").eq(0)),e=e.toJSON();for(var l=0;l<e.length;l++){var d=e[l];void 0!=d.id&&(a&&a.append('<li class="item-element" data-id="'+d.id+'"><img class="the-image" src="'+d.url+'"/><div class="ui-delete"></div><div class="ui-edit">'+window.qucreative_settings.lang_edit+'</div><div class="ui-edit-field"><div class="ui-edit-field-close"><i class="fa fa-times-circle"></i></div> <input type="hidden" name="qucreative_meta_post_id" value="'+d.id+'"/> <div class="setting"> <h5>'+window.qucreative_settings.lang_title+'</h5> <input class="q-att-meta-edit-field" type="text" name="qucreative_meta_post_excerpt" value="'+d.caption+'"/> </div> <div class="setting"> <h5>'+window.qucreative_settings.lang_description+'</h5> <textarea class="q-att-meta-edit-field" type="text" name="qucreative_meta_post_content">'+d.description+'</textarea> </div> <div class="setting"> <h5>'+window.qucreative_settings.lang_aligment+'</h5> <select name="qucreative_meta_att_aligment" class="q-att-meta-edit-field"><option value="right" selected>'+window.qucreative_settings.lang_right+'</option><option value="left">'+window.qucreative_settings.lang_left+'</option></select> </div> <div class="setting"> <h5>Attached Video</h5> <input class="q-att-meta-edit-field" type="text" name="qucreative_meta_att_video" value=""/> </div> <div class="setting"> <h5>Enable Video Cover</h5> <select name="qucreative_meta_att_enable_video_cover" class="q-att-meta-edit-field"><option value="off">Off</option><option value="on">On</option></select> </div> </div> </div></li>'))}window.update_dzs_item_gallery_metafield(a)}),i.open(),!1};const setupAdminGallery=function(e){function t(){var t=e(this),i=t.parent().parent();t.parent().remove(),window.update_dzs_item_gallery_metafield(i)}function i(){var t=e(this),i=t.parent();i.parent().children().removeClass("edit-field-active"),i.addClass("edit-field-active")}var a=e(".dzs_item_gallery_list");e(".dzs-add-gallery-item").unbind("click",window.click_add_gallery_item),e(".dzs-add-gallery-item").bind("click",window.click_add_gallery_item),e(document).undelegate("li .ui-delete","click"),e(document).delegate("li .ui-delete","click",t),e(document).undelegate("li .ui-edit","click"),e(document).delegate("li .ui-edit","click",i),e.fn.sortable?a.each(function(){var t=e(this);0==t.hasClass("ui-sortable")&&t.sortable({items:"li",handle:".the-handler",scrollSensitivity:50,forcePlaceholderSize:!0,forceHelperSize:!1,helper:"clone",opacity:.7,placeholder:"dzs_item_gallery_list-placeholder",update:function(t,i){console.info(this),window.update_dzs_item_gallery_metafield(e(this))}})}):console.warn("please include sortable")};exports.setupAdminGallery=setupAdminGallery,window.update_dzs_item_gallery_metafield=function(e){console.info("update_dzs_item_gallery_metafield",e);var t=null;e&&e.parent&&e.parent().children("input[name*=image_gallery]").length>0&&(t=e.parent().children("input[name*=image_gallery]").eq(0)),t&&t.val("");var i="",a=0;e&&e.children&&e.children().each(function(){var e=jQuery(this);a>0&&(i+=","),i+=e.attr("data-id"),a++}),t&&t.val(i)};
},{}],3:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSerializeAnythingRepeater = void 0;
/**
 *
 * @param {jQuery} thejQuery
 */
const setupSerializeAnythingRepeater = thejQuery => {
  thejQuery.fn.serializeAnythingRepeater = function () {
    var toReturn = [];
    var els = thejQuery(this).find(":input").get();
    thejQuery.each(els, function () {
      if (thejQuery(this).attr("data-repeater_name") && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
        var val = thejQuery(this).val();
        toReturn.push(encodeURIComponent(thejQuery(this).attr("data-repeater_name")) + "=" + encodeURIComponent(val));
      }
    });
    return toReturn.join("&").replace(/%20/g, "+");
  };
};
exports.setupSerializeAnythingRepeater = setupSerializeAnythingRepeater;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupUploader = void 0;
/**
 *
 * @param {jQuery} thejQuery
 */
const setupUploader = $ => {
  var global_dzstln_batchupload_index = 0;
  function dzstln_adminpage_batchupload_ready() {
    jQuery(".save-batchupload").bind("click", dzstln_batchupload_saveall);
    jQuery(".saveconfirmer").fadeOut("slow");
    window.dzsuploader_multi_init(".dzs-multi-upload", {});
  }
  window.global_dzsmultiupload = function (arg1, arg2) {
    jQuery("form.mainsettings").append('<input type="hidden" name="item[' + global_dzstln_batchupload_index + '][name]" value="' + arg1 + '"/>');
    jQuery("form.mainsettings").append('<input type="hidden" name="item[' + global_dzstln_batchupload_index + '][url]" value="' + (dzs_upload_path + arg1) + '"/>');
    global_dzstln_batchupload_index++;
    jQuery(".notice-files-uploaded--number").html(global_dzstln_batchupload_index);
  };
  function dzstln_batchupload_saveall() {
    jQuery("#save-ajax-loading").css("visibility", "visible");
    var mainarray = jQuery(".mainsettings").serialize();
    var data = {
      action: "dzstln_ajax_batchupload_saveall",
      postdata: mainarray
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
  $(".dzsq-dzs-wordpress-uploader").unbind("click");
  $(".dzsq-dzs-wordpress-uploader").bind("click", function (e) {
    var _t = $(this);
    var targetInput = _t.prev();
    var searched_type = "";
    if (targetInput.hasClass("upload-type-audio")) {
      searched_type = "audio";
    }
    if (targetInput.hasClass("upload-type-image")) {
      searched_type = "image";
    }
    var uploader_frame = wp.media.frames.qucreative_addimage = wp.media({
      // Set the title of the modal.
      title: "Insert Media",
      // Tell the modal to show only images.
      library: {
        type: searched_type
      },
      // Customize the submit button.
      button: {
        // Set the text of the button.
        text: "Insert Media",
        // Tell the button not to close the modal, since we're
        // going to refresh the page when the image is selected.
        close: false
      }
    });

    // When an image is selected, run a callback.
    uploader_frame.on("select", function () {
      // Grab the selected attachment.
      var attachment = uploader_frame.state().get("selection").first();

      //console.log(attachment.attributes.url);
      var arg = attachment.attributes.url;
      if (targetInput.hasClass("upload-prop-id")) {
        targetInput.val(attachment.attributes.id);
      } else {
        targetInput.val(attachment.attributes.url);
      }
      targetInput.css({
        "background-color": "",
        color: ""
      });
      targetInput.trigger("change");
      uploader_frame.close();
    });

    // Finally, open the modal.
    uploader_frame.open();
    e.stopPropagation();
    e.preventDefault();
    return false;
  });
};
exports.setupUploader = setupUploader;

},{}]},{},[1])


//# sourceMappingURL=admin.js.map