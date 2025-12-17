<?php
/**
 * qucreative functions and definitions
 *
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 *
 */
define('QUCREATIVE_THEME_URL', get_parent_theme_file_uri() . '/');
define('QUCREATIVE_THEME_DIR', get_parent_theme_file_path() . '/');


include_once QUCREATIVE_THEME_DIR . 'inc/php/common/features/google-fonts-helper.php';


const QUCREATIVE_ID = 'qucreative';
const QUCREATIVE_LANG_ID = QUCREATIVE_ID;
const QUCREATIVE_VERSION = '1.08';
include_once QUCREATIVE_THEME_DIR . 'config/config.php';
include_once QUCREATIVE_THEME_DIR . 'inc/php/view/generate-qu-loop.php';




include_once 'inc/php/view/view-qu-action-before-the-content.php';
include_once 'inc/php/view/view-qu-wp-head.php';
include_once 'inc/php/view/view-qu-wp-footer.php';
include_once 'inc/php/view/view-after-the-content.php';
include_once 'inc/php/filters.php';

include_once 'inc/php/helpers.php';
include_once 'inc/php/view/view-generate-pagination.php';


include_once 'inc/php/class-qucreative.php';
include_once 'inc/php/comments-walker.php';
include_once 'inc/php/functions-text.php';
include_once 'inc/php/view/view-generate-blockquote.php';
include_once 'inc/php/view/view-generate-featured-media.php';
include_once 'inc/php/view/view-generate-prev-next-table.php';





$qucreative_main = new QuCreative();
// -- actions here


add_action('wp_enqueue_scripts', 'qucreative_wp_enqueue_scripts');
add_action('wp_ajax_qucreative_save_att_meta', 'qucreative_ajax_save_att_meta');


add_action('init', 'qucreative_handle_init', 1);
add_action('admin_head', 'qucreative_handle_admin_head');
add_action('save_post', 'qucreative_handle_admin_meta_save');
add_action('vc_before_init', 'qucreative_vc_before_init');

// -- END qucreative_setup
add_action('after_setup_theme', 'qucreative_setup');
add_action('init', 'qucreative_init');
add_action('tgmpa_register', 'qucreative_register_required_plugins');



/**
 * todo: move non default to plugin
 * @return void
 */
function qucreative_wp_enqueue_scripts() {
  global $qucreative_main;

  // Connection hints (keep them – they help)
  echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
  echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';


  if(class_exists('QuExtend_View')){
    QuExtend_View::embedGoogleFonts();
  }else{
    qucreative_wp_enqueue_scripts__defaultFonts();
  }


}
function qucreative_wp_enqueue_scripts__defaultFonts() {

  // -- default typography (unchanged list, but the printer becomes non-blocking)
  qucreative_enqueue_google_font('Open+Sans:400,600italic,600,400italic,800', 'Open+Sans', '400,600italic,600,400italic,800');
  qucreative_enqueue_google_font('Lato:700,400,900italic,700italic,900', 'Lato', '700,400,900italic,700italic,900');
  qucreative_enqueue_google_font('Playfair+Display:900italic', 'Playfair+Display', '900italic');
}







function qucreative_handle_init(): void {

}


function qucreative_ajax_save_att_meta() {

  global $qucreative_main;


  $arr_post = json_decode(stripslashes($_POST['postdata']), true);


  $pid = $arr_post['id'];

  $args = array(
    'ID' => $pid,
    'post_content' => $arr_post['post_content'],
    'post_excerpt' => $arr_post['post_excerpt'],
  );


// -- Update the post into the database
  wp_update_post($args);


  update_post_meta($pid, 'qucreative_' . 'meta_att_aligment', sanitize_text_field($arr_post[$arr_post['qucreative_' . 'meta_att_aligment']]));
  update_post_meta($pid, 'qucreative_' . 'meta_att_video', sanitize_text_field($arr_post['qucreative_' . 'meta_att_video']));
  update_post_meta($pid, 'qucreative_' . 'meta_att_enable_video_cover', sanitize_text_field($arr_post['qucreative_' . 'meta_att_enable_video_cover']));


  die();
}


