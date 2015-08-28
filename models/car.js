var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Row = new Schema({
    inside: {
        name: String,
        cost: String
    },
    outside: {
        name: String,
        cost: String
    }
});

var Car = new Schema({
    name: String,
    desc: String,
    text: {
        inside: String,
        outside: String
    },
    header: {
        inside: [String],
        outside: [String]
    },
    data: [Row],
    date  : { type: Date, default: Date.now }
});

exports.Car = mongoose.model('Car', Car);
