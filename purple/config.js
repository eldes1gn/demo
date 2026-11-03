// Файл настроек компании. Создан конструктором — проще всего менять его там.
const CONFIG = {
  "template": "stories",
  "style": "night",
  "company": {
    "name": "Purple Cake Boutique",
    "instagram": "purplecakeboutique",
    "whatsapp": "994507468384",
    "logo": "images/logo.png",
    "currency": "₼"
  },
  "theme": {
    "accent": "#B57BD0",
    "text": "#F3ECF6",
    "background": "#17111B"
  },
  "fonts": {
    "heading": "Cormorant Garamond",
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
  "branches": [
    {
      "id": "hasanoglu",
      "name": "Həsənoğlu küç. a4",
      "hours": ""
    },
    {
      "id": "nerimanov",
      "name": "Nərimanov filialı",
      "hours": ""
    }
  ],
  "cakes": [
    {
      "id": "aylilmelek",
      "name": "Aylı mələk",
      "pricePerKg": 55,
      "image": "images/aylilmelek.jpg",
      "about": {
        "az": "Ay üzərində yatan körpə, buludlar və qızılı ulduzlar",
        "ru": "Малыш на луне, облака и золотые звёзды"
      }
    },
    {
      "id": "qaraaqrab",
      "name": "Qara Əqrəb",
      "pricePerKg": 60,
      "image": "images/qaraaqrab.jpg",
      "about": {
        "az": "Qara əqrəb, qırmızı güllər və qırmızı axın",
        "ru": "Чёрный скорпион, красные розы и красные подтёки"
      }
    },
    {
      "id": "firuzeaqrab",
      "name": "Firuzəyi Əqrəb",
      "pricePerKg": 70,
      "image": "images/firuzeaqrab.jpg",
      "about": {
        "az": "Ay üzərində əqrəb, kristal asmalar və bürc lövhəsi",
        "ru": "Скорпион на луне, хрустальные подвески, знаки зодиака"
      }
    },
    {
      "id": "zumrud",
      "name": "Zümrüd",
      "pricePerKg": 65,
      "image": "images/zumrud.jpg",
      "about": {
        "az": "Zümrüd mərmər, qızılı ornament və heykəl kimi əqrəb",
        "ru": "Изумрудный мрамор, золотой орнамент и скорпион-скульптура"
      }
    },
    {
      "id": "urek30",
      "name": "Qırmızı ürək",
      "pricePerKg": 55,
      "image": "images/urek30.jpg",
      "about": {
        "az": "Ürək formalı dekor, yaşınız və bürcünüz ilə",
        "ru": "Декор-сердце с вашим возрастом и знаком зодиака"
      }
    },
    {
      "id": "zarlar",
      "name": "Zarlar",
      "pricePerKg": 60,
      "image": "images/zarlar.jpg",
      "about": {
        "az": "İki zar və qızılı əqrəb, ad günü yazısı ilə",
        "ru": "Два кубика и золотой скорпион, с надписью на день рождения"
      }
    },
    {
      "id": "kepenek",
      "name": "Kəpənəklər",
      "pricePerKg": 55,
      "image": "images/kepenek.jpg",
      "about": {
        "az": "Mavi mini tortlar, pion gülləri və kəpənəklər",
        "ru": "Голубые мини-торты, пионы и бабочки"
      }
    }
  ],
  "sizes": [
    {
      "kg": 1.5,
      "guests": "6–10"
    },
    {
      "kg": 2,
      "guests": "10–14"
    },
    {
      "kg": 3,
      "guests": "15–20"
    },
    {
      "kg": 4,
      "guests": "20–28"
    }
  ],
  "designs": [
    {
      "id": "classic",
      "extraPrice": 0,
      "name": {
        "az": "Şəkildəki kimi",
        "ru": "Как на фото"
      }
    },
    {
      "id": "zodiac",
      "extraPrice": 20,
      "name": {
        "az": "Öz bürcünüzlə",
        "ru": "С вашим знаком зодиака"
      }
    },
    {
      "id": "custom",
      "extraPrice": 40,
      "name": {
        "az": "Fərdi ideya",
        "ru": "Своя идея"
      }
    }
  ],
  "order": {
    "minDaysAhead": 2,
    "inscriptionMaxLength": 30
  },
  "texts": {}
};
