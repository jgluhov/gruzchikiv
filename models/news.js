var mongoose = require('mongoose');
var random = require('mongoose-random');

var News = new mongoose.Schema({
    title: String,
    text: String,
    date: { type: Date, default: Date.now }
});

News.plugin(random());

exports.News = mongoose.model('News', News);

