import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CwBTqSeC.mjs';
import { manifest } from './manifest_ByqC3KRK.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/proposal.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/case-studies.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/industries/banking-finance.astro.mjs');
const _page7 = () => import('./pages/industries/education.astro.mjs');
const _page8 = () => import('./pages/industries/government.astro.mjs');
const _page9 = () => import('./pages/industries/healthcare.astro.mjs');
const _page10 = () => import('./pages/industries/legal.astro.mjs');
const _page11 = () => import('./pages/industries/manufacturing.astro.mjs');
const _page12 = () => import('./pages/industries.astro.mjs');
const _page13 = () => import('./pages/posts/benefits-of-document-digitization.astro.mjs');
const _page14 = () => import('./pages/posts/government-archive-digitization-checklist.astro.mjs');
const _page15 = () => import('./pages/posts/how-to-estimate-digitization-costs.astro.mjs');
const _page16 = () => import('./pages/posts/medical-record-digitization-guide.astro.mjs');
const _page17 = () => import('./pages/posts/secure-document-scanning-for-banks.astro.mjs');
const _page18 = () => import('./pages/services/data-capture-ocr.astro.mjs');
const _page19 = () => import('./pages/services/digital-archives.astro.mjs');
const _page20 = () => import('./pages/services/document-digitization.astro.mjs');
const _page21 = () => import('./pages/services/document-scanning.astro.mjs');
const _page22 = () => import('./pages/services/hr-document-digitization.astro.mjs');
const _page23 = () => import('./pages/services/legal-document-scanning.astro.mjs');
const _page24 = () => import('./pages/services/medical-record-scanning.astro.mjs');
const _page25 = () => import('./pages/services.astro.mjs');
const _page26 = () => import('./pages/sitemap_index.xml.astro.mjs');
const _page27 = () => import('./pages/sitemap.xml.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/proposal.ts", _page2],
    ["src/pages/blog.astro", _page3],
    ["src/pages/case-studies/index.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/industries/banking-finance.astro", _page6],
    ["src/pages/industries/education.astro", _page7],
    ["src/pages/industries/government.astro", _page8],
    ["src/pages/industries/healthcare.astro", _page9],
    ["src/pages/industries/legal.astro", _page10],
    ["src/pages/industries/manufacturing.astro", _page11],
    ["src/pages/industries/index.astro", _page12],
    ["src/pages/posts/benefits-of-document-digitization.md", _page13],
    ["src/pages/posts/government-archive-digitization-checklist.md", _page14],
    ["src/pages/posts/how-to-estimate-digitization-costs.md", _page15],
    ["src/pages/posts/medical-record-digitization-guide.md", _page16],
    ["src/pages/posts/secure-document-scanning-for-banks.md", _page17],
    ["src/pages/services/data-capture-ocr.astro", _page18],
    ["src/pages/services/digital-archives.astro", _page19],
    ["src/pages/services/document-digitization.astro", _page20],
    ["src/pages/services/document-scanning.astro", _page21],
    ["src/pages/services/hr-document-digitization.astro", _page22],
    ["src/pages/services/legal-document-scanning.astro", _page23],
    ["src/pages/services/medical-record-scanning.astro", _page24],
    ["src/pages/services/index.astro", _page25],
    ["src/pages/sitemap_index.xml.ts", _page26],
    ["src/pages/sitemap.xml.ts", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e19f8f60-623b-4e4c-838b-422af92f39c3",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
