(() => {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const phoneHref = String(config.phoneHref || '#');
  const phoneDisplay = String(config.phoneDisplay || '');
  const waBase = String(config.whatsappBase || '#');
  const emailHref = String(config.emailHref || '#');

  const products = [
    {name:'iPhone 18 Pro Max', tag:'Newest', type:'phone', copy:'Flagship iPhone with the largest Pro Max format. Ask for current storage, colour and price.'},
    {name:'iPhone 17 Pro', tag:'Pro model', type:'phone', copy:'Pro-level camera and performance in a more compact flagship format.'},
    {name:'iPhone 15', tag:'Value', type:'phone', copy:'A mainstream iPhone option for everyday use, photography and apps.'},
    {name:'iPad', tag:'Tablet', type:'tablet', copy:'Large-screen Apple tablet for streaming, browsing, notes and creative work.'},
    {name:'MacBook', tag:'Laptop', type:'laptop', copy:'Portable Mac notebook for work, study and everyday productivity.'},
    {name:'Apple Watch', tag:'Wearable', type:'watch', copy:'Apple wearable for activity tracking, notifications and everyday convenience.'},
    {name:'AirPods', tag:'Audio', type:'buds', copy:'Wireless Apple audio with easy pairing and hands-free calling.'}
  ];

  function waLink(productName) {
    const msg = `Hi ${config.storeName || 'Sky Mobile Shop'}, I'd like today's price for the ${productName}.`;
    try {
      return `${waBase}?text=${encodeURIComponent(msg)}`;
    } catch {
      return waBase;
    }
  }

  function applyLinks() {
    const map = {
      topCall: phoneHref, heroCall: phoneHref, contactCall: phoneHref,
      footerCall: phoneHref, stickyCall: phoneHref,
      topEmail: emailHref, heroEmail: emailHref, contactEmail: emailHref, footerEmail: emailHref,
      topWhatsApp: waLink('my order'), heroWhatsApp: waLink('my order'),
      contactWhatsApp: waLink('my order'), footerWhatsApp: waLink('my order'),
      stickyWhatsApp: waLink('my order')
    };
    Object.entries(map).forEach(([id, href]) => {
      const el = document.getElementById(id);
      if (el) el.href = href;
    });
    const n = document.getElementById('contactNumber');
    if (n && phoneDisplay) n.textContent = `Call or WhatsApp: ${phoneDisplay}`;
  }

  function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = products.map((p) => `
      <article class="product-card">
        <span class="tag">${escapeHtml(p.tag)}</span>
        <div class="product-visual" aria-hidden="true"><span class="device ${escapeHtml(p.type)}"></span></div>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.copy)}</p>
        <div class="card-spacer"></div>
        <div class="quote">Today's price confirmed on contact</div>
        <div class="card-actions">
          <a class="button button-primary" href="${escapeAttr(phoneHref)}">Call</a>
          <a class="button button-whatsapp" href="${escapeAttr(waLink(p.name))}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </article>
    `).join('');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function escapeAttr(value) { return escapeHtml(value); }

  function setupConsent() {
    const KEY = 'sky-mobile-shop-essential-consent-v1';
    const banner = document.getElementById('cookieBanner');
    const accept = document.getElementById('cookieAccept');
    const dialog = document.getElementById('privacyDialog');
    const privacy = document.getElementById('privacyLink');
    const close = document.getElementById('privacyClose');
    const dialogAccept = document.getElementById('privacyAccept');

    let seen = false;
    try { seen = localStorage.getItem(KEY) === '1'; } catch { /* page remains usable */ }
    if (banner) banner.hidden = seen;

    const save = () => {
      try { localStorage.setItem(KEY, '1'); } catch { /* ignore storage failures */ }
      if (banner) banner.hidden = true;
    };
    accept?.addEventListener('click', save);
    dialogAccept?.addEventListener('click', () => { save(); dialog?.close(); });
    close?.addEventListener('click', () => dialog?.close());
    privacy?.addEventListener('click', (e) => { e.preventDefault(); dialog?.showModal(); });
  }

  document.getElementById('year').textContent = String(new Date().getFullYear());
  renderProducts();
  applyLinks();
  setupConsent();
})();
