<?php

function quextend_qu_view_generateBorders() {
  global $qucreative_main;

  if (intval($qucreative_main->theme_data['theme_mods']['border_width'])) {
    ?>
    <div class="stylish-border"
         style="position: fixed; top:0; left:0; width: 100%; height: <?php echo $qucreative_main->theme_data['theme_mods']['border_width']; ?>px; background-color: <?php echo $qucreative_main->theme_data['theme_mods']['border_color']; ?>; "></div>
    <div class="stylish-border"
         style="position: fixed; bottom:0; left:0; width: 100%; height: <?php echo $qucreative_main->theme_data['theme_mods']['border_width']; ?>px; background-color: <?php echo $qucreative_main->theme_data['theme_mods']['border_color']; ?>; "></div>
    <div class="stylish-border"
         style="position: fixed; top:0; left:0; width: <?php echo $qucreative_main->theme_data['theme_mods']['border_width']; ?>px; background-color: <?php echo $qucreative_main->theme_data['theme_mods']['border_color']; ?>; height: 100%; "></div>
    <div class="stylish-border"
         style="position: fixed; top:0; right:0; width: <?php echo $qucreative_main->theme_data['theme_mods']['border_width']; ?>px; background-color: <?php echo $qucreative_main->theme_data['theme_mods']['border_color']; ?>; height: 100%; "></div>
    <?php
  }
}
