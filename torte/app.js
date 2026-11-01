// =====================================================================
//  ЛОГИКА СТРАНИЦЫ  (app.js)
//  Берёт данные из config.js, рисует шаги, считает цену
//  и собирает готовую заявку для WhatsApp.
//  Под новую компанию этот файл НЕ меняется.
// =====================================================================


// ---------- 1. Тексты на двух языках ----------
// Ключи совпадают с data-i18n в index.html
const TEXTS = {
  az: {
    step1: "Tortu seçin",
    step2: "Çəkini seçin",
    step3: "Dizayn",
    step4: "Detallar",
    step5: "Sifarişi yoxlayın",
    inscription: "Tortun üzərində yazı",
    inscriptionPh: "Ad günün mübarək!",
    date: "Tarix",
    branch: "Hansı filialdan götürəcəksiniz?",
    name: "Adınız",
    total: "Təxmini qiymət",
    approx: "təxmini",
    send: "WhatsApp-a göndər",
    note: "Qiymət təxminidir. Dəqiq qiyməti menecer WhatsApp-da təsdiq edəcək.",
    perKg: "kq",
    guests: "nəfər",
    free: "Əlavə ödənişsiz",
    sCake: "Tort", sSize: "Çəki", sDesign: "Dizayn", sText: "Yazı",
    sDate: "Tarix", sBranch: "Filial", sName: "Ad",
    need: "Sifariş üçün doldurun:",
    msgHello: "Salam! Tort sifariş etmək istəyirəm:",
    msgTotal: "Təxmini qiymət",
    msgNoText: "yoxdur",
  },
  ru: {
    step1: "Выберите торт",
    step2: "Выберите вес",
    step3: "Дизайн",
    step4: "Детали",
    step5: "Проверьте заказ",
    inscription: "Надпись на торте",
    inscriptionPh: "С днём рождения!",
    date: "Дата",
    branch: "Из какого филиала заберёте?",
    name: "Ваше имя",
    total: "Примерная цена",
    approx: "примерно",
    send: "Отправить в WhatsApp",
    note: "Цена примерная. Точную цену менеджер подтвердит в WhatsApp.",
    perKg: "кг",
    guests: "гостей",
    free: "Без доплаты",
    sCake: "Торт", sSize: "Вес", sDesign: "Дизайн", sText: "Надпись",
    sDate: "Дата", sBranch: "Филиал", sName: "Имя",
    need: "Для заказа заполните:",
    msgHello: "Здравствуйте! Хочу заказать торт:",
    msgTotal: "Примерная цена",
    msgNoText: "без надписи",
  },
};


// ---------- 2. Что выбрал клиент ----------
// Торт и вес выбраны сразу, чтобы клиент с первой секунды видел цену
const state = {
  lang: CONFIG.defaultLang,
  cake: CONFIG.cakes[0],
  size: CONFIG.sizes[1] || CONFIG.sizes[0],
  design: CONFIG.designs[0],
  branch: null,
  lastPrice: null,
};

const $ = (id) => document.getElementById(id);
const t = (key) => TEXTS[state.lang][key];
const money = (n) => n + " " + CONFIG.company.currency;


