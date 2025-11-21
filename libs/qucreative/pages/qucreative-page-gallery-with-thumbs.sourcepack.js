"use strict";

if (quCreative_main.newclass_body_page == "page-gallery-w-thumbs") {
  $("#as-gallery-w-thumbs").each(function () {
    var _t = $(this);

    var _t2_i = 0;
    _t.find(".items")
        .eq(0)
        .children()
        .each(function () {
          var _t2 = $(this);

          if (_t2.hasClass("processed")) {
            return;
          }

          if (_t2.attr("data-gallery-thumbnail")) {
            var aux = '<li class="thumb';

            if (_t2_i == 0) {
              aux += " curr-thumb";
            }

            aux +=
                '"  style=";"><div class="bgimage"  style="background-image: url(' +
                _t2.attr("data-gallery-thumbnail") +
                ')"></div></li>';

            $(".gallery-thumbs-con .thumbs-list").eq(0).append(aux);

            _t2_i++;
          }

          if (_t2.attr("data-type") == "image") {
            _t2.addClass("needs-loading");
          }

          if (_t2.attr("data-type") == "video") {
            var aux =
                '<div class="wipeout-wrapper"><div class="wipeout-wrapper-inner"><div class="vplayer-tobe " ';

            if (_t2.attr("data-width-for-gallery")) {
              aux +=
                  ' data-width-for-gallery="' +
                  _t2.attr("data-width-for-gallery") +
                  '"';
            }
            if (_t2.attr("data-height-for-gallery")) {
              aux +=
                  ' data-height-for-gallery="' +
                  _t2.attr("data-height-for-gallery") +
                  '"';
            }

            aux += ' data-src="' + _t2.attr("data-source") + '" >';

            if (_t2.children(".cover-image").length > 0) {
              aux += _t2.children(".cover-image").eq(0).outerHTML();
              _t2.children(".cover-image").remove();
            }

            aux += "</div></div></div>";

            _t2.addClass("needs-loading");
            _t2.attr("data-source", "");

            _t2.append(aux);

            if (window.dzsvp_init) {
              dzsvp_init(
                  _t2.find(".vplayer-tobe"),
                  qucreative_options.video_player_settings,
              );
            } else {
              console.info("video player not found");
            }
          }

          _t2.addClass("processed");
        });

    // -- as gallery w thumbs
    dzsas_init(_t, {
      settings_mode: "onlyoneitem",
      design_arrowsize: "0",
      settings_swipe: "off",
      settings_swipeOnDesktopsToo: "off",
      settings_slideshow: "on",
      settings_slideshowTime: "300000",
      settings_transition: "wipeoutandfade",
      settings_lazyLoading: "on",
      settings_lazyLoading_load_otheritems_after_loading_first_items: "on",
      settings_autoHeight: "on",
      settings_centeritems: false,
      design_bulletspos: "none",
      settings_wait_for_do_transition_call: "on",
      settings_transition_only_when_loaded: "on",
      mode_onlyone_autoplay_videos:
      window.qucreative_options.gallery_w_thumbs_autoplay_videos,
      mode_onlyone_reset_videos_to_0: "on",
    });
  });
}
