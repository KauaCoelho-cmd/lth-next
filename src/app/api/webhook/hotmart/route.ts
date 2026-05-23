import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import crypto from 'crypto';

const SECRET = process.env.HX_SECRET!;
const HOTTOK = process.env.HOTMART_HOTTOK!; // token de segurança do webhook da Hotmart
const EXTENSION_URL = 'https://hunterx.site/hunter-x.zip';

// ─── Gera chave de licença (mesma lógica do painel admin) ───────────────────
function generateKey(email: string, plan: 'monthly' | 'annual'): string {
  const days = plan === 'annual' ? 366 : 33;
  const ex = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  const payload = JSON.stringify({ e: email, ex, pl: plan, id });
  const b64 = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(b64).digest('hex').slice(0, 24);
  return `HX-${b64}.${sig}`;
}

// ─── Envia email com a chave ────────────────────────────────────────────────
async function sendLicenseEmail(email: string, licenseKey: string, plan: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const planLabel = plan === 'annual' ? 'Anual (366 dias)' : 'Mensal (33 dias)';

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'Hunter X <onboarding@resend.dev>',
    to: email,
    subject: '🎯 Sua chave Hunter X está pronta!',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td align="center" style="padding-bottom:28px;">
          <div style="display:inline-block;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:999px;padding:8px 20px;">
            <span style="font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a78bfa;">◉ HUNTER X · EXTENSÃO CHROME</span>
          </div>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 32px;">

          <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#fff;">
            Pagamento confirmado! 🎯
          </h1>
          <p style="margin:0 0 6px;font-size:14px;color:#71717a;">
            Plano: <strong style="color:#a78bfa;">${planLabel}</strong>
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#71717a;line-height:1.6;">
            Sua chave de acesso foi gerada automaticamente. Guarde ela em local seguro.
          </p>

          <!-- Chave -->
          <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
            <p style="margin:0 0 8px;font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#71717a;">Sua chave de licença</p>
            <p style="margin:0;font-family:monospace;font-size:13px;color:#a78bfa;word-break:break-all;font-weight:600;">${licenseKey}</p>
          </div>

          <!-- Botão download -->
          <a href="${EXTENSION_URL}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:12px;margin-bottom:28px;">
            ⬇️ Baixar Hunter X
          </a>

          <!-- Instruções -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#e2e8f0;">Como instalar em 1 minuto:</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${[
                '1. Baixe o <strong style="color:#fff">.zip</strong> acima',
                '2. Extraia a pasta no seu computador',
                '3. Abra <strong style="color:#fff">chrome://extensions</strong> no Chrome',
                '4. Ative o <strong style="color:#fff">Modo desenvolvedor</strong> (canto superior direito)',
                '5. Clique em <strong style="color:#fff">Carregar sem compactação</strong>',
                '6. Selecione a pasta extraída',
                '7. Acesse a Biblioteca do Meta → cole sua chave no popup do Hunter X',
              ].map(s => `<tr><td style="padding:3px 0;"><p style="margin:0;font-size:13px;color:#71717a;line-height:1.5;">${s}</p></td></tr>`).join('')}
            </table>
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#3f3f46;">
            Hunter X · hunterx.site · Dúvidas? Responda este email.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

// ─── Webhook handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Valida token de segurança da Hotmart (hottok no header)
  const hottok = req.headers.get('x-hotmart-hottok');
  if (!HOTTOK || hottok !== HOTTOK) {
    console.warn('[webhook/hotmart] hottok inválido:', hottok);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  // 2. Só processa compras aprovadas
  const event = body?.event ?? body?.hottopic;
  const status = body?.data?.purchase?.status ?? body?.data?.status;

  if (event !== 'PURCHASE_APPROVED' && status !== 'APPROVED') {
    // Retorna 200 para Hotmart não retentar, mas não faz nada
    return NextResponse.json({ ok: true, ignored: true, event });
  }

  // 3. Extrai email e plano
  const email: string =
    body?.data?.buyer?.email ??
    body?.data?.purchase?.buyer?.email ??
    '';

  if (!email) {
    console.error('[webhook/hotmart] email não encontrado:', JSON.stringify(body));
    return NextResponse.json({ error: 'email not found' }, { status: 400 });
  }

  // Detecta se é anual pela oferta (offer_code contém o off anual) ou pelo valor
  const offerCode: string = body?.data?.purchase?.offer?.code ?? '';
  const price: number = body?.data?.purchase?.price?.value ?? 0;
  const plan: 'monthly' | 'annual' =
    offerCode === '8yp00f2l' || price >= 150 ? 'annual' : 'monthly';

  // 4. Evita duplicatas (idempotência pelo transaction_id da Hotmart)
  const txId: string = body?.data?.purchase?.transaction ?? crypto.randomUUID();
  const existingKey = await kv.get(`hx:tx:${txId}`);
  if (existingKey) {
    console.log('[webhook/hotmart] transação já processada:', txId);
    return NextResponse.json({ ok: true, duplicate: true });
  }

  // 5. Gera chave
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

  // 6. Salva no KV
  await kv.hset(`hx:key:${payload.id}`, record);
  await kv.zadd('hx:keys', { score: Date.now(), member: payload.id });
  await kv.set(`hx:tx:${txId}`, payload.id, { ex: 60 * 60 * 24 * 400 }); // 400 dias

  // 7. Envia email
  try {
    await sendLicenseEmail(email, licenseKey, plan);
  } catch (err) {
    console.error('[webhook/hotmart] erro ao enviar email:', err);
    // Não retorna erro — chave já foi salva; email pode ser reenvio manual
  }

  console.log(`[webhook/hotmart] chave gerada para ${email} (${plan}) tx:${txId}`);
  return NextResponse.json({ ok: true, plan, email });
}
