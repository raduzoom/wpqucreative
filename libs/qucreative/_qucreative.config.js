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
