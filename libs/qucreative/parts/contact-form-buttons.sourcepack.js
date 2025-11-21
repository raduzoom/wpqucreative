



$(document).delegate(
  "form.for-contact,shortcode-antfarm-contact",
  "submit",
  handle_submit,
);

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


function validateEmail(email) {
  var re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
if (_t.hasClass("map-show")) {
  contact_show_map();
}
if (_t.hasClass("map-hide")) {
  contact_hide_map();
}



// todo: move
function contact_show_map() {
  $(".map-canvas-con").addClass("active");
}

// todo: move
function contact_hide_map() {
  $(".map-canvas-con").removeClass("active");
}