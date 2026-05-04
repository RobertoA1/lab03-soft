/**
 * data.js - Sistema de Informacion de Agricultura de Precision
 * Phase 1 (DATA-01): seed data + manual entry + validaciones + localStorage.
 * Phase 3 (ALRT-01): motor de reglas con prioridad y explicacion.
 *
 * Sin backend; v1 usa carga manual y datos semilla.
 */

const STORAGE_KEY = 'agrotech_data_v2';
const SCHEMA_VERSION = 2;

// --- Datos semilla (historial extendido para charts) ---
function buildSeedClima() {
  // 30 dias para 3 lotes, con patrones agronomicos plausibles
  const out = [];
  const start = new Date('2026-04-03');
  for (let d = 0; d < 30; d++) {
    const date = new Date(start);
    date.setDate(start.getDate() + d);
    const fecha = date.toISOString().slice(0, 10);
    const baseTemp = 24 + Math.sin(d / 5) * 4;
    const baseHum = 70 + Math.cos(d / 4) * 10;
    const lluvia = (d % 7 === 3) ? 12 + Math.random() * 8 : (d % 5 === 0 ? 2 + Math.random() * 4 : 0);
    [['l1', 0], ['l2', 1.5], ['l3', -0.8]].forEach(([loteId, offset]) => {
      out.push({
        fecha,
        loteId,
        tempMax: +(baseTemp + offset + Math.random() * 2).toFixed(1),
        tempMin: +(baseTemp + offset - 10 + Math.random() * 2).toFixed(1),
        humedad: Math.round(baseHum + Math.random() * 5),
        precipitacion: +(lluvia * (1 + (loteId === 'l2' ? -0.2 : 0.1))).toFixed(1),
        viento: Math.round(8 + Math.random() * 8),
      });
    });
  }
  return out;
}

function buildSeedSuelo() {
  // Mediciones semanales por lote
  const out = [];
  const fechas = ['2026-04-05', '2026-04-12', '2026-04-19', '2026-04-26', '2026-05-02'];
  const lotes = [
    { id: 'l1', ph: 6.5, mo: 3.2, n: 45, p: 18, k: 220, hs: 52 },
    { id: 'l2', ph: 6.2, mo: 2.8, n: 38, p: 15, k: 195, hs: 42 },
    { id: 'l3', ph: 6.8, mo: 3.5, n: 50, p: 22, k: 240, hs: 58 },
  ];
  fechas.forEach((fecha, i) => {
    lotes.forEach(l => {
      out.push({
        fecha,
        loteId: l.id,
        ph: +(l.ph + (Math.random() - 0.5) * 0.3).toFixed(2),
        materiaOrganica: +(l.mo + (Math.random() - 0.5) * 0.4).toFixed(1),
        nitrogeno: Math.round(l.n + (Math.random() - 0.5) * 6),
        fosforo: Math.round(l.p + (Math.random() - 0.5) * 4),
        potasio: Math.round(l.k + (Math.random() - 0.5) * 20),
        humedadSuelo: +(l.hs - i * 1.5 + (Math.random() - 0.5) * 4).toFixed(1),
      });
    });
  });
  // ultima medicion mas critica para gatillar alertas
  out[out.length - 2].humedadSuelo = 38.5;
  out[out.length - 2].ph = 5.8;
  return out;
}

function buildSeedRiego() {
  return [
    { fecha: '2026-04-08', loteId: 'l1', volumenLitros: 3800, duracionMin: 100, metodo: 'goteo' },
    { fecha: '2026-04-15', loteId: 'l1', volumenLitros: 4100, duracionMin: 110, metodo: 'goteo' },
    { fecha: '2026-04-22', loteId: 'l2', volumenLitros: 3500, duracionMin: 90, metodo: 'aspersion' },
    { fecha: '2026-04-28', loteId: 'l2', volumenLitros: 3700, duracionMin: 95, metodo: 'aspersion' },
    { fecha: '2026-05-01', loteId: 'l1', volumenLitros: 4291, duracionMin: 120, metodo: 'goteo' },
    { fecha: '2026-04-20', loteId: 'l3', volumenLitros: 2800, duracionMin: 75, metodo: 'goteo' },
  ];
}

