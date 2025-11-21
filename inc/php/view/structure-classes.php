<?php
function quCreative_view_getTheContentInnerClasses() {

  global $post, $qucreative_main;


  if ($post && get_post_meta($post->ID, '_wp_page_template', true) == 'template-portfolio.php' && get_post_meta($post->ID, QUCREATIVE_META_PREFIX . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {
    echo ' zfolio-portfolio-fullscreen-con';
  }


  if ($qucreative_main->theme_data['content_acts_as_sheet']) {
    echo ' the-content-inner-acts-as-sheet';
  }

  if ($post && $post->post_type == 'post') {
    echo ' post-type-post';
  }

}
function quCreative_view_getTheContentClasses($original_title) {

  global $post, $qucreative_main;

  if ($post && (get_post_meta($post->ID, '_wp_page_template', true) == 'template-gallery-creative.php')) {

    echo 'gallery-thumbs--image-container';
  }




  if (!($qucreative_main->theme_data['view_title'] && $original_title != 'none' && $original_title != ' ')) {

    echo ' the-content--no-title';
  }
}
function quCreative_view_getTheContentStyle($original_title) {



  global $qucreative_main;


  $isSetMarginTopTo0 = false;

  if ($original_title == ' ' || $original_title === 'none') {
    $isSetMarginTopTo0 = true;
  }

  if ($qucreative_main->theme_data['post_for_meta'] && (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_content_starts_at_pixel' . $qucreative_main->theme_data['page_extra_meta_label'], true))) {
    $isSetMarginTopTo0 = false;
  }

  if ($isSetMarginTopTo0) {


    $marginTop = 0;
    if ($qucreative_main->theme_data['menu_type_attr'] == QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS) {


      if ($qucreative_main->theme_data['sw_is_in_customizer']) {
        $lab = 'menu_is_sticky';

        $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
      }


      if ($qucreative_main->theme_data['theme_mods']['menu_is_sticky'] == 'on') {
        $marginTop += 100;


      }
    }

    echo 'margin-top:' . $marginTop . 'px;';


  }


}
