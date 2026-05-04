/**
 * historico.js - Tendencias historicas con filtros (Phase 2: DASH-02)
 * Cada chart esta atado a una decision agronomica (PITFALLS.md)
 */
(function () {
  const filtros = { cultivoId: '', temporada: '', loteId: '' };

  function poblarFiltros(data) {
    const fc = document.getElementById('f-cultivo');
    const ft = document.getElementById('f-temporada');
    const fl = document.getElementById('f-lote');
    fc.innerHTML = '<option value="">Todos los cultivos</option>' + window.AgroData.getCultivos(data).map(c => `<option value="${c.id}">${c.nombre} - ${c.variedad}</option>`).join('');
    ft.innerHTML = '<option value="">Todas las temporadas</option>' + window.AgroData.getTemporadas(data).map(t => `<option value="${t}">${t}</option>`).join('');
    fl.innerHTML = '<option value="">Todos los lotes</option>' + window.AgroData.getLotes(data).map(l => `<option value="${l.id}">${l.nombre}</option>`).join('');
  }

  // Si hay filtro de cultivo, derivar loteId implicito
  function loteEffectivo(data) {
    if (filtros.loteId) return filtros.loteId;
    if (filtros.cultivoId) {
      const c = data.cultivos.find(x => x.id === filtros.cultivoId);
      if (c) return c.loteId;
    }
    return '';
  }

  function lineChart(svg, series, opts = {}) {
    const w = 600, h = 220, pad = { l: 50, r: 20, t: 10, b: 30 };
    const allValues = series.flatMap(s => s.points.map(p => p.y));
    if (!allValues.length) { svg.innerHTML = `<text x="${w/2}" y="${h/2}" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="Inter">Sin datos</text>`; svg.setAttribute('viewBox', `0 0 ${w} ${h}`); return; }
    const minV = opts.minY !== undefined ? opts.minY : Math.min(...allValues);
    const maxV = opts.maxY !== undefined ? opts.maxY : Math.max(...allValues);
    const range = (maxV - minV) || 1;
    const allX = series.flatMap(s => s.points.map(p => p.x));
    const xLabels = [...new Set(allX)].sort();
    const xStep = (w - pad.l - pad.r) / Math.max(1, xLabels.length - 1);
    const xPos = (xVal) => pad.l + xLabels.indexOf(xVal) * xStep;
    const yPos = (v) => h - pad.b - ((v - minV) / range) * (h - pad.t - pad.b);

    let grid = '';
    [0, 0.25, 0.5, 0.75, 1].forEach(p => {
      const v = minV + range * p;
      const y = yPos(v);
      grid += `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="#e2e8f0" stroke-width="1" ${p > 0 ? 'stroke-dasharray="3 3"' : ''}/>`;
      grid += `<text x="${pad.l - 6}" y="${y + 3}" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Inter">${v.toFixed(opts.decimals !== undefined ? opts.decimals : 0)}</text>`;
    });
    let xLabelsHtml = '';
    const showEvery = Math.max(1, Math.floor(xLabels.length / 6));
    xLabels.forEach((x, i) => {
      if (i % showEvery !== 0 && i !== xLabels.length - 1) return;
      xLabelsHtml += `<text x="${xPos(x)}" y="${h - pad.b + 16}" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">${x.slice(5)}</text>`;
    });
    let lines = '';
    series.forEach((s, idx) => {
      const sorted = s.points.slice().sort((a, b) => a.x.localeCompare(b.x));
      const d = sorted.map((p, i) => `${i ? 'L' : 'M'} ${xPos(p.x)} ${yPos(p.y)}`).join(' ');
      lines += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      sorted.forEach(p => { lines += `<circle cx="${xPos(p.x)}" cy="${yPos(p.y)}" r="3" fill="${s.color}" stroke="white" stroke-width="1.5"/>`; });
    });
    let legend = '';
    series.forEach((s, i) => {
      legend += `<g transform="translate(${pad.l + i * 110}, ${pad.t - 4})"><rect x="0" y="-8" width="10" height="3" fill="${s.color}"/><text x="14" y="-3" fill="#475569" font-size="10" font-family="Inter">${s.label}</text></g>`;
    });

    svg.setAttribute('viewBox', `0 0 ${w} ${h + 10}`);
    svg.innerHTML = grid + xLabelsHtml + lines + legend;
  }

  function makeChartCard(id, titulo, subtitulo) {
    return `<div class="bg-white rounded-xl shadow-sm border border-[#f1f5f9] p-5">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h2 class="text-[1.05rem] font-semibold text-[#1a1f2b]">${titulo}</h2>
          <p class="text-xs text-[#94a3b8]">${subtitulo}</p>
        </div>
      </div>
      <svg id="${id}" class="w-full" preserveAspectRatio="none"></svg>
    </div>`;
  }

  function renderCharts(data) {
    const grid = document.getElementById('charts-grid');
    grid.innerHTML = [
      makeChartCard('chart-clima', 'Clima', 'Temperatura maxima y precipitacion. Decide manejo de riego y proteccion termica.'),
      makeChartCard('chart-suelo', 'Suelo', 'pH y humedad del suelo. Decide enmiendas y riego.'),
      makeChartCard('chart-riego', 'Riego', 'Volumen aplicado. Compara contra precipitacion para evaluar eficiencia.'),
      makeChartCard('chart-humedadComp', 'Humedad ambiente vs suelo', 'Detecta desacople entre clima y disponibilidad hidrica.'),
    ].join('');

    const lid = loteEffectivo(data);
    const clima = window.AgroData.getClimaPorLote(data, lid).slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
    const suelo = window.AgroData.getSueloPorLote(data, lid).slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
    const riego = window.AgroData.getRiegoPorLote(data, lid).slice().sort((a, b) => a.fecha.localeCompare(b.fecha));

    lineChart(document.getElementById('chart-clima'), [
      { label: 'Temp. max (C)', color: '#c44b4b', points: clima.map(c => ({ x: c.fecha, y: c.tempMax })) },
      { label: 'Precipitacion (mm)', color: '#404e7c', points: clima.map(c => ({ x: c.fecha, y: c.precipitacion })) },
    ], { decimals: 1 });

    lineChart(document.getElementById('chart-suelo'), [
      { label: 'pH', color: '#d4a84b', points: suelo.map(s => ({ x: s.fecha, y: s.ph })) },
      { label: 'Humedad suelo (%)', color: '#86cb92', points: suelo.map(s => ({ x: s.fecha, y: s.humedadSuelo })) },
    ], { decimals: 1 });

    lineChart(document.getElementById('chart-riego'), [
      { label: 'Volumen (L)', color: '#404e7c', points: riego.map(r => ({ x: r.fecha, y: r.volumenLitros })) },
    ]);

    lineChart(document.getElementById('chart-humedadComp'), [
      { label: 'Humedad amb. (%)', color: '#404e7c', points: clima.map(c => ({ x: c.fecha, y: c.humedad })) },
      { label: 'Humedad suelo (%)', color: '#86cb92', points: suelo.map(s => ({ x: s.fecha, y: s.humedadSuelo })) },
    ], { decimals: 0 });
  }

  function renderProduccion(data) {
    const filtrada = (data.produccion || []).filter(p =>
      (!filtros.cultivoId || p.cultivoId === filtros.cultivoId) &&
      (!filtros.temporada || p.temporada === filtros.temporada) &&
      (!filtros.loteId || p.loteId === filtros.loteId)
    );

    // Bar chart simple por temporada+cultivo
    const svg = document.getElementById('chart-produccion');
    if (!filtrada.length) { svg.innerHTML = '<p class="text-sm text-[#94a3b8] p-4">Sin datos de produccion para los filtros.</p>'; document.getElementById('produccion-detail').innerHTML = ''; return; }

    const w = 800, h = 260, pad = { l: 60, r: 20, t: 20, b: 60 };
    const labels = filtrada.map(p => `${p.temporada}\n${window.AgroData.getNombreCultivo(data, p.cultivoId)}`);
    const values = filtrada.map(p => p.rendimientoKgHa);
    const max = Math.max(...values) * 1.1;
    const barW = (w - pad.l - pad.r) / values.length * 0.6;
    const step = (w - pad.l - pad.r) / values.length;

    let grid = '';
    [0, 0.25, 0.5, 0.75, 1].forEach(p => {
      const v = max * p;
      const y = h - pad.b - p * (h - pad.t - pad.b);
      grid += `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="${p > 0 ? '3 3' : ''}"/>`;
      grid += `<text x="${pad.l - 8}" y="${y + 3}" text-anchor="end" fill="#94a3b8" font-size="10">${v.toFixed(0)}</text>`;
    });
    let bars = '', xLabels = '';
    const colorByCalidad = { alta: '#3b9e5a', media: '#d4a84b', baja: '#c44b4b' };
    filtrada.forEach((p, i) => {
      const x = pad.l + i * step + (step - barW) / 2;
      const yTop = h - pad.b - (p.rendimientoKgHa / max) * (h - pad.t - pad.b);
      const barH = (h - pad.b) - yTop;
      bars += `<rect x="${x}" y="${yTop}" width="${barW}" height="${barH}" rx="4" fill="${colorByCalidad[p.calidad] || '#86cb92'}"><title>${p.temporada} - ${window.AgroData.getNombreCultivo(data, p.cultivoId)}: ${p.rendimientoKgHa} kg/ha (${p.calidad})</title></rect>`;
      bars += `<text x="${x + barW/2}" y="${yTop - 4}" text-anchor="middle" fill="#1a1f2b" font-size="10" font-weight="600">${p.rendimientoKgHa}</text>`;
      xLabels += `<text x="${x + barW/2}" y="${h - pad.b + 16}" text-anchor="middle" fill="#64748b" font-size="10">${p.temporada}</text>`;
      xLabels += `<text x="${x + barW/2}" y="${h - pad.b + 30}" text-anchor="middle" fill="#94a3b8" font-size="10">${window.AgroData.getNombreCultivo(data, p.cultivoId).slice(0, 12)}</text>`;
    });
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = grid + bars + xLabels;

    // "Que cambio" entre temporadas (FEATURES.md)
    const grupos = {};
    filtrada.forEach(p => { const k = p.cultivoId; (grupos[k] = grupos[k] || []).push(p); });
    let detalle = '';
    Object.keys(grupos).forEach(cid => {
      const items = grupos[cid].sort((a, b) => a.temporada.localeCompare(b.temporada));
      if (items.length >= 2) {
        const prev = items[items.length - 2], curr = items[items.length - 1];
        const delta = curr.rendimientoKgHa - prev.rendimientoKgHa;
        const pct = (delta / prev.rendimientoKgHa * 100).toFixed(1);
        const color = delta >= 0 ? 'text-[#3b9e5a]' : 'text-[#c44b4b]';
        detalle += `<p class="${color}"><strong>${window.AgroData.getNombreCultivo(data, cid)}</strong>: ${delta >= 0 ? '+' : ''}${pct}% vs ${prev.temporada} (${prev.rendimientoKgHa} -> ${curr.rendimientoKgHa} kg/ha).</p>`;
      }
    });
    document.getElementById('produccion-detail').innerHTML = detalle || '<p>Necesita mas de una temporada para comparar.</p>';
  }

  function reload() {
    const data = window.AgroData.getData();
    renderCharts(data);
    renderProduccion(data);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const data = window.AgroData.getData();
    poblarFiltros(data);
    document.getElementById('f-cultivo').onchange = e => { filtros.cultivoId = e.target.value; reload(); };
    document.getElementById('f-temporada').onchange = e => { filtros.temporada = e.target.value; reload(); };
    document.getElementById('f-lote').onchange = e => { filtros.loteId = e.target.value; reload(); };
    document.getElementById('btn-clear').onclick = () => { filtros.cultivoId = filtros.temporada = filtros.loteId = ''; document.getElementById('f-cultivo').value = ''; document.getElementById('f-temporada').value = ''; document.getElementById('f-lote').value = ''; reload(); };
    reload();
  });
})();
