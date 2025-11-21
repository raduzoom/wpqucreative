<?php


if ( ! class_exists( 'QuCreative_Comments_Walker' ) ){

  class QuCreative_Comments_Walker extends Walker_Comment {


    public function start_el( &$output, $comment, $depth = 0, $args = array(), $id = 0 )
    {

      $depth++;
      $GLOBALS['comment_depth'] = $depth;
      $GLOBALS['comment'] = $comment;

      if ( !empty( $args['callback'] ) ) {
        ob_start();
        call_user_func( $args['callback'], $comment, $args, $depth );
        $output .= ob_get_clean();
        return;
      }

      if ( ( 'pingback' == $comment->comment_type || 'trackback' == $comment->comment_type ) && $args['short_ping'] ) {
        ob_start();
        $this->ping( $comment, $depth, $args );
        $output .= ob_get_clean();
      } elseif ( 'html5' === $args['format'] ) {
        ob_start();
        if ( !empty( $args['has_children'] ) ) {
          $this->html5_comment( $comment, $depth, $args ,true );
        } else {
          $this->html5_comment( $comment, $depth, $args );
        }
        $output .= ob_get_clean();
      } else {
        ob_start();
        $this->comment( $comment, $depth, $args );
        $output .= ob_get_clean();
      }
    }



    public function end_el( &$output, $comment, $depth = 0, $args = array() ){
      if ( !empty( $args['end-callback'] ) ) {
        ob_start();
        call_user_func( $args['end-callback'], $comment, $args, $depth );
        $output .= ob_get_clean();
        return;
      }

      if ( !empty( $args['has_children'] ) && 'html5' === $args['format']) {
        ob_start();
        $this->end_parent_html5_comment( $comment, $depth, $args );
        $output .= ob_get_clean();
      } else {
        if ( 'div' == $args['style'] ) {
          $output .= "</div>";
        } else {
          $output .= "</li>";
        }
      }
    }





    protected function html5_comment( $comment, $depth, $args, $is_parent = false ){

      global $qucreative_main;


      $type = get_comment_type();

      $comment_classes = array();
      $comment_classes[] = 'media';

      // if it's a parent
      if ( $this->has_children ) {
        $comment_classes[] = 'parent';
        $comment_classes[] = 'has-children';
      }

      // if it's a child
      if ( $comment->comment_parent > 0 ) {
        $comment_classes[] = 'child';
        $comment_classes[] = 'has-parent';
        $comment_classes[] = 'parent-' . $comment->comment_parent;
      }





      if ( 'div' === $args['style'] ) {
        $tag       = 'div';
        $add_below = 'comment';
      } else {
        $tag       = 'li';
        $add_below = 'div-comment';
      }


      $avatar_url = qucreative_get_avatar_url(get_avatar( $comment->comment_author_email, $args['avatar_size'] ));



      $author_display_name = $comment->comment_author;






      $author=get_userdata($comment->user_id);

      if(isset($author->display_name) && $author->display_name){

        $author_display_name = $author->display_name;
      }



      $comment_class = get_comment_class( empty( $args['has_children'] ) ? '' : 'parent' );


      $comment_class_str = ' ';
      foreach ($comment_class as $cci){
        $comment_class_str.= ' '.$cci;
      }


      $comment_type = 'comment';

      if(strpos($comment_class_str,'pingback')!==false){
        $comment_type = 'pingback';
      }

      if(strpos($comment_class_str,'trackback')!==false){
        $comment_type = 'trackback';
      }

      $comment_classes = apply_filters( 'wp_bootstrap_comment_class', $comment_classes, $comment, $depth, $args );

      $class_str = implode(' ', $comment_classes);






      $author_link_url = apply_filters( 'qucreative_get_only_url_of_author_link',get_comment_author_link( $comment ));


      if($comment_type=='pingback' || $comment_type=='trackback') {
        ?><div id="pingback-<?php comment_ID() ?>" class="pingback-inner h6"><?php
        echo '<span class="color-highlight">'.esc_html__("Pingback",'qucreative').':</span> ';
        comment_author_link( $comment ); ?> &nbsp;&nbsp; <?php edit_comment_link( esc_html__( 'Edit','qucreative' ), '<span class="edit-link">', '</span>' ); ?>
        </div><?php
      }else{

        ?>
        <<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( $class_str, $comment ); ?>>

        <article id="div-comment-<?php comment_ID(); ?>" class="">

          <div class="comment-meta">
            <?php
            if ( 0 != $args['avatar_size'] && 'pingback' !== $comment_type && 'trackback' !== $comment_type ) {
              ?>
            <div class="comment-thumb" style="background-image: url(<?php echo $avatar_url; ?>);"></div><?php
            }
            ?>
            <div class="comment-other-meta">
              <?php


              $author_link_tag = '';
              if($author_link_url){

                $author_link_tag = 'a';
                echo '<a href="'.$author_link_url.'"';
              }else{

                $author_link_tag = 'div';
                echo '<div ';
              }
              echo ' class="h6 custom-a author-name ';
              if($author_link_url){
                echo ' color-highlight-on-hover';
              }
              echo '">';
              echo $author_display_name;
              echo '</'.$author_link_tag.'>';

              ?>
              <span class="comment-time font-group-3"><?php echo wp_kses( sprintf( __( '%1$s at %2$s', 'qucreative' ), get_comment_date(), get_comment_time() ), $qucreative_main->theme_data['allowed_html_tags'] ); ?><?php edit_comment_link( ' (' . esc_html__( "Edit", 'qucreative' ) . ')', '', '' ); ?></span>
            </div>
          </div>
          <div class="comment-body">
            <?php comment_text(); ?>
          </div><!-- .reply -->

          <div class="comment-right-meta">
                <span class="meta-comment-reply h-group-1"><?php comment_reply_link( array_merge( $args, array(
                    'add_below' => $add_below,
                    'depth'     => $depth,
                    'max_depth' => $args['max_depth'],
                    'before'    => ''
                  ) ) ); ?></span>
          </div>
          <div class="clear"></div>


          <?php if ( $comment->comment_approved == '0' ) {?>
            <em class="comment-awaiting-moderation"><?php echo esc_html__( "Your comment is awaiting moderation.", 'qucreative' ); ?></em>
          <?php } ?>

        </article><!-- end article -->


        <?php
      }
    }


    protected function end_parent_html5_comment( $comment, $depth, $args )
    {
      $tag = ( 'div' === $args['style'] ) ? 'div' : 'li';
      ?>
      </<?php echo $tag; ?>><!-- end parent -->


      <?php
    }





  }
}


