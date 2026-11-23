import { loadScriptIfItDoesNotExist } from "../../js/common/_dzs-common-functions";


// -- overlay menus

loadScriptIfItDoesNotExist(null, 'quCreative_main').then(()=>{


  // todo: maybe some kind of init link
  const qcm = window.quCreative_main;
  const $ = jQuery;

  const $menuTogglerTarget =   qcm._mainContainer
    .find(".menu-toggler-target")
;

  $menuTogglerTarget.eq(0)
    .append(qcm._navCon.find(".the-actual-nav").eq(0));



  $(document).on(
    "click",
    ".qu-overlay-menu-closer,.qu-overlay-menu-toggler",
    handle_mouse,
  );
  // -- the toggler and closer are role="button": Enter and Space work like a click, Escape closes
  $(document).on("keydown", ".qu-overlay-menu-closer,.qu-overlay-menu-toggler", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $(this).trigger("click");
    }
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $menuTogglerTarget.eq(0).hasClass("active")) {
      setMenuOpen(false);
    }
  });


  function handle_mouse(e) {
    const _t = $(this);


    if (e) {

      if (e.type == "click") {
        if (_t.hasClass("qu-overlay-menu-toggler") || _t.hasClass("qu-overlay-menu-closer")) {
          setMenuOpen(!$menuTogglerTarget.eq(0).hasClass("active"));
        }
      }
    }
  }

  function setMenuOpen(isOpen) {
    $menuTogglerTarget.eq(0).toggleClass("active", isOpen);
    $(".qu-overlay-menu-toggler").attr("aria-expanded", isOpen ? "true" : "false");
    // -- keyboard focus follows the menu: into it when it opens, back to the toggler when it closes
    if (isOpen) {
      // -- a moment later: the menu fades in from visibility: hidden, which can't take focus
      setTimeout(() => {
        $menuTogglerTarget.eq(0).find(".qu-overlay-menu-closer").trigger("focus");
      }, 50);
    } else if ($menuTogglerTarget.eq(0).find(document.activeElement).length) {
      $(".qu-overlay-menu-toggler").eq(0).trigger("focus");
    }
  }
});