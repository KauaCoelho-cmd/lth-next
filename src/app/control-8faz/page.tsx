'use client';

import { useState, useEffect, useCallback } from 'react';

/* ── tipos ── */
interface KeyRecord {
  key: string;
  email: string;
  plan: string;
  expiresAt: string;
  createdAt: string;
  source: string;
  revoked: boolean | string;
}

/* ── helpers ── */
function extractId(key: string): string {
  try {
    const b64 = key.replace('HX-', '').split('.')[0];
    const payload = JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
    return payload.id ?? '?';
  } catch {
    return '?';
  }
}

function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

function statusBadge(record: KeyRecord) {
  const revoked = record.revoked === true || record.revoked === 'true';
  if (revoked) return { label: 'Revogada', color: 'bg-red-500/20 text-red-400 ring-red-500/30' };
  if (isExpired(record.expiresAt)) return { label: 'Expirada', color: 'bg-zinc-500/20 text-zinc-400 ring-zinc-500/30' };
  return { label: 'Ativa', color: 'bg-green-500/20 text-green-400 ring-green-500/30' };
}

/* ══════════════════════════════════════
   LOGIN SCREEN
══════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: (pwd: string) => void }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/control-8faz/keys', {
      headers: { 'x-admin-password': pwd },
    });
    setLoading(false);
    if (res.ok) {
      onLogin(pwd);
    } else {
      setError('Senha incorreta');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080810]">
      <div className="w-full max-w-xs">
        {/* logo */}
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            Hunter X · Control
          </div>
          <p className="mt-2 font-mono text-[10px] text-zinc-600 tracking-widest uppercase">Acesso restrito</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="Senha de acesso"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition"
          />
          {error && (
            <p className="font-mono text-[11px] text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !pwd}
            className="w-full rounded-lg bg-violet-600 py-3 font-mono text-sm font-bold text-white transition hover:bg-violet-500 disabled:opacity-40"
          >
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   GENERATE MODAL
══════════════════════════════════════ */
function GenerateModal({
  password,
  onClose,
  onGenerated,
}: {
  password: string;
  onClose: () => void;
  onGenerated: () => void;
}) {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'monthly' | 'annual'>('monthly');
  const [days, setDays] = useState('');
  const [result, setResult] = useState<KeyRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/control-8faz/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ email, plan, days: days ? Number(days) : undefined }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setResult(data);
      onGenerated();
    } else {
      setError('Erro ao gerar chave');
    }
  };

  const copy = () => {
    if (result) {
      navigator.clipboard.writeText(result.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sendEmail = async () => {
    if (!result) return;
    setSending(true);
    await fetch('/api/control-8faz/send-extension', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ email: result.email, licenseKey: result.key }),
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-widest">
            Nova Chave
          </h2>
          <button onClick={onClose} className="font-mono text-zinc-500 hover:text-white transition text-lg leading-none">×</button>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">Plano</label>
              <div className="grid grid-cols-2 gap-2">
                {(['monthly', 'annual'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`rounded-lg border py-2.5 font-mono text-xs font-bold uppercase transition ${plan === p
                      ? 'border-violet-500/60 bg-violet-500/20 text-violet-300'
                      : 'border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20'
                      }`}
                  >
                    {p === 'monthly' ? 'Mensal (33d)' : 'Anual (366d)'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Dias customizados <span className="text-zinc-700">(opcional)</span>
              </label>
              <input
                type="number"
                value={days}
                onChange={e => setDays(e.target.value)}
                placeholder="ex: 7"
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition"
              />
            </div>

            {error && <p className="font-mono text-[11px] text-red-400">{error}</p>}

            <button
              onClick={generate}
              disabled={loading || !email}
              className="w-full rounded-lg bg-violet-600 py-3 font-mono text-sm font-bold text-white transition hover:bg-violet-500 disabled:opacity-40"
            >
              {loading ? 'Gerando…' : '⚡ Gerar chave'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-green-400">Chave gerada com sucesso</p>
              <p className="break-all font-mono text-[11px] text-green-300">{result.key}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-zinc-400">
              <div><span className="text-zinc-600">Email:</span> {result.email}</div>
              <div><span className="text-zinc-600">Plano:</span> {result.plan}</div>
              <div><span className="text-zinc-600">Expira:</span> {result.expiresAt}</div>
              <div><span className="text-zinc-600">Fonte:</span> admin</div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={sendEmail}
                disabled={sending || sent}
                className="w-full rounded-lg bg-cyan-600/80 py-2.5 font-mono text-xs font-bold text-white hover:bg-cyan-500/80 transition disabled:opacity-50"
              >
                {sending ? 'Enviando…' : sent ? '✓ Email enviado!' : '📧 Enviar extensão por email'}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={copy}
                  className="flex-1 rounded-lg border border-violet-500/40 bg-violet-500/10 py-2.5 font-mono text-xs font-bold text-violet-300 hover:bg-violet-500/20 transition"
                >
                  {copied ? '✓ Copiado!' : '📋 Copiar chave'}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-white/10 py-2.5 font-mono text-xs font-bold text-zinc-400 hover:border-white/20 hover:text-white transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */
function Dashboard({ password }: { password: string }) {
  const [keys, setKeys] = useState<KeyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerate, setShowGenerate] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'revoked'>('all');
  const [revoking, setRevoking] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const loadKeys = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/control-8faz/keys', {
      headers: { 'x-admin-password': password },
    });
    if (res.ok) {
      const data = await res.json();
      setKeys(data.keys ?? []);
    }
    setLoading(false);
  }, [password]);

  useEffect(() => { loadKeys(); }, [loadKeys]);

  const handleRevoke = async (record: KeyRecord) => {
    const id = extractId(record.key);
    const isRevoked = record.revoked === true || record.revoked === 'true';
    setRevoking(id);
    await fetch('/api/control-8faz/revoke', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id, revoke: !isRevoked }),
    });
    setRevoking(null);
    loadKeys();
  };

  const sendExtension = async (record: KeyRecord) => {
    const id = extractId(record.key);
    setSendingEmail(id);
    await fetch('/api/control-8faz/send-extension', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ email: record.email, licenseKey: record.key }),
    });
    setSendingEmail(null);
    setSentEmail(id);
    setTimeout(() => setSentEmail(null), 3000);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  /* filtros */
  const filtered = keys.filter(k => {
    const revoked = k.revoked === true || k.revoked === 'true';
    const expired = isExpired(k.expiresAt);
    if (filter === 'active' && (revoked || expired)) return false;
    if (filter === 'expired' && !expired) return false;
    if (filter === 'revoked' && !revoked) return false;
    if (search && !k.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  /* stats */
  const stats = {
    total: keys.length,
    active: keys.filter(k => !(k.revoked === true || k.revoked === 'true') && !isExpired(k.expiresAt)).length,
    monthly: keys.filter(k => k.plan === 'monthly').length,
    annual: keys.filter(k => k.plan === 'annual').length,
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {showGenerate && (
        <GenerateModal
          password={password}
          onClose={() => setShowGenerate(false)}
          onGenerated={loadKeys}
        />
      )}

      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0a0a14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              HX Control
            </div>
            <span className="font-mono text-[10px] text-zinc-600">hunterx.site/control-8faz</span>
          </div>
          <button
            onClick={() => setShowGenerate(true)}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-violet-500 transition"
          >
            ⚡ Nova chave
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-6">

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total de chaves', value: stats.total, color: 'text-white' },
            { label: 'Ativas agora', value: stats.active, color: 'text-green-400' },
            { label: 'Plano mensal', value: stats.monthly, color: 'text-violet-300' },
            { label: 'Plano anual', value: stats.annual, color: 'text-cyan-300' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <p className={`font-mono text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtros + Search */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Buscar por e-mail…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition"
          />
          <div className="flex gap-2">
            {(['all', 'active', 'expired', 'revoked'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg border px-3 py-2 font-mono text-[10px] uppercase tracking-wide transition ${filter === f
                  ? 'border-violet-500/60 bg-violet-500/20 text-violet-300'
                  : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                  }`}
              >
                {f === 'all' ? 'Todas' : f === 'active' ? 'Ativas' : f === 'expired' ? 'Expiradas' : 'Revogadas'}
              </button>
            ))}
          </div>
          <button
            onClick={loadKeys}
            className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[10px] text-zinc-500 hover:border-white/20 hover:text-zinc-300 transition"
          >
            ↻ Atualizar
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {['E-mail', 'Plano', 'Status', 'Expira em', 'Criada em', 'Fonte', 'Chave', 'Ações'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center font-mono text-xs text-zinc-600">
                      Carregando…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center font-mono text-xs text-zinc-600">
                      Nenhuma chave encontrada
                    </td>
                  </tr>
                ) : (
                  filtered.map((record, i) => {
                    const badge = statusBadge(record);
                    const id = extractId(record.key);
                    const isRevoked = record.revoked === true || record.revoked === 'true';
                    return (
                      <tr
                        key={i}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-white">{record.email}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase ring-1 ${record.plan === 'annual'
                            ? 'bg-cyan-500/15 text-cyan-400 ring-cyan-500/30'
                            : 'bg-violet-500/15 text-violet-400 ring-violet-500/30'
                            }`}>
                            {record.plan === 'annual' ? 'Anual' : 'Mensal'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold ring-1 ${badge.color}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[10px] text-zinc-400">{record.expiresAt}</td>
                        <td className="px-4 py-3 font-mono text-[10px] text-zinc-500">
                          {new Date(record.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-[9px] ${record.source === 'hotmart' ? 'text-amber-400' : 'text-violet-400'}`}>
                            {record.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => copyKey(record.key)}
                            title={record.key}
                            className="font-mono text-[9px] text-zinc-600 hover:text-violet-400 transition"
                          >
                            {copiedKey === record.key ? '✓ copiado' : `HX-…${record.key.slice(-8)}`}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => sendExtension(record)}
                              disabled={sendingEmail === id}
                              className="rounded px-2 py-1 font-mono text-[9px] font-bold bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 transition disabled:opacity-40"
                            >
                              {sendingEmail === id ? '…' : sentEmail === id ? '✓ Enviado!' : '📧 Enviar'}
                            </button>
                            <button
                              onClick={() => handleRevoke(record)}
                              disabled={revoking === id}
                              className={`rounded px-2 py-1 font-mono text-[9px] font-bold transition ${isRevoked
                                ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25'
                                : 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                                } disabled:opacity-40`}
                            >
                              {revoking === id ? '…' : isRevoked ? 'Reativar' : 'Revogar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="border-t border-white/[0.04] bg-white/[0.01] px-4 py-2">
              <p className="font-mono text-[9px] text-zinc-700">
                {filtered.length} chave{filtered.length !== 1 ? 's' : ''} exibida{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════ */
export default function ControlPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('hx-admin-pwd');
    if (saved) setPassword(saved);
  }, []);

  const handleLogin = (pwd: string) => {
    sessionStorage.setItem('hx-admin-pwd', pwd);
    setPassword(pwd);
  };

  if (!password) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard password={password} />;
}
