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
    const qcm = window.quCreative_main;
    const newclass_body_page = qcm ? qcm.newclass_body_page : "";
    const newclass_content_con = (qcm && qcm.newclass_content_con) || "";
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
    const bodyClass = document.body.className;
    return (
      window.qucreative_options.bg_isparallax == "on" &&
      bodyClass.indexOf("page-homepage") == -1 &&
      bodyClass.indexOf("page-gallery-w-thumbs") == -1 &&
      (bodyClass.indexOf("page-portfolio-single") > -1 &&
        bodyClass.indexOf("page-portfolio-type-image") > -1 &&
        bodyClass.indexOf("single-quextend_port_items-fullscreen") >
          -1) == false
    );
  }

  return false;
}
