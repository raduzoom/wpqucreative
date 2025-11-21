"use strict";


export const qu_reinitDzsVp= () => {
  // -- tbc lets unite this from reinit and load_new_page into a new function -- load scripts
  if (window.dzsvp_init) {
    const theQuery =
        '.vplayer-tobe.auto-init-from-q:not(".zfolio-portfolio-expandable .vplayer-tobe.auto-init-from-q")';
    $(theQuery).each(function () {
      var _t = $(this);

      var responsive_ratio = "0.5625";

      if (_t.attr("data-responsive_ratio")) {
        responsive_ratio = _t.attr("data-responsive_ratio");
      }

      if (_t.parent().hasClass("slider-con")) {
        responsive_ratio = "";
      }

      dzsvp_init(_t, {
        settings_youtube_usecustomskin: "off",
        init_each: true,
        controls_out_opacity: "1",
        controls_normal_opacity: "1",
        settings_video_overlay: "on",
        design_skin: "skin_reborn",
        cueVideo: "off",
        autoplay: "off",
        responsive_ratio: responsive_ratio,
      });
    });
  }
}


