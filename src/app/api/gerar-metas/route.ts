import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { objetivos, data } = await req.json();

  if (!objetivos || objetivos.length === 0) {
    return NextResponse.json({ error: 'Sem objetivos' }, { status: 400 });
  }

  const prompt = `Você é um coach pessoal direto e objetivo.
O usuário tem os seguintes objetivos grandes para 2026:
${objetivos.map((o: string, i: number) => `${i + 1}. ${o}`).join('\n')}

Data de hoje: ${data}

Crie exatamente 5 tarefas concretas e práticas para o usuário fazer HOJE que o aproximem desses objetivos.
Cada tarefa deve ser específica, acionável e realizável em um dia.
Distribua as tarefas entre os diferentes objetivos quando possível.

Responda APENAS com um JSON válido, sem markdown, sem explicação, neste formato:
{
  "metas": [
    { "texto": "Tarefa específica aqui", "categoria": "Nome curto do objetivo" },
    { "texto": "...", "categoria": "..." }
  ]
}`;

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
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data_resp = await response.json();
    const text = data_resp.content[0].text.trim();
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao gerar metas' }, { status: 500 });
  }
}
