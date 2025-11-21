import { loadScriptIfItDoesNotExist } from "../../js/common/_dzs-common-functions";


// -- overlay menus

loadScriptIfItDoesNotExist(null, 'quCreative_main').then(()=>{


  // todo: maybe some kind of init link
  const qcm = window.quCreative_main;
  const $ = jQuery;

  const $menuTogglerTarget =   qcm._mainContainer
    .find(".menu-toggler-target")
;

  console.log('qcm._mainContainer -' , qcm._mainContainer);
  console.log('$menuTogglerTarget -' , $menuTogglerTarget);
  $menuTogglerTarget.eq(0)
    .append(qcm._navCon.find(".the-actual-nav").eq(0));



  $(document).on(
    "click",
    ".qu-overlay-menu-closer,.qu-overlay-menu-toggler",
    handle_mouse,
  );


  function handle_mouse(e) {
    const _t = $(this);

    console.log('_t', _t);

    if (e) {

      if (e.type == "click") {
        if (_t.hasClass("qu-overlay-menu-toggler") || _t.hasClass("qu-overlay-menu-closer")) {
          console.log('$(".menu-toggler-target")- ' , $(".menu-toggler-target"));
          $(".menu-toggler-target").eq(0).toggleClass("active");
        }
      }
    }
  }
});