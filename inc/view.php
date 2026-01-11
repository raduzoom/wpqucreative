<?php



function qucreative_view_generateTranslucentCon($extraClass='translucent-con--for-nav-con'): void {
  ?>

  <div class="translucent-con <?php echo $extraClass; ?>" style="">
    <div class="translucent-overlay"></div>
  </div>
  <?php
}
function qucreative_view_generatePreloader() {

  ?>

  <!-- preloader area -->
  <div class="preloader-con"><div class="cube-preloader"></div></div>
  <?php
}
function qucreative_view_generateMainPageTitle($qucreative_main, $page_title_align) {
  ?><div class="main-page-title-con qu-structure-content-container">
  <h1 class="main-page-title<?php


  if ($qucreative_main->theme_data['post_for_meta'] && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {

    if ($page_title_align == 'page-title-align-right') {
      echo ' margin-right-blur-margin';
    }
    if ($page_title_align == 'page-title-align-left') {
      echo ' margin-left-blur-margin';
    }
  }


  ?>"><?php  echo $qucreative_main->theme_data['view_title']; ?></h1>
  </div><?php
}

function qucreative_view_enqueue_fontAwesome() {

  $fontAwesomeLink = QUCREATIVE_THEME_URL . 'libs/fontawesome/font-awesome.min.css';
  $handle = 'qucreative-fontawesome'; // Prefixed handle for local file
  
  if (defined("QUCREATIVE_UPLOAD_FONTAWESOME_FROM_CDN") && QUCREATIVE_UPLOAD_FONTAWESOME_FROM_CDN == "ON") {
    $fontAwesomeLink = 'https://' . 'maxcdn' . '.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
    $handle = 'fontawesome'; // 3rd-party CDN can use original handle
  }

  wp_enqueue_style($handle, $fontAwesomeLink);
}
include_once 'php/view/generate-logo.php';
function qucreative_view_footerEnqueueScripts() {

  global $qucreative_main;


  ?><!--start footer()--><?php


// -- qucreative has own implementation of comment reply

  if (!defined('QUCREATIVE_VERSION')) {

    wp_enqueue_script('qucreative-comment-reply', QUCREATIVE_THEME_URL . 'libs/qucreative/qucreative.js', array('jquery'), false, true);
  }


  qucreative_view_enqueue_fontAwesome();



  wp_enqueue_style('qucreative-et-line-font', QUCREATIVE_THEME_URL . 'libs/qucreative/include_et.css');


}


if(!function_exists('qucreative_enqueue_google_font')){
  function qucreative_enqueue_google_font($fontName, $family, $weights){
    $weightsArr = array('normal'=>array(), 'italic'=>array());
    $tempWeights = explode(',',$weights);

    foreach ($tempWeights as $tempWeight){
      $val = $tempWeight;
      $targetLab = 'normal';
      if (strpos($tempWeight, 'italic') !== false){
        $targetLab = 'italic';
        $val = str_replace('italic','',$val);
      }
      // Normalize to integer when possible
      $val = trim($val);
      if ($val !== '') {
        $weightsArr[$targetLab][] = (int)$val;
      }
    }

    $fontNameSplit = explode(':', $fontName);
    $fontName = $fontNameSplit[0];

    echo dzsCommon_enqueueGoogleFont($fontName, $weightsArr);
  }
}

include_once 'php/view/generate-footer-for-portfolio-item.php';
include_once 'php/view/generate-qu-nav.php';
include_once 'php/view/generate-search-icons.php';
include_once 'php/view/generate-social-icons.php';
