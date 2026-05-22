import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

const EXTENSION_URL = 'https://hunterx.site/hunter-x.zip';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('x-admin-password');
  if (!auth || auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, licenseKey } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'email é obrigatório' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'Hunter X <onboarding@resend.dev>',
    to: email,
    subject: '🎯 Sua extensão Hunter X está pronta!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-block;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:999px;padding:8px 20px;">
                <span style="font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a78bfa;">◉ HUNTER X · EXTENSÃO CHROME</span>
              </div>
            </td>
          </tr>

          <!-- Card principal -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 32px;">

              <h1 style="margin:0 0 8px;font-size:28px;font-weight:900;color:#fff;letter-spacing:-0.5px;">
                Sua extensão está pronta! 🎯
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#71717a;line-height:1.6;">
                Baixe e instale o Hunter X no seu Chrome agora.
              </p>

              <!-- Botão download -->
              <a href="${EXTENSION_URL}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:12px;margin-bottom:28px;">
                ⬇️ Baixar Extensão Hunter X
              </a>

              <!-- Chave de licença -->
              ${licenseKey ? `
              <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0 0 6px;font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#71717a;">Sua chave de licença</p>
                <p style="margin:0;font-family:monospace;font-size:12px;color:#a78bfa;word-break:break-all;">${licenseKey}</p>
              </div>
              ` : ''}

              <!-- Instruções -->
              <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#e2e8f0;">Como instalar:</p>
                <table cellpadding="0" cellspacing="0" width="100%">
                  ${[
                    '1. Baixe o arquivo <strong style="color:#fff">.zip</strong> acima',
                    '2. Extraia a pasta no seu computador',
                    '3. Abra o Chrome → <strong style="color:#fff">chrome://extensions</strong>',
                    '4. Ative o <strong style="color:#fff">Modo desenvolvedor</strong> (canto superior direito)',
                    '5. Clique em <strong style="color:#fff">Carregar sem compactação</strong>',
                    '6. Selecione a pasta extraída',
                    '7. Acesse a Biblioteca do Meta e ative o Hunter X!',
                  ].map(step => `
                  <tr>
                    <td style="padding:4px 0;">
                      <p style="margin:0;font-size:13px;color:#71717a;line-height:1.5;">${step}</p>
                    </td>
                  </tr>`).join('')}
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#3f3f46;">
                Hunter X · hunterx.site · Dúvidas? Responda este email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
