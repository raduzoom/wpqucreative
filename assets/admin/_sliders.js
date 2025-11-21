export const setupSliders = () => {
  const $ = jQuery;

  setTimeout(function () {
    $("#slider-for-line_spacing").slider({
      value: $('*[name="line_spacing"]').val(),
      min: 0,
      max: 100,
      slide: function (event, ui) {
        $('*[name="line_spacing"]').val(ui.value);
        $('*[name="line_spacing"]').trigger("change");
      },
    });
    const $titleDivider = $('*[name="title_divider_spacing"]');
    const titleDividerVal = $('*[name="title_divider_spacing"]').val();
    $("#slider-for-title_divider_spacing").slider({
      value: titleDividerVal,
      min: 0,
      max: 100,
      slide: function (event, ui) {
        $titleDivider.val(ui.value);
        $titleDivider.trigger("change");
      },
    });
    $("#slider-for-title_divider_spacing_two").slider({
      value: titleDividerVal,
      min: 0,
      max: 100,
      slide: function (event, ui) {
        $titleDivider.val(ui.value);
        $titleDivider.trigger("change");
      },
    });
  });
};
