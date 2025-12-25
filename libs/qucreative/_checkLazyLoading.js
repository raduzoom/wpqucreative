export function quSetupCheckLazyLoading() {
  const $ = jQuery;


  // -- init lazy loading
  if (!window.dzs_check_lazyloading_images_inited) {
    window.dzs_check_lazyloading_images_inited = true;

    $(window).bind("scroll", window.dzs_check_lazyloading_images);
    window.dzs_check_lazyloading_images();
    setTimeout(function () {
      window.dzs_check_lazyloading_images();
    }, 1500);
    setTimeout(function () {
      window.dzs_check_lazyloading_images();
    }, 2500);
  } else {
    if (window.dzs_check_lazyloading_images) {
      window.dzs_check_lazyloading_images();
      setTimeout(function () {
        if (window.dzs_check_lazyloading_images) {
          window.dzs_check_lazyloading_images();
        }
      }, 1000);
      setTimeout(function () {
        if (window.dzs_check_lazyloading_images) {
          window.dzs_check_lazyloading_images();
        }
      }, 2000);
      setTimeout(function () {
        if (window.dzs_check_lazyloading_images) {
          window.dzs_check_lazyloading_images();
        }
      }, 3000);
    }
  }
}
