const debounceFnCall = (fn, timeout = 300) => {
    let debounceTimer;
    return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(fn.apply(this, args), timeout);
    }
}