// =====================================================================
//  КОНСТРУКТОР  (builder.js)
//  Форма слева -> объект project -> предпросмотр справа -> ZIP с сайтом.
//  Шаблон сайта лежит в templates.js (копия папки templates/cake).
// =====================================================================

const TPL = window.TEMPLATES.cake;
const STORE_KEY = "builder.project.v1";

// Тексты по умолчанию берём прямо из app.js шаблона, чтобы не дублировать
const DEFAULT_TEXTS = (() => {
  const src = TPL["app.js"];
  const start = src.indexOf("const DEFAULT_TEXTS = ") + "const DEFAULT_TEXTS = ".length;
  const end = src.indexOf("\n};", start) + 2;
  return new Function("return " + src.slice(start, end))();
})();

// Подписи к ключам текстов — по-русски, чтобы было понятно, что где
const TEXT_LABELS = {
  step1: "Шаг 1: заголовок", step2: "Шаг «Вес»", step3: "Шаг «Дизайн»", step4: "Шаг «Детали»", step5: "Шаг «Проверка»",
  inscription: "Поле «Надпись»", inscriptionPh: "Подсказка в надписи", date: "Поле «Дата»", branch: "Выбор филиала",
  name: "Поле «Имя»", total: "Подпись цены", approx: "Слово в печати", send: "Кнопка отправки", note: "Примечание к цене",
  perKg: "Единица веса", guests: "«гостей»", free: "«без доплаты»",
  sCake: "Чек: товар", sSize: "Чек: вес", sDesign: "Чек: дизайн", sText: "Чек: надпись", sDate: "Чек: дата",
  sBranch: "Чек: филиал", sName: "Чек: имя", need: "Ошибка «заполните»",
  msgHello: "Заявка: первая строка", msgTotal: "Заявка: цена", msgNoText: "Заявка: «без надписи»",
};

// Стили страницы: у каждого свой макет и подходящие цвета и шрифты
const STYLES = {
  paper:   { name: "Бумага",   about: "Тёплый фон, засечки, цена в круглой печати",
             theme: { accent: "#F26B21", text: "#3A1F15", background: "#F3ECE4" }, fonts: { heading: "Fraunces", body: "Manrope" } },
  night:   { name: "Вечер",    about: "Тёмная витрина, текст поверх фото, премиум",
             theme: { accent: "#C9A46A", text: "#F1E6D8", background: "#15110F" }, fonts: { heading: "Cormorant Garamond", body: "Manrope" } },
  pop:     { name: "Праздник", about: "Яркие плашки, толстые обводки, для детских тортов",
             theme: { accent: "#FF5C8A", text: "#1D1A3A", background: "#FFF1DC" }, fonts: { heading: "Unbounded", body: "Rubik" } },
  minimal: { name: "Каталог",  about: "Белый фон, товары сеткой, без украшений",
             theme: { accent: "#161616", text: "#161616", background: "#FFFFFF" }, fonts: { heading: "Inter", body: "Inter" } },
};

const LANG_NAMES = { az: "Азербайджанский", ru: "Русский", en: "Английский" };
const HEADING_FONTS = ["Fraunces", "Playfair Display", "Lora", "Cormorant Garamond", "Montserrat", "Unbounded", "Rubik", "Inter"];
const BODY_FONTS = ["Manrope", "Inter", "Montserrat", "Nunito", "Rubik", "Roboto", "Open Sans"];


// ---------- 1. Пустой проект ----------
function blankProject() {
  return {
    meta: { template: "cake", version: 2, title: "Новый проект", slug: "company" },
    style: "paper",
    company: { name: "Компания", instagram: "", whatsapp: "", currency: "₼" },
    logo: "",
    theme: { accent: "#F26B21", text: "#3A1F15", background: "#F3ECE4" },
    fonts: { heading: "Fraunces", body: "Manrope" },
    defaultLang: "az",
    languages: ["az", "ru"],
    features: { size: true, design: true, inscription: true, branches: true },
    cakes: [{ id: "item1", name: "Tort", about: { az: "", ru: "" }, pricePerKg: 30, image: "" }],
    sizes: [{ kg: 1, guests: "4–6" }, { kg: 1.5, guests: "6–10" }, { kg: 2, guests: "10–14" }],
    designs: [
      { id: "classic", extraPrice: 0, name: { az: "Klassik görünüş", ru: "Классический вид" } },
      { id: "custom", extraPrice: 20, name: { az: "Fərdi dizayn", ru: "Индивидуальный дизайн" } },
    ],
    branches: [{ id: "main", name: "Filial", hours: "09:00 – 21:00" }],
    order: { minDaysAhead: 2, inscriptionMaxLength: 30 },
    texts: { az: {}, ru: {}, en: {} },
  };
}

