/* MAGLEN — main.js. Kontakt podaci se menjaju samo ovde. */
const CONFIG = { PHONE: "+381 XX XXX XXXX", EMAIL: "rezervacije@maglen.rs", ADDRESS: "Tara, Srbija", WHATSAPP: "", INSTAGRAM: "" };
const WEB3FORMS_KEY = "OVDE_KLJUC";

/* Rezervacija — demo konstante */
const ROOMS = [
  { id: "suma", key: "ui.room.suma", max: 2, img: "1618773928121-c32242e63f39", local: "img/11_SOBA4.jpg" },
  { id: "kanjon", key: "ui.room.kanjon", max: 3, img: "1761039265583-9489b4246454", local: "img/08_SOBA1.jpg" },
  { id: "vrh", key: "ui.room.vrh", max: 4, img: "1774280954999-9758f11f3d41", local: "img/09_SOBA2.jpg" }
];
const PRICES = { suma: 140, kanjon: 230, vrh: 320 };
const EXTRAS = [
  { id: "spa", key: "ui.ex.spa", price: 55, per: "once" },
  { id: "vecera", key: "ui.ex.vecera", price: 45, per: "guest" },
  { id: "transfer", key: "ui.ex.transfer", price: 40, per: "once" }
];
const MIN_NIGHTS = 2;
const LONG_STAY = { nights: 7, discount: 0.15 };
const PACKAGES = { vikend: { key: "ui.pk.vikend", room: "suma" }, "spa-ritual": { key: "ui.pk.spa", room: "kanjon" }, zima: { key: "ui.pk.zima", room: "suma" }, duzi: { key: "ui.pk.duzi" } };
const BOOKED_DATES = ["2026-11-20", "2026-11-21", "2026-11-27", "2026-11-28", "2026-12-04", "2026-12-05", "2026-12-24", "2026-12-25", "2026-12-26", "2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02", "2027-01-15", "2027-01-16", "2027-02-12", "2027-02-13", "2027-02-14"];

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const EASE = "cubic-bezier(.22,1,.36,1)";

/* ---------- jezik ---------- */
let LANG = "sr";
try { if (localStorage.getItem("maglen-lang") === "en") LANG = "en"; } catch (e) {}
const t = k => { const v = (window.I18N || {})[k]; return v ? v[LANG === "en" ? 1 : 0] : k; };
const ATTRS = ["alt", "placeholder", "aria-label", "title"];
function applyLang(full) {
  document.documentElement.lang = LANG;
  if (full) {
    $$("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    ATTRS.forEach(a => $$(`[data-i18n-${a}]`).forEach(el => el.setAttribute(a, t(el.getAttribute("data-i18n-" + a)))));
    const tk = document.documentElement.dataset.title; if (tk) document.title = t(tk);
  }
  $$("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === LANG)));
  $$("[data-split]").forEach(split);
  document.dispatchEvent(new Event("langchange"));
}
function split(el) {
  const walk = n => [...n.childNodes].forEach(c => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) f.append(p); else { const s = document.createElement("span"); s.className = "w"; s.textContent = p; f.append(s); } });
      c.replaceWith(f);
    } else if (c.nodeType === 1 && !c.classList.contains("w")) walk(c);
  });
  walk(el);
  if (el.classList.contains("hero__title")) $$(".w", el).forEach((w, i) => { w.style.transitionDelay = i * 90 + "ms"; });
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-lang]"); if (!b || b.dataset.lang === LANG) return;
  LANG = b.dataset.lang; try { localStorage.setItem("maglen-lang", LANG); } catch (e) {}
  applyLang(true);
});

