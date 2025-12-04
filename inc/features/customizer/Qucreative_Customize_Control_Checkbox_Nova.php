<?php

class Qucreative_Customize_Control_Checkbox_Nova extends WP_Customize_Control {
  public $type = 'checkbox-nova';

  public function render_content() {

    $str_checked = '';

    if ($this->value() == '1') {
      $str_checked = ' checked';
    }

    ?>
    <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
    <div class="dzscheckbox skin-nova">
      <input id="<?php echo(esc_html($this->label)); ?>" type="checkbox" value="on" <?php echo $str_checked . ' ';
      $this->link(); ?>/>
      <label for="<?php echo(esc_html($this->label)); ?>"></label>
    </div>
    <?php
  }
}
