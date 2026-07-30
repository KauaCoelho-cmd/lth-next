import { NextRequest, NextResponse } from 'next/server';

const SENHA = '@Kaua9881';

const ESTRATEGISTA = `Você é o Agente Alpha — estrategista de negócios agressivo e direto.
Contexto: Hunter X é uma extensão Chrome SaaS que escaneia a Biblioteca de Anúncios do Meta.
Fase 4 ativa: $12,90/mês. Site: hunterx.site. Tem também o SiteScope (editor visual de páginas).
Stack: Next.js, Vercel, Upstash KV, Resend.

Seu papel no debate:
- Foca em receita, conversão, aquisição, retenção
- Identifica o que está travando o crescimento do negócio
- Propõe melhorias que gerem dinheiro agora
- Questiona e rebate o Agente Beta quando ele foca demais em técnica sem impacto no caixa
- Linguagem direta, brasileira, sem rodeios
- Máximo 3 parágrafos por turno`;

const TECNICO = `Você é o Agente Beta — especialista técnico em produto e UX implacável.
Contexto: Hunter X é uma extensão Chrome SaaS que escaneia a Biblioteca de Anúncios do Meta.
Fase 4 ativa: $12,90/mês. Site: hunterx.site. Tem também o SiteScope (editor visual de páginas).
Stack: Next.js, Vercel, Upstash KV, Resend.

Seu papel no debate:
- Foca em experiência do usuário, retenção técnica, performance do produto
- Identifica falhas de UX e produto que estão matando conversão silenciosamente
- Propõe melhorias técnicas com impacto direto na satisfação e churn
- Questiona e rebate o Agente Alpha quando ele ignora problemas de produto
- Linguagem direta, brasileira, sem rodeios
- Máximo 3 parágrafos por turno`;

const SINTETIZADOR = `Você é um engenheiro de produto sênior. Recebe o debate entre dois agentes
(Alpha = estratégia/receita, Beta = produto/UX) sobre o Hunter X e transforma tudo num PROMPT DE
IMPLEMENTAÇÃO pronto para colar no Claude Code.

Contexto técnico do projeto:
- Repo: /Users/kauascoelho/lth-next (Next.js App Router, Tailwind v4, TypeScript)
- Deploy: Vercel · DB: Upstash KV · Email: Resend
- Landing: src/app/page.tsx · Download: src/app/download/page.tsx · Admin: src/app/control-8faz/page.tsx
- SiteScope: src/app/sitescope/page.tsx · APIs em src/app/api/

Regras do prompt que você vai gerar:
- Comece com o objetivo em 1 frase
- Liste as mudanças em ordem de impacto, cada uma com o arquivo exato a mexer
- Seja concreto: nada de "melhorar a copy" — escreva a copy nova
- Inclua critério de aceite (como saber que ficou pronto)
- Escreva em português, tom imperativo, direto para um agente de código executar
- Não use markdown de título (#), use texto corrido e listas simples
- Máximo 400 palavras`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { senha, historico, turno, tema, ping, modo } = body;

  if (senha !== SENHA) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  if (ping) {
    return NextResponse.json({ ok: true });
  }

  // Sintetiza o debate num prompt de implementação
  if (modo === 'prompt') {
    const transcricao = (historico || [])
      .map((m: { nome: string; texto: string }) => `[${m.nome}]: ${m.texto}`)
      .join('\n\n');
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1200,
          system: SINTETIZADOR,
          messages: [{
            role: 'user',
            content: `Tema do debate: ${tema}\n\nDebate completo:\n\n${transcricao}\n\nGere agora o prompt de implementação.`,
          }],
        }),
      });
      const d = await r.json();
      const texto = d.content?.[0]?.text?.trim();
      if (!texto) {
        return NextResponse.json({ error: 'Sem resposta da IA', detail: JSON.stringify(d) }, { status: 500 });
      }
      return NextResponse.json({ prompt: texto });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  const isAlpha = turno % 2 === 0;
  const sistema = isAlpha ? ESTRATEGISTA : TECNICO;
  const nome = isAlpha ? 'Alpha' : 'Beta';
  const oponente = isAlpha ? 'Beta' : 'Alpha';
  const isFinal = turno >= 5;

  const contexto = historico?.length
    ? `Debate até agora:\n${historico.map((m: { nome: string; texto: string }) => `[${m.nome}]: ${m.texto}`).join('\n\n')}\n\nAgora é sua vez de responder ao Agente ${oponente}.${isFinal ? ' Este é o ÚLTIMO turno. Conclua com um PLANO FINAL com 3 ações concretas e priorizadas para melhorar o Hunter X.' : ' Seja direto e específico.'}`
    : `Inicie o debate sobre: "${tema || 'como melhorar o Hunter X'}"\nSeja direto e específico logo de cara.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: sistema,
        messages: [{ role: 'user', content: `Você é o Agente ${nome}. ${contexto}` }],
      }),
    });

    const data = await response.json();
    const texto = data.content?.[0]?.text?.trim();

    if (!texto) {
      const errDetail = JSON.stringify(data);
      return NextResponse.json({ error: 'Sem resposta da IA', detail: errDetail }, { status: 500 });
    }

    return NextResponse.json({ nome, texto, isFinal });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
