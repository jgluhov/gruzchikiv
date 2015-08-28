var async = require('async');
var config = require('../config');
var Review = require('../models/review');
var article = require('../models/article').Article;
var Recaptcha = require('re-captcha');

var recaptcha = new Recaptcha (
    config.get("google:public_key"),
    config.get("google:private_key")
);



exports.get = function(req, res) {
    async.parallel([
            function(callback) {
                article.findOne({ location: "reviews" }, function(err, doc) { callback(null, doc) });
            },
            function(callback) {
                Review.find({}).sort({ created_at: 'desc'}).exec(function(err, docs) {
                    callback(null, docs)
                });
            }
        ],
        function(err, data){
            req.breadcrumbs(data[0].title.main);
            res.render('pages/reviews', {
                page: data[0].title.main,
                article: data[0],
                reviews: data[1],
                recaptcha_form: recaptcha.toHTML(),
                breadcrumbs: req.breadcrumbs()
            });
        });

    /*
      page : page,
      article : article,
      reviews : reviews,
      captcha : captcha.toHTML(),
      breadcrumbs : req.breadcrumbs()
     */
};

exports.post = function(req, res, next) {

    var data = {
        remoteip:  req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response:  req.body.recaptcha_response_field
    };

    recaptcha.verify(data, function(err) {
        if (err) {
            res.send(500, "ERROR")
        } else {
            var date = moment().lang("ru").format('LL');
            var review = new Review ({
                name: req.body.name,
                text: req.body.message
            });

            review.save(function(err) {
                if(err) throw err;
            });

            res.render('pages/success', {
                page: 'Успешная загрузка',
                back: "/reviews"
            });
        }
    });
};
