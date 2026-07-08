import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import crypto from "crypto";
import { keyDeliveryEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const SECRET = process.env.HX_SECRET!;

function generateKey(email: string, plan: "monthly" | "annual" = "monthly"): { key: string; id: string; expiresAt: string } {
  const days = plan === "annual" ? 366 : 33;
  const ex = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const payload = JSON.stringify({ e: email, ex, pl: plan, id });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(b64).digest("hex").slice(0, 24);
  return { key: `HX-${b64}.${sig}`, id, expiresAt: ex };
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const topic = body.type || body.topic;
  const id = body.data?.id || body.id;

  if (topic !== "payment" || !id) {
    return NextResponse.json({ ok: true });
  }

  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
  });

  if (!mpRes.ok) return NextResponse.json({ error: "mp fetch failed" }, { status: 400 });

  const payment = await mpRes.json();

  if (payment.status !== "approved") {
    return NextResponse.json({ ok: true });
  }

  const email = payment.payer?.email;
  if (!email) return NextResponse.json({ ok: true });

  const existing = await kv.get(`hx:license:payment:${id}`);
  if (existing) return NextResponse.json({ ok: true });

  const { key, id: keyId, expiresAt } = generateKey(email, "monthly");
  await kv.set(`hx:license:payment:${id}`, key);
  await kv.hset(`hx:key:${keyId}`, {
    key,
    email,
    plan: "monthly",
    expiresAt,
    createdAt: new Date().toISOString(),
    source: "mercadopago",
    paymentId: id,
    revoked: false,
  });
  await kv.zadd("hx:keys", { score: Date.now(), member: keyId });

  const tpl = keyDeliveryEmail(key);
  await resend.emails.send({
    from: "Hunter X <suporte@hunterx.site>",
    to: email,
    subject: tpl.subject,
    html: tpl.html,
  });

  return NextResponse.json({ ok: true });
}
