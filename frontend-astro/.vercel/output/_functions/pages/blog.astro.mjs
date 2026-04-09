/* empty css                                 */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import { $ as $$DefaultLayout } from '../chunks/DefaultLayout_BkZA-3Ga.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tyrustech.com");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const pageTitle = "Document Digitization Blog | Tyrus Technologies";
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./posts/benefits-of-document-digitization.md": () => import('../chunks/benefits-of-document-digitization_B_PRAb4w.mjs').then(n => n._),"./posts/government-archive-digitization-checklist.md": () => import('../chunks/government-archive-digitization-checklist_C48QXoQ9.mjs').then(n => n._),"./posts/how-to-estimate-digitization-costs.md": () => import('../chunks/how-to-estimate-digitization-costs_CII7HPkw.mjs').then(n => n._),"./posts/medical-record-digitization-guide.md": () => import('../chunks/medical-record-digitization-guide_wk3fbuEQ.mjs').then(n => n._),"./posts/secure-document-scanning-for-banks.md": () => import('../chunks/secure-document-scanning-for-banks_erNjzvYh.mjs').then(n => n._)}), () => "./posts/*.md");
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": pageTitle, "description": "Blog articles on document digitization, secure scanning, medical record digitization, banking KYC projects and archive digitization in India." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-slate-950"> <div class="mx-auto max-w-5xl px-4 py-16"> <header class="mb-8 space-y-3 text-center md:text-left"> <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Insights</p> <h1 class="text-3xl font-semibold text-slate-50">
Document digitization & paperless operations.
</h1> <p class="mx-auto max-w-2xl text-sm text-slate-300">
Practical guides on document scanning, handling sensitive records securely, and building
          sustainable, paperless workflows for Indian organizations.
</p> </header> <div class="grid gap-5 md:grid-cols-2"> ${posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()).map((post) => renderTemplate`<article class="flex flex-col overflow-hidden rounded-2xl bg-slate-950/80 ring-1 ring-slate-800"> <a${addAttribute(post.url, "href")} class="block"> ${post.frontmatter.image ? renderTemplate`<img${addAttribute(post.frontmatter.image, "src")}${addAttribute(post.frontmatter.title, "alt")} class="h-40 w-full object-cover" loading="lazy">` : renderTemplate`<div class="h-32 w-full bg-gradient-to-r from-emerald-500/40 via-sky-500/30 to-slate-900"></div>`} </a> <div class="flex flex-1 flex-col p-5"> <p class="text-xs uppercase tracking-wide text-emerald-300"> ${post.frontmatter.category} </p> <a${addAttribute(post.url, "href")} class="mt-2 text-sm font-semibold text-slate-50 hover:text-emerald-200"> ${post.frontmatter.title} </a> <p class="mt-2 flex-1 text-xs text-slate-300"> ${post.frontmatter.excerpt} </p> <p class="mt-3 text-xs text-slate-500"> ${new Date(post.frontmatter.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })} </p> </div> </article>`)} </div> </div> </section> ` })}`;
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/blog.astro", void 0);

const $$file = "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