function qucreative_ajax_save_preset() {


  // -- deprecated. . wp introduced this


  global $qucreative_main;


  $qucreative_main->theme_data['theme_mods']['presets'] = qucreative_clean($_POST['preset_name']);

  update_option('theme_mods_qucreative', $qucreative_main->theme_data['theme_mods']);


  unset($qucreative_main->theme_data['theme_mods']['presets']);
  unset($qucreative_main->theme_data['theme_mods']['nav_menu_locations']);
  unset($qucreative_main->theme_data['theme_mods']['gmaps_api_key']);
  unset($qucreative_main->theme_data['theme_mods']['copyright_textbox']);
  unset($qucreative_main->theme_data['theme_mods']['logo']);
  unset($qucreative_main->theme_data['theme_mods']['portfolio_page']);
  unset($qucreative_main->theme_data['theme_mods']['social_icons']);

  foreach ($qucreative_main->theme_data['theme_mods'] as $lab => $val) {
    if (is_int($lab)) {
      unset($qucreative_main->theme_data['theme_mods'][$lab]);
    }
  }




  wp_send_json_success();


  die();
}


function qucreative_vc_before_init() {
  vc_set_as_theme();
}


function qucreative_handle_admin_head() {

  global $pagenow, $qucreative_main;


  if ($pagenow == 'widgets.php') {
    wp_enqueue_media();
  }


  $high_color = $qucreative_main->get_theme_mod_and_sanitize("highlight_color");


  if ($high_color && $high_color != '#'.QUCREATIVE_VIEW_DEFAULT_COLOR_HIGHLIGHT) {

    echo '<style>.antfarm-btn.color-highlight, .antfarm-btn.style-default:hover, .antfarm-btn.style-black:hover, .antfarm-btn.style-hallowred:hover, .antfarm-btn.style-hallowblack:hover {
box-shadow: 0 0 0 2px ' . $high_color . ' inset;
background-color: ' . $high_color . ';
}
 .antfarm-btn.style-highlight-dark{
background-color: ' . $high_color . ';
}
.antfarm-btn.style-hallowred{
color: ' . $high_color . ';
box-shadow: 0 0 0 2px ' . $high_color . ' inset;
}
</style>';
  }


}



function qucreative_handle_admin_meta_save($post_id) {
  global $post;


  if (!$post) {
    return;
  }

  // --  Check autosave
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }


  $is_preview = false;
  if (isset($_POST['wp-preview']) && $_POST['wp-preview'] == 'dopreview') {

    // -- save for preview ( append _preview maybe )
    $is_preview = true;

  }


  if (isset($_REQUEST['qucreative_' . 'meta_nonce'])) {
    $nonce = $_REQUEST['qucreative_' . 'meta_nonce'];
    if (!wp_verify_nonce($nonce, 'qucreative_' . 'meta_nonce')) {
      wp_die('Security check');
    }
  }


  if (is_array($_POST)) {
    $auxa = $_POST;
    foreach ($auxa as $label => $value) {


      $label_to_save = $label;

      if ($is_preview) {
        $label_to_save .= '_preview';
      }


      $original_value = $value;


      if (is_array($value) || $original_value === ' ') {

      } else {

        $value = sanitize_text_field($value);
      }


      if (strpos($label, 'qucreative_' . 'meta_') !== false) {
        update_post_meta($post->ID, $label_to_save, $value);
      }


    }
  }


}




