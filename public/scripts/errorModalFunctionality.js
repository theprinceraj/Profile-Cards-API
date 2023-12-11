const errorModal = new bootstrap.Modal(document.querySelector('#errorModal'));
const defaultSrcUrl = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://images.unsplash.com/photo-1514501259756-f4b6fbeffa67&socialMedia=Linkedin&socialMediaUsername=theprinceraj';

profileImage.onload = () => {
    if (profileImage.src !== defaultSrcUrl && formFilledCorrectlyAtLeastOnce) {
        clearTimeout(timer);
    }
}

profileImage.onerror = () => {
    timer = setTimeout(() => {
        errorModal.show(); // Show the error modal if image fails to load
        profileImage.src = defaultSrcUrl;
    }, 3000);
}