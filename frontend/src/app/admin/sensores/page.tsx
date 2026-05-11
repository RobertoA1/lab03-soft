'use client';

import { useMemo, useState } from 'react';
import { trpc } from '../../../lib/trpc';
import { Eye, EyeOff, RefreshCw, Trash2, Copy, Plus } from 'lucide-react';

type Tipo = 'clima' | 'suelo' | 'riego';

const TIPO_LABEL: Record<Tipo, string> = {
  clima: 'Clima',
  suelo: 'Suelo',
  riego: 'Riego',
};

export default function SensoresAdminPage() {
  const utils = trpc.useUtils();
  const { data: sensores = [], isLoading } = trpc.sensores.list.useQuery();
  const { data: lotes = [] } = trpc.lotes.list.useQuery();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    loteId: '',
    tipo: 'clima' as Tipo,
    fabricante: '',
    modelo: '',
    numeroSerie: '',
    firmware: '',
    fechaInstalacion: '',
  });
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Reveal/regenerate modal state
  const [modal, setModal] = useState<
    | { kind: 'reveal' | 'regenerate'; sensorId: number }
    | null
  >(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [revealedToken, setRevealedToken] = useState<string | null>(null);
  const [modalError, setModalError] = useState('');

  const userEmail = useMemo(() => {
    if (typeof window === 'undefined') return '';
    try {
      const u = JSON.parse(localStorage.getItem('agrotech-user') || '{}');
      return u.email || '';
    } catch {
      return '';
    }
  }, []);

  const createMutation = trpc.sensores.create.useMutation({
    onSuccess: () => {
      setMsg({ type: 'ok', text: 'Sensor creado. Use "Ver token" para revelarlo.' });
      setShowForm(false);
      setForm({ loteId: '', tipo: 'clima', fabricante: '', modelo: '', numeroSerie: '', firmware: '', fechaInstalacion: '' });
      utils.sensores.list.invalidate();
    },
    onError: (e) => setMsg({ type: 'err', text: e.message }),
  });

  const removeMutation = trpc.sensores.remove.useMutation({
    onSuccess: () => utils.sensores.list.invalidate(),
  });

  const revealMutation = trpc.sensores.revealToken.useMutation({
    onSuccess: (data) => {
      setRevealedToken(data.token);
      setModalError('');
    },
    onError: (e) => setModalError(e.message),
  });

  const regenerateMutation = trpc.sensores.regenerateToken.useMutation({
    onSuccess: (data) => {
      setRevealedToken(data.token);
      setModalError('');
      utils.sensores.list.invalidate();
    },
    onError: (e) => setModalError(e.message),
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    createMutation.mutate({
      loteId: Number(form.loteId),
      tipo: form.tipo,
      fabricante: form.fabricante,
      modelo: form.modelo,
      numeroSerie: form.numeroSerie,
      firmware: form.firmware || undefined,
      fechaInstalacion: form.fechaInstalacion || undefined,
    });
  };

  const closeModal = () => {
    setModal(null);
    setAdminPassword('');
    setRevealedToken(null);
    setModalError('');
  };

  const confirmModal = () => {
    if (!modal) return;
    setModalError('');
    setRevealedToken(null);
    if (modal.kind === 'reveal') {
      revealMutation.mutate({ id: modal.sensorId, adminEmail: userEmail, adminPassword });
    } else {
      regenerateMutation.mutate({ id: modal.sensorId, adminEmail: userEmail, adminPassword });
    }
  };

  const loteNombre = (id: number) => (lotes as any[]).find((l) => l.id === id)?.nombre ?? `Lote ${id}`;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administración de Sensores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestione sensores físicos vinculados a lotes. Cada sensor recibe un token JWT único para autenticar sus envíos.
          </p>
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setMsg(null); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="h-4 w-4" />
          {showForm ? 'Cancelar' : 'Nuevo sensor'}
        </button>
      </div>

      {msg && (
        <div className={`text-sm px-4 py-2.5 rounded-lg ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {msg.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={submitForm} className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Lote</label>
            <select required value={form.loteId} onChange={(e) => setForm({ ...form, loteId: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="">Seleccionar...</option>
              {(lotes as any[]).map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
            <select required value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as Tipo })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="clima">Clima</option>
              <option value="suelo">Suelo</option>
              <option value="riego">Riego</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Fabricante</label>
            <input required value={form.fabricante} onChange={(e) => setForm({ ...form, fabricante: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Modelo</label>
            <input required value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Número de serie</label>
            <input required value={form.numeroSerie} onChange={(e) => setForm({ ...form, numeroSerie: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Firmware</label>
            <input value={form.firmware} onChange={(e) => setForm({ ...form, firmware: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Fecha instalación</label>
            <input type="date" value={form.fechaInstalacion} onChange={(e) => setForm({ ...form, fechaInstalacion: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2">
            <button type="submit" disabled={createMutation.isPending} className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-60">
              {createMutation.isPending ? 'Creando...' : 'Crear sensor'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Tipo</th>
              <th className="text-left px-4 py-3 font-medium">Lote</th>
              <th className="text-left px-4 py-3 font-medium">Fabricante / Modelo</th>
              <th className="text-left px-4 py-3 font-medium">Serie</th>
              <th className="text-left px-4 py-3 font-medium">Token</th>
              <th className="text-left px-4 py-3 font-medium">Estado</th>
              <th className="text-left px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-400">Cargando...</td></tr>
            )}
            {!isLoading && (sensores as any[]).length === 0 && (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-400">Sin sensores. Cree el primero arriba.</td></tr>
            )}
            {(sensores as any[]).map((s: any) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">#{s.id}</td>
                <td className="px-4 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{TIPO_LABEL[s.tipo as Tipo]}</span></td>
                <td className="px-4 py-3 text-gray-700">{loteNombre(s.loteId)}</td>
                <td className="px-4 py-3 text-gray-700">{s.fabricante} <span className="text-gray-400">/ {s.modelo}</span></td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.numeroSerie}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-400">{s.tokenMasked}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${s.activo ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal({ kind: 'reveal', sensorId: s.id })} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                      <Eye className="h-3.5 w-3.5" /> Ver token
                    </button>
                    <button onClick={() => setModal({ kind: 'regenerate', sensorId: s.id })} className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800">
                      <RefreshCw className="h-3.5 w-3.5" /> Regenerar
                    </button>
                    <button onClick={() => { if (confirm('¿Eliminar sensor?')) removeMutation.mutate({ id: s.id }); }} className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800">
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {modal.kind === 'reveal' ? 'Ver token del sensor' : 'Regenerar token del sensor'}
            </h2>
            <p className="text-sm text-gray-500">
              {modal.kind === 'reveal'
                ? 'Confirme su contraseña de administrador para revelar el token.'
                : 'Confirme su contraseña de administrador para invalidar el token anterior y generar uno nuevo.'}
            </p>

            {!revealedToken && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email administrador</label>
                  <input value={userEmail} readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Contraseña</label>
                  <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" autoFocus />
                </div>
                {modalError && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{modalError}</div>}
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancelar</button>
                  <button onClick={confirmModal} disabled={!adminPassword || revealMutation.isPending || regenerateMutation.isPending} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-60">
                    {modal.kind === 'reveal' ? 'Revelar' : 'Regenerar'}
                  </button>
                </div>
              </>
            )}

            {revealedToken && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {modal.kind === 'reveal' ? 'Token (mantener confidencial)' : 'Nuevo token generado'}
                  </label>
                  <textarea readOnly value={revealedToken} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono h-24 resize-none bg-gray-50" />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={async () => { await navigator.clipboard.writeText(revealedToken); }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copiar
                  </button>
                  <button onClick={closeModal} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
