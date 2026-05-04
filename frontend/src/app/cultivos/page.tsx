'use client';

import { trpc } from '../../lib/trpc';
import { formatDate } from '../../lib/utils';
import { Sprout } from 'lucide-react';

const CALIDAD_COLOR: Record<string, string> = {
  'Muy Buena': 'bg-green-100 text-green-700',
  Buena: 'bg-blue-100 text-blue-700',
  Regular: 'bg-yellow-100 text-yellow-700',
  Mala: 'bg-red-100 text-red-700',
};

export default function CultivosPage() {
  const { data: cultivos = [], isLoading } = trpc.cultivos.list.useQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cultivos</h1>
        <p className="text-sm text-gray-500 mt-1">Registro de todas las siembras por lote y temporada</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Cultivo</th>
                <th className="px-4 py-3 text-left">Variedad</th>
                <th className="px-4 py-3 text-left">Lote</th>
                <th className="px-4 py-3 text-left">Temporada</th>
                <th className="px-4 py-3 text-left">Siembra</th>
                <th className="px-4 py-3 text-left">Cosecha est.</th>
                <th className="px-4 py-3 text-right">Sup. (ha)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(cultivos as any[]).map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-green-500" />
                    {c.nombre}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.variedad}</td>
                  <td className="px-4 py-3 text-gray-600">{c.lote?.nombre ?? `#${c.loteId}`}</td>
                  <td className="px-4 py-3 text-gray-600">{c.temporada}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(c.fechaSiembra)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(c.fechaCosechaEst)}</td>
                  <td className="px-4 py-3 text-right text-gray-900 font-medium">{c.superficieHa}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {cultivos.length === 0 && (
            <p className="text-center py-12 text-gray-400">Sin cultivos registrados</p>
          )}
        </div>
      )}
    </div>
  );
}
