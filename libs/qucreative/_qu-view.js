"use strict";


export function check_animation_time(quCreative_main) {
  if(window.qucreative_view_animation_duration){
    quCreative_main.view_animation_duration = window.qucreative_view_animation_duration * 1000;
  }
}



