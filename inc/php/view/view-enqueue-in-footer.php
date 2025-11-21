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


  qucreative_generate_inline_css_for_style_data_env();
  qucreative_generate_inline_css_for_enviroment();
  qucreative_generate_inline_css_for_font_data();
  qucreative_generate_inline_css_for_highlight();
  qucreative_generate_inline_css_for_contain();


  wp_add_inline_style(QUCREATIVE_VIEW_STYLE_ID, ($qucreative_main->theme_data['css_data_style_env'] . $qucreative_main->theme_data['css_data_overlay_opacity'] . $qucreative_main->theme_data[QUCREATIVE_VIEW_FONT_FOR_ECHO] . $qucreative_main->theme_data['css_data_highlight'] . $qucreative_main->theme_data['css_data_contain']));



  $enqueueMenus56 = array('menu-type-5', 'menu-type-6');
  if (in_array($quView->quMain->theme_data['menu_type'], $enqueueMenus56)) {

    wp_enqueue_script('qu-menu-type-5-6', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/menus/' . 'menu-type-5-6' . '.js', array());
  }
  $enqueueMenus56 = array('menu-type-11', 'menu-type-12');
  if (in_array($quView->quMain->theme_data['menu_type'], $enqueueMenus56)) {

    wp_enqueue_script('qu-menu-type-11-12', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/menus/' . 'menu-type-11-12' . '.js', array());
  }
}
