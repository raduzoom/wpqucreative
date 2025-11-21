
export function is_touch_device() {
  return !!('ontouchstart' in window);
}

export function can_history_api() {
  return !!(window.history && history.pushState);
}

export function initObjectSizeProto(){

  Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  (function ($) {
    $.fn.descendantOf = function (parentId) {
      return this.closest(parentId).length != 0;
    }
  })(jQuery)
}

export function get_query_arg(purl, key) {

  if (purl.indexOf(key + '=') > -1) {
    var regexS = "[?&]" + key + "=.+";
    var regex = new RegExp(regexS);
    var regtest = regex.exec(purl);


    if (regtest != null) {
      var splitterS = regtest[0];
      if (splitterS.indexOf('&') > -1) {
        var aux = splitterS.split('&');
        splitterS = aux[1];
      }
      var splitter = splitterS.split('=');

      return splitter[1];

    }

  }
}

export function getBrowserScrollSize() {

  var css = {
    "border": "none",
    "height": "200px",
    "margin": "0",
    "padding": "0",
    "width": "200px"
  };

  var inner = jQuery("<div>").css(jQuery.extend({}, css));
  var outer = jQuery("<div>").css(jQuery.extend({
    "left": "-1000px",
    "overflow": "scroll",
    "position": "absolute",
    "top": "-1000px"
  }, css)).append(inner).appendTo("body")
    .scrollLeft(1000)
    .scrollTop(1000);

  var scrollSize = {
    "height": (outer.offset().top - inner.offset().top) || 0,
    "width": (outer.offset().left - inner.offset().left) || 0
  };

  outer.remove();
  return scrollSize;
}
