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

module.exports = CloudinarySchema;