/**
 * @typedef {Object} VideoPlayerSettings
 * @property {boolean} init_each - Initialize each video player instance
 * @property {"on"|"off"} settings_youtube_usecustomskin - Use custom skin for YouTube videos
 * @property {string} design_skin - Design skin name (e.g., "skin_reborn")
 * @property {"on"|"off"} settings_video_overlay - Show video overlay
 */

/**
 * @typedef {Object} QucreativeConfig
 * @property {string[]} images_arr - Array of background images or colors
 * @property {string} bg_slideshow_time - Slideshow time in seconds. If "0" then no slideshow
 * @property {string} site_url - Site URL or "detect" for auto-detection
 * @property {"on"|"off"} enable_ajax - Enable AJAX page loading without browser reload
 * @property {string} page - Current page identifier
 * @property {"on"|"off"} bg_isparallax - Enable parallax effect for background
 * @property {"on"|"off"} gallery_w_thumbs_autoplay_videos - Enable autoplay for gallery videos with thumbnails
 * @property {"on"|"off"} enable_native_scrollbar - Enable the native scrollbar
 * @property {number} blur_amount - Amount of blur to apply
 * @property {string} border_width - Border width in pixels (set to "0" for no border)
 * @property {number} substract_parallaxer_pixels - Pixels to subtract from parallax calculations
 * @property {string} content_width - Custom content width (set to "0" for default)
 * @property {string} width_column - Custom column width (set to "0" for default)
 * @property {string} width_gap - Custom gap width (set to "0" for default)
 * @property {string} width_blur_margin - Custom blur margin width (set to "0" for default)
 * @property {string} content_gap_width - Gap width between columns in pixels (must be even value, set to "0" for default)
 * @property {"scroll"|"mousemove"} menu_scroll_method - Menu scroll method when menu height exceeds window height
 * @property {"custom"|"select"} responsive_menu_type - Responsive menu type ("custom" or "select" for native mobile)
 * @property {"fade"|"slidedown"} bg_transition - Background transition type
 * @property {"on"|"off"} new_bg_transition - Keep initial background if set to "off"
 * @property {VideoPlayerSettings} video_player_settings - Video player configuration settings
 */

/** @type {QucreativeConfig} */
export const QUCREATIVE_DEFAULTS = {
  images_arr: ["#ffffff"],
  bg_slideshow_time: "0", // -- slideshow time in seconds. If it 0 then there the background images will not have a slideshow
  site_url: "detect",
  enable_ajax: "on", // -- if this is set to "on" then pages will load without browser reload ( can only be set on init )
  page: "index",
  bg_isparallax: "off",
  gallery_w_thumbs_autoplay_videos: "on", // -- enable the native scrollbar
  enable_native_scrollbar: "on",
  blur_amount: 25,
  border_width: "0", // -- if set to higher then 0, then a border of n pixels will sorround the site
  substract_parallaxer_pixels: 10,
  content_width: "0", // -- set a custom content width
  width_column: "0", // -- set a custom column width
  width_gap: "0", // -- set a custom gap width
  width_blur_margin: "0", // -- set a custom gap width
  content_gap_width: "0", // -- set a custom gap width between columns, needs to be a even value ( in pixels )

  menu_scroll_method: "scroll", // -- when the menu height is bigger then the window height, this is an option either to scroll with the mouse wheel ( "scroll" ) or to scroll based on mouse move ( "mousemove" )

  responsive_menu_type: "custom", // -- "custom" a custom forged, "select" a select menu for native mobile devices select menu
  bg_transition: "slidedown", // -- fade or slidedown
  new_bg_transition: "on", // -- if set to "off" then the initial background will remain

  video_player_settings: {
    init_each: true,
    settings_youtube_usecustomskin: "off",
    design_skin: "skin_reborn",
    settings_video_overlay: "on",
  },
};

export const QU_VIEW_ANIM_DEFAULT_TIME = 400;
export const RESPONSIVE_BREAKPOINT = 1000;
export const regex_menu_type =
  /menu-type-(.*?)( |$)/g;
export const regex_bodyclass_page =
  /.*?(page-(?:blogsingle|homepage|gallery-w-thumbs|normal|contact|about|contact|portfolio|portfolio-single))/g;
export const regex_ajax_find_scripts =
    /<script.*?src=['|"](.*?)['|"][\s|\S]*?\/script>/gim;
export const regex_ajax_find_links =
    /(<!--\[if lt IE \d*\]>[\S|\s]{0,1})?<link.*?href=['|"](.*?)['|"][\s|\S]*?\/{0,1}>/gim;
