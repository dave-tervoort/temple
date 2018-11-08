/**
 *
 * @param {Function<boolean>} validateFunc function that will validate true or false.
 * @param {number} delay delay between checks in milliseconds
 * @param {number} maxTries how many times this can be tried
 */
import { setRaf, cancelRaf } from './raf';

export default function asyncValidator(validateFunc, delay = 500, maxTries = -1) {
  let tries = 0;
  return new Promise((resolve, reject) => {
    const timeout = setRaf(() => {
      const result = validateFunc();
      if (result) {
        cancelRaf(timeout);
        resolve(true);
      }

      if (maxTries !== -1) {
        tries += 1;
      }

      if (maxTries < tries) {
        cancelRaf(timeout);
        reject(new Error('tried too many times'));
      }
    }, 1000 / delay);
  });
}
