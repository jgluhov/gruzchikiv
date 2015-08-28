var Article = require('../../models/article').Article;

var article = new Article({
    title: {
        main: "БЛОГ/Список",
        secondary: "Список историй нашего блога"
    },
    body: {
        text: "",
        summary: null
    },
    images : null,
    location: "blog/list"
});

article.save(function(err) {
    if(err) throw err;
});
