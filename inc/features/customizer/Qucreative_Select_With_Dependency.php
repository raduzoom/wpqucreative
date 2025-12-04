<?php

class Qucreative_Select_With_Dependency extends WP_Customize_Control {
  public $type = 'select';


  public function render_content() {

    $id = 'customize-control-' . str_replace('[', '-', str_replace(']', '', $this->id));

    if (empty($this->choices))
      return;

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

      <select class=" <?php

      if (isset($this->json['input_class'])) {
        echo $this->json['input_class'];
      }

      ?>" <?php $this->link(); ?>>
        <?php
        foreach ($this->choices as $value => $label)
          echo '<option value="' . esc_attr($value) . '"' . selected($this->value(), $value, false) . '>' . $label . '</option>';
        ?>
      </select>
    </label>
    <?php
  }
}
