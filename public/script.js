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
            profileImage.onerror = () => {
                isImageLoaded = false;
                setTimeout(() => {
                    if (!isImageLoaded) {
                        errorModal.show(); // Show the error modal if image fails to load
                        profileImage.src = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67&socialMedia=Linkedin&socialMediaUsername=theprinceraj';
                    }
                }, 1000);
            };
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

    // Functionality for the copy link button
    copyLinkBtn.addEventListener('click', () => {
        
        const isAnyFieldEmpty = ![imageLinkInput, nameInput, locationInput, titleInput].every(field => field.value.trim());
        if (isAnyFieldEmpty) {
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
