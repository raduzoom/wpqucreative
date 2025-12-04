<?php


/**
 * before </body>
 * @param QuCreativeView $quView
 * @return void
 */
function qucreative_view_enqueue_in_footer(QuCreativeView $quView){



  $qucreative_main = $quView->quMain;
  wp_enqueue_script(QUCREATIVE_ID, QUCREATIVE_THEME_URL . 'libs/qucreative/qucreative.js', array('jquery'));
  wp_enqueue_style(QUCREATIVE_ID.'-misc', QUCREATIVE_THEME_URL . 'libs/qucreative/qu-misc.css');
  wp_enqueue_script('qu-responsive-menu', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/responsive-menu.js', array('jquery'));
  if (QuCreativeView::isViewAnimationDurationSet($quView)) {
    $duration = floatval($quView->theme_mods['view_animation_duration']); // Parse as number
    $inline_script = "window.qucreative_view_animation_duration = {$duration};";
    wp_add_inline_script(QUCREATIVE_ID, $inline_script);
  }


  // -- single post types
  if (is_single()) {

    wp_enqueue_style('qu-blog', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog.css');
    wp_enqueue_style('qu-blog-single', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog-single.css');
    wp_enqueue_style('qu-blog--shared', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog--shared.css');
  }







  $enqueueMenus56 = array('menu-type-5', 'menu-type-6');
  if (in_array($quView->quMain->theme_data['menu_type'], $enqueueMenus56)) {

    wp_enqueue_script('qu-menu-type-5-6', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/menus/' . 'menu-type-5-6' . '.js', array());
  }
  $enqueueMenus56 = array('menu-type-11', 'menu-type-12');
  if (in_array($quView->quMain->theme_data['menu_type'], $enqueueMenus56)) {

    wp_enqueue_script('qu-menu-type-11-12', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/menus/' . 'menu-type-11-12' . '.js', array());
  }
}
