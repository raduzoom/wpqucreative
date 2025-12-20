<?php

function qucreative_getPageType( QuCreative $qucreative_main) {

  $page_type = '';


  if($qucreative_main->theme_data['page_type']){
    return $qucreative_main->theme_data['page_type'];
  }

  $page_type = 'page-normal';

  if($qucreative_main->theme_data['post_for_meta']){
    if(get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true )=='template-qucreative-slider.php'){
      $page_type = 'page-homepage';
    }
    if(get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true )=='template-portfolio.php'){
      $page_type = 'page-portfolio';
    }
    if(get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true )=='template-gallery-creative.php'){
      $page_type = 'page-gallery-w-thumbs';
    }
  }

  if(is_home() || is_search() || is_archive()){
    $page_type = 'page-blogsingle';
  }

  if(is_single()){
    if($qucreative_main->theme_data['post_for_meta']){
      if($qucreative_main->theme_data['post_for_meta']->post_type=='post'){

        $page_type = 'page-blogsingle';
      }
    }
  }

  if($qucreative_main->theme_data['post_for_meta']){
    $page_type.= ' post-media-type-'.esc_attr(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID,'qucreative_'.'meta_post_media_type'.$qucreative_main->theme_data['page_extra_meta_label'],true));
  }

  return $page_type;
}
function qucreative_filter_body_classes( $classes, $class ) {


  $classes[] = 'qucreative';


  global $qucreative_main;






  global $wp_query;














  if( $qucreative_main->theme_data['menu_type']=='menu-type-13' || $qucreative_main->theme_data['menu_type']=='menu-type-14' || $qucreative_main->theme_data['menu_type']=='menu-type-15' || $qucreative_main->theme_data['menu_type']=='menu-type-16' || $qucreative_main->theme_data['menu_type']=='menu-type-17' || $qucreative_main->theme_data['menu_type']=='menu-type-18'){
    $qucreative_main->theme_data['body_class'].=' qucreative-submenu-style-highlight-color';

  }


  if($qucreative_main->theme_data['menu_type_attr']===QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS){
    $qucreative_main->theme_data['body_class'].=' '.QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS;
  }


  if($qucreative_main->theme_data['post_for_meta']) {
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true) == 'template-portfolio.php' && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_is_fullscreen'.$qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {
      $qucreative_main->theme_data['body_class'] .= ' with-fullbg ';

    }
  }


  $bgTransition = $qucreative_main->get_theme_mod_and_sanitize('bg_transition');
  $qucreative_main->theme_data['body_class'] .= ' bg_transition-'.$bgTransition;








  $page_type = qucreative_getPageType($qucreative_main);
  $qucreative_main->theme_data['page_type'] = $page_type;

  $qucreative_main->theme_data['body_class'].= ' '.$page_type.'    ';





  $qucreative_main->theme_data['body_class'].= ' '.'scrollbar-type-native';



  $qucreative_main->theme_data['body_class'].= ' '. $qucreative_main->theme_data['menu_type'];
  $qucreative_main->theme_data['body_class'].= ' '. $qucreative_main->theme_data['menu_type_attr'];



  if($qucreative_main->theme_data['menu_type']=='menu-type-5' || $qucreative_main->theme_data['menu_type']=='menu-type-6'){
    $qucreative_main->theme_data['body_class'].=' qucreative-ribbon-menu';
  }


  $searchedMenuType = $qucreative_main->theme_data['menu_type'];

  if (in_array($searchedMenuType, QUCREATIVE_VIEW_OVERLAY_MENUS)) {
    $qucreative_main->theme_data['body_class'].=' '.QUCREATIVE_VIEW_OVERLAY_MENUS_BODY_CLASS;
  }
  if($qucreative_main->theme_data['menu_type']=='menu-type-2' || $qucreative_main->theme_data['menu_type']=='menu-type-4' || $qucreative_main->theme_data['menu_type']=='menu-type-6' || $qucreative_main->theme_data['menu_type']=='menu-type-8' || $qucreative_main->theme_data['menu_type']=='menu-type-10'  || $qucreative_main->theme_data['menu_type']=='menu-type-14' || $qucreative_main->theme_data['menu_type']=='menu-type-16' || $qucreative_main->theme_data['menu_type']=='menu-type-18'){
    $qucreative_main->theme_data['body_class'].=' qucreative-light-menu';
  }





  if($qucreative_main->theme_data['post_for_meta'] && get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_is_fullscreen'.$qucreative_main->theme_data['page_extra_meta_label'], true )!='on'){
    $qucreative_main->theme_data['body_class'].= ' '. $qucreative_main->theme_data['theme_mods']['content_align'];
  }

  $page_title_align = $qucreative_main->get_theme_mod_and_sanitize('page_title_align');







  if( $qucreative_main->get_theme_mod_and_sanitize('menu_horizontal_shadow_style') && $qucreative_main->get_theme_mod_and_sanitize('menu_horizontal_shadow_style')!='none' ){

    $qucreative_main->theme_data['body_class'].= ' menu_horizontal_'.$qucreative_main->get_theme_mod_and_sanitize('menu_horizontal_shadow_style');
  }




  if($qucreative_main->theme_data['post_for_meta']){


    if(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID,'qucreative_'.'meta_post_media_type'.$qucreative_main->theme_data['page_extra_meta_label'],true)){

      $qucreative_main->theme_data['body_class'].= ' post-media-type-'.esc_attr(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID,'qucreative_'.'meta_post_media_type'.$qucreative_main->theme_data['page_extra_meta_label'],true));
    }

  }



  if($qucreative_main->theme_data['sw_is_in_customizer']){
    $lab = 'content_environment_style';

    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
  }

  $qucreative_main->theme_data['body_class'].= ' '. 'first-transition';
  $qucreative_main->theme_data['body_class'].= ' '. esc_attr($page_title_align);
  $qucreative_main->theme_data['body_class'].= ' '. $qucreative_main->get_theme_mod_and_sanitize('page_title_style');










  $classes[] = $qucreative_main->theme_data['body_class'];

  return $classes;
}
