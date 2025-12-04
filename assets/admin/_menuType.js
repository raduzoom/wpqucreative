export const setupMenuType = () => {
  const $ = jQuery;
  $(document).on(
    "change",
    '*[data-customize-setting-link="menu_type"]',
    handle_change,
  );

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

        // console.info('changed MENU_TYPE', $('input[name=menu_size]'), val);
        $("input[name=menu_size]").val(val);
        $("input[name=menu_size]").trigger("change");

        $("input[name=menu_weight]").val(val_weight);
        $("input[name=menu_weight]").trigger("change");
        $("input[name=menu_weight]").trigger("chosen:updated");
      }

      if (_t.attr("data-customize-setting-link") == "menu_type") {
        var val = 30;

        if (
          _t.val() == "menu-type-3" ||
          _t.val() == "menu-type-4" ||
          _t.val() == "menu-type-6"
        ) {
          val = 100;
        }
        if (_t.val() == "menu-type-5") {
          val = 90;
        }
        // -- 7,8,9,10,11,12,13,14,15,16  - 0

        if (_t.parent().parent().parent().hasClass("open")) {
          $('*[data-customize-setting-link="menu_environment_opacity"]').val(
            val,
          );
          $('*[data-customize-setting-link="menu_environment_opacity"]').trigger(
            "change",
          );
          $("#customize-control-menu_environment_opacity-slider").slider(
            "value",
            val,
          );
        }
      }
    }
  }
};
