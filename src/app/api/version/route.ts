import { NextResponse } from 'next/server';

// Atualize este número toda vez que lançar uma nova versão da extensão
export const CURRENT_VERSION = '2.2.0';

export async function GET() {
  return NextResponse.json(
    {
      version: CURRENT_VERSION,
      download_url: 'https://hunterx.site/hunter-x.zip',
      update_page: 'https://hunterx.site/download',
      changelog: 'v2.2 — Verificação de licença automática e melhorias de segurança.',
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    }
  );
}
