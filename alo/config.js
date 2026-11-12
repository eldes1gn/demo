// Файл настроек компании. Создан конструктором — проще всего менять его там.
const CONFIG = {
  "template": "calc",
  "style": "minimal",
  "company": {
    "name": "ALO Təmizlik",
    "instagram": "",
    "whatsapp": "994703464628",
    "logo": "",
    "currency": "₼"
  },
  "theme": {
    "accent": "#1E7BD8",
    "text": "#10243A",
    "background": "#F4F8FC"
  },
  "fonts": {
    "heading": "Montserrat",
    "body": "Manrope"
  },
  "defaultLang": "az",
  "languages": [
    "az",
    "ru"
  ],
  "features": {
    "size": true,
    "design": true,
    "inscription": true,
    "branches": true
  },
  "order": {
    "minDaysAhead": 1,
    "inscriptionMaxLength": 30
  },
  "texts": {
    "az": {
      "cTitle": "Təmizliyin qiymətini 30 saniyəyə hesablayın",
      "cLead": "Ev, villa, ofis və restoranlar üçün peşəkar təmizlik. Xidməti və sahəni seçin — qiymət dərhal görünəcək, sifariş WhatsApp-a gedəcək."
    },
    "ru": {
      "cTitle": "Рассчитайте цену уборки за 30 секунд",
      "cLead": "Профессиональная уборка квартир, вилл, офисов и ресторанов. Выберите услугу и площадь — цена появится сразу, заявка уйдёт в WhatsApp."
    }
  },
  "calc": {
    "unit": "m²",
    "areaMin": 20,
    "areaMax": 400,
    "areaDefault": 80,
    "services": [
      {
        "id": "menzil",
        "name": {
          "az": "Mənzil təmizliyi",
          "ru": "Уборка квартиры"
        },
        "note": {
          "az": "Otaqlar, mətbəx, sanitar qovşaq, döşəmələr",
          "ru": "Комнаты, кухня, санузел, полы"
        },
        "price": 2,
        "min": 150
      },
      {
        "id": "temir",
        "name": {
          "az": "Təmirdən sonra",
          "ru": "После ремонта"
        },
        "note": {
          "az": "Tikinti tozu, sement və boya ləkələri",
          "ru": "Строительная пыль, пятна цемента и краски"
        },
        "price": 3,
        "min": 150
      }
    ],
    "modifiers": [
      {
        "id": "obyekt",
        "name": {
          "az": "Obyekt",
          "ru": "Объект"
        },
        "options": [
          {
            "name": {
              "az": "Mənzil",
              "ru": "Квартира"
            },
            "k": 1
          },
          {
            "name": {
              "az": "Villa",
              "ru": "Вилла"
            },
            "k": 1.2
          },
          {
            "name": {
              "az": "Ofis",
              "ru": "Офис"
            },
            "k": 1
          },
          {
            "name": {
              "az": "Restoran",
              "ru": "Ресторан"
            },
            "k": 1.15
          }
        ]
      },
      {
        "id": "cirk",
        "name": {
          "az": "Çirklənmə dərəcəsi",
          "ru": "Степень загрязнения"
        },
        "options": [
          {
            "name": {
              "az": "Normal",
              "ru": "Обычная"
            },
            "k": 1
          },
          {
            "name": {
              "az": "Güclü",
              "ru": "Сильная"
            },
            "k": 1.3
          }
        ]
      }
    ],
    "extras": [
      {
        "id": "suse",
        "name": {
          "az": "Şüşə və pəncərə yuma",
          "ru": "Мойка окон и стёкол"
        },
        "price": 8,
        "qty": true,
        "per": {
          "az": "pəncərə",
          "ru": "окно"
        }
      },
      {
        "id": "divan",
        "name": {
          "az": "Divan kimyəvi təmizlik",
          "ru": "Химчистка дивана"
        },
        "price": 35,
        "qty": true,
        "per": {
          "az": "ədəd",
          "ru": "шт."
        }
      },
      {
        "id": "kreslo",
        "name": {
          "az": "Kreslo kimyəvi təmizlik",
          "ru": "Химчистка кресла"
        },
        "price": 15,
        "qty": true,
        "per": {
          "az": "ədəd",
          "ru": "шт."
        }
      },
      {
        "id": "dezinf",
        "name": {
          "az": "Döşəmə dezinfeksiyası",
          "ru": "Дезинфекция полов"
        },
        "price": 20,
        "qty": false,
        "per": {}
      }
    ]
  }
};
