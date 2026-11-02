// =====================================================================
//  ЯДРО ШАБЛОНОВ  (core.js) — общее для «Меню», «Сторис», «Лендинга», «Формы»
//  Здесь: тексты, цена, заявка в WhatsApp, окно заказа, языки, цвета, шрифты.
//  Данные компании — в config.js. Этот файл одинаковый для всех компаний.
// =====================================================================

const DEFAULT_TEXTS = {
  az: {
    step1: "Tortu seçin", step2: "Çəkini seçin", step3: "Dizayn", step4: "Detallar", step5: "Sifarişi yoxlayın",
    inscription: "Tortun üzərində yazı", inscriptionPh: "Ad günün mübarək!",
    date: "Tarix", branch: "Hansı filialdan götürəcəksiniz?", name: "Adınız",
    total: "Təxmini qiymət", approx: "təxmini", send: "WhatsApp-a göndər",
    note: "Qiymət təxminidir. Dəqiq qiyməti menecer WhatsApp-da təsdiq edəcək.",
    perKg: "kq", guests: "nəfər", free: "Əlavə ödənişsiz",
    sCake: "Tort", sSize: "Çəki", sDesign: "Dizayn", sText: "Yazı", sDate: "Tarix", sBranch: "Filial", sName: "Ad",
    need: "Sifariş üçün doldurun:",
    msgHello: "Salam! Tort sifariş etmək istəyirəm:", msgTotal: "Təxmini qiymət", msgNoText: "yoxdur",
    orderBtn: "Sifariş et", close: "Bağla", from: "",
    menuTitle: "Tortlarımız", swipeHint: "Yuxarı sürüşdürün",
    heroTitle: "Hər bayram üçün öz tortunuz",
    heroText: "Tortu seçin, qiyməti dərhal görün və sifarişi bir toxunuşla WhatsApp-a göndərin.",
    aboutTitle: "Biz haqqımızda",
    aboutText: "Hər tortu sifarişlə, təbii məhsullardan və sevgi ilə hazırlayırıq.",
    howTitle: "Necə sifariş etmək olar",
    how1: "Tortu və çəkini seçin", how2: "Tarixi və filialı qeyd edin", how3: "Sifarişi WhatsApp-a göndərin — menecer təsdiq edəcək",
    branchesTitle: "Filiallar", mapLink: "Xəritədə aç", contactsTitle: "Əlaqə",
    formTitle: "Tort sifarişi", formText: "Bir neçə sahəni doldurun — sifariş hazır mətnlə WhatsApp-a gedəcək.",
    product: "Tort",
  },
  ru: {
    step1: "Выберите торт", step2: "Выберите вес", step3: "Дизайн", step4: "Детали", step5: "Проверьте заказ",
    inscription: "Надпись на торте", inscriptionPh: "С днём рождения!",
    date: "Дата", branch: "Из какого филиала заберёте?", name: "Ваше имя",
    total: "Примерная цена", approx: "примерно", send: "Отправить в WhatsApp",
    note: "Цена примерная. Точную цену менеджер подтвердит в WhatsApp.",
    perKg: "кг", guests: "гостей", free: "Без доплаты",
    sCake: "Торт", sSize: "Вес", sDesign: "Дизайн", sText: "Надпись", sDate: "Дата", sBranch: "Филиал", sName: "Имя",
    need: "Для заказа заполните:",
    msgHello: "Здравствуйте! Хочу заказать торт:", msgTotal: "Примерная цена", msgNoText: "без надписи",
    orderBtn: "Заказать", close: "Закрыть", from: "",
    menuTitle: "Наши торты", swipeHint: "Листайте вверх",
    heroTitle: "Свой торт к каждому празднику",
    heroText: "Выберите торт, сразу увидите цену и отправьте заказ в WhatsApp одним нажатием.",
    aboutTitle: "О нас",
    aboutText: "Каждый торт готовим под заказ, из натуральных продуктов и с любовью.",
    howTitle: "Как заказать",
    how1: "Выберите торт и вес", how2: "Укажите дату и филиал", how3: "Отправьте заказ в WhatsApp — менеджер подтвердит",
    branchesTitle: "Филиалы", mapLink: "Открыть на карте", contactsTitle: "Контакты",
    formTitle: "Заказ торта", formText: "Заполните несколько полей — заказ уйдёт в WhatsApp готовым текстом.",
    product: "Торт",
  },
  en: {
    step1: "Choose a cake", step2: "Choose the weight", step3: "Design", step4: "Details", step5: "Check your order",
    inscription: "Text on the cake", inscriptionPh: "Happy birthday!",
    date: "Date", branch: "Which branch will you pick up from?", name: "Your name",
    total: "Estimated price", approx: "approx.", send: "Send to WhatsApp",
    note: "The price is an estimate. The manager will confirm the exact price on WhatsApp.",
    perKg: "kg", guests: "guests", free: "No extra charge",
    sCake: "Cake", sSize: "Weight", sDesign: "Design", sText: "Text", sDate: "Date", sBranch: "Branch", sName: "Name",
    need: "To order, fill in:",
    msgHello: "Hello! I would like to order a cake:", msgTotal: "Estimated price", msgNoText: "none",
    orderBtn: "Order", close: "Close", from: "",
    menuTitle: "Our cakes", swipeHint: "Swipe up",
    heroTitle: "A cake for every celebration",
    heroText: "Pick a cake, see the price right away and send your order to WhatsApp in one tap.",
    aboutTitle: "About us",
    aboutText: "Every cake is made to order, from natural ingredients and with love.",
    howTitle: "How to order",
    how1: "Choose the cake and weight", how2: "Pick the date and branch", how3: "Send the order to WhatsApp — the manager will confirm",
    branchesTitle: "Branches", mapLink: "Open in maps", contactsTitle: "Contacts",
    formTitle: "Cake order", formText: "Fill in a few fields — the order goes to WhatsApp as ready text.",
    product: "Cake",
  },
};