/* ---------- CONFIG u stranicu ---------- */
function fillConfig() {
  const digits = CONFIG.PHONE.replace(/[^\d+]/g, "");
  $$("[data-cfg]").forEach(el => {
    const k = el.dataset.cfg, keep = el.hasAttribute("data-keep");
    if (k === "phone") { el.href = "tel:" + digits; if (!keep) el.textContent = CONFIG.PHONE; }
    else if (k === "email") { el.href = "mailto:" + CONFIG.EMAIL; if (!keep) el.textContent = CONFIG.EMAIL; }
    else if (k === "address") el.textContent = CONFIG.ADDRESS;
    else if (k === "whatsapp") { el.hidden = !CONFIG.WHATSAPP; if (CONFIG.WHATSAPP) el.href = "https://wa.me/" + CONFIG.WHATSAPP.replace(/\D/g, ""); }
    else if (k === "instagram") { el.hidden = !CONFIG.INSTAGRAM; if (CONFIG.INSTAGRAM) el.href = /^https?:/.test(CONFIG.INSTAGRAM) ? CONFIG.INSTAGRAM : "https://instagram.com/" + CONFIG.INSTAGRAM.replace("@", ""); }
  });
  $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ---------- slike: rezerva ako Unsplash ne odgovori ---------- */
function swapLocal(im) { if (im.dataset.local && !im.dataset.failed) { im.dataset.failed = "1"; im.removeAttribute("srcset"); im.src = im.dataset.local; } }
document.addEventListener("error", e => { if (e.target.tagName === "IMG") swapLocal(e.target); }, true);

/* ---------- 5) prelaz između stranica ---------- */
const wave = $(".wave");
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]");
  if (!a || RM || !wave || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank" || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  if (url.protocol !== location.protocol || url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  e.preventDefault();
  const m = $("#menu"); if (m && m.open) { m.classList.remove("open"); m.close(); }
  wave.classList.add("in");
  setTimeout(() => { location.href = url.href; }, 600);
});
addEventListener("pageshow", e => { if (e.persisted && wave) wave.classList.remove("in"); });

/* ---------- navigacija ---------- */
const hdr = $(".hdr");
let lastY = scrollY;
function hdrFrame(y) {
  if (!hdr) return;
  hdr.classList.toggle("solid", y > 40);
  const down = y > lastY && y > 220 && !hdr.contains(document.activeElement);
  if (Math.abs(y - lastY) > 4) hdr.classList.toggle("hide", down);
  lastY = y;
}
$$(".more").forEach(m => {
  const b = $("button", m), set = v => b.setAttribute("aria-expanded", String(v));
  b.addEventListener("click", () => set(b.getAttribute("aria-expanded") !== "true"));
  m.addEventListener("keydown", e => { if (e.key === "Escape") { set(false); b.focus(); } });
  m.addEventListener("focusout", e => { if (!m.contains(e.relatedTarget)) set(false); });
  m.addEventListener("mouseenter", () => matchMedia("(hover:hover)").matches && set(true));
  m.addEventListener("mouseleave", () => matchMedia("(hover:hover)").matches && set(false));
  document.addEventListener("click", e => { if (!m.contains(e.target)) set(false); });
});
const menu = $("#menu");
if (menu) {
  const close = () => { menu.classList.remove("open"); setTimeout(() => menu.close(), RM ? 0 : 420); };
  $$("[data-menu-open]").forEach(b => b.addEventListener("click", () => { menu.showModal(); requestAnimationFrame(() => menu.classList.add("open")); }));
  $("[data-menu-close]", menu).addEventListener("click", close);
  menu.addEventListener("cancel", e => { e.preventDefault(); close(); });
  const pics = $$(".menu__ph img", menu);
  const show = k => pics.forEach(p => p.classList.toggle("on", p.dataset.k === k));
  $$("[data-img]", menu).forEach(a => { a.addEventListener("mouseenter", () => show(a.dataset.img)); a.addEventListener("focus", () => show(a.dataset.img)); });
}

