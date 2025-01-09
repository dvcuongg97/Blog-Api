'use strict'

const cloudinary = require('cloudinary').v2;

require('../configs/cloudinary.config')
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadClodinary = async () => {

    const path = 'https://salt.tikicdn.com/cache/750x750/ts/product/33/57/97/71fd006e1fe1fd8c5242a4cf3b6f30d1.jpg.webp'

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'node-mongo'
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(path, options);

        console.log(result);

        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};

const uploadLocal = async ({ path }) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'local-upload',
        public_id: 'thumb'

    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(path, options);
        console.log(result);
        return {
            image_url: result.secure_url,
            thumb_url: await cloudinary.url(result.public_id, {
                height: 100,
                width: 100,
                format: 'jpg'
            })
        };
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    uploadClodinary, uploadLocal
}