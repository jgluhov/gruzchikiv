var async = require('async');
var mongoose = require('../../libs/mongoose');
var Sitemap = require('../../models/sitemap').Sitemap;
var Url = require('../../models/sitemap').Url;
var Article = require('../../models/article');


async.waterfall([
    function(callback){
        Article.find({ location: "blog/entries" }, function(err, docs) {
            callback(null, docs)
        });
    },
    function(docs, callback){

        var sitemap = new Sitemap ({
            hostname: "http://gruzchikiv.nnov.ru",
            cacheTime: 600000,
            urls: [
                { url: '/',  changefreq: 'daily', priority: 1 },
                { url: '/about',  changefreq: 'monthly',  priority: 0.5 },
                { url: '/vacancies/', changefreq: 'daily',  priority: 0.5 },
                { url: '/service/gruzoperevozki', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/pereyezdy', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/gruzchiki', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/raznorabochiye', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/takelazhniki', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/razgruzka_pogruzka', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/sborka_razborka', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/vyvoz_musora', changefreq: 'daily',  priority: 0.7 },
                { url: '/service/upakovka', changefreq: 'daily',  priority: 0.7 },
                { url: '/price', changefreq: 'monthly',  priority: 0.7 },
                { url: '/reviews', changefreq: 'monthly',  priority: 0.5 },
                { url: '/contacts', changefreq: 'monthly',  priority: 0.7 },
                { url: '/news', changefreq: 'daily',  priority: 0.6 },
                { url: '/blog', changefreq: 'daily',  priority: 0.9 }
            ]
        });

        docs.forEach(function(doc) {
            var url = new Url({
                url: "/blog/view/" + doc._id,
                changefreq: "monthly",
                priority: 0.7
            })
            sitemap.urls.push(url);
        });

        callback(null, sitemap)
    }
], function (err, sitemap) {
    sitemap.save(function(err) {
        if(err) throw err;
    });
});



