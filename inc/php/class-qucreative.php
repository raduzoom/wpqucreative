<?php
include_once QUCREATIVE_THEME_DIR.'inc/php/view/class-view-qucreative.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/admin/QuCreativeAdmin.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/view-sanitize-theme-mod.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/view-social-icons.php';
class QuCreative {

  public QuCreativeAdmin $quCreativeAdmin;
  public QuCreativeView $quCreativeView;

  public array $theme_data = QUCREATIVE_INITIAL_THEME_DATA;
  public int $view_loop_currIndex = 0;
  function __construct() {


    $this->quCreativeAdmin = new QuCreativeAdmin($this);
    $this->quCreativeView = new QuCreativeView($this);

    $this->theme_data['allowed_html_tags'] = QUCREATIVE_ALLOWED_TAGS;

    $theme_mods = array();




    foreach ( QUCREATIVE_THEME_MOD_KEYS as $key ) {
      $value = get_theme_mod( $key );
      $theme_mods[ $key ] = $value;
    }


    $this->theme_data['theme_mods'] = $theme_mods;



    foreach($this->theme_data['theme_mods'] as $lab => $tm_val){

      if(is_string($tm_val)){
        $this->theme_data['theme_mods'][$lab] = esc_html($tm_val);
      }

    }




    if(!isset($this->theme_data['theme_mods']['enable_ajax'])){
      $uns =  array();
      foreach ($this->theme_data[CUSTOMIZER_FIELDS_LAB]  as  $cf){
        $uns[$cf['name']] = $cf['default'];
      }
      $this->theme_data['theme_mods'] = array_merge($uns, $this->theme_data['theme_mods']) ;
      update_option('theme_mods_qucreative',$uns);
    }









    foreach ($this->theme_data[CUSTOMIZER_FIELDS_LAB]   as  $cf){
      $val = $this->get_theme_mod_and_sanitize($cf['name']);
      $this->theme_data['theme_mods'][$cf['name']] = $val;

      if($val==''){

        $this->theme_data['theme_mods'][$cf['name']] = $cf['default'];
      }
    }







    qucreative_view_controller_socialIcons($this);



    add_action('widgets_init', array($this,'qucreative_widgets_areas_init'), 10);
    add_action('init', array($this, 'handle_init'), 10);
  }

  public function handle_init(): void {











    if( isset($_GET['customize_changeset_uuid']) && ($_GET['customize_changeset_uuid']) ){
      $this->theme_data['sw_is_in_customizer'] = true;
    }









    // -- header



  }


  /**
   * Register widget area.
   *
   */
  function qucreative_widgets_areas_init() {

    global $qucreative_main;


    $typography_sidebar_heading_style = $qucreative_main->get_theme_mod_and_sanitize('typography_sidebar_heading_style');
    $typography_footer_heading_style = $qucreative_main->get_theme_mod_and_sanitize('typography_footer_heading_style');

    if ($typography_sidebar_heading_style) {

    } else {
      $typography_sidebar_heading_style = 'h6';
    }

    if ($typography_footer_heading_style) {

    } else {
      $typography_footer_heading_style = 'h6';
    }


    $wrap = array(
      'start' => '<' . $typography_sidebar_heading_style . ' class="the-variable-heading widget-title">',
      'end' => '</' . $typography_sidebar_heading_style . '>',
    );
    $wrap = apply_filters('qucreative_widget_title_wrap', $wrap, array(
      'heading_style' => $typography_sidebar_heading_style,
      'sidebar_id' => 'sidebar-1',
      'location' => 'sidebar',
    ));


    register_sidebar(array(
      'name' => esc_html__('Widget Area', 'qucreative'),
      'id' => 'sidebar-1',
      'description' => esc_html__('Add widgets here to appear in your sidebar.', 'qucreative'),
      'before_widget' => '<div id="%1$s" class="widget %2$s sidebar-block">',
      'after_widget' => '</div>',
      'before_title' => $wrap['start'],
      'after_title' => $wrap['end'],
    ));


    $wrap = array(
      'start' => '<' . $typography_footer_heading_style . ' class="the-variable-heading widget-title">',
      'end' => '</' . $typography_footer_heading_style . '>',
    );
    $wrap = apply_filters('qucreative_widget_title_wrap', $wrap, array(
      'heading_style' => $typography_footer_heading_style,
      'sidebar_id' => 'sidebar-footer',
      'location' => 'footer',
    ));


    register_sidebar(array(
      'name' => esc_html__('Footer Area', 'qucreative'),
      'id' => 'sidebar-footer',
      'description' => esc_html__('Add widgets here to appear in your sidebar.', 'qucreative'),
      'before_widget' => '<div id="%1$s" class="widget %2$s sidebar-block">',
      'after_widget' => '</div>',
      'before_title' => $wrap['start'],
      'after_title' => $wrap['end'],
    ));
  }




  /**
   * @param WP_Post | null $postForMeta
   * @return void
   */
  function themeData_setPostForMeta(?WP_Post $postForMeta) {
    $this->theme_data['post_for_meta'] = $postForMeta;
  }

