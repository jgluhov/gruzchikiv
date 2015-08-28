var article = require('../models/article').Article;

exports.get = function(req, res) {
    article.findOne({ location: "contacts" }, function(err, doc) {
        req.breadcrumbs(doc.title.main);
        res.render('pages/contacts', { page: doc.title.main, article: doc, breadcrumbs: req.breadcrumbs() });
    });
};

