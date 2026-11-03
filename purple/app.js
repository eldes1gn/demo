// Шаблон «Сторис»: вертикальная лента на весь экран, кнопка «Заказать» открывает окно заказа
function render() {
  $("feed").innerHTML = C.cakes.map((c, i) => `
    <section class="s-slide" data-slide="${i}">
      <div class="s-bg" style="background-image:url('${c.image}')"></div>
      <img class="s-photo" src="${c.image}" alt="" ${i > 1 ? 'loading="lazy"' : ""}>
      <div class="s-text">
        <span class="s-count">${i + 1} / ${C.cakes.length}</span>
        <h2>${esc(c.name)}</h2>
        <p>${esc(tr(c.about))}</p>
        <div class="s-row">
          <span class="s-price">${priceLabel(c)}</span>
          <button class="btn accent" data-i="${i}">${t("orderBtn")}</button>
        </div>
        ${i === 0 && C.cakes.length > 1 ? `<span class="s-hint">${t("swipeHint")}</span>` : ""}
      </div>
    </section>`).join("");
  $("dots").innerHTML = C.cakes.map((_, i) => `<span data-dot="${i}"></span>`).join("");
  watch();
}

// Подсветка точки текущего слайда
let observer;
function watch() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const i = en.target.dataset.slide;
        document.querySelectorAll("[data-dot]").forEach((d) => d.classList.toggle("on", d.dataset.dot === i));
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".s-slide").forEach((s) => observer.observe(s));
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-i]");
  if (b) Sheet.open(C.cakes[+b.dataset.i]);
});

Core.start(render);
