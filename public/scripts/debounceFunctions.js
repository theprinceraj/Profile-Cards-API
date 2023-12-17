const debounceFnCall = (fn, timeout = 300) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fn, timeout);
}