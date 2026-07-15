# AGENTS.md

## What this is

Static HTML restaurant website (single page). No build system, no framework. Based on BootstrapMade "Yummy" template. Uses `http-server` for local development.

## Entry point

`index.html` — the only page. Navigation is anchor-based (#hero, #about, #menu, #catering, #chefs, #gallery, #contact, #book-a-table).

## Toolchain

No lint, test, build, typecheck, or format commands. `package.json` exists only for `http-server` dev dependency. Run `npm run start` to serve locally (auto-opens browser). All third-party libraries are vendored in `public/vendor/`.

## Key directories

- `public/css/main.css` — custom styles (~1,720 lines)
- `public/js/main.js` — custom JS (160 lines)
- `public/js/form-handler.js` — form AJAX submission via Resend API
- `public/vendor/` — vendored Bootstrap, AOS, Swiper, FSLightbox, PureCounter, Bootstrap Icons
- `public/img/` — all images (heavily image-heavy, ~4.6 MB)
- `forms/` — PHP form handlers backed by Resend API (see below)

## Lightbox

FSLightbox (`public/vendor/fslightbox/fslightbox.js`) — zero-config, no init code. Self-initializes by scanning `data-fslightbox` attributes on page load. Three gallery groups:
- `data-fslightbox="videos"` — YouTube watch URLs (auto-detected)
- `data-fslightbox="menu"` — menu item images
- `data-fslightbox="gallery"` — gallery carousel images

## Button system

Bootstrap-style naming in `public/css/main.css`:
- `.btn` — base: pill shape (50px radius), 15px font, letter-spacing, transition
- `.btn-pri` — primary CTA: accent orange bg, dark text, box-shadow
- `.btn-sec` — secondary: semi-transparent white bg (used on dark sections)
- Responsive: `.btn` shrinks at `max-width: 768px`
- Specialized buttons kept independent: `.btn-watch-video`, `.pulsating-play-btn`, `.scroll-top`

## Known issues

- **Forms require Resend setup**: `forms/contact.php` and `forms/book-a-table.php` call the Resend API via cURL. Requires a Resend account, verified domain, API key, and config in `forms/config.php` (gitignored). See `ai/update.md` for setup instructions.
- **Google Fonts** load from Google Fonts CDN (Roboto, Amatic SC).

## Conventions

- All dependencies are vendored (committed to `public/vendor/`). Do not add npm/yarn dependencies beyond dev tooling.
- CSS custom properties in `main.css` control theming.
- Business: Patinodyira restaurant, Philadelphia Harare, Zimbabwe. Contact: info@patinodyira.co.zw
