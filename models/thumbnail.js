var async = require('async');
var CloudinarySchema = require('./cloudinary');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = Schema({
    src: {
        public_id  : { type: String, required: true },
        version    : { type: Number, required: true },
        width      : { type: Number, required: true },
        height     : { type: Number, required: true },
        format     : { type: String, required: true },
        bytes      : { type: Number, required: true },
        url        : { type: String, required: true },
        secure_url : { type: String, required: true }
    },
    alt: String
});

var ThumbnailSchema = Schema ({
    title : { type: String, default: "thumbnail.title" },
    text : { type: String, default: "thumbnail.text" },
    url : { type: String, default: "#" },
    images : [ ImageSchema ],
    pos : Number
});

ThumbnailSchema.statics.getAll = function getAll (cb) {
    return this.find(function(err, docs) {
        if(err) return console.error(err);
        cb(docs);
    });
}

module.exports = mongoose.model('Thumbnail', ThumbnailSchema);

