/**
 *
 * @param {jQuery} thejQuery
 */
export const setupUploader= ($) => {

  var global_dzstln_batchupload_index = 0;


  function dzstln_adminpage_batchupload_ready() {
    jQuery(".save-batchupload").bind("click", dzstln_batchupload_saveall);
    jQuery(".saveconfirmer").fadeOut("slow");

    window.dzsuploader_multi_init(".dzs-multi-upload", {});
  }



  window.global_dzsmultiupload = function (arg1, arg2) {
    jQuery("form.mainsettings").append(
      '<input type="hidden" name="item[' +
      global_dzstln_batchupload_index +
      '][name]" value="' +
      arg1 +
      '"/>',
    );
    jQuery("form.mainsettings").append(
      '<input type="hidden" name="item[' +
      global_dzstln_batchupload_index +
      '][url]" value="' +
      (dzs_upload_path + arg1) +
      '"/>',
    );

    global_dzstln_batchupload_index++;

    jQuery(".notice-files-uploaded--number").html(
      global_dzstln_batchupload_index,
    );
  };


  function dzstln_batchupload_saveall() {
    jQuery("#save-ajax-loading").css("visibility", "visible");
    var mainarray = jQuery(".mainsettings").serialize();
    var data = {
      action: "dzstln_ajax_batchupload_saveall",
      postdata: mainarray,
    };
    jQuery(".saveconfirmer").html("Options saved.");
    jQuery(".saveconfirmer").fadeIn("fast").delay(2000).fadeOut("fast");
    jQuery.post(ajaxurl, data, function (response) {
      if (window.console != undefined) {
        console.log("Got this from the server: " + response);
      }
      jQuery("#save-ajax-loading").css("visibility", "hidden");
    });

    return false;
  }

  $(".dzsq-dzs-wordpress-uploader").unbind("click");
  $(".dzsq-dzs-wordpress-uploader").bind("click", function (e) {
    var _t = $(this);
    var targetInput = _t.prev();

    var searched_type = "";

    if (targetInput.hasClass("upload-type-audio")) {
      searched_type = "audio";
    }
    if (targetInput.hasClass("upload-type-image")) {
      searched_type = "image";
    }

    var uploader_frame = (wp.media.frames.qucreative_addimage = wp.media({
      // Set the title of the modal.
      title: "Insert Media",

      // Tell the modal to show only images.
      library: {
        type: searched_type,
      },

      // Customize the submit button.
      button: {
        // Set the text of the button.
        text: "Insert Media",
        // Tell the button not to close the modal, since we're
        // going to refresh the page when the image is selected.
        close: false,
      },
    }));

    // When an image is selected, run a callback.
    uploader_frame.on("select", function () {
      // Grab the selected attachment.
      var attachment = uploader_frame.state().get("selection").first();

      //console.log(attachment.attributes.url);
      var arg = attachment.attributes.url;

      if (targetInput.hasClass("upload-prop-id")) {
        targetInput.val(attachment.attributes.id);
      } else {
        targetInput.val(attachment.attributes.url);
      }

      targetInput.css({
        "background-color": "",
        color: "",
      });

      targetInput.trigger("change");
      uploader_frame.close();
    });

    // Finally, open the modal.
    uploader_frame.open();

    e.stopPropagation();
    e.preventDefault();
    return false;
  });
}
