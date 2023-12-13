const errorModal = new bootstrap.Modal(document.querySelector('#errorModal'));
const defaultSrcUrl = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://shorturl.at/jnpBO&socialMedia=Linkedin&socialMediaUsername=theprinceraj';
const requiredFields = [imageLinkInput, nameInput, locationInput, titleInput];

profileImage.onerror = () => {
    setTimeout(() => {
        validateRequiredField(imageLinkInput, nameInput, locationInput, titleInput);
    }, 3000)
    return;
}

function validateRequiredField(imageLinkInput, nameInput, locationInput, titleInput) {
    if (!imageLinkInput.value?.trim() || !nameInput.value?.trim() || !locationInput.value?.trim() || !titleInput.value?.trim()) {
        errorModal.show();
        profileImage.src = defaultSrcUrl;
        return;
    }
}

setInterval(() => {
    if (formFilledCorrectly) {
        validateRequiredField([imageLinkInput, nameInput, locationInput, titleInput]);
        console.log("field validator run")
    }
    console.log("interval running")
}, 5000);