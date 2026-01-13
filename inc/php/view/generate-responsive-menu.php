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

  // Build the custom responsive menu structure
  $custom_menu_html = '';
  if ($responsive_menu_type === 'custom') {
    $custom_menu_html = '<div class="custom-responsive-menu">
      <div class="close-responsive-con"><i class="fa fa-times"></i></div>
      <div class="custom-menu-con"><ul class="custom-menu"></ul></div>
    </div>';
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
    <?php echo $custom_menu_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML is static ?>
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
