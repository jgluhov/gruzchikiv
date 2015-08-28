var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var Cloudinary = new mongoose.Schema ({
    public_id: { type: String, required: true },
    version: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    format: { type: String, required: true },
    bytes: { type: Number, required: true },
    url: { type: String, required: true },
    secure_url: { type: String, required: true }
});

var Service = new mongoose.Schema({
    name: String,
    title: {
        main: String,
        secondary: String
    },
    body: {
        text: String,
        summary: String
    },
    images: [ Cloudinary ],
    date : {type: Date, default: Date.now}
});

exports.Service = mongoose.model('Service', Service);
