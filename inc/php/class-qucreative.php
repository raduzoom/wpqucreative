<?php
include_once 'view/class-view-qucreative.php';
include_once QUCREATIVE_THEME_DIR.'inc/php/view/view-social-icons.php';
class QuCreative {

  public QuCreativeView $quCreativeView;

  public array $theme_data = QUCREATIVE_INITIAL_THEME_DATA;
  function __construct() {


    $this->quCreativeView = new QuCreativeView($this);

    $this->theme_data['allowed_html_tags'] = QUCREATIVE_ALLOWED_TAGS;

    $theme_mods = array();




    foreach ( QUCREATIVE_THEME_MOD_KEYS as $key ) {
      $value = get_theme_mod( $key );

      $theme_mods[ $key ] = $value;
    }


    $this->theme_data['theme_mods'] = $theme_mods;



    foreach($this->theme_data['theme_mods'] as $lab => $tm_val){

      if(is_string($tm_val)){
        $this->theme_data['theme_mods'][$lab] = esc_html($tm_val);
      }

    }




    if(!isset($this->theme_data['theme_mods']['enable_ajax'])){
      $uns =  array();
      foreach ($this->theme_data['customizer_fields']  as  $cf){
        $uns[$cf['name']] = $cf['default'];
      }
      $this->theme_data['theme_mods'] = array_merge($uns, $this->theme_data['theme_mods']) ;
      update_option('theme_mods_qucreative',$uns);
    }









    foreach ($this->theme_data['customizer_fields']   as  $cf){

      $val = $this->get_theme_mod_and_sanitize($cf['name']);

      $this->theme_data['theme_mods'][$cf['name']] = $val;



      if($val==''){

        $this->theme_data['theme_mods'][$cf['name']] = $cf['default'];
      }
    }







    qucreative_view_controller_socialIcons($this);



    add_action( 'wp_enqueue_scripts', array($this, 'handle_wp_enqueue_scripts') );
    add_action( 'wp_default_scripts', array($this, 'handle_wp_default_scripts') );
    add_action('init', array($this, 'handle_init'));
  }

