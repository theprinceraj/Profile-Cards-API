const imageLinkInput = document.querySelector('#inputImageLink');
const nameInput = document.querySelector('#inputName');
const locationInput = document.querySelector('#inputLocation');
const titleInput = document.querySelector('#inputTitle');
const socialMediaInput = document.querySelector('#inputSocialMedia');
const socialMediaUsernameInput = document.querySelector('#inputSocialMediaUsername');
const profileImage = document.querySelector('#profile-image');

let formFilledCorrectlyAtLeastOnce = false;
let timer;
function updateImageSrc() {
    const imageLink = imageLinkInput.value.trim(),
        name = nameInput.value.trim(),
        location = locationInput.value.trim(),
        title = titleInput.value.trim(),
        socialMedia = socialMediaInput.value.trim(),
        socialMediaUsername = socialMediaUsernameInput.value.trim();

    console.log("Inside updateImageSrc function ==>" + title + "<==");

    let newSrc = '';
    // Check if required fields are filled
    if (imageLink && name && location && title) {
        if (socialMedia && socialMediaUsername) {
            newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}&socialMedia=${socialMedia}&socialMediaUsername=${socialMediaUsername}`;
        } else {
            newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}`;

        }
        profileImage.src = newSrc;
        formFilledCorrectlyAtLeastOnce = true;
        clearTimeout(timer);
    }
}
if (!imageLinkInput.value.trim() || !nameInput.value.trim() || !locationInput.value.trim() || !titleInput.value.trim()) {
    if (formFilledCorrectlyAtLeastOnce) {
        timer = setTimeout(() => {
            errorModal.show(); // Show the error modal if image fails to load
            profileImage.src = defaultSrcUrl;
        }, 3000);
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