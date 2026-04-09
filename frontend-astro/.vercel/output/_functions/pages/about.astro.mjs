/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import { $ as $$DefaultLayout } from '../chunks/DefaultLayout_BkZA-3Ga.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "About Tyrus Technologies Pvt Ltd | Document Digitization Company in India";
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": pageTitle, "description": "Learn about Tyrus Technologies Pvt Ltd, a document digitization and document management company helping organizations across India move from paper-heavy operations to secure digital records." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12"> <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
About
</p> <h1 class="mt-2 text-3xl font-semibold text-slate-900">
About Tyrus Technologies Pvt Ltd.
</h1> <p class="mt-3 max-w-3xl text-sm text-slate-700">
Tyrus Technologies scans your paper files.
        We convert them into digital files you can find easily.
        We help your team store and manage documents safely.
</p> </div> </section> <section class="bg-slate-50 border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-[1.2fr,1fr]"> <div class="space-y-4"> <h2 class="text-xl font-semibold text-slate-900">Our story.</h2> <p class="text-sm text-slate-700">
Since 2009, our team has worked with hospitals, banks, government departments, legal firms,
          manufacturers and educational institutions to digitize critical records. Over the years we have
          built deep experience in managing sensitive documents and large‑volume archives.
</p> <p class="text-sm text-slate-700">
We combine proven processes, trained teams and secure infrastructure to deliver projects that
          are reliable, predictable and easy for your operations teams to work with.
</p> </div> <div class="space-y-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200"> <h3 class="text-sm font-semibold text-slate-900">At a glance</h3> <dl class="mt-2 space-y-2 text-sm text-slate-800"> <div class="flex justify-between"> <dt>Years of experience</dt> <dd class="font-semibold text-emerald-700">13+ years</dd> </div> <div class="flex justify-between"> <dt>Customers</dt> <dd class="font-semibold text-emerald-700">250+ organizations</dd> </div> <div class="flex justify-between"> <dt>Pages scanned</dt> <dd class="font-semibold text-emerald-700">10+ billion pages</dd> </div> </dl> </div> </div> </section> <section class="bg-white border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2"> <div class="space-y-3"> <h2 class="text-xl font-semibold text-slate-900">What we believe in.</h2> <ul class="space-y-2 text-sm text-slate-800"> <li>• Clear, simple communication with our customers.</li> <li>• Respect for the sensitivity of the records we handle.</li> <li>• Practical solutions that fit real‑world budgets and timelines.</li> </ul> </div> <div class="space-y-3 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"> <h3 class="text-sm font-semibold text-slate-900">Who we work with</h3> <p class="text-sm text-slate-700">
We work with operations, IT, and compliance teams.
          We help them convert paper files into digital files.
          We make it easy to store and find documents.
</p> </div> </div> </section> <section class="bg-slate-50"> <div class="mx-auto max-w-6xl px-4 pb-16"> <div class="rounded-3xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-slate-100 p-8 ring-1 ring-emerald-200"> <h2 class="text-xl font-semibold text-slate-900">
Let’s plan your paper-to-digital work.
</h2> <p class="mt-2 text-sm text-slate-700">
If you are exploring ways to reduce paper, free up space and improve access to records, our
          team can share examples from similar customers.
          We will suggest a practical first step.
</p> <div class="mt-4 flex flex-wrap gap-3"> <a href="/contact" class="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-700">
Talk to us
</a> <a href="/#cost-calculator" class="rounded-full border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
Get price
</a> </div> </div> </div> </section> ` })}`;
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/about.astro", void 0);

const $$file = "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
