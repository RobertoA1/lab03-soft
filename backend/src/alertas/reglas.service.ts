import { Injectable } from '@nestjs/common';
import { Suelo } from '../models/suelo.model';
import { Clima } from '../models/clima.model';
import { Produccion } from '../models/produccion.model';

export interface AlertaGenerada {
  tipo: string;
  severidad: 'critica' | 'alta' | 'media' | 'baja';
  categoria: 'hidrico' | 'quimico' | 'climatico' | 'predictivo';
  mensaje: string;
  racional: string;
  recomendacion: string;
  confianza: number;
  loteId: number;
  fecha: string;
}

@Injectable()
export class ReglasService {
  evaluar(params: {
    suelos: Suelo[];
    climas: Clima[];
    producciones: Produccion[];
    loteId: number;
  }): AlertaGenerada[] {
    const { suelos, climas, producciones, loteId } = params;
    const alertas: AlertaGenerada[] = [];
    const hoy = new Date().toISOString().split('T')[0];

    const ultimoSuelo = suelos[suelos.length - 1];
    if (ultimoSuelo) {
      if (ultimoSuelo.humedad < 35) {
        alertas.push({
          tipo: 'humedad-baja',
          severidad: ultimoSuelo.humedad < 25 ? 'critica' : 'alta',
          categoria: 'hidrico',
          mensaje: `Humedad de suelo crítica: ${ultimoSuelo.humedad}% (umbral: 35%)`,
          racional: `Lectura del ${ultimoSuelo.fecha}: humedad=${ultimoSuelo.humedad}%. Por debajo del umbral mínimo de 35% para cultivos de verano.`,
          recomendacion: 'Aplicar riego de 15-20 mm en las próximas 24-48 hs. Verificar sistema de goteo.',
          confianza: 0.92,
          loteId,
          fecha: hoy,
        });
      }
      if (ultimoSuelo.ph < 6.0) {
        alertas.push({
          tipo: 'ph-acido',
          severidad: 'media',
          categoria: 'quimico',
          mensaje: `pH ácido detectado: ${ultimoSuelo.ph} (rango óptimo: 6.0–7.5)`,
          racional: `pH=${ultimoSuelo.ph} reduce disponibilidad de P y Mo, limitando nodulación en leguminosas.`,
          recomendacion: 'Aplicar encalado: 1-2 t/ha de calcita o dolomita. Recalibrar en 30 días.',
          confianza: 0.88,
          loteId,
          fecha: hoy,
        });
      }
      if (ultimoSuelo.ph > 7.5) {
        alertas.push({
          tipo: 'ph-alcalino',
          severidad: 'media',
          categoria: 'quimico',
          mensaje: `pH alcalino detectado: ${ultimoSuelo.ph} (rango óptimo: 6.0–7.5)`,
          racional: `pH=${ultimoSuelo.ph} reduce absorción de Fe, Mn y Zn. Riesgo de clorosis en etapa vegetativa.`,
          recomendacion: 'Considerar aplicación de azufre elemental 50-100 kg/ha. Verificar fertilización con micronutrientes.',
          confianza: 0.85,
          loteId,
          fecha: hoy,
        });
      }
    }

    const ultimosClimas = climas.slice(-7);
    if (ultimosClimas.length >= 3) {
      const diasCalor = ultimosClimas.filter((c) => c.tempMax > 36).length;
      if (diasCalor >= 3) {
        alertas.push({
          tipo: 'ola-calor',
          severidad: 'alta',
          categoria: 'climatico',
          mensaje: `Ola de calor: ${diasCalor} días con temperatura máxima >36°C`,
          racional: `Temperaturas >36°C por ≥3 días consecutivos aumentan estrés hídrico y reducen eficiencia fotosintética.`,
          recomendacion: 'Aumentar frecuencia de riego. Monitorear síntomas de estrés térmico. Evaluar riego nocturno.',
          confianza: 0.90,
          loteId,
          fecha: hoy,
        });
      }
      const diasLluvia = ultimosClimas.filter((c) => c.precipitacion > 50).length;
      if (diasLluvia >= 1) {
        alertas.push({
          tipo: 'lluvia-intensa',
          severidad: 'media',
          categoria: 'climatico',
          mensaje: `Lluvia intensa registrada: >50 mm en ${diasLluvia} día(s)`,
          racional: `Precipitaciones >50 mm/día pueden generar encharcamiento y lixiviación de nutrientes.`,
          recomendacion: 'Verificar drenaje. Suspender riegos programados 48-72 hs. Monitorear enfermedades fúngicas.',
          confianza: 0.87,
          loteId,
          fecha: hoy,
        });
      }
    }

    if (producciones.length >= 2) {
      const sorted = [...producciones].sort((a, b) => a.temporada.localeCompare(b.temporada));
      const ultima = sorted[sorted.length - 1];
      const penultima = sorted[sorted.length - 2];
      const variacion = ((ultima.rendimientoTnHa - penultima.rendimientoTnHa) / penultima.rendimientoTnHa) * 100;
      if (variacion < -10) {
        alertas.push({
          tipo: 'rendimiento-bajo-pred',
          severidad: 'alta',
          categoria: 'predictivo',
          mensaje: `Rendimiento cayó ${Math.abs(variacion).toFixed(1)}% vs temporada anterior (${penultima.temporada}: ${penultima.rendimientoTnHa} tn/ha → ${ultima.temporada}: ${ultima.rendimientoTnHa} tn/ha)`,
          racional: `Modelo ensemble detecta caída significativa >10% entre campañas. Posibles causas: déficit hídrico, degradación de suelo o variabilidad climática.`,
          recomendacion: 'Revisar historial de riego y fertilización. Considerar análisis de suelo completo. Comparar con datos climáticos de la temporada.',
          confianza: 0.78,
          loteId,
          fecha: hoy,
        });
      }
    }

    return alertas;
  }
}
