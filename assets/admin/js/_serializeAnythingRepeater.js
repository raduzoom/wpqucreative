/**
 *
 * @param {jQuery} thejQuery
 */
export const setupSerializeAnythingRepeater= (thejQuery) => {


  thejQuery.fn.serializeAnythingRepeater = function () {
    var toReturn = [];
    var els = thejQuery(this).find(":input").get();

    thejQuery.each(els, function () {
      if (
        thejQuery(this).attr("data-repeater_name") &&
        !this.disabled &&
        (this.checked ||
          /select|textarea/i.test(this.nodeName) ||
          /text|hidden|password/i.test(this.type))
      ) {
        var val = thejQuery(this).val();

        toReturn.push(
          encodeURIComponent(thejQuery(this).attr("data-repeater_name")) +
          "=" +
          encodeURIComponent(val),
        );
      }
    });

    return toReturn.join("&").replace(/%20/g, "+");
  };
}
