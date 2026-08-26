import { INDEX_HTML } from './generated-html';
import { SITE_ASSETS } from './generated-assets';
import { PORTFOLIO_PDF_BASE64 } from './generated-pdf';

export const dynamic = 'force-static';

export function GET(request: Request) {
  const url = new URL(request.url);
  const siteAsset = SITE_ASSETS.find(asset => asset.path === url.pathname);

  if (siteAsset) {
    const assetBytes = Uint8Array.from(atob(siteAsset.base64), char => char.charCodeAt(0));
    return new Response(assetBytes, {
      headers: {
        'content-type': siteAsset.contentType,
        'content-length': String(assetBytes.length),
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  }

  if (url.pathname === '/docs/xiaohongshu-ai-shopping-portfolio.pdf') {
    const pdfBytes = Uint8Array.from(atob(PORTFOLIO_PDF_BASE64), char => char.charCodeAt(0));
    return new Response(pdfBytes, {
      headers: {
        'content-type': 'application/pdf',
        'content-length': String(pdfBytes.length),
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  }

  return new Response(INDEX_HTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  });
}