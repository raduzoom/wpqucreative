<?php

function qucreative_view_get_theme_mod_and_sanitize(QuCreative $qu, $arglab, $args = array()){


  $margs = array_merge(array('type'=>'string', 'cacheIt'=>true), $args);


  $argVal = $qu->theme_data['theme_mods'][$arglab] ?? get_theme_mod($arglab);

  if($margs['cacheIt']===false){
    $argVal = get_theme_mod($arglab);
  }



  $argVal = esc_html($argVal);

  if($arglab=='social_icons'){
    $argVal = str_replace('&quot;','"',$argVal);
  }

  if(defined('QUEXTEND_QU_OPTION_FONT_NAME')){

    if($arglab==QUEXTEND_QU_OPTION_FONT_NAME){

      $argVal = str_replace('&amp;','&',$argVal);
    }
  }

  if($margs['type']=='int'){


    if(!is_numeric(intval($argVal, 10 ))){
      return null;
    }

    return intval($argVal, 10 );
  }

  return $argVal;

}
