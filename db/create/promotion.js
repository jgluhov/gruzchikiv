var Promotion = require('../../models/promotion').Promotion;

var promotion = new Promotion({
    text: "<span class=\"help-block\"><p><span class=\"text-info\">Акция!</span> Перевозка Н.Новгорода - Москва  всего за - <span class=\"text-danger\">9999</span> руб.</p></span>",
    desc: ""
});

promotion.save(function(err) {
    if(err) throw err;
});

