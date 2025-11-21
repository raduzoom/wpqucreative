import {
  colorpicker_args,
  qucreative_fontArray,
} from "./sampledata/data.config";

export const setupColorpicker = () => {
  const $ = jQuery;
  if ($.fn.wpColorPicker) {
    $(".dzswp-color-picker").wpColorPicker(colorpicker_args);
    setTimeout(function () {
      $(".dzswp-color-picker").wpColorPicker(colorpicker_args);
    }, 1000);
  }
};
