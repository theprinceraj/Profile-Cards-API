document.addEventListener("DOMContentLoaded", function () {
    const [imageLinkInput, nameInput, locationInput, titleInput, socialMediaInput, socialMediaUsernameInput, profileImage] = ['#inputImageLink',
        '#inputName',
        '#inputLocation',
        '#inputTitle',
        '#inputSocialMedia',
        '#inputSocialMediaUsername',
        '#profile-image'].map(selectorID => document.querySelector(selectorID));

    const errorModal = new bootstrap.Modal(document.getElementById('errorModal')); // Initialize Bootstrap modal

    let isImageLoaded = false;
    profileImage.onload = () => {
        isImageLoaded = true;
    }
    profileImage.onerror = () => {
        isImageLoaded = false;
        setTimeout(() => {
            if (!isImageLoaded) {
                errorModal.show(); // Show the error modal if image fails to load
                profileImage.src = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67&socialMedia=Linkedin&socialMediaUsername=theprinceraj';
            }
        }, 1000);
    };

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
});
