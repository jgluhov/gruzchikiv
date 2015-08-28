var article = require('../models/article').Article;

exports.get = function(req, res) {
    article.findOne({ location: "about" }, function(err, doc) {
        req.breadcrumbs(doc.title.main);
        res.render('pages/about', { page: doc.title.main, article: doc, breadcrumbs: req.breadcrumbs() });
    });
};
