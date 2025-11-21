<?php
function qucreative_generate_inline_css_for_style_data_env() {

  global $qucreative_main;




  $content_enviroment_opacity = '';



  $lab = 'content_enviroment_opacity';
  $content_enviroment_opacity = $qucreative_main->theme_data['theme_mods'][$lab];


  if ($qucreative_main->theme_data['sw_is_in_customizer']) {

    $content_enviroment_opacity = get_theme_mod($lab);
  }

  if ($content_enviroment_opacity == '') {
    $content_enviroment_opacity = '30';
  }


  if ($content_enviroment_opacity != '30') {
    $content_enviroment_opacity_val = floatval($qucreative_main->theme_data['theme_mods']['content_enviroment_opacity']) / 100;
  } else {
    $content_enviroment_opacity_val = '0.3';
  }



  $content_enviroment_opacity = $qucreative_main->theme_data['theme_mods']['content_enviroment_opacity'];

  if ($content_enviroment_opacity == '') {
    $content_enviroment_opacity = '30';
  }

  if ($content_enviroment_opacity != '30') {
    $content_enviroment_opacity_val = floatval($qucreative_main->theme_data['theme_mods']['content_enviroment_opacity']) / 100;
  } else {
    $content_enviroment_opacity_val = '0.3';
  }





  $style_data_for_env = '';


  $the_content_con_identifier = '';


  if ($qucreative_main->theme_data['post_for_meta']) {
    $the_content_con_identifier = '.the-content-con-for-post-id-' . $qucreative_main->theme_data['post_for_meta']->ID;
  }


  $enable_bordered_design = 'on';
  $enable_bordered_design_from_post = '';

  if ($qucreative_main->theme_data['post_for_meta']) {
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_bordered_design' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {

      $enable_bordered_design = esc_attr(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_bordered_design' . $qucreative_main->theme_data['page_extra_meta_label'], true));
      $enable_bordered_design_from_post = esc_attr(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_bordered_design' . $qucreative_main->theme_data['page_extra_meta_label'], true));


    } else {

      if (get_theme_mod('enable_bordered_design') == 'on') {

      } else {
        if (get_theme_mod('enable_bordered_design')) {

          $enable_bordered_design = get_theme_mod('enable_bordered_design');
        }
      }
    }
  }


  if ($content_enviroment_opacity_val == 1 || $enable_bordered_design_from_post == 'on') {


    if ($qucreative_main->theme_data['sw_is_in_customizer']) {

    }


    if ($enable_bordered_design == 'on') {
      if ($qucreative_main->theme_data['theme_mods']['content_enviroment_style'] == 'body-style-light' || $enable_bordered_design_from_post == 'on') {

        include_once 'inc/php/view/view-generate-light-style.php';


        $style_data_for_env .= qucreative_php_view_generate_light_style($the_content_con_identifier);
// -- search
      } else {


        $style_data_for_env .= ' ' . $the_content_con_identifier . ' .the-content-sheet:not(.the-content-sheet-dark) .zfolio.skin-qucreative .items > .excerpt-content-con .excerpt-content{  box-shadow: inset 0px 0px 0px 1px #ddd;   }      ';


        $style_data_for_env .= $the_content_con_identifier . ' .the-content-sheet.the-content-sheet-dark { border: 1px solid #555555 ; } ';
        $style_data_for_env .= $the_content_con_identifier . ' .the-content-sheet.the-content-sheet-dark.has-media { border-top: 0px solid rgba(0,0,0,0); } ';
        $style_data_for_env .= '' . $the_content_con_identifier . ' .the-content-sheet.the-content-sheet-dark.has-media .featured-media-con  { width: auto ; margin-left: -1px; margin-right: -1px; } ';
      }


    }
  }


  if ($enable_bordered_design == 'on' || $enable_bordered_design_from_post == 'on') {
    if ($content_enviroment_opacity_val > 0.6 || $enable_bordered_design_from_post == 'on') {

      $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .selector-con-for-skin-melbourne .a-category { color: #222222; } ';
      $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .selector-con.selector-con-for-skin-melbourne .categories .a-category:hover,body.body-style-light ' . $the_content_con_identifier . ' .selector-con.selector-con-for-skin-melbourne .categories .a-category.active { color: #ffffff; } ';
    }
    if ($content_enviroment_opacity_val >= 1 || $enable_bordered_design_from_post == 'on') {

      $style_data_for_env .= '' . $the_content_con_identifier . ' .the-content-sheet:not(.the-content-sheet-dark) .zfolio.skin-melbourne .item-meta{ border-left: 1px solid #ddd; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; } ';
    }
  }


  if ((is_home() || is_search()) == false && $qucreative_main->theme_data['post_for_meta']) {
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_custom_section_margin_bottom' . $qucreative_main->theme_data['page_extra_meta_label'], true) || get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_custom_section_margin_bottom' . $qucreative_main->theme_data['page_extra_meta_label'], true) === '0') {


      $style_data_for_env .= '
			
            body .main-container .the-content-con-for-post-id-' . $qucreative_main->theme_data['post_for_meta']->ID . ' .the-content-sheet{
                margin-bottom: ' . esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_custom_section_margin_bottom' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . 'px;
            }

            body  .the-content-con-for-post-id-' . $qucreative_main->theme_data['post_for_meta']->ID . ' .the-content-inner+.footer-conglomerate{
                margin-top: ' . esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_custom_section_margin_bottom' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . 'px;
            }
            ';


    }
  }


  // -- end $style_data_for_env

  $qucreative_main->theme_data['css_data_style_env'] = $style_data_for_env;

}

