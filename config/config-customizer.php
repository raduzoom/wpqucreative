<?php


// -- in plugin
const QUCREATIVE_OPTION_FONT_NAME = 'font_data';
// -- in plugin
const QUCREATIVE_DEFAULT_TYPOGRAPHY = 'headings_font=Lato&h1_weight=700&h1_size=70&h1_line_height=1.15&h1_responsive_slider=30&h2_weight=700&h2_size=50&h2_line_height=1.15&h2_responsive_slider=20&h3_weight=700&h3_size=40&h3_line_height=1.15&h3_responsive_slider=10&h4_weight=700&h4_size=30&h4_line_height=1.15&h4_responsive_slider=0&h5_weight=700&h5_size=20&h5_line_height=1.15&h5_responsive_slider=0&h6_weight=700&h6_size=14&h6_line_height=1.57&h6_responsive_slider=0&h-group-1_weight=700&h-group-1_size=11&h-group-1_line_height=1.54&h-group-1_responsive_slider=0&h-group-2_weight=700&h-group-2_size=25&h-group-2_line_height=1.28&h-group-2_responsive_slider=0&body_font=Open+Sans&p_weight=regular&p_size=13&p_line_height=1.92&p_color=%236b6b6b&p_color_for_light=%23cccccc&hyperlink_weight=600&font-group-1_weight=600italic&font-group-1_size=14&font-group-1_line_height=1.42&font-group-2_weight=600&font-group-2_size=14&font-group-2_line_height=1.42&font-group-3_weight=600italic&font-group-3_size=11&font-group-3_line_height=1.27&font-group-4_weight=italic&font-group-4_size=14&font-group-4_line_height=1.42&font-group-5_weight=600&font-group-5_size=14&font-group-5_line_height=1.42&font-group-6_weight=regular&font-group-6_size=13&font-group-6_line_height=1.55&font-group-7_weight=italic&font-group-7_size=13&font-group-7_line_height=1.46&font-group-8_weight=regular&font-group-8_size=14&font-group-8_line_height=1.65&font-group-9_weight=600&font-group-9_size=15&font-group-9_line_height=1.7&font-group-10_weight=600&font-group-10_size=16&font-group-10_line_height=1.68&font-group-11_weight=800&font-group-11_size=24&font-group-11_line_height=1.29&font-group-12_weight=600&font-group-12_size=13&font-group-12_line_height=1.46&blockquote_weight=italic&blockquote_size=17&blockquote_line_height=1.58&menu_font=Lato&menu_weight=regular&menu_size=18&menu_line_height=1.2&copyright_font_link_to=headings&copyright_weight=700&copyright_size=10&copyright_line_height=1.4&page_title_font=Lato&page_title_weight=900&page_title_size=70&page_title_line_height=1&page_title_color=&page_title_responsive_slider=30&page_title_orientation=horizontal&section_title_two_font=Lato&section_title_two_first_weight=700&section_title_two_first_size=24&section_title_two_first_line_height=1.1&section_title_two_first_color=%23222222&section_title_two_first_color_for_light=%23ffffff&section_title_two_first_responsive_slider=10&section_title_two_second_font=Playfair+Display&section_title_two_second_weight=900italic&section_title_two_second_size=60&section_title_two_second_line_height=1.1&section_title_two_second_color=%23222222&section_title_two_second_color_for_light=%23ffffff&section_title_two_second_responsive_slider=30&line_spacing=3&section_title_two_number_font=Lato&section_title_two_number_weight=700italic&section_title_two_number_size=24&section_title_two_number_line_height=1.1&section_title_two_number_color=%23222222&section_title_two_number_color_for_light=%23ffffff&section_title_two_divider_divider_style=style-box&section_title_two_divider_color=%23444444&section_title_two_divider_color_for_light=%23ffffff&title_divider_spacing_two=20&section_title_one_first_font=Lato&section_title_one_first_weight=700&section_title_one_first_size=20&section_title_one_first_line_height=1.28&section_title_one_first_color=%23222222&section_title_one_first_color_for_light=%23ffffff&section_title_one_first_responsive_slider=0&section_title_one_divider_enable=on&section_title_one_divider_divider_style=style-box&section_title_one_divider_color=%23222222&section_title_one_divider_color_for_light=%23ffffff&title_divider_spacing=15&home_slider_font_link_to=headings&home_slider_weight=900&home_slider_size=50&home_slider_line_height=1.20&home_slider_color=%23ffffff&home_slider_color_for_light=%23222222&home_number_font_link_to=headings&home_number_weight=900&home_number_size=135&home_number_line_height=1';


const QUCREATIVE_CUSTOMIZER_SECTIONS = array(
  'settings_content'=>'settings_content'
);
const QUCREATIVE_CUSTOMIZER_FIELDS = array(

  // -- deprecate mail_method
  array(
    'name' => 'mail_method',
    'default' => 'wp_mail',
  ),
  array(
    'name' => 'logo',
    'default' => QUCREATIVE_THEME_URL . 'img/qlogo.png',
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
    'name' => 'portfolio_page',
    'default' => '',
  ),
  array(
    'name' => 'width_column',
    'default' => '56',
  ),
  array(
    'name' => 'width_gap',
    'default' => '30',
  ),
  array(
    'name' => 'width_blur_margin',
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
    'name' => QUCREATIVE_OPTION_FONT_NAME,
    'default' => QUCREATIVE_DEFAULT_TYPOGRAPHY,
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
  'admin_head_extra' => '',

  'css_data_overlay_opacity' => '',
  'css_data_style_env' => '',
  'css_data_typography' => '',
  'css_data_highlight' => '',
  'css_data_contain' => '',

  'replace_string_in_content_with_nada' => '',
  'js_data_for_inline_options' => '',
  'page_extra_meta_label' => '',
  'title_label' => 'QuCreative',
  'post_content_has_translucent_layer' => false,
  'has_footer' => false,
  'sw_is_in_customizer' => false,
  'content_acts_as_sheet' => false,
  'content_link_to_menu_opacity' => false,
  'post_for_meta' => null,
  'view_title' => '',
  CUSTOMIZER_FIELDS_LAB => QUCREATIVE_CUSTOMIZER_FIELDS,
  'default_typography' => QUCREATIVE_DEFAULT_TYPOGRAPHY,

  // -- qu extend
  'font_data' => array(),
  'font_vals' => array(),
  'font_data_str' => '',
  'font_data_items' => array(),
  'font_used' => array(),
  'header_social_icons' => array(),
  'social_icons' => array(),
  'secondary_content_height' => 300,
  'footer_extra_zoombox_items' => '',

  // -- qu extend import
  'import_demo_last_attach_id' => '',
  'import_demo_last_attach_id_500_100' => '',
  'import_demo_last_attach_id_100_400' => '',

  // -- qu preview
  'is_preview' => false,
  'is_preview_blog' => false,
  'preview_page' => false,
);
