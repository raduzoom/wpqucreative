import { qucreative_fontArray } from "./sampledata/data.config";

export const setupSelector = () => {
  const $ = jQuery;
  console.log("ceva");

  setTimeout(function () {
    $(".link-to-selector").trigger("change");
  }, 3000);

  $(document).on(
    "change",
    '.font-family-selector,.link-to-selector,.font-customizer-field, *[data-customize-setting-link="menu_type"]',
    handle_change,
  );

  function handle_change(e) {
    const _t = $(this);

    if (e.type == "change") {
      if (_t.hasClass("font-family-selector")) {
        // console.info('font-family-selector changed, ', qucreative_fontArray);

        for (var i2 in qucreative_fontArray["items"]) {
          // console.info(_t.val(), qucreative_fontArray['items'][i2].family);
          if (qucreative_fontArray["items"][i2].family == _t.val()) {
            const _cf = qucreative_fontArray["items"][i2].family;
            // console.warn('font found', _cf, qucreative_fontArray['items'][i2]);

            let files = qucreative_fontArray["items"][i2].files;

            const arr_weights = [];
            let i4 = 0;

            files = qucreative_fontArray["items"][i2].files;

            var len = Object.size(files);
            let breaker = 15;

            // console.warn('files -> ',files);
            // console.warn('len -> ',len);

            const theUsedArray = [];
            while (breaker > 0 && len >= 0) {
              let isUsed = false;

              var i3 = "";

              var aux = {
                value: i3,
              };

              i3 = "100";

              // console.info('i3 -> ',i3, "files.hasOwnProperty(i3) -> ",files.hasOwnProperty(i3), $.inArray(i3,used_array)==-1);
              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Thin 100";
                // delete files[i3];
              }

              i3 = "100italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Thin 100 Italic";
                // delete files[i3];
              }
              i3 = "200";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Light 200";
                // delete files[i3];
              }
              i3 = "200italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Light 200 Italic";
              }
              i3 = "300";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Light 300";
              }
              i3 = "300italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Light 300 Italic";
              }
              i3 = "400";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Regular 400";
              }
              i3 = "regular";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Regular 400";
              }

              i3 = "italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Italic 400";
              }
              i3 = "500";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Medium 500";
              }
              i3 = "500italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Medium 500 Italic";
              }
              i3 = "600";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Semi-Bold 600";
              }
              i3 = "600italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Semi-Bold 600 Italic";
              }
              i3 = "700";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Bold 700";
              }
              i3 = "700italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Bold 700 Italic";
              }
              i3 = "800";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Bold 800";
              }
              i3 = "800italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Extra-Bold 800 Italic";
              }
              i3 = "900";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Ultra-Bold 900";
              }
              i3 = "900italic";

              if (
                isUsed == false &&
                files.hasOwnProperty(i3) &&
                $.inArray(i3, theUsedArray) == -1
              ) {
                theUsedArray.push(i3);
                isUsed = true;
                aux.value = i3;
                aux.label = "Ultra-Bold 900 Italic";
              }

              // console.info('sw - ',sw);
              if (isUsed) {
                arr_weights[i4] = aux;
                i4++;

                len--;
              }
              breaker--;

              // console.info('aux -',aux);
            }

            // console.info('files - ',files);
            // console.info('arr_weights - ',arr_weights);

            let weights_options_str = "";
            for (const i5 in arr_weights) {
              weights_options_str +=
                '<option value="' +
                arr_weights[i5].value +
                '">' +
                arr_weights[i5].label +
                "</option>";
            }

            // console.info(weights_options_str);

            const name_ = _t.attr("name");

            // console.info("$('select.weights-feeder-from-'+name_+' select') -> ",$('select.weights-feeder-from-'+name_+' '));

            $(".weights-feeder-from-" + name_ + " select").each(function () {
              var _t3 = $(this);

              // nu ti lua tzapa

              // return ;

              var last_val = _t3.val();
              // console.info("last_val -> ", last_val);

              if (last_val == "") {
                if (_t3.attr("data-default-weight")) {
                  last_val = _t3.attr("data-default-weight");
                }
              }

              // console.info('last_val - ',last_val);

              _t3.html(weights_options_str);

              if (_t3.attr("data-default-weight") || last_val) {
                var data_default_weight = _t3.attr("data-default-weight");

                var sw = false;

                _t3.children().each(function () {
                  var _t32 = $(this);

                  // console.groupCollapsed("weights test");

                  // console.info(_t32.attr('value'), last_val)

                  if (_t32.attr("value") == last_val + "") {
                    sw = true;

                    // console.info("FOUND SAME VALUE ?? ", last_val, _t32);

                    _t32.attr("selected", "selected");
                    _t32.prop("selected", true);

                    // console.info("ITEM SELECTED - ",_t32);

                    // return;
                    // console.info("FOUND",_t32);
                  }
                  // console.groupEnd();
                });

                if (sw) {
                  // _t3.val(_t3.attr('data-default-weight'));
                  _t3.val(last_val);
                }

                _t3.attr("data-default-weight", "");
              }

              // _t3.val(last_val);
              // console.info(" SW - ",sw);
              _t3.trigger("change");

              // console.info(_t3);

              if (_t3.get(0) && _t3.get(0).api_reinit) {
                _t3.get(0).api_reinit();
              }
            });

            // -- for chosen
            $(".weights-feeder-from-" + name_).each(function () {
              var _t3 = $(this);

              // return ;

              var last_val = _t3.val();
              // console.info("last_val -> ", last_val);

              if (last_val) {
              } else {
                if (_t3.attr("data-default-weight")) {
                  last_val = _t3.attr("data-default-weight");
                }
              }
              // console.info("last_val 2 -> ", last_val);

              _t3.html(weights_options_str);

              if (_t3.attr("data-default-weight") || last_val) {
                var data_default_weight = _t3.attr("data-default-weight");

                var sw = false;

                _t3.children().each(function () {
                  var _t32 = $(this);

                  if (_t32.attr("value") == last_val) {
                    sw = true;
                    // console.info("FOUND SAME VALUE ?? ", last_val, _t32);

                    _t32.attr("selected", "selected");
                    _t32.prop("selected", true);

                    // console.info("ITEM SELECTED - ",_t32);

                    // return;
                  }
                });

                if (sw) {
                  // _t3.val(last_val);
                }

                _t3.attr("data-default-weight", "");
              }

              // console.info(" SW - ",sw);
              _t3.trigger("change");
              _t3.trigger("chosen:updated");

              // console.info(_t3);
            });
          }
        }
      }

      if (_t.hasClass("link-to-selector")) {
        // console.info("ceva");

        const label_prefix = _t.attr("data-label-prefix");

        $("*[name=" + label_prefix + "_weight]")
          .removeClass("weights-feeder-from-headings_font")
          .removeClass("weights-feeder-from-body_font")
          .addClass("weights-feeder-from-" + _t.val() + "_font");

        $("*[name=" + _t.val() + "_font]").trigger("change");

        return false;
      }

      if (_t.hasClass("font-customizer-field")) {
        const _f = $(".dzs-tabs-1");

        // console.info(_f.serialize());

        _f.prev().find("input").eq(0).val(_f.serialize());

        if (window.isSafeToRefresh) {
          _f.prev().find("input").eq(0).trigger("change");
        }
      }
    }
  }
};
