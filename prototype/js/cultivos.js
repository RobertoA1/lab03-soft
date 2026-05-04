(function() {
  const data = window.AgroData.getData();

  function renderResumen() {
    const cultivos = window.AgroData.getCultivos(data);
    const lotes = window.AgroData.getLotes(data);
    const activos = cultivos.filter(c => c.estado === 'activo').length;
    const totalHa = lotes.reduce((s, l) => s + l.hectareas, 0);
    document.getElementById('res-total-cultivos').textContent = activos;
    document.getElementById('res-total-lotes').textContent = lotes.length;
    document.getElementById('res-total-hectareas').textContent = totalHa.toLocaleString();
  }

  function renderCultivos() {
    const tbody = document.getElementById('cultivos-table-body');
    if (!tbody) return;
    const cultivos = window.AgroData.getCultivos(data);
    const lotes = window.AgroData.getLotes(data);
    const lotesMap = Object.fromEntries(lotes.map(l => [l.id, l.nombre]));

    const estadoCls = {
      activo: 'bg-[#86cb92]/10 text-[#3b9e5a]',
      cosechado: 'bg-[#404e7c]/10 text-[#404e7c]',
      planificado: 'bg-[#d4a84b]/10 text-[#d4a84b]',
    };

    tbody.innerHTML = cultivos.map((c, i) => `
      <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'} hover:bg-[#f8fafc] transition-colors">
        <td class="px-3 py-2 font-medium text-[#1a1f2b]">${c.nombre}</td>
        <td class="px-3 py-2 text-[#64748b]">${c.variedad}</td>
        <td class="px-3 py-2 text-[#64748b]">${lotesMap[c.loteId] || c.loteId}</td>
        <td class="px-3 py-2 text-[#64748b]">${c.areaHa} ha</td>
        <td class="px-3 py-2 text-[#64748b]">${c.temporada}</td>
        <td class="px-3 py-2"><span class="inline-block px-2 py-0.5 rounded-full text-xs font-medium ${estadoCls[c.estado] || estadoCls.planificado}">${c.estado}</span></td>
      </tr>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderResumen();
    renderCultivos();
  });
})();
