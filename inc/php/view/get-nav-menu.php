<?php

function qucreative_view_generateMenu() {

  $location = QUCREATIVE_MENU_PRIMARY_MENU_ID;

  // Get all available menus
  $menus = wp_get_nav_menus();

  // Try to display the menu assigned to the primary location
  $nav_menu_args = array(
    'theme_location' => $location,
    'echo' => true,
    'menu_class' => 'the-actual-nav',
    'container_class' => 'the-actual-nav',
    'fallback_cb' => '__return_false', // Disable default fallback
  );

  // Check if primary location has a menu assigned
  $locations = get_nav_menu_locations();
  $has_primary_menu = !empty($locations[$location]);

  if ($has_primary_menu) {
    // Display the assigned primary menu
    wp_nav_menu($nav_menu_args);
  } elseif (!empty($menus)) {
    // Fallback: Display the first available menu
    $nav_menu_args['menu'] = $menus[0];
    unset($nav_menu_args['theme_location']);
    wp_nav_menu($nav_menu_args);

    // Optional: Show admin notice for logged-in admins
    if (current_user_can('manage_options')) {
      echo '<div class="menu-helper-text" style="font-size: 11px; opacity: 0.7;">' .
        esc_html__("Showing first menu. ", 'qucreative') .
        '<a target="_blank" href="' . admin_url("nav-menus.php?action=locations") . '">' .
        esc_html__("Assign to Primary location", 'qucreative') .
        '</a></div>';
    }
  } else {
    // No menus exist at all - show setup message
    echo '<div class="menu-helper-text">' .
      esc_html__("Please create a menu from ", 'qucreative') .
      '<a target="_blank" href="' . admin_url("nav-menus.php") . '">' .
      esc_html__("here", 'qucreative') .
      '</a></div>';
  }
}
