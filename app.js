var express = require('express');
var nunjucks  = require('nunjucks');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var router = require('./routes/router');
var session = require('express-session');
var crypto = require('crypto');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend/packages')));

nunjucks.configure('node_modules/nhsuk-frontend/components', {
  autoescape: true,
  cache: false,
  express: app
})

// Setup nunjucks templating engine
nunjucks.configure(app.get('views'), {
    autoescape: true,
    noCache: true,
    watch: true,
    express: app
});
app.set('view engine', 'html');

// Serve static files from '/static' as pure HTML
app.use('/static', express.static('static'));

// Force HTTPS on production. Do this before using basicAuth to avoid
// asking for username/password twice (for `http`, then `https`).
var env = process.env.NODE_ENV || 'development';
var isSecure = (env === 'production' && useHttps === 'true')
if (isSecure) {
  app.use(forceHttps)
  app.set('trust proxy', 1) // needed for secure cookies on heroku
}

// Support session data
app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 1, // 1 hour
  },
  // use random name to avoid clashes with other prototypes
  name: 'kit-' + crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false,
  secret: crypto.randomBytes(64).toString('hex')
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use('/home', router);

// Redirect HTTP requests to HTTPS
forceHttps = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log('Redirecting request to https')
    // 302 temporary - this is a feature that can be disabled
    return res.redirect(302, 'https://' + req.get('Host') + req.url)
  }
  next()
}

// Store data from POST body or GET query in session
var storeData = function (input, store) {
  for (var i in input) {
    // any input where the name starts with _ is ignored
    if (i.indexOf('_') === 0) {
      continue
    }

    var val = input[i]

    // Delete values when users unselect checkboxes
    if (val === '_unchecked' || val === ['_unchecked']) {
      delete store.data[i]
      continue
    }

    // Remove _unchecked from arrays of checkboxes
    if (Array.isArray(val)) {
      var index = val.indexOf('_unchecked')
      if (index !== -1) {
        val.splice(index, 1)
      }
    }

    store.data[i] = val
  }
}

// Middleware - store any data sent in session, and pass it to all views
autoStoreData = function (req, res, next) {
  if (!req.session.data) {
    req.session.data = {}
  }

  storeData(req.body, req.session)
  storeData(req.query, req.session)

  // Send session data to all views

  res.locals.data = {}

  for (var j in req.session.data) {
    res.locals.data[j] = req.session.data[j]
  }

  next()
}

app.use(autoStoreData)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
