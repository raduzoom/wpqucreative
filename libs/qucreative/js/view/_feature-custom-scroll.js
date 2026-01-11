/**
 *
 * @param {QuCreative} qcm
 */
export function qucreative_view_featureCustomScroll(qcm) {

  const $ = jQuery;

  const _contpar = qcm._theContent.parent();
  const windowhref = window.location.href;

  let posY = 0;
  if (_contpar.attr("data-scroll-to")) {
    if (_contpar.attr("data-scroll-to-pixel")) {
      posY = Number(_contpar.attr("data-scroll-to-pixel"));
    }
    if (_contpar.attr("data-scroll-to") == "browser-bottom") {
      posY = qcm.windowHeight;
    }
  } else {
    const targetid = windowhref.split("#")[1];

    let _c4 = null;
    if (targetid) {
      _c4 = $("#" + targetid).eq(0);
      if (_c4 && _c4.length && _c4.offset()) {
        posY = Number(_c4.offset().top) - 200;
      }
    }
  }

  if (posY) {
    setTimeout(function () {
      if (!(qcm._mainContainer.get(0) && qcm._mainContainer.get(0).api_scrolly_to)) {
        if (_contpar.attr("data-scroll-to")) {
          $(window).scrollTop(posY);
        }
      }
    }, 1000);
  }
}
