<?php
function qucreative_generate_style_for($pargs = array()) {
  $margs = array(

    'font_data' => array(),
    'label_prefix' => 'h1',
    'selector' => 'h1, .the-content-con > h1',
    'important' => true,
  );

  $margs = array_merge($margs, $pargs);

  $font_data = $margs['font_data'];


  $fout = '';
  $fout .= $margs['selector'] . '{';
  if (isset($font_data[$margs['label_prefix'] . '_size']) && $font_data[$margs['label_prefix'] . '_size']) {
    $fout .= ' font-size: ' . $font_data[$margs['label_prefix'] . '_size'] . 'px';
  }


  if ($margs['important']) {


    $fout .= '!important;';
  } else {
    $fout .= ';';
  }


  if (isset($font_data[$margs['label_prefix'] . '_line_height']) && $font_data[$margs['label_prefix'] . '_line_height']) {
    $fout .= ' line-height: ' . $font_data[$margs['label_prefix'] . '_line_height'];
  }

  if ($margs['important']) {


    $fout .= '!important;';
  } else {
    $fout .= ';';
  }


  $weight = 'regular';

  if (isset($font_data[$margs['label_prefix'] . '_weight'])) {

    $weight = $font_data[$margs['label_prefix'] . '_weight'];
  }


  // --sanitizing
  if (strpos($weight, 'italic') !== false) {
    $fout .= ' font-style: italic!important; ';
    $weight = str_replace('italic', '', $weight);
  } else {

    $fout .= ' font-style: normal!important; ';
  }
  $weight = str_replace('regular', '400', $weight);
  // --sanitizing END


  if ($weight == '') {
    $weight = '400';
  }
  $fout .= ' font-weight: ' . $weight . ' ';


  if ($margs['important']) {


    $fout .= '!important';
  } else {
    $fout .= ';';
  }


  $fout .= ' } ';


  $lab = $margs['label_prefix'] . '_responsive_slider';


  if (isset($font_data[$lab]) && $font_data[$lab]) {

    $val = $font_data[$lab];

    $val = intval($val);

    if ($val) {
      $val = 1 - floatval($val / 100);

      $fout .= ' @media all and (max-width: 521px){ ' . $margs['selector'] . ' { font-size: ' . intval($val * intval($font_data[$margs['label_prefix'] . '_size'])) . 'px!important;  } } ';
    }


  }

  return $fout;

}


