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
    'label'       => esc_html__("Logo", 'qucreative'),
  ) ) );








  $lab = 'logo_x';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo",'qucreative').' X '.esc_html__("Position",'qucreative'),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'select',
      'choices' => array(
        'default'=>esc_html__("Default",'qucreative').'',
        'custom_position'=>esc_html__("Custom Position",'qucreative').'',



      ),
    )
  );






  add_action( 'customize_render_control_logo_x_custom', function(){
    ?>
    <div class="sidenote"><?php echo esc_html__("By default, logo will center horizontally on vertical menus.",'qucreative'); ?></div>
    <?php
  });


  $lab = 'logo_x_custom';




  $wp_customize->add_control(
    new Qucreative_Input_With_Dependency(
      $wp_customize,
      $lab,
      array(
        'label' => esc_html__("Logo",'qucreative').' X '.esc_html__("Position",'qucreative').' ('.esc_html__("in",'qucreative').' px)',
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
    'default'=>esc_html__("Default",'qucreative').'',
    'custom_position'=>esc_html__("Custom Position",'qucreative').'',

  );

  $lab = 'logo_y';

  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo",'qucreative').' Y '.esc_html__("Position",'qucreative'),
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
    <div class="sidenote"><?php echo esc_html__("By default, logo will center vertically on horizontal menus.",'qucreative'); ?></div>
    <?php
  });





  $lab = 'logo_y_custom';




  $wp_customize->add_control(
    new Qucreative_Input_With_Dependency(
      $wp_customize,
      $lab,
      array(
        'label' => esc_html__("Logo",'qucreative').' Y '.esc_html__("Position",'qucreative').' ('.esc_html__("in",'qucreative').' px)',
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
      'label' => esc_html__("Logo Width",'qucreative'),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'text',
    )
  );




  $lab = 'logo_height';


  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Logo Height",'qucreative'),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'text',
    )
  );








  $lab = 'copyright_textbox';


  $wp_customize->add_control(
    $lab,
    array(
      'label' => esc_html__("Copyright text",'qucreative'),
      'section' => $section_id,
      'priority' => ++$indPriority,
      'type' => 'text',
    )
  );






  $arr_headings = array(
    'h1'=>esc_html__("Heading",'qucreative').' 1',
    'h2'=>esc_html__("Heading",'qucreative').' 2',
    'h3'=>esc_html__("Heading",'qucreative').' 3',
    'h4'=>esc_html__("Heading",'qucreative').' 4',
    'h5'=>esc_html__("Heading",'qucreative').' 5',
    'h6'=>esc_html__("Heading",'qucreative').' 6',
    'h-group-1'=>esc_html__("Heading Group",'qucreative').' 1',
    'h-group-2'=>esc_html__("Heading Group",'qucreative').' 2',


  );
  $lab = 'copyright_textbox_heading_style';






}

