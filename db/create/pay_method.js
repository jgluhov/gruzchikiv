/**
 * Created by admin on 11/08/14.
 */
var PayMethods = require('../../models/pay_methods');

var pay_methods = new PayMethods({
    text : "<p class=\"lead\">Способы оплаты</p><p>Ознакомиться с <a href=\"price\">прайс-листом</a>.</p><p>Оплачивайте заказ любым удобным для вас способом, остальное наша забота.</p>",
    items : [
        {
            title : "Оплата наличными",
            url : "#",
            image : {
                public_id : "lev1cwfgnk4hurmwifiz",
                version : 1407771901,
                signature : "6fc08da50ee620c5efa4fa7a5c2a1132f77e047f",
                width : 32,
                height : 32,
                format : "png",
                resource_type : "image",
                created_at : "2014-08-11T15:45:01Z",
                bytes : 1316,
                type : "upload",
                etag : "a72373611721c7978974a5158e899cd4",
                url : "http://res.cloudinary.com/hqdd88nzp/image/upload/v1407771901/lev1cwfgnk4hurmwifiz.png",
                secure_url : "https://res.cloudinary.com/hqdd88nzp/image/upload/v1407771901/lev1cwfgnk4hurmwifiz.png"
            }
        },
        {
            title : "Оплата по расчетному счету",
            url : "#",
            image : {
                public_id : "v3bsjhmgjt1vrw9j84y5",
                version : 1407771901,
                signature : "0f3c88ca6a34c38f69286042b2911c9e47c9c140",
                width : 32,
                height : 32,
                format : "png",
                resource_type : "image",
                created_at : "2014-08-11T15:45:01Z",
                bytes : 2132,
                type : "upload",
                etag : "11f5504c1996b980ca7159a141ef334b",
                url : "http://res.cloudinary.com/hqdd88nzp/image/upload/v1407771901/v3bsjhmgjt1vrw9j84y5.png",
                secure_url : "https://res.cloudinary.com/hqdd88nzp/image/upload/v1407771901/v3bsjhmgjt1vrw9j84y5.png"
            }
        },
        {
            title : "Оплата по карте",
            url : "#",
            image : {
                public_id : "fanpwdw15icfsknkclxw",
                version : 1407771901,
                signature : "e3269e9f7de4ea085723e6d0229b39c7e8fad849",
                width : 32,
                height : 32,
                format : "png",
                resource_type : "image",
                created_at : "2014-08-11T15:45:01Z",
                bytes : 839,
                type : "upload",
                etag : "ed23dd732a0b18092485c2cecf838b50",
                url : "http://res.cloudinary.com/hqdd88nzp/image/upload/v1407771901/fanpwdw15icfsknkclxw.png",
                secure_url : "https://res.cloudinary.com/hqdd88nzp/image/upload/v1407771901/fanpwdw15icfsknkclxw.png"
            }
        }
    ]
});

pay_methods.save(function(err) {
    if(err) throw err;
});