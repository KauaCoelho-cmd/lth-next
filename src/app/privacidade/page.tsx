export const metadata = {
  title: "Política de Privacidade | Hunter X",
  description: "Política de privacidade e termos de uso do Hunter X.",
};

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-[#06090d] px-6 py-20">
      <div className="mx-auto max-w-3xl">

        <p className="font-mono text-xs font-black tracking-[0.3em] text-violet-400 uppercase mb-4">Legal</p>
        <h1 className="text-4xl font-black text-white mb-2">Política de Privacidade</h1>
        <p className="text-zinc-500 text-sm mb-12">Última atualização: julho de 2026</p>

        <div className="space-y-12 text-zinc-400 leading-relaxed">

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">1. Quem somos</h2>
            <p>
              Hunter X é uma extensão para Google Chrome que escaneia a Biblioteca de Anúncios do Meta (dado público) e exibe informações como dias de veiculação, faixa de preço e score viral dos anúncios encontrados. Operamos em <a href="https://hunterx.site" className="text-violet-400 hover:underline">hunterx.site</a>. Dúvidas: <a href="mailto:suporte@hunterx.site" className="text-violet-400 hover:underline">suporte@hunterx.site</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">2. O que coletamos</h2>
            <p className="mb-3">Coletamos apenas o mínimo necessário para operar:</p>
            <ul className="space-y-2 list-none">
              {[
                "Endereço de e-mail — fornecido voluntariamente ao entrar na lista de espera.",
                "Data e hora do cadastro — para controle de fases de acesso.",
                "Chave de licença — gerada após o pagamento e vinculada ao seu e-mail.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-violet-400 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <strong className="text-white">Não coletamos</strong> dados financeiros, senhas, histórico de navegação, nem qualquer informação sobre o que você faz dentro da extensão após a instalação.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">3. Como usamos seus dados</h2>
            <ul className="space-y-2 list-none">
              {[
                "Enviar sua chave de acesso após o pagamento.",
                "Comunicar abertura de novas fases e atualizações importantes.",
                "Prevenir uso indevido da licença.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-violet-400 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins comerciais.</p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">4. Pagamentos</h2>
            <p>
              Os pagamentos são processados pelo <strong className="text-white">Mercado Pago</strong> e/ou <strong className="text-white">Hotmart</strong>. Não temos acesso aos seus dados de cartão, CPF ou informações bancárias. Essas plataformas possuem suas próprias políticas de privacidade e segurança.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">5. Fonte dos dados da extensão</h2>
            <p>
              A extensão acessa exclusivamente a <strong className="text-white">Biblioteca de Anúncios do Meta</strong>, que é uma base de dados pública disponibilizada pelo próprio Facebook/Instagram. Não acessamos contas privadas, dados de usuários nem qualquer informação restrita da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">6. Limitação de responsabilidade</h2>
            <ul className="space-y-3 list-none">
              {[
                "Os dados exibidos pela extensão são informativos. Não garantimos que qualquer produto identificado pela ferramenta gerará vendas ou lucro.",
                "A Meta Platforms, Inc. pode alterar ou remover a Biblioteca de Anúncios a qualquer momento. Não somos responsáveis por indisponibilidades causadas por mudanças na plataforma.",
                "Por se tratar de produto digital com entrega imediata (chave de licença), não realizamos reembolsos após a ativação da chave.",
                "Hunter X não é afiliado, endossado nem patrocinado pelo Meta Platforms, Inc.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-violet-400 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">7. Seus direitos (LGPD)</h2>
            <p className="mb-3">Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul className="space-y-2 list-none">
              {[
                "Solicitar acesso aos seus dados armazenados.",
                "Solicitar a exclusão do seu e-mail da nossa base a qualquer momento.",
                "Revogar consentimento para recebimento de comunicações.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-violet-400 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">Para exercer qualquer um desses direitos, envie um e-mail para <a href="mailto:suporte@hunterx.site" className="text-violet-400 hover:underline">suporte@hunterx.site</a>.</p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">8. Cookies</h2>
            <p>
              O site utiliza cookies técnicos essenciais para funcionamento (sessão, segurança) e cookies de análise via Google Analytics para entender o tráfego de forma agregada e anônima. Você pode desativar cookies nas configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">9. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Mudanças significativas serão comunicadas por e-mail. O uso continuado do serviço após a notificação implica aceitação das novas condições.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-lg mb-3 tracking-wide">10. Contato</h2>
            <p>
              Qualquer dúvida sobre esta política ou sobre seus dados: <a href="mailto:suporte@hunterx.site" className="text-violet-400 hover:underline">suporte@hunterx.site</a>
            </p>
          </section>

        </div>

        <div className="mt-16 border-t border-white/5 pt-8">
          <a href="/" className="font-mono text-xs text-zinc-600 hover:text-violet-400 transition-colors">← Voltar ao site</a>
        </div>

      </div>
    </main>
  );
}
