<?php


/**
 * in <head>
 * @param QuCreativeView $quView
 * @return void
 */
function qucreative_view_enqueue_in_head(QuCreativeView $quView){



  if (!stripos($_SERVER["SCRIPT_NAME"], strrchr(wp_login_url(), '/')) !== false) {
    wp_enqueue_style(QUCREATIVE_VIEW_STYLE_ID, QUCREATIVE_THEME_URL . 'libs/qucreative/qucreative.css');


    if (QuCreativeView::isViewAnimationDurationSet($quView)) {

      $duration = floatval($quView->theme_mods['view_animation_duration']); // Parse as number


      // Inject CSS
      $inline_style = ":root { --qucreative-view-animation-duration: {$duration}s; }";
      wp_add_inline_style(QUCREATIVE_VIEW_STYLE_ID, $inline_style);
    }
  }

  $transitions = array('slidedown', 'wipedown','fade');

//  print_r($quView->theme_mods['bg_transition']);


//  wp_enqueue_style('qucreative_transition', QUCREATIVE_THEME_URL . 'libs/qucreative/css_inc/transitions/qu-bg_transition-'.$qucreative_main->theme_data['theme_mods']['bg_transition'].'.css');



  if (
    in_array($quView->theme_mods['bg_transition'], $transitions)) {

    $transitionTarget =$quView->theme_mods['bg_transition'];

      wp_enqueue_style('qucreative-transition', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/transitions/bg_transition-'.$transitionTarget.'.css');
  }

  if (
    $quView->quMain->theme_data['menu_type_attr'] === QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS) {

    wp_enqueue_style('qucreative-part-menu-horizontal', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-part-horizontalMenuType.css');
  }


  if (in_array($quView->quMain->theme_data['menu_type'], QUCREATIVE_VIEW_ENQUEUE_MENU_STYLE)) {

    wp_enqueue_style('qu-' . $quView->quMain->theme_data['menu_type'], QUCREATIVE_THEME_URL . 'libs/qucreative/parts/menus/' . $quView->quMain->theme_data['menu_type'] . '.css');
  }
  if ($quView->quMain->theme_data['view_loop_data']['loop_type'] === 'loop') {

    wp_enqueue_style('qu-blog', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog.css');
    wp_enqueue_style('qu-blog', QUCREATIVE_THEME_URL . 'libs/qucreative/parts/qu-blog--shared.css');
  }


  // -- special scripts

}
