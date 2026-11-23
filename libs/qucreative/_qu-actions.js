import { RESPONSIVE_BREAKPOINT } from './_qucreative.config'




export const qu_setupActions = () => {

  const $ = jQuery;





  $(document).on(
    "click",
    ".main-gallery-buttons-con > *",
    handle_mouse,
  );

  $(document).on("submit", "form.search-form", function () {
    const _t = $(this);

    var _c = _t.find("*[name=s]").eq(0);

    if (_c.val() == "") {
      return false;
    }
  });
  $(document).on(
      "click",
      ".submit-comment,.description-wrapper--icon-con,a[data-vc-container]",
      handle_mouse,
  );



  $(document).on(
      "mouseover",
      ".search-submit.screen-reader-text",
      function () {
        $(this).addClass("hovered");
        $(this).parent().addClass("hovered");
      },
  );


  if (qucreative_options.menu_scroll_method == "mousemove") {
    quCreative_main._navCon.bind("mousemove", handle_mouse);
  }







  function handle_mouse(e) {
    const _t = $(this);

    if (e) {

      if (e.type == "click") {


        if (_t.hasClass("description-wrapper--icon-con")) {
          _t.parent().toggleClass("active");
        }
      }
    }
  }
}
