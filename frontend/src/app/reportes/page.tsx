'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';

function downloadBase64PDF(base64: string, filename: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ReportesPage() {
  const [loadingOp, setLoadingOp] = useState(false);
  const [loadingMgmt, setLoadingMgmt] = useState(false);
  const [error, setError] = useState('');
  const [loteId, setLoteId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const utils = trpc.useUtils();
  const { data: lotes = [] } = trpc.lotes.list.useQuery();

  const handleDownloadOp = async () => {
    setLoadingOp(true);
    setError('');
    try {
      const data = await utils.reports.operational.fetch({
        loteId: loteId ?? undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      if (data) downloadBase64PDF(data, `reporte-operativo-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e: any) {
      setError(e.message ?? 'Error al generar reporte operativo');
    }
    setLoadingOp(false);
  };

  const handleDownloadMgmt = async () => {
    setLoadingMgmt(true);
    setError('');
    try {
      const data = await utils.reports.management.fetch({
        loteId: loteId ?? undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      if (data) downloadBase64PDF(data, `reporte-gestion-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e: any) {
      setError(e.message ?? 'Error al generar reporte de gestión');
    }
    setLoadingMgmt(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Reportes PDF</h1>

      <div className="mb-6 flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Lote</label>
          <select
            value={loteId ?? ''}
            onChange={(e) => setLoteId(e.target.value ? Number(e.target.value) : null)}
            className="text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Todos los lotes</option>
            {(lotes as any[]).map((l) => (
              <option key={l.id} value={l.id}>{l.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-slate-700">Reporte Operativo</h2>
          <p className="mb-4 text-sm text-slate-500">KPIs operativos, gráficos de clima y suelo, tabla de alertas, riegos y lotes.</p>
          <button onClick={handleDownloadOp} disabled={loadingOp} className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">
            {loadingOp ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-slate-700">Reporte de Gestión</h2>
          <p className="mb-4 text-sm text-slate-500">KPIs financieros, gráficos de rendimiento y margen por temporada/lote, ROI y resumen climático.</p>
          <button onClick={handleDownloadMgmt} disabled={loadingMgmt} className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">
            {loadingMgmt ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
    </div>
  );
}
