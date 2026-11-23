<?php


/**
 * before </body>
 * @param QuCreativeView $quView
 * @return void
 */
function qucreative_view_enqueue_in_footer(QuCreativeView $quView){



  $qucreative_main = $quView->quMain;
  qucreative_enqueue_theme_script(QUCREATIVE_ID, 'libs/qucreative/qucreative.js', array('jquery'));
  qucreative_enqueue_theme_style(QUCREATIVE_ID.'-misc', 'libs/qucreative/qu-misc.css');

  // Accessibility: Skip link focus fix
  qucreative_enqueue_theme_script('qucreative-skip-link-focus-fix', 'inc/js/skip-link-focus-fix.js');


  // -- single post types
  if (is_single()) {

    qucreative_enqueue_theme_style('qu-blog', 'libs/qucreative/parts/qu-blog.css');
    qucreative_enqueue_theme_style('qu-blog-single', 'libs/qucreative/parts/qu-blog-single.css');
    qucreative_enqueue_theme_style('qu-blog--shared', 'libs/qucreative/parts/qu-blog--shared.css');
  }







  $enqueueMenus56 = array('menu-type-5', 'menu-type-6');
  if (in_array($quView->quMain->theme_data['menu_type'], $enqueueMenus56)) {

    qucreative_enqueue_theme_script('qu-menu-type-5-6', 'libs/qucreative/parts/menus/' . 'menu-type-5-6' . '.js');
  }
  $enqueueMenus56 = array('menu-type-11', 'menu-type-12');
  if (in_array($quView->quMain->theme_data['menu_type'], $enqueueMenus56)) {

    qucreative_enqueue_theme_script('qu-menu-type-11-12', 'libs/qucreative/parts/menus/' . 'menu-type-11-12' . '.js');
  }
}