if (!function_exists('qucreative_setup')) {

  function qucreative_setup() {




    // -- translation stuff
    load_plugin_textdomain(QUCREATIVE_LANG_ID, false, basename(QUCREATIVE_THEME_DIR) . '/languages');

    add_theme_support('automatic-feed-links');


    add_post_type_support('page', 'excerpt');;
    add_theme_support('title-tag');

    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(825, 510, true);


    register_nav_menus(array(
      'primary' => esc_html__('Primary Menu', 'qucreative'),
      'social' => esc_html__('Social Links Menu', 'qucreative'),
    ));


    add_theme_support('html5', array(
      'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
    ));


    add_theme_support('post-formats', array('video'));


  }
}




/**
 * Customizer additions.
 *
 */
require QUCREATIVE_THEME_DIR . 'inc/features/customizer/customizer.php';


function qucreative_render_admin_settings() {


  global $qucreative_main;

  $js_opts = '
	    window.qucreative_settings = {
		    lang_edit: "' . esc_html__("Edit", 'qucreative') . '"
                ,lang_title: "' . esc_html__("Title", 'qucreative') . '"
                ,lang_description: "' . esc_html__("Description", 'qucreative') . '"
                ,lang_aligment: "' . esc_html__("Aligment", 'qucreative') . '"
                ,lang_left: "' . esc_html__("Left", 'qucreative') . '"
                ,lang_right: "' . esc_html__("Right", 'qucreative') . '"
                ,lang_add_new: "' . esc_html__("Add New", 'qucreative') . '"
                ,lang_delete: "' . esc_html__("Delete", 'qucreative') . '"
                ,lang_save_as_preset: "' . esc_html__("Save as Preset", 'qucreative') . '"
                ,lang_are_you_sure: "' . esc_html__("Are you sure", 'qucreative') . '"
                ,menu_type: "' . $qucreative_main->theme_data['menu_type'] . '"
                ,admin_url: "' . admin_url() . '"
            }';

  wp_add_inline_script('qucreative.admin', $js_opts);
}


function qucreative_init() {


  global $qucreative_main;


  add_editor_style();
  add_theme_support('post-thumbnails');

  // -- Add default posts and comments RSS feed links to head
  add_theme_support('automatic-feed-links');

  set_post_thumbnail_size(160, 160, true);

  // -- Make theme available for translation
  // -- Translations can be filed in the /languages/ directory
  load_theme_textdomain('qucreative', get_parent_theme_file_path('languages'));

  $locale = get_locale();
  $locale_file = get_parent_theme_file_path('languages/$locale.php');

  if (is_readable($locale_file)) {
    require_once($locale_file);
  }

  // -- This theme uses wp_nav_menu() in one location.
  register_nav_menus(array(
    'primary' => esc_html__('Primary Navigation', 'qucreative'),
  ));

  if (isset($_GET['preview']) && $_GET['preview'] == 'true') {
    $qucreative_main->theme_data['preview_page'] = true;
    $qucreative_main->theme_data['page_extra_meta_label'] = '_preview';

  }


  global $vc_manager;
  if (class_exists('Vc_Manager') && !$vc_manager) {
    $vc_manager = Vc_Manager::getInstance();
    // -- Load components
    $vc_manager->loadComponents();
  }

  if ($vc_manager) {

    $vc_manager->setIsAsTheme(true);
  }


  if (is_admin()) {


    wp_enqueue_script('media-upload');
    wp_enqueue_script('tiny_mce');
    wp_enqueue_script('qucreative.admin', QUCREATIVE_THEME_URL . 'assets/admin/admin.js', array('jquery'));
    wp_enqueue_style('qucreative.admin', QUCREATIVE_THEME_URL . 'assets/admin/admin.css');


    qucreative_render_admin_settings();




    wp_enqueue_style('faiconselector', QUCREATIVE_THEME_URL . 'assets/dzsiconselector/dzsiconselector.css');
    wp_enqueue_script('faiconselector', QUCREATIVE_THEME_URL . 'assets/dzsiconselector/dzsiconselector.js', array('jquery'));
    wp_enqueue_script('farbtastic', array('jquery'));
    wp_enqueue_style('farbtastic');


    // -- tinymce buttons
    if (current_user_can('edit_posts') || current_user_can('edit_pages')) {
      if (get_user_option('rich_editing') == 'true') {
        wp_enqueue_script('thickbox');
        wp_enqueue_style('thickbox');

      }
    }
  } else {


    if (isset($vc_manager) && $vc_manager) {

      wp_enqueue_style('js_composer_front', $vc_manager->assetUrl('css/js_composer.min.css'));
    }


  }


}


