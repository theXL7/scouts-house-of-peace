import assert from "node:assert/strict";
import { test, after } from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createExportServer } from "./serve-export.mjs";

// Read the real TypeScript content fixtures without adding a test/transpiler stack.
function sourceLoader(env = process.env) {
  const cache = new Map();
  function load(name) {
    let file = resolve(name);
    if (existsSync(join(file, "index.ts"))) file = join(file, "index.ts");
    if (!existsSync(file)) file += ".ts";
    if (cache.has(file)) return cache.get(file).exports;
    const loadedModule = { exports: {} };
    cache.set(file, loadedModule);
    const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const require = (specifier) => load(specifier.startsWith("@/") ? specifier.slice(2) : resolve(dirname(file), specifier));
    vm.runInNewContext(code, { module: loadedModule, exports: loadedModule.exports, require, process: { env }, URL, Intl, Date }, { filename: file });
    return loadedModule.exports;
  }
  return load;
}
const load = sourceLoader();
const { activityItems, activityCategories, getProgramCategoryUrl, getActivityStatus } = load("lib/activities.ts");
const { activityArchiveEntries, activityArchiveYears, getLocalizedActivityArchiveEntry } = load("lib/activity-archive.ts");
const { getMessages, getLocalePath } = load("messages/index.ts");
const { getPageUrl, getAbsoluteUrl, serializeJsonLd } = load("lib/seo.ts");
const locales = ["en", "fr", "ar"];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const server = process.env.CRAWL_BASE_URL ? null : createExportServer(process.env.EXPORT_DIR ?? "out", basePath);
if (server) await new Promise((done) => server.listen(0, "127.0.0.1", done));
const origin = process.env.CRAWL_BASE_URL ?? `http://127.0.0.1:${server.address().port}`;
after(() => { server?.closeAllConnections(); server?.close(); });

const decode = (text) => text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, code) => code.startsWith("#") ? String.fromCodePoint(Number.parseInt(code.slice(code[1].toLowerCase() === "x" ? 2 : 1), code[1].toLowerCase() === "x" ? 16 : 10)) : ({ amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " })[code.toLowerCase()]);
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)(?:="([^"]*)"|='([^']*)'|=([^\s>]+))?/g)].slice(1).map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4] ?? "")]));

const parsedDocuments = new Map();
function parse(html) {
  if (parsedDocuments.has(html)) return parsedDocuments.get(html);
  // These are not readable content. In particular, never pass because a phrase
  // appeared only in Next's serialized props or an empty Suspense template.
  const markup = html.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  const text = normalize(decode(markup.replace(/<[^>]*>/g, " ")));
  const tags = [...markup.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)].map((match) => ({ tag: match[1], ...attrs(match[0]) }));
  const jsonLd = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => JSON.parse(match[1]));
  const element = (tag) => [...markup.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "g"))].map((match) => normalize(decode(match[1].replace(/<[^>]*>/g, " "))));
  const doc = { markup, text, tags, jsonLd, element };
  parsedDocuments.set(html, doc);
  return doc;
}

const paths = locales.flatMap((locale) => [
  ...["home", "programs", "join-us", "scouting-culture"].map((page) => ({ locale, page, url: getPageUrl(page, locale) })),
  ...activityCategories.map((category) => ({ locale, category, page: "category", url: getAbsoluteUrl(getProgramCategoryUrl(category, locale)) })),
  ...activityArchiveYears.map((year) => ({ locale, year, page: "archive", url: getAbsoluteUrl(getLocalePath(locale, `/programs/archive/${year}/`)) })),
]);
const docs = new Map();
// Bounded requests keep the same test usable against an explicitly chosen server.
for (const route of paths) {
  const pathname = new URL(route.url).pathname;
  const response = await fetch(`${origin}${pathname}`, { redirect: "manual" });
  docs.set(pathname, { response, html: await response.text(), route });
}

