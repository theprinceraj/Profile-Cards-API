const debounceFnCall = (fn, timeout = 300) => {
    let debounceTimer;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fn, timeout);
}