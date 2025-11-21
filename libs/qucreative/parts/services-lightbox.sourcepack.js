import { RESPONSIVE_BREAKPOINT } from "../_qucreative.config";



$(document).on(
  "click",
  ".services-lightbox--close,.services-lightbox-overlay.active,.services-lightbox",
  handle_mouse,
);



function handle_mouse(e) {
  var _t = $(this);
  if (_t.hasClass("services-lightbox")) {
    _mainContainer.append(
      '<div class="services-lightbox-overlay"></div>',
    );
    _mainContainer.append(
      '<div class="services-lightbox-content"><div class="services-lightbox-content--content">' +
      _t.children(".lightbox-content").eq(0).html() +
      '</div><div class="services-lightbox--close"><i class="fa fa-times"></i></div></div>',
    );

    _mainContainer
      .children(".services-lightbox-content")
      .width(quCreative_main._theContent.width() - 60);

    var css_left = quCreative_main._theContent.offset().left + 30;
    _mainContainer.children(".services-lightbox-content").css({
      left: css_left,
      "max-width": quCreative_main.windowWidth - css_left,
    });

    if (quCreative_main.windowWidth < RESPONSIVE_BREAKPOINT) {
      _mainContainer.children(".services-lightbox-content").css({
        left: "",
        width: "",
      });
    }

    setTimeout(function() {
      _mainContainer
        .children(".services-lightbox-overlay,.services-lightbox-content")
        .addClass("active");

      setTimeout(function() {
        _mainContainer
          .children(".services-lightbox-content")
          .addClass("active-content");
      }, 300);
    }, 100);

    if (_mainContainer.get(0) && _mainContainer.get(0).api_block_scroll) {
      _mainContainer.get(0).api_block_scroll();
    }

    return false;
  }

  if (
    _t.hasClass("services-lightbox--close") ||
    _t.hasClass("services-lightbox-overlay")
  ) {
    _mainContainer
      .children(".services-lightbox-overlay")
      .removeClass("active");
    _mainContainer
      .children(".services-lightbox-content")
      .removeClass("active active-content");

    setTimeout(function() {
      _mainContainer
        .children(".services-lightbox-overlay,.services-lightbox-content")
        .remove();
    }, 600);

    if (
      _mainContainer.get(0) &&
      _mainContainer.get(0).api_unblock_scroll
    ) {
      _mainContainer.get(0).api_unblock_scroll();
    }

    return false;
  }

}