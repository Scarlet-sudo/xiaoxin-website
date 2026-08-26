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

const mediaContentTypes = new Map([
  ['.mp4', 'video/mp4'],
  ['.png', 'image/png'],
]);

const publicFiles = [
  {
    source: '小红书搜索链路优化作品集.pdf',
    target: '/docs/xiaohongshu-ai-shopping-portfolio.pdf',
  },
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

for (const file of publicFiles) {
  const source = path.join(root, ...file.source.split('/'));
  const target = path.join(publicDir, ...file.target.slice(1).split('/'));
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(source, target);
}

await mkdir(appDir, { recursive: true });
const portfolioPdf = await readFile(path.join(root, '小红书搜索链路优化作品集.pdf'));
await writeFile(
  path.join(appDir, 'generated-pdf.ts'),
  `export const PORTFOLIO_PDF_BASE64 = ${JSON.stringify(portfolioPdf.toString('base64'))};\n`,
  'utf8'
);

const generatedAssets = [];
for (const asset of assets) {
  const source = path.join(root, ...asset.source.split('/'));
  const bytes = await readFile(source);
  generatedAssets.push({
    path: asset.target,
    contentType: mediaContentTypes.get(path.extname(asset.target)) ?? 'application/octet-stream',
    base64: bytes.toString('base64'),
  });
}
await writeFile(
  path.join(appDir, 'generated-assets.ts'),
  `export const SITE_ASSETS = ${JSON.stringify(generatedAssets)} as const;\n`,
  'utf8'
);
await writeFile(
  path.join(appDir, 'generated-html.ts'),
  `export const INDEX_HTML = ${JSON.stringify(html)};\n`,
  'utf8'
);

