/* empty css                         */
import { f as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML } from './astro/server_BcL2CQ5Y.mjs';
import 'piccolore';
import { $ as $$BlogPostLayout } from './BlogPostLayout_BsCLzVit.mjs';

const html = () => "<p>Modern organizations generate thousands of pages of documents every month — medical records, KYC forms,\r\nloan files, legal contracts, HR documents, and more. When this information is trapped on paper, it\r\nslows down operations and increases risk.</p>\n<p>Digitization converts these files into structured, searchable digital archives. With the right\r\nworkflows, you gain faster access to information, better compliance, and clear cost savings on\r\nstorage and logistics.</p>";

				const frontmatter = {"layout":"../../layouts/BlogPostLayout.astro","title":"Benefits of document digitization for Indian organizations","date":"2026-03-10T00:00:00.000Z","category":"document digitization","excerpt":"Learn how document digitization reduces risk, saves space, and improves retrieval speeds across hospitals, banks, government, and enterprises in India.","seoTitle":"Benefits of document digitization in India","seoDescription":"A practical guide to document digitization benefits for hospitals, banks, government departments, legal firms, and enterprises across India.","image":"https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"};
				const file = "C:/Users/iouring/Downloads/TyrusTechRepo-main/frontend-astro/src/pages/posts/benefits-of-document-digitization.md";
				const url = "/posts/benefits-of-document-digitization";
				function rawContent() {
					return "   \r\n                                          \r\n                                                                 \r\n                \r\n                               \r\n                                                                                                                                                                \r\n                                                    \r\n                                                                                                                                                            \r\n                                                                         \r\n   \r\n\r\nModern organizations generate thousands of pages of documents every month — medical records, KYC forms,\r\nloan files, legal contracts, HR documents, and more. When this information is trapped on paper, it\r\nslows down operations and increases risk.\r\n\r\nDigitization converts these files into structured, searchable digital archives. With the right\r\nworkflows, you gain faster access to information, better compliance, and clear cost savings on\r\nstorage and logistics.\r\n\r\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$BlogPostLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_0 as _ };
