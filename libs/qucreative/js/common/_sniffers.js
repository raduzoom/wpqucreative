export function ieVersion() {

  var ua = window.navigator.userAgent;
  if (ua.indexOf("Trident/7.0") > 0)
    return 11;
  else if (ua.indexOf("Trident/6.0") > 0)
    return 10;
  else if (ua.indexOf("Trident/5.0") > 0)
    return 9;
  else
    return 0;
}