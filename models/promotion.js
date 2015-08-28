var mongoose = require('mongoose');
var random = require('mongoose-random');

var promotion = new mongoose.Schema({
    text: String,
    desc: String
});

promotion.plugin(random());

module.exports = mongoose.model('promotion', promotion);
