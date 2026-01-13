<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage qucreative
 */

global $post;


include_once QUCREATIVE_THEME_DIR . 'inc/view.php';
include_once QUCREATIVE_THEME_DIR . 'inc/php/view/view-generate-inline-options-functional.php';
include_once QUCREATIVE_THEME_DIR . 'inc/php/view/generate-responsive-menu.php';

$tempArgs = array(
  'query_type' => 'page',
);

if ($post) {
  if (is_single($post->ID)) {
    $tempArgs['query_type'] = 'single-post';
  }
}





global $qucreative_main;








do_action('qucreative_hook_before_html');









?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php


  // -- end font inclusions

  ?>
  <?php


  global $wp_query;


  $qucreative_main->quCreativeView->controller_menuType();


  $page_title_align = get_theme_mod('page_title_align');


  if ($qucreative_main->theme_data['sw_is_in_customizer']) {
    $lab = 'content_environment_style';

    $qucreative_main->theme_data['theme_mods'][$lab] = get_theme_mod($lab);
  }


  qucreative_generate_inline_javascript_for_options();


  do_action('qucreative_hook_head');

  $original_title = $qucreative_main->theme_data['view_title'];
  wp_head();

  // -- after wp_head


  $quSidebar = $qucreative_main->quCreativeView->sidebar_get();

  ?>
</head>
<body <?php body_class(); ?> >
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main-content"><?php esc_html_e('Skip to content', 'qucreative'); ?></a>

<div class="main-container transition-<?php echo $qucreative_main->get_theme_mod_and_sanitize('bg_transition') ?>">
  <div class="main-bg-con main-bg-con--placeholder">
    <figure class="main-bg" style=""></figure>
  </div>
  <?php


  if ($qucreative_main->theme_data['menu_type_attr'] === QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS) {
    qucreative_header_generateQuNav();
  }
  // -- title + .the-content
  ?>
  <div class="the-content-con <?php echo ' ' . $qucreative_main->theme_data['page_type'];


  $qucreative_main->quCreativeView->controller_getContentConExtraClasses();


  ?>" style=";">
    <div class="qu-nav--placeholder"></div>
    <div class="the-content-and-title-con-flex"><?php

      if ($qucreative_main->theme_data['menu_horizontal_width']) {
        ?>
        <div class="content-menu--placeholder"
             style="flex: 0 0 <?php echo $qucreative_main->theme_data['menu_horizontal_width']; ?>px; width: <?php echo $qucreative_main->theme_data['menu_horizontal_width']; ?>px;"></div><?php
      }
      ?>
      <div class="the-content-and-title-con">
        <?php qucreative_view_generateResponsiveMenu(); ?>
        <?php

        do_action('qucreative_hook_before_the_content');


        if (!$post || (get_post_meta($post->ID, '_wp_page_template', true) !== 'template-qucreative-slider.php')){


        if ($qucreative_main->theme_data['view_title'] && $original_title != 'none' && $original_title != ' ') {
          qucreative_view_generateMainPageTitle($qucreative_main, $page_title_align);
        }

        ?>


        <div class="the-content qu-structure-content-container <?php
        quCreative_view_getTheContentClasses($original_title);


        // -- this is .the-content div

        ?>" style="<?php
        quCreative_view_getTheContentStyle($original_title);
        ?>" <?php

        // todo: move to view
        if ($qucreative_main->theme_data['template_is_portfolio_gap']) {
          echo ' data-portfolio-gap="' . $qucreative_main->theme_data['template_is_portfolio_gap'] . '"';
        }
        ?>
        >
          <?php

          if(!defined('QUEXTEND_PLUGIN_URL')){
            qucreative_view_generateTranslucentCon('translucent-con--for-content');
          }


          do_action('qucreative_hook_the_content_start');
          ?>


          <div class="the-content-inner <?php
          quCreative_view_getTheContentInnerClasses()
          ?>" id="main-content"><?php


            do_action('qucreative_hook_the_content_inner_start');


            if ($quSidebar){
            ?>
            <div class="row row-with-sidebar">
              <!-- content comes next -->
              <div class="col-sm-8 col-content ">
                <?php
                }
                ?>
<?php
}

