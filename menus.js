var menus = exports.menus = [];
menus.push({id:0,name:'Home',link:'/pages',icon:'ion-sad bg-gradient-yellow'});
menus.push({id:1,name:'Barcode Scanner', link:'#', icon:'ion-android-archive bg-gradient-blue',
            sub_menu:[
                {id:1, name:' Scanner',link:'/pages/scanner',icon:'ion-android-archive '},
                {id:2, name:' Upload Excel',link:'/pages/upload',icon:'ion-android-archive '},
                {id:3, name:' QR List',link:'/pages/list',icon:'ion-android-archive '}
            ]});