<?php

add_action('qucreative_single_before_the_content', 'qucreative_action_single_before_the_content');


function qucreative_action_single_before_the_content() {


  global $qucreative_main;


  global $post;
  global $quplugin_main;
  $content = $post->post_content;

  $fout = '';

  $post_type_for_portfolio = 'antfarm_port_items';

  if (strpos($content, '[vc_section') === false && !($post && ($post->post_type == $post_type_for_portfolio)) && ($qucreative_main->theme_data['page_type'] != 'page-portfolio')) {
    $qucreative_main->theme_data['content_acts_as_sheet'] = true;
  }


  if ($post && ($quplugin_main && $post->post_type == $quplugin_main->name_port_item)) {
    $qucreative_main->theme_data['content_acts_as_sheet'] = false;

  }


  if ($qucreative_main->theme_data['content_acts_as_sheet']) {
    $fout .= '<section class=" the-content-sheet forced-from-no-rows';


    if ($post) {
      $fout .= ' post-type-' . $post->post_type;
    }

    $fout .= '"><div class="the-content-sheet-text forced-from-no-rows';


    if ($post) {
      $fout .= ' post-type-' . $post->post_type;
    }

    $fout .= '"><div class="vc_row wpb_row vc_row-fluid"><div class="wpb_column vc_column_container vc_col-sm-12"><div class="vc_column-inner "><div class="wpb_wrapper">';
  }

  echo $fout;
}

