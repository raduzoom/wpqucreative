<?php






function qucreative_admin_customizer_header_addSections($wp_customize, $section_id) {

  $indPriority = 200;















  $args = array(
    'public'   => true,
    '_builtin' => false
  );

  $post_types = get_post_types( $args);



  $choices_arr = array();

  foreach ( $post_types  as $lab => $post_type ) {

    $choices_arr[$lab] = $post_type;
  }









  $lab = 'logo';

  $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, $lab, array(
    'section'     => $section_id,
    'priority' => ++$indPriority,
    'label'       => esc_html__("Logo", QUCREATIVE_ID),
  ) ) );








  $lab = 'logo_x';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo",QUCREATIVE_ID).' X '.esc_html__("Position",QUCREATIVE_ID),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'select',
      'choices' => array(
        'default'=>esc_html__("Default",QUCREATIVE_ID).'',
        'custom_position'=>esc_html__("Custom Position",QUCREATIVE_ID).'',



      ),
    )
  );






  add_action( 'customize_render_control_logo_x_custom', function(){
    ?>
    <div class="sidenote"><?php echo esc_html__("By default, logo will center horizontally on vertical menus.",QUCREATIVE_ID); ?></div>
    <?php
  });


  $lab = 'logo_x_custom';




  $wp_customize->add_control(
    new Qucreative_Input_With_Dependency(
      $wp_customize,
      $lab,
      array(
        'label' => esc_html__("Logo",QUCREATIVE_ID).' X '.esc_html__("Position",QUCREATIVE_ID).' ('.esc_html__("in",QUCREATIVE_ID).' px)',
        'section'    => $section_id,
        'priority' => ++$indPriority,
        'type' => 'text',
        'json'    => array(
          'dependency'=>json_encode(array(

              array(
                'element'=>'logo_x',
                'value'=>array('custom_position'),
              ),
            )
          ),
          'input_class'=>' text-input',
        ),
      ) )
  );




  $choices_logo = array(
    'default'=>esc_html__("Default",QUCREATIVE_ID).'',
    'custom_position'=>esc_html__("Custom Position",QUCREATIVE_ID).'',

  );

  $lab = 'logo_y';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo",QUCREATIVE_ID).' Y '.esc_html__("Position",QUCREATIVE_ID),
      'priority' => ++$indPriority,
      'section' => $section_id,
      'type' => 'select',

      'choices' => $choices_logo,
    )
  );




  $dependency = array(

    array(
      'element'=>'logo_y',
      'value'=>array('custom_position'),
    ),
  )
  ;



  add_action( 'customize_render_control_logo_y_custom', function(){
    ?>
    <div class="sidenote"><?php echo esc_html__("By default, logo will center vertically on horizontal menus.",QUCREATIVE_ID); ?></div>
    <?php
  });





  $lab = 'logo_y_custom';




  $wp_customize->add_control(
    new Qucreative_Input_With_Dependency(
      $wp_customize,
      $lab,
      array(
        'label' => esc_html__("Logo",QUCREATIVE_ID).' Y '.esc_html__("Position",QUCREATIVE_ID).' ('.esc_html__("in",QUCREATIVE_ID).' px)',
        'section'    => $section_id,
        'priority' => ++$indPriority,
        'type' => 'text',
        'json'    => array(
          'dependency'=>json_encode($dependency),
          'input_class'=>' text-input',
        ),
      ) )
  );





  $lab = 'logo_width';


  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo Width",QUCREATIVE_ID),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'text',
    )
  );




  $lab = 'logo_height';


  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo Height",QUCREATIVE_ID),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'text',
    )
  );








  $lab = 'copyright_textbox';


  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Copyright text",QUCREATIVE_ID),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'text',
    )
  );






  $arr_headings = array(
    'h1'=>esc_html__("Heading",QUCREATIVE_ID).' 1',
    'h2'=>esc_html__("Heading",QUCREATIVE_ID).' 2',
    'h3'=>esc_html__("Heading",QUCREATIVE_ID).' 3',
    'h4'=>esc_html__("Heading",QUCREATIVE_ID).' 4',
    'h5'=>esc_html__("Heading",QUCREATIVE_ID).' 5',
    'h6'=>esc_html__("Heading",QUCREATIVE_ID).' 6',
    'h-group-1'=>esc_html__("Heading Group",QUCREATIVE_ID).' 1',
    'h-group-2'=>esc_html__("Heading Group",QUCREATIVE_ID).' 2',


  );
  $lab = 'copyright_textbox_heading_style';






}