// ---------- 3. Запуск ----------
function init() {
  // Цвета компании из config.js -> переменные в style.css
  const root = document.documentElement.style;
  root.setProperty("--accent", CONFIG.theme.accent);
  root.setProperty("--ink", CONFIG.theme.text);
  root.setProperty("--paper", CONFIG.theme.background);
  document.querySelector('meta[name="theme-color"]').content = CONFIG.theme.background;

  $("company-name").textContent = CONFIG.company.name;
  $("logo").src = CONFIG.company.logo;
  document.title = CONFIG.company.name;

  $("inscription").maxLength = CONFIG.order.inscriptionMaxLength;
  $("date").min = minDate();

  document.querySelectorAll("#lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
  ["inscription", "date", "customer-name"].forEach((id) => $(id).addEventListener("input", update));
  $("send-btn").addEventListener("click", send);

  setLang(state.lang);
  registerApp();
}


// ---------- 4. Язык ----------
function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $("inscription").placeholder = t("inscriptionPh");
  document.querySelectorAll("#lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  renderAll();
}

function renderAll() {
  renderHero(false);
  renderCakes();
  renderSizes();
  renderDesigns();
  renderBranches();
  update();
}


// ---------- 5. Витрина: большое фото выбранного торта ----------
function renderHero(animate) {
  const img = $("hero-img");
  const show = () => {
    img.src = state.cake.image;
    img.alt = state.cake.name;
    $("hero-name").textContent = state.cake.name;
    $("hero-about").textContent = state.cake.about[state.lang];
    img.classList.remove("swap");
  };
  if (!animate) return show();
  img.classList.add("swap");          // плавно гасим старое фото
  setTimeout(show, 180);              // и показываем новое
}


// ---------- 6. Шаг 1: лента тортов ----------
function renderCakes() {
  $("cake-list").innerHTML = "";
  CONFIG.cakes.forEach((cake) => {
    const btn = document.createElement("button");
    btn.className = "cake";
    btn.setAttribute("aria-pressed", state.cake === cake);
    btn.innerHTML = `
      <span class="pic"><img src="${cake.image}" alt="" loading="lazy"></span>
      <span class="name">${cake.name}</span>
      <span class="kg">${money(cake.pricePerKg)} / ${t("perKg")}</span>`;
    btn.addEventListener("click", () => {
      if (state.cake === cake) return;
      state.cake = cake;
      renderHero(true);
      renderCakes();
      update();
    });
    $("cake-list").appendChild(btn);
  });
}


// ---------- 7. Шаг 2: вес (круг тем больше, чем тяжелее торт) ----------
function renderSizes() {
  $("size-list").innerHTML = "";
  CONFIG.sizes.forEach((size) => {
    const d = Math.round(26 + size.kg * 12);   // диаметр круга в пикселях
    const btn = document.createElement("button");
    btn.className = "size";
    btn.setAttribute("aria-pressed", state.size === size);
    btn.innerHTML = `
      <span class="disc" style="width:${d}px;height:${d}px"></span>
      <b>${size.kg} ${t("perKg")}</b>
      <small>${size.guests} ${t("guests")}</small>`;
    btn.addEventListener("click", () => { state.size = size; renderSizes(); update(); });
    $("size-list").appendChild(btn);
  });
}


// ---------- 8. Шаг 3: дизайн ----------
function renderDesigns() {
  $("design-list").innerHTML = "";
  CONFIG.designs.forEach((design) => {
    const extra = design.extraPrice > 0 ? "+ " + money(design.extraPrice) : t("free");
    const btn = document.createElement("button");
    btn.setAttribute("aria-pressed", state.design === design);
    btn.innerHTML = `<b>${design.name[state.lang]}</b><small>${extra}</small>`;
    btn.addEventListener("click", () => { state.design = design; renderDesigns(); update(); });
    $("design-list").appendChild(btn);
  });
}


// ---------- 9. Шаг 4: филиалы карточками ----------
function renderBranches() {
  $("branch-list").innerHTML = "";
  CONFIG.branches.forEach((b) => {
    const btn = document.createElement("button");
    btn.className = "branch";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", state.branch === b);
    btn.innerHTML = `<b>${b.name}</b><small>${b.hours}</small>`;
    btn.addEventListener("click", () => { state.branch = b; renderBranches(); update(); });
    $("branch-list").appendChild(btn);
  });
}


// ---------- 10. Дата: самый ранний день заказа ----------
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + CONFIG.order.minDaysAhead);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// 2026-11-03 -> 03.11.2026 (так привычнее читать)
function niceDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}


// ---------- 11. Цена ----------
function price() {
  return Math.round(state.cake.pricePerKg * state.size.kg + state.design.extraPrice);
}


// ---------- 12. Что ещё не заполнено ----------
function missing() {
  const list = [];
  const date = $("date").value;
  if (!date || date < minDate()) list.push(t("sDate"));
  if (!state.branch) list.push(t("sBranch"));
  if (!$("customer-name").value.trim()) list.push(t("sName"));
  return list;
}


// ---------- 13. Чек и нижняя панель ----------
function update() {
  const rows = [
    [t("sCake"), state.cake.name],
    [t("sSize"), `${state.size.kg} ${t("perKg")}`],
    [t("sDesign"), state.design.name[state.lang]],
    [t("sText"), $("inscription").value.trim() || "—"],
    [t("sDate"), niceDate($("date").value) || "—"],
    [t("sBranch"), state.branch ? state.branch.name : "—"],
  ];
  $("summary").innerHTML = rows
    .map(([k, v]) => `<div><span>${k}</span><span>${escapeHtml(v)}</span></div>`)
    .join("");

  const p = price();
  $("total").textContent = money(p);
  $("total-line").textContent = `${state.cake.name}, ${state.size.kg} ${t("perKg")}`;

  // Печать «штампуется», когда меняется цена
  if (state.lastPrice !== null && state.lastPrice !== p) {
    const seal = $("seal");
    seal.classList.remove("stamp");
    void seal.offsetWidth;            // перезапуск анимации
    seal.classList.add("stamp");
  }
  state.lastPrice = p;
  $("error").textContent = "";
}

// Чтобы текст клиента (надпись, имя) не ломал страницу
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}


// ---------- 14. Отправка в WhatsApp ----------
function send() {
  const need = missing();
  if (need.length) {
    $("error").textContent = t("need") + " " + need.join(", ");
    $("step-details").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const text = [
    t("msgHello"),
    "",
    `${t("sCake")}: ${state.cake.name}`,
    `${t("sSize")}: ${state.size.kg} ${t("perKg")}`,
    `${t("sDesign")}: ${state.design.name[state.lang]}`,
    `${t("sText")}: ${$("inscription").value.trim() || t("msgNoText")}`,
    `${t("sDate")}: ${niceDate($("date").value)}`,
    `${t("sBranch")}: ${state.branch.name}`,
    `${t("sName")}: ${$("customer-name").value.trim()}`,
    "",
    `${t("msgTotal")}: ${money(price())}`,
  ].join("\n");

  const url = `https://wa.me/${CONFIG.company.whatsapp}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}


// ---------- 15. Режим приложения (PWA) ----------
// sw.js сохраняет страницу в телефоне: открывается быстро и без интернета.
// Работает только на сайте (https), при открытии файла с диска — пропускается.
function registerApp() {
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js");
  }
}


init();
