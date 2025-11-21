<?php

/**
 * view - for content
 * @param $pargs
 * @return mixed|string|null
 */
function qucreative_get_sidebar($pargs = array()) {

  global $post;
  global $qucreative_main;

  $margs = array(
    'sidebar_name' => 'sidebar-1',

  );

  if ($pargs) {
    $margs = array_merge($margs, $pargs);
  }



  $sidebar = '';
  if ($qucreative_main->theme_data['post_for_meta']) {
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_use_sidebar' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {
      $sidebar = $margs['sidebar_name'];
    }
  }

  if (is_home() || is_search() || is_archive()) {
    $sidebar = $margs['sidebar_name'];
  }


  if (isset($qucreative_main->theme_data['post_for_meta']->ID) && isset($post->ID)) {
    if ($qucreative_main->theme_data['post_for_meta']->ID === $post->ID) {
      if ($post->post_type == 'post') {

        $sidebar = $margs['sidebar_name'];
      }
    }
  }


  $sidebars_widgets = wp_get_sidebars_widgets();
  if (isset($sidebars_widgets[$sidebar]) && count((array)$sidebars_widgets[$sidebar]) == 0) {
    $sidebar = null;
  }


  if ($qucreative_main->theme_data['post_for_meta']) {
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_use_sidebar' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'off') {
      $sidebar = null;
    }
  }



  return $sidebar;
}
