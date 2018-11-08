let _uuid = new Date().getTime();

/**
 * Generates a uuid
 * @return {string}
 */
export default function uuid() {
  _uuid += 1;
  return _uuid.toString(16);
}
