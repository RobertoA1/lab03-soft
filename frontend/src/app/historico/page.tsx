'use client';

import { useState, useMemo } from 'react';
import { trpc } from '../../lib/trpc';
import { formatNumber } from '../../lib/utils';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

type Tab = 'produccion' | 'clima' | 'suelo' | 'riego';

export default function HistoricoPage() {
  const [tab, setTab] = useState<Tab>('produccion');
  const [loteId, setLoteId] = useState<number | null>(null);
  const [cultivo, setCultivo] = useState<string>('');
  const [temporada, setTemporada] = useState<string>('');

  const { data: lotes = [] } = trpc.lotes.list.useQuery();
  const { data: producciones = [] } = trpc.produccion.list.useQuery();
  const { data: climas = [] } = trpc.clima.list.useQuery();
  const { data: suelos = [] } = trpc.suelo.list.useQuery();
  const { data: riegos = [] } = trpc.riego.list.useQuery();
  const { data: cultivos = [] } = trpc.cultivos.list.useQuery();

  const allTemporadas = useMemo(() => Array.from(new Set((producciones as any[]).map((p) => p.temporada))).sort(), [producciones]);
  const allCultivos = useMemo(() => Array.from(new Set((cultivos as any[]).map((c) => c.nombre))).sort(), [cultivos]);

  const matchingLoteIds = useMemo(() => {
    let ids = new Set<number>();
    if (loteId) {
      ids.add(loteId);
    } else {
      (lotes as any[]).forEach((l) => ids.add(l.id));
    }
    if (cultivo || temporada) {
      const matchedCultivos = (cultivos as any[]).filter((c) => {
        if (cultivo && c.nombre !== cultivo) return false;
        if (temporada && c.temporada !== temporada) return false;
        return true;
      });
      const matchedLoteIds = new Set(matchedCultivos.map((c) => c.loteId));
      ids = new Set(Array.from(ids).filter((id) => matchedLoteIds.has(id)));
    }
    return ids;
  }, [lotes, loteId, cultivo, temporada, cultivos]);

  const filteredProd = useMemo(() => {
    let list = producciones as any[];
    if (loteId) list = list.filter((p) => p.loteId === loteId);
    if (cultivo) {
      const cultivoIds = (cultivos as any[]).filter((c) => c.nombre === cultivo).map((c) => c.id);
      list = list.filter((p) => cultivoIds.includes(p.cultivoId));
    }
    if (temporada) list = list.filter((p) => p.temporada === temporada);
    return list;
  }, [producciones, loteId, cultivo, temporada, cultivos]);

  const filteredClima = useMemo(() => (climas as any[]).filter((c) => matchingLoteIds.has(c.loteId)), [climas, matchingLoteIds]);
  const filteredSuelo = useMemo(() => (suelos as any[]).filter((s) => matchingLoteIds.has(s.loteId)), [suelos, matchingLoteIds]);
  const filteredRiego = useMemo(() => (riegos as any[]).filter((r) => matchingLoteIds.has(r.loteId)), [riegos, matchingLoteIds]);

  const prodData = [...filteredProd]
    .sort((a, b) => a.temporada.localeCompare(b.temporada))
    .map((p) => ({ name: p.temporada, 'Rend. tn/ha': p.rendimientoTnHa, 'Margen (k$)': ((p.ingresosBrutos - p.costosOperativos) / 1000).toFixed(1) }));

  const climaData = filteredClima
    .slice(-30)
    .map((c: any) => ({ name: c.fecha.slice(5), 'Temp Max': c.tempMax, 'Temp Min': c.tempMin, Lluvia: c.precipitacion }));

  const sueloData = filteredSuelo
    .map((s: any) => ({ name: s.fecha.slice(5), Humedad: s.humedad, pH: s.ph, 'N disp.': s.nitrogenoDisponible }));

  const riegoData = [...filteredRiego]
    .sort((a: any, b: any) => a.fecha.localeCompare(b.fecha))
    .slice(-30)
    .map((r: any) => ({ name: r.fecha.slice(5), 'Volumen (L)': r.volumenAplicadoL, 'Duración (h)': r.duracionHoras }));

  const TABS: { key: Tab; label: string }[] = [
    { key: 'produccion', label: 'Producción' },
    { key: 'clima', label: 'Clima' },
    { key: 'suelo', label: 'Suelo' },
    { key: 'riego', label: 'Riego' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Histórico</h1>
          <p className="text-sm text-gray-500 mt-1">Series temporales por variable y lote</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={loteId ?? ''}
            onChange={(e) => setLoteId(e.target.value ? Number(e.target.value) : null)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Todos los lotes</option>
            {(lotes as any[]).map((l) => (
              <option key={l.id} value={l.id}>{l.nombre}</option>
            ))}
          </select>
          <select
            value={cultivo}
            onChange={(e) => setCultivo(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Todos los cultivos</option>
            {allCultivos.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select
            value={temporada}
            onChange={(e) => setTemporada(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Todas las temporadas</option>
            {allTemporadas.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${tab === key ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {tab === 'produccion' && (
          <>
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Rendimiento y margen por temporada</h2>
            {prodData.length === 0 ? (
              <p className="text-center py-12 text-gray-400">Sin datos de producción</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={prodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Rend. tn/ha" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Margen (k$)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}

        {tab === 'clima' && (
          <>
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Temperaturas y precipitación (últimos 30 días)</h2>
            {climaData.length === 0 ? (
              <p className="text-center py-12 text-gray-400">Sin datos climáticos</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={climaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Temp Max" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Temp Min" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Lluvia" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </>
        )}

        {tab === 'suelo' && (
          <>
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Humedad, pH y nitrógeno disponible</h2>
            {sueloData.length === 0 ? (
              <p className="text-center py-12 text-gray-400">Sin datos de suelo</p>
            ) : (
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={sueloData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Humedad" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="N disp." stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4">
                  {filteredSuelo.map((s: any) => (
                    <div key={s.id} className="bg-gray-50 rounded-lg p-3 text-xs space-y-1">
                      <p className="font-semibold text-gray-700">{s.fecha}</p>
                      <p className="text-gray-500">Humedad: <span className="font-medium text-gray-800">{formatNumber(s.humedad)}%</span></p>
                      <p className="text-gray-500">pH: <span className="font-medium text-gray-800">{s.ph}</span></p>
                      <p className="text-gray-500">N disp.: <span className="font-medium text-gray-800">{s.nitrogenoDisponible} kg/ha</span></p>
                      <p className="text-gray-500">P disp.: <span className="font-medium text-gray-800">{s.fosforoDisponible} kg/ha</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'riego' && (
          <>
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Volumen y duración de riego (últimos 30 registros)</h2>
            {riegoData.length === 0 ? (
              <p className="text-center py-12 text-gray-400">Sin datos de riego</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={riegoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Volumen (L)" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Duración (h)" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
}
