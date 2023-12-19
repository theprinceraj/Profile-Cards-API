function validateInputFields() {
    const [imageLinkInput, nameInput, locationInput, titleInput] = ['#inputImageLink',
        '#inputName',
        '#inputLocation',
        '#inputTitle',
        '#profile-image'].map(selectorID => document.querySelector(selectorID));

    const isAnyFieldEmpty = ![imageLinkInput, nameInput, locationInput, titleInput].every(field => field.value.trim());
    if (isAnyFieldEmpty) {
        alert('Please fill in all required fields');
        return;
    }
}