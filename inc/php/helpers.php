<?php
if (!function_exists('qucreative_sanitize_to_size')) {
  function qucreative_sanitize_to_size($arg) {

    if ($arg == '') {
      return $arg;
    }
    if (strpos($arg, 'px') === false && strpos($arg, '%') === false && strpos($arg, 'auto') === false) {
      return $arg . 'px';
    }
    return $arg;
  }
}


// -- todo: move to plugin
function qucreative_helpers_generate_input_checkbox($argname, $argopts): string {
  $fout = '';
  $auxtype = 'checkbox';

  if (isset($argopts['type'])) {
    if ($argopts['type'] == 'radio') {
      $auxtype = 'radio';
    }
  }
  $fout.='<input type="' . $auxtype . '"';
  $fout.=' name="' . $argname . '"';
  if (isset($argopts['class'])) {
    $fout.=' class="' . $argopts['class'] . '"';
  }

  if (isset($argopts['id'])) {
    $fout.=' id="' . $argopts['id'] . '"';
  }
  $theval = 'on';
  if (isset($argopts['val'])) {
    $fout.=' value="' . $argopts['val'] . '"';
    $theval = $argopts['val'];
  } else {
    $fout.=' value="on"';
  }

  if (isset($argopts['seekval'])) {
    $auxsw = false;
    if (is_array($argopts['seekval'])) {

      foreach ($argopts['seekval'] as $opt) {

        if ($opt == $argopts['val']) {
          $auxsw = true;
        }
      }
    } else {

      if ($argopts['seekval'] == $theval) {

        $auxsw = true;
      }
    }
    if ($auxsw == true) {
      $fout.=' checked="checked"';
    }
  }
  $fout.='/>';
  return $fout;
}



// -- todo: move to plugin
function qucreative_helpers_generate_input_text($argname, $otherargs = array()): string {
  $fout = '';

  $margs = array(
    'class' => '',
    'val' => '', // -- default value
    'seekval' => '', // --the value to be seeked
    'type' => '',
    'extraattr'=>'',
    'slider_min'=>'10',
    'slider_max'=>'80',
    'input_type'=>'text',
  );
  $margs = array_merge($margs, $otherargs);

  $fout.='<input type="'.$margs['input_type'].'"';
  $fout.=' name="' . $argname . '"';


  if ($margs['type'] == 'colorpicker') {
    $margs['class'].=' with_colorpicker';
  }

  $val = '';


  if ($margs['class'] != '') {
    $fout.=' class="' . $margs['class'] . '"';
  }
  if (isset($margs['seekval']) && $margs['seekval'] != '') {

    $fout.=' value="' . $margs['seekval'] . '"';
    $val = $margs['seekval'];
  } else {
    $fout.=' value="' . $margs['val'] . '"';
    $val = $margs['val'];
  }

  if ($margs['type'] == 'slider') {
    $fout.=' ';
  }

  if ($margs['extraattr'] != '') {
    $fout.='' . $margs['extraattr'] . '';
  }

  $fout.='/>';






  return $fout;
}



// -- todo: move to plugin
function qucreative_helpers_generate_select($argname, $pargopts): string {


  $fout = '';
  $auxtype = 'select';

  if($pargopts==false){
    $pargopts = array();
  }

  $margs = array(
    'options' => array(),
    'class' => '',
    'seekval' => '',
    'extraattr'=>'',
  );

  $margs = array_merge($margs, $pargopts);

  $fout.='<select';
  $fout.=' name="' . $argname . '"';
  if (isset($margs['class'])) {
    $fout.=' class="'.$margs['class'].'"';
  }
  if ($margs['extraattr'] != '') {
    $fout.='' . $margs['extraattr'] . '';
  }

  $fout.='>';



  if(is_array($margs['options'])){
    foreach ($margs['options'] as $opt) {
      $val = '';
      $lab = '';

      if(is_object($opt)){
        $opt = (array) $opt;
      }


      if (is_array($opt) && isset($opt['lab']) && isset($opt['val'])) {
        $val = $opt['val'];
        $lab = $opt['lab'];
      } else {
        if (is_array($opt) && isset($opt['label']) && isset($opt['value'])) {

          $val = $opt['value'];
          $lab = $opt['label'];
        }else{


          $val = $opt;
          $lab = $opt;
        }

      }




      $fout.='<option value="' . $val . '"';
      if ($margs['seekval'] != '' && $margs['seekval'] == $val) {
        $fout.=' selected';
      }

      $fout.='>' . $lab . '</option>';
    }

  }



  $fout.='</select>';
  return $fout;
}





