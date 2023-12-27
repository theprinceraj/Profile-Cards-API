shortenLinkBtn.addEventListener('click', async () => {
    validateInputFields();
    if (!navigator.clipboard) {
        alert('Your browser does not support the Clipboard API');
        return;
    }

    shortenLinkBtn.textContent = 'Generating...';
    shortenLinkBtn.classList.toggle('btn-primary');
    shortenLinkBtn.classList.toggle('btn-secondary');



    const res = await fetch(`/api/shorten?longUrl=${encodeURIComponent(profileImage.src)}`);
    const data = await res.json();

    navigator.clipboard.writeText(data.shortUrl);

    setTimeout(() => {
        shortenLinkBtn.textContent = 'Copied';
    }, 1000);
});