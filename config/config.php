<?php
include_once QUCREATIVE_THEME_DIR . 'config/config-customizer.php';


const QUCREATIVE_META_PREFIX = 'qucreative_';
const QUCREATIVE_VIEW_VERTICAL_MENU_TYPE_CSS_CLASS = 'qucreative-vertical-menu';
const QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS = 'qucreative-horizontal-menu';
const QUCREATIVE_VIEW_MENU_TYPES_VERTICAL = array('menu-type-5', 'menu-type-6');
const QUCREATIVE_VIEW_MENU_TYPES_HORIZONTAL = array('menu-type-9', 'menu-type-10', 'menu-type-13', 'menu-type-14', 'menu-type-15', 'menu-type-16', 'menu-type-17', 'menu-type-18');
const QUCREATIVE_VIEW_ENQUEUE_MENU_STYLE = array('menu-type-1','menu-type-2','menu-type-3','menu-type-4','menu-type-5', 'menu-type-6','menu-type-7', 'menu-type-8','menu-type-11', 'menu-type-12','menu-type-13', 'menu-type-14', 'menu-type-15', 'menu-type-16');
const QUCREATIVE_VIEW_MENU_STYLE_LIGHT = array('menu-type-2','menu-type-4', 'menu-type-6', 'menu-type-8', 'menu-type-12', 'menu-type-14', 'menu-type-16', 'menu-type-18');
const QUCREATIVE_VIEW_FONT_PARSED = 'font_vals';
const QUCREATIVE_VIEW_FONT_FOR_ECHO = 'css_data_typography';
const QUCREATIVE_VIEW_STYLE_ID = 'qucreative-style';
const QUCREATIVE_MENU_PRIMARY_MENU_ID = 'primary';
const QUCREATIVE_QUEXTEND_PLUGIN_NAME = 'QuExtend_View';

const QU_VIEW_ALLOWED_TAGS = array(
  'a' => array(
    'href' => array(),
    'title' => array()
  ),
  'br' => array(),
  'em' => array(),
  'strong' => array(),
);

/** @deprecated @var $title_allowed_tags  */
$title_allowed_tags = array(
  'a' => array(
    'href' => array(),
    'title' => array()
  ),
  'br' => array(),
  'em' => array(),
  'strong' => array(),
);

const QUCREATIVE_VIEW_DEFAULT_WHITE_BG = 'ffffff';
const QUCREATIVE_VIEW_DEFAULT_COLOR_HIGHLIGHT = '97c1cf';
const QU_ALLOWED_HTML_TAGS = array(
  'a' => array(
    'href' => array(),
    'title' => array()
  ),
  'br' => array(),
  'em' => array(),
  'strong' => array(),
);

const QUCREATIVE_VIEW_CSS_DATA_HIGHLIGHT = ' body ul.the-actual-nav:not(.ceva) li.current-menu-ancestor > a{ background-color: #fff; color: {{high_color}};  } body .the-content-sheet.the-content-sheet-dark .team-member-element-2 .meta-con .social-profiles .circle-con:hover,body ul.the-actual-nav li.current-menu-item > a, ul.the-actual-nav > li:hover > a, ul.redcircle li:before, html body .the-content .antfarm-btn:hover:not(.btn-full-red), .antfarm-btn:focus:hover, .bullet-feature-form .icon-con, .bullet-feature-form.form-hexagon .icon-con, ul.the-actual-nav li ul li > a, body .dzstooltip.skin-red,body .main-container .qucreative-pagination > li.active > a,body .main-container .qucreative-pagination > li:hover > a,.btn-full-white:hover,body.page-blogsingle .blog-link-con .portfolio-link--toback.center-td:hover > a,.btn-full-red,body.page-blogsingle .blog-comments .btn-load-more-comments:hover,.selector-con-for-skin-melbourne .a-category.active, .selector-con-for-skin-melbourne .a-category:hover,body .zfolio.skin-melbourne .zfolio-item:hover .item-meta,.ajax-preloader .loader:after,.zfolio.skin-silver .selector-con .a-category.active, .zfolio.skin-silver .selector-con .a-category:hover, body .zfolio.skin-melbourne .selector-con .a-category.active, .zfolio.skin-melbourne .selector-con .a-category:hover, .zfolio.skin-gazelia .selector-con .a-category.active, .zfolio.skin-gazelia .selector-con .a-category:hover, .zfolio.skin-qucreative .selector-con .a-category.active, .zfolio.skin-qucreative .selector-con .a-category:hover,ul.sidebar-count-list > li:hover > a .the-count,.sidebar-search-con .search-submit-con:hover, .team-member-element .meta-con .social-profiles .circle-con:hover,.map-canvas-con .contact-info .services-lightbox--close:hover,body .advancedscroller.skin-qucreative > .arrowsCon > .arrow-left:hover, body .advancedscroller.skin-qucreative .arrowsCon > .arrow-right:hover,.qucreative-pricing-table a.signup-button:hover,body .advancedscroller .item .description-wrapper:hover .description-wrapper--icon-con,body .advancedscroller.skin-karma-inset .arrowsCon > .arrow-left:hover, body .advancedscroller.skin-karma-inset .arrowsCon > .arrow-right:hover,body.page-portfolio-single .the-content-con.qucreative-view-fullwidth .portfolio-single-liquid-title:not(.ceva) > h3,body.page-portfolio-single .the-content-con.qucreative-view-fullwidth .portfolio-single-liquid-title:not(.ceva) .portfolio-single-liquid-info:hover,.main-container .the-content-con.qucreative-view-fullwidth .portfolio-single-subtitle,body.page-portfolio-single .the-content-con.qucreative-view-fullwidth .arrow-left-for-skin-qucreative:hover, body.page-portfolio-single .the-content-con.qucreative-view-fullwidth .arrow-right-for-skin-qucreative:hover,.zoombox-maincon.skin-whitefull .main-con > .slider-con .arrow-left-for-skin-qucreative:hover, .zoombox-maincon.skin-whitefull .main-con > .slider-con .arrow-right-for-skin-qucreative:hover,.services-lightbox-content .services-lightbox--close:hover,.advancedscroller .item .description-wrapper.active:not(.a) .description-wrapper--icon-con, ul.nostyle li > .icon-con, body .widget_search.widget .search-form>.search-submit:hover';
const QUCREATIVE_POST_TYPE_POST = 'post';
const QUCREATIVE_POST_TYPE_PORTFOLIO = 'quextend_port_items';




const QUCREATIVE_ALLOWED_TAGS = array(
  'a' => array(
    'href' => array(),
    'title' => array()
  ),
  'br' => array(),
  'span' => array(),
  'em' => array(),
  'strong' => array(),
);
;


const QUCREATIVE_VIEW_OVERLAY_MENUS = array('menu-type-11', 'menu-type-12');
const QUCREATIVE_VIEW_OVERLAY_MENUS_BODY_CLASS = 'qucreative-overlay-menu';
