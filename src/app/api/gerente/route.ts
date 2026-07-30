import { NextRequest, NextResponse } from 'next/server';

const SENHA = '@Kaua9881';

const SISTEMA = `Você é o gerente pessoal e executivo do Kauã, um empreendedor brasileiro de
que construiu o Hunter X — uma extensão Chrome SaaS que escaneia a Biblioteca de Anúncios do Meta,
classifica produtos por ticket (low/mid/high), score viral 0-100, dias rodando e plataforma (Hotmart, Kiwify, etc).
O site é hunterx.site. Tem também o SiteScope, editor visual de páginas dentro do Hunter X.
Plano atual: Fase 4 a $12,90/mês. Fase 5 será $19,90.

Seu estilo como gerente:
- Direto, sem enrolação, sem bajulação
- Cobra resultados com autoridade mas com respeito
- Faz perguntas cirúrgicas quando precisa de contexto
- Prioriza o que gera dinheiro agora
- Sabe quando o Kauã está procrastinando e fala isso na cara dura
- Usa linguagem casual brasileira, mas profissional
- Quando o Kauã reportar o que fez, analisa com franqueza: elogia o que merece, cobra o que ficou pra trás
- Monta planos do dia claros e executáveis
- Nunca inventa dados — se não sabe algo, pergunta

Contexto do negócio:
- Stack: Next.js, Vercel, Upstash KV, Resend, HMAC-SHA256
- Foco atual: aquisição paga via Meta Ads
- Pipeline de criativos: Bannerbear + Google Sheets + Make.com
- Limitação técnica: extensão via --load-extension (não está na Chrome Web Store)`;

export async function POST(req: NextRequest) {
  const { tipo, senha, mensagem, historico, objetivos } = await req.json();

  if (senha !== SENHA) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
  }

  if (tipo === 'ping') {
    return NextResponse.json({ ok: true });
  }

  let prompt = '';

  if (tipo === 'plano') {
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    prompt = `Hoje é ${hoje}.

Objetivos grandes do Kauã:
${objetivos?.length ? objetivos.map((o: string, i: number) => `${i + 1}. ${o}`).join('\n') : 'Nenhum objetivo definido ainda.'}

Monte o plano do dia de hoje. Seja específico e direto. Máximo 6 tarefas.
Priorize o que gera resultado no Hunter X agora.
Responda em JSON: { "plano": [{ "tarefa": "...", "prioridade": "alta|média|baixa", "estimativa": "Xmin" }], "mensagem_do_dia": "frase motivadora direta e sem frescura" }`;
  } else if (tipo === 'relatorio') {
    prompt = `O Kauã está reportando o que fez hoje:\n\n${mensagem}\n\nAnalise com franqueza. O que foi bem, o que ficou pra trás, o que ele precisa fazer amanhã. Seja direto.`;
  } else {
    prompt = mensagem;
  }

  const messages = tipo === 'chat' && historico?.length
    ? historico
    : [{ role: 'user', content: prompt }];

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
        max_tokens: 1500,
        system: SISTEMA,
        messages,
      }),
    });

    const data = await response.json();
    const texto = data.content[0].text.trim();

    if (tipo === 'plano') {
      try {
        return NextResponse.json({ resultado: JSON.parse(texto) });
      } catch {
        return NextResponse.json({ resultado: texto });
      }
    }

    return NextResponse.json({ resultado: texto });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('GERENTE_ERR:', msg);
    return NextResponse.json({ error: 'Erro ao contatar o gerente', detail: msg }, { status: 500 });
  }
}