let P = loadSaved() || blankProject();


// ---------- 2. Мелкие помощники ----------
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const uid = (p) => p + Math.random().toString(36).slice(2, 7);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD")
  .replace(/ə/g, "e").replace(/ı/g, "i").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-") || "company";

function getPath(obj, path) { return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj); }
function setPath(obj, path, value) {
  const keys = path.split("."); const last = keys.pop();
  const target = keys.reduce((o, k) => (o[k] ??= {}), obj);
  target[last] = value;
}

function toast(msg, isError) {
  const el = $("#toast");
  el.textContent = msg; el.classList.toggle("error", !!isError); el.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 3200);
}

// Картинку уменьшаем до разумного размера, чтобы сайт грузился быстро
function readImage(file, maxW, type = "image/jpeg", quality = 0.85) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
        const ctx = c.getContext("2d");
        if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); }
        ctx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL(type, quality));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
function pickFile(accept) {
  return new Promise((resolve) => {
    const inp = document.createElement("input");
    inp.type = "file"; inp.accept = accept;
    inp.onchange = () => resolve(inp.files[0] || null);
    inp.click();
  });
}


// ---------- 3. Сохранение в браузере ----------
function loadSaved() {
  try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
}
let saveTimer;
function changed(rerenderLists) {
  if (rerenderLists) renderLists();
  $("#slug-preview").textContent = P.meta.slug || "company";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); setStatus("Сохранено в браузере"); }
    catch { setStatus("Проект большой для браузера — сохрани его кнопкой «Сохранить проект»"); }
  }, 600);
  schedulePreview();
}
function setStatus(s) { $("#status").textContent = s; }


// ---------- 4. Простые поля (data-path) ----------
function bindFields() {
  $$("[data-path]", $("#panel")).forEach((el) => {
    const path = el.dataset.path;
    const handler = () => {
      let v = el.type === "checkbox" ? el.checked : el.value;
      if (el.type === "number") v = v === "" ? 0 : Number(v);
      if (path === "company.whatsapp") v = v.replace(/\D/g, "");
      if (path === "meta.slug") v = slugify(v);
      setPath(P, path, v);
      changed(path === "company.currency" || path.startsWith("features."));
    };
    el.addEventListener("input", handler);
    el.addEventListener("change", handler);
  });
}
function fillFields() {
  $$("[data-path]", $("#panel")).forEach((el) => {
    const v = getPath(P, el.dataset.path);
    if (el.type === "checkbox") el.checked = !!v;
    else el.value = v ?? "";
  });
  $("#project-title").value = P.meta.title || "";
  $("#logo-preview").src = P.logo || "";
  $("#slug-preview").textContent = P.meta.slug || "company";
}

function fillSelects() {
  const opt = (list, cur) => [...new Set([cur, ...list])].filter(Boolean)
    .map((f) => `<option value="${esc(f)}">${esc(f)}</option>`).join("");
  $("#font-heading").innerHTML = opt(HEADING_FONTS, P.fonts.heading);
  $("#font-body").innerHTML = opt(BODY_FONTS, P.fonts.body);

  $("#lang-checks").innerHTML = Object.entries(LANG_NAMES).map(([code, name]) =>
    `<label class="check"><input type="checkbox" data-lang="${code}" ${P.languages.includes(code) ? "checked" : ""}> ${name}</label>`).join("");
  $$("#lang-checks input").forEach((cb) => cb.addEventListener("change", () => {
    const on = $$("#lang-checks input").filter((x) => x.checked).map((x) => x.dataset.lang);
    if (!on.length) { cb.checked = true; return toast("Нужен хотя бы один язык", true); }
    P.languages = on;
    if (!on.includes(P.defaultLang)) P.defaultLang = on[0];
    fillDefaultLang(); renderLists(); renderTexts(); changed();
  }));
  fillDefaultLang();
}
function fillDefaultLang() {
  $("#default-lang").innerHTML = P.languages.map((l) => `<option value="${l}">${LANG_NAMES[l]}</option>`).join("");
  $("#default-lang").value = P.defaultLang;
}


