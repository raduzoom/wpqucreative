<?php

include_once QUCREATIVE_THEME_DIR.'inc/php/view/structure/view-structure-print-footer.php';
global $qucreative_main;
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 * @package WordPress
 * @subpackage qucreative
 */

global $post;

qucreative_view_footerEnqueueScripts();



/** @var WP_Post $qucreative_poForMeta post for meta */
$qucreative_poForMeta = $post;

if ($qucreative_main->theme_data['post_for_meta']) {
  $qucreative_poForMeta = $qucreative_main->theme_data['post_for_meta'];
}






qucreative_view_generateFooterForPortfolioItem($qucreative_poForMeta);


$qucreative_viewSidebar = $qucreative_main->quCreativeView->sidebar_get();
if ($qucreative_viewSidebar) {
  echo '</div><! -- end .col-content -->';
}

$qucreative_main->quCreativeView->sidebar_generate($qucreative_poForMeta);;



if ($qucreative_viewSidebar) {
  echo '</div><!-- end row-->';
}
?>
  </div><!-- end .the-content-inner --><?php


if ($qucreative_main->quCreativeView->structureHasFooter) {

  qucreative_view_structure_print_real_footer();
}

?>
  </div><!-- end .the-content -->
  </div><!-- end .the-content-and-title-con -->
  </div><!-- end .the-content-and-title-con-flex -->
<?php

do_action('qucreative_before_end_the_content_con');

?>
</div><!-- end .the-content-con-->

<?php

if(!($qucreative_main->theme_data['menu_type_attr']===QUCREATIVE_VIEW_HORIZONTAL_MENU_TYPE_CSS_CLASS)){
  qucreative_header_generateQuNav();
}
?>

<!-- end navigation -->



<?php
qucreative_view_generatePreloader();
do_action('qucreative_before_end_main_container');
?>
</div><!-- end .main-container -->

<?php
do_action('qucreative_before_wp_footer');





 ?>
</div>

<?php
// -- todo: move to inlinescript json
echo '<div class="qucreative-option-feed" data-rel="mainoptions">' . $qucreative_main->theme_data['view_js_data_for_inline_options'] . '</div>';


wp_footer();
?>
</body>
</html><?php
