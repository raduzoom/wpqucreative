import { loadScriptIfItDoesNotExist } from "../../js/common/_dzs-common-functions";


loadScriptIfItDoesNotExist(null, 'quCreative_main').then(()=>{

  const _body = jQuery("body");
  if (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6")) {
    _body.addClass("menu-is-sticky");
  }

  console.log('window.qucreative_handle_resize_actions ->', window.qucreative_handle_resize_actions);
  window.qucreative_handle_resize_actions.push(handleResizeM56);


  window.quCreative_main.handle_resize.bind(window.quCreative_main)()
  function handleResizeM56(margs, quCreative_main) {

    const _body = quCreative_main._body;
    if (margs.place_page) {
      if (
        quCreative_main.page == "page-portfolio" ||
        quCreative_main.page == "page-portfolio-single" ||
        quCreative_main.page == "page-normal" ||
        quCreative_main.page == "page-blog" ||
        quCreative_main.page == "page-blogsingle" ||
        quCreative_main.page == "page-about" ||
        quCreative_main.page == "page-contact"
      ) {
        if (
          _body.hasClass("menu-is-sticky") &&
          _body.hasClass("content-align-right") == false &&
          _body.hasClass("content-align-left") == false &&
          quCreative_main._theContent &&
          quCreative_main._theContent.parent().hasClass("qucreative-view-fullwidth") == false &&
          (_body.hasClass("menu-type-5") || _body.hasClass("menu-type-6"))
        ) {
          // -- sticky

          quCreative_main.menu_content_space = 30;

          if (quCreative_main.windowWidth > quCreative_main.view_menuWidth + quCreative_main.content_width + quCreative_main.menu_content_space) {

            let targetL = quCreative_main.windowWidth / 2;
            targetL-=(quCreative_main.view_menuWidth + quCreative_main.content_width) / 2;
            targetL-=quCreative_main.menu_content_space / 2;

            quCreative_main._navCon.css({
              left:
              targetL,
            });
          } else {
            // -- tbc
            quCreative_main._navCon.css({
              left: "",
            });
            quCreative_main._theContent.css({
              left: "",
              "margin-left": "",
              "margin-right": "",
            });
          }
        }
      }
    }
  }

});