const SEED_DATA = {
  schemaVersion: SCHEMA_VERSION,
  cultivos: [
    { id: 'c1', nombre: 'Maiz', variedad: 'Pioneer P1197', areaHa: 45, estado: 'activo', temporada: '2025-2026', loteId: 'l1' },
    { id: 'c2', nombre: 'Soja', variedad: 'Don Mario 59.10', areaHa: 32, estado: 'activo', temporada: '2025-2026', loteId: 'l2' },
    { id: 'c3', nombre: 'Trigo', variedad: 'Buck Meteoro', areaHa: 28, estado: 'cosechado', temporada: '2024-2025', loteId: 'l1' },
    { id: 'c4', nombre: 'Girasol', variedad: 'DK 3915', areaHa: 22, estado: 'activo', temporada: '2025-2026', loteId: 'l3' },
  ],
  lotes: [
    { id: 'l1', nombre: 'Lote Norte', hectareas: 120, ubicacion: 'Norte' },
    { id: 'l2', nombre: 'Lote Sur', hectareas: 85, ubicacion: 'Sur' },
    { id: 'l3', nombre: 'Lote Este', hectareas: 60, ubicacion: 'Este' },
  ],
  clima: buildSeedClima(),
  suelo: buildSeedSuelo(),
  riego: buildSeedRiego(),
  produccion: [
    { temporada: '2024-2025', cultivoId: 'c3', loteId: 'l1', rendimientoKgHa: 4200, calidad: 'alta', fecha: '2025-12-15' },
    { temporada: '2024-2025', cultivoId: 'c1', loteId: 'l1', rendimientoKgHa: 8900, calidad: 'alta', fecha: '2025-04-10' },
    { temporada: '2024-2025', cultivoId: 'c2', loteId: 'l2', rendimientoKgHa: 3100, calidad: 'media', fecha: '2025-05-05' },
    { temporada: '2023-2024', cultivoId: 'c1', loteId: 'l1', rendimientoKgHa: 8200, calidad: 'media', fecha: '2024-04-08' },
    { temporada: '2023-2024', cultivoId: 'c2', loteId: 'l2', rendimientoKgHa: 2950, calidad: 'media', fecha: '2024-05-02' },
  ],
  alertas: [], // se generan dinamicamente; alertas manuales (ack/resolve) tambien viven aqui
  rendimientoEstimado: { valor: 1245, unidad: 'kg/ha', cultivoId: 'c1', tendencia: 8.3 },
};

// --- API de datos ---
function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { saveData(SEED_DATA); return structuredClone(SEED_DATA); }
  try {
    const parsed = JSON.parse(raw);
    if (parsed.schemaVersion !== SCHEMA_VERSION) { saveData(SEED_DATA); return structuredClone(SEED_DATA); }
    return parsed;
  } catch { saveData(SEED_DATA); return structuredClone(SEED_DATA); }
}

function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function resetToSeed() { saveData(SEED_DATA); return structuredClone(SEED_DATA); }

// --- Helpers de consulta ---
function getCultivos(data) { return data.cultivos || []; }
function getLotes(data) { return data.lotes || []; }
function getClimaPorLote(data, loteId) { return (data.clima || []).filter(c => !loteId || c.loteId === loteId); }
function getSueloPorLote(data, loteId) { return (data.suelo || []).filter(s => !loteId || s.loteId === loteId); }
function getRiegoPorLote(data, loteId) { return (data.riego || []).filter(r => !loteId || r.loteId === loteId); }
function getProduccionPorTemporada(data, temporada) { return (data.produccion || []).filter(p => !temporada || p.temporada === temporada); }
function getNombreLote(data, loteId) { const l = (data.lotes || []).find(x => x.id === loteId); return l ? l.nombre : loteId; }
function getNombreCultivo(data, cultivoId) { const c = (data.cultivos || []).find(x => x.id === cultivoId); return c ? c.nombre : cultivoId; }
function getTemporadas(data) { return [...new Set((data.cultivos || []).map(c => c.temporada).concat((data.produccion || []).map(p => p.temporada)))].sort().reverse(); }

