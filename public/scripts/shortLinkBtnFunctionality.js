shortenLinkBtn.addEventListener('click', async () => {
    shortenLinkBtn.textContent = 'Generating...';
    shortenLinkBtn.classList.toggle('btn-primary');
    shortenLinkBtn.classList.toggle('btn-secondary');

    validateInputFields();

    if (!navigator.clipboard) {
        alert('Your browser does not support the Clipboard API');
        return;
    }

    const res = await fetch(`/api/shorten?longUrl=${profileImage.src}`);
    const data = await res.json();

    navigator.clipboard.writeText(data.shortUrl);

    setTimeout(() => {
        shortenLinkBtn.textContent = 'Copied';
    }, 1000);
});