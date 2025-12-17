<?php


// todo: move to plugin
// todo: much simpler just overwrite the vars
function qucreative_php_view_generate_light_style($the_content_con_identifier) {


  $style_data_for_env = '';

  $style_data_for_env .= '' . $the_content_con_identifier . ' .portfolio-link-con .portfolio-link--title { color: #aaaaaa; } ';
  $style_data_for_env .= '' . $the_content_con_identifier . '.page-portfolio-single .the-content-inner { border-left: 1px solid #ddd; border-top: 1px solid #ddd; 
    border-right: 1px solid #ddd; } ';
  $style_data_for_env .= '.main-container ' . $the_content_con_identifier . ' .zfolio.skin-qucreative .zfolio-item.active .the-overlay, ' . $the_content_con_identifier . ' .slider-con .zfolio.skin-qucreative .zfolio-item.active .the-overlay { box-shadow: inset 0px 0px 0px 5px #222222; } ';
  $style_data_for_env .= '' . $the_content_con_identifier . ' .the-content-inner .portfolio-link-con .portfolio-link--title, ' . $the_content_con_identifier . ' .the-content-inner .portfolio-link-con .portfolio-link--toback { background-color: #ffffff; border-top: 1px solid #ddd; }          ';
  $style_data_for_env .= ' ' . $the_content_con_identifier . ' .zfolio.skin-qucreative .items > .excerpt-content-con .excerpt-content{  box-shadow: inset 0px 0px 0px 1px #ddd;   }      ';
  $style_data_for_env .= ' ' . $the_content_con_identifier . '  .the-content-inner .portfolio-link-con .portfolio-link--toback.center-td { background-color: #eeeeee;  } .portfolio-link-con .portfolio-link--toback.center-td i , ' . $the_content_con_identifier . ' .portfolio-link-con .portfolio-link--title.left-td:before, ' . $the_content_con_identifier . ' .portfolio-link-con .portfolio-link--title.right-td:before{ color: #222; } ' . $the_content_con_identifier . ' .portfolio-link-con .portfolio-link--toback.center-td:hover i, ' . $the_content_con_identifier . ' .portfolio-link-con .portfolio-link--title.left-td:hover:before, ' . $the_content_con_identifier . ' .portfolio-link-con .portfolio-link--title.right-td:hover:before { color: #fff; } ';
  $style_data_for_env .= '' . $the_content_con_identifier . ' a.zfolio-item--inner  { display:block; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . '.page-blogsingle .blog-link-con .portfolio-link--title.left-td, body.body-style-light ' . $the_content_con_identifier . '.page-blogsingle .blog-link-con .portfolio-link--title.right-td, body.body-style-light ' . $the_content_con_identifier . '.page-blogsingle .blog-link-con .portfolio-link--toback.center-td > a{ background-color: #eeeeee; }';
  $style_data_for_env .= ' body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main .sidebar-block { background-color: #f9f9f9; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .the-content-sheet:not(.the-content-sheet-dark):not(.the-content-sheet-for-sc), body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main .sidebar-block, body.body-style-light ' . $the_content_con_identifier . '.page-blogsingle .blog-link-con .portfolio-link--title.left-td, body.body-style-light.page-blogsingle .blog-link-con .portfolio-link--title.right-td, body.body-style-light ' . $the_content_con_identifier . '.page-blogsingle .blog-link-con .portfolio-link--toback.center-td > a, body.body-style-light ' . $the_content_con_identifier . ' .the-content-inner > .vc_row{ border: 1px solid #dddddd; } ';
  $style_data_for_env .= 'body ' . $the_content_con_identifier . ' .vc_section.from-post-type .the-content-sheet:after  { display:none; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .the-content-sheet.has-featured-media  { border-top: 0; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .the-content-sheet.has-media { border-top: 0px solid rgba(0,0,0,0); } ';
  $style_data_for_env .= 'body div.main-container ' . $the_content_con_identifier . ' .sidebar-main .widget_search .search-form .search-submit:hover { border-color: #222222; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .the-content-sheet.has-media .featured-media-con  { width: auto ; margin-left: -1px; margin-right: -1px; } ';

// -- search
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . '  .sidebar-main .widget_search .search-submit-con, body.body-style-light ' . $the_content_con_identifier . '  .sidebar-main .widget_search .search-submit { background-color: #222222;  } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . '  .sidebar-main .widget_search .search-submit:after { color: #fff; } ';
  $style_data_for_env .= ' body.body-style-light ' . $the_content_con_identifier . '  .sidebar-main .widget_search input[type=text]:hover, body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main .widget_search .search-field:hover,   body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main .widget_search input[type=text]:first-child,   body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main .widget_search .search-field { background-color: #ffffff; color: #777; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .widget_search .search-field::-webkit-input-placeholder { color: #777; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .widget_search .search-field::-moz-placeholder { color: #777; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .widget_search .search-field::-ms-input-placeholder { color: #777; } ';
  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . '.page-portfolio .zfolio.skin-melbourne .item-meta { border-left: 1px solid #ddd; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; } ';


  $style_data_for_env .= 'body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main .widget_search input[type=text]:first-child,body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main  .widget_search .search-field{ border-color: #222222; } ';
  $style_data_for_env .= ' body.body-style-light ' . $the_content_con_identifier . ' .sidebar-main  .widget_search .search-form:after{ color: #ffffff; } ';

  return $style_data_for_env;
}
