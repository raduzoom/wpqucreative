<?php


/**
 * before </body>
 * @param QuCreativeView $quView
 * @return void
 */
function qucreative_view_enqueue_in_footer(QuCreativeView $quView){



  $qucreative_main = $quView->quMain;
  wp_enqueue_script(QUCREATIVE_ID, QUCREATIVE_THEME_URL . 'libs/qucreative/qucreative.js', array('jquery'));
  qucreative_enqueue_theme_style(QUCREATIVE_ID.'-misc', 'libs/qucreative/qu-misc.css');

  // Accessibility: Skip link focus fix
  wp_enqueue_script('qucreative-skip-link-focus-fix', QUCREATIVE_THEME_URL . 'inc/js/skip-link-focus-fix.js', array(), QUCREATIVE_VERSION, true);


  // -- single post types
  if (is_single()) {

    qucreative_enqueue_theme_style('qu-blog', 'libs/qucreative/parts/qu-blog.css');
    qucreative_enqueue_theme_style('qu-blog-single', 'libs/qucreative/parts/qu-blog-single.css');
    qucreative_enqueue_theme_style('qu-blog--shared', 'libs/qucreative/parts/qu-blog--shared.css');
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
