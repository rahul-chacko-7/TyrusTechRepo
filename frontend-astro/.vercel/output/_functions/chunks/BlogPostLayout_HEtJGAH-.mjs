import { f as createComponent, k as renderComponent, r as renderTemplate, e as createAstro, m as maybeRenderHead, h as addAttribute, v as renderSlot } from './astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import { $ as $$DefaultLayout } from './DefaultLayout_CMofUINJ.mjs';

const $$Astro = createAstro("https://tyrustech.com");
const $$BlogPostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPostLayout;
  const { frontmatter, url } = Astro2.props;
  const pageTitle = frontmatter.seoTitle ?? frontmatter.title;
  const pageDescription = frontmatter.seoDescription ?? frontmatter.excerpt ?? "";
  const image = frontmatter.image ?? "/favicon.svg";
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": pageTitle, "description": pageDescription, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-slate-950 border-b border-slate-800"> <div class="mx-auto max-w-5xl px-4 py-14 space-y-8"> <div class="space-y-3"> <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300"> ${frontmatter.category ?? "Insight"} </p> <h1 class="text-3xl font-semibold text-slate-50"> ${frontmatter.title} </h1> ${frontmatter.excerpt && renderTemplate`<p class="max-w-2xl text-sm text-slate-300"> ${frontmatter.excerpt} </p>`} <p class="text-xs text-slate-400"> ${frontmatter.date && new Date(frontmatter.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })} </p> </div> <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"> ${frontmatter.image ? renderTemplate`<img${addAttribute(frontmatter.image, "src")}${addAttribute(frontmatter.title, "alt")} class="h-56 w-full object-cover sm:h-72" loading="lazy">` : renderTemplate`<div class="h-40 w-full bg-gradient-to-r from-emerald-500/30 via-sky-500/20 to-slate-900"></div>`} </div> </div> </section> <section class="bg-slate-950"> <div class="mx-auto max-w-3xl px-4 pb-16"> <article class="prose prose-sm prose-invert prose-emerald max-w-none"> ${renderSlot($$result2, $$slots["default"])} </article> </div> </section> ` })}`;
}, "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/layouts/BlogPostLayout.astro", void 0);

export { $$BlogPostLayout as $ };
