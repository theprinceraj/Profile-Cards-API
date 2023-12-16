const debounceFnCall = (fn, timeout = 300) => {
    let debounceTimer;
    return async (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            await fn.apply(this, args);
        }, timeout);
    }
}