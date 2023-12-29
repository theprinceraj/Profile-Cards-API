let currentShortenedLink = '';
shortenLinkBtn.addEventListener('click', async () => {
    if (!validateInputFields()) {
        return;
    }
    if (!navigator.clipboard) {
        alert('Your browser does not support the Clipboard API');
        return;
    }

    if (!currentLinkShortenedSuccessfully) {
        shortenLinkBtn.textContent = 'Generating...';
        shortenLinkBtn.classList.toggle('btn-primary');
        shortenLinkBtn.classList.toggle('btn-secondary');
        const res = await fetch(`/api/shorten?longUrl=${encodeURIComponent(profileImage.src)}`);
        const data = await res.json();
        currentLinkShortenedSuccessfully = true;
        currentShortenedLink = data.shortUrl;
        await navigator.clipboard.writeText(currentShortenedLink);
        shortenLinkBtn.textContent = 'Copied';
    } else {
        await navigator.clipboard.writeText(currentShortenedLink);
        shortenLinkBtn.textContent = 'Copied';
    }
});