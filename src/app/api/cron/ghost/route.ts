import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import { ghostEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  // Vercel Cron manda esse header automaticamente
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Waitlist com score (timestamp de entrada)
  const waitlist = (await kv.zrange("hx:waitlist", 0, -1, { withScores: true })) as (string | number)[];

  // Emails que já têm chave (compraram)
  const keyIds = (await kv.zrange("hx:keys", 0, -1)) as string[];
  const paidEmails = new Set<string>();
  for (const id of keyIds) {
    const rec = (await kv.hgetall(`hx:key:${id}`)) as Record<string, unknown> | null;
    if (rec?.email) paidEmails.add(String(rec.email).toLowerCase());
  }

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  const sent: string[] = [];

  // waitlist vem como [email, score, email, score, ...]
  for (let i = 0; i < waitlist.length; i += 2) {
    const email = String(waitlist[i]).toLowerCase();
    const joinedAt = Number(waitlist[i + 1]);

    // Só quem entrou há mais de 24h e menos de 7 dias
    if (now - joinedAt < DAY || now - joinedAt > 7 * DAY) continue;
    // Já pagou → pula
    if (paidEmails.has(email)) continue;
    // Já recebeu o fantasma → pula (envia uma vez só)
    const already = await kv.get(`hx:ghost:${email}`);
    if (already) continue;

    const tpl = ghostEmail(process.env.PAYMENT_LINK!);
    try {
      await resend.emails.send({
        from: "Hunter X <suporte@hunterx.site>",
        to: email,
        subject: tpl.subject,
        html: tpl.html,
      });
      await kv.set(`hx:ghost:${email}`, new Date().toISOString(), { ex: 60 * 60 * 24 * 30 });
      sent.push(email);
    } catch (err) {
      console.error(`[cron/ghost] falha ao enviar para ${email}:`, err);
    }
  }

  return NextResponse.json({ ok: true, sent: sent.length, emails: sent });
}
