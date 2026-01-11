<?php

/**
 * todo: transfer to plugin ( preview )
 * @return void
 */
function qucreative_generate_inline_javascript_for_options() {

  global $post;
  global $qucreative_main;

  $post_for_meta = $post;


  $bg_images = '';
  $force_bg = '';
  $bg_slideshow_time = '0';

  if ($qucreative_main->theme_data['post_for_meta']) {
    $post_for_meta = $qucreative_main->theme_data['post_for_meta'];
  } else {
    if (is_home()) {

      if (get_option('page_for_posts')) {
        $post_for_meta = get_post(get_option('page_for_posts'));
      }

    }
  }


  if ($post_for_meta) {


    $lab = QUCREATIVE_META_PREFIX . 'meta_light_bg_image';
    if ($qucreative_main->theme_data['is_preview_blog'] && (in_array($qucreative_main->theme_data['menu_type'], QUCREATIVE_VIEW_MENU_STYLE_LIGHT)) && get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_light_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
      $bg_images = '\'' . esc_html(get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_light_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '\'';
    } else {

      if (get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $bg_images = '\'' . esc_html(get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '\'';
      }
    }
  }


  if ($post_for_meta) {
    if (get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_image_gallery' . $qucreative_main->theme_data['page_extra_meta_label'], true) && get_post_meta($post_for_meta->ID, '_wp_page_template', true) != 'template-gallery-creative.php') {
      $product_image_gallery = esc_html(get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_image_gallery', true));

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
        if ($qucreative_main->get_theme_mod_and_sanitize('bg_slideshow_time')) {
          $bg_slideshow_time = intval($qucreative_main->get_theme_mod_and_sanitize('bg_slideshow_time'));
        }
        if (get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_home_slideshow_time' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
          $bg_slideshow_time = intval(get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_home_slideshow_time' . $qucreative_main->theme_data['page_extra_meta_label'], true));
        }


      }
    }
  }


  if ($bg_images == '' || $bg_images == "''") {

    $bg_images = '\'#aaaaaa\'';
    $bg_images = '\'#'.QUCREATIVE_VIEW_DEFAULT_WHITE_BG.'\'';
  }


  if ($post_for_meta && ($post_for_meta->post_type == 'quextend_port_items') && get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_post_media_type' . $qucreative_main->theme_data['page_extra_meta_label'] . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'image' && get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {


    // -- for fullscreen image
    if (get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_post_media' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {


      $bg_images = '\'' . esc_attr(get_post_meta($post_for_meta->ID, QUCREATIVE_META_PREFIX . 'meta_post_media' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '\'';
    }
  }

  if (is_404()) {
    $frontpage_id = get_option('page_on_front');

    if ($frontpage_id) {

      $bg_images = '\'' . get_post_meta($frontpage_id, QUCREATIVE_META_PREFIX . 'meta_bg_image' . $qucreative_main->theme_data['page_extra_meta_label'], true) . '\'';

    }
  }


  $is_customize_preview = 'off';
  if (is_customize_preview()) {
    // -- Output a demo content
    $is_customize_preview = 'on';

  }



  // todo: move to view
  // todo: move parts to quextend
  $qucreative_main->theme_data['js_options'] = array(
    'type' => 'main_options',
    'images_arr' => $bg_images,
    'bg_slideshow_time' => $bg_slideshow_time,
    'site_url' => home_url('/'),
    'theme_url' => QUCREATIVE_THEME_URL,
    'is_customize_preview' => $is_customize_preview,
    'gallery_w_thumbs_autoplay_videos' => 'off',
  );



  // 'enable_ajax' => $qucreative_main->theme_data['theme_mods']['enable_ajax'],
  // Allow plugins to modify js_options
  $qucreative_main->theme_data['js_options'] = apply_filters('qucreative_js_options', $qucreative_main->theme_data['js_options'], $qucreative_main);


  if ($qucreative_main->get_theme_mod_and_sanitize('portfolio_page')) {

    $qucreative_main->theme_data['js_options']['portfolio_page_url'] = get_permalink($qucreative_main->get_theme_mod_and_sanitize('portfolio_page'));


  }

  if (get_option('page_for_posts')) {

    $qucreative_main->theme_data['js_options']['blog_posts_url'] = get_permalink(get_option('page_for_posts'));


  }
  if ($qucreative_main->theme_data['is_preview_blog']) {

    $qucreative_main->theme_data['js_options']['preseter_img_folder'] = 'https://creativewpthemes.net/main-demo-dev/';
  }



  $qucreative_main->theme_data['js_options']['base_url'] = home_url('/');


  // todo: inline
  $qucreative_main->theme_data['view_js_data_for_inline_options'] .= json_encode($qucreative_main->theme_data['js_options']);


}
