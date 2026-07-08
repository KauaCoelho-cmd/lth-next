import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import crypto from 'crypto';
import { keyDeliveryEmail } from '@/lib/email-templates';

const SECRET = process.env.HX_SECRET!;
const HOTTOK = process.env.HOTMART_HOTTOK!;

function generateKey(email: string, plan: 'monthly' | 'annual'): string {
  const days = plan === 'annual' ? 366 : 33;
  const ex = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  const payload = JSON.stringify({ e: email, ex, pl: plan, id });
  const b64 = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(b64).digest('hex').slice(0, 24);
  return `HX-${b64}.${sig}`;
}

async function sendLicenseEmail(email: string, licenseKey: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const tpl = keyDeliveryEmail(licenseKey);

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'Hunter X <suporte@hunterx.site>',
    to: email,
    subject: tpl.subject,
    html: tpl.html,
  });
}

export async function POST(req: NextRequest) {
  const hottok = req.headers.get('x-hotmart-hottok');
  if (!HOTTOK || hottok !== HOTTOK) {
    console.warn('[webhook/hotmart] hottok inválido:', hottok);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const event = body?.event ?? body?.hottopic;
  const status = body?.data?.purchase?.status ?? body?.data?.status;

  if (event !== 'PURCHASE_APPROVED' && status !== 'APPROVED') {
    return NextResponse.json({ ok: true, ignored: true, event });
  }

  const email: string =
    body?.data?.buyer?.email ??
    body?.data?.purchase?.buyer?.email ??
    '';

  if (!email) {
    console.error('[webhook/hotmart] email não encontrado:', JSON.stringify(body));
    return NextResponse.json({ error: 'email not found' }, { status: 400 });
  }

  const offerCode: string = body?.data?.purchase?.offer?.code ?? '';
  const price: number = body?.data?.purchase?.price?.value ?? 0;
  const plan: 'monthly' | 'annual' =
    offerCode === '8yp00f2l' || price >= 150 ? 'annual' : 'monthly';

  const txId: string = body?.data?.purchase?.transaction ?? crypto.randomUUID();
  const existingKey = await kv.get(`hx:tx:${txId}`);
  if (existingKey) {
    console.log('[webhook/hotmart] transação já processada:', txId);
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const licenseKey = generateKey(email, plan);
  const payload = JSON.parse(
    Buffer.from(licenseKey.split('.')[0].replace('HX-', ''), 'base64url').toString()
  );

  const record = {
    key: licenseKey,
    email,
    plan,
    expiresAt: payload.ex,
    createdAt: new Date().toISOString(),
    source: 'hotmart',
    transaction: txId,
    revoked: false,
  };

  await kv.hset(`hx:key:${payload.id}`, record);
  await kv.zadd('hx:keys', { score: Date.now(), member: payload.id });
  await kv.set(`hx:tx:${txId}`, payload.id, { ex: 60 * 60 * 24 * 400 });

  try {
    await sendLicenseEmail(email, licenseKey);
  } catch (err) {
    console.error('[webhook/hotmart] erro ao enviar email:', err);
  }

  console.log(`[webhook/hotmart] chave gerada para ${email} (${plan}) tx:${txId}`);
  return NextResponse.json({ ok: true, plan, email });
}
