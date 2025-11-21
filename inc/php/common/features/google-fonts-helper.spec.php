<?php

include_once 'google-fonts-helper.php';


assert(dzsCommon_enqueueGoogleFont('Lato', array(

    'normal' => array(
      400,
      700
    ),
    'italic' => array(
      100,
      800
    ),
  )) == '<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,100;1,800&display=swap" rel="stylesheet">');


assert(dzsCommon_enqueueGoogleFont('Lato', array(

    'normal' => array(
      400,
      700
    ),
    'italic' => array(),
  )) == '<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">');


assert(dzsCommon_enqueueGoogleFont('Noto Sans Japanese', array(

    'normal' => array(
      400,
      700
    ),
    'italic' => array(
    ),
  )) == '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Japanese:wght@400;700&display=swap" rel="stylesheet">');