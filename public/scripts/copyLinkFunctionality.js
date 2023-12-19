copyLinkBtn.addEventListener('click', () => {

    validateInputFields();

    if (!navigator.clipboard) {
        alert('Your browser does not support the Clipboard API');
        return;
    }
    navigator.clipboard.writeText(profileImage.src);

    copyLinkBtn.textContent = 'Copied!';
    copyLinkBtn.classList.toggle('btn-primary');
    copyLinkBtn.classList.toggle('btn-secondary');
    setTimeout(() => {
        copyLinkBtn.classList.toggle('btn-primary');
        copyLinkBtn.classList.toggle('btn-secondary');
        copyLinkBtn.textContent = 'Copy Link';
    }, 1000);
});