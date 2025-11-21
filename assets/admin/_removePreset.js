export const setupFirstPreset = () => {
  const $ = jQuery;
  $("body.wp-customizer").append(
    '<div class="customizer-add-preset-lightbox-con  "><div class="close-btn"><div class="the-bg"></div></div><form class="preset-name"><h4>Create a new Preset</h4><div class="flex-con"><input name="preset_name" class="regular-text big-font" placeholder="Preset Name..."/><button class="dzs-button-simple padding-big ">Add</button></div><h4>Overwrite an existing Preset</h4><div class="flex-con"><select name="existing_preset" class="dzs-style-me skin-bigwhite opener-list"><option>preset 1</option><option>preset 2</option></select><button class="dzs-button-simple padding-big ">Overwrite</button></div></form></div>',
  );

  setTimeout(function () {
    let html_opts = '<option value="" selected></option>';

    $(".preset-con.user-preset").each(function () {
      const _t = $(this);

      if (_t.find(".btn-activate-preset").eq(0).attr("data-id")) {
        html_opts +=
          '<option value="' +
          _t.find(".btn-activate-preset").eq(0).attr("data-id") +
          '">' +
          _t.find(".the-label").eq(0).html() +
          "</option>";
      }
    });

    $("select[name=existing_preset]").html(html_opts);

    if (
      $("select[name=existing_preset]").get(0) &&
      $("select[name=existing_preset]").get(0).api_reinit
    ) {
      $("select[name=existing_preset]").get(0).api_reinit();
    }
  }, 1000);

  $(document).on("submit", " form.preset-name", handle_change);

  function handle_change(e) {
    const _t = $(this);
    if (e.type == "submit") {
      if (_t.hasClass("preset-name")) {
        // console.info("_t.find('input[name=preset_name]').val() - ", _t.find('input[name=preset_name]').val(), _t.find('input[name=preset_name]').val()=='');

        let sellab = "";

        $("select[name=existing_preset]")
          .children()
          .each(function () {
            var _t = $(this);

            if (_t.prop("selected")) {
              sellab = _t.html();
            }
          });

        if (sellab) {
          _t.find("input[name=preset_name]").val(sellab);
        }

        if (_t.find("input[name=preset_name]").val() == "") {
          _t.find("input[name=preset_name]").addClass("needs-attention");

          setTimeout(function () {
            _t.find("input[name=preset_name]").removeClass("needs-attention");
          }, 500);

          return false;
        }

        $(".customizer-add-preset-lightbox-con").removeClass("active");

        $(".button-primary.save").trigger("click");

        setTimeout(function () {
          const data = {
            action: "qucreative_save_preset",
            preset_name: $("*[name=preset_name]").val(),
          };

          jQuery.ajax({
            type: "POST",
            url: window.ajaxurl,
            data: data,
            success: function (response) {
              // console.warn(response);

              // console.info(response);

              setTimeout(function () {
                $(".button-primary.save").prop("disabled", true);

                // wp.customize.previewer.save();
                // console.info(wp.customize.previewer);
                // window.location.reload(true);
                window.location.href = window.location.href;
              }, 300);
            },
            error: function (arg) {
              if (typeof window.console != "undefined") {
                console.warn("Got this from the server: " + arg);
              }
            },
          });
        }, 1000);

        return false;
      }
    }
  }
};
export const setupRemovePreset = () => {
  const $ = jQuery;
  console.log("ceva");

  $(document).on(
    "click",
    " .btn-activate-preset,.btn-remove-preset,.btn-activate-preset, .save-preset, .customizer-add-preset-lightbox-con > .close-btn, .button-primary.save",
    handle_mouse,
  );

  function handle_mouse(e) {
    const _t = $(this);

    if (e.type == "click") {
      if (_t.hasClass("btn-activate-preset")) {
        $("*[data-customize-setting-link=presets]").val(_t.attr("data-id"));

        //.trigger('change')

        _t.parent()
          .parent()
          .find(".preset-activated")
          .removeClass("preset-activated");
        _t.parent().addClass("preset-activated");

        var data = {
          action: "qucreative_select_preset",
          presetid: _t.attr("data-id"),
        };

        jQuery.ajax({
          type: "POST",
          url: window.ajaxurl,
          data: data,
          success: function (response) {
            // console.warn(response);

            // console.info(response);

            $(".button-primary.save").trigger("click");

            setTimeout(function () {
              $(".button-primary.save").prop("disabled", true);

              // wp.customize.previewer.save();
              // console.info(wp.customize.previewer);
              // window.location.reload(true);
              window.location.href = window.location.href;
            }, 881);
          },
          error: function (arg) {
            if (typeof window.console != "undefined") {
              console.warn("Got this from the server: " + arg);
            }
          },
        });
      }

      if (_t.hasClass("btn-activated-preset")) {
      }
      if (_t.hasClass("save-preset")) {
        // do_focus(_t);
        $(".customizer-add-preset-lightbox-con").addClass("active");
        return false;
      }
      if (_t.hasClass("btn-remove-preset")) {
        const r = confirm("Are you sure you want to remove preset ? ");

        if (r) {
          _t.parent().remove();

          var data = {
            action: "qucreative_remove_preset",
            presetid: _t.attr("data-id"),
          };

          jQuery.ajax({
            type: "POST",
            url: window.ajaxurl,
            data: data,
            success: function (response) {
              // console.warn(response);
              // console.info(response);
            },
            error: function (arg) {
              if (typeof window.console != "undefined") {
                console.warn("Got this from the server: " + arg);
              }
            },
          });
        }
      }
    }
  }
};
