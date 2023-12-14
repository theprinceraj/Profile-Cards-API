async function uploadChangeFile(req, res) {
    const fileReceived = req.file;
    if (!fileReceived) {
        return res.status(400).send('No file uploaded.');
    } else {
        const formData = new FormData();
        formData.append('image', fileReceived);

        try {
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=09c741b9a8d83ae0d3a95d77a56129ef`, {
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
                error: 'Internal Server Error'
            });
        }
    }
}

module.exports = {
    uploadChangeFile
}