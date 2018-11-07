const cloudinary = require('cloudinary');

const uploadToCloudinary = (images) => {
  let cloudUrls = {};
  let keysLength = Object.keys(images).length;
  let counter = 0;
  return new Promise(async (resolve, reject) => {
    for(key in images) {
      let filePath = images[key][0].path
      try {
        let cloudResults = await cloudinary.uploader.upload(filePath)
        cloudUrls[key] = cloudResults.url;
        counter++;

        if(keysLength === counter) {
          resolve(cloudUrls);
        }
      }
      catch(err) {
        console.log("ERROR UPLOADING TO CLOUDINARY", err)
        reject(err)
      }
    }
  });
};

module.exports = {uploadToCloudinary};