// --- Validaciones ---
function validateRecord(tipo, rec) {
  const errors = [];
  const isNum = v => typeof v === 'number' && !Number.isNaN(v);
  const requireNum = (k, min, max) => { if (!isNum(rec[k])) errors.push(`${k} debe ser numero`); else if (rec[k] < min || rec[k] > max) errors.push(`${k} fuera de rango (${min}-${max})`); };
  const requireStr = k => { if (!rec[k] || typeof rec[k] !== 'string') errors.push(`${k} es requerido`); };
  const requireDate = k => { if (!/^\d{4}-\d{2}-\d{2}$/.test(rec[k] || '')) errors.push(`${k} debe ser YYYY-MM-DD`); };

  switch (tipo) {
    case 'cultivo':
      requireStr('nombre'); requireStr('variedad'); requireStr('temporada'); requireStr('loteId');
      requireNum('areaHa', 0.1, 10000);
      if (!['activo','cosechado','planificado'].includes(rec.estado)) errors.push('estado invalido');
      break;
    case 'lote':
      requireStr('nombre'); requireStr('ubicacion'); requireNum('hectareas', 0.1, 100000); break;
    case 'clima':
      requireDate('fecha'); requireStr('loteId');
      requireNum('tempMax', -30, 60); requireNum('tempMin', -40, 50);
      requireNum('humedad', 0, 100); requireNum('precipitacion', 0, 500); requireNum('viento', 0, 200);
      if (isNum(rec.tempMin) && isNum(rec.tempMax) && rec.tempMin > rec.tempMax) errors.push('tempMin > tempMax');
      break;
    case 'suelo':
      requireDate('fecha'); requireStr('loteId');
      requireNum('ph', 3, 10); requireNum('materiaOrganica', 0, 20);
      requireNum('nitrogeno', 0, 500); requireNum('fosforo', 0, 500); requireNum('potasio', 0, 2000);
      requireNum('humedadSuelo', 0, 100); break;
    case 'riego':
      requireDate('fecha'); requireStr('loteId');
      requireNum('volumenLitros', 0, 1000000); requireNum('duracionMin', 0, 1440); requireStr('metodo'); break;
    case 'produccion':
      requireDate('fecha'); requireStr('temporada'); requireStr('cultivoId'); requireStr('loteId');
      requireNum('rendimientoKgHa', 0, 50000);
      if (!['alta','media','baja'].includes(rec.calidad)) errors.push('calidad invalida'); break;
    default:
      errors.push('tipo desconocido');
  }
  return errors;
}

function nextId(prefix, list) {
  const used = new Set((list || []).map(x => x.id));
  let i = (list || []).length + 1;
  while (used.has(prefix + i)) i++;
  return prefix + i;
}

// --- CRUD ---
function addRecord(data, tipo, rec) {
  const errors = validateRecord(tipo, rec);
  if (errors.length) return { ok: false, errors };
  const map = { cultivo: 'cultivos', lote: 'lotes', clima: 'clima', suelo: 'suelo', riego: 'riego', produccion: 'produccion' };
  const key = map[tipo];
  data[key] = data[key] || [];
  if (tipo === 'cultivo' || tipo === 'lote') {
    rec.id = rec.id || nextId(tipo === 'cultivo' ? 'c' : 'l', data[key]);
  }
  data[key].push(rec);
  saveData(data);
  return { ok: true, record: rec };
}

// --- Alertas: estado persistido por hash ---
function getAlertaState(data) { return data.alertaState || {}; }
function setAlertaState(data, hash, state) {
  data.alertaState = data.alertaState || {};
  data.alertaState[hash] = { ...data.alertaState[hash], ...state, updatedAt: new Date().toISOString() };
  saveData(data);
}

function hashAlerta(a) {
  return [a.regla, a.loteId || '-', a.fecha || '-'].join('|');
}

// --- Motor de alertas (Phase 3: ALRT-01) ---
const REGLAS = [
  { id: 'humedad-baja', nombre: 'Humedad de suelo baja', categoria: 'riego', severidad: 'alta',
    fn: (d) => {
      const out = [];
      const ultimaPorLote = ultimosSueloPorLote(d);
      Object.values(ultimaPorLote).forEach(s => {
        if (s.humedadSuelo < 40) out.push({
          regla: 'humedad-baja', tipo: 'warning', severidad: 'alta', categoria: 'riego',
          loteId: s.loteId, fecha: s.fecha,
          mensaje: `Humedad del suelo critica (${s.humedadSuelo}%) en ${getNombreLote(d, s.loteId)}.`,
          rationale: `Regla: humedad de suelo < 40%. Medicion del ${s.fecha}: ${s.humedadSuelo}%.`,
          recomendacion: 'Programar riego en las proximas 24h y revisar manometros.',
          confianza: 0.95,
        });
      });
      return out;
    } },
  { id: 'ph-acido', nombre: 'pH de suelo acido', categoria: 'suelo', severidad: 'alta',
    fn: (d) => {
      const out = [];
      const ultimaPorLote = ultimosSueloPorLote(d);
      Object.values(ultimaPorLote).forEach(s => {
        if (s.ph < 6.0) out.push({
          regla: 'ph-acido', tipo: 'danger', severidad: 'alta', categoria: 'suelo',
          loteId: s.loteId, fecha: s.fecha,
          mensaje: `pH acido (${s.ph}) en ${getNombreLote(d, s.loteId)}.`,
          rationale: `Regla: pH < 6.0. Medicion del ${s.fecha}: pH ${s.ph}.`,
          recomendacion: 'Aplicar enmienda caliza segun analisis. Repetir medicion en 2 semanas.',
          confianza: 0.9,
        });
      });
      return out;
    } },
  { id: 'ph-alcalino', nombre: 'pH de suelo alcalino', categoria: 'suelo', severidad: 'media',
    fn: (d) => {
      const out = [];
      Object.values(ultimosSueloPorLote(d)).forEach(s => {
        if (s.ph > 7.5) out.push({
          regla: 'ph-alcalino', tipo: 'warning', severidad: 'media', categoria: 'suelo',
          loteId: s.loteId, fecha: s.fecha,
          mensaje: `pH alcalino (${s.ph}) en ${getNombreLote(d, s.loteId)}.`,
          rationale: `Regla: pH > 7.5. Medicion del ${s.fecha}: pH ${s.ph}.`,
          recomendacion: 'Considerar azufre elemental o compost acidificante.',
          confianza: 0.85,
        });
      });
      return out;
    } },
  { id: 'ola-calor', nombre: 'Temperatura maxima alta', categoria: 'clima', severidad: 'alta',
    fn: (d) => {
      const out = [];
      Object.values(ultimosClimaPorLote(d)).forEach(c => {
        if (c.tempMax > 32) out.push({
          regla: 'ola-calor', tipo: 'warning', severidad: 'alta', categoria: 'clima',
          loteId: c.loteId, fecha: c.fecha,
          mensaje: `Calor intenso (${c.tempMax}C) en ${getNombreLote(d, c.loteId)}.`,
          rationale: `Regla: temperatura maxima > 32C. Ultimo registro ${c.fecha}.`,
          recomendacion: 'Revisar estado hidrico y adelantar riego de la tarde.',
          confianza: 0.9,
        });
      });
      return out;
    } },
  { id: 'lluvia-intensa', nombre: 'Lluvias acumuladas', categoria: 'riego', severidad: 'baja',
    fn: (d) => {
      const out = [];
      const lotes = [...new Set((d.clima || []).map(c => c.loteId))];
      lotes.forEach(lid => {
        const reg = (d.clima || []).filter(c => c.loteId === lid).sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);
        const total = reg.reduce((s, r) => s + (r.precipitacion || 0), 0);
        if (total > 30) out.push({
          regla: 'lluvia-intensa', tipo: 'info', severidad: 'baja', categoria: 'riego',
          loteId: lid, fecha: reg[0]?.fecha,
          mensaje: `Lluvias acumuladas (${total.toFixed(1)} mm/3d) en ${getNombreLote(d, lid)}.`,
          rationale: `Regla: precipitacion 3 dias > 30 mm. Suma: ${total.toFixed(1)} mm.`,
          recomendacion: 'Suspender riego programado y revisar drenaje.',
          confianza: 0.8,
        });
      });
      return out;
    } },
  { id: 'rendimiento-bajo-pred', nombre: 'Riesgo de rendimiento bajo (predictivo)', categoria: 'rendimiento', severidad: 'media',
    fn: (d) => {
      // Heuristica predictiva: humedad suelo + tempMax promedio del ultimo periodo
      const out = [];
      const ultimaSuelo = ultimosSueloPorLote(d);
      Object.values(ultimaSuelo).forEach(s => {
        const climaLote = (d.clima || []).filter(c => c.loteId === s.loteId).slice(-7);
        if (!climaLote.length) return;
        const avgT = climaLote.reduce((a, c) => a + c.tempMax, 0) / climaLote.length;
        // Score simple: penaliza humedad < 50 y temp > 30
        const stress = Math.max(0, 50 - s.humedadSuelo) * 0.6 + Math.max(0, avgT - 30) * 4;
        if (stress > 12) {
          out.push({
            regla: 'rendimiento-bajo-pred', tipo: 'warning', severidad: 'media', categoria: 'rendimiento',
            loteId: s.loteId, fecha: s.fecha,
            mensaje: `Riesgo agronomico en ${getNombreLote(d, s.loteId)} (indice ${stress.toFixed(1)}).`,
            rationale: `Senal predictiva: humedad suelo ${s.humedadSuelo}% y temp media 7d ${avgT.toFixed(1)}C. Indice combinado ${stress.toFixed(1)} (umbral 12).`,
            recomendacion: 'Anticipar manejo de estres hidrico/termico para proteger rendimiento.',
            confianza: 0.6,
          });
        }
      });
      return out;
    } },
];

