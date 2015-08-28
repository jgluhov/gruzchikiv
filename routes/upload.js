var util = require('util');
var async = require('async');
var multiparty = require('multiparty');
var log = require('../libs/log')(module);
var cloud = require('../libs/cloud');

exports.get = function(req, res) {
    res.render('pages/upload',  { page: "Грузчики, переезды, разнорабочие, вывоз мусора, погрузка, разгрузка, дешево, круглосуточно" });
};

exports.post = function(req, res) {
    var form = new multiparty.Form();

    form.on('error', function (err) {
        log.info('Ошибка разбора формы: ' + err.stack);
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        log.info(util.inspect({bytesReceived: bytesReceived, bytesExpected: bytesExpected }));
    });

    form.parse(req, function (err, fields, files) {
        async.waterfall([
            function(callback){
                if(files.images[0].size != 0) {
                    cloud.uploadFiles(files.images, function(images) {
                        callback(null, images);
                    });
                } else {
                    callback(null, null);
                }
            }
        ], function (err, images) {
            res.writeHead(200, {"content-type": "text/json"});
            res.write(JSON.stringify(images));
            res.end('\n');
            log.info(JSON.stringify(images));
        });
    });
};
