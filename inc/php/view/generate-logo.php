<?php


function qucreative_view_generateLogo() {

  global $qucreative_main;



  $isDivLogo = false;

  if ($qucreative_main->get_theme_mod_and_sanitize('logo_width') || $qucreative_main->get_theme_mod_and_sanitize('logo_height')) {

    $isDivLogo = true;
  }







  $str_w = '';
  $str_h = '';
  $str_inner_w = 'width: 183px; ';
  $str_inner_h = 'height: 128px; ';
  $str_x = '';
  $str_y = '';



  if ($qucreative_main->get_theme_mod_and_sanitize('logo_x') == 'custom_position' || $qucreative_main->get_theme_mod_and_sanitize('logo_y') == 'custom_position' || $qucreative_main->get_theme_mod_and_sanitize('logo_width') || $qucreative_main->get_theme_mod_and_sanitize('logo_height')) {
    if ($qucreative_main->get_theme_mod_and_sanitize('logo_x') == 'custom_position') {
      if ($qucreative_main->get_theme_mod_and_sanitize('logo_x_custom') !== '') {
        $str_x = ' margin-left: ' . $qucreative_main->get_theme_mod_and_sanitize('logo_x_custom') . 'px; ';
      }
    }


    if ($qucreative_main->get_theme_mod_and_sanitize('logo_y') == 'custom_position') {
      if ($qucreative_main->get_theme_mod_and_sanitize('logo_y_custom') !== '') {
        $str_y = ' margin-top: ' . $qucreative_main->get_theme_mod_and_sanitize('logo_y_custom') . 'px; ';
      }
    }


    if ($qucreative_main->get_theme_mod_and_sanitize('logo_width')) {

      $str_w = ' width: ' . $qucreative_main->get_theme_mod_and_sanitize('logo_width') . 'px; ';
      $str_inner_w = ' width: ' . $qucreative_main->get_theme_mod_and_sanitize('logo_width') . 'px; ';
    }

    if ($qucreative_main->get_theme_mod_and_sanitize('logo_height')) {

      $str_h = ' height: ' . qucreative_sanitize_to_size($qucreative_main->get_theme_mod_and_sanitize('logo_height')) . '; ';
      $str_inner_h = ' height: ' . qucreative_sanitize_to_size($qucreative_main->get_theme_mod_and_sanitize('logo_height')) . '; ';
    }
  }


  ?>
    <div class="logo-con <?php


    if ($qucreative_main->get_theme_mod_and_sanitize('logo_x') == 'custom_position' || $qucreative_main->get_theme_mod_and_sanitize('logo_y') == 'custom_position') {
      if ($qucreative_main->get_theme_mod_and_sanitize('logo_x') == 'custom_position') {
        if ($qucreative_main->get_theme_mod_and_sanitize('logo_x_custom') !== '') {
          echo ' custom-position-x';
        }
      }

      if ($qucreative_main->get_theme_mod_and_sanitize('logo_y') == 'custom_position') {
        if ($qucreative_main->get_theme_mod_and_sanitize('logo_y_custom') !== '') {
          echo ' custom-position-y';
        }
      }
    }

    if ($isDivLogo) {
      echo ' divlogo';
    }



    ?>" style="<?php

    echo $str_x;
    echo $str_y;

    if ($qucreative_main->theme_data['menu_type_attr'] == QUCREATIVE_VIEW_VERTICAL_MENU_TYPE_CSS_CLASS) {

      echo ' width: 100%; ';
    } else {
      echo $str_w;
    }
    if ($qucreative_main->theme_data['menu_type_attr'] == QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS) {

      echo ' height: 100%; ';
    } else {
      echo qucreative_sanitize_to_size($str_h);
    }


    $logo = $qucreative_main->get_theme_mod_and_sanitize('logo');


    $menuType = $qucreative_main->get_theme_mod_and_sanitize('menu_type');


    if(!$logo){
      $logo = qucreative_view_generateLogo_defaultLogo($menuType);
    }


    ?>">
        <a class="custom-a" rel="home" href="<?php echo esc_url(home_url('/')); ?>">
          <?php
          if ($isDivLogo) {
            ?>
              <div class="qu-header--logo the-logo"
                   style="<?php
                   echo $str_inner_w;
                   echo $str_inner_h;

                   ?>background-image:url(<?php echo esc_url($logo); ?>);"></div>
            <?php
          } else {
            ?>
              <img alt="<?php echo esc_attr__('site logo', 'qucreative'); ?>" class="the-logo"
                   style="" src="<?php echo esc_url($logo); ?>"/>
            <?php
          }
          ?>

        </a>
    </div>
  <?php
}



function qucreative_view_generateLogo_defaultLogo(string $menuType): string {


  $logo = '';




  if ($menuType == '' || $menuType == 'menu-type-1' || $menuType == 'menu-type-7') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-1-7.png';
  }

  if ($menuType == 'menu-type-2' || $menuType == 'menu-type-8') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-2-8.png';
  }
  if ($menuType == 'menu-type-3' || $menuType == 'menu-type-9' || $menuType == 'menu-type-13' || $menuType == 'menu-type-15' || $menuType == 'menu-type-17') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-3-9-13-15-17.png';
  }
  if ($menuType == 'menu-type-4' || $menuType == 'menu-type-10' || $menuType == 'menu-type-14' || $menuType == 'menu-type-16' || $menuType == 'menu-type-18') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-4-10-14-16-18.png';
  }
  if ($menuType == 'menu-type-5') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-5.png';
  }
  if ($menuType == 'menu-type-6') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-6.png';
  }
  if ($menuType == 'menu-type-11' || $menuType == 'menu-type-12') {
    $logo = QUCREATIVE_THEME_URL . 'assets/img/logos/logo-11-12.png';
  }

  return $logo;

}
