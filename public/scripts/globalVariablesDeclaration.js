const imageLinkInput = document.querySelector("#inputImageLink");
const inputImageLinkLoaderContainer = document.querySelector("#inputImageLinkLoaderContainer");
const nameInput = document.querySelector("#inputName");
const locationInput = document.querySelector("#inputLocation");
const titleInput = document.querySelector("#inputTitle");
const socialMediaInput = document.querySelector("#inputSocialMedia");
const socialMediaUsernameInput = document.querySelector("#inputSocialMediaUsername");
const profileImage = document.querySelector("#profile-image");

const copyLinkBtn = document.querySelector("#copyLinkBtn");

const imageFileInput = document.querySelector("#inputImageFile");

let formFilledCorrectlyOnce = false;
let errorTimer;

let debounceTimer;

const errorModal = new bootstrap.Modal(document.querySelector("#errorModal"));
const defaultSrcUrl =
    "https://profile-cards-api.vercel.app/api/profile?name=Prince%20Raj&location=India&title=Web%20Developer&imageLink=https://i.ibb.co/C9KyQXb/Saraswati-Puja-2024.jpg&socialMedia=Linkedin&socialMediaUsername=theprinceraj";

const shortenLinkBtn = document.querySelector("#shortenLinkBtn");
let currentLinkShortenedSuccessfully = false;
