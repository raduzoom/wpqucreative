<?php

/**
 * Generate featured media for posts
 * Handles image type in theme, other types (slider/video/vimeo/youtube) can be handled by qu-extend plugin
 *
 * @param int $arg Post ID
 * @param array $pargs Optional parameters
 * @return string HTML output
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


  // -- detect media type from post_media URL
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

  // -- allow plugin to handle extended media types (slider, video, vimeo, youtube)
  $extended_media_types = array('slider', 'video', 'vimeo', 'youtube');

  /**
   * Filter: qucreative_featured_media_output
   * Allows plugins to handle specific media types
   *
   * @param string $fout Current output (empty string)
   * @param int $arg Post ID
   * @param string $post_media_type The detected media type
   * @param string $post_media The media URL/value
   * @param array $margs Merged arguments
   * @return string HTML output or empty to fall back to theme handling
   */
  $plugin_output = apply_filters('qucreative_featured_media_output', '', $arg, $post_media_type, $post_media, $margs);

  if ($plugin_output !== '' && in_array($post_media_type, $extended_media_types)) {
    return $plugin_output;
  }

  // -- theme handles image type only
  if ($post_media && $post_media_type == 'image') {

    if ($margs['include_featured-media-con_div']) {
      $fout .= '<div class="featured-media-con from-generate_featured_media">';
    }

    $fout .= '<img alt="' . esc_html__("image", 'qucreative') . '" class="' . $margs['img_extra_class'] . '" src="' . qucreative_sanitize_id_to_src($post_media) . '">';

    if ($margs['include_featured-media-con_div']) {
      $fout .= '</div>';
    }
  } elseif ($post_media_type == 'image' && $margs['search_for_featured_media']) {
    // -- fallback to featured image
    $img = qucreative_view_get_featured_image($arg);

    if ($img) {
      if ($margs['include_featured-media-con_div']) {
        $fout .= '<div class="featured-media-con from-generate_featured_media">';
      }

      $fout .= '<img alt="' . esc_html__("image", 'qucreative') . '" class="' . $margs['img_extra_class'] . '" src="' . $img . '">';

      if ($margs['include_featured-media-con_div']) {
        $fout .= '</div>';
      }
    }
  }

  return $fout;
}
