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





  $post_for_meta = $post;




  if($qucreative_main->theme_data['post_for_meta']){
    $post_for_meta = $qucreative_main->theme_data['post_for_meta'];
  }else{
    if(is_home()){

      if(get_option( 'page_for_posts' )){
        $post_for_meta = get_post(get_option( 'page_for_posts' ));
      }

    }
  }












  if($post_for_meta ) {
    if (get_post_meta($post_for_meta->ID, 'qucreative_'.'meta_image_gallery'.$qucreative_main->theme_data['page_extra_meta_label'], true) && get_post_meta( $post_for_meta->ID, '_wp_page_template', true )!='template-gallery-creative.php') {
      $product_image_gallery = esc_html(get_post_meta($post_for_meta->ID, 'qucreative_'.'meta_image_gallery', true));

      $attachments = array_filter(explode(',', $product_image_gallery));

      if ($attachments) {
        $bg_images = '';


        $i3 = 0;
        foreach ($attachments as $attachment_id) {

          if ($i3 > 0) {
            $bg_images .= ',';
          }

          $img_full = wp_get_attachment_image_src($attachment_id, 'full');

          $bg_images .= '\'' . $img_full[0] . '\'';

          $i3++;

        }
        if($qucreative_main->get_theme_mod_and_sanitize('bg_slideshow_time')){
          $bg_slideshow_time = intval($qucreative_main->get_theme_mod_and_sanitize('bg_slideshow_time'));
        }
        if(get_post_meta($post_for_meta->ID, 'qucreative_'.'meta_home_slideshow_time'.$qucreative_main->theme_data['page_extra_meta_label'], true)){
          $bg_slideshow_time = intval(get_post_meta($post_for_meta->ID, 'qucreative_'.'meta_home_slideshow_time'.$qucreative_main->theme_data['page_extra_meta_label'], true));
        }



      }
    }
  }








  if($qucreative_main->theme_data['sw_is_in_customizer']){
    $lab = 'width_blur_margin';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'width_column';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'width_gap';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'border_width';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'border_color';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'bg_isparallax';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'blur_ammount';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
    $lab = 'enable_ajax';
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
  }













  if ($qucreative_main->theme_data['post_for_meta']) {


    if((get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true) != 'template-qucreative-slider.php') && (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, '_wp_page_template', true) != 'template-gallery-creative.php') ){

      $qucreative_main->theme_data['has_footer'] = true;
    }


    if(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_disable_footer'.$qucreative_main->theme_data['page_extra_meta_label'],true)=='on'){

      $qucreative_main->theme_data['has_footer'] = false;
    }






  }else{

    if(is_home() || is_search() || is_archive()){

      if(get_option( 'page_for_posts' )){

      }else{

        $qucreative_main->theme_data['has_footer'] = true;
      }

    }
  }

  $the_sidebars = wp_get_sidebars_widgets();



  if(count($the_sidebars['sidebar-footer'])){
  }else{

    $qucreative_main->theme_data['has_footer'] = false;
  }
}

