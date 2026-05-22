'use client';

import { CheckCircleIcon, Target, Zap, Shield, Star } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const MONTHLY_LINK = 'https://pay.hotmart.com/T105952095U?off=cin50me1';
const ANNUAL_LINK  = 'https://pay.hotmart.com/T105952095U?off=ypv6j9yv';

export function PricingWithChart() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
          <Zap className="h-3 w-3" /> Planos Hunter X
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-100 lg:text-5xl">
          Escolha seu plano
        </h2>
        <p className="mt-4 text-sm text-zinc-400 md:text-base">
          Acesso imediato após o pagamento. Chave enviada por email em segundos.
        </p>
      </div>

      {/* Grid */}
      <div className="grid rounded-xl border border-white/5 bg-[#0d0d1a] md:grid-cols-6">

        {/* ── MENSAL ── */}
        <div className="flex flex-col justify-between border-b border-white/5 p-6 md:col-span-2 md:border-r md:border-b-0">
          <div className="space-y-4">
            <div>
              <h2 className="inline rounded-[2px] p-1 text-xl font-semibold text-slate-100">Mensal</h2>
              <div className="my-3">
                <span className="block text-3xl font-black text-violet-400">R$29,90</span>
                <span className="font-mono text-xs text-zinc-500">/mês · cancele quando quiser</span>
              </div>
              <p className="text-sm text-zinc-400">Ideal para começar a garimpar agora.</p>
            </div>

            <a
              href={MONTHLY_LINK} target="_blank" rel="noopener"
              className="flex w-full items-center justify-center rounded-lg border border-violet-500/40 px-4 py-2 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/10"
            >Assinar mensal</a>

            <div className="my-6 h-px w-full bg-white/5" />

            <ul className="space-y-3 text-sm text-zinc-400">
              {[
                'Chave de acesso por email',
                'Extensão Chrome pronta pra usar',
                'Scan em tempo real da Meta',
                'Score viral 0–100',
                'Exportação CSV/JSON',
                'Cancele quando quiser',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-violet-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── ANUAL ── */}
        <div className="relative z-10 grid gap-8 overflow-hidden p-6 md:col-span-4 lg:grid-cols-2">
          {/* Badge melhor valor */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

          {/* Preço + gráfico */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-100">Plano Anual</h2>
                <span className="rounded bg-violet-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                  <Star className="h-2.5 w-2.5" /> Melhor valor
                </span>
              </div>

              {/* Preço parcelado em destaque */}
              <div className="my-3 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-black text-violet-300">12×</span>
                  <span className="font-mono text-4xl font-black text-violet-300">R$16,42</span>
                </div>
                <span className="font-mono text-xs text-green-400 font-bold">sem juros · total R$197</span>
                <div className="pt-1 font-mono text-xs text-zinc-500 line-through">Valor mensal: R$29,90 × 12 = R$358,80</div>
                <div className="font-mono text-xs text-green-400 font-semibold">✓ Você economiza R$161,80 por ano</div>
              </div>

              <p className="text-sm text-zinc-400">Acesso garantido por 12 meses com o menor preço.</p>
            </div>

            {/* Gráfico de popularidade */}
            <div className="h-fit w-full rounded-lg border border-white/5 bg-violet-500/[.04] p-2">
              <InterestChart />
            </div>
          </div>

          {/* Features + CTA */}
          <div className="relative flex flex-col justify-between">
            <div>
              <div className="text-sm font-medium text-slate-300">Tudo do Mensal, mais:</div>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                {[
                  'Acesso por 12 meses completos',
                  '12× sem juros no cartão',
                  'Prioridade em novas features',
                  'Suporte prioritário por email',
                  'Badge exclusivo de membro anual',
                  'Detecção de nicho automática',
                  'Score viral em tempo real',
                  'Filtro por plataforma de venda',
                  'Badge "7+ dias rodando"',
                  'Exportação ilimitada CSV/JSON',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 shrink-0 text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 grid w-full grid-cols-1 gap-3">
              <a
                href={ANNUAL_LINK} target="_blank" rel="noopener"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-800 px-6 py-4 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,.4)] transition hover:opacity-90 hover:-translate-y-0.5"
              >
                <Target className="h-4 w-4" />
                Garantir anual · 12× R$16,42
              </a>
              <a
                href={MONTHLY_LINK} target="_blank" rel="noopener"
                className="flex w-full items-center justify-center rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-400 transition hover:border-violet-500/40 hover:text-violet-300"
              >
                Prefiro o mensal · R$29,90
              </a>
              <div className="flex items-center justify-center gap-4 pt-1 font-mono text-[10px] text-zinc-600">
                {['Pagamento seguro', 'Chave por email', '100% local'].map((g) => (
                  <span key={g} className="flex items-center gap-1">
                    <Shield className="h-2.5 w-2.5 text-violet-600" /> {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterestChart() {
  const chartData = [
    { month: 'Jan', interest: 120 },
    { month: 'Fev', interest: 180 },
    { month: 'Mar', interest: 150 },
    { month: 'Abr', interest: 210 },
    { month: 'Mai', interest: 260 },
    { month: 'Jun', interest: 300 },
    { month: 'Jul', interest: 285 },
    { month: 'Ago', interest: 330 },
    { month: 'Set', interest: 350 },
    { month: 'Out', interest: 400 },
    { month: 'Nov', interest: 430 },
    { month: 'Dez', interest: 510 },
  ];

  const chartConfig = {
    interest: { label: 'Interesse', color: 'rgb(139,92,246)' },
  } satisfies ChartConfig;

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="space-y-0 border-b border-white/5 p-3">
        <CardTitle className="text-sm text-slate-200">Crescimento de usuários</CardTitle>
        <CardDescription className="text-xs text-zinc-500">
          Pessoas que optaram pelo plano anual em 2024.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <ChartContainer config={chartConfig}>
          <LineChart data={chartData} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#52525b', fontSize: 11 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="interest"
              type="monotone"
              stroke="rgb(139,92,246)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
