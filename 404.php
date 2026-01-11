<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage qucreative
 */


get_header();
echo '<!-- the-content-sheet start --><article class="the-content-sheet ';

echo '">';





echo '<div class="the-content-sheet-text">';


echo '<div class="row row-margin"><div class="col-md-4"><h2 class="header-404">';
echo '404';
echo '</h2>';

echo '<p class="font-group-1 text-404">'.esc_html__("It seems that you're lost",'qucreative').'<br>';
echo esc_html__("Maybe searching again might help",'qucreative');
echo '</p>';



echo '</div>';



echo '<div class="col-md-8">
            <div class="widget sidebar-block widget_search widget_search_404">';
                get_search_form();
echo '      </div>
        </div>
';

echo '</div>';

echo "</div>";
echo "</article><!-- the-content-sheet END -->";



get_footer();