document.addEventListener("DOMContentLoaded", function () {
    const imageLinkInput = document.getElementById('inputImageLink');
    const nameInput = document.getElementById('inputName');
    const locationInput = document.getElementById('inputLocation');
    const titleInput = document.getElementById('inputTitle');
    const socialMediaInput = document.getElementById('inputSocialMedia');
    const socialMediaUsernameInput = document.getElementById('inputSocialMediaUsername');
    const profileImage = document.getElementById('profile-image');

    const errorModal = new bootstrap.Modal(document.getElementById('errorModal')); // Initialize Bootstrap modal

    function updateImageSrc() {
        const imageLink = imageLinkInput.value;
        const name = nameInput.value;
        const location = locationInput.value;
        const title = titleInput.value;
        const socialMedia = socialMediaInput.value;
        const socialMediaUsername = socialMediaUsernameInput.value;

        let newSrc = '';
        // Check if required fields are filled
        if (imageLink && name && location && title) {
            if (socialMedia && socialMediaUsername) {
                newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}&socialMedia=${socialMedia}&socialMediaUsername=${socialMediaUsername}`;
            } else {
                newSrc = `https://profile-cards-api.vercel.app/api/profile?name=${name}&location=${location}&title=${title}&imageLink=${imageLink}`;

            }
            profileImage.onerror = () => {
                errorModal.show(); // Show the error modal if image fails to load
                profileImage.src = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67&socialMedia=Linkedin&socialMediaUsername=theprinceraj';
            };
            profileImage.src = newSrc;
        }
        profileImage.src = newSrc;
    }

    imageLinkInput.addEventListener('input', updateImageSrc);
    nameInput.addEventListener('input', updateImageSrc);
    locationInput.addEventListener('input', updateImageSrc);
    titleInput.addEventListener('input', updateImageSrc);
    socialMediaInput.addEventListener('input', updateImageSrc);
    socialMediaUsernameInput.addEventListener('input', updateImageSrc);

    copyLinkBtn.addEventListener('click', () => {
        // Check if the required fields are filled
        if (!imageLinkInput.value || !nameInput.value || !locationInput.value || !titleInput.value) {
            alert('Please fill in all required fields');
            return;
        }

        if (!navigator.clipboard) {
            alert('Your browser does not support the Clipboard API');
            return;
        }
        const newSrc = profileImage.src;
        navigator.clipboard.writeText(newSrc);

        copyLinkBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyLinkBtn.textContent = 'Copy Link';
        }, 1000);
    });
});
