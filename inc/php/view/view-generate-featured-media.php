<?php

/**
 * todo: modify with plugin if plugin exists
 * @param $arg
 * @param $pargs
 * @return string
 */
function qucreative_generate_featured_media($arg, $pargs = array()): string {

  global $qucreative_main;

  $margs = array(
    'include_featured-media-con_div' => true,
    'search_for_featured_media' => true, // -- search for the posts featured media con too if meta post media is not set
    'img_extra_class' => 'fullwidth',
    'call_from' => 'default',
    'item_excerpt_setup_video_height' => '',
  );

  $fout = '';


  if ($pargs) {
    $margs = array_merge($margs, $pargs);
  }


  $post_media = get_post_meta($arg, QUCREATIVE_META_PREFIX . 'meta_post_media', true);
  $post_media_type = 'detect';

  $po = get_post($arg);

  if ($po) {
    if ($po->post_type == 'post') {
      if (get_post_format($arg) == 'video') {
        $postContent = $po->post_content;

        if (strpos($postContent, 'youtube.com') !== false) {
          $post_media_type = 'youtube';


          preg_match_all("/http\S*?youtube.com\/watch\?v\=(\S*)/", $postContent, $matches);

          if (isset($matches[0][0]) && $matches[0][0]) {
            $post_media = $matches[0][0];
          }

          global $post;

          if ($post && $post->ID === $arg) {


            $qucreative_main->theme_data['replace_string_in_content_with_nada'] = $post_media;


          }


        }
      }
      if (get_post_format($arg) == 'image') {
        $postContent = $po->post_content;

        if (strpos($postContent, '<img') !== false) {
          $post_media_type = 'image';


          preg_match_all("/<img.*?src=[\"|'](.*?)[\"|'].*?>/", $postContent, $matches);;


          $to_replace = '';
          if (isset($matches[0][0]) && $matches[0][0]) {
            if (isset($matches[1][0]) && $matches[1][0]) {
              $post_media = $matches[1][0];
              $to_replace = $matches[0][0];
            }
          }

          global $post;
          if ($to_replace && $post && $post->ID === $arg) {
            $qucreative_main->theme_data['replace_string_in_content_with_nada'] = $to_replace;
          }

        }
      }
    }
  }


  if ($post_media) {
    if (strpos($post_media, '.mp4') || strpos($post_media, '.m4v')) {
      $post_media_type = 'video';
    }
    if (strpos($post_media, 'youtube.com/wa')) {
      $post_media_type = 'youtube';
    }
    if (strpos($post_media, 'vimeo.com/')) {
      $post_media_type = 'vimeo';
    }
  }

  if (get_post_meta($arg, QUCREATIVE_META_PREFIX . 'meta_post_media_type', true) == 'slider') {
    $post_media_type = 'slider';
  }


  if ($post_media_type == 'detect') {
    $post_media_type = 'image';
  }

  if ($post_media || ($post_media_type == 'slider' && (get_post_meta($arg, QUCREATIVE_META_PREFIX . 'meta_image_gallery', true) || get_post_meta($arg, QUCREATIVE_META_PREFIX . 'meta_image_gallery_in_meta', true)))) {


    if ($margs['include_featured-media-con_div']) {
      $fout .= '<div class="featured-media-con from-generate_featured_media">';
    }


    if ($post_media_type == 'image') {
      $fout .= '<img alt="' . esc_html__("image", 'qucreative') . '" class="' . $margs['img_extra_class'] . '" src="' . qucreative_sanitize_id_to_src($post_media) . '">';
    }
    if ($post_media_type == 'vimeo' || $post_media_type == 'youtube' || $post_media_type == 'video') {
      $fout .= '<div class="vplayer-tobe auto-init-from-q " data-src="' . $post_media . '" style="';


      wp_enqueue_script('qucreative-video-player', QUCREATIVE_THEME_URL . 'libs/videogallery/vplayer.js', array('jquery'));
      wp_enqueue_style('qucreative-video-player', QUCREATIVE_THEME_URL . 'libs/videogallery/vplayer.css');


      if ($margs['call_from'] == 'item_excerpt_setup') {

        $fout .= 'height: ' . $margs['item_excerpt_setup_video_height'] . 'px;';
      } else {
        $fout .= 'height: 488px; ';
      }

      $fout .= '" data-options=\'\'';


      if ($margs['call_from'] == 'item_excerpt_setup') {


      }

      $fout .= '>

                                    ';


      if (get_post_meta($arg, QUCREATIVE_META_PREFIX . 'meta_video_cover_image' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $fout .= '<div class="cover-image" style="background-image: url(' . get_post_meta($arg, QUCREATIVE_META_PREFIX . 'meta_video_cover_image' . $qucreative_main->theme_data['page_extra_meta_label'], true) . '); ">
<svg class="cover-play-btn" version="1.1" baseProfile="tiny"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     x="0px" y="0px" width="120px" height="120px" viewBox="0 0 120 120" overflow="auto" xml:space="preserve">
<path fill-rule="evenodd" fill="#ffffff" d="M79.295,56.914c2.45,1.705,2.45,4.468,0,6.172l-24.58,17.103
    c-2.45,1.704-4.436,0.667-4.436-2.317V42.129c0-2.984,1.986-4.022,4.436-2.318L79.295,56.914z M0.199,54.604
    c-0.265,2.971-0.265,7.821,0,10.792c2.57,28.854,25.551,51.835,54.405,54.405c2.971,0.265,7.821,0.265,10.792,0
    c28.854-2.57,51.835-25.551,54.405-54.405c0.265-2.971,0.265-7.821,0-10.792C117.231,25.75,94.25,2.769,65.396,0.198
    c-2.971-0.265-7.821-0.265-10.792,0C25.75,2.769,2.769,25.75,0.199,54.604z M8.816,65.394c-0.309-2.967-0.309-7.82,0-10.787
    c2.512-24.115,21.675-43.279,45.79-45.791c2.967-0.309,7.821-0.309,10.788,0c24.115,2.512,43.278,21.675,45.79,45.79
    c0.309,2.967,0.309,7.821,0,10.788c-2.512,24.115-21.675,43.279-45.79,45.791c-2.967,0.309-7.821,0.309-10.788,0
    C30.491,108.672,11.328,89.508,8.816,65.394z"/>
</svg>
</div>';
      }


      $fout .= '</div>';


    }

    if ($post_media_type == 'slider') {


      if ($margs['call_from'] == 'zoombox_item') {
        $fout .= ' <div class="arrow-left-for-skin-qucreative" onclick="jQuery(this).parent().find(\'.advancedscroller\').eq(0).get(0).api_gotoPrevPage();"></div>
            <div class="arrow-right-for-skin-qucreative" onclick="jQuery(this).parent().find(\'.advancedscroller\').eq(0).get(0).api_gotoNextPage();"></div>
            <div  class="advancedscroller skin-nonav " style="width:100%; "><div class="preloader-semicircles"></div><ul class="items">';
      } elseif ($margs['call_from'] == 'item_excerpt_setup') {


        $fout .= '<div class="advancedscroller-con">
<div class="advancedscroller skin-qucreative" style="width:100%; height: auto; margin-bottom: 0;" >
		<ul class="items">';
      } else {

        $fout .= '<div class="advancedscroller-con">
                            <div class="advancedscroller skin-qucreative auto-init-from-q" style="width:100%; height: auto; margin-bottom: 0;" data-options=\'{
"settings_mode": "onlyoneitem"
,"design_arrowsize": "0"
,"settings_swipe": "on"
,"settings_autoHeight": "on"
,"settings_autoHeight_proportional": "on"
,"settings_swipeOnDesktopsToo": "on"
,"settings_slideshow": "off"
,"settings_slideshowTime": "150"
}\'>
<ul class="items">';
      }


      $product_image_gallery = '';


      $lab = QUCREATIVE_META_PREFIX . 'meta_image_gallery';
      if (get_post_meta($arg, $lab . $qucreative_main->theme_data['page_extra_meta_label'], true)) {


        $product_image_gallery = get_post_meta($arg, $lab . $qucreative_main->theme_data['page_extra_meta_label'], true);


      }
      $lab = QUCREATIVE_META_PREFIX . 'meta_image_gallery_in_meta';
      if (get_post_meta($arg, $lab . $qucreative_main->theme_data['page_extra_meta_label'], true)) {


        $product_image_gallery = get_post_meta($arg, $lab . $qucreative_main->theme_data['page_extra_meta_label'], true);
      }


      if ($product_image_gallery) {

        $attachments = array_filter(explode(',', $product_image_gallery));


        if ($attachments) {

          $i3 = 0;
          foreach ($attachments as $attachment_id) {


            $img_full = wp_get_attachment_image_src($attachment_id, 'full');


            $i3++;


            $fout .= '<li class="item-tobe needs-loading"><div class="imagediv" style="background-image: url(' . $img_full[0] . ')" ></div></li>';

          }


        }

      }

      if ($margs['call_from'] == 'zoombox_item') {

        $fout .= '</ul>
                            </div>
                            ';
      } else {
        $fout .= '</ul>
                            </div>
                        </div>';

      }


      if ($margs['call_from'] == 'zoombox_item') {


        $fout .= '<div class="toexecute">';


        $fout .= json_encode(array(
          'type' => 'transform_slider_con',
          'settings_mode' => 'onlyoneitem',
          'design_arrowsize' => '0',
          'settings_swipe' => 'on',
          'settings_swipeOnDesktopsToo' => 'on',
          'settings_slideshow' => 'off',
          'settings_autoHeight' => 'off',
        ));

        $fout .= '</div>';


      }
      if ($margs['call_from'] == 'item_excerpt_setup') {


        $fout .= '<div class="toexecute">';
        $fout .= json_encode(array(
          'type' => 'item_excerpt_setup',
          'settings_mode' => 'onlyoneitem',
          'design_arrowsize' => '0',
          'settings_swipe' => 'on',
          'settings_swipeOnDesktopsToo' => 'on',
          'settings_slideshow' => 'off',
          'settings_autoHeight' => 'on',
          'settings_autoHeight_proportional' => 'on',
          'settings_autoHeight_proportional_max_height' => 'on',
          'settings_force_immediate_load' => 'off',
        ));
        $fout .= '</div>';


      }


      // -- end slider
    }

    if ($margs['include_featured-media-con_div']) {

      $fout .= '</div>';
    }
  } else {

    if ($margs['search_for_featured_media']) {

      $img = qucreative_view_get_featured_image($arg);

      if ($img) {

        if ($margs['include_featured-media-con_div']) {

          $fout .= '<div class="featured-media-con from-generate_featured_media">';
        }


        if ($post_media_type == 'image') {
          $fout .= '<img alt="' . esc_html__("image", 'qucreative') . '" class="' . $margs['img_extra_class'] . '" src="' . $img . '">';
        }

        if ($margs['include_featured-media-con_div']) {

          $fout .= '</div>';
        }
      }
    }

  }

  return $fout;
}
