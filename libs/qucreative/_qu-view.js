"use strict";


export function check_animation_time(quCreative_main) {
  if(window.qucreative_view_animation_duration){
    quCreative_main.view_animation_duration = window.qucreative_view_animation_duration * 1000;
  }
}

/**
 * should do only on init todo:
 * @param quCreative_main
 * @param _body
 */
export function quBuildResponsiveMenu(quCreative_main, _body) {



  let the_select_str =
    '<select class="dzs-style-me-from-q skin-justvisible " name="the_layout"> <option value="default">default</option> <option value="random">random</option> </select>';

  if (qucreative_options.responsive_menu_type == "custom") {
    the_select_str = "";
  }

  let the_custom_menu_str = "";
  if (qucreative_options.responsive_menu_type == "custom") {
    the_select_str = "";

    the_custom_menu_str =
      '<div class="custom-responsive-menu"><div class="close-responsive-con"><i class="fa fa-times"></i></div><div class="custom-menu-con"><ul class="custom-menu"></ul></div></div>';
  }




  if (quCreative_main._theContent && quCreative_main._theContent.length) {
    if (
      quCreative_main._theContent
        .parent()
        .children(".qucreative--520-nav-con").length == 0
    ) {
      quCreative_main._theContent
        .parent()
        .prepend(
          '<div class="qucreative--520-nav-con "> <div class="dzs-select-wrapper skin-justvisible "> <div class="dzs-select-wrapper-head"> <div class="nav-wrapper-head bg-color-hg"><i class="fa fa-bars"></i></div> </div> ' +
          the_select_str +
          " </div>" +
          the_custom_menu_str +
          " </div>",
        );

      quCreative_main._navCon_520 = quCreative_main._theContent
        .parent()
        .children(".qucreative--520-nav-con")
        .eq(0);
    }
  }
}


/**
 *
 * @param {QuCreative} quCreative_main
 * @param _body
 */
export function quSetupBorderCss(quCreative_main) {

  const $ = quCreative_main.$;

  const _body = quCreative_main._body;

  _body.addClass("with-border");

  quCreative_main._mainContainer.css({
    padding: quCreative_main.border_width + "px",
  });

  if (
      _body.hasClass("qucreative-horizontal-menu") &&
      _body.hasClass("menu-is-sticky")
  ) {
    quCreative_main._navCon.css({
      top: quCreative_main.border_width + "px",
      left: quCreative_main.border_width + "px",
      width: "calc(100% - " + quCreative_main.border_width * 2 + "px)",
    });
  }
  if (_body.hasClass("qucreative-vertical-menu")) {
    quCreative_main._navCon.find(".translucent-con--for-nav-con").css({
      top: -quCreative_main.border_width + "px",
    });
  }
  if (
      _body.hasClass("qucreative-vertical-menu") &&
      _body.hasClass("menu-is-sticky")
  ) {
    quCreative_main._navCon.css({
      top: quCreative_main.border_width + "px",
      left: quCreative_main.border_width + "px",
      height: "calc(100% - " + quCreative_main.border_width * 2 + "px)",
    });
  }

  var aux = "";

  aux += '<style class="qucreative-border-css">';
  aux += ".main-gallery--descs { right: " + (0 + quCreative_main.border_width) + "px } ";
  aux +=
      ".main-gallery-buttons-con { right: " + (30 + quCreative_main.border_width) + "px } ";
  aux +=
      ".main-gallery-buttons-con { bottom: " + (-30 + quCreative_main.border_width) + "px } ";
  aux +=
      ".main-gallery-buttons-con.style2 { bottom: " +
      (30 + quCreative_main.border_width) +
      "px } ";
  if (_body.hasClass("qucreative-vertical-menu")) {
    aux += "nav.qucreative--nav-con { top: " + (0 + quCreative_main.border_width) + "px } ";
    aux +=
        "nav.qucreative--nav-con { left: " + (0 + quCreative_main.border_width) + "px } ";
    aux +=
        "nav.qucreative--nav-con { height: calc(100% - " +
        quCreative_main.border_width * 2 +
        "px); } ";
  }
  aux += "</style>";
  $("head").append(aux);
}