function qucreative_generate_inline_css_for_font_data() {
  global $qucreative_main;
  $font_data_str = $qucreative_main->get_theme_mod_and_sanitize('font_data');


  $font_data = array();


  parse_str($font_data_str, $font_data);


  global $qucreative_main;


  if ($font_data_str && $font_data_str != QUCREATIVE_DEFAULT_TYPOGRAPHY) {


    $qucreative_main->theme_data['css_data_typography'] .= '
        h1:not(.vc_custom_heading), h2:not(.vc_custom_heading), h3:not(.vc_custom_heading), h4:not(.vc_custom_heading), h5:not(.vc_custom_heading), h6:not(.vc_custom_heading), .h1, .h2, .h3, .h4, .h5, .h6, .h-group-1, .h-group-2, .qucreative-pricing-table a.signup-button, .selector-con.selector-con-for-skin-melbourne .categories .a-category, .advancedscroller.item-skin-trumpet .item .description-wrapper--text, .audioplayer.skin-redlights .ap-controls .ap-controls-right .meta-artist-con .the-artist, .qucreative-pagination > li > a, .main-container .dzs-tabs.skin-menu .tabs-menu .tab-menu-con .tab-menu, body .main-container .audiogallery.mode-showall.skin-redlights .number-wrapper > .the-number, .meta-comment-reply > a {
            font-family: "' . esc_html($font_data['headings_font']) . '", serif !important;
        }    .the-content-sheet .element-header.two-lines,.the-content-sheet .element-header.two-lines .line-1, .the-content-sheet .element-header.two-lines h2 {
            font-family: "' . esc_html($font_data['section_title_two_font']) . '", serif !important;
        }';


    if (isset($font_data['section_title_two_second_font']) && $font_data['section_title_two_second_font']) {
      $qucreative_main->theme_data['css_data_typography'] .= ' .the-content-sheet .element-header .line-2 {
            font-family: "' . esc_html($font_data['section_title_two_second_font']) . '", serif !important;
        }';
    }


    if (isset($font_data['section_title_two_number_font']) && $font_data['section_title_two_number_font']) {
      $qucreative_main->theme_data['css_data_typography'] .= '  .the-content-sheet .element-header .section-number {
            font-family: "' . esc_html($font_data['section_title_two_number_font']) . '", serif !important;
        } ';
    }


    if (isset($font_data['section_title_one_first_font']) && $font_data['section_title_one_first_font']) {
      $qucreative_main->theme_data['css_data_typography'] .= '  .the-content-sheet .element-header.one-line, .the-content-sheet .element-header.one-line .line-1 {
            font-family: "' . esc_html($font_data['section_title_one_first_font']) . '", serif !important;
        }  ';
    }


    $qucreative_main->theme_data['css_data_typography'] .= '

        .the-content > .main-page-title {
            font-family: "' . esc_html($font_data['page_title_font']) . '", serif !important;

        }

        .copyright-text {';


    if (isset($font_data['copyright_font'])) {


      $qucreative_main->theme_data['css_data_typography'] .= '
			     font-family: "' . esc_html($font_data['copyright_font']) . '", serif !important;
				}';


      if (isset($font_data['copyright_font_link_to'])) {
        $qucreative_main->theme_data['css_data_typography'] .= ' font-family: "' . esc_html($font_data[$font_data['copyright_font_link_to'] . '_font']) . '", serif !important;';
      }

    }
    $qucreative_main->theme_data['css_data_typography'] .= '   }';


    $qucreative_main->theme_data['css_data_typography'] .= '.weight-from-anchor {
        }';


    $qucreative_main->theme_data['css_data_typography'] .= '
        .main-gallery--descs .main-gallery--desc .big-desc {';

    $label_prefix = 'home_slider';
    if (isset($font_data[$label_prefix . '_font'])) {

      $qucreative_main->theme_data['css_data_typography'] .= ' font-family: "' . esc_html($font_data[$label_prefix . '_font']) . '", serif !important;
				
				';
    }

    if (isset($font_data[$label_prefix . '_font_link_to'])) {
      $qucreative_main->theme_data['css_data_typography'] .= ' font-family: "' . esc_html($font_data[$font_data[$label_prefix . '_font_link_to'] . '_font']) . '", serif !important;
        ';
    }

    $qucreative_main->theme_data['css_data_typography'] .= '}
        .main-gallery--descs .main-gallery--desc .big-number {
';


    $label_prefix = 'home_number';
    if (isset($font_data[$label_prefix . '_font'])) {
      $qucreative_main->theme_data['css_data_typography'] .= ' font-family: "' . esc_html($font_data[$label_prefix . '_font']) . '", serif !important;
            ';
    }

    if (isset($font_data[$label_prefix . '_font_link_to'])) {
      $qucreative_main->theme_data['css_data_typography'] .= ' font-family: "' . esc_html($font_data[$font_data[$label_prefix . '_font_link_to'] . '_font']) . '", serif !important;';
    }

    $qucreative_main->theme_data['css_data_typography'] .= '

        }

        body .qucreative--nav-con ul.the-actual-nav li > a, body .qucreative--nav-con ul.the-actual-nav li > a, .menu-toggler-target ul.the-actual-nav li > a {
            font-family: "' . esc_html($font_data['menu_font']) . '", serif !important;
        }';

    if ($font_data['page_title_orientation'] == 'skewed') {


      if ($qucreative_main->get_theme_mod_and_sanitize('page_title_align') == 'page-title-align-left') {

        $qucreative_main->theme_data['css_data_typography'] .= ' body .the-content-con .main-page-title{ transform: rotate(-5deg)!important;     bottom: calc(100% - ' . intval(intval($font_data['page_title_size']) / 2) . 'px)!important; } ';
      } else {

        $qucreative_main->theme_data['css_data_typography'] .= ' body .the-content-con .main-page-title{ transform: rotate(5deg)!important;     bottom: calc(100% - ' . intval(intval($font_data['page_title_size']) / 2) . 'px)!important; } ';
      }
    }


    if ($font_data['p_color'] && $font_data['p_color'] != '#6b6b6b') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        p, div.paragraph, .paragraph-text {
            color: ' . $font_data['p_color'] . ';
        }';
    }
    if ($font_data['p_color_for_light'] && $font_data['p_color_for_light'] != '#ffffff') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content-sheet.the-content-sheet-dark p, .the-content-sheet.the-content-sheet-dark .paragraph, .the-content-sheet.the-content-sheet-dark .paragraph-text:not(.paragraph-text-for-light) {
            color: ' . $font_data['p_color_for_light'] . ';
        }
';
    }


    $lab = 'section_title_two_divider_color';


    if ($font_data[$lab] && $font_data[$lab] != '#6b6b6b') {
      $qucreative_main->theme_data['css_data_typography'] .= '
        body .section-title-divider-fullwidth[data-for="section_title_two"] {
            background-color: ' . $font_data[$lab] . ';
        }

        body .section-title-divider-box[data-for="section_title_two"] {
            background-color: ' . $font_data[$lab] . ';
        }

        body .section-title-divider-box[data-for="section_title_two"]:before {
            background-color: ' . $font_data[$lab] . ';
        }

        body .section-title-divider-box[data-for="section_title_two"]:after {
            border-color: ' . $font_data[$lab] . ';
        }
';
    }

    $lab .= '_for_light';
    if ($font_data[$lab] && $font_data[$lab] != '#ffffff') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        body .the-content-sheet.the-content-sheet-dark .section-title-divider-fullwidth[data-for="section_title_two"] {
            background-color: ' . $font_data[$lab] . ';
        }

        body .the-content-sheet.the-content-sheet-dark .section-title-divider-box[data-for="section_title_two"] {
            background-color: ' . $font_data[$lab] . ';
        }

        body .the-content-sheet.the-content-sheet-dark .section-title-divider-box[data-for="section_title_two"]:before {
            background-color: ' . $font_data[$lab] . ';
        }

        body .the-content-sheet.the-content-sheet-dark .section-title-divider-box[data-for="section_title_two"]:after {
            border-color: ' . $font_data[$lab] . ';
        }
';

    }


    $lab = 'section_title_one_divider_color';
    if ($font_data[$lab] && $font_data[$lab] != '#6b6b6b') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .section-title-divider-fullwidth[data-for="section_title_one"] {
            background-color: ' . $font_data[$lab] . ';
        }

        .element-header.heading-is-center .section-title-divider-box {
            background-color: ' . $font_data[$lab] . ';
        }

        .section-title-divider-box[data-for="section_title_one"]:before {
            background-color: ' . $font_data[$lab] . ';
        }

        .section-title-divider-box[data-for="section_title_one"]:after {
            border-color: ' . $font_data[$lab] . ';
        }';
    }
    $lab .= '_for_light';
    if ($font_data[$lab] && $font_data[$lab] != '#ffffff') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content-sheet.the-content-sheet-dark .section-title-divider-fullwidth[data-for="section_title_one"] {
            background-color: ' . $font_data[$lab] . ';
        }

        .the-content-sheet.the-content-sheet-dark .section-title-divider-box[data-for="section_title_one"]:before {
            background-color: ' . $font_data[$lab] . ';
        }

        .the-content-sheet.the-content-sheet-dark .section-title-divider-box[data-for="section_title_one"]:after {
            border-color: ' . $font_data[$lab] . ';
        }

        ';
    }


    if ($font_data['section_title_one_first_color'] && $font_data['section_title_one_first_color'] != '#eeeeee') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .element-header.one-line .line-1 {
            color: ' . $font_data['section_title_one_first_color'] . ';
        }

        ';
    }

    if ($font_data['section_title_one_first_color_for_light'] && $font_data['section_title_one_first_color_for_light'] != '#222222') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content-sheet.the-content-sheet-dark .element-header.one-line .line-1 {
            color: ' . $font_data['section_title_one_first_color_for_light'] . ';
        }

        ';
    }


    if ($font_data['section_title_two_first_color'] && $font_data['section_title_two_first_color'] != '#222222') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-heading .line-1 {
            color: ' . $font_data['section_title_two_first_color'] . ';
        }

        ';
    }


    if ($font_data['section_title_two_second_color'] && $font_data['section_title_two_second_color'] != '#222222') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-heading .line-2 {
            color: ' . $font_data['section_title_two_second_color'] . ';
        }

        ';
    }


    if ($font_data['section_title_two_first_color_for_light'] && $font_data['section_title_two_first_color_for_light'] != '#222222') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content-sheet.the-content-sheet-dark .the-heading .line-1 {
            color: ' . $font_data['section_title_two_first_color_for_light'] . ';
        }

        ';
    }


    if ($font_data['section_title_two_second_color_for_light'] && $font_data['section_title_two_second_color_for_light'] != '#222222') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content-sheet.the-content-sheet-dark .the-heading .line-2 {
            color: ' . $font_data['section_title_two_second_color_for_light'] . ';
        }

        ';
    }


    $lab = 'section_title_two_number_color';
    if ($font_data[$lab] && $font_data[$lab] != '#eeeeee') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content-sheet .element-header.two-lines .section-number {
            color: ' . $font_data[$lab] . ';
        }

        ';
    }


    $lab = 'section_title_two_number_color_for_light';
    if (isset($font_data[$lab]) && $font_data[$lab] && $font_data[$lab] != '#444444') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        body .main-container .the-content-sheet.the-content-sheet-dark .element-header.two-lines .section-number {
            color: ' . $font_data[$lab] . ';
        }

        ';
    }


    $lab = 'page_title_color';
    if ($font_data[$lab] && $font_data[$lab] != '#ffffff') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .the-content > .main-page-title {
            color: ' . $font_data[$lab] . ';
        }

        ';
    }


    $lab = 'home_slider_color';
    if ($font_data[$lab] && $font_data[$lab] != '#ffffff') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        .main-gallery--descs .main-gallery--desc .big-desc {
            color: ' . $font_data[$lab] . ';
        }

        ';
    }


    $lab = 'home_slider_color_for_light';
    if ($font_data[$lab] && $font_data[$lab] != '#222222') {

      $qucreative_main->theme_data['css_data_typography'] .= '
        body.body-style-light .main-gallery--descs .main-gallery--desc .big-desc {
            color: ' . $font_data[$lab] . ';
        }

        ';
    }


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h1',
      'selector' => 'h1:not(.vc_custom_heading):not(.main-page-title),.h1',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h2',
      'selector' => 'h2:not(.the-heading):not(.vc_custom_heading),.h2:not(.the-heading):not(.vc_custom_heading)',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h3',
      'selector' => 'h3:not(.h-group-2):not(.vc_custom_heading):not(.h-group-1),.h3',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h4',
      'selector' => 'h4:not(.vc_custom_heading)',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h5',
      'selector' => 'h5:not(.vc_custom_heading), .h5, .portfolio-link-con .portfolio-link--title, body .main-container .audiogallery.mode-showall.skin-redlights .number-wrapper > .the-number',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h6',
      'selector' => 'h6:not(.vc_custom_heading), .h6, .main-container .dzs-tabs.skin-menu .tabs-menu .tab-menu-con .tab-menu a > span, .selector-con.selector-con-for-skin-melbourne .categories .a-category, .advancedscroller.item-skin-trumpet .item .description-wrapper--text, .audioplayer.skin-redlights .ap-controls .ap-controls-right .meta-artist-con .the-artist, .qucreative-pagination > li > a,  .antfarm-btn:not(.h-group-1),.qucreative-pricing-table a.signup-button',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h-group-1',
      'selector' => '.h-group-1, .meta-comment-reply > a',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'h-group-2',
      'selector' => '.h-group-2',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= ' body,.font-group-1,.font-group-2,.font-group-3,.font-group-4,.font-group-5,.font-group-6,.font-group-7,.font-group-8,.font-group-9,.font-group-10,.font-group-11,.font-group-12 { font-family: "' . $font_data['body_font'] . '", serif; } ';

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'p',
      'selector' => 'p, .paragraph-text,div.paragraph,.sidebar-block, .widget.Antfarm_WorkingHours .small-desc',
      'important' => false,
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-1',
      'selector' => '.font-group-1',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-2',
      'selector' => '.font-group-2, body .main-container .dzs-tabs.skin-qucreative .tabs-menu .tab-menu-con .tab-menu, body .slider-con .dzs-tabs.skin-qucreative .tabs-menu .tab-menu-con .tab-menu',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-3',
      'selector' => '.font-group-3',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-4',
      'selector' => '.font-group-4',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-5',
      'selector' => '.font-group-5,  .widget_search .search-field',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-6',
      'selector' => '.font-group-6, .font-group-6 > p, footer.upper-footer .textwidget, Antfarm_Contact .the-text p',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-7',
      'selector' => '.font-group-7',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-8',
      'selector' => '.font-group-8',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-9',
      'selector' => '.font-group-9',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-10',
      'selector' => '.font-group-10, .contact-info p',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-11',
      'selector' => '.font-group-11',
    ));
    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'font-group-12',
      'selector' => '.font-group-12',
    ));

    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'blockquote',
      'selector' => 'blockquote,blockquote > p,.font-group-blockquote',
    ));


    if (!($qucreative_main->theme_data['is_preview_blog'] && ((isset($qucreative_main->theme_data['preview_cookies']['menu-type']) && $qucreative_main->theme_data['preview_cookies']['menu-type']) || (isset($qucreative_main->theme_data['preview_cookies']['menu_type']) && $qucreative_main->theme_data['preview_cookies']['menu_type'])))) {


      $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


        'font_data' => $font_data,
        'label_prefix' => 'menu',
        'selector' => 'body .qucreative--nav-con ul.the-actual-nav li > a,body .menu-toggler-target ul.the-actual-nav li > a',
      ));
    }


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'copyright',
      'selector' => 'body .copyright-text',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'section_title_two_first',

      'selector' => '.the-content-sheet  .element-header.two-lines .line-1',
    ));
    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'section_title_two_second',

      'selector' => '.the-content-sheet  .element-header.two-lines .line-2',
    ));


    if (isset($font_data['section_title_two_number_enable']) && $font_data['section_title_two_number_enable'] != 'on') {

      $qucreative_main->theme_data['css_data_typography'] .= ' body .section-number{ display:none; } ';
    }


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'section_title_one_first',
      'selector' => '.the-content-sheet  .element-header.one-line .line-1',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'section_title_two_number',
      'selector' => '.the-content-sheet  .element-header .section-number',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'page_title',
      'selector' => '.main-page-title',
    ));


    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'home_slider',
      'selector' => '.main-gallery--descs .main-gallery--desc .big-desc',
    ));
    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'home_number',
      'selector' => '.main-gallery--descs .main-gallery--desc .big-number',
    ));
    $qucreative_main->theme_data['css_data_typography'] .= qucreative_generate_style_for(array(


      'font_data' => $font_data,
      'label_prefix' => 'hyperlink',
      'selector' => ' a:not(.custom-a),.weight-from-anchor',
      'important' => true,
    ));


  }


  // -- end font data
}
