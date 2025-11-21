<?php


function qucreative_helpers_generate_input_checkbox($argname, $argopts) {
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



function qucreative_helpers_generate_input_text($argname, $otherargs = array()) {
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


function qucreative_helpers_generate_select($argname, $pargopts) {


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




if (!function_exists('qucreative_clean')) {

  function qucreative_clean($var) {
    if (!function_exists('sanitize_text_field')) {
      return $var;
    } else {
      return sanitize_text_field($var);
    }
  }

}

if(!function_exists('qucreative_get_link_url')){

  function qucreative_get_link_url() {
    $has_url = get_url_in_content( get_the_content() );

    return $has_url ? $has_url : apply_filters( 'the_permalink', get_permalink() );
  }
}


if (!function_exists("qucreative_str_replace_first")) {

  function qucreative_str_replace_first($from, $to, $subject, $from_position = 0) {
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
if (!function_exists('qucreative_sanitize_post_name_to_id')) {

  function qucreative_sanitize_post_name_to_id($arg, $post_type = 'post') {


    if (!is_numeric($arg)) {


      $post = QuCreativeView::get_page_by_title($arg, OBJECT, $post_type);
      return $post->ID;

    }


    return $arg;
  }
}


function qucreative_clean($string) {
  $string = str_replace(' ', '-', $string); // -- Replaces all spaces with hyphens.

  return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // -- Removes special chars.
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

