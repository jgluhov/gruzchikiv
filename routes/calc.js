var calc = require('../db/calc.json');

exports.get = function(req, res) {
    var hours = parseInt(req.query.hours);
    var people = parseInt(req.query.people);

    if(hours < calc.minimum) hours = calc.minimum;

    switch(parseInt(req.query.time)) {
        case 0: res.send((hours * people * calc.cost.day).toString() + calc.currency); break;
        case 1: res.send((hours * people * calc.cost.night).toString() + calc.currency); break;
        default: break;
    }

};
