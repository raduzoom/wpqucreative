
import { find_theContentSheet } from '../_qucreative.util'


// todo : load on reinit
quCreative_main._theContent.find(".antfarm-video-text").each(function () {
  const _t = $(this);

  const _con = find_theContentSheet(_t);

  if (_con) {
    _con.next().css({
      position: "static",
    });
    _con.next().children(".featured-media-con").css({
      position: "static",
    });
    _con
        .next()
        .children(".featured-media-con")
        .children(".section-featured-media")
        .css({
          position: "static",
        });
  }
})