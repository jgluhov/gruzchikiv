var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('./libs/mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var breadcrumbs = require('express-breadcrumbs');
var config = require('./config');
var ejs_locals = require('ejs-locals');
var less_middleware = require('less-middleware');
var sitemap = require('./middleware/sitemap');
var log = require('./libs/log')(module);
var favicon = require('serve-favicon');

var app = express();

// configuration ===============================================================

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs_locals);

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(less_middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// set breadcrumbs home information
app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome());
app.use('/', breadcrumbs.setHome({ name: 'Главная', url: '/' }));

app.use(require('./middleware/db'));
app.use(sitemap);

var routes = require('./routes')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    log.info(err.message);
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
