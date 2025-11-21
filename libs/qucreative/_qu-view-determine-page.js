"use strict";



export function determine_page() {

  const quCreative_main = window.quCreative_main;
  const _body = quCreative_main._body;



  quCreative_main.is_content_page = false;
  if (_body.hasClass("page-gallery-w-thumbs")) {
    quCreative_main.page = "page-gallery-w-thumbs";
  }

  if (_body.hasClass("page-portfolio")) {
    quCreative_main.page = "page-portfolio";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-portfolio-single")) {
    quCreative_main.page = "page-portfolio-single";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-normal")) {
    quCreative_main.page = "page-normal";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-blog")) {
    quCreative_main.page = "page-blog";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-blogsingle")) {
    quCreative_main.page = "page-blogsingle";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-about")) {
    quCreative_main.page = "page-about";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-contact")) {
    quCreative_main.page = "page-contact";
    quCreative_main.is_content_page = true;
  }
  if (_body.hasClass("page-homepage")) {
    quCreative_main.page = "page-homepage";
  }

  if (quCreative_main.transitioned_via_ajax_first && quCreative_main.newclass_body) {
    _body.removeClass(
        "page-blogsingle page-homepage page-gallery-w-thumbs page-normal page-contact page-about page-contact page-portfolio page-portfolio-single",
    );

    _body.removeClass("new-" + quCreative_main.newclass_body_page);

    _body.addClass(quCreative_main.newclass_body);
    _body.attr("class", quCreative_main.newclass_body);

    if (quCreative_main.menu_type == "menu-type-5" || quCreative_main.menu_type == "menu-type-6") {
      _body.addClass("menu-is-sticky");
    }

    quCreative_main.handle_resize(null, {
      ignore_menu: false,
      placew: false,
      place_page: false,
      redraw_canvas: false,
      calculate_sidebar_main_is_bigger: false,
      calculate_menu_overflow: true,
    });

    _body.removeClass(
        "bg_transition-fade bg_transition-slidedown bg_transition-wipedown",
    );
    _body.addClass("bg_transition-" + quCreative_main.bg_transition);
    _body.removeClass("first-transition");

    if (quCreative_main.border_width > 0) {
      _body.addClass("with-border");
    }

    quCreative_main.newclass_body = quCreative_main.newclass_body.replace(
        /menu-type-\d*/g,
        "",
    );

    quCreative_main.page = quCreative_main.newclass_body_page;

    _body.removeClass("no-padding");

    if (quCreative_main.newclass_body_nopadding) {
      _body.addClass("no-padding");
    }
  }
}
