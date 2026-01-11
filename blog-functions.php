<?php

function qucreative_view_get_featured_image($pid) {


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




