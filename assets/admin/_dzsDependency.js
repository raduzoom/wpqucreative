export const setupDzsDependency = () => {
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
        var _c = $(
          '*[name="' +
            dep_arr[0].element +
            '"],*[data-customize-setting-link="' +
            dep_arr[0].element +
            '"]',
        ).eq(0);

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
