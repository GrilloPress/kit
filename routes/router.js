var express = require('express');
var router = express.Router();

// End of app... kill session with req.session.destroy()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index' );
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render( 'index' );
});

// // // // // // //
// v1 Directory Route Code
//
// Copy this and replace with v2 etc. to recreate
// // // // // // //

// GET v1 index page.
router.get('/v1', function(req, res, next) {

  res.render( 'v1/index', {
    session: req.session
  } );
});

// GET all v1 URL reqs and push them to a template in the v1 file
// This feels really brittle and hacky...
// No handling of no view found...
router.get('/v1/:view', function(req, res, next) {
  var theView = req.params.view;
  res.render( 'v1/' + theView, {
    session: req.session
  } );
});

router.get('/v1/:subdir/:view', function(req, res, next) {
  var theView = req.params.view;
  var theDir = req.params.subdir;
  res.render( 'v1/' + theDir + '/' + theView, {
    session: req.session
  } );
});

router.post('/v1', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var jugglingBalls = req.body['juggling-balls']

  // Check whether the variable matches a condition
  if (jugglingBalls == "3 or more"){
    // Send user to next page
    req.session.jugglingBalls = jugglingBalls
    res.redirect('/v1/next')
  }
  else {
    // Send user to ineligible page
    req.session.jugglingBalls = jugglingBalls
    res.redirect('/ineligible')
  }

})

// // // // // // //

module.exports = router;
