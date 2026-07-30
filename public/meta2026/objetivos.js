let objetivos = JSON.parse(localStorage.getItem('objetivos2026') || '[]');

function render() {
  const lista = document.getElementById('objetivos-lista');
  if (objetivos.length === 0) {
    lista.innerHTML = '<p style="color:#666;font-size:0.9rem;padding:0.5rem 0">Nenhum objetivo ainda. Adicione abaixo.</p>';
    return;
  }
  lista.innerHTML = objetivos.map((o, i) => `
    <div class="objetivo-item">
      <span>${o}</span>
      <button onclick="remover(${i})" title="Remover">✕</button>
    </div>
  `).join('');
}

function adicionarObjetivo() {
  const input = document.getElementById('input-objetivo');
  const val = input.value.trim();
  if (!val) return;
  objetivos.push(val);
  input.value = '';
  render();
}

function remover(i) {
  objetivos.splice(i, 1);
  render();
}

function salvar() {
  localStorage.setItem('objetivos2026', JSON.stringify(objetivos));
  // Limpar cache para forçar novas metas amanhã
  localStorage.removeItem('metas2026_data');
  const msg = document.getElementById('msg');
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 3000);
}

// Enter para adicionar
document.getElementById('input-objetivo').addEventListener('keydown', e => {
  if (e.key === 'Enter') adicionarObjetivo();
});

render();
