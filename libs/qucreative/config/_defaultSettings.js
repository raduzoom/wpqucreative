export const zoomboxDefaultSettings = {
  settings_paddingHorizontal: '100',
  settings_paddingVertical: '100',
  settings_resizemaincon: 'off',
  design_animation: 'fromcenter',
  design_skin: 'skin-darkfull',
  design_borderwidth: 'default',
  settings_deeplinking: 'on',
  settings_disableSocial: 'on',
  settings_useImageTag: 'on',
  zoombox_audioplayersettings: {},
  settings_makeFunctional: false,
  settings_usearrows: 'on',
  social_enableTwitterShare: 'on',
  social_enableGooglePlusShare: 'on',
  social_extraShareIcons: '',
  videoplayer_settings: {
    design_skin: 'skin_reborn',
    zoombox_video_autoplay: "off",
    settings_youtube_usecustomskin: "off",
    settings_video_overlay: "on"
  },
  audioplayer_settings: {},
  settings_extraClasses: '',
  settings_disablezoom: 'on',
  preset_name: 'darkfull',
  settings_zoom_doNotGoBeyond1X: 'off',
  settings_zoom_use_multi_dimension: 'off' // -- by default zoom is only vertical or horizontal, use this to allow full zoom
  ,
  settings_zoom_disableMouse: 'off',
  settings_enableSwipe: 'on',
  settings_enableSwipeOnDesktop: 'on',
  settings_galleryMenu: 'dock',
  settings_transition: 'fade',
  settings_transition_gallery: 'slide',
  settings_transition_out: 'fade',
  settings_transition_gallery_when_ready: 'on',
  settings_force_delay_time_for_loaded: 0,
  settings_add_delay_time_for_gallery_transition: 0,
  settings_add_delay_time_for_transition_in: 0,
  settings_try_to_take_item_from_cache: 'on',
  settings_fullsize: 'off' // -- cover the whole screen on / off
  ,
  settings_holder_con_extra_classes: '',
  settings_holder_extra_classes: '',
  settings_callback_func_gotoItem: null
};


export const zoomboxSettings_whiteFull = {


  settings_zoom_doNotGoBeyond1X: 'off',
  design_skin: 'skin-whitefull',
  settings_enableSwipe: 'off',
  settings_enableSwipeOnDesktop: 'off',
  settings_galleryMenu: 'none',
  settings_useImageTag: 'on',
  settings_fullsize: 'on',
  preset_name: 'whitefull',
  settings_disablezoom: 'on',
  settings_transition: 'fromtop',
  settings_transition_gallery: 'helper-rectangle',
  settings_transition_out: 'slideup',
  settings_disableSocial: 'on',
  settings_add_delay_time_for_gallery_transition: 50,
  settings_add_delay_time_for_transition_in: 20,
  videoplayer_settings: {
    design_skin: 'skin_reborn', zoombox_video_autoplay: "off"
  },
  settings_extraClasses: '',
  settings_holder_con_extra_classes: " scroller-con",
  settings_holder_extra_classes: " inner",
  settings_callback_func_gotoItem: qcre_callback_for_zoombox

}
export const zoomboxSettings_darkFull = {
  settings_zoom_doNotGoBeyond1X: 'off',
  design_skin: 'skin-darkfull',
  settings_enableSwipe: 'on',
  settings_enableSwipeOnDesktop: 'on',
  settings_galleryMenu: 'dock',
  settings_useImageTag: 'on',
  settings_paddingHorizontal: '100',
  settings_paddingVertical: '100',
  settings_disablezoom: 'on',
  preset_name: 'darkfull',
  settings_transition: 'fade',
  settings_transition_out: 'fade',
  videoplayer_settings: {
    design_skin: 'skin_reborn',
    zoombox_video_autoplay: "off",
    settings_youtube_usecustomskin: "off",
    settings_video_overlay: "on"
  }
};



function qcre_callback_for_zoombox(arg) {


  arg.prepend('<div class="qucreative--520-nav-con--placeholder" style="height: ' + jQuery('.qucreative--520-nav-con').eq(0).outerHeight() + 'px;"></div>');

  if (window.dzsscr_init) {


    // -- zoombox scroller
    window.dzsscr_init('.zoombox-maincon .scroller-con', {
      'settings_skin': 'skin_apple'
      , enable_easing: 'on'
      , settings_autoresizescrollbar: 'on'
      , settings_chrome_multiplier: 0.12
      , settings_firefox_multiplier: -3
      , settings_refresh: 700
      , settings_autoheight: "off"
      , touch_leave_native_scrollbar: "on"
    });
  }

  if (jQuery('.main-container')) {

  }
}

window.qcre_callback_for_zoombox = qcre_callback_for_zoombox;