<?php



function qucreative_filter_content_more_link($more_link, $more_link_text): string {
  global $post;
  return '<p class="read-more-p"><a class="read-more-a custom-a color-highlight color-border-bottom-on-hover" href="'.get_permalink($post->ID).'#more-'.$post->ID.'">'.esc_html__("Continue reading",'qucreative') .' <span class="meta-nav">&rarr;</span></a></p>';


}

function qucreative_filter_excerpt_more($more): string {
  global $post;


  return '<p class="read-more-p"><a class="read-more-a custom-a color-highlight color-border-bottom-on-hover" href="'.get_permalink($post->ID).'">'.esc_html__("Continue reading",'qucreative') .' <span class="meta-nav">&rarr;</span></a></p>';
}


