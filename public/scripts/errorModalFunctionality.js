const errorModal = new bootstrap.Modal(document.querySelector('#errorModal'));
const defaultSrcUrl = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://shorturl.at/jnpBO&socialMedia=Linkedin&socialMediaUsername=theprinceraj';
const requiredFields = [imageLinkInput, nameInput, locationInput, titleInput];

profileImage.onerror = () => {
    setTimeout(() => {
        validateRequiredField(imageLinkInput, nameInput, locationInput, titleInput);
    }, 10000)
    return;
}