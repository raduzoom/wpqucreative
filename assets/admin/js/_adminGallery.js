window.click_add_gallery_item = function (e) {
  var _t = jQuery(this);

  var item_gallery_frame = (wp.media.frames.downloadable_file = wp.media({
    title: "Add Images to Item Gallery",
    button: {
      text: "Add to gallery",
    },
    multiple: true,
  }));

  item_gallery_frame.on("select", function () {
    var selection = item_gallery_frame.state().get("selection");
    var _gallery = null;

    if (_t.parent().children(".dzs_item_gallery_list").length > 0) {
      _gallery = _t.parent().children(".dzs_item_gallery_list").eq(0);
    }
    selection = selection.toJSON();

    for (var i = 0; i < selection.length; i++) {
      var _c = selection[i];

      if (_c.id == undefined) {
        continue;
      }

      if (_gallery) {
        _gallery.append(
          '<li class="item-element" data-id="' +
          _c.id +
          '"><img class="the-image" src="' +
          _c.url +
          '"/><div class="ui-delete"></div><div class="ui-edit">' +
          window.qucreative_settings.lang_edit +
          '</div><div class="ui-edit-field"><div class="ui-edit-field-close"><i class="fa fa-times-circle"></i></div> <input type="hidden" name="qucreative_meta_post_id" value="' +
          _c.id +
          '"/> <div class="setting"> <h5>' +
          window.qucreative_settings.lang_title +
          '</h5> <input class="q-att-meta-edit-field" type="text" name="qucreative_meta_post_excerpt" value="' +
          _c.caption +
          '"/> </div> <div class="setting"> <h5>' +
          window.qucreative_settings.lang_description +
          '</h5> <textarea class="q-att-meta-edit-field" type="text" name="qucreative_meta_post_content">' +
          _c.description +
          '</textarea> </div> <div class="setting"> <h5>' +
          window.qucreative_settings.lang_aligment +
          '</h5> <select name="qucreative_meta_att_aligment" class="q-att-meta-edit-field"><option value="right" selected>' +
          window.qucreative_settings.lang_right +
          '</option><option value="left">' +
          window.qucreative_settings.lang_left +
          '</option></select> </div> <div class="setting"> <h5>Attached Video</h5> <input class="q-att-meta-edit-field" type="text" name="qucreative_meta_att_video" value=""/> </div> <div class="setting"> <h5>Enable Video Cover</h5> <select name="qucreative_meta_att_enable_video_cover" class="q-att-meta-edit-field"><option value="off">Off</option><option value="on">On</option></select> </div> </div> </div></li>',
        );
      }
    }
    window.update_dzs_item_gallery_metafield(_gallery);
  });

  // Finally, open the modal.
  item_gallery_frame.open();
  /// --====item gallery CODE END

  return false;
}

export const setupAdminGallery = function ($) {

  var _gallery = $(".dzs_item_gallery_list");

  $(".dzs-add-gallery-item").unbind("click", window.click_add_gallery_item);
  $(".dzs-add-gallery-item").bind("click", window.click_add_gallery_item);
  $(document).undelegate("li .ui-delete", "click");
  $(document).delegate("li .ui-delete", "click", click_item_delete);
  $(document).undelegate("li .ui-edit", "click");
  $(document).delegate("li .ui-edit", "click", click_item_edit);




  if ($.fn.sortable) {
    _gallery.each(function () {
      var _t23 = $(this);

      if (_t23.hasClass("ui-sortable") == false) {
        _t23.sortable({
          items: "li",
          handle: ".the-handler",
          scrollSensitivity: 50,
          forcePlaceholderSize: true,
          forceHelperSize: false,
          helper: "clone",
          opacity: 0.7,
          placeholder: "dzs_item_gallery_list-placeholder",
          update: function (event, ui) {
            console.info(this);
            window.update_dzs_item_gallery_metafield($(this));
          },
        });
      }
    });
  } else {
    console.warn("please include sortable");
  }


  function click_item_delete() {
    var _t = $(this);

    var _con = _t.parent().parent();
    _t.parent().remove();
    window.update_dzs_item_gallery_metafield(_con);
  }

  function click_item_edit() {
    var _t = $(this);
    var _con = _t.parent();

    _con.parent().children().removeClass("edit-field-active");

    _con.addClass("edit-field-active");
  }
}


window.update_dzs_item_gallery_metafield = function (_arg) {
  // -- @arg is the .dzs_item_gallery_list element

  console.info("update_dzs_item_gallery_metafield", _arg);
  var _theinput = null;

  if (
    _arg &&
    _arg.parent &&
    _arg.parent().children("input[name*=image_gallery]").length > 0
  ) {
    _theinput = _arg.parent().children("input[name*=image_gallery]").eq(0);
  }

  if (_theinput) {
    _theinput.val("");
  }
  var aux = "";
  var i = 0;

  if (_arg && _arg.children) {
    _arg.children().each(function () {
      var _t = jQuery(this);

      if (i > 0) {
        aux += ",";
      }
      aux += _t.attr("data-id");
      i++;
    });
  }

  if (_theinput) {
    _theinput.val(aux);
  }
}