function qucreative_get_featured_image($pid) {


  $image = wp_get_attachment_image_src(get_post_thumbnail_id($pid), 'single-post-thumbnail');


  if ($image) {

    if (is_array($image)) {
      return $image[0];
    } else {

      return $image;
    }
  } else {
    return '';
  }
}



$qucreative_main->theme_data['plugins'] = array(
  // This is an example of how to include a plugin pre-packaged with a theme
  array(
    'name' => 'WPBakery Page Builder', // The plugin name
    'slug' => 'js_composer', // The plugin slug (typically the folder name)
    'source' => get_parent_theme_file_path('plugins/js_composer.zip'), // The plugin source
    'required' => true, // If false, the plugin is only 'recommended' instead of required
    'version' => '5.4.2', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
    'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
    'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
    'external_url' => '', // If set, overrides default API URL and points to an external URL
  ),
  array(
    'name' => 'Antfarm Shortcodes', // The plugin name
    'slug' => 'antfarm_shortcodes', // The plugin slug (typically the folder name)
    'source' => get_parent_theme_file_path('plugins/antfarm_shortcodes.zip'), // The plugin source
    'required' => true, // If false, the plugin is only 'recommended' instead of required
    'version' => '1.0', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
    'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
    'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
    'external_url' => '', // If set, overrides default API URL and points to an external URL
  ),
  array(
    'name' => 'Revolution Slider', // The plugin name
    'slug' => 'revslider', // The plugin slug (typically the folder name)
    'source' => get_parent_theme_file_path('plugins/revslider.zip'), // The plugin source
    'required' => false, // If false, the plugin is only 'recommended' instead of required
    'version' => '5.4.6', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
    'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
    'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
    'external_url' => '', // If set, overrides default API URL and points to an external URL
  ),
);


require_once get_parent_theme_file_path('assets/tgm/class-tgm-plugin-activation.php');


function qucreative_register_required_plugins() {

  global $qucreative_main;
  $config = array(
    'id' => 'qucreative',                 // Unique ID for hashing notices for multiple instances of TGMPA.
    'default_path' => '',                      // Default absolute path to bundled plugins.
    'menu' => 'tgmpa-install-plugins', // Menu slug.
    'has_notices' => true,                    // Show admin notices or not.
    'dismissable' => true,                    // If false, a user cannot dismiss the nag message.
    'dismiss_msg' => '',                      // If 'dismissable' is false, this message will be output at top of nag.
    'is_automatic' => false,                   // Automatically activate plugins after installation or not.
    'message' => '',                      // Message to output right before the plugins table.


  );

  tgmpa($qucreative_main->theme_data['plugins'], $config);
}


if (function_exists('qucreative_get_avatar_url') == false) {
  function qucreative_get_avatar_url($get_avatar) {
    preg_match("/src='(.*?)'/i", $get_avatar, $matches);
    return $matches[1];
  }
}


