import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { LotesService } from '../lotes/lotes.service';
import { CultivosService } from '../cultivos/cultivos.service';
import { ClimaService } from '../clima/clima.service';
import { SueloService } from '../suelo/suelo.service';
import { RiegoService } from '../riego/riego.service';
import { ProduccionService } from '../produccion/produccion.service';
import { AlertasService } from '../alertas/alertas.service';
import { NotificationConfigService } from '../notification-config/notification-config.service';

const C = {
  primary: '#86cb92',
  primaryAlt: '#71b48d',
  sec1: '#404e7c',
  sec2: '#251f47',
  sec3: '#260f26',
  white: '#ffffff',
  light: '#f4f6f8',
  gray: '#6b7280',
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  blue: '#3b82f6',
};

const M = { left: 50, right: 50, top: 40, bottom: 60 };
const PW = 595.28;
const PH = 841.89;
const CW = PW - M.left - M.right;

function n(v: number | undefined | null, d = 0): string {
  if (v == null || isNaN(v)) return '—';
  return v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

@Injectable()
export class ReportsService {
  constructor(
    private lotesService: LotesService,
    private cultivosService: CultivosService,
    private climaService: ClimaService,
    private sueloService: SueloService,
    private riegoService: RiegoService,
    private produccionService: ProduccionService,
    private alertasService: AlertasService,
    private notificationConfigService: NotificationConfigService,
  ) { }

  private header(doc: any, title: string, subtitle: string) {
    doc.save();
    doc.rect(0, 0, PW, 70).fill(C.sec1);
    doc.rect(0, 70, PW, 4).fill(C.primary);
    doc.fill(C.white).font('Helvetica-Bold').fontSize(18).text(title, M.left, 18, { width: CW, lineBreak: false });
    doc.fill(C.primary).font('Helvetica').fontSize(10).text(subtitle, M.left, 44, { width: CW, lineBreak: false });
    doc.restore();
    doc.y = 90;
  }

  private footer(doc: any, pageNum: number) {
    const y = PH - 40;
    doc.save();
    doc.rect(0, y - 4, PW, 44).fill(C.sec2);
    doc.fill('#aaaaaa').font('Helvetica').fontSize(8);
    doc.text('AgroTech — Sistema de Agricultura de Precisión', M.left, y + 6, { width: CW / 2, lineBreak: false });
    doc.text(`Página ${pageNum}`, M.left, y + 6, { width: CW, align: 'right', lineBreak: false });
    doc.fill('#777777').text(`Generado: ${new Date().toLocaleString('es-AR')}`, M.left, y + 18, { width: CW, align: 'right', lineBreak: false });
    doc.restore();
  }

  private newPage(doc: any, page: { num: number }, title: string) {
    this.footer(doc, page.num);
    doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: M.left, right: M.right } });
    page.num++;
    this.header(doc, title, 'AgroTech — Agricultura de Precisión');
  }

  private ensureSpace(doc: any, needed: number, page: { num: number }, title: string) {
    if (doc.y + needed > PH - M.bottom - 10) this.newPage(doc, page, title);
  }

  private sectionTitle(doc: any, text: string, page: { num: number }, title: string) {
    this.ensureSpace(doc, 120, page, title);
    doc.save();
    doc.rect(M.left, doc.y, CW, 22).fill(C.sec1);
    doc.fill(C.white).font('Helvetica-Bold').fontSize(10).text(text, M.left + 8, doc.y + 6, { width: CW - 16, lineBreak: false });
    doc.restore();
    doc.y += 28;
  }

  private kpiRow(doc: any, kpis: { label: string; value: string; sub?: string }[]) {
    const count = kpis.length;
    const gap = 10;
    const w = (CW - gap * (count - 1)) / count;
    const startY = doc.y;
    kpis.forEach((k, i) => {
      const x = M.left + i * (w + gap);
      doc.save();
      doc.roundedRect(x, startY, w, 52, 4).fill(C.light);
      doc.rect(x, startY, 4, 52).fill(C.primary);
      doc.fill(C.gray).font('Helvetica').fontSize(8).text(k.label, x + 12, startY + 8, { width: w - 20, lineBreak: false });
      doc.fill(C.sec3).font('Helvetica-Bold').fontSize(16).text(k.value, x + 12, startY + 20, { width: w - 20, lineBreak: false });
      if (k.sub) doc.fill(C.gray).font('Helvetica').fontSize(7).text(k.sub, x + 12, startY + 38, { width: w - 20, lineBreak: false });
      doc.restore();
    });
    doc.y = startY + 60;
  }

  private barChart(doc: any, data: { label: string; value: number; color?: string }[], opts: { title: string; unit?: string; height?: number }, page?: { num: number }, rptTitle?: string) {
    if (data.length === 0) return;
    if (page && rptTitle) this.ensureSpace(doc, (opts.height ?? 130) + 40, page, rptTitle);
    const h = opts.height ?? 130;
    const chartX = M.left + 40;
    const chartW = CW - 50;
    const startY = doc.y;

    doc.fill(C.sec3).font('Helvetica-Bold').fontSize(9).text(opts.title, M.left, startY, { lineBreak: false });
    const topY = startY + 14;
    const baseY = topY + h;
    const maxVal = Math.max(...data.map((d) => d.value), 1);

    doc.save();
    doc.strokeColor('#e0e0e0').lineWidth(0.5);
    for (let i = 0; i <= 4; i++) {
      const gy = topY + h - (h * i) / 4;
      doc.moveTo(chartX, gy).lineTo(chartX + chartW, gy).stroke();
      const lbl = ((maxVal * i) / 4).toFixed(maxVal > 100 ? 0 : 1);
      doc.fill(C.gray).font('Helvetica').fontSize(7).text(lbl, M.left, gy - 4, { width: 35, align: 'right', lineBreak: false });
    }

    const barW = Math.min(30, (chartW / data.length) * 0.6);
    const gap = (chartW - barW * data.length) / (data.length + 1);
    data.forEach((d, i) => {
      const bh = (d.value / maxVal) * h;
      const x = chartX + gap + i * (barW + gap);
      doc.rect(x, baseY - bh, barW, bh).fill(d.color ?? C.primary);
      doc.fill(C.sec3).font('Helvetica-Bold').fontSize(7).text(n(d.value, 1), x - 4, baseY - bh - 10, { width: barW + 8, align: 'center', lineBreak: false });
      doc.fill(C.gray).font('Helvetica').fontSize(6).text(d.label.substring(0, 12), x - 4, baseY + 3, { width: barW + 8, align: 'center', lineBreak: false });
    });
    doc.restore();
    doc.y = baseY + 20;
  }

  private lineChart(doc: any, series: { label: string; values: number[] }[], labels: string[], opts: { title: string; height?: number; colors?: string[] }, page?: { num: number }, rptTitle?: string) {
    if (series.length === 0 || labels.length === 0) return;
    if (page && rptTitle) this.ensureSpace(doc, (opts.height ?? 110) + 40, page, rptTitle);
    const h = opts.height ?? 110;
    const chartX = M.left + 40;
    const chartW = CW - 50;
    const startY = doc.y;
    const colors = opts.colors ?? [C.primary, C.sec1, C.orange, C.blue];

    doc.fill(C.sec3).font('Helvetica-Bold').fontSize(9).text(opts.title, M.left, startY, { lineBreak: false });
    const topY = startY + 14;
    const baseY = topY + h;
    const allVals = series.flatMap((s) => s.values).filter((v) => v != null && !isNaN(v));
    if (allVals.length === 0) { doc.y = startY + 20; return; }
    const maxVal = Math.max(...allVals);
    const minVal = Math.min(...allVals);
    const range = maxVal - minVal || 1;

    doc.save();
    doc.strokeColor('#e0e0e0').lineWidth(0.5);
    for (let i = 0; i <= 4; i++) {
      const gy = topY + h - (h * i) / 4;
      doc.moveTo(chartX, gy).lineTo(chartX + chartW, gy).stroke();
      const lbl = (minVal + (range * i) / 4).toFixed(1);
      doc.fill(C.gray).font('Helvetica').fontSize(7).text(lbl, M.left, gy - 4, { width: 35, align: 'right', lineBreak: false });
    }

    const step = labels.length > 1 ? chartW / (labels.length - 1) : chartW;
    labels.forEach((l, i) => {
      const x = chartX + i * step;
      doc.fill(C.gray).font('Helvetica').fontSize(6).text(l.substring(0, 10), x - 15, baseY + 3, { width: 30, align: 'center', lineBreak: false });
    });

    series.forEach((s, si) => {
      const color = colors[si % colors.length];
      const validPts = s.values.map((v, i) => ({ v, i })).filter((p) => p.v != null && !isNaN(p.v));
      if (validPts.length < 2) return;
      doc.strokeColor(color).lineWidth(1.5);
      validPts.forEach((p, pi) => {
        const x = chartX + p.i * step;
        const y = baseY - ((p.v - minVal) / range) * h;
        if (pi === 0) doc.moveTo(x, y);
        else doc.lineTo(x, y);
      });
      doc.stroke();
      validPts.forEach((p) => {
        const x = chartX + p.i * step;
        const y = baseY - ((p.v - minVal) / range) * h;
        doc.circle(x, y, 2.5).fill(color);
      });
    });

    if (series.length > 1) {
      let lx = chartX;
      series.forEach((s, si) => {
        doc.rect(lx, baseY + 14, 8, 8).fill(colors[si % colors.length]);
        doc.fill(C.gray).font('Helvetica').fontSize(7).text(s.label, lx + 11, baseY + 15, { lineBreak: false });
        lx += 11 + doc.widthOfString(s.label) + 12;
      });
    }

    doc.restore();
    doc.y = baseY + (series.length > 1 ? 30 : 18);
  }

  private table(doc: any, headers: string[], rows: string[][], colWidths?: number[], page?: { num: number }, rptTitle?: string) {
    if (page && rptTitle) this.ensureSpace(doc, 60, page, rptTitle);
    const widths = colWidths ?? headers.map(() => CW / headers.length);
    const rowH = 18;
    let x = M.left;
    let y = doc.y;

    doc.save();
    doc.rect(x, y, CW, rowH).fill(C.sec1);
    headers.forEach((h, i) => {
      doc.fill(C.white).font('Helvetica-Bold').fontSize(8).text(h, x + 4, y + 5, { width: widths[i] - 8, lineBreak: false });
      x += widths[i];
    });
    y += rowH;

    rows.forEach((row, ri) => {
      if (y > PH - M.bottom - 20) {
        if (page && rptTitle) { this.newPage(doc, page, rptTitle); } else { doc.addPage(); }
        y = 90;
      }
      const bg = ri % 2 === 0 ? C.white : C.light;
      doc.rect(M.left, y, CW, rowH).fill(bg);
      x = M.left;
      row.forEach((cell, ci) => {
        doc.fill(C.sec3).font('Helvetica').fontSize(8).text(cell, x + 4, y + 5, { width: widths[ci] - 8, lineBreak: false });
        x += widths[ci];
      });
      y += rowH;
    });
    doc.restore();
    doc.y = y + 8;
  }

  private sevBadge(doc: any, sev: string, x: number, y: number) {
    const colors: Record<string, string> = { critica: C.red, alta: C.orange, media: C.yellow, baja: C.blue };
    doc.circle(x + 4, y + 5, 4).fill(colors[sev] ?? C.gray);
  }

  private async sendToWebhook(fileName: string, tipoReporte: string, buf: Buffer, filters?: any, user?: any) {
    const webhookUrl = process.env.N8N_REPORTES_WEBHOOK_URL;
    if (!webhookUrl) return;

    let telefono = user?.telefono;
    if (!telefono) {
      try {
        const cfg = await this.notificationConfigService.get();
        telefono = cfg.telefono || '';
      } catch (e) { }
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          pdfBase64: buf.toString('base64'),
          tipoReporte,
          filtros: filters || {},
          destinatario: {
            email: user?.email || '',
            telefono: telefono || ''
          }
        })
      });
      console.log(`[ReportsService] Sent ${tipoReporte} report to n8n`);
    } catch (e) {
      console.error(`[ReportsService] Error sending to n8n:`, e);
    }
  }

  async generateOperationalReport(filters?: { loteId?: number; startDate?: string; endDate?: string }, user?: any): Promise<Buffer> {
    let [lotes, cultivos, climas, suelos, riegos, alertas] = await Promise.all([
      this.lotesService.findAll(),
      this.cultivosService.findAll(),
      this.climaService.findAll(),
      this.sueloService.findAll(),
      this.riegoService.findAll(),
      this.alertasService.findPendientes(),
    ]);

    if (filters?.loteId) {
      lotes = lotes.filter(l => l.id === filters.loteId);
      cultivos = cultivos.filter(c => c.loteId === filters.loteId);
      climas = climas.filter(c => c.loteId === filters.loteId);
      suelos = suelos.filter(s => s.loteId === filters.loteId);
      riegos = riegos.filter(r => r.loteId === filters.loteId);
      alertas = alertas.filter((a: any) => a.loteId === filters.loteId);
    }
    if (filters?.startDate) {
      climas = climas.filter(c => c.fecha && c.fecha >= filters.startDate!);
      suelos = suelos.filter(s => s.fecha && s.fecha >= filters.startDate!);
      riegos = riegos.filter(r => r.fecha && r.fecha >= filters.startDate!);
      alertas = alertas.filter((a: any) => a.fecha && a.fecha >= filters.startDate!);
      cultivos = cultivos.filter(c => c.fechaSiembra && c.fechaSiembra >= filters.startDate!);
    }
    if (filters?.endDate) {
      climas = climas.filter(c => c.fecha && c.fecha <= filters.endDate!);
      suelos = suelos.filter(s => s.fecha && s.fecha <= filters.endDate!);
      riegos = riegos.filter(r => r.fecha && r.fecha <= filters.endDate!);
      alertas = alertas.filter((a: any) => a.fecha && a.fecha <= filters.endDate!);
      cultivos = cultivos.filter(c => c.fechaSiembra && c.fechaSiembra <= filters.endDate!);
    }

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const doc = new (PDFDocument as any)({ size: 'A4', margins: { top: 0, bottom: 0, left: M.left, right: M.right }, autoFirstPage: true });
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => {
        const buf = Buffer.concat(chunks);
        this.sendToWebhook(`reporte-operativo-${new Date().toISOString().split('T')[0]}.pdf`, 'operativo', buf, filters, user);
        resolve(buf);
      });
      doc.on('error', (err: Error) => reject(err));
      const pg = { num: 1 };
      const T = 'Reporte Operativo';

      this.header(doc, T, 'AgroTech — Agricultura de Precisión');

      const totalSup = lotes.reduce((s, l) => s + (l.superficieHa || 0), 0);
      const totalRiegoL = riegos.reduce((s, r) => s + (r.volumenAplicadoL || 0), 0);
      const avgHum = suelos.length ? suelos.reduce((s, x) => s + (x.humedad || 0), 0) / suelos.length : 0;
      const avgPh = suelos.length ? suelos.reduce((s, x) => s + (x.ph || 0), 0) / suelos.length : 0;
      const critAlerts = alertas.filter((a) => a.severidad === 'critica' || a.severidad === 'alta').length;

      this.kpiRow(doc, [
        { label: 'Lotes activos', value: String(lotes.length), sub: `${n(totalSup, 1)} ha totales` },
        { label: 'Cultivos registrados', value: String(cultivos.length) },
        { label: 'Alertas pendientes', value: String(alertas.length), sub: `${critAlerts} críticas/altas` },
        { label: 'Humedad suelo prom.', value: `${n(avgHum, 1)}%`, sub: `pH prom. ${n(avgPh, 1)}` },
      ]);

      this.kpiRow(doc, [
        { label: 'Riego total acumulado', value: `${n(totalRiegoL, 0)} L`, sub: `${riegos.length} eventos` },
        { label: 'Registros clima', value: String(climas.length) },
        { label: 'Registros suelo', value: String(suelos.length) },
        { label: 'Nitrógeno prom.', value: suelos.length ? `${n(suelos.reduce((s, x) => s + (x.nitrogenoDisponible || 0), 0) / suelos.length, 1)} ppm` : '—' },
      ]);

      this.sectionTitle(doc, 'LOTES Y CULTIVOS', pg, T);
      this.table(
        doc,
        ['Lote', 'Superficie (ha)', 'Cultivo', 'Ubicación'],
        lotes.map((l) => [l.nombre, n(l.superficieHa, 2), l.cultivo || '—', l.ubicacion || '—']),
        [130, 100, 110, CW - 340],
        pg, T,
      );

      if (climas.length > 0) {
        this.sectionTitle(doc, 'CLIMA — ÚLTIMOS 10 REGISTROS', pg, T);
        const last10 = climas.slice(-10);
        this.lineChart(
          doc,
          [
            { label: 'Temp. Max', values: last10.map((c) => c.tempMax || 0) },
            { label: 'Temp. Min', values: last10.map((c) => c.tempMin || 0) },
          ],
          last10.map((c) => String(c.fecha).substring(5)),
          { title: 'Evolución de temperatura (°C)', colors: [C.red, C.blue] },
          pg, T,
        );

        this.barChart(
          doc,
          last10.map((c) => ({ label: String(c.fecha).substring(5), value: c.precipitacion || 0, color: C.sec1 })),
          { title: 'Precipitación (mm)', unit: 'mm' },
          pg, T,
        );
      }

      if (suelos.length > 0) {
        this.sectionTitle(doc, 'SUELO — EVOLUCIÓN', pg, T);
        const last8 = suelos.slice(-8);
        this.lineChart(
          doc,
          [
            { label: 'Humedad %', values: last8.map((s) => s.humedad || 0) },
            { label: 'pH', values: last8.map((s) => s.ph || 0) },
          ],
          last8.map((s) => String(s.fecha).substring(5)),
          { title: 'Humedad y pH del suelo', colors: [C.primary, C.orange] },
          pg, T,
        );
      }

      if (alertas.length > 0) {
        this.sectionTitle(doc, 'ALERTAS PENDIENTES', pg, T);
        this.table(
          doc,
          ['Severidad', 'Tipo', 'Mensaje', 'Fecha'],
          alertas.map((a) => [a.severidad?.toUpperCase() ?? '—', a.tipo || '—', (a.mensaje || '—').substring(0, 50), String(a.fecha)]),
          [70, 80, CW - 230, 80],
          pg, T,
        );
      }

      if (riegos.length > 0) {
        this.sectionTitle(doc, 'RIEGO — ÚLTIMOS EVENTOS', pg, T);
        this.table(
          doc,
          ['Fecha', 'Tipo', 'Volumen (L)', 'Duración (h)', 'Presión (bar)'],
          riegos.slice(-8).map((r) => [String(r.fecha), r.tipoRiego || '—', n(r.volumenAplicadoL, 0), n(r.duracionHoras, 1), n(r.presionBar, 1)]),
          [80, 90, 90, 80, CW - 340],
          pg, T,
        );
      }

      this.footer(doc, pg.num);
      doc.end();
    });
  }

  async generateManagementReport(filters?: { loteId?: number; startDate?: string; endDate?: string }, user?: any): Promise<Buffer> {
    let [lotes, producciones, alertas, climas, suelos, riegos] = await Promise.all([
      this.lotesService.findAll(),
      this.produccionService.findAll(),
      this.alertasService.findAll(),
      this.climaService.findAll(),
      this.sueloService.findAll(),
      this.riegoService.findAll(),
    ]);

    if (filters?.loteId) {
      lotes = lotes.filter(l => l.id === filters.loteId);
      producciones = producciones.filter(p => p.loteId === filters.loteId);
      alertas = (alertas as any[]).filter(a => a.loteId === filters.loteId);
      climas = climas.filter(c => c.loteId === filters.loteId);
      suelos = suelos.filter(s => s.loteId === filters.loteId);
      riegos = riegos.filter(r => r.loteId === filters.loteId);
    }
    if (filters?.startDate) {
      climas = climas.filter(c => c.fecha && c.fecha >= filters.startDate!);
      suelos = suelos.filter(s => s.fecha && s.fecha >= filters.startDate!);
      riegos = riegos.filter(r => r.fecha && r.fecha >= filters.startDate!);
      alertas = (alertas as any[]).filter(a => a.fecha && a.fecha >= filters.startDate!);
    }
    if (filters?.endDate) {
      climas = climas.filter(c => c.fecha && c.fecha <= filters.endDate!);
      suelos = suelos.filter(s => s.fecha && s.fecha <= filters.endDate!);
      riegos = riegos.filter(r => r.fecha && r.fecha <= filters.endDate!);
      alertas = (alertas as any[]).filter(a => a.fecha && a.fecha <= filters.endDate!);
    }

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const doc = new (PDFDocument as any)({ size: 'A4', margins: { top: 0, bottom: 0, left: M.left, right: M.right }, autoFirstPage: true });
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => {
        const buf = Buffer.concat(chunks);
        this.sendToWebhook(`reporte-gestion-${new Date().toISOString().split('T')[0]}.pdf`, 'gestion', buf, filters, user);
        resolve(buf);
      });
      doc.on('error', (err: Error) => reject(err));
      const pg = { num: 1 };
      const T = 'Reporte de Gestión';

      this.header(doc, T, 'AgroTech — Agricultura de Precisión');

      const totalSup = lotes.reduce((s, l) => s + (l.superficieHa || 0), 0);
      const totalIngresos = producciones.reduce((s, p) => s + (p.ingresosBrutos || 0), 0);
      const totalCostos = producciones.reduce((s, p) => s + (p.costosOperativos || 0), 0);
      const margenTotal = totalIngresos - totalCostos;
      const avgRend = producciones.length ? producciones.reduce((s, p) => s + (p.rendimientoTnHa || 0), 0) / producciones.length : 0;
      const temporadas = Array.from(new Set(producciones.map((p) => p.temporada))).sort();
      const alertasResueltas = (alertas as any[]).filter((a) => a.estado === 'resuelta').length;
      const alertasPend = (alertas as any[]).filter((a) => a.estado === 'pendiente').length;

      this.kpiRow(doc, [
        { label: 'Lotes', value: String(lotes.length), sub: `${n(totalSup, 1)} ha` },
        { label: 'Rendimiento promedio', value: `${n(avgRend, 2)} tn/ha`, sub: `${producciones.length} registros` },
        { label: 'Margen bruto total', value: `$${n(margenTotal, 0)}`, sub: `Ing. $${n(totalIngresos, 0)} — Cost. $${n(totalCostos, 0)}` },
        { label: 'Temporadas', value: String(temporadas.length) },
      ]);

      this.kpiRow(doc, [
        { label: 'Ingresos brutos', value: `$${n(totalIngresos, 0)}` },
        { label: 'Costos operativos', value: `$${n(totalCostos, 0)}` },
        { label: 'Alertas resueltas', value: String(alertasResueltas), sub: `${alertasPend} pendientes` },
        { label: 'ROI operativo', value: totalCostos > 0 ? `${n((margenTotal / totalCostos) * 100, 1)}%` : '—' },
      ]);

      if (temporadas.length > 0) {
        this.sectionTitle(doc, 'RENDIMIENTO POR TEMPORADA', pg, T);
        const byTemp: Record<string, { rend: number; costos: number; ingresos: number; count: number }> = {};
        producciones.forEach((p) => {
          if (!byTemp[p.temporada]) byTemp[p.temporada] = { rend: 0, costos: 0, ingresos: 0, count: 0 };
          byTemp[p.temporada].rend += p.rendimientoTnHa || 0;
          byTemp[p.temporada].costos += p.costosOperativos || 0;
          byTemp[p.temporada].ingresos += p.ingresosBrutos || 0;
          byTemp[p.temporada].count += 1;
        });

        const tempEntries = temporadas.map((t) => ({ label: t, ...byTemp[t] }));

        this.barChart(
          doc,
          tempEntries.map((t) => ({ label: t.label, value: t.rend / t.count, color: C.primary })),
          { title: 'Rendimiento promedio por temporada (tn/ha)' },
          pg, T,
        );

        this.barChart(
          doc,
          tempEntries.map((t) => ({ label: t.label, value: t.ingresos - t.costos, color: t.ingresos - t.costos >= 0 ? C.primaryAlt : C.red })),
          { title: 'Margen bruto por temporada ($)' },
          pg, T,
        );

        this.sectionTitle(doc, 'DETALLE POR TEMPORADA', pg, T);
        this.table(
          doc,
          ['Temporada', 'Rend. prom (tn/ha)', 'Costos ($)', 'Ingresos ($)', 'Margen ($)'],
          tempEntries.map((t) => [
            t.label,
            n(t.rend / t.count, 2),
            `$${n(t.costos, 0)}`,
            `$${n(t.ingresos, 0)}`,
            `$${n(t.ingresos - t.costos, 0)}`,
          ]),
          [100, 100, 100, 100, CW - 400],
          pg, T,
        );
      }

      this.sectionTitle(doc, 'PRODUCCIÓN POR LOTE', pg, T);
      const loteMap: Record<number, string> = {};
      lotes.forEach((l) => { loteMap[l.id] = l.nombre; });
      this.table(
        doc,
        ['Lote', 'Temporada', 'Rend. (tn/ha)', 'Calidad', 'Margen ($)'],
        producciones.map((p) => [
          loteMap[p.loteId] || `Lote ${p.loteId}`,
          p.temporada,
          n(p.rendimientoTnHa, 2),
          p.calidadGrano || '—',
          `$${n((p.ingresosBrutos || 0) - (p.costosOperativos || 0), 0)}`,
        ]),
        [110, 90, 90, 80, CW - 370],
        pg, T,
      );

      if (lotes.length > 1) {
        this.sectionTitle(doc, 'COMPARATIVA DE RENDIMIENTO POR LOTE', pg, T);
        const loteRend = lotes.map((l) => {
          const prods = producciones.filter((p) => p.loteId === l.id);
          const avg = prods.length ? prods.reduce((s, p) => s + (p.rendimientoTnHa || 0), 0) / prods.length : 0;
          return { label: l.nombre, value: avg, color: C.sec1 };
        });
        this.barChart(doc, loteRend, { title: 'Rendimiento promedio por lote (tn/ha)' }, pg, T);
      }

      if (climas.length > 0) {
        this.sectionTitle(doc, 'RESUMEN CLIMÁTICO', pg, T);
        const avgTemp = climas.reduce((s, c) => s + ((c.tempMax + c.tempMin) / 2 || 0), 0) / climas.length;
        const totalPrecip = climas.reduce((s, c) => s + (c.precipitacion || 0), 0);
        const totalRiego = riegos.reduce((s, r) => s + (r.volumenAplicadoL || 0), 0);
        doc.fill(C.sec3).font('Helvetica').fontSize(9);
        doc.text(`Temperatura promedio: ${n(avgTemp, 1)} °C  |  Precipitación acumulada: ${n(totalPrecip, 1)} mm  |  Riego total: ${n(totalRiego, 0)} L`, M.left, doc.y, { width: CW, lineBreak: false });
        doc.y += 16;
      }

      this.footer(doc, pg.num);
      doc.end();
    });
  }
}
