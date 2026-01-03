export function qucreative_view_calculateDims(pargs) {
    // -- only executes

    var margs = {
      ignore_menu: false,
      placew: true,
      place_page: true,
      redraw_canvas: true,
      calculate_sidebar_main_is_bigger: true,
    };

    if (pargs) {
      margs = $.extend(margs, pargs);
    }

    _body.removeClass("resizing");

    window.qucreative_calculate_dims_actions.forEach((reinitAction) => {
      reinitAction();
    });

    if (_body.hasClass("page-is-fullwidth")) {
      if (_body.hasClass("menu-type-9") || _body.hasClass("menu-type-10")) {
        setTimeout(function () {
          if (qcm._mainContainer.get(0) && qcm._mainContainer.get(0).api_handle_wheel) {
            qcm._mainContainer.get(0).api_handle_wheel();
          }
        }, 100);
      }
    }

    if (window.qucreative_options.bg_isparallax == "on") {
      setTimeout(function () {
        if (
          qcm._mainBg.get(0) &&
          qcm._mainBg.get(0).api_handle_scroll
        ) {
          qcm._mainBg.get(0).api_handle_scroll(null, {
            from: "qcre",
            force_th: qcm.bigimageheight,
            force_ch: qcm.windowHeight,
          });
        }
      }, 100);
    }

    $(".height-same-as-width").each(function () {
      var _t23 = $(this);

      _t23.height(_t23.width());
    });

    if (window.preseter_init) {
      var _cach = $(".preseter-content-con").eq(0);

      var _cach_cont = _cach.find(".the-content").eq(0);

      _cach_cont.scrollTop(0);

      if (
        110 + _cach_cont.find(".the-content-inner-inner").height() + 56 >
        qcm.windowHeight
      ) {
        _cach.outerHeight(qcm.windowHeight - 110);
        _cach.removeClass("auto-height");
        _cach.addClass("needs-scrolling");

        _cach_cont.find(".the-bg").eq(0).css({});
      } else {
        _cach.css("height", "auto");
        _cach.addClass("auto-height");
        _cach.removeClass("needs-scrolling");

        _cach_cont.find(".the-content-inner-inner").css({
          "padding-right": "",
          width: "",
        });
        _cach_cont.find(".the-bg").eq(0).css({
          right: "",
          width: "",
        });
      }
    }

}
