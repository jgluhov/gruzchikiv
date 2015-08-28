var SMS = require('sms_ru');
var config = require('../config');

exports.post = function(req, res, next) {

    var sms = new SMS(config.get("sms_ru:api_id"));

    sms.sms_send({
        to: config.get("sms_ru:to"),
        text: "GRUZCHIKIV.NNOV | ОБРАТНЫЙ ЗВОНОК | " + req.body.phone
    }, function(e){
        console.log(e.description);
    });
    res.send(200, "OK");
};