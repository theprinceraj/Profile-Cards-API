imageFileInput.addEventListener("change", async () => {
    const imageFile = imageFileInput.files[0];
    if (imageFile) {
        try {
            const base64String = await convertToBase64(imageFile);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64String }),
            };

            const serverResponse = await fetch(backendUrl + "/api/upload", requestOptions);

            if (serverResponse.ok) {
                const data = await serverResponse.json();
                const imageUrl = data.imageUrl;

                imageLinkInput.value = imageUrl;
                imageLinkInput.disabled = true;
            } else {
                throw new Error("Image upload failed on the server.");
            }
        } catch (error) {
            console.log(error);
        }
    }
});

async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
        };
        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}
