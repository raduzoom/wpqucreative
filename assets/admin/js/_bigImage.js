/**
 *
 * @param {jQuery} thejQuery
 */
export const setupBigImage= ($) => {
  $(document).delegate(".input-big-image", "change", change_big_image);

  function change_big_image() {
    var _t = $(this);
    var _it = _t.parent();

    var val = _t.val();

    //console.log(_t, val);
    if (val != undefined && val != "") {
      _it.find(".dzs-img-preview-con").eq(0).fadeIn("slow");
      _it
        .find(".dzs-img-preview")
        .eq(0)
        .css({
          "background-image": "url(" + val + ")",
        });
    } else {
      _it.find(".dzs-img-preview-con").eq(0).fadeOut("slow");
    }
  }

}
