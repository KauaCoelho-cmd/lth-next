export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { objetivos, data } = req.body;

  if (!objetivos || objetivos.length === 0) {
    return res.status(400).json({ error: 'Sem objetivos' });
  }

  const prompt = `Você é um coach pessoal direto e objetivo. 
O usuário tem os seguintes objetivos grandes para 2026:
${objetivos.map((o, i) => `${i + 1}. ${o}`).join('\n')}

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
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data_resp = await response.json();
    const text = data_resp.content[0].text.trim();
    const parsed = JSON.parse(text);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao gerar metas' });
  }
}
