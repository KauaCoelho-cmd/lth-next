import { NextResponse } from 'next/server';

// Atualize este número toda vez que lançar uma nova versão da extensão
export const CURRENT_VERSION = '2.1.0';

export async function GET() {
  return NextResponse.json(
    {
      version: CURRENT_VERSION,
      download_url: 'https://hunterx.site/hunter-x.zip',
      update_page: 'https://hunterx.site/download',
      changelog: 'Nova versão disponível com melhorias de performance e visual atualizado.',
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    }
  );
}
