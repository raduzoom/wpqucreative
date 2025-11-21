
export function dzsQuc_initSocialLink(){

  window.qcre_open_social_link = function (arg) {
    var leftPosition, topPosition;
    var w = 500, h = 500;

    leftPosition = (window.screen.width / 2) - ((w / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((h / 2) + 50);
    var windowFeatures = "status=no,height=" + h + ",width=" + w + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open(arg, "sharer", windowFeatures);
  }
}
dzsQuc_initSocialLink();