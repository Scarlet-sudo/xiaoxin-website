import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const appDir = path.join(root, 'app');

const assetMap = new Map([
  ['assets/animation/不羁视频.mp4', '/assets/animation/free-spirit.mp4'],
  ['assets/animation/粉色怪表情视频.mp4', '/assets/animation/pink-expression.mp4'],
  ['assets/animation/滑雪视频.mp4', '/assets/animation/skiing.mp4'],
  ['assets/animation/开屏打招呼-新版.mp4', '/assets/animation/opening-new.mp4'],
  ['assets/animation/压腿视频.mp4', '/assets/animation/stretching.mp4'],
  ['assets/animation/办公视频.mp4', '/assets/animation/office.mp4'],
  ['assets/IP/不羁.png', '/assets/ip/free-spirit.png'],
  ['assets/IP/办公.png', '/assets/ip/office.png'],
  ['assets/IP/看手机-透明.png', '/assets/ip/phone-transparent.png'],
  ['assets/IP/俏皮.png', '/assets/ip/playful.png'],
  ['assets/IP/运动.png', '/assets/ip/sport.png'],
  ['assets/IP/transparent/俏皮.png', '/assets/ip/transparent/playful.png'],
  ['assets/IP/transparent/滑雪.png', '/assets/ip/transparent/skiing.png'],
]);

let html = await readFile(path.join(root, 'index.html'), 'utf8');

for (const [from, to] of assetMap) {
  html = html.split(from).join(to);
}

await rm(path.join(publicDir, 'assets'), { recursive: true, force: true });

for (const [from, to] of assetMap) {
  const source = path.join(root, ...from.split('/'));
  const target = path.join(publicDir, ...to.slice(1).split('/'));
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(source, target);
}

await mkdir(appDir, { recursive: true });
await writeFile(
  path.join(appDir, 'generated-html.ts'),
  `export const INDEX_HTML = ${JSON.stringify(html)};\n`,
  'utf8'
);
