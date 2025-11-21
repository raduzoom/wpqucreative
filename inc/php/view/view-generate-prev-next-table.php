<?php
function qucreative_generate_prev_next_table($arg=0, $pargs = array()): string {
  global $qucreative_main;


  $margs = array(
    'include_featured-media-con_div'=>true,
    'img_extra_class'=>'fullwidth',
    'cat'=>'',
  );

  $fout = '';


  if($pargs){
    $margs = array_merge($margs, $pargs);
  }
  $prev_post = get_previous_post();
  $next_post = get_next_post();

  $str_cat = '';



  if(isset($_GET['zfolio-cat']) && $_GET['zfolio-cat']){
    $str_cat = $_GET['zfolio-cat'];



    global $antfarm;




    $taxonomy_name = 'antfarm_port_items_cat';

    if($antfarm){
      $taxonomy_name = $antfarm->name_port_item_cat;
    }

    $post_type = 'antfarm_port_items';

    if($antfarm){
      $post_type = $antfarm->name_port_item;
    }



    $term_id = qucreative_sanitize_term_slug_to_id($_GET['zfolio-cat']);
    $term = get_term($term_id, $taxonomy_name);
    $term_children = get_term_children( $term_id, $taxonomy_name );



    $prev_post = null;
    $next_post = null;


    $wpqargs = array();
    $meta_key = 'dzs_meta_order_for_term_'.$term_id;

    $wpqargs['post_type']=$post_type;
    $wpqargs['posts_per_page']='-1';

    if($term_id){

      $wpqargs['orderby']=array( 'meta_key' => 'DESC','meta_value_num' => 'DESC', 'date' => 'DESC' );
      $wpqargs['meta_query']=array(
        'relation' => 'OR',
        array(
          'key'=>$meta_key,
          'compare' => 'EXISTS'
        ),
        array(
          'key'=>$meta_key,
          'compare' => 'NOT EXISTS'
        )
      );
    }else{

      $wpqargs['orderby']=array('date' => 'DESC' );
    }

    $wpqargs['order']="DESC";

    if($margs['cat'] && $margs['cat']!='all'){




      $arr_cats = explode(',', $margs['cat']);

      if ($wpqargs['post_type'] == 'post') {
        $wpqargs['cat'] = $margs['cat'];
      }






      if ($wpqargs['post_type'] == $antfarm->name_port_item) {
        $wpqargs['tax_query'] = array(
          array(
            'taxonomy' => $taxonomy_name,
            'field' => 'id',
            'terms' => $arr_cats,
          )
        );




        $the_cat = get_term($margs['cat'],$taxonomy_name);



        $the_cat_id = $margs['cat'];
      }



    }
    if(isset($_GET['zfolio-cat']) && $_GET['zfolio-cat']){

      if ($wpqargs['post_type'] == $antfarm->name_port_item) {
        $wpqargs['tax_query'] = array(
          array(
            'taxonomy' => $taxonomy_name,
            'field' => 'id',
            'terms' => array(qucreative_sanitize_term_slug_to_id($_GET['zfolio-cat'])),
          )
        );

      }
    }



    // -- start the LOOP
    $args_wpqargs = array();
    // -- lets parse custom wp query args

    if(isset($margs['wpqargs']) && $margs['wpqargs']){

      $margs['wpqargs'] = html_entity_decode($margs['wpqargs']);
    }else{
      $margs['wpqargs'] = '';
    }
    parse_str($margs['wpqargs'],$args_wpqargs);


    if (!isset($args_wpqargs) || $args_wpqargs == false || is_array($args_wpqargs) == false) {
      $args_wpqargs = array();
    }
    $wpqargs = array_merge($wpqargs,$args_wpqargs);


    $query = new WP_Query($wpqargs);




    global $post;
    foreach ($query->posts as $lab=>$po){
      if($po->ID == $post->ID){





        if(isset($query->posts[$lab-1])){
          $next_post = $query->posts[$lab-1];
        }else{
          $next_post = null;
        }
        if(isset($query->posts[$lab+1])){
          $prev_post = $query->posts[$lab+1];
        }else{
          $prev_post = null;
        }
        break;
      }
    }




  }


  // -- portfolio
  $fout.= '<div class="display-table portfolio-link-con">';


  if($next_post){


    $link = get_permalink($next_post->ID);

    if($str_cat){
      $link = add_query_arg('zfolio-cat',$str_cat,$link);
    }

    $fout.= '<a href="'.$link.'" class="left-td portfolio-link--title">
                                        ';


    $feat_image = wp_get_attachment_image_src( get_post_thumbnail_id($next_post->ID) ,'thumbnail');
    if($feat_image && $feat_image[0]){
      $fout.= '<span class="link-thumb" style="background-image: url('.$feat_image[0].');">
                                        </span>';
    }

    $fout.= '<h5 class="link-title">
                                            '.($next_post->post_title).'
                                        </h5>

                            </a>';
  }else{

    $fout.= '<a href="#" class="left-td portfolio-link--title empty-portfolio-link--title"><span class="link-thumb" style="background-image: url();">
                                        </span><span class="link-title">
                                        </span></a>';


  }






  $pagePort = get_post($qucreative_main->theme_data['theme_mods']['portfolio_page']);




  $link = site_url();

  if(isset( $pagePort->ID )){
    $link = get_permalink( $pagePort->ID );
  }



  $fout.= '<div class="center-td portfolio-link--toback" style="">
                                <a class="custom-a portfolio-link--toback-a donotchange-ajax-menu" href="'.$link.'">

                                    <i class="fa-th fa"></i>
                                </a>
                            </div>';



  if($prev_post && isset($prev_post->ID)){



    $link = get_permalink($prev_post->ID);

    if($str_cat){
      $link = add_query_arg('zfolio-cat',$str_cat,$link);
    }

    $fout.= '<a href="'.$link.'" class="right-td portfolio-link--title">
                                        <h5 class="link-title ">
                                            '.($prev_post->post_title).'
                                        </h5>';

    $feat_image = wp_get_attachment_image_src( get_post_thumbnail_id($prev_post->ID) ,'thumbnail');
    if($feat_image && $feat_image[0]){
      $fout.= '<span class="link-thumb" style="background-image: url('.$feat_image[0].');">
                                        </span>';
    }


    $fout.='</a>';
  }else{

  }

  $fout.='</div>';
  return $fout;

}
