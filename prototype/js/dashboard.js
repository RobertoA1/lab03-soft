/**
 * dashboard.js - Panel de Control (Phase 2: DASH-01, DASH-02 + Phase 3: ALRT-01)
 * - Wire dinamico al motor de alertas
 * - Filtro por lote / temporada
 * - "Que cambio" en lecturas y produccion
 */
(function () {
  const filtros = { loteId: '', temporada: '' };

  function poblarFiltros(data) {
    const fl = document.getElementById('f-lote');
    const ft = document.getElementById('f-temporada');
    if (fl) fl.innerHTML = '<option value="">Todos los lotes</option>' + window.AgroData.getLotes(data).map(l => `<option value="${l.id}">${l.nombre}</option>`).join('');
    if (ft) ft.innerHTML = '<option value="">Todas las temporadas</option>' + window.AgroData.getTemporadas(data).map(t => `<option value="${t}">${t}</option>`).join('');
  }

  function renderStats(data) {
    const cultivos = window.AgroData.getCultivos(data).filter(c => (!filtros.loteId || c.loteId === filtros.loteId) && (!filtros.temporada || c.temporada === filtros.temporada));
    const riego = (data.riego || []).filter(r => !filtros.loteId || r.loteId === filtros.loteId);
    const clima = (data.clima || []).filter(c => !filtros.loteId || c.loteId === filtros.loteId);
    const totalHa = cultivos.reduce((s, c) => s + c.areaHa, 0);
    const totalAgua = riego.reduce((s, r) => s + r.volumenLitros, 0);
    const avgTemp = clima.length ? (clima.reduce((s, c) => s + c.tempMax, 0) / clima.length).toFixed(1) : 0;
    const ultimosSuelo = window.AgroData.getSueloPorLote(data, filtros.loteId).slice().sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
    const humedadActual = ultimosSuelo ? ultimosSuelo.humedadSuelo + '%' : '-';

    document.getElementById('stat-cultivos').textContent = totalHa.toLocaleString() + ' ha';
    document.getElementById('stat-agua').textContent = totalAgua.toLocaleString();
    document.getElementById('stat-temp').textContent = avgTemp + 'C';
    document.getElementById('stat-rendimiento').textContent = humedadActual;
  }

  function renderMoistureChart(data) {
    const svg = document.getElementById('moisture-chart');
    if (!svg) return;
    const lid = filtros.loteId;
    const clima = window.AgroData.getClimaPorLote(data, lid).slice().sort((a, b) => a.fecha.localeCompare(b.fecha)).slice(-14);
    if (!clima.length) { svg.innerHTML = '<text x="400" y="150" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="Inter">Sin datos</text>'; return; }
    const w = 800, h = 300, pad = 50;
    const xStep = (w - pad * 2) / Math.max(1, clima.length - 1);
    const yScale = v => h - pad - (v / 100) * (h - pad * 2);
    let pathD = '', areaD = `M ${pad} ${h - pad} `, points = '', xLabels = '';
    clima.forEach((c, i) => {
      const x = pad + i * xStep, y = yScale(c.humedad);
      pathD += (i ? ' L ' : 'M ') + x + ' ' + y;
      areaD += `L ${x} ${y} `;
      points += `<circle cx="${x}" cy="${y}" r="4" fill="#86cb92" stroke="white" stroke-width="2"/>`;
      if (i % Math.max(1, Math.floor(clima.length / 7)) === 0 || i === clima.length - 1)
        xLabels += `<text x="${x}" y="${h - pad + 22}" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter">${c.fecha.slice(5)}</text>`;
    });
    areaD += `L ${pad + (clima.length - 1) * xStep} ${h - pad} Z`;
    let grid = '';
    [0, 25, 50, 75, 100].forEach(v => {
      const y = yScale(v);
      grid += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="#e2e8f0" stroke-width="1" ${v > 0 ? 'stroke-dasharray="4 4"' : ''}/>`;
      grid += `<text x="${pad - 10}" y="${y + 4}" text-anchor="end" fill="#94a3b8" font-size="11" font-family="Inter">${v}%</text>`;
    });
    svg.innerHTML = `<defs><linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#86cb92" stop-opacity="0.35"/><stop offset="100%" stop-color="#86cb92" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${areaD}" fill="url(#moistureGradient)"/><path d="${pathD}" fill="none" stroke="#86cb92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${points}${xLabels}`;
  }

  function renderAlerts(data) {
    const cont = document.getElementById('alerts-list');
    if (!cont) return;
    const alertas = window.AgroData.getAlertasPendientes(data)
      .filter(a => !filtros.loteId || a.loteId === filtros.loteId)
      .slice(0, 5);
    document.getElementById('alert-count').textContent = alertas.length + ' pendientes';
    if (!alertas.length) { cont.innerHTML = '<p class="text-sm text-[#94a3b8]">Sin alertas pendientes.</p>'; return; }
    const colors = { alta: 'border-[#c44b4b]/30 bg-[#c44b4b]/5', media: 'border-[#d4a84b]/30 bg-[#d4a84b]/5', baja: 'border-[#404e7c]/30 bg-[#404e7c]/5' };
    const icons = { alta: 'lucide:alert-circle', media: 'lucide:alert-triangle', baja: 'lucide:info' };
    const iconColors = { alta: 'text-[#c44b4b]', media: 'text-[#d4a84b]', baja: 'text-[#404e7c]' };
    cont.innerHTML = alertas.map(a => `
      <div class="flex items-start gap-3 p-3 rounded-lg border ${colors[a.severidad] || colors.baja}">
        <iconify-icon icon="${icons[a.severidad]}" class="text-lg flex-shrink-0 mt-0.5 ${iconColors[a.severidad]}"></iconify-icon>
        <div class="flex-1">
          <p class="text-sm font-medium text-[#1a1f2b]">${a.mensaje}</p>
          <p class="text-xs text-[#64748b] mt-0.5">${a.recomendacion}</p>
          <p class="text-[11px] text-[#94a3b8] mt-1">${a.categoria} - ${a.fecha} - conf. ${(a.confianza*100).toFixed(0)}%</p>
        </div>
        <a href="alertas.html" class="text-xs font-medium text-[#404e7c] hover:text-[#86cb92]">Ver</a>
      </div>`).join('');
  }

  function renderSensorTable(data) {
    const tbody = document.getElementById('sensor-table-body');
    if (!tbody) return;
    const lotes = window.AgroData.getLotes(data).filter(l => !filtros.loteId || l.id === filtros.loteId);
    const rows = lotes.map(l => {
      const lc = (data.clima || []).filter(c => c.loteId === l.id).sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
      const ls = (data.suelo || []).filter(s => s.loteId === l.id).sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
      const hs = ls ? ls.humedadSuelo : 0;
      const barColor = hs < 40 ? '#c44b4b' : hs < 50 ? '#d4a84b' : '#86cb92';
      return { lote: l.nombre, temp: lc ? lc.tempMax.toFixed(1) + 'C' : '-', humedad: lc ? lc.humedad + '%' : '-', hs, barColor, fecha: (lc || ls)?.fecha || '-' };
    }).filter(r => r.fecha !== '-');
    if (!rows.length) { tbody.innerHTML = '<tr><td colspan="5" class="px-3 py-4 text-center text-[#94a3b8] text-sm">Sin lecturas para los filtros.</td></tr>'; return; }
    tbody.innerHTML = rows.map((r, i) => `<tr class="${i % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'} hover:bg-[#f8fafc]"><td class="px-3 py-2 font-medium">${r.lote}</td><td class="px-3 py-2 text-[#64748b]">${r.temp}</td><td class="px-3 py-2 text-[#64748b]">${r.humedad}</td><td class="px-3 py-2"><div class="flex items-center gap-2"><div class="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden"><div class="h-full rounded-full" style="width:${r.hs}%;background:${r.barColor}"></div></div><span class="text-[#1a1f2b] font-medium">${r.hs}%</span></div></td><td class="px-3 py-2 text-[#94a3b8]">${r.fecha}</td></tr>`).join('');
  }

  function reload() {
    const data = window.AgroData.getData();
    renderStats(data);
    renderMoistureChart(data);
    renderAlerts(data);
    renderSensorTable(data);
    window.AgroApp.updateNotificationBadge();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const data = window.AgroData.getData();
    poblarFiltros(data);
    const fl = document.getElementById('f-lote');
    const ft = document.getElementById('f-temporada');
    if (fl) fl.onchange = e => { filtros.loteId = e.target.value; reload(); };
    if (ft) ft.onchange = e => { filtros.temporada = e.target.value; reload(); };
    reload();
  });
})();
