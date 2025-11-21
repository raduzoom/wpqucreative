export function dzsQuc_initAdvancedScrollers() {
  window.init_advanced_scrollers = function () {
    function really_init() {
      dzsas_init(".advancedscroller.auto-init-from-q.clients-slider", {
        init_each: true,
        settings_swipe: "on",
        settings_swipeOnDesktopsToo: "on",
        design_itemwidth: "16.666667%",
        responsive_720_design_itemwidth: "25%",
      });

      $(
        ".advancedscroller.skin-qucreative.auto-init-from-q,.advancedscroller.skin-trumpet.auto-init-from-q",
      ).each(function () {
        var _t = $(this);

        if (_t.hasClass("inited")) {
          if (_t.get(0) && _t.get(0).api_handleResize) {
            _t.get(0).api_handleResize();
          }
        } else {
          dzsas_init(_t, {
            init_each: true,
          });
        }
      });

      $(".advancedscroller.testimonial-ascroller").each(function () {
        var _t = $(this);

        if (_t.hasClass("inited")) {
          if (_t.get(0) && _t.get(0).api_handleResize) {
            _t.get(0).api_handleResize();
          }
        } else {
          var args = {
            settings_mode: "onlyoneitem",
            design_arrowsize: "0",
            settings_swipe: "on",
            settings_swipeOnDesktopsToo: "on",
            settings_slideshow: "on",
            settings_slideshowTime: "300",
            settings_transition: "slide",
            settings_lazyLoading: "on",
            settings_lazyLoading_load_otheritems_after_loading_first_items:
              "on",
            settings_autoHeight: "off",
            settings_centeritems: false,
            design_bulletspos: "bottom",
            settings_wait_for_do_transition_call: "off",
            settings_transition_only_when_loaded: "off",
          };

          window.temp_options = {};
          if (_t.attr("data-options")) {
            var aux = _t.attr("data-options");

            try {
              args = $.extend(args, JSON.parse(aux));
            } catch (err) {
              console.error(err);
            }
          }

          dzsas_init(_t, args);
        }
      });

      $('.advancedscroller.skin-nonav.auto-init-from-q:not(".inited")').each(
        function () {
          var _t21 = $(this);
          var args = {
            init_each: true,
            settings_swipe: "on",
            settings_swipeOnDesktopsToo: "on",
          };

          if (_t21.attr("data-options")) {
            var aux = _t21.attr("data-options");

            try {
              args = $.extend(args, JSON.parse(aux));
            } catch (err) {
              console.error(err);
            }
          }

          if (_t21.hasClass("inited") == false) {
            dzsas_init(_t21, args);
          }
        },
      );

      $(".advancedscroller.auto-init-from-q").each(function () {
        var _t = $(this);

        if (_t.hasClass("inited")) {
          if (_t.get(0) && _t.get(0).api_handleResize) {
            _t.get(0).api_handleResize();
          }
        } else {
          var args = {
            init_each: true,
            settings_swipe: "on",
            settings_swipeOnDesktopsToo: "on",
          };

          window.temp_options = {};
          if (_t.attr("data-options")) {
            var aux = _t.attr("data-options");

            try {
              args = $.extend(args, JSON.parse(aux));
            } catch (err) {
              console.error(err);
            }
          }

          dzsas_init(_t, args);
        }
      });

      setTimeout(function () {
        $(".testimonial-ascroller").each(function () {
          var _t = $(this);

          if (_t.get(0) && _t.get(0).api_force_resize) {
            _t.get(0).api_force_resize();
          }
        });
      }, 100);
    }

    var $ = jQuery;

    if (window.dzsas_init) {
      really_init();
    } else {
      setTimeout(function () {
        if (window.dzsas_init) {
          really_init();
        } else {
          setTimeout(function () {
            if (window.dzsas_init) {
              really_init();
            }
          }, 3000);
        }
      }, 1000);
    }
  };
}