function qucreative_get_post_meta($pargs = array()) {


  global $post;
  $margs = array(

    'call_from' => 'default',
    'get_categories' => 'off',
    'post_id' => '',
    'separator' => ' / ',
    'include_posted_on' => true,

  );

  if ($pargs) {
    $margs = array_merge($margs, $pargs);
  }


  if ($margs['post_id']) {
    $post = get_post($margs['post_id']);
  } else {

  }


  $fout = '';

  $cats = wp_get_post_categories($post->ID);
  $comments_count = wp_count_comments($post->ID);

  $cats_str = '';

  if (is_array($cats) && isset($cats[0]) && $cats[0] != 1) {

    $cats_str = $margs['separator'] . esc_html__("in", 'qucreative') . ' ';

    $i3 = 0;

    foreach ($cats as $catid) {
      $cat = get_category($catid);


      if ($i3 > 0) {
        $cats_str .= ', ';
      }

      $cats_str .= '<a class="ajax-link ajax-link--cat custom-a" href="' . get_category_link($catid) . '">';
      $cats_str .= $cat->name;
      $cats_str .= '</a>';

      $i3++;
    }
  }


  $pfx_date = get_the_date('F j Y', $post->id);
  $fout .= '<div class="post-meta font-group-7">';

  if ($margs['include_posted_on']) {
    $fout .= esc_html__("Posted on", 'qucreative') . ' ';
  }

  $fout .= $pfx_date;

  if ($cats_str) {
    $fout .= $cats_str;
  }

  $link = get_permalink($post->id);

  $link_comments = $link . '#comments';


  if ($margs['call_from'] == 'single_post') {
    $link_comments = '#comments';
  }


  if ($margs['get_categories'] == 'on') {

  }

  if ($comments_count->total_comments) {


    $str_nr_comments = '';
    if ($comments_count->total_comments == 1) {
      $str_nr_comments = sprintf(esc_html__('%s comment', 'qucreative'), $comments_count->total_comments);
    } else {

      $str_nr_comments = sprintf(esc_html__('%s comments', 'qucreative'), $comments_count->total_comments);
    }


    $fout .= $margs['separator'] . ' <a class="ajax-link custom-a" href="' . $link_comments . '">' . $str_nr_comments . '</a>';


  }


  $fout .= '</div><!--end .post-meta-->';

  return $fout;

}


include_once 'inc/php/view/get-sidebar.php';

function qucreative_get_social_shares() {


  $fout = '';

  $lab = 'social_enable_facebook_share';


  global $qucreative_main;


  if (isset($qucreative_main->theme_data['theme_mods'][$lab]) && $qucreative_main->theme_data['theme_mods'][$lab] == '1') {
    $fout .= '<a class="social-icon custom-a" href="#"  onclick=\'window.qcre_open_social_link("http://www.facebook.com/sharer.php?u={{replaceurl}}"); return false;\'><i class="fa fa-facebook-square"></i><span class="the-tooltip">' . esc_html__("SHARE ON FACEBOOK", 'qucreative') . '</span></a>';
  }

  $lab = 'social_enable_twitter_share';

  if (isset($qucreative_main->theme_data['theme_mods'][$lab]) && $qucreative_main->theme_data['theme_mods'][$lab] == '1') {
    $fout .= '<a class="social-icon custom-a" href="#" onclick=\'window.qcre_open_social_link("http://twitter.com/share?url={{replaceurl}}&amp;text=Check this out!&amp;via=campaignmonitor&amp;related=yarrcat"); return false;\'><i class="fa fa-twitter"></i><span class="the-tooltip">' . esc_html__("SHARE ON TWITTER", 'qucreative') . '</span></a>';
  }

  $lab = 'social_enable_gplus_share';

  if (isset($qucreative_main->theme_data['theme_mods'][$lab]) && $qucreative_main->theme_data['theme_mods'][$lab] == '1') {
    $fout .= '<a class="social-icon custom-a" href="#" onclick=\'window.qcre_open_social_link("https://plus.google.com/share?url={{replaceurl}}"); return false; \'><i class="fa fa-google-plus-square"></i><span class="the-tooltip">' . esc_html__("SHARE ON GOOGLE PLUS", 'qucreative') . '</span></a>';
  }

  $lab = 'social_enable_linkedin_share';

  if (isset($qucreative_main->theme_data['theme_mods'][$lab]) && $qucreative_main->theme_data['theme_mods'][$lab] == '1') {
    $fout .= '<a class="social-icon custom-a" href="#" onclick=\'window.qcre_open_social_link("https://www.linkedin.com/shareArticle?mini=true&url=mysite&title=Check%20this%20out%20{{replaceurl}}&summary=&source={{replaceurl}}"); return false; \'><i class="fa fa-linkedin"></i><span class="the-tooltip">' . esc_html__("SHARE ON LINKEDIN", 'qucreative') . '</span></a>';
  }

  $lab = 'social_enable_pinterest_share';

  if (isset($qucreative_main->theme_data['theme_mods'][$lab]) && $qucreative_main->theme_data['theme_mods'][$lab] == '1') {
    $fout .= '<a class="social-icon custom-a" href="#" onclick=\'window.qcre_open_social_link("http://pinterest.com/pin/create/button/?url={{replaceurl}}&amp;text=Check this out!&amp;via=campaignmonitor&amp;related=yarrcat"); return false;\'><i class="fa fa-pinterest"></i><span class="the-tooltip">' . esc_html__("SHARE ON PINTEREST", 'qucreative') . '</span></a>';
  }

  return $fout;
}


