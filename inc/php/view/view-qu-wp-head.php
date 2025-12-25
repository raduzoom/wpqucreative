<?php

add_action('wp_head','qucreative_handle_wp_head');


function qucreative_handle_wp_head(){

  global $post;




  global $qucreative_main;





  if(isset($_GET['customize_theme'])){


    $font_data_str = $qucreative_main->get_theme_mod_and_sanitize('font_data');


    parse_str($font_data_str, $qucreative_main->theme_data['font_vals']);
  }










  $bg_slideshow_time = '0';
  $bg_images = '';
  $force_bg = '';












  // -- if it's not set, ge the default image







  $product_image_gallery = '';





  $post_for_meta = QuCreative::getPostForMeta($post);


























  if ($qucreative_main->theme_data['post_for_meta']) {


    if((get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true) != 'template-qucreative-slider.php') && (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true) != 'template-gallery-creative.php') ){

      $qucreative_main->quCreativeView->structureHasFooter = true;
    }


    if(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_disable_footer'.$qucreative_main->theme_data['page_extra_meta_label'],true)=='on'){

      $qucreative_main->quCreativeView->structureHasFooter = false;
    }






  }else{

    if(is_home() || is_search() || is_archive()){

      if(get_option( 'page_for_posts' )){

      }else{

        $qucreative_main->quCreativeView->structureHasFooter = true;
      }

    }
  }

  $the_sidebars = wp_get_sidebars_widgets();



  if(isset($the_sidebars['sidebar-footer']) && is_array($the_sidebars['sidebar-footer']) && count($the_sidebars['sidebar-footer'])){
  }else{

    $qucreative_main->quCreativeView->structureHasFooter = false;
  }
}

