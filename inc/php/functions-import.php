<?php


add_action('admin_menu','qucreative_handle_admin_menu');
function qucreative_handle_admin_menu(){


  add_theme_page( esc_html__("Import Demo",'qucreative'), esc_html__("Import Demo",'qucreative'), 'edit_theme_options', 'qucreative_import_demo', 'qucreative_page_import_demo' );



}

function qucreative_page_import_demo(){

  include get_parent_theme_file_path("class_parts/page_importdemo.php");


}

add_action('wp_ajax_qucreative_import_demo','qucreative_ajax_import_demo');
function qucreative_ajax_import_demo(){

  include "class_parts/sampledata/importdemo.php";
  die();
}