// Файл настроек компании. Создан конструктором — проще всего менять его там.
const CONFIG = {
  "template": "landing",
  "style": "paper",
  "company": {
    "name": "Pəncərə",
    "instagram": "pencere.sirniyyatevi",
    "whatsapp": "994993036368",
    "logo": "images/logo.png",
    "currency": "₼"
  },
  "theme": {
    "accent": "#E07B2E",
    "text": "#2B1D16",
    "background": "#F5EFE8"
  },
  "fonts": {
    "heading": "Fraunces",
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
      "id": "semsi",
      "name": "Şəmsi Rəhimov küç. 36",
      "hours": "08:00 – 21:30"
    }
  ],
  "cakes": [
    {
      "id": "rafaello",
      "name": "Şokolad Rafaello",
      "pricePerKg": 34,
      "image": "images/rafaello.jpg",
      "about": {
        "az": "Şokoladlı krem, kokos topları, ağ şokolad medalyon",
        "ru": "Шоколадный крем, кокосовые шарики, медальон из белого шоколада"
      }
    },
    {
      "id": "cobanyastigi",
      "name": "Çobanyastığı",
      "pricePerKg": 30,
      "image": "images/cobanyastigi.jpg",
      "about": {
        "az": "Mavi krem, çobanyastığı çiçəkləri",
        "ru": "Голубой крем, цветы-ромашки"
      }
    },
    {
      "id": "agsokolad",
      "name": "Ağ şokolad",
      "pricePerKg": 34,
      "image": "images/agsokolad.jpg",
      "about": {
        "az": "Ağ şokolad, şokolad axını, giləmeyvə",
        "ru": "Белый шоколад, шоколадные подтёки, ягоды"
      }
    },
    {
      "id": "qarasokolad",
      "name": "Qara şokolad",
      "pricePerKg": 34,
      "image": "images/qarasokolad.jpg",
      "about": {
        "az": "Tünd şokolad qlazur, şokolad konfetləri",
        "ru": "Глазурь из тёмного шоколада, шоколадные конфеты"
      }
    },
    {
      "id": "adgunu",
      "name": "Ad günü tortu",
      "pricePerKg": 30,
      "image": "images/adgunu.jpg",
      "about": {
        "az": "Kremli tort, \"Happy Birthday\" yazısı",
        "ru": "Кремовый торт с надписью «Happy Birthday»"
      }
    },
    {
      "id": "orxideya",
      "name": "Orxideya",
      "pricePerKg": 38,
      "image": "images/orxideya.jpg",
      "about": {
        "az": "Ağ krem, orxideya çiçəkləri, qızılı bəzək",
        "ru": "Белый крем, орхидеи, золотой декор"
      }
    }
  ],
  "sizes": [
    {
      "kg": 1,
      "guests": "4–6"
    },
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
      "id": "custom",
      "extraPrice": 15,
      "name": {
        "az": "Öz yazınız və ya şəkliniz",
        "ru": "Своя надпись или фото"
      }
    }
  ],
  "order": {
    "minDaysAhead": 1,
    "inscriptionMaxLength": 30
  },
  "texts": {
    "az": {
      "heroTitle": "29 ildir bayramlarınızın dadı",
      "heroText": "Tortu seçin, qiyməti dərhal görün və sifarişi WhatsApp-a göndərin — zəng etməyə ehtiyac yoxdur.",
      "aboutTitle": "29 il Sizinlə",
      "aboutText": "Pəncərə Şirniyyat Evi 29 ildir Bakıda tort, şirniyyat və təzə çörək bişirir. Hər tort sifarişlə hazırlanır.",
      "branchesTitle": "Ünvanımız"
    },
    "ru": {
      "heroTitle": "29 лет вкус ваших праздников",
      "heroText": "Выберите торт, сразу увидите цену и отправьте заказ в WhatsApp — звонить не нужно.",
      "aboutTitle": "29 лет с вами",
      "aboutText": "Pəncərə Şirniyyat Evi уже 29 лет печёт в Баку торты, сладости и свежий хлеб. Каждый торт готовим под заказ.",
      "branchesTitle": "Наш адрес"
    }
  }
};
