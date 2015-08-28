var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var UrlSchema = new Schema ({
    url        : String,
    changefreq : String,
    priority   : Number
});

var Url = mongoose.model('Url', UrlSchema);

var SitemapSchema = new Schema ({
    hostname  : String,
    cacheTime : Number,
    urls      : [ UrlSchema ]
});

SitemapSchema.statics.get = function get (callback) {
    return this.findOne(function(err, doc) {
        if(err) return console.error(err);
        callback(doc);
    });
};

SitemapSchema.statics.insert = function insert(url, changefreq, priority, callback) {
    var item = new Url ({
        url: url,
        changefreq: changefreq,
        priority: priority
    });


    this.findOne(function(err, doc) {
        if(err) return console.error(err);
        doc.urls.push(item);
        doc.save(function(err) {
            if(err) throw err;
            callback(null);
        })
    });
};

SitemapSchema.statics.remove = function remove(id, callback) {
    this.findOne({ hostname: "http://gruzchikiv.nnov.ru"}, function(err, doc) {
        for(var i = 0; i < doc.urls.length; i++ ) {
            if(doc.urls[i].url == "/blog/view/" + id) {
                doc.urls[i].remove();
                doc.save(function(err) {
                    if(err) return console.error(err);
                    callback(null);
                })
            }
        }
    });
}

exports.Sitemap = mongoose.model('Sitemap', SitemapSchema);
exports.Url = Url;