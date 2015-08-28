var async = require('async');
var thumbnail = require('../../models/thumbnail');
var cloud = require('../../libs/cloud');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            thumbnail.findOne({ _id: req.params.id }, function(err, doc) {
                callback(null, doc);
            });
        },
        function(doc, callback){
            cloud.deleteFiles(doc.images, function(err, result) {
                if(err) throw err;
                callback(null, doc);
            });
        }
    ], function (err, doc) {
        doc.remove();
        res.render('pages/success', { page: 'Успешная загрузка', back: "/blog/list" });
    });
};