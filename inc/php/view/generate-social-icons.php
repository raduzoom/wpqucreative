<?php

if(!function_exists('qucreative_header_generateSocialIcons')){

  function qucreative_header_generateSocialIcons() {

    global $qucreative_main;




    $sw_show_nav_social_con = false;


    $isHeaderSocialIconsArr = is_array($qucreative_main->theme_data['header_social_icons']) && count($qucreative_main->theme_data['header_social_icons']);


    $allowed_menu_types = [
      'menu-type-1',
      'menu-type-2',
      'menu-type-3',
      'menu-type-4',
      'menu-type-7',
      'menu-type-8',
      'menu-type-9',
      'menu-type-10',
      'menu-type-11',
      'menu-type-12',
      'menu-type-13',
      'menu-type-14',
      'menu-type-15',
      'menu-type-16',
      'menu-type-17',
      'menu-type-18'
    ];

    if ($isHeaderSocialIconsArr && (in_array($qucreative_main->theme_data['menu_type'], $allowed_menu_types))) {

      $sw_show_nav_social_con = true;
    }

    ?>
    <div class="nav-social-con with-social-icons"><?php
    if ($sw_show_nav_social_con) {
      ?>
      <p class="social-icons">
        <?php


        if (is_array($qucreative_main->theme_data['header_social_icons'])) {

          foreach ($qucreative_main->theme_data['header_social_icons'] as $socialIcon) {
            echo '<a href="' . $socialIcon->link . '"><i class="fa fa-' . $socialIcon->icon . '"></i></a>';
          }
        }
        ?>
      </p>
      <?php
    }


    $heading_style = $qucreative_main->get_theme_mod_and_sanitize('copyright_textbox_heading_style');
    $copyright_text = $qucreative_main->get_theme_mod_and_sanitize('copyright_textbox');

    if ($heading_style == '') {
      $heading_style = 'h6';
    }


    $h_wrap_start = '<' . $heading_style . ' class="copyright-text the-variable-heading">';
    $h_wrap_end = '</' . $heading_style . '>';

    if ($heading_style == 'h-group-1' || $heading_style == 'h-group-2') {

      $h_wrap_start = '<h3 class="copyright-text the-variable-heading ' . $heading_style . '">';
      $h_wrap_end = '</h3>';
    }


    $h_wrap_start = '<div class="copyright-text">';
    $h_wrap_end = '</div>';


    $isShowCopyright = true;
    if ($qucreative_main->theme_data['menu_type'] == 'menu-type-8' || $qucreative_main->theme_data['menu_type'] == 'menu-type-9' || $qucreative_main->theme_data['menu_type'] == 'menu-type-12' || $qucreative_main->theme_data['menu_type'] == 'menu-type-13' || $qucreative_main->theme_data['menu_type'] == 'menu-type-14' || $qucreative_main->theme_data['menu_type'] == 'menu-type-15' || $qucreative_main->theme_data['menu_type'] == 'menu-type-16' || $qucreative_main->theme_data['menu_type'] == 'menu-type-17' || $qucreative_main->theme_data['menu_type'] == 'menu-type-18') {
      $isShowCopyright = false;

    }


    if ($isShowCopyright && isset($copyright_text) && $copyright_text) {
      ?><?php echo $h_wrap_start . $copyright_text . $h_wrap_end; ?><?php
    }
    ?></div><?php
  }





}
