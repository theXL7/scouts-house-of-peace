import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
import { pathToFileURL } from "node:url";

const contentTypes = { ".html": "text/html; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".pdf": "application/pdf", ".mp4": "video/mp4" };

// Local-only production preview; serve the same exported bytes crawlers receive.
export function createExportServer(directory = "out", basePath = "") {
  const root = resolve(directory);
  if (!existsSync(resolve(root, "index.html"))) throw new Error(`Build first: missing ${root}/index.html`);
  return createServer((req, res) => {
    if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405); res.end(); return; }
    let url, pathname;
    try {
      url = new URL(req.url, "http://localhost");
      pathname = decodeURIComponent(url.pathname);
    } catch { res.writeHead(400); res.end(); return; }
    if (basePath && !pathname.startsWith(`${basePath}/`)) { res.writeHead(404); res.end(); return; }
    let file = resolve(root, `.${pathname.slice(basePath.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) { res.writeHead(403); res.end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!url.pathname.endsWith("/")) { res.writeHead(308, { Location: `${url.pathname}/${url.search}` }); res.end(); return; }
      file = resolve(file, "index.html");
    }
    const status = existsSync(file) && statSync(file).isFile() ? 200 : 404;
    if (status === 404) file = resolve(root, "404.html");
    res.writeHead(status, { "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream" });
    if (req.method === "HEAD" || !existsSync(file)) { res.end(); return; }
    createReadStream(file).pipe(res);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT ?? process.argv[2] ?? 3010);
  createExportServer(process.env.EXPORT_DIR ?? "out", process.env.NEXT_PUBLIC_BASE_PATH ?? "").listen(port, "127.0.0.1", () => console.log(`Static export: http://127.0.0.1:${port}`));
}
