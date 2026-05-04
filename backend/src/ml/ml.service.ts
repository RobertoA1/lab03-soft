import { Injectable } from '@nestjs/common';

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

@Injectable()
export class MlService {
  optimizeIrrigation(loteId: number, sueloHumedad: number, climaTempMax: number, climaPrecip: number, riegoVolumen: number): { recomendacion: string; volumenSugeridoL: number; confianza: number } {
    let volumenSugerido = riegoVolumen;
    let confianza = 0.85;
    let recomendacion = 'Mantener riego actual';

    if (sueloHumedad < 35) {
      volumenSugerido = Math.round(riegoVolumen * 1.2);
      recomendacion = 'Aumentar volumen de riego: humedad del suelo baja (< 35%)';
      confianza = 0.92;
    } else if (sueloHumedad > 45 && climaPrecip > 10) {
      volumenSugerido = Math.round(riegoVolumen * 0.7);
      recomendacion = 'Reducir riego: alta humedad y precipitación esperada';
      confianza = 0.88;
    }

    if (climaTempMax > 35) {
      volumenSugerido = Math.round(volumenSugerido * 1.15);
      recomendacion += ' | Ajuste por ola de calor';
      confianza = Math.min(confianza + 0.05, 0.99);
    }

    return { recomendacion, volumenSugeridoL: volumenSugerido, confianza };
  }

  private fallbackPredict(
    sueloPh: number, sueloN: number, sueloHum: number,
    climaTempAvg: number, climaPrecipTotal: number, riegoTotal: number,
  ) {
    let base = 3.0;
    const factors: string[] = [];

    if (sueloPh >= 6.0 && sueloPh <= 7.5) { base += 0.8; factors.push('pH óptimo'); }
    else { base -= 0.4; factors.push('pH subóptimo'); }

    if (sueloN > 20) { base += 0.6; factors.push('Nitrógeno adecuado'); }
    else { base -= 0.3; factors.push('Nitrógeno bajo'); }

    if (sueloHum >= 35 && sueloHum <= 45) { base += 0.4; factors.push('Humedad de suelo favorable'); }
    else { base -= 0.2; factors.push('Humedad de suelo desfavorable'); }

    if (climaTempAvg >= 20 && climaTempAvg <= 28) { base += 0.3; factors.push('Temperatura favorable'); }
    else { base -= 0.2; factors.push('Temperatura extrema'); }

    if (climaPrecipTotal > 150) { base += 0.2; factors.push('Buena precipitación'); }
    else if (climaPrecipTotal < 80) { base -= 0.3; factors.push('Precipitación baja'); }

    if (riegoTotal > 50000) { base += 0.3; factors.push('Riego complementario adecuado'); }
    else if (riegoTotal < 20000 && climaPrecipTotal < 80) { base -= 0.4; factors.push('Riego insuficiente para sequía'); }

    const confianza = Math.min(0.6 + factors.length * 0.05, 0.95);
    return { rendimientoEstimadoTnHa: Math.max(base, 1.0), confianza, factors };
  }

  async predictYield(
    loteId: number,
    sueloPh: number, sueloN: number, sueloHum: number,
    climaTempAvg: number, climaPrecipTotal: number, riegoTotal: number,
    extras?: {
      fosforo?: number;
      tempMax?: number;
      tempMin?: number;
      cultivo?: string;
      superficieHa?: number;
    },
  ): Promise<{ rendimientoEstimadoTnHa: number; confianza: number; factors: string[] }> {
    try {
      const body = {
        humedad: sueloHum,
        ph: sueloPh,
        nitrogeno: sueloN,
        fosforo: extras?.fosforo ?? 15,
        temp_max_prom: extras?.tempMax ?? climaTempAvg + 5,
        temp_min_prom: extras?.tempMin ?? climaTempAvg - 5,
        precipitacion_total: climaPrecipTotal,
        cultivo: extras?.cultivo ?? 'Soja',
        superficie_ha: extras?.superficieHa ?? 10,
      };
      const res = await fetch(`${ML_URL}/predict/rendimiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`ML service error ${res.status}`);
      const data = await res.json();
      return {
        rendimientoEstimadoTnHa: data.rendimiento_pred_tn_ha,
        confianza: data.confianza,
        factors: data.factores_principales,
      };
    } catch (err) {
      console.warn('[ML] Fallback to rule-based prediction:', (err as Error).message);
      return this.fallbackPredict(sueloPh, sueloN, sueloHum, climaTempAvg, climaPrecipTotal, riegoTotal);
    }
  }
}
