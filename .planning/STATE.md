# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-03)

**Core value:** Ayudar al agrónomo a decidir rápido con una vista clara del rendimiento estimado, el estado hídrico y las alertas relevantes.
**Current focus:** v1.1 — Authentication gap closure, real-time alerts via n8n webhooks, and ensemble ML integration.

## Architecture

- **Frontend:** Next.js 14 + React 18 + Tailwind CSS + tRPC + Recharts
- **Backend:** NestJS 10 + Sequelize + SQLite + tRPC + JWT
- **ML Service:** Python FastAPI + numpy (ensemble upgrade pending)
- **Automation:** n8n workflow JSONs (`.n8n/workflows/`) — not yet wired to live backend

## Phase Status

### Phase 1 — Base de datos y carga manual (DATA-01) ✅ COMPLETE
- Backend models: Cultivo, Lote, Clima, Suelo, Riego, Produccion, Alerta (Sequelize/SQLite).
- Seeders y seed service (`backend/src/seed/seed.service.ts`).
- tRPC routers con CRUD completo para 6 entidades.

### Phase 2 — Dashboard agronómico (DASH-01, DASH-02) ✅ COMPLETE
- `frontend/src/app/page.tsx`: Dashboard interactivo con KPIs, estado hídrico, rendimiento estimado vía `mlService.predictYield` (rule-based stub).
- `frontend/src/app/historico/page.tsx`: Gráficos históricos con filtros.
- `frontend/src/app/reportes/page.tsx`: Reporte operacional y de gestión en base64.

### Phase 3 — Alertas y sugerencias (ALRT-01) ✅ COMPLETE
- 6 rules en `backend/src/alertas/reglas.service.ts`: humedad-baja, ph-acido, ph-alcalino, ola-calor, lluvia-intensa, rendimiento-bajo-pred.
- Alert model con estados: pendiente → reconocida → resuelta.
- `frontend/src/app/alertas/page.tsx`: Alert center con ack/resolve.
- Dashboard badge de alertas pendientes.

### Phase 4 — Autenticación completa (AUTH-01, AUTH-02) ⏳ PENDING
- `login/page.tsx` existe pero rutas no están protegidas.
- `auth.service.ts` emite JWT pero **todos los endpoints tRPC usan `publicProcedure`**.
- **Gap:** No hay `authedProcedure` en uso, no hay middleware de redirección en frontend.

### Phase 5 — Alertas real-time + n8n (ALRT-02, ALRT-03) ⏳ PENDING
- `.n8n/workflows/*.json` existen pero apuntan a endpoints tRPC (incompatible con n8n HTTP node en formato actual).
- **Gap:** No hay webhook REST expuesto para que n8n cree alertas. No hay SSE ni polling en vivo.

### Phase 6 — Ensemble Learning (ML-01, ML-02) ⏳ PENDING
- `ml/main.py` usa reglas simples + ruido, NO ensemble learning.
- `backend/src/ml/ml.service.ts` es rule-based puro, nunca llama al servicio Python.
- **Gap:** No hay conexión backend→ML service. No hay modelo ensemble entrenado.

## Files (v1.1 relevant)
| File | Role |
|------|------|
| `backend/src/main.ts` | NestJS bootstrap + tRPC middleware mount |
| `backend/src/trpc/app.router.ts` | tRPC router (all publicProcedure — needs auth) |
| `backend/src/trpc/trpc.ts` | `authedProcedure` defined but unused |
| `backend/src/auth/auth.service.ts` | JWT login/register |
| `backend/src/ml/ml.service.ts` | Rule-based prediction stubs |
| `ml/main.py` | FastAPI prediction service (rules, not ensemble) |
| `frontend/src/app/login/page.tsx` | Login/register UI |
| `frontend/src/providers/trpc-provider.tsx` | tRPC client + header injection |
| `.n8n/workflows/*.json` | Static workflow definitions (not live) |

## Deferred
- External weather APIs / IoT ingestion
- Autonomous prescriptions (auto-execution)
- Full n8n orchestration (outbound automation)
- Postgres migration (SQLite sufficient for v1.1)
