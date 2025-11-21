// todo: init if we have .map-canvas
window.qcreative_gm_init = gm_initialize;

function gm_initialize() {
  $(".map-canvas").each(function () {
    var _c_ = $(this).get(0);

    var lat = -33.890542;
    var long2 = 151.274856;

    if (_c_ && _c_.getAttribute && _c_.getAttribute("data-lat")) {
      lat = _c_.getAttribute("data-lat");
    }
    if (_c_ && _c_.getAttribute && _c_.getAttribute("data-long")) {
      long2 = _c_.getAttribute("data-long");
    }

    if (!window.google || !google.maps || !google.maps.LatLng) {
      setTimeout(gm_initialize, 1000);
      return false;
    }

    var gm_position = new google.maps.LatLng(lat, long2);
    var styleOptions = [];

    if (window.str_gmaps_styling) {
      styleOptions = JSON.parse(window.str_gmaps_styling);
    }

    var mapOptions = {
      zoom: 15,
      maxZoom: 19,
      center: gm_position,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      streetViewControl: false,
      styles: styleOptions,
    };

    var map = new google.maps.Map(_c_, mapOptions);

    setTimeout(function () {}, 1000);

    var image =
        qucreative_options.theme_url + "libs/qucreative/img/marker_maps.png";

    if (
        _body.hasClass("page-normal") &&
        $(_c_).hasClass("indicator-red") == false
    ) {
    }

    var beachMarker = new google.maps.Marker({
      position: gm_position,
      map: map,
      icon: image,
    });
  });
}
