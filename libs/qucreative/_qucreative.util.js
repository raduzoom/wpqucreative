"use strict";
export function find_theContentSheet(_t) {

  var _con = null;

  if (
      _t
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass("the-content-sheet")
  ) {
    _con = _t.parent().parent().parent().parent().parent().parent();
  } else {
    if (
        _t
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .hasClass("the-content-sheet")
    ) {
      _con = _t.parent().parent().parent().parent().parent();
    }
  }

  return _con;
}
export function do_we_need_parallaxer(arg) {
  if (arg) {
  } else {
    arg = "newbody";
  }

  if (arg == "newbody") {
    return (
      window.qucreative_options.bg_isparallax == "on" &&
      newclass_body_page != "page-homepage" &&
      newclass_body_page != "page-gallery-w-thumbs" &&
      (newclass_content_con.indexOf("page-portfolio-single") > -1 &&
        newclass_content_con.indexOf("page-portfolio-type-image") > -1 &&
        newclass_content_con.indexOf("single-quextend_port_items-fullscreen") >
          -1) == false
    );
  }
  if (arg == "currbody") {
    return (
      window.qucreative_options.bg_isparallax == "on" &&
      _body.attr("class").indexOf("page-homepage") == -1 &&
      _body.attr("class").indexOf("page-gallery-w-thumbs") == -1 &&
      (_body.attr("class").indexOf("page-portfolio-single") > -1 &&
        _body.attr("class").indexOf("page-portfolio-type-image") > -1 &&
        _body.attr("class").indexOf("single-quextend_port_items-fullscreen") >
          -1) == false
    );
  }

  return false;
}
