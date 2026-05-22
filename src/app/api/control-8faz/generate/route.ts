import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import crypto from 'crypto';

const SECRET = process.env.HX_SECRET!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

function generateKey(email: string, plan: 'monthly' | 'annual', daysOverride?: number): string {
  const days = daysOverride ?? (plan === 'annual' ? 366 : 33);
  const ex = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  const payload = JSON.stringify({ e: email, ex, pl: plan, id });
  const b64 = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(b64).digest('hex').slice(0, 24);
  return `HX-${b64}.${sig}`;
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('x-admin-password');
  if (!auth || auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { email, plan, days } = body;

  if (!email || !plan) {
    return NextResponse.json({ error: 'email e plan são obrigatórios' }, { status: 400 });
  }

  const generatedKey = generateKey(email, plan, days);
  const payload = JSON.parse(Buffer.from(generatedKey.split('.')[0].replace('HX-', ''), 'base64url').toString());

  const record = {
    key: generatedKey,
    email,
    plan,
    expiresAt: payload.ex,
    createdAt: new Date().toISOString(),
    source: 'admin',
    revoked: false,
  };

  // Salva no KV
  await kv.hset(`hx:key:${payload.id}`, record);
  await kv.zadd('hx:keys', { score: Date.now(), member: payload.id });

  return NextResponse.json(record);
}
