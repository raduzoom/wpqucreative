import { RESPONSIVE_BREAKPOINT } from './_qucreative.config'




export const qu_setupActions = () => {

  const $ = jQuery;

  const _body = $("body");




  $(document).on(
    "click",
    ".main-gallery-buttons-con > *, .close-responsive-con, .custom-menu a",
    handle_mouse,
  );

  $(document).on("submit", "form.search-form", function () {
    const _t = $(this);

    var _c = _t.find("*[name=s]").eq(0);

    if (_c.val() == "") {
      return false;
    }
  });
  $(document).on(
      "click",
      ".submit-comment,.description-wrapper--icon-con,.submenu-toggler,a[data-vc-container]",
      handle_mouse,
  );



  $(document).on(
      "mouseover",
      ".search-submit.screen-reader-text",
      function () {
        $(this).addClass("hovered");
        $(this).parent().addClass("hovered");
      },
  );


  if (qucreative_options.menu_scroll_method == "mousemove") {
    quCreative_main._navCon.bind("mousemove", handle_mouse);
  }







  function handle_mouse(e) {
    const _t = $(this);

    if (e) {

      if (e.type == "click") {


        if (_t.parent().hasClass("has-children") && _t.attr("href") == "#") {
          _t.parent().children(".submenu-toggler").trigger("click");

          return false;
        }

        if (_t.hasClass("submenu-toggler")) {
          _t.parent().toggleClass("children-active");

          var _cach = _t.parent().children("ul").eq(0);
          submenu_animate_size(_cach);
        }
        if (_t.hasClass("close-responsive-con")) {
          if (quCreative_main.custom_responsive_menu) {
            _body.removeClass("custom-responsive-menu-active");
            if (
                quCreative_main._mainContainer.get(0) &&
                quCreative_main._mainContainer.get(0).api_unblock_scroll
            ) {
              quCreative_main._mainContainer.get(0).api_unblock_scroll();
            }
          }
        }





        if (_t.hasClass("description-wrapper--icon-con")) {
          _t.parent().toggleClass("active");
        }
      }
    }
  }








  /**
   * todo: move only if has submenu
   * @param _arg
   */
  function submenu_animate_size(_arg) {
    // -- _arg is the ul element

    if (_arg.css("display") == "none") {
      var auxh = _arg.eq(0).height();

      if (_arg.parent().parent().hasClass("custom-menu")) {
        _arg.css("display", "block");
        _arg.css("height", "auto");

        _arg.css({
          display: "block",
          height: "0",
        });
        _arg.animate(
            {
              height: auxh + "px",
            },
            {
              queue: false,
              duration: 300,
              complete: function (e) {
                $(this).css("height", "");
              },
            },
        );
      }

      if (_arg.parent().parent().parent().parent().hasClass("custom-menu")) {
        var _cach_parent = _arg.parent().parent();
        var _cach_parent_orig_h = _cach_parent.height();

        setTimeout(function () {
          _arg.css({
            display: "block",
            height: "auto",
          });

          targeth = _arg.height();
          var _cach_parent_targeth = _cach_parent.height();

          _cach_parent.css({
            display: "block",
            height: _cach_parent_orig_h + "px",
          });
          _cach_parent.animate(
              {
                height: _cach_parent_targeth + "px",
              },
              {
                queue: false,
                duration: 300,
                complete: function (e) {
                  $(this).css("height", "");
                },
              },
          );

          _arg.css({
            display: "block",
            height: "0",
          });
          _arg.animate(
              {
                height: auxh + "px",
              },
              {
                queue: false,
                duration: 300,
                complete: function (e) {
                  $(this).css("height", "");
                },
              },
          );
        }, 50);
      }
    } else {
      // -- close submenu

      if (_arg.parent().parent().hasClass("custom-menu")) {
        _arg.animate(
            {
              height: 0,
            },
            {
              queue: false,
              duration: 300,
              complete: function (e) {
                console.info(this);

                $(this).css("display", "none");
                $(this).css("height", "");
              },
            },
        );
      }

      if (_arg.parent().parent().parent().parent().hasClass("custom-menu")) {
        var _cach_parent = _arg.parent().parent();
        var _cach_parent_orig_h = _cach_parent.height();

        setTimeout(function () {
          _arg.css({
            display: "block",
            height: "0",
          });

          var targeth = _arg.height();
          var _cach_parent_targeth = _cach_parent.height();

          _cach_parent.css({
            display: "block",
            height: _cach_parent_orig_h + "px",
          });
          _cach_parent.animate(
              {
                height: _cach_parent_targeth + "px",
              },
              {
                queue: false,
                duration: 300,
                complete: function (e) {
                  console.info(this);

                  $(this).css("height", "");
                },
              },
          );

          _arg.css({
            display: "block",
            height: "",
          });
          _arg.animate(
              {
                height: "0",
              },
              {
                queue: false,
                duration: 300,
                complete: function (e) {
                  $(this).css("display", "none");
                  $(this).css("height", "");
                },
              },
          );
        }, 50);
      }
    }
  }







}
