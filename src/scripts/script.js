document.getElementById('userInfoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const title = document.getElementById('title').value;
    const socialMedia = document.getElementById('socialMedia').value;
    const socialMediaUsername = document.getElementById('socialMediaUsername').value;

    // Perform further actions with the gathered information (e.g., send to a server)
    console.log({ name, location, title, socialMedia, socialMediaUsername });
});
