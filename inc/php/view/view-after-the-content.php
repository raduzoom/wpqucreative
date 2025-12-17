<?php


add_action('qucreative_single_after_the_content', 'qucreative_action_single_after_the_content');
function qucreative_action_single_after_the_content() {


  global $qucreative_main;
  global $post;


  $fout = '';
  if ($post) {

    if (is_single()) {

      if ($post->post_type == 'post') {
        $args = array(
          'before' => '<div class="qucreative-pagination qucreative-pagination--wp_link_pages">',
          'after' => '</div>',
          'link_before' => '',
          'link_after' => '',
          'next_or_number' => 'number',
          'separator' => ' ',
          'nextpagelink' => '',
          'previouspagelink' => '',
          'pagelink' => '<span class="the-number-con"><span class="the-number h6">%</span></span>',
          'echo' => 0
        );
        $fout .= wp_link_pages($args);
      }
    }
  }


  $show_extra_post_meta = true;

  if ($qucreative_main->theme_data['post_for_meta']) {

    if ($qucreative_main->theme_data['post_for_meta']->ID != $post->ID) {
      $show_extra_post_meta = false;

    }


  }

  if ($qucreative_main->theme_data['content_acts_as_sheet']) {
    $fout .= '</div>' . '</div>' . '</div>' . '</div>' . '</div>';


    if (is_single()) {
      if ($show_extra_post_meta) {
        $fout .= qucreative_check_if_post_meta_below_must_be_added();
      }
    }


    $fout .= '</section>';
  } else {

  }


  if ($show_extra_post_meta) {

    if (is_single()) {
      $fout .= qucreative_check_if_prev_next_post_must_be_added();
    }
  }


  echo $fout;

}

/**
 * in the content
 * @param $margs
 * @return string
 */
function qucreative_check_if_post_meta_below_must_be_added($margs = array()) {
  global $post;
  $fout = '';


  if ($post && $post->post_type == 'post') {
    $fout .= '<div class="post-meta-below">
';


    $cats = wp_get_post_categories($post->ID);

    $cats_str = '';


    if (is_array($cats) && isset($cats[0]) && $cats[0] != 1) {

      $cats_str = ' / ' . esc_html__("in", QUCREATIVE_LANG_ID) . ' ';

      $i3 = 0;


      $cats_str = '<div class="meta-left h-group-1">' . esc_html__("CATEGORIES", QUCREATIVE_LANG_ID) . '</div>
  <div class="meta-right h-group-1">';

      foreach ($cats as $catid) {
        $cat = get_category($catid);


        if ($catid == 1) {
          continue;
        }

        if ($i3 > 0) {
          $cats_str .= ', ';
        }

        $cats_str .= '<a class="inherit-properties custom-a" href="' . get_category_link($catid) . '">';
        $cats_str .= $cat->name;
        $cats_str .= '</a>';

        $i3++;
      }

      $cats_str .= '</div> <div class="clear"></div>';
    }


    $cats = wp_get_post_tags($post->ID);
    $str_tags = '';


    if (is_array($cats) && count($cats) > 0) {


      $i3 = 0;


      $str_tags = '<div class="meta-left h-group-1">' . esc_html__("TAGS", 'qucreative') . '</div>
  <div class="meta-right h-group-1">';

      foreach ($cats as $cat) {


        if ($i3 > 0) {
          $str_tags .= ', ';
        }

        $str_tags .= '<a class="custom-a" href="' . get_tag_link($cat->term_id) . '">';
        $str_tags .= $cat->name;
        $str_tags .= '</a>';

        $i3++;
      }

      $str_tags .= '</div> <div class="clear"></div>';
    }

    // -- for posts


    ob_start();
    do_action('qucreative_social_place');

    $fout .= ob_get_contents();

    ob_end_clean();


    $author = get_user_by('id', $post->post_author);


    $fout .= '<div class="post-meta-below--meta">
        <div class="separator-line"></div>
        ' . $cats_str . $str_tags . '
        <div class="meta-left  h-group-1">' . esc_html__("AUTHOR", 'qucreative') . '</div>
        <div class="meta-right h-group-1"><a class=" custom-a" href="' . get_author_posts_url($author->ID) . '">' . $author->data->user_nicename . '</a></div>
        <div class="clear"></div>
    </div>


</div>';
  }

  return $fout;
}


function qucreative_check_if_prev_next_post_must_be_added() {
  global $post;

  $fout = '';

  if ($post && $post->post_type == 'post') {


    $prev_post = get_previous_post();
    $next_post = get_next_post();


    $fout .= '<div class="display-table blog-link-con">';


    if ($next_post) {
      $fout .= '<a href="' . get_permalink($next_post->ID) . '" class="left-td portfolio-link--title">
                                        ';


      $feat_image = wp_get_attachment_image_src(get_post_thumbnail_id($next_post->ID), 'thumbnail');
      if ($feat_image && $feat_image[0]) {
        $fout .= '<span class="link-thumb" style="background-image: url(' . $feat_image[0] . ');">
                                        </span>';
      }

      $fout .= '<span class="link-title h-group-1">
                                            ' . ($next_post->post_title) . '
                                        </span>

                            </a>';
    } else {

      $fout .= '<a href="#" class="left-td portfolio-link--title empty-portfolio-link--title"><span class="link-thumb" style="background-image: url();">
                                        </span><span class="link-title h-group-1">
                                        </span></a>';


    }


    $url_page_for_posts = '';

    if (get_option('page_for_posts')) {
      $url_page_for_posts = get_permalink(get_option('page_for_posts'));
    }


    $fout .= '<div class="center-td from-check_if_prev_next_post_must_be_added portfolio-link--toback " style="">
    <a class="donotchange-ajax-menu ajax-link"';

    if ($url_page_for_posts) {
      $fout .= '  href="' . $url_page_for_posts . '"';
    }

    $fout .= '>
        <i class="fa-th fa"></i>
    </a>
</div>';


    if ($prev_post) {

      $fout .= '<a href="' . get_permalink($prev_post->ID) . '" class="right-td portfolio-link--title">
                                        <span class="link-title h-group-1">
                                            ' . ($prev_post->post_title) . '
                                        </span>';

      $feat_image = wp_get_attachment_image_src(get_post_thumbnail_id($prev_post->ID), 'thumbnail');
      if ($feat_image && $feat_image[0]) {
        $fout .= '<span class="link-thumb" style="background-image: url(' . $feat_image[0] . ');">
                                        </span>';
      }


      $fout .= '</a>';
    } else {

      $fout .= '<a href="#" class="right-td portfolio-link--title empty-portfolio-link--title"><span class="link-thumb" style="background-image: url();">
</span><span class="link-title h-group-1">
</span></a>';
    }

    $fout .= '</div><!-- end .display-table -->';

  }

  return $fout;

}
