<?php





function qucreative_import_demo_save_image($arg, $upload_dir_path){


  $file = $arg;
  $url="https://zoomthe.me/qimages/".$file;


  $save_path=$upload_dir_path.'/'.$file;


}

function qucreative_import_demo_update_widget($option_name,$option_value) {

  global $wpdb;




  if($option_name=='sidebar_widgets'){


    $table_name = $wpdb->prefix . 'options';







    $wpdb->query( $wpdb->prepare( "UPDATE $table_name SET option_value = '%s' WHERE option_name = '%s'",$option_value,$option_name) );


  }else{

    update_option( $option_name, unserialize($option_value));

  }
  return true;

}





function qucreative_import_demo_generate_zfolio_item($pargs = array()) {



  global $antfarm;



  $margs = array(

    'tax_slug' => '',
    'post_slug' => '',
    'page_slug' => '',
    'demo_name' => '',
    'demo_slug' => '',
    'img_url' => '',

  );

  $margs = array_merge($margs, $pargs);

  ?><div class="zfolio-item <?php

  $taxonomy = 'antfarm_port_items_cat';





  if($antfarm){

    $taxonomy=$antfarm->name_port_item_cat;
  }


  if($margs['tax_slug']){

    $term = get_term_by('slug', $margs['tax_slug'], $taxonomy);

    if($term){
      echo ' already-installed';
    }
  }

  $link = '';


  $demo_slug = '';
  if($margs['page_slug']){
    $link = $margs['page_slug'];
    $demo_slug = $margs['page_slug'];
  }

  if($margs['tax_slug']){
    $link = $margs['tax_slug'];
    $demo_slug = $margs['tax_slug'];
  }
  if($margs['demo_slug']){

    $demo_slug = $margs['demo_slug'];
  }



  if(isset($margs['link'])){
    $link = $margs['link'];
  }


  if($margs['page_slug']){

    $the_slug = $margs['page_slug'];
    $args = array(
      'name'        => $the_slug,
      'post_type'   => 'page',
      'post_status' => 'publish',
      'numberposts' => 1
    );
    $my_posts = get_posts($args);

    if( $my_posts ){

      echo ' already-installed';
    }else{
    }
  }


  $img_url = $demo_slug.'';
  if($margs['img_url']) {
    $img_url = $margs['img_url'];
  }
  ?> " data-thumbnail="">
  <div href="#" class="zfolio-item--inner custom-a  donotchange-ajax-menu"   data-type="image">
    <div class="zfolio-item--inner--inner">
      <div class="zfolio-item--inner--inner--inner">
        <div class="the-thumb" style="background-image:url(<?php echo QUCREATIVE_THEME_URL.'placeholders/importdemo/'.$img_url.'.jpg'; ?>); ">

        </div>
        <div class="item-meta">
          <div class="the-title  h5 ">QU <?php echo $margs['demo_name']; ?></div>
          <div class="the-desc  font-group-1"><a href="http://creativewpthemes.net/main-demo-dev/<?php echo $link; ?>" target="_blank" class="preview-btn">preview</a> / <a href="#" class="install-btn " data-demo="<?php echo $demo_slug; ?>">install</a></div>
        </div>
        <!--end item-meta-->
      </div>
    </div>
  </div>

  <fig class="loading-overlay" >
    <i class="fa fa-circle-o-notch fa-spin loading-icon" aria-hidden="true"></i>
  </fig>
  <!--end zfolio-item--inner-->
  <div class="the-overlay-anchor">
  </div>


  </div><?php
}





function qucreative_import_demo_create_term_if_it_does_not_exist($pargs = array()) {


  $margs = array(

    'term_name' => '',
    'slug' => '',
    'taxonomy' => '',
    'description' => '',
    'parent' => '',
  );

  $margs = array_merge($margs, $pargs);

  $term = get_term_by('slug', $margs['slug'], $margs['taxonomy']);


  if ($term) {

  } else {


    $args = array(
      'description' => $margs['description'],
      'slug' => $margs['slug'],


    );

    if ($margs['parent']) {
      $args['parent'] = $margs['parent'];
    }

    $term = wp_insert_term($margs['term_name'], $margs['taxonomy'], $args);

  }
  return $term;

}









