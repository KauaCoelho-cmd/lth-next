import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import { welcomeEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, country } = await req.json();
  if (!email) return NextResponse.json({ error: "email obrigatório" }, { status: 400 });

  const entry = { email, country: country || "BR", createdAt: new Date().toISOString() };

  await kv.hset(`hx:waitlist:${email}`, entry);
  await kv.zadd("hx:waitlist", { score: Date.now(), member: email });

  const tpl = welcomeEmail(process.env.PAYMENT_LINK!);
  await resend.emails.send({
    from: "Hunter X <suporte@hunterx.site>",
    to: email,
    subject: tpl.subject,
    html: tpl.html,
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (!auth || auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const emails = await kv.zrange("hx:waitlist", 0, -1);
  const entries = await Promise.all(
    emails.map(email => kv.hgetall(`hx:waitlist:${email}`))
  );

  const byCountry: Record<string, number> = {};
  entries.forEach((e: Record<string, unknown> | null) => {
    if (e?.country) {
      const c = e.country as string;
      byCountry[c] = (byCountry[c] || 0) + 1;
    }
  });

  return NextResponse.json({ total: emails.length, byCountry, entries });
}
