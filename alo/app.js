// Шаблон «Калькулятор услуг» (клининг, натяжные потолки, окна…)
// Цена = max(минимальный заказ, площадь × цена за единицу × коэффициенты) + доп. услуги
// Все данные — в config.js, раздел calc.
Object.assign(DEFAULT_TEXTS.az, {
  cService: "Xidməti seçin", cArea: "Sahə", cExtras: "Əlavə xidmətlər", cDetails: "Məlumatlarınız",
  cAddress: "Ünvan (rayon, küçə)", cPerUnit: "/", cMin: "minimum",
  cNote: "Qiymət təxminidir. Dəqiq qiyməti menecer WhatsApp-da təsdiq edəcək.",
  cTitle: "Qiyməti 30 saniyəyə hesablayın", cLead: "Xidməti və sahəni seçin — qiymət dərhal görünəcək, sifariş isə WhatsApp-a gedəcək.",
  cMsgHello: "Salam! Sifariş vermək istəyirəm:", cService1: "Xidmət", cExtrasMsg: "Əlavə", cAddr: "Ünvan",
  need: "Doldurun:",
});
Object.assign(DEFAULT_TEXTS.ru, {
  cService: "Выберите услугу", cArea: "Площадь", cExtras: "Дополнительно", cDetails: "Ваши данные",
  cAddress: "Адрес (район, улица)", cPerUnit: "/", cMin: "минимум",
  cNote: "Цена примерная. Точную цену менеджер подтвердит в WhatsApp.",
  cTitle: "Рассчитайте цену за 30 секунд", cLead: "Выберите услугу и площадь — цена появится сразу, а заявка уйдёт в WhatsApp.",
  cMsgHello: "Здравствуйте! Хочу оформить заказ:", cService1: "Услуга", cExtrasMsg: "Дополнительно", cAddr: "Адрес",
  need: "Заполните:",
});
if (DEFAULT_TEXTS.en) Object.assign(DEFAULT_TEXTS.en, {
  cService: "Choose a service", cArea: "Area", cExtras: "Extras", cDetails: "Your details",
  cAddress: "Address (district, street)", cPerUnit: "/", cMin: "minimum",
  cNote: "The price is approximate. The manager will confirm it on WhatsApp.",
  cTitle: "Get your price in 30 seconds", cLead: "Pick a service and the area — the price appears instantly and the request goes to WhatsApp.",
  cMsgHello: "Hello! I'd like to place an order:", cService1: "Service", cExtrasMsg: "Extras", cAddr: "Address",
  need: "Please fill in:",
});

const K = Object.assign({ unit: { az: "m²", ru: "м²", en: "m²" }, areaMin: 10, areaMax: 300, areaDefault: 60,
  services: [], modifiers: [], extras: [] }, C.calc || {});
const S = { service: 0, area: K.areaDefault, mods: K.modifiers.map(() => 0), extras: K.extras.map(() => 0) };

function round(n) { return Math.round(n); }
function calcTotal() {
  const sv = K.services[S.service]; if (!sv) return { total: 0, base: 0, ext: 0 };
  let k = 1; K.modifiers.forEach((m, i) => { k *= (m.options[S.mods[i]] || {}).k || 1; });
  const base = Math.max(sv.min || 0, S.area * sv.price * k);
  const ext = K.extras.reduce((s, e, i) => s + (S.extras[i] || 0) * e.price, 0);
  return { total: round(base + ext), base: round(base), ext: round(ext), minHit: (sv.min || 0) > S.area * sv.price * k };
}

