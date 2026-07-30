"use client";

import { useState, useRef, useEffect } from "react";

const SENHA_KEY = "gerente_auth";

type Msg = { nome: string; texto: string };

function Login({ onLogin }: { onLogin: (s: string) => void }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    const res = await fetch("/api/debate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha, ping: true }),
    });
    setLoading(false);
    if (res.status === 401) { setErro("Senha incorreta."); return; }
    localStorage.setItem(SENHA_KEY, senha);
    onLogin(senha);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 380, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⚔️</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: 0 }}>Sala de Debate</h1>
          <p style={{ color: "#52525b", fontSize: 13, marginTop: 6 }}>Alpha vs Beta · Hunter X</p>
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
          <button type="submit" disabled={loading || !senha}
            style={{ marginTop: 12, width: "100%", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 800, padding: "14px", cursor: "pointer", opacity: loading || !senha ? 0.5 : 1 }}>
            {loading ? "Verificando..." : "Entrar →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Debate() {
  const [senha, setSenha] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [tema, setTema] = useState("");
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [parado, setParado] = useState(false);
  const [turno, setTurno] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [gerandoPrompt, setGerandoPrompt] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgsRef = useRef<Msg[]>([]);

  useEffect(() => {
    const s = localStorage.getItem(SENHA_KEY);
    if (s) setSenha(s);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  async function proximoTurno(historico: Msg[], t: number) {
    setLoading(true);
    try {
      const res = await fetch("/api/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha, historico, turno: t, tema }),
      });
      const data = await res.json();

      if (data.error) {
        setLoading(false);
        return;
      }

      const nova: Msg = { nome: data.nome, texto: data.texto };
      const novas = [...historico, nova];
      msgsRef.current = novas;
      setMsgs(novas);
      setTurno(t + 1);

      if (data.isFinal) {
        setFinalizado(true);
      }
    } catch {
      // silencioso
    }
    setLoading(false);
  }

  async function iniciar() {
    if (!tema.trim()) return;
    setIniciado(true);
    setMsgs([]);
    msgsRef.current = [];
    setTurno(0);
    setFinalizado(false);
    setParado(false);
    await proximoTurno([], 0);
  }

  async function continuar() {
    if (loading || finalizado) return;
    await proximoTurno(msgsRef.current, turno);
  }

  function parar() {
    setParado(true);
    setFinalizado(true);
  }

  async function gerarPrompt() {
    if (gerandoPrompt || !msgsRef.current.length) return;
    setGerandoPrompt(true);
    setPrompt("");
    try {
      const res = await fetch("/api/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha, modo: "prompt", historico: msgsRef.current, tema }),
      });
      const data = await res.json();
      if (data.prompt) setPrompt(data.prompt);
    } catch {
      // silencioso
    }
    setGerandoPrompt(false);
  }

  async function copiarPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function reiniciar() {
    setIniciado(false);
    setMsgs([]);
    msgsRef.current = [];
    setTurno(0);
    setFinalizado(false);
    setParado(false);
    setTema("");
    setPrompt("");
  }

  if (!senha) return <Login onLogin={setSenha} />;

  const totalTurnos = 6;

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", fontFamily: "sans-serif", color: "#fff" }}>
      {/* header */}
      <div style={{ borderBottom: "1px solid #1c1c2e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>⚔️</span>
          <div>
            <p style={{ margin: 0, fontWeight: 900, fontSize: 15 }}>Sala de Debate</p>
            <p style={{ margin: 0, fontSize: 11, color: "#52525b" }}>
              <span style={{ color: "#a78bfa" }}>α Alpha</span> (Estratégia) vs <span style={{ color: "#06b6d4" }}>β Beta</span> (Produto)
            </p>
          </div>
        </div>
        <button onClick={() => { localStorage.removeItem(SENHA_KEY); setSenha(null); }}
          style={{ background: "none", border: "1px solid #27272a", borderRadius: 8, color: "#71717a", fontSize: 12, padding: "6px 12px", cursor: "pointer" }}>
          Sair
        </button>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px" }}>

        {/* setup */}
        {!iniciado && (
          <div>
            <p style={{ color: "#71717a", fontSize: 13, marginBottom: 16 }}>
              Defina o tema. Os agentes debatem turno a turno — você controla o ritmo.
            </p>
            <textarea
              value={tema}
              onChange={e => setTema(e.target.value)}
              placeholder="Ex: Como aumentar a conversão da landing page do Hunter X..."
              rows={3}
              style={{ width: "100%", background: "#0f0f1a", border: "1px solid #27272a", borderRadius: 12, color: "#fff", fontSize: 14, padding: "14px 16px", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "sans-serif", lineHeight: 1.6 }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {[
                "Melhorar conversão da landing page",
                "Reduzir churn de clientes",
                "Nova feature que gere receita",
                "Escalar com Meta Ads",
                "Melhorar o SiteScope",
              ].map(s => (
                <button key={s} onClick={() => setTema(s)}
                  style={{ background: "#0f0f1a", border: "1px solid #27272a", borderRadius: 8, color: "#71717a", fontSize: 11, padding: "6px 12px", cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={iniciar} disabled={!tema.trim()}
              style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 800, padding: "16px", cursor: !tema.trim() ? "not-allowed" : "pointer", opacity: !tema.trim() ? 0.5 : 1 }}>
              ⚔️ Iniciar debate
            </button>
          </div>
        )}

        {/* progresso */}
        {iniciado && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <p style={{ margin: 0, fontSize: 12, color: "#52525b" }}>
                Tema: <span style={{ color: "#a78bfa" }}>{tema}</span>
              </p>
              <span style={{ fontSize: 12, color: "#52525b" }}>{Math.min(turno, totalTurnos)}/{totalTurnos} turnos</span>
            </div>
            <div style={{ height: 3, background: "#1c1c2e", borderRadius: 2 }}>
              <div style={{ width: `${(Math.min(turno, totalTurnos) / totalTurnos) * 100}%`, height: "100%", background: "linear-gradient(90deg,#7c3aed,#06b6d4)", borderRadius: 2, transition: "width 0.5s" }} />
            </div>
          </div>
        )}

        {/* mensagens */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {msgs.map((m, i) => {
            const isAlpha = m.nome === "Alpha";
            return (
              <div key={i} style={{ display: "flex", flexDirection: isAlpha ? "row" : "row-reverse", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  background: isAlpha ? "linear-gradient(135deg,#7c3aed,#a78bfa)" : "linear-gradient(135deg,#0891b2,#06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 900, color: "#fff",
                  boxShadow: isAlpha ? "0 0 20px rgba(124,58,237,0.4)" : "0 0 20px rgba(6,182,212,0.4)",
                }}>
                  {isAlpha ? "α" : "β"}
                </div>
                <div style={{
                  flex: 1, maxWidth: "85%",
                  background: isAlpha ? "rgba(124,58,237,0.08)" : "rgba(6,182,212,0.08)",
                  border: `1px solid ${isAlpha ? "rgba(124,58,237,0.25)" : "rgba(6,182,212,0.25)"}`,
                  borderRadius: isAlpha ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                  padding: "14px 18px",
                }}>
                  <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: isAlpha ? "#a78bfa" : "#06b6d4" }}>
                    Agente {m.nome} · {isAlpha ? "Estratégia" : "Produto"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#e4e4e7", whiteSpace: "pre-wrap" }}>{m.texto}</p>
                </div>
              </div>
            );
          })}

          {/* typing */}
          {loading && (
            <div style={{ display: "flex", flexDirection: turno % 2 === 0 ? "row" : "row-reverse", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                background: turno % 2 === 0 ? "linear-gradient(135deg,#7c3aed,#a78bfa)" : "linear-gradient(135deg,#0891b2,#06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "#fff",
              }}>
                {turno % 2 === 0 ? "α" : "β"}
              </div>
              <div style={{
                background: turno % 2 === 0 ? "rgba(124,58,237,0.08)" : "rgba(6,182,212,0.08)",
                border: `1px solid ${turno % 2 === 0 ? "rgba(124,58,237,0.25)" : "rgba(6,182,212,0.25)"}`,
                borderRadius: "4px 16px 16px 16px", padding: "16px 20px",
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: turno % 2 === 0 ? "#a78bfa" : "#06b6d4", animation: `bounce 1s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* botões de controle */}
        {iniciado && !loading && (
          <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
            {!finalizado && (
              <>
                <button onClick={continuar}
                  style={{ flex: 1, background: "linear-gradient(135deg,#7c3aed,#06b6d4)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 800, padding: "14px", cursor: "pointer" }}>
                  ▶ Próximo turno {turno < totalTurnos ? `(${turno + 1}/${totalTurnos})` : "· Final"}
                </button>
                <button onClick={parar}
                  style={{ background: "transparent", border: "1px solid #3f3f46", borderRadius: 12, color: "#71717a", fontSize: 14, fontWeight: 700, padding: "14px 20px", cursor: "pointer" }}>
                  ■ Parar
                </button>
              </>
            )}
            {finalizado && (
              <div style={{ width: "100%" }}>
                <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 14, padding: 16, textAlign: "center", marginBottom: 12 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" as const, background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {parado ? "Debate pausado" : "Debate encerrado"}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "#52525b" }}>
                    {parado ? "Você interrompeu o debate." : "Alpha e Beta chegaram ao plano final."}
                  </p>
                </div>
                {/* prompt de melhoria */}
                {!prompt && (
                  <button onClick={gerarPrompt} disabled={gerandoPrompt}
                    style={{ width: "100%", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 800, padding: "14px", cursor: gerandoPrompt ? "wait" : "pointer", opacity: gerandoPrompt ? 0.6 : 1, marginBottom: 12 }}>
                    {gerandoPrompt ? "Sintetizando o debate..." : "✨ Gerar prompt de melhoria"}
                  </button>
                )}

                {prompt && (
                  <div style={{ marginBottom: 12, background: "#0a0a12", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 14, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #1c1c2e", background: "rgba(6,182,212,0.05)" }}>
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#06b6d4" }}>
                        ✨ Prompt de implementação
                      </p>
                      <button onClick={copiarPrompt}
                        style={{ background: copiado ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${copiado ? "rgba(34,197,94,0.4)" : "#27272a"}`, borderRadius: 8, color: copiado ? "#4ade80" : "#a1a1aa", fontSize: 11, fontWeight: 700, padding: "5px 12px", cursor: "pointer" }}>
                        {copiado ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>
                    <p style={{ margin: 0, padding: "16px", fontSize: 13, lineHeight: 1.75, color: "#d4d4d8", whiteSpace: "pre-wrap", fontFamily: "ui-monospace, SFMono-Regular, monospace", maxHeight: 420, overflowY: "auto" }}>
                      {prompt}
                    </p>
                    <div style={{ padding: "10px 16px", borderTop: "1px solid #1c1c2e", background: "rgba(124,58,237,0.05)" }}>
                      <p style={{ margin: 0, fontSize: 11, color: "#52525b" }}>
                        Cole isso no Claude Code dentro de <span style={{ color: "#a78bfa", fontFamily: "monospace" }}>~/lth-next</span> para executar.
                      </p>
                    </div>
                  </div>
                )}

                <button onClick={reiniciar}
                  style={{ width: "100%", background: "transparent", border: "1px solid #27272a", borderRadius: 12, color: "#a1a1aa", fontSize: 14, fontWeight: 700, padding: "12px", cursor: "pointer" }}>
                  🔄 Novo debate
                </button>
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} style={{ paddingBottom: 40 }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