/* ---------- 2) visinomer ---------- */
const alt = $(".alt"), prog = $(".prog i");
const fmtM = n => { n = Math.round(n); const s = n >= 1000 ? Math.floor(n / 1000) + (LANG === "en" ? "," : ".") + String(n % 1000).padStart(3, "0") : String(n); return s + " m"; };
function buildAlt() {
  if (!alt) return;
  const box = $(".alt__ticks", alt), max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  box.innerHTML = "";
  const secs = $$("[data-sec]");
  const pts = secs.map(s => ({ s, f: clamp((s.getBoundingClientRect().top + scrollY) / max) }));
  pts.push({ s: null, f: 1 });
  let lastF = -1;
  pts.forEach(({ s, f }) => {
    if (f - lastF < 0.1 && s) return; lastF = f;
    const b = document.createElement("button");
    b.type = "button"; b.className = "alt__t"; b.style.bottom = f * 100 + "%";
    b.innerHTML = `<span>${fmtM(f * 1100)}</span>`;
    b.setAttribute("aria-label", (s ? t(s.dataset.sec) : t("ui.top")) + " — " + fmtM(f * 1100));
    b.addEventListener("click", () => scrollTo({ top: s ? s.getBoundingClientRect().top + scrollY - 80 : max, behavior: RM ? "auto" : "smooth" }));
    box.append(b);
  });
}
function altFrame(y) {
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = clamp(y / max);
  if (prog) prog.style.transform = `scaleX(${p})`;
  if (!alt || RM) return;
  const ptr = $(".alt__ptr", alt), h = alt.clientHeight;
  ptr.style.transform = `translateY(${-p * h}px)`;
  const end = p > 0.995;
  alt.classList.toggle("end", end);
  $("span", ptr).textContent = end ? fmtM(1100) + " — " + t("ui.arrived") : fmtM(Math.round(p * 110) * 10);
  $$(".alt__t", alt).forEach(b => b.classList.toggle("near", Math.abs(parseFloat(b.style.bottom) / 100 - p) < 0.06));
}

/* ---------- 1) magla se diže ---------- */
const hero = $(".hero");
let heroFrame = () => {};
if (hero) {
  const img = $(".hero__img", hero), haze = $(".hero__haze", hero), soft = hero.classList.contains("hero--soft");
  const B0 = soft ? 8 : 14, B1 = soft ? 2 : 4, H0 = soft ? 0.4 : 0.6, H1 = soft ? 0.15 : 0.25;
  let intro = RM ? 1 : 0;
  heroFrame = y => {
    if (RM || y > innerHeight * 1.2) return;
    const s = clamp(y / innerHeight), e = 1 - Math.pow(1 - intro, 3), k = 1 - s;
    const blur = (B0 + (B1 - B0) * e) * k;
    img.style.filter = blur < 0.25 ? "none" : `blur(${blur.toFixed(2)}px)`;
    img.style.transform = `scale(${(1.08 - 0.08 * s).toFixed(4)})`;
    haze.style.opacity = ((H0 + (H1 - H0) * e) * k).toFixed(3);
    hero.style.setProperty("--k", k.toFixed(3));
  };
  if (!RM) { const t0 = performance.now(); const tick = now => { intro = clamp((now - t0) / 1600); heroFrame(scrollY); if (intro < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }
  setTimeout(() => { const ti = $(".hero__title", hero); if (ti) ti.classList.add("in"); }, RM ? 0 : 250);
}

/* ---------- manifest ---------- */
const man = $(".manifest");
function manFrame() {
  if (!man) return;
  const ws = $$(".w", man);
  if (RM) { ws.forEach(w => w.classList.add("on")); return; }
  const r = man.getBoundingClientRect(), p = clamp((innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.35));
  const n = Math.round(p * ws.length); ws.forEach((w, i) => w.classList.toggle("on", i < n));
}

/* ---------- jedan scroll loop ---------- */
let ticking = false;
function frame() { ticking = false; const y = scrollY; hdrFrame(y); altFrame(y); heroFrame(y); manFrame(); }
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
addEventListener("resize", () => { buildAlt(); frame(); });

/* ---------- 4) otkrivanje fotografija + reveal ---------- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" }) : null;
$$(".rv").forEach(el => { const sib = [...el.parentElement.children].filter(c => c.classList.contains("rv")); el.style.transitionDelay = Math.min(sib.indexOf(el), 6) * 80 + "ms"; });
$$(".rv,.rv-img,.rv-fade").forEach(el => io ? io.observe(el) : el.classList.add("in"));

/* ---------- 3) traka soba ---------- */
$$("[data-track]").forEach(w => {
  const tr = $(".track", w), bar = $(".track-prog i", w);
  const step = () => { const c = $(".card:not([hidden])", tr); return c ? c.offsetWidth + 24 : 400; };
  const upd = () => { const vis = clamp(tr.clientWidth / tr.scrollWidth, 0.08), max = tr.scrollWidth - tr.clientWidth, p = max > 0 ? tr.scrollLeft / max : 0; bar.style.width = vis * 100 + "%"; bar.style.transform = `translateX(${(p * (1 - vis) / vis) * 100}%)`; };
  const go = d => tr.scrollBy({ left: d * step(), behavior: RM ? "auto" : "smooth" });
  $("[data-prev]", w).addEventListener("click", () => go(-1));
  $("[data-next]", w).addEventListener("click", () => go(1));
  tr.addEventListener("keydown", e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); go(e.key === "ArrowRight" ? 1 : -1); } });
  tr.addEventListener("scroll", upd, { passive: true });
  tr.addEventListener("filtered", upd);
  addEventListener("resize", upd); upd();
  let down = false, moved = false, x0 = 0, s0 = 0, lx = 0, lt = 0, v = 0, raf;
  tr.addEventListener("dragstart", e => e.preventDefault());
  tr.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button !== 0) return; down = true; moved = false; x0 = lx = e.clientX; s0 = tr.scrollLeft; lt = performance.now(); v = 0; cancelAnimationFrame(raf); });
  addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5) { moved = true; tr.classList.add("drag"); } tr.scrollLeft = s0 - dx; const now = performance.now(); v = (e.clientX - lx) / Math.max(1, now - lt); lx = e.clientX; lt = now; });
  addEventListener("pointerup", () => {
    if (!down) return; down = false; tr.classList.remove("drag");
    let vel = -v * 16; const glide = () => { if (Math.abs(vel) < 0.4) return; tr.scrollLeft += vel; vel *= 0.94; raf = requestAnimationFrame(glide); };
    if (!RM) glide();
  });
  tr.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
});

