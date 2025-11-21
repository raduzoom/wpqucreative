<?php


add_filter('qucreative_get_only_url_of_author_link','qucreative_filter_get_only_url_of_author_link',2);
add_filter( 'body_class', 'qucreative_filter_body_classes', 10, 3 );
add_filter('the_content', 'qucreative_filter_the_content_before',2);

add_filter('excerpt_more', 'qucreative_filter_excerpt_more', 30);
add_filter('the_content_more_link', 'qucreative_filter_content_more_link', 10, 2);






if(function_exists('qucreative_filter_get_only_url_of_author_link')==false){
  function qucreative_filter_get_only_url_of_author_link($arg){


    preg_match("/href=['|\"](.*?)['|\"]/i", $arg, $matches);


    if($matches && isset($matches[1])){

      return $matches[1];
    }else{
      return '';
    }
  }
}



include_once 'view/filters/body_classes.php';



function qucreative_filter_the_content_before($content= ''): string {

  // -- before do_shortcode

  $fout = '';



  $fout.=$content;




  global $post;
  global $qucreative_main;
  global $antfarm;





  if($qucreative_main->theme_data['replace_string_in_content_with_nada']){


    $fout = str_replace($qucreative_main->theme_data['replace_string_in_content_with_nada'],'',$fout);

  }








  $post_type_for_portfolio = 'antfarm_port_items';

  if($antfarm && isset($antfarm->name_port_item)){
    $post_type_for_portfolio = $antfarm->name_port_item;
  }









  if(strpos($content,'[vc_section')===false && !($post && ($post->post_type==$post_type_for_portfolio))  && ($qucreative_main->theme_data['page_type']!='page-portfolio') ){
    $qucreative_main->theme_data['content_acts_as_sheet'] = true;
  }





  if($post && ($antfarm && $post->post_type==$antfarm->name_port_item)){
    $qucreative_main->theme_data['content_acts_as_sheet'] = false;
    $fout = preg_replace("/\[vc_section.*?\]/i", "", $fout);;

    $fout = str_replace('[/vc_section]', '',$fout);
  }



  return $fout;

}
