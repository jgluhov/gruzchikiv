var async = require('async');

var thumbnails = require('../models/thumbnail');
var articles = require('../models/article').Article;
var letters = require('../db/letters.json');
var PayMethods = require('../models/pay_methods');

exports.get = function(req, res) {

    async.parallel([
            function(callback) {
                thumbnails.find({}).sort('pos').exec(function(err, docs) {                    
                    callback(null, docs); 
                });
            },
            function(callback) {
                articles.find({ location: "index" }).sort('position').exec(function(err, docs) { callback(null, docs); });
            },
            function(callback) {
                PayMethods.get(function(doc) {
                    callback(null, doc);
                });
            }
        ],
        function(err, data){
            res.render('pages/index', {
                page: "Грузчики, переезды, разнорабочие, вывоз мусора, погрузка, разгрузка, дешево, круглосуточно",
                thumbnails: data[0],
                articles: data[1],
                letters: letters,
                pay_methods: data[2]
            });
    });

};


