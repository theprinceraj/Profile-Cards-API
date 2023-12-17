const imageLinkInput = document.querySelector('#inputImageLink');
const nameInput = document.querySelector('#inputName');
const locationInput = document.querySelector('#inputLocation');
const titleInput = document.querySelector('#inputTitle');
const socialMediaInput = document.querySelector('#inputSocialMedia');
const socialMediaUsernameInput = document.querySelector('#inputSocialMediaUsername');
const profileImage = document.querySelector('#profile-image');

const imageFileInput = document.querySelector('#inputImageFile');

let formFilledCorrectly = false;
let timer;

const errorModal = new bootstrap.Modal(document.querySelector('#errorModal'));
const defaultSrcUrl = 'https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://shorturl.at/jnpBO&socialMedia=Linkedin&socialMediaUsername=theprinceraj';