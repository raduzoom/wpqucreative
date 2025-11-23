/**
 *
 * @param {jQuery} thejQuery
 */
export const setupColorPicker = function () {

  var inter_change_color = 0;
  var colorpicker_args = {
    // -- you can declare a default color here,
    // -- or in the data-default-color attribute on the input
    defaultColor: false,
    // -- a callback to fire whenever the color changes to a valid color
    change: function (event, ui) {
      console.info(
        "colorpicker changed",
        event,
        ui,
        event.target,
        $(event.target),
      );

      clearTimeout(inter_change_color);
      inter_change_color = setTimeout(function () {
        $(event.target).trigger("change");
      }, 500);
    },
    // -- a callback to fire when the input is emptied or an invalid color
    clear: function () {},
    // -- hide the color picker controls on load
    hide: true,
    // --show a group of common colors beneath the square
    // -- or, supply an array of colors to customize further
    palettes: true,
  };

  if ($.fn.wpColorPicker) {
    $(".dzswp-color-picker").wpColorPicker(colorpicker_args);
    setTimeout(function () {
      $(".dzswp-color-picker").wpColorPicker(colorpicker_args);
    }, 1000);
  }
}
