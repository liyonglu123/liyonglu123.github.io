var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  // res.send('respond with a resource');
  res.send('users',{title: '用户页面'})
});

module.exports = router;
