<?php
/**
 * only for template-gallery-creative.php
 * @param $post
 * @return void
 */
function qucreative_view_generateTemplateGalleryCreative($post) {

  if ($post && get_post_meta($post->ID, '_wp_page_template', true) == 'template-gallery-creative.php') {


    ?>

    <div class="gallery-thumbs-con">

      <div class="translucent-con translucent-con--for-gallery-thumbs">
        <div class="translucent-overlay"></div>
      </div>
      <div class="thumbs-list-con">

        <ul class="thumbs-list">

        </ul>
      </div>
    </div>

    <div class="the-content-bg-placeholder"></div>

    <?php
  }

}
function qucreative_view_generateSlider($post) {

  global $qucreative_main;


  // todo: separate
  if ($post && get_post_meta($post->ID, '_wp_page_template', true) == 'template-qucreative-slider.php') {


    ?>


    <!-- descriptions for gallery items container -->
    <div class="main-gallery--descs" style="height: 175px;">
      <?php


      $product_image_gallery = '';
      if (get_post_meta($post->ID, 'qucreative_' . 'meta_image_gallery' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
        $product_image_gallery = esc_html(get_post_meta($post->ID, 'qucreative_' . 'meta_image_gallery' . $qucreative_main->theme_data['page_extra_meta_label'], true));

        $attachments = array_filter(explode(',', $product_image_gallery));

        if ($attachments) {


          $i3 = 0;
          foreach ($attachments as $attachment_id) {

            if ($i3 > 0) {
            }

            $i3++;

            $img_full = wp_get_attachment_image_src($attachment_id, 'full');


            $att_meta = wp_prepare_attachment_for_js($attachment_id);


            $caption = $att_meta['caption'];

            $word_count = str_word_count($caption);


            if (stripos($caption, '<br>') === false) {


              $from_index = floor(strlen($caption) / 2 - 1);
              if ($word_count === 2) {
                $from_index = 1;
              }


              $caption = qucreative_str_replace_first(' ', '<br>', $caption, $from_index);
            }


            $str_i3 = $i3;

            if ($i3 < 10) {
              $str_i3 = '0' . $i3;
            }


            if ($att_meta['caption']) {
              echo '<div class="main-gallery--desc ';


              if (get_post_meta($attachment_id, 'qucreative_' . 'meta_meta_att_aligment', true) == 'right' || get_post_meta($attachment_id, 'meta_att_aligment', true) == 'right') {


              } else {
                echo ' style2';
              }


              echo '"><div class="desc-inner">

                    <!-- blur markup -->
                    <div class="translucent-con translucent-con--desc-inner">
                        <div class="translucent-bg"></div>
                        <canvas class="translucent-canvas"></canvas>
                        <div class="translucent-overlay"></div>
                    </div>
                    <!-- blur markup END -->

                        <span class="big-desc">' . $caption . '</span>
                    <span class="big-number">' . $str_i3 . '</span>
                </div></div>';
            } else {
              echo '<div class="main-gallery--desc"></div>';
            }
          }


        }
      }


      ?>
    </div>
    <!-- descriptions for gallery items container END-->


    <!-- button for responsive info -->
    <div class="responsive-info-btn-con">
      <figure>
        <i class="fa fa-info"></i>
      </figure>
      <div class="info-text-con"><h6></h6></div>
    </div>
    <!-- button for responsive info END -->

    <!-- buttons for next / previous markup -->
    <div class="main-gallery-buttons-con style2">

      <div class="prev-btn-con">
        <span class="btn-text"><?php echo esc_html__("PREVIOUS SLIDE", 'qucreative'); ?></span>
        <figure>
          <i class="fa fa-angle-left"></i>
        </figure>
      </div>
      <div class="next-btn-con">
        <span class="btn-text"><?php echo esc_html__("NEXT SLIDE", 'qucreative'); ?></span>
        <figure>
          <i class="fa fa-angle-right"></i>
        </figure>
      </div>
    </div>
    <!-- buttons for next / previous markup END -->

    <?php
  }

}



function qucreative_view_generateTranslucentCon() {
  ?>

  <div class="translucent-con translucent-con--for-nav-con" style="">
    <div class="translucent-overlay"></div>
  </div>
  <?php
}
function qucreative_view_generatePreloader() {

  ?>

  <!-- preloader area -->
  <div class="preloader-con">

    <div class="cube-preloader"></div>
  </div>
  <?php
}
function qucreative_view_generateRevSlider($qucreative_main) {

  global $post;

  $str_w = '100%';
  $str_h = '100vh';
  $str_l = '0';
  $str_t = '0';
  $str_mar_top = '0';
  $str_pad_bot = '0';
  $str_pad_top = '0';
  $str_pad_lef = '0';


  $slider_type = 'fullscreen';

  $sliderAlias = esc_html(get_post_meta($post->ID, 'qucreative_' . 'meta_rev_slider' . $qucreative_main->theme_data['page_extra_meta_label'], true));


  if (class_exists('RevSliderOutput')) {

    $gal_ids = '';
    $settings = array();
    $order = '';

    ob_start();
    if (!empty($gal_ids)) {

      // -- add a gallery based slider
      $slider = RevSliderOutput::putSlider($sliderAlias, '', $gal_ids);
    } else {
      $slider = RevSliderOutput::putSlider($sliderAlias, '', array(), $settings, $order);
    }
    $content = ob_get_contents();
    ob_clean();
    ob_end_clean();;
    $slider_type = $slider->getParam("slider_type", "");


  }


  if ($qucreative_main->theme_data['menu_type'] == 'menu-type-1' || $qucreative_main->theme_data['menu_type'] == 'menu-type-2') {

    $str_w = 'calc(100% - 250px)';


    $str_pad_lef = '250px';

  }


  if ($qucreative_main->theme_data['menu_type'] == 'menu-type-5' || $qucreative_main->theme_data['menu_type'] == 'menu-type-6') {

    $str_w = 'calc(100% - 280px)';

    $str_pad_lef = '280px';

  }


  if ($qucreative_main->theme_data['menu_type'] == 'menu-type-7' || $qucreative_main->theme_data['menu_type'] == 'menu-type-8') {

    $str_w = 'calc(100% - 290px)';

    $str_pad_lef = '290px';

  }


  if ($qucreative_main->theme_data['menu_type'] == 'menu-type-13' || $qucreative_main->theme_data['menu_type'] == 'menu-type-14' || $qucreative_main->theme_data['menu_type'] == 'menu-type-17' || $qucreative_main->theme_data['menu_type'] == 'menu-type-18') {

    $str_h = 'calc(100vh - 100px)';


    if ($qucreative_main->theme_data['theme_mods']['menu_is_sticky'] == 'on') {

      $str_h = 'calc(100vh)';

      $str_pad_top = '100px';
    }

  }


  if ($slider_type == 'fullwidth') {
    $str_h = 'auto';
  }


  if (get_post_meta($post->ID, 'qucreative_' . 'meta_rev_slider_height_mode', true) == 'custom_height' && get_post_meta($post->ID, 'qucreative_' . 'meta_rev_slider_custom_height', true)) {

    $str_h = esc_html(get_post_meta($post->ID, 'qucreative_' . 'meta_rev_slider_custom_height', true)) . 'px';

  }


  echo '<div class="big-revslider-con';

  if ($slider_type == 'fullwidth') {
    echo ' fullwidth';
  }

  if ($slider_type == 'fullscreen') {
    echo ' fullwidth fullscreen';
  }

  echo '" style="width: ' . $str_w . ';height: ' . $str_h . ';left: ' . $str_l . ';top: ' . $str_t . ';padding-bottom: ' . $str_pad_bot . ';margin-top: ' . $str_mar_top . ';';

  if ($str_pad_top) {
    echo ' padding-top: ' . $str_pad_top . ';';
  }
  if ($str_pad_lef) {
    echo ' padding-left: ' . $str_pad_lef . ';';
  }

  echo '">';

  echo do_shortcode('[rev_slider alias="' . esc_attr(get_post_meta($post->ID, 'qucreative_' . 'meta_rev_slider' . $qucreative_main->theme_data['page_extra_meta_label'], true)) . '"]');

  echo '</div>';

}
function qucreative_view_generateContentPortfolio($qucreative_main) {



  $str_slider = '';


    // -- fullscreen and slider


    $product_image_gallery = '';


    $lab = 'qucreative_' . 'meta_image_gallery' . $qucreative_main->theme_data['page_extra_meta_label'];
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, $lab, true)) {


      $product_image_gallery = esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, $lab, true));


    }
    $lab = 'qucreative_' . 'meta_image_gallery_in_meta' . $qucreative_main->theme_data['page_extra_meta_label'];
    if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, $lab, true)) {


      $product_image_gallery = esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, $lab, true));
    }


    if ($product_image_gallery) {

      qucreative_view_enqueue_zoombox();
      $attachments = array_filter(explode(',', $product_image_gallery));


      if ($attachments) {


        $str_slider .= '<div class=" advancedscroller skin-nonav auto-init-from-q" style="margin-bottom: 0;" data-options=\'{
"settings_mode": "onlyoneitem"
,"design_arrowsize": "0"
,"settings_swipe": "on"
,"settings_autoHeight": "off"
,"settings_swipeOnDesktopsToo": "on"
,"settings_slideshow": "off"
,"settings_slideshowTime": "150"
}\'>
                                <ul class="items">';


        $i3 = 0;
        foreach ($attachments as $attachment_id) {

          if ($i3 > 0) {
          }

          $img_full = wp_get_attachment_image_src($attachment_id, 'full');


          $str_slider .= '<li class="item-tobe needs-loading">
                                        <div class="imagediv" style="background-image: url(' . $img_full[0] . ')" style=""></div>
                                    </li>';
          $i3++;
        }


        $str_slider .= ' </ul>
                            </div>';

      }


    };


    return array(
      'str_slider' => $str_slider,
      'product_image_gallery' => $product_image_gallery,
    );
}
function qucreative_view_generateTemplateGallerCreative($qucreative_main) {



  $str_slider = '';


  if (get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_image_gallery' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
    $product_image_gallery = esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_image_gallery', true));

    $attachments = array_filter(explode(',', $product_image_gallery));


    if ($attachments) {


      $str_slider .= '<div id="as-gallery-w-thumbs" class="advancedscroller skin-karma-inset auto-init-from-q" style="width:100%;"><div class="preloader"></div><ul class="items">';


      $i3 = 0;
      foreach ($attachments as $attachment_id) {

        if ($i3 > 0) {
        }

        $img_full = wp_get_attachment_image_src($attachment_id, 'full');
        $img_thumb = wp_get_attachment_image_src($attachment_id, array(100, 100));


        if (get_post_meta($attachment_id, 'qucreative_' . 'meta_att_video', true)) {

          $str_slider .= '<li class="item-tobe " data-source="' . get_post_meta($attachment_id, 'qucreative_' . 'meta_att_video', true) . '" data-gallery-thumbnail="' . $img_thumb[0] . '" data-type="video"  data-width-for-gallery="960" data-height-for-gallery="540">
                            <!-- space for description -->';


          $lab = 'qucreative_' . 'meta_att_enable_video_cover';
          $seekval = esc_attr(get_post_meta($attachment_id, $lab, true));


          if ($seekval == 'on') {

            $str_slider .= '<div class="cover-image" style="background-image: url(' . $img_full[0] . '); ">
<svg class="cover-play-btn" version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     x="0px" y="0px" width="120px" height="120px" viewBox="0 0 120 120" overflow="auto" xml:space="preserve">
<path fill-rule="evenodd" fill="#ffffff" d="M79.295,56.914c2.45,1.705,2.45,4.468,0,6.172l-24.58,17.103
    c-2.45,1.704-4.436,0.667-4.436-2.317V42.129c0-2.984,1.986-4.022,4.436-2.318L79.295,56.914z M0.199,54.604
    c-0.265,2.971-0.265,7.821,0,10.792c2.57,28.854,25.551,51.835,54.405,54.405c2.971,0.265,7.821,0.265,10.792,0
    c28.854-2.57,51.835-25.551,54.405-54.405c0.265-2.971,0.265-7.821,0-10.792C117.231,25.75,94.25,2.769,65.396,0.198
    c-2.971-0.265-7.821-0.265-10.792,0C25.75,2.769,2.769,25.75,0.199,54.604z M8.816,65.394c-0.309-2.967-0.309-7.82,0-10.787
    c2.512-24.115,21.675-43.279,45.79-45.791c2.967-0.309,7.821-0.309,10.788,0c24.115,2.512,43.278,21.675,45.79,45.79
    c0.309,2.967,0.309,7.821,0,10.788c-2.512,24.115-21.675,43.279-45.79,45.791c-2.967,0.309-7.821,0.309-10.788,0
    C30.491,108.672,11.328,89.508,8.816,65.394z"/>
</svg>
                            </div>';
          }


          $po = get_post($attachment_id);

          if ($po->post_content || $po->post_excerpt) {
            $str_slider .= '<div class="description-wrapper">
                                <div class="feed-description">
                                    <h4>' . $po->post_excerpt . '</h4>
                                    <p>' . $po->post_content . '</p>
                                </div>
                            </div>';
          }


          $str_slider .= '</li>';


          wp_enqueue_style('antfarm-video-player', QUCREATIVE_THEME_URL . 'libs/videogallery/vplayer.css');
          wp_enqueue_script('antfarm-video-player', QUCREATIVE_THEME_URL . 'libs/videogallery/vplayer.js', array('jquery'));
        } else {


          $str_slider .= '<li class="item-tobe " data-divimage_source="' . $img_full[0] . '" data-gallery-thumbnail="' . $img_thumb[0] . '" data-type="image">                            <!-- space for description -->';

          $po = get_post($attachment_id);

          if ($po->post_content || $po->post_excerpt) {
            $str_slider .= '<div class="description-wrapper">
                                <div class="feed-description">
                                    <h4>' . $po->post_excerpt . '</h4>
                                    <p>' . $po->post_content . '</p>
                                </div>
                            </div>';
          }


          $str_slider .= '</li>';
        }

        $i3++;
      }
      $str_slider .= ' </ul>
</div>';

    }


  }

  echo $str_slider;


}
function qucreative_view_portfolio_generateItemFull($qucreative_main) {

  global $wp_query;


  $str_slider = '';

  if ($qucreative_main->theme_data['post_for_meta'] && $qucreative_main->theme_data['post_for_meta']->post_type == 'quextend_port_items' && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_post_media_type' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'slider') {
    $portOutput = qucreative_view_generateContentPortfolio($qucreative_main);
    $str_slider .= $portOutput['str_slider'];
  }

  if ($wp_query) {
    if (isset($wp_query->query_vars)) {
      if (isset($wp_query->query_vars['quextend_port_items_cat'])) {

        $qucreative_main->theme_data['body_class'] .= ' page-type-archive';
      }
    }
  }

  if (strpos($qucreative_main->theme_data['body_class'], 'page-type-archive') === false) {
    echo '<div class="row ">
                    <div class="col-md-12 advancedscroller-con-placeholder-con"><!-- from here -->
                        <div class="advancedscroller-con-placeholder"></div>
                        <div class="advancedscroller-con as-for-portfolio-single-fullscreen  ';


    if ($str_slider) {
      echo ' responsive-featured-media-con--target';
    }


    echo '">
			
			' . $str_slider . '<div class="portfolio-single-liquid-title">
                                <h3>' . $qucreative_main->theme_data['post_for_meta']->post_title . '</h3>

                                <div class="portfolio-single-liquid-info">
                                    <i class="fa fa-info"></i>
                                </div>
                            </div>
                        </div>




                    </div><!-- end .col-md-12 -->

                    <div class="responsive-featured-media-con">

                    </div>

                    <div class="clear"></div>
                    </div>';
  }


  if (strpos($qucreative_main->theme_data['body_class'], 'page-type-archive') === false) {
    echo '
                    <div class="row">
                    <div class="col-md-12">
                        <div class=" desc-content-wrapper from-header">';


    if ($qucreative_main->theme_data['post_for_meta'] && $qucreative_main->theme_data['post_for_meta']->post_type == 'quextend_port_items' && esc_html(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_post_media_type' . $qucreative_main->theme_data['page_extra_meta_label'] . $qucreative_main->theme_data['page_extra_meta_label'], true)) == 'slider') {
      echo '<div class="arrow-left-for-skin-qucreative bg-color-hg-on-hover"></div>
                            <div class="arrow-right-for-skin-qucreative bg-color-hg-on-hover"></div>';
    }


    echo '<div class="quater-bg"></div><!-- first quater-bg -->
                            <div class="col-md-9" style=";">
                                <h3 style="">' . get_the_title($qucreative_main->theme_data['post_for_meta']->ID) . '</h3>';


    if ($qucreative_main->theme_data['post_for_meta'] && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_port_subtitle' . $qucreative_main->theme_data['page_extra_meta_label'], true)) {
      echo '<div class="portfolio-single-subtitle">' . wp_kses(get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_port_subtitle' . $qucreative_main->theme_data['page_extra_meta_label'], true), array(
          'a' => array(
            'href' => array(),
            'title' => array()
          ),
          'br' => array(),
          'em' => array(),
          'strong' => array(),
        )) . '</div>';


    }
  }
}
function qucreative_view_portfolio_generateItem($qucreative_main) {


  global $post;

  $output_array = array();

  preg_match_all("/\[antfarm_portfolio.*?skin=\"(.*?)\".*?cat=\"(.*?)\"/", $post->post_content, $output_array);


  if ($qucreative_main->theme_data['template_is_portfolio_skin'] == 'skin-silver' || $qucreative_main->theme_data['template_is_portfolio_skin'] == 'skin-melbourne' || $qucreative_main->theme_data['template_is_portfolio_skin'] == 'skin-melbourne' || $qucreative_main->theme_data['template_is_portfolio_skin'] == 'skin-gazelia skin-gazelia--transparent' || $qucreative_main->theme_data['template_is_portfolio_skin'] == 'skin-qucreative zfolio-portfolio-expandable') {


    $output_array2 = array();

    preg_match_all("/\[antfarm_portfolio.*?gap=\"(.*?)\"/", $post->post_content, $output_array2);


    echo '<div class="selector-con selector-con-for-skin-melbourne selector-con-for-zfolio-for-portfolio"  style=""><div class="categories" style="margin-top: 0px;">';


    if (isset($output_array[2]) && $output_array[2][0]) {

      $arr_cats = explode(',', $output_array[2][0]);


      foreach ($arr_cats as $catid) {
        $term = get_term($catid, 'quextend_port_items_cat');


      }


    }

    echo '</div></div>';


    qucreative_view_portfolio_generateTranslucentLayerStart($qucreative_main);


  }

}
function qucreative_view_portfolio_generateTranslucentLayerStart($qucreative_main) {



  // -- will close it
  $qucreative_main->theme_data['post_content_has_translucent_layer'] = true;

  $translucent_layer_custom_color = false;
  $translucent_layer_custom_opacity = false;

  // Build classes array
  $translucent_layer_classes = array('translucent-layer');

  // Allow plugins to modify translucent layer classes
  $translucent_layer_classes = apply_filters('qucreative_translucent_layer_classes', $translucent_layer_classes, $qucreative_main);



  echo '<div class="' . esc_attr(implode(' ', $translucent_layer_classes)) . '"';
  echo ' style="';

  // Allow plugins to generate inline styles for translucent layer
  $translucent_layer_styles = apply_filters('qucreative_translucent_layer_styles', '', $translucent_layer_classes, $qucreative_main);
  
  echo $translucent_layer_styles;


  echo '"';


  if ($qucreative_main->theme_data['template_is_portfolio_gap'] == '10px') {

    echo ' data-gap="' . $qucreative_main->theme_data['template_is_portfolio_gap'] . '"';
  }


  echo '>';
}
function qucreative_view_generateMainPageTitle($qucreative_main, $page_title_align) {
  ?><div class="main-page-title-con qu-structure-content-container">
  <h1 class="main-page-title<?php


  if ($qucreative_main->theme_data['post_for_meta'] && get_post_meta($qucreative_main->theme_data['post_for_meta']->ID, 'qucreative_' . 'meta_is_fullscreen' . $qucreative_main->theme_data['page_extra_meta_label'], true) == 'on') {

    if ($page_title_align == 'page-title-align-right') {
      echo ' margin-right-blur-margin';
    }
    if ($page_title_align == 'page-title-align-left') {
      echo ' margin-left-blur-margin';
    }
  }


  ?>"><?php  echo $qucreative_main->theme_data['view_title']; ?></h1>
  </div><?php
}
function qucreative_view_generateMenu() {


  $location = 'primary';

  $menuArgs = array(
    'theme_location' => $location,
    'echo' => false,
    'menu_class' => 'the-actual-nav',
    'container_class' => 'the-actual-nav',
  );
  $menu = wp_nav_menu($menuArgs);

  if (has_nav_menu($location)) {

    echo $menu;
  } else {

    echo '<div class="menu-helper-text">' . esc_html__("Please setup a menu from ", 'qucreative') . '<a target="_blank" href="' . admin_url("nav-menus.php") . '">' . esc_html__("here", 'qucreative') . '</a></div>';


  }
}