function qucreative_import_demo_create_portfolio_item($pargs = array()) {





  global $antfarm;

  $margs = array(

    'post_title'=>'',
    'post_content'=>'',
    'post_status'=>'',
    'post_type'=>$antfarm->name_port_item,
  );

  $margs = array_merge($margs, $pargs);



  $args = array(
    'post_type' => $margs['post_type'],
    'post_title' => $margs['post_title'],
    'post_content' => $margs['post_content'],
    'post_status'=>$margs['post_status'],



    // -- other default parameters you want to set
  );



  $post_id = wp_insert_post($args);

  return $post_id;


}

function qucreative_import_demo_insert_post_complete($pargs = array()) {





  global $antfarm;
  global $qucreative_main;




  $post_type = 'antfarm_port_item';

  if($antfarm && $antfarm->name_port_item){
    $post_type = $antfarm->name_port_item;
  }

  $margs = array(

    'post_title'=>'',

    'post_content'=>'',
    'post_type'=>$post_type,
    'post_status'=>'publish',
    'img_url'=>'',
    'img_path'=>'',
    'term'=>'',
    'taxonomy'=>'',
    'attach_id'=>'',
    'qucreative_'.'meta_post_media_type'=>'image',
    'qucreative_'.'meta_post_media'=>'default',
    'qucreative_'.'meta_port_optional_info_1'=>'',
    'qucreative_'.'meta_port_optional_info_2'=>'',
    'qucreative_'.'meta_port_subtitle'=>'',
    'qucreative_'.'meta_port_website'=>'',
    'qucreative_'.'meta_video_cover_image'=>'',
    'qucreative_'.'meta_image_gallery_in_meta'=>'',
    'qucreative_'.'meta_post_layout_for_excerpt'=>'',

  );

  $margs = array_merge($margs, $pargs);




  $args = array(
    'post_type' => $margs['post_type'],
    'post_title' => $margs['post_title'],
    'post_content' => $margs['post_content'],
    'post_status'=>$margs['post_status'],



    // -- other default parameters you want to set
  );

  $term = $margs['term'];
  $taxonomy = $margs['taxonomy'];
  $img_url = $margs['img_url'];
  $img_path = $margs['img_path'];


  if($margs['qucreative_'.'meta_post_media']=='default'){
    $margs['qucreative_'.'meta_post_media'] = $img_url;
  }
  if($margs['qucreative_'.'meta_post_media']=='none'){
    $margs['qucreative_'.'meta_post_media'] = '';
  }




  $port_id = qucreative_import_demo_create_portfolio_item($args);



  if($taxonomy && $term){

    wp_set_post_terms( $port_id, qucreative_sanitize_for_post_terms($term), $taxonomy );
  }


  // -- no need to sanitize as it is from developer input

  if($margs['qucreative_'.'meta_post_media_type']){
    update_post_meta($port_id,'qucreative_'.'meta_post_media_type',$margs['qucreative_'.'meta_post_media_type']);
  }

  if($margs['qucreative_'.'meta_post_media']){
    update_post_meta($port_id,'qucreative_'.'meta_post_media',$margs['qucreative_'.'meta_post_media']);
  }

  if($margs['qucreative_'.'meta_port_subtitle']){
    update_post_meta($port_id,'qucreative_'.'meta_port_subtitle',$margs['qucreative_'.'meta_port_subtitle']);
  }


  if($margs['qucreative_'.'meta_port_optional_info_1']){
    update_post_meta($port_id,'qucreative_'.'meta_port_optional_info_1',$margs['qucreative_'.'meta_port_optional_info_1']);
  }
  if($margs['qucreative_'.'meta_port_optional_info_2']){
    update_post_meta($port_id,'qucreative_'.'meta_port_optional_info_2',$margs['qucreative_'.'meta_port_optional_info_2']);
  }
  if($margs['qucreative_'.'meta_port_website']){
    update_post_meta($port_id,'qucreative_'.'meta_port_website',$margs['qucreative_'.'meta_port_website']);
  }
  if($margs['qucreative_'.'meta_video_cover_image']){
    update_post_meta($port_id,'qucreative_'.'meta_video_cover_image',$margs['qucreative_'.'meta_video_cover_image']);
  }
  if($margs['qucreative_'.'meta_image_gallery_in_meta']){
    update_post_meta($port_id,'qucreative_'.'meta_image_gallery_in_meta',$margs['qucreative_'.'meta_image_gallery_in_meta']);
  }
  if($margs['qucreative_'.'meta_post_layout_for_excerpt']){
    update_post_meta($port_id,'qucreative_'.'meta_post_layout_for_excerpt',$margs['qucreative_'.'meta_post_layout_for_excerpt']);
  }









  if($margs['attach_id']){

    set_post_thumbnail( $port_id, $margs['attach_id'] );
  }else{

    if($img_url && $img_path){

      $attach_id = qucreative_import_demo_create_attachment($img_url, $port_id, $img_path);
      set_post_thumbnail( $port_id, $attach_id );

      $qucreative_main->theme_data['import_demo_last_attach_id'] = $attach_id;
    }

  }





  return $port_id;



}



