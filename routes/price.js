var async = require('async');
var article = require('../models/article').Article;
var car = require('../models/car').Car;
var mover = require('../models/mover').Mover;

exports.get = function(req, res) {

    async.parallel([
            function(callback) {
                article.find({location: "price"}, function(err, doc) { callback(null, doc); });
            },
            function(callback) {
                car.find({}, function(err, docs) { callback(null, docs); });
            },
            function(callback) {
                mover.findOne({}, function(err, doc) { callback(null, doc)});
            }
        ],
        function(err, data){
            req.breadcrumbs(data[0][0].title.main);
            res.render('pages/price', { page: data[0][0].title.main, articles: data[0], cars: data[1], movers: data[2], breadcrumbs: req.breadcrumbs() });
        });
};

