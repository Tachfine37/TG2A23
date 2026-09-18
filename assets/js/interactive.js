/* =========================================================
   TG2A — Modules interactifs
   1. Photo à points (accueil)
   2. Simulateur de film anti-chaleur (produits)
   3. Estimation express (contact)
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const fr = (n, d = 1) => n.toFixed(d).replace(".", ",");

  /* ---------- 1. Photo à points ---------- */
  const hs = $("[data-hotspots]");
  if (hs) {
    const points = $$(".hotspot", hs);
    let current = 0;
    const dots = $$("[data-hs-dot]", hs);
    const panel = $(".hotspots__panel", hs);
    const show = (i) => {
      current = (i + points.length) % points.length;
      const p = points[current];
      points.forEach((b) => b.classList.toggle("is-active", b === p));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === current));
      $("[data-hs-num]", hs).textContent = current + 1;
      $("[data-hs-title]", hs).textContent = p.dataset.title;
      $("[data-hs-text]", hs).textContent = p.dataset.text;
      $("[data-hs-link]", hs).href = p.dataset.link;
      $("[data-hs-link-text]", hs).textContent = p.dataset.linkText;
      // Petite animation d'entrée du texte
      panel.classList.remove("is-changing");
      void panel.offsetWidth;
      panel.classList.add("is-changing");
    };
    // L'indice « Touchez les points » disparaît dès la première interaction
    const used = () => hs.classList.add("is-used");
    points.forEach((p, i) => p.addEventListener("click", () => { used(); show(i); }));
    dots.forEach((d, i) => d.addEventListener("click", () => { used(); show(i); }));
    $("[data-hs-prev]", hs).addEventListener("click", () => { used(); show(current - 1); });
    $("[data-hs-next]", hs).addEventListener("click", () => { used(); show(current + 1); });

    // Glisser le doigt à gauche / à droite pour changer de point
    let x0 = null, y0 = null;
    hs.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    hs.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) { used(); show(current + (dx < 0 ? 1 : -1)); }
      x0 = y0 = null;
    }, { passive: true });
  }

  /* ---------- 2. Simulateur de film anti-chaleur ---------- */
  const sim = $("[data-sim]");
  if (sim) {
    const q = (k) => $(`[data-sim-${k}]`, sim);
    const range = $("input[type=range]", sim);
    let peak = 16; // heure d'ensoleillement maximal selon la façade
    let ts = 0.62; // part de la chaleur solaire rejetée par le film
    const glassColor = { 0: "#9cc3de", 0.62: "#8fb3c9", 0.55: "#5d6f7a", 0.78: "#b8c2c8" };

    const segment = (el, cb) =>
      $$("button", el).forEach((b) =>
        b.addEventListener("click", () => {
          $$("button", el).forEach((x) => x.classList.toggle("is-on", x === b));
          cb(parseFloat(b.dataset.v));
          draw();
        })
      );
    segment(q("or"), (v) => (peak = v));
    segment(q("film"), (v) => (ts = v));
    range.addEventListener("input", draw);

    function draw() {
      const h = parseFloat(range.value);
      const I = Math.exp(-Math.pow((h - peak) / 2.6, 2)); // intensité du soleil sur la façade (0 à 1)
      q("hour").textContent = `${Math.floor(h)}h${h % 1 ? "30" : "00"}`;

      const ang = ((h - 7) / 12) * Math.PI;
      const sx = 40 + Math.round((1 - Math.cos(ang)) * 120);
      const sy = Math.max(40, Math.round(150 - Math.sin(ang) * 110) * (0.4 + 0.6 * (1 - I)) + 10);
      q("sun").setAttribute("cx", sx);
      q("sun").setAttribute("cy", sy);
      q("sky").setAttribute("fill", h < 8 || h > 18 ? "#eadbc8" : "#dfe9f2");

      const gain = 10 * I;
      const tIn = 26 + gain * (1 - ts);
      q("temp").textContent = `${fr(tIn)}°C`;
      q("temp2").textContent = `${fr(tIn)} °C`;
      q("temp2").style.color = tIn > 31 ? "#c0392b" : tIn > 28 ? "#b86e00" : "var(--brand)";
      const lvl = Math.min(1, Math.max(0, (tIn - 24) / 12));
      q("merc").setAttribute("y", 106 - lvl * 96);
      q("merc").setAttribute("height", lvl * 96 + 4);
      const hot = tIn > 31 ? "#e24b4a" : tIn > 28 ? "#ef9f27" : "#1d9e75";
      q("merc").setAttribute("fill", hot);
      q("bulb").setAttribute("fill", hot);

      q("filmbar").setAttribute("opacity", ts ? 1 : 0);
      q("glass").setAttribute("fill", glassColor[ts]);
      q("beam").setAttribute("opacity", (0.05 + 0.45 * I * (1 - ts)).toFixed(2));

      let rays = "";
      for (let i = 0; i < 5; i++) {
        const y = 60 + i * 38;
        const op = (0.25 + 0.75 * I).toFixed(2);
        rays += `<line x1="${sx + 30}" y1="${sy + (y - sy) * 0.2}" x2="286" y2="${y}" opacity="${op}"/>`;
        if (ts) rays += `<line x1="286" y1="${y}" x2="${286 - 60 * ts}" y2="${y - 40 * ts}" opacity="${(op * ts).toFixed(2)}" stroke-dasharray="4 5"/>`;
      }
      q("rays").innerHTML = rays;

      q("k1").textContent = `${Math.round(ts * 100)} %`;
      q("k2").textContent = ts ? "99 %" : "≈ 25 %";
      q("k3").textContent = ts ? `−${fr(gain * ts)} °C` : "0 °C";
      const glare = I * (1 - ts * 1.1);
      q("k4").textContent = glare > 0.55 ? "Fort" : glare > 0.25 ? "Moyen" : "Faible";
    }
    draw();
  }

  /* ---------- 3. Estimation express ---------- */
  const est = $("[data-estimator]");
  if (est) {
    const form = $("form", est);
    // Prix indicatifs en MAD HT par m² de surface (fourchette basse / haute)
    const RATES = {
      cle: [2800, 4200, "Aménagement clé en main"],
      cloisons: [400, 600, "Cloisons vitrées"],
      plafonds: [280, 420, "Faux plafonds & éclairage"],
      sols: [280, 450, "Revêtements de sol"],
      peinture: [90, 140, "Peinture & finitions"],
      menuiserie: [250, 450, "Menuiserie sur mesure"],
      elec: [450, 700, "Électricité & climatisation"],
      film: [45, 65, "Film anti-chaleur"],
    };
    // Semaines de travaux par tranche de 100 m²
    const WEEKS = { cloisons: 0.35, plafonds: 0.35, sols: 0.3, peinture: 0.2, menuiserie: 0.4, elec: 0.45, film: 0.08 };
    const TYPE = { bureaux: [1, "Bureaux"], commerce: [1.15, "Commerce / CHR"], residentiel: [0.95, "Villa / Appartement"] };
    const DELAI = { urgent: [1.1, "Dès que possible"], normal: [1, "Dans 1 à 3 mois"], flexible: [1, "Pas pressé"] };
    const FORM_PROJET = { cle: "amenagement", cloisons: "lots", plafonds: "lots", sols: "revetements", peinture: "lots", menuiserie: "menuiserie", elec: "amenagement", film: "film" };

    const round = (n) => (n < 100000 ? Math.round(n / 1000) * 1000 : Math.round(n / 5000) * 5000);
    const money = (n) => n.toLocaleString("fr-FR").replace(/\s/g, " ");
    let state = {};

    // « Clé en main » et prestations séparées s'excluent
    form.addEventListener("change", (e) => {
      if (e.target.name === "e-prest") {
        const boxes = $$("input[name=e-prest]", form);
        if (e.target.value === "cle" && e.target.checked) boxes.forEach((b) => b.value !== "cle" && (b.checked = false));
        if (e.target.value !== "cle" && e.target.checked) boxes.find((b) => b.value === "cle").checked = false;
      }
      compute();
    });
    form.addEventListener("input", compute);

    function compute() {
      const type = form.querySelector("input[name=e-type]:checked").value;
      const delai = form.querySelector("input[name=e-delai]:checked").value;
      const S = parseInt(form.querySelector("input[name=e-surface]").value, 10);
      const prest = $$("input[name=e-prest]:checked", form).map((b) => b.value);
      $("[data-est-surface]", est).textContent = `${money(S)} m²`;
      $("[data-est-surf2]", est).textContent = `${money(S)} m²`;

      if (!prest.length) {
        $("[data-est-price]", est).textContent = "—";
        $("[data-est-duree]", est).textContent = "—";
        $("[data-est-note]", est).textContent = "Choisissez au moins une prestation.";
        state = null;
        return;
      }

      const k = TYPE[type][0] * DELAI[delai][0];
      let lo = 0, hi = 0;
      prest.forEach((p) => { lo += RATES[p][0] * S; hi += RATES[p][1] * S; });
      lo = Math.max(3000, round(lo * k));
      hi = Math.max(lo + 2000, round(hi * k));

      let duree;
      if (prest.length === 1 && prest[0] === "film" && S <= 400) {
        duree = S <= 150 ? "1 jour" : "1 à 2 jours";
      } else if (prest.includes("cle")) {
        duree = `${Math.round(2 + S / 150)} à ${Math.round(3 + S / 90)} semaines`;
      } else {
        const w = prest.reduce((acc, p) => acc + (WEEKS[p] || 0.3) * (S / 100), 0);
        const a = Math.max(1, Math.round(0.7 * w + 0.5));
        const b = Math.max(a + 1, Math.round(1.1 * w + 1));
        duree = `${a} à ${b} semaines`;
      }

      $("[data-est-price]", est).textContent = `${money(lo)} – ${money(hi)}`;
      $("[data-est-duree]", est).textContent = duree;
      $("[data-est-note]", est).textContent =
        delai === "urgent" ? "Délai court : une équipe renforcée est prévue, d'où une légère majoration." : prest.includes("cle") ? "Tout compris : conception, travaux tous corps d'état et coordination." : `${prest.length} prestation${prest.length > 1 ? "s" : ""} sélectionnée${prest.length > 1 ? "s" : ""}.`;

      state = { type, delai, S, prest, lo, hi, duree };
    }

    const summary = () =>
      [
        "Estimation express (site TG2A 23) :",
        `- Type d'espace : ${TYPE[state.type][1]}`,
        `- Surface : ${money(state.S)} m²`,
        `- Prestations : ${state.prest.map((p) => RATES[p][2]).join(", ")}`,
        `- Délai : ${DELAI[state.delai][1]}`,
        `- Budget indicatif : ${money(state.lo)} – ${money(state.hi)} MAD HT`,
        `- Durée estimée : ${state.duree}`,
      ].join("\n");

    // Pré-remplit le formulaire de contact avec l'estimation
    $("[data-est-devis]", est).addEventListener("click", () => {
      if (!state) return;
      const cf = document.forms.contact;
      if (!cf) return;
      const espace = $$("input[name=espace]", cf).find((r) => r.value === TYPE[state.type][1]);
      if (espace) espace.checked = true;
      cf.projet.value = FORM_PROJET[state.prest[0]];
      cf.surface.value = `${state.S} m²`;
      if (!cf.message.value.trim() || cf.message.value.startsWith("Estimation express")) cf.message.value = summary() + "\n\nMon projet : ";
      cf.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => cf.nom.focus({ preventScroll: true }), 600);
    });

    // Envoi direct de l'estimation sur WhatsApp
    $("[data-est-wa]", est).addEventListener("click", () => {
      if (!state) return;
      const text = `Bonjour TG2A, je souhaite un devis.\n\n${summary()}`;
      window.open(`https://wa.me/212661106590?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });

    compute();
  }
})();