if (!function_exists('qucreative_sanitize_term_slug_to_id')) {
  function qucreative_sanitize_term_slug_to_id($arg, $taxonomy_name = '') {


    if ($taxonomy_name == '') {
      global $quextend_main;

      if($quextend_main){

        $taxonomy_name = $quextend_main->name_port_item_cat;
      }
    }

    if (!is_numeric($arg)) {

      $term = get_term_by('slug', $arg, $taxonomy_name);

      if ($term) {
        $arg = $term->term_id;
      }

    }


    return $arg;
  }
}


$qucreative_main->theme_data['template_is_portfolio'] = false;
$qucreative_main->theme_data['page_is_fullscreen'] = false;
$qucreative_main->theme_data['template_is_portfolio_skin'] = '';
$qucreative_main->theme_data['template_is_portfolio_gap'] = 'theme-column-gap';
$qucreative_main->theme_data['template_is_portfolio_term_children'] = array();


if (function_exists('qucreative_sanitize_to_size') == false) {
  function qucreative_sanitize_to_size($arg) {

    if ($arg == '') {
      return $arg;
    }
    if (strpos($arg, 'px') === false && strpos($arg, '%') === false && strpos($arg, 'auto') === false) {
      return $arg . 'px';
    } else {
      return $arg;
    }
  }
}
function qucreative_print_real_footer() {

  global $qucreative_main;
  $the_sidebars = wp_get_sidebars_widgets();


  if (count($the_sidebars['sidebar-footer'])) {


    ?>

    <div class="footer-conglomerate">

      <?php
      if ($qucreative_main->theme_data['post_content_has_translucent_layer']) {
        echo '<div class="translucent-layer">';
      }
      ?>

      <footer class="upper-footer">
        <div class="row <?php
        if (is_array($the_sidebars['sidebar-footer'])) {

          $isMonsterWidget = false;


          // -- we'll check widgets that include multiple widgets, to not reduce number of columns
          foreach ($the_sidebars['sidebar-footer'] as $sidebarFooter) {
            if (strpos($sidebarFooter, 'monster') !== false) {
              $isMonsterWidget = true;
            }
          }

          if (!$isMonsterWidget) {

            if (count($the_sidebars['sidebar-footer']) == '3') {
              echo ' three-columns';
            }
            if (count($the_sidebars['sidebar-footer']) == '2') {
              echo ' two-columns';
            }
            if (count($the_sidebars['sidebar-footer']) == '1') {
              echo ' one-column';

            }
          }

        }
        ?>">

          <?php

          dynamic_sidebar('sidebar-footer');

          ?>

        </div>
      </footer>


      <?php


      $heading_style = $qucreative_main->get_theme_mod_and_sanitize('footer_copyright_textbox_heading_style');


      ?>
      <footer class="lower-footer">


        <?php


        if ($heading_style == '') {
          $heading_style = 'h6';
        }
        $h_wrap_start = '<' . $heading_style . ' class=" the-variable-heading footer-copyright">';
        $h_wrap_end = '</' . $heading_style . '>';

        if ($heading_style == 'h-group-1' || $heading_style == 'h-group-2') {

          $h_wrap_start = '<h3 class="the-variable-heading footer-copyright ' . $heading_style . '">';
          $h_wrap_end = '</h3>';
        }


        echo $h_wrap_start . wp_kses(get_bloginfo('description'), QU_ALLOWED_HTML_TAGS) . $h_wrap_end;

        ?>
      </footer>


      <?php

      if ($qucreative_main->theme_data['post_content_has_translucent_layer']) {
        echo '</div>';
      }
      ?>
    </div>


    <?php
  }


}

