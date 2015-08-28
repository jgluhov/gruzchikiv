var article = require('../models/article').Article;

exports.get = function(req, res) {
    article.findOne({ location: "vacancies" }, function(err, doc) {
        req.breadcrumbs(doc.title.main);
        res.render('pages/vacancies', { page: doc.title.main, article: doc, breadcrumbs: req.breadcrumbs() });
    });
};
