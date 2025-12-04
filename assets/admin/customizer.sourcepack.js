import { setupRepeater } from "./_repeater";
import { setupDzsDependency } from "./_dzsDependency";
import { setupReturnToDefaults } from "./_returnToDefaults";
import { setupSelector } from "./_selector";
import { setupPicker } from "./_picker";
import { setupColorpicker } from "./_colorPicker";
import { setupResponsiveSlider } from "./_responsiveSlider";
import { setupMenuType } from "./_menuType";
import { setupSliders } from "./_sliders";

jQuery(document).ready(function ($) {
  setupColorpicker();

  // -- we remove


  if (window.non_default_preset) {
    $("#customize-header-actions > #save").on("click.dzs", function () {
      setTimeout(function () {}, 200);
    });
  }

  if (window.dzssel_init) {
    dzssel_init("select.dzs-style-me", { init_each: true });
  }

  setTimeout(function () {


    if (window.dzstaa_init) {
      dzstaa_init(".dzs-tabs-1");
    }

    $(".font-family-selector").trigger("change");

    setupDzsDependency();

    setupReturnToDefaults();

    setupResponsiveSlider();
  }, 2000);

  setupSliders();

  window.isSafeToRefresh = false;

  setTimeout(function () {
    window.isSafeToRefresh = true;
  }, 5000);

  setTimeout(function () {}, 12000);

  setupPicker();

  setupRepeater();
  setupSelector();
  setupMenuType();
  $(document).on(
    "click",
    " .font-customizer-field, .customizer-add-preset-lightbox-con > .close-btn, .button-primary.save",
    handle_mouse,
  );

  $(document).on("click", ".customize-section-back", function () {
    var _t = $(this);

    var _c = $(".dzs-tabs-1").eq(0);

    console.info("_c - ", _c);
    if (_c.get(0) && _c.get(0).api_goto_tab) {
      console.info("_c.get(0).api_goto_tab - ", _c.get(0).api_goto_tab);

      _c.get(0).api_close_all_tabs();
      setTimeout(function () {});
    }
  });
  Object.size = function (obj) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  function do_focus(arg) {
    setTimeout(function () {
      arg.focus();
    }, 1);
  }

  function handle_mouse(e) {
    const _t = $(this);

    if (e.type == "click") {
      if (_t.hasClass("font-customizer-field")) {
        // do_focus(_t);
      }
      if (_t.hasClass("close-btn")) {
        // do_focus(_t);

        $(".customizer-add-preset-lightbox-con").removeClass("active");
      }
      if (_t.hasClass("button-primary")) {
        if (_t.hasClass("save")) {
          $(".font-customizer-field.with_colorpicker").trigger("change");
        }
      }
    }
  }

  setTimeout(function () {
    $(".setup-slider-for-prev-input").each(function () {
      return false;
      var _t = $(this);

      var _val = _t.prev();

      _t.slider({
        value: _val.val(),
        animate: "fast",
        step: 1,
        slide: function (e, ui) {
          var _t2 = $(this);
          _t2.prev().val(ui.value);

          //console.log(this, ui, _val);
        },
      });
    });
  }, 1000);
});
