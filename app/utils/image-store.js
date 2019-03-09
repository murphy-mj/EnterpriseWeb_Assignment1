'use strict';

const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

cloudinary.config({
    cloud_name: 'wit-student',
    api_key: process.env.api_key,
    api_secret: process.env.api_secret_key
});



const ImageStore = {
    configure: function(cloudinaryConfig) {
        const credentials = {
            cloud_name: cloudinaryConfig.cloud_name,
            api_key: cloudinaryConfig.api_key,
            api_secret: cloudinaryConfig.api_secret
        };
        cloudinary.config(credentials);
    },



    getAllImages: async function() {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },



    deleteImage: async function(id) {

        await cloudinary.v2.uploader.destroy(id, {});

    },



    uploadImage: async function(imagefile) {

        await writeFile('./public/temp.img', imagefile);

        await cloudinary.uploader.upload('./public/temp.img');

    }

};

module.exports = ImageStore;
