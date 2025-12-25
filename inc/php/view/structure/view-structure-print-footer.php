<?php

function qucreative_view_structure_print_real_footer() {

  global $qucreative_main;
  $the_sidebars = wp_get_sidebars_widgets();


  if (isset($the_sidebars['sidebar-footer']) && is_array($the_sidebars['sidebar-footer']) && count($the_sidebars['sidebar-footer'])) {


    ?>

    <div class="footer-conglomerate">

      <?php
      if ($qucreative_main->theme_data['post_content_has_translucent_layer']) {
        echo '<div class="translucent-layer">';
      }
      ?>

      <footer class="upper-footer">
        <div class="row <?php

          $isMonsterWidget = false;


          // -- we'll check widgets that include multiple widgets, to not reduce number of columns
          foreach ($the_sidebars['sidebar-footer'] as $sidebarFooter) {
            if (strpos($sidebarFooter, 'monster') !== false) {
              $isMonsterWidget = true;
            }
          }

          if (!$isMonsterWidget) {

            if (count($the_sidebars['sidebar-footer']) == '3') {
              echo ' three-columns';
            }
            if (count($the_sidebars['sidebar-footer']) == '2') {
              echo ' two-columns';
            }
            if (count($the_sidebars['sidebar-footer']) == '1') {
              echo ' one-column';

            }
          }


        ?>">

          <?php

          dynamic_sidebar('sidebar-footer');

          ?>

        </div>
      </footer>


      <?php


      $heading_style = $qucreative_main->get_theme_mod_and_sanitize('footer_copyright_textbox_heading_style');


      ?>
      <footer class="lower-footer">


        <?php


        if ($heading_style == '') {
          $heading_style = 'h6';
        }
        $h_wrap_start = '<' . $heading_style . ' class=" the-variable-heading footer-copyright">';
        $h_wrap_end = '</' . $heading_style . '>';

        if ($heading_style == 'h-group-1' || $heading_style == 'h-group-2') {

          $h_wrap_start = '<h3 class="the-variable-heading footer-copyright ' . $heading_style . '">';
          $h_wrap_end = '</h3>';
        }


        echo $h_wrap_start . wp_kses(get_bloginfo('description'), QU_ALLOWED_HTML_TAGS) . $h_wrap_end;

        ?>
      </footer>


      <?php

      if ($qucreative_main->theme_data['post_content_has_translucent_layer']) {
        echo '</div>';
      }
      ?>
    </div>


    <?php
  }


}
