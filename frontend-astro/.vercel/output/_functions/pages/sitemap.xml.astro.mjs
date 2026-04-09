import { _ as __vite_glob_0_0 } from '../chunks/benefits-of-document-digitization_B_PRAb4w.mjs';
import { _ as __vite_glob_0_1 } from '../chunks/government-archive-digitization-checklist_C48QXoQ9.mjs';
import { _ as __vite_glob_0_2 } from '../chunks/how-to-estimate-digitization-costs_CII7HPkw.mjs';
import { _ as __vite_glob_0_3 } from '../chunks/medical-record-digitization-guide_wk3fbuEQ.mjs';
import { _ as __vite_glob_0_4 } from '../chunks/secure-document-scanning-for-banks_erNjzvYh.mjs';
export { renderers } from '../renderers.mjs';

const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/case-studies",
  "/contact",
  "/industries",
  "/services",
  "/industries/healthcare",
  "/industries/banking-finance",
  "/industries/government",
  "/industries/legal",
  "/industries/education",
  "/industries/manufacturing",
  "/services/document-scanning",
  "/services/document-digitization",
  "/services/data-capture-ocr",
  "/services/digital-archives",
  "/services/medical-record-scanning",
  "/services/legal-document-scanning",
  "/services/hr-document-digitization"
];
const postModules = /* #__PURE__ */ Object.assign({"./posts/benefits-of-document-digitization.md": __vite_glob_0_0,"./posts/government-archive-digitization-checklist.md": __vite_glob_0_1,"./posts/how-to-estimate-digitization-costs.md": __vite_glob_0_2,"./posts/medical-record-digitization-guide.md": __vite_glob_0_3,"./posts/secure-document-scanning-for-banks.md": __vite_glob_0_4});
const postRoutes = Object.keys(postModules).map(
  (filePath) => filePath.replace("./posts/", "/posts/").replace(".md", "")
);
const allRoutes = [...staticRoutes, ...postRoutes];
const siteUrl = "https://tyrustech.com";
function GET() {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const urls = allRoutes.map((path) => `<url><loc>${siteUrl}${path}</loc><lastmod>${now}</lastmod></url>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
