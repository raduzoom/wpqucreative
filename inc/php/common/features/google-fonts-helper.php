<?php



/**
 * Print Google Fonts as NON-BLOCKING: preload-as-style + onload rel switch + noscript.
 *
 * @param string $fontFamilyName
 * @param array  $weights ['normal'=>[...], 'italic'=>[...]]
 * @return string HTML <link> tags
 */
function dzsCommon_enqueueGoogleFont($fontFamilyName, $weights): string {
  $href = dzsCommon_googleFontCssUrl($fontFamilyName, $weights);

  // NON-BLOCKING pattern:
  // 1) Preload the stylesheet (doesn't block render)
  // 2) Switch rel to stylesheet onload
  // 3) noscript fallback for users with JS disabled
  $preload  = "<link rel='preload' as='style' href='" . esc_url($href) . "' onload=\"this.onload=null;this.rel='stylesheet'\">";
  $fallback = "<noscript><link rel='stylesheet' href='" . esc_url($href) . "'></noscript>";

  return $preload . $fallback;
}

/**
 * Google Fonts CSS2 URL for a family and its weights (with display=swap).
 *
 * @param string $fontFamilyName with spaces or '+' ('Open Sans' or 'Open+Sans')
 * @param array  $weights ['normal'=>[...], 'italic'=>[...]]
 * @return string
 */
function dzsCommon_googleFontCssUrl($fontFamilyName, $weights): string {
  // sane defaults if caller passed empty arrays
  $defaults = array('normal' => array(400,700), 'italic' => array());
  $weights = array_merge($defaults, $weights);

  $hasItalic = !empty($weights['italic']);

  // Callers pass Customizer names like 'Open+Sans'; urlencode() would turn the '+' into
  // '%2B', which Google answers with 400.
  $familyParam = urlencode(str_replace('+', ' ', $fontFamilyName));
  if ($hasItalic) {
    $familyParam .= ':ital,wght';
  } else {
    $familyParam .= ':wght';
  }

  sort($weights['normal']);
  sort($weights['italic']);

  $axisValues = array();
  if ($hasItalic){
    foreach ($weights['normal'] as $w) { $axisValues[] = "0,$w"; }
    foreach ($weights['italic'] as $w)  { $axisValues[] = "1,$w"; }
  } else {
    foreach ($weights['normal'] as $w) { $axisValues[] = "$w"; }
  }

  $axisStr = implode(';', $axisValues);

  return "https://fonts.googleapis.com/css2?family={$familyParam}@{$axisStr}&display=swap";
}

// -- here rather than in inc/view.php: qu-extend also needs it outside page rendering (Customizer save, cron)
if(!function_exists('qucreative_google_font_weights')){
  /**
   * Customizer weight list ('400,600italic,800') to dzsCommon_googleFontCssUrl()'s format.
   *
   * @param string $weights
   * @return array ['normal'=>[...], 'italic'=>[...]]
   */
  function qucreative_google_font_weights($weights){
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

    return $weightsArr;
  }
}
