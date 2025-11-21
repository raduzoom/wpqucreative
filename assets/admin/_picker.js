export const setupPicker = () => {
  const $ = jQuery;

  $(document).on("click", ".picker-con .the-icon", function () {
    var _t = $(this);
    var _c = _t.parent().children(".picker");
    if (_c.css("display") == "none") {
      _c.fadeIn("fast");
    } else {
      _c.fadeOut("fast");
    }
  });
};
