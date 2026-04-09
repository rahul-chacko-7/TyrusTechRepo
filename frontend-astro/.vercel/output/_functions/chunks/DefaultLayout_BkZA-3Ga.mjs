import { f as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, e as createAstro, v as renderSlot, k as renderComponent, w as renderHead } from './astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                                     */

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "What we do" },
    { href: "/industries", label: "Who we help" },
    { href: "/case-studies", label: "Our work" },
    { href: "/blog", label: "Guides" },
    { href: "/contact", label: "Contact" }
  ];
  const email = "corporatesales@tyrustech.com";
  const whatsappLink = "https://wa.me/919742065852";
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur"> <div class="mx-auto max-w-6xl px-4 py-3"> <div class="flex items-center justify-between gap-3"> <a href="/" class="flex items-center gap-3"> <img src="/favicon.svg" alt="Tyrus Technologies Pvt Ltd" width="40" height="40" fetchpriority="high" class="h-8 w-8 object-contain" loading="eager" decoding="async"> <div class="hidden flex-col leading-tight sm:flex"> <span class="text-sm font-semibold tracking-tight text-slate-900">\nTyrus Technologies Pvt Ltd\n</span> <span class="text-xs text-emerald-700">\nDigitize. Secure. Go Green.\n</span> </div> </a> <!-- Desktop nav --> <nav class="hidden items-center gap-6 text-sm text-slate-700 md:flex"> ', " <a", ' class="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"> <span>WhatsApp</span> </a> <a', ' class="text-sm font-semibold text-emerald-700"> ', ' </a> </nav> <!-- Mobile contacts + menu button --> <div class="flex items-center gap-3 md:hidden"> <a', ' class="text-xs font-semibold text-emerald-700"> ', " </a> <a", ' class="text-xs font-semibold text-emerald-700 underline decoration-emerald-500">\nWhatsApp\n</a> <button type="button" class="inline-flex items-center justify-center rounded-md border border-emerald-200 bg-white p-2 text-slate-800 shadow-sm hover:bg-emerald-50" aria-label="Open navigation menu" data-mobile-nav-toggle> <span class="sr-only">Menu</span> <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <!-- Mobile dropdown nav --> <nav class="mt-3 hidden flex-col space-y-1 rounded-2xl border border-emerald-100 bg-white p-3 text-sm text-slate-800 shadow-md md:hidden" data-mobile-nav> ', ` </nav> </div> <script type="module">
    const toggleButton = document.querySelector('[data-mobile-nav-toggle]');
    const mobileNav = document.querySelector('[data-mobile-nav]');

    if (toggleButton && mobileNav) {
      toggleButton.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
      });
    }
  <\/script> </header>`])), maybeRenderHead(), navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="transition-colors hover:text-emerald-700"> ${item.label} </a>`), addAttribute(whatsappLink, "href"), addAttribute(`mailto:${email}`, "href"), email, addAttribute(`mailto:${email}`, "href"), email, addAttribute(whatsappLink, "href"), navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="block w-full rounded-lg px-3 py-2 text-left hover:bg-emerald-50 hover:text-emerald-700"> ${item.label} </a>`));
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/components/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://tyrustech.com");
const $$DefaultLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DefaultLayout;
  const {
    title = "Document Digitization Services India | Go Green & Secure",
    description = "Document digitization services across India with secure handling of sensitive data, sustainability-focused workflows, and high-speed scanning.",
    image = "/favicon.svg"
  } = Astro2.props;
  const siteUrl = (Astro2.site?.toString() || "https://tyrustech.com").replace(/\/$/, "");
  const canonicalUrl = new URL(Astro2.url.pathname, siteUrl).toString();
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', '</title><meta name="description"', '><link rel="canonical"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', `><script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tyrus Technologies Pvt Ltd',
        url: siteUrl,
        logo: image,
        description
      })}
    </script>`, '</head> <body class="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100 text-slate-900"> <div class="flex min-h-screen flex-col"> ', ' <main class="flex-1"> ', ' </main> <footer class="border-t border-emerald-100 bg-white/90"> <div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"> <p>&copy; ', " Digitization Platform. All rights reserved.</p> <p>Digitize. Secure. Go Green.</p> </div> </footer> </div> </body></html>"])), title, addAttribute(description, "content"), addAttribute(canonicalUrl, "href"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), (/* @__PURE__ */ new Date()).getFullYear());
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/layouts/DefaultLayout.astro", void 0);

export { $$DefaultLayout as $ };
