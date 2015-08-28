var async = require('async');
var Article = require('../models/article').Article;
var Sitemap = require('../models/sitemap').Sitemap;

exports.get = function(req, res) {
    async.parallel({
        page: function (callback) {
            Article.get("sitemap", function(page) {
                callback(null, page);
            });
        },
        sitemap: function (callback) {
            Sitemap.get(function(sitemap) {
                callback(null, sitemap);
            });
        }
    },
    function(err, result) {

        req.breadcrumbs(result.page.title.main);

        res.render('pages/sitemap', {
            page: result.page.title.main,
            article: result.page,
            sitemap: result.sitemap,
            breadcrumbs: req.breadcrumbs()
        });

    });
};