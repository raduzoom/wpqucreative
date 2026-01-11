<?php


// -- in plugin
// -- in plugin



const QUCREATIVE_CUSTOMIZER_SECTIONS = array(
  'settings_content'=>'settings_content'
);
const QUCREATIVE_CUSTOMIZER_FIELDS = array(

  array(
    'name' => 'logo',
    'default' => QUCREATIVE_THEME_URL . 'assets/img/qlogo.png',
  ),
  array(
    'name' => 'logo_x',
    'default' => 'default',
  ),
  array(
    'name' => 'view_animation_duration',
    'default' => 'default',
  ),
  array(
    'name' => 'logo_x_custom',
    'default' => '',
  ),
  array(
    'name' => 'logo_y',
    'default' => 'default',
  ),
  array(
    'name' => 'logo_width',
    'default' => '',
  ),
  array(
    'name' => 'logo_height',
    'default' => '',
  ),
  array(
    'name' => 'logo_y_custom',
    'default' => '',
  ),
  array(
    'name' => 'copyright_textbox',
    'default' => "Default copyright text",
  ),
  array(
    'name' => 'greyscale_amount',
    'default' => '0',
  ),
  array(
    'name' => 'section_margin_bottom',
    'default' => '30',
  ),
  array(
    'name' => 'highlight_color',
    'default' => '#97c1cf',
  ),
  array(
    'name' => 'bg_transition',
    'default' => 'slidedown',
  ),
  array(
    'name' => 'bg_slideshow_time',
    'default' => '10',
  ),


  // -- plugin ajax

  array(
    'name' => 'enable_ajax',
    'default' => 'off',
  ),

  // -- plugin


  array(
    'name' => 'width_gap',
    'default' => '30',
  ),
  array(
    'name' => 'width_section_bg',
    'default' => '',
  ),

  array(
    'name' => 'content_add_extra_pixels',
    'default' => '',
  ),
  array(
    'name' => 'border_width',
    'default' => '0',
  ),
  array(
    'name' => 'border_color',
    'default' => '#ffffff',
  ),
  array(
    'name' => 'content_section_title_two_lines_space',
    'default' => '0',
  ),
  array(
    'name' => 'content_section_title_two_lines_use_divider',
    'default' => '',
  ),
  array(
    'name' => 'content_section_title_two_lines_use_divider_color',
    'default' => '',
  ),

  array(
    'name' => 'secondary_content_height',
    'default' => '300',
  ),
  array(
    'name' => 'gmaps_api_key',
    'default' => '',
  ),
  array(
    'name' => 'gmaps_styling',
    'default' => '',
  ),
  array(
    'name' => 'content_align',
    'default' => 'content-align-center',
  ),
  array(
    'name' => 'page_title_align',
    'default' => 'page-title-align-right',
  ),
  array(
    'name' => 'page_title_style',
    'default' => 'page-title-style-2',
  ),
  array(
    'name' => 'menu_type',
    'default' => 'menu-type-1',
  ),
  array(
    'name' => 'menu_is_sticky',
    'default' => 'off',
  ),
  array(
    'name' => 'search_in_header',
    'default' => 'off',
  ),
  array(
    'name' => 'menu_horizontal_shadow_style',
    'default' => 'none',
  ),
  array(
    'name' => 'content_environment_style',
    'default' => 'body-style-dark',
  ),
  array(
    'name' => 'enable_bordered_design',
    'default' => 'on',
  ),
  array(
    'name' => 'blur_amount',
    'default' => '26',
  ),
  array(
    'name' => 'menu_environment_opacity',
    'default' => '30',
  ),
  array(
    'name' => 'content_environment_opacity',
    'default' => '30',
  ),
  array(
    'name' => 'content_link_to_menu_opacity',
    'default' => 'off',
  ),


  array(
    'name' => 'copyright_textbox_heading_style',
    'default' => 'h-group-1',
  ),
  array(
    'name' => 'typography_sidebar_heading_style',
    'default' => 'h6',
    'transport' => 'postMessage',
  ),
  array(
    'name' => 'typography_footer_heading_style',
    'default' => 'h6',
    'transport' => 'postMessage',
  ),

  array(
    'name' => 'social_icons',
    'default' => '',
  ),
  array(
    'name' => 'meta_options_post_types',
    'default' => false,
  ),

  array(
    'name' => 'footer_copyright_textbox_heading_style',
    'default' => 'h-group-1',
  ),

  array(
    'name' => 'bg_isparallax',
    'default' => 'off',
  ),

  array(
    'name' => 'social_enable_gplus_share',
    'default' => false,
  ),
  array(
    'name' => 'social_enable_pinterest_share',
    'default' => false,
  ),

);



// Extract the `name` keys
define("QUCREATIVE_THEME_MOD_KEYS", array_map(function ($field) {
  return $field['name'];
}, QUCREATIVE_CUSTOMIZER_FIELDS));

const CUSTOMIZER_FIELDS_LAB = 'customizer_fields';

/**
 * for quCreativeMain->theme_data
 */
const QUCREATIVE_INITIAL_THEME_DATA = array(
  'preview_cookies' => array(),
  'view_loop_data' => array(
    'loop_type'=>"loop",// "loop" or "content_page"
  ),

  'page_type' => '',

  'menu_type' => '',
  'menu_type_attr' => '',
  'menu_horizontal_width' => '',

  'body_class' => '',
  'footer_extra_css' => '',

  'css_data_overlay_opacity' => '',
  'css_data_style_env' => '',
  'css_data_typography' => '',
  'css_data_highlight' => '',
  'css_data_contain' => '',

  'replace_string_in_content_with_nada' => '',
  'view_js_data_for_inline_options' => '',
  'page_extra_meta_label' => '',
  'title_label' => 'QuCreative',
  'post_content_has_translucent_layer' => false,
  'sw_is_in_customizer' => false,
  'content_acts_as_sheet' => false,
  'content_link_to_menu_opacity' => false,
  'post_for_meta' => null,
  'view_title' => '',
  CUSTOMIZER_FIELDS_LAB => QUCREATIVE_CUSTOMIZER_FIELDS,

  // -- qu extend
  'font_data' => array(),
  'font_vals' => array(),
  'font_data_str' => '',
  'font_data_items' => array(),
  'font_used' => array(),
  'header_social_icons' => array(),
  'social_icons' => array(),
  'secondary_content_height' => 300,

  // -- qu preview
  'is_preview' => false,
  'is_preview_blog' => false,
  'preview_page' => false,
);
