<?php

function qucreative_generate_inline_css_for_contain() {


  global $qucreative_main;




  $width_col = intval($qucreative_main->theme_data['theme_mods']['width_column']);
  $width_gap = intval($qucreative_main->theme_data['theme_mods']['width_gap']);
  $width_blur_margin = intval($qucreative_main->theme_data['theme_mods']['width_blur_margin']);


  $content_width = $width_col * 12 + $width_gap * 13;;



  if($qucreative_main->theme_data['post_for_meta'] && get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_is_fullscreen'.$qucreative_main->theme_data['page_extra_meta_label'], true )=='on' && get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_is_fullscreen_stretch'.$qucreative_main->theme_data['page_extra_meta_label'], true )=='contain'){
    $content_width = $width_col * 12 + $width_gap * 12;;


    $qucreative_main->theme_data['css_data_contain'] = '';


    $qucreative_main->theme_data['css_data_contain'].='
                .the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.' .the-content-sheet-text > .vc_row,.the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.' .the-content-inner > .row-with-sidebar,.the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.' .the-content-sheet-for-sc .feature-overlay > .row, .the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.' .upper-footer > .row,.the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.' .lower-footer > .row, .the-content-inner > .vc_row > .wpb_column > .vc_column-inner, body:not(.responsive-mode-sc) .flex-for-sc{
                    margin-left: auto;
                    margin-right: auto;
                    max-width: '.$content_width.'px;
                }
                body:not(.responsive-mode-sc) .flex-for-sc{

                    max-width: '.($content_width + $width_gap * 1).'px;
                }



                .the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.' .the-content-sheet-for-sc .feature-overlay > .row{
                    left:50%;
                    transform: translate3d(-50%,-50%,0);
                }
';
  }


}

