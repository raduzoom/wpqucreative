<?php
include_once 'view/class-view-qucreative.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/view-social-icons.php';
class QuCreative {

  public QuCreativeView $quCreativeView;

  public array $theme_data = QUCREATIVE_INITIAL_THEME_DATA;
  function __construct() {


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



    add_action( 'wp_enqueue_scripts', array($this, 'handle_wp_enqueue_scripts') );
    add_action( 'wp_default_scripts', array($this, 'handle_wp_default_scripts') );
    add_action('init', array($this, 'handle_init'), 10);
  }

  /**
   * move to plugin
   * @return void
   */
  function handle_wp_enqueue_scripts() {

    if ( ! is_admin() ) {
      // Remove jQuery
      wp_deregister_script( 'jquery' );

      // Register it again, in the footer
      wp_register_script(
        'jquery',
        includes_url( '/js/jquery/jquery.min.js' ),
        false,
        null,
        true // Load in footer
      );
      wp_enqueue_script( 'jquery' );
    }
  }
  /**
   * move to plugin
   * @return void
   */
  function handle_wp_default_scripts() {

    if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
      $scripts->registered['jquery']->deps = array_diff(
        $scripts->registered['jquery']->deps,
        array( 'jquery-migrate' )
      );
    }
  }
  public function handle_init(): void {











    if( isset($_GET['customize_changeset_uuid']) && ($_GET['customize_changeset_uuid']) ){
      $this->theme_data['sw_is_in_customizer'] = true;
    }









    add_action('widgets_init', array($this,'qucreative_widgets_areas_init'), 1);


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

  function get_theme_mod_and_sanitize($arglab, $args = array()){


    $defaultArgs = $args;
    if(!is_array($defaultArgs)){
      $defaultArgs = array();
    }
    $margs = array_merge(array('type'=>'string', 'cacheIt'=>true), $defaultArgs);


    $argVal = $this->theme_data['theme_mods'][$arglab] ?? get_theme_mod($arglab);

    if($margs['cacheIt']===false){
      $argVal = get_theme_mod($arglab);
    }



    $argVal = esc_html($argVal);

    if($arglab=='social_icons'){
      $argVal = str_replace('&quot;','"',$argVal);
    }
    if($arglab==QUCREATIVE_OPTION_FONT_NAME){

      $argVal = str_replace('&amp;','&',$argVal);
    }

    if($margs['type']=='int'){


      if(!is_numeric(intval($argVal, 10 ))){
        return null;
      }

      return intval($argVal, 10 );
    }

    return $argVal;

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
