var Sitemap = require('../models/sitemap').Sitemap;
var sm = require('sitemap');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var async = require('async');
var Article = require('../models/article').Article;
var Review = require('../models/review');
var Service = require('../models/service').Service;


module.exports = function(app) {

    app.get('/', require('./home').get);
    app.get('/about', require('./about').get);
    app.get('/vacancies', require('./vacancies').get);
    app.get('/price', require('./price').get);
    app.get('/contacts', require('./contacts').get);
    app.get('/news', require('./news').get);

    app.get('/reviews', require('./reviews').get);
    app.post('/reviews', require('./reviews').post);

    app.route('/service')
        .get(function(req, res) {
            res.send(200);
        });
    app.route('/service/list')
        .get(function(req, res) {
            res.send(200);
        });
    app.get('/service/:name', require('./service/index').get);
    app.get('/services', require('./service/list').get);

    app.get('/blog', require('./blog/index').get);
    app.get('/blog/list', require('./blog/list').get);
    app.get('/blog/insert', require('./blog/insert').get);
    app.post('/blog/insert', require('./blog/insert').post);
    app.get('/blog/:id', require('./blog/entry').get);
    app.get('/blog/remove/:id', require('./blog/remove').get);

    app.get('/calc', require('./calc').get);

    app.post('/callback', require('./callback').post);

    app.get('/thumbnails/insert', require('./thumbnails/insert').get);
    app.post('/thumbnails/insert', require('./thumbnails/insert').post);

    app.get('/sitemap', require('./sitemap').get);
    app.get('/sitemap.xml', function(req, res) {
        Sitemap.get(function(map){
            var sitemap  = sm.createSitemap (map);
            sitemap.toXML(function(xml){
                res.header('Content-Type', 'application/xml');
                res.send( xml );
            });
        });
    });
    app.get("/robots.txt", function(req, res) {        
        fs.readFile(path.join(__dirname, '../', "robots.txt"), 'utf8', function(err, data) {
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write(data);
            res.end();
        });

    });
    app.route("/upload")
        .get(require('./upload').get)
        .post(require('./upload').post);


    app.route("/admin/articles")
        .get(function(req,res) {
            async.parallel([
                function(callback) {
                    Article.find({}, function(err, docs) {
                        callback(null, docs);
                    });
                },
                function(callback) {
                    Service.find({}, function(err, docs) {
                        callback(null, docs);
                    });
                }
            ], function(err, result) {
                res.render('pages/admin/articles', {
                    data: { articles: result[0], services: result[1] }
                });
            });
        });


    app.route("/admin/article/:id")
        .get(function(req,res) {
            Article.findById(req.params.id, function(err, doc) {
                res.render("pages/admin/article", {
                    article: doc
                });
            });
        })
        .post(function(req,res) {
            Article.findByIdAndUpdate(req.params.id, {
                title: { main: req.body.title, secondary: req.body.subtitle },
                body: { text: req.body.mainText, summary: req.body.sideText }
            }, function(err, doc){
                if (err) {
                    console.error(err.stack);
                    res.status(500).send("Упс. Что то пошло не так :(");
                }
                res.status(200).send("Ура. Запись удачно сохранена");
            });
        });

    app.route("/admin/service/:id")
        .get(function(req,res) {
            Service.findById(req.params.id, function(err, doc) {
               res.render("pages/admin/service", {
                   service: doc
               });
            });
        })
        .post(function(req,res) {
            Service.findByIdAndUpdate(req.params.id, {
                    title: { main: req.body.title, secondary: req.body.subtitle },
                    body: { text: req.body.mainText, summary: req.body.sideText }
                }, function(err, doc) {
                    if (err) {
                        console.error(err.stack);
                        res.status(500).send("Упс. Что то пошло не так :(");
                    }
                    res.status(200).send("Ура. Запись удачно сохранена");
                }
            );
        });

};


