var express = require('express');
var router = express.Router();
let m = require('../menus');
router.get('/',(req, res, next)=>{
    res.render('pages/index',{ title: 'Dashboard','x':m.menus});
    // res.send('USER');
})
router.get('/scanner',(req,res,next)=>{
    let x = { title: 'Scan Barcode',title_body:'Input scan QR code','x':m.menus}
    res.render('pages/scanner',x);
})
router.get('/upload',(req,res,next)=>{
    let x = { title: 'Upload Barcode',title_body:'Upload Excel','x':m.menus}
    res.render('pages/upload',x);
})

module.exports = router;