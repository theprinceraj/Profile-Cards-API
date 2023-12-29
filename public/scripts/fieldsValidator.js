/**
 * Validates the input fields and checks if any field is empty.
 *
 * @return {boolean} Returns true if all required fields are not empty, false otherwise.
 */
function validateInputFields() {
    const [imageLinkInput, nameInput, locationInput, titleInput] = ['#inputImageLink',
        '#inputName',
        '#inputLocation',
        '#inputTitle',
        '#profile-image'].map(selectorID => document.querySelector(selectorID));

    const isAnyFieldEmpty = ![imageLinkInput, nameInput, locationInput, titleInput].every(field => field.value.trim());
    if (isAnyFieldEmpty) {
        alert('Please fill in all required fields');
        return false;
    }
    return true;
}