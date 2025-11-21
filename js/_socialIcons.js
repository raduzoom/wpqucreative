export function setupSocialIcons(wp) {
  const $ = jQuery;
  wp.customize("social_icons", function (value) {
    value.bind(function (newval) {
      let str_icons = "";

      try {
        const arr = JSON.parse(newval);

        for (const i in arr) {
          str_icons +=
            '<a href="' +
            arr[i].link +
            '"><i class="fa fa-' +
            arr[i].icon +
            '"></i></a>';
        }
      } catch (err) {
        console.log(err);
      }

      if ($(".social-icons").length == 0) {
        if ($("body").eq(0).hasClass("menu-type-1")) {
        }
        $(".nav-social-con").prepend('<p class="social-icons"></p>');
      } else {
      }
      $(".social-icons").eq(0).html(str_icons);
    });
  });
}
