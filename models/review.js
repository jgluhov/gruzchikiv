var mongoose = require('mongoose');
var random = require('mongoose-random');

var review = new mongoose.Schema({
    name: String,
    text: String,
    created_at: { type: Date, default: Date.now }
});

review.plugin(random());

module.exports = mongoose.model('review', review);
