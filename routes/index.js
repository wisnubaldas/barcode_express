var models  = require('../models');
var express = require('express');
// var m = require('../menus');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login');
});

router.post('/',(req, res, next)=>{
    const mailName = req.body.email;
    const pswd = req.body.password;
    models.User.findOne({ where: {email: mailName, password:pswd} }).then(user=>{
          if(user === null)
          {
            res.render('pages/login',{message:'User atau Password anda salah, coba ganti user atau password dengan benar'});
          }else{
            req.session.user = {id:user.id,name:user.firstName,mail:user.email};
            res.redirect('/pages');
          }
    });
})
router.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("---------> user logged out.")
  });
  res.redirect('/');
});
module.exports = router;
