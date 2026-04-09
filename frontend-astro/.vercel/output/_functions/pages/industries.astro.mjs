/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import { $ as $$DefaultLayout } from '../chunks/DefaultLayout_CMofUINJ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Industries We Serve | Tyrus Technologies";
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": pageTitle, "description": "Document digitization and scanning solutions for healthcare, banking, government, legal, education, manufacturing and corporate enterprises across India." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12"> <h1 class="text-3xl font-semibold text-slate-900">
Industries we serve.
</h1> <p class="mt-3 max-w-3xl text-sm text-slate-700">
Tyrus Technologies supports organizations across healthcare, banking, government, legal, education,
        manufacturing and more. We adapt our digitization workflows to match your regulations and day‑to‑day work.
</p> </div> </section> <section class="bg-slate-50"> <div class="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-2 lg:grid-cols-3"> <a href="/industries/healthcare/" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-emerald-300"> <h2 class="text-sm font-semibold text-slate-900">Healthcare</h2> <p class="mt-2 text-xs text-slate-700">
Medical record digitization for hospitals and clinics—MRD archives, OPD / IPD files and more.
</p> </a> <a href="/industries/banking-finance/" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-emerald-300"> <h2 class="text-sm font-semibold text-slate-900">Banking &amp; Finance</h2> <p class="mt-2 text-xs text-slate-700">
Document scanning for KYC, loan and account files with strong security and tracking.
</p> </a> <a href="/industries/government/" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-emerald-300"> <h2 class="text-sm font-semibold text-slate-900">Government</h2> <p class="mt-2 text-xs text-slate-700">
Digitization of land records, citizen files and department archives for faster citizen services.
</p> </a> <a href="/industries/legal/" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-emerald-300"> <h2 class="text-sm font-semibold text-slate-900">Legal</h2> <p class="mt-2 text-xs text-slate-700">
Case files, contracts and evidence bundles scanned and indexed matter‑wise.
</p> </a> <a href="/industries/education/" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-emerald-300"> <h2 class="text-sm font-semibold text-slate-900">Education</h2> <p class="mt-2 text-xs text-slate-700">
Student records, exam papers and administrative files digitized for universities and schools.
</p> </a> <a href="/industries/manufacturing/" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-emerald-300"> <h2 class="text-sm font-semibold text-slate-900">Manufacturing &amp; Corporate</h2> <p class="mt-2 text-xs text-slate-700">
Digitization of plant records, QC documents, contracts and HR files for large enterprises.
</p> </a> </div> </section> ` })}`;
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/industries/index.astro", void 0);

const $$file = "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/industries/index.astro";
const $$url = "/industries";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
