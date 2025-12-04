(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupColorpicker = void 0;
var _data = require("./sampledata/data.config");
const setupColorpicker = () => {
  const $ = jQuery;
  if ($.fn.wpColorPicker) {
    $(".dzswp-color-picker").wpColorPicker(_data.colorpicker_args);
    setTimeout(function () {
      $(".dzswp-color-picker").wpColorPicker(_data.colorpicker_args);
    }, 1000);
  }
};
exports.setupColorpicker = setupColorpicker;

},{"./sampledata/data.config":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupDzsDependency = void 0;
const setupDzsDependency = () => {
  const $ = jQuery;
  check_dependency_settings();
  $(document).on("change", ".dzs-dependency-field", handle_change);
  function check_dependency_settings() {
    $("*[data-dependency]").each(function () {
      const _t = $(this);

      // console.info(_t);
      const dep_arr = JSON.parse(_t.attr("data-dependency"));

      // console.warn(dep_arr);

      if (dep_arr[0]) {
        var _c = $('*[name="' + dep_arr[0].element + '"],*[data-customize-setting-link="' + dep_arr[0].element + '"]').eq(0);

        // console.info(_c, dep_arr[0].element, dep_arr[0].value);

        var sw_show = false;
        for (var i3 in dep_arr[0].value) {
          if (_c.val() == dep_arr[0].value[i3]) {
            sw_show = true;
            break;
          }
        }
        if (sw_show) {
          _t.show();
        } else {
          _t.hide();
        }
      }
    });
  }
  function handle_change(e) {
    const _t = $(this);
    if (e.type == "change") {
      if (_t.hasClass("dzs-dependency-field")) {
        // console.info("ceva");
        check_dependency_settings();
      }
    }
  }
};
exports.setupDzsDependency = setupDzsDependency;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMenuType = void 0;
const setupMenuType = () => {
  const $ = jQuery;
  $(document).on("change", '*[data-customize-setting-link="menu_type"]', handle_change);
  function handle_change(e) {
    const _t = $(this);
    if (e.type == "change") {
      if (_t.attr("data-customize-setting-link") == "menu_type") {
        window.qucreative_settings.menu_type = _t.val();
        const menu_type = window.qucreative_settings.menu_type;
        if (menu_type == "menu-type-1" || menu_type == "menu-type-2") {
          // console.info('1');
          val = 18;
        } else {
          if (menu_type == "menu-type-11" || menu_type == "menu-type-12") {
            // console.info('2');
            val = 40;
          } else {
            // console.info('3');
            val = 14;
          }
        }
        var val_weight;
        if (menu_type == "menu-type-1" || menu_type == "menu-type-2") {
          // console.info('1');
          val_weight = 400;
        } else {
          if (menu_type == "menu-type-1" || menu_type == "menu-type-2") {
            val_weight = 300;
          } else {
            val_weight = 700;
          }
        }

        // console.warn(menu_type, val, val_weight);

        if (menu_type == "menu-type-3" || "menu-type-4" || menu_type == "menu-type-5" || "menu-type-6" || menu_type == "menu-type-7" || "menu-type-8" || menu_type == "menu-type-9" || "menu-type-10") {}

        // console.info('changed MENU_TYPE', $('input[name=menu_size]'), val);
        $("input[name=menu_size]").val(val);
        $("input[name=menu_size]").trigger("change");
        $("input[name=menu_weight]").val(val_weight);
        $("input[name=menu_weight]").trigger("change");
        $("input[name=menu_weight]").trigger("chosen:updated");
      }
      if (_t.attr("data-customize-setting-link") == "menu_type") {
        var val = 30;
        if (_t.val() == "menu-type-3" || _t.val() == "menu-type-4" || _t.val() == "menu-type-6") {
          val = 100;
        }
        if (_t.val() == "menu-type-5") {
          val = 90;
        }
        // -- 7,8,9,10,11,12,13,14,15,16  - 0

        if (_t.parent().parent().parent().hasClass("open")) {
          $('*[data-customize-setting-link="menu_environment_opacity"]').val(val);
          $('*[data-customize-setting-link="menu_environment_opacity"]').trigger("change");
          $("#customize-control-menu_environment_opacity-slider").slider("value", val);
        }
      }
    }
  }
};
exports.setupMenuType = setupMenuType;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupPicker = void 0;
const setupPicker = () => {
  const $ = jQuery;
  $(document).on("click", ".picker-con .the-icon", function () {
    var _t = $(this);
    var _c = _t.parent().children(".picker");
    if (_c.css("display") == "none") {
      _c.fadeIn("fast");
    } else {
      _c.fadeOut("fast");
    }
  });
};
exports.setupPicker = setupPicker;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupRepeater = void 0;
const setupRepeater = () => {
  const $ = jQuery;
  console.log("ceva");
  $(document).on("click", ".btn-add-repeater-field, .repeater-field > .delete-btn", handle_mouse);
  $(document).delegate("*[data-repeater_name]", "change", handle_submit);
  setTimeout(function () {
    $('*[data-customize-setting-link="social_icons"]').each(function () {
      const _t = $(this);
      console.info("_t ->", _t);

      //return;

      const _thefield = _t;
      const _con = _t.parent();
      _thefield.hide();
      _con.append('<div class="repeater-fields-con"></div>');
      var _repeater_fields = _con.children(".repeater-fields-con");
      _con.append('<p><a class="btn-add-repeater-field button-secondary" href="#">' + qucreative_settings.lang_add_new + "</a></p>");
      if (_thefield.val()) {
        try {
          var arr = JSON.parse(_thefield.val());
          for (var i2 in arr) {
            // console.info(arr[i2]);
            add_repeater_field(_repeater_fields, arr[i2]);
          }

          // console.info(arr);
        } catch (e) {
          console.info(e);
        }
      }
      _con.find(".btn-add-repeater-field").bind("click", function () {
        var _t2 = $(this);

        // console.info(_repeater_fields);

        add_repeater_field(_repeater_fields);
        return false;
      });
      _repeater_fields.sortable({
        // handle: ".handle"
      });
    });
  }, 1000);
  function handle_mouse(e) {
    const _t = $(this);
    if (e.type == "click") {
      if (_t.hasClass("btn-add-repeater-field")) {}
    }
    if (_t.hasClass("delete-btn") && _t.parent().hasClass("repeater-field")) {
      _t.parent().remove();
      update_repeater_field();
    }
  }
  function handle_submit(e) {
    var _t = $(this);

    // console.info(_t);

    if (e.type == "change") {
      update_repeater_field();
    }
  }
  function update_repeater_field() {
    $(".repeater-fields-con").each(function () {
      var _t = $(this);
      var _con = $("#customize-control-social_icons");
      var _input = null;
      if (_con.find("*[data-customize-setting-link]").length) {
        _input = _con.find("*[data-customize-setting-link]").eq(0);
      }
      var arr_main = [];
      _t.children(".repeater-field").each(function () {
        var _t2 = $(this);

        // console.info(_t2);

        var arr_aux = {};
        _t2.find("*[data-repeater_name]").each(function () {
          var _t3 = $(this);

          // console.warn(_t3, _t3.attr('data-repeater_name'), _t3.val());

          arr_aux[_t3.attr("data-repeater_name")] = _t3.val();
        });

        // console.info(arr_aux);

        arr_main.push(arr_aux);
      });

      // console.info(arr_main);

      console.info("settings json string", JSON.stringify(arr_main));
      console.info("_input - ", _input);
      console.info("_con - ", _con);
      _input.val(JSON.stringify(arr_main));
      _input.trigger("change");
    });
  }
  function add_repeater_field(arg, pargs) {
    let margs = {
      link: "#",
      icon: ""
    };
    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    // console.warn(margs);

    arg.append('<div class="repeater-field"><div class="delete-btn">' + qucreative_settings.lang_delete + ' <i class="fa fa-times-circle"></i></div><p><span class="customize-control-title">Link</span></p><p><input type="text" class="" value="' + margs.link + '"  data-repeater_name="link" /></p>     <p><span class="customize-control-title">Icon</span></p><div class="iconselector" data-type=""> <p><span class="iconselector-preview"></span><input type="text" data-repeater_name="icon" class="style-iconselector iconselector-waiter   "  value="' + margs.icon + '"/><span class="iconselector-btn"><i class="fa fa-caret-down"></i></span></p> <div class="iconselector-clip"> <input type="text" class="icon-search-field textfield" placeholder=""/><br> </div> </div></div>');
    setTimeout(function () {
      jQuery(".iconselector .iconselector-waiter").trigger("change");
    }, 2);
  }
};
exports.setupRepeater = setupRepeater;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupResponsiveSlider = void 0;
var _data = require("./sampledata/data.config");
const setupResponsiveSlider = () => {
  const $ = jQuery;
  setTimeout(function () {
    $(".slider-for-responsive-slider").each(function () {
      const _t = $(this);
      var _con = _t.parent().parent();
      var _val = _con.find(".small-input").eq(0);
      _t.get(0).target_input = _val;
      _val.get(0).target_slider = _t;
      setTimeout(function () {
        try {
          const val = parseInt(_t.get(0).target_input.val(), 10);
          _t.slider({
            value: val,
            animate: "fast",
            min: 0,
            max: 100,
            step: 10,
            slide: function (e, ui) {
              var _t2 = $(this);
              _t2.get(0).target_input.val(ui.value + "%");
              _t2.get(0).target_input.trigger("change");
            }
          });
        } catch (err) {
          console.warn(err);
        }
        _val.on("change", function () {
          var _t = $(this);
          _t.get(0).target_slider.slider("value", parseInt(_t.val(), 10));
        });
      }, 100);
    });
  });
};
exports.setupResponsiveSlider = setupResponsiveSlider;

},{"./sampledata/data.config":11}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupReturnToDefaults = void 0;
var _data = require("./sampledata/data.config");
const setupReturnToDefaults = () => {
  const $ = jQuery;
  $(document).on("click", " .font-customizer-field, .btn-return-to-defaults, .btn-activate-preset,.btn-remove-preset, .save-preset, .customizer-add-preset-lightbox-con > .close-btn, .button-primary.save", handle_mouse);
  function handle_mouse(e) {
    const _t = $(this);
    if (e.type == "click") {
      if (_t.hasClass("btn-return-to-defaults")) {
        if (_t.attr("data-for") == "*") {
          const r = top.confirm(window.qucreative_settings.lang_are_you_sure + "?");

          // r=true;

          if (r == true) {
            $("input#customize-control-font_data").val(_data.dataConfig);
            $("input#customize-control-font_data").trigger("change");
            $(".button-primary.save").trigger("click");
            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
        } else {
          const confirmDialog = top.confirm(window.qucreative_settings.lang_are_you_sure + "?");

          // r=true;

          if (confirmDialog) {
            const _c = $('.tab-content[data-for="' + _t.attr("data-for") + '"]');
            let i3 = 0;
            _c.find(".default-val").each(function () {
              // console.info(_t3);

              var _t3 = $(this);
              setTimeout(function () {
                var _c2 = $("*[name=" + _t3.attr("data-for") + "]");
                if (_t3.attr("data-for").indexOf("_weight") > -1) {
                  setTimeout(function () {
                    _c2.val(_t3.html());

                    // console.error("HMM", _c2, _t3.html());

                    _c2.trigger("change");
                    _c2.trigger("chosen:updated");
                  }, 100);
                }
                if (_c2.eq(0).attr("type") == "radio") {
                  _c2.each(function () {
                    var _t32 = $(this);
                    if (_t32.val() == _t3.html()) {
                      _t32.prop("checked", true);
                    } else {
                      _t32.prop("checked", false);
                    }
                  });
                } else {
                  var val = _t3.html();
                  if (_c2.attr("name") == "menu_size") {
                    // console.info($('*[data-customize-setting-link="menu_type"]'));

                    var menu_type = window.qucreative_settings.menu_type;
                    if (menu_type == "menu-type-1" || menu_type == "menu-type-2") {
                      // console.info('1');
                      val = 18;
                    } else {
                      if (menu_type == "menu-type-11" || menu_type == "menu-type-12") {
                        // console.info('2');
                        val = 40;
                      } else {
                        // console.info('3');
                        val = 14;
                      }
                    }

                    // console.warn(menu_type, val);

                    if (menu_type == "menu-type-3" || "menu-type-4" || menu_type == "menu-type-5" || "menu-type-6" || menu_type == "menu-type-7" || "menu-type-8" || menu_type == "menu-type-9" || "menu-type-10") {}
                  }
                  _c2.val(val);
                  _c2.trigger("change");
                  _c2.trigger("chosen:updated");
                }
              }, i3 * 1);
              i3++;
            });
          } else {}
        }
      }
    }
  }
};
exports.setupReturnToDefaults = setupReturnToDefaults;

},{"./sampledata/data.config":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSelector = void 0;
var _data = require("./sampledata/data.config");
const setupSelector = () => {
  const $ = jQuery;
  console.log("ceva");
  setTimeout(function () {
    $(".link-to-selector").trigger("change");
  }, 3000);
  $(document).on("change", '.font-family-selector,.link-to-selector,.font-customizer-field, *[data-customize-setting-link="menu_type"]', handle_change);
  function handle_change(e) {
    const _t = $(this);
    if (e.type == "change") {
      if (_t.hasClass("font-family-selector")) {
        // console.info('font-family-selector changed, ', qucreative_fontArray);

        for (var i2 in _data.qucreative_fontArray["items"]) {
          // console.info(_t.val(), qucreative_fontArray['items'][i2].family);
          if (_data.qucreative_fontArray["items"][i2].family == _t.val()) {
            const _cf = _data.qucreative_fontArray["items"][i2].family;
            // console.warn('font found', _cf, qucreative_fontArray['items'][i2]);

            let files = _data.qucreative_fontArray["items"][i2].files;
            const arr_weights = [];
            let i4 = 0;
            files = _data.qucreative_fontArray["items"][i2].files;
            var len = Object.size(files);
            let breaker = 15;

            // console.warn('files -> ',files);
            // console.warn('len -> ',len);

            const theUsedArray = [];
            while (breaker > 0 && len >= 0) {
              let isUsed = false;
              var i3 = "";
              var aux = {
                value: i3
              };
              i3 = "100";

              // console.info('i3 -> ',i3, "files.hasOwnProperty(i3) -> ",files.hasOwnProperty(i3), $.inArray(i3,used_array)==-1);
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Thin 100";
                // delete files[i3];
              }
              i3 = "100italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Thin 100 Italic";
                // delete files[i3];
              }
              i3 = "200";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Light 200";
                // delete files[i3];
              }
              i3 = "200italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Light 200 Italic";
              }
              i3 = "300";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Light 300";
              }
              i3 = "300italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Light 300 Italic";
              }
              i3 = "400";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Regular 400";
              }
              i3 = "regular";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Regular 400";
              }
              i3 = "italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Italic 400";
              }
              i3 = "500";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Medium 500";
              }
              i3 = "500italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Medium 500 Italic";
              }
              i3 = "600";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Semi-Bold 600";
              }
              i3 = "600italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Semi-Bold 600 Italic";
              }
              i3 = "700";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Bold 700";
              }
              i3 = "700italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Bold 700 Italic";
              }
              i3 = "800";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Bold 800";
              }
              i3 = "800italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Bold 800 Italic";
              }
              i3 = "900";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Ultra-Bold 900";
              }
              i3 = "900italic";
              if (isUsed == false && files.hasOwnProperty(i3) && $.inArray(i3, theUsedArray) == -1) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Ultra-Bold 900 Italic";
              }

              // console.info('sw - ',sw);
              if (isUsed) {
                arr_weights[i4] = aux;
                i4++;
                len--;
              }
              breaker--;

              // console.info('aux -',aux);
            }

            // console.info('files - ',files);
            // console.info('arr_weights - ',arr_weights);

            let weights_options_str = "";
            for (const i5 in arr_weights) {
              weights_options_str += '<option value="' + arr_weights[i5].value + '">' + arr_weights[i5].label + "</option>";
            }

            // console.info(weights_options_str);

            const name_ = _t.attr("name");

            // console.info("$('select.weights-feeder-from-'+name_+' select') -> ",$('select.weights-feeder-from-'+name_+' '));

            $(".weights-feeder-from-" + name_ + " select").each(function () {
              var _t3 = $(this);

              // nu ti lua tzapa

              // return ;

              var last_val = _t3.val();
              // console.info("last_val -> ", last_val);

              if (last_val == "") {
                if (_t3.attr("data-default-weight")) {
                  last_val = _t3.attr("data-default-weight");
                }
              }

              // console.info('last_val - ',last_val);

              _t3.html(weights_options_str);
              if (_t3.attr("data-default-weight") || last_val) {
                var data_default_weight = _t3.attr("data-default-weight");
                var sw = false;
                _t3.children().each(function () {
                  var _t32 = $(this);

                  // console.groupCollapsed("weights test");

                  // console.info(_t32.attr('value'), last_val)

                  if (_t32.attr("value") == last_val + "") {
                    sw = true;

                    // console.info("FOUND SAME VALUE ?? ", last_val, _t32);

                    _t32.attr("selected", "selected");
                    _t32.prop("selected", true);

                    // console.info("ITEM SELECTED - ",_t32);

                    // return;
                    // console.info("FOUND",_t32);
                  }
                  // console.groupEnd();
                });
                if (sw) {
                  // _t3.val(_t3.attr('data-default-weight'));
                  _t3.val(last_val);
                }
                _t3.attr("data-default-weight", "");
              }

              // _t3.val(last_val);
              // console.info(" SW - ",sw);
              _t3.trigger("change");

              // console.info(_t3);

              if (_t3.get(0) && _t3.get(0).api_reinit) {
                _t3.get(0).api_reinit();
              }
            });

            // -- for chosen
            $(".weights-feeder-from-" + name_).each(function () {
              var _t3 = $(this);

              // return ;

              var last_val = _t3.val();
              // console.info("last_val -> ", last_val);

              if (last_val) {} else {
                if (_t3.attr("data-default-weight")) {
                  last_val = _t3.attr("data-default-weight");
                }
              }
              // console.info("last_val 2 -> ", last_val);

              _t3.html(weights_options_str);
              if (_t3.attr("data-default-weight") || last_val) {
                var data_default_weight = _t3.attr("data-default-weight");
                var sw = false;
                _t3.children().each(function () {
                  var _t32 = $(this);
                  if (_t32.attr("value") == last_val) {
                    sw = true;
                    // console.info("FOUND SAME VALUE ?? ", last_val, _t32);

                    _t32.attr("selected", "selected");
                    _t32.prop("selected", true);

                    // console.info("ITEM SELECTED - ",_t32);

                    // return;
                  }
                });
                if (sw) {
                  // _t3.val(last_val);
                }
                _t3.attr("data-default-weight", "");
              }

              // console.info(" SW - ",sw);
              _t3.trigger("change");
              _t3.trigger("chosen:updated");

              // console.info(_t3);
            });
          }
        }
      }
      if (_t.hasClass("link-to-selector")) {
        // console.info("ceva");

        const label_prefix = _t.attr("data-label-prefix");
        $("*[name=" + label_prefix + "_weight]").removeClass("weights-feeder-from-headings_font").removeClass("weights-feeder-from-body_font").addClass("weights-feeder-from-" + _t.val() + "_font");
        $("*[name=" + _t.val() + "_font]").trigger("change");
        return false;
      }
      if (_t.hasClass("font-customizer-field")) {
        const _f = $(".dzs-tabs-1");

        // console.info(_f.serialize());

        _f.prev().find("input").eq(0).val(_f.serialize());
        if (window.isSafeToRefresh) {
          _f.prev().find("input").eq(0).trigger("change");
        }
      }
    }
  }
};
exports.setupSelector = setupSelector;

},{"./sampledata/data.config":11}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSliders = void 0;
const setupSliders = () => {
  const $ = jQuery;
  setTimeout(function () {
    $("#slider-for-line_spacing").slider({
      value: $('*[name="line_spacing"]').val(),
      min: 0,
      max: 100,
      slide: function (event, ui) {
        $('*[name="line_spacing"]').val(ui.value);
        $('*[name="line_spacing"]').trigger("change");
      }
    });
    const $titleDivider = $('*[name="title_divider_spacing"]');
    const titleDividerVal = $('*[name="title_divider_spacing"]').val();
    $("#slider-for-title_divider_spacing").slider({
      value: titleDividerVal,
      min: 0,
      max: 100,
      slide: function (event, ui) {
        $titleDivider.val(ui.value);
        $titleDivider.trigger("change");
      }
    });
    $("#slider-for-title_divider_spacing_two").slider({
      value: titleDividerVal,
      min: 0,
      max: 100,
      slide: function (event, ui) {
        $titleDivider.val(ui.value);
        $titleDivider.trigger("change");
      }
    });
  });
};
exports.setupSliders = setupSliders;

},{}],10:[function(require,module,exports){
"use strict";

var _repeater = require("./_repeater");
var _dzsDependency = require("./_dzsDependency");
var _returnToDefaults = require("./_returnToDefaults");
var _selector = require("./_selector");
var _picker = require("./_picker");
var _colorPicker = require("./_colorPicker");
var _responsiveSlider = require("./_responsiveSlider");
var _menuType = require("./_menuType");
var _sliders = require("./_sliders");
jQuery(document).ready(function ($) {
  (0, _colorPicker.setupColorpicker)();

  // -- we remove

  if (window.non_default_preset) {
    $("#customize-header-actions > #save").on("click.dzs", function () {
      setTimeout(function () {}, 200);
    });
  }
  if (window.dzssel_init) {
    dzssel_init("select.dzs-style-me", {
      init_each: true
    });
  }
  setTimeout(function () {
    if (window.dzstaa_init) {
      dzstaa_init(".dzs-tabs-1");
    }
    $(".font-family-selector").trigger("change");
    (0, _dzsDependency.setupDzsDependency)();
    (0, _returnToDefaults.setupReturnToDefaults)();
    (0, _responsiveSlider.setupResponsiveSlider)();
  }, 2000);
  (0, _sliders.setupSliders)();
  window.isSafeToRefresh = false;
  setTimeout(function () {
    window.isSafeToRefresh = true;
  }, 5000);
  setTimeout(function () {}, 12000);
  (0, _picker.setupPicker)();
  (0, _repeater.setupRepeater)();
  (0, _selector.setupSelector)();
  (0, _menuType.setupMenuType)();
  $(document).on("click", " .font-customizer-field, .customizer-add-preset-lightbox-con > .close-btn, .button-primary.save", handle_mouse);
  $(document).on("click", ".customize-section-back", function () {
    var _t = $(this);
    var _c = $(".dzs-tabs-1").eq(0);
    console.info("_c - ", _c);
    if (_c.get(0) && _c.get(0).api_goto_tab) {
      console.info("_c.get(0).api_goto_tab - ", _c.get(0).api_goto_tab);
      _c.get(0).api_close_all_tabs();
      setTimeout(function () {});
    }
  });
  Object.size = function (obj) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  function do_focus(arg) {
    setTimeout(function () {
      arg.focus();
    }, 1);
  }
  function handle_mouse(e) {
    const _t = $(this);
    if (e.type == "click") {
      if (_t.hasClass("font-customizer-field")) {
        // do_focus(_t);
      }
      if (_t.hasClass("close-btn")) {
        // do_focus(_t);

        $(".customizer-add-preset-lightbox-con").removeClass("active");
      }
      if (_t.hasClass("button-primary")) {
        if (_t.hasClass("save")) {
          $(".font-customizer-field.with_colorpicker").trigger("change");
        }
      }
    }
  }
  setTimeout(function () {
    $(".setup-slider-for-prev-input").each(function () {
      return false;
      var _t = $(this);
      var _val = _t.prev();
      _t.slider({
        value: _val.val(),
        animate: "fast",
        step: 1,
        slide: function (e, ui) {
          var _t2 = $(this);
          _t2.prev().val(ui.value);

          //console.log(this, ui, _val);
        }
      });
    });
  }, 1000);
});

},{"./_colorPicker":1,"./_dzsDependency":2,"./_menuType":3,"./_picker":4,"./_repeater":5,"./_responsiveSlider":6,"./_returnToDefaults":7,"./_selector":8,"./_sliders":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qucreative_fontArray = exports.dataConfig = exports.colorpicker_args = void 0;
const dataConfig = exports.dataConfig = "headings_font=Lato&h1_weight=700&h1_size=70&h1_line_height=1.15&h1_responsive_slider=30&h2_weight=700&h2_size=50&h2_line_height=1.15&h2_responsive_slider=20&h3_weight=700&h3_size=40&h3_line_height=1.15&h3_responsive_slider=10&h4_weight=700&h4_size=30&h4_line_height=1.15&h4_responsive_slider=0&h5_weight=700&h5_size=20&h5_line_height=1.15&h5_responsive_slider=0&h6_weight=700&h6_size=14&h6_line_height=1.57&h6_responsive_slider=0&h-group-1_weight=700&h-group-1_size=11&h-group-1_line_height=1.54&h-group-1_responsive_slider=0&h-group-2_weight=700&h-group-2_size=25&h-group-2_line_height=1.28&h-group-2_responsive_slider=0&body_font=Open+Sans&p_weight=regular&p_size=13&p_line_height=1.92&p_color=%236b6b6b&p_color_for_light=%23cccccc&hyperlink_weight=600&font-group-1_weight=600italic&font-group-1_size=14&font-group-1_line_height=1.42&font-group-2_weight=600&font-group-2_size=14&font-group-2_line_height=1.42&font-group-3_weight=600italic&font-group-3_size=11&font-group-3_line_height=1.27&font-group-4_weight=italic&font-group-4_size=14&font-group-4_line_height=1.42&font-group-5_weight=600&font-group-5_size=14&font-group-5_line_height=1.42&font-group-6_weight=regular&font-group-6_size=13&font-group-6_line_height=1.55&font-group-7_weight=italic&font-group-7_size=13&font-group-7_line_height=1.46&font-group-8_weight=regular&font-group-8_size=14&font-group-8_line_height=1.65&font-group-9_weight=600&font-group-9_size=15&font-group-9_line_height=1.7&font-group-10_weight=600&font-group-10_size=16&font-group-10_line_height=1.68&font-group-11_weight=800&font-group-11_size=24&font-group-11_line_height=1.29&font-group-12_weight=600&font-group-12_size=13&font-group-12_line_height=1.46&blockquote_weight=italic&blockquote_size=17&blockquote_line_height=1.58&menu_font=Lato&menu_weight=regular&menu_size=18&menu_line_height=1.2&copyright_font_link_to=headings&copyright_weight=700&copyright_size=10&copyright_line_height=1.4&page_title_font=Lato&page_title_weight=900&page_title_size=70&page_title_line_height=1&page_title_color=&page_title_responsive_slider=30&page_title_orientation=horizontal&section_title_two_font=Lato&section_title_two_first_weight=700&section_title_two_first_size=24&section_title_two_first_line_height=1.1&section_title_two_first_color=%23222222&section_title_two_first_color_for_light=%23ffffff&section_title_two_first_responsive_slider=10&section_title_two_second_font=Playfair+Display&section_title_two_second_weight=900italic&section_title_two_second_size=60&section_title_two_second_line_height=1.1&section_title_two_second_color=%23222222&section_title_two_second_color_for_light=%23ffffff&section_title_two_second_responsive_slider=30&line_spacing=3&section_title_two_number_font=Lato&section_title_two_number_weight=700italic&section_title_two_number_size=24&section_title_two_number_line_height=1.1&section_title_two_number_color=%23222222&section_title_two_number_color_for_light=%23ffffff&section_title_two_divider_divider_style=style-box&section_title_two_divider_color=%23444444&section_title_two_divider_color_for_light=%23ffffff&title_divider_spacing_two=20&section_title_one_first_font=Lato&section_title_one_first_weight=700&section_title_one_first_size=20&section_title_one_first_line_height=1.28&section_title_one_first_color=%23222222&section_title_one_first_color_for_light=%23ffffff&section_title_one_first_responsive_slider=0&section_title_one_divider_enable=on&section_title_one_divider_divider_style=style-box&section_title_one_divider_color=%23222222&section_title_one_divider_color_for_light=%23ffffff&title_divider_spacing=15&home_slider_font_link_to=headings&home_slider_weight=900&home_slider_size=50&home_slider_line_height=1.20&home_slider_color=%23ffffff&home_slider_color_for_light=%23222222&home_number_font_link_to=headings&home_number_weight=900&home_number_size=135&home_number_line_height=1";
let inter_change_color = 0;
const qucreative_fontArray = exports.qucreative_fontArray = JSON.parse(window.qucreative_font_data);
const colorpicker_args = exports.colorpicker_args = {
  defaultColor: false,
  change: function (event, ui) {
    console.info("colorpicker changed", event, ui, event.target, $(event.target));
    clearTimeout(inter_change_color);
    inter_change_color = setTimeout(function () {
      $(event.target).trigger("change");
    }, 500);
  },
  clear: function () {},
  hide: true,
  palettes: true
};

},{}]},{},[10])


//# sourceMappingURL=customizer.js.map
