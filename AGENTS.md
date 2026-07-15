# AGENTS.md

## What this is

Static HTML restaurant website (single page). No build system, no package manager, no framework. Based on BootstrapMade "Yummy" template.

## Entry point

`index.html` — the only page. Navigation is anchor-based (#hero, #about, #menu, #catering, #chefs, #gallery, #contact, #book-a-table).

## No toolchain

There are no lint, test, build, typecheck, or format commands. No `package.json` exists. All third-party libraries are vendored in `assets/vendor/`.

## Key directories

- `assets/css/main.css` — custom styles (~1,720 lines)
- `assets/js/main.js` — custom JS (168 lines)
- `assets/js/form-handler.js` — form AJAX submission via Resend API
- `assets/vendor/` — vendored Bootstrap, AOS, Swiper, GLightbox, PureCounter, Bootstrap Icons
- `assets/img/` — all images (heavily image-heavy, ~4.6 MB)
- `forms/` — PHP form handlers backed by Resend API (see below)

## Button system

Bootstrap-style naming in `assets/css/main.css`:
- `.btn` — base: pill shape (50px radius), 15px font, letter-spacing, transition
- `.btn-pri` — primary CTA: accent orange bg, dark text, box-shadow
- `.btn-sec` — secondary: semi-transparent white bg (used on dark sections)
- Responsive: `.btn` shrinks at `max-width: 768px`
- Specialized buttons kept independent: `.btn-watch-video`, `.pulsating-play-btn`, `.scroll-top`

## Known issues

- **Forms require Resend setup**: `forms/contact.php` and `forms/book-a-table.php` call the Resend API via cURL. Requires a Resend account, verified domain, API key, and config in `forms/config.php` (gitignored). See `ai/update.md` for setup instructions.
- **Google Fonts restored** in index.html (lines 14–16). Custom fonts (Roboto, Inter, Amatic SC) load from Google Fonts CDN.

## Conventions

- All dependencies are vendored (committed to `assets/vendor/`). Do not add npm/yarn dependencies.
- CSS custom properties in `main.css` control theming.
- Business: Patinodyira restaurant, Philadelphia Harare, Zimbabwe. Contact: info@patinodyira.co.zw
