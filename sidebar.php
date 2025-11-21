<?php
/**
 * The sidebar containing the main widget area
 *
 * @package WordPress
 * @subpackage qucreative
 *
 */

global $sidebar;

if($sidebar){

  dynamic_sidebar( $sidebar );
}
