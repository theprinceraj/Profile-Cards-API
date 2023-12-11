
const [imageLinkInput, nameInput, locationInput, titleInput, socialMediaInput, socialMediaUsernameInput, profileImage] = ['#inputImageLink',
    '#inputName',
    '#inputLocation',
    '#inputTitle',
    '#inputSocialMedia',
    '#inputSocialMediaUsername',
    '#profile-image'].map(selectorID => document.querySelector(selectorID));


function updateImageSrc() {
    const { value: imageLink } = imageLinkInput,
        { value: name } = nameInput,
        { value: location } = locationInput,
        { value: title } = titleInput,
        { value: socialMedia } = socialMediaInput,
        { value: socialMediaUsername } = socialMediaUsernameInput;


    let newSrc = '';
    // Check if required fields are filled
    if (imageLink && name && location && title) {
        if (socialMedia && socialMediaUsername) {
            newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}&socialMedia=${socialMedia}&socialMediaUsername=${socialMediaUsername}`;
        } else {
            newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}`;

        }
        profileImage.src = newSrc;
    }
}

// Attaching event listeners to input fields
[
    imageLinkInput,
    nameInput,
    locationInput,
    titleInput,
    socialMediaInput,
    socialMediaUsernameInput
].forEach(element => element.addEventListener('input', updateImageSrc));