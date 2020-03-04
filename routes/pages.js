var models  = require('../models');
var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');

let m = require('../menus');
let uploadController = require('../controller/uploadController');

router.use(fileUpload());

router.get('/',(req, res, next)=>{
    res.render('pages/index',{ title: 'Dashboard','x':m.menus});
    // res.send('USER');
})
router.get('/scanner',(req,res,next)=>{
    let x = { title: 'Scan Barcode',title_body:'Input scan QR code','x':m.menus}
    res.render('pages/scanner',x);
})

/* 
 *   Routing halaman upload excel
*/
router.get('/upload',(req,res,next)=>{
    let x = { title: 'Upload Barcode',title_body:'Upload Excel','x':m.menus}
    res.render('pages/upload',x);
})
// upload file excel
router.post('/upload',(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    let fileData = req.files.file;
    const ext = fileData.name.split(".").reverse()
        if(ext[0] !== 'xlsx')
        {
            return res.status(500).send('file harus format excel');
        }
    
    fileData.mv('./myfile/kacrut.xlsx',(err)=>{
        if(err)
            return  res.status(500).send(err);
        
        uploadController.upload('./myfile/kacrut.xlsx',(a)=>{
            if(a.status === null)
            {
                res.status(500).send('Data Excel tidak sesuai, harap di perbaiki sesuai contoh')
            }else{
                res.send(a.status)
            }
        });
    })
})

/*
* Routing halaman List barcode 
*/
router.get('/list',(req,res,next)=>{
    uploadController.grid((a)=>{
        res.render('pages/grid',{ title: 'Grid Data Barcode',title_body:'Tabel QR','x':m.menus,'data':a});
    })
})

module.exports = router;