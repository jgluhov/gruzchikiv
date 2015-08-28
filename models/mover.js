var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Row = new Schema({
    name: String,
    hour: String,
    min: { type: Number, default: 4 },
    total: String,
    desc: String
});

var Mover = new Schema({
    headers: [String],
    data: [Row],
    date  : { type: Date, default: Date.now }
});


exports.Mover = mongoose.model('Mover', Mover);
