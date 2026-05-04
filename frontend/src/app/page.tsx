'use client';

import { useState, useMemo } from 'react';
import { trpc } from '../lib/trpc';
import { AlertTriangle, MapPin, Sprout, TrendingUp, Droplets, BarChart3, Thermometer, CloudRain } from 'lucide-react';
import { formatNumber } from '../lib/utils';
import { useAlertSSE } from '../hooks/use-alert-sse';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function StatCard({ title, value, sub, icon: Icon, color }: { title: string; value: string | number; sub?: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  useAlertSSE();
  const [loteId, setLoteId] = useState<number | null>(null);
  const [cultivo, setCultivo] = useState<string>('');
  const [temporada, setTemporada] = useState<string>('');

  const { data: resumen } = trpc.dashboard.resumen.useQuery(loteId ? { loteId } : undefined);
  const { data: alertas = [] } = trpc.alertas.pendientes.useQuery();
  const { data: producciones = [] } = trpc.produccion.list.useQuery();
  const { data: lotes = [] } = trpc.lotes.list.useQuery();
  const { data: cultivos = [] } = trpc.cultivos.list.useQuery();

  const filteredProds = useMemo(() => {
    let list = producciones as any[];
    if (loteId) list = list.filter((p) => p.loteId === loteId);
    if (cultivo) {
      const cultivoIds = (cultivos as any[]).filter((c) => c.nombre === cultivo).map((c) => c.id);
      list = list.filter((p) => cultivoIds.includes(p.cultivoId));
    }
    if (temporada) list = list.filter((p) => p.temporada === temporada);
    return list;
  }, [producciones, loteId, cultivo, temporada, cultivos]);

  const rendData = useMemo(() => {
    return [...filteredProds]
      .sort((a, b) => a.temporada.localeCompare(b.temporada))
      .map((p) => ({ name: p.temporada, rend: p.rendimientoTnHa }));
  }, [filteredProds]);

  const allTemporadas = useMemo(() => Array.from(new Set((producciones as any[]).map((p) => p.temporada))).sort(), [producciones]);
  const allCultivos = useMemo(() => Array.from(new Set((cultivos as any[]).map((c) => c.nombre))).sort(), [cultivos]);

  const filteredAlertas = loteId ? alertas.filter((a: any) => a.loteId === loteId) : alertas;
  const criticals = filteredAlertas.filter((a: any) => a.severidad === 'critica' || a.severidad === 'alta');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Resumen operativo del establecimiento</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={loteId ?? ''} onChange={(e) => setLoteId(e.target.value ? Number(e.target.value) : null)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Todos los lotes</option>
            {(lotes as any[]).map((l) => (<option key={l.id} value={l.id}>{l.nombre}</option>))}
          </select>
          <select value={cultivo} onChange={(e) => setCultivo(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Todos los cultivos</option>
            {allCultivos.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select value={temporada} onChange={(e) => setTemporada(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Todas las temporadas</option>
            {allTemporadas.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Lotes activos" value={resumen?.totalLotes ?? (loteId ? 1 : lotes.length)} icon={MapPin} color="bg-green-500" />
        <StatCard title="Alertas pendientes" value={resumen?.alertasTotal ?? filteredAlertas.length} sub={`${resumen?.alertasCriticas ?? criticals.length} críticas`} icon={AlertTriangle} color="bg-red-500" />
        <StatCard title="Registros de producción" value={resumen?.totalCultivos ?? filteredProds.length} icon={Sprout} color="bg-blue-500" />
        <StatCard title="Últ. rendimiento (prom)" value={filteredProds.length ? `${formatNumber(filteredProds.reduce((s, p) => s + p.rendimientoTnHa, 0) / filteredProds.length)} tn/ha` : '—'} icon={TrendingUp} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Estado hídrico"
          value={resumen?.sueloLatest ? `${formatNumber(resumen.sueloLatest.humedad)}%` : '—'}
          sub={resumen?.riegoLatest ? `Últ. riego: ${formatNumber(resumen.riegoLatest.volumen)} L` : undefined}
          icon={Droplets}
          color="bg-cyan-500"
        />
        <StatCard
          title="Rendimiento estimado"
          value={resumen?.rendimientoEstimado ? `${formatNumber(resumen.rendimientoEstimado.rendimientoEstimadoTnHa)} tn/ha` : '—'}
          sub={resumen?.rendimientoEstimado ? `Confianza: ${Math.round(resumen.rendimientoEstimado.confianza * 100)}%` : undefined}
          icon={BarChart3}
          color="bg-purple-500"
        />
        <StatCard
          title="Temp. promedio"
          value={resumen?.climaAgg ? `${resumen.climaAgg.tempAvg} °C` : '—'}
          sub={resumen?.climaAgg ? `Precip. acum. ${formatNumber(resumen.climaAgg.precipTotal)} mm` : undefined}
          icon={Thermometer}
          color="bg-orange-500"
        />
        <StatCard
          title="Riego total"
          value={resumen?.climaAgg ? `${formatNumber(resumen.climaAgg.riegoTotal)} L` : '—'}
          sub={resumen?.sueloLatest?.nitrogeno ? `N disp. ${formatNumber(resumen.sueloLatest.nitrogeno)} ppm` : undefined}
          icon={CloudRain}
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Rendimiento histórico (tn/ha)</h2>
          {rendData.length === 0 ? (
            <p className="text-center py-12 text-gray-400 text-sm">Sin datos para los filtros seleccionados</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={rendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rend" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Alertas activas</h2>
          {filteredAlertas.length === 0 ? (
            <p className="text-sm text-gray-400 mt-6 text-center">Sin alertas pendientes</p>
          ) : (
            <div className="space-y-3 max-h-56 overflow-y-auto">
              {(filteredAlertas as any[]).slice(0, 6).map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${a.severidad === 'critica' ? 'bg-red-600' : a.severidad === 'alta' ? 'bg-orange-500' : a.severidad === 'media' ? 'bg-yellow-500' : 'bg-blue-400'}`} />
                  <div>
                    <p className="text-xs font-medium text-gray-800">{a.mensaje}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.lote?.nombre ?? (a.loteId ? `Lote #${a.loteId}` : 'General')} · {a.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
