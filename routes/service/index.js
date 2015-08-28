var Service = require('../../models/service').Service;

exports.get = function(req, res) {
    Service.findOne({ name: req.params.name }, function (err, service) {
        req.breadcrumbs("Услуги", "#");
        req.breadcrumbs(service.title.main);
        res.render('pages/service/entry', {
            page: service.title.main,
            service: service,
            breadcrumbs: req.breadcrumbs()
        });
    });
};
