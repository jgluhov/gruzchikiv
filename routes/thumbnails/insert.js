var async = require('async');
var multiparty = require('multiparty');
var article = require('../../models/article');
var Thumbnail = require('../../models/thumbnail');
var cloud = require('../../libs/cloud');
var log = require('../../libs/log')(module);
var util = require('util');

exports.get = function(req, res) {
    async.parallel([
            function(callback) {
                article.findOne({ location: "thumbnails/insert" }, function(err, doc) {
                    callback(null, doc);
                });
            }
        ],
        function(err, data){
            req.breadcrumbs(data[0].title.main);
            res.render('pages/thumbnails/insert', { page: data[0].title.main, article: data[0], breadcrumbs: req.breadcrumbs() });
        });
}

exports.post = function(req, res) {
    var form = new multiparty.Form();

    form.on('error', function (err) {
        log.info('Error parsing form: ' + err.stack);
    });

    form.parse(req, function (err, fields, files) {
        async.waterfall([
            function(callback){
                if(files.media[0].size != 0) {
                    cloud.uploadFiles(files.media, function(images) {
                        callback(null, images);
                    });
                } else {
                    callback(null, null);
                }
            }
        ], function (err, image) {
            var thumbnail = new Thumbnail({
                title : fields.title[0],
                text : fields.text[0],
                url : fields.url[0],
                image : image
            });

            thumbnail.save(function(err) {
                if(err) throw err;
            });
        });
    });

    form.on('close', function() {
        log.info('Upload completed!');
        res.render('pages/success', {
            page: 'Успешная загрузка',
            back: "/"
        });
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        log.info(util.inspect({bytesReceived: bytesReceived, bytesExpected: bytesExpected }));
    });
}