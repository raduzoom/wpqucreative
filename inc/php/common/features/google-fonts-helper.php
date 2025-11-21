<?php



/**
 * Print Google Fonts as NON-BLOCKING: preload-as-style + onload rel switch + noscript.
 *
 * @param string $fontFamilyName
 * @param array  $weights ['normal'=>[...], 'italic'=>[...]]
 * @return string HTML <link> tags
 */
function dzsCommon_enqueueGoogleFont($fontFamilyName, $weights): string {
  // sane defaults if caller passed empty arrays
  $defaults = array('normal' => array(400,700), 'italic' => array());
  $weights = array_merge($defaults, $weights);

  $hasItalic = !empty($weights['italic']);

  $familyParam = urlencode($fontFamilyName);
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

  // Build the final Google Fonts CSS URL (with display=swap)
  $href = "https://fonts.googleapis.com/css2?family={$familyParam}@{$axisStr}&display=swap";

  // NON-BLOCKING pattern:
  // 1) Preload the stylesheet (doesn't block render)
  // 2) Switch rel to stylesheet onload
  // 3) noscript fallback for users with JS disabled
  $preload  = "<link rel='preload' as='style' href='" . esc_url($href) . "' onload=\"this.onload=null;this.rel='stylesheet'\">";
  $fallback = "<noscript><link rel='stylesheet' href='" . esc_url($href) . "'></noscript>";

  return $preload . $fallback;
}
