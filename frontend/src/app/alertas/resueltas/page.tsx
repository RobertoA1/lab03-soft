'use client';

import Link from 'next/link';
import { trpc } from '../../../lib/trpc';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SEV_DOT: Record<string, string> = {
  critica: 'bg-red-400',
  alta: 'bg-orange-400',
  media: 'bg-yellow-400',
  baja: 'bg-blue-300',
};

export default function ResueltasPage() {
  const { data: alertas = [], isLoading } = trpc.alertas.list.useQuery();
  const resueltas = (alertas as any[]).filter((a) => a.estado === 'resuelta');

  const grouped: Record<string, any[]> = {};
  resueltas.forEach((a) => {
    const day = a.updatedAt?.split('T')[0] ?? a.fecha ?? 'Sin fecha';
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(a);
  });

  const sortedDays = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/alertas"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas resueltas</h1>
          <p className="text-sm text-gray-500 mt-0.5">{resueltas.length} alertas resueltas en total</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : sortedDays.length === 0 ? (
        <div className="text-center py-12 text-gray-400 flex flex-col items-center gap-2">
          <CheckCircle2 className="h-8 w-8 text-gray-300" />
          No hay alertas resueltas aún
        </div>
      ) : (
        sortedDays.map((day) => (
          <div key={day}>
            <h2 className="text-sm font-semibold text-gray-500 mb-2 sticky top-0 bg-gray-50 py-1 z-10">
              {new Date(day + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <div className="space-y-2">
              {grouped[day].map((a) => (
                <div
                  key={a.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 opacity-80"
                >
                  <div className="flex items-start gap-3">
                    <span className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', SEV_DOT[a.severidad] ?? 'bg-gray-300')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 line-through decoration-gray-300">{a.mensaje}</p>
                      <p className="text-xs text-gray-500 mt-1">{a.recomendacion}</p>
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-400">
                        <span>{a.lote?.nombre ?? (a.loteId ? `Lote #${a.loteId}` : 'General')}</span>
                        <span>·</span>
                        <span className="capitalize">{a.severidad}</span>
                        {a.notaResolucion && (
                          <>
                            <span>·</span>
                            <span className="italic text-green-600">"{a.notaResolucion}"</span>
                          </>
                        )}
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
