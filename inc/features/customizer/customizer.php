<?php

if (function_exists('qucreative_return_false_value') == false) {
  function qucreative_return_false_value($value) {
    return $value;
  }
}


add_action('customize_controls_print_styles', 'qucreative_customize_controls_print_styles');


add_action('customize_register', 'qucreative_customize_register', 11);
add_action('customize_register', 'qucreative_customize_register_after_plugin', 13);


function qucreative_customize_controls_print_styles() {


  global $qucreative_main;


  wp_enqueue_script('qucreative.admin', QUCREATIVE_THEME_URL . 'assets/admin/admin.js', array('jquery'));
  qucreative_render_admin_settings();

  echo '<style>
	
	
.picker-con{
    display:inline-block;
    position:relative;
    z-index:5;
    margin-left: 5px;
}
.picker-con .the-icon{
    width:17px;
    height:17px;
    position:relative;
    top:2px;
    cursor:pointer;
    background-repeat:no-repeat;
    background-position:center center;
}

.picker-con .picker:before{
    content: \' \';
    position:absolute;
    top:auto; bottom: 20px;
    left:-10px;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;

    border-right:10px solid #333;
}
.picker-con .picker{
    position:absolute;
    top:auto;
    bottom: -20px;
    left:30px;
    background:#EEEEEE;
    padding:10px;
    border-radius:5px;
    border:1px solid #aaa;
    display:none;
}</style>';

  wp_enqueue_script('farbtastic');


  $qucreative_main->theme_data['admin_head_extra'] = '';

  if (defined("QUCREATIVE_VERSION")) {



    if (!isset($_POST) || is_array($_POST) == false || count($_POST) == 0) {

      $qucreative_main->theme_data['admin_head_extra'] .= '<script>
                window.qucreative_font_data = \'' . $qucreative_main->theme_data['font_data_str'] . '\';
            </script>';


    }
  }

  echo $qucreative_main->theme_data['admin_head_extra'];


}


/**
 * @param WP_Customize_Manager $wp_customize
 * @return void
 */
function qucreative_customize_register_after_plugin(WP_Customize_Manager $wp_customize): void {

  $section_id = 'settings_header';
  qucreative_admin_customizer_header_addSections($wp_customize, $section_id);
}
/**
 * @param WP_Customize_Manager $wp_customize
 * @return void
 */
function qucreative_customize_register(WP_Customize_Manager $wp_customize): void {


  global $qucreative_main;


  if (defined("QUCREATIVE_VERSION")) {


  }


  $wp_customize->add_section(
    'settings_site',
    array(
      'title' => esc_html__("General Settings", 'qucreative'),
      'description' => esc_html__("Configure site options", 'qucreative'),
      'priority' => 35,
    )
  );


  $args = array(
    'sort_order' => 'asc',
    'sort_column' => 'post_title',
    'hierarchical' => 1,
    'exclude' => '',

    'meta_key' => '',
    'meta_value' => '',
    'authors' => '',
    'child_of' => 0,
    'parent' => -1,
    'exclude_tree' => '',
    'number' => '',
    'offset' => 0,
    'post_type' => 'page',
    'post_status' => 'publish'
  );
  $pages = get_pages($args);


  $arr_pages = array();


  foreach ($pages as $pg) {


    $arr_pages[$pg->ID] = $pg->post_title;
  }


  $cfi = 0;
  foreach ($qucreative_main->theme_data[CUSTOMIZER_FIELDS_LAB] as $cf) {


    $args = array(
      'default' => $cf['default'],

    );

    if (isset($cf['transport'])) {
      $args['transport'] = $cf['transport'];
    }


    if ($cf['name']) {

      if ($cfi > 100) {


        break;
      }


      if ($cf['name'] == 'font_data') {


        // -- todo: weird.. does not work in child theme


        $my_theme = wp_get_theme();


        if ($my_theme->get('TextDomain') == 'qucreative-child') {
          $args['default'] = '';
        }

      }
      $wp_customize->add_setting(
        $cf['name'],
        array_merge($args, array(
          'sanitize_callback' => 'qucreative_return_false_value',
        ))
      );

      $cfi++;
    }
  }

//	return false;


  $wp_customize->add_control(
    'portfolio_page',
    array(
      'label' => esc_html__("Portfolio Page", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'select',
      'choices' => $arr_pages,
    )
  );


  $arr_pages = array();


  $arr_pages['wp_mail'] = esc_html__("WP Mail", 'qucreative');
  $arr_pages['smtp'] = esc_html__("SMTP Mail", 'qucreative');

  $lab = 'mail_method';


  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Mail Method", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'select',
      'choices' => $arr_pages,
    )
  );


  $wp_customize->add_control(
    'blur_amount',
    array(
      'label' => esc_html__("Blur Amount", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'text',
    )
  );


  $lab = 'gmaps_api_key';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Google Maps API Key", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'text',
    )
  );


  $lab = 'gmaps_styling';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Google Maps Styling", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'textarea',
    )
  );


  $lab = 'secondary_content_height';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Secondary Content Height", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'text',
    )
  );


  $arr_opts = array(
    'body-style-dark' => esc_html__("Style Dark", 'qucreative'),
    'body-style-light' => esc_html__("Style Light", 'qucreative'),
  );


  $lab = 'content_environment_style';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Content Enviroment Style", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'select',
      'choices' => $arr_opts,
    )
  );


  $wp_customize->add_control(
    new Qucreative_Slider_Input(
      $wp_customize,
      'content_environment_opacity',
      array(
        'label' => esc_html__('Content Enviroment Opacity', 'qucreative'),
        'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      ))
  );


  $wp_customize->add_control(
    'greyscale_amount',
    array(
      'label' => esc_html__("Greyscale Effect Amount", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'text',
    )
  );


  $wp_customize->add_control(
    'blur_amount',
    array(
      'label' => esc_html__("Blur Amount", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'text',
    )
  );


  $arr_on_off = array(
    'on' => esc_html__("Native", 'qucreative'),
    'off' => esc_html__("Custom", 'qucreative'),
  );


  $arr_on_off = array(
    'on' => esc_html__("Yes", 'qucreative'),
    'off' => esc_html__("No", 'qucreative'),
  );


  $wp_customize->add_control(
    'bg_isparallax',
    array(
      'label' => esc_html__("Parallax Background?", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'select',
      'choices' => $arr_on_off,
    )
  );


  $arr_on_off = array(
    'on' => esc_html__("Yes", 'qucreative'),
    'off' => esc_html__("No", 'qucreative'),
  );


  $wp_customize->add_control(
    'enable_ajax',
    array(
      'label' => esc_html__("Enable Ajax Navigation?", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'select',
      'choices' => $arr_on_off,
    )
  );


  $arr_on_off = array(
    'off' => esc_html__("Off", 'qucreative'),
    'on' => esc_html__("On", 'qucreative'),
  );


  $wp_customize->add_control(
    'enable_bordered_design',
    array(
      'label' => esc_html__("Enable Bordered Design", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'select',
      'std' => 'on',
      'choices' => $arr_on_off,
    )
  );


  $arr_transition = array(
    'slidedown' => esc_html__("Slide Down", 'qucreative'),
    'wipedown' => esc_html__("Wipe Down", 'qucreative'),
    'fade' => esc_html__("Fade", 'qucreative'),
    'none' => esc_html__("None", 'qucreative'),
  );


  $wp_customize->add_control(
    'bg_transition',
    array(
      'label' => esc_html__("Site Transition", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'select',
      'choices' => $arr_transition,
    )
  );


  $wp_customize->add_control(
    'bg_slideshow_time',
    array(
      'label' => esc_html__("Background Transition Slideshow Time", 'qucreative'),
      'section' => 'settings_site',
      'type' => 'text',

    )
  );


  $wp_customize->add_control(
    new WP_Customize_Color_Control(
      $wp_customize,
      'highlight_color',
      array(
        'label' => esc_html__('Highlight Color', 'qucreative'),
        'section' => 'settings_site',
      ))
  );






  $wp_customize->add_section(
    QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
    array(
      'title' => esc_html__("Content Settings", 'qucreative'),
      'description' => esc_html__("Configure content options", 'qucreative'),
      'priority' => 35,
    )
  );


  $arr_opts = array(
    'content-align-center' => esc_html__("Center", 'qucreative'),
    'content-align-left' => esc_html__("Left", 'qucreative'),
    'content-align-right' => esc_html__("Right", 'qucreative'),
  );


  $lab = 'content_align';
  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Content Align", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'select',
      'choices' => $arr_opts,
    )
  );


  $arr_opts = array(
    'page-title-align-left' => esc_html__("Left", 'qucreative'),
    'page-title-align-center' => esc_html__("Center", 'qucreative'),
    'page-title-align-right' => esc_html__("Right", 'qucreative'),
  );


  $lab = 'page_title_align';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Page Title Align", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'select',
      'choices' => $arr_opts,
    )
  );


  $wp_customize->add_control(
    new Qucreative_Slider_Input(
      $wp_customize,
      'section_margin_bottom',
      array(
        'label' => esc_html__('Section Spacing', 'qucreative'),
        'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],

        'json' => array(
          'min' => 0,
          'max' => 50,
        ),
      ))
  );


  $wp_customize->add_control(
    'width_column',
    array(
      'label' => esc_html__("Column Width", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'text',
    )
  );


  $lab = 'width_gap';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Gap Width", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'text',
    )
  );


  $lab = 'width_blur_margin';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Content Margin Width", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'text',
    )
  );


  $lab = 'width_section_bg';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Section Background Stretch", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'text',
    )
  );


  $lab = 'content_add_extra_pixels';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Add Extra Pixels", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'text',
    )
  );


  $lab = 'border_width';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Site Border", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'type' => 'text',
    )
  );


  $lab = 'view_animation_duration';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Animation Duration", 'qucreative'),
      'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      'description' => esc_html__("Set the duration of the animation in seconds", 'qucreative'). ' ie. <strong>0.5s</strong>',
      'type' => 'text',
    )
  );


  $lab = 'border_color';


  $wp_customize->add_control(
    new WP_Customize_Color_Control(
      $wp_customize,
      $lab,
      array(
        'label' => esc_html__('Border Color', 'qucreative'),
        'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      ))
  );


  // -- header settings


  $section_id = 'settings_header';
  /** @var WP_Customize $wp_customize */
  $wp_customize->add_section(
    $section_id,
    array(
      'title' => esc_html__("Header Settings",QUCREATIVE_ID),
      'description' => 'This is a settings section.',
      'priority' => 35,
    )
  );

  include_once QUCREATIVE_THEME_DIR.'inc/features/customizer/customizer-section-header.php';



  $wp_customize->add_section(
    'settings_presets',
    array(
      'title' => esc_html__("Theme Design Presets", 'qucreative'),
      'description' => esc_html__("Choose a design preset", 'qucreative'),
      'priority' => 1,
    )
  );


  $lab = 'presets';

  $wp_customize->add_setting(
    $lab,
    array(
      'default' => '1',
      'sanitize_callback' => 'qucreative_return_false_value',
      'transport' => 'postMessage',
    )
  );





}


function qucreative_sanitize_checkbox_multiple($values) {

  $multi_values = !is_array($values) ? explode(',', $values) : $values;

  return !empty($multi_values) ? array_map('sanitize_text_field', $multi_values) : array();
}


/**
 * Binds JS listener to make Customizer color_scheme control.
 *
 * Passes color scheme data as colorScheme global.
 *
 *
 */
function qucreative_customize_control_js() {


  wp_enqueue_script('qucreative-customizer', QUCREATIVE_THEME_URL . 'assets/admin/customizer.js');
  wp_enqueue_style('faiconselector', QUCREATIVE_THEME_URL . 'assets/dzsiconselector/dzsiconselector.css');
  wp_enqueue_script('faiconselector', QUCREATIVE_THEME_URL . 'assets/dzsiconselector/dzsiconselector.js');


  wp_enqueue_script('jquery-ui-slider');
  wp_enqueue_style('jquery-ui-smoothness', 'https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');


}

add_action('customize_controls_enqueue_scripts', 'qucreative_customize_control_js');

/**
 * Binds JS handlers to make the Customizer preview reload changes asynchronously.
 *
 *
 */
function qucreative_customize_preview_js() {
  wp_enqueue_script('q-customize-preview', get_template_directory_uri() . '/js/customize-preview.js', array('customize-preview'), '20141216', true);
}

add_action('customize_preview_init', 'qucreative_customize_preview_js');


/**
 * Multiple checkbox customize control class.
 *
 * @since  1.0.0
 * @access public
 */

if (class_exists('WP_Customize_Control')) {

  include_once 'Qucreative_Customize_Control_Checkbox_Nova.php';
  include_once 'Qucreative_Customize_Control_Checkbox_Multiple.php';
  include_once 'Qucreative_Slider_Input.php';
  include_once 'Qucreative_Input_With_Dependency.php';
  include_once 'Qucreative_Select_With_Dependency.php';
}

