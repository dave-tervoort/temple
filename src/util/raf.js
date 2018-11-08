const store = [];
const offsetPosition = Date.now();

/**
 * Like setInterval but now with requestAnimationFrame.
 * @param callback
 * @param limitFps
 * @return {number}
 */
export function setRaf(callback, limitFps = -1) {
  const rafPosition = store.length;
  store.push(-1);

  let totalTime = 0;
  const hasLimiter = limitFps > 0;
  const limitMsps = 1000 / limitFps;
  let timeAcc = limitMsps;

  const tick = timestamp => {
    store[rafPosition] = window.requestAnimationFrame(tick);

    if (!totalTime) {
      totalTime = timestamp;
    } else if (!hasLimiter) {
      callback.call(null, timestamp, timestamp - totalTime);
    } else {
      timeAcc += timestamp - totalTime;
      while (timeAcc > limitMsps) {
        timeAcc -= limitMsps;
        callback.call(null, timestamp - timeAcc, limitMsps);
      }
    }

    totalTime = timestamp;
  };

  store[rafPosition] = window.requestAnimationFrame(tick);

  return rafPosition + offsetPosition;
}

export function cancelRaf(value) {
  const position = value - offsetPosition;
  if (store[position]) {
    cancelAnimationFrame(store[position]);
    return true;
  }
  return false;
}
