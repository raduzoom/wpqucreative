import { qucreative_fontArray } from "./sampledata/data.config";

export const setupResponsiveSlider = () => {
  const $ = jQuery;

  setTimeout(function () {
    $(".slider-for-responsive-slider").each(function () {
      const _t = $(this);
      var _con = _t.parent().parent();
      var _val = _con.find(".small-input").eq(0);

      _t.get(0).target_input = _val;
      _val.get(0).target_slider = _t;

      setTimeout(function () {
        try {
          const val = parseInt(_t.get(0).target_input.val(), 10);
          _t.slider({
            value: val,
            animate: "fast",
            min: 0,
            max: 100,
            step: 10,
            slide: function (e, ui) {
              var _t2 = $(this);
              _t2.get(0).target_input.val(ui.value + "%");
              _t2.get(0).target_input.trigger("change");
            },
          });
        } catch (err) {
          console.warn(err);
        }

        _val.on("change", function () {
          var _t = $(this);

          _t.get(0).target_slider.slider("value", parseInt(_t.val(), 10));
        });
      }, 100);
    });
  });
};
