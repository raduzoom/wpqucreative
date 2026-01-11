(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupCustomizer=void 0;const setupCustomizer=function(e){e(document).delegate('.customize-control-checkbox-multiple input[type="checkbox"]',"change",function(){console.info(this);var t=e(this).parents(".customize-control").find('input[type="checkbox"]:checked').map(function(){return this.value}).get().join(",");console.info(e(this).parents(".customize-control").find('input[type="hidden"]')),e(this).parents(".customize-control").find('input[type="hidden"]').val(t).trigger("change")})};exports.setupCustomizer=setupCustomizer;
},{}],3:[function(require,module,exports){
"use strict";var _checkDependencySettings=require("../../../../plugins/qu-extend/inc/features/admin/features/_checkDependencySettings"),_customizer=require("../../../../plugins/qu-extend/inc/features/admin/features/_customizer");jQuery(document).ready(function(e){e(".input-big-image").trigger("change"),setTimeout(function(){try{jQuery('*[name="qucreative_meta_post_media_type"]').trigger("change"),jQuery("#page_template").trigger("change")}catch(e){console.log("try to change page_template",e)}},500),setTimeout(function(){try{jQuery('*[name="qucreative_meta_post_media_type"]').trigger("change"),jQuery("#page_template").trigger("change")}catch(e){console.log("try to change page_template",e)}},2e3),setTimeout(function(){try{jQuery("#page_template").trigger("change")}catch(e){console.log("try to change page_template",e)}},4e3);window.location.href;setTimeout(function(){jQuery(".iconselector-waiter").trigger("change")},3e3)});
},{"../../../../plugins/qu-extend/inc/features/admin/features/_checkDependencySettings":1,"../../../../plugins/qu-extend/inc/features/admin/features/_customizer":2}]},{},[3])


//# sourceMappingURL=admin.js.map