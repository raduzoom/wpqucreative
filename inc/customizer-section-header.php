<?php


$section_id = 'settings_header';
/** @var WP_Customize $wp_customize */
$wp_customize->add_section(
  $section_id,
  array(
    'title' => esc_html__("Header Settings",QUCREATIVE_ID),
    'description' => 'This is a settings section.',
    'priority' => 35,
  )
);


$indPriority = 0;







$arr_on_off = array(
  'menu-type-1'=>esc_html__("Menu 1-Dark (vertical)",QUCREATIVE_ID),
  'menu-type-2'=>esc_html__("Menu 2-Light (vertical)",QUCREATIVE_ID),
  'menu-type-3'=>esc_html__("Menu 3-Dark (vertical)",QUCREATIVE_ID),
  'menu-type-4'=>esc_html__("Menu 4-Light (vertical)",QUCREATIVE_ID),
  'menu-type-5'=>esc_html__("Menu 5-Dark (vertical)",QUCREATIVE_ID),
  'menu-type-6'=>esc_html__("Menu 6-Light (vertical)",QUCREATIVE_ID),
  'menu-type-7'=>esc_html__("Menu 7-Dark (vertical)",QUCREATIVE_ID),
  'menu-type-8'=>esc_html__("Menu 8-Light (vertical)",QUCREATIVE_ID),
  'menu-type-9'=>esc_html__("Menu 9-Dark (horizontal)",QUCREATIVE_ID),
  'menu-type-10'=>esc_html__("Menu 10-Light (horizontal)",QUCREATIVE_ID),
  'menu-type-11'=>esc_html__("Menu 11 (overlay)",QUCREATIVE_ID),
  'menu-type-12'=>esc_html__("Menu 12 (overlay)",QUCREATIVE_ID),
  'menu-type-13'=>esc_html__("Menu 13-Dark (horizontal)",QUCREATIVE_ID),
  'menu-type-14'=>esc_html__("Menu 14-Light (horizontal)",QUCREATIVE_ID),
  'menu-type-15'=>esc_html__("Menu 15-Dark (horizontal)",QUCREATIVE_ID),
  'menu-type-16'=>esc_html__("Menu 16-Light (horizontal)",QUCREATIVE_ID),
  'menu-type-17'=>esc_html__("Menu 17-Dark (horizontal)",QUCREATIVE_ID),
  'menu-type-18'=>esc_html__("Menu 18-Light (horizontal)",QUCREATIVE_ID),
);


$lab = 'menu_type';
$indPriority++;


$wp_customize->add_control(
  new Qucreative_Select_With_Dependency(
    $wp_customize
    ,$lab
    ,array(
      'label' => esc_html__("Menu Type",QUCREATIVE_ID),
      'section' => $section_id,
      'type' => 'select',
      'priority' => $indPriority,
      'choices' => $arr_on_off,
      'json' => array(
        'input_class'=>'dzs-dependency-field',
      ),
    )
  )


);





$dependency = array(

  array(
    'element'=>'menu_type',
    'value'=>array('menu-type-9','menu-type-10','menu-type-13','menu-type-14','menu-type-15','menu-type-16','menu-type-17','menu-type-18'),
  ),
);

$lab = 'menu_is_sticky';
$indPriority++;
$arr_on_off = array(
  'off'=>esc_html__("No",QUCREATIVE_ID),
  'on'=>esc_html__("Yes",QUCREATIVE_ID),
);

$wp_customize->add_control(
  new Qucreative_Select_With_Dependency(
    $wp_customize,
    $lab,
    array(
      'label'      => esc_html__( 'Menu is Sticky ? ', QUCREATIVE_ID ),
      'section'    => $section_id,
      'type' => 'select',
      'priority' => $indPriority,
      'choices' => $arr_on_off,
      'json'    => array(
        'dependency'=>json_encode($dependency),
      ),
    ) )
);



$lab = 'search_in_header';
$indPriority++;
$arr_on_off = array(
  'off'=>esc_html__("No",QUCREATIVE_ID),
  'on'=>esc_html__("Yes",QUCREATIVE_ID),
);

