<?php
include_once QUCREATIVE_THEME_DIR.'inc/php/view/generate-qu-loop--post.php';

/**
 * called in loops
 * @param $template
 * @param $type
 * @param $pargs
 * @return void
 */
function qucreative_get_view($template, $type, $pargs=array()){

  global $post;


  global $qucreative_main;

  $type = $qucreative_main->theme_data['view_loop_data']['loop_type'];
  $margs = array(
    'query_type'=>'page',
    'post_type'=>'post',
    'template_type'=>'normal',
    'type'=>$type, // "loop" or "content_page"
    'call_from'=>'default',

  );
  if($post){
    $margs['post_type']=$post->post_type;
  }

  if($pargs && is_array($pargs)){
    $margs = array_merge($margs,$pargs);
  }



  if($type=='content_page'){


    if($margs['template_type']=='normal'){





    }


    // -- content page


    while ( have_posts() ){

      the_post();

      if ( current_user_can('edit_posts') )  {
        echo  "<a class='edit-btn edit-btn-for-content_page custom-a' href=\"".get_edit_post_link($post->ID).'">'.esc_html__("Edit",'qucreative').'</a>';
      }


      if( !( ( $post->post_type == 'quextend_port_items') && get_post_meta( $post->ID, 'qucreative_'.'meta_is_fullscreen', true ).$qucreative_main->theme_data['page_extra_meta_label']=='on') ){

        echo qucreative_generate_featured_media($post->ID);
      }




      if($post && ( $post->post_type == 'quextend_port_items') && get_post_meta( $post->ID, 'qucreative_'.'meta_is_fullscreen'.$qucreative_main->theme_data['page_extra_meta_label'], true )!='on'){


        echo '<div class="post-content-con the-content-sheet-text post-content-con-type-quextend_port_items  desc-content-wrapper ">';
        echo '<div class="row from-quextend_port_items-meta"><div class="col-md-4 from-quextend_port_items-meta from-functions ">';



        echo '<h3 class="main-portfolio-single-title h-group-2" style="">'.$post->post_title.'</h3>';

        if(get_post_meta($post->ID, 'qucreative_'.'meta_port_subtitle'.$qucreative_main->theme_data['page_extra_meta_label'],true)){
          echo '<div class="portfolio-single-subtitle font-group-1">'.get_post_meta($post->ID, 'qucreative_'.'meta_port_subtitle'.$qucreative_main->theme_data['page_extra_meta_label'],true).'</div>';



          echo qucreative_generate_portfolio_item_blockquote($post->ID);
        }


        echo '</div><!--end .col-md-4-->';
        echo '<div class="col-md-8 from-quextend_port_items-meta">';
      }



      $post_type = 'page';



      if($post && $post->post_type=='post'){

        $title = $post->post_title;


        if (get_post_meta($post->ID,'qucreative_'.'meta_custom_title'.$qucreative_main->theme_data['page_extra_meta_label'],true)) {
          $title = get_post_meta($post->ID,'qucreative_'.'meta_custom_title'.$qucreative_main->theme_data['page_extra_meta_label'],true);
        }



        $link = get_permalink($post->ID);





        echo '<section class="vc_section from-post-type qu-loop--header--the-content-sheet--wrapper "><div class="qu-loop--header--the-content-sheet the-content-sheet post-type--post">';




        echo '<div class="post-main-link-con" style=""><div class="custom-a post-main-link ajax-link h-group-2" >'.$title.'</div></div>';


        echo qucreative_get_post_meta(array(
          'call_from'=>'single_post'
        ));

        echo '</div></section><!-- end .vc_section -->';


        $post_type = $post->post_type;


      }
      // -- Include the page content template.
      do_action('qucreative_single_before_the_content');
      get_template_part( 'content', $post_type );
      do_action('qucreative_single_after_the_content');


      if($post && ( $post->post_type == 'quextend_port_items') && get_post_meta( $post->ID, 'qucreative_'.'meta_is_fullscreen'.$qucreative_main->theme_data['page_extra_meta_label'], true )!='on'){

        echo '</div><!--end .col-md-8-->';
        echo '</div><!--end .row-->';
      }



      // -- move
      if($post && ( $post->post_type == 'quextend_port_items') ){




        $social_shares = quextend_qu_get_social_shares();


        // -- if it's fullscreen then we already have the social shares
        if(get_post_meta( $post->ID, 'qucreative_'.'meta_is_fullscreen', true )!='on'){
          if($social_shares){
            echo '<div class="social-con">'.$social_shares.'</div><!-- social con for portfolio item normal -->';
          }
        }





      }
      if($post && ( $post->post_type == 'quextend_port_items') && get_post_meta( $post->ID, 'qucreative_'.'meta_is_fullscreen'.$qucreative_main->theme_data['page_extra_meta_label'], true )!='on') {
        echo '</div><!--end .the-content-sheet-text-->';
      }




      ?>
      <!-- end .post-content-con -->
      <?php


      if($qucreative_main->theme_data['post_content_has_translucent_layer']){
        echo '</div><!-- end translucent-layer-->';
      }





      do_action('qucreative_loop_single_after_the_content_translucent_layer');


      // -- If comments are open or we have at least one comment, load up the comment template.








      if ( $qucreative_main->theme_data['post_for_meta'] && ($qucreative_main->theme_data['post_for_meta']->post_type=='post' || $qucreative_main->theme_data['post_for_meta']->post_type=='page') && ($qucreative_main->theme_data['post_for_meta']->comment_status =='open' || intval($qucreative_main->theme_data['post_for_meta']->comment_count) ) ){


        echo '<div class="the-content-sheet the-content-sheet-for-comments">';
        comments_template();
        echo '</div>';
      }

      // End the loop.
    }

    if($margs['template_type']=='normal') {

    }

  }
  if($type=='loop'){

    global $wp_query;



    $searched_query = '';

    $font_type = 'h-group-2';

    if($margs['type']=='search'){
      $searched_query = get_search_query();
    }
    if($margs['type']=='archive'){
      $searched_query = single_cat_title( '', false );
      $font_type = 'h3';
    }

    if($searched_query){

      echo '<div class="searched-query '.$font_type.'">'. $searched_query.'</div>';

    }



    $qucreative_main->view_loop_currIndex = 0;
    while (have_posts()){
      qucreative_get_view__printPost();
      // -- End the loop.
      $qucreative_main->view_loop_currIndex++;
    }

    if(isset($wp_query->posts) && is_array($wp_query->posts) && count($wp_query->posts)==0){

      get_template_part('content', 'none');
    }

    echo qucreative_pagination($wp_query->max_num_pages,5,array(

      'container_class'=>'qucreative-pagination from-loop',
      'include_raquo'=>false,
      'a_class'=>'pagination-link ajax-link custom-a ajax-link--blog-page bg-color-hg-on-hover color-hg-on-parent-active donotchange-ajax-menu',
      'style'=>'ul',
      'wrap_before_text'=>'<span class="the-number">',
      'wrap_after_text'=>'</span>',
    ));





    ob_start();
    posts_nav_link();

    ob_end_clean();

  }


  if($type=='footer') {



  }


}
