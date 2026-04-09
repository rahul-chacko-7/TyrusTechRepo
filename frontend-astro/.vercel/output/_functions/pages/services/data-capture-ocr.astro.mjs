/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import { $ as $$DefaultLayout } from '../../chunks/DefaultLayout_CMofUINJ.mjs';
export { renderers } from '../../renderers.mjs';

const $$DataCaptureOcr = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Data Capture & OCR Services | Tyrus Technologies";
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": pageTitle, "description": "Data capture and OCR from scanned documents in India. We extract key fields from images using OCR/ICR and verification for accurate structured data." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12"> <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
Services · Data Capture &amp; OCR
</p> <h1 class="mt-2 text-3xl font-semibold text-slate-900">
Data capture &amp; OCR from scanned documents.
</h1> <p class="mt-3 max-w-3xl text-sm text-slate-700">
We turn scanned images into accurate, structured data that your EMR, ERP or core systems can use.
        Using OCR, ICR and manual verification, we capture the key fields your teams rely on every day.
</p> </div> </section> <section class="bg-slate-50 border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-[1.2fr,1fr]"> <div class="space-y-4"> <h2 class="text-xl font-semibold text-slate-900">What we capture.</h2> <ul class="space-y-2 text-sm text-slate-800"> <li>• Patient demographics, visit details and key clinical fields.</li> <li>• KYC data, account numbers and loan‑related information.</li> <li>• Contract parties, dates, values and critical clauses.</li> <li>• Invoice numbers, dates, GST and line‑item amounts.</li> <li>• Custom fields defined with your business teams.</li> </ul> </div> <div class="space-y-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200"> <h3 class="text-sm font-semibold text-slate-900">How we ensure accuracy</h3> <ul class="mt-2 space-y-2 text-sm text-slate-800"> <li>• OCR / ICR tuned for your document types and fonts.</li> <li>• Double‑key or sample‑based manual verification.</li> <li>• Validation rules and look‑ups against master data.</li> <li>• Exception queues for unclear or missing values.</li> </ul> </div> </div> </section> <section class="bg-white border-b border-slate-200"> <div class="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2"> <div class="space-y-3"> <h2 class="text-xl font-semibold text-slate-900">Outputs ready for your systems.</h2> <p class="text-sm text-slate-800">
We deliver captured data in formats that are easy to load into your existing platforms.
</p> <ul class="mt-2 space-y-2 text-sm text-slate-800"> <li>• CSV and Excel files with clear headers.</li> <li>• JSON or XML for direct API‑based integration.</li> <li>• Batch‑wise data sets linked to image filenames.</li> <li>• Simple dashboards to track capture status and error rates.</li> </ul> </div> <div class="space-y-3 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"> <h3 class="text-sm font-semibold text-slate-900">Where this helps most</h3> <ul class="space-y-2 text-sm text-slate-800"> <li>• Speeding up claims processing and reconciliations.</li> <li>• Reducing manual data entry in operations teams.</li> <li>• Improving reporting and analytics based on scanned documents.</li> </ul> </div> </div> </section> <section class="bg-slate-50"> <div class="mx-auto max-w-6xl px-4 pb-16"> <div class="rounded-3xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-slate-100 p-8 ring-1 ring-emerald-200"> <h2 class="text-xl font-semibold text-slate-900">
Turn your scanned images into usable data.
</h2> <p class="mt-2 text-sm text-slate-700">
Share sample documents and required fields. We will design a capture approach, run a pilot
          and show you accuracy and throughput before full rollout.
</p> <div class="mt-4 flex flex-wrap gap-3"> <a href="/contact" class="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-700">
Talk to our team
</a> <a href="/#cost-calculator" class="rounded-full border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
Get an estimate
</a> </div> </div> </div> </section> ` })}`;
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/services/data-capture-ocr.astro", void 0);

const $$file = "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/services/data-capture-ocr.astro";
const $$url = "/services/data-capture-ocr";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DataCaptureOcr,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
