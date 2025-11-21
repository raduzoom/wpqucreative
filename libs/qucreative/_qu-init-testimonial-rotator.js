"use strict";


export const qu_reinitDzsTaa = () => {
  if (window.dzstaa_init) {
    dzstaa_init(".dzs-tabs.auto-init-from-q", {
      init_each: true,
    });
    dzstaa_init(".dzs-tabs.auto-init-from-q-for-tabs", {
      design_tabsposition: "top",
      design_transition: "fade",
      design_tabswidth: "default",
      toggle_breakpoint: "300",
      settings_appendWholeContent: false,
      toggle_type: "accordion",
    });

    var args = {
      design_tabsposition: "top",
      design_transition: "fade",
      design_tabswidth: "default",
      toggle_breakpoint: "4000",
      settings_appendWholeContent: false,
      settings_startTab: -1,
      toggle_type: "accordion",
    };

    dzstaa_init(".dzs-tabs.auto-init-from-q-for-accordions", args);
  }

}


