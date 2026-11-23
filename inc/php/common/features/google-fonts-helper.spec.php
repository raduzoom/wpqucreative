<?php
// Run: php -d zend.assertions=1 -d assert.exception=1 google-fonts-helper.spec.php

include_once 'google-fonts-helper.php';


assert(dzsCommon_googleFontCssUrl('Lato', array(

    'normal' => array(
      400,
      700
    ),
    'italic' => array(
      100,
      800
    ),
  )) == 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,100;1,800&display=swap');


assert(dzsCommon_googleFontCssUrl('Lato', array(

    'normal' => array(
      400,
      700
    ),
    'italic' => array(),
  )) == 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');


assert(dzsCommon_googleFontCssUrl('Noto Sans Japanese', array(

    'normal' => array(
      400,
      700
    ),
    'italic' => array(
    ),
  )) == 'https://fonts.googleapis.com/css2?family=Noto+Sans+Japanese:wght@400;700&display=swap');


// -- Customizer names arrive with '+' instead of spaces; they must not become '%2B'
assert(dzsCommon_googleFontCssUrl('Open+Sans', array(

    'normal' => array(
      400,
    ),
    'italic' => array(
      600,
    ),
  )) == 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;1,600&display=swap');

echo "google-fonts-helper.spec.php: all assertions passed\n";
