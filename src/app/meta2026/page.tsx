"use client";

import { useState, useRef, useEffect } from "react";

const SENHA_KEY = "gerente_auth";
const OBJ_KEY = "gerente_objetivos";
const PLANO_KEY = "gerente_plano";
const PLANO_DATA_KEY = "gerente_plano_data";

function hoje() {
  return new Date().toISOString().split("T")[0];
}

type Msg = { role: "user" | "assistant"; content: string };
type TarefaPlano = { tarefa: string; prioridade: string; estimativa: string; feita?: boolean };
type Plano = { plano: TarefaPlano[]; mensagem_do_dia: string };

/* ── LOGIN ── */
function Login({ onLogin }: { onLogin: (s: string) => void }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    const res = await fetch("/api/gerente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo: "ping", senha, mensagem: "ping" }),
    });
    setLoading(false);
    if (res.status === 401) { setErro("Senha incorreta."); return; }
    localStorage.setItem(SENHA_KEY, senha);
    onLogin(senha);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: 0 }}>Seu Gerente</h1>
          <p style={{ color: "#52525b", fontSize: 13, marginTop: 6 }}>Acesso privado · Kauã</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
            autoFocus
            style={{ width: "100%", background: "#0f0f1a", border: "1px solid #27272a", borderRadius: 12, color: "#fff", fontSize: 15, padding: "14px 16px", outline: "none", boxSizing: "border-box", fontFamily: "monospace" }}
          />
          {erro && <p style={{ color: "#f87171", fontSize: 12, marginTop: 8 }}>{erro}</p>}
          <button
            type="submit"
            disabled={loading || !senha}
            style={{ marginTop: 12, width: "100%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 800, padding: "14px", cursor: "pointer", opacity: loading || !senha ? 0.5 : 1 }}
          >
            {loading ? "Verificando..." : "Entrar →"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── PLANO DO DIA ── */
function PlanoTab({ senha }: { senha: string }) {
  const [plano, setPlano] = useState<Plano | null>(null);
  const [loading, setLoading] = useState(false);
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [novoObj, setNovoObj] = useState("");
  const [feitas, setFeitas] = useState<boolean[]>([]);

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem(OBJ_KEY) || "[]");
    setObjetivos(obj);
    const dataCache = localStorage.getItem(PLANO_DATA_KEY);
    const planoCache = localStorage.getItem(PLANO_KEY);
    if (dataCache === hoje() && planoCache) {
      const p = JSON.parse(planoCache);
      setPlano(p);
      setFeitas(p.plano.map(() => false));
    }
  }, []);

  async function gerarPlano() {
    setLoading(true);
    const res = await fetch("/api/gerente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo: "plano", senha, objetivos }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.resultado) {
      setPlano(data.resultado);
      setFeitas(data.resultado.plano?.map(() => false) || []);
      localStorage.setItem(PLANO_KEY, JSON.stringify(data.resultado));
      localStorage.setItem(PLANO_DATA_KEY, hoje());
    }
  }

  function salvarObjetivos(novos: string[]) {
    setObjetivos(novos);
    localStorage.setItem(OBJ_KEY, JSON.stringify(novos));
  }

  const prioColor = (p: string) => p === "alta" ? "#f87171" : p === "média" ? "#fbbf24" : "#4ade80";
  const done = feitas.filter(Boolean).length;
  const total = plano?.plano?.length || 0;

  return (
    <div>
      {/* objetivos */}
      <div style={{ marginBottom: 24, background: "#0f0f1a", borderRadius: 16, padding: 20, border: "1px solid #1c1c2e" }}>
        <p style={{ color: "#a78bfa", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Seus objetivos grandes</p>
        {objetivos.map((o, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ color: "#d4d4d8", fontSize: 13, flex: 1 }}>• {o}</span>
            <button onClick={() => salvarObjetivos(objetivos.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#52525b", cursor: "pointer", fontSize: 16 }}>×</button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input
            value={novoObj}
            onChange={e => setNovoObj(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && novoObj.trim()) { salvarObjetivos([...objetivos, novoObj.trim()]); setNovoObj(""); } }}
            placeholder="Adicionar objetivo..."
            style={{ flex: 1, background: "#06060f", border: "1px solid #27272a", borderRadius: 8, color: "#fff", fontSize: 13, padding: "8px 12px", outline: "none" }}
          />
          <button
            onClick={() => { if (novoObj.trim()) { salvarObjetivos([...objetivos, novoObj.trim()]); setNovoObj(""); } }}
            style={{ background: "#7c3aed", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "8px 14px", cursor: "pointer" }}
          >+</button>
        </div>
      </div>

      {/* plano */}
      {!plano ? (
        <button
          onClick={gerarPlano}
          disabled={loading}
          style={{ width: "100%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 800, padding: "16px", cursor: "pointer", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Gerente montando seu dia..." : "📋 Gerar plano do dia"}
        </button>
      ) : (
        <div>
          <div style={{ background: "#0f0f1a", borderRadius: 16, padding: 20, border: "1px solid #1c1c2e", marginBottom: 16 }}>
            <p style={{ color: "#a78bfa", fontStyle: "italic", fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>"{plano.mensagem_do_dia}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 4, background: "#1c1c2e", borderRadius: 2 }}>
                <div style={{ width: `${total ? (done / total) * 100 : 0}%`, height: "100%", background: "#7c3aed", borderRadius: 2, transition: "width 0.3s" }} />
              </div>
              <span style={{ color: "#71717a", fontSize: 12, fontWeight: 700 }}>{done}/{total}</span>
            </div>
            {plano.plano?.map((t, i) => (
              <div
                key={i}
                onClick={() => { const f = [...feitas]; f[i] = !f[i]; setFeitas(f); }}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < plano.plano.length - 1 ? "1px solid #1c1c2e" : "none", cursor: "pointer", opacity: feitas[i] ? 0.4 : 1 }}
              >
                <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${feitas[i] ? "#7c3aed" : "#3f3f46"}`, background: feitas[i] ? "#7c3aed" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {feitas[i] && <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#e4e4e7", fontSize: 14, margin: "0 0 4px", textDecoration: feitas[i] ? "line-through" : "none" }}>{t.tarefa}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: prioColor(t.prioridade), textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.prioridade}</span>
                    <span style={{ fontSize: 10, color: "#52525b" }}>· {t.estimativa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setPlano(null); localStorage.removeItem(PLANO_KEY); localStorage.removeItem(PLANO_DATA_KEY); }}
            style={{ width: "100%", background: "transparent", border: "1px solid #27272a", borderRadius: 10, color: "#71717a", fontSize: 13, padding: "10px", cursor: "pointer" }}
          >🔄 Gerar novo plano</button>
        </div>
      )}
    </div>
  );
}

/* ── CHAT ── */
function ChatTab({ senha }: { senha: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: "Fala, Kauã. O que você precisa?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function enviar() {
    if (!input.trim() || loading) return;
    const novaMsgs: Msg[] = [...msgs, { role: "user", content: input }];
    setMsgs(novaMsgs);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/gerente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "chat",
        senha,
        mensagem: input,
        historico: novaMsgs.slice(1).map(m => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await res.json();
    setLoading(false);
    setMsgs([...novaMsgs, { role: "assistant", content: data.resultado || "Erro ao responder." }]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{
              maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? "linear-gradient(135deg,#7c3aed,#a78bfa)" : "#0f0f1a",
              border: m.role === "assistant" ? "1px solid #1c1c2e" : "none",
              color: "#e4e4e7", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 4, padding: "12px 16px", width: "fit-content" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid #1c1c2e" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); } }}
          placeholder="Fala com seu gerente..."
          style={{ flex: 1, background: "#0f0f1a", border: "1px solid #27272a", borderRadius: 12, color: "#fff", fontSize: 14, padding: "12px 16px", outline: "none" }}
        />
        <button
          onClick={enviar}
          disabled={loading || !input.trim()}
          style={{ background: "#7c3aed", border: "none", borderRadius: 12, color: "#fff", fontSize: 20, width: 48, cursor: "pointer", opacity: loading || !input.trim() ? 0.5 : 1 }}
        >↑</button>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}

/* ── RELATÓRIO ── */
function RelatorioTab({ senha }: { senha: string }) {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [analise, setAnalise] = useState("");

  async function enviar() {
    if (!texto.trim()) return;
    setLoading(true);
    setAnalise("");
    const res = await fetch("/api/gerente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo: "relatorio", senha, mensagem: texto }),
    });
    const data = await res.json();
    setLoading(false);
    setAnalise(data.resultado || "Erro.");
  }

  return (
    <div>
      <p style={{ color: "#71717a", fontSize: 13, marginBottom: 16 }}>Conta o que você fez hoje. O gerente analisa com franqueza.</p>
      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Ex: Fiz 2 criativos, postei no Instagram, mas não mexi nos anúncios..."
        rows={5}
        style={{ width: "100%", background: "#0f0f1a", border: "1px solid #27272a", borderRadius: 12, color: "#fff", fontSize: 14, padding: "14px 16px", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "sans-serif", lineHeight: 1.6 }}
      />
      <button
        onClick={enviar}
        disabled={loading || !texto.trim()}
        style={{ marginTop: 10, width: "100%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 800, padding: "14px", cursor: "pointer", opacity: loading || !texto.trim() ? 0.5 : 1 }}
      >
        {loading ? "Analisando..." : "📊 Enviar relatório"}
      </button>
      {analise && (
        <div style={{ marginTop: 20, background: "#0f0f1a", border: "1px solid #1c1c2e", borderRadius: 16, padding: 20 }}>
          <p style={{ color: "#a78bfa", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Análise do gerente</p>
          <p style={{ color: "#e4e4e7", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{analise}</p>
        </div>
      )}
    </div>
  );
}

/* ── APP PRINCIPAL ── */
export default function Gerente() {
  const [senha, setSenha] = useState<string | null>(null);
  const [aba, setAba] = useState<"plano" | "chat" | "relatorio">("plano");

  useEffect(() => {
    const s = localStorage.getItem(SENHA_KEY);
    if (s) setSenha(s);
  }, []);

  if (!senha) return <Login onLogin={setSenha} />;

  const abas = [
    { id: "plano", label: "📋 Hoje" },
    { id: "chat", label: "💬 Chat" },
    { id: "relatorio", label: "📊 Relatório" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", fontFamily: "sans-serif", color: "#fff" }}>
      {/* header */}
      <div style={{ borderBottom: "1px solid #1c1c2e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🧠</span>
          <div>
            <p style={{ margin: 0, fontWeight: 900, fontSize: 15 }}>Seu Gerente</p>
            <p style={{ margin: 0, fontSize: 11, color: "#52525b" }}>Hunter X · Uso privado</p>
          </div>
        </div>
        <button
          onClick={() => { localStorage.removeItem(SENHA_KEY); setSenha(null); }}
          style={{ background: "none", border: "1px solid #27272a", borderRadius: 8, color: "#71717a", fontSize: 12, padding: "6px 12px", cursor: "pointer" }}
        >Sair</button>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1c1c2e" }}>
        {abas.map(a => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            style={{ flex: 1, background: "none", border: "none", borderBottom: aba === a.id ? "2px solid #7c3aed" : "2px solid transparent", color: aba === a.id ? "#a78bfa" : "#52525b", fontSize: 13, fontWeight: 700, padding: "14px 0", cursor: "pointer" }}
          >{a.label}</button>
        ))}
      </div>

      {/* conteúdo */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px" }}>
        {aba === "plano" && <PlanoTab senha={senha} />}
        {aba === "chat" && <ChatTab senha={senha} />}
        {aba === "relatorio" && <RelatorioTab senha={senha} />}
      </div>
    </div>
  );
}
