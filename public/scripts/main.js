const imageLinkInput = document.querySelector('#inputImageLink');
const nameInput = document.querySelector('#inputName');
const locationInput = document.querySelector('#inputLocation');
const titleInput = document.querySelector('#inputTitle');
const socialMediaInput = document.querySelector('#inputSocialMedia');
const socialMediaUsernameInput = document.querySelector('#inputSocialMediaUsername');
const profileImage = document.querySelector('#profile-image');

let formFilledCorrectly = false;
let timer;
function updateImageSrc() {
    if (timer) {
        clearTimeout(timer);
    }
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
        }, 5000);
    }
}

[
    imageLinkInput,
    nameInput,
    locationInput,
    titleInput,
    socialMediaInput,
    socialMediaUsernameInput
].forEach(element => element.addEventListener('input', updateImageSrc));