const imageFileInput = document.querySelector('#inputImageFile');

imageFileInput.addEventListener('change', async () => {
    const file = imageFileInput.files[0];
    if (file) {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const serverResponse = await fetch('/profile/upload', {
                method: 'POST',
                body: formData,
            });

            if (serverResponse.ok) {
                const data = await serverResponse.json();
                const imageUrl = data.imageUrl;

                // yaha pe tum apna client side ka UI update karre ho with imageUrl
                imageLinkInput.value = imageUrl;
                imageLinkInput.disabled = true;
            } else {
                throw new Error('Image upload failed on the server');
            }
        } catch (error) {
            console.error(error);
        }
    }
});