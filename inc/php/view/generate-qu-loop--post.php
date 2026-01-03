<?php

function qucreative_get_view__printPost(): void{

  global $qucreative_main, $post;



  the_post();



  $img = '';
  if($post){
    $img = qucreative_get_featured_image($post->ID);

  }


  $featured_media = '';

  if($img){
    $featured_media = $img;
  }


  echo '<!-- the-content-sheet start --><article class="the-content-sheet blog-single-block';

  if($qucreative_main->view_loop_currIndex==0){
    echo ' first-loop-post';
  }

  if(!$featured_media){
    echo ' does-not-have-featured-media';
  }else{
    echo ' has-media';
  }




  $arr = get_post_class('', $post->ID);


  foreach ($arr as $pc){
    echo ' '.$pc;
  }

  echo '">';

  if ( current_user_can('edit_posts') )  {
    echo  "<a class='edit-btn custom-a' href=\"".get_edit_post_link($post->ID).'">'.esc_html__("Edit",'qucreative').'</a>';
  }


  echo qucreative_generate_featured_media($post->ID);


  echo '<div class="post-content-con">';




  $title = $post->post_title;


  if (get_post_meta($post->ID,'qucreative_'.'meta_custom_title'.$qucreative_main->theme_data['page_extra_meta_label'],true) && get_post_meta($post->ID,'qucreative_'.'meta_custom_title'.$qucreative_main->theme_data['page_extra_meta_label'],true)!=' ') {
    $title = get_post_meta($post->ID,'qucreative_'.'meta_custom_title'.$qucreative_main->theme_data['page_extra_meta_label'],true);
  }





  $link = get_permalink($post->ID);






  echo '<div class="post-main-link-con from-q-get-view" style=""><a class="custom-a post-main-link ajax-link h-group-2 donotchange-ajax-menu" href="'.$link.'">'.$title.'</a></div>';


  echo qucreative_get_post_meta();

  echo '<hr class="extend-margin-30">';

  // Include the page content template.
  echo '<div class="paragraph paragraph-from-excerpt">';



  if(strpos($post->post_content,'<!--more')!==false){

    $my_excerpt = get_the_content('{{replacewithreadmoretagtext}}',true);
  }else{

    $my_excerpt = get_the_excerpt();
  }

  if ( '' != $my_excerpt ) {



  }
  echo $my_excerpt;
  echo '</div>';



  echo '</div>';

  echo '</article><!-- end content sheet -->';



}
