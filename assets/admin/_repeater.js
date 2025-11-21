export const setupRepeater = () => {
  const $ = jQuery;
  console.log("ceva");
  $(document).on(
    "click",
    ".btn-add-repeater-field, .repeater-field > .delete-btn",
    handle_mouse,
  );

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

      _con.append(
        '<p><a class="btn-add-repeater-field button-secondary" href="#">' +
          qucreative_settings.lang_add_new +
          "</a></p>",
      );

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
      if (_t.hasClass("btn-add-repeater-field")) {
      }
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
      icon: "",
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    // console.warn(margs);

    arg.append(
      '<div class="repeater-field"><div class="delete-btn">' +
        qucreative_settings.lang_delete +
        ' <i class="fa fa-times-circle"></i></div><p><span class="customize-control-title">Link</span></p><p><input type="text" class="" value="' +
        margs.link +
        '"  data-repeater_name="link" /></p>     <p><span class="customize-control-title">Icon</span></p><div class="iconselector" data-type=""> <p><span class="iconselector-preview"></span><input type="text" data-repeater_name="icon" class="style-iconselector iconselector-waiter   "  value="' +
        margs.icon +
        '"/><span class="iconselector-btn"><i class="fa fa-caret-down"></i></span></p> <div class="iconselector-clip"> <input type="text" class="icon-search-field textfield" placeholder=""/><br> </div> </div></div>',
    );

    setTimeout(function () {
      jQuery(".iconselector .iconselector-waiter").trigger("change");
    }, 2);
  }
};
