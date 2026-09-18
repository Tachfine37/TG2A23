/* =========================================================
   TG2A — Interactions
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const IMG = window.TG2A_IMG || ((id, w = 1200) => (id.startsWith("assets/") ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`));
  const meta = (p) => [p.place, p.surface].filter(Boolean).map(escapeHtml).join(" · ");
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Header : ombre au scroll + menu mobile ---------- */
  const header = $(".header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $(".burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".nav a").forEach((a) =>
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Année du footer ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Portfolio (rendu + filtres + lightbox) ---------- */
  const portfolio = $("[data-portfolio]");
  if (portfolio && window.TG2A_PROJECTS) {
    const limit = parseInt(portfolio.dataset.limit || "0", 10);
    const projects = limit ? window.TG2A_PROJECTS.slice(0, limit) : window.TG2A_PROJECTS;
    const cats = window.TG2A_CATEGORIES;

    portfolio.innerHTML = projects
      .map(
        (p, i) => `
      <button class="project reveal${p.wide && !limit ? " is-wide" : ""}" data-cat="${p.cat}" data-index="${i}" aria-label="Voir le projet ${escapeHtml(p.title)}">
        <div class="media"><img src="${IMG(p.img, p.wide ? 1400 : 900)}" alt="${escapeHtml(p.title)} — ${escapeHtml(p.place)}" loading="lazy"></div>
        ${p.real ? `<span class="project__badge">Chantier TG2A</span>` : ""}
        <span class="project__zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg></span>
        <span class="project__info">
          <span class="project__cat">${cats[p.cat]}</span>
          <span class="project__title" style="display:block">${escapeHtml(p.title)}</span>
          <span class="project__meta">${meta(p)}</span>
        </span>
      </button>`
      )
      .join("");

    // Filtres
    const filters = $("[data-filters]");
    if (filters) {
      const counts = projects.reduce((acc, p) => ((acc[p.cat] = (acc[p.cat] || 0) + 1), acc), {});
      filters.innerHTML =
        `<button class="filter is-active" data-filter="all">Tous<span class="filter__count">${projects.length}</span></button>` +
        Object.keys(cats)
          .map((k) => `<button class="filter" data-filter="${k}">${cats[k]}<span class="filter__count">${counts[k] || 0}</span></button>`)
          .join("");

      filters.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        $$(".filter", filters).forEach((b) => b.classList.toggle("is-active", b === btn));
        const f = btn.dataset.filter;
        $$(".project", portfolio).forEach((el) => {
          const show = f === "all" || el.dataset.cat === f;
          el.classList.toggle("is-hidden", !show);
          el.classList.toggle("is-wide", show && f === "all" && !!projects[el.dataset.index].wide);
          if (show) el.classList.add("is-visible");
        });
      });
    }

    // Lightbox
    const lb = $(".lightbox");
    if (lb) {
      let current = 0;
      const visible = () => $$(".project:not(.is-hidden)", portfolio).map((el) => +el.dataset.index);
      const show = (idx) => {
        current = idx;
        const p = projects[idx];
        $("img", lb).src = IMG(p.img, 1800);
        $("img", lb).alt = p.title;
        $("[data-lb-cat]", lb).textContent = cats[p.cat];
        $("[data-lb-title]", lb).textContent = p.title;
        $("[data-lb-desc]", lb).textContent = p.desc;
        $("[data-lb-meta]", lb).innerHTML = meta(p);
      };
      const step = (dir) => {
        const list = visible();
        const pos = list.indexOf(current);
        show(list[(pos + dir + list.length) % list.length]);
      };
      const open = (idx) => {
        show(idx);
        lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
        $(".lightbox__close", lb).focus();
      };
      const close = () => {
        lb.classList.remove("is-open");
        document.body.style.overflow = "";
        const el = $(`.project[data-index="${current}"]`, portfolio);
        el && el.focus();
      };
      portfolio.addEventListener("click", (e) => {
        const card = e.target.closest(".project");
        if (card) open(+card.dataset.index);
      });
      $(".lightbox__close", lb).addEventListener("click", close);
      $(".lightbox__prev", lb).addEventListener("click", () => step(-1));
      $(".lightbox__next", lb).addEventListener("click", () => step(1));
      lb.addEventListener("click", (e) => e.target === lb && close());
      document.addEventListener("keydown", (e) => {
        if (!lb.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      });
    }
  }

  /* ---------- Blog : liste ---------- */
  const blog = $("[data-blog]");
  if (blog && window.TG2A_POSTS) {
    const limit = parseInt(blog.dataset.limit || "0", 10);
    const posts = limit ? window.TG2A_POSTS.slice(0, limit) : window.TG2A_POSTS;
    blog.innerHTML = posts
      .map(
        (p, i) => `
      <a class="post-card reveal${!limit && i === 0 ? " post-card--featured" : ""}" href="article.html?a=${p.slug}">
        <div class="media"><img src="${IMG(p.img, !limit && i === 0 ? 1400 : 800)}" alt="" loading="lazy"></div>
        <div>
          <div class="post-card__meta"><span>${p.cat}</span><span>${p.date}</span><span>${p.read} de lecture</span></div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.excerpt)}</p>
          <span class="link-arrow">Lire l'article ${ARROW}</span>
        </div>
      </a>`
      )
      .join("");
  }

  /* ---------- Blog : article ---------- */
  const article = $("[data-article-body]");
  if (article && window.TG2A_POSTS) {
    const slug = new URLSearchParams(location.search).get("a");
    const post = window.TG2A_POSTS.find((p) => p.slug === slug) || window.TG2A_POSTS[0];
    document.title = `${post.title} — TG2A`;
    $("[data-article-title]").textContent = post.title;
    $("[data-article-meta]").textContent = `${post.cat} · ${post.date} · ${post.read} de lecture`;
    $("[data-article-crumb]").textContent = post.cat;
    $("[data-article-cover]").innerHTML = `<img src="${IMG(post.img, 1800)}" alt="">`;
    $("[data-article-hero] img").src = IMG(post.img, 1600);
    $("[data-article-body]").innerHTML = post.body;
    const others = window.TG2A_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
    const rel = $("[data-related]");
    if (rel)
      rel.innerHTML = others
        .map(
          (p) => `
        <a class="post-card reveal" href="article.html?a=${p.slug}">
          <div class="media"><img src="${IMG(p.img, 800)}" alt="" loading="lazy"></div>
          <div class="post-card__meta"><span>${p.cat}</span><span>${p.date}</span></div>
          <h3>${escapeHtml(p.title)}</h3>
          <span class="link-arrow">Lire l'article ${ARROW}</span>
        </a>`
        )
        .join("");
  }

  /* ---------- Sélecteur de teintes SPC ---------- */
  const swatches = $("[data-swatches]");
  if (swatches) {
    const tint = $(".spc-preview__tint");
    const name = $("[data-swatch-name]");
    swatches.addEventListener("click", (e) => {
      const s = e.target.closest(".swatch");
      if (!s) return;
      $$(".swatch", swatches).forEach((b) => {
        b.classList.toggle("is-active", b === s);
        b.setAttribute("aria-pressed", b === s);
      });
      tint.style.background = s.dataset.tint;
      name.textContent = s.dataset.name;
    });
  }

  /* ---------- Comparateur avant / après (film) ---------- */
  $$(".compare").forEach((c) => {
    const input = $("input", c);
    const after = $(".compare__after", c);
    const handle = $(".compare__handle", c);
    const update = () => {
      after.style.clipPath = `inset(0 0 0 ${input.value}%)`;
      handle.style.left = `${input.value}%`;
    };
    input.addEventListener("input", update);
    update();
  });

  /* ---------- Services : sous-navigation active ---------- */
  const subnav = $(".subnav");
  if (subnav && "IntersectionObserver" in window) {
    const links = $$("a", subnav);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$(".service-detail").forEach((s) => io.observe(s));
  }

  /* ---------- Formulaire : pré-remplissage depuis l'URL ---------- */
  const form = $("form[name='contact']");
  if (form) {
    const sujet = new URLSearchParams(location.search).get("sujet");
    if (sujet) {
      const opt = $$("select[name='projet'] option", form).find((o) => o.value === sujet);
      if (opt) opt.selected = true;
    }

    // Envoi de la demande via WhatsApp (message pré-rempli, aucun serveur nécessaire)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const projet = form.projet.options[form.projet.selectedIndex].text;
      const lignes = [
        "Bonjour TG2A, je souhaite un devis.",
        "",
        `Nom : ${d.get("nom")}`,
        d.get("societe") ? `Société : ${d.get("societe")}` : null,
        `Téléphone : ${d.get("telephone")}`,
        `Email : ${d.get("email")}`,
        `Type d'espace : ${d.get("espace")}`,
        `Prestation : ${projet}`,
        d.get("surface") ? `Surface : ${d.get("surface")}` : null,
        "",
        `Projet : ${d.get("message")}`,
      ].filter((l) => l !== null);
      const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lignes.join("\n"))}`;
      window.open(url, "_blank", "noopener");
      setTimeout(() => (location.href = "merci.html"), 400);
    });
  }

  /* ---------- Compteurs animés ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Apparition au scroll ---------- */
  const reveals = () => $$(".reveal:not(.is-visible)");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-visible");
          $$("[data-count]", en.target).forEach(animateCount);
          if (en.target.dataset.count) animateCount(en.target);
          io.unobserve(en.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals().forEach((el) => io.observe(el));
  } else {
    reveals().forEach((el) => el.classList.add("is-visible"));
  }
})();
