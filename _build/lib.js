({
init() {
const L = this;
L.IMG = {MAGLA1:'1702474447694-e8c8dc2508e0',MAGLA2:'1551120738-c3fcea8d0cf8',JEZERO1:'1777833415010-5befdd621600',JEZERO2:'1559310589-2673bfe16970',KUCA_ZIMA:'1510798831971-661eb04b3739',ZIMA:'1453306458620-5bbef13a5bca',STAZA:'1762635293732-6cece59da6fb',SOBA1:'1761039265583-9489b4246454',SOBA2:'1774280954999-9758f11f3d41',SOBA3:'1611892440504-42a792e24d32',SOBA4:'1618773928121-c32242e63f39',KADA:'1772567733000-76963732d556',BAZEN:'1731336478730-09d1f3bc5dee',SAUNA:'1660735698223-23a4edefa264',VECERA:'1414235077428-338989a2e8c0',TANJIR:'1663530761401-15eefb544889',RESTORAN:'1774989423979-6a7bf5add3f0',DORUCAK:'1528699633788-424224dc89b5',LOUNGE:'1792651466319-f77612f6854f',VENCANJE:'1607047795460-9521dfad2269'};
L.LOCAL = {MAGLA1:'01_MAGLA1_hero',MAGLA2:'02_MAGLA2',JEZERO1:'03_JEZERO1',JEZERO2:'04_JEZERO2',KUCA_ZIMA:'05_KUCA_ZIMA',ZIMA:'06_ZIMA',STAZA:'07_STAZA',SOBA1:'08_SOBA1',SOBA2:'09_SOBA2',SOBA3:'10_SOBA3',SOBA4:'11_SOBA4',KADA:'12_KADA',BAZEN:'13_BAZEN',SAUNA:'14_SAUNA',VECERA:'15_VECERA',TANJIR:'16_TANJIR',RESTORAN:'17_RESTORAN',DORUCAK:'18_DORUCAK',LOUNGE:'19_LOUNGE',VENCANJE:'20_VENCANJE'};
L.ALT = {MAGLA1:['Borova šuma u gustoj jutarnjoj magli','Pine forest in thick morning fog'],MAGLA2:['Šumovita brda Tare pod maglom','Forested hills of Tara under fog'],JEZERO1:['Mirno planinsko jezero okruženo šumom','Calm mountain lake surrounded by forest'],JEZERO2:['Tirkizno jezero među planinama','Turquoise lake between mountains'],KUCA_ZIMA:['Drvena kuća u snegu, osvetljeni prozori u noći','Wooden house in snow, lit windows at night'],ZIMA:['Jele pod snegom','Fir trees under snow'],STAZA:['Planinarska staza kroz šumu','Hiking trail through the forest'],SOBA1:['Soba sa balkonom okrenutim ka šumi','Room with a balcony facing the forest'],SOBA2:['Spavaća soba sa velikim staklom i zelenilom','Bedroom with a large window and greenery'],SOBA3:['Drveni krevet u toploj sobi','Wooden bed in a warm room'],SOBA4:['Svetla soba sa belom lanenom posteljinom','Bright room with white linen'],KADA:['Samostojeća kada uz prozor','Freestanding bathtub by the window'],BAZEN:['Unutrašnji bazen uz staklenu fasadu','Indoor pool by a glass wall'],SAUNA:['Para se diže sa kamenja u sauni','Steam rising from sauna stones'],VECERA:['Večera uz vino','Dinner with wine'],TANJIR:['Šef preliva sos preko jela','Chef pouring sauce over a dish'],RESTORAN:['Toplo osvetljen restoran','Warmly lit restaurant'],DORUCAK:['Doručak: kafa, kroasan i pomorandže','Breakfast: coffee, croissant and oranges'],LOUNGE:['Salon sa kaminom','Lounge with a fireplace'],VENCANJE:['Ceremonija venčanja na livadi','Wedding ceremony in a meadow']};
L.dict = {}; L.P = 'c'; L.N = 0;
for (const k in L.ALT) L.dict['alt.' + k] = L.ALT[k];
const ICON = {arrow:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',bed:'<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>',coffee:'<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/>',wine:'<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',robe:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',wifi:'<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/>',temp:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',check:'<path d="M20 6 9 17l-5-5"/>',down:'<path d="m6 9 6 6 6-6"/>',left:'<path d="m15 18-6-6 6-6"/>',right:'<path d="m9 18 6-6-6-6"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>'};
L.ic = (n, c = '') => `<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
L.esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/<[^>]+>/g, '');
L.page = p => { L.P = p; L.N = 0; };
L.K = (sr, en, k) => { k = k || L.P + '.' + (++L.N); L.dict[k] = [sr, en]; return k; };
L.T = (sr, en, k) => `<span data-i18n="${L.K(sr, en, k)}">${sr}</span>`;
L.E = (tag, attrs, sr, en, k) => `<${tag}${attrs ? ' ' + attrs : ''} data-i18n="${L.K(sr, en, k)}">${sr}</${tag}>`;
L.A = (attr, sr, en, k) => `${attr}="${L.esc(sr)}" data-i18n-${attr}="${L.K(sr, en, k)}"`;
L.U = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&amp;q=80&amp;auto=format&amp;fit=crop`;
L.img = (name, o = {}) => {
  const id = L.IMG[name], w = o.w || 1600, h = o.h || 1067;
  const set = [500, 900, 1600, 2400].map(x => L.U(id, x) + ' ' + x + 'w').join(', ');
  const alt = o.alt === '' ? 'alt=""' : `alt="${L.ALT[name][0]}" data-i18n-alt="alt.${name}"`;
  return `<img src="${L.U(id, o.src || (o.eager ? 1920 : 900))}" srcset="${set}" sizes="${o.sizes || '100vw'}" width="${w}" height="${h}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} ${alt} data-local="img/${L.LOCAL[name]}.jpg"${o.cls ? ` class="${o.cls}"` : ''}${o.lb ? ` data-full="${L.U(id, 1920)}"` : ''}${o.data ? ' ' + o.data : ''}>`;
};
L.fig = (name, o = {}) => `<figure class="ph ${o.small ? 'rv-fade' : 'rv-img'}${o.fc ? ' ' + o.fc : ''}"${o.ar ? ` style="aspect-ratio:${o.ar}"` : ''}>${L.img(name, o)}</figure>`;
L.btn = (href, sr, en, v = 'pri', k) => `<a class="btn btn--${v}" href="${href}">${L.T(sr, en, k)}${L.ic('arrow')}</a>`;
L.tlink = (href, sr, en, k) => `<a class="tlink" href="${href}">${L.T(sr, en, k)}${L.ic('arrow')}</a>`;
L.secno = (n, sr, en) => `<p class="secno mono"><span>${n}</span><span>/</span>${L.T(sr, en)}</p>`;
L.sec = (label, cls, inner, id) => `<section class="sec ${cls || ''}" data-sec="${L.K(label[0], label[1])}"${id ? ` id="${id}"` : ''}>${inner}</section>`;
L.hero = o => `<section class="hero${o.soft ? ' hero--soft' : ''}" data-sec="${L.K('Početak', 'Start', 'c.start')}">
${L.img(o.img, { eager: true, cls: 'hero__img' })}
<div class="hero__haze"></div><div class="fog fog--1"></div><div class="fog fog--2"></div><div class="hero__shade"></div>
<div class="wrap hero__in"><div class="hero__txt">${o.label ? `<p class="mono hero__label">${L.T(...o.label)}</p>` : ''}<h1 class="h1 hero__title" data-split>${L.T(...o.title)}</h1>${o.sub ? `<p class="lead hero__sub">${L.T(...o.sub)}</p>` : ''}${o.btns || ''}</div>${o.extra || ''}</div></section>`;
L.NAV = [['index.html','Početna','Home','MAGLA1'],['o-nama.html','O nama','About','LOUNGE'],['sobe.html','Sobe','Rooms','SOBA1'],['soba-suma.html','Soba „Šuma“','Room “Šuma”','SOBA4'],['soba-kanjon.html','Suite „Kanjon“','Suite “Kanjon”','KADA'],['soba-vrh.html','Apartman „Vrh“','Apartment “Vrh”','SOBA2'],['spa.html','Spa &amp; wellness','Spa &amp; wellness','BAZEN'],['restoran.html','Restoran „Ognjište“','Restaurant “Ognjište”','RESTORAN'],['dozivljaji.html','Doživljaji','Experiences','STAZA'],['dogadjaji.html','Događaji','Events','VENCANJE'],['ponude.html','Ponude','Offers','KUCA_ZIMA'],['galerija.html','Galerija','Gallery','JEZERO2'],['zurnal.html','Žurnal','Journal','DORUCAK'],['kontakt.html','Kontakt','Contact','MAGLA2'],['rezervacija.html','Rezervacija','Booking','SOBA3']];
L.ROOMS = [
 {file:'soba-suma.html',id:'suma',cat:'soba',img:'SOBA4',name:['Soba „Šuma“','Room “Šuma”'],type:['Soba','Room'],m2:28,guests:2,gl:['2 gosta','2 guests'],view:['Pogled na šumu','Forest view'],price:140},
 {file:'soba-kanjon.html',id:'kanjon',cat:'suite',img:'SOBA1',name:['Suite „Kanjon“','Suite “Kanjon”'],type:['Suite','Suite'],m2:45,guests:3,gl:['2+1 gost','2+1 guests'],view:['Terasa ka kanjonu','Canyon terrace'],price:230},
 {file:'soba-vrh.html',id:'vrh',cat:'apartman',img:'SOBA2',name:['Apartman „Vrh“','Apartment “Vrh”'],type:['Apartman','Apartment'],m2:70,guests:4,gl:['4 gosta','4 guests'],view:['Kamin, dve spavaće','Fireplace, two bedrooms'],price:320}];
L.roomCard = (r, withPrice) => `<a class="card rv-fade" href="${r.file}" data-cat="${r.cat}" data-guests="${r.guests}"><figure class="ph">${L.img(r.img, { sizes: '(max-width:768px) 80vw, 40vw', w: 900, h: 1125 })}<span class="card__bar"><span class="mono">${L.T('od', 'from', 'c.from')} ${r.price} € / ${L.T('noć', 'night', 'c.night')}</span><span class="card__go">${L.T('Pogledaj', 'View', 'c.view')}${L.ic('arrow')}</span></span></figure><span class="card__meta" style="display:block"><span class="mono t2" style="display:block;margin-bottom:8px">${L.T(...r.type, 'room.t.' + r.id)}</span><span class="h3" style="display:block">${L.T(...r.name, 'room.' + r.id)}</span><span class="mono" style="display:block">${r.m2} m² · ${L.T(...r.gl, 'room.g.' + r.id)} · ${L.T(...r.view, 'room.v.' + r.id)}</span>${withPrice ? `<span class="mono card__price" style="display:block">${L.T('od', 'from', 'c.from')} ${r.price} € / ${L.T('noć', 'night', 'c.night')}</span>` : ''}</span></a>`;
L.track = (id, withPrice, list) => `<div class="trackwrap" data-track><div class="track" id="${id}" tabindex="0" role="region" ${L.A('aria-label', 'Sobe — prevucite ili koristite strelice', 'Rooms — drag or use arrow keys', 'c.trackl')}>${(list || L.ROOMS).map(r => L.roomCard(r, withPrice)).join('')}</div><div class="wrap track-ui"><div class="track-prog" aria-hidden="true"><i></i></div><button type="button" class="arrow-btn" data-prev ${L.A('aria-label', 'Prethodna', 'Previous', 'c.prev')}>${L.ic('left')}</button><button type="button" class="arrow-btn" data-next ${L.A('aria-label', 'Sledeća', 'Next', 'c.next')}>${L.ic('right')}</button></div></div>`;
L.dateWidget = (cls, hidden = '') => `<form class="${cls}" action="rezervacija.html" method="get" data-quick>${hidden}<div class="field"><label for="${cls}-a">${L.T('Dolazak', 'Arrival', 'c.arr')}</label><input class="input" id="${cls}-a" type="date" name="dolazak" required></div><div class="field"><label for="${cls}-d">${L.T('Odlazak', 'Departure', 'c.dep')}</label><input class="input" id="${cls}-d" type="date" name="odlazak" required></div><div class="field"><label for="${cls}-g">${L.T('Gosti', 'Guests', 'c.guests')}</label><select class="input" id="${cls}-g" name="gosti"><option>1</option><option selected>2</option><option>3</option><option>4</option></select></div><button class="btn btn--pri" type="submit">${L.T('Proveri', 'Check', 'c.check')}${L.ic('arrow')}</button></form>`;
L.cfgList = () => `<a data-cfg="phone" href="tel:+381XXXXXXXX">+381 XX XXX XXXX</a><a data-cfg="email" href="mailto:rezervacije@maglen.rs">rezervacije@maglen.rs</a><span data-cfg="address">Tara, Srbija</span><a data-cfg="whatsapp" hidden>WhatsApp</a><a data-cfg="instagram" hidden>Instagram</a>`;
L.header = file => {
  const main = [['sobe.html','Sobe','Rooms'],['spa.html','Spa','Spa'],['restoran.html','Restoran','Restaurant'],['dozivljaji.html','Doživljaji','Experiences'],['dogadjaji.html','Događaji','Events'],['ponude.html','Ponude','Offers']];
  const more = [['o-nama.html','O nama','About'],['galerija.html','Galerija','Gallery'],['zurnal.html','Žurnal','Journal'],['kontakt.html','Kontakt','Contact']];
  const cur = h => (h === file || (h === 'sobe.html' && file.startsWith('soba-')) || (h === 'zurnal.html' && file.startsWith('zurnal-'))) ? ' aria-current="page"' : '';
  const a = ([h, s, e]) => `<a href="${h}"${cur(h)}>${L.T(s, e, 'nav.' + h)}</a>`;
  return `<a class="skip" href="#main">${L.T('Preskoči na sadržaj', 'Skip to content', 'c.skip')}</a>
<header class="hdr"><div class="hdr__in">
<a class="logo" href="index.html" ${L.A('aria-label', 'Maglen — početna', 'Maglen — home', 'c.home')}><b>MAGLEN</b><small>TARA · 1.100 M</small></a>
<nav class="nav" ${L.A('aria-label', 'Glavna navigacija', 'Main navigation', 'c.navl')}>${main.map(a).join('')}<div class="more"><button type="button" aria-expanded="false">${L.T('Više', 'More', 'nav.more')}${L.ic('down')}</button><div class="more__p">${more.map(a).join('')}</div></div></nav>
<div class="hdr__r"><div class="lang" role="group" aria-label="Jezik / Language"><button type="button" data-lang="sr" aria-pressed="true">SR</button><span aria-hidden="true">/</span><button type="button" data-lang="en" aria-pressed="false">EN</button></div>
<a class="btn btn--pri hdr__cta" href="rezervacija.html">${L.T('Rezerviši', 'Book', 'nav.book')}${L.ic('arrow')}</a>
<button type="button" class="menu-btn" data-menu-open aria-haspopup="dialog" aria-controls="menu">${L.T('Meni', 'Menu', 'nav.menu')}<span class="menu-btn__i" aria-hidden="true"></span></button></div>
</div></header>`;
};
L.menu = file => `<dialog class="menu" id="menu" ${L.A('aria-label', 'Meni', 'Menu', 'nav.menu2')}><div class="menu__grid"><div class="menu__nav">
<div class="menu__top"><a class="logo" href="index.html"><b>MAGLEN</b><small>TARA · 1.100 M</small></a><button type="button" class="menu__x" data-menu-close>${L.T('Zatvori', 'Close', 'c.close')}${L.ic('x')}</button></div>
<ul class="menu__list">${L.NAV.map(([h, s, e, im]) => `<li${h.startsWith('soba-')?' class="sub"':''}><a href="${h}" data-img="${im}"${h === file ? ' aria-current="page"' : ''}>${L.T(s, e, 'menu.' + h)}</a></li>`).join('')}</ul>
<div class="menu__foot mono">${L.cfgList()}</div></div>
<div class="menu__ph" aria-hidden="true">${L.NAV.map(([, , , im], i) => L.img(im, { alt: '', sizes: '40vw', cls: i === 0 ? 'on' : '', data: `data-k="${im}"` })).join('')}</div></div></dialog>`;
L.footer = () => {
  const col = (h, items) => `<div><h3>${L.T(...h)}</h3><ul>${items.map(([u, s, e]) => `<li><a href="${u}">${L.T(s, e, 'nav.' + u)}</a></li>`).join('')}</ul></div>`;
  return `<footer class="ftr"><div class="ftr__bg" aria-hidden="true">${L.img('MAGLA2', { alt: '' })}</div>
<div class="wrap ftr__in"><div class="ftr__top"><p class="ftr__h h2">${L.T('Vidimo se iznad oblaka.', 'See you above the clouds.', 'f.h')}</p>
<form class="news" data-news novalidate><label for="nl" class="mono">${L.T('Pisma iz magle — jednom mesečno', 'Letters from the fog — once a month', 'f.nl')}</label><div class="news__row"><input id="nl" class="input" type="email" name="email" autocomplete="email" ${L.A('placeholder', 'Vaš e-mail', 'Your e-mail', 'f.ph')}><button class="btn btn--light" type="submit">${L.T('Prijavi se', 'Subscribe', 'f.btn')}</button></div><p class="status" role="status"></p></form></div>
<div class="ftr__cols">${col(['Hotel', 'Hotel', 'f.c1'], [['sobe.html', 'Sobe', 'Rooms'], ['spa.html', 'Spa', 'Spa'], ['restoran.html', 'Restoran', 'Restaurant']])}${col(['Doživljaji', 'Experiences', 'f.c2'], [['dozivljaji.html', 'Doživljaji', 'Experiences'], ['dogadjaji.html', 'Događaji', 'Events'], ['ponude.html', 'Ponude', 'Offers']])}${col(['Maglen', 'Maglen', 'f.c3'], [['o-nama.html', 'O nama', 'About'], ['galerija.html', 'Galerija', 'Gallery'], ['zurnal.html', 'Žurnal', 'Journal'], ['kontakt.html', 'Kontakt', 'Contact']])}<div><h3>${L.T('Kontakt', 'Contact', 'f.c4')}</h3><ul><li><a data-cfg="phone" href="tel:+381XXXXXXXX">+381 XX XXX XXXX</a></li><li><a data-cfg="email" href="mailto:rezervacije@maglen.rs">rezervacije@maglen.rs</a></li><li><span data-cfg="address">Tara, Srbija</span></li><li><a data-cfg="whatsapp" hidden>WhatsApp</a></li><li><a data-cfg="instagram" hidden>Instagram</a></li></ul></div></div></div>
<div class="ftr__big" aria-hidden="true">MAGLEN</div>
<div class="wrap ftr__bot mono"><span>© Maglen <span data-year>2026</span></span><a href="uslovi.html">${L.T('Uslovi i privatnost', 'Terms &amp; privacy', 'f.terms')}</a><span>${L.T('Izrada: Avella Agency', 'Made by Avella Agency', 'f.made')}</span></div></footer>`;
};
L.doc = o => {
  const tk = L.K(o.title[0], o.title[1], 't.' + o.file); L.K(o.desc[0], o.desc[1], 'd.' + o.file);
  return `<!doctype html>
<html lang="sr" data-title="${tk}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${o.title[0]}</title>
<meta name="description" content="${L.esc(o.desc[0])}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Maglen">
<meta property="og:title" content="${L.esc(o.title[0])}">
<meta property="og:description" content="${L.esc(o.desc[0])}">
<meta property="og:image" content="${L.U(L.IMG[o.og || 'MAGLA1'], 1200)}">
<meta property="og:locale" content="sr_RS">
<meta property="og:locale:alternate" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#EEEDE8">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%233E4A3A'/%3E%3Ctext x='16' y='23' font-family='Georgia' font-size='20' fill='%23EEEDE8' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&amp;family=DM+Serif+Display:ital@0;1&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap&amp;subset=latin-ext">
<link rel="stylesheet" href="styles.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${o.hero ? 'has-hero' : ''}${o.bodyCls ? ' ' + o.bodyCls : ''}">
<div class="wave" aria-hidden="true"><span class="wave__logo">MAGLEN</span></div>
${L.header(o.file)}
<aside class="alt" ${L.A('aria-label', 'Visinomer — napredak kroz stranicu', 'Altimeter — page progress', 'c.altl')}><div class="alt__rail"></div><div class="alt__ticks"></div><div class="alt__ptr" aria-hidden="true"><i></i><span class="mono">0 m</span></div></aside>
<div class="prog" aria-hidden="true"><i></i></div>
<main id="main">
${o.body}
</main>
${L.footer()}
<nav class="mbar" ${L.A('aria-label', 'Brze akcije', 'Quick actions', 'c.mbar')}><a class="btn btn--sec" data-cfg="phone" data-keep href="tel:+381XXXXXXXX">${L.ic('phone')}${L.T('Pozovi', 'Call', 'c.call')}</a><a class="btn btn--pri" href="rezervacija.html">${L.T('Rezerviši', 'Book', 'nav.book')}</a></nav>
${L.menu(o.file)}
${o.lb ? `<dialog class="lb" id="lb" ${L.A('aria-label', 'Pregled fotografija', 'Photo viewer', 'c.lbl')}><figure class="lb__fig"><img alt=""></figure><button type="button" class="lb__b lb__x" data-lb-close ${L.A('aria-label', 'Zatvori', 'Close', 'c.close2')}>${L.ic('x')}</button><button type="button" class="lb__b lb__prev" data-lb-prev ${L.A('aria-label', 'Prethodna', 'Previous', 'c.prev')}>${L.ic('left')}</button><button type="button" class="lb__b lb__next" data-lb-next ${L.A('aria-label', 'Sledeća', 'Next', 'c.next')}>${L.ic('right')}</button><p class="lb__count mono" aria-live="polite"></p></dialog>` : ''}
<script src="i18n.js" defer></script>
<script src="main.js" defer></script>
</body>
</html>
`;
};
L.ui = () => {
  const U = {
    'ui.room.suma':['Soba „Šuma“','Room “Šuma”'],'ui.room.kanjon':['Suite „Kanjon“','Suite “Kanjon”'],'ui.room.vrh':['Apartman „Vrh“','Apartment “Vrh”'],
    'ui.ex.spa':['Spa tretman — masaža borovim uljem, 60 min','Spa treatment — pine oil massage, 60 min'],'ui.ex.vecera':['Večera kraj ognjišta','Dinner by the hearth'],'ui.ex.transfer':['Transfer do hotela','Transfer to the hotel'],
    'ui.pk.vikend':['Vikend u magli','Weekend in the fog'],'ui.pk.spa':['Spa ritual za dvoje','Spa ritual for two'],'ui.pk.zima':['Zima na Tari','Winter on Tara'],'ui.pk.duzi':['Duži boravak','Longer stay'],
    'ui.top':['Vrh stranice','End of page'],'ui.arrived':['stigli ste','you have arrived'],
    'ui.sending':['Šaljemo…','Sending…'],'ui.ok':['Hvala. Poruka je stigla — javljamo se u roku od 24 sata.','Thank you. Your message has arrived — we will reply within 24 hours.'],'ui.fail':['Slanje nije uspelo — pozovite nas:','Sending failed — please call us:'],'ui.news':['Newsletter uskoro.','Newsletter coming soon.'],
    'ui.booked':['zauzeto','booked'],'ui.prevm':['Prethodni mesec','Previous month'],'ui.nextm':['Sledeći mesec','Next month'],'ui.pickdates':['Izaberite datum dolaska pa odlaska','Choose arrival, then departure date'],
    'ui.minn':['Najkraći boravak je {n} noći.','Minimum stay is {n} nights.'],'ui.notfree':['U tom periodu ima zauzetih noći. Izaberite drugi odlazak.','Some nights in that period are booked. Choose another departure.'],
    'ui.needdates':['Izaberite datum dolaska i odlaska.','Choose arrival and departure dates.'],'ui.needroom':['Izaberite smeštaj.','Choose a room.'],
    'ui.from':['od','from'],'ui.night':['noć','night'],'ui.upto':['do','up to'],'ui.guests':['gostiju','guests'],'ui.toosmall':['premalo za vaš broj gostiju','too small for your party'],'ui.person':['osobi','person'],
    'ui.dates':['Datumi','Dates'],'ui.nights':['Noći','Nights'],'ui.guestsL':['Gosti','Guests'],'ui.package':['Paket','Package'],'ui.long':['Duži boravak −15%','Longer stay −15%'],'ui.summary':['Vaš boravak','Your stay'],'ui.total':['Ukupno','Total'],'ui.payhotel':['Plaćanje u hotelu, pri dolasku. Ništa se ne naplaćuje unapred.','Payment at the hotel on arrival. Nothing is charged in advance.']
  };
  Object.assign(L.dict, U);
};
L.ui();
return L;
}
})
