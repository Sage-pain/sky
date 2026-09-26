(() => {
  const banner = document.getElementById('dismiss-banner');
  banner?.addEventListener('click', () => banner.closest('.region-banner')?.remove());

  const searchForm = document.getElementById('help-search');
  const searchInput = document.getElementById('search-input');
  const result = document.getElementById('search-result');
  const cards = [...document.querySelectorAll('.support-card')];

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = searchInput.value.trim().toLowerCase();
    cards.forEach(card => card.removeAttribute('style'));
    if (!q) {
      result.textContent = 'Choose a contact option below.';
      return;
    }
    const match = cards.find(card => (card.dataset.search || '').includes(q));
    if (match) {
      result.textContent = 'We found a support option for your enquiry.';
      match.scrollIntoView({ behavior: 'smooth', block: 'center' });
      match.style.outline = '3px solid rgba(0, 125, 214, .25)';
      setTimeout(() => match.removeAttribute('style'), 1800);
    } else {
      result.textContent = 'For the quickest response, use WhatsApp or call us below.';
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieKey = 'sms-cookie-preference';
  const closeCookies = value => {
    localStorage.setItem(cookieKey, value);
    cookieBanner.hidden = true;
  };
  if (localStorage.getItem(cookieKey)) cookieBanner.hidden = true;
  document.getElementById('accept-cookies')?.addEventListener('click', () => closeCookies('accepted'));
  document.getElementById('reject-cookies')?.addEventListener('click', () => closeCookies('rejected'));
  document.getElementById('cookie-settings')?.addEventListener('click', () => { cookieBanner.hidden = false; });
})();
