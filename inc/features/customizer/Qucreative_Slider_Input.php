<?php

class Qucreative_Slider_Input extends WP_Customize_Control {
  public $type = 'slider-input';
  public $removed = '';
  public $context;

  public function enqueue() {

    wp_enqueue_script('jquery-ui-core');
    wp_enqueue_script('jquery-ui-slider');
  }


  public function render_content() {


    $id = 'customize-control-' . str_replace('[', '-', str_replace(']', '', $this->id));
    ?>

    <label class="check-customize-setting-link" <?php


    if (isset($this->json['dependency'])) {

      echo ' data-dependency=\'' . $this->json['dependency'] . '\'';
    } else {
      echo ' no-dependency';
    }

    $min = 0;
    $max = 100;


    if (isset($this->json['min'])) {

      $min = $this->json['min'];
    }
    if (isset($this->json['max'])) {

      $max = $this->json['max'];
    }


    ?>>
      <span class="customize-control-title hmm"><?php echo esc_html($this->label); ?></span>
      <input class="disabled check-customize-setting-link" id="<?php echo esc_attr($id); ?>" type="text"
             value="<?php echo $this->value(); ?>" <?php $this->link(); ?>/>
      <div class="setup-slider-for-prev-input" id="<?php echo $id . '-slider'; ?>"></div>
      <script>

        jQuery(document).ready(function ($) {
          var _t = jQuery("#<?php echo $id . '-slider'; ?>");
          var _val = _t.prev();

          setTimeout(function () {

            try {
              _t.slider({

                value: _val.val()
                , animate: "fast"
                , min: <?php echo $min; ?>
                , max: <?php echo $max; ?>
                , step: 1
                , slide: function (e, ui) {

                  var _t2 = $(this);
                  _t2.prev().val(ui.value);
                  _t2.prev().trigger('change');

                }
              });
            } catch (err) {
              console.warn(err);
            }

            _val.on('change', function () {
              var _t = $(this);

              _t.next().slider('value', parseInt(_t.val(), 10));
            })
          }, 100);
        })
      </script>
    </label>
    <?php
  }
}

