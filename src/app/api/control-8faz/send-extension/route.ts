import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { keyDeliveryEmail } from '@/lib/email-templates';

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export async function POST(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
  const auth = req.headers.get('x-admin-password');
  if (!auth || auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, licenseKey } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'email é obrigatório' }, { status: 400 });
  }

  const tpl = keyDeliveryEmail(licenseKey || 'Chave não fornecida');
  const { error } = await getResend().emails.send({
    from: process.env.EMAIL_FROM ?? 'Hunter X <suporte@hunterx.site>',
    to: email,
    subject: tpl.subject,
    html: tpl.html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
