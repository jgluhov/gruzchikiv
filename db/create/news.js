var News = require('../../models/news').News;

var news = new News({
    title: "Переезд с «Грузчики в НН» стал еще выгоднее",
    text: "<p>С 1 июня 2014 г. «Грузчики в Нижнем Новгороде» снизил цены на почасовые работы специалистов - грузчики стандарт с 350 руб. до 300 руб./час. и грузчики элита с 400 руб. до 350 руб. Стоимость работы нашего автотранспорта остаются прежними.</p><p>Подробнее ознакомиться с нашими тарифами Вы можете на странице «Наши цены».</p><p>Для получения подробной консультации и расчета стоимости услуш, свяжитесь с нами!</p>"
});

news.save(function(err) {
    if(err) throw err;
});