if (!function_exists('qucreative_clean')) {

  function qucreative_clean($var) {
    if (!function_exists('sanitize_text_field')) {
      return $var;
    } else {
      return sanitize_text_field($var);
    }
  }

}




// -- string
if (!function_exists("qucreative_str_replace_first")) {

  function qucreative_str_replace_first($from, $to, $subject, $from_position = 0): string {
    $from = '/' . preg_quote($from, '/') . '/';

    $aux1 = '';


    $aux2 = $subject;
    if ($from_position > 0) {


      $aux1 = substr($subject, 0, $from_position);

      $aux2 = substr($subject, $from_position);

    }


    $aux2 = preg_replace($from, $to, $aux2, 1);

    $aux_final = $aux1 . $aux2;

    return $aux_final;
  }
}


function qucreative_clean($string) {
  $string = str_replace(' ', '-', $string); // -- Replaces all spaces with hyphens.

  return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // -- Removes special chars.
}



// -- blog
if(!function_exists('qucreative_sanitize_id_to_src')){

  function qucreative_sanitize_id_to_src($arg){


    if(is_numeric($arg)){

      $imgsrc = wp_get_attachment_image_src($arg, 'full');

      return $imgsrc[0];
    }else{
      return $arg;
    }


  }

}
if(!function_exists('qucreative_get_link_url')){

  function qucreative_get_link_url() {
    $has_url = get_url_in_content( get_the_content() );

    return $has_url ? $has_url : apply_filters( 'the_permalink', get_permalink() );
  }
}
if (!function_exists('qucreative_sanitize_post_name_to_id')) {

  function qucreative_sanitize_post_name_to_id($arg, $post_type = 'post') {


    if (!is_numeric($arg)) {


      $post = QuCreativeView::get_page_by_title($arg, OBJECT, $post_type);
      return $post->ID;

    }


    return $arg;
  }
}
if(!function_exists('qucreative_sanitize_for_post_terms')){
  function qucreative_sanitize_for_post_terms($arg){

    // -- sanitize the term for set_post_terms



    $fout = '';


    if(is_array($arg) || is_object($arg)){


      if(count($arg)==1){

        if(isset($arg->term_id)) {
          return $arg->term_id;
        }else{
          return $arg;
        }
      }

      if(count($arg)>1){

        foreach ($arg as $it){

          if($fout){
            $fout.=',';
          }

          if(isset($it->term_id)){

            $fout.=$it->term_id;
          }else{
            return $arg;
          }
        }
      }

    }else{
      return $arg;
    }

    return $fout;
  }
}


if (!function_exists('qucreative_sanitize_term_slug_to_id')) {
  function qucreative_sanitize_term_slug_to_id($arg, $taxonomy_name = '') {


    if ($taxonomy_name == '') {
      global $quextend_main;

      if($quextend_main){

        $taxonomy_name = $quextend_main->name_port_item_cat;
      }
    }

    if (!is_numeric($arg)) {

      $term = get_term_by('slug', $arg, $taxonomy_name);

      if ($term) {
        $arg = $term->term_id;
      }

    }


    return $arg;
  }
}


if (!function_exists('qucreative_asset_version')) {
  /**
   * Version string for a theme file: its modification time, so the URL changes
   * whenever the file does and browsers drop their cached copy.
   * Falls back to the theme version when the file can't be read.
   *
   * @param string $relativePath path inside the theme, e.g. 'libs/qucreative/qucreative.css'
   * @return string
   */
  function qucreative_asset_version($relativePath) {
    $file = QUCREATIVE_THEME_DIR . $relativePath;
    $modified = file_exists($file) ? filemtime($file) : false;

    return $modified ? (string) $modified : QUCREATIVE_VERSION;
  }
}