function render() {
  $("c-title").textContent = tr(K.title) || t("cTitle");
  $("c-lead").textContent = tr(K.lead) || t("cLead");
  $("c-area-title").textContent = tr(K.areaLabel) || t("cArea");
  $("c-unit").textContent = tr(K.unit);
  const r = $("c-range"); r.min = K.areaMin; r.max = K.areaMax;

  $("c-services").innerHTML = K.services.map((s, i) => `
    <button type="button" class="c-svc" data-svc="${i}" aria-pressed="${i === S.service}">
      <b>${esc(tr(s.name))}</b>
      ${s.note ? `<span>${esc(tr(s.note))}</span>` : ""}
      <em>${s.price} ${esc(C.company.currency)} ${t("cPerUnit")} ${esc(tr(K.unit))}</em>
    </button>`).join("");

  $("c-mods").innerHTML = K.modifiers.map((m, i) => `
    <section class="c-block">
      <h2><span class="c-n">${3 + i}</span><span>${esc(tr(m.name))}</span></h2>
      <div class="c-chips">${m.options.map((o, j) => `
        <button type="button" class="c-chip" data-mod="${i}" data-opt="${j}" aria-pressed="${S.mods[i] === j}">${esc(tr(o.name))}${o.k && o.k !== 1 ? `<small>${o.k > 1 ? "+" : "−"}${Math.round(Math.abs(o.k - 1) * 100)}%</small>` : ""}</button>`).join("")}
      </div>
    </section>`).join("");

  const n0 = 3 + K.modifiers.length;
  $("c-extras-block").hidden = !K.extras.length;
  $("c-extras-n").textContent = n0;
  $("c-details-n").textContent = K.extras.length ? n0 + 1 : n0;
  $("c-extras").innerHTML = K.extras.map((e, i) => `
    <div class="c-extra ${S.extras[i] ? "on" : ""}" data-ex="${i}">
      <button type="button" class="c-ex-name" data-ex-toggle="${i}">
        <span class="c-check" aria-hidden="true"></span>
        <span><b>${esc(tr(e.name))}</b><small>${e.price} ${esc(C.company.currency)}${e.qty ? " / " + esc(tr(e.per) || "1") : ""}</small></span>
      </button>
      ${e.qty ? `<div class="c-qty"><button type="button" data-ex-step="${i}" data-d="-1">−</button><span>${S.extras[i]}</span><button type="button" data-ex-step="${i}" data-d="1">+</button></div>` : ""}
    </div>`).join("");

  const d = $("c-date"); d.min = minDate(); if (!d.value) d.value = "";
  update();
}

function update() {
  $("c-area").value = S.area; $("c-range").value = S.area;
  const p = calcTotal();
  $("c-total").textContent = money(p.total);
  $("c-breakdown").textContent = p.minHit ? `${t("cMin")} ${money(p.base)}` : (p.ext ? `${money(p.base)} + ${money(p.ext)}` : "");
}

function setArea(v) { S.area = Math.max(1, Math.min(9999, Math.round(+v || 0))); update(); }

document.addEventListener("click", (e) => {
  const sv = e.target.closest("[data-svc]");
  if (sv) { S.service = +sv.dataset.svc; document.querySelectorAll("[data-svc]").forEach((b) => b.setAttribute("aria-pressed", b === sv)); update(); return; }
  const md = e.target.closest("[data-mod]");
  if (md) { const i = +md.dataset.mod; S.mods[i] = +md.dataset.opt; document.querySelectorAll(`[data-mod="${i}"]`).forEach((b) => b.setAttribute("aria-pressed", b === md)); update(); return; }
  const st = e.target.closest("[data-area]");
  if (st) { setArea(S.area + +st.dataset.area); return; }
  const tg = e.target.closest("[data-ex-toggle]");
  if (tg) { const i = +tg.dataset.exToggle; S.extras[i] = S.extras[i] ? 0 : 1; render(); return; }
  const sp = e.target.closest("[data-ex-step]");
  if (sp) { const i = +sp.dataset.exStep; S.extras[i] = Math.max(0, S.extras[i] + +sp.dataset.d); render(); return; }
  if (e.target.closest("#c-send")) send();
});
$("c-area").addEventListener("input", (e) => setArea(e.target.value));
$("c-range").addEventListener("input", (e) => setArea(e.target.value));

function send() {
  const need = [];
  if (!$("c-date").value) need.push(t("date"));
  if (!$("c-address").value.trim()) need.push(t("cAddress"));
  if (!$("c-name").value.trim()) need.push(t("name"));
  if (need.length) { $("c-error").textContent = t("need") + " " + need.join(", "); setTimeout(() => { $("c-error").textContent = ""; }, 4000); return; }
  const sv = K.services[S.service], p = calcTotal();
  const rows = [
    [t("cService1"), tr(sv.name)],
    [tr(K.areaLabel) || t("cArea"), `${S.area} ${tr(K.unit)}`],
  ];
  K.modifiers.forEach((m, i) => rows.push([tr(m.name), tr(m.options[S.mods[i]].name)]));
  const ex = K.extras.map((e, i) => S.extras[i] ? tr(e.name) + (e.qty ? ` × ${S.extras[i]}` : "") : "").filter(Boolean);
  if (ex.length) rows.push([t("cExtrasMsg"), ex.join(", ")]);
  rows.push([t("date"), niceDate($("c-date").value)], [t("cAddr"), $("c-address").value.trim()], [t("name"), $("c-name").value.trim()]);
  const text = [t("cMsgHello"), ""].concat(rows.map(([k, v]) => `${k}: ${v}`)).concat(["", `${t("msgTotal")}: ${money(p.total)}`]).join("\n");
  window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(text)}`, "_blank");
}

Core.start(render);
