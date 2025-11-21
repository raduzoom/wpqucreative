<?php

function qucreative_view_controller_socialIcons(QuCreative $quCreative) {

  try{
    $quCreative->theme_data['header_social_icons'] = $quCreative->get_theme_mod_and_sanitize('social_icons');
    $quCreative->theme_data['theme_mods']['social_icons'] = $quCreative->get_theme_mod_and_sanitize('social_icons');
    if($quCreative->theme_data['theme_mods']['social_icons']){


      if(is_array($quCreative->theme_data['theme_mods']['social_icons'])){

        $quCreative->theme_data['header_social_icons']  = $quCreative->theme_data['theme_mods']['social_icons'];
        $quCreative->theme_data['theme_mods']['social_icons'] = json_encode($quCreative->theme_data['theme_mods']['social_icons']);
      }else{
        if(is_array(json_decode($quCreative->theme_data['theme_mods']['social_icons']))){


          $qucreative_header_social_icons = json_decode($quCreative->theme_data['theme_mods']['social_icons']);
          $quCreative->theme_data['header_social_icons'] = json_decode($quCreative->theme_data['theme_mods']['social_icons']);

        }
      }
    }



  }catch(Exception $e) {
    error_log('cannot decode json - '.print_rr($e, array('echo' => false)));
  }
}
