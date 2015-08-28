var async = require('async');
var cloudinary = require('../libs/cloudinary');

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CloudinarySchema = new Schema ({

    public_id  : { type: String, required: true },
    version    : { type: Number, required: true },
    width      : { type: Number, required: true },
    height     : { type: Number, required: true },
    format     : { type: String, required: true },
    bytes      : { type: Number, required: true },
    url        : { type: String, required: true },
    secure_url : { type: String, required: true }

});

var ArticleSchema = new Schema ({

    title: {
        main      : { type: String, default: null },
        secondary : { type: String, default: null }
    },
    body: {
        text      : { type: String, default: null },
        summary   : { type: String, default: null }
    },
    images      : [ CloudinarySchema ],
    location    : { type: String, required: true },
    position    : { type: Number, default: null },
    date        : { type: Date, default: Date.now }
});

ArticleSchema.statics.get = function get (name, callback) {
    return this.findOne({ location: name }, function(err, doc) {
        if(err) return console.error(err);
        callback(doc);
    });
};

exports.Article = mongoose.model('Article', ArticleSchema);
