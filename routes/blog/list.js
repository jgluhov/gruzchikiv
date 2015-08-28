var async = require('async');
var article = require('../../models/article');

exports.get = function(req, res) {

    async.parallel([
            function(callback) {
                article.findOne({ location: "blog/list" }, function(err, doc) {
                    callback(null, doc);
                });

            },
            function(callback) {
                article.find({ location: "blog/entries" }, function(err, docs) {
                    callback(null, docs);
                });
            }
        ],
        function(err, data){
            req.breadcrumbs("Блог","/blog");
            req.breadcrumbs(data[0].title.main);
            res.render('pages/blog/list', { page: data[0].title.main, article: data[0], entries: data[1], breadcrumbs: req.breadcrumbs() });
        });
};