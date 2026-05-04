/**
 * datos.js - Carga manual con validacion (Phase 1: DATA-01)
 */
(function () {
  let activeTab = 'cultivo';

  const TABS = [
    { id: 'cultivo', label: 'Cultivos', icon: 'lucide:wheat' },
    { id: 'lote', label: 'Lotes', icon: 'lucide:map-pin' },
    { id: 'clima', label: 'Clima', icon: 'lucide:cloud-sun' },
    { id: 'suelo', label: 'Suelo', icon: 'lucide:layers' },
    { id: 'riego', label: 'Riego', icon: 'lucide:droplets' },
    { id: 'produccion', label: 'Produccion', icon: 'lucide:package' },
  ];

  function renderTabs() {
    const bar = document.getElementById('tab-bar');
    bar.innerHTML = TABS.map(t => `<button data-tab="${t.id}" class="tab-btn flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${t.id === activeTab ? 'bg-[#86cb92]/15 text-[#3b9e5a]' : 'text-[#64748b] hover:bg-[#f1f5f9]'}"><iconify-icon icon="${t.icon}" class="text-base"></iconify-icon>${t.label}</button>`).join('');
    bar.querySelectorAll('.tab-btn').forEach(btn => btn.onclick = () => { activeTab = btn.dataset.tab; renderAll(); });
  }

  const fNum = (n, l, o = {}) => `<div class="field"><label>${l}</label><input type="number" step="${o.step || 'any'}" name="${n}" required></div>`;
  const fTxt = (n, l) => `<div class="field"><label>${l}</label><input type="text" name="${n}" required></div>`;
  const fDate = (n, l) => `<div class="field"><label>${l}</label><input type="date" name="${n}" value="${new Date().toISOString().slice(0,10)}" required></div>`;
  const fSel = (n, l, opts) => `<div class="field"><label>${l}</label><select name="${n}" required>${opts.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select></div>`;

  function getFormHTML(data) {
    const lotes = window.AgroData.getLotes(data);
    const cultivos = window.AgroData.getCultivos(data);
    const optLotes = lotes.map(l => ({ value: l.id, label: l.nombre }));
    const optCultivos = cultivos.map(c => ({ value: c.id, label: `${c.nombre} (${c.variedad})` }));
    const grid = inner => `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">${inner}</div>`;
    let title = '', body = '';
    switch (activeTab) {
      case 'cultivo':
        title = 'Nuevo cultivo';
        body = grid(fTxt('nombre','Nombre') + fTxt('variedad','Variedad') + fNum('areaHa','Area (ha)',{step:'0.1'}) + fTxt('temporada','Temporada (ej. 2025-2026)') + fSel('loteId','Lote', optLotes.length ? optLotes : [{value:'',label:'Sin lotes'}]) + fSel('estado','Estado', [{value:'activo',label:'Activo'},{value:'planificado',label:'Planificado'},{value:'cosechado',label:'Cosechado'}]));
        break;
      case 'lote':
        title = 'Nuevo lote';
        body = grid(fTxt('nombre','Nombre') + fTxt('ubicacion','Ubicacion') + fNum('hectareas','Hectareas',{step:'0.1'}));
        break;
      case 'clima':
        title = 'Registro de clima';
        body = grid(fDate('fecha','Fecha') + fSel('loteId','Lote', optLotes) + fNum('tempMax','Temp. max (C)',{step:'0.1'}) + fNum('tempMin','Temp. min (C)',{step:'0.1'}) + fNum('humedad','Humedad (%)') + fNum('precipitacion','Precipitacion (mm)',{step:'0.1'}) + fNum('viento','Viento (km/h)'));
        break;
      case 'suelo':
        title = 'Medicion de suelo';
        body = grid(fDate('fecha','Fecha') + fSel('loteId','Lote', optLotes) + fNum('ph','pH',{step:'0.01'}) + fNum('materiaOrganica','Materia organica (%)',{step:'0.1'}) + fNum('nitrogeno','N (ppm)') + fNum('fosforo','P (ppm)') + fNum('potasio','K (ppm)') + fNum('humedadSuelo','Humedad de suelo (%)',{step:'0.1'}));
        break;
      case 'riego':
        title = 'Evento de riego';
        body = grid(fDate('fecha','Fecha') + fSel('loteId','Lote', optLotes) + fNum('volumenLitros','Volumen (L)') + fNum('duracionMin','Duracion (min)') + fSel('metodo','Metodo', [{value:'goteo',label:'Goteo'},{value:'aspersion',label:'Aspersion'},{value:'inundacion',label:'Inundacion'}]));
        break;
      case 'produccion':
        title = 'Registro de produccion';
        body = grid(fDate('fecha','Fecha') + fTxt('temporada','Temporada') + fSel('cultivoId','Cultivo', optCultivos.length ? optCultivos : [{value:'',label:'Sin cultivos'}]) + fSel('loteId','Lote', optLotes) + fNum('rendimientoKgHa','Rendimiento (kg/ha)') + fSel('calidad','Calidad', [{value:'alta',label:'Alta'},{value:'media',label:'Media'},{value:'baja',label:'Baja'}]));
        break;
    }
    return `<form id="data-form"><h2 class="text-lg font-semibold mb-4">${title}</h2>${body}<div id="form-errors" class="hidden mt-4 p-3 rounded-lg bg-[#c44b4b]/10 text-[#c44b4b] text-sm"></div><div class="mt-5 flex gap-3"><button type="submit" class="px-4 py-2 rounded-lg bg-[#86cb92] hover:bg-[#71b48d] text-white font-medium text-sm flex items-center gap-2"><iconify-icon icon="lucide:plus"></iconify-icon>Guardar</button><button type="reset" class="px-4 py-2 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f1f5f9] font-medium text-sm">Limpiar</button></div></form>`;
  }

  function readForm(form) {
    const fd = new FormData(form); const obj = {};
    const numeric = ['areaHa','hectareas','tempMax','tempMin','humedad','precipitacion','viento','ph','materiaOrganica','nitrogeno','fosforo','potasio','humedadSuelo','volumenLitros','duracionMin','rendimientoKgHa'];
    fd.forEach((v, k) => { obj[k] = numeric.includes(k) ? parseFloat(v) : v; });
    return obj;
  }

  function renderRecords(data) {
    const map = { cultivo: data.cultivos, lote: data.lotes, clima: data.clima, suelo: data.suelo, riego: data.riego, produccion: data.produccion };
    const rows = (map[activeTab] || []).slice().reverse();
    const cont = document.getElementById('records-table');
    document.getElementById('record-count').textContent = rows.length + ' registros';
    if (!rows.length) { cont.innerHTML = '<p class="p-4 text-sm text-[#94a3b8]">Sin registros aun.</p>'; return; }
    const cols = Object.keys(rows[0]);
    cont.innerHTML = `<table class="w-full text-sm"><thead><tr class="bg-[#f8fafc] sticky top-0">${cols.map(c => `<th class="text-left px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">${c}</th>`).join('')}</tr></thead><tbody>${rows.map((r, i) => `<tr class="${i % 2 ? 'bg-[#f9fafb]' : 'bg-white'} border-t border-[#f1f5f9]">${cols.map(c => `<td class="px-3 py-2 text-[#1a1f2b]">${r[c] !== undefined && r[c] !== null ? r[c] : '-'}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  function renderAll() {
    renderTabs();
    const data = window.AgroData.getData();
    document.getElementById('form-panel').innerHTML = getFormHTML(data);
    renderRecords(data);
    const form = document.getElementById('data-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = window.AgroData.getData();
      const rec = readForm(form);
      const res = window.AgroData.addRecord(d, activeTab, rec);
      const errBox = document.getElementById('form-errors');
      if (!res.ok) { errBox.classList.remove('hidden'); errBox.innerHTML = '<strong>Errores:</strong><ul class="list-disc ml-5 mt-1">' + res.errors.map(x => `<li>${x}</li>`).join('') + '</ul>'; return; }
      window.AgroApp.showToast('Registro guardado', 'success');
      renderAll();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    const btn = document.getElementById('btn-reset');
    if (btn) btn.onclick = () => { if (confirm('Restaurar datos semilla? Se perderan los cambios.')) { window.AgroData.resetToSeed(); window.AgroApp.showToast('Datos restaurados', 'info'); renderAll(); } };
  });
})();
