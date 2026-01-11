<?php
/**
 * qucreative functions and definitions
 *
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 *
 */
// Use stylesheet (child theme if exists, otherwise parent)


// Define theme constants - always point to parent theme
defined('QUCREATIVE_THEME_URL') || define('QUCREATIVE_THEME_URL', trailingslashit(get_template_directory_uri()));
defined('QUCREATIVE_THEME_DIR') || define('QUCREATIVE_THEME_DIR', trailingslashit(get_template_directory()));


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




add_action('init', 'qucreative_handle_init', 1);

// -- END qucreative_setup
add_action('after_setup_theme', 'qucreative_setup');
add_action('init', 'qucreative_init');









function qucreative_handle_init(): void {

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
      QUCREATIVE_MENU_PRIMARY_MENU_ID => esc_html__('Primary Menu', 'qucreative'),
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


  if (isset($_GET['preview']) && $_GET['preview'] == 'true') {
    $qucreative_main->theme_data['preview_page'] = true;
    $qucreative_main->theme_data['page_extra_meta_label'] = '_preview';

  }




  if (is_admin()) {

    wp_enqueue_script('tiny_mce');
    wp_enqueue_script('qucreative.admin', QUCREATIVE_THEME_URL . 'assets/admin/admin.js', array('jquery'));
    wp_enqueue_style('qucreative.admin', QUCREATIVE_THEME_URL . 'assets/admin/admin.css');


    qucreative_render_admin_settings();



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


  }


}









if (!function_exists('qucreative_get_avatar_url')) {
  function qucreative_get_avatar_url($get_avatar): string {
    preg_match("/src='(.*?)'/i", $get_avatar, $matches);
    return $matches[1];
  }
}


include_once QUCREATIVE_THEME_DIR.'blog-functions.php';

include_once 'inc/php/view/get-sidebar.php';





$qucreative_main->theme_data['template_is_portfolio'] = false;
$qucreative_main->theme_data['page_is_fullscreen'] = false;
$qucreative_main->theme_data['template_is_portfolio_skin'] = '';
$qucreative_main->theme_data['template_is_portfolio_gap'] = 'theme-column-gap';
$qucreative_main->theme_data['template_is_portfolio_term_children'] = array();