// ---------- 4б. Выбор стиля ----------
function renderStyles() {
  $("#style-list").innerHTML = Object.entries(STYLES).map(([id, st]) => `
    <button class="style-card" data-style="${id}" aria-pressed="${(P.style || "paper") === id}">
      <span class="sw" style="background:${st.theme.background};color:${st.theme.text}">
        <span class="aa" style="font-family:'${st.fonts.heading}',Georgia,serif">Aa</span>
        <span class="dot" style="background:${st.theme.accent}"></span>
      </span>
      <span class="meta"><b>${st.name}</b><span>${st.about}</span></span>
    </button>`).join("");
}
function bindStyles() {
  $("#style-list").addEventListener("click", (e) => {
    const card = e.target.closest("[data-style]"); if (!card) return;
    const st = STYLES[card.dataset.style];
    P.style = card.dataset.style;
    P.theme = Object.assign({}, st.theme);
    P.fonts = Object.assign({}, st.fonts);
    renderStyles(); fillSelects(); fillFields(); changed();
  });
}


// ---------- 5. Списки: товары, веса, дизайн, филиалы ----------
// Поле на нескольких языках: по одному input на каждый включённый язык
function langInputs(obj, key, placeholder) {
  return P.languages.map((l) =>
    `<input data-ml="${key}" data-lang="${l}" value="${esc((obj[key] || {})[l] || "")}" placeholder="${esc(placeholder)} (${l.toUpperCase()})">`).join("");
}

function itemHead(listName, i, title) {
  return `<div class="item-head">
    <span class="title">${esc(title)}</span>
    <button data-move="-1" title="Выше" aria-label="Выше">↑</button>
    <button data-move="1" title="Ниже" aria-label="Ниже">↓</button>
    <button class="del" data-del title="Удалить" aria-label="Удалить">✕</button>
  </div>`;
}

const LISTS = {
  cakes: {
    make: () => ({ id: uid("item"), name: "Yeni tort", about: {}, pricePerKg: 30, image: "" }),
    title: (x) => x.name || "Без названия",
    body: (x) => `<div class="cake-item">
        <div class="thumb-wrap">
          <img class="thumb" src="${x.image || ""}" alt="">
          <button class="ghost" data-photo>Фото</button>
        </div>
        <div>
          <label>Название <input data-f="name" value="${esc(x.name)}"></label>
          <label>Цена (${esc(P.company.currency)}) ${P.features.size ? "за 1 кг" : "за штуку"} <input type="number" min="0" step="0.5" data-f="pricePerKg" value="${x.pricePerKg}"></label>
          <label>Состав / описание ${langInputs(x, "about", "Состав")}</label>
        </div>
      </div>`,
  },
  sizes: {
    make: () => ({ kg: 1, guests: "" }),
    title: (x) => `${x.kg} кг`,
    body: (x) => `<div class="grid2">
        <label>Вес, кг <input type="number" min="0.1" step="0.5" data-f="kg" value="${x.kg}"></label>
        <label>На сколько гостей <input data-f="guests" value="${esc(x.guests)}" placeholder="6–10"></label>
      </div>`,
  },
  designs: {
    make: () => ({ id: uid("d"), extraPrice: 0, name: {} }),
    title: (x) => (x.name && (x.name[P.languages[0]] || Object.values(x.name)[0])) || "Вариант",
    body: (x) => `<label>Доплата (${esc(P.company.currency)}) <input type="number" min="0" data-f="extraPrice" value="${x.extraPrice}"></label>
      <label>Название ${langInputs(x, "name", "Название")}</label>`,
  },
  branches: {
    make: () => ({ id: uid("b"), name: "", hours: "09:00 – 21:00" }),
    title: (x) => x.name || "Филиал",
    body: (x) => `<div class="grid2">
        <label>Адрес / название <input data-f="name" value="${esc(x.name)}"></label>
        <label>Часы работы <input data-f="hours" value="${esc(x.hours)}"></label>
      </div>`,
  },
};

function renderLists() {
  Object.keys(LISTS).forEach((name) => {
    const box = $("#list-" + name);
    const def = LISTS[name];
    box.innerHTML = P[name].map((x, i) =>
      `<div class="item" data-list="${name}" data-i="${i}">${itemHead(name, i, def.title(x))}${def.body(x)}</div>`).join("");
    $("#count-" + name).textContent = P[name].length;
  });
}