// ---------- Настройки с запасными значениями ----------
const C = CONFIG;
const F = Object.assign({ size: true, design: true, inscription: true, branches: true }, C.features || {});
const LANGS = (C.languages && C.languages.length) ? C.languages : ["az"];
const FONTS = Object.assign({ heading: "Fraunces", body: "Manrope" }, C.fonts || {});
const ORDER = Object.assign({ minDaysAhead: 2, inscriptionMaxLength: 30 }, C.order || {});
if (!C.branches || !C.branches.length) F.branches = false;
if (!C.designs || !C.designs.length) F.design = false;
if (!C.sizes || !C.sizes.length) F.size = false;

const Core = {
  lang: LANGS.includes(C.defaultLang) ? C.defaultLang : LANGS[0],
  onLang: [],                 // шаблон подписывается сюда, чтобы перерисоваться при смене языка
};

const $ = (id) => document.getElementById(id);
const money = (n) => n + " " + C.company.currency;
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function t(key) {
  const custom = C.texts && C.texts[Core.lang] && C.texts[Core.lang][key];
  if (custom) return custom;
  return (DEFAULT_TEXTS[Core.lang] || DEFAULT_TEXTS.az)[key] ?? DEFAULT_TEXTS.az[key] ?? "";
}
function tr(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[Core.lang] || v[LANGS[0]] || Object.values(v)[0] || "";
}
function priceLabel(cake) {
  return F.size ? `${money(cake.pricePerKg)} / ${t("perKg")}` : money(cake.pricePerKg);
}
function calcPrice(cake, size, design) {
  const kg = F.size && size ? size.kg : 1;
  const extra = F.design && design ? Number(design.extraPrice || 0) : 0;
  return Math.round(Number(cake.pricePerKg) * kg + extra);
}
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + Number(ORDER.minDaysAhead || 0));
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function niceDate(iso) { if (!iso) return ""; const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; }
function waNumber() { return String(C.company.whatsapp || "").replace(/\D/g, ""); }
function mapUrl(branch) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(branch.name + ", " + (C.company.city || "Bakı"));
}

