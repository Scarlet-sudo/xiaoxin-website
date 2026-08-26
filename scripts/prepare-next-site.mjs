import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const appDir = path.join(root, 'app');

const assets = [
  { html: 'assets/animation/不羁视频.mp4', source: 'assets/animation/不羁视频.mp4', target: '/assets/animation/free-spirit.mp4' },
  { html: 'assets/animation/粉色怪表情视频.mp4', source: 'assets/animation/粉色怪表情视频.mp4', target: '/assets/animation/pink-expression.mp4' },
  { html: 'assets/animation/滑雪视频.mp4', source: 'assets/animation/滑雪视频.mp4', target: '/assets/animation/skiing.mp4' },
  { html: 'assets/animation/开屏打招呼-剪辑.mp4', source: 'assets/animation/开屏打招呼-剪辑.mp4', target: '/assets/animation/opening-new.mp4' },
  { html: 'assets/animation/压腿视频.mp4', source: 'assets/animation/压腿视频.mp4', target: '/assets/animation/stretching.mp4' },
  { html: 'assets/animation/办公视频.mp4', source: 'assets/animation/办公视频.mp4', target: '/assets/animation/office.mp4' },
  { html: 'assets/IP/不羁.png', source: 'assets/processed/ip/free-spirit.png', target: '/assets/ip/free-spirit.png' },
  { html: 'assets/IP/办公.png', source: 'assets/processed/ip/office.png', target: '/assets/ip/office.png' },
  { html: 'assets/IP/看手机-透明.png', source: 'assets/processed/ip/phone-transparent.png', target: '/assets/ip/phone-transparent.png' },
  { html: 'assets/IP/俏皮.png', source: 'assets/processed/ip/playful.png', target: '/assets/ip/playful.png' },
  { html: 'assets/IP/运动.png', source: 'assets/processed/ip/sport.png', target: '/assets/ip/sport.png' },
  { html: 'assets/IP/transparent/俏皮.png', source: 'assets/processed/ip/transparent/playful.png', target: '/assets/ip/transparent/playful.png' },
  { html: 'assets/IP/transparent/滑雪.png', source: 'assets/processed/ip/transparent/skiing.png', target: '/assets/ip/transparent/skiing.png' },
];

let html = await readFile(path.join(root, 'index.html'), 'utf8');

for (const asset of assets) {
  html = html.split(asset.html).join(asset.target);
}

await rm(path.join(publicDir, 'assets'), { recursive: true, force: true });

for (const asset of assets) {
  const source = path.join(root, ...asset.source.split('/'));
  const target = path.join(publicDir, ...asset.target.slice(1).split('/'));
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(source, target);
}

await mkdir(appDir, { recursive: true });
await writeFile(
  path.join(appDir, 'generated-html.ts'),
  `export const INDEX_HTML = ${JSON.stringify(html)};\n`,
  'utf8'
);