  function themeData_setViewTitle(?string $viewTitle) {
    $this->theme_data['view_title'] = $viewTitle;

  }

  static function add_customizer_field($cf, $wp_customize) {




    $args = array(
      'default' => $cf['default'],

    );

    if (isset($cf['transport'])) {
      $args['transport'] = $cf['transport'];
    }

    if ($cf['name']) {


      if ($cf['name'] == 'font_data') {
        // -- todo: weird.. does not work in child theme
        $my_theme = wp_get_theme();
        if ($my_theme->get('TextDomain') == 'qucreative-child') {
          $args['default'] = '';
        }

      }
      
      // Determine appropriate sanitize callback based on field characteristics
      $sanitize_callback = self::get_sanitize_callback_for_field($cf);
      
      $wp_customize->add_setting(
        $cf['name'],
        array_merge($args, array(
          'sanitize_callback' => $sanitize_callback,
        ))
      );
    }

  }
  
  /**
   * Get the appropriate sanitize callback for a customizer field
   * 
   * @param array $cf The customizer field configuration
   * @return string The sanitize callback function name
   */
  static function get_sanitize_callback_for_field($cf) {
    $field_name = $cf['name'];
    
    // Field-specific sanitization rules
    $sanitize_rules = array(
      // URLs and images
      'logo' => 'qucreative_sanitize_url',
      'background_image' => 'qucreative_sanitize_url',
      
      // Colors
      'highlight_color' => 'qucreative_sanitize_color',
      'border_color' => 'qucreative_sanitize_color',
      'text_color' => 'qucreative_sanitize_color',
      
      // Numeric values
      'logo_width' => 'qucreative_sanitize_integer',
      'logo_height' => 'qucreative_sanitize_integer',
      'logo_x_custom' => 'qucreative_sanitize_integer',
      'logo_y_custom' => 'qucreative_sanitize_integer',
      'border_width' => 'qucreative_sanitize_integer',
      'content_add_extra_pixels' => 'qucreative_sanitize_integer',
      'section_margin_bottom' => 'qucreative_sanitize_integer',
      'bg_slideshow_time' => 'qucreative_sanitize_integer',
      'content_environment_opacity' => 'qucreative_sanitize_integer',
      
      // Textareas
      'copyright_textbox' => 'qucreative_sanitize_textarea',
      
      // Select/dropdowns
      'logo_x' => 'qucreative_sanitize_text',
      'logo_y' => 'qucreative_sanitize_text',
      'bg_transition' => 'qucreative_sanitize_text',
      'menu_type' => 'qucreative_sanitize_text',
      'page_title_align' => 'qucreative_sanitize_text',
      
      // JSON data
      'social_icons' => 'qucreative_sanitize_json',
      'font_data' => 'qucreative_sanitize_json',
      
      // Checkboxes/booleans
      'enable_ajax' => 'qucreative_sanitize_checkbox',
    );
    
    // If we have a specific rule for this field, use it
    if (isset($sanitize_rules[$field_name])) {
      return $sanitize_rules[$field_name];
    }
    
    // Check for field type if specified in config
    if (isset($cf['type'])) {
      switch ($cf['type']) {
        case 'url':
          return 'qucreative_sanitize_url';
        case 'color':
          return 'qucreative_sanitize_color';
        case 'textarea':
          return 'qucreative_sanitize_textarea';
        case 'integer':
        case 'number':
          return 'qucreative_sanitize_integer';
        case 'checkbox':
          return 'qucreative_sanitize_checkbox';
        case 'select':
          return 'qucreative_sanitize_select';
        case 'json':
          return 'qucreative_sanitize_json';
      }
    }
    
    // Pattern matching for common field names
    if (strpos($field_name, '_color') !== false) {
      return 'qucreative_sanitize_color';
    }
    
    if (strpos($field_name, '_url') !== false || strpos($field_name, '_image') !== false) {
      return 'qucreative_sanitize_url';
    }
    
    if (strpos($field_name, '_width') !== false || strpos($field_name, '_height') !== false) {
      return 'qucreative_sanitize_integer';
    }
    
    // Default to text sanitization
    return 'qucreative_sanitize_text';
  }

  function get_theme_mod_and_sanitize($arglab, $args = array()){

    return qucreative_view_get_theme_mod_and_sanitize($this, $arglab, $args);

  }


  static function getInstance() {
    global $qucreative_main;

    return $qucreative_main;
  }

  static function getPostForMeta($post) {

    $post_for_meta = $post;

    $qucreative_main = QuCreative::getInstance();

    if($qucreative_main->theme_data['post_for_meta']){
      $post_for_meta = $qucreative_main->theme_data['post_for_meta'];
    }else{
      if(is_home()){
        if(get_option( 'page_for_posts' )){
          $post_for_meta = get_post(get_option( 'page_for_posts' ));
        }

      }
    }

    return $post_for_meta;
  }


}