if (!function_exists('qucreative_enqueue_style_with_critical')) {
  /**
   * Enqueue a stylesheet. When the build generated a <name>.critical.css next to it
   * (wpqucreative/perf/build-critical.mjs), print that first-screen part inline in <head> and
   * load the full file without blocking rendering; a critical file marked complete holds every
   * rule, so the full file isn't requested at all. Without a critical file, and in the
   * Customizer preview, the stylesheet loads as a normal blocking one.
   *
   * @param string $handle
   * @param string $url
   * @param string $file absolute path of the stylesheet
   * @param string $version
   * @return void
   */
  function qucreative_enqueue_style_with_critical($handle, $url, $file, $version) {
    if (wp_style_is($handle, 'registered')) {
      wp_enqueue_style($handle);
      return;
    }

    $criticalFile = preg_replace('/\.css$/', '.critical.css', $file);
    if (is_admin() || is_customize_preview() || !file_exists($criticalFile)) {
      wp_enqueue_style($handle, $url, array(), $version);
      return;
    }

    $critical = str_replace('__QUCREATIVE_WP_CONTENT_URL__', untrailingslashit(content_url()), file_get_contents($criticalFile));

    if (strpos($critical, '/*qucreative-critical:complete*/') !== false) {
      wp_register_style($handle, false, array(), $version);
      wp_enqueue_style($handle);
      wp_add_inline_style($handle, $critical);
      return;
    }

    wp_register_style($handle . '-critical', false, array(), $version);
    wp_add_inline_style($handle . '-critical', $critical);
    wp_enqueue_style($handle, $url, array($handle . '-critical'), $version);
    $GLOBALS['qucreative_non_blocking_styles'][$handle] = true;
  }

  /**
   * Print the <link> of a stylesheet whose first-screen rules are inlined as non-blocking:
   * it loads as media="print" and switches to all once loaded; <noscript> keeps it for
   * visitors without JavaScript.
   *
   * @param string $tag
   * @param string $handle
   * @return string
   */
  function qucreative_filter_non_blocking_style_tag($tag, $handle) {
    if (empty($GLOBALS['qucreative_non_blocking_styles'][$handle])) {
      return $tag;
    }
    $nonBlocking = preg_replace("/media=(['\"])all\\1/", "media='print' onload=\"this.media='all'\"", $tag, 1);

    return $nonBlocking . '<noscript>' . trim($tag) . "</noscript>\n";
  }

  add_filter('style_loader_tag', 'qucreative_filter_non_blocking_style_tag', 10, 2);
}

if (!function_exists('qucreative_enqueue_theme_style')) {
  /**
   * Enqueue a stylesheet that ships with the theme, versioned by its modification time, with
   * its first-screen rules inlined when the build generated them.
   *
   * @param string $handle
   * @param string $relativePath path inside the theme, e.g. 'libs/qucreative/qucreative.css'
   * @return void
   */
  function qucreative_enqueue_theme_style($handle, $relativePath) {
    qucreative_enqueue_style_with_critical($handle, QUCREATIVE_THEME_URL . $relativePath, QUCREATIVE_THEME_DIR . $relativePath, qucreative_asset_version($relativePath));
  }
}

if (!function_exists('qucreative_enqueue_theme_script')) {
  /**
   * Enqueue a script that ships with the theme, in the footer, versioned by its modification time.
   *
   * Not `defer`: measured 2026-11-23, deferring these end-of-body scripts made real first
   * paint ~10% faster but Lighthouse's simulated mobile FCP ~300 ms slower (it then counts
   * their run time before first paint). Revisit once the scripts are smaller (plan, Phase 6).
   *
   * @param string $handle
   * @param string $relativePath path inside the theme, e.g. 'libs/qucreative/qucreative.js'
   * @param string[] $deps
   * @return void
   */
  function qucreative_enqueue_theme_script($handle, $relativePath, $deps = array()) {
    wp_enqueue_script($handle, QUCREATIVE_THEME_URL . $relativePath, $deps, qucreative_asset_version($relativePath), true);
  }
}