<?php

/**
 * view - for content
 */
function qucreative_get_viewTitle(QuCreativeView $quCreativeView, $mainArgs) {

  $qucreative_main = $quCreativeView->quMain;

  $viewTitle = '';

  if (is_search()) {
    $viewTitle = esc_html__("SEARCH", 'qucreative');
    return $viewTitle;
  }
  if (is_archive()) {
    $viewTitle = esc_html__("ARCHIVE", 'qucreative');
    return $viewTitle;
  }

  if (is_404()) {
    $viewTitle = esc_html__("Oops", 'qucreative');
    return $viewTitle;
  }




  $langDefaultBlog = esc_html__("Blog", 'qucreative');
  if ($mainArgs['title'] !== null) {

    $viewTitle = $mainArgs['title'];
  }

  if (is_home() || is_search()) {
    $posts_page = $qucreative_main->theme_data['post_for_meta'];

    if (!$posts_page) {
      $viewTitle = $langDefaultBlog;
    }


    if (!$posts_page) {


      $pageBlogMetaQueryByTitle = QuCreativeView::get_page_by_title('Blog Meta');


      if ($pageBlogMetaQueryByTitle) {


        if (!($pageBlogMetaQueryByTitle->post_status == 'publish' && $mainArgs['query_type'] != 'single-post')) {
          // -- blog posts without static page default title
          $viewTitle = $langDefaultBlog;
        }

      } else {
        // -- blog posts without static page default title
        $viewTitle = $langDefaultBlog;
      }

    }

    if ($qucreative_main->theme_data['post_for_meta']) {

      $viewTitle = $qucreative_main->theme_data['post_for_meta']->post_title;


      if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $viewTitle = wp_kses(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true), QU_VIEW_ALLOWED_TAGS);
      }
    }
  }




  // -- page
  if ($mainArgs['query_type'] == 'page') {

    global $post;

    $viewTitle = get_the_title($post->ID);
  }
  if ($mainArgs['query_type'] == 'single-post') {

    global $post;

    $viewTitle = get_the_title($post->ID);
    // -- single post
    if (get_option('page_for_posts')) {
      $page_posts = get_post(get_option('page_for_posts'));

      $viewTitle = $page_posts->post_title;
      if (get_post_meta($page_posts->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $viewTitle = wp_kses(get_post_meta($page_posts->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true), QU_VIEW_ALLOWED_TAGS);
      }


    } else {


      // -- single post
      $page2 = QuCreativeView::get_page_by_title('Blog Meta');


      if ($page2 && $page2->post_status == 'publish') {




        $viewTitle = $page2->post_title;
        if (get_post_meta($page2->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {


          $viewTitle = wp_kses(get_post_meta($page2->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true), QU_VIEW_ALLOWED_TAGS);
        }

      }

    }
  }




  global $post;
  if ($post && ($post->post_type == QUCREATIVE_POST_TYPE_PORTFOLIO || $post->post_type == 'dzsvcs_port_items') && get_post_meta($post->ID, QUCREATIVE_META_PREFIX . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) != 'on') {

    $portfolio_page = get_post(get_theme_mod('portfolio_page'));


    if ($portfolio_page && isset($portfolio_page->post_title)) {

      $viewTitle = $portfolio_page->post_title;


      if (get_post_meta($portfolio_page->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $viewTitle = esc_html(get_post_meta($portfolio_page->ID, QUCREATIVE_META_PREFIX . 'meta_custom_title' . $qucreative_main->theme_data['page_extra_meta_label'], true));
      }
    }


  }


  if ($viewTitle === '  ' || $viewTitle === ' ' || $viewTitle === 'none') {
    $viewTitle = '';
  }

  return $viewTitle;
}
