<?php


/**
 * in <head>
 * @param QuCreativeView $quView
 * @return void
 */
function qucreative_view_enqueue_in_head(QuCreativeView $quView){




  $transitions = array('slidedown', 'wipedown','fade');


  if (!stripos($_SERVER["SCRIPT_NAME"], strrchr(wp_login_url(), '/')) !== false) {
    wp_enqueue_style(QUCREATIVE_VIEW_STYLE_ID, QUCREATIVE_THEME_URL . 'libs/qucreative/qucreative.css');
  }


  $bgTransition = $quView->quMain->get_theme_mod_and_sanitize('bg_transition');
  if (
    in_array($bgTransition, $transitions)) {

    $transitionTarget = $bgTransition;

      wp_enqueue_style('qucreative-transition', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/transitions/bg_transition-'.$transitionTarget.'.css');
  }

  if (
    $quView->quMain->theme_data['menu_type_attr'] === QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS) {

    wp_enqueue_style('qucreative-part-menu-horizontal', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-part-horizontalMenuType.css');
  }

  // -- enqueue menu type

  if($quView->quMain->theme_data['menu_type']){

    wp_enqueue_style('qu-' . $quView->quMain->theme_data['menu_type'], QUCREATIVE_THEME_URL . 'libs/qucreative/parts/menus/' . $quView->quMain->theme_data['menu_type'] . '.css');
  }
  if ($quView->quMain->theme_data['view_loop_data']['loop_type'] === 'loop') {

    wp_enqueue_style('qu-blog', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog.css');
    wp_enqueue_style('qu-blog--shared', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog--shared.css');
  }


  // -- special scripts

}
