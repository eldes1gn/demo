// =====================================================================
//  ФАЙЛ НАСТРОЕК КОМПАНИИ  (config.js)
//  Это единственный файл, который меняется под новую компанию.
//  Весь остальной код (index.html, style.css, app.js) берёт данные отсюда.
//  Всё, что помечено "ДОПУЩЕНИЕ", придумано нами и меняется на данные компании.
// =====================================================================

const CONFIG = {

  // ---------- 1. Компания ----------
  company: {
    name: "TORTE",
    instagram: "torte.az",
    whatsapp: "994514444468",      // номер без "+" и пробелов — сюда уходит заявка
    logo: "images/logo.png",       // логотип (положим файл позже)
    currency: "₼",
  },

  // ---------- 2. Внешний вид ----------
  theme: {
    accent: "#F26B21",             // фирменный оранжевый Torte
    text: "#3A1F15",               // тёмно-коричневый, как подписи на их фото
    background: "#F3ECE4",         // бежевый фон, как бумага на их фото тортов
  },

  // ---------- 3. Языки ----------
  defaultLang: "az",               // язык при открытии страницы
  languages: ["az", "ru"],

  // ---------- 4. Филиалы (только самовывоз, доставки нет) ----------
  branches: [
    { id: "parlament", name: "Parlament pr. 52a",       hours: "09:00 – 00:00" },
    { id: "ceyhun",    name: "Ceyhun Hacıbəyli",        hours: "08:00 – 23:00" },
    { id: "agseher",   name: "Ağ şəhər, Yaşıl ada 1",   hours: "08:00 – 23:00" },
    { id: "besti",     name: "Bəsti Bağırova 11",       hours: "08:00 – 23:00" },
  ],

  // ---------- 5. Торты ----------
  // pricePerKg — цена за 1 кг. ДОПУЩЕНИЕ: цены примерные, у Torte их нет в открытом доступе.
  cakes: [
    {
      id: "balli", name: "Ballı", pricePerKg: 30, image: "images/balli.jpg",
      about: { az: "Ballı biskvit, plombirli qatılaşdırılmış südlü krem",
               ru: "Медовый бисквит, крем со сгущёнкой и пломбиром" },
    },
    {
      id: "napaleon", name: "Napaleon döymə", pricePerKg: 30, image: "images/napaleon.jpg",
      about: { az: "Döymə xəmir, bişmiş qatılaşdırılmış südlü krem",
               ru: "Слоёное тесто, крем с варёной сгущёнкой" },
    },
    {
      id: "praqa", name: "Praqa", pricePerKg: 32, image: "images/praqa.jpg",
      about: { az: "Şokoladlı biskvit, qara şokolad, kakao, kərə yağlı krem",
               ru: "Шоколадный бисквит, тёмный шоколад, какао, сливочный крем" },
    },
    {
      id: "lavanda", name: "Lavanda", pricePerKg: 36, image: "images/lavanda.jpg",
      about: { az: "Lavandalı biskvit, kremçiz, qarağat cemi",
               ru: "Лавандовый бисквит, крем-чиз, смородиновый джем" },
    },
    {
      id: "tortasty", name: "Tortasty", pricePerKg: 34, image: "images/tortasty.jpg",
      about: { az: "Şokoladlı blinçik, diplomat krem",
               ru: "Шоколадные блинчики, крем «дипломат»" },
    },
    {
      id: "snickers", name: "Snickers", pricePerKg: 34, image: "images/snickers.jpg",
      about: { az: "Şokoladlı biskvit, qovrulmuş yerfındığı, bişmiş krem, şokoladlı praline",
               ru: "Шоколадный бисквит, жареный арахис, заварной крем, шоколадное пралине" },
    },
    {
      id: "redvelvet", name: "Red velvet", pricePerKg: 36, image: "images/redvelvet.jpg",
      about: { az: "Red velvet biskvit, kremçiz",
               ru: "Бисквит red velvet, крем-чиз" },
    },
    {
      id: "ideal", name: "İdeal", pricePerKg: 32, image: "images/ideal.jpg",
      about: { az: "Vanilli və qozlu biskvit, kərə yağlı krem, bişmiş qatılaşdırılmış süd, qoz",
               ru: "Ванильно-ореховый бисквит, сливочный крем, варёная сгущёнка, грецкий орех" },
    },
    {
      id: "aleksandr", name: "Aleksandr", pricePerKg: 34, image: "images/aleksandr.jpg",
      about: { az: "Şokoladlı biskvit, şokoladlı krem, fındıq, karamel",
               ru: "Шоколадный бисквит, шоколадный крем, фундук, карамель" },
    },
    {
      id: "qussudu", name: "Quş südü ballı", pricePerKg: 34, image: "images/qussudu.jpg",
      about: { az: "Quş südü sufflesi, ballı biskvit dənəcikləri, şokoladlı qlazur",
               ru: "Суфле «Птичье молоко», медовая крошка, шоколадная глазурь" },
    },
  ],

  // ---------- 6. Размеры ----------
  // ДОПУЩЕНИЕ: шаг веса и число гостей — примерные.
  sizes: [
    { kg: 1,   guests: "4–6" },
    { kg: 1.5, guests: "6–10" },
    { kg: 2,   guests: "10–14" },
    { kg: 3,   guests: "15–20" },
    { kg: 4,   guests: "20–28" },
  ],

  // ---------- 7. Дизайн ----------
  // extraPrice — сколько добавляется к цене. ДОПУЩЕНИЕ: суммы примерные.
  designs: [
    { id: "classic", extraPrice: 0,
      name: { az: "Klassik görünüş", ru: "Классический вид" } },
    { id: "custom",  extraPrice: 20,
      name: { az: "Fərdi dizayn (ad günü, toy, məktəb, uşaq)", ru: "Индивидуальный дизайн (день рождения, свадьба, школа, детский)" } },
  ],

  // ---------- 8. Правила заказа ----------
  order: {
    minDaysAhead: 2,               // ДОПУЩЕНИЕ: за сколько дней минимум можно заказать
    inscriptionMaxLength: 30,      // максимум символов в надписи на торте
  },
};
