export const metadata = {
  title: "Termos de Uso | Hunter X",
  description:
    "Termos de uso do Hunter X e do SiteScope: o que a ferramenta faz, o que é permitido, o que é proibido e de quem é a responsabilidade.",
};

/* Cada item é um parágrafo. Listas viram array de strings. */
const secoes: { titulo: string; corpo: (string | string[])[] }[] = [
  {
    titulo: "1. Quem somos e o que este documento faz",
    corpo: [
      "Hunter X é um produto independente operado em hunterx.site. Ele reúne duas ferramentas: uma extensão de navegador que lê bibliotecas públicas de anúncios, e o SiteScope, um editor visual de páginas HTML que roda dentro do seu navegador.",
      "Estes Termos são o contrato entre você e o Hunter X. Ao instalar a extensão, ativar uma chave de licença ou usar o SiteScope, você declara que leu, entendeu e concorda com tudo o que está aqui. Se não concordar com qualquer ponto, não use as ferramentas.",
      "Dúvidas sobre este documento: suporte@hunterx.site.",
    ],
  },
  {
    titulo: "2. O que a ferramenta é — e o que ela não é",
    corpo: [
      "O Hunter X é uma ferramenta de pesquisa de mercado e o SiteScope é uma ferramenta de estudo, edição e criação de páginas. Ambos operam sobre informação que já é pública e acessível a qualquer pessoa com um navegador.",
      "O SiteScope não faz nada que o seu navegador não faça sozinho: ele lê o código-fonte de uma página pública, exibe esse código de forma visual e permite editá-lo. Ver o código-fonte de um site é função nativa de todo navegador desde que a internet existe.",
      "O que o SiteScope entrega é conveniência: em vez de você mexer no código na mão, você clica no elemento e edita. A ferramenta é neutra quanto ao uso — como um editor de texto, um editor de imagem ou o próprio navegador.",
      "O Hunter X NÃO é, e não se apresenta como:",
      [
        "uma ferramenta para republicar conteúdo de terceiros;",
        "um serviço de hospedagem — nada do que você edita fica nos nossos servidores;",
        "um meio de burlar login, paywall, proteção técnica ou área restrita de qualquer site;",
        "um produto afiliado, endossado ou patrocinado por qualquer plataforma de anúncios ou de e-commerce.",
      ],
    ],
  },
  {
    titulo: "3. Uso permitido",
    corpo: [
      "Você pode usar as ferramentas para:",
      [
        "pesquisar o mercado e identificar produtos, ofertas e formatos que estão em circulação;",
        "estudar a estrutura, a argumentação e os gatilhos de páginas públicas, para aprender o que funciona;",
        "modelar — ou seja, aplicar os aprendizados de estrutura e formato na construção da SUA página, com o SEU conteúdo;",
        "editar páginas e materiais dos quais você é o autor ou detentor dos direitos;",
        "editar páginas de clientes seus, desde que autorizado por eles;",
        "montar rascunhos, testes e protótipos de uso interno.",
      ],
      "Estrutura, ideia, formato, sequência de seções e funcionamento não são protegidos por direito autoral. Aprender com o que já funciona e aplicar no próprio negócio é prática legítima e comum no mercado.",
    ],
  },
  {
    titulo: "4. Uso proibido",
    corpo: [
      "O que é protegido é a expressão concreta: o texto escrito, as fotos, os vídeos, os logotipos, as marcas e o design específico. Isso pertence a quem criou. É expressamente proibido usar as ferramentas para:",
      [
        "publicar, no ar ou em qualquer canal, uma página de terceiro sem substituir o conteúdo dela pelo seu — textos, imagens, vídeos, marcas e logotipos;",
        "usar marca, nome comercial, logotipo ou identidade visual de terceiro sem autorização;",
        "se passar por outra pessoa, empresa ou marca, ou sugerir vínculo, parceria ou endosso que não existe;",
        "criar páginas de golpe, fraude, phishing, captura enganosa de dados, falso pagamento ou falso login;",
        "reproduzir depoimentos, provas, resultados, selos, certificações ou números de terceiros como se fossem seus;",
        "burlar login, paywall, bloqueio técnico, limite de acesso ou área restrita de qualquer site;",
        "acessar dados privados, contas alheias ou qualquer informação não pública;",
        "sobrecarregar, atacar ou prejudicar a infraestrutura de qualquer site;",
        "revender, sublicenciar, redistribuir ou compartilhar sua chave de licença;",
        "praticar qualquer ato que viole a legislação brasileira, incluindo direito autoral, propriedade industrial, direito do consumidor e proteção de dados.",
      ],
      "Na dúvida, use este teste: se você publicasse a página do jeito que está e o dono original a visse, ele reconheceria o trabalho dele ali? Se sim, você ainda não terminou de adaptar.",
    ],
  },
  {
    titulo: "5. De quem é a responsabilidade",
    corpo: [
      "A ferramenta é neutra. O uso não é. Quem decide o que fazer com o arquivo gerado é você, sozinho, fora do nosso alcance e sem qualquer participação nossa.",
      "Você é o único e exclusivo responsável pelo conteúdo que produz, publica ou distribui, e por obter todas as autorizações e licenças necessárias para isso.",
      "O arquivo editado é baixado direto para o seu computador. Não hospedamos, não publicamos, não intermediamos e não temos acesso ao que você faz depois. Não temos como saber, monitorar ou controlar o destino do arquivo.",
      "Se o seu uso gerar reclamação, notificação, processo ou prejuízo a terceiro, a responsabilidade é integralmente sua. Você concorda em nos manter indenes — ou seja, arcar com custos, honorários e condenações que recaiam sobre o Hunter X em razão de atos praticados por você.",
    ],
  },
  {
    titulo: "6. Licença de uso",
    corpo: [
      "Sua chave de licença concede um direito de uso pessoal, intransferível e não exclusivo, válido enquanto a assinatura estiver ativa. Ela não transfere a propriedade do software.",
      "A chave é individual. Compartilhar, revender ou distribuir sua chave encerra o acesso imediatamente, sem reembolso.",
      "É proibido descompilar, aplicar engenharia reversa, modificar ou criar obra derivada das nossas ferramentas, salvo nas hipóteses expressamente permitidas em lei.",
      "Podemos suspender ou encerrar o acesso, sem aviso prévio e sem reembolso, de quem violar estes Termos — especialmente a seção 4.",
    ],
  },
  {
    titulo: "7. Pagamento, renovação e reembolso",
    corpo: [
      "O acesso é por assinatura, com renovação automática no período contratado, e pode ser cancelado a qualquer momento. Cancelar interrompe as cobranças seguintes; o acesso permanece até o fim do período já pago.",
      "O preço da fase em que você entrou é mantido enquanto a assinatura ficar ativa e sem interrupção. Cancelando e voltando depois, vale o preço da fase vigente na volta.",
      "Por se tratar de produto digital com entrega imediata da chave de licença, não há reembolso após a ativação — ressalvado o direito de arrependimento previsto no Código de Defesa do Consumidor para compras a distância, exercível em até 7 dias, desde que a chave não tenha sido ativada.",
    ],
  },
  {
    titulo: "8. Disponibilidade e limitação de garantias",
    corpo: [
      "As ferramentas são fornecidas no estado em que se encontram. Trabalhamos para mantê-las funcionando bem, mas não garantimos operação ininterrupta, livre de erros ou compatível com todo e qualquer site.",
      "As plataformas de origem podem mudar, restringir ou remover suas bibliotecas públicas a qualquer momento. Sites podem adotar proteções que impeçam a leitura do código. Nada disso está sob nosso controle e não gera direito a reembolso.",
      "Os dados exibidos — dias de veiculação, faixa de preço, score viral, nicho, plataforma — são informativos e estimados. Não são conselho de investimento nem promessa de resultado. Não garantimos que qualquer produto identificado gerará vendas, lucro ou retorno.",
      "Nenhuma parte destes Termos exclui direitos que o Código de Defesa do Consumidor garanta a você de forma inafastável.",
    ],
  },
  {
    titulo: "9. Propriedade intelectual do Hunter X",
    corpo: [
      "O nome Hunter X, o nome SiteScope, os logotipos, a identidade visual, os textos do site e o código das ferramentas são nossos e protegidos por lei.",
      "Marcas, nomes e logotipos de terceiros eventualmente citados pertencem a seus respectivos titulares. Qualquer menção é meramente descritiva, para indicar compatibilidade ou contexto, e não implica vínculo, autorização ou endosso.",
    ],
  },
  {
    titulo: "10. Privacidade",
    corpo: [
      "O tratamento dos seus dados está descrito na Política de Privacidade, que integra estes Termos.",
      "Em resumo: a extensão roda localmente no seu navegador e o conteúdo que você visualiza ou edita não é enviado para nós.",
    ],
  },
  {
    titulo: "11. Alterações",
    corpo: [
      "Podemos atualizar estes Termos para refletir mudanças no produto ou na legislação. A data da última atualização fica sempre no topo desta página.",
      "Mudanças relevantes serão comunicadas por e-mail ou dentro do produto. Continuar usando as ferramentas após a atualização significa concordar com a nova versão.",
    ],
  },
  {
    titulo: "12. Lei aplicável e foro",
    corpo: [
      "Estes Termos são regidos pela lei brasileira.",
      "Fica eleito o foro do domicílio do consumidor para dirimir controvérsias, conforme o Código de Defesa do Consumidor.",
    ],
  },
];

export default function Termos() {
  return (
    <main className="min-h-screen bg-[#06090d] px-6 py-20">
      <div className="mx-auto max-w-3xl">

        <p className="font-mono text-xs font-black tracking-[0.3em] text-violet-400 uppercase mb-4">Legal</p>
        <h1 className="text-4xl font-black text-white mb-2">Termos de Uso</h1>
        <p className="text-zinc-500 text-sm mb-8">Última atualização: agosto de 2026</p>

        {/* Resumo honesto no topo: ninguém lê 12 seções, mas todo mundo lê 4 linhas */}
        <div className="mb-12 rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-violet-300 mb-3">
            Resumo em 4 linhas
          </p>
          <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
            <li>• Use para <strong className="text-white">pesquisar, estudar e modelar</strong> — aprenda a estrutura e aplique no seu produto.</li>
            <li>• Antes de publicar, <strong className="text-white">troque tudo pelo seu</strong>: textos, imagens, vídeos e marcas.</li>
            <li>• Republicar a página de outra pessoa <strong className="text-white">é proibido</strong> aqui e ilegal lá fora.</li>
            <li>• O arquivo desce para o seu computador. O que você faz depois é <strong className="text-white">responsabilidade sua</strong>.</li>
          </ul>
        </div>

        <div className="space-y-12 text-zinc-400 leading-relaxed">
          {secoes.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-white font-black text-lg mb-3 tracking-wide">{s.titulo}</h2>
              {s.corpo.map((bloco, i) =>
                Array.isArray(bloco) ? (
                  <ul key={i} className="my-3 space-y-2 list-none">
                    {bloco.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="mb-3">{bloco}</p>
                )
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.07] pt-8">
          <p className="text-sm text-zinc-500">
            Dúvidas sobre estes Termos:{" "}
            <a href="mailto:suporte@hunterx.site" className="text-violet-400 hover:underline">
              suporte@hunterx.site
            </a>
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            Veja também a{" "}
            <a href="/privacidade" className="text-violet-400 hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
          <p className="mt-6 font-mono text-xs text-zinc-700 leading-relaxed">
            Produto independente. Não somos afiliados, endossados nem patrocinados por nenhuma
            plataforma de anúncios ou de e-commerce. Marcas citadas pertencem a seus respectivos donos.
          </p>
        </div>

      </div>
    </main>
  );
}
