var sitemap = require('sitemap');
var Sitemap = require('../models/sitemap').Sitemap;

module.exports = function(req, res, next) {

    Sitemap.get(function(map) {
        res.locals.sitemap  = sitemap.createSitemap (map);
    });

    next();
};



