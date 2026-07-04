import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import crypto from "crypto";

const HX_SECRET = process.env.HX_SECRET!;

function verifyKey(keyStr: string): { id: string; ex: string } | null {
  if (!keyStr?.startsWith("HX-")) return null;
  const inner = keyStr.slice(3);
  const dot = inner.lastIndexOf(".");
  if (dot === -1) return null;
  const b64 = inner.slice(0, dot);
  const sig = inner.slice(dot + 1);
  const expected = crypto.createHmac("sha256", HX_SECRET).update(b64).digest("hex").slice(0, 24);
  if (expected !== sig) return null;
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());
    if (!payload.ex || new Date(payload.ex) < new Date()) return null;
    return { id: payload.id, ex: payload.ex };
  } catch {
    return null;
  }
}

// POST /api/sitescope/device — registra ou valida dispositivo
export async function POST(req: NextRequest) {
  const { licenseKey, deviceId } = await req.json();
  if (!licenseKey || !deviceId) {
    return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
  }

  const verified = verifyKey(licenseKey);
  if (!verified) {
    return NextResponse.json({ ok: false, reason: "invalid_key" }, { status: 403 });
  }

  const kvKey = `hx:sitescope:device:${verified.id}`;
  const stored = await kv.get<string>(kvKey);

  if (!stored) {
    // Primeiro acesso — registra esse dispositivo
    await kv.set(kvKey, deviceId);
    return NextResponse.json({ ok: true, registered: true });
  }

  if (stored === deviceId) {
    // Mesmo dispositivo — ok
    return NextResponse.json({ ok: true, registered: false });
  }

  // Dispositivo diferente — bloqueado
  return NextResponse.json({ ok: false, reason: "device_mismatch" }, { status: 403 });
}

// DELETE /api/sitescope/device — admin reseta o dispositivo vinculado
export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (!auth || auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { licenseKey } = await req.json();
  const verified = verifyKey(licenseKey);
  if (!verified) return NextResponse.json({ error: "invalid_key" }, { status: 400 });
  await kv.del(`hx:sitescope:device:${verified.id}`);
  return NextResponse.json({ ok: true });
}
