<?php


/**
 * in <head>
 * @param QuCreativeView $quView
 * @return void
 */
function qucreative_view_enqueue_in_head(QuCreativeView $quView){




  $transitions = array('slidedown', 'wipedown','fade');


  if (!stripos($_SERVER["SCRIPT_NAME"], strrchr(wp_login_url(), '/')) !== false) {
    qucreative_enqueue_theme_style(QUCREATIVE_VIEW_STYLE_ID, 'libs/qucreative/qucreative.css');
  }


  $bgTransition = $quView->quMain->get_theme_mod_and_sanitize('bg_transition');
  if (
    in_array($bgTransition, $transitions)) {

    $transitionTarget = $bgTransition;

      qucreative_enqueue_theme_style('qucreative-transition', 'libs/qucreative/parts/transitions/bg_transition-'.$transitionTarget.'.css');
  }

  if (
    $quView->quMain->theme_data['menu_type_attr'] === QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS) {

    qucreative_enqueue_theme_style('qucreative-part-menu-horizontal', 'libs/qucreative/parts/qu-part-horizontalMenuType.css');
  }

  // -- enqueue menu type

  if($quView->quMain->theme_data['menu_type']){

    qucreative_enqueue_theme_style('qu-' . $quView->quMain->theme_data['menu_type'], 'libs/qucreative/parts/menus/' . $quView->quMain->theme_data['menu_type'] . '.css');
  }
  if ($quView->quMain->theme_data['view_loop_data']['loop_type'] === 'loop') {

    qucreative_enqueue_theme_style('qu-blog', 'libs/qucreative/parts/qu-blog.css');
    qucreative_enqueue_theme_style('qu-blog--shared', 'libs/qucreative/parts/qu-blog--shared.css');
  }


  // -- special scripts

}
