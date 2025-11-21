<?php
if (!function_exists('qucreative_pagination')) {

  function qucreative_pagination($pages = '', $range = 2, $pargs = array()) {
    global $paged;



    $margs = array(

      'container_class'=>'qucreative-pagination ',
      'include_raquo'=>true,
      'style'=>'div',
      'a_class'=>'pagination-link',
    );


    if($pargs){
      $margs = array_merge($margs,$pargs);
    }




    $fout = '';
    $showitems = ($range * 2) + 1;

    if (empty($paged))
      $paged = 1;

    if ($pages == '') {
      global $wp_query;
      $pages = $wp_query->max_num_pages;
      if (!$pages) {
        $pages = 1;
      }
    }

    if (1 != $pages) {

      if($margs['style']=='div'){

        $fout.= "<div class='".$margs['container_class']."'>";
      }
      if($margs['style']=='ul'){

        $fout.= "<ul class='".$margs['container_class']."'>";
      }

      if($margs['include_raquo']){

        if ($paged > 2 && $paged > $range + 1 && $showitems < $pages) {
          $fout .= "<a class='raquo-1' href='" . get_pagenum_link( 1 ) . "'>&laquo;</a>";
        }
        if ($paged > 1 && $showitems < $pages) {
          $fout .= "<a class='raquo-2' href='" . get_pagenum_link( $paged - 1 ) . "'>&lsaquo;</a>";
        }
      }

      for ($i = 1; $i <= $pages; $i++) {
        if (1 != $pages && (!($i >= $paged + $range + 1 || $i <= $paged - $range - 1) || $pages <= $showitems )) {


          if($paged==$i){

            if($margs['style']=='div') {
              $fout .= '<span class="current">' . $i . '</span>';
            }
            if($margs['style']=='ul') {
              $fout .= '<li class="active"><a class="'.$margs['a_class'].' " href="#">'.$i.'</a></li>';
            }
          }else{

            if($margs['style']=='div') {
              $fout.="<a href='" . get_pagenum_link($i) . "' class='inactive' >" . $i . "</a>";
            }
            if($margs['style']=='ul') {

              $fout.='<li><a class="'.$margs['a_class'].'" href="'. get_pagenum_link($i) .'">'.$i.'</a></li>';
            }
          }
        }
      }

      if($margs['include_raquo']) {
        if ($paged < $pages && $showitems < $pages) $fout .= "<a class='raquo-1' href='" . get_pagenum_link($paged + 1) . "'>&rsaquo;</a>";
        if ($paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages) $fout .= "<a class='raquo-2' href='" . get_pagenum_link($pages) . "'>&raquo;</a>";
      }



      if($margs['style']=='div') {
        $fout .= '<div class="clearfix"></div>';
        $fout .= "</div>";
      }
      if($margs['style']=='ul') {
        $fout .= '</ul>';
      }
    }
    return $fout;
  }

}