$wp_customize->add_control(
  new Qucreative_Select_With_Dependency(
    $wp_customize,
    $lab,
    array(
      'label'      => esc_html__( 'Search is in Header ?', QUCREATIVE_ID ),
      'section'    => $section_id,
      'type' => 'select',
      'priority' => $indPriority,
      'choices' => $arr_on_off,
      'json'    => array(
        'dependency'=>json_encode($dependency),
      ),
    ) )
);






$lab = 'menu_horizontal_shadow_style';



$wp_customize->add_control(
  new Qucreative_Select_With_Dependency(
    $wp_customize,
    $lab,
    array(
      'label'      => esc_html__( 'Shadow Style', QUCREATIVE_ID ),
      'section'    => $section_id,
      'type' => 'select',
      'choices' => array(
        'none'=>esc_html__("No Shadow",QUCREATIVE_ID),
        'shadow_1'=>esc_html__("Style",QUCREATIVE_ID).' 1',
        'shadow_2'=>esc_html__("Style",QUCREATIVE_ID).' 2',
        'shadow_3'=>esc_html__("Style",QUCREATIVE_ID).' 3',
      ),
      'json'    => array(
        'dependency'=>json_encode($dependency),
      ),
    ) )
);









$dependency = array(

  array(
    'element'=>'menu_type',
    'value'=>array('menu-type-1','menu-type-2','menu-type-3','menu-type-4','menu-type-5','menu-type-6','menu-type-15','menu-type-16','menu-type-17','menu-type-18'),
  ),
)
;

$wp_customize->add_control(
  new Qucreative_Slider_Input(
    $wp_customize,
    'menu_enviroment_opacity',
    array(
      'label'      => esc_html__( 'Menu Enviroment Opacity', QUCREATIVE_ID ),
      'section'    => $section_id,
      'json'    => array(
        'dependency'=>json_encode($dependency),
      ),
    ) )
);















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
  'label'       => esc_html__("Logo", QUCREATIVE_ID),
) ) );








$lab = 'logo_x';

$wp_customize->add_control(
  $lab,
  array(
    'label' => esc_html__("Logo",QUCREATIVE_ID).' X '.esc_html__("Position",QUCREATIVE_ID),
    'section' => $section_id,
    'type' => 'select',

    'choices' => array(
      'default'=>esc_html__("Default",QUCREATIVE_ID).'',
      'custom_position'=>esc_html__("Custom Position",QUCREATIVE_ID).'',



    ),
  )
);




$dependency = array(

  array(
    'element'=>'logo_x',
    'value'=>array('custom_position'),
  ),
)
;


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
      'type' => 'text',
      'json'    => array(
        'dependency'=>json_encode($dependency),
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
    'type' => 'text',
  )
);




$lab = 'logo_height';


$wp_customize->add_control(
  $lab,
  array(
    'label' => esc_html__("Logo Height",QUCREATIVE_ID),
    'section' => $section_id,
    'type' => 'text',
  )
);








$lab = 'copyright_textbox';


$wp_customize->add_control(
  $lab,
  array(
    'label' => esc_html__("Copyright text",QUCREATIVE_ID),
    'section' => $section_id,
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






$lab = 'social_icons';
$wp_customize->add_setting(
  $lab,
  array(
    'default' => '',
    'sanitize_callback' => 'qucreative_return_false_value',
    'transport'=>'postMessage',
  )
);

$wp_customize->add_control(
  $lab,
  array(
    'label' => esc_html__("Social Icons",QUCREATIVE_ID),
    'section' => $section_id,
    'type' => 'text',
  )
);


// -- search
$lab = 'search_in_header';
$choices_logo = array(
  'default'=>esc_html__("Default",QUCREATIVE_ID).'',
  'off'=>esc_html__("Disable",QUCREATIVE_ID).'',
  'on'=>esc_html__("Enable",QUCREATIVE_ID).'',

);


$wp_customize->add_setting(
  $lab,
  array(
    'default' => 'default',
    'sanitize_callback' => 'qucreative_return_false_value',
    'transport'=>'postMessage',
  )
);

$wp_customize->add_control(
  $lab,
  array(
    'label' => esc_html__("Search in Header",QUCREATIVE_ID),
    'section' => $section_id,
    'type' => 'select',

    'choices' => $choices_logo,
  )
);
