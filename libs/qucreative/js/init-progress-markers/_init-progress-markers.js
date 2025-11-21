export function dzsQuc_init_progressMarkers(){



  window.init_progress_markers = function () {

  var color_outside_circle = '#eeeeee';
  var color_inside_circle = '#333333';
  jQuery('.antfarm-progress-circle').each(function () {
    var _t = jQuery(this);


    if (jQuery('.the-content-sheet.the-content-sheet-dark').find(_t).length > 0) {
      color_inside_circle = '#ffffff';
      color_outside_circle = '#444444';
    }

    _t.html(' <div class="dzs-progress-bar skin-prev9copy" style="width:100%; max-width: 150px; height:auto;margin-top:0px;margin-left:auto;margin-right:auto;margin-bottom:0px;" data-animprops=\'{"animation_time":"' + _t.attr('data-animation_time') + '","maxperc":"' + _t.attr('data-maxperc') + '","maxnr":"' + _t.attr('data-maxnr') + '","initon":"scroll"}\'><canvas class="progress-bars-item progress-bars-item--circ" data-type="circ" data-animprops=\'{"height":"{{width}}","circle_outside_fill":"' + color_outside_circle + '","circle_inside_fill":"transparent","circle_outer_width":"1","circle_line_width":"10"}\' style="position: absolute; width: calc(100% + 8px); top: -4px; left: -4px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: transparent;" width="302" height="302"></canvas><canvas class="progress-bars-item progress-bars-item--circ" data-type="circ" data-animprops=\'{"height":"{{width}}","circle_outside_fill":"' + color_inside_circle + '","circle_inside_fill":"transparent","circle_outer_width":"{{perc-decimal}}","circle_line_width":"2"}\' style="position: relative; width: 100%; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: transparent;" width="298" height="298"></canvas><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{"left":"{{center}}"}\' style="position: absolute; top: 50%; transform: translate(0,-50%);  margin: 0px; margin-top: -3px; width: 100%; height: auto; right: auto; bottom: auto; color: rgb(33, 33, 33); border-radius: 0px; border: 0px; opacity: 1; font-size: 40px; background-color: transparent;"><h3 style="text-align: center; " data-mce-style="text-align: center;">{{perc}}</h3></div></div>');

    _t.addClass('treated');
  });


  jQuery('.antfarm-progress-line').each(function () {
    var _t = jQuery(this);


    if (jQuery('.the-content-sheet.the-content-sheet-dark').find(_t).length > 0) {
      color_inside_circle = '#ffffff';
      color_outside_circle = '#333333';
    }

    _t.html(' <div class="dzs-progress-bar auto-init skin-prev2copy" style="width:100%;height:auto;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"' + _t.attr('data-animation_time') + '","maxperc":"' + _t.attr('data-maxperc') + '","maxnr":"' + _t.attr('data-maxnr') + '","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text h6" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; margin-bottom: 5px; color: rgb(33, 33, 33); border-radius: 0px; border: 0px; opacity: 1;line-height: 1; background-color: transparent;">' + _t.attr('data-title') + '</div><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{"left":"{{perc}}"}\' style="position: absolute; width: 0px; height: auto; top: auto; right: auto; bottom: 35px; margin: 0px 0px 0px 0px; color: #999999; border-radius: 0px; border: 0px; font-size: 14px; background-color: transparent;"><h6 style="text-align: right; position:absolute; right:0; white-space:nowrap; margin-top:0; margin-bottom: 0;  " >{{perc}}</h6></div><div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: relative; width: 100%; height: 10px; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: ' + color_outside_circle + ';"></div><div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{"width":"{{perc}}"}\' style="position: absolute; height: 2px; top: auto; left: 0px; right: auto; bottom: 7px; margin: 0; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 12px; background-color: rgb(34, 34, 34);"></div></div>');

    _t.addClass('treated');
  });

  jQuery('.antfarm-progress-text').each(function () {
    var _t = jQuery(this);


    var h_tag = 'h2';
    var h_class = '';

    if (_t.attr('data-h-tag')) {
      h_tag = _t.attr('data-h-tag');
    }

    if (_t.attr('data-h-tag-class')) {
      h_class = _t.attr('data-h-tag-class');
    }


    _t.html('<div class="dzs-progress-bar auto-init skin-bignumber" style="width:100%;height:auto;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"' + _t.attr('data-animation_time') + '","maxperc":"' + _t.attr('data-maxperc') + '","maxnr":"' + _t.attr('data-maxnr') + '","convert_1000_to_k":"' + _t.attr('data-convert-1000-to-k') + '","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: 1; font-size: 50px; background-color: transparent;"><' + h_tag + ' class="' + h_class + '"  style="text-align: center; margin-bottom:0;" ><span style="color: rgb(255, 255, 255); " >{{percmaxnr}}</span></' + h_tag + '></div></div>');

    _t.addClass('treated');
  });

  jQuery('.antfarm-progress-rect').each(function () {
    var _t = jQuery(this);

    if (_t.hasClass('treated')) {
      return;
    }


    var color_inside_circle = 'rgb(34,34,34)';
    var color_outside_circle = '';

    var color_opacity_line = '1';
    if (jQuery('.the-content-sheet.the-content-sheet-dark').find(_t).length > 0) {
      color_inside_circle = '#ffffff';
      color_outside_circle = '#333333';
      color_opacity_line = '0.25';
    }


    if (_t.children('div[class*="icon-"]').length == 0) {

      // -- no icon

      _t.html('<div class="dzs-progress-bar auto-init skin-prev3copy" style="width:100%;height:auto;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"' + _t.attr('data-animation_time') + '","maxperc":"' + _t.attr('data-maxperc') + '","maxnr":"' + _t.attr('data-maxnr') + '","convert_1000_to_k":"' + _t.attr('data-convert-1000-to-k') + '","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text h1" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 6px; left: 0px; right: auto; bottom: auto; margin: 0px 0px 5px 0px; padding-right:20px; color: ' + color_inside_circle + '; border-radius: 0px; border: 0px; opacity: 1; line-height: 1; background-color: transparent;">   <div class="h1 h1-for-progress" style="text-align: center;" data-mce-style="text-align: right;"><span>{{percmaxnr}}</span></div>   </div><div class="progress-bars-item progress-bars-item--text h6" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px 0px 0px 0px; padding-right:20px; padding-bottom:20px; color: ' + color_inside_circle + '; border-radius: 0px; border: 0px; opacity: 1;  background-color: transparent;"><div style="text-align: center;" data-mce-style="text-align: center;">' + _t.attr('data-text') + '</div></div><div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 100%; height: 1px; top: auto; left: 0px; right: auto; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: ' + color_opacity_line + '; font-size: 12px; background-color: rgb(205, 205, 205);"></div> <div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 1px; height: 120px; top: auto; left: auto; right: 0px; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: ' + color_opacity_line + '; font-size: 12px; background-color: rgb(205, 205, 205);"></div> </div>');
    } else {

      var aux = _t.children('div[class*="icon-"]').eq(0).get(0).outerHTML;
      _t.html('<div class="dzs-progress-bar auto-init skin-prev3copy" style="width:100%;height:185px;margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;" data-animprops=\'{"animation_time":"' + _t.attr('data-animation_time') + '","maxperc":"' + _t.attr('data-maxperc') + '","maxnr":"' + _t.attr('data-maxnr') + '","convert_1000_to_k":"' + _t.attr('data-convert-1000-to-k') + '","initon":"scroll"}\'><div class="progress-bars-item progress-bars-item--text" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: 0px 0px 5px 0px; padding-right:20px;  padding-top: 71px;color: ' + color_inside_circle + '; border-radius: 0px; border: 0px; opacity: 1; ;; line-height: 1; background-color: transparent;">    <div class="h1 h1-for-progress" style="text-align: right;" ><span>{{percmaxnr}}</span></div>    </div>    <div class="progress-bars-item progress-bars-item--text h6" data-type="text" data-animprops=\'{}\' style="position: relative; width: 100%; height: auto; top: 0px; left: 0px; right: auto; bottom: auto; margin: -3px 0px 0px 0px; padding-right:20px; padding-bottom:20px; color:' + color_inside_circle + '; border-radius: 0px; border: 0px; opacity: 1; line-height: 1; background-color: transparent;"><div style="text-align: right; " data-mce-style="text-align: right;">' + _t.attr('data-text') + '</div></div>   <div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 100%; height: 1px; top: auto; left: 0px; right: auto; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: ' + color_opacity_line + '; font-size: 12px; background-color: rgb(205, 205, 205);"></div> <div class="progress-bars-item progress-bars-item--rect" data-type="rect" data-animprops=\'{}\' style="position: absolute; width: 1px; height: 185px; top: auto; left: auto; right: 0px; bottom: 0px; margin: 0px; color: rgb(255, 255, 255); border-radius: 0px; border: 0px; opacity: ' + color_opacity_line + '; font-size: 12px; background-color: rgb(205, 205, 205);"></div> </div>');

      _t.children('.dzs-progress-bar').prepend(aux);


    }

    _t.addClass('treated');


  });
}

}