// Один обработчик на все списки (делегирование)
function bindLists() {
  const panel = $("#panel");

  panel.addEventListener("input", (e) => {
    const item = e.target.closest(".item"); if (!item) return;
    const x = P[item.dataset.list][+item.dataset.i];
    const el = e.target;
    if (el.dataset.f) {
      x[el.dataset.f] = el.type === "number" ? Number(el.value) : el.value;
    } else if (el.dataset.ml) {
      x[el.dataset.ml] = Object.assign({}, x[el.dataset.ml], { [el.dataset.lang]: el.value });
    } else return;
    item.querySelector(".title").textContent = LISTS[item.dataset.list].title(x);
    changed();
  });

  panel.addEventListener("click", async (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) { const n = addBtn.dataset.add; P[n].push(LISTS[n].make()); return changed(true); }

    const item = e.target.closest(".item"); if (!item) return;
    const list = P[item.dataset.list]; const i = +item.dataset.i;

    if (e.target.closest("[data-del]")) {
      if (item.dataset.list === "cakes" && list.length === 1) return toast("Нужен хотя бы один товар", true);
      list.splice(i, 1); return changed(true);
    }
    const mv = e.target.closest("[data-move]");
    if (mv) {
      const j = i + Number(mv.dataset.move);
      if (j < 0 || j >= list.length) return;
      [list[i], list[j]] = [list[j], list[i]]; return changed(true);
    }
    if (e.target.closest("[data-photo]")) {
      const file = await pickFile("image/*"); if (!file) return;
      list[i].image = await readImage(file, 1200);
      return changed(true);
    }
  });
}


// ---------- 6. Тексты ----------
function renderTexts() {
  $("#texts").innerHTML = Object.keys(TEXT_LABELS).map((key) =>
    `<div class="text-row"><div class="key">${TEXT_LABELS[key]}</div><div class="vals">` +
    P.languages.map((l) => `<input data-text="${key}" data-lang="${l}" value="${esc((P.texts[l] || {})[key] || "")}" placeholder="${esc((DEFAULT_TEXTS[l] || {})[key] || "")}">`).join("") +
    `</div></div>`).join("");
}
function bindTexts() {
  $("#texts").addEventListener("input", (e) => {
    const el = e.target; if (!el.dataset.text) return;
    P.texts[el.dataset.lang] ??= {};
    if (el.value.trim()) P.texts[el.dataset.lang][el.dataset.text] = el.value;
    else delete P.texts[el.dataset.lang][el.dataset.text];
    changed();
  });
}


// ---------- 7. Логотип и иконки ----------
function bindLogo() {
  $("#logo-file").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    P.logo = await readImage(f, 512, "image/png");
    $("#logo-preview").src = P.logo; e.target.value = ""; changed();
  });
  $("#logo-remove").addEventListener("click", () => { P.logo = ""; $("#logo-preview").src = ""; changed(); });
}

// Иконка приложения: логотип на фоне акцентного цвета (или первая буква названия)
function makeIcon(size) {
  return new Promise((resolve) => {
    const c = document.createElement("canvas"); c.width = c.height = size;
    const ctx = c.getContext("2d");
    ctx.fillStyle = P.theme.accent; ctx.fillRect(0, 0, size, size);
    const letter = () => {
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `700 ${size * 0.5}px Georgia, serif`;
      ctx.fillText((P.company.name || "?").trim()[0].toUpperCase(), size / 2, size / 2 + size * 0.03);
      resolve(c.toDataURL("image/png"));
    };
    if (!P.logo) return letter();
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, 0, 0, size, size); resolve(c.toDataURL("image/png")); };
    img.onerror = letter;
    img.src = P.logo;
  });
}


// ---------- 8. Из проекта — в config.js ----------
const imgName = (cake, i) => `images/${slugify(cake.id || "item" + i)}.jpg`;

function buildConfig(forExport) {
  const texts = {};
  P.languages.forEach((l) => { if (P.texts[l] && Object.keys(P.texts[l]).length) texts[l] = P.texts[l]; });
  const cfg = {
    style: P.style || "paper",
    company: { name: P.company.name, instagram: P.company.instagram, whatsapp: P.company.whatsapp,
      logo: P.logo ? (forExport ? "images/logo.png" : P.logo) : "", currency: P.company.currency || "₼" },
    theme: P.theme,
    fonts: P.fonts,
    defaultLang: P.defaultLang,
    languages: P.languages,
    features: P.features,
    branches: P.branches,
    cakes: P.cakes.map((c, i) => ({ id: c.id, name: c.name, pricePerKg: Number(c.pricePerKg) || 0,
      image: forExport ? imgName(c, i) : (c.image || ""), about: c.about || {} })),
    sizes: P.sizes.map((s) => ({ kg: Number(s.kg) || 1, guests: s.guests || "" })),
    designs: P.designs,
    order: P.order,
    texts,
  };
  return "// Файл настроек компании. Создан конструктором — проще всего менять его там.\n" +
    "const CONFIG = " + JSON.stringify(cfg, null, 2) + ";\n";
}


