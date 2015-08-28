var async = require('async');
var article = require('../../models/article').Article;

exports.get = function(req, res) {    
    async.parallel([
            function(callback) {
                article.findOne({ location: "blog" }, function(err, doc) {
                    if(err) throw err;                                  
                    callback(null, doc) 
                });
            },
            function(callback) {
                article.find({ location: "blog/entries" }, function(err, docs) {
                    if(err) throw err;                                
                    callback(null, docs) 
                });
            }
        ],
        function(err, data){                
            req.breadcrumbs(data[0].title.main);
            res.render('pages/blog', {
                page: data[0].title.main,
                article: data[0],
                entries: data[1],
                breadcrumbs: req.breadcrumbs()
            });
        });
};


