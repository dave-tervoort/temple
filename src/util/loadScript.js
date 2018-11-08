/**
 *
 * @param {string} url
 * @param {Function<boolean>} validationFunction
 * @return {Promise<any>}
 */
import asyncValidator from './asyncValidator';

function _loadScript(url) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.querySelector('head');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf8';
    script.async = true;
    script.onload = function() {
      this.onerror = this.onload = null;
      resolve(script);
    };

    script.onerror = function() {
      this.onerror = this.onload = null;
      reject(new Error('Failed to load ' + this.src), script);
    };

    script.src = url;

    head.appendChild(script);
  });
}

export default function loadScript(url, validationFunction = null) {
  let prom = _loadScript(url);
  if (validationFunction) {
    prom = prom.then(() => asyncValidator(validationFunction));
  }

  return prom;
}
