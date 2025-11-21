<?php

function qucreative_generate_inline_css_for_highlight() {



// -- start css highlight data gather



  global $qucreative_main;





  if($qucreative_main->theme_data['post_for_meta']
    && get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_content_starts_at'.$qucreative_main->theme_data['page_extra_meta_label'], true )
    && get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_content_starts_at'.$qucreative_main->theme_data['page_extra_meta_label'], true )!='default'

    && (
      get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_content_starts_at_pixel'.$qucreative_main->theme_data['page_extra_meta_label'], true )!==''

    )
  ){

    /*
  ||
  get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_custom_title'.$qucreative_main->theme_data['page_extra_meta_label'], true )===' '
    */

    if(get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_content_starts_at_pixel'.$qucreative_main->theme_data['page_extra_meta_label'], true )==''){

      // -- then it is from custom title blank
      $valMarginTopContent = 0;
    }else{

      $valMarginTopContent = intval(get_post_meta( $qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_'.'meta_content_starts_at_pixel'.$qucreative_main->theme_data['page_extra_meta_label'], true ));
    }



    if($qucreative_main->theme_data['menu_type_attr']==QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS){






      if($qucreative_main->theme_data['sw_is_in_customizer']){
        $lab = 'menu_is_sticky';

        $qucreative_main->theme_data['theme_mods'][$lab] = $qucreative_main->get_theme_mod_and_sanitize($lab);
      }




      if($qucreative_main->theme_data['theme_mods']['menu_is_sticky']=='on'){
        $valMarginTopContent+=100;
      }
    }




// -- content starts at pixel
    $qucreative_main->theme_data['css_data_highlight'].='
        
            body .main-container .the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.':not(.page-gallery-w-thumbs):not(.has-header-slider)  .the-content:not(.excerpt-content){
                margin-top:'.$valMarginTopContent.'px;
            }
            body .main-container .the-content-con-for-post-id-'.$qucreative_main->theme_data['post_for_meta']->ID.':not(.page-gallery-w-thumbs).has-header-slider  .big-revslider-con{
                margin-top:'.$valMarginTopContent.'px;
            }';
  }




  if($qucreative_main->theme_data['sw_is_in_customizer']){


    $qucreative_main->theme_data['css_data_highlight'].='div form.customize-unpreviewable, div form.customize-unpreviewable input, div form.customize-unpreviewable select, div form.customize-unpreviewable button, body a.customize-unpreviewable, div area.customize-unpreviewable{
                cursor:pointer!important;
            }';

  }

  $greyscaleAmount = $qucreative_main->get_theme_mod_and_sanitize('greyscale_amount',array('type'=>'int'));

  if($greyscaleAmount!==null ){

    $qucreative_main->theme_data['css_data_highlight'].= '.translucent-con .translucent-canvas{ -webkit-filter: grayscale('.$greyscaleAmount.'%); filter: grayscale('.$greyscaleAmount.'%); }';

  }


  $high_color = $qucreative_main->get_theme_mod_and_sanitize("highlight_color");

  if(isset($qucreative_main->theme_data['preview_cookies']['highlight_color']) && $qucreative_main->theme_data['preview_cookies']['highlight_color']){
    $high_color = $qucreative_main->theme_data['preview_cookies']['highlight_color'];
  }


  // -- todo: replace with css var
  if($high_color && $high_color!='#97c1cf' ){





    $qucreative_main->theme_data['css_data_highlight'].= QUCREATIVE_VIEW_CSS_DATA_HIGHLIGHT;



    if($qucreative_main->theme_data['menu_type'] == 'menu-type-13'){
      $qucreative_main->theme_data['css_data_highlight'].=' , body.menu-type-13 nav.qucreative--nav-con ul.the-actual-nav > li.current-menu-item > a, body.menu-type-13 nav.qucreative--nav-con ul.the-actual-nav > li:hover > a, body.menu-type-13 nav.qucreative--nav-con ul.the-actual-nav > li ul';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-14'){
      $qucreative_main->theme_data['css_data_highlight'].=' , body.menu-type-14 nav.qucreative--nav-con ul.the-actual-nav > li.current-menu-item > a, body.menu-type-14 nav.qucreative--nav-con ul.the-actual-nav > li:hover > a, body.menu-type-14 nav.qucreative--nav-con ul.the-actual-nav > li ul';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-15'){
      $qucreative_main->theme_data['css_data_highlight'].=' , body.menu-type-15 nav.qucreative--nav-con ul.the-actual-nav > li.current-menu-item > a, body.menu-type-15 nav.qucreative--nav-con ul.the-actual-nav > li:hover > a,body.menu-type-15 nav.qucreative--nav-con ul.the-actual-nav > li ul, body.menu-type-15 nav.qucreative--nav-con ul.the-actual-nav > li ul';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-16'){
      $qucreative_main->theme_data['css_data_highlight'].=', body.menu-type-16 nav.qucreative--nav-con ul.the-actual-nav > li.current-menu-item > a, body.menu-type-16 nav.qucreative--nav-con ul.the-actual-nav > li:hover > a, body.menu-type-16 nav.qucreative--nav-con ul.the-actual-nav > li ul, body.menu-type-16 nav.qucreative--nav-con ul.the-actual-nav > li ul';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-17'){
      $qucreative_main->theme_data['css_data_highlight'].=', body.menu-type-17 nav.qucreative--nav-con ul.the-actual-nav > li.current-menu-item > a, body.menu-type-17 nav.qucreative--nav-con ul.the-actual-nav > li:hover > a, body.menu-type-17 nav.qucreative--nav-con ul.the-actual-nav > li ul, body.menu-type-17 nav.qucreative--nav-con ul.the-actual-nav > li ul';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-18'){
      $qucreative_main->theme_data['css_data_highlight'].=', body.menu-type-18 nav.qucreative--nav-con ul.the-actual-nav > li.current-menu-item > a, body.menu-type-18 nav.qucreative--nav-con ul.the-actual-nav > li:hover > a, body.menu-type-18 nav.qucreative--nav-con ul.the-actual-nav > li ul, body.menu-type-18 nav.qucreative--nav-con ul.the-actual-nav > li ul';
    }


    $qucreative_main->theme_data['css_data_highlight'].=', body .audioplayer.skin-redlights .ap-controls .ap-controls-left .con-playpause:hover, .team-member-element-2 .meta-con .social-profiles .circle-con:hover, body .dzs-tabs.skin-menu .tabs-menu .tab-menu-con.active .tab-menu, body .dzs-tabs.skin-menu .tabs-menu .tab-menu-con:hover .tab-menu, .element-sideways.with-fa .icon-con, body .sidebar-main .sidebar-block > .widget-title:first-of-type, html body .antfarm-btn.style-highlight:not(.ceva):not(.alceva), html body .antfarm-btn.style-black:hover:not(.ceva):not(.alceva), body ul.the-actual-nav > li:hover > a, body ul.the-actual-nav li.current-menu-item > a, body .btn-full-red, body .antfarm-btn:hover, body .antfarm-btn:focus:hover, body footer.upper-footer ul.sidebar-count-list > li:hover .the-count, body .social-list li:hover .icon-con,body div.main-container .sidebar-main .widget_search .search-form .search-submit:hover, body .antfarm-btn.style-highlight-dark, body .the-content-sheet.the-content-sheet-dark .antfarm-btn.style-default:hover, body .qucreative--520-nav-con .custom-responsive-menu .custom-menu li.current-menu-ancestor>a, body .selector-con-for-skin-melbourne.under-720 .categories .a-category, body .audioplayer .ap-controls .scrubbar .scrubBox-hover,.calendar_wrap tbody>tr>td>a, body footer.upper-footer .widget_search .search-form>.search-submit:hover{ background-color: '.$high_color.'; }  ';


    $qucreative_main->theme_data['css_data_highlight'].= '          body .selector-con-for-skin-melbourne .a-category.active, body .selector-con-for-skin-melbourne .a-category:hover { background-color: '.$high_color.'!important; }    ';

    $qucreative_main->theme_data['css_data_highlight'].= '                            body .zfolio.under-720 .selector-con div.a-category.active, body .selector-con-for-skin-melbourne.under-720 div.a-category.active{ background-color: '.$high_color.'!important; }  ';




    $qucreative_main->theme_data['css_data_highlight'].= ' ul.the-actual-nav li ul li.current-menu-item > a, body.qucreative-submenu-style-highlight-color .main-container nav.qucreative--nav-con ul.the-actual-nav>li ul li.current-menu-item>a, ul.the-actual-nav li ul > li:hover > a, body.qucreative-submenu-style-highlight-color .main-container:not(.ceva) ul.the-actual-nav li ul > li:hover > a, .antfarm-btn.style-hallowred, .antfarm-btn.style-hallowred:focus, .bullet-feature-red .icon-con .fa,html body a.post-main-link:not(.a):hover,body.page-blogsingle .post-meta-below a:hover,body.page-blogsingle .blog-comments ul.itemCommentsList .comment-right-meta a:hover,ul.sidebar-count-list > li:hover > a .cat-name,.post-meta a:hover,.main-gallery--descs .main-gallery--desc .big-number,.contact-info a:hover,.sidebar-block-archive > a:last-child:hover,body.page-portfolio-single .portfolio-single-meta-con a,body.page-portfolio-single blockquote a:hover';


    if($qucreative_main->theme_data['menu_type'] == 'menu-type-2'){

      $qucreative_main->theme_data['css_data_highlight'].=',body.menu-type-2 ul.the-actual-nav li ul li.current-menu-item > a, body.menu-type-2 ul.the-actual-nav li ul > li:hover > a';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-15'){

      $qucreative_main->theme_data['css_data_highlight'].=',body.menu-type-15 nav.qucreative--nav-con ul.the-actual-nav > li ul li:hover > a, body.menu-type-15 nav.qucreative--nav-con ul.the-actual-nav > li ul li.current-menu-item > a';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-16'){

      $qucreative_main->theme_data['css_data_highlight'].=', body.menu-type-16 nav.qucreative--nav-con ul.the-actual-nav > li ul li:hover > a, body.menu-type-16 nav.qucreative--nav-con ul.the-actual-nav > li ul li.current-menu-item > a';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-17'){

      $qucreative_main->theme_data['css_data_highlight'].=', body.menu-type-17 nav.qucreative--nav-con ul.the-actual-nav > li ul li:hover > a, body.menu-type-17 nav.qucreative--nav-con ul.the-actual-nav > li ul li.current-menu-item > a';
    }
    if($qucreative_main->theme_data['menu_type'] == 'menu-type-18'){

      $qucreative_main->theme_data['css_data_highlight'].=', body.menu-type-18 nav.qucreative--nav-con ul.the-actual-nav > li ul li:hover > a, body.menu-type-18 nav.qucreative--nav-con ul.the-actual-nav > li ul li.current-menu-item > a';
    }


    $qucreative_main->theme_data['css_data_highlight'].=',.zoombox-maincon.skin-whitefull .main-con > .info-con blockquote a:hover,.excerpt-content blockquote a:hover,body .arrow-left-for-skin-qucreative-2:hover > i, body .arrow-right-for-skin-qucreative-2:hover > i, body .close-btn-for-skin-qucreative:hover > i, .post-meta a, footer.upper-footer ul.sidebar-count-list > li a.sidebar-latest-post:hover .post-meta .post-title, body a:hover, body .antfarm-btn.style-hallowred, .antfarm-btn.style-hallowred:focus, body .social-list li:hover .text-con, body footer.upper-footer ul.sidebar-count-list > li:hover a.sidebar-latest-post .post-meta span.post-title, body .links-list li a:hover:not(.a):not(.b), body .zoombox-maincon.skin-whitefull .main-con > .info-con .subtitle, body a:not(.custom-a):hover, html body.qucreative-submenu-style-highlight-color nav.qucreative--nav-con ul.the-actual-nav > li ul li.current-menu-ancestor > a{ color:  '.$high_color.';} .antfarm-btn.style-hallowred, .antfarm-btn.style-hallowred:focus, .bullet-feature-red .icon-con,body .arrow-left-for-skin-qucreative-2:hover, .arrow-right-for-skin-qucreative-2:hover, .close-btn-for-skin-qucreative:hover,.dzs-tabs.skin-qucreative:not(.is-toggle) .tabs-menu .tab-menu-con.active,  body .arrow-left-for-skin-qucreative-2:hover, body .arrow-right-for-skin-qucreative-2:hover, body .close-btn-for-skin-qucreative:hover{ border-color: '.$high_color.';} .bullet-feature-form.form-hexagon .icon-con:after,.selector-con.selector-con-for-skin-melbourne .categories .a-category:before,.main-container .the-content-con.fullit .zfolio.skin-silver .selector-con .categories .a-category:before, .main-container .the-content-con.fullit .zfolio.skin-melbourne .selector-con .categories .a-category:before, body .dzs-tabs.skin-menu .tabs-menu .tab-menu-con:before{ border-top-color: '.$high_color.';} .bullet-feature-form.form-hexagon .icon-con:before, body .ajax-preloader:before,body .zfolio.skin-melbourne .zfolio-item:hover .item-meta:before,body.page-portfolio-single .portfolio-single-meta-con a:hover, .post-meta a:hover{ border-bottom-color: '.$high_color.';} body .dzstooltip.skin-red.arrow-right:before{ border-left-color: '.$high_color.';} ::selection{ background-color: '.$high_color.'; } ::-moz-selection{ background-color: '.$high_color.'; } .antfarm-btn.style-hallowred:hover, .antfarm-btn.style-hallowred:focus, .bullet-feature-red .icon-con{  border-color: '.$high_color.';color: #ffffff;}  footer.upper-footer .widget_search .search-form > input[type=submit]:hover, .antfarm-sc-call-to-action .call-to-action-con .antfarm-btn.style-highlight:hover, .antfarm-btn.style-highlight, .ul.the-actual-nav li ul li > a, body .dzs-tabs.skin-qucreative.is-toggle .tabs-menu .tab-menu-con.active .tab-menu, body.qucreative-submenu-style-highlight-color nav.qucreative--nav-con ul.the-actual-nav>li.current-menu-ancestor>a, body.qucreative-submenu-style-highlight-color nav.qucreative--nav-con ul.the-actual-nav>li.current-menu-item>a, body.qucreative-submenu-style-highlight-color nav.qucreative--nav-con ul.the-actual-nav>li:hover>a ,body ul.the-actual-nav:not(.ceva) > li.current-menu-ancestor > a {  background-color: '.$high_color.';color: #ffffff;}   body .antfarm-btn.style-hallowred, body .antfarm-btn.style-hallowred:focus{ box-shadow: 0 0 0 2px '.$high_color.' inset; } ';


    $qucreative_main->theme_data['css_data_highlight'].='.color-highlight, .color-highlight-on-hover:hover,.color-highlight-on-hover:hover > i{ color: '.$high_color.'!important; } ';

    // -- background-color and box-shadow
    $qucreative_main->theme_data['css_data_highlight'].= '.main-container .btn-zoomsounds:hover,  html body .antfarm-btn.style-hallowred:hover:not(.ceva):not(.alceva), html body .antfarm-btn.style-hallowblack:hover:not(.ceva):not(.alceva),  body .antfarm-btn.style-highlight, body .antfarm-btn.style-default:hover,  body .antfarm-btn.style-black:hover,  body .antfarm-btn.style-hallowred:hover,  body .antfarm-btn.style-hallowblack:hover{  box-shadow: 0 0 0 2px '.$high_color.' inset; background-color: '.$high_color.';} ';


    // -- box shadow
    $qucreative_main->theme_data['css_data_highlight'].= '  body .dzs-tabs.skin-qucreative.is-toggle .tabs-menu .tab-menu-con.active .plus-sign:not(.ceva):not(.alceva):not(.altceva) rect, html body .main-container nav.qucreative--nav-con ul.the-actual-nav li .tooltip--icon path{ fill: '.$high_color.';} ';
    $qucreative_main->theme_data['css_data_highlight'].= ' body .zfolio.skin-qucreative .zfolio-item .zfolio-item--inner .zfolio-item--inner--inner--inner:after{ box-shadow: inset 0px 0px 0px 0px '.$high_color.'; } ';
    $qucreative_main->theme_data['css_data_highlight'].= ' body .main-container .dzs-tabs.skin-qucreative .tabs-menu .tab-menu-con.active:not(.ceva):not(.alceva) .tab-menu, body .qucreative--520-nav-con .custom-responsive-menu .custom-menu li:hover>a, body .qucreative--520-nav-con .custom-responsive-menu .custom-menu li.current-menu-item>a{  border-color: '.$high_color.';background-color: '.$high_color.';color: #ffffff; } ';
    $qucreative_main->theme_data['css_data_highlight'].= ' body .zfolio.skin-qucreative .zfolio-item:hover .zfolio-item--inner--inner--inner:after, body .zfolio.skin-qucreative .zfolio-item.active .zfolio-item--inner--inner--inner:after{ box-shadow: inset 0px 0px 0px 5px '.$high_color.'; } ';


    // -- border and background
    $qucreative_main->theme_data['css_data_highlight'].= 'body .the-content-sheet.the-content-sheet-dark .audioplayer.skin-redlights .ap-controls .ap-controls-left .con-playpause:hover,body .the-content-sheet.the-content-sheet-dark .audioplayer.skin-redlights .btn-zoomsounds:hover,.the-content-con.page-blogsingle .blog-link-con:not(.ceva):not(.alceva):not(.da) .portfolio-link--title:hover, body.page-blogsingle .blog-link-con .portfolio-link--toback.center-td:not(.ceva):not(.ceva2):not(.ceva3)>a:hover, body .the-content-sheet.the-content-sheet-dark .qucreative-pricing-table a.signup-button:hover{ background-color: '.$high_color.'; border-color: '.$high_color.';  } ';

    // -- border and background !important
    $qucreative_main->theme_data['css_data_highlight'].= ' .portfolio-link-con .portfolio-link--title:hover, .portfolio-link-con .portfolio-link--toback.center-td:hover { background-color: '.$high_color.'!important; border-color: '.$high_color.'!important;  } ';


    $qucreative_main->theme_data['css_data_highlight'].= '.bg-color-hg,.bg-color-hg-on-hover:hover,.active > .color-hg-on-parent-active { background-color: '.$high_color.'!important; } ';
    $qucreative_main->theme_data['css_data_highlight'].= '.color-hg,.color-hg-on-hover:hover { color: '.$high_color.'!important; } ';
    $qucreative_main->theme_data['css_data_highlight'].= '.border-hg-on-hover:hover { border-color: '.$high_color.'!important; } ';
    $qucreative_main->theme_data['css_data_highlight'].= '.color-border-bottom-on-hover:hover{  border-bottom-color: '.$high_color.'!important; } ';

  }

  $qucreative_main->theme_data['css_data_highlight'] = str_replace('{{high_color}}', $high_color, $qucreative_main->theme_data['css_data_highlight']);

  // -- end highlight css



}
