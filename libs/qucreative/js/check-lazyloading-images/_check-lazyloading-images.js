export function dzsCommon_init_lazyloadingImages(){


  window.dzs_check_lazyloading_images = function () {

    function check_scroll() {
      var st = jQuery(window).scrollTop();

      var wh = jQuery(window).height();


      if (window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll) {

        st = -(parseInt(window.dzs_check_lazyloading_images_use_this_element_css_top_instead_of_window_scroll.css('top'), 10));
      }


      jQuery('img[data-src],.divimage[data-src]').each(function () {
        var _t = jQuery(this);

        if (_t.offset().top <= st + wh + 355) {


          var auximg = new Image();

          auximg.onload = function () {


            if (_t.attr('data-src')) {

              var aux34 = _t.attr('data-src');


              if (_t.hasClass('divimage')) {
                _t.css('background-image', 'url(' + aux34 + ')');

                window.dzs_check_lazyloading_images_toberesized_arr.push(_t);

                _t.attr('data-responsive_ratio', this.naturalHeight / this.naturalWidth);

                window.dzs_check_lazyloading_image_resize();
              } else {
                _t.attr('src', aux34);
              }

              _t.attr('data-src', '');
              _t.addClass('loaded');
            }

            if (_t.hasClass('set-height-auto-after-load')) {

              _t.css('height', 'auto');
            }

            if (_t.parent().parent().parent().parent().parent().hasClass('mode-isotope')) {

              var _c = _t.parent().parent().parent().parent().parent();
              if (_c.get(0) && _c.get(0).api_relayout_isotope) {
                _c.get(0).api_relayout_isotope();
              }
            }


          }

          auximg.src = _t.attr('data-src');

        }
      })


      window.dzs_check_lazyloading_inter = 0;
      window.dzs_check_lazyloading_delayed = 0;
    }

    if (window.dzs_check_lazyloading_inter) {
      clearTimeout(window.dzs_check_lazyloading_inter);

      window.dzs_check_lazyloading_delayed++;
      if (window.dzs_check_lazyloading_delayed > 39) {
        check_scroll();
      }
    }

    window.dzs_check_lazyloading_inter = setTimeout(function () {
      check_scroll()
    }, 50);

  }

  window.dzs_check_lazyloading_image_resize = function () {

    for (var i = 0; i < window.dzs_check_lazyloading_images_toberesized_arr.length; i++) {
      var _c = window.dzs_check_lazyloading_images_toberesized_arr[i];


      _c.height(Number(_c.attr('data-responsive_ratio')) * _c.width());
    }
  }



  if (!(window.dzs_check_lazyloading_images_inited)) {

    window.dzs_check_lazyloading_images_inited = false;

    jQuery(window).bind('resize', window.dzs_check_lazyloading_image_resize)
  }


}