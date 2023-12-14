const process = require('node:process');
async function uploadChangeFile(req, res) {
    const file = req.body.image;

    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            if (imgbbResponse.ok) {
                const imgbbData = await imgbbResponse.json();
                res.json({ imageUrl: imgbbData.data.url });
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error',
                details: error
            });
        }
    } else {
        res.status(400).json({ error: 'Bad Request: No image provided' });
    }
}

module.exports = {
    uploadChangeFile
}