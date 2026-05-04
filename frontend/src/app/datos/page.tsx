'use client';

import { useState } from 'react';
import { trpc } from '../../lib/trpc';

type FormTab = 'clima' | 'suelo' | 'riego' | 'produccion';

const TABS: { key: FormTab; label: string }[] = [
  { key: 'clima', label: 'Clima' },
  { key: 'suelo', label: 'Suelo' },
  { key: 'riego', label: 'Riego' },
  { key: 'produccion', label: 'Producción' },
];

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
    </div>
  );
}

function SelectField({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select {...props} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
        {children}
      </select>
    </div>
  );
}

export default function DatosPage() {
  const [tab, setTab] = useState<FormTab>('clima');
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const utils = trpc.useUtils();
  const { data: lotes = [] } = trpc.lotes.list.useQuery();
  const { data: cultivos = [] } = trpc.cultivos.list.useQuery();

  const createClima = trpc.clima.create.useMutation({ onSuccess: () => { setMsg({ type: 'ok', text: 'Registro climático guardado.' }); utils.clima.list.invalidate(); } });
  const createSuelo = trpc.suelo.create.useMutation({ onSuccess: () => { setMsg({ type: 'ok', text: 'Dato de suelo guardado.' }); utils.suelo.list.invalidate(); } });
  const createRiego = trpc.riego.create.useMutation({ onSuccess: () => { setMsg({ type: 'ok', text: 'Registro de riego guardado.' }); utils.riego.list.invalidate(); } });
  const createProd = trpc.produccion.create.useMutation({ onSuccess: () => { setMsg({ type: 'ok', text: 'Dato de producción guardado.' }); utils.produccion.list.invalidate(); } });

  const [clima, setClima] = useState({ loteId: '', fecha: '', tempMax: '', tempMin: '', precipitacion: '', humedadRelativa: '', radiacionSolar: '', velocidadViento: '' });
  const [suelo, setSuelo] = useState({ loteId: '', fecha: '', humedad: '', ph: '', nitrogenoDisponible: '', fosforoDisponible: '', conductividadElectrica: '' });
  const [riego, setRiego] = useState({ loteId: '', fecha: '', tipoRiego: 'Goteo', volumenAplicadoL: '', duracionHoras: '', presionBar: '' });
  const [prod, setProd] = useState({ cultivoId: '', loteId: '', temporada: '', rendimientoTnHa: '', calidadGrano: 'Buena', costosOperativos: '', ingresosBrutos: '', observaciones: '' });

  const n = (v: string) => parseFloat(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      if (tab === 'clima') createClima.mutate({ loteId: n(clima.loteId), fecha: clima.fecha, tempMax: n(clima.tempMax), tempMin: n(clima.tempMin), precipitacion: n(clima.precipitacion), humedadRelativa: n(clima.humedadRelativa), radiacionSolar: n(clima.radiacionSolar), velocidadViento: n(clima.velocidadViento) });
      if (tab === 'suelo') createSuelo.mutate({ loteId: n(suelo.loteId), fecha: suelo.fecha, humedad: n(suelo.humedad), ph: n(suelo.ph), nitrogenoDisponible: n(suelo.nitrogenoDisponible), fosforoDisponible: n(suelo.fosforoDisponible), conductividadElectrica: n(suelo.conductividadElectrica) });
      if (tab === 'riego') createRiego.mutate({ loteId: n(riego.loteId), fecha: riego.fecha, tipoRiego: riego.tipoRiego, volumenAplicadoL: n(riego.volumenAplicadoL), duracionHoras: n(riego.duracionHoras), presionBar: n(riego.presionBar) });
      if (tab === 'produccion') createProd.mutate({ cultivoId: n(prod.cultivoId), loteId: n(prod.loteId), temporada: prod.temporada, rendimientoTnHa: n(prod.rendimientoTnHa), calidadGrano: prod.calidadGrano, costosOperativos: n(prod.costosOperativos), ingresosBrutos: n(prod.ingresosBrutos), observaciones: prod.observaciones || undefined });
    } catch {
      setMsg({ type: 'err', text: 'Verifique los campos.' });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cargar Datos</h1>
        <p className="text-sm text-gray-500 mt-1">Ingreso manual de registros agronómicos</p>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => { setTab(key); setMsg(null); }} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${tab === key ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {msg && (
        <div className={`text-sm px-4 py-2.5 rounded-lg ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {tab === 'clima' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Lote" value={clima.loteId} onChange={(e) => setClima({ ...clima, loteId: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {(lotes as any[]).map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
              </SelectField>
              <Field label="Fecha" type="date" value={clima.fecha} onChange={(e) => setClima({ ...clima, fecha: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Temp. máx. (°C)" type="number" step="0.1" value={clima.tempMax} onChange={(e) => setClima({ ...clima, tempMax: e.target.value })} required />
              <Field label="Temp. mín. (°C)" type="number" step="0.1" value={clima.tempMin} onChange={(e) => setClima({ ...clima, tempMin: e.target.value })} required />
              <Field label="Precipitación (mm)" type="number" step="0.1" value={clima.precipitacion} onChange={(e) => setClima({ ...clima, precipitacion: e.target.value })} required />
              <Field label="Humedad relativa (%)" type="number" step="0.1" value={clima.humedadRelativa} onChange={(e) => setClima({ ...clima, humedadRelativa: e.target.value })} required />
              <Field label="Radiación solar (MJ/m²)" type="number" step="0.1" value={clima.radiacionSolar} onChange={(e) => setClima({ ...clima, radiacionSolar: e.target.value })} required />
              <Field label="Velocidad viento (km/h)" type="number" step="0.1" value={clima.velocidadViento} onChange={(e) => setClima({ ...clima, velocidadViento: e.target.value })} required />
            </div>
          </>
        )}

        {tab === 'suelo' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Lote" value={suelo.loteId} onChange={(e) => setSuelo({ ...suelo, loteId: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {(lotes as any[]).map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
              </SelectField>
              <Field label="Fecha" type="date" value={suelo.fecha} onChange={(e) => setSuelo({ ...suelo, fecha: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Humedad (%)" type="number" step="0.1" value={suelo.humedad} onChange={(e) => setSuelo({ ...suelo, humedad: e.target.value })} required />
              <Field label="pH" type="number" step="0.01" value={suelo.ph} onChange={(e) => setSuelo({ ...suelo, ph: e.target.value })} required />
              <Field label="N disponible (ppm)" type="number" step="0.1" value={suelo.nitrogenoDisponible} onChange={(e) => setSuelo({ ...suelo, nitrogenoDisponible: e.target.value })} required />
              <Field label="P disponible (ppm)" type="number" step="0.1" value={suelo.fosforoDisponible} onChange={(e) => setSuelo({ ...suelo, fosforoDisponible: e.target.value })} required />
              <Field label="Cond. eléctrica (dS/m)" type="number" step="0.01" value={suelo.conductividadElectrica} onChange={(e) => setSuelo({ ...suelo, conductividadElectrica: e.target.value })} required />
            </div>
          </>
        )}

        {tab === 'riego' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Lote" value={riego.loteId} onChange={(e) => setRiego({ ...riego, loteId: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {(lotes as any[]).map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
              </SelectField>
              <Field label="Fecha" type="date" value={riego.fecha} onChange={(e) => setRiego({ ...riego, fecha: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Tipo de riego" value={riego.tipoRiego} onChange={(e) => setRiego({ ...riego, tipoRiego: e.target.value })}>
                {['Goteo', 'Aspersión', 'Pivote Central', 'Gravedad', 'Microaspersión'].map((t) => <option key={t}>{t}</option>)}
              </SelectField>
              <Field label="Volumen aplicado (L)" type="number" value={riego.volumenAplicadoL} onChange={(e) => setRiego({ ...riego, volumenAplicadoL: e.target.value })} required />
              <Field label="Duración (hs)" type="number" step="0.5" value={riego.duracionHoras} onChange={(e) => setRiego({ ...riego, duracionHoras: e.target.value })} required />
              <Field label="Presión (bar)" type="number" step="0.1" value={riego.presionBar} onChange={(e) => setRiego({ ...riego, presionBar: e.target.value })} required />
            </div>
          </>
        )}

        {tab === 'produccion' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Lote" value={prod.loteId} onChange={(e) => setProd({ ...prod, loteId: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {(lotes as any[]).map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
              </SelectField>
              <SelectField label="Cultivo" value={prod.cultivoId} onChange={(e) => setProd({ ...prod, cultivoId: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {(cultivos as any[]).map((c) => <option key={c.id} value={c.id}>{c.nombre} — {c.variedad} ({c.temporada})</option>)}
              </SelectField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Temporada" placeholder="2024/25" value={prod.temporada} onChange={(e) => setProd({ ...prod, temporada: e.target.value })} required />
              <Field label="Rendimiento (tn/ha)" type="number" step="0.01" value={prod.rendimientoTnHa} onChange={(e) => setProd({ ...prod, rendimientoTnHa: e.target.value })} required />
              <SelectField label="Calidad grano" value={prod.calidadGrano} onChange={(e) => setProd({ ...prod, calidadGrano: e.target.value })}>
                {['Muy Buena', 'Buena', 'Regular', 'Mala'].map((q) => <option key={q}>{q}</option>)}
              </SelectField>
              <Field label="Costos operativos ($)" type="number" value={prod.costosOperativos} onChange={(e) => setProd({ ...prod, costosOperativos: e.target.value })} required />
              <Field label="Ingresos brutos ($)" type="number" value={prod.ingresosBrutos} onChange={(e) => setProd({ ...prod, ingresosBrutos: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Observaciones</label>
              <textarea value={prod.observaciones} onChange={(e) => setProd({ ...prod, observaciones: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
          </>
        )}

        <div className="pt-2">
          <button type="submit" className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
            Guardar registro
          </button>
        </div>
      </form>
    </div>
  );
}
