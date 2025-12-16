"use strict";



function dzsap_handle_play(argcthis) {
  $(".audioplayer").each(function () {
    var _t = $(this);
    if (_t.get(0) != argcthis.get(0)) {
      if (_t.get(0).api_seek_to_perc) {
        _t.get(0).api_seek_to_perc(0);
      }
    }
  });
}


export const qu_reinitDzsAp = () => {
  if (window.dzsap_init) {
    var settings_ap = {
      disable_volume: "off",
      disable_scrub: "default",
      design_skin: "skin-redlights",
      skinwave_dynamicwaves: "off",
      skinwave_enableSpectrum: "off",
      settings_backup_type: "full",
      skinwave_enableReflect: "on",
      skinwave_comments_enable: "on",
      skinwave_timer_static: "off",
      disable_player_navigation: "off",
      skinwave_mode: "normal",
      default_volume: "last", // -- number / set the default volume 0-1 or "last" for the last known volume
      skinwave_comments_retrievefromajax: "off",

      embed_code:
          "You can enable embed button for your viewers to embed on their site, the code will auto generate. &lt;iframe src=&quot;http://yoursite.com/bridge.php?type=gallery&amp;id=gal1&quot; &gt;&lt;/iframe&gt;",
      init_each: true,
      settings_php_handler: "",
      action_audio_play2: dzsap_handle_play,
      php_retriever:
          window.qucreative_options.theme_url + "/soundcloudretriever.php",
    };

    window.dzsap_init(".audioplayer-tobe.auto-init-from-q", settings_ap);

    if (window.dzsag_init) {
      $(".audiogallery").each(function () {
        var _t = $(this);

        window.dzsag_init(_t, {
          transition: "fade",
          cueFirstMedia: "off",
          autoplay: "on",
          autoplayNext: "on",
          php_retriever:
              window.qucreative_options.theme_url + "/soundcloudretriever.php",
          design_menu_position: "bottom",
          settings_ap: settings_ap,
          embedded: "off",
          init_each: true,
          enable_easing: "on",
          design_menu_height: 200,
          settings_mode: "mode-showall",
          design_menu_state: "open", // -- options are "open" or "closed", this sets the initial state of the menu, even if the initial state is "closed", it can still be opened by a button if you set design_menu_show_player_state_button to "on"
          design_menu_show_player_state_button: "on", // -- show a button that allows to hide or show the menu
        });
      });
    }
  }

}


