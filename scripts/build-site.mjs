import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const serverDir = path.join(dist, "server");
const indexPath = path.join(root, "index.html");
const assetsPath = path.join(root, "assets");

const assetMap = new Map([
  ["assets/animation/不羁视频.mp4", "assets/animation/free-spirit.mp4"],
  ["assets/animation/粉色怪表情视频.mp4", "assets/animation/pink-expression.mp4"],
  ["assets/animation/滑雪视频.mp4", "assets/animation/skiing.mp4"],
  ["assets/animation/开屏打招呼-新版.mp4", "assets/animation/opening-new.mp4"],
  ["assets/animation/压腿视频.mp4", "assets/animation/stretching.mp4"],
  ["assets/animation/办公视频.mp4", "assets/animation/office.mp4"],
  ["assets/IP/不羁.png", "assets/ip/free-spirit.png"],
  ["assets/IP/办公.png", "assets/ip/office.png"],
  ["assets/IP/看手机-透明.png", "assets/ip/phone-transparent.png"],
  ["assets/IP/俏皮.png", "assets/ip/playful.png"],
  ["assets/IP/运动.png", "assets/ip/sport.png"],
  ["assets/IP/transparent/俏皮.png", "assets/ip/transparent/playful.png"],
  ["assets/IP/transparent/滑雪.png", "assets/ip/transparent/skiing.png"]
]);

let indexHtml = await readFile(indexPath, "utf8");

for (const [from, to] of assetMap) {
  indexHtml = indexHtml.split(from).join(to);
}

await rm(dist, { recursive: true, force: true });
await mkdir(serverDir, { recursive: true });
await writeFile(path.join(dist, "index.html"), indexHtml);

if (existsSync(assetsPath)) {
  for (const [from, to] of assetMap) {
    const source = path.join(root, ...from.split("/"));
    const target = path.join(dist, ...to.split("/"));
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(source, target);
  }
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

