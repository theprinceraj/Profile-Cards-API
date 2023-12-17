copyLinkBtn.addEventListener('click', () => {

    const [imageLinkInput, nameInput, locationInput, titleInput, profileImage] = ['#inputImageLink',
        '#inputName',
        '#inputLocation',
        '#inputTitle',
        '#profile-image'].map(selectorID => document.querySelector(selectorID));

    const isAnyFieldEmpty = ![imageLinkInput, nameInput, locationInput, titleInput].every(field => field.value.trim());
    if (isAnyFieldEmpty) {
        alert('Please fill in all required fields');
        return;
    }

    if (!navigator.clipboard) {
        alert('Your browser does not support the Clipboard API');
        return;
    }
    navigator.clipboard.writeText(profileImage.src);

    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyLinkBtn.textContent = 'Copy Link';
    }, 1000);
});