function qucreative_print_footer($pargs = array()) {


}



/**
 * todo: transfer to plugin ( preview )
 * @return void
 */
function qucreative_generate_inline_javascript_for_options() {

  global $post;
  global $qucreative_main;

  $post_for_meta = $post;


  $bg_images = '';
  $force_bg = '';
  $bg_slideshow_time = '0';

  if ($qucreative_main->theme_data['post_for_meta']) {
    $post_for_meta = $qucreative_main->theme_data['post_for_meta'];
  } else {
    if (is_home()) {

      if (get_option('page_for_posts')) {
        $post_for_meta = get_post(get_option('page_for_posts'));
      }

    }
  }


  if ($post_for_meta) {


    $lab = 'qucreative_' . 'meta_light_bg_image';
    if ($qucreative_main->theme_data['is_preview_blog'] && ($qucreative_main->theme_data['menu_type'] == 'menu-type-2' || $qucreative_main->theme_data['menu_type'] == 'menu-type-4' || $qucreative_main->theme_data['menu_type'] == 'menu-type-6' || $qucreative_main->theme_data['menu_type'] == 'menu-type-8' || $qucreative_main->theme_data['menu_type'] == 'menu-type-10' || $qucreative_main->theme_data['menu_type'] == 'menu-type-12' || $qucreative_main->theme_data['menu_type'] == 'menu-type-14' || $qucreative_main->theme_data['menu_type'] == 'menu-type-16' || $qucreative_main->theme_data['menu_type'] == 'menu-type-18') && get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_light_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
      $bg_images = '\'' . esc_html(get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_light_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '\'';
    } else {

      if (get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $bg_images = '\'' . esc_html(get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '\'';
      }
    }
  }


  if ($post_for_meta) {
    if (get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_image_gallery' . $qucreative_main->theme_data['page_extra_meta_label'], true) && get_post_meta($post_for_meta->ID, '_wp_page_template', true) != 'template-gallery-creative.php') {
      $product_image_gallery = esc_html(get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_image_gallery', true));

      $attachments = array_filter(explode(',', $product_image_gallery));

      if ($attachments) {
        $bg_images = '';


        $i3 = 0;
        foreach ($attachments as $attachment_id) {

          if ($i3 > 0) {
            $bg_images .= ',';
          }

          $img_full = wp_get_attachment_image_src($attachment_id, 'full');

          $bg_images .= '\'' . $img_full[0] . '\'';

          $i3++;

        }
        if ($qucreative_main->get_theme_mod_and_sanitize('bg_slideshow_time')) {
          $bg_slideshow_time = intval($qucreative_main->get_theme_mod_and_sanitize('bg_slideshow_time'));
        }
        if (get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_home_slideshow_time' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
          $bg_slideshow_time = intval(get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_home_slideshow_time' . $qucreative_main->theme_data['page_extra_meta_label'], true));
        }


      }
    }
  }


  if ($bg_images == '' || $bg_images == "''") {

    $bg_images = '\'#aaaaaa\'';
    $bg_images = '\'#'.QUCREATIVE_VIEW_DEFAULT_WHITE_BG.'\'';
  }


  if ($post_for_meta && ($post_for_meta->post_type == 'quextend_port_items') && get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_post_media_type' . $qucreative_main->theme_data['page_extra_meta_label'] . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'image' && get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {


    // -- for fullscreen image
    if (get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_post_media' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {


      $bg_images = '\'' . esc_attr(get_post_meta($post_for_meta->ID, 'qucreative_' . 'meta_post_media' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '\'';
    }
  }

  if (is_404()) {
    $frontpage_id = get_option('page_on_front');

    if ($frontpage_id) {

      $bg_images = '\'' . get_post_meta($frontpage_id, 'qucreative_' . 'meta_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true) . '\'';

    }
  }


  $is_customize_preview = 'off';
  if (is_customize_preview()) {
    // -- Output a demo content
    $is_customize_preview = 'on';

  }



  // todo: move to view
  // todo: move parts to quextend
  $qucreative_main->theme_data['js_options'] = array(
    'type' => 'main_options',
    'images_arr' => $bg_images,
    'enable_ajax' => $qucreative_main->theme_data['theme_mods']['enable_ajax'],
    'bg_isparallax' => $qucreative_main->theme_data['theme_mods']['bg_isparallax'],
    'bg_slideshow_time' => $bg_slideshow_time,
    'bg_transition' => $qucreative_main->theme_data['theme_mods']['bg_transition'],
    'site_url' => site_url(),
    'theme_url' => QUCREATIVE_THEME_URL,
    'blur_amount' => $qucreative_main->theme_data['theme_mods']['blur_amount'],
    'width_column' => $qucreative_main->theme_data['theme_mods']['width_column'],
    'width_section_bg' => $qucreative_main->get_theme_mod_and_sanitize('width_section_bg'),
    'width_gap' => $qucreative_main->theme_data['theme_mods']['width_gap'],
    'border_width' => $qucreative_main->theme_data['theme_mods']['border_width'],
    'border_color' => $qucreative_main->theme_data['theme_mods']['border_color'],
    'is_customize_preview' => $is_customize_preview,
    'width_blur_margin' => $qucreative_main->theme_data['theme_mods']['width_blur_margin'],
    'gallery_w_thumbs_autoplay_videos' => 'off',
  );


  if ($qucreative_main->get_theme_mod_and_sanitize('portfolio_page')) {

    $qucreative_main->theme_data['js_options']['portfolio_page_url'] = get_permalink($qucreative_main->get_theme_mod_and_sanitize('portfolio_page'));


  }

  if (get_option('page_for_posts')) {

    $qucreative_main->theme_data['js_options']['blog_posts_url'] = get_permalink(get_option('page_for_posts'));


  }
  if ($qucreative_main->theme_data['is_preview_blog']) {

    $qucreative_main->theme_data['js_options']['preseter_img_folder'] = 'https://creativewpthemes.net/main-demo-dev/';
  }




  $meo = qucreative_generate_inline_css_for_environment_menuOpacity_val($qucreative_main);
  $menu_environment_opacity = $meo['menu_environment_opacity'];


  $lab = 'content_environment_opacity';
  $content_environment_opacity = $qucreative_main->theme_data['theme_mods'][$lab];


  if ($qucreative_main->theme_data['sw_is_in_customizer']) {

    $content_environment_opacity = $qucreative_main->get_theme_mod_and_sanitize($lab);
  }

  if ($content_environment_opacity == '') {
    $content_environment_opacity = '30';
  }


  $qucreative_main->theme_data['js_options']['content_environment_opacity'] = $content_environment_opacity;
  $qucreative_main->theme_data['js_options']['menu_environment_opacity'] = $menu_environment_opacity;
  $qucreative_main->theme_data['js_options']['base_url'] = get_site_url();


  $qucreative_main->theme_data['js_data_for_inline_options'] .= json_encode($qucreative_main->theme_data['js_options']);


}





