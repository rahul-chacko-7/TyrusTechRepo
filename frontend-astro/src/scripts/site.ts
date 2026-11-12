/**
 * Site-wide lead tracking:
 *  - stores first-touch and latest-touch attribution (UTM, gclid, landing page, referrer)
 *  - sends GA4 events for call / WhatsApp / email clicks and lead form submits
 *  - submits every [data-lead-form] to /api/proposal
 */
type Attribution = Record<string, string>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    tyrus?: {
      getAttribution: () => { first: Attribution; latest: Attribution };
      trackLead: (formId: string, extra?: Record<string, unknown>) => void;
    };
  }
}

const FIRST_KEY = 'tyrus_first_touch';
const LATEST_KEY = 'tyrus_latest_touch';
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid'];

function readStore(storage: Storage | undefined, key: string): Attribution {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function writeStore(storage: Storage | undefined, key: string, value: Attribution) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: ignore */
  }
}

function safeStorage(kind: 'local' | 'session'): Storage | undefined {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return undefined;
  }
}

function captureAttribution() {
  const url = new URL(window.location.href);
  const touch: Attribution = {};
  for (const key of PARAMS) {
    const value = url.searchParams.get(key);
    if (value) touch[key] = value.slice(0, 200);
  }
  const referrer = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : '';
  const local = safeStorage('local');
  const session = safeStorage('session');

  if (!Object.keys(readStore(local, FIRST_KEY)).length) {
    writeStore(local, FIRST_KEY, {
      ...touch,
      landing_page: url.pathname,
      referrer: referrer.slice(0, 300),
      first_seen: new Date().toISOString()
    });
  }
  if (Object.keys(touch).length || referrer || !Object.keys(readStore(session, LATEST_KEY)).length) {
    writeStore(session, LATEST_KEY, {
      ...touch,
      landing_page: url.pathname,
      referrer: referrer.slice(0, 300)
    });
  }
}

function getAttribution() {
  return {
    first: readStore(safeStorage('local'), FIRST_KEY),
    latest: readStore(safeStorage('session'), LATEST_KEY)
  };
}

function gaEvent(name: string, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.('event', name, { page_path: window.location.pathname, ...params });
  } catch {
    /* analytics blocked: ignore */
  }
}

function trackLead(formId: string, extra: Record<string, unknown> = {}) {
  gaEvent('generate_lead', { form_id: formId, currency: 'INR', ...extra });
}

function linkLocation(el: Element): string {
  if (el.closest('[data-sticky-cta]')) return 'sticky_bar';
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (el.closest('form')) return 'form';
  return 'content';
}

function wireClickTracking() {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as Element | null;
      const link = target?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      let method = '';
      if (href.startsWith('tel:')) method = 'phone';
      else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) method = 'whatsapp';
      else if (href.startsWith('mailto:')) method = 'email';
      if (method) {
        gaEvent('contact_click', { method, link_location: linkLocation(link) });
        return;
      }
      if (href.includes('#cost-calculator') || link.hasAttribute('data-track-cta')) {
        gaEvent('cta_click', { cta: link.textContent?.trim().slice(0, 60) || href, link_location: linkLocation(link) });
      }
    },
    { capture: true }
  );
}

const startedAt = Date.now();

function wireLeadForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
    let started = false;
    form.addEventListener('focusin', () => {
      if (started) return;
      started = true;
      gaEvent('form_start', { form_id: form.id });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const errorEl = form.querySelector<HTMLElement>('[data-lead-error]');
      const successEl = form.querySelector<HTMLElement>('[data-lead-success]');
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

      if (errorEl) errorEl.textContent = '';
      const email = (data.email || '').trim();
      const phone = (data.phone || '').replace(/[^\d+]/g, '');
      if (!data.name?.trim()) return void (errorEl && (errorEl.textContent = 'Please enter your name.'));
      if (phone.replace(/\D/g, '').length < 8) return void (errorEl && (errorEl.textContent = 'Please enter a valid phone number.'));
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return void (errorEl && (errorEl.textContent = 'Please enter a valid email address.'));

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }

      try {
        const response = await fetch('/api/proposal', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email,
            phone: data.phone,
            company: data.company,
            city: data.city,
            pages: Number(data.pages || 0) || 0,
            message: [form.dataset.context, data.message].filter(Boolean).join(' — '),
            website: data.website,
            elapsedMs: Date.now() - startedAt,
            source: { page: window.location.pathname, formId: form.id, title: document.title },
            attribution: getAttribution()
          })
        });
        if (!response.ok) throw new Error(String(response.status));
        trackLead(form.id, { pages: Number(data.pages || 0) || 0 });
        form.reset();
        if (successEl) {
          successEl.textContent = 'Thank you — your request is with our team. We will call you back within one working day. Need it sooner? WhatsApp us using the button below.';
          successEl.classList.remove('hidden');
        }
      } catch {
        if (errorEl) errorEl.textContent = 'Sorry, we could not send that. Please call or WhatsApp us and we will help straight away.';
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = 'Get my quote';
        }
      }
    });
  });
}

captureAttribution();
wireClickTracking();
wireLeadForms();
window.tyrus = { getAttribution, trackLead };
