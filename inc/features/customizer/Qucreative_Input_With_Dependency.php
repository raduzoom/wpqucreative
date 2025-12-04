<?php

class Qucreative_Input_With_Dependency extends WP_Customize_Control {
  public $type = 'text';


  public function render_content() {

    $id = 'customize-control-' . str_replace('[', '-', str_replace(']', '', $this->id));

    ?>
    <label class="check-customize-setting-link" <?php


    if (isset($this->json['dependency'])) {

      echo ' data-dependency=\'' . $this->json['dependency'] . '\'';
    } else {
      echo ' no-dependency';
    }


    ?>>
      <?php if (!empty($this->label)) : ?>
        <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
      <?php endif;
      if (!empty($this->description)) : ?>
        <span class="description customize-control-description"><?php echo $this->description; ?></span>
      <?php endif; ?>
      <input class=" <?php

      if (isset($this->json['input_class'])) {
        echo $this->json['input_class'];
      }

      ?>" type="<?php echo esc_attr($this->type); ?>" <?php $this->input_attrs(); ?>
             value="<?php echo esc_attr($this->value()); ?>" <?php $this->link(); ?> />
    </label>
    <?php
  }
}
