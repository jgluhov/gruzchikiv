var async = require('async');
var multiparty = require('multiparty');
var Article = require('../../models/article');
var log = require('../../libs/log')(module);
var util = require('util');
var cloud = require('../../libs/cloud');
var Sitemap = require('../../models/sitemap').Sitemap;

exports.get = function(req, res) {

    async.parallel([
            function(callback) {
                Article.findOne({ location: "blog/add" }, function(err, doc) {
                    callback(null, doc);
                });
            }
        ],
        function(err, data){
            req.breadcrumbs("Блог","/blog");
            req.breadcrumbs(data[0].title.main);
            res.render('pages/blog/insert', { page: data[0].title.main, article: data[0], breadcrumbs: req.breadcrumbs() });
        });
};

exports.post = function(req, res) {

    var form = new multiparty.Form();

    form.on('error', function (err) {
        log.info('Error parsing form: ' + err.stack);
    });

    form.parse(req, function (err, fields, files) {

        cloud.uploadFiles(files.media, function (images) {
            var article = new Article({
                title: {
                    main: fields.main[0],
                    secondary: fields.secondary[0]
                },
                body: {
                    text: fields.text[0],
                    summary: fields.summary[0]
                },
                images: images,
                location: fields.location[0]
            });

            Sitemap.insert("/blog/view/" + article._id, "monthly", 0.7 , function(err) {
                if(err) throw err;
            });

            article.save(function (err) {
                if (err) throw err;
            });
        });

    });

    form.on('close', function() {
        log.info('Upload completed!');
        res.render('pages/success', {
            page: 'Успешная загрузка',
            back: "/blog"
        });
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        log.info(util.inspect({bytesReceived: bytesReceived, bytesExpected: bytesExpected }));
    });
};