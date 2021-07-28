var express = require('express');
var router = express.Router();
var rg = require('random-greetings');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Travel Experts', tcGreetings: rg.greet() });

});

module.exports = router;