function ultimosSueloPorLote(d) {
  const out = {};
  (d.suelo || []).forEach(s => {
    if (!out[s.loteId] || s.fecha > out[s.loteId].fecha) out[s.loteId] = s;
  });
  return out;
}
function ultimosClimaPorLote(d) {
  const out = {};
  (d.clima || []).forEach(c => {
    if (!out[c.loteId] || c.fecha > out[c.loteId].fecha) out[c.loteId] = c;
  });
  return out;
}

const SEVERIDAD_RANK = { alta: 3, media: 2, baja: 1 };

function generarAlertas(data) {
  const generadas = [];
  REGLAS.forEach(r => { try { generadas.push(...r.fn(data)); } catch (e) { console.error('Regla error', r.id, e); } });
  const state = getAlertaState(data);
  generadas.forEach(a => {
    a.id = 'g_' + hashAlerta(a);
    a.hash = hashAlerta(a);
    const st = state[a.hash] || {};
    a.estado = st.estado || 'pendiente'; // pendiente | reconocida | resuelta
    a.notaResolucion = st.nota || null;
    a.actualizadaEn = st.updatedAt || null;
  });
  // Ordenar por severidad y luego fecha
  generadas.sort((a, b) => (SEVERIDAD_RANK[b.severidad] - SEVERIDAD_RANK[a.severidad]) || ((b.fecha || '').localeCompare(a.fecha || '')));
  return generadas;
}

function actualizarEstadoAlerta(data, hash, estado, nota) {
  setAlertaState(data, hash, { estado, nota: nota || null });
}

function getAlertasPendientes(data) {
  return generarAlertas(data).filter(a => a.estado === 'pendiente');
}

function getAlertasResumen(data) {
  const alertas = generarAlertas(data);
  return {
    total: alertas.length,
    pendientes: alertas.filter(a => a.estado === 'pendiente').length,
    reconocidas: alertas.filter(a => a.estado === 'reconocida').length,
    resueltas: alertas.filter(a => a.estado === 'resuelta').length,
    porSeveridad: {
      alta: alertas.filter(a => a.severidad === 'alta' && a.estado !== 'resuelta').length,
      media: alertas.filter(a => a.severidad === 'media' && a.estado !== 'resuelta').length,
      baja: alertas.filter(a => a.severidad === 'baja' && a.estado !== 'resuelta').length,
    },
  };
}

// --- Exportar ---
window.AgroData = {
  getData, saveData, resetToSeed,
  getCultivos, getLotes,
  getClimaPorLote, getSueloPorLote, getRiegoPorLote, getProduccionPorTemporada,
  getNombreLote, getNombreCultivo, getTemporadas,
  validateRecord, addRecord,
  generarAlertas, getAlertasPendientes, getAlertasResumen, actualizarEstadoAlerta,
};
