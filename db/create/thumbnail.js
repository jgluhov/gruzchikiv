var async = require('async');
var Thumbnail = require('../../models/thumbnail');
/*
async.waterfall([
    function(callback){
        Thumbnail.uploadImage("img/services/gruzoperevozki.png", function(err, image) {
            if(err) throw err;
            callback(null, image);
        });
    }
], function (err, image) {
    var thumb = new Thumbnail({
        title: "Вывоз мусора",
        text: "Мы достойно справимся с вывозом мусора, так как у нас для этого есть все необходимое. Доверьте эту работу нашим профессионалам.",
        url: "vyvoz_musora",
        image: image
    });

    thumb.save(function(err) {
        if(err) throw err;
    });
});
*/

Thumbnail.getAll(function(docs) {
   console.log(docs);
});