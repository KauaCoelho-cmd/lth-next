#!/bin/bash
clear
echo ""
echo "  ╔══════════════════════════════════╗"
echo "  ║   HUNTER X — Instalador Mac      ║"
echo "  ║   hunterx.site                   ║"
echo "  ╚══════════════════════════════════╝"
echo ""

INSTALL_DIR="$HOME/Library/Application Support/HunterX"
ZIP_URL="https://lth-next-git-main-kauacoelho-cmds-projects.vercel.app/hunter-x.zip"
ZIP_FILE="/tmp/hunter-x.zip"

# [1/4] Download
echo "  [1/4] Baixando Hunter X..."
curl -L --progress-bar "$ZIP_URL" -o "$ZIP_FILE"
if [ $? -ne 0 ]; then
  echo ""
  echo "  [ERRO] Falha ao baixar. Verifique sua internet."
  read -p "  Pressione Enter para sair..."
  exit 1
fi

# [2/4] Extrair
echo "  [2/4] Extraindo arquivos..."
rm -rf "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR"
unzip -q "$ZIP_FILE" -d "$INSTALL_DIR"
rm "$ZIP_FILE"

# Acha pasta com manifest.json
EXT_DIR="$INSTALL_DIR"
for dir in "$INSTALL_DIR"/*/; do
  if [ -f "${dir}manifest.json" ]; then
    EXT_DIR="${dir%/}"
    break
  fi
done

# [3/4] Achar Chrome
echo "  [3/4] Procurando Chrome..."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BRAVE="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"

if [ ! -f "$CHROME" ]; then
  if [ -f "$BRAVE" ]; then
    CHROME="$BRAVE"
  else
    echo ""
    echo "  [AVISO] Chrome nao encontrado."
    echo "  Abra o Chrome e acesse: chrome://extensions"
    echo "  Ative o Modo Desenvolvedor e clique em 'Carregar sem compactação'"
    echo "  Selecione a pasta: $EXT_DIR"
    echo ""
    open "$EXT_DIR"
    read -p "  Pressione Enter para sair..."
    exit 0
  fi
fi

# [4/4] Abrir Chrome com extensão + Biblioteca de Anúncios
echo "  [4/4] Abrindo Chrome com Hunter X..."
"$CHROME" --load-extension="$EXT_DIR" --no-first-run "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&media_type=all" 2>/dev/null &

echo ""
echo "  ╔══════════════════════════════════╗"
echo "  ║  Hunter X instalado com sucesso! ║"
echo "  ║                                  ║"
echo "  ║  Biblioteca de Anuncios aberta!  ║"
echo "  ║  Clique no icone do Hunter X     ║"
echo "  ║  na barra do Chrome e comece!    ║"
echo "  ╚══════════════════════════════════╝"
echo ""
sleep 4
