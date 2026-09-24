# Z5 Global Beauty Marketplace

Responsive Astro website for beauty and personal care discovery.

Includes homepage, catalog search and filters, product pages, compare, wishlist, account and affiliate disclosure.

Merchant and affiliate URLs remain placeholders until valid relationships exist.

## Z5 platform roadmap — implemented foundation

Z5 is structured as a global beauty/personal-care discovery marketplace: discovery, comparison and merchant handoff happen on Z5; checkout/orders are out of scope.

### Platform capabilities

1. **Real catalog seeds** — 50+ real product identities across skincare, hair care, body care, fragrance, makeup, grooming and oral care. Prices, ratings and availability remain `pending` until a verified source is connected.
2. **Advanced discovery** — full-text search plus category, audience, merchant and rating filters with sorting.
3. **Member-ready accounts** — browser MVP storage for wishlist, compare and recently viewed, plus a Wix Headless adapter seam for production authentication and persistence.
4. **Wishlist + Compare** — persistent browser storage, compare up to four products, detailed attribute comparison.
5. **Merchant layer** — merchant records, merchant pages, official URLs, markets, affiliate program metadata and readiness status.
6. **Automated ingestion** — optional feed URL/token, normalize → deduplicate → validate → generate `src/data/live-products.ts`, scheduled daily validation, and commit/publish on changes.
7. **Affiliate tracking layer** — product/merchant/campaign/context click events, verified affiliate URL fields, program/network fields, no synthetic tracking URLs.
8. **Analytics** — outbound click dashboard with click totals, unique products and top merchants; designed to migrate to server-side analytics.
9. **Z5 Match** — rules-based matching by category, audience and budget, intentionally avoiding unsupported medical or outcome claims.
10. **Deals + price tracking foundation** — deal page and schema for current/previous price, price history and freshness; live badges depend on verified price history.
11. **Editorial + SEO** — guides, brand pages, category pages, canonical/Open Graph metadata, Product JSON-LD, robots and an expanded sitemap.
12. **Mobile-first UI** — responsive grids, filters, navigation and product gallery.
13. **Admin** — catalog health, merchant/program readiness and analytics entry points.

### Affiliate activation

Affiliate links are **pending by default**. A program must be approved and a real tracking URL supplied before Z5 marks an offer `verified`.

### Production integration

For member auth and member-scoped data, connect the production headless project through the Wix client configuration. Wix documents both Wix-managed member login and custom Headless authentication flows; admin/API-key secrets must stay server-side. See the official Wix Headless authentication docs.

### Build and deployment

GitHub Pages deployment is configured through `.github/workflows/deploy.yml`. The catalog refresh workflow is `.github/workflows/catalog-refresh.yml` and activates the optional live feed when the repository secrets `Z5_CATALOG_FEED_URL` and `Z5_CATALOG_FEED_TOKEN` are configured.

## Deployment

Z5 is configured for GitHub Pages via GitHub Actions. Enable **Settings → Pages → Source → GitHub Actions** once, then each push to `main` deploys the Astro build.
