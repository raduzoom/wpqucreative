<?php
/**
 * @param array|null|WP_POST $po
 * @return string
 */
function qucreative_view_getQueryType( $po): string {


  if(!$po){
    return '';
  }

  $query_type = 'page';
  if ($po) {
    if (is_single($po->ID)) {
      $query_type = 'single-post';
    }
    if (is_page($po->ID)) {
      $query_type = 'page';
    }
    if (is_home() || is_search()) {
      $query_type = 'loop';
    }
  }

  return $query_type;

}