// ---------- 9. Предпросмотр ----------
let previewTimer;
function schedulePreview() { clearTimeout(previewTimer); previewTimer = setTimeout(renderPreview, 350); }

function renderPreview() {
  const frame = $("#frame");
  const scrollY = (() => { try { return frame.contentWindow.scrollY; } catch { return 0; } })();
  const lang = (() => { try { return frame.contentDocument.documentElement.lang; } catch { return null; } })();
  const safeScript = (s) => s.replace(/<\/script/gi, "<\\/script");

  const html = TPL["index.html"]
    .replace('<link rel="manifest" href="manifest.json">', "")
    .replace('<link rel="stylesheet" href="style.css">', () => `<style>${TPL["style.css"]}</style>`)
    .replace('<script src="config.js"></script>', () => `<script>${safeScript(buildConfig(false))}</script>`)
    .replace('<script src="app.js"></script>', () =>
      `<script>${safeScript(TPL["app.js"])}<\/script>` +
      `<script>window.open=function(u){parent.postMessage({type:"wa",url:u},"*")};` +
      (lang ? `try{if(document.querySelector('[data-lang="${lang}"]'))document.querySelector('[data-lang="${lang}"]').click()}catch(e){}` : "") +
      `scrollTo(0,${scrollY || 0});<\/script>`);

  frame.srcdoc = html;
  if (!P.cakes.some((c) => c.image)) setStatus("Добавь фото хотя бы одному товару");
}

// Кнопка WhatsApp в предпросмотре не открывает чат, а показывает текст заявки
window.addEventListener("message", (e) => {
  if (e.data && e.data.type === "wa") {
    const text = decodeURIComponent((e.data.url.split("text=")[1] || ""));
    toast("Заявка ушла бы в WhatsApp: " + text.split("\n").slice(0, 3).join(" · ") + " …");
  }
});

function bindPreviewSwitch() {
  $$(".seg [data-view]").forEach((b) => b.addEventListener("click", () => {
    $$(".seg [data-view]").forEach((x) => x.classList.toggle("on", x === b));
    $("#stage").className = "stage " + b.dataset.view;
  }));
  $("#stage").classList.add("mobile");
}


