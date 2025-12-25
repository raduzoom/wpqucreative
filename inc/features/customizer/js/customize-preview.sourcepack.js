/**
 * Live-update changed settings in real time in the Customizer preview.
 *
 *  -- this is in the theme not the admin
 */

import { setupSocialIcons } from "./_socialIcons";
import { replace_font } from "./_customizerUtil";

(function ($) {
  const theWp = wp;
  const api = wp.customize;

  setupSocialIcons(theWp);

  wp.customize("typography_sidebar_heading_style", function (value) {
    value.bind(function (newval) {
      console.warn("newval - ", newval);
      replace_font(newval, ".sidebar-main .widget-title");
    });
  });

  wp.customize("typography_footer_heading_style", function (value) {
    value.bind(function (newval) {
      console.warn("newval - ", newval);
      replace_font(newval, ".upper-footer .widget-title");
    });
  });

  // -- Site title.
  api("blogname", function (value) {
    value.bind(function (to) {
      $(".site-title a").text(to);
    });
  });

  // -- Site tagline.
  api("blogdescription", function (value) {
    value.bind(function (to) {
      $(".site-description").text(to);
    });
  });

  // -- Color Scheme CSS.
  api.bind("preview-ready", function () {});
})(jQuery);

jQuery(document).ready(function ($) {});
