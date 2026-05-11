'use client';

import { useEffect, useState } from 'react';
import { trpc } from '../../lib/trpc';
import { Settings, Save, Mail, Phone } from 'lucide-react';

export default function ConfiguracionPage() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.notificacionesConfig.get.useQuery();

  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (data) {
      setEmail((data as any).email ?? '');
      setTelefono((data as any).telefono ?? '');
    }
  }, [data]);

  const saveMutation = trpc.notificacionesConfig.save.useMutation({
    onSuccess: () => {
      setMsg({ type: 'ok', text: 'Configuración guardada. n8n la usará en la próxima ejecución.' });
      utils.notificacionesConfig.get.invalidate();
    },
    onError: (e) => setMsg({ type: 'err', text: e.message }),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    saveMutation.mutate({
      email: email.trim() || '',
      telefono: telefono.trim() || '',
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="h-6 w-6 text-green-600" />
          Configuración de notificaciones
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Destinatario único donde n8n enviará las alertas generadas automáticamente.
          El correo usa <strong>EmailJS</strong> y el teléfono usa el webhook de <strong>Evolution API</strong> (WhatsApp).
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : (
        <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4 text-gray-500" />
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agronomo@empresa.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400 mt-1">Dejar vacío para desactivar envío por email.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Phone className="h-4 w-4 text-gray-500" />
              Teléfono (formato internacional, ej: 5491123456789)
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="5491123456789"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400 mt-1">Número con código de país sin + ni espacios. Dejar vacío para desactivar WhatsApp.</p>
          </div>

          {msg && (
            <div className={`text-sm rounded-md px-3 py-2 ${msg.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {msg.text}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium rounded-md transition-colors"
            >
              <Save className="h-4 w-4" />
              {saveMutation.isPending ? 'Guardando...' : 'Guardar configuración'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
