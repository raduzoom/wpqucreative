"use strict";


export function check_animation_time(quCreative_main) {
  if(window.qucreative_view_animation_duration){
    quCreative_main.view_animation_duration = window.qucreative_view_animation_duration * 1000;
  }
}

/**
 * should do only on init todo: move to php
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


  const qcm = quCreative_main;
  if (qcm._navCon_520.children(".logo-con").length == 0) {
    qcm._navCon_520.prepend(
      qcm._navCon.children(".logo-con").clone(),
    );
  }


  let _cac = qcm._navCon_520
    .find(".dzs-select-wrapper select")
    .eq(0);

  if (
    qcm._navCon_520.children(".custom-responsive-menu").length > 0
  ) {
    qcm.custom_responsive_menu = true;
    _cac = qcm._navCon_520
      .children(".custom-responsive-menu")
      .find(".custom-menu")
      .eq(0);
  }
  qcm._navCon_520.find(".logo-con").addClass("logo-con-520");

  _cac.html("");
}


