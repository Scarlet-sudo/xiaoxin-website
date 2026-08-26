import { INDEX_HTML } from './generated-html';

export const dynamic = 'force-static';

export function GET() {
  return new Response(INDEX_HTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  });
}
