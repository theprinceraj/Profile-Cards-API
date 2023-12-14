const imageFileInput = document.querySelector('#inputImageFile');

imageFileInput.addEventListener('change', async () => {
    const imageFile = imageFileInput.files[0];
    if (imageFile) {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const serverResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            let data;
            if (serverResponse.ok) {
                data = await serverResponse.json();
                const imageUrl = data.imageUrl;

                // yaha pe tum apna client side ka UI update karre ho with imageUrl
                imageLinkInput.value = imageUrl;
                imageLinkInput.disabled = true;
            } else {
                throw new Error('Image upload failed on the server', data, serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }
});