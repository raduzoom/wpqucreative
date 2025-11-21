<?php
function qucreative_generate_inline_css_for_environment_menuOpacity(QuCreative $qucreative_main){

  $lab = 'menu_enviroment_opacity';
  $menu_enviroment_opacity = $qucreative_main->theme_data['theme_mods'][$lab];


  if($qucreative_main->theme_data['sw_is_in_customizer']){

    $menu_enviroment_opacity = $qucreative_main->get_theme_mod_and_sanitize($lab);
  }
  if ($menu_enviroment_opacity == '') {
    $menu_enviroment_opacity = '';
  }
  $val = floatval($menu_enviroment_opacity) / 100;




  if($menu_enviroment_opacity!==''){


    $qucreative_main->theme_data['css_data_overlay_opacity'].='body .qucreative--520-nav-con .logo-con{ background-color: rgba(0,0,0,'.$val.'); }';
    $qucreative_main->theme_data['css_data_overlay_opacity'].='body.qucreative-light-menu.responsive-mode-sc .qucreative--520-nav-con .logo-con{ background-color: rgba(255,255,255,'.$val.'); }';
    if( ($qucreative_main->theme_data['menu_type']=='menu-type-1' || $qucreative_main->theme_data['menu_type']=='menu-type-2' || $qucreative_main->theme_data['theme_mods']['menu_type']=='') && $menu_enviroment_opacity!='30'){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= '.qucreative--nav-con .translucent-con .translucent-overlay{ background-color: rgba(0,0,0,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-2 .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(255,255,255,'.$val.'); } ';
    }

    if( ($qucreative_main->theme_data['menu_type']=='menu-type-3' || $qucreative_main->theme_data['menu_type']=='menu-type-4') && $menu_enviroment_opacity!='100'){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-3 .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(25,25,25,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-4 .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(255,255,255,'.$val.'); } ';
    }

    if( ($qucreative_main->theme_data['menu_type']=='menu-type-5') && $menu_enviroment_opacity!='90'){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-5 .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(19,19,19,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-5 .qucreative--nav-con:after{ border-color: rgba(19,19,19,'.$val.') transparent transparent transparent; } ';
    }

    if( ( $qucreative_main->theme_data['menu_type']=='menu-type-6') && $menu_enviroment_opacity!='100'){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-6 .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(255,255,255,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.menu-type-6 .qucreative--nav-con:after{ border-color: rgba(255,255,255,'.$val.') transparent transparent transparent; } ';
    }

    if( ( $qucreative_main->theme_data['menu_type']=='menu-type-15' && $menu_enviroment_opacity!='70')){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(0,0,0,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con:after{ border-color: rgba(255,255,255,'.$val.') transparent transparent transparent; } ';
    }

    if( ( $qucreative_main->theme_data['menu_type']=='menu-type-16' && $menu_enviroment_opacity!='70')){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(255,255,255,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con:after{ border-color: rgba(40,40,40,'.$val.') transparent transparent transparent; } ';
    }

    if( ( $qucreative_main->theme_data['menu_type']=='menu-type-17' && $menu_enviroment_opacity!='70')){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(0,0,0,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con:after{ border-color: rgba(255,255,255,'.$val.') transparent transparent transparent; } ';
    }

    if( ( $qucreative_main->theme_data['menu_type']=='menu-type-18' && $menu_enviroment_opacity!='70')){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con .translucent-con .translucent-overlay { background-color: rgba(255,255,255,'.$val.'); } ';
      $qucreative_main->theme_data['css_data_overlay_opacity'].= 'body.'.$qucreative_main->theme_data['menu_type'].' .qucreative--nav-con:after{ border-color: rgba(40,40,40,'.$val.') transparent transparent transparent; } ';
    }
  }
}
function qucreative_generate_inline_css_for_environment_contentOpacity(QuCreative $qucreative_main){


  $lab = 'content_enviroment_opacity';
  $content_enviroment_opacity = $qucreative_main->theme_data['theme_mods'][$lab];


  if($qucreative_main->theme_data['sw_is_in_customizer']){

    $content_enviroment_opacity = $qucreative_main->get_theme_mod_and_sanitize($lab);
  }

  if ($content_enviroment_opacity == '') {
    $content_enviroment_opacity = '30';
  }
  if( $content_enviroment_opacity!='30') {
    $content_enviroment_opacity_val = floatval($qucreative_main->theme_data['theme_mods']['content_enviroment_opacity']) / 100;
  }else{
    $content_enviroment_opacity_val = '0.3';
  }

  $strCssSelectorBody = 'html body';
  $strTranslucentBgColor = 'rgba(0,0,0,'.$content_enviroment_opacity_val.')';


  if($qucreative_main->theme_data['theme_mods']['content_enviroment_style']=='body-style-light'){
    $strTranslucentBgColor = 'rgba(255,255,255,'.$content_enviroment_opacity_val.')';

    $strCssSelectorBody = 'html body.body-style-light';
  }

  $qucreative_main->theme_data['css_data_overlay_opacity'].= $strCssSelectorBody.' .main-gallery--desc .translucent-con .translucent-overlay { background-color: '.$strTranslucentBgColor.'; } ';
  $qucreative_main->theme_data['css_data_overlay_opacity'].= $strCssSelectorBody.' .main-gallery--desc .translucent-con .translucent-overlay, '.$strCssSelectorBody.' .the-content .translucent-con .translucent-overlay { background-color: '.$strTranslucentBgColor.'; } ';
  $qucreative_main->theme_data['css_data_overlay_opacity'].= $strCssSelectorBody.' .the-content-con .translucent-con .translucent-overlay { background-color: '.$strTranslucentBgColor.'; } ';

}
function qucreative_generate_inline_css_for_enviroment(){

  global $qucreative_main;

















  qucreative_generate_inline_css_for_environment_menuOpacity($qucreative_main);
  qucreative_generate_inline_css_for_environment_contentOpacity($qucreative_main);



  $secondary_content_height = $qucreative_main->get_theme_mod_and_sanitize('secondary_content_height');

  if($secondary_content_height==''){
    $secondary_content_height='300';
  }

  if( $secondary_content_height!='300'){

    $qucreative_main->theme_data['css_data_overlay_opacity'].=' html body:not(.responsive-mode-sc) .antfarm-sc-contact-form, html body:not(.responsive-mode-sc) .antfarm-sc-call-to-action, html body:not(.responsive-mode-sc) .antfarm-sc-blockquote, html body:not(.responsive-mode-sc) .antfarm-sc-video-text, html body:not(.responsive-mode-sc) .antfarm-sc-three-columns, html  body:not(.responsive-mode-sc) .secondary-content--mini-gmaps {

            height: '.intval($secondary_content_height).'px;
        }



        html body:not(.responsive-mode-sc) .antfarm-sc-client-slider, html body:not(.responsive-mode-sc) .antfarm-sc-client-slider .advancedscroller  , html body:not(.responsive-mode-sc) .secondary-content--team-achievements .featured-media-con, html body:not(.responsive-mode-sc) .antfarm-sc-social-block{

            height: '.intval($secondary_content_height).'px!important;
        }

';


  }


  $section_margin_bottom = '30';

  if($qucreative_main->get_theme_mod_and_sanitize('section_margin_bottom')!=='' || $qucreative_main->get_theme_mod_and_sanitize('section_margin_bottom')==='0'){
    $section_margin_bottom = $qucreative_main->get_theme_mod_and_sanitize('section_margin_bottom');
  }


  if($section_margin_bottom!=='' && $section_margin_bottom!=30){

    $qucreative_main->theme_data['css_data_overlay_opacity'].='
		
        body .the-content-con.page-normal .the-content-sheet { margin-bottom: '.intval($section_margin_bottom).'px; }
        body .the-content-con.page-normal .the-content .the-content-inner + .footer-conglomerate { margin-top: '.intval($section_margin_bottom).'px; }
        ';
  }


  $width_blur_margin = '30';

  $lab = 'width_blur_margin';
  if($qucreative_main->theme_data['sw_is_in_customizer']){
    $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
  }
  $width_blur_margin_from_mods = $qucreative_main->theme_data['theme_mods'][$lab];

  if($width_blur_margin_from_mods!==''){
    $width_blur_margin = $width_blur_margin_from_mods;
  }




  if($qucreative_main->theme_data['page_is_fullscreen']){



    $qucreative_main->theme_data['template_is_portfolio_gap_int'] = intval($qucreative_main->theme_data['template_is_portfolio_gap']);
    if($qucreative_main->theme_data['template_is_portfolio_gap_int']<30){
      $qucreative_main->theme_data['css_data_overlay_opacity'].='
        .the-content-con.page-portfolio.fullit .zfolio+.qucreative-pagination{
            margin-bottom: '. (30 - $qucreative_main->theme_data['template_is_portfolio_gap_int']).'px;
        }';

    }
  }




  if($width_blur_margin!==30){


    $qucreative_main->theme_data['css_data_overlay_opacity'].='

        .the-content-con.page-portfolio:not(.fullit) .translucent-layer:last-child{
            padding: '. intval($width_blur_margin).'px;
        }
        .the-content-con.page-portfolio:not(.fullit) .translucent-layer:last-child{
            margin-left: -'. intval($width_blur_margin).'px;
            margin-right: -'. intval($width_blur_margin).'px;
        }
        .the-content-con.page-portfolio .zfolio+.qucreative-pagination{
            margin-top: '. (30).'px;
        }';

    if($width_blur_margin<30){
      $qucreative_main->theme_data['css_data_overlay_opacity'].='
        .the-content-con.page-portfolio .zfolio+.qucreative-pagination{
            margin-bottom: '. (30 - intval($width_blur_margin)).'px;
        }';
    }else{
      $qucreative_main->theme_data['css_data_overlay_opacity'].='
        .the-content-con.page-portfolio .zfolio+.qucreative-pagination{
            margin-bottom: -'. (intval($width_blur_margin) - (30)) .'px;
        }';
    }


    $qucreative_main->theme_data['css_data_overlay_opacity'].='
        .the-content-con.has-footer:not(.fullit) .the-content-inner .translucent-layer{
            padding-bottom: '. intval($width_blur_margin).'px!important;
        }
        .the-content-con.page-portfolio:not(.fullit) .footer-conglomerate .translucent-layer:last-child{
            margin-bottom: -'. intval($width_blur_margin).'px!important;
        }



        .the-content-con.page-portfolio .footer-conglomerate > .translucent-layer{
            margin-top: 0px!important;
            padding-top: 0px!important;
        }




        .the-content-con.page-portfolio:not(.has-footer) .the-content-inner > .translucent-layer{ margin-bottom: -'. intval($width_blur_margin).'px; }
        .the-content-con.fullit.page-portfolio:not(.has-footer) .the-content-inner > .translucent-layer{ margin-bottom: '. (0).'px; }
';
    $aux =$width_blur_margin-30;

    if($aux>0){
      ?>


      <?php
    }
    ?>
    <?php



  }













  $content_add_extra_pixels = '';

  if($qucreative_main->get_theme_mod_and_sanitize('content_add_extra_pixels')){
    $content_add_extra_pixels = intval($qucreative_main->get_theme_mod_and_sanitize('content_add_extra_pixels'));
  }


  if($content_add_extra_pixels){


    $qucreative_main->theme_data['css_data_overlay_opacity'].='
        body.page-normal .the-content-sheet .the-content-sheet-text:first-of-type .vc_row.wpb_row:first-of-type{
            padding-top: '. intval($content_add_extra_pixels).'px;
        }
        .body.page-normal .the-content-sheet .the-content-sheet-text:last-child .row.row-margin:last-child, body.page-normal .the-content-sheet .the-content-sheet-text:last-child > .vc_row.wpb_row:last-child{
            padding-bottom: '. intval($content_add_extra_pixels).'px;
        }';



  }





  if($qucreative_main->theme_data['post_for_meta']){
    if(strpos($qucreative_main->theme_data['post_for_meta']->post_content,'enable_bordered_design="on"')!==false){
      $qucreative_main->theme_data['css_data_overlay_opacity'].= '.the-content-sheet:not(.the-content-sheet-dark) .zfolio.skin-melbourne.bordered-design .zfolio-item--inner--inner--inner .item-meta{     border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		border-left: 1px solid #ddd; }';
    }
  }



  $qucreative_main->theme_data['css_data_overlay_opacity'].= $qucreative_main->theme_data['footer_extra_css'];




  // -- end overlay opacity style


}

