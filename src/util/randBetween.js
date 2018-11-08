/**
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export default function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
