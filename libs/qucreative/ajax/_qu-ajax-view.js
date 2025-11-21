import {
  regex_ajax_find_links,
  regex_ajax_find_scripts,
} from "../_qucreative.config";
import { adjustZoombox } from "../_adjustZoombox";

export function quAjax_view_loadFromNewPage(ajaxOptions) {

  let $ = jQuery;
  const _body = $('body');
  const theResponse = ajaxOptions.response;




  if (theResponse.indexOf("widget_media_video") > -1) {
    ajaxOptions.scripts_tobeloaded.push(
      window.qucreative_options.site_url +
      "/wp-includes/js/mediaelement/mediaelement-and-player.min.js",
    );
    ajaxOptions.scripts_tobeloaded.push(
      window.qucreative_options.site_url +
      "/wp-includes/js/mediaelement/wp-mediaelement.min.js",
    );
  }



  var regex_bodyclass = /<body.*?class="(.*?)"/g;
  var regex_bodyclass_page2 =
    /<body.*?class=".*?(page-(?:blogsingle|homepage|gallery-w-thumbs|normal|contact|about|contact|portfolio|portfolio-single))[ |"]/g;
  var regex_the_content_con_class = /<div class="(the-content-con.*?)"/g;
  var regex_menu_type = /menu-type-\d*/g;


  var aux23 = regex_bodyclass.exec(theResponse);

  quCreative_main.newclass_body = "";
  quCreative_main.newclass_body_page = "";

  if (aux23) {
    if (aux23[1]) {
      quCreative_main.newclass_body = aux23[1];
    }
  }

  aux23 = regex_bodyclass_page2.exec(theResponse);

  if (aux23) {
    if (aux23[1]) {
      quCreative_main.newclass_body_page = aux23[1];
    }
  }

  aux23 = regex_the_content_con_class.exec(theResponse);
  if (aux23) {
    if (aux23[1]) {
      quCreative_main.newclass_content_con = aux23[1];
    }
  }

  quCreative_main.newclass_body += " q-inited q-inited-bg";

  var tempMenuClass = regex_menu_type.exec(_body.attr("class"));

  quCreative_main.newclass_body = quCreative_main.newclass_body.replace(
    /menu-type-\d*/g,
    "",
  );

  if (tempMenuClass && tempMenuClass[0]) {
    quCreative_main.newclass_body += " " + tempMenuClass[0];
  }

  quCreative_main.newclass_body_nopadding = false;
  quCreative_main.newclass_body_with_fullbg = false;

  var match = null;

  while ((match = regex_ajax_find_scripts.exec(theResponse))) {
    if (match[1]) {
      var sw = false;

      for (var j = 0; j < quCreative_main.scripts_loaded_arr.length; j++) {
        var aux = match[1];
        if (aux.indexOf("&") > -1) {
          aux = aux.split("&")[0];
        }

        if (
          match[1] == "" ||
          quCreative_main.scripts_loaded_arr[j] == match[1] ||
          ajax_site_url + quCreative_main.scripts_loaded_arr[j] == match[1]
        ) {
          sw = true;
        }
      }

      if (sw == false && match[1]) {
        ajaxOptions.scripts_tobeloaded.push(match[1]);
      }
    }
  }

  while ((match = regex_ajax_find_links.exec(theResponse))) {
    if (match[2]) {
      var sw = false;

      for (var j = 0; j < quCreative_main.scripts_loaded_arr.length; j++) {
        if (
          match[1] ||
          match[2] == "" ||
          quCreative_main.scripts_loaded_arr[j] == match[2] ||
          ajax_site_url + quCreative_main.scripts_loaded_arr[j] == match[2] ||
          String(match[0]).indexOf("stylesheet") == -1
        ) {
          sw = true;
        }
      }

      if (sw == false && match[2]) {
        ajaxOptions.stylesheets_tobeloaded.push(match[2]);
      }
    }
  }

  var regex_env =
    /<style.*?id='qucreative-inline-css'.*?>([\s|\S]*?)<\/style>/gim;

  while ((match = regex_env.exec(theResponse))) {
    if (match[1]) {
      if (window.qucreative_env_style_index > 2) {
        $(
          ".qucreative-inline-css" + (window.qucreative_env_style_index - 2),
        ).remove();
      }

      _body.append(
        '<style class="qucreative-inline-css' +
        window.qucreative_env_style_index +
        '">' +
        match[1] +
        "</style>",
      );

      window.qucreative_env_style_index++;
    }
  }

  var regex_vc_custom =
    /<style.*?data-type="vc_shortcodes-custom-css">([\s|\S]*?)<\/style>/gim;

  while ((match = regex_vc_custom.exec(theResponse))) {
    if (match[1]) {
      if (window.qucreative_env_style_index > 2) {
        $(
          ".vc_shortcodes-custom-css" + (window.qucreative_env_style_index - 2),
        ).remove();
      }

      _body.append(
        '<style class="vc_shortcodes-custom-css' +
        window.qucreative_env_style_index +
        '">' +
        match[1] +
        "</style>",
      );

      window.qucreative_env_style_index++;
    }
  }

  var regex_env =
    /<div class="map-canvas-con">([\s|\S]*?)<\/div>\<!--end map canvas con-->/gim;

  while ((match = regex_env.exec(theResponse))) {
    if (match[1]) {
      if ($(".map-canvas-con").length) {
        $(".map-canvas-con").html(match[1]);
      } else {
        _body.append('<div class="map-canvas-con">' + match[1] + "</div>");
      }
    }
  }

  var regex_footer_extra =
    /<div class="footer-extra-zoombox-items">([\s|\S]*?)<span style="display: none;">dzs2<\/span><\/div>/gm;

  var aux = regex_footer_extra.exec(theResponse);

  if (aux) {
    if (aux[1]) {
      ajaxOptions.new_footer_extra_content_html = aux[1];
    }
  }

  const regex_mo =
    /<div.*?class="qucreative-option-feed"(.*?)>([\s|\S]*?)<\/div>/gim;

  while ((match = regex_mo.exec(theResponse))) {
    if (match[1]) {
      if (match[1].indexOf("mainoptions") > -1) {
        try {
          let tempFindOptions = JSON.parse(match[2]);

          quCreative_main.qcreative_overwrite_mainoptions(tempFindOptions);
        } catch (err) {
          console.info("CANNOT PARSE", err, match[2]);
        }
      }

      if (match[1].indexOf("zoombox-options") > -1) {
        adjustZoombox();
      }
      if (match[1].indexOf("gmaps-styling") > -1) {
        try {
          window.str_gmaps_styling = match[2];
        } catch (err) {
          console.info("CANNOT PARSE", err, aux.html());
        }
      }
    }
  }
}
