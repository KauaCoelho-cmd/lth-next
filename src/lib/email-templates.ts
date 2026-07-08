const HERO_IMG = 'https://hunterx.site/email-hero.png';
const HERO_UNLOCKED_IMG = 'https://hunterx.site/email-hero-unlocked.png';
const HERO_GHOST_IMG = 'https://hunterx.site/email-hero-ghost.png';
const INSIDE_IMG = 'https://hunterx.site/email-inside.png';
const LOGO_IMG = 'https://hunterx.site/logo.png';
const EXTENSION_URL = 'https://hunterx.site/hunter-x.zip';

// Header com logo — primeira coisa que aparece ao abrir o email
const logoHeader = `
  <tr><td style="background:#000;padding:28px 40px 20px;text-align:center;border-bottom:1px solid #111">
    <img src="${LOGO_IMG}" width="44" height="44" alt="Hunter X" style="display:inline-block">
    <p style="margin:10px 0 0;font-size:11px;font-weight:900;letter-spacing:6px;color:#52525b;text-transform:uppercase">HUNTER&nbsp;X</p>
  </td></tr>`;

export function welcomeEmail(paymentLink: string) {
  return {
    subject: 'Você encontrou algo que poucos acham',
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <tr><td style="font-size:0;line-height:0;color:#000;display:none">Não é pra todo mundo. Talvez seja pra você.</td></tr>

  ${logoHeader}

  <!-- Hero Image full bleed -->
  <tr><td style="padding:0;line-height:0">
    <img src="${HERO_IMG}" width="600" style="display:block;width:100%;height:auto" alt="Hunter X">
  </td></tr>

  <!-- Heading -->
  <tr><td style="background:#000;padding:40px 40px 0;text-align:center">
    <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:5px;color:#fff;text-transform:uppercase">VOCÊ ACHOU</h1>
    <p style="margin:16px 0 0;font-size:16px;color:#a1a1aa;line-height:1.8">
      Sério — a maioria passa direto por essa página.<br>
      Você não. Você parou, olhou de novo, e clicou.
    </p>
  </td></tr>

  <!-- Mistério / exclusividade -->
  <tr><td style="background:#000;padding:28px 44px;text-align:center">
    <p style="margin:0;font-size:14px;color:#71717a;line-height:1.9">
      Eu não vou te explicar tudo por email.<br>
      Só vou te dizer o que importa: existe um grupo pequeno<br>
      de pessoas que encontra produto validado <em style="color:#a1a1aa">antes</em> de viralizar.<br>
      Enquanto todo mundo copia, eles escolhem.<br><br>
      <strong style="color:#fff">Uma dessas vagas está no seu nome agora.</strong><br>
      Ninguém mais recebeu este email por você.
    </p>
  </td></tr>

  <!-- Espiada no lado de dentro -->
  <tr><td style="background:#000;padding:8px 0 0;line-height:0">
    <img src="${INSIDE_IMG}" width="600" style="display:block;width:100%;height:auto" alt="O que existe do lado de dentro">
  </td></tr>
  <!-- Preço como selo -->
  <tr><td style="background:#000;padding:8px 40px 32px;text-align:center">
    <div style="display:inline-block;border:2px solid #fff;border-radius:0;padding:22px 52px">
      <p style="margin:0;font-size:44px;font-weight:900;color:#fff;letter-spacing:2px">$12,90<span style="font-size:16px;font-weight:400;color:#71717a">/mês</span></p>
    </div>
    <p style="margin:14px 0 0;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:1px">PREÇO CONGELADO PARA SEMPRE</p>
    <p style="margin:6px 0 0;font-size:12px;color:#52525b">Quem entra agora, paga isso pra sempre. Quem espera, não.</p>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#000;padding:0 40px 40px;text-align:center">
    <a href="${paymentLink}" style="display:inline-block;background:#fff;color:#000;font-size:15px;font-weight:900;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:18px 56px">ENTRAR</a>
  </td></tr>

  <!-- Divisor -->
  <tr><td style="background:#000;padding:0 60px"><div style="border-top:1px solid #1a1a1a"></div></td></tr>

  <!-- O que é (sem entregar tudo) -->
  <tr><td style="background:#000;padding:36px 40px;text-align:center">
    <p style="margin:0 0 24px;font-size:11px;font-weight:900;letter-spacing:5px;color:#52525b;text-transform:uppercase">O QUE ABRE COM A SUA CHAVE</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="33%" style="padding:8px;vertical-align:top;text-align:center">
          <div style="display:inline-block;width:44px;height:44px;line-height:44px;border:1px solid #a78bfa;margin-bottom:10px"><span style="font-size:20px;color:#a78bfa;font-weight:700">⌖</span></div>
          <p style="margin:0;font-size:13px;font-weight:800;color:#fff">Raio-X</p>
          <p style="margin:4px 0 0;font-size:11px;color:#52525b;line-height:1.5">Veja o que está por trás de cada anúncio</p>
        </td>
        <td width="33%" style="padding:8px;vertical-align:top;text-align:center">
          <div style="display:inline-block;width:44px;height:44px;line-height:44px;border:1px solid #22d3ee;margin-bottom:10px"><span style="font-size:20px;color:#22d3ee;font-weight:700">⧉</span></div>
          <p style="margin:0;font-size:13px;font-weight:800;color:#fff">Espelho</p>
          <p style="margin:4px 0 0;font-size:11px;color:#52525b;line-height:1.5">Clone qualquer página em minutos</p>
        </td>
        <td width="33%" style="padding:8px;vertical-align:top;text-align:center">
          <div style="display:inline-block;width:44px;height:44px;line-height:44px;border:1px solid #fbbf24;margin-bottom:10px"><span style="font-size:20px;color:#fbbf24;font-weight:700">∞</span></div>
          <p style="margin:0;font-size:13px;font-weight:800;color:#fff">Vitalício</p>
          <p style="margin:4px 0 0;font-size:11px;color:#52525b;line-height:1.5">Seu preço nunca muda</p>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-size:12px;color:#3f3f46;font-style:italic">O resto você só descobre do lado de dentro.</p>
  </td></tr>

  <!-- Slogan -->
  <tr><td style="background:#000;padding:16px 40px 8px;text-align:center">
    <p style="margin:0;font-family:Georgia,serif;font-size:26px;font-style:italic;color:#a78bfa">Caçe.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#000;padding:32px 40px;text-align:center;border-top:1px solid #111">
    <img src="${LOGO_IMG}" width="28" height="28" alt="HX" style="display:inline-block;margin-bottom:12px">
    <p style="margin:0 0 4px;font-size:11px;color:#27272a;letter-spacing:1px">hunterx.site</p>
    <p style="margin:0;font-size:10px;color:#1a1a1a;line-height:1.6">
      Você recebeu este email porque se cadastrou em hunterx.site
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`,
  };
}

export function keyDeliveryEmail(key: string) {
  return {
    subject: 'Acesso liberado',
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <tr><td style="font-size:0;line-height:0;color:#000;display:none">Bem-vindo ao lado de dentro. Sua chave está aqui.</td></tr>

  ${logoHeader}

  <!-- Hero Image full bleed -->
  <tr><td style="padding:0;line-height:0">
    <img src="${HERO_UNLOCKED_IMG}" width="600" style="display:block;width:100%;height:auto" alt="Acesso liberado — Hunter X">
  </td></tr>

  <!-- Heading -->
  <tr><td style="background:#000;padding:40px 40px 0;text-align:center">
    <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:5px;color:#fff;text-transform:uppercase">O COFRE É SEU</h1>
    <p style="margin:16px 0 0;font-size:16px;color:#a1a1aa;line-height:1.8">
      Muita gente chegou até a porta essa semana.<br>
      Você foi um dos poucos que atravessou.
    </p>
  </td></tr>

  <!-- Boas-vindas humanas -->
  <tr><td style="background:#000;padding:24px 44px 0;text-align:center">
    <p style="margin:0;font-size:14px;color:#71717a;line-height:1.9">
      A partir de agora você vê o jogo de outro ângulo:<br>
      quanto tempo cada anúncio roda, o que está escalando,<br>
      o que está morrendo — <strong style="color:#fff">antes de todo mundo perceber.</strong>
    </p>
  </td></tr>

  <!-- A CHAVE — cupom estilo Skullcandy -->
  <tr><td style="background:#000;padding:32px 40px;text-align:center">
    <p style="margin:0 0 14px;font-size:11px;font-weight:900;letter-spacing:5px;color:#fbbf24;text-transform:uppercase">SUA CHAVE — GUARDE COMO OURO</p>
    <div style="display:inline-block;border:2px solid #fff;border-radius:0;padding:28px 40px;min-width:300px">
      <p style="margin:0;font-size:12px;font-weight:900;letter-spacing:5px;color:#fff;word-break:break-all;line-height:1.9">${key}</p>
    </div>
    <p style="margin:18px 0 0;font-size:13px;color:#52525b">Cole a chave acima no popup da extensão</p>
  </td></tr>

  <!-- CTA Download -->
  <tr><td style="background:#000;padding:0 40px 40px;text-align:center">
    <a href="${EXTENSION_URL}" style="display:inline-block;background:#fff;color:#000;font-size:15px;font-weight:900;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:18px 56px">BAIXAR</a>
  </td></tr>

  <!-- Divisor -->
  <tr><td style="background:#000;padding:0 60px"><div style="border-top:1px solid #1a1a1a"></div></td></tr>

  <!-- Como instalar -->
  <tr><td style="background:#000;padding:36px 40px">
    <p style="margin:0 0 24px;font-size:11px;font-weight:900;letter-spacing:5px;color:#52525b;text-transform:uppercase;text-align:center">COMO INSTALAR</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        ['01', 'Baixe o .zip e extraia a pasta'],
        ['02', 'Abra chrome://extensions'],
        ['03', 'Ative o Modo desenvolvedor'],
        ['04', 'Carregar sem compactação → selecione a pasta'],
        ['05', 'Cole a chave no popup do Hunter X'],
      ].map(([n, text]) => `
      <tr>
        <td style="padding:10px 0;vertical-align:middle;width:40px">
          <span style="font-size:14px;font-weight:900;color:#a78bfa;letter-spacing:1px">${n}</span>
        </td>
        <td style="padding:10px 0 10px 12px;font-size:14px;color:#a1a1aa;line-height:1.5">${text}</td>
      </tr>`).join('')}
    </table>
  </td></tr>

  <!-- SiteScope incluso -->
  <tr><td style="background:#000;padding:0 40px 36px;text-align:center">
    <div style="border:1px solid #1a1a1a;padding:28px 24px">
      <p style="margin:0 0 4px;font-size:11px;font-weight:900;letter-spacing:4px;color:#22d3ee;text-transform:uppercase">INCLUSO</p>
      <p style="margin:0 0 10px;font-size:20px;font-weight:900;color:#fff">SiteScope</p>
      <p style="margin:0 0 20px;font-size:13px;color:#52525b;line-height:1.6">Editor visual de landing pages. Clone, edite, baixe.</p>
      <a href="https://hunterx.site/sitescope" style="display:inline-block;border:1px solid #22d3ee;color:#22d3ee;font-size:12px;font-weight:900;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:12px 32px">ABRIR</a>
    </div>
  </td></tr>

  <!-- Slogan -->
  <tr><td style="background:#000;padding:16px 40px 8px;text-align:center">
    <p style="margin:0;font-family:Georgia,serif;font-size:26px;font-style:italic;color:#a78bfa">Caçe.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#000;padding:32px 40px;text-align:center;border-top:1px solid #111">
    <img src="${LOGO_IMG}" width="28" height="28" alt="HX" style="display:inline-block;margin-bottom:12px">
    <p style="margin:0 0 4px;font-size:11px;color:#27272a;letter-spacing:1px">hunterx.site</p>
    <p style="margin:0;font-size:10px;color:#1a1a1a;line-height:1.6">
      Guarde esta chave em lugar seguro.<br>
      Dúvidas? Responda este email — a gente lê tudo.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`,
  };
}

export function ghostEmail(paymentLink: string) {
  return {
    subject: 'Deixamos aberta. Por enquanto.',
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <tr><td style="font-size:0;line-height:0;color:#000;display:none">Ontem você chegou até a porta. Ela continua aberta — mas não por muito tempo.</td></tr>

  ${logoHeader}

  <!-- Hero -->
  <tr><td style="padding:0;line-height:0">
    <img src="${HERO_GHOST_IMG}" width="600" style="display:block;width:100%;height:auto" alt="A porta está se fechando — Hunter X">
  </td></tr>

  <!-- Heading -->
  <tr><td style="background:#000;padding:40px 40px 0;text-align:center">
    <h1 style="margin:0;font-size:30px;font-weight:900;letter-spacing:4px;color:#fff;text-transform:uppercase">ELA ESTÁ SE FECHANDO</h1>
    <p style="margin:18px 0 0;font-size:16px;color:#a1a1aa;line-height:1.9">
      Ontem você chegou até aqui. E parou.<br>
      Eu entendo — todo mundo hesita na porta.
    </p>
  </td></tr>

  <!-- Copy de exclusividade -->
  <tr><td style="background:#000;padding:28px 48px;text-align:center">
    <p style="margin:0;font-size:14px;color:#71717a;line-height:1.9">
      Sua vaga na Fase 4 ainda está no seu nome.<br>
      Ninguém pegou. Ninguém sabe que ela existe.<br>
      <strong style="color:#fff">Mas as correntes não esperam ninguém</strong> —<br>
      quando a fase fechar, essa porta some. E não avisa.
    </p>
  </td></tr>

  <!-- Preço -->
  <tr><td style="background:#000;padding:4px 40px 32px;text-align:center">
    <div style="display:inline-block;border:2px solid #fff;padding:20px 48px">
      <p style="margin:0;font-size:40px;font-weight:900;color:#fff;letter-spacing:2px">$12,90<span style="font-size:15px;font-weight:400;color:#71717a">/mês</span></p>
    </div>
    <p style="margin:14px 0 0;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:1px">AINDA NO PREÇO DA FASE 4</p>
    <p style="margin:6px 0 0;font-size:12px;color:#52525b">Na Fase 5: $19,90. Quem travou, travou.</p>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#000;padding:0 40px 44px;text-align:center">
    <a href="${paymentLink}" style="display:inline-block;background:#fff;color:#000;font-size:15px;font-weight:900;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:18px 56px">ATRAVESSAR</a>
    <p style="margin:14px 0 0;font-size:12px;color:#3f3f46">PIX · Cartão · Aprovação na hora</p>
  </td></tr>

  <!-- Fecho -->
  <tr><td style="background:#000;padding:0 40px 8px;text-align:center;border-top:1px solid #111">
    <p style="margin:28px 0 0;font-size:13px;color:#52525b;font-style:italic;font-family:Georgia,serif;line-height:1.8">
      "Este é o único lembrete que enviamos.<br>Quem entende, entende na primeira."
    </p>
    <p style="margin:20px 0 0;font-family:Georgia,serif;font-size:26px;font-style:italic;color:#a78bfa">Caçe.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#000;padding:32px 40px;text-align:center">
    <img src="${LOGO_IMG}" width="28" height="28" alt="HX" style="display:inline-block;margin-bottom:12px">
    <p style="margin:0 0 4px;font-size:11px;color:#27272a;letter-spacing:1px">hunterx.site</p>
    <p style="margin:0;font-size:10px;color:#1a1a1a;line-height:1.6">Você recebeu este email porque se cadastrou em hunterx.site</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`,
  };
}
