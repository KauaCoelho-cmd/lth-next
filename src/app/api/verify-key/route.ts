import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import crypto from "crypto";

const SECRET = process.env.HX_SECRET!;

export async function POST(req: NextRequest) {
  const { key } = await req.json();
  if (!key || !key.startsWith("HX-")) {
    return NextResponse.json({ valid: false, reason: "invalid_format" });
  }

  try {
    const [b64, sig] = key.replace("HX-", "").split(".");
    const expectedSig = crypto.createHmac("sha256", SECRET).update(b64).digest("hex").slice(0, 24);
    if (sig !== expectedSig) {
      return NextResponse.json({ valid: false, reason: "invalid_signature" });
    }

    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());
    const { id, ex } = payload;

    // Verifica expiração
    if (new Date(ex) < new Date()) {
      return NextResponse.json({ valid: false, reason: "expired" });
    }

    // Verifica revogação no KV
    const record = await kv.hgetall(`hx:key:${id}`);
    if (record && record.revoked === true) {
      return NextResponse.json({ valid: false, reason: "revoked" });
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false, reason: "parse_error" });
  }
}
