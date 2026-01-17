<?php


add_filter( 'body_class', 'qucreative_filter_body_classes', 10, 3 );

add_filter('excerpt_more', 'qucreative_filter_excerpt_more', 30);
add_filter('the_content_more_link', 'qucreative_filter_content_more_link', 10, 2);








include_once 'view/filters/body_classes.php';



