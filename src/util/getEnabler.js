let prom = null;
let promInitialized = null;
const limit = 10000;
let count = 0;

/**
 * Will return the Enabler initialized and well.
 * @param {boolean} isInitialized
 * @return {*}
 */
export default function getEnabler(isInitialized = true) {
  if (isInitialized) {
    if (!promInitialized) {
      promInitialized = getEnabler(false).then(
        Enabler =>
          new Promise(resolve => {
            const resolver = () => {
              Enabler.removeEventListener(studio.events.StudioEvent.INIT, resolver);
              resolve(Enabler);
            };
            Enabler.addEventListener(studio.events.StudioEvent.INIT, resolver);
          }),
      );
    }

    return promInitialized;
  }

  if (!prom) {
    prom = new Promise((resolve, reject) => {
      const checkLoop = function() {
        if (!!window.Enabler) {
          resolve(window.Enabler);
        } else {
          setTimeout(checkLoop, 500);
        }
      };

      checkLoop();
    });
  }

  return prom;
}