// ---------- 10. Экспорт ZIP ----------
function dataUrlToBytes(d) {
  const b64 = d.split(",")[1]; const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function exportZip() {
  const problems = [];
  if (!P.company.whatsapp || P.company.whatsapp.length < 9) problems.push("номер WhatsApp");
  if (!P.cakes.length || P.cakes.some((c) => !c.image)) problems.push("фото у каждого товара");
  if (problems.length) return toast("Не хватает: " + problems.join(", "), true);
  if (typeof JSZip === "undefined") return toast("Нет интернета: не загрузилась библиотека для ZIP", true);

  const slug = P.meta.slug || slugify(P.company.name);
  const zip = new JSZip();
  const dir = zip.folder(slug);

  dir.file("index.html", TPL["index.html"]);
  dir.file("style.css", TPL["style.css"]);
  dir.file("app.js", TPL["app.js"]);
  dir.file("config.js", buildConfig(true));

  const files = ["./", "index.html", "style.css", "app.js", "config.js", "manifest.json", "images/icon-192.png", "images/icon-512.png"];
  if (P.logo) { dir.file("images/logo.png", dataUrlToBytes(P.logo)); files.push("images/logo.png"); }
  P.cakes.forEach((c, i) => {
    const name = imgName(c, i);
    dir.file(name, dataUrlToBytes(c.image));
    files.push(name);
  });
  dir.file("images/icon-192.png", dataUrlToBytes(await makeIcon(192)));
  dir.file("images/icon-512.png", dataUrlToBytes(await makeIcon(512)));

  dir.file("manifest.json", JSON.stringify({
    name: P.company.name, short_name: P.company.name.slice(0, 12),
    start_url: "./", scope: "./", display: "standalone",
    background_color: P.theme.background, theme_color: P.theme.background,
    icons: [
      { src: "images/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "images/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  }, null, 2));

  const version = slug + "-" + new Date().toISOString().replace(/\D/g, "").slice(0, 12);
  dir.file("sw.js", TPL["sw.js"].replace("__VERSION__", version).replace("__FILES__", JSON.stringify(files)));

  const blob = await zip.generateAsync({ type: "blob" });
  download(blob, slug + ".zip");
  toast("Готово: " + slug + ".zip. Распакуй и загрузи папку «" + slug + "» на GitHub");
}

function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}


// ---------- 11. Проект: новый / открыть / сохранить / импорт ----------
function loadProject(p) {
  const base = blankProject();
  P = Object.assign(base, p);
  ["meta", "company", "theme", "fonts", "features", "order", "texts"].forEach((k) => { P[k] = Object.assign({}, base[k], p[k] || {}); });
  fillSelects(); fillFields(); renderStyles(); renderLists(); renderTexts(); changed();
}

function bindProject() {
  $("#project-title").addEventListener("input", (e) => { P.meta.title = e.target.value; changed(); });
  $("#btn-new").addEventListener("click", () => {
    if (!confirmReplace()) return;
    loadProject(blankProject()); toast("Новый проект");
  });
  $("#btn-save").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(P)], { type: "application/json" });
    download(blob, (P.meta.slug || "project") + ".project.json");
    toast("Проект сохранён файлом. Открыть его можно кнопкой «Открыть проект»");
  });
  $("#open-file").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const p = JSON.parse(await f.text()); if (!p.cakes) throw 0; loadProject(p); toast("Проект открыт"); }
    catch { toast("Это не файл проекта конструктора", true); }
    e.target.value = "";
  });
  $("#btn-export").addEventListener("click", () => exportZip().catch((err) => toast("Ошибка экспорта: " + err.message, true)));
  $("#btn-import").addEventListener("click", () => importSite($("#import-url").value.trim()).catch((err) => toast("Не получилось импортировать: " + err.message, true)));
}

// Предупреждение, чтобы случайно не потерять работу
function confirmReplace() {
  return P.cakes.length <= 1 && !P.logo ? true :
    window.confirm("Текущий проект заменится. Если он нужен — сначала нажми «Сохранить проект». Продолжить?");
}

async function urlToDataUrl(url) {
  const res = await fetch(url); if (!res.ok) throw new Error("нет файла " + url);
  const blob = await res.blob();
  return await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
}

// Импорт сайта, сделанного по этому шаблону: читаем его config.js и фото
async function importSite(url) {
  if (!url) return toast("Вставь адрес сайта", true);
  if (!url.endsWith("/")) url += "/";
  if (!confirmReplace()) return;
  setStatus("Импортирую…");
  const res = await fetch(url + "config.js");
  if (!res.ok) throw new Error("не найден config.js по этому адресу");
  const cfg = new Function(await res.text() + "\n;return CONFIG;")();
  const p = blankProject();
  p.company = Object.assign(p.company, cfg.company); delete p.company.logo;
  p.logo = cfg.company.logo ? await urlToDataUrl(url + cfg.company.logo).catch(() => "") : "";
  ["theme", "fonts", "features", "order"].forEach((k) => { if (cfg[k]) p[k] = Object.assign(p[k], cfg[k]); });
  ["style", "defaultLang", "languages", "branches", "sizes", "designs"].forEach((k) => { if (cfg[k]) p[k] = cfg[k]; });
  p.texts = Object.assign({ az: {}, ru: {}, en: {} }, cfg.texts || {});
  p.cakes = [];
  for (const c of cfg.cakes) {
    p.cakes.push({ id: c.id, name: c.name, pricePerKg: c.pricePerKg, about: c.about || {},
      image: c.image ? await urlToDataUrl(url + c.image).catch(() => "") : "" });
  }
  const slug = url.replace(/\/+$/, "").split("/").pop();
  p.meta.slug = slugify(slug); p.meta.title = cfg.company.name;
  loadProject(p);
  toast("Импортировано: " + cfg.company.name);
}


// ---------- 12. Старт ----------
renderStyles();
bindStyles();
fillSelects();
fillFields();
bindFields();
renderLists();
bindLists();
renderTexts();
bindTexts();
bindLogo();
bindPreviewSwitch();
bindProject();
renderPreview();
setStatus(loadSaved() ? "Открыт последний проект" : "Новый проект");