  /**
   * move to plugin
   * @return void
   */
  function handle_wp_enqueue_scripts() {

    if ( ! is_admin() ) {
      // Remove jQuery
      wp_deregister_script( 'jquery' );

      // Register it again, in the footer
      wp_register_script(
        'jquery',
        includes_url( '/js/jquery/jquery.min.js' ),
        false,
        null,
        true // Load in footer
      );
      wp_enqueue_script( 'jquery' );
    }
  }
  /**
   * move to plugin
   * @return void
   */
  function handle_wp_default_scripts() {

    if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
      $scripts->registered['jquery']->deps = array_diff(
        $scripts->registered['jquery']->deps,
        array( 'jquery-migrate' )
      );
    }
  }
  public function handle_init(): void {
















    if(is_admin()) {
      setcookie('vchideactivationmsg', '1', strtotime('+3 years'), '/');
      setcookie('vchideactivationmsg_vc11', (defined('WPB_VC_VERSION') ? WPB_VC_VERSION : '1'), strtotime('+3 years'), '/');


      // todo: move to classAdmin
      add_action('add_meta_boxes',array($this, 'qucreative_handle_add_meta_boxes'));

    }

    $font_data_str = $this->get_theme_mod_and_sanitize('font_data');





    parse_str($font_data_str, $this->theme_data[QUCREATIVE_VIEW_FONT_PARSED]);

    $this->theme_data['secondary_content_height'] = $this->get_theme_mod_and_sanitize('secondary_content_height', array('type'=>'int'));

    if( isset($_GET['customize_changeset_uuid']) && ($_GET['customize_changeset_uuid']) ){
      $this->theme_data['sw_is_in_customizer'] = true;
    }











    // -- header



  }

  public function qucreative_handle_add_meta_boxes(){




    add_meta_box('qucreative_meta_gallery', esc_html__('Page Gallery','qucreative'),array($this, 'qucreative_admin_meta_gallery'),'page','side');
    add_meta_box('qucreative_meta_gallery', esc_html__('Page Gallery','qucreative'),array($this, 'qucreative_admin_meta_gallery'),'post','side');




  }

  function qucreative_admin_meta_gallery() {

    // -- this is the meta box
    global $post;

    ?>
    <div id="product_images_container">
      <ul class="dzs_item_gallery_list">
        <?php
        $product_image_gallery = '';
        if (metadata_exists('post',$post->ID,'qucreative_'.'meta_image_gallery')) {
          $product_image_gallery = get_post_meta($post->ID,'qucreative_'.'meta_image_gallery',true);
        }

        $attachments = array_filter(explode(',',$product_image_gallery));

        if ($attachments) {
          foreach ($attachments as $attachment_id) {
            echo '<li class="item-element" data-id="'.$attachment_id.'">
						<div class="the-image the-handler">
'.wp_get_attachment_image($attachment_id,'thumbnail',false, array( "class" => "img-responsive " ) ).'
</div>
<div class="ui-delete"></div>
<div class="ui-edit">'.esc_html__("Edit",'qucreative').'</div>';



            $att_meta =array();

            $att_meta = wp_prepare_attachment_for_js($attachment_id);


            ?>
            <div class="ui-edit-field">
              <div class="ui-edit-field-close"><i class="fa fa-times-circle"></i></div>

              <input type="hidden" name="<?php echo 'qucreative_'; ?>meta_post_id" value="<?php echo $attachment_id; ?>"/>
              <div class="setting">
                <h5><?php echo esc_html__("Title",'qucreative'); ?></h5>
                <input class="q-att-meta-edit-field" type="text" name="<?php echo 'qucreative_'; ?>meta_post_excerpt"  value="<?php $aux = $att_meta['caption']; $aux = str_replace('"', '', $aux); echo $aux; ?>"/>
              </div>

              <div class="setting for-selected-template-gallery-creative">
                <h5><?php echo esc_html__("Description",'qucreative'); ?></h5>
                <textarea class="q-att-meta-edit-field" type="text" name="<?php echo 'qucreative_'; ?>meta_post_content"><?php $aux = $att_meta['description']; $aux = str_replace('"', '', $aux); echo $aux; ?></textarea>
              </div>

              <div class="setting not-for-selected-template-gallery-creative">
                <h5><?php echo esc_html__("Aligment",'qucreative'); ?></h5>
                <?php


                $seekval = 'right';
                $lab = 'qucreative_'.'meta_att_aligment';

                if(get_post_meta($attachment_id, $lab,true)){
                  $seekval = get_post_meta($attachment_id, $lab,true);
                }



                $arr_opts = array(
                  array(
                    'label'=>esc_html__("Right",'qucreative'),
                    'value'=>'right',
                  ),
                  array(
                    'label'=>esc_html__("Left",'qucreative'),
                    'value'=>'left',
                  ),
                );


                echo qucreative_helpers_generate_select($lab, array(
                  'class'=>'qucreative-att-meta-edit-field q-att-meta-edit-field',
                  'options'=>$arr_opts,
                  'seekval'=>$seekval,
                ))
                ?>
              </div>



              <?php

              $lab = 'qucreative_'.'meta_att_video';
              $seekval = get_post_meta($attachment_id, $lab,true);


              ?>
              <div class="setting for-selected-template-gallery-creative">
                <h5><?php echo esc_html__("Attached Video",'qucreative'); ?></h5>
                <input class="qucreative-att-meta-edit-field q-att-meta-edit-field" type="text" name="<?php echo $lab; ?>" value="<?php echo $seekval; ?>"/>
              </div>



              <?php

              $lab = 'qucreative_'.'meta_att_enable_video_cover';
              $seekval = get_post_meta($attachment_id, $lab,true);


              ?>
              <div class="setting for-selected-template-gallery-creative">
                <h5><?php echo esc_html__("Enable Video Cover",'qucreative'); ?></h5>
                <?php




                $arr_opts = array(
                  array(
                    'label'=>esc_html__("Off",'qucreative'),
                    'value'=>'off',
                  ),
                  array(
                    'label'=>esc_html__("On",'qucreative'),
                    'value'=>'on',
                  ),
                );

                echo qucreative_helpers_generate_select($lab, array(
                  'class'=>'q-att-meta-edit-field',
                  'options'=>$arr_opts,
                  'seekval'=>$seekval,
                ))
                ?>
              </div>
            </div>
            <?php


            echo '</li>';
          }
        }
        ?>
      </ul>

      <input type="hidden" id="<?php echo 'qucreative_'; ?>meta_image_gallery" name="<?php echo 'qucreative_'; ?>meta_image_gallery" value="<?php echo esc_attr($product_image_gallery); ?>" />
      <button class="button-secondary dzs-add-gallery-item"><?php echo esc_html__("Add Media", 'qucreative'); ?></button>
    </div>
    <?php
  }


  /**
   * @param WP_Post | null $postForMeta
   * @return void
   */
  function themeData_setPostForMeta(?WP_Post $postForMeta) {
    $this->theme_data['post_for_meta'] = $postForMeta;
  }

  function themeData_setViewTitle(?string $viewTitle) {
    $this->theme_data['view_title'] = $viewTitle;

  }

  function get_theme_mod_and_sanitize($arglab, $args = array()){


    $defaultArgs = $args;
    if(!is_array($defaultArgs)){
      $defaultArgs = array();
    }
    $margs = array_merge(array('type'=>'string', 'cacheIt'=>true), $defaultArgs);


    $argVal = $this->theme_data['theme_mods'][$arglab] ?? get_theme_mod($arglab);

    if($margs['cacheIt']===false){
      $argVal = get_theme_mod($arglab);
    }



    $argVal = esc_html($argVal);

    if($arglab=='social_icons'){
      $argVal = str_replace('&quot;','"',$argVal);
    }
    if($arglab==QUCREATIVE_OPTION_FONT_NAME){

      $argVal = str_replace('&amp;','&',$argVal);
    }

    if($margs['type']=='int'){


      if(!is_numeric(intval($argVal, 10 ))){
        return null;
      }

      return intval($argVal, 10 );
    }

    return $argVal;

  }



}
