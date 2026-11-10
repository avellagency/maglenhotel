# Maglen — planinski hotel & spa

Statički sajt (HTML/CSS/JS), radi na GitHub Pages bez build koraka.

## Objava
1. Napravi repo i otpremi sadržaj ovog foldera u koren.
2. Settings → Pages → Source: `Deploy from a branch`, grana `main`, folder `/ (root)`.
3. Sajt je na `https://<korisnik>.github.io/<repo>/`.

## Šta menjati
- `main.js`, vrh fajla: `CONFIG` (telefon, e-mail, adresa, WhatsApp, Instagram), `WEB3FORMS_KEY` (umesto `OVDE_KLJUC`, ključ sa web3forms.com), `ROOMS`, `PRICES`, `EXTRAS`, `MIN_NIGHTS`, `BOOKED_DATES`.
- `i18n.js`: svi tekstovi, format `ključ: [srpski, engleski]`.
- `img/`: lokalne kopije fotografija; koriste se automatski ako Unsplash ne učita sliku.
- `_build/`: generator stranica (GitHub Pages ga ignoriše).
