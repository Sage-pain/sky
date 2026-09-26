'use strict';

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ROOT = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: []
    }
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

app.use(express.json({ limit: '20kb', strict: true }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again later.' }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Optional server-side inquiry endpoint. This demo deliberately does not persist customer data.
app.post('/api/order-inquiry', apiLimiter, (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const product = typeof body.product === 'string' ? body.product.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (product.length < 2 || product.length > 120) {
    return res.status(400).json({ error: 'Invalid product.' });
  }
  if (message.length > 800) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  return res.status(200).json({ ok: true, received: true });
});

app.use(express.static(ROOT, {
  extensions: ['html'],
  maxAge: '1h',
  index: 'index.html'
}));

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Sky Mobile Shop listening on port ${PORT}`);
});
