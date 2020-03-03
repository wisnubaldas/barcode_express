var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.create({
    firstName:'wisnu',
    lastName:'baldas',
    email:'wisnubaldas@gmail.com',
    password:123123123123
  }).then(()=>{
    models.User.findAll().then(users => {
      console.log("All users:", JSON.stringify(users, null, 4));
      res.send(users);
    });
  })
});

module.exports = router;