function qucreative_import_demo_create_attachment($img_url, $port_id, $img_path){






  $attachment = array(
    'guid'           => $img_url,
    'post_mime_type' => 'image/jpeg',
    'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $img_url ) ),
    'post_content'   => '',
    'post_status'    => 'inherit'
  );

// -- Insert the attachment.
  $attach_id = wp_insert_attachment( $attachment, $img_url, $port_id );


  require_once( ABSPATH . 'wp-admin/includes/image.php' );

// -- Generate the metadata for the attachment, and update the database record.
  $attach_data = wp_generate_attachment_metadata( $attach_id, $img_path );

  wp_update_attachment_metadata( $attach_id, $attach_data );

  return $attach_id;
}



function qucreative_get_preview_cookie(&$arg, $lab): void {

  global $qucreative_main;


  if(!isset($_GET['customize_changeset_uuid'])){



    if(isset($_GET[$lab]) && $_GET[$lab]!==''){
      $qucreative_main->theme_data['preview_cookies'][$lab] = $_GET[$lab];
      setcookie($lab,$_GET[$lab],time() + 3600, COOKIEPATH, COOKIE_DOMAIN);
    }else{

      if(isset($_COOKIE[$lab]) && $_COOKIE[$lab]){

        $qucreative_main->theme_data['preview_cookies'][$lab] = $_COOKIE[$lab];
      }
    }

    if(isset($qucreative_main->theme_data['preview_cookies'][$lab]) && $qucreative_main->theme_data['preview_cookies'][$lab]!==''){
      $arg = $qucreative_main->theme_data['preview_cookies'][$lab];

      if($lab=='content_enviroment_style'){


        if($arg=='linked'){
          if($qucreative_main->theme_data['menu_type']=='menu-type-2' || $qucreative_main->theme_data['menu_type']=='menu-type-4' || $qucreative_main->theme_data['menu_type']=='menu-type-6' || $qucreative_main->theme_data['menu_type']=='menu-type-8' || $qucreative_main->theme_data['menu_type']=='menu-type-10' || $qucreative_main->theme_data['menu_type']=='menu-type-12' || $qucreative_main->theme_data['menu_type']=='menu-type-14' || $qucreative_main->theme_data['menu_type']=='menu-type-16' || $qucreative_main->theme_data['menu_type']=='menu-type-18'){

            $arg = 'body-style-light';

          }else{
            $arg = 'body-style-dark';
          }
        }

      }
    }
  }else{



    $qucreative_main->theme_data['sw_is_in_customizer']  = true;
  }
}


