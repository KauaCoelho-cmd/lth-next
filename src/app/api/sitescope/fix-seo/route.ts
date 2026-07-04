import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROMPTS: Record<string, (ctx: string) => string> = {
  title: (ctx) =>
    `Você é um especialista em SEO para landing pages de afiliados brasileiros.
Reescreva o título da página abaixo para ter entre 40–60 caracteres, incluir a palavra-chave principal e ser persuasivo e claro.
Título atual: "${ctx}"
Responda APENAS com o novo título, sem aspas, sem explicação.`,

  description: (ctx) =>
    `Você é um especialista em SEO para landing pages de afiliados brasileiros.
Reescreva a meta description abaixo para ter entre 120–155 caracteres, ser persuasiva, incluir um call-to-action e a palavra-chave principal.
Description atual: "${ctx}"
Responda APENAS com a nova description, sem aspas, sem explicação.`,

  h1: (ctx) =>
    `Você é um especialista em SEO para landing pages de afiliados brasileiros.
Reescreva o H1 abaixo para ser mais persuasivo, claro e otimizado para SEO. Máximo 60 caracteres.
H1 atual: "${ctx}"
Responda APENAS com o novo H1, sem aspas, sem explicação.`,

  og: (_ctx) =>
    `Gere 3 tags Open Graph essenciais para uma landing page de produto digital brasileiro:
og:title (máximo 60 chars), og:description (máximo 155 chars), og:type.
Formato de resposta:
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
Responda APENAS com as 3 tags HTML, sem explicação.`,

  viewport: (_ctx) =>
    `Responda APENAS com essa tag HTML, sem explicação:
<meta name="viewport" content="width=device-width, initial-scale=1" />`,
};

export async function POST(req: NextRequest) {
  try {
    const { type, context } = await req.json();

    if (!type || !PROMPTS[type]) {
      return NextResponse.json({ ok: false, error: "tipo_invalido" }, { status: 400 });
    }

    const prompt = PROMPTS[type](context || "");

    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content[0].type === "text" ? msg.content[0].text.trim() : "";
    return NextResponse.json({ ok: true, suggestion: text });
  } catch (err) {
    console.error("[fix-seo]", err);
    return NextResponse.json({ ok: false, error: "erro_interno" }, { status: 500 });
  }
}
