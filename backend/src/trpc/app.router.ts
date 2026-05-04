import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { router, publicProcedure, authedProcedure } from './trpc';
import { LotesService } from '../lotes/lotes.service';
import { CultivosService } from '../cultivos/cultivos.service';
import { ClimaService } from '../clima/clima.service';
import { SueloService } from '../suelo/suelo.service';
import { RiegoService } from '../riego/riego.service';
import { ProduccionService } from '../produccion/produccion.service';
import { AlertasService } from '../alertas/alertas.service';
import { ReglasService } from '../alertas/reglas.service';
import { AuthService } from '../auth/auth.service';
import { ReportsService } from '../reports/reports.service';
import { MlService } from '../ml/ml.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private lotesService: LotesService,
    private cultivosService: CultivosService,
    private climaService: ClimaService,
    private sueloService: SueloService,
    private riegoService: RiegoService,
    private produccionService: ProduccionService,
    private alertasService: AlertasService,
    private reglasService: ReglasService,
    private authService: AuthService,
    private reportsService: ReportsService,
    private mlService: MlService,
  ) {}

  get appRouter() {
    return router({
      auth: router({
        login: publicProcedure
          .input(z.object({ email: z.string(), password: z.string() }))
          .mutation(async ({ input }) => this.authService.login(input.email, input.password)),
        register: publicProcedure
          .input(z.object({ email: z.string(), password: z.string(), nombre: z.string() }))
          .mutation(async ({ input }) => this.authService.register(input.email, input.password, input.nombre)),
      }),

      lotes: router({
        list: authedProcedure.query(() => this.lotesService.findAll()),
        get: authedProcedure.input(z.object({ id: z.number() })).query(({ input }) => this.lotesService.findOne(input.id)),
        create: authedProcedure
          .input(z.object({ nombre: z.string(), superficieHa: z.number(), cultivo: z.string(), ubicacion: z.string() }))
          .mutation(({ input }) => this.lotesService.create(input)),
        update: authedProcedure
          .input(z.object({ id: z.number(), nombre: z.string().optional(), superficieHa: z.number().optional(), cultivo: z.string().optional(), ubicacion: z.string().optional() }))
          .mutation(({ input }) => { const { id, ...data } = input; return this.lotesService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.lotesService.remove(input.id)),
      }),

      cultivos: router({
        list: authedProcedure.query(() => this.cultivosService.findAll()),
        get: authedProcedure.input(z.object({ id: z.number() })).query(({ input }) => this.cultivosService.findOne(input.id)),
        create: authedProcedure
          .input(z.object({
            nombre: z.string(), variedad: z.string(), fechaSiembra: z.string(),
            fechaCosechaEst: z.string(), loteId: z.number(), temporada: z.string(), superficieHa: z.number(),
          }))
          .mutation(({ input }) => this.cultivosService.create(input)),
        update: authedProcedure
          .input(z.object({ id: z.number() }).passthrough())
          .mutation(({ input }) => { const { id, ...data } = input; return this.cultivosService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.cultivosService.remove(input.id)),
      }),

      clima: router({
        list: authedProcedure.query(() => this.climaService.findAll()),
        byLote: authedProcedure.input(z.object({ loteId: z.number() })).query(({ input }) => this.climaService.findByLote(input.loteId)),
        recent: authedProcedure.input(z.object({ loteId: z.number(), days: z.number().optional() })).query(({ input }) => this.climaService.findRecent(input.loteId, input.days)),
        create: authedProcedure
          .input(z.object({ loteId: z.number(), fecha: z.string(), tempMax: z.number(), tempMin: z.number(), precipitacion: z.number(), humedadRelativa: z.number(), radiacionSolar: z.number(), velocidadViento: z.number() }))
          .mutation(({ input }) => this.climaService.create(input)),
        update: authedProcedure.input(z.object({ id: z.number() }).passthrough()).mutation(({ input }) => { const { id, ...data } = input; return this.climaService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.climaService.remove(input.id)),
      }),

      suelo: router({
        list: authedProcedure.query(() => this.sueloService.findAll()),
        byLote: authedProcedure.input(z.object({ loteId: z.number() })).query(({ input }) => this.sueloService.findByLote(input.loteId)),
        latestByLote: authedProcedure.input(z.object({ loteId: z.number() })).query(({ input }) => this.sueloService.findLatestByLote(input.loteId)),
        create: authedProcedure
          .input(z.object({ loteId: z.number(), fecha: z.string(), humedad: z.number(), ph: z.number(), nitrogenoDisponible: z.number(), fosforoDisponible: z.number(), conductividadElectrica: z.number() }))
          .mutation(({ input }) => this.sueloService.create(input)),
        update: authedProcedure.input(z.object({ id: z.number() }).passthrough()).mutation(({ input }) => { const { id, ...data } = input; return this.sueloService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.sueloService.remove(input.id)),
      }),

      riego: router({
        list: authedProcedure.query(() => this.riegoService.findAll()),
        byLote: authedProcedure.input(z.object({ loteId: z.number() })).query(({ input }) => this.riegoService.findByLote(input.loteId)),
        create: authedProcedure
          .input(z.object({ loteId: z.number(), fecha: z.string(), tipoRiego: z.string(), volumenAplicadoL: z.number(), duracionHoras: z.number(), presionBar: z.number() }))
          .mutation(({ input }) => this.riegoService.create(input)),
        update: authedProcedure.input(z.object({ id: z.number() }).passthrough()).mutation(({ input }) => { const { id, ...data } = input; return this.riegoService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.riegoService.remove(input.id)),
      }),

      produccion: router({
        list: authedProcedure.query(() => this.produccionService.findAll()),
        byLote: authedProcedure.input(z.object({ loteId: z.number() })).query(({ input }) => this.produccionService.findByLote(input.loteId)),
        create: authedProcedure
          .input(z.object({ cultivoId: z.number(), loteId: z.number(), temporada: z.string(), rendimientoTnHa: z.number(), calidadGrano: z.string(), costosOperativos: z.number(), ingresosBrutos: z.number(), observaciones: z.string().optional() }))
          .mutation(({ input }) => this.produccionService.create(input)),
        update: authedProcedure.input(z.object({ id: z.number() }).passthrough()).mutation(({ input }) => { const { id, ...data } = input; return this.produccionService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.produccionService.remove(input.id)),
      }),

      alertas: router({
        list: authedProcedure.query(() => this.alertasService.findAll()),
        pendientes: authedProcedure.query(() => this.alertasService.findPendientes()),
        acknowledge: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.alertasService.acknowledge(input.id)),
        resolve: authedProcedure
          .input(z.object({ id: z.number(), nota: z.string().optional() }))
          .mutation(({ input }) => this.alertasService.resolve(input.id, input.nota)),
        update: authedProcedure.input(z.object({ id: z.number() }).passthrough()).mutation(({ input }) => { const { id, ...data } = input; return this.alertasService.update(id, data); }),
        remove: authedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => this.alertasService.remove(input.id)),
        evaluar: authedProcedure
          .input(z.object({ loteId: z.number() }))
          .mutation(async ({ input }) => {
            const suelos = await this.sueloService.findByLote(input.loteId);
            const climas = await this.climaService.findByLote(input.loteId);
            const producciones = await this.produccionService.findByLote(input.loteId);
            const nuevas = this.reglasService.evaluar({ suelos, climas, producciones, loteId: input.loteId });
            const created = [];
            for (const a of nuevas) {
              const r = await this.alertasService.upsertByHash('', a);
              created.push(r);
            }
            return created;
          }),
      }),

      ml: router({
        optimizarRiego: authedProcedure
          .input(z.object({ loteId: z.number(), sueloHumedad: z.number(), climaTempMax: z.number(), climaPrecip: z.number(), riegoVolumen: z.number() }))
          .query(({ input }) => this.mlService.optimizeIrrigation(input.loteId, input.sueloHumedad, input.climaTempMax, input.climaPrecip, input.riegoVolumen)),
        predecirRendimiento: authedProcedure
          .input(z.object({ loteId: z.number(), sueloPh: z.number(), sueloN: z.number(), sueloHum: z.number(), climaTempAvg: z.number(), climaPrecipTotal: z.number(), riegoTotal: z.number() }))
          .query(async ({ input }) => this.mlService.predictYield(input.loteId, input.sueloPh, input.sueloN, input.sueloHum, input.climaTempAvg, input.climaPrecipTotal, input.riegoTotal)),
      }),

      reports: router({
        operational: authedProcedure.query(async () => {
          const buf = await this.reportsService.generateOperationalReport();
          return buf.toString('base64');
        }),
        management: authedProcedure.query(async () => {
          const buf = await this.reportsService.generateManagementReport();
          return buf.toString('base64');
        }),
      }),

      dashboard: router({
        resumen: authedProcedure
          .input(z.object({ loteId: z.number().optional() }).optional())
          .query(async ({ input }) => {
            const loteId = input?.loteId;
            const [lotes, alertasPend, producciones, climasAll] = await Promise.all([
              this.lotesService.findAll(),
              this.alertasService.findPendientes(),
              this.produccionService.findAll(),
              this.climaService.findAll(),
            ]);
            const alertas = loteId ? alertasPend.filter((a: any) => a.loteId === loteId) : alertasPend;
            const prods = loteId ? producciones.filter((p: any) => p.loteId === loteId) : producciones;
            const lotesFiltered = loteId ? lotes.filter((l: any) => l.id === loteId) : lotes;

            let sueloLatest: any = null;
            let riegoLatest: any = null;
            let climaAgg: any = null;
            let rendimientoEstimado: any = null;

            const targetLoteIds = loteId ? [loteId] : lotesFiltered.map((l: any) => l.id);
            if (targetLoteIds.length > 0) {
              const allSuelos: any[] = [];
              const allRiegos: any[] = [];
              const allClimas: any[] = [];
              await Promise.all(targetLoteIds.map(async (lid: number) => {
                const [s, r, c] = await Promise.all([
                  this.sueloService.findByLote(lid),
                  this.riegoService.findByLote(lid),
                  this.climaService.findByLote(lid),
                ]);
                allSuelos.push(...s);
                allRiegos.push(...r);
                allClimas.push(...c);
              }));
              allSuelos.sort((a: any, b: any) => (a.fecha ?? '').localeCompare(b.fecha ?? ''));
              allRiegos.sort((a: any, b: any) => (a.fecha ?? '').localeCompare(b.fecha ?? ''));
              sueloLatest = allSuelos.length ? allSuelos[allSuelos.length - 1] : null;
              riegoLatest = allRiegos.length ? allRiegos[allRiegos.length - 1] : null;
              const tempAvg = allClimas.length
                ? allClimas.reduce((s: number, c: any) => s + (c.tempMax + c.tempMin) / 2, 0) / allClimas.length
                : 22;
              const precipTotal = allClimas.reduce((s: number, c: any) => s + (c.precipitacion || 0), 0);
              const riegoTotal = allRiegos.reduce((s: number, r: any) => s + (r.volumenAplicadoL || 0), 0);
              climaAgg = { tempAvg: Math.round(tempAvg * 10) / 10, precipTotal: Math.round(precipTotal * 10) / 10, riegoTotal: Math.round(riegoTotal) };
              if (sueloLatest) {
                const predLoteId = sueloLatest.loteId ?? targetLoteIds[0];
                const predLote = lotesFiltered.find((l: any) => l.id === predLoteId);
                rendimientoEstimado = await this.mlService.predictYield(
                  predLoteId,
                  sueloLatest.ph,
                  sueloLatest.nitrogenoDisponible,
                  sueloLatest.humedad,
                  climaAgg.tempAvg,
                  climaAgg.precipTotal,
                  climaAgg.riegoTotal,
                  {
                    fosforo: sueloLatest.fosforoDisponible,
                    tempMax: allClimas.length ? Math.max(...allClimas.map((c: any) => c.tempMax)) : undefined,
                    tempMin: allClimas.length ? Math.min(...allClimas.map((c: any) => c.tempMin)) : undefined,
                    cultivo: predLote?.cultivo,
                    superficieHa: predLote?.superficieHa,
                  },
                );
              }
            }

            return {
              totalLotes: lotesFiltered.length,
              alertasCriticas: alertas.filter((a: any) => a.severidad === 'critica').length,
              alertasTotal: alertas.length,
              totalCultivos: prods.length,
              sueloLatest: sueloLatest ? { humedad: sueloLatest.humedad, ph: sueloLatest.ph, nitrogeno: sueloLatest.nitrogenoDisponible } : null,
              riegoLatest: riegoLatest ? { volumen: riegoLatest.volumenAplicadoL, fecha: riegoLatest.fecha } : null,
              climaAgg,
              rendimientoEstimado,
            };
          }),
      }),
    });
  }
}

export type AppRouter = InstanceType<typeof TrpcRouter>['appRouter'];