// ---------- Заявка: проверка и отправка ----------
// order = { cake, size, design, inscription, date, branch, name }
function orderRows(o, forMessage) {
  const r = [[t("sCake"), o.cake.name]];
  if (F.size) r.push([t("sSize"), `${o.size.kg} ${t("perKg")}`]);
  if (F.design) r.push([t("sDesign"), tr(o.design.name)]);
  if (F.inscription) r.push([t("sText"), o.inscription || (forMessage ? t("msgNoText") : "—")]);
  r.push([t("sDate"), niceDate(o.date) || "—"]);
  if (F.branches) r.push([t("sBranch"), o.branch ? o.branch.name : "—"]);
  if (forMessage) r.push([t("sName"), o.name]);
  return r;
}
function orderMissing(o) {
  const list = [];
  if (!o.date || o.date < minDate()) list.push(t("sDate"));
  if (F.branches && !o.branch) list.push(t("sBranch"));
  if (!o.name) list.push(t("sName"));
  return list;
}
function sendOrder(o) {
  const text = [t("msgHello"), ""]
    .concat(orderRows(o, true).map(([k, v]) => `${k}: ${v}`))
    .concat(["", `${t("msgTotal")}: ${money(calcPrice(o.cake, o.size, o.design))}`])
    .join("\n");
  window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(text)}`, "_blank");
}

// ---------- Оформление: цвета, шрифты, шапка, языки ----------
function applyTheme() {
  document.body.classList.add("skin-" + (C.style || "paper"));
  const root = document.documentElement.style;
  root.setProperty("--accent", C.theme.accent);
  root.setProperty("--ink", C.theme.text);
  root.setProperty("--paper", C.theme.background);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = C.theme.background;
  const fam = (n, w) => "family=" + n.trim().replace(/ /g, "+") + ":wght@" + w;
  const link = $("font-link");
  if (link) link.href = "https://fonts.googleapis.com/css2?" + fam(FONTS.heading, "500;700;800") + "&" + fam(FONTS.body, "400;600;700") + "&display=swap";
  root.setProperty("--serif", `"${FONTS.heading}", Georgia, serif`);
  root.setProperty("--sans", `"${FONTS.body}", -apple-system, "Segoe UI", Roboto, Arial, sans-serif`);
  document.title = C.company.name;
  document.querySelectorAll("[data-company-name]").forEach((el) => { el.textContent = C.company.name; });
  document.querySelectorAll("[data-company-logo]").forEach((el) => {
    if (C.company.logo) el.src = C.company.logo; else el.remove();
  });
}

function setupLangSwitch() {
  document.querySelectorAll("[data-lang-switch]").forEach((sw) => {
    sw.innerHTML = LANGS.map((l) => `<button data-lang="${l}">${l.toUpperCase()}</button>`).join("");
    sw.hidden = LANGS.length < 2;
    sw.addEventListener("click", (e) => { const b = e.target.closest("[data-lang]"); if (b) setLang(b.dataset.lang); });
  });
}
function setLang(lang) {
  Core.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  Core.onLang.forEach((fn) => fn());
}

// ---------- Окно заказа (выезжает снизу) ----------
// Используется в «Меню», «Сторис» и «Лендинге»: Sheet.open(cake)
const Sheet = {
  o: null,
  el: null,
  build() {
    const el = document.createElement("div");
    el.className = "sheet-wrap";
    el.hidden = true;
    el.innerHTML = `
      <div class="sheet-backdrop" data-close></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-name">
        <div class="sheet-grip"></div>
        <button class="sheet-close" data-close aria-label=""><span aria-hidden="true">×</span></button>
        <div class="sheet-head">
          <img id="sheet-img" alt="">
          <div><h3 id="sheet-name"></h3><p id="sheet-about"></p></div>
        </div>
        <div class="sheet-body">
          <div class="sf" id="sf-size"><span class="sl" data-i18n="step2"></span><div class="chips" id="sheet-sizes"></div></div>
          <div class="sf" id="sf-design"><span class="sl" data-i18n="step3"></span><div class="chips" id="sheet-designs"></div></div>
          <div class="sf" id="sf-inscription"><label class="sl" for="sheet-inscription" data-i18n="inscription"></label><input id="sheet-inscription" autocomplete="off"></div>
          <div class="sf-row">
            <div class="sf"><label class="sl" for="sheet-date" data-i18n="date"></label><input type="date" id="sheet-date"></div>
            <div class="sf"><label class="sl" for="sheet-cname" data-i18n="name"></label><input id="sheet-cname" autocomplete="given-name"></div>
          </div>
          <div class="sf" id="sf-branch"><span class="sl" data-i18n="branch"></span><div class="chips" id="sheet-branches"></div></div>
          <p class="sheet-note" data-i18n="note"></p>
          <p class="sheet-error" id="sheet-error" role="alert"></p>
        </div>
        <div class="sheet-foot">
          <div><small data-i18n="total"></small><strong id="sheet-total"></strong></div>
          <button class="btn-wa" id="sheet-send"><span data-i18n="send"></span></button>
        </div>
      </div>`;
    document.body.appendChild(el);
    this.el = el;
    $("sf-size").hidden = !F.size;
    $("sf-design").hidden = !F.design;
    $("sf-inscription").hidden = !F.inscription;
    $("sf-branch").hidden = !F.branches;
    $("sheet-inscription").maxLength = ORDER.inscriptionMaxLength;
    $("sheet-date").min = minDate();
    el.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) this.close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !el.hidden) this.close(); });
    ["sheet-inscription", "sheet-date", "sheet-cname"].forEach((id) => $(id).addEventListener("input", () => this.sync()));
    $("sheet-send").addEventListener("click", () => this.submit());
    Core.onLang.push(() => { if (this.o) this.render(); });
  },
  open(cake) {
    if (!this.el) this.build();
    const prev = this.o || {};
    this.o = {
      cake,
      size: prev.size || (F.size ? (C.sizes[1] || C.sizes[0]) : null),
      design: prev.design || (F.design ? C.designs[0] : null),
      branch: prev.branch || null,
    };
    this.el.hidden = false;
    document.body.classList.add("sheet-open");
    requestAnimationFrame(() => this.el.classList.add("show"));
    this.render();
  },
  close() {
    this.el.classList.remove("show");
    document.body.classList.remove("sheet-open");
    setTimeout(() => { this.el.hidden = true; }, 250);
  },
  chips(boxId, list, current, label, pick) {
    const box = $(boxId);
    box.innerHTML = "";
    list.forEach((item) => {
      const b = document.createElement("button");
      b.className = "chip";
      b.setAttribute("aria-pressed", item === current);
      b.innerHTML = label(item);
      b.addEventListener("click", () => { pick(item); this.render(); });
      box.appendChild(b);
    });
  },
  render() {
    const o = this.o;
    document.querySelectorAll(".sheet [data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    this.el.querySelector(".sheet-close").setAttribute("aria-label", t("close"));
    $("sheet-inscription").placeholder = t("inscriptionPh");
    $("sheet-img").src = o.cake.image;
    $("sheet-name").textContent = o.cake.name;
    $("sheet-about").textContent = tr(o.cake.about);
    if (F.size) this.chips("sheet-sizes", C.sizes, o.size,
      (s) => `<b>${s.kg} ${t("perKg")}</b>${s.guests ? `<small>${esc(s.guests)} ${t("guests")}</small>` : ""}`, (s) => { o.size = s; });
    if (F.design) this.chips("sheet-designs", C.designs, o.design,
      (d) => `<b>${esc(tr(d.name))}</b><small>${d.extraPrice > 0 ? "+ " + money(d.extraPrice) : t("free")}</small>`, (d) => { o.design = d; });
    if (F.branches) this.chips("sheet-branches", C.branches, o.branch,
      (b) => `<b>${esc(b.name)}</b><small>${esc(b.hours || "")}</small>`, (b) => { o.branch = b; });
    this.sync();
  },
  read() {
    const o = this.o;
    o.inscription = $("sheet-inscription").value.trim();
    o.date = $("sheet-date").value;
    o.name = $("sheet-cname").value.trim();
    return o;
  },
  sync() {
    const o = this.read();
    $("sheet-total").textContent = money(calcPrice(o.cake, o.size, o.design));
    $("sheet-error").textContent = "";
  },
  submit() {
    const o = this.read();
    const need = orderMissing(o);
    if (need.length) { $("sheet-error").textContent = t("need") + " " + need.join(", "); return; }
    sendOrder(o);
  },
};

// ---------- Режим приложения (PWA) ----------
function registerApp() {
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
}

// Общий старт: шаблон вызывает Core.start(своя_функция_отрисовки)
Core.start = function (render) {
  applyTheme();
  setupLangSwitch();
  Core.onLang.unshift(render);
  setLang(Core.lang);
  registerApp();
};
