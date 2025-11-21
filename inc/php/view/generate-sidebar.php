<?php


function qucreative_view_generateSidebar($poForMeta) {

  global $qucreative_main;


  $sidebar = qucreative_get_sidebar();

  if (!$poForMeta || (get_post_meta($poForMeta->ID, '_wp_page_template', true) != 'template-qucreative-slider.php')) {
    if ($sidebar) {

      echo '<div class="col-sm-4 sidebar-main">';
      ?>
      <?php

      get_sidebar();
      ?>
      <?php


      echo '</div><! -- end .sidebar-main -->';


    }
  }

}
