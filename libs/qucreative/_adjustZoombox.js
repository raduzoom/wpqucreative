"use strict";


export function adjustZoombox() {

  {
    try {
      var arg = JSON.parse(match[2]);
      if (quCreative_main.zoombox_options) {
        quCreative_main.old_zoombox_options = $.extend([], zoombox_options);
      }

      if (window.zoombox_default_opts_string) {
        var def_opts_parse = $.extend(
            true,
            {},
            $.parseJSON(window.zoombox_default_opts_string),
        );

        if (arg.type == "darkfull") {
          quCreative_main.zoombox_options = $.extend(
              def_opts_parse,
              window.init_zoombox_darkfull,
          );
        }

        if (arg.type == "whitefull") {
          quCreative_main.zoombox_options = $.extend(
              def_opts_parse,
              window.init_zoombox_whitefull,
          );
        }

        window.init_zoombox_settings = quCreative_main.zoombox_options;
      } else {
        window.init_zoombox_preset = arg.type;
        if (window.init_zoombox_preset == "darkfull") {
          window.init_zoombox_settings = $.extend(
              {},
              window.init_zoombox_darkfull,
          );
        }

        if (window.init_zoombox_preset == "whitefull") {
          window.init_zoombox_settings = $.extend(
              {},
              window.init_zoombox_whitefull,
          );
        }
      }

      if (window.api_zoombox_setoptions) {
      }

      quCreative_main.qcre_init_zoombox = true;
    } catch (err) {


    }
  }

}