for (const [pathname, { response, html, route }] of docs) {
  test(`${pathname}: HTTP, semantic HTML, metadata and language alternates`, () => {
    assert.equal(response.status, 200, `Indexable URL must not redirect: ${pathname}`);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/i);
    const doc = parse(html);
    assert.equal(doc.element("title").length, 1);
    assert.ok(doc.element("title")[0].length > 20);
    assert.equal(doc.element("h1").length, 1);
    assert.ok(doc.element("h1")[0].length > 4);
    assert.equal(doc.tags.filter((tag) => tag.tag === "main").length, 1);
    assert.equal(doc.tags.find((tag) => tag.tag === "html").lang, route.locale);
    assert.equal(doc.tags.find((tag) => tag.tag === "html").dir, route.locale === "ar" ? "rtl" : "ltr");
    assert.equal(doc.tags.find((tag) => tag.rel === "canonical")?.href, route.url);
    assert.ok(doc.tags.find((tag) => tag.name === "description")?.content.length > 40);
    assert.doesNotMatch(doc.tags.find((tag) => tag.name === "robots")?.content ?? "", /noindex/);
    for (const key of ["title", "description", "url", "image", "type"]) assert.ok(doc.tags.find((tag) => tag.property === `og:${key}`)?.content, `og:${key}`);
    assert.equal(doc.tags.find((tag) => tag.property === "og:url").content, route.url);
    assert.ok(doc.tags.find((tag) => tag.name === "twitter:card"));
    for (const language of [...locales, "x-default"]) {
      const alternate = doc.tags.find((tag) => tag.rel === "alternate" && tag.hreflang === language);
      assert.ok(alternate, `hreflang ${language}`);
      const target = docs.get(new URL(alternate.href).pathname);
      assert.ok(target, `Missing alternate ${alternate.href}`);
      assert.equal(target.route.locale, language === "x-default" ? "ar" : language);
      assert.ok(parse(target.html).tags.some((tag) => tag.rel === "alternate" && tag.hreflang === route.locale && tag.href === route.url), "Reciprocal hreflang");
    }
    assert.ok(doc.text.includes("contact@scoutsmaisonpaix.org"));
    for (const img of doc.tags.filter((tag) => tag.tag === "img")) assert.ok("alt" in img, "Missing image alt");
    assert.ok(doc.jsonLd.length > 0, "Parseable JSON-LD");
  });
}

for (const locale of locales) {
  const get = (page) => parse(docs.get(new URL(getPageUrl(page, locale)).pathname).html);
  test(`${locale}: identity and authoritative impact statistics`, () => {
    const doc = get("home");
    const copy = getMessages(locale);
    assert.ok(doc.text.includes("Scouts Maison de La Paix"));
    assert.ok(doc.text.includes(normalize(copy.houseOfPeace.intro)));
    for (const stat of copy.impact.stats) {
      assert.ok(doc.text.includes(normalize(new Intl.NumberFormat(locale).format(stat.value))), `${stat.value} is text, not only an attribute`);
      assert.ok(doc.text.includes(normalize(stat.label)));
      assert.ok(doc.tags.some((tag) => tag["data-impact-value"] === `${stat.value}${stat.suffix}`));
    }
    assert.ok(doc.jsonLd.some((item) => item["@type"] === "Organization"));
    assert.ok(doc.jsonLd.some((item) => item["@type"] === "WebSite"));
  });
  test(`${locale}: every activity and original archive report is initial HTML`, () => {
    const doc = get("programs");
    const cards = doc.tags.filter((tag) => tag.tag === "article" && tag["data-activity-id"] && tag.id === tag["data-activity-id"]);
    assert.equal(cards.length, activityItems.length);
    for (const item of activityItems) {
      for (const field of ["title", "shortDescription", "dateLabel", "location"]) if (item[field]) assert.ok(doc.text.includes(normalize(item[field][locale])), `${item.id}: ${field}`);
      assert.ok(cards.some((tag) => tag["data-activity-id"] === item.id && !("hidden" in tag)));
    }
    for (const entry of activityArchiveEntries) {
      assert.ok(doc.text.includes(normalize(getLocalizedActivityArchiveEntry(entry, locale).title)), entry.id);
      for (const detail of entry.details) assert.ok(doc.text.includes(normalize(detail)), `${entry.id}: original report`);
    }
  });
  test(`${locale}: registration fees, documents, and every FAQ answer are text`, () => {
    const doc = get("join-us");
    const faq = getMessages(locale).joinPage.faq;
    assert.match(doc.text, /60/);
    assert.match(doc.text, /260/);
    for (const item of faq.items) assert.ok(doc.text.includes(normalize(item.answer)), item.question);
    const schema = doc.jsonLd.find((item) => item["@type"] === "FAQPage");
    assert.equal(schema.mainEntity.length, faq.items.length);
    for (const item of schema.mainEntity) assert.ok(doc.text.includes(normalize(item.acceptedAnswer.text)));
    assert.equal(doc.tags.filter((tag) => tag.tag === "details" && tag.name === "join-faq").length, faq.items.length);
    const form = doc.tags.find((tag) => tag.tag === "form");
    assert.equal(form.method, "post");
    assert.match(form.action, /^mailto:/);
  });
  test(`${locale}: culture sections and all four stage detail panels are HTML`, () => {
    const doc = get("scouting-culture");
    for (const id of ["stages", "groups", "naming", "rituals", "songs", "philosophy"]) assert.ok(doc.tags.some((tag) => tag.id === id));
    assert.equal(doc.tags.filter((tag) => tag.tag === "section" && tag.id?.startsWith("stage-") && !("hidden" in tag)).length, 4);
    assert.ok(doc.text.length > 12000);
  });
}

