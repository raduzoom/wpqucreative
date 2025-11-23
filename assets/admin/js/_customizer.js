/**
 *
 * @param {jQuery} thejQuery
 */
export const setupCustomizer = function ($) {
  // -- customizer code
  $(document).delegate(
    '.customize-control-checkbox-multiple input[type="checkbox"]',
    "change",
    function () {
      console.info(this);
      var checkbox_values = $(this)
        .parents(".customize-control")
        .find('input[type="checkbox"]:checked')
        .map(function () {
          return this.value;
        })
        .get()
        .join(",");

      console.info(
        $(this).parents(".customize-control").find('input[type="hidden"]'),
      );

      $(this)
        .parents(".customize-control")
        .find('input[type="hidden"]')
        .val(checkbox_values)
        .trigger("change");
    },
  );
  // -- customizer code END
}
