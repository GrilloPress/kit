var express = require('express');
var router = express.Router();

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
  res.render( 'v1/index' );
});

// GET all v1 URL reqs and push them to a template in the v1 file
// This doesn't handle sub-urls yet...
// This feels really brittle and hacky...
// No handling of no view found...
router.get('/v1/:view', function(req, res, next) {
  var theView = req.params.view;
  res.render( 'v1/' + theView );
});

// // // // // // //

module.exports = router;