test("Sitemap exactly matches public canonical pages, with unique titles and descriptions", async () => {
  const response = await fetch(`${origin}${basePath}/sitemap.xml`);
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
  assert.deepEqual(urls.sort(), paths.map((path) => path.url).sort());
  assert.equal(new Set(urls).size, urls.length);
  assert.doesNotMatch(xml, /<lastmod>/, "Do not report build time as editorial modification time");
  const titles = [...docs.values()].map(({ html }) => parse(html).element("title")[0]);
  const descriptions = [...docs.values()].map(({ html }) => parse(html).tags.find((tag) => tag.name === "description").content);
  assert.equal(new Set(titles).size, paths.length);
  assert.equal(new Set(descriptions).size, paths.length);
});

test("Every internal link and fragment resolves; sitemap pages have incoming HTML links", () => {
  const inbound = new Set();
  for (const [pathname, { html }] of docs) {
    for (const tag of parse(html).tags.filter((tag) => tag.tag === "a" && tag.href)) {
      const url = new URL(tag.href, getAbsoluteUrl(pathname));
      if (url.origin !== new URL(getAbsoluteUrl("/")).origin) continue;
      const key = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
      const target = docs.get(url.pathname) ?? docs.get(key);
      if (target) {
        inbound.add(target.route.url);
        if (url.hash) assert.ok(parse(target.html).tags.some((element) => element.id === decodeURIComponent(url.hash.slice(1))), `${pathname} -> missing ${url.pathname}${url.hash}`);
      } else {
        assert.ok(existsSync(join(process.env.EXPORT_DIR ?? "out", decodeURIComponent(url.pathname).slice(basePath.length))), `${pathname} -> broken ${url.pathname}`);
      }
    }
  }
  for (const { url } of paths) assert.ok(inbound.has(url), `Orphan page ${url}`);
});

test("robots.txt allows search/retrieval and keeps GPTBot training opt-out", async () => {
  const response = await fetch(`${origin}${basePath}/robots.txt`);
  assert.equal(response.status, 200);
  const robots = await response.text();
  for (const agent of ["*", "Googlebot", "OAI-SearchBot", "Google-Extended"]) assert.ok(robots.toLowerCase().includes(`user-agent: ${agent}`.toLowerCase()));
  const groups = robots.toLowerCase().split(/\n\s*\n/);
  for (const agent of ["*", "googlebot", "oai-searchbot", "google-extended"]) {
    const group = groups.find((group) => group.split("\n").some((line) => line.trim() === `user-agent: ${agent}`));
    assert.ok(group?.includes("allow: /"));
    assert.ok(!group.includes("disallow: /"));
  }
  assert.match(robots, /User-Agent: GPTBot\s+Disallow: \//i);
  assert.ok(robots.includes(`Sitemap: ${getAbsoluteUrl("/sitemap.xml")}`));
});

test("Legacy query URLs remain readable and canonicalize to the clean Programs URL", async () => {
  const response = await fetch(`${origin}${basePath}/programs/?category=camps`);
  assert.equal(response.status, 200);
  const doc = parse(await response.text());
  assert.equal(doc.tags.find((tag) => tag.rel === "canonical").href, getPageUrl("programs", "en"));
  for (const item of activityItems) assert.ok(doc.text.includes(normalize(item.title.en)));
});

test("Preview builds stay nonindexable; structured data escapes script delimiters; dates are stable", () => {
  const preview = sourceLoader({ ...process.env, VERCEL_ENV: "preview" });
  assert.equal(preview("lib/seo.ts").getRobotsMetadata().index, false);
  assert.equal(preview("app/robots.ts").default().rules.disallow, "/");
  assert.equal(preview("app/sitemap.ts").default().length, 0);
  const serialized = serializeJsonLd({ text: "</script><p>Example</p>" });
  assert.ok(!serialized.includes("<"));
  assert.equal(JSON.parse(serialized).text, "</script><p>Example</p>");
  const activity = { startDate: "2026-09-05", endDate: "2026-09-06" };
  assert.equal(getActivityStatus(activity, "2026-09-04"), "upcoming");
  assert.equal(getActivityStatus(activity, "2026-09-06"), "happening");
  assert.equal(getActivityStatus(activity, "2026-09-07"), "completed");
});

test("Unknown URLs return 404 rather than a successful empty shell", async () => {
  for (const path of ["/programs/missing-category/", "/programs/archive/1900/", "/missing-page/"]) {
    assert.equal((await fetch(`${origin}${basePath}${path}`)).status, 404);
  }
});
