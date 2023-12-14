async function uploadChangeFile(req, res) {
    const base64versionImage = req.body.image;
    if (!base64versionImage) {
        return res.status(400).send('No file uploaded.');
    } else {
        const formData = new FormData();
        formData.append('image', base64versionImage);

        try {
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            if (imgbbResponse.ok) {
                const imgbbData = await imgbbResponse.json();
                res.json({ imageUrl: imgbbData.data.url });
            } else {
                const errorResponse = await imgbbResponse.json(); // Parse the error response body
                console.log('ImgBB Error Response:', errorResponse); // Log the detailed error response
                console.log('ImgBB Response:', imgbbResponse.status, imgbbResponse.statusText);
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
}

module.exports = {
    uploadChangeFile
}