/* ---------- filteri sa FLIP ---------- */
$$("[data-filter]").forEach(g => {
  const box = $(g.dataset.filter), items = $$("[data-cat]", box), btns = $$("[data-f]", g), sel = $("select[data-guests]", g);
  let cat = "all";
  const apply = () => {
    const min = sel ? +sel.value : 0, first = new Map(items.map(i => [i, i.getBoundingClientRect()]));
    items.forEach(i => { i.hidden = !((cat === "all" || i.dataset.cat.split(" ").includes(cat)) && (!min || +i.dataset.guests >= min)); });
    const empty = $("[data-empty]", g.parentElement); if (empty) empty.hidden = items.some(i => !i.hidden);
    box.dispatchEvent(new Event("filtered"));
    if (RM) return;
    items.forEach(i => {
      if (i.hidden) return; const a = first.get(i), b = i.getBoundingClientRect();
      i.classList.add("in");
      if (!a.width) { i.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 600, easing: EASE }); return; }
      const dx = a.left - b.left, dy = a.top - b.top;
      if (dx || dy) i.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: "none" }], { duration: 700, easing: EASE });
    });
  };
  btns.forEach(b => b.addEventListener("click", () => { cat = b.dataset.f; btns.forEach(x => x.setAttribute("aria-pressed", String(x === b))); apply(); }));
  if (sel) sel.addEventListener("change", apply);
});

/* ---------- lightbox ---------- */
const lb = $("#lb");
if (lb) {
  const im = $("img", lb), cnt = $(".lb__count", lb); let list = [], i = 0;
  const show = () => { const s = list[i]; im.src = s.dataset.full || s.currentSrc || s.src; im.alt = s.alt; cnt.textContent = `${i + 1} / ${list.length}`; };
  const mv = d => { i = (i + d + list.length) % list.length; show(); };
  $$("[data-lb-group]").forEach(g => g.addEventListener("click", e => {
    const b = e.target.closest("[data-lb]"); if (!b) return;
    list = $$("[data-lb]", g).filter(x => !x.hidden).map(x => $("img", x)); i = list.indexOf($("img", b)); show(); lb.showModal();
  }));
  $("[data-lb-prev]", lb).addEventListener("click", () => mv(-1));
  $("[data-lb-next]", lb).addEventListener("click", () => mv(1));
  $("[data-lb-close]", lb).addEventListener("click", () => lb.close());
  lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") mv(-1); if (e.key === "ArrowRight") mv(1); });
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb__fig")) lb.close(); });
  let sx = 0; lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) mv(dx < 0 ? 1 : -1); });
}

/* ---------- tabovi ---------- */
$$("[role=tablist]").forEach(tl => {
  const tabs = $$("[role=tab]", tl);
  const sel = x => tabs.forEach(tb => { const on = tb === x; tb.setAttribute("aria-selected", String(on)); tb.tabIndex = on ? 0 : -1; document.getElementById(tb.getAttribute("aria-controls")).hidden = !on; });
  tabs.forEach((x, i) => {
    x.addEventListener("click", () => sel(x));
    x.addEventListener("keydown", e => {
      let j = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key]; if (j === undefined) return;
      e.preventDefault(); j = (j + tabs.length) % tabs.length; tabs[j].focus(); sel(tabs[j]);
    });
  });
});

/* ---------- godišnja doba: ton pozadine ---------- */
$$("[data-tones]").forEach(s => {
  $$("[data-tone]", s).forEach(c => { const on = () => { s.style.backgroundColor = c.dataset.tone; }; c.addEventListener("mouseenter", on); c.addEventListener("focusin", on); });
  s.addEventListener("mouseleave", () => { s.style.backgroundColor = ""; });
});

/* ---------- datumi u brzim formama ---------- */
const pad2 = n => String(n).padStart(2, "0");
const iso = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
$$("form.quick, form[data-quick]").forEach(f => {
  const a = $("[name=dolazak]", f), b = $("[name=odlazak]", f); if (!a || !b) return;
  a.min = iso(TODAY);
  a.addEventListener("change", () => { if (!a.value) return; const d = new Date(a.value); d.setDate(d.getDate() + MIN_NIGHTS); b.min = iso(d); if (!b.value || b.value < b.min) b.value = b.min; });
});

/* ---------- slanje formi (Web3Forms) ---------- */
async function send(fields, kind, dates) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Maglen – ${kind} – ${dates || "bez datuma"}`, from_name: "Maglen sajt", ...fields })
  });
  const j = await res.json().catch(() => ({}));
  return j && j.success === true; // uspeh samo ako servis to potvrdi
}
const failMsg = () => `${t("ui.fail")} <a href="tel:${CONFIG.PHONE.replace(/[^\d+]/g, "")}">${CONFIG.PHONE}</a>`;
$$("form[data-form]").forEach(f => f.addEventListener("submit", async e => {
  e.preventDefault(); if (!f.reportValidity()) return;
  const st = $(".status", f), btn = $("[type=submit]", f), data = Object.fromEntries(new FormData(f));
  const dates = data.datum || [data.dolazak, data.odlazak].filter(Boolean).join(" – ");
  btn.disabled = true; st.className = "status"; st.textContent = t("ui.sending");
  let ok = false; try { ok = await send(data, f.dataset.form, dates); } catch (_) {}
  btn.disabled = false;
  if (ok) { st.textContent = t("ui.ok"); st.classList.add("ok"); f.reset(); } else { st.innerHTML = failMsg(); st.classList.add("err"); }
}));
$$("form[data-news]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); $(".status", f).textContent = t("ui.news"); }));

/* ---------- rezervacija ---------- */
function quote(nights, price, guests, extraIds) {
  const room = nights * price, disc = nights >= LONG_STAY.nights ? Math.round(room * LONG_STAY.discount) : 0;
  const ex = extraIds.map(id => { const x = EXTRAS.find(e => e.id === id); return { x, amt: x.per === "guest" ? x.price * guests : x.price }; });
  return { room, disc, ex, total: room - disc + ex.reduce((s, e) => s + e.amt, 0) };
}
console.assert(quote(2, 140, 2, ["vecera"]).total === 370 && quote(7, 100, 2, []).total === 595 && quote(3, 230, 3, ["spa", "transfer"]).total === 785, "quote()");

const bk = $("#bk-form");
if (bk) {
  const q = new URLSearchParams(location.search), booked = new Set(BOOKED_DATES);
  const parseD = s => { if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return null; const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const nightsOf = (a, d) => Math.round((d - a) / 864e5);
  const free = (a, d) => { for (let x = new Date(a); x < d; x = addD(x, 1)) if (booked.has(iso(x))) return false; return true; };
  const S = { a: parseD(q.get("dolazak")), d: parseD(q.get("odlazak")), guests: clamp(+q.get("gosti") || 2, 1, 4), room: q.get("soba"), extras: new Set(q.get("tip") === "spa" ? ["spa"] : []), pkg: PACKAGES[q.get("paket")] ? q.get("paket") : null, step: 1, focus: null };
  if (!PRICES[S.room]) S.room = S.pkg ? PACKAGES[S.pkg].room || null : null;
  if (!S.a || S.a < TODAY || booked.has(iso(S.a))) { S.a = null; S.d = null; }
  if (S.a && (!S.d || nightsOf(S.a, S.d) < MIN_NIGHTS || !free(S.a, S.d))) S.d = null;
  const fitRoom = () => { const r = ROOMS.find(r => r.id === S.room); if (r && r.max < S.guests) S.room = null; };
  fitRoom();
  S.view = new Date((S.a || TODAY).getFullYear(), (S.a || TODAY).getMonth(), 1);
  const loc = () => (LANG === "en" ? "en-GB" : "sr-Latn-RS");
  const fD = d => d.toLocaleDateString(loc(), { day: "numeric", month: "short", year: "numeric" });
  const eur = n => n.toLocaleString(loc()) + " €";
  const cal = $("#cal"), calMsg = $("#cal-msg"), guestsSel = $("#bk-guests"), sum = $("#bk-sum");
  guestsSel.value = String(S.guests);

  function renderCal(focusIt) {
    const y = S.view.getFullYear(), m = S.view.getMonth(), first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, dim = new Date(y, m + 1, 0).getDate();
    const wd = [...Array(7)].map((_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(loc(), { weekday: "short" }));
    if (!S.focus || S.focus.getMonth() !== m || S.focus.getFullYear() !== y) S.focus = S.a && S.a.getMonth() === m && S.a.getFullYear() === y ? S.a : (TODAY.getMonth() === m && TODAY.getFullYear() === y ? TODAY : first);
    let cells = "";
    for (let i = 0; i < off; i++) cells += "<span></span>";
    for (let d = 1; d <= dim; d++) {
      const dt = new Date(y, m, d), k = iso(dt), isB = booked.has(k), past = dt < TODAY;
      const asDep = S.a && !S.d && dt > S.a && free(S.a, dt);
      const dis = past || (isB && !asDep);
      const sel = (S.a && +dt === +S.a) || (S.d && +dt === +S.d), inR = S.a && S.d && dt > S.a && dt < S.d;
      const cls = ["cal__d", isB ? "bk-x" : "", sel ? "sel" : "", inR ? "in" : "", +dt === +TODAY ? "today" : ""].join(" ");
      const lab = dt.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + (isB ? " — " + t("ui.booked") : "");
      cells += `<button type="button" class="${cls}" data-d="${k}" aria-label="${lab}" aria-pressed="${!!sel}" aria-disabled="${dis}" tabindex="${+dt === +S.focus ? 0 : -1}">${d}</button>`;
    }
    const canPrev = new Date(y, m, 1) > new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    cal.innerHTML = `<div class="cal__h"><button type="button" class="cal__nav" data-m="-1" aria-label="${t("ui.prevm")}" ${canPrev ? "" : "disabled"}><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button><p class="h4" aria-live="polite">${first.toLocaleDateString(loc(), { month: "long", year: "numeric" })}</p><button type="button" class="cal__nav" data-m="1" aria-label="${t("ui.nextm")}"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button></div><div class="cal__w" aria-hidden="true">${wd.map(w => `<span>${w}</span>`).join("")}</div><div class="cal__g" role="group" aria-label="${t("ui.pickdates")}">${cells}</div>`;
    if (focusIt) { const b = $(`[data-d="${iso(S.focus)}"]`, cal); if (b) b.focus(); }
  }
  cal.addEventListener("click", e => {
    const nav = e.target.closest("[data-m]");
    if (nav) { S.view = new Date(S.view.getFullYear(), S.view.getMonth() + +nav.dataset.m, 1); S.focus = null; renderCal(); return; }
    const b = e.target.closest("[data-d]"); if (!b || b.getAttribute("aria-disabled") === "true") return;
    const dt = parseD(b.dataset.d); S.focus = dt; calMsg.textContent = ""; calMsg.className = "status";
    if (!S.a || S.d || dt <= S.a) { S.a = dt; S.d = null; }
    else if (nightsOf(S.a, dt) < MIN_NIGHTS) { calMsg.textContent = t("ui.minn").replace("{n}", MIN_NIGHTS); calMsg.classList.add("err"); }
    else if (!free(S.a, dt)) { calMsg.textContent = t("ui.notfree"); calMsg.classList.add("err"); }
    else S.d = dt;
    renderCal(true); renderAll();
  });
  cal.addEventListener("keydown", e => {
    const b = e.target.closest("[data-d]"); if (!b) return;
    const mv = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!mv) return;
    e.preventDefault(); const n = addD(parseD(b.dataset.d), mv); if (n < new Date(TODAY.getFullYear(), TODAY.getMonth(), 1)) return;
    if (n.getMonth() !== S.view.getMonth()) S.view = new Date(n.getFullYear(), n.getMonth(), 1);
    S.focus = n; renderCal(true);
  });
  guestsSel.addEventListener("change", () => { S.guests = +guestsSel.value; fitRoom(); renderAll(); });

  function renderRooms() {
    const n = S.a && S.d ? nightsOf(S.a, S.d) : 0;
    $("#bk-rooms").innerHTML = ROOMS.map(r => {
      const tot = n ? `${n} × ${eur(PRICES[r.id])} = ${eur(n * PRICES[r.id])}` : `${t("ui.from")} ${eur(PRICES[r.id])} / ${t("ui.night")}`;
      const dis = r.max < S.guests;
      return `<div><input type="radio" name="soba" id="r-${r.id}" value="${r.id}" ${S.room === r.id ? "checked" : ""} ${dis ? "disabled" : ""}><label for="r-${r.id}"><span class="ph"><img src="https://images.unsplash.com/photo-${r.img}?w=500&amp;q=80&amp;auto=format&amp;fit=crop" alt="" width="500" height="375" loading="lazy" data-local="${r.local}"></span><span><span class="h4" style="display:block">${t(r.key)}</span><span class="mono t2">${t("ui.upto")} ${r.max} ${t("ui.guests")}${dis ? " · " + t("ui.toosmall") : ""}</span></span><span class="mi__p">${tot}</span></label></div>`;
    }).join("");
  }
  $("#bk-rooms").addEventListener("change", e => { S.room = e.target.value; renderSum(); });
  function renderExtras() {
    $("#bk-extras").innerHTML = EXTRAS.map(x => `<div><input type="checkbox" id="x-${x.id}" value="${x.id}" ${S.extras.has(x.id) ? "checked" : ""}><label for="x-${x.id}"><span class="box"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span>${t(x.key)}</span><span class="mi__p">${eur(x.price)}${x.per === "guest" ? " / " + t("ui.person") : ""}</span></label></div>`).join("");
  }
  $("#bk-extras").addEventListener("change", e => { e.target.checked ? S.extras.add(e.target.value) : S.extras.delete(e.target.value); renderSum(); });
  function calc() { const n = S.a && S.d ? nightsOf(S.a, S.d) : 0; return { n, ...quote(n, S.room ? PRICES[S.room] : 0, S.guests, [...S.extras]) }; }
  function rows() {
    const c = calc(), r = ROOMS.find(x => x.id === S.room), L = [];
    L.push([t("ui.dates"), S.a ? fD(S.a) + " – " + (S.d ? fD(S.d) : "…") : "—"]);
    L.push([t("ui.nights"), c.n || "—"], [t("ui.guestsL"), S.guests]);
    if (S.pkg) L.push([t("ui.package"), t(PACKAGES[S.pkg].key)]);
    if (r) L.push([t(r.key), c.n ? eur(c.room) : "—"]);
    if (c.disc) L.push([t("ui.long"), "−" + eur(c.disc)]);
    c.ex.forEach(e => L.push([t(e.x.key), eur(e.amt)]));
    return { c, L };
  }
  function renderSum() {
    const { c, L } = rows();
    sum.innerHTML = `<p class="mono">${t("ui.summary")}</p><dl>${L.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl><div class="tot"><span class="mono">${t("ui.total")}</span><b>${c.n && S.room ? eur(c.total) : "—"}</b></div><p class="note" style="margin-top:16px">${t("ui.payhotel")}</p>`;
  }
  function renderAll() { renderRooms(); renderExtras(); renderSum(); }
  const steps = $$(".bk-step", bk), pr = $$(".bk-prog li"), back = $("#bk-back"), next = $("#bk-next"), sub = $("#bk-submit"), st = $("#bk-status");
  function setStep(n) {
    S.step = n; steps.forEach((s, i) => { s.hidden = i !== n - 1; });
    pr.forEach((li, i) => { li.classList.toggle("done", i < n - 1); if (i === n - 1) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current"); });
    back.hidden = n === 1; next.hidden = n === 4; sub.hidden = n !== 4; st.textContent = ""; st.className = "status";
    const lg = $("legend", steps[n - 1]); lg.tabIndex = -1; lg.focus({ preventScroll: true });
    scrollTo({ top: $(".bk-prog").getBoundingClientRect().top + scrollY - 120, behavior: RM ? "auto" : "smooth" });
  }
  next.addEventListener("click", () => {
    if (S.step === 1 && !(S.a && S.d)) { calMsg.textContent = t("ui.needdates"); calMsg.className = "status err"; return; }
    if (S.step === 2 && !S.room) { st.textContent = t("ui.needroom"); st.className = "status err"; return; }
    setStep(S.step + 1);
  });
  back.addEventListener("click", () => setStep(S.step - 1));
  bk.addEventListener("submit", async e => {
    e.preventDefault(); if (!steps[3].querySelectorAll("input,textarea").length || ![...steps[3].querySelectorAll("input,textarea")].every(i => i.reportValidity())) return;
    const { c, L } = rows(), r = ROOMS.find(x => x.id === S.room), fd = Object.fromEntries(new FormData(bk));
    const data = { tip: "Rezervacija sobe", dolazak: iso(S.a), odlazak: iso(S.d), noci: c.n, gosti: S.guests, soba: t(r.key), paket: S.pkg ? t(PACKAGES[S.pkg].key) : "—", dodaci: c.ex.map(e => t(e.x.key)).join(", ") || "—", ukupno: c.total + " €", placanje: "U hotelu", ime: fd.ime, email: fd.email, telefon: fd.telefon, napomena: fd.napomena || "" };
    sub.disabled = true; st.className = "status"; st.textContent = t("ui.sending");
    let ok = false; try { ok = await send(data, "Rezervacija", `${iso(S.a)} – ${iso(S.d)}`); } catch (_) {}
    sub.disabled = false;
    if (!ok) { st.innerHTML = failMsg(); st.classList.add("err"); return; }
    const done = $("#bk-done");
    $("#bk-done-sum").innerHTML = L.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("") + `<dt>${t("ui.total")}</dt><dd>${eur(c.total)}</dd>`;
    $(".bk").hidden = true; $(".bk-prog").hidden = true; done.hidden = false; requestAnimationFrame(() => done.classList.add("in"));
    scrollTo({ top: 0 });
  });
  document.addEventListener("langchange", () => { renderCal(); renderAll(); });
  renderCal(); renderAll();
  if (S.a && S.d && q.get("soba")) setStep(2);
}

/* ---------- start ---------- */
fillConfig();
$$("img[data-local]").forEach(im => { if (im.complete && im.naturalWidth === 0) swapLocal(im); });
applyLang(LANG === "en");
buildAlt(); frame();
addEventListener("load", () => { buildAlt(); frame(); });
