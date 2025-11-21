<?php
include_once QUCREATIVE_THEME_DIR . 'inc/php/view/view.util.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/structure-classes.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/view-enqueue-in-head.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/view-enqueue-in-footer.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/get-view-title.php';

class QuCreativeView {

  public QuCreative $quMain;
  public $sidebar;
  public $theme_mods;

  function __construct(QuCreative $quMain) {

    $this->quMain = $quMain;
    add_action('init', array($this, 'handle_init'));
  }

  public function handle_init(): void {


    $this->theme_mods = $this->quMain->theme_data['theme_mods'];
    add_action('wp', array($this, 'handle_wp'));
    add_action('wp_enqueue_scripts', array($this, 'handle_enqueue_scripts'));
    add_action('wp_head', array($this, 'handle_wp_head'), 1);


    if(is_admin()){
      return;
    }


    add_action('qucreative_hook_before_html', array($this,'handle_qucreative_hook_before_html'));
    add_action('qucreative_before_end_main_container', array($this,'handle_qucreative_before_end_main_container'));
  }

  function handle_qucreative_before_end_main_container() {


    $searchedMenuType = $this->quMain->theme_data['menu_type'];

    if (in_array($searchedMenuType, QUCREATIVE_VIEW_OVERLAY_MENUS)) {

      echo '<div class="menu-toggler-target "><div class="q-close-btn qu-overlay-menu-closer"><svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="58.42px" height="58.96px" viewBox="0 0 58.42 58.96" xml:space="preserve"> <polygon fill-rule="evenodd" fill="#FFFFFF" points="57,0 29.21,27.78 1.42,0 0,1.42 27.78,29.21 0,57 1.42,58.42 29.21,30.64 57,58.42 58.42,57 30.63,29.21 58.42,1.42 "></polygon> </svg></div></div>';
    }


    // -- these load in the footer

    qucreative_view_enqueue_in_footer($this);
  }
  function handle_qucreative_hook_before_html() {

    // -- we are in customizer so update values
    $this->quMain->theme_data['menu_type'] = $this->quMain->get_theme_mod_and_sanitize('menu_type', array('cacheIt'=>false));
    $this->quMain->theme_data['theme_mods']['highlight_color'] = $this->quMain->get_theme_mod_and_sanitize('highlight_color');

  }

  /**
   * @return void
   */
  function handle_wp(): void {

    $this->check_viewData();
  }

  function check_viewData() {

    if (is_home()) {

      $this->quMain->theme_data['view_loop_data']['loop_type'] = "loop";
    }
    if (is_single()) {
      $this->quMain->theme_data['view_loop_data']['loop_type'] = "content_page";
    }
    if (is_page()) {

      $this->quMain->theme_data['view_loop_data']['loop_type'] = "content_page";
    }

  }


  static function viewIsMenuVertical($searchedMenuType): bool {
    $horizontalMenus = QUCREATIVE_VIEW_MENU_TYPES_VERTICAL;

    if (in_array($searchedMenuType, $horizontalMenus)) {
      return true;
    }

    return false;
  }

  static function viewIsPageFullwidth(QuCreative $qucreative_main): bool {
    return !!($qucreative_main->theme_data['post_for_meta'] && (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true) == 'template-portfolio.php' || ($qucreative_main->theme_data['post_for_meta']->post_type == QUCREATIVE_POST_TYPE_PORTFOLIO) || $qucreative_main->theme_data['post_for_meta']->post_type == 'page') && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on');
  }

  static function viewIsMenuHorizontal($searchedMenuType): bool {
    $horizontalMenus = QUCREATIVE_VIEW_MENU_TYPES_HORIZONTAL;

    if (in_array($searchedMenuType, $horizontalMenus)) {
      return true;
    }

    return false;
  }

  /**
   * in <head>
   * @return void
   */
  function handle_enqueue_scripts() {


    if (is_admin()) {

      return;
    }


    $this->setThemeData();;


    qucreative_view_enqueue_in_head($this);


  }

  function setThemeData() {




    if (QuCreativeView::viewIsMenuVertical($this->quMain->theme_data['menu_type'])) {

      $this->quMain->theme_data['menu_type_attr'] = QUCREATIVE_VIEW_VERTICAL_MENU_TYPE_CSS_CLASS;
    }
    if (QuCreativeView::viewIsMenuHorizontal($this->quMain->theme_data['menu_type'])) {

      $this->quMain->theme_data['menu_type_attr'] = QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS;
    }
  }

  static function isViewAnimationDurationSet(QuCreativeView $quView): bool {
    return $quView->theme_mods['view_animation_duration'] !== '' && $quView->theme_mods['view_animation_duration'] !== 'default' && $quView->theme_mods['view_animation_duration'] !== '0.4';

  }

