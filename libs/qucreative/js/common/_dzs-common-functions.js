
/**
 *
 * @param {string} scriptSrc if no script src - it will just look for var, if scriptSrc is set, it will load it
 * @param {string} checkForVar must be on window property
 * @returns {Promise<any>}
 */
export const loadScriptIfItDoesNotExist = (scriptSrc, checkForVar) => {
  const CHECK_INTERVAL = 50;
  const TIMEOUT_MAX = 5000;
  let checkInterval = 0;
  const loadScript = (scriptSrc, resolve, reject) => {
    const script = document.createElement('script');
    script.onload = function () {
      resolve('loadfromload');
    };
    script.onerror = function () {
      reject();
    };
    script.src = scriptSrc;
    document.head.appendChild(script);
  }

  return new Promise((resolve, reject) => {
    let isAlreadyLoaded = false;
    let isGoingToLoadScript = false;

    /**
     *
     * @returns {boolean}
     */
    function checkIfVarExists() {
      if (window[checkForVar]) {
        clearInterval(checkInterval);
        resolve('loadfromvar');
        return true;
      }
      return false;
    }

    isAlreadyLoaded = checkIfVarExists();
    if (!isAlreadyLoaded) {
      isGoingToLoadScript = true;

      if(checkForVar){
        checkInterval = setInterval(checkIfVarExists, CHECK_INTERVAL);
      }

      setTimeout(() => {
        clearInterval(checkInterval);
        reject('timeout');
      }, TIMEOUT_MAX);
    }
    if (!checkForVar) {
      isGoingToLoadScript = true;
    }
    if (!scriptSrc) {
      isGoingToLoadScript = false;
    }

    if (isGoingToLoadScript) {
      clearInterval(checkInterval);
      loadScript(scriptSrc, resolve, reject);
    }

  })
}


/**
 *
 * @returns {string[]}
 */
export function get_base_url_arr() {
  var scripts = document.getElementsByTagName("script");
  var scriptKey = '';
  for (scriptKey in scripts) {
    if (scripts[scriptKey] && scripts[scriptKey].src && String(scripts[scriptKey].src).indexOf('vplayer.js') > -1) {
      break;
    }
  }
  return String(scripts[scriptKey].src).split('/');
}