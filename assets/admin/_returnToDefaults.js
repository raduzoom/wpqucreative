import { dataConfig } from "./sampledata/data.config";

export const setupReturnToDefaults = () => {
  const $ = jQuery;

  $(document).on(
    "click",
    " .font-customizer-field, .btn-return-to-defaults, .btn-activate-preset,.btn-remove-preset, .save-preset, .customizer-add-preset-lightbox-con > .close-btn, .button-primary.save",
    handle_mouse,
  );

  function handle_mouse(e) {
    const _t = $(this);

    if (e.type == "click") {
      if (_t.hasClass("btn-return-to-defaults")) {
        if (_t.attr("data-for") == "*") {
          const r = top.confirm(
            window.qucreative_settings.lang_are_you_sure + "?",
          );

          // r=true;

          if (r == true) {
            $("input#customize-control-font_data").val(dataConfig);

            $("input#customize-control-font_data").trigger("change");

            $(".button-primary.save").trigger("click");

            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
        } else {
          const confirmDialog = top.confirm(
            window.qucreative_settings.lang_are_you_sure + "?",
          );

          // r=true;

          if (confirmDialog) {
            const _c = $(
              '.tab-content[data-for="' + _t.attr("data-for") + '"]',
            );

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

                    if (
                      menu_type == "menu-type-1" ||
                      menu_type == "menu-type-2"
                    ) {
                      // console.info('1');
                      val = 18;
                    } else {
                      if (
                        menu_type == "menu-type-11" ||
                        menu_type == "menu-type-12"
                      ) {
                        // console.info('2');
                        val = 40;
                      } else {
                        // console.info('3');
                        val = 14;
                      }
                    }

                    // console.warn(menu_type, val);

                    if (
                      menu_type == "menu-type-3" ||
                      "menu-type-4" ||
                      menu_type == "menu-type-5" ||
                      "menu-type-6" ||
                      menu_type == "menu-type-7" ||
                      "menu-type-8" ||
                      menu_type == "menu-type-9" ||
                      "menu-type-10"
                    ) {
                    }
                  }

                  _c2.val(val);

                  _c2.trigger("change");
                  _c2.trigger("chosen:updated");
                }
              }, i3 * 1);

              i3++;
            });
          } else {
          }
        }
      }
    }
  }
};
