"use strict";


import { goto_bg } from '../_qu-view-animation'

start_bg_slideshow_time();

let bg_slideshow_time = 0;

if (_t.hasClass("prev-btn-con")) {
  goto_prev_bg();
}
if (_t.hasClass("next-btn-con")) {
  goto_next_bg();
}

quCreative_main.start_bg_slideshow_time = start_bg_slideshow_time;

function goto_next_bg() {
  var tempNr = quCreative_main.currBgNr;
  const _body = jQuery('body');

  tempNr++;

  if (
      qucreative_options.images_arr.length &&
      (qucreative_options.the_background == "" ||
          _body.hasClass("page-homepage"))
  ) {
    if (tempNr > qucreative_options.images_arr.length - 1) {
      tempNr = 0;
    }

    goto_bg(tempNr, {});
  }
}

function goto_prev_bg() {
  var tempNr = quCreative_main.currBgNr;

  tempNr--;

  if (tempNr < 0) {
    tempNr = qucreative_options.images_arr.length - 1;
  }

  goto_bg(tempNr, {});
}

function start_bg_slideshow_time() {
  clearInterval(quCreative_main.inter_bg_slideshow);
  bg_slideshow_time = Number(window.qucreative_options.bg_slideshow_time);

  if (bg_slideshow_time) {
    quCreative_main.inter_bg_slideshow = setInterval(function () {
      goto_next_bg();
    }, bg_slideshow_time * 1000);
  }
}