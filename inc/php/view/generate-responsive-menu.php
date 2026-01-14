<?php
/**
 * Generates the responsive menu (520px breakpoint navigation)
 *
 * @package qucreative
 */

/**
 * Output the responsive menu container with logo and hamburger button
 *
 * @return void
 */
function qucreative_view_generateResponsiveMenu() {
  global $qucreative_main;

  $responsive_menu_type = $qucreative_main->get_theme_mod_and_sanitize('responsive_menu_type');

  // Default to 'custom' menu type
  if (!$responsive_menu_type) {
    $responsive_menu_type = 'custom';
  }

  // Build the select dropdown (only for non-custom menu type)
  $select_html = '';
  if ($responsive_menu_type !== 'custom') {
    $select_html = '<select class="dzs-style-me-from-q skin-justvisible" name="the_layout">
      <option value="default">' . esc_html__('default', 'qucreative') . '</option>
      <option value="random">' . esc_html__('random', 'qucreative') . '</option>
    </select>';
  }

  ?>
  <div class="qucreative--520-nav-con">
    <?php qucreative_view_generateResponsiveMenuLogo(); ?>
    <div class="dzs-select-wrapper skin-justvisible">
      <div class="dzs-select-wrapper-head">
        <div class="nav-wrapper-head bg-color-hg"><i class="fa fa-bars"></i></div>
      </div>
      <?php echo $select_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML is built with escaped parts ?>
    </div>
    <?php if ($responsive_menu_type === 'custom') : ?>
      <div class="custom-responsive-menu">
        <div class="close-responsive-con"><i class="fa fa-times"></i></div>
        <div class="custom-menu-con">
          <?php qucreative_view_generateResponsiveMenuItems(); ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
  <?php
}

/**
 * Generate the logo specifically for the responsive menu (520px breakpoint)
 *
 * @return void
 */
function qucreative_view_generateResponsiveMenuLogo() {
  global $qucreative_main;

  $logo = $qucreative_main->get_theme_mod_and_sanitize('logo');
  $menuType = $qucreative_main->get_theme_mod_and_sanitize('menu_type');

  if (!$logo) {
    $logo = qucreative_view_generateLogo_defaultLogo($menuType);
  }

  ?>
  <div class="logo-con logo-con-520" style="">
    <a class="custom-a" rel="home" href="<?php echo esc_url(home_url('/')); ?>">
      <img alt="<?php echo esc_attr__('site logo', 'qucreative'); ?>" class="the-logo" style="" src="<?php echo esc_url($logo); ?>">
    </a>
  </div>
  <?php
}

/**
 * Generate the menu items for the responsive custom menu
 *
 * @return void
 */
function qucreative_view_generateResponsiveMenuItems() {
  $location = QUCREATIVE_MENU_PRIMARY_MENU_ID;

  // Get all available menus
  $menus = wp_get_nav_menus();

  // Check if primary location has a menu assigned
  $locations = get_nav_menu_locations();
  $has_primary_menu = !empty($locations[$location]);

  if ($has_primary_menu) {
    // Display the assigned primary menu
    wp_nav_menu(array(
      'theme_location' => $location,
      'echo' => true,
      'menu_class' => 'custom-menu',
      'container' => false,
      'fallback_cb' => '__return_false',
    ));
  } elseif (!empty($menus)) {
    // Fallback: Display the first available menu
    wp_nav_menu(array(
      'theme_location' => $location,
      'menu' => $menus[0],
      'echo' => true,
      'menu_class' => 'custom-menu',
      'container' => false,
      'fallback_cb' => '__return_false',
    ));
  } else {
    // No menus exist - output empty ul with helper text
    echo '<ul class="custom-menu">';
    echo '<li><div class="menu-helper-text">' .
      esc_html__("Please create a menu from ", 'qucreative') .
      '<a target="_blank" href="' . esc_url(admin_url("nav-menus.php")) . '">' .
      esc_html__("here", 'qucreative') .
      '</a></div></li>';
    echo '</ul>';
  }
}
