var express = require('express');
var m = require('../menus');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Dashboard','x':m.menus});
});

module.exports = router;