function qucreative_view_enqueue_fontAwesome() {

  $fontAwesomeLink = QUCREATIVE_THEME_URL . 'libs/fontawesome/font-awesome.min.css';
  if (defined("QUCREATIVE_UPLOAD_FONTAWESOME_FROM_CDN") && QUCREATIVE_UPLOAD_FONTAWESOME_FROM_CDN == "ON") {
    $fontAwesomeLink = 'https://' . 'maxcdn' . '.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  }

  wp_enqueue_style('fontawesome', $fontAwesomeLink);
}
include_once 'php/view/generate-logo.php';
function qucreative_view_enqueue_zoombox() {


  wp_enqueue_script('qucreative_lightbox', QUCREATIVE_THEME_URL . 'libs/zoombox/zoombox.js');
  wp_enqueue_style('qucreative_lightbox', QUCREATIVE_THEME_URL . 'libs/zoombox/zoombox.css');

}
/**
 * used for bg
 * @return void
 */
function qucreative_view_enqueueParallaxer(QuCreative $qucreative_main) {


  if ($qucreative_main->get_theme_mod_and_sanitize('bg_isparallax') == 'on') {

    wp_enqueue_script('qucreative_parallax', QUCREATIVE_THEME_URL . 'libs/parallaxer/parallaxer.js');
    wp_enqueue_style('qucreative_parallax', QUCREATIVE_THEME_URL . 'libs/parallaxer/parallaxer.css');
  }
}
function qucreative_view_footerEnqueueScripts() {

  global $qucreative_main;


  ?><!--start footer()--><?php


// -- qucreative has own implementation of comment reply

  if (!defined('QUCREATIVE_VERSION')) {

    wp_enqueue_script('comment-reply', QUCREATIVE_THEME_URL . 'libs/qucreative/qucreative.js', array('jquery'), false, true);
  }


  qucreative_view_enqueue_fontAwesome();



  wp_enqueue_style('et_font', QUCREATIVE_THEME_URL . 'libs/qucreative/include_et.css');

  qucreative_view_enqueueParallaxer($qucreative_main);

}



include_once 'php/view/generate-footer-for-portfolio-item.php';
include_once 'php/view/generate-qu-nav.php';
include_once 'php/view/generate-search-icons.php';
include_once 'php/view/generate-social-icons.php';
