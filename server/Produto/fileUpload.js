const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

const uploadImages = async function (path, options, public_id) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: public_id,
      folder: 'ecommerce',
    })
    .catch((error) => {
      console.log(error);
    });
  /*   console.log(uploadResult); */
  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(`ecommerce/${public_id}`, {
    fetch_format: 'auto',
    quality: 'auto',
  });

  return optimizeUrl;
};
module.exports = { uploadImages };
