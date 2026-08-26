import { env } from 'cloudflare:workers';
import { INDEX_HTML } from './generated-html';
import { PORTFOLIO_PDF_BASE64 } from './generated-pdf';

export const dynamic = 'force-static';

const cloudflareEnv = env as unknown as {
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/assets/')) {
    return cloudflareEnv.ASSETS?.fetch(request) ?? new Response('Asset not found', { status: 404 });
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