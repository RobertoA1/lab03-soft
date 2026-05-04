/**
 * alertas.js - Centro de Alertas (Phase 3: ALRT-01)
 * - Genera alertas dinamicas via reglas + senal predictiva
 * - Muestra explicacion (rationale + recomendacion + confianza)
 * - Permite reconocer / resolver con persistencia
 */
(function () {
  const filtros = { estado: 'pendiente', severidad: '', loteId: '' };

  function poblarFiltroLotes(data) {
    const sel = document.getElementById('f-lote');
    const lotes = window.AgroData.getLotes(data);
    sel.innerHTML = '<option value="">Todos los lotes</option>' + lotes.map(l => `<option value="${l.id}">${l.nombre}</option>`).join('');
  }

  function renderResumen(data) {
    const r = window.AgroData.getAlertasResumen(data);
    const cards = [
      { label: 'Pendientes', value: r.pendientes, icon: 'lucide:bell', color: 'bg-[#c44b4b]/10 text-[#c44b4b]' },
      { label: 'Severidad alta', value: r.porSeveridad.alta, icon: 'lucide:alert-circle', color: 'bg-[#c44b4b]/10 text-[#c44b4b]' },
      { label: 'Reconocidas', value: r.reconocidas, icon: 'lucide:eye', color: 'bg-[#d4a84b]/10 text-[#d4a84b]' },
      { label: 'Resueltas', value: r.resueltas, icon: 'lucide:check-circle-2', color: 'bg-[#3b9e5a]/10 text-[#3b9e5a]' },
    ];
    document.getElementById('resumen-cards').innerHTML = cards.map(c => `<div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-full ${c.color} flex items-center justify-center"><iconify-icon icon="${c.icon}" class="text-xl"></iconify-icon></div><div><p class="text-2xl font-bold text-[#1a1f2b] leading-none">${c.value}</p><p class="text-xs text-[#64748b] mt-1">${c.label}</p></div></div>`).join('');
  }

  function getColors(severidad) {
    return ({
      alta: { border: 'border-[#c44b4b]/30', bg: 'bg-[#c44b4b]/5', tag: 'bg-[#c44b4b] text-white', icon: 'lucide:alert-circle', iconColor: 'text-[#c44b4b]' },
      media: { border: 'border-[#d4a84b]/30', bg: 'bg-[#d4a84b]/5', tag: 'bg-[#d4a84b] text-white', icon: 'lucide:alert-triangle', iconColor: 'text-[#d4a84b]' },
      baja: { border: 'border-[#404e7c]/30', bg: 'bg-[#404e7c]/5', tag: 'bg-[#404e7c] text-white', icon: 'lucide:info', iconColor: 'text-[#404e7c]' },
    })[severidad] || {};
  }

  function renderAlertas(data) {
    const todas = window.AgroData.generarAlertas(data);
    const filtradas = todas.filter(a =>
      (!filtros.estado || a.estado === filtros.estado) &&
      (!filtros.severidad || a.severidad === filtros.severidad) &&
      (!filtros.loteId || a.loteId === filtros.loteId)
    );
    const cont = document.getElementById('lista-alertas');
    if (!filtradas.length) { cont.innerHTML = '<div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-8 text-center text-[#94a3b8]"><iconify-icon icon="lucide:check-circle-2" class="text-4xl text-[#86cb92]"></iconify-icon><p class="mt-2 text-sm">Sin alertas que coincidan con los filtros.</p></div>'; return; }
    cont.innerHTML = filtradas.map(a => {
      const c = getColors(a.severidad);
      const estadoTag = a.estado === 'pendiente'
        ? '<span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#c44b4b]/10 text-[#c44b4b]">Pendiente</span>'
        : a.estado === 'reconocida'
          ? '<span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#d4a84b]/10 text-[#d4a84b]">Reconocida</span>'
          : '<span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#3b9e5a]/10 text-[#3b9e5a]">Resuelta</span>';
      return `<div class="bg-white rounded-xl shadow-sm border ${c.border} ${c.bg} p-5">
        <div class="flex items-start gap-4">
          <iconify-icon icon="${c.icon}" class="${c.iconColor} text-2xl flex-shrink-0 mt-0.5"></iconify-icon>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${c.tag}">${a.severidad}</span>
              <span class="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">${a.categoria}</span>
              ${estadoTag}
              <span class="text-[11px] text-[#94a3b8]">${a.fecha || '-'}</span>
              <span class="text-[11px] text-[#94a3b8]">conf. ${(a.confianza * 100).toFixed(0)}%</span>
            </div>
            <p class="text-sm font-semibold text-[#1a1f2b]">${a.mensaje}</p>
            <details class="mt-3 group">
              <summary class="cursor-pointer text-xs font-medium text-[#404e7c] hover:text-[#86cb92]">Ver explicacion y recomendacion</summary>
              <div class="mt-2 text-xs text-[#475569] space-y-1.5 pl-3 border-l-2 border-[#e2e8f0]">
                <p><strong>Por que se disparo:</strong> ${a.rationale}</p>
                <p><strong>Recomendacion:</strong> ${a.recomendacion}</p>
              </div>
            </details>
            ${a.notaResolucion ? `<p class="mt-2 text-xs text-[#3b9e5a] bg-[#3b9e5a]/10 px-2 py-1 rounded"><strong>Nota:</strong> ${a.notaResolucion}</p>` : ''}
          </div>
          <div class="flex flex-col gap-2 flex-shrink-0">
            ${a.estado === 'pendiente' ? `<button data-act="reconocer" data-hash="${a.hash}" class="text-xs px-3 py-1.5 rounded-lg border border-[#d4a84b]/40 text-[#d4a84b] hover:bg-[#d4a84b]/10 font-medium">Reconocer</button>` : ''}
            ${a.estado !== 'resuelta' ? `<button data-act="resolver" data-hash="${a.hash}" class="text-xs px-3 py-1.5 rounded-lg border border-[#3b9e5a]/40 text-[#3b9e5a] hover:bg-[#3b9e5a]/10 font-medium">Resolver</button>` : `<button data-act="reabrir" data-hash="${a.hash}" class="text-xs px-3 py-1.5 rounded-lg border border-[#94a3b8]/40 text-[#64748b] hover:bg-[#f1f5f9] font-medium">Reabrir</button>`}
          </div>
        </div>
      </div>`;
    }).join('');

    cont.querySelectorAll('button[data-act]').forEach(btn => btn.onclick = () => {
      const d = window.AgroData.getData();
      const hash = btn.dataset.hash;
      const act = btn.dataset.act;
      let estado = act === 'reconocer' ? 'reconocida' : act === 'resolver' ? 'resuelta' : 'pendiente';
      let nota = null;
      if (act === 'resolver') {
        nota = prompt('Nota breve (opcional):', '') || null;
      }
      window.AgroData.actualizarEstadoAlerta(d, hash, estado, nota);
      window.AgroApp.showToast('Alerta actualizada', 'success');
      reload();
    });
  }

  function reload() {
    const d = window.AgroData.getData();
    poblarFiltroLotes(d);
    renderResumen(d);
    renderAlertas(d);
    window.AgroApp.updateNotificationBadge();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('f-estado').onchange = e => { filtros.estado = e.target.value; reload(); };
    document.getElementById('f-severidad').onchange = e => { filtros.severidad = e.target.value; reload(); };
    document.getElementById('f-lote').onchange = e => { filtros.loteId = e.target.value; reload(); };
    reload();
  });
})();
