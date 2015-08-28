var async = require('async');
var article = require('../models/article').Article;
var news = require('../models/news').News;

exports.get = function(req, res) {

    async.parallel([
            function(callback) {
                article.findOne({location: "news"}, function(err, doc) { callback(null, doc); });
            },
            function(callback) {
                news.find({}, function(err, docs) { callback(null, docs); });
            }
        ],
        function(err, data){
            req.breadcrumbs(data[0].title.main);
            res.render('pages/news', { page: data[0].title.main, article: data[0], news: data[1], breadcrumbs: req.breadcrumbs() });
        });
};
