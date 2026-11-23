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
    <?php if ($responsive_menu_type === 'custom') : ?>
      <input class="responsive-menu-state" type="checkbox" id="qucreative-responsive-menu-state" autocomplete="off" aria-label="<?php echo esc_attr__('Menu', 'qucreative'); ?>">
    <?php endif; ?>
    <div class="dzs-select-wrapper skin-justvisible">
      <?php if ($responsive_menu_type === 'custom') : ?>
        <label class="dzs-select-wrapper-head" for="qucreative-responsive-menu-state">
          <div class="nav-wrapper-head bg-color-hg"><?php echo qucreative_icon('bars'); ?></div>
        </label>
      <?php else : ?>
        <div class="dzs-select-wrapper-head">
          <div class="nav-wrapper-head bg-color-hg"><?php echo qucreative_icon('bars'); ?></div>
        </div>
      <?php endif; ?>
      <?php echo $select_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML is built with escaped parts ?>
    </div>
    <?php if ($responsive_menu_type === 'custom') : ?>
      <div class="custom-responsive-menu">
        <label class="close-responsive-con" for="qucreative-responsive-menu-state"><?php echo qucreative_icon('times'); ?></label>
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
 * Add a CSS-driven submenu toggle to parent items of the responsive custom menu
 *
 * A "#" link has no page to open, so its whole row becomes the toggle.
 *
 * @param string   $item_output The menu item's HTML
 * @param WP_Post  $item        The menu item
 * @param int      $depth       Depth of the item
 * @param stdClass $args        wp_nav_menu() arguments
 * @return string
 */
function qucreative_view_responsiveMenuItemToggle($item_output, $item, $depth, $args) {
  if (empty($args->menu_class) || $args->menu_class !== 'custom-menu' || !in_array('menu-item-has-children', (array) $item->classes, true)) {
    return $item_output;
  }

  $id = 'qucreative-submenu-state-' . (int) $item->ID;
  $label = sprintf(esc_html__('Submenu: %s', 'qucreative'), wp_strip_all_tags($item->title));
  $row_class = $item->url === '#' ? ' submenu-toggle--row' : '';

  return '<input class="submenu-state" type="checkbox" id="' . esc_attr($id) . '" autocomplete="off" aria-label="' . esc_attr($label) . '">'
    . $item_output
    . '<label class="submenu-toggle' . $row_class . '" for="' . esc_attr($id) . '">' . qucreative_icon('angle-right') . '</label>';
}
add_filter('walker_nav_menu_start_el', 'qucreative_view_responsiveMenuItemToggle', 10, 4);

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
