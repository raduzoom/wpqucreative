import { RESPONSIVE_BREAKPOINT } from "../_qucreative.config";

$(document).delegate(
  "form.for-contact,shortcode-antfarm-contact",
  "submit",
  handle_submit,
);
$(document).on(
  "click",
  ".contact-form .contact-form-button, .map-toggler,.shortcode-antfarm-contact .contact-form-button",
  handle_mouse,
);

function handle_mouse(e) {
  var _t = $(this);

  if (_t.hasClass("qucreative--520-nav-con--placeholder")) {
    $(".nav-wrapper-head").trigger("click");
  }
  if (_t.hasClass("map-show")) {
    contact_show_map();
  }
  if (_t.hasClass("map-hide")) {
    contact_hide_map();
  }

  if (_t.hasClass("services-lightbox")) {
    _mainContainer.append('<div class="services-lightbox-overlay"></div>');
    _mainContainer.append(
      '<div class="services-lightbox-content"><div class="services-lightbox-content--content">' +
        _t.children(".lightbox-content").eq(0).html() +
        '</div><div class="services-lightbox--close"><i class="fa fa-times"></i></div></div>',
    );

    _mainContainer
      .children(".services-lightbox-content")
      .width(quCreative_main._theContent.width() - 60);

    var css_left = quCreative_main._theContent.offset().left + 30;
    _mainContainer.children(".services-lightbox-content").css({
      left: css_left,
      "max-width": quCreative_main.windowWidth - css_left,
    });

    if (quCreative_main.windowWidth < RESPONSIVE_BREAKPOINT) {
      _mainContainer.children(".services-lightbox-content").css({
        left: "",
        width: "",
      });
    }

    setTimeout(function () {
      _mainContainer
        .children(".services-lightbox-overlay,.services-lightbox-content")
        .addClass("active");

      setTimeout(function () {
        _mainContainer
          .children(".services-lightbox-content")
          .addClass("active-content");
      }, 300);
    }, 100);

    if (_mainContainer.get(0) && _mainContainer.get(0).api_block_scroll) {
      _mainContainer.get(0).api_block_scroll();
    }

    return false;
  }

  if (
    _t.hasClass("services-lightbox--close") ||
    _t.hasClass("services-lightbox-overlay")
  ) {
    _mainContainer.children(".services-lightbox-overlay").removeClass("active");
    _mainContainer
      .children(".services-lightbox-content")
      .removeClass("active active-content");

    setTimeout(function () {
      _mainContainer
        .children(".services-lightbox-overlay,.services-lightbox-content")
        .remove();
    }, 600);

    if (_mainContainer.get(0) && _mainContainer.get(0).api_unblock_scroll) {
      _mainContainer.get(0).api_unblock_scroll();
    }

    return false;
  }
}

function handle_submit(e) {
  var _t = $(this);
  if (e.type == "submit") {
    if (_t.hasClass("for-contact")) {
      console.info("trying to submit on contact");

      var sw_error = false;

      var _c = $("input[name=the_name],input[name=name]").eq(0);

      console.info(_c);

      var _con = null;

      if (
        _t
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass("shortcode-antfarm-contact")
      ) {
        _con = _t.parent().parent().parent().parent();
      } else {
        _con = $(this);
      }

      console.warn(_con);

      if (_c.val() == "") {
        _c.addClass("needs-attention");
        _c.val("Please complete this field");

        setTimeout(function () {
          _c.removeClass("needs-attention");
          _c.val("");
        }, 2000);

        sw_error = true;
      }

      var _car = _con.find('*[aria-required="true"]');

      _car.each(function () {
        var _t2 = $(this);

        if (_t2.val() == "") {
          _t2.addClass("needs-attention");
          _t2.val("Please complete this field");

          setTimeout(function () {
            _t2.removeClass("needs-attention");
            _t2.val("");
          }, 2000);

          sw_error = true;
        }
      });

      var _c2 = _con.find("input[name=the_email],input[name=email]").eq(0);

      if (validateEmail(_c2.val()) == false) {
        _c2.addClass("needs-attention");
        _c2.val("Invalid email address");

        setTimeout(function () {
          _c2.removeClass("needs-attention");
          _c2.val("");
        }, 2000);

        sw_error = true;
      }

      if (sw_error) {
        return false;
      }

      var data = {
        postdata: _con.serialize(),
      };
      var ajaxurl = _con.attr("action");

      jQuery.post(ajaxurl, data, function (response) {
        if (window.console != undefined) {
          console.log("Got this from the server 9473: " + response);
        }
        $(".form-feedback").eq(0).addClass("active");
        _con.find("input,textarea").each(function () {
          var _t23 = $(this);

          if (_t23.attr("type") != "hidden") {
          }
          _t23.val("");
          _t23.trigger("change");
        });
        _t.find(".form-feedback").eq(0).addClass("active");
        _t.find(".form-feedback").eq(0).addClass("active-success");

        if (response.indexOf("error - ") > -1) {
          _t.find(".form-feedback span").eq(0).html("ERROR IN CONTACT SEND");
        }
        if (response.indexOf("success - ") > -1) {
          _t.find(".form-feedback span")
            .eq(0)
            .html("THANK YOU FOR YOUR MESSAGE");
        }
        setTimeout(function () {
          _t.find(".form-feedback").eq(0).removeClass("active");
        }, 2000);

        setTimeout(function () {
          _t.find(".form-feedback")
            .eq(0)
            .removeClass("active-success active-error");
        }, 2600);
      });

      return false;
    }
  }
}
