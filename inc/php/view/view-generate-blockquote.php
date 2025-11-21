<?php
function qucreative_generate_portfolio_item_blockquote($arg, $pargs= array()){



  $margs = array(
    'extra_class' => '',
  );

  $fout = '';


  if ($pargs) {
    $margs = array_merge($margs, $pargs);
  }



  $fout = '';
  $fout .= '<blockquote class="'.$margs['extra_class'].' font-group-4">';

  $i = 0;
  $i25 = 0;



  for($i=1;$i<5;$i++){



    if(get_post_meta($arg, 'qucreative_'.'meta_port_optional_info_'.$i,true)){



      if($i25>0){
        $fout.='<br>';
      }

      $fout.=get_post_meta($arg, 'qucreative_'.'meta_port_optional_info_'.$i,true);



      $i25++;
    }

  }


  if(get_post_meta($arg, 'qucreative_'.'meta_port_website',true)){

    if($i25>0){
      $fout.='<br>';
    }
    $aux = get_post_meta($arg, 'qucreative_'.'meta_port_website',true);

    $aux = str_replace('http://','',$aux);
    $aux = str_replace('https://','',$aux);



    $fout.= '<a class="custom-a color-hg-on-hover weight-from-anchor"  href="'.get_post_meta($arg, 'qucreative_'.'meta_port_website',true).'">'.$aux.'</a>';

    $i25++;

  }

  $fout .= '</blockquote>';


  return $fout;
}
