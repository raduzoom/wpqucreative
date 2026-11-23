<?php

// -- One-time settings migrations. When a theme update changes a default, sites that existed
// before keep their look: each step saves the old default for them, once. New installs (no
// saved Customizer values yet) get the new defaults.

const QUCREATIVE_SETTINGS_VERSION_OPTION = 'qucreative_settings_version';
const QUCREATIVE_SETTINGS_VERSION = 1;

// -- run at include time: functions.php includes this before it builds QuCreative, which caches
// the theme mods, so even the request that migrates sees the migrated values
qucreative_migrate_settings();

/**
 * @return void
 */
function qucreative_migrate_settings() {
  $version = (int) get_option(QUCREATIVE_SETTINGS_VERSION_OPTION, 0);
  if ($version >= QUCREATIVE_SETTINGS_VERSION) {
    return;
  }

  if (qucreative_migrate_settings_site_is_existing()) {
    // -- version 1 (2026-11): the preloader became opt-in
    if ($version < 1 && get_theme_mod('show_preloader') === false) {
      set_theme_mod('show_preloader', 'on');
    }
  }

  update_option(QUCREATIVE_SETTINGS_VERSION_OPTION, QUCREATIVE_SETTINGS_VERSION);
}

/**
 * A site counts as existing when it has saved Customizer values of its own; the keys WordPress
 * stores by itself don't count.
 *
 * @return bool
 */
function qucreative_migrate_settings_site_is_existing(): bool {
  $mods = get_theme_mods();
  if (!is_array($mods)) {
    return false;
  }
  $own = array_diff_key($mods, array_flip(array(0, 'nav_menu_locations', 'custom_css_post_id', 'sidebars_widgets')));

  return !empty($own);
}
