var ExcelJS = require('exceljs');
var models  = require('../models');
var workbook = new ExcelJS.Workbook();
module.exports.upload = function (filename,callback) {
    workbook.xlsx.readFile(filename)
            .then(function() {
                let data = [];
                var worksheet = workbook.getWorksheet(1);
                worksheet.eachRow(function(row, rowNumber) {
                    if(rowNumber == 1 && row.values[1] !== 'barcode' && row.values[2] !== 'tanggal')
                    {
                        return callback({status:null})

                    }else{
                        if(rowNumber > 1)
                        {
                            data.push({'code':row.values[1],'date':row.values[2]});
                        }
                    }
                });

                // bug data masih manjing nok?????
                models.Barcode.bulkCreate(data).then((id)=>{
                    callback({status:'sukses memanjingkan data ndo,'})
                }).catch((err)=>{
                    callback({status:err})
                })
            });
}
module.exports.grid = function (callback) {
    models.Barcode.findAll().then(barcodes=>{
        // const d = JSON.stringify(barcodes, null, 4)
        callback(barcodes)
    })
}