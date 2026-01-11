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




  wp_enqueue_script('qucreative.admin', QUCREATIVE_THEME_URL . 'assets/admin/admin.js', array('jquery'));
  qucreative_render_admin_settings();



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



  $wp_customize->add_section(
    'settings_site',
    array(
      'title' => esc_html__("General Settings", 'qucreative'),
      'description' => esc_html__("Configure site options", 'qucreative'),
      'priority' => 35,
    )
  );




  foreach (QUCREATIVE_CUSTOMIZER_FIELDS as $cf) {

    QuCreative::add_customizer_field($cf, $wp_customize);
  }













  $wp_customize->add_control(
    new Qucreative_Slider_Input(
      $wp_customize,
      'content_environment_opacity',
      array(
        'label' => esc_html__('Content Environment Opacity', 'qucreative'),
        'section' => QUCREATIVE_CUSTOMIZER_SECTIONS['settings_content'],
      ))
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
      'title' => esc_html__("Header Settings",'qucreative'),
      'description' => 'This is a settings section.',
      'priority' => 35,
    )
  );

  include_once QUCREATIVE_THEME_DIR.'inc/features/customizer/customizer-section-header.php';








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



}

add_action('customize_controls_enqueue_scripts', 'qucreative_customize_control_js');

/**
 * Binds JS handlers to make the Customizer preview reload changes asynchronously.
 *
 *
 */
function qucreative_customize_preview_js() {
  wp_enqueue_script('qucreative-customize-preview', QUCREATIVE_THEME_URL . 'inc/features/customizer/js/customize-preview.js', array('customize-preview'), QUCREATIVE_VERSION, true);
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

