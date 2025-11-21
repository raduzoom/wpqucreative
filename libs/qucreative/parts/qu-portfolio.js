



$(document).on(
  "click",
  ".portfolio-single-liquid-info,.arrow-left-for-skin-qucreative,.arrow-right-for-skin-qucreative",
  handle_mouse,
);


function handle_mouse(e) {
  var _t = $(this);
  if (e.type == "click") {
    if (_t.hasClass("portfolio-single-liquid-info")) {
      if (_mainContainer.get(0) && _mainContainer.get(0).api_scrolly_to) {
        _mainContainer.find(".scrollbary").eq(0).addClass("animatetoptoo");
        setTimeout(function () {
          var aux = quCreative_main._theContent
            .find(".desc-content-wrapper h3")
            .eq(0)
            .offset().top;
          _mainContainer.get(0).api_scrolly_to(aux, {
            force_no_easing: "off",
          });
        }, 50);
      } else {
        var aux = quCreative_main._theContent
          .find(".desc-content-wrapper h3")
          .eq(0)
          .offset().top;
        $("html, body").animate(
          {
            scrollTop: aux - 150,
          },
          300,
          "swing",
        );
      }
    }


    if (_t.hasClass("arrow-left-for-skin-qucreative")) {
      if (
        quCreative_main._theContent.find(".advancedscroller").get(0) &&
        quCreative_main._theContent.find(".advancedscroller").get(0)
          .api_gotoPrevPage
      ) {
        quCreative_main._theContent
          .find(".advancedscroller")
          .get(0)
          .api_gotoPrevPage();
      }
    }
    if (_t.hasClass("arrow-right-for-skin-qucreative")) {
      if (
        quCreative_main._theContent.find(".advancedscroller").get(0) &&
        quCreative_main._theContent.find(".advancedscroller").get(0)
          .api_gotoNextPage
      ) {
        quCreative_main._theContent
          .find(".advancedscroller")
          .get(0)
          .api_gotoNextPage();
      }
    }
  }
}
