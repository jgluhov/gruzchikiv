/**
 * Created by admin on 11/08/14.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemsSchema = Schema
({
    title: { type: String, required: true },
    url: { type: String, default: "#" },
    image: {
        public_id: { type: String, required: true },
        version: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        format: { type: String, required: true },
        bytes: { type: Number, required: true },
        url: { type: String, required: true },
        secure_url: { type: String, required: true }
    }
});

var PayMethodsSchema = Schema
({
    text: { type: String, required: true },
    items: [ItemsSchema]
});

PayMethodsSchema.statics.get = function getAll (callback) {
    return this.findOne(function(err, doc) {
        if(err) return console.error(err);
        callback(doc);
    });
};

module.exports = mongoose.model('PayMethods', PayMethodsSchema);