var express = require('express');
var router = express.Router();

// catch all GET routes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index' );
});

router.get('/:view', function(req, res, next) {
  var theView = req.params.view;
  res.render( theView );
});

router.get('/:subdir/:view', function(req, res, next) {
  var theView = req.params.view;
  var theDir = req.params.subdir;
  res.render( theDir + '/' + theView );
});

router.get('/:subdir/:subdir2/:view', function(req, res, next) {
  var theView = req.params.view;
  var theDir = req.params.subdir;
  var theDir2 = req.params.subdir2;
  res.render( theDir + '/' + theDir2 + '/' + theView );
});

router.get('/:subdir/:subdir2/:subdir3/:view', function(req, res, next) {
  var theView = req.params.view;
  var theDir = req.params.subdir;
  var theDir2 = req.params.subdir2;
  var theDir3 = req.params.subdir3;
  res.render( theDir + '/' + theDir2 + '/' + theDir3 + '/' + theView );
});

router.get('/:subdir/:subdir2/:subdir3/:subdir4/:view', function(req, res, next) {
  var theView = req.params.view;
  var theDir = req.params.subdir;
  var theDir2 = req.params.subdir2;
  var theDir3 = req.params.subdir3;
  var theDir4 = req.params.subdir4;
  res.render( theDir + '/' + theDir2 + '/' + theDir3 + '/' + theDir4 + '/' + theView );
});

module.exports = router;
