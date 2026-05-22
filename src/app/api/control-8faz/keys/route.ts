import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function GET(req: NextRequest) {
  const auth = req.headers.get('x-admin-password');
  if (!auth || auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Busca os últimos 200 IDs ordenados por data
  const ids = await kv.zrange('hx:keys', 0, 199, { rev: true });

  if (!ids || ids.length === 0) {
    return NextResponse.json({ keys: [] });
  }

  // Busca todos os registros em paralelo
  const records = await Promise.all(
    ids.map((id) => kv.hgetall(`hx:key:${id}`))
  );

  const keys = records.filter(Boolean);

  return NextResponse.json({ keys });
}
