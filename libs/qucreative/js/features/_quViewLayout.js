



let force_width_gap = 0,
    force_width_column = 0,
    force_width_blur_margin = 0,
    force_content_gap_width = 0,
    force_width_section_bg = 0;


export function calculate_menu_width(quCreative_main) {
  const _body = jQuery("body");
  if (
    _body.hasClass("menu-type-3") ||
    _body.hasClass("menu-type-4") ||
    _body.hasClass("menu-type-5") ||
    _body.hasClass("menu-type-6")
  ) {
    quCreative_main.view_menuWidth = 230;
  }
  if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
    quCreative_main.view_menuWidth = 230;
  }
  if (
    _body.hasClass("menu-type-7") ||
    _body.hasClass("menu-type-8") ||
    _body.hasClass("menu-type-11")
  ) {
    quCreative_main.view_menuWidth = 260;
  }
  if (_body.hasClass("menu-type-12")) {
    quCreative_main.view_menuWidth = 170;
    quCreative_main.view_menuWidth_onRight = 200;
  }
}

export function dzsQu_view_adjustLayout(quCreative_main){







  quCreative_main.force_content_width = parseInt(qucreative_options.content_width, 10);
  force_width_column = parseInt(qucreative_options.width_column, 10);
  force_width_gap = parseInt(qucreative_options.width_gap, 10);
  force_width_blur_margin = parseInt(
      qucreative_options.width_blur_margin,
      10,
  );
  force_content_gap_width = parseInt(
      qucreative_options.content_gap_width,
      10,
  );
  force_width_section_bg = parseInt(qucreative_options.width_section_bg, 10);

  if (isNaN(force_width_section_bg)) {
    force_width_section_bg = "";
  }

  if (isNaN(quCreative_main.force_content_width) || quCreative_main.force_content_width == 0) {
    quCreative_main.force_content_width = 0;
  }

  if (force_width_section_bg) {
    if (isNaN(force_width_column)) {
      force_width_column = 56;
    }
    if (isNaN(force_width_gap)) {
      force_width_gap = 30;
    }
    if (isNaN(force_width_blur_margin)) {
      force_width_blur_margin = 30;
    }
  }

  if (isNaN(force_width_column) || force_width_column == 0) {
  } else {
    if (force_width_section_bg) {
    }


    // -- defaults ?
    if (
        force_width_column != 56 ||
        force_width_gap != 30 ||
        force_width_blur_margin != 30 ||
        force_width_section_bg
    ) {
      quCreative_main.force_content_width =
          force_width_column * 12 +
          force_width_gap * 13 +
          force_width_blur_margin * 2;

      if (force_width_section_bg) {
        quCreative_main.force_content_width =
            force_width_column * 12 +
            force_width_gap * 11 +
            force_width_blur_margin * 2 +
            2 * force_width_section_bg;
      }
    }
  }



  if (force_width_gap != 30) {
    if (isNaN(force_width_gap)) {
      force_width_gap = 30;
    }

    quCreative_main.$cssFromJs.html(
        quCreative_main.$cssFromJs.html() +
        'div.zfolio[data-margin="theme-column-gap"] > .items { margin-left: -' +
        force_width_gap / 2 +
        "px; margin-right: -" +
        force_width_gap / 2 +
        'px; } div.zfolio[data-margin="theme-column-gap"] .zfolio-item { padding-left: ' +
        force_width_gap / 2 +
        "px; padding-right: " +
        force_width_gap / 2 +
        "px; margin-bottom: " +
        force_width_gap +
        "px; }",
    );
  }

  if (quCreative_main.force_content_width > 0) {

    dzsQu_view_adjustLayoutContentWidth(quCreative_main);
  }
  if (force_content_gap_width > 0) {
    var aux23 =
        " @media (min-width:992px) { .row{  margin-left:-" +
        Math.round(force_content_gap_width / 2) +
        "px; margin-right:-" +
        Math.round(force_content_gap_width / 2) +
        "px; } .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12{ padding-left:" +
        Math.round(force_content_gap_width / 2) +
        "px; padding-right:" +
        Math.round(force_content_gap_width / 2) +
        "px;} .the-content-con > .the-content{ padding: " +
        force_content_gap_width +
        "px; }   ";

    aux23 += "}";
    quCreative_main.$cssFromJs.html(quCreative_main.$cssFromJs.html() + aux23);
  }
}
export function dzsQu_view_adjustLayoutContentWidth(quCreative_main){
  const content_width = quCreative_main.force_content_width;
  const default_content_width = content_width;

  var aux23 =
      "  .main-container .the-content-con.page-normal:not(.fullit) > .the-content{max-width:" +
      quCreative_main.force_content_width +
      "px; }        .the-content-con.page-portfolio-single:not(.fullit) > .the-content{ max-width:" +
      quCreative_main.force_content_width +
      "px; } .main-container .the-content-con:not(.fullit) > .the-content:not(.gallery-thumbs--image-container){ max-width:" +
      quCreative_main.force_content_width +
      "px; } ";

  if (force_width_section_bg) {
    aux23 +=
        "body .the-content-sheet .the-content-sheet-text:not(.forced-from-no-rows):not(.post-type-post), .flex-for-sc, .the-content-con:not(.page-blogsingle) footer.upper-footer{ padding-left: " +
        force_width_section_bg +
        "px; padding-right: " +
        force_width_section_bg +
        "px; }";
  }

  aux23 +=
      "  .main-container .the-content-con.page-template-template-portfolio:not(.fullit)  > .the-content{ max-width:" +
      (quCreative_main.force_content_width - force_width_gap * 2) +
      "px; }  ";

  aux23 +=
      ' .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12, div[class*="vc_col-sm-"] >.vc_column-inner  { padding-left: ' +
      force_width_gap / 2 +
      "px; padding-right: " +
      force_width_gap / 2 +
      "px; } .row,.vc_row { margin-left: -" +
      force_width_gap / 2 +
      "px; margin-right: -" +
      force_width_gap / 2 +
      "px; }";

  aux23 +=
      " .the-content-con > .the-content { padding: " +
      force_width_blur_margin +
      "px; }";

  if (force_width_blur_margin == 0) {
    aux23 +=
        " .the-content-con.template-is-default-and-has-one-zfolio > .the-content , .the-content-con.posts-page > .the-content, .the-content-con.page-blogsingle:not(.ceva) > .the-content { padding: 30px; }";
  }

  aux23 +=
      " body .the-content-con.page-normal.fullit > .the-content { padding: " +
      force_width_blur_margin +
      "px; }";

  if (force_width_blur_margin > 30) {
    aux23 +=
        " .the-content-con.page-portfolio:not(.fullit) .the-content-inner>.selector-con:first-child{ margin-top: " +
        (20 - force_width_blur_margin) +
        "px; }";
  }
  aux23 +=
      " .margin-right-blur-margin { margin-right: " +
      force_width_blur_margin +
      "px; }";
  aux23 +=
      " .margin-left-blur-margin { margin-left: " +
      force_width_blur_margin +
      "px; }";

  aux23 +=
      " .the-content-sheet.blog-single-block { margin-bottom: " +
      force_width_gap +
      "px; } ";
  aux23 +=
      " body .the-content .the-content-inner + .upper-footer { margin-top: " +
      force_width_gap +
      "px; } ";

  // -- TODO: why is force width_gap here

  if (force_width_blur_margin != 30) {
    const pt = 30 - force_width_blur_margin;

    if (pt < 0) {
      aux23 +=
        " .the-content-con > .the-content > .the-content-inner > .selector-con:not(.selector-clone){ margin-top: " +
        pt +
        "px; }";
    } else {
      aux23 +=
        " .the-content-con > .the-content > .the-content-inner > .selector-con:not(.selector-clone){ padding-top: " +
        pt +
        "px; }";
    }
  }

  quCreative_main.$cssFromJs.html(quCreative_main.$cssFromJs.html() + aux23);
}
