import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const serverDir = path.join(dist, "server");
const indexPath = path.join(root, "index.html");
const assetsPath = path.join(root, "assets");

const indexHtml = await readFile(indexPath, "utf8");

await rm(dist, { recursive: true, force: true });
await mkdir(serverDir, { recursive: true });
await writeFile(path.join(dist, "index.html"), indexHtml);

if (existsSync(assetsPath)) {
  await cp(assetsPath, path.join(dist, "assets"), { recursive: true });
}

const worker = `
const INDEX_HTML = ${JSON.stringify(indexHtml)};

export default {
  async fetch(request, env) {
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    const url = new URL(request.url);
    if (url.pathname.startsWith("/assets/")) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(INDEX_HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=60"
      }
    });
  }
};
`;

await writeFile(path.join(serverDir, "index.js"), worker.trimStart());
