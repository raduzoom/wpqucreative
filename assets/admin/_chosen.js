export const setupChosen = () => {
  const $ = jQuery;

  const isChosenDefined = !!$.fn.chosen;
  if (isChosenDefined) {
    $(".font-family-selector").chosen({
      width: "100%",
    });

    $(".weights-feeder,.chosen-select,.link-to-selector")
      .chosen({
        width: "100%",
        disable_search: true,
      })
      .on("change", function (evt, params) {
        setTimeout(function () {
          $(this).removeClass("chosen-container-active");
          $("#additionalDetails").focus();
        }, 0);
      });
  }

  $(document).on("click", ".chosen-search > input", function () {
    var _t = $(this);
  });
};