  static function isPageFullWidth(QuCreative $qucreative_main) {

    return strpos($qucreative_main->theme_data['page_type'], 'page-gallery-w-thumbs') !== false || strpos($qucreative_main->theme_data['page_type'], 'page-homepage') !== false;
  }

  static function get_page_by_title($page_title, $output = OBJECT, $post_type = 'page') {
    $args = array(
      'title' => $page_title,
      'post_type' => $post_type,
      'post_status' => get_post_stati(),
      'posts_per_page' => 1,
      'update_post_term_cache' => false,
      'update_post_meta_cache' => false,
      'no_found_rows' => true,
      'orderby' => 'post_date ID',
      'order' => 'ASC',
    );
    $query = new WP_Query($args);
    $pages = $query->posts;

    if (empty($pages)) {
      return null;
    }

    return get_post($pages[0], $output);
  }

  public function check_post_forType($mainArgs) {
    global $post;
    $qucreative_main = $this->quMain;

    $page_type = 'page-normal';

    if ($post) {
      if (get_post_meta($post->ID, '_wp_page_template', true) == 'template-qucreative-slider.php') {
        $page_type = 'page-homepage';
      }
      if (get_post_meta($post->ID, '_wp_page_template', true) == 'template-portfolio.php') {
        $page_type = 'page-portfolio';
      }
      if (get_post_meta($post->ID, '_wp_page_template', true) == 'template-gallery-creative.php') {
        $page_type = 'page-gallery-w-thumbs';
      }
    }

    if (is_home() || is_search() || is_archive()) {
      $page_type = 'page-blogsingle';
    }

    if (is_single()) {
      if ($post) {
        if ($post->post_type == QUCREATIVE_POST_TYPE_POST) {
          $page_type = 'page-blogsingle';
        }
      }
    }


    if ($post && $post->post_type === QUCREATIVE_POST_TYPE_PORTFOLIO) {

      $page_type = ' page-portfolio-single ';
      $page_type .= ' page-portfolio-type-' . get_post_meta($post->ID, 'qucreative_' . 'meta_post_media_type' . $qucreative_main->theme_data['page_extra_meta_label'], true);

      if (get_post_meta($post->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {
        $page_type .= ' single-antfarm_port_items-fullscreen';
      } else {

        $page_type .= ' single-antfarm_port_items-notfullscreen';
      }


    }
    if ($post) {
      $page_type .= ' post-media-type-' . esc_attr(get_post_meta($post->ID, 'qucreative_' . 'meta_post_media_type' . $qucreative_main->theme_data['page_extra_meta_label'], true));

    }


    $qucreative_main->theme_data['page_type'] = $page_type;
  }

  public function check_post_forMeta($mainArgs) {
    $qucreative_main = $this->quMain;

    global $post;


    // -- the post that contains the page meta
    $postForMeta = $post;
    if (is_home() || is_search()) {
      $posts_page = get_option('page_for_posts');

      if ($posts_page) {

        $postForMeta = get_post($posts_page);
      } else {
        $title = esc_html__("Blog", QUCREATIVE_LANG_ID);

        $postForMeta = null;

      }


      if (!$posts_page) {
        $pageBlogMetaQueryByTitle = QuCreativeView::get_page_by_title('Blog Meta');
        if ($pageBlogMetaQueryByTitle) {
          if ($pageBlogMetaQueryByTitle->post_status == 'publish' && $mainArgs['query_type'] != 'single-post') {
            $postForMeta = $pageBlogMetaQueryByTitle;
          }

        }

      }
    }

    $qucreative_main->themeData_setPostForMeta($postForMeta);


    global $wp_query;


    $qucreative_main->theme_data['wp_query'] = $wp_query;

    if ($wp_query) {
      if (isset($wp_query->query_vars)) {
        if (isset($wp_query->query_vars['antfarm_port_items_cat'])) {
          $post_for_meta = null;
          // todo: ??
        }
      }
    }

  }

  public function controller_getContentConExtraClasses() {
    $qucreative_main = $this->quMain;

    if ($qucreative_main->theme_data['has_footer']) {
      echo ' has-footer';
    }
    if ($qucreative_main->theme_data['post_for_meta']) {


      echo ' the-content-con-for-post-id-' . $qucreative_main->theme_data['post_for_meta']->ID . '';
    }

    if (is_home()) {
      echo ' posts-page';
    }


    if ($qucreative_main->theme_data['sw_is_in_customizer']) {
      $lab = 'content_align';

      $qucreative_main->theme_data['theme_mods'][$lab] = get_theme_mod($lab);
    }


    if ($qucreative_main->theme_data['post_for_meta']) {
      if ($qucreative_main->theme_data['post_for_meta']->ID && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) != 'on') {


        echo ' ' . $qucreative_main->theme_data['theme_mods']['content_align'];

      }
    }


    $mePost = $qucreative_main->theme_data['post_for_meta'];


    do_action('qucreative_extra_classes_contentCon');


    $viewIsPageFullWidth = QuCreativeView::isPageFullWidth($this->quMain);


    if ($qucreative_main->theme_data['sw_is_in_customizer']) {
      $lab = 'content_align';

      $qucreative_main->theme_data['theme_mods'][$lab] = get_theme_mod($lab);
    }


    $isFullIt = QuCreativeView::viewIsPageFullwidth($qucreative_main);


    if ($isFullIt) {
      echo ' fullit';

      $qucreative_main->theme_data['page_is_fullscreen'] = true;
      $viewIsPageFullWidth = true;

      if (get_post_meta($mePost->ID, '_wp_page_template', true) == 'template-portfolio.php' || $mePost->post_type == QUCREATIVE_POST_TYPE_PORTFOLIO) {

        $qucreative_main->theme_data['view_title'] = '';
      }

      echo ' fullit-type-' . esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_is_fullscreen_stretch' . $qucreative_main->theme_data['page_extra_meta_label'], true));
    }


    if ($mePost && get_post_meta($mePost->ID, 'qucreative_' . 'meta_rev_slider', true)) {
      echo ' has-header-slider';
    }


    if ($viewIsPageFullWidth) {
      echo ' page-is-fullwidth';
    }
  }

  public function controller_menuType() {

    $qucreative_main = $this->quMain;


    if ($qucreative_main->theme_data['menu_type'] == '') {
      $qucreative_main->theme_data['menu_type'] = 'menu-type-1';
    }


    if ($qucreative_main->theme_data['menu_type'] == '' || QuCreativeView::viewIsMenuVertical($this->quMain->theme_data['menu_type'])) {

      $qucreative_main->theme_data['menu_type_attr'] = QUCREATIVE_VIEW_VERTICAL_MENU_TYPE_CSS_CLASS;
    }

    if ($qucreative_main->theme_data['menu_type'] == 'menu-type-7' || $qucreative_main->theme_data['menu_type'] == 'menu-type-8') {

      $qucreative_main->theme_data['menu_horizontal_width'] = '220';
    }


  }

  public function check_post_forTitle($mainArgs) {
    $qucreative_main = $this->quMain;


    $viewTitle = qucreative_get_viewTitle($this, $mainArgs);

    $qucreative_main->themeData_setViewTitle($viewTitle);





  }

  public function handle_wp_head() {


    $qucreative_main = $this->quMain;


    global $post;

    $tempArgs = array(
      'query_type' => 'page',
    );

    $tempArgs['query_type'] = qucreative_view_getQueryType($post);

    $mainArgs = array(

      'template' => 'global',
      'query_type' => 'loop', // -- "page" or "single-post" or "loop"
      'type' => 'header', // -- this is constant
      'title' => null, // -- this is default title

    );

    if ($tempArgs) {
      $mainArgs = array_merge($mainArgs, $tempArgs);
    }


    $this->check_post_forMeta($mainArgs);
    $this->check_post_forType($mainArgs);
    $this->check_post_forTitle($mainArgs);




  }



  /**
   * view - for content
   * @param $pargs
   * @return mixed|string|null
   */
  function sidebar_get($pargs = array()) {

    global $post;
    global $qucreative_main;

    $margs = array(
      'sidebar_name' => 'sidebar-1',

    );

    if ($pargs) {
      $margs = array_merge($margs, $pargs);
    }



    $sidebar = '';
    if ($qucreative_main->theme_data['post_for_meta']) {
      if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_use_sidebar' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {
        $sidebar = $margs['sidebar_name'];
      }
    }

    if (is_home() || is_search() || is_archive()) {
      $sidebar = $margs['sidebar_name'];
    }


    if (isset($qucreative_main->theme_data['post_for_meta']->ID) && isset($post->ID)) {
      if ($qucreative_main->theme_data['post_for_meta']->ID === $post->ID) {
        if ($post->post_type == 'post') {

          $sidebar = $margs['sidebar_name'];
        }
      }
    }


    $sidebars_widgets = wp_get_sidebars_widgets();
    if (isset($sidebars_widgets[$sidebar]) && count((array)$sidebars_widgets[$sidebar]) == 0) {
      $sidebar = null;
    }


    if ($qucreative_main->theme_data['post_for_meta']) {
      if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_use_sidebar' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'off') {
        $sidebar = null;
      }
    }



    return $sidebar;
  }


  function sidebar_generate($poForMeta) {

    global $qucreative_main;


    $sidebar = $qucreative_main->quCreativeView->sidebar_get();

    if (!$poForMeta || (get_post_meta($poForMeta->ID, '_wp_page_template', true) != 'template-qucreative-slider.php')) {
      if ($sidebar) {

        echo '<div class="col-sm-4 sidebar-main">';
        ?>
        <?php

        $GLOBALS['sidebar'] = $sidebar;
        get_sidebar();
        ?>
        <?php


        echo '</div><! -- end .sidebar-main -->';


      }
    }

  }

}
