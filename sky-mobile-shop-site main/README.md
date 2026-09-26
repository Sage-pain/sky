# Sky Mobile Shop landing page

Standalone product-first landing page for **https://skymobileshop.co.uk/**. It uses the supplied page structure, removes account/sign-in elements and third-party tracking scripts, and provides direct call, WhatsApp and email contact options.

## Contact

- Store: Sky Mobile Shop
- Website: https://skymobileshop.co.uk/
- Email: Info@skymobileshop.co.uk

## Before deployment

1. Edit `public/site-config.js` and replace the placeholder phone/WhatsApp values with the real local number.
2. Run `npm install`.
3. Start with `npm start`.
4. Put HTTPS in front of the Node server in production.

## Security included

- Helmet security headers and CSP.
- Express body-size limits.
- Rate limiting on the optional JSON order-inquiry endpoint.
- Server-side type/length validation.
- `X-Powered-By` disabled.
- No payment details or customer accounts in the page.
- No third-party analytics/tracking scripts.

## SEO

- Canonical URL set to `https://skymobileshop.co.uk/`.
- `robots.txt` and XML sitemap included.
- Store JSON-LD structured data included.
