var async = require('async');
var top = require('../db/menu/top.json');
var bottom = require('../db/menu/bottom.json');
var company = require('../db/company.json');
var web = require('../db/web.json');
var partners = require('../db/partners.json');
var promotion = require('../models/promotion');
var review = require('../models/review');

module.exports = function(req, res, next) {
    async.parallel([
            function(callback) {
                promotion.findRandom(function(err, doc) { callback(null, doc) });
            },
            function(callback) {
                review.findRandom(function(err, doc) { callback(null, doc) });
            }
        ],
        function(err, data){
            res.locals.menu = { top: top, bottom : bottom },
            res.locals.company = company;
            res.locals.web = web;
            res.locals.partners = partners;
            res.locals.promotion = data[0];
            res.locals.review = data[1];
            next();
        });
};

