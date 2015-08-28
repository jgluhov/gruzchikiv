var Service = require('../../models/service').Service;

exports.get = function(req, res) {
    Service.find({}, function (err, docs) {
        req.breadcrumbs("Список услуг", "/services");

        res.render('pages/service/list', {
            page: "Список услуг",
            title: "Список услуг",
            services: docs,
            breadcrumbs: req.breadcrumbs()
        });
    });
};
