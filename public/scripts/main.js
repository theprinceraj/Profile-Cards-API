function updateImageSrc() {
    clearTimeout(timer);

    const imageLink = imageLinkInput.value.trim(),
        name = nameInput.value.trim(),
        location = locationInput.value.trim(),
        title = titleInput.value.trim(),
        socialMedia = socialMediaInput.value.trim(),
        socialMediaUsername = socialMediaUsernameInput.value.trim();

    let newSrc = '';
    // Check if required fields are filled
    if (imageLink && name && location && title) {
        if (socialMedia && socialMediaUsername) {
            newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}&socialMedia=${socialMedia}&socialMediaUsername=${socialMediaUsername}`;
        } else {
            newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}`;
        }
        profileImage.src = newSrc;
        formFilledCorrectly = true;
    } else {
        formFilledCorrectly = false;
        timer = setTimeout(() => {
            errorModal.show();
            profileImage.src = defaultSrcUrl;
        }, 5000);
    }
}
const debounceUpdateImgSrc = () => {
    debounceFnCall(updateImageSrc, 1000);
}

[
    imageLinkInput,
    nameInput,
    locationInput,
    titleInput,
    socialMediaInput,
    socialMediaUsernameInput
].forEach(element => element.addEventListener('input', debounceUpdateImgSrc));