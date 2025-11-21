
jQuery(document).ready(function ($) {
  $(document).on(
    "click",
    " .qucreative--520-nav-con .dzs-select-wrapper-head,.qucreative--520-nav-con--placeholder",
    handle_mouse,
  );
  setTimeout(function() {


    $(".qucreative--520-nav-con .dzs-select-wrapper-head").bind(
      "click",
      handle_mouse,
    );
  }, 1000);

  function handle_mouse(e) {
    const _t = $(this);
    const _body = $('body');
    if (_t.hasClass("dzs-select-wrapper-head")) {
      if (quCreative_main.custom_responsive_menu) {
        _body.addClass("custom-responsive-menu-active");
        if (
          quCreative_main._mainContainer.get(0) &&
          quCreative_main._mainContainer.get(0).api_block_scroll
        ) {
          quCreative_main._mainContainer.get(0).api_block_scroll();
        }
      }
    }

    if (_t.hasClass("qucreative--520-nav-con--placeholder")) {
      $(".nav-wrapper-head").trigger("click");
    }
  }
})