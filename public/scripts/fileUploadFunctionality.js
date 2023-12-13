const imageFileInput = document.querySelector('#inputImageFile');

imageFileInput.addEventListener('change', async () => {
    const file = imageFileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.data.url;

                imageLinkInput.value = imageUrl;
                imageLinkInput.disabled = true;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
        }
    }
});
