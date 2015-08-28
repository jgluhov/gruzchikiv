var config = require('../config');
var cloudinary = require('cloudinary');

cloudinary.config ({
    cloud_name: config.get('cloudinary:name'),
    api_key: config.get('cloudinary:key'),
    api_secret: config.get('cloudinary:secret')
});

module.exports = cloudinary;
