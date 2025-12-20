<?php
include_once QUCREATIVE_THEME_DIR.'inc/php/view/get-nav-menu.php';
/**
 * outputs the menu
 * @return void
 */
function qucreative_header_generateQuNav() {

  global $qucreative_main;



  ?>
    <!-- this block is the navigation -->
    <nav class="qucreative--nav-con">

    <!-- modify the logo from here -->
  <?php



  $searchedMenuType = $qucreative_main->theme_data['menu_type'];

  if (!in_array($searchedMenuType, QUCREATIVE_VIEW_OVERLAY_MENUS)) {
    qucreative_view_generateTranslucentCon();
  }
  qucreative_view_generateLogo();


  qucreative_view_generateMenu();


  qucreative_header_generateSocialIcons();

  qucreative_header_generateSearchIcon();



  if (in_array($searchedMenuType, QUCREATIVE_VIEW_OVERLAY_MENUS)) {

    echo '<i class="fa fa-bars qu-overlay-menu-toggler"></i>';
  }
  ?>
    </nav><?php
}
