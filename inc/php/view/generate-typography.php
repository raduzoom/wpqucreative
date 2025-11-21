<?php

function qucreative_generate_font_for_inclusion($pargs = array()) {

  global $qucreative_main;
  $margs = array(

    'font_data'=>array(),
    'label_prefix'=>'h1',
    'font'=>'headings_font',
    'selector'=>'h1, .the-content-con > h1',
  );

  $margs = array_merge($margs, $pargs);

  $font_data = $margs['font_data'];



  $weight = 'regular';

  if(isset($font_data[$margs['label_prefix'].'_weight'])){

    $weight = $font_data[$margs['label_prefix'].'_weight'];
  }


  // --sanitizing
  $weight = str_replace('regular','400',$weight);
  if(strpos($weight, 'italic')!==false){

  }


  if($weight=='italic'){

    $weight = '400italic';
  }
  // --sanitizing END


  $fontFamily = 'Lato';

  if(isset($margs['font']) && isset($font_data[$margs['font']])){

    $fontFamily = $font_data[$margs['font']];
  }


  if(isset($font_data[$margs['label_prefix'].'_font_link_to'])){


    $fontFamily = $font_data[$font_data[$margs['label_prefix'].'_font_link_to'].'_font'];
  }


  $fontFamily_sanitized = str_replace(' ','+',$fontFamily);

  if(isset($qucreative_main->theme_data['font_used'][$fontFamily_sanitized]) && is_array($qucreative_main->theme_data['font_used'][$fontFamily_sanitized])){

    if(!in_array($weight,$qucreative_main->theme_data['font_used'][$fontFamily_sanitized])){


      $qucreative_main->theme_data['font_used'][$fontFamily_sanitized][] = $weight;
    }
  }else{
    $qucreative_main->theme_data['font_used'][$fontFamily_sanitized] = array();
    $qucreative_main->theme_data['font_used'][$fontFamily_sanitized][] = $weight;
  }



}

function qucreative_view_customTypography($qucreative_main, $font_data) {

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h1',
    'selector' => 'h1',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h2',
    'selector' => 'h2',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h3',
    'selector' => 'h3',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h4',
    'selector' => 'h4',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h5',
    'selector' => 'h5',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h6',
    'selector' => 'h6',
  ));
  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h-group-1',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'h-group-2',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'p',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'hyperlink',
    'font' => 'body_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-1',
    'selector' => 'font-group-1',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-2',
    'selector' => 'font-group-2',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-3',
    'selector' => 'font-group-3',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-4',
    'selector' => 'font-group-4',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-5',
    'selector' => 'font-group-5',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-6',
    'selector' => 'font-group-6',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-7',
    'selector' => 'font-group-7',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-8',
    'selector' => 'font-group-8',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-9',
    'selector' => 'font-group-9',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-10',
    'selector' => 'font-group-10',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-11',
    'selector' => 'font-group-11',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'font-group-12',
    'selector' => 'font-group-12',
    'font' => 'body_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'blockquote',
    'selector' => 'blockquote',
    'font' => 'body_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'menu',
    'selector' => 'body .qucreative--nav-con ul.the-actual-nav li > a',
    'font' => 'menu_font',
  ));

  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'copyright',
    'selector' => 'body .qucreative--nav-con ul.the-actual-nav li > a',
    'font' => 'menu_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'section_title_one_first',
    'font' => 'section_title_one_first_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'section_title_two_first',
    'font' => 'section_title_two_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'section_title_two_second',
    'font' => 'section_title_two_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'section_title_two_second',
    'font' => 'section_title_two_second_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'section_title_two_number',
    'font' => 'section_title_two_number_font',
  ));


  qucreative_generate_font_for_inclusion(array(


    'font_data' => $font_data,
    'label_prefix' => 'page_title',
    'selector' => '.the-content-con > h1',
    'font' => 'page_title_font',
  ));


  foreach ($qucreative_main->theme_data['font_used'] as $lab => $fu) {


    $i5 = 0;
    $finalFontFamily = '';
    foreach ($fu as $fui) {

      if ($i5) {
        $finalFontFamily .= ',';
      }


      $finalFontFamily .= $fui;

      $i5++;
    }


    qucreative_enqueue_google_font($lab . $finalFontFamily, $lab, $finalFontFamily);
  }

}

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
