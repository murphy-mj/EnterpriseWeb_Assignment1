'use strict';
//const cloudinary = require('cloudinary');
const ImageStore = require('../utils/image-store');




const Gallery = {

    index: {
        handler: async function(request, h) {
            let allImages = [];
            let errorMessage = '';
            try {
                ImageStore.configure(this.cloudinaryCredentials);
                allImages = await ImageStore.getAllImages();
            } catch (e) {
                errorMessage = e;
            }
            return h.view('gallery', {
                title: 'Cloudinary Gallery',
                cloudinary: this.cloudinaryCredentials,
                images: allImages,
                error: errorMessage
            });

        }

    },

    updateCredentials: {
        handler: async function(request, h) {
            this.cloudinaryCredentials.cloud_name = request.payload.name;
            this.cloudinaryCredentials.api_key = request.payload.key;
            this.cloudinaryCredentials.api_secret = request.payload.secret;
            return h.redirect('/cloud');
        }

    },

    deleteImage: {
        handler: async function(request, h) {
            ImageStore.deleteImage(request.params.id);

            return h.redirect('/cloud');
        }

    },

    uploadFile: {

        handler: async function(request, h) {
            const file = request.payload.imagefile;
            if (Object.keys(file).length > 0) {
                let rsly =  await ImageStore.uploadImage(request.payload.imagefile);
                console.log(rsly);
                return h.redirect('/');
            }
            return h.view('gallery', {
                title: 'Cloudinary Gallery',
                cloudinary: this.cloudinaryCredentials,
                error: 'No file selected'
            });
        }
    }

};



module.exports = Gallery;