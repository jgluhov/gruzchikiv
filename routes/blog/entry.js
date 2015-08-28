var article = require('../../models/article').Article;

exports.get = function(req, res) {
    article.findOne({ _id: req.params.id }, function(err, doc) {
        req.breadcrumbs("Блог","/blog");
        req.breadcrumbs(doc.title.main, "/blog/" + req.params.id);
        res.render('pages/entry', { page: "Блог" + " | " + doc.title.main, article: doc, breadcrumbs: req.breadcrumbs() });
    });
};
