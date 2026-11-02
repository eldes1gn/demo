// Шаблон «Сайт-лендинг»: страница компании; заказ — во всплывающем окне
function render() {
  const cakes = C.cakes;
  $("hero-bg").style.backgroundImage = `url('${cakes[0].image}')`;
  $("hero-wa").href = `https://wa.me/${waNumber()}`;

  // коллаж из 2–3 фото в блоке «О нас»
  $("collage").innerHTML = cakes.slice(1, 4).concat(cakes).slice(0, 3)
    .map((c) => `<img src="${c.image}" alt="" loading="lazy">`).join("");

  $("grid").innerHTML = cakes.map((c, i) => `
    <button class="l-card" data-i="${i}">
      <img src="${c.image}" alt="" loading="lazy">
      <span class="l-card-text">
        <b>${esc(c.name)}</b>
        <small>${esc(tr(c.about))}</small>
        <span class="l-card-price">${priceLabel(c)}<em>${t("orderBtn")}</em></span>
      </span>
    </button>`).join("");

  $("branches-sec").hidden = !F.branches;
  if (F.branches) $("branches").innerHTML = C.branches.map((b) => `
    <a class="l-branch" href="${mapUrl(b)}" target="_blank" rel="noopener">
      <b>${esc(b.name)}</b><span>${esc(b.hours || "")}</span><em>${t("mapLink")}</em>
    </a>`).join("");

  $("contacts").innerHTML = `
    <a class="btn-wa" href="https://wa.me/${waNumber()}" target="_blank" rel="noopener">WhatsApp</a>
    ${C.company.instagram ? `<a class="btn ghost" href="https://instagram.com/${esc(C.company.instagram)}" target="_blank" rel="noopener">Instagram</a>` : ""}`;
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-i]");
  if (b && b.closest("#grid")) Sheet.open(C.cakes[+b.dataset.i]);
});

Core.start(render);
