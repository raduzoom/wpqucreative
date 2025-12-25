<?php

add_action('save_post', 'qucreative_handle_admin_meta_save');
add_action('wp_ajax_qucreative_save_att_meta', 'qucreative_ajax_save_att_meta');
function qucreative_get_featured_image($pid) {


  $image = wp_get_attachment_image_src(get_post_thumbnail_id($pid), 'single-post-thumbnail');


  if ($image) {

    if (is_array($image)) {
      return $image[0];
    } else {

      return $image;
    }
  } else {
    return '';
  }
}

function qucreative_handle_admin_meta_save($post_id) {
  global $post;


  if (!$post) {
    return;
  }

  // --  Check autosave
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }


  $is_preview = false;
  if (isset($_POST['wp-preview']) && $_POST['wp-preview'] == 'dopreview') {

    // -- save for preview ( append _preview maybe )
    $is_preview = true;

  }


  if (isset($_REQUEST[QUCREATIVE_META_PREFIX . 'meta_nonce'])) {
    $nonce = $_REQUEST[QUCREATIVE_META_PREFIX . 'meta_nonce'];
    if (!wp_verify_nonce($nonce, QUCREATIVE_META_PREFIX . 'meta_nonce')) {
      wp_die('Security check');
    }
  }


  if (is_array($_POST)) {
    $auxa = $_POST;
    foreach ($auxa as $label => $value) {


      $label_to_save = $label;

      if ($is_preview) {
        $label_to_save .= '_preview';
      }


      $original_value = $value;


      if (is_array($value) || $original_value === ' ') {

      } else {

        $value = sanitize_text_field($value);
      }


      if (strpos($label, QUCREATIVE_META_PREFIX . 'meta_') !== false) {
        update_post_meta($post->ID, $label_to_save, $value);
      }


    }
  }


}

function qucreative_ajax_save_att_meta() {

  global $qucreative_main;


  $arr_post = json_decode(stripslashes($_POST['postdata']), true);


  $pid = $arr_post['id'];

  $args = array(
    'ID' => $pid,
    'post_content' => $arr_post['post_content'],
    'post_excerpt' => $arr_post['post_excerpt'],
  );


// -- Update the post into the database
  wp_update_post($args);


  update_post_meta($pid, 'qucreative_' . 'meta_att_aligment', sanitize_text_field($arr_post[$arr_post['qucreative_' . 'meta_att_aligment']]));
  update_post_meta($pid, 'qucreative_' . 'meta_att_video', sanitize_text_field($arr_post['qucreative_' . 'meta_att_video']));
  update_post_meta($pid, 'qucreative_' . 'meta_att_enable_video_cover', sanitize_text_field($arr_post['qucreative_' . 'meta_att_enable_video_cover']));


  die();
}



function qucreative_get_post_meta($pargs = array()): string {


  global $post;
  $margs = array(

    'call_from' => 'default',
    'get_categories' => 'off',
    'post_id' => '',
    'separator' => ' / ',
    'include_posted_on' => true,

  );

  if ($pargs) {
    $margs = array_merge($margs, $pargs);
  }


  if ($margs['post_id']) {
    $post = get_post($margs['post_id']);
  }


  $fout = '';

  $cats = wp_get_post_categories($post->ID);
  $comments_count = wp_count_comments($post->ID);

  $cats_str = '';

  if (is_array($cats) && isset($cats[0]) && $cats[0] != 1) {

    $cats_str = $margs['separator'] . esc_html__("in", 'qucreative') . ' ';

    $i3 = 0;

    foreach ($cats as $catid) {
      $cat = get_category($catid);


      if ($i3 > 0) {
        $cats_str .= ', ';
      }

      $cats_str .= '<a class="ajax-link ajax-link--cat custom-a" href="' . get_category_link($catid) . '">';
      $cats_str .= $cat->name;
      $cats_str .= '</a>';

      $i3++;
    }
  }


  $pfx_date = get_the_date('F j Y', $post->id);
  $fout .= '<div class="post-meta font-group-7">';

  if ($margs['include_posted_on']) {
    $fout .= esc_html__("Posted on", 'qucreative') . ' ';
  }

  $fout .= $pfx_date;

  if ($cats_str) {
    $fout .= $cats_str;
  }

  $link = get_permalink($post->id);

  $link_comments = $link . '#comments';


  if ($margs['call_from'] == 'single_post') {
    $link_comments = '#comments';
  }


  if ($comments_count->total_comments) {


    $str_nr_comments = '';
    if ($comments_count->total_comments == 1) {
      $str_nr_comments = sprintf(esc_html__('%s comment', 'qucreative'), $comments_count->total_comments);
    } else {

      $str_nr_comments = sprintf(esc_html__('%s comments', 'qucreative'), $comments_count->total_comments);
    }


    $fout .= $margs['separator'] . ' <a class="ajax-link custom-a" href="' . $link_comments . '">' . $str_nr_comments . '</a>';


  }


  $fout .= '</div><!--end .post-meta-->';

  return $fout;

}




