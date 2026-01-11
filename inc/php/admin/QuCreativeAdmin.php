<?php


class QuCreativeAdmin {
  public QuCreative $quMain;

  function __construct(QuCreative $quMain) {
    $this->quMain = $quMain;


    add_action('save_post', array($this,'qucreative_handle_admin_meta_save'));

  }



  function qucreative_handle_admin_meta_save($post_id) {
    global $post;


    if (!$post) {
      return;
    }

    // --  Check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
      return $post_id;
    }


    $is_preview = false;
    if (isset($_POST['wp-preview']) && $_POST['wp-preview'] == 'dopreview') {

      // -- save for preview ( append _preview maybe )
      $is_preview = true;

    }


    if (isset($_REQUEST[QUCREATIVE_META_PREFIX . 'meta_nonce'])) {
      $nonce = $_REQUEST[QUCREATIVE_META_PREFIX . 'meta_nonce'];
      if (!wp_verify_nonce($nonce, QUCREATIVE_META_PREFIX . 'meta_nonce')) {
        wp_die('Security check');
      }
    }


    if (is_array($_POST)) {
      $auxa = $_POST;
      foreach ($auxa as $label => $value) {


        $label_to_save = $label;

        if ($is_preview) {
          $label_to_save .= '_preview';
        }


        $original_value = $value;


        if (is_array($value) || $original_value === ' ') {

        } else {

          $value = sanitize_text_field($value);
        }


        if (strpos($label, QUCREATIVE_META_PREFIX . 'meta_') !== false) {
          update_post_meta($post->ID, $label_to_save, $value);
        }
      }
    }
  }

}
