var express = require('express');
var router = express.Router();
var datalist = [1,2,3]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home', list: datalist});
  // res.sendfile("./views/index.html");
});
router.get('/users', function (req, res, next) {
  res.render('users',{ title: '用户页面' });
// res.sendfile("./views/login.html");
});
module.exports = router;
