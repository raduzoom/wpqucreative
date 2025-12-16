<?php


function qucreative_view_generateFooterForPortfolioItem($poForMeta) {


  global $qucreative_main;


  if (strpos($qucreative_main->theme_data['body_class'], 'page-type-archive') === false) {
    if ($poForMeta && ($poForMeta->post_type == 'quextend_port_items') && get_post_meta($poForMeta->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {


      echo ' </div>   <div class="col-md-3 portfolio-single-meta-con" style=";">';


      $lab = 'qucreative_' . 'meta_port_optional_info_1' . $qucreative_main->theme_data['page_extra_meta_label'];

      if (get_post_meta($poForMeta->ID, $lab, true)) {

        echo '<h6>' . esc_html__("CLIENT", 'qucreative') . '</h6>';
        echo '<div class="portfolio-single-meta-element font-group-1">' . wp_kses(get_post_meta($poForMeta->ID, $lab, true), $qucreative_main->theme_data['allowed_html_tags']) . '</div>';
      }
      $lab = 'qucreative_' . 'meta_port_optional_info_2' . $qucreative_main->theme_data['page_extra_meta_label'];
      if (get_post_meta($poForMeta->ID, $lab, true)) {

        echo '<h6>' . esc_html__("PROJECT DATE", 'qucreative') . '</h6>';
        echo '<div class="portfolio-single-meta-element  font-group-1">' . wp_kses(get_post_meta($poForMeta->ID, $lab, true), $qucreative_main->theme_data['allowed_html_tags']) . '</div>';
      }
      $lab = 'qucreative_' . 'meta_port_website' . $qucreative_main->theme_data['page_extra_meta_label'];
      if (get_post_meta($poForMeta->ID, $lab, true)) {

        echo '<h6>' . esc_html__("PROJECT URL", 'qucreative') . '</h6>';

        $aux = wp_kses(get_post_meta($poForMeta->ID, $lab, true), $qucreative_main->theme_data['allowed_html_tags']);
        $aux_label = $aux;

        $aux_link = esc_html(get_post_meta($poForMeta->ID, 'qucreative_' . 'meta_port_custom_link' . $qucreative_main->theme_data['page_extra_meta_label'], true));

        echo '<div class="portfolio-single-meta-element  font-group-1">';


        if ($aux_link) {

          echo '<a target="_blank" class="custom-a color-hg border-hg-on-hover weight-from-anchor" href="' . $aux_link . '">';
        } else {
          if (strpos($aux, 'http') !== false || strpos($aux, 'www') !== false) {


            echo '<a target="_blank" class="custom-a color-hg border-hg-on-hover weight-from-anchor" href="' . $aux . '">';

            $aux_label = str_replace('http://', '', $aux_label);
            $aux_label = str_replace('https://', '', $aux_label);
          }
        }


        echo $aux_label;


        if ($aux_link || strpos($aux, 'http') !== false || strpos($aux, 'www') !== false) {


          echo '</a>';
        }

        echo '</div>';
      }


      echo '</div>';

      echo '<div class="clear"></div>';

      do_action('qucreative_social_place');

      echo '</div>
</div>
</div><!--end row-->';


      echo qucreative_generate_prev_next_table();
      // -- portfolio item fullscreen END
    }
  }
}
