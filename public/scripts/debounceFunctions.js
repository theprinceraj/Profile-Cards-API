/**
 * Returns a debounced version of the given function that will only be called after a specified timeout period has elapsed since the last invocation.
 *
 * @param {Function} fn - The function to be debounced.
 * @param {number} timeout - The amount of time in milliseconds to wait before invoking the debounced function (default is 300ms).
 * @returns {Function} - The debounced function.
 */
const debounceFnCall = (fn, timeout = 300) => {
    let debounceTimer;
    return async (...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                try {
                    const result = await fn.apply(this, args);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            }, timeout);
        })
    }
}