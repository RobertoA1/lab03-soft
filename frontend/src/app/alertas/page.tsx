'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '../../lib/trpc';
import { CheckCircle, Eye, Archive } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAlertSSE } from '../../hooks/use-alert-sse';

const SEV_STYLE: Record<string, string> = {
  critica: 'bg-red-100 text-red-700 border-red-200',
  alta: 'bg-orange-100 text-orange-700 border-orange-200',
  media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  baja: 'bg-blue-100 text-blue-700 border-blue-200',
};

const SEV_DOT: Record<string, string> = {
  critica: 'bg-red-500',
  alta: 'bg-orange-500',
  media: 'bg-yellow-500',
  baja: 'bg-blue-400',
};

export default function AlertasPage() {
  useAlertSSE();
  const utils = trpc.useUtils();
  const { data: alertas = [], isLoading } = trpc.alertas.list.useQuery();
  const invalidateAll = () => { utils.alertas.list.invalidate(); utils.alertas.pendientes.invalidate(); utils.dashboard.resumen.invalidate(); };
  const acknowledge = trpc.alertas.acknowledge.useMutation({ onSuccess: invalidateAll });
  const resolve = trpc.alertas.resolve.useMutation({ onSuccess: invalidateAll });

  const [selected, setSelected] = useState<any>(null);
  const [nota, setNota] = useState('');

  const handleResolve = (id: number) => {
    resolve.mutate({ id, nota });
    setSelected(null);
    setNota('');
  };

  const activeAlertas = (alertas as any[]).filter((a) => a.estado !== 'resuelta');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
          <p className="text-sm text-gray-500 mt-1">Alertas generadas por reglas agronómicas e IA</p>
        </div>
        <Link
          href="/alertas/resueltas"
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition"
        >
          <Archive className="h-4 w-4" />
          Resueltas
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : (
        <div className="space-y-3">
          {activeAlertas.map((a) => (
            <div
              key={a.id}
              className={cn(
                'rounded-xl border p-4 transition-all',
                SEV_STYLE[a.severidad] ?? 'bg-gray-100 border-gray-200',
                a.estado === 'reconocida' && 'ring-2 ring-offset-1 ring-blue-300',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={cn('mt-1.5 h-2.5 w-2.5 rounded-full shrink-0', SEV_DOT[a.severidad] ?? 'bg-gray-400')} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{a.mensaje}</p>
                      {a.estado === 'reconocida' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-200 text-blue-800">
                          <Eye className="h-2.5 w-2.5" /> Reconocida
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-1 opacity-70">{a.recomendacion}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs opacity-60">
                      <span>{a.lote?.nombre ?? (a.loteId ? `Lote #${a.loteId}` : 'General')}</span>
                      <span>·</span>
                      <span>{a.fecha}</span>
                      <span>·</span>
                      <span>{a.confianza != null ? `${Math.round(a.confianza * 100)}% confianza` : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {a.estado === 'pendiente' && (
                    <button
                      onClick={() => acknowledge.mutate({ id: a.id })}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/60 hover:bg-white transition border border-current opacity-70"
                    >
                      <Eye className="h-3 w-3" /> Reconocer
                    </button>
                  )}
                  <button
                    onClick={() => setSelected(a)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/60 hover:bg-white transition border border-current opacity-70"
                  >
                    <CheckCircle className="h-3 w-3" /> Resolver
                  </button>
                </div>
              </div>
            </div>
          ))}
          {activeAlertas.length === 0 && (
            <div className="text-center py-12 text-gray-400 flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-400" />
              Sin alertas activas
            </div>
          )}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <h2 className="font-semibold text-gray-900">Resolver alerta</h2>
            <p className="text-sm text-gray-600">{selected.mensaje}</p>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Nota de resolución (opcional)..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Cancelar</button>
              <button onClick={() => handleResolve(selected.id)} className="text-sm px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
