var Car = require('../../models/car').Car;

var car = new Car({
    "name": "«МАЗ»",
    "desc": "( 17 т загрузка верхняя, боковая 13,5м)",
    "text": {
        "inside": "В черте Н. Новгорода",
        "outside": "За чертой Н. Новгорода"
    },
    "header": {
        "inside": [
            "Услуга",
            "Стоимость"
        ],
        "outside": [
            "Услуга",
            "Стоимость"
        ]
    },
    "data": [
        {
            "inside": {
                "name": "Минимальная поездка 3 часа с 7.00 до 22.00",
                "cost": "3600 руб."
            },
            "outside": {
                "name": "1 км поездки (с оплатой туда и обратно)",
                "cost": "28 руб."
            }
        },
        {
            "inside": {
                "name": "Каждый последующий час с 07.00 до 22.00",
                "cost": "1200 руб."
            },
            "outside": {
                "name": "Стоимость простоя под погрузкой и разгрузкой",
                "cost": "первый час БЕСПЛАТНО"
            }
        },
        {
            "inside": {
                "name": "Максимальный пробег за час",
                "cost": "20 км"
            },
            "outside": {
                "name": "каждый последующий час",
                "cost": "600 руб."
            }
        },
        {
            "inside": {
                "name": "за каждый км сверх установленного лимита",
                "cost": "28 руб./км"
            },
            "outside": {
                "name": "При простое водителя свыше 12-ти часов, на расстоянии, превышающим 500 км",
                "cost": "1200 руб."
            }
        },
        {
            "inside": {
                "name": "Тарификация",
                "cost": "30 мин."
            },
            "outside": {
                "name": "Тарификация",
                "cost": "30 мин."
            }
        },
        {
            "inside": {
                "name": "Минимальная поездка 3 часа с 22.00 до 07.00",
                "cost": "5400 руб."
            },
            "outside": {
                "name": "",
                "cost": ""
            }
        },
        {
            "inside": {
                "name": "Каждый последующий час с 22.00 до 07.00",
                "cost": "1800 руб."
            },
            "outside": {
                "name": "",
                "cost": ""
            }
        }
    ]
});

car.save(function(err) {
    if(err) throw err;
});

