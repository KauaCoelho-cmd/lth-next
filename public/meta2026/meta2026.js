const STORAGE_KEY_METAS = 'metas2026_dia';
const STORAGE_KEY_DATA = 'metas2026_data';
const STORAGE_KEY_FEITAS = 'metas2026_feitas';

function hoje() {
  return new Date().toISOString().split('T')[0];
}

function setData() {
  const d = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('date').textContent = d.toLocaleDateString('pt-BR', opts);
}

function mostrarEstado(id) {
  ['loading', 'metas-list', 'empty', 'erro'].forEach(s => {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

async function gerarMetas(forcar = false) {
  const objetivos = JSON.parse(localStorage.getItem('objetivos2026') || '[]');

  if (objetivos.length === 0) {
    mostrarEstado('empty');
    return;
  }

  // Usar cache do dia se existir
  const dataCache = localStorage.getItem(STORAGE_KEY_DATA);
  const metasCache = localStorage.getItem(STORAGE_KEY_METAS);
  if (!forcar && dataCache === hoje() && metasCache) {
    renderMetas(JSON.parse(metasCache));
    return;
  }

  mostrarEstado('loading');

  try {
    const resp = await fetch('/api/gerar-metas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ objetivos, data: hoje() })
    });

    if (!resp.ok) throw new Error('Erro na API');

    const { metas } = await resp.json();
    localStorage.setItem(STORAGE_KEY_METAS, JSON.stringify(metas));
    localStorage.setItem(STORAGE_KEY_DATA, hoje());
    localStorage.setItem(STORAGE_KEY_FEITAS, JSON.stringify([]));
    renderMetas(metas);
  } catch (e) {
    mostrarEstado('erro');
  }
}

function renderMetas(metas) {
  const lista = document.getElementById('metas-list');
  const feitas = JSON.parse(localStorage.getItem(STORAGE_KEY_FEITAS) || '[]');

  lista.innerHTML = '';

  metas.forEach((meta, i) => {
    const feita = feitas.includes(i);
    const li = document.createElement('li');
    li.className = `meta-item${feita ? ' feita' : ''}`;
    li.innerHTML = `
      <div class="meta-check"></div>
      <span class="meta-texto">${meta.texto}</span>
      <span class="meta-tag">${meta.categoria || ''}</span>
    `;
    li.addEventListener('click', () => toggleFeita(i, metas));
    lista.appendChild(li);
  });

  // Progresso
  const total = metas.length;
  const done = feitas.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!document.querySelector('.progresso')) {
    const prog = document.createElement('div');
    prog.className = 'progresso';
    prog.innerHTML = `
      <div class="progresso-bar-bg"><div class="progresso-bar" style="width:${pct}%"></div></div>
      <span class="progresso-texto">${done}/${total}</span>
    `;
    lista.after(prog);
  } else {
    document.querySelector('.progresso-bar').style.width = `${pct}%`;
    document.querySelector('.progresso-texto').textContent = `${done}/${total}`;
  }

  mostrarEstado('metas-list');
}

function toggleFeita(index, metas) {
  const feitas = JSON.parse(localStorage.getItem(STORAGE_KEY_FEITAS) || '[]');
  const idx = feitas.indexOf(index);
  if (idx === -1) feitas.push(index);
  else feitas.splice(idx, 1);
  localStorage.setItem(STORAGE_KEY_FEITAS, JSON.stringify(feitas));
  renderMetas(metas);
}

function regenerar() {
  if (confirm('Gerar novas metas para hoje?')) {
    gerarMetas(true);
  }
}

setData();
gerarMetas();
