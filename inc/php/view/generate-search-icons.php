<?php
function qucreative_header_generateSearchIcon() {

  global $qucreative_main;

  if($qucreative_main->get_theme_mod_and_sanitize('search_in_header')=='on'){


    ?><div class="nav-social-con">

      <div>          <div class="search-expand auto-init inline-block">
        </div>
        </i></div>



<script>
  function documentReady(callback) {
    new Promise((resolutionFunc, rejectionFunc) => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        resolutionFunc('interactive')
      }
      document.addEventListener('DOMContentLoaded', () => {
        resolutionFunc('DOMContentLoaded')
      }, false)
      setTimeout(() => {
        resolutionFunc('timeout')
      }, 5000)
    }).then(resolution => {
      callback(resolution)
    }).catch(err => {
      callback(err)
    })
  }

  // -- helper functions end
</script>
<script>



  documentReady(() => {

    let requestVersion = 0;

    console.log('doc ready');



      window.dzs_initDzsSearchExpand(document.querySelector('.search-expand.auto-init'), {
        /**
         *
         * @param {ChipSelectorItem[]} allOptions
         */
        onUpdateFunction: (allOptions) => {
          const selectedOptions = allOptions.filter((el) => el.currentStatus === 'checked');
          console.log({selectedOptions});
        },
        onSubmitSearch: (query) => {
          console.log('onSubmitSearch()', { query });
          window.location.href = window.location.origin + '/?s=' + query;
        }
      })


  })
</script>

    </div><?php


    wp_enqueue_style('qu-libs-search-expand', QUCREATIVE_THEME_URL . 'libs/search-expand/dist/dzs-search-expand.css');
    wp_enqueue_script('qu-libs-search-expand', QUCREATIVE_THEME_URL . 'libs/search-expand/dist/index.umd.min.js', array());
  }

}
