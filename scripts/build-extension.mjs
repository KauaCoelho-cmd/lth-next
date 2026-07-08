/**
 * build-extension.mjs
 * Ofusca o código da extensão Hunter X e gera o hunter-x.zip em /public
 */

import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../../Documents/Claude/Projects/Localizar LOW TICKET DENTRO DO META/low-ticket-meta-extension');
const OUT = path.resolve(__dirname, '../tmp-extension-build');
const ZIP_DEST = path.resolve(__dirname, '../public/hunter-x.zip');

// Limpa e recria pasta de build
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

// Arquivos JS para ofuscar
const JS_FILES = ['popup.js', 'background.js', 'content.js'];

// Arquivos que copiamos sem alterar
const COPY_AS_IS = ['manifest.json', 'popup.html', 'popup.css', 'content.css'];

const OBF_OPTIONS = {
  compact: true,
  // ── Fluxo de controle — converte if/for em switch gigante ilegível
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.85,
  // ── Código morto — injeta funções falsas que nunca executam
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  // ── Nomes hexadecimais — _0x1a2b ao invés de nomes legíveis
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  // ── String array — todas as strings ficam num array embaralhado
  rotateStringArray: true,
  shuffleStringArray: true,
  stringArray: true,
  stringArrayEncoding: ['base64', 'rc4'],
  stringArrayThreshold: 1.0,
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 3,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 5,
  stringArrayWrappersType: 'function',
  // ── Split de strings — quebra strings longas em pedaços
  splitStrings: true,
  splitStringsChunkLength: 5,
  // ── Auto-defesa — o código detecta se foi modificado e para
  selfDefending: true,
  // ── Outros
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
  numbersToExpressions: true,
  simplify: true,
  disableConsoleOutput: true,
};

console.log('🔧 Ofuscando arquivos JS...');
for (const file of JS_FILES) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) { console.log(`  ⚠️  ${file} não encontrado, pulando`); continue; }
  const code = fs.readFileSync(src, 'utf-8');
  const result = JavaScriptObfuscator.obfuscate(code, OBF_OPTIONS).getObfuscatedCode();
  fs.writeFileSync(path.join(OUT, file), result);
  const ratio = Math.round((1 - result.length / code.length) * 100);
  console.log(`  ✅ ${file} — ${code.length} → ${result.length} chars (${ratio > 0 ? '+' : ''}${-ratio}% tamanho)`);
}

console.log('📋 Copiando arquivos estáticos...');
for (const file of COPY_AS_IS) {
  const src = path.join(SRC, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(OUT, file));
    console.log(`  ✅ ${file}`);
  }
}

// Copia pasta icons e vendor
for (const dir of ['icons', 'vendor']) {
  const srcDir = path.join(SRC, dir);
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, path.join(OUT, dir), { recursive: true });
    console.log(`  ✅ ${dir}/`);
  }
}

// Gera o zip
console.log('📦 Gerando hunter-x.zip...');
execSync(`cd "${OUT}" && zip -r "${ZIP_DEST}" . -x "*.DS_Store"`, { stdio: 'inherit' });

// Limpa build temp
fs.rmSync(OUT, { recursive: true });

const size = (fs.statSync(ZIP_DEST).size / 1024).toFixed(1);
console.log(`\n🎉 hunter-x.zip gerado em /public (${size} KB)`);
