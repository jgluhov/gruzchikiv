var async = require('async');
var util = require('util');
var path = require('path');
var cloudinary = require('./cloudinary');

var cloud = {
    upload: function(image, callback) {
        cloudinary.uploader.upload(image.path, function(res) {
            callback(null, res);
        });
    },
    delete: function(image, callback) {
        cloudinary.api.delete_resources(image.public_id,function(res) {
            callback(null, res);
        });
    }
};

module.exports.uploadFiles = function(images,  callback) {
    if(images[0].size != 0) {
        async.map(images, cloud.upload, function(err, res){
            callback(res);
        });
    } else {
        callback(null);
    }
};
module.exports.deleteFiles = function(images, callback) {
    if(images != null) {
        async.map(images, cloud.delete, function (res) {
            callback(res);
        });
    } else {
        callback(null);
    }
};
