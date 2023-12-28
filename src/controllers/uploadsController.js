/**
 * Uploads a file to the IMG BB server.
 * 
 * This function takes in a request object `req` and a response object `res`. It expects the request body to contain an `image` field with the base64 version of the image to be uploaded. If the `image` field is not present or empty, it will send a 400 Bad Request response with the message 'No file uploaded.' If the `image` field is present, it will create a new FormData object, append the `image` field to it, and then send a POST request to the IMG BB API with the FormData as the body. If the request is successful (status code 200), it will parse the response body as JSON and send a JSON response with the uploaded image's URL. If the request is unsuccessful, it will parse the error response body and throw an Error with the message 'Image upload failed'. If an error occurs during the execution of the function, it will catch the error, log it to the console, and send a 500 Internal Server Error response.
 *
 * The logic for uploading to the IMG BB server is as follows:
 * - Create a new FormData object.
 * - Append the `image` field (base64 version of the image) to the FormData.
 * - Send a POST request to the IMG BB API with the FormData as the body.
 * - If the request is successful (status code 200), parse the response body as JSON.
 * - Send a JSON response with the uploaded image's URL.
 * - If the request is unsuccessful, parse the error response body and throw an Error with the message 'Image upload failed'.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
export default async function uploadFileToIMG_BB_Server(req